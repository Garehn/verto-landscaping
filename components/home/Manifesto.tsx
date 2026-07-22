import Link from 'next/link';
import { home, studio } from '@/lib/content';
import { images } from '@/lib/unsplash';
import { ScrubText } from '@/components/motion/ScrubText';
import { Reveal } from '@/components/motion/Reveal';
import { ParallaxImage } from '@/components/motion/ParallaxImage';

const facts = [
  { label: 'Studio', value: `${studio.address.suburb}, Sydney` },
  { label: 'Founder', value: studio.founder },
  { label: 'Projects', value: '6–8 a year' },
  { label: 'Practice', value: 'Design · Build · Care' },
];

export function Manifesto() {
  return (
    <section className="bg-ink text-paper">
      <div className="container-x py-20 lg:py-28">
        <Reveal className="mb-10 flex items-center gap-6">
          <span className="meta-sm text-brass" data-numeric>01</span>
          <span className="meta text-sage">The practice</span>
          <span className="h-px flex-1 bg-paper/10" aria-hidden />
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <ScrubText
              text={home.intro}
              className="display-md max-w-4xl font-serif text-pretty"
            />
            <Reveal delay={0.15} className="mt-10">
              <Link href="/about" className="meta link-underline py-1 text-paper/80">
                About the studio
              </Link>
            </Reveal>
          </div>

          <div className="lg:col-span-3 lg:col-start-10">
            <Reveal delay={0.1}>
              <ParallaxImage
                src={images.intro.src}
                alt={images.intro.alt}
                className="relative aspect-[4/5] bg-ink-2"
                sizes="(min-width: 1024px) 320px, 60vw"
                speed={0.06}
              />
            </Reveal>
            <div className="mt-6 space-y-0">
              {facts.map((fact, i) => (
                <Reveal key={fact.label} delay={0.15 + i * 0.06} y={12}>
                  <div className="flex items-baseline justify-between gap-4 border-t border-paper/10 py-3">
                    <span className="meta-sm text-sage">{fact.label}</span>
                    <span className="text-sm text-paper/85">{fact.value}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
