import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { projects, studio, type ProjectImage } from '@/lib/content';
import { Reveal } from '@/components/motion/Reveal';
import { WordRise } from '@/components/motion/WordRise';
import { Cta } from '@/components/site/Cta';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  return { title: project ? `${project.title}, ${project.location}` : 'Project' };
}

// `col` is handed to CSS as a variable and only read back inside the lg
// breakpoint. Setting grid-column inline instead would apply at every width,
// and on mobile the single-column rows would sprout implicit columns and push
// the page sideways.
const place = (col: string) => ({ '--col': col }) as CSSProperties;

// A frame in the collage. `col` is a CSS grid-column value against the
// 24-column full-bleed grid, so col-start 1 and a span that reaches 24 put the
// photograph hard against the edge of the viewport. Ratio comes from the
// photograph's own orientation unless the slot overrides it.
function Frame({
  image,
  alt,
  col,
  sizes,
  ratio,
  className = '',
  priority = false,
}: {
  image: ProjectImage;
  alt: string;
  col: string;
  sizes: string;
  ratio?: string;
  className?: string;
  priority?: boolean;
}) {
  const aspect = ratio ?? (image.o === 'p' ? 'aspect-[2/3]' : 'aspect-[3/2]');
  return (
    <Reveal className={`lg:[grid-column:var(--col)] ${className}`} style={place(col)}>
      <div className={`relative ${aspect} overflow-hidden bg-cream`}>
        <Image
          src={image.src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="grade object-cover"
        />
      </div>
    </Reveal>
  );
}

// The full-bleed collage grid. Stacks to a single column below lg, where the
// scattered placement would only make the photographs small.
function Row({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`grid grid-cols-1 gap-6 px-6 sm:px-8 lg:grid-cols-[repeat(24,minmax(0,1fr))] lg:gap-5 lg:px-0 ${className}`}
    >
      {children}
    </div>
  );
}

