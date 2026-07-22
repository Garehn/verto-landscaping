import type { Metadata } from 'next';
import { process } from '@/lib/content';
import { images } from '@/lib/unsplash';
import { FadeIn } from '@/components/site/FadeIn';
import { Cta } from '@/components/site/Cta';
import { ParallaxImage } from '@/components/motion/ParallaxImage';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = { title: 'Process' };

export default function ProcessPage() {
  return (
    <>
      <section className="container-x pt-40 pb-20 lg:pt-48 lg:pb-28">
        <FadeIn>
          <div className="meta mb-6 text-stone">Process</div>
          <h1 className="display max-w-5xl text-balance">
            How a project moves through <span className="display-italic">the studio.</span>
          </h1>
          <p className="mt-10 body-lg max-w-2xl text-ink/75 text-pretty">
            From the first walk-through to the third year of care, the path is the same. Slower than most. More thorough. Worth it.
          </p>
        </FadeIn>
      </section>

      <div className="container-x"><div className="rule" /></div>

      {process.map((step, i) => (
        <section key={step.n} className="container-x py-24 lg:py-32">
          <FadeIn className="grid gap-12 lg:gap-20 md:grid-cols-12 md:items-start">
            <div className="md:col-span-2">
              <div className="font-serif text-7xl leading-none tracking-tighter2 text-stone/35 md:text-8xl" data-numeric>
                {step.n}
              </div>
            </div>
            <div className="md:col-span-5">
              <h2 className="mb-6 font-serif text-4xl tracking-tighter2 text-balance md:text-5xl">{step.title}</h2>
              <p className="text-lg leading-relaxed text-ink/75 text-pretty">{step.body}</p>
            </div>
            <div className="md:col-span-5">
              <Reveal>
                <ParallaxImage
                  src={images[step.image].src}
                  alt={images[step.image].alt}
                  className="relative aspect-[4/3] bg-cream"
                  sizes="(min-width: 1024px) 560px, 100vw"
                  speed={0.06}
                />
              </Reveal>
            </div>
          </FadeIn>
          {i < process.length - 1 && (
            <div className="mt-24"><div className="rule" /></div>
          )}
        </section>
      ))}

      <Cta title="Begin with a conversation." body="The first step is always a walk through the property. If we are right for each other, we will know by the end of it." />
    </>
  );
}
