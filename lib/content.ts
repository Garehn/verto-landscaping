export const studio = {
  name: 'Verto Landscapes',
  short: 'Verto',
  tagline: 'Gardens that hold time.',
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
  area: 'Castlecrag · Willoughby · Lower North Shore',
};

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Get a quote' },
];

export const home = {
  hero: {
    eyebrow: 'Landscape design & build',
    title: 'Gardens that hold time.',
    sub: 'A small studio building considered outdoor spaces for homes that deserve them.',
  },
  intro:
    'We design and build gardens that settle into a place, quiet compositions of stone, timber, water and planting. The work is slow on purpose. We take on a small number of projects each year, and we stay with them until the planting has rooted.',
  pullQuote:
    'A good garden is the one you forget you have. It is simply there, becoming itself.',
  testimonial: {
    quote:
      'They listened first, drew second, dug third. Two years on the garden is still the best thing we did to the house.',
    author: 'Eleanor M.',
    project: 'Castlecrag, courtyard and rear garden',
  },
};

// The six core capabilities. Shown on the home page near the top.
export const coreServices = [
  {
    id: 'design',
    title: 'Landscape Design',
    body: 'Site survey, master plan and planting design, measured drawings, not mood boards.',
    scope: ['Survey', 'Master plan', 'Planting design'],
    icon: 'design' as const,
  },
  {
    id: 'hardscape',
    title: 'Hardscape Construction',
    body: 'Paving, retaining walls, timber decks, pergolas and outdoor structures.',
    scope: ['Paving', 'Retaining', 'Decks & pergolas'],
    icon: 'hardscape' as const,
  },
  {
    id: 'planting',
    title: 'Planting & Horticulture',
    body: 'Trees, hedges and garden beds, plant palettes built for the soil and climate.',
    scope: ['Trees', 'Hedging', 'Garden beds'],
    icon: 'planting' as const,
  },
  {
    id: 'turf',
    title: 'Lawn & Turf',
    body: 'New lawn installation, renovation and a quarterly care programme.',
    scope: ['New lawns', 'Renovation', 'Care programme'],
    icon: 'turf' as const,
  },
  {
    id: 'irrigation',
    title: 'Irrigation & Drainage',
    body: 'Smart drip and spray systems, stormwater detention and subsurface drainage.',
    scope: ['Drip systems', 'Stormwater', 'Subsurface'],
    icon: 'irrigation' as const,
  },
  {
    id: 'lighting',
    title: 'Garden Lighting',
    body: 'Low-voltage path, feature and architectural lighting, designed and installed.',
    scope: ['Path', 'Feature', 'Architectural'],
    icon: 'lighting' as const,
  },
];

export type CoreServiceIcon = (typeof coreServices)[number]['icon'];

export const services = [
  {
    id: 'design',
    title: 'Garden Design',
    body: 'Site survey, master plan, planting design, and full documentation. We work in measured drawings, not mood boards. You leave with a plan you could hand to any builder, but ideally hand to us.',
    image: 'service_design' as const,
  },
  {
    id: 'build',
    title: 'Landscape Build',
    body: 'Stonework, carpentry, drainage, irrigation, lighting. Our crews are small and they stay on a site until it is done. We use materials that age well, bluestone, timber, mild steel, lime mortar.',
    image: 'service_build' as const,
  },
  {
    id: 'planting',
    title: 'Planting & Horticulture',
    body: 'Plant palettes built for the soil and the climate, not the catalogue. We grow on key specimens at our nursery so they go in mature. Soil first, plants second, most gardens fail underground.',
    image: 'service_planting' as const,
  },
  {
    id: 'care',
    title: 'Ongoing Care',
    body: 'Quarterly visits to edit, prune, feed, and replant. A new garden is half-finished on the day it is planted. Our care plans hold it in shape while it grows in.',
    image: 'service_care' as const,
  },
];

