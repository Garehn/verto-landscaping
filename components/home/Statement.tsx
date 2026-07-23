import { WordRise } from '@/components/motion/WordRise';
import { Reveal } from '@/components/motion/Reveal';

// One short thought, beautifully set. Nothing more.
export function Statement() {
  return (
    <section className="bg-paper text-ink">
      <div className="container-x py-20 lg:py-28">
        <WordRise
          as="h2"
          className="display-md max-w-4xl text-balance"
          segments={[
            { text: 'We design and build gardens that' },
            { text: 'settle into a place.', italic: true },
          ]}
          stagger={0.05}
        />
        <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4">
          <p className="max-w-md text-lg leading-relaxed text-ink/70 text-pretty">
            A small Castlecrag studio. Six to eight projects a year, never more.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
