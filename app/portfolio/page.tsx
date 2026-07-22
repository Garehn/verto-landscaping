import type { Metadata } from 'next';
import { portfolio, beforeAfters } from '@/lib/content';
import { images } from '@/lib/unsplash';
import { FadeIn } from '@/components/site/FadeIn';
import { BeforeAfter } from '@/components/site/BeforeAfter';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { Cta } from '@/components/site/Cta';

export const metadata: Metadata = { title: 'Portfolio' };

export default function PortfolioPage() {
  return (
    <>
      <section className="container-x pt-40 pb-20 lg:pt-48 lg:pb-24">
        <FadeIn>
          <div className="meta mb-6 text-sage">Portfolio</div>
          <h1 className="display max-w-5xl text-balance">
            Selected work across <span className="display-italic">Sydney.</span>
          </h1>
          <p className="mt-10 body-lg max-w-2xl text-paper/75 text-pretty">
            A handful of recent gardens. Drag the sliders to see what changed.
          </p>
        </FadeIn>
      </section>

      <div className="container-x"><div className="rule" /></div>

      {/* Project grid (two cards) */}
      <section className="container-x py-20 lg:py-28">
        <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
          {portfolio.slice(0, 2).map((p) => (
            <ProjectCard key={p.id} title={p.title} location={p.location} year={p.year} image={p.image} />
          ))}
        </div>
      </section>

      {/* Before/after #1 — light interlude */}
      <section className="bg-paper text-ink">
        <div className="container-x py-24 lg:py-32">
          <FadeIn className="mb-10 flex items-center gap-6">
            <span className="meta-sm text-brass">01</span>
            <span className="meta text-stone">Before — After</span>
            <span className="h-px flex-1 bg-ink/10" aria-hidden />
          </FadeIn>
          <FadeIn>
            <h2 className="mb-8 font-serif text-3xl tracking-tighter2 md:text-4xl">{beforeAfters[0].label}</h2>
            <BeforeAfter
              beforeSrc={images[beforeAfters[0].before].src}
              afterSrc={images[beforeAfters[0].after].src}
              beforeAlt={images[beforeAfters[0].before].alt}
              afterAlt={images[beforeAfters[0].after].alt}
              label={beforeAfters[0].label}
            />
          </FadeIn>
        </div>
      </section>

      {/* Project grid (two more) */}
      <section className="container-x py-20 lg:py-28">
        <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
          {portfolio.slice(2, 4).map((p) => (
            <ProjectCard key={p.id} title={p.title} location={p.location} year={p.year} image={p.image} />
          ))}
        </div>
      </section>

      {/* Before/after #2 — light interlude */}
      <section className="bg-paper text-ink">
        <div className="container-x py-24 lg:py-32">
          <FadeIn className="mb-10 flex items-center gap-6">
            <span className="meta-sm text-brass">02</span>
            <span className="meta text-stone">Before — After</span>
            <span className="h-px flex-1 bg-ink/10" aria-hidden />
          </FadeIn>
          <FadeIn>
            <h2 className="mb-8 font-serif text-3xl tracking-tighter2 md:text-4xl">{beforeAfters[1].label}</h2>
            <BeforeAfter
              beforeSrc={images[beforeAfters[1].before].src}
              afterSrc={images[beforeAfters[1].after].src}
              beforeAlt={images[beforeAfters[1].before].alt}
              afterAlt={images[beforeAfters[1].after].alt}
              label={beforeAfters[1].label}
            />
          </FadeIn>
        </div>
      </section>

      {/* Before/after #3 */}
      <section className="container-x py-24 lg:py-32">
        <FadeIn className="mb-10 flex items-center gap-6">
          <span className="meta-sm text-brass">03</span>
          <span className="meta text-sage">Before — After</span>
          <span className="h-px flex-1 bg-paper/10" aria-hidden />
        </FadeIn>
        <FadeIn>
          <h2 className="mb-8 font-serif text-3xl tracking-tighter2 md:text-4xl">{beforeAfters[2].label}</h2>
          <BeforeAfter
            beforeSrc={images[beforeAfters[2].before].src}
            afterSrc={images[beforeAfters[2].after].src}
            beforeAlt={images[beforeAfters[2].before].alt}
            afterAlt={images[beforeAfters[2].after].alt}
            label={beforeAfters[2].label}
            captionClassName="text-sage"
          />
        </FadeIn>
      </section>

      <Cta title="Want your garden in the next group?" body="We take six to eight projects each year. The 2026 list opens this winter." />
    </>
  );
}
