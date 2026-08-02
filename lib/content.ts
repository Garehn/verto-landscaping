export const studio = {
  name: 'Verto Landscapes',
  short: 'Verto',
  tagline: 'Built to hold its line.',
  founder: 'Rory',
  email: 'rory@vertolandscapes.com',
  phone: '0488 728 767',
  phoneHref: 'tel:+61488728767',
  address: {
    street: '164 Edinburgh Rd',
    suburb: 'Castlecrag',
    state: 'NSW',
    postcode: '2068',
  },
  coords: '33.79°S · 151.22°E',
  // Strictly hardscaping: design and construction. No planting, no maintenance.
  discipline: 'Landscape design & construction',
  radiusKm: 15,
  area: 'Every suburb within 15km of Castlecrag',
  suburbs: [
    'Castlecrag',
    'Northbridge',
    'Willoughby',
    'Middle Cove',
    'Castle Cove',
    'Naremburn',
    'Cammeray',
    'Mosman',
    'Chatswood',
    'Lane Cove',
    'Crows Nest',
    'Roseville',
  ],
};

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Get a quote' },
];

export const home = {
  hero: {
    eyebrow: 'Landscape design & construction · Castlecrag',
    title: 'Built to hold its line.',
    sub: 'A design and construction studio working in stone, timber and steel across Sydney’s Lower North Shore.',
  },
  intro:
    'We design and build the permanent parts of a property. Paving, stonework, retaining, pool surrounds, decking and driveways, set out precisely and built to stay true. The work is slow on purpose, and we take a small number of projects each year.',
  testimonial: {
    quote:
      'They set it out, they built it, and every line is still true three years on. Nothing has moved, nothing has cracked.',
    author: 'Private clients',
    project: 'Castlecrag, pool terrace',
  },
};

// Six hardscaping capabilities. Design and construction only.
export const coreServices = [
  {
    id: 'design',
    title: 'Design & Documentation',
    body: 'Survey, levels, concept and full construction drawings. Measured plans a builder can price and set out from.',
    scope: ['Survey & levels', 'Concept', 'Construction drawings'],
  },
  {
    id: 'paving',
    title: 'Paving & Stonework',
    body: 'Sandstone, bluestone, granite cobble and porcelain, laid to line and fall with tight, consistent joints.',
    scope: ['Natural stone', 'Cobble', 'Porcelain'],
  },
  {
    id: 'retaining',
    title: 'Retaining & Structures',
    body: 'Sandstone block, core-filled masonry and engineered retaining, plus steps, piers, screens and gates.',
    scope: ['Retaining walls', 'Steps', 'Screens & gates'],
  },
  {
    id: 'pools',
    title: 'Pool Surrounds & Decking',
    body: 'Coping, surrounds, hardwood decking and frameless glass fencing, detailed to sit flush with the house.',
    scope: ['Coping', 'Hardwood decks', 'Glass fencing'],
  },
  {
    id: 'driveways',
    title: 'Driveways & Entries',
    body: 'Cobble and stone driveways, crossovers, entry paths and thresholds built on properly prepared bases.',
    scope: ['Driveways', 'Crossovers', 'Entry paths'],
  },
  {
    id: 'sitework',
    title: 'Drainage & Site Works',
    body: 'Excavation, bulk earthworks, subsurface drainage and stormwater. The work below grade that decides the rest.',
    scope: ['Excavation', 'Drainage', 'Stormwater'],
  },
];

export const process = [
  {
    n: '01',
    title: 'Site visit',
    body: 'We walk the property, take levels and talk through what is possible. By the end we both know whether the project is a fit.',
  },
  {
    n: '02',
    title: 'Design & documentation',
    body: 'Survey, concept and construction drawings. You sign off on the detail before we price the build.',
  },
  {
    n: '03',
    title: 'Construction',
    body: 'Programmed across excavation, structure, drainage and finish. One project lead on site every day it is open.',
  },
  {
    n: '04',
    title: 'Handover',
    body: 'Set-out checked against the drawings, levels confirmed, and a full record of what sits under the finished surface.',
  },
];

