import { NextRequest, NextResponse } from 'next/server';
import { quoteSchema } from '@/lib/validation';
import { sendLeadEmail } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Per-instance in-memory rate limit. Good enough for a small lead form;
// on serverless each cold instance has its own map, which only relaxes
// the limit — never tightens it past intent. 5 submissions per IP per 10 min.
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (arr.length >= LIMIT) {
    hits.set(ip, arr);
    return true;
  }
  arr.push(now);
  hits.set(ip, arr);
  return false;
}

function getIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, errors: [{ message: 'Too many submissions. Try again later.' }] },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: [{ message: 'Invalid JSON body' }] },
      { status: 400 },
    );
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.issues },
      { status: 400 },
    );
  }

  // Honeypot — silently accept, do not forward.
  if (parsed.data.honeypot && parsed.data.honeypot.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const result = await sendLeadEmail(parsed.data, {
    ip,
    userAgent: req.headers.get('user-agent'),
  });

  if (!result.ok) {
    console.error('sendLeadEmail failed', result.error);
    return NextResponse.json(
      { ok: false, errors: [{ message: 'Could not send your enquiry. Please email us directly.' }] },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
