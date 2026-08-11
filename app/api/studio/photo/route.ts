import { get } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Serves a photograph out of the private Blob store. The store is not
// world-readable, so this is the only way in, and it is deliberately a plain
// GET: the URL goes into saved designs and has to keep working in any browser,
// for as long as the site does. A signed URL would expire and break them.
export async function GET(req: Request) {
  const path = new URL(req.url).searchParams.get('p');

  // Only ever reach into the studio's own folder, whatever is asked for.
  if (!path || !path.startsWith('studio/') || path.includes('..')) {
    return NextResponse.json({ error: 'Unknown photo.' }, { status: 400 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'Photo storage is not connected.' }, { status: 503 });
  }

  try {
    const res = await get(path, { access: 'private' });
    if (!res) return NextResponse.json({ error: 'Photo not found.' }, { status: 404 });
    return new NextResponse(res.stream, {
      headers: {
        'Content-Type': res.blob.contentType || 'image/jpeg',
        // Pathnames carry a random suffix, so a stored photo never changes.
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Photo not found.' }, { status: 404 });
  }
}
