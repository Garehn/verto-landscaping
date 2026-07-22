import Link from 'next/link';
import { home, about } from '@/lib/content';
import { ScrubText } from '@/components/motion/ScrubText';
import { Reveal } from '@/components/motion/Reveal';

export function Testimonial() {
  return (
    <section className="bg-ink text-paper">
      <div className="container-x py-20 lg:py-28">
        <Reveal className="mb-10 flex items-center gap-6">
          <span className="meta-sm text-brass" data-numeric>07</span>
          <span className="meta text-sage">From a client</span>
          <span className="h-px flex-1 bg-paper/10" aria-hidden />
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <ScrubText
              text={`“${home.testimonial.quote}”`}
              className="display-md max-w-4xl font-serif italic text-pretty"
            />
            <Reveal delay={0.15} className="mt-10 flex items-center gap-4">
              <span className="h-px w-10 bg-brass" aria-hidden />
              <span className="meta text-paper/60">
                {home.testimonial.author} — {home.testimonial.project}
              </span>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="lg:col-span-3 lg:col-start-10">
            <div className="border-l border-paper/15 pl-6">
              <div className="meta-sm mb-3 text-sage">The studio&rsquo;s side</div>
              <p className="text-sm leading-relaxed text-paper/70 text-pretty">
                {about.pullQuote}
              </p>
              <Link href="/about" className="meta-sm link-underline mt-5 inline-block py-1 text-paper/80">
                About the studio
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
