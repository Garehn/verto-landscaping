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
  { src: 'public/images/real/facade.jpg', out: 'svc-design.jpg',
    prompt: 'A landscape architect drafting table photographed from above: a hand-drawn pencil master plan of this exact property front garden and driveway, tracing paper, scale ruler, pencil, small stone and timber material samples on the plan. Warm daylight, photorealistic.' },
  { src: 'public/images/real/driveway.jpg', out: 'svc-construct.jpg',
    prompt: 'Mid-construction photo of this exact same cobblestone driveway being built: cobbles part-laid on a sand screed, string lines, rubber mallet, kneepads, a landscaper working with hands visible only, no face. Overcast working light, photorealistic.' },
  { src: 'public/images/real/planting.jpg', out: 'svc-planting.jpg',
    prompt: 'Close photo at this exact same sandstone-edged garden bed during planting day: gloved hands settling a young magnolia into open dark soil, plants in nursery pots waiting alongside, no face visible. Soft daylight, photorealistic.' },
  { src: 'public/images/real/facade.jpg', out: 'svc-care.jpg',
    prompt: 'Maintenance visit at this exact same front garden: a gardener hand-pruning the olive tree with secateurs, pruning sheet on the path, no face visible. Morning light, photorealistic.' },
  { src: 'public/images/real/facade.jpg', out: 'before-facade.jpg',
    prompt: 'Edit this photo into a convincing before-landscaping version of the SAME house from the SAME angle: old cracked concrete path, patchy dead lawn, weeds, no garden beds or planting, bare tired frontage. Keep the house recognisable. Dull overcast light, photorealistic.' },
  { src: 'public/images/real/driveway.jpg', out: 'angle-arrival-2.jpg',
    prompt: 'This exact same cobblestone driveway and front garden at dusk, different camera angle from the garage looking out: low garden lighting glowing along the beds, warm sky. Same materials and planting, photorealistic.' },
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
