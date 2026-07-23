import type { Metadata } from 'next';
import Link from 'next/link';
import { portfolio } from '@/lib/content';
import { images } from '@/lib/unsplash';
import { ParallaxImage } from '@/components/motion/ParallaxImage';
import { Reveal } from '@/components/motion/Reveal';
import { WordRise } from '@/components/motion/WordRise';
import { Cta } from '@/components/site/Cta';

export const metadata: Metadata = { title: 'Projects' };

// Editorial spread — asymmetric columns, staggered offsets, air between
// everything. Each project keeps its words beside it.
export default function PortfolioPage() {
  const [pool, deck, arrival] = portfolio;

  return (
    <>
      <section className="container-x pb-16 pt-36 lg:pb-24 lg:pt-44">
        <Reveal>
          <div className="meta mb-6 text-stone">Projects</div>
        </Reveal>
        <WordRise
          as="h1"
          className="display max-w-5xl text-balance"
          segments={[
            { text: 'Selected work across the' },
            { text: 'Lower North Shore.', italic: true },
          ]}
          stagger={0.06}
        />
        <Reveal delay={0.2}>
          <p className="body-lg mt-8 max-w-xl text-ink/70 text-pretty">
            Three recent gardens, all within minutes of the studio. Open any of
            them to see where each began.
          </p>
        </Reveal>
      </section>

      <div className="container-x"><div className="rule" /></div>

      <section className="container-x pb-24 pt-16 lg:pb-32 lg:pt-24">
        {/* 01, large left, text hanging right and low */}
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Link href={`/portfolio/${pool.id}`} className="group block">
              <div className="overflow-hidden">
                <ParallaxImage
                  src={images[pool.image].src}
                  alt={images[pool.image].alt}
                  className="relative aspect-[4/3] bg-cream transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.02]"
                  sizes="(min-width: 1024px) 800px, 100vw"
                  speed={0.06}
                />
              </div>
            </Link>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9 lg:self-end lg:pb-6">
            <div className="meta-sm mb-4 flex items-center gap-4 text-stone">
              <span className="text-brass" data-numeric>01</span>
              <span>{pool.location}</span>
              <span data-numeric>{pool.year}</span>
            </div>
            <h2 className="font-serif text-3xl tracking-tighter2 sm:text-4xl">{pool.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-ink/70 text-pretty">{pool.blurb}</p>
            <Link href={`/portfolio/${pool.id}`} className="meta link-underline mt-6 inline-block py-1">
              View project
            </Link>
          </Reveal>
        </div>

        {/* 02, portrait right, text left, staggered upward */}
        <div className="mt-20 grid gap-8 lg:mt-28 lg:grid-cols-12">
          <Reveal delay={0.1} className="order-2 lg:order-1 lg:col-span-4 lg:col-start-2 lg:self-center">
            <div className="meta-sm mb-4 flex items-center gap-4 text-stone">
              <span className="text-brass" data-numeric>02</span>
              <span>{deck.location}</span>
              <span data-numeric>{deck.year}</span>
            </div>
            <h2 className="font-serif text-3xl tracking-tighter2 sm:text-4xl">{deck.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-ink/70 text-pretty">{deck.blurb}</p>
            <Link href={`/portfolio/${deck.id}`} className="meta link-underline mt-6 inline-block py-1">
              View project
            </Link>
          </Reveal>
          <Reveal className="order-1 lg:order-2 lg:col-span-5 lg:col-start-7">
            <Link href={`/portfolio/${deck.id}`} className="group block">
              <div className="overflow-hidden">
                <ParallaxImage
                  src={images[deck.image].src}
                  alt={images[deck.image].alt}
                  className="relative aspect-[4/5] bg-cream transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.02]"
                  sizes="(min-width: 1024px) 560px, 100vw"
                  speed={0.07}
                />
              </div>
            </Link>
          </Reveal>
        </div>

        {/* 03, wide, offset from the left edge, text trailing right */}
        <div className="mt-20 grid gap-8 lg:mt-28 lg:grid-cols-12">
          <Reveal className="lg:col-span-8 lg:col-start-2">
            <Link href={`/portfolio/${arrival.id}`} className="group block">
              <div className="overflow-hidden">
                <ParallaxImage
                  src={images[arrival.image].src}
                  alt={images[arrival.image].alt}
                  className="relative aspect-[16/10] bg-cream transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.02]"
                  sizes="(min-width: 1024px) 900px, 100vw"
                  speed={0.06}
                />
              </div>
            </Link>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-3 lg:col-start-10 lg:self-end lg:pb-8">
            <div className="meta-sm mb-4 flex items-center gap-4 text-stone">
              <span className="text-brass" data-numeric>03</span>
              <span>{arrival.location}</span>
              <span data-numeric>{arrival.year}</span>
            </div>
            <h2 className="font-serif text-3xl tracking-tighter2">{arrival.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-ink/70 text-pretty">{arrival.blurb}</p>
            <Link href={`/portfolio/${arrival.id}`} className="meta link-underline mt-6 inline-block py-1">
              View project
            </Link>
          </Reveal>
        </div>
      </section>

      <Cta
        title="Want your garden in the next group?"
        body="We take six to eight projects each year, all close to the studio. The next list opens this winter."
      />
    </>
  );
}
