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

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  year: string;
  scope: string[];
  blurb: string;
  intro: string;
  body: string[];
  images: string[];
};

// Five completed projects. Every image inside a project is the same site.
export const projects: Project[] = [
  {
    id: 'castlecrag-terrace',
    title: 'Pool & harbour terrace',
    subtitle: 'Stone on the edge',
    location: 'Castlecrag, NSW',
    year: '2025',
    scope: ['Design', 'Pool surrounds', 'Stone paving'],
    blurb:
      'An infinity edge cut into the slope, pale stone surrounds, and a terrace set out to run straight at the water.',
    intro:
      'The best view on the street sat behind a tired paved terrace with nothing to frame it. The brief was a pool that would sit in the view rather than in front of it.',
    body: [
      'We cut the pool into the existing level so the water line reads flat against the harbour, then rebuilt the terrace around it. The surrounds are a pale sandstone laid to a tight joint, set out from the pool edge so every course runs parallel to the water rather than to the house.',
      'Falls are carried away from the coping into a subsurface line at the boundary wall, which keeps the stone dry underfoot and the joints clean. The boundary wall was rebuilt and capped in the same stone to close the composition.',
      'Everything above ground is quiet on purpose. One material, one colour, and a single strong horizontal so the view does the work.',
    ],
    images: [
      '/images/real/pool.jpg',
      '/images/real/gen/angle-pool-2.jpg',
      '/images/projects/terrace-4.jpg',
      '/images/projects/terrace-5.jpg',
      '/images/real/gen/angle-pool-3.jpg',
      '/images/projects/terrace-6.jpg',
    ],
  },
  {
    id: 'middle-cove-deck',
    title: 'Hardwood pool deck',
    subtitle: 'An outdoor room',
    location: 'Middle Cove, NSW',
    year: '2025',
    scope: ['Decking', 'Glass fencing', 'Stone coping'],
    blurb:
      'A wide hardwood deck laid flush with the interior floor, wrapping a pool the family could barely reach before.',
    intro:
      'The house opened straight onto a pool with no deck, no shade and nowhere to sit. The owners asked for an outdoor room rather than a walkway around the water.',
    body: [
      'The deck is laid flush with the internal floor level so the threshold disappears and the two spaces read as one. Boards run out from the house on a single direction, which pulls the eye toward the water and makes the deck feel wider than it is.',
      'Frameless glass fencing sits on the deck line rather than in front of it, so the barrier does its job without cutting the space in half. Where deck meets pool the hardwood stops against a stone coping with a consistent shadow gap, a detail that hides the movement timber makes through the year.',
      'Lighting is set low into the deck edge and the steps, enough to use the space after dark without lighting the house back at itself.',
    ],
    images: [
      '/images/real/deck.jpg',
      '/images/projects/deck-4.jpg',
      '/images/projects/deck-3.jpg',
      '/images/projects/deck-5.jpg',
      '/images/real/gen/angle-deck-2.jpg',
      '/images/projects/deck-6.jpg',
    ],
  },
  {
    id: 'castlecrag-arrival',
    title: 'Cobblestone arrival court',
    subtitle: 'Worth the address',
    location: 'Castlecrag, NSW',
    year: '2024',
    scope: ['Driveway', 'Stone edging', 'Entry paths'],
    blurb:
      'Granite cobble laid in course, sandstone edge bands, and an entry sequence rebuilt from the street to the door.',
    intro:
      'A cracked concrete drive and a frontage that apologised for the house behind it. The brief came in one line: make the arrival worth the address.',
    body: [
      'The court is granite cobble laid in a running course on a full concrete base, edged with a sandstone band that turns the corner and carries through to the entry path. Setting the cobble in course rather than fan pattern keeps the surface calm enough to read as one plane from the street.',
      'Levels were reworked so water leaves the court at the crossover instead of pooling at the garage, and the whole area drains to a single line under the edge band.',
      'The same stone continues down the side of the house, so the passage reads as part of the arrival rather than a leftover. Low lighting is set into the edge to carry the sequence after dark.',
    ],
    images: [
      '/images/real/driveway.jpg',
      '/images/real/facade.jpg',
      '/images/projects/arrival-6.jpg',
      '/images/real/passage.jpg',
      '/images/real/planting.jpg',
      '/images/real/gen/angle-arrival-2.jpg',
    ],
  },
  {
    id: 'northbridge-terraces',
    title: 'Sandstone terracing',
    subtitle: 'Three levels from one slope',
    location: 'Northbridge, NSW',
    year: '2024',
    scope: ['Retaining walls', 'Sandstone steps', 'Earthworks'],
    blurb:
      'A steep, unusable backyard cut into three sandstone terraces with a full flight of steps climbing between them.',
    intro:
      'The yard fell away so steeply from the house that the family used almost none of it. The brief was to win back level ground without the result reading as a retaining job.',
    body: [
      'We cut the slope into three terraces held by dry-stacked sandstone block. Each wall is founded on engineered footings with an agricultural line and free-draining backfill behind it, so the hydraulic load never reaches the face. The block coursing was set out to keep joint lines running through, and the capping was selected on site.',
      'A single flight of sandstone treads climbs through all three levels on one axis, which gives the yard a spine and makes the height feel deliberate rather than defensive.',
      'The top terrace is a flat lawn platform, the middle a paved sitting level, and the lowest holds the fall at the boundary. Step lighting is recessed into the risers to make the climb safe after dark.',
    ],
    images: [
      '/images/projects/terraces-1.jpg',
      '/images/projects/terraces-2.jpg',
      '/images/projects/terraces-3.jpg',
      '/images/projects/terraces-4.jpg',
      '/images/projects/terraces-5.jpg',
      '/images/projects/terraces-6.jpg',
    ],
  },
  {
    id: 'willoughby-courtyard',
    title: 'Courtyard & screen',
    subtitle: 'A room without a roof',
    location: 'Willoughby, NSW',
    year: '2023',
    scope: ['Bluestone paving', 'Timber screen', 'Stone bench'],
    blurb:
      'Large format bluestone, a full height timber batten screen and a built-in stone bench in a tight rear courtyard.',
    intro:
      'A small walled courtyard hemmed in on three sides, overlooked and unused. The brief was to make it feel like a room rather than the space left over behind the house.',
    body: [
      'Large format bluestone runs the full width in a single direction with a consistent joint, which makes the floor read as one surface and the courtyard read wider. The slabs were set out from the door threshold so the first cut lands at the far wall, not underfoot.',
      'A full height timber batten screen covers the worst of the overlooking without closing the space in. The batten spacing was set on site against the sightlines, close enough for privacy and open enough to keep air and light moving through.',
      'A sandstone bench is built into the base of the screen wall, which gives the courtyard permanent seating without furniture eating the floor. Concealed lighting behind the screen washes the battens after dark and turns the wall into the light source for the whole room.',
    ],
    images: [
      '/images/projects/courtyard-1.jpg',
      '/images/projects/courtyard-2.jpg',
      '/images/projects/courtyard-3.jpg',
      '/images/projects/courtyard-4.jpg',
      '/images/projects/courtyard-5.jpg',
      '/images/projects/courtyard-6.jpg',
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
