import Image from 'next/image';
import type { Metadata } from 'next';
import { about, studio } from '@/lib/content';
import { images } from '@/lib/unsplash';
import { FadeIn } from '@/components/site/FadeIn';
import { PullQuote } from '@/components/site/PullQuote';
import { Cta } from '@/components/site/Cta';

export const metadata: Metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <>
      <section className="container-x pt-40 pb-20 lg:pt-48 lg:pb-28">
        <FadeIn>
          <div className="eyebrow mb-6">About</div>
          <h1 className="display max-w-5xl text-balance">
            A small studio, <span className="display-italic">six to eight gardens a year.</span>
          </h1>
          <p className="mt-10 body-lg max-w-2xl text-pretty">{about.lead}</p>
        </FadeIn>
      </section>

      <section className="container-x pb-12">
        <FadeIn>
          <div className="relative aspect-[16/9] overflow-hidden bg-cream">
            <Image
              src={images.about.src}
              alt={images.about.alt}
              fill
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="object-cover"
            />
          </div>
        </FadeIn>
      </section>

      <section className="container-x py-20 lg:py-28">
        <FadeIn className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="font-serif text-3xl md:text-4xl tracking-tighter2 text-balance">
              A practice, not a production line.
            </h2>
          </div>
          <div className="md:col-span-7 space-y-6 text-lg leading-relaxed text-ink/85">
            {about.body.map((p, i) => (
              <p key={i} className="text-pretty">{p}</p>
            ))}
          </div>
        </FadeIn>
      </section>

      <PullQuote attribution="The studio">{about.pullQuote}</PullQuote>

      <section className="bg-cream">
        <div className="container-x py-24 lg:py-32">
          <FadeIn className="mb-14">
            <div className="eyebrow mb-4">What we hold to</div>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tighter2 max-w-3xl text-balance">Three things we will not move on.</h2>
          </FadeIn>
          <div className="grid gap-10 md:gap-14 md:grid-cols-3">
            {about.values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.08}>
                <div className="font-serif text-5xl tracking-tighter2 text-stone/40">0{i + 1}</div>
                <h3 className="mt-4 font-serif text-2xl tracking-tighter2">{v.title}</h3>
                <p className="mt-3 text-ink/80 leading-relaxed">{v.body}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-28 lg:py-36">
        <FadeIn className="grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <div className="eyebrow mb-4">Where we work</div>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tighter2 text-balance">{studio.area}.</h2>
          </div>
          <p className="md:col-span-5 text-lg text-ink/80 leading-relaxed">
            We work primarily across Sydney&rsquo;s northern and eastern suburbs. Further afield by exception, and only when the project fits.
          </p>
        </FadeIn>
      </section>

      <Cta />
    </>
  );
}
