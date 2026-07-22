import Link from 'next/link';
import { home } from '@/lib/content';
import { ScrubText } from '@/components/motion/ScrubText';
import { Reveal } from '@/components/motion/Reveal';

export function Manifesto() {
  return (
    <section className="bg-ink text-paper">
      <div className="container-x py-32 lg:py-44">
        <Reveal className="mb-12 flex items-center gap-6">
          <span className="meta-sm text-brass" data-numeric>01</span>
          <span className="meta text-sage">The practice</span>
          <span className="h-px flex-1 bg-paper/10" aria-hidden />
        </Reveal>

        <ScrubText
          text={home.intro}
          className="display-md max-w-5xl font-serif text-pretty"
        />

        <Reveal delay={0.15} className="mt-14">
          <Link href="/about" className="meta link-underline py-1 text-paper/80">
            About the studio
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
