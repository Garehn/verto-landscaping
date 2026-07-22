import type { Metadata } from 'next';
import { about, studio } from '@/lib/content';
import { images } from '@/lib/unsplash';
import { FadeIn } from '@/components/site/FadeIn';
import { PullQuote } from '@/components/site/PullQuote';
import { Cta } from '@/components/site/Cta';
import { ParallaxImage } from '@/components/motion/ParallaxImage';

export const metadata: Metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <>
      <section className="container-x pt-40 pb-20 lg:pt-48 lg:pb-28">
        <FadeIn>
          <div className="meta mb-6 text-stone">About</div>
          <h1 className="display max-w-5xl text-balance">
            A small studio, <span className="display-italic">six to eight gardens a year.</span>
          </h1>
          <p className="mt-10 body-lg max-w-2xl text-ink/75 text-pretty">{about.lead}</p>
        </FadeIn>
      </section>

      <section className="container-x pb-12">
        <FadeIn>
          <ParallaxImage
            src={images.about.src}
            alt={images.about.alt}
            className="relative aspect-[16/9] bg-cream"
            sizes="(min-width: 1280px) 1280px, 100vw"
            speed={0.08}
          />
        </FadeIn>
      </section>

      <section className="container-x py-20 lg:py-28">
        <FadeIn className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="font-serif text-3xl tracking-tighter2 text-balance md:text-4xl">
              A practice, not a production line.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-ink/75 md:col-span-7">
            {about.body.map((p, i) => (
              <p key={i} className="text-pretty">{p}</p>
            ))}
          </div>
        </FadeIn>
      </section>

      <PullQuote attribution="The studio">{about.pullQuote}</PullQuote>

      {/* Light interlude */}
      <section className="bg-paper text-ink">
        <div className="container-x py-24 lg:py-32">
          <FadeIn className="mb-14 flex items-center gap-6">
            <span className="meta-sm text-brass">01</span>
            <span className="meta text-stone">What we hold to</span>
            <span className="h-px flex-1 bg-paper-KEEP/10" aria-hidden />
          </FadeIn>
          <FadeIn>
            <h2 className="max-w-3xl font-serif text-4xl tracking-tighter2 text-balance md:text-5xl">
              Three things we will not move on.
            </h2>
          </FadeIn>
          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-14">
            {about.values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.08}>
                <div className="font-serif text-5xl tracking-tighter2 text-stone/40" data-numeric>0{i + 1}</div>
                <h3 className="mt-4 font-serif text-2xl tracking-tighter2">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/80">{v.body}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-28 lg:py-36">
        <FadeIn className="grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <div className="meta mb-4 text-stone">Where we work</div>
            <h2 className="font-serif text-4xl tracking-tighter2 text-balance md:text-5xl">{studio.area}.</h2>
          </div>
          <p className="text-lg leading-relaxed text-ink/75 md:col-span-5">
            We work primarily across Sydney&rsquo;s northern and eastern suburbs. Further afield by exception, and only when the project fits.
          </p>
        </FadeIn>
      </section>

      <Cta />
    </>
  );
}
