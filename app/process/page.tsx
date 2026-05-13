import Image from 'next/image';
import type { Metadata } from 'next';
import { process } from '@/lib/content';
import { images } from '@/lib/unsplash';
import { FadeIn } from '@/components/site/FadeIn';
import { Cta } from '@/components/site/Cta';

export const metadata: Metadata = { title: 'Process' };

export default function ProcessPage() {
  return (
    <>
      <section className="container-x pt-40 pb-20 lg:pt-48 lg:pb-28">
        <FadeIn>
          <div className="eyebrow mb-6">Process</div>
          <h1 className="display max-w-5xl text-balance">
            How a project moves through <span className="display-italic">the studio.</span>
          </h1>
          <p className="mt-10 body-lg max-w-2xl text-pretty">
            From the first walk-through to the third year of care, the path is the same. Slower than most. More thorough. Worth it.
          </p>
        </FadeIn>
      </section>

      <div className="rule container-x" />

      {process.map((step, i) => (
        <section key={step.n} className="container-x py-24 lg:py-32">
          <FadeIn className="grid gap-12 lg:gap-20 md:grid-cols-12 md:items-start">
            <div className="md:col-span-2">
              <div className="font-serif text-7xl md:text-8xl tracking-tighter2 text-stone/50 leading-none">
                {step.n}
              </div>
            </div>
            <div className="md:col-span-5">
              <h2 className="font-serif text-4xl md:text-5xl tracking-tighter2 mb-6 text-balance">{step.title}</h2>
              <p className="text-lg leading-relaxed text-ink/85 text-pretty">{step.body}</p>
            </div>
            <div className="md:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                <Image
                  src={images[step.image].src}
                  alt={images[step.image].alt}
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </FadeIn>
          {i < process.length - 1 && <div className="rule mt-24" />}
        </section>
      ))}

      <Cta title="Begin with a conversation." body="The first step is always a walk through the property. If we are right for each other, we will know by the end of it." />
    </>
  );
}