// Project story told as an uneven collage: frames of different widths and
// heights, several running off the edge of the page, with the copy set into
// the gaps rather than centred between full-width images.
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();

  const idx = projects.indexOf(project);
  const next = projects[(idx + 1) % projects.length];
  const img = project.images;
  const alt = `${project.title}, ${project.suburb}`;

  return (
    <>
      <article className="bg-paper text-ink">
        {/* Title, then the intro set across the page rather than beneath */}
        <div className="container-x pb-12 pt-32 lg:pb-14 lg:pt-40">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="meta mb-5 text-verde">{project.subtitle}</div>
              </Reveal>
              <WordRise
                as="h1"
                className="display-md max-w-2xl"
                segments={[{ text: project.title }]}
                stagger={0.05}
              />
            </div>
            <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <p className="text-lg leading-relaxed text-ink/75 text-pretty">{project.intro}</p>
            </Reveal>
          </div>
        </div>

        {/* Row A: narrow portrait hard against the left edge, wide frame
            dropped below it and running off the right edge */}
        <Row>
          {img[0] && (
            <Frame
              image={img[0]}
              alt={alt}
              col="1 / span 6"
              sizes="(min-width: 1024px) 25vw, 100vw"
              priority
            />
          )}
          {img[1] && (
            <Frame
              image={img[1]}
              alt={alt}
              col="8 / span 17"
              sizes="(min-width: 1024px) 71vw, 100vw"
              className="lg:mt-[6vw]"
              priority
            />
          )}
        </Row>

        {/* Copy set left, in the space the wide frame above leaves open */}
        <div className="container-x py-10 lg:py-16">
          <Reveal className="lg:w-[37%] lg:min-w-[420px]">
            <p className="text-lg leading-relaxed text-ink/80 text-pretty">{project.body[0]}</p>
          </Reveal>
        </div>

        {/* Row B: one frame alone at the left, the rest of the row empty */}
        <Row>
          {img[2] && (
            <Frame
              image={img[2]}
              alt={alt}
              col="2 / span 9"
              sizes="(min-width: 1024px) 38vw, 100vw"
            />
          )}
        </Row>

        {/* Row C: a pair pushed to the right, staggered against each other */}
        <Row className="mt-6 lg:mt-14">
          {img[3] && (
            <Frame
              image={img[3]}
              alt={alt}
              col="11 / span 6"
              sizes="(min-width: 1024px) 25vw, 100vw"
            />
          )}
          {img[4] && (
            <Frame
              image={img[4]}
              alt={alt}
              col="18 / span 6"
              sizes="(min-width: 1024px) 25vw, 100vw"
              className="lg:mt-[7vw]"
            />
          )}
        </Row>

        {/* Copy set right */}
        <div className="container-x py-10 lg:py-16">
          <Reveal className="lg:ml-auto lg:w-[37%] lg:min-w-[420px]">
            <p className="text-lg leading-relaxed text-ink/80 text-pretty">{project.body[1]}</p>
          </Reveal>
        </div>

        {/* Row D: the widest frame, held to the container margins */}
        <Row>
          {img[5] && (
            <Frame
              image={img[5]}
              alt={alt}
              col="2 / span 22"
              sizes="(min-width: 1024px) 92vw, 100vw"
              // Fixed regardless of orientation: at 92vw a portrait frame would
              // be taller than the screen twice over.
              ratio="aspect-[16/9]"
            />
          )}
        </Row>

        {/* Row E: a small frame at the left with the record and the last of the
            copy set beside it, the way the reference shares a row */}
        <Row className="mt-6 items-start lg:mt-16">
          {img[6] && (
            <Frame
              image={img[6]}
              alt={alt}
              col="2 / span 7"
              sizes="(min-width: 1024px) 29vw, 100vw"
            />
          )}
          <Reveal
            delay={0.1}
            className="lg:pt-[4vw] lg:[grid-column:var(--col)]"
            style={place('11 / span 12')}
          >
            <p className="text-lg leading-relaxed text-ink/80 text-pretty">{project.body[2]}</p>
            <dl className="mt-10 max-w-md border-t border-ink/15 pt-6 text-sm">
              <div className="flex justify-between gap-6 py-2.5">
                <dt className="meta-sm text-stone">Scope</dt>
                <dd className="text-right text-ink/80">{project.scope.join(', ')}</dd>
              </div>
              <div className="flex justify-between gap-6 border-t border-ink/10 py-2.5">
                <dt className="meta-sm text-stone">Year</dt>
                <dd className="text-right text-ink/80" data-numeric>
                  {project.year}
                </dd>
              </div>
              <div className="flex justify-between gap-6 border-t border-ink/10 py-2.5">
                <dt className="meta-sm text-stone">Location</dt>
                <dd className="text-right text-ink/80">{project.location}</dd>
              </div>
              <div className="flex justify-between gap-6 border-t border-ink/10 py-2.5">
                <dt className="meta-sm text-stone">Built by</dt>
                <dd className="text-right text-ink/80">{studio.name}</dd>
              </div>
            </dl>
          </Reveal>
        </Row>

        {/* Row F: wide frame off the left edge, narrow one off the right */}
        <Row className="mt-6 pb-16 lg:mt-16 lg:pb-24">
          {img[7] && (
            <Frame
              image={img[7]}
              alt={alt}
              col="1 / span 18"
              sizes="(min-width: 1024px) 75vw, 100vw"
              ratio="aspect-[3/2]"
            />
          )}
          {img[8] && (
            <Frame
              image={img[8]}
              alt={alt}
              col="20 / span 5"
              sizes="(min-width: 1024px) 21vw, 100vw"
              className="lg:mt-[5vw]"
            />
          )}
        </Row>

        {/* Next project */}
        <div className="container-x pb-20 lg:pb-28">
          <Reveal>
            <Link href={`/portfolio/${next.id}`} className="group block border-t border-ink/15 pt-8">
              <div className="meta-sm mb-4 text-stone">Next project</div>
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h2 className="font-serif text-3xl tracking-tighter2 transition-colors duration-500 group-hover:text-verde sm:text-5xl">
                  {next.title}
                </h2>
                <span className="meta text-stone transition-colors duration-500 group-hover:text-ink">
                  {next.location}
                  <span
                    aria-hidden
                    className="ml-4 inline-block transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </article>

      <Cta
        title="Want something like this?"
        body={`Tell ${studio.founder} about your site. Every enquiry is answered within two business days.`}
      />
    </>
  );
}
