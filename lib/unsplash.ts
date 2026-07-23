// Site imagery — locally hosted, generated for the studio.
// Files live in /public/images/{slot}.jpg.

const local = (slot: string) => `/images/${slot}.jpg`;

export const images = {
  hero: {
    src: local('hero'),
    alt: 'Wide cinematic view of a modern Sydney garden at golden hour, bluestone paving, sandstone seating, mature plantings',
  },
  intro: {
    src: local('intro'),
    alt: 'A peaceful gravel path winding through a designed Sydney garden',
  },
  service_design: {
    src: local('service_design'),
    alt: 'A landscape architect’s desk: hand-drawn masterplan, planting palette swatches, sample bluestone',
  },
  service_build: {
    src: local('service_build'),
    alt: 'A landscaper laying bluestone pavers on a sand bed during a Sydney backyard build',
  },
  service_planting: {
    src: local('service_planting'),
    alt: 'Hands in gardening gloves planting a young magnolia in rich dark soil',
  },
  service_care: {
    src: local('service_care'),
    alt: 'A meticulously maintained Sydney garden, crisp lawn, clipped buxus, mature jacaranda',
  },
  process_consult: {
    src: local('process_consult'),
    alt: 'A landscape designer walking a client’s overgrown Sydney backyard with a clipboard',
  },
  process_design: {
    src: local('process_design'),
    alt: 'A garden masterplan drawing in progress on a drafting table',
  },
  process_build: {
    src: local('process_build'),
    alt: 'Active landscape construction site in a Sydney backyard, retaining wall, fresh soil, bagged plants',
  },
  process_care: {
    src: local('process_care'),
    alt: 'A gardener hand-pruning a mature camellia hedge in autumn light',
  },
  about: {
    src: local('about'),
    alt: 'A mature designed Australian garden at golden hour, dry-stone walls, ornamental grasses, eucalypts',
  },
  portfolio_1: {
    src: local('portfolio_1'),
    alt: 'A contemporary Mosman courtyard garden at dusk with bluestone pavers and a feature tree',
  },
  portfolio_2: {
    src: local('portfolio_2'),
    alt: 'A relaxed coastal garden in Avalon Beach with native planting and a weathered timber deck',
  },
  portfolio_3: {
    src: local('portfolio_3'),
    alt: 'A small Paddington terrace garden, walled courtyard with bluestone pavers and a fiddle-leaf fig',
  },
  portfolio_4: {
    src: local('portfolio_4'),
    alt: 'A grand Wahroonga garden estate with mature jacarandas and a wide buffalo lawn',
  },
  // Before / after pairs
  ba1_before: {
    src: local('ba1_before'),
    alt: 'A neglected Mosman front yard before landscaping, patchy lawn, cracked path, weeds',
  },
  ba1_after: {
    src: local('ba1_after'),
    alt: 'The same Mosman front yard after landscaping, crisp lawn, bluestone path, clipped hedging',
  },
  ba2_before: {
    src: local('ba2_before'),
    alt: 'A tired Paddington terrace courtyard before renovation, cracked bricks, dead pots, peeling paint',
  },
  ba2_after: {
    src: local('ba2_after'),
    alt: 'The same Paddington courtyard renovated, bluestone pavers, climbing jasmine, built-in timber bench',
  },
  ba3_before: {
    src: local('ba3_before'),
    alt: 'A neglected Wahroonga entry path before renovation, cracked stepping stones, weeds, dying buxus',
  },
  ba3_after: {
    src: local('ba3_after'),
    alt: 'The same Wahroonga entry renovated, crisp bluestone path, low buxus hedging, standard frangipani',
  },
  // Jobs slider
  slider_1: { src: local('slider_1'), alt: 'Modern Sydney courtyard at dusk with up-lighting and a water feature' },
  slider_2: { src: local('slider_2'), alt: 'Native Sydney poolside garden with grass trees and sandstone coping' },
  slider_3: { src: local('slider_3'), alt: 'Formal parterre garden with central olive tree and gravel terrace' },
  slider_4: { src: local('slider_4'), alt: 'Productive kitchen garden with raised hardwood beds and espaliered citrus' },
  slider_5: { src: local('slider_5'), alt: 'Coastal Northern Beaches deck with native planting and ocean view' },
  slider_6: { src: local('slider_6'), alt: 'Wahroonga garden vista bordered by jacarandas in full bloom' },
  // Real project photography — Verto Landscapes, Castlecrag
  real_pool: { src: local('real/pool'), alt: 'Infinity-edge pool looking over the harbour valley, potted olives along the boundary wall' },
  real_deck: { src: local('real/deck'), alt: 'Hardwood pool deck with glass fencing and white outdoor furniture' },
  real_driveway: { src: local('real/driveway'), alt: 'Cobblestone arrival court edged in sandstone with olive trees and layered garden beds' },
  real_passage: { src: local('real/passage'), alt: 'Stone-cobbled side passage with timber batten gate and screen' },
  real_planting: { src: local('real/planting'), alt: 'Magnolia and layered planting in a sandstone-edged bed with brass garden lighting' },
  real_facade: { src: local('real/facade'), alt: 'Finished front garden and stone entry path at a modern Castlecrag home' },
  svc_design: { src: local('real/gen/svc-design'), alt: 'Hand-drawn master plan of the Castlecrag front garden on the drafting table' },
  svc_construct: { src: local('real/gen/svc-construct'), alt: 'Cobblestones being laid on a sand screed during the driveway build' },
  svc_planting: { src: local('real/gen/svc-planting'), alt: 'Gloved hands planting a young magnolia in the sandstone-edged bed' },
  svc_care: { src: local('real/gen/svc-care'), alt: 'Hand-pruning the olive tree on a quarterly care visit' },
};

export type ImageRef = keyof typeof images;
