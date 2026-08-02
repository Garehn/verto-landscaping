// Site imagery. Every file referenced here is a photograph of real Verto
// work; the generated placeholders this registry once held are retired.


export const images = {
  /** Home hero. A real photograph of the Edinburgh Rd pool terrace. */
  hero: {
    src: '/images/proj/edinburgh/pool-harbour.jpg',
    alt: 'Infinity pool over the harbour at Edinburgh Rd, Castlecrag, pale stone coping and potted olives on the boundary wall',
  },
  /** About page. Real, from the same property. */
  about: {
    src: '/images/proj/edinburgh/entry.jpg',
    alt: 'Stone-clad entry and lawn at Edinburgh Rd, Castlecrag',
  },
};

export type ImageRef = keyof typeof images;
