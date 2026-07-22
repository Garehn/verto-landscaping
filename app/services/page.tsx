import Link from 'next/link';
import type { Metadata } from 'next';
import { services } from '@/lib/content';
import { images } from '@/lib/unsplash';
import { FadeIn } from '@/components/site/FadeIn';
import { Cta } from '@/components/site/Cta';
import { ParallaxImage } from '@/components/motion/ParallaxImage';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = { title: 'Services' };

export default function ServicesPage() {
  return (
    <>
      <section className="container-x pt-40 pb-20 lg:pt-48 lg:pb-28">
        <FadeIn>
          <div className="meta mb-6 text-stone">Services</div>
          <h1 className="display max-w-5xl text-balance">
            Design, build, plant, <span className="display-italic">tend.</span>
          </h1>
          <p className="mt-10 body-lg max-w-2xl text-ink/75 text-pretty">
            One studio. Four parts of the same job. We can take a project from a first conversation through to its third spring, or step in at any point in between.
          </p>
        </FadeIn>
      </section>

      <div className="container-x"><div className="rule" /></div>

      {services.map((s, i) => (
        <section key={s.id} id={s.id} className="container-x py-24 lg:py-32">
          <FadeIn className="grid gap-12 md:grid-cols-12 md:items-center lg:gap-16">
            <div className={`md:col-span-7 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
              <Reveal>
                <ParallaxImage
                  src={images[s.image].src}
                  alt={images[s.image].alt}
                  className="relative aspect-[5/4] bg-cream"
                  sizes="(min-width: 1024px) 720px, 100vw"
                  speed={0.07}
                />
              </Reveal>
            </div>
            <div className="md:col-span-5">
              <div className="meta-sm mb-4 text-brass" data-numeric>0{i + 1}</div>
              <h2 className="mb-6 font-serif text-4xl tracking-tighter2 text-balance md:text-5xl">{s.title}</h2>
              <p className="text-lg leading-relaxed text-ink/75 text-pretty">{s.body}</p>
              <Link href="/contact" className="meta link-underline mt-8 inline-block py-1 text-ink/85">
                Discuss a {s.title.toLowerCase()} project →
              </Link>
            </div>
          </FadeIn>
        </section>
      ))}

      <Cta title="Right service, wrong studio?" body="If we are not the right fit for your project, we will tell you, and point you to someone who is. No hard sell." />
    </>
  );
}
