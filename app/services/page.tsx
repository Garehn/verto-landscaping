import type { Metadata } from 'next';
import Link from 'next/link';
import { coreServices, process, studio } from '@/lib/content';
import { Reveal } from '@/components/motion/Reveal';
import { WordRise } from '@/components/motion/WordRise';
import { Cta } from '@/components/site/Cta';

export const metadata: Metadata = { title: 'Services' };

export default function ServicesPage() {
  return (
    <>
      <section className="container-x pb-14 pt-32 lg:pb-20 lg:pt-40">
        <Reveal>
          <div className="meta mb-6 text-stone">Services</div>
        </Reveal>
        <WordRise
          as="h1"
          className="display max-w-4xl text-balance"
          segments={[{ text: 'Design &' }, { text: 'Construction.', italic: true }]}
          stagger={0.05}
        />
        <Reveal delay={0.2}>
          <p className="body-lg mt-8 max-w-2xl text-ink/70 text-pretty">
            We build the permanent parts of a property, including stone, timber,
            steel, all aspects of softscaping and the ground underneath them.
          </p>
        </Reveal>
      </section>

      <div className="container-x"><div className="rule" /></div>

      {/* Capabilities */}
      <section className="container-x py-16 lg:py-24">
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:gap-y-16">
          {coreServices.map((service, i) => (
            <Reveal key={service.id} delay={(i % 2) * 0.08}>
              <article id={service.id} className="scroll-mt-28 border-t border-ink/15 pt-6">
                <div className="meta-sm mb-4 text-verde" data-numeric>
                  0{i + 1}
                </div>
                <h2 className="font-serif text-3xl tracking-tighter2 sm:text-4xl">{service.title}</h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-ink/70 text-pretty">
                  {service.body}
                </p>
                <div className="meta-sm mt-5 flex flex-wrap items-center gap-x-3 text-stone">
                  {service.scope.map((tag, t) => (
                    <span key={tag} className="flex items-center gap-3">
                      {t > 0 && <span className="text-verde">·</span>}
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How a project runs */}
      <section className="bg-cream">
        <div className="container-x py-16 lg:py-24">
          <Reveal className="mb-12 flex items-center gap-6">
            <span className="meta-sm text-verde" data-numeric>01</span>
            <span className="meta text-stone">How a project runs</span>
            <span className="h-px flex-1 bg-ink/10" aria-hidden />
          </Reveal>
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.08}>
                <div className="meta-sm mb-4 text-verde" data-numeric>{step.n}</div>
                <h3 className="font-serif text-2xl tracking-tighter2">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70 text-pretty">{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Where we work */}
      <section className="container-x py-16 lg:py-24">
        <Reveal className="mb-10 flex items-center gap-6">
          <span className="meta-sm text-verde" data-numeric>02</span>
          <span className="meta text-stone">Where we work</span>
          <span className="h-px flex-1 bg-ink/10" aria-hidden />
        </Reveal>
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="display-md max-w-md text-balance">
              Anywhere within the{' '}
              <span className="display-italic text-verde">Lower North Shore</span> and Northern Beaches.
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7 lg:self-center">
            <p className="text-base leading-relaxed text-ink/70 text-pretty">
              We work a tight radius on purpose. Our passion for creating modern
              gardens is where we excel, from detailed carpentry works to high end
              burnished concrete. We can do it all.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2">
              {studio.suburbs.map((suburb) => (
                <li key={suburb} className="meta-sm text-stone">
                  {suburb}
                  <span className="ml-3 text-verde" aria-hidden>·</span>
                </li>
              ))}
              <li className="meta-sm text-ink/60">and every suburb in between</li>
            </ul>
            <Link href="/contact" className="meta link-underline mt-8 inline-block py-2 text-ink/85">
              Check your address
            </Link>
          </Reveal>
        </div>
      </section>

      <Cta />
    </>
  );
}
