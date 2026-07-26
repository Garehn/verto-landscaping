// Phase 2 with retry + skip-existing: five more angles each for the two new sites,
// seeded from their generated heroes so the property stays consistent.
import fs from 'node:fs';

const KEY = fs.readFileSync('.env.local', 'utf8').match(/^FAL_KEY=(.+)$/m)?.[1]?.trim();
const MODEL = 'fal-ai/nano-banana/edit';
const OUT = 'public/images/projects';
const NO_PEOPLE = 'Absolutely no people, no faces, no heads, no bodies. Photorealistic, high-end architectural photography, natural light.';

async function withRetry(fn, label, tries = 3) {
  for (let i = 1; i <= tries; i++) {
    try { return await fn(); }
    catch (e) {
      console.log(`retry ${i}/${tries} ${label}: ${e.message ?? e}`);
      await new Promise((r) => setTimeout(r, 4000 * i));
    }
  }
  return null;
}

async function gen(seedPath, outName, prompt) {
  const dest = `${OUT}/${outName}.jpg`;
  if (fs.existsSync(dest)) { console.log('skip (exists)', outName); return dest; }
  const b64 = fs.readFileSync(seedPath).toString('base64');

  const request_id = await withRetry(async () => {
    const r = await fetch(`https://queue.fal.run/${MODEL}`, {
      method: 'POST',
      headers: { Authorization: `Key ${KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: `${prompt} ${NO_PEOPLE}`, image_urls: [`data:image/jpeg;base64,${b64}`], num_images: 1, output_format: 'jpeg' }),
    });
    if (!r.ok) throw new Error('submit ' + r.status);
    return (await r.json()).request_id;
  }, `submit ${outName}`);
  if (!request_id) { console.log('SUBMIT GAVE UP', outName); return null; }

  const base = `https://queue.fal.run/${MODEL.split('/').slice(0, 2).join('/')}/requests/${request_id}`;
  for (let i = 0; i < 90; i++) {
    await new Promise((r) => setTimeout(r, 5000));
    const st = await withRetry(async () => {
      const r = await fetch(`${base}/status`, { headers: { Authorization: `Key ${KEY}` } });
      if (!r.ok) throw new Error('status ' + r.status);
      return r.json();
    }, `status ${outName}`);
    if (!st) continue;
    if (st.status === 'COMPLETED') break;
    if (st.status === 'FAILED' || st.status === 'ERROR') { console.log('GEN FAIL', outName); return null; }
  }

  const out = await withRetry(async () => {
    const r = await fetch(base, { headers: { Authorization: `Key ${KEY}` } });
    if (!r.ok) throw new Error('result ' + r.status);
    return r.json();
  }, `result ${outName}`);
  const url = out?.images?.[0]?.url;
  if (!url) { console.log('NO URL', outName); return null; }
  const buf = await withRetry(async () => Buffer.from(await (await fetch(url)).arrayBuffer()), `download ${outName}`);
  if (!buf) return null;
  fs.writeFileSync(dest, buf);
  console.log('saved', outName, (buf.length / 1024) | 0, 'KB');
  return dest;
}

const jobs = [
  [`${OUT}/terraces-1.jpg`, 'terraces-2', 'This exact same sandstone terrace project, camera looking straight up the flight of sandstone steps from the lowest terrace.'],
  [`${OUT}/terraces-1.jpg`, 'terraces-3', 'This exact same project, tight detail of the dry-stacked sandstone retaining wall coursing and the capping stone.'],
  [`${OUT}/terraces-1.jpg`, 'terraces-4', 'This exact same project seen from the top lawn terrace looking back down over the walls to the yard below.'],
  [`${OUT}/terraces-1.jpg`, 'terraces-5', 'This exact same project, three-quarter view along one retaining wall showing how the steps cut through it.'],
  [`${OUT}/terraces-1.jpg`, 'terraces-6', 'This exact same terraced yard at dusk, low step lighting washing down the sandstone treads.'],
  [`${OUT}/courtyard-1.jpg`, 'courtyard-2', 'This exact same walled courtyard, camera low across the bluestone paving toward the timber batten screen.'],
  [`${OUT}/courtyard-1.jpg`, 'courtyard-3', 'This exact same courtyard, tight detail of the built-in sandstone bench meeting the bluestone paving.'],
  [`${OUT}/courtyard-1.jpg`, 'courtyard-4', 'This exact same courtyard seen from the opposite corner, showing the full run of the batten screen and the wall return.'],
  [`${OUT}/courtyard-1.jpg`, 'courtyard-5', 'This exact same courtyard, tight detail of the timber batten screen, the shadow gaps and the fixing rhythm.'],
  [`${OUT}/courtyard-1.jpg`, 'courtyard-6', 'This exact same courtyard at dusk, concealed lighting behind the batten screen glowing, paving wet-look after rain.'],
];

// Run in small batches so one flaky connection cannot take the whole run down.
for (let i = 0; i < jobs.length; i += 4) {
  const batch = jobs.slice(i, i + 4);
  console.log(`batch ${i / 4 + 1}: ${batch.map((b) => b[1]).join(', ')}`);
  await Promise.all(batch.map(([s, o, p]) => gen(s, o, p)));
}
console.log('PHASE 2 DONE');
