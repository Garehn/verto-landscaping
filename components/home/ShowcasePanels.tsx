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
      <div className="container-x pb-16 pt-8 lg:pb-24">
        <Reveal className="mb-4 flex items-center gap-6">
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
          // Each 175vh slot gives its pinned panel dwell time before the
          // next one slides over it.
          <div key={project.id} className={i === featured.length - 1 ? 'h-screen' : 'h-[175vh]'}>
            <article className="sticky top-0 h-screen overflow-hidden">
              <ParallaxImage
                src={images[project.image].src}
                alt={images[project.image].alt}
                className="absolute inset-0"
                speed={0.08}
              />
              <div className="grade-overlay absolute inset-0" aria-hidden />

              <div className="container-x relative flex h-full flex-col justify-end pb-14 sm:pb-16">
                <div className="flex flex-wrap items-end justify-between gap-8 border-t border-paper/20 pt-8">
                  <div>
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
                  <Reveal delay={0.2} y={16}>
                    <Link
                      href="/portfolio"
                      className="meta link-underline py-1 text-paper/85"
                    >
                      View project
                    </Link>
                  </Reveal>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
