// Generate imagery for 5 hardscaping projects, 6 images each, all site-consistent.
// Sites 1-3 are seeded from Verto's real photography; sites 4-5 get a generated
// hero first, then every other angle is seeded from that hero so the property
// stays consistent across all six frames.
import fs from 'node:fs';

const KEY = fs.readFileSync('.env.local', 'utf8').match(/^FAL_KEY=(.+)$/m)?.[1]?.trim();
const MODEL = 'fal-ai/nano-banana/edit';
const OUT = 'public/images/projects';
fs.mkdirSync(OUT, { recursive: true });

const NO_PEOPLE = 'Absolutely no people, no faces, no heads, no bodies. Photorealistic, high-end architectural photography, natural light.';

async function gen(seedPath, outName, prompt) {
  const b64 = fs.readFileSync(seedPath).toString('base64');
  const submit = await fetch(`https://queue.fal.run/${MODEL}`, {
    method: 'POST',
    headers: { Authorization: `Key ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: `${prompt} ${NO_PEOPLE}`,
      image_urls: [`data:image/jpeg;base64,${b64}`],
      num_images: 1,
      output_format: 'jpeg',
    }),
  });
  if (!submit.ok) { console.log('SUBMIT FAIL', outName, submit.status); return null; }
  const { request_id } = await submit.json();
  const base = `https://queue.fal.run/${MODEL.split('/').slice(0, 2).join('/')}/requests/${request_id}`;
  for (let i = 0; i < 90; i++) {
    await new Promise((r) => setTimeout(r, 5000));
    const st = await (await fetch(`${base}/status`, { headers: { Authorization: `Key ${KEY}` } })).json();
    if (st.status === 'COMPLETED') break;
    if (st.status === 'FAILED' || st.status === 'ERROR') { console.log('GEN FAIL', outName); return null; }
  }
  const out = await (await fetch(base, { headers: { Authorization: `Key ${KEY}` } })).json();
  const url = out?.images?.[0]?.url;
  if (!url) { console.log('NO URL', outName); return null; }
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  const dest = `${OUT}/${outName}.jpg`;
  fs.writeFileSync(dest, buf);
  console.log('saved', outName, (buf.length / 1024) | 0, 'KB');
  return dest;
}

const R = 'public/images/real';

// ---- Phase 1: angles for the three real sites + heroes for the two new sites
const phase1 = [
  // Site 1, infinity pool terrace (seed: real pool photo)
  [`${R}/pool.jpg`, 'terrace-4', 'Tight detail of the pool edge on this exact project: stone coping slab, the waterline tile, still water. Same pale stone and finishes.'],
  [`${R}/pool.jpg`, 'terrace-5', 'This exact same pool terrace, camera low along the stone paving, showing the paving joints and the boundary wall running to the view.'],
  [`${R}/pool.jpg`, 'terrace-6', 'This exact same pool terrace at dusk, warm terrace lighting washing the stone, harbour lights in the valley beyond.'],
  // Site 2, hardwood pool deck (seed: real deck photo)
  [`${R}/deck.jpg`, 'deck-3', 'Tight detail on this exact project: the hardwood deck boards meeting the stone pool coping, board ends and the shadow line between materials.'],
  [`${R}/deck.jpg`, 'deck-4', 'This exact same hardwood deck seen from the far corner of the pool, frameless glass fencing and the house behind.'],
  [`${R}/deck.jpg`, 'deck-5', 'This exact same project, the timber steps down from the deck to the stone pool surround, close three-quarter view.'],
  [`${R}/deck.jpg`, 'deck-6', 'This exact same deck at dusk, low deck lighting raking across the boards, pool glowing beyond the glass.'],
  // Site 3, cobblestone arrival court (seed: real driveway photo)
  [`${R}/driveway.jpg`, 'arrival-6', 'Tight detail on this exact driveway: granite cobble coursing meeting the sandstone edge band, showing the joint lines and stone texture.'],
  // Site 4 hero, sandstone terracing (seed: real facade for the local architectural character)
  [`${R}/facade.jpg`, 'terraces-1', 'Transform into a different property nearby: a steep backyard rebuilt as three sandstone retaining terraces, wide sandstone steps climbing between them, a level lawn terrace at the top, rendered white house above. Sydney North Shore, late afternoon.'],
  // Site 5 hero, walled courtyard (seed: real passage for material continuity)
  [`${R}/passage.jpg`, 'courtyard-1', 'Transform into a different property nearby: a walled rear courtyard with large-format bluestone paving, a full-height timber batten screen on one wall, and a built-in sandstone bench. Sydney North Shore, soft afternoon light.'],
];

console.log('phase 1: 11 images');
await Promise.all(phase1.map(([s, o, p]) => gen(s, o, p)));

// ---- Phase 2: five more angles each for the two new sites, seeded from their heroes
const terracesHero = `${OUT}/terraces-1.jpg`;
const courtyardHero = `${OUT}/courtyard-1.jpg`;
const phase2 = [];
if (fs.existsSync(terracesHero)) {
  phase2.push(
    [terracesHero, 'terraces-2', 'This exact same sandstone terrace project, camera looking straight up the flight of sandstone steps from the lowest terrace.'],
    [terracesHero, 'terraces-3', 'This exact same project, tight detail of the dry-stacked sandstone retaining wall coursing and the capping stone.'],
    [terracesHero, 'terraces-4', 'This exact same project seen from the top lawn terrace looking back down over the walls to the yard below.'],
    [terracesHero, 'terraces-5', 'This exact same project, three-quarter view along one retaining wall showing how the steps cut through it.'],
    [terracesHero, 'terraces-6', 'This exact same terraced yard at dusk, low step lighting washing down the sandstone treads.'],
  );
}
if (fs.existsSync(courtyardHero)) {
  phase2.push(
    [courtyardHero, 'courtyard-2', 'This exact same walled courtyard, camera low across the bluestone paving toward the timber batten screen.'],
    [courtyardHero, 'courtyard-3', 'This exact same courtyard, tight detail of the built-in sandstone bench meeting the bluestone paving.'],
    [courtyardHero, 'courtyard-4', 'This exact same courtyard seen from the opposite corner, showing the full run of the batten screen and the wall return.'],
    [courtyardHero, 'courtyard-5', 'This exact same courtyard, tight detail of the timber batten screen, the shadow gaps and the fixing rhythm.'],
    [courtyardHero, 'courtyard-6', 'This exact same courtyard at dusk, concealed lighting behind the batten screen glowing, paving wet-look after rain.'],
  );
}

console.log('phase 2:', phase2.length, 'images');
await Promise.all(phase2.map(([s, o, p]) => gen(s, o, p)));
console.log('ALL DONE');
