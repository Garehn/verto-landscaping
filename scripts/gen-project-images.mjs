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
  { src: 'public/images/real/pool.jpg', out: 'before-pool.jpg', prompt: BEFORE },
  { src: 'public/images/real/deck.jpg', out: 'before-deck.jpg', prompt: BEFORE },
  { src: 'public/images/real/driveway.jpg', out: 'before-driveway.jpg', prompt: BEFORE },
  { src: 'public/images/real/pool.jpg', out: 'angle-pool-2.jpg',
    prompt: 'Same garden project, different camera angle: closer along the pool edge showing stone coping, water surface and the potted olive trees on the boundary wall, harbour valley beyond. Same materials, same golden light, photorealistic.' },
  { src: 'public/images/real/pool.jpg', out: 'angle-pool-3.jpg',
    prompt: 'Same garden project, different camera angle: from the far corner of the pool terrace looking back toward the house and glass doors. Same materials and planting, same light, photorealistic.' },
  { src: 'public/images/real/deck.jpg', out: 'angle-deck-2.jpg',
    prompt: 'Same project, different camera angle: closer view across the hardwood deck boards toward the white outdoor chairs and glass pool fence, hedges beyond. Same timber tone, same soft light, photorealistic.' },
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
