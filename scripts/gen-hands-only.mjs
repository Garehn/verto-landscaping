// Generate project-page imagery via fal.ai nano-banana edit:
// "before" degradations + alternate angles, all seeded from the real photos.
import fs from 'node:fs';

const KEY = fs.readFileSync('.env.local', 'utf8').match(/^FAL_KEY=(.+)$/m)?.[1]?.trim();
const MODEL = 'fal-ai/nano-banana/edit';
const OUT = 'public/images/real/gen';
fs.mkdirSync(OUT, { recursive: true });

const BEFORE =
  'Edit this photo into a convincing "before landscaping renovation" version of the SAME property from the SAME camera angle: strip out all finished landscaping — patchy dead lawn, bare compacted dirt, weeds, old cracked concrete, no plants or pots, tired neglected yard, dull overcast light. Keep the house/structures recognisable. Photorealistic.';

const jobs = [
  { src: 'public/images/real/driveway.jpg', out: 'svc-construct.jpg',
    prompt: 'Mid-construction close-up photo of this exact same cobblestone driveway being built: ONLY two hands wearing sturdy work gloves setting a cobble onto the sand screed, string lines and rubber mallet nearby. Absolutely no people, no faces, no heads, no bodies in frame, hands and forearms only. Overcast working light, photorealistic.' },
  { src: 'public/images/real/facade.jpg', out: 'svc-care.jpg',
    prompt: 'Maintenance close-up at this exact same front garden: ONLY two hands wearing gardening gloves pruning the olive tree with secateurs, foliage and the white house softly blurred behind. Absolutely no people, no faces, no heads, no bodies in frame, gloved hands and forearms only. Morning light, photorealistic.' },
];

async function run(job) {
  const b64 = fs.readFileSync(job.src).toString('base64');
  const submit = await fetch(`https://queue.fal.run/${MODEL}`, {
    method: 'POST',
    headers: { Authorization: `Key ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: job.prompt,
      image_urls: [`data:image/jpeg;base64,${b64}`],
      num_images: 1,
      output_format: 'jpeg',
    }),
  });
  if (!submit.ok) { console.log('SUBMIT FAIL', job.out, submit.status, (await submit.text()).slice(0, 200)); return; }
  const { request_id } = await submit.json();
  const base = `https://queue.fal.run/${MODEL.split('/').slice(0, 2).join('/')}/requests/${request_id}`;
  for (let i = 0; i < 60; i++) {
    await new Promise((r) => setTimeout(r, 5000));
    const st = await (await fetch(`${base}/status`, { headers: { Authorization: `Key ${KEY}` } })).json();
    if (st.status === 'COMPLETED') break;
    if (st.status === 'FAILED' || st.status === 'ERROR') { console.log('GEN FAIL', job.out); return; }
  }
  const out = await (await fetch(base, { headers: { Authorization: `Key ${KEY}` } })).json();
  const url = out?.images?.[0]?.url;
  if (!url) { console.log('NO URL', job.out, JSON.stringify(out).slice(0, 200)); return; }
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  fs.writeFileSync(`${OUT}/${job.out}`, buf);
  console.log('saved', job.out, (buf.length / 1024) | 0, 'KB');
}

for (const job of jobs) await run(job);
console.log('ALL DONE');
