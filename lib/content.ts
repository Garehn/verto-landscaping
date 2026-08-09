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
  discipline: 'Landscape design & construction',
  radiusKm: 15,
  area: 'Every suburb within 15km of the studio',
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
    eyebrow: 'Landscape design & construction · Sydney',
    title: 'Built to hold its line.',
    sub: 'A design and construction studio working in stone, timber and steel across Sydney’s Lower North Shore.',
  },
  intro:
    'We design and build the permanent parts of a property. Paving, stonework, retaining, pool surrounds, decking, driveways and planting, set out precisely and built to stay true. The work is slow on purpose, and we take a small number of projects each year.',
  testimonial: {
    quote:
      'They set it out, they built it, and every line is still true three years on. Nothing has moved, nothing has cracked.',
    author: 'Private clients',
    project: 'Pool terrace',
  },
};

// Six capabilities. Design and construction.
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
    body: 'Pool tiling and remediation works, hardwood decking, and all aspects of pool fencing from glass to stainless steel.',
    scope: ['Pool tiling', 'Hardwood decks', 'Glass & steel fencing'],
  },
  {
    id: 'driveways',
    title: 'Driveways & Frontages',
    body: 'Concrete and stone driveways, crossovers, full landscape frontages, garages, carports and pergolas.',
    scope: ['Driveways', 'Crossovers', 'Garages & carports'],
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
    title: 'Pool terrace & front landscaping',
    subtitle: 'Stone to the water line',
    suburb: 'Castlecrag',
    location: 'Castlecrag, NSW',
    year: '2026',
    scope: ['Design', 'Pool surrounds', 'Cobblestone driveway', 'Planting & lighting'],
    blurb:
      'Full property rebuild designed around an infinity pool with large street appeal. From a cobblestone driveway, cladding and stone edging to plants and lighting.',
    intro:
      'From the street the house had disappeared behind an overgrown hedge and a grey wall. The brief covered the whole property, from the arrival court to the pool terrace holding the view.',
    body: [
      'The pool was set out so its water line reads flat against the harbour, and the surrounds are a pale stone laid to a tight joint running parallel to the water rather than to the house. Potted olives sit on the boundary wall at the spacing of the coping slabs, which keeps the eye moving along the edge instead of stopping at the corner.',
      'At the front the drive is granite cobble on a full concrete base, edged with sandstone bands that turn the corner and carry through to the entry path. Planters are built in the same sandstone, so the beds read as part of the structure rather than as something placed on top of it. Levels were reworked so water leaves at the crossover instead of pooling at the garage.',
      'The sandstone shelf at the side of the house was kept and built around rather than cut out. Low brass uplighting is set into the beds and the stone, enough to carry the arrival after dark without lighting the house back at itself.',
    ],
    cover: '/images/proj/pool-terrace/entry-path.jpg',
    images: [
      { src: '/images/proj/pool-terrace/garage.jpg', o: 'p' },
      { src: '/images/proj/pool-terrace/pool.jpg', o: 'l' },
      { src: '/images/proj/pool-terrace/entry.jpg', o: 'l' },
      { src: '/images/proj/pool-terrace/entry-tall.jpg', o: 'p' },
      { src: '/images/proj/pool-terrace/pool-detail.jpg', o: 'l' },
      { src: '/images/proj/pool-terrace/aerial.jpg', o: 'l' },
      { src: '/images/proj/pool-terrace/stone-detail.jpg', o: 'l' },
      { src: '/images/proj/pool-terrace/drive.jpg', o: 'l' },
      { src: '/images/proj/pool-terrace/pool-inside.jpg', o: 'p' },
    ],
  },
  {
    id: 'cobblestone-drive',
    title: 'Cobblestone drive & courtyard',
    subtitle: 'A clean line through the block',
    suburb: 'Castlecrag',
    location: 'Castlecrag, NSW',
    year: '2024',
    scope: ['Driveway', 'Stone paving', 'Screens & gates', 'Pool surrounds'],
    blurb:
      'New concrete driveway topped with cobblestone, surrounding a new garage clad in aluminium battens to suit the hardwood privacy screens around the property.',
    intro:
      'The frontage was cracked concrete against a rubble retaining wall, the garage was open to the weather, and the rear yard sat hemmed in on three sides. The brief ran the whole property: one continuous surface from the street to the back door, and boundaries built as part of the design rather than something to plant out.',
    body: [
      'The court is Brighton cobble laid in a running course on a full concrete base, with Dijon slabs where the surface has to read flat. Setting the cobble in course rather than fan pattern keeps it calm enough to read as one plane from the street, and the change between the two stones falls on a single straight joint rather than a cut line. The new garage is clad in aluminium battens set to the same rhythm as the hardwood screens further into the property.',
      'Every boundary is a vertical batten screen, charcoal at the shaded end and natural hardwood where the sun reaches it. The battens run to a single set-out so the gap reads the same on all three sides, and the gates are built from the same section, hung to sit flush in the run rather than as a break in it. The lawn is held by a folded corten edge set flush with the turf, which is why it mows over cleanly and why the level change beside the pool reads as one line rather than a step.',
      'A slot drain runs across the courtyard threshold and ties into a subsurface line, which is why the cobble stays dry underfoot and the joints stay clean. Getting that right is most of the work and none of the photographs. Down the side, sandstone pads sit in white pebble and run to hardwood entry steps, so the passage drains through rather than across, and the pool terrace is pale stone laid to a tight joint with frameless glass set back off the coping.',
    ],
    cover: '/images/proj/cobble-court/drive-garage.jpg',
    images: [
      { src: '/images/proj/garden-terrace/gate.jpg', o: 'p' },
      { src: '/images/proj/cobble-court/drive.jpg', o: 'l' },
      { src: '/images/proj/garden-terrace/lawn.jpg', o: 'l' },
      { src: '/images/proj/garden-terrace/screen-detail.jpg', o: 'p' },
      { src: '/images/proj/garden-terrace/firepit.jpg', o: 'p' },
      { src: '/images/proj/cobble-court/cobble-texture.jpg', o: 'l' },
      { src: '/images/proj/garden-terrace/bench.jpg', o: 'l' },
      { src: '/images/proj/cobble-court/roof-view.jpg', o: 'l' },
      { src: '/images/proj/cobble-court/courtyard.jpg', o: 'p' },
    ],
  },
];

