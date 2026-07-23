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
type Story = { brief: string; excelled: string; quote: string; owner: string };
const media: Record<
  string,
  { before: string; story: Story; angles: { src: string; alt: string; caption: string }[] }
> = {
  'castlecrag-pool': {
    before: '/images/real/gen/before-pool.jpg',
    story: {
      brief:
        'A tired paved terrace holding the best view on the street, and nothing to frame it. The owners asked for a pool that would sit in the view, not in front of it.',
      excelled:
        'We cut the pool into the level so the water line runs to the horizon, kept every finish pale and quiet, stone surrounds, three olives on the boundary, and let the harbour do the talking.',
      quote:
        'Every trade turned up when Rory said they would. The pool looks like it was always here, the view finally has somewhere to land.',
      owner: 'Private clients, Castlecrag',
    },
    angles: [
      {
        src: '/images/real/gen/angle-pool-2.jpg',
        alt: 'Skimming the water line, stone coping and olives, harbour valley beyond',
        caption: 'At the water line, coping, olives, the valley beyond',
      },
      {
        src: '/images/real/gen/angle-pool-3.jpg',
        alt: 'The pool from above, terrace, water and lawn in plan',
        caption: 'From above, the terrace reads like the drawing',
      },
    ],
  },
  'castlecrag-deck': {
    before: '/images/real/gen/before-deck.jpg',
    story: {
      brief:
        'The house opened straight onto a pool the family could barely use, no deck, no shade, nowhere to sit. They asked for an outdoor room, not a walkway.',
      excelled:
        'Wide hardwood boards laid flush with the interior floor, glass fencing so the pool reads as part of the room, and planting to soften every hard edge.',
      quote:
        'It is the room we use most now. The kids are in the pool every afternoon and we have not moved the chairs since the crew left.',
      owner: 'Owners, Castlecrag',
    },
    angles: [
      {
        src: '/images/real/passage.jpg',
        alt: 'Stone-cobbled side passage with timber batten gate at the same property',
        caption: 'The side passage, cobbles and timber battens',
      },
      {
        src: '/images/real/gen/angle-deck-2.jpg',
        alt: 'Low along the deck boards at dusk, pool glowing beyond the glass fence',
        caption: 'Deck boards at dusk, the pool just beyond the glass',
      },
    ],
  },
  'castlecrag-arrival': {
    before: '/images/real/gen/before-driveway.jpg',
    story: {
      brief:
        'A cracked concrete drive and a front garden that apologised for the house. The brief was one line: make the arrival worth the address.',
      excelled:
        'Granite cobbles laid in course, sandstone-edged beds, olives and magnolias for year-round structure, and low brass lighting that carries it after dark.',
      quote:
        'People genuinely slow down as they drive past. It changed how the whole house presents from the street.',
      owner: 'Owners, Castlecrag',
    },
    angles: [
      {
        src: '/images/real/planting.jpg',
        alt: 'Magnolia and layered planting in the sandstone-edged entry bed',
        caption: 'The entry bed, magnolia, layered planting, brass lighting',
      },
      {
        src: '/images/real/gen/angle-arrival-2.jpg',
        alt: 'The cobbled arrival court at dusk, garden lighting glowing along the beds',
        caption: 'The arrival at dusk, the lighting carries it',
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
              {project.location} · {project.year}
            </span>
            <span className="h-px flex-1 bg-ink/10" aria-hidden />
            <Link href="/portfolio" className="meta link-underline hidden py-2 sm:inline-block">
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

          {/* The transformation, drag to reveal */}
          <Reveal className="mt-12">
            <BeforeAfter
              beforeSrc={images[project.image].src}
              afterSrc={m.before}
              beforeAlt={images[project.image].alt}
              afterAlt={`Before the works, ${project.title.toLowerCase()}`}
              label={`${project.location} · before / after`}
            />
          </Reveal>

          {/* The story, angles either side of the copy */}
          <div className="mt-20 grid gap-8 lg:mt-28 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                  <Image
                    src={m.angles[0].src}
                    alt={m.angles[0].alt}
                    fill
                    sizes="(min-width: 1024px) 800px, 100vw"
                    className="grade object-cover"
                  />
                </div>
                <figcaption className="meta-sm mt-4 text-stone">{m.angles[0].caption}</figcaption>
              </figure>
            </Reveal>
            <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9 lg:self-center">
              <div className="meta-sm mb-3 text-brass">The brief</div>
              <p className="text-base leading-relaxed text-ink/75 text-pretty">{m.story.brief}</p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-8 lg:mt-24 lg:grid-cols-12">
            <Reveal delay={0.1} className="order-2 lg:order-1 lg:col-span-4 lg:col-start-2 lg:self-center">
              <div className="meta-sm mb-3 text-brass">How we delivered</div>
              <p className="text-base leading-relaxed text-ink/75 text-pretty">{m.story.excelled}</p>
            </Reveal>
            <Reveal className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                  <Image
                    src={m.angles[1].src}
                    alt={m.angles[1].alt}
                    fill
                    sizes="(min-width: 1024px) 700px, 100vw"
                    className="grade object-cover"
                  />
                </div>
                <figcaption className="meta-sm mt-4 text-stone">{m.angles[1].caption}</figcaption>
              </figure>
            </Reveal>
          </div>

          {/* From the owners */}
          <Reveal className="mx-auto mt-20 max-w-3xl text-center lg:mt-28">
            <span className="mx-auto block h-px w-10 bg-brass" aria-hidden />
            <blockquote className="mt-8 font-serif italic text-2xl leading-snug tracking-tighter2 text-ink/90 sm:text-3xl">
              &ldquo;{m.story.quote}&rdquo;
            </blockquote>
            <div className="meta-sm mt-6 text-stone">{m.story.owner}</div>
          </Reveal>
        </div>
      </article>
      <Cta
        title="Want a garden like this one?"
        body={`Tell ${studio.founder} about your block, every enquiry is answered within two business days.`}
      />
    </>
  );
}
