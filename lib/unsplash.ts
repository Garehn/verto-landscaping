// Site imagery. Every file referenced here is a photograph of real Verto
// work; the generated placeholders this registry once held are retired.


export const images = {
  /** Home hero. A real photograph of a completed pool terrace. */
  hero: {
    src: '/images/proj/pool-terrace/pool-harbour.jpg',
    alt: 'Infinity pool over the harbour, pale stone coping and potted olives on the boundary wall',
  },
  /** About page. Real, from the same property. */
  about: {
    src: '/images/proj/pool-terrace/entry.jpg',
    alt: 'Stone-clad entry and lawn on a completed project',
  },
};

export type ImageRef = keyof typeof images;
