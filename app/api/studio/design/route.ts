import { get, put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const STUDIO_KEY = 'verto-studio';
const MAX_BYTES = 256 * 1024; // a design is ~1KB; this is only a runaway guard

// One board per name. The board a person edits comes from ?b= in the link they
// were sent, so several people can work at once without colliding.
const boardPath = (board: string) => `studio-designs/${board}.json`;

function clean(board: string | null) {
  if (!board) return null;
  const safe = board.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 40);
  return safe.length >= 2 ? safe : null;
}

// Read the latest state of a board.
export async function GET(req: Request) {
  const board = clean(new URL(req.url).searchParams.get('b'));
  if (!board) return NextResponse.json({ error: 'Unknown board.' }, { status: 400 });
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'no-store' }, { status: 503 });
  }
  try {
    const res = await get(boardPath(board), { access: 'private', useCache: false });
    if (!res) return NextResponse.json({ error: 'No design saved yet.' }, { status: 404 });
    return new NextResponse(res.stream, {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  } catch {
    return NextResponse.json({ error: 'No design saved yet.' }, { status: 404 });
  }
}

// Autosave. Overwrites the board in place, so the newest edit always wins.
export async function POST(req: Request) {
  if (req.headers.get('x-studio-key') !== STUDIO_KEY) {
    return NextResponse.json({ error: 'Not allowed from here.' }, { status: 401 });
  }
  const board = clean(new URL(req.url).searchParams.get('b'));
  if (!board) return NextResponse.json({ error: 'Unknown board.' }, { status: 400 });

  const body = await req.text();
  if (body.length > MAX_BYTES) {
    return NextResponse.json({ error: 'That design is too large.' }, { status: 413 });
  }
  try {
    JSON.parse(body);
  } catch {
    return NextResponse.json({ error: 'Expected JSON.' }, { status: 400 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'no-store' }, { status: 503 });
  }

  try {
    await put(boardPath(board), body, {
      access: 'private',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/json',
      cacheControlMaxAge: 0,
    });
    return NextResponse.json({ ok: true, board, savedAt: new Date().toISOString() });
  } catch (err) {
    return NextResponse.json(
      { error: 'save-failed', message: err instanceof Error ? err.message : 'Storage rejected it.' },
      { status: 502 },
    );
  }
}