export const process = [
  {
    n: '01',
    title: 'Consultation',
    body: 'A site visit and a long conversation. We walk the garden, look at the house, and ask how you live. By the end we know whether the project is right for both of us.',
    image: 'process_consult' as const,
  },
  {
    n: '02',
    title: 'Design',
    body: 'Survey, concept, master plan, planting plan, lighting plan. Two formal presentations and as many conversations between as the work needs. You sign off before we cost the build.',
    image: 'process_design' as const,
  },
  {
    n: '03',
    title: 'Build',
    body: 'Programmed across stone, structure, soil and planting. One project lead on site every day. Weekly client updates with photographs. We finish what we start.',
    image: 'process_build' as const,
  },
  {
    n: '04',
    title: 'Care',
    body: 'The first year is the one that matters. We visit quarterly, edit the planting, and replace anything that does not establish. By year two the garden is yours to enjoy.',
    image: 'process_care' as const,
  },
];

export const portfolio = [
  {
    id: 'castlecrag-pool',
    title: 'Pool & harbour terrace',
    location: 'Castlecrag, NSW',
    year: '2025',
    image: 'real_pool' as const,
    blurb:
      'An infinity-edge pool set against the harbour valley, pale stone surrounds, potted olives along the boundary.',
    scope: ['Construction', 'Stone', 'Pool surrounds'],
  },
  {
    id: 'castlecrag-deck',
    title: 'Hardwood pool deck',
    location: 'Castlecrag, NSW',
    year: '2025',
    image: 'real_deck' as const,
    blurb:
      'A wide hardwood deck wrapping the pool, glass fencing, sculptural planting, furniture-ready from day one.',
    scope: ['Decking', 'Glass fencing', 'Planting'],
  },
  {
    id: 'castlecrag-arrival',
    title: 'Cobblestone arrival court',
    location: 'Castlecrag, NSW',
    year: '2024',
    image: 'real_driveway' as const,
    blurb:
      'A cobbled arrival court edged in sandstone, olives, magnolias and layered evergreen beds at the boundary.',
    scope: ['Paving', 'Stone', 'Planting'],
  },
];

export const recentJobs = [
  { image: 'slider_1' as const, caption: 'Castlecrag, courtyard at dusk' },
  { image: 'slider_2' as const, caption: 'Middle Cove, native poolside' },
  { image: 'slider_3' as const, caption: 'Northbridge, parterre & olive' },
  { image: 'slider_4' as const, caption: 'Willoughby, kitchen garden' },
  { image: 'slider_5' as const, caption: 'Castle Cove, coastal deck' },
  { image: 'slider_6' as const, caption: 'Northbridge, jacaranda vista' },
  { image: 'portfolio_1' as const, caption: 'Castlecrag, front courtyard' },
  { image: 'portfolio_3' as const, caption: 'Willoughby, terrace' },
];

export const beforeAfters = [
  {
    id: 'ba1',
    label: 'Castlecrag, front yard',
    before: 'ba1_before' as const,
    after: 'ba1_after' as const,
  },
  {
    id: 'ba2',
    label: 'Willoughby, terrace',
    before: 'ba2_before' as const,
    after: 'ba2_after' as const,
  },
  {
    id: 'ba3',
    label: 'Northbridge, entry',
    before: 'ba3_before' as const,
    after: 'ba3_after' as const,
  },
];

export const about = {
  lead:
    'Verto is a landscape design and build studio. We take on a small number of projects a year, and we look after them long after the planting is in.',
  body: [
    'The studio was founded on a simple idea: that a garden is a piece of architecture, and a piece of agriculture, and a piece of someone\'s home, and it deserves to be handled with all three in mind.',
    'We draw in measured plans. We build with crews we have worked with for years. We plant from a nursery we run ourselves, so the trees that go in are not the ones that fit in a ute, they are the ones the garden needed.',
  ],
  pullQuote:
    'We are not the cheapest. We are not the fastest. We are the ones still on the phone in year three.',
  values: [
    {
      title: 'Materials that age',
      body: 'Bluestone, timber, mild steel, lime mortar. Nothing that needs replacing in five years.',
    },
    {
      title: 'Soil first',
      body: 'Most failed gardens fail underground. We spend the budget below grade where it counts.',
    },
    {
      title: 'Slow on purpose',
      body: 'We take six to eight projects a year. Yours is one of them or it is not, we will not stretch.',
    },
  ],
};

export const contact = {
  title: 'Request a quote',
  lead:
    'Tell us about the project. We reply to every enquiry within two business days. If we are not the right fit we will say so, and point you to someone who is.',
};
