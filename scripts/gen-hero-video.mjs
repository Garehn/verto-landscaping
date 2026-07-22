// Generate the hero video via fal.ai Kling image-to-video, seeded from the
// site's own hero photograph so the motion is perfectly on-brand.
// Usage: node scripts/gen-hero-video.mjs
import fs from 'node:fs';
import path from 'node:path';

const KEY = fs
  .readFileSync('.env.local', 'utf8')
  .match(/^FAL_KEY=(.+)$/m)?.[1]
  ?.trim();
if (!KEY) throw new Error('FAL_KEY missing from .env.local');

const MODEL = 'fal-ai/kling-video/v2.5-turbo/pro/image-to-video';
const img = fs.readFileSync('public/images/hero.jpg');
const dataUri = `data:image/jpeg;base64,${img.toString('base64')}`;

const input = {
  image_url: dataUri,
  prompt:
    'Cinematic establishing shot of this manicured Australian garden. Extremely slow, subtle camera dolly forward. Gentle breeze moves leaves and branches softly. Golden hour light shifts almost imperceptibly. Photorealistic, calm, high-end architectural film. No people, no text.',
  duration: '10',
  negative_prompt: 'people, text, watermark, warping, morphing, fast motion, camera shake',
};

console.log('submitting to', MODEL);
const submit = await fetch(`https://queue.fal.run/${MODEL}`, {
  method: 'POST',
  headers: { Authorization: `Key ${KEY}`, 'Content-Type': 'application/json' },
  body: JSON.stringify(input),
});
if (!submit.ok) {
  console.error('SUBMIT FAILED', submit.status, await submit.text());
  process.exit(1);
}
const { request_id, status_url, response_url } = await submit.json();
console.log('queued', request_id);

const statusUrl = status_url ?? `https://queue.fal.run/${MODEL}/requests/${request_id}/status`;
const resultUrl = response_url ?? `https://queue.fal.run/${MODEL}/requests/${request_id}`;

for (let i = 0; i < 120; i++) {
  await new Promise((r) => setTimeout(r, 10000));
  const st = await fetch(statusUrl, { headers: { Authorization: `Key ${KEY}` } });
  const js = await st.json();
  process.stdout.write(`\r${js.status}   attempt ${i + 1}    `);
  if (js.status === 'COMPLETED') break;
  if (js.status === 'FAILED' || js.status === 'ERROR') {
    console.error('\nGENERATION FAILED', JSON.stringify(js));
    process.exit(1);
  }
}

const res = await fetch(resultUrl, { headers: { Authorization: `Key ${KEY}` } });
const out = await res.json();
const videoUrl = out?.video?.url ?? out?.response?.video?.url;
if (!videoUrl) {
  console.error('\nNo video url in result:', JSON.stringify(out).slice(0, 600));
  process.exit(1);
}
console.log('\ndownloading', videoUrl.slice(0, 80));
const vid = await fetch(videoUrl);
const buf = Buffer.from(await vid.arrayBuffer());
fs.mkdirSync('public/video', { recursive: true });
fs.writeFileSync('public/video/hero-raw.mp4', buf);
console.log('saved public/video/hero-raw.mp4', (buf.length / 1e6).toFixed(1), 'MB');