// Before and after, each pair shot from the same position on the same site.
// site-a is the pool terrace; site-b is the cobblestone property, which is why
// the batten-screen yard and the cobble drive appear under one project.
export const beforeAfter = [
  {
    id: 'frontage',
    label: 'The frontage',
    before: '/images/proj/before/site-a-street.jpg',
    after: '/images/proj/pool-terrace/street-entry.jpg',
    beforeAlt: 'The frontage before the works, the house hidden behind an overgrown hedge and a grey wall',
    afterAlt: 'The frontage after the works: rendered walls, a stone entry path and planted beds',
  },
  {
    id: 'garage',
    label: 'The garage and drive',
    before: '/images/proj/before/site-b-yard.jpg',
    after: '/images/proj/cobble-court/garage-interior.jpg',
    beforeAlt: 'The garage before the works, an open roller door over a cracked concrete apron',
    afterAlt: 'The same view after: the rebuilt garage, lined and finished, over a cobblestone apron',
  },
  {
    id: 'yard',
    label: 'The rear yard',
    before: '/images/proj/before/site-b-drive.jpg',
    after: '/images/proj/garden-terrace/bench.jpg',
    beforeAlt: 'The rear yard before the works, lawn running to a rubble edge and an ageing timber pool surround',
    afterAlt: 'The rear yard after: lawn held by a folded steel edge, a raised planter and a timber bench against the batten screen',
  },
  {
    id: 'passage',
    label: 'The side passage',
    before: '/images/proj/before/site-b-passage-2.jpg',
    after: '/images/proj/garden-terrace/steps.jpg',
    beforeAlt: 'The side passage before the works, loose pavers against a brush fence and worn timber steps',
    afterAlt: 'The same view after: hardwood steps and sandstone pads set in white pebble',
  },
];

// Kept as an alias so older imports keep working.
export const portfolio = projects;

export const about = {
  lead:
    'Verto Landscapes is a landscape design and construction studio on Sydney’s Lower North Shore. We build the permanent parts of a property, and the planting that sits against them.',
  body: [
    'The studio was founded on a simple idea: that the built parts of a landscape are structures, and deserve to be documented, set out and constructed like structures.',
    'We draw in measured plans and we build with crews we have worked with for years, across both the hard landscape and the soft. What we build is meant to outlast us.',
  ],
  pullQuote:
    'We are not the cheapest and we are not the fastest. We are the ones whose set-out is still true in year ten.',
};

export const contact = {
  title: 'Get a quote',
  lead:
    'Tell us about the project. We reply to every enquiry within two business days. If we are not the right fit we will say so, and point you to someone who is.',
};
