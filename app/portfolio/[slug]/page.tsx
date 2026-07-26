import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { projects, studio } from '@/lib/content';
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

// Editorial project story: full-bleed hero, title and short intro, then body
// copy alternating with full-width imagery, a scope record, and the next project.
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();

  const idx = projects.indexOf(project);
  const next = projects[(idx + 1) % projects.length];
  const [hero, ...rest] = project.images;

  return (
    <>
      {/* Hero */}
      <section className="pt-16 sm:pt-20">
        <div className="relative h-[62vh] min-h-[420px] w-full overflow-hidden bg-ink-2 lg:h-[76vh]">
          <Image
            src={hero}
            alt={`${project.title}, ${project.location}`}
            fill
            priority
            sizes="100vw"
            className="grade object-cover"
          />
        </div>
      </section>

      <article className="bg-paper text-ink">
        {/* Title block */}
        <div className="container-x pb-14 pt-14 lg:pb-20 lg:pt-20">
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

        {/* Image 2 */}
        {rest[0] && (
          <Reveal className="container-x">
            <div className="relative aspect-[16/9] overflow-hidden bg-cream">
              <Image
                src={rest[0]}
                alt={`${project.title}, ${project.location}`}
                fill
                sizes="(min-width: 1440px) 1312px, 100vw"
                className="grade object-cover"
              />
            </div>
          </Reveal>
        )}

        {/* Body 1 */}
        <div className="container-x py-14 lg:py-20">
          <Reveal className="mx-auto max-w-2xl">
            <p className="text-lg leading-relaxed text-ink/80 text-pretty">{project.body[0]}</p>
          </Reveal>
        </div>

        {/* Images 3 and 4, paired */}
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:gap-8">
          {rest.slice(1, 3).map((src, i) => (
            <Reveal key={src} delay={i * 0.1}>
              <div className="relative aspect-[4/5] overflow-hidden bg-cream">
                <Image
                  src={src}
                  alt={`${project.title}, ${project.location}`}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="grade object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Body 2 */}
        <div className="container-x py-14 lg:py-20">
          <Reveal className="mx-auto max-w-2xl">
            <p className="text-lg leading-relaxed text-ink/80 text-pretty">{project.body[1]}</p>
          </Reveal>
        </div>

        {/* Image 5 */}
        {rest[3] && (
          <Reveal className="container-x">
            <div className="relative aspect-[16/9] overflow-hidden bg-cream">
              <Image
                src={rest[3]}
                alt={`${project.title}, ${project.location}`}
                fill
                sizes="(min-width: 1440px) 1312px, 100vw"
                className="grade object-cover"
              />
            </div>
          </Reveal>
        )}

        {/* Body 3 + the record */}
        <div className="container-x py-14 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-6">
              <p className="text-lg leading-relaxed text-ink/80 text-pretty">{project.body[2]}</p>
            </Reveal>
            <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
              <dl className="border-t border-ink/15 pt-6 text-sm">
                <div className="flex justify-between gap-6 py-2.5">
                  <dt className="meta-sm text-stone">Scope</dt>
                  <dd className="text-right text-ink/80">{project.scope.join(', ')}</dd>
                </div>
                <div className="flex justify-between gap-6 border-t border-ink/10 py-2.5">
                  <dt className="meta-sm text-stone">Year</dt>
                  <dd className="text-right text-ink/80" data-numeric>{project.year}</dd>
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
          </div>
        </div>

        {/* Image 6 */}
        {rest[4] && (
          <Reveal className="container-x pb-16 lg:pb-24">
            <div className="relative aspect-[16/9] overflow-hidden bg-cream">
              <Image
                src={rest[4]}
                alt={`${project.title}, ${project.location}`}
                fill
                sizes="(min-width: 1440px) 1312px, 100vw"
                className="grade object-cover"
              />
            </div>
          </Reveal>
        )}

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
                  <span aria-hidden className="ml-4 inline-block transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
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
