import Link from 'next/link';
import { portfolio } from '@/lib/content';
import { images } from '@/lib/unsplash';
import { ParallaxImage } from '@/components/motion/ParallaxImage';
import { Reveal } from '@/components/motion/Reveal';

// Harrisons-style editorial project rows — image forward, always captioned,
// alternating sides, brief text.
export function FeaturedProjects() {
  const featured = portfolio.slice(0, 3);

  return (
    <section className="bg-paper text-ink">
      <div className="container-x pb-20 lg:pb-28">
        <Reveal className="mb-12 flex items-center gap-6">
          <span className="meta-sm text-brass" data-numeric>01</span>
          <span className="meta text-stone">Selected work</span>
          <span className="h-px flex-1 bg-ink/10" aria-hidden />
          <Link href="/portfolio" className="meta link-underline hidden py-1 sm:inline-block">
            All projects
          </Link>
        </Reveal>

        <div className="space-y-16 lg:space-y-24">
          {featured.map((project, i) => (
            <article
              key={project.id}
              className="group grid items-end gap-8 lg:grid-cols-12"
            >
              <Reveal
                className={`lg:col-span-8 ${i % 2 === 1 ? 'lg:order-2' : ''}`}
              >
                <Link href="/portfolio" className="block">
                  <div className="overflow-hidden">
                    <ParallaxImage
                      src={images[project.image].src}
                      alt={images[project.image].alt}
                      className="relative aspect-[16/10] bg-cream transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.02]"
                      sizes="(min-width: 1024px) 900px, 100vw"
                      speed={0.06}
                    />
                  </div>
                </Link>
              </Reveal>

              <Reveal delay={0.12} className={`lg:col-span-4 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="meta-sm mb-4 flex items-center gap-4 text-stone">
                  <span className="text-brass" data-numeric>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{project.location}</span>
                  <span data-numeric>{project.year}</span>
                </div>
                <h3 className="font-serif text-3xl tracking-tighter2 sm:text-4xl">
                  {project.title}
                </h3>
                <p className="mt-4 max-w-sm text-base leading-relaxed text-ink/70 text-pretty">
                  {project.blurb}
                </p>
                <div className="meta-sm mt-5 flex flex-wrap items-center gap-x-3 text-stone">
                  {project.scope.map((tag, t) => (
                    <span key={tag} className="flex items-center gap-3">
                      {t > 0 && <span className="text-brass">·</span>}
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href="/portfolio" className="meta link-underline mt-6 inline-block py-1">
                  View project
                </Link>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
