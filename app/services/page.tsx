import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { services } from '@/lib/content';
import { images } from '@/lib/unsplash';
import { FadeIn } from '@/components/site/FadeIn';
import { Cta } from '@/components/site/Cta';

export const metadata: Metadata = { title: 'Services' };

export default function ServicesPage() {
  return (
    <>
      <section className="container-x pt-40 pb-20 lg:pt-48 lg:pb-28">
        <FadeIn>
          <div className="eyebrow mb-6">Services</div>
          <h1 className="display max-w-5xl text-balance">
            Design, build, plant, <span className="display-italic">tend.</span>
          </h1>
          <p className="mt-10 body-lg max-w-2xl text-pretty">
            One studio. Four parts of the same job. We can take a project from a first conversation through to its third spring, or step in at any point in between.
          </p>
        </FadeIn>
      </section>

      <div className="rule container-x" />

      {services.map((s, i) => (
        <section key={s.id} id={s.id} className="container-x py-24 lg:py-32">
          <FadeIn className="grid gap-12 lg:gap-16 md:grid-cols-12 md:items-center">
            <div className={`md:col-span-7 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
              <div className="relative aspect-[5/4] overflow-hidden bg-cream">
                <Image
                  src={images[s.image].src}
                  alt={images[s.image].alt}
                  fill
                  sizes="(min-width: 1024px) 720px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="eyebrow mb-4">0{i + 1}</div>
              <h2 className="font-serif text-4xl md:text-5xl tracking-tighter2 mb-6 text-balance">{s.title}</h2>
              <p className="text-lg leading-relaxed text-ink/85 text-pretty">{s.body}</p>
              <Link href="/contact" className="mt-8 inline-block link-underline text-sm uppercase tracking-[0.2em]">
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
