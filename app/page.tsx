import Image from 'next/image';
import Link from 'next/link';
import { home, services, portfolio, beforeAfters, recentJobs } from '@/lib/content';
import { images } from '@/lib/unsplash';
import { FadeIn } from '@/components/site/FadeIn';
import { BeforeAfter } from '@/components/site/BeforeAfter';
import { Cta } from '@/components/site/Cta';
import { JobsSlider } from '@/components/site/JobsSlider';
import { SixServices } from '@/components/site/SixServices';
import { ProjectCard } from '@/components/portfolio/ProjectCard';

export default function HomePage() {
  const featuredBA = beforeAfters[0];
  const featured = portfolio.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink">
        <Image
          src={images.hero.src}
          alt={images.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/60" />
        <div className="relative h-full container-x flex flex-col justify-end pb-16 lg:pb-24">
          <div className="max-w-4xl text-paper">
            <div className="eyebrow text-paper/70 mb-6">{home.hero.eyebrow}</div>
            <h1 className="display">
              Gardens that <span className="display-italic">hold time.</span>
            </h1>
            <p className="mt-8 max-w-xl text-paper/85 text-lg sm:text-xl leading-relaxed text-pretty">
              {home.hero.sub}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact" className="group bg-paper text-ink btn hover:bg-cream">
                Request a quote <span aria-hidden className="arrow">→</span>
              </Link>
              <Link href="/portfolio" className="group text-paper border border-paper/40 btn hover:bg-paper hover:text-ink">
                See the work
                <span aria-hidden className="arrow opacity-70 group-hover:opacity-100">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="container-x py-28 lg:py-40">
        <FadeIn className="grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <div className="eyebrow mb-6">A studio practice</div>
            <h2 className="display text-balance">
              We design and build gardens that <span className="display-italic">settle into a place.</span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pl-8">
            <p className="body-lg text-pretty">{home.intro}</p>
            <Link href="/about" className="mt-8 inline-block link-underline text-sm uppercase tracking-[0.2em]">
              About the studio
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Six core services — near the top */}
      <SixServices />

      {/* Featured before/after */}
      <section className="bg-cream">
        <div className="container-x py-24 lg:py-32">
          <FadeIn className="mb-12 flex items-end justify-between gap-8 flex-wrap">
            <div>
              <div className="eyebrow mb-4">Before · After</div>
              <h2 className="font-serif text-4xl md:text-5xl tracking-tighter2 max-w-xl text-balance">
                Drag the handle. The work speaks plainly.
              </h2>
            </div>
            <Link href="/portfolio" className="link-underline text-sm uppercase tracking-[0.2em]">
              More projects
            </Link>
          </FadeIn>
          <FadeIn>
            <BeforeAfter
              beforeSrc={images[featuredBA.before].src}
              afterSrc={images[featuredBA.after].src}
              beforeAlt={images[featuredBA.before].alt}
              afterAlt={images[featuredBA.after].alt}
              label={featuredBA.label}
            />
          </FadeIn>
        </div>
      </section>

      {/* Recent jobs slider — mostly visual */}
      <JobsSlider
        eyebrow="Recent work"
        heading={
          <h2 className="font-serif text-4xl md:text-6xl tracking-tighter2 max-w-3xl text-balance">
            A few gardens, <span className="italic">recently finished.</span>
          </h2>
        }
        jobs={recentJobs.map((j) => ({
          src: images[j.image].src,
          alt: images[j.image].alt,
          caption: j.caption,
        }))}
      />

      {/* Selected work */}
      <section className="container-x pt-28 lg:pt-40 pb-28 lg:pb-40">
        <FadeIn className="mb-16 flex items-end justify-between gap-8 flex-wrap">
          <div>
            <div className="eyebrow mb-4">Selected work</div>
            <h2 className="display max-w-3xl text-balance">
              Recent <span className="display-italic">projects.</span>
            </h2>
          </div>
          <Link href="/portfolio" className="link-underline text-sm uppercase tracking-[0.2em]">
            See the portfolio
          </Link>
        </FadeIn>
        <div className="grid gap-10 md:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.id} title={p.title} location={p.location} year={p.year} image={p.image} />
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-ink text-paper">
        <div className="container-x py-28 lg:py-40">
          <FadeIn>
            <p className="font-serif italic font-medium text-3xl sm:text-4xl md:text-[3.25rem] leading-[1.18] tracking-tighter2 max-w-5xl text-balance">
              &ldquo;{home.testimonial.quote}&rdquo;
            </p>
            <div className="mt-10 text-xs uppercase tracking-[0.2em] text-paper/60">
              {home.testimonial.author} — {home.testimonial.project}
            </div>
          </FadeIn>
        </div>
      </section>

      <Cta />
    </>
  );
}
