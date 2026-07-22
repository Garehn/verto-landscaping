import { home } from '@/lib/content';
import { ScrubText } from '@/components/motion/ScrubText';
import { Reveal } from '@/components/motion/Reveal';

export function Testimonial() {
  return (
    <section className="bg-ink text-paper">
      <div className="container-x py-32 lg:py-44">
        <Reveal className="mb-12 flex items-center gap-6">
          <span className="meta-sm text-brass" data-numeric>07</span>
          <span className="meta text-sage">From a client</span>
          <span className="h-px flex-1 bg-paper/10" aria-hidden />
        </Reveal>

        <ScrubText
          text={`“${home.testimonial.quote}”`}
          className="display-md max-w-5xl font-serif italic text-pretty"
        />

        <Reveal delay={0.15} className="mt-12 flex items-center gap-4">
          <span className="h-px w-10 bg-brass" aria-hidden />
          <span className="meta text-paper/60">
            {home.testimonial.author} — {home.testimonial.project}
          </span>
        </Reveal>
      </div>
    </section>
  );
}
