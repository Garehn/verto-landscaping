import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const MAX_BYTES = 6 * 1024 * 1024;
const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp']);

// A shared key baked into the studio page. /studio is unlisted rather than
// private, so this only stops drive-by posting by anyone who finds the
// endpoint without reading the page. For real protection, put Vercel
// deployment protection in front of the site.
const STUDIO_KEY = 'verto-studio';

function reply(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, { status });
}

export async function POST(req: Request) {
  if (req.headers.get('x-studio-key') !== STUDIO_KEY) {
    return reply(401, { error: 'Not allowed from here.' });
  }
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return reply(400, { error: 'Expected a file upload.' });
  }

  const file = form.get('file');
  if (!(file instanceof File)) return reply(400, { error: 'No file was sent.' });
  if (!ALLOWED.has(file.type)) {
    return reply(415, { error: `That file type is not accepted (${file.type || 'unknown'}).` });
  }
  if (file.size > MAX_BYTES) {
    return reply(413, {
      error: `That photo is ${(file.size / 1048576).toFixed(1)}MB. The limit is 6MB.`,
    });
  }

  // Checked after validation so a bad file is told what is wrong with it.
  // Without a store the studio keeps working — it holds the import in the
  // browser and asks for a bundle instead, so this is not an error state.
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return reply(503, {
      error: 'no-store',
      message: 'Photo storage is not connected yet, so this import stays on your device.',
    });
  }

  // Random suffix so two people uploading DSC_0001.jpg never collide, and so
  // the stored path can't be guessed from the filename.
  const safe = (file.name || 'photo.jpg').replace(/[^a-zA-Z0-9._-]/g, '-').slice(-60);
  try {
    const blob = await put(`studio/${safe}`, file, {
      access: 'public',
      addRandomSuffix: true,
      contentType: file.type,
    });
    return reply(200, { url: blob.url, name: file.name, bytes: file.size });
  } catch (err) {
    return reply(502, {
      error: 'upload-failed',
      message: err instanceof Error ? err.message : 'Storage rejected the upload.',
    });
  }
}
