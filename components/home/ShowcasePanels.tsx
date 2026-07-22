'use client';

import Link from 'next/link';
import { portfolio } from '@/lib/content';
import { images } from '@/lib/unsplash';
import { ParallaxImage } from '@/components/motion/ParallaxImage';
import { WordRise } from '@/components/motion/WordRise';
import { Reveal } from '@/components/motion/Reveal';

// Three full-viewport project panels that stack over one another as you
// scroll — the cinematic showcase.
export function ShowcasePanels() {
  const featured = portfolio.slice(0, 3);

  return (
    <section className="bg-ink text-paper">
      <div className="container-x pb-10 pt-4 lg:pb-14">
        <Reveal className="flex items-center gap-6">
          <span className="meta-sm text-brass" data-numeric>02</span>
          <span className="meta text-sage">Selected work</span>
          <span className="h-px flex-1 bg-paper/10" aria-hidden />
          <Link href="/portfolio" className="meta link-underline hidden py-1 text-paper/80 sm:inline-block">
            All projects
          </Link>
        </Reveal>
      </div>

      <div>
        {featured.map((project, i) => (
          // Each slot is taller than a viewport so its pinned panel gets
          // dwell time before the next one slides over it.
          <div key={project.id} className={i === featured.length - 1 ? 'h-screen' : 'h-[145vh]'}>
            <article className="sticky top-0 h-screen overflow-hidden">
              <ParallaxImage
                src={images[project.image].src}
                alt={images[project.image].alt}
                className="absolute inset-0"
                speed={0.08}
              />
              <div className="grade-overlay absolute inset-0" aria-hidden />

              <div className="container-x relative flex h-full flex-col justify-end pb-12 sm:pb-14">
                <div className="grid gap-6 border-t border-paper/20 pt-7 lg:grid-cols-12 lg:items-end">
                  <div className="lg:col-span-7">
                    <div className="meta-sm mb-4 flex items-center gap-4 text-paper/70">
                      <span className="text-brass" data-numeric>
                        {String(i + 1).padStart(2, '0')} / {String(featured.length).padStart(2, '0')}
                      </span>
                      <span>{project.location}</span>
                      <span data-numeric>{project.year}</span>
                    </div>
                    <WordRise
                      as="h3"
                      className="font-serif text-4xl tracking-tighter2 sm:text-6xl"
                      segments={[{ text: project.title }]}
                      stagger={0.05}
                    />
                  </div>
                  <div className="lg:col-span-4 lg:col-start-9">
                    <Reveal delay={0.15} y={16}>
                      <p className="max-w-sm text-sm leading-relaxed text-paper/80 text-pretty">
                        {project.blurb}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                        <span className="meta-sm flex flex-wrap items-center gap-x-3 text-sage">
                          {project.scope.map((tag, t) => (
                            <span key={tag} className="flex items-center gap-3">
                              {t > 0 && <span className="text-brass">·</span>}
                              {tag}
                            </span>
                          ))}
                        </span>
                        <Link
                          href="/portfolio"
                          className="meta-sm link-underline ml-auto py-1 text-paper/85"
                        >
                          View project
                        </Link>
                      </div>
                    </Reveal>
                  </div>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
