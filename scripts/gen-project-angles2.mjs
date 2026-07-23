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
  { src: 'public/images/real/pool.jpg', out: 'angle-pool-2.jpg',
    prompt: 'Generate a completely different camera angle of this exact same infinity pool project: low close-up shot skimming across the water surface at pool-coping level, stone edge and olive pots out of focus in foreground, harbour valley in the distance. Same materials and light. Photorealistic, shallow depth of field.' },
  { src: 'public/images/real/pool.jpg', out: 'angle-pool-3.jpg',
    prompt: 'Generate a completely different camera angle of this exact same infinity pool project: aerial drone view from directly above, showing the full rectangular pool, pale stone surrounds, boundary wall with three potted olives, and the lawn edge. Same materials and light. Photorealistic.' },
  { src: 'public/images/real/deck.jpg', out: 'angle-deck-2.jpg',
    prompt: 'Generate a completely different camera angle of this exact same hardwood deck project: ground-level close-up along the deck boards at dusk, warm lighting, the white outdoor chairs and glass pool fence softly blurred beyond, pool water glowing. Same timber and furniture. Photorealistic, shallow depth of field.' },
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
