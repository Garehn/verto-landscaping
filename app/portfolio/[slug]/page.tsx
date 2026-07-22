import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { portfolio, studio } from '@/lib/content';
import { images } from '@/lib/unsplash';
import { BeforeAfter } from '@/components/site/BeforeAfter';
import { Reveal } from '@/components/motion/Reveal';
import { WordRise } from '@/components/motion/WordRise';
import { Cta } from '@/components/site/Cta';

// Every photo on a project page belongs to that project: the real hero shot
// first (as the After in the drag slider, against an AI-imagined Before),
// then two more angles of the same garden.
const media: Record<
  string,
  { before: string; angles: { src: string; alt: string; caption: string }[] }
> = {
  'castlecrag-pool': {
    before: '/images/real/gen/before-pool.jpg',
    angles: [
      {
        src: '/images/real/gen/angle-pool-2.jpg',
        alt: 'Along the pool edge — stone coping, potted olives, harbour valley beyond',
        caption: 'Along the pool edge — coping, olives, the valley beyond',
      },
      {
        src: '/images/real/gen/angle-pool-3.jpg',
        alt: 'From the far corner of the pool terrace looking back at the house',
        caption: 'Looking back at the house from the terrace corner',
      },
    ],
  },
  'castlecrag-deck': {
    before: '/images/real/gen/before-deck.jpg',
    angles: [
      {
        src: '/images/real/passage.jpg',
        alt: 'Stone-cobbled side passage with timber batten gate at the same property',
        caption: 'The side passage — cobbles and timber battens',
      },
      {
        src: '/images/real/gen/angle-deck-2.jpg',
        alt: 'Across the hardwood boards toward the furniture and glass pool fence',
        caption: 'Across the boards to the glass pool fence',
      },
    ],
  },
  'castlecrag-arrival': {
    before: '/images/real/gen/before-driveway.jpg',
    angles: [
      {
        src: '/images/real/planting.jpg',
        alt: 'Magnolia and layered planting in the sandstone-edged entry bed',
        caption: 'The entry bed — magnolia, layered planting, brass lighting',
      },
      {
        src: '/images/real/facade.jpg',
        alt: 'The finished front garden and entry path from the street',
        caption: 'The finished arrival, seen from the street',
      },
    ],
  },
};

export function generateStaticParams() {
  return portfolio.map((p) => ({ slug: p.id }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = portfolio.find((p) => p.id === slug);
  const m = media[slug];
  if (!project || !m) notFound();
  const index = portfolio.indexOf(project) + 1;

  return (
    <>
      <article className="bg-paper pt-24 text-ink sm:pt-32">
        <div className="container-x pb-20 lg:pb-28">
          <Reveal className="mb-8 flex items-center gap-6">
            <span className="meta-sm text-brass" data-numeric>
              {String(index).padStart(2, '0')} / {String(portfolio.length).padStart(2, '0')}
            </span>
            <span className="meta text-stone">
              {project.location} — {project.year}
            </span>
            <span className="h-px flex-1 bg-ink/10" aria-hidden />
            <Link href="/portfolio" className="meta link-underline hidden py-1 sm:inline-block">
              All projects
            </Link>
          </Reveal>

          <WordRise
            as="h1"
            className="display-md max-w-3xl"
            segments={[{ text: project.title }]}
            stagger={0.05}
          />
          <Reveal delay={0.15} className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <p className="max-w-xl text-lg leading-relaxed text-ink/70 text-pretty">
              {project.blurb}
            </p>
            <div className="meta-sm flex flex-wrap items-center gap-x-3 text-stone">
              {project.scope.map((tag, t) => (
                <span key={tag} className="flex items-center gap-3">
                  {t > 0 && <span className="text-brass">·</span>}
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

          {/* The transformation — drag to reveal */}
          <Reveal className="mt-12">
            <BeforeAfter
              beforeSrc={images[project.image].src}
              afterSrc={m.before}
              beforeAlt={images[project.image].alt}
              afterAlt={`Before the works — ${project.title.toLowerCase()}`}
              label={`${project.location} — before / after`}
            />
          </Reveal>

          {/* Two more angles of the same project */}
          <div className="mt-16 space-y-16 lg:mt-20">
            {m.angles.map((photo) => (
              <Reveal key={photo.src}>
                <figure>
                  <div className="relative aspect-[16/10] overflow-hidden bg-cream">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1440px) 1312px, 100vw"
                      className="grade object-cover"
                    />
                  </div>
                  <figcaption className="meta-sm mt-4 text-stone">{photo.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </article>
      <Cta
        title="Want a garden like this one?"
        body={`Tell ${studio.founder} about your block — every enquiry is answered within two business days.`}
      />
    </>
  );
}