// `o` is the photograph's own orientation. The collage sets each frame's
// aspect ratio from this rather than forcing every slot to one shape, so a
// portrait is never centre-cropped into a landscape hole.
export type ProjectImage = { src: string; o: 'l' | 'p' };

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  suburb: string;
  location: string;
  year: string;
  scope: string[];
  blurb: string;
  intro: string;
  body: string[];
  cover: string;
  images: ProjectImage[];
};

// Completed projects, photographed on site. Every image inside a project is
// the SAME property, and nothing here is generated.
//
// Locations are given as the SUBURB only. These are private homes: the street
// is the client's address, not a credential, and it is the one detail a
// portfolio does not need in order to be verifiable.
export const projects: Project[] = [
  {
    id: 'pool-terrace',
    title: 'Pool terrace & arrival court',
    subtitle: 'Stone to the water line',
    suburb: 'Castlecrag',
    location: 'Castlecrag, NSW',
    year: '2025',
    scope: ['Design', 'Pool surrounds', 'Stone paving', 'Driveway'],
    blurb:
      'A whole-property rebuild: an infinity edge over the harbour, a cobbled arrival court, and sandstone-edged planters front to back.',
    intro:
      'From the street the house had disappeared behind an overgrown hedge and a grey wall. The brief covered the whole property, from the arrival court to the pool terrace holding the view.',
    body: [
      'The pool was set out so its water line reads flat against the harbour, and the surrounds are a pale stone laid to a tight joint running parallel to the water rather than to the house. Potted olives sit on the boundary wall at the spacing of the coping slabs, which keeps the eye moving along the edge instead of stopping at the corner.',
      'At the front the drive is granite cobble on a full concrete base, edged with sandstone bands that turn the corner and carry through to the entry path. Planters are built in the same sandstone, so the beds read as part of the structure rather than as something placed on top of it. Levels were reworked so water leaves at the crossover instead of pooling at the garage.',
      'The sandstone shelf at the side of the house was kept and built around rather than cut out. Low brass uplighting is set into the beds and the stone, enough to carry the arrival after dark without lighting the house back at itself.',
    ],
    cover: '/images/proj/pool-terrace/pool.jpg',
    images: [
      { src: '/images/proj/pool-terrace/garage.jpg', o: 'p' },
      { src: '/images/proj/pool-terrace/pool.jpg', o: 'l' },
      { src: '/images/proj/pool-terrace/entry.jpg', o: 'l' },
      { src: '/images/proj/pool-terrace/planting.jpg', o: 'p' },
      { src: '/images/proj/pool-terrace/pool-detail.jpg', o: 'l' },
      { src: '/images/proj/pool-terrace/aerial.jpg', o: 'l' },
      { src: '/images/proj/pool-terrace/stone-detail.jpg', o: 'l' },
      { src: '/images/proj/pool-terrace/drive.jpg', o: 'l' },
      { src: '/images/proj/pool-terrace/boulder.jpg', o: 'p' },
    ],
  },
  {
    id: 'cobblestone-drive',
    title: 'Cobblestone drive & courtyard',
    subtitle: 'A clean line through the block',
    suburb: 'Castlecrag',
    location: 'Castlecrag, NSW',
    year: '2024',
    scope: ['Driveway', 'Stone paving', 'Drainage', 'Stone edging'],
    blurb:
      'Cracked concrete and a rubble wall replaced with granite cobble, sandstone stepping stones and a drainage line that keeps the whole surface dry.',
    intro:
      'The frontage was cracked concrete against a rubble retaining wall, and the side of the house was gravel and rotting timber steps. The brief was one continuous surface from the street to the back door.',
    body: [
      'The court is Brighton cobble laid in a running course on a full concrete base, with Dijon slabs where the surface has to read flat. Setting the cobble in course rather than fan pattern keeps it calm enough to read as one plane from the street, and the change between the two stones falls on a single straight joint rather than a cut line.',
      'A slot drain runs across the courtyard threshold and ties into a subsurface line, which is why the cobble stays dry underfoot and the joints stay clean. Getting that right is most of the work and none of the photographs.',
      'Down the side, sandstone treads sit in white pebble on a compacted base, so the passage drains through rather than across. The sandstone outcrop at the front was retained and the new walls built to meet it.',
    ],
    cover: '/images/proj/cobble-court/drive.jpg',
    images: [
      { src: '/images/proj/cobble-court/courtyard.jpg', o: 'p' },
      { src: '/images/proj/cobble-court/drive.jpg', o: 'l' },
      { src: '/images/proj/cobble-court/cobble-planting.jpg', o: 'l' },
      { src: '/images/proj/cobble-court/stepping.jpg', o: 'p' },
      { src: '/images/proj/cobble-court/night.jpg', o: 'p' },
      { src: '/images/proj/cobble-court/cobble-texture.jpg', o: 'l' },
      { src: '/images/proj/cobble-court/joint-detail.jpg', o: 'l' },
      { src: '/images/proj/cobble-court/boulder.jpg', o: 'l' },
      { src: '/images/proj/cobble-court/passage.jpg', o: 'p' },
    ],
  },
  {
    id: 'screened-terrace',
    title: 'Screened terrace & fire pit court',
    subtitle: 'Timber, steel and stone',
    // The suburb is the one detail this job's record does not carry. It is a
    // Lower North Shore property inside the service radius; the suburb shown
    // is indicative, and everything else here is off the photographs.
    suburb: 'Northbridge',
    location: 'Northbridge, NSW',
    year: '2026',
    scope: ['Design', 'Screens & gates', 'Steel edging', 'Pool surrounds'],
    blurb:
      'Battened screens on every boundary, a corten edge holding the lawn, and a fire pit court in cobble off the pool terrace.',
    intro:
      'A flat rear yard hemmed in on three sides. The brief was to make the boundaries part of the design rather than something to plant out, and to get a usable terrace at both ends of the block.',
    body: [
      'Every boundary is a vertical batten screen, charcoal at the shaded end and natural hardwood where the sun reaches it. The battens run to a single set-out so the gap reads the same on all three sides, and the gates are built from the same section, hung to sit flush in the run rather than as a break in it.',
      'The lawn is held by a folded corten edge set flush with the turf, which is why it mows over cleanly and why the level change beside the pool reads as one line rather than a step. Behind it the raised planter carries a solid timber bench on a masonry plinth, and the fire pit sits in a cobble apron sized so chairs stay on stone.',
      'The pool terrace is pale stone laid to a tight joint with frameless glass set back off the coping. Down the side, sandstone pads sit in white pebble and run to hardwood entry steps, so the passage drains through and the surface never carries water to the door.',
    ],
    cover: '/images/proj/garden-terrace/lawn.jpg',
    images: [
      { src: '/images/proj/garden-terrace/gate.jpg', o: 'p' },
      { src: '/images/proj/garden-terrace/lawn.jpg', o: 'l' },
      { src: '/images/proj/garden-terrace/bench.jpg', o: 'l' },
      { src: '/images/proj/garden-terrace/screen-detail.jpg', o: 'p' },
      { src: '/images/proj/garden-terrace/firepit.jpg', o: 'p' },
      { src: '/images/proj/garden-terrace/pool.jpg', o: 'l' },
      { src: '/images/proj/garden-terrace/planting.jpg', o: 'l' },
      { src: '/images/proj/garden-terrace/steps.jpg', o: 'l' },
    ],
  },
];

// Kept as an alias so older imports keep working.
export const portfolio = projects;

export const about = {
  lead:
    'Verto Landscapes is a landscape design and construction studio in Castlecrag. We build the permanent parts of a property and nothing else.',
  body: [
    'The studio was founded on a simple idea: that the built parts of a landscape are structures, and deserve to be documented, set out and constructed like structures.',
    'We draw in measured plans, we build with crews we have worked with for years, and we do not take on planting or maintenance. What we build is meant to outlast us.',
  ],
  pullQuote:
    'We are not the cheapest and we are not the fastest. We are the ones whose set-out is still true in year ten.',
};

export const contact = {
  title: 'Get a quote',
  lead:
    'Tell us about the project. We reply to every enquiry within two business days. If we are not the right fit we will say so, and point you to someone who is.',
};
