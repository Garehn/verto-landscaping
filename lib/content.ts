export const studio = {
  name: 'Verto Landscapes',
  short: 'Verto',
  tagline: 'Built to hold its line.',
  founder: 'Rory',
  email: 'rory@vertolandscapes.com',
  phone: '0488 728 767',
  phoneHref: 'tel:+61488728767',
  coords: '33.79°S · 151.22°E',
  discipline: 'Landscape design & construction',
  // No street address is published. The studio is described by the ground it
  // covers instead.
  region: 'Lower North Shore & Northern Beaches',
  area: 'Anywhere within the Lower North Shore and Northern Beaches',
  suburbs: [
    'Castlecrag',
    'Northbridge',
    'Willoughby',
    'Mosman',
    'Cremorne',
    'Seaforth',
    'Balgowlah',
    'Manly',
    'Curl Curl',
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
    'We design and build the permanent parts of a property. Paving, stonework, retaining, pool surrounds, decking, driveways and planting, set out precisely and built to stay true. Anything you can imagine we can create.',
  testimonial: {
    quote:
      'They set it out, they built it, and every line is still true three years on. Gardens have flourished and we could be happier.',
    author: 'Private clients',
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
    title: 'Pool Terrace & Front Landscaping',
    subtitle: 'Stone to the water line',
    suburb: 'Castlecrag',
    location: 'Castlecrag, NSW',
    year: '2026',
    scope: ['Design', 'Pool surrounds', 'Cobblestone driveway', 'Cladding', 'Planting & lighting'],
    blurb:
      'Full property rebuild designed around an infinity pool with large street appeal. From a cobblestone driveway, cladding and stone edging to plants and lighting.',
    intro:
      'From the street the house had disappeared behind overgrown hedges and timber trellis. The brief covered the whole property, from the arrival court to the pool terrace holding the view.',
    body: [
      'The pool was set out so its water line reads flat against the harbour, and the surrounds are a pale stone laid to a tight joint running parallel to the water rather than to the house. Potted olives sit on the boundary wall at the spacing of the coping slabs, which keeps the eye moving along the edge instead of stopping at the corner.',
      'At the front of the drive are cobblestones on a reinforced concrete base, edged with sandstone bands that turn the corner and carry through to the entry path. Planters are built in the same sandstone, so the beds read as part of the structure rather than as something placed on top of it. Levels were reworked so water leaves at the crossover instead of pooling at the garage.',
      'The limestone cladding at the front of the house was created as a feature wall to soften the house, with aged brass uplighting set into the beds and the stone.',
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
    title: 'Cobblestone Drive & Courtyard',
    subtitle: 'A clean line through the block',
    suburb: 'Castlecrag',
    location: 'Castlecrag, NSW',
    year: '2025',
    scope: ['Driveway', 'Stone paving', 'Hardwood timber works', 'Garage rebuild including cabinetry', 'House painting / gutter works', 'Pool surrounds including planting and lighting'],
    blurb:
      'New concrete driveway topped with cobblestone, surrounding a new garage cladded in aluminium battens to suit the hardwood privacy screens around the property.',
    intro:
      'The frontage was concrete pavers on a sand base against a rubble retaining wall, the garage was open to the weather, and the rear yard sat hemmed in on three sides. The brief ran the whole property: one continuous surface from the street to the back door, and boundaries built as part of the design rather than something to plant out. This project also included a full house paint and window repairs, coupled with all new gutters and downpipes around the property.',
    body: [
      'The driveway has been topped with cobblestone laid in a running course on a full reinforced concrete base, with limestone format pavers inside the garage. The cobblestones tie this property into its new life, as the street appeal is second to none and frames the extensive house and garage works completed by us. The new garage is cladded in aluminium battens set to the same rhythm as the hardwood around the property.',
      'The entire property was re-fenced, removing the old brushwood fencing. The contrast between the hardwood and treated pine palings creates a delineation between the modern oasis of the pool area and the rustic fire pit space we created. Any overgrown, un-utilised area let us express our vision for another entertaining space, to get our clients outside looking down at their beautiful backyard.',
      'Our goal was to create more usable space but at the same time create a sense of order and cleanliness. All areas were revised and delineated into sections with clear areas.',
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
    'Our passion for creating outdoor living spaces and street appeal drives us to provide these amazing services. Adding value to your home and a place to enjoy outside.',
};

export const contact = {
  title: 'Get a quote',
  lead:
    'Tell us about the project. We reply to every enquiry within two business days. If we are not the right fit we will say so, and point you to someone who is.',
};
