import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { projects, studio, type Project } from '@/lib/content';
import { Reveal } from '@/components/motion/Reveal';
import { WordRise } from '@/components/motion/WordRise';
import { Cta } from '@/components/site/Cta';
import type { CSSProperties } from 'react';

export const metadata: Metadata = { title: 'Projects' };

// Where each project sits on the scattered index. `col` places the tile on the
// 24-column full-bleed grid, `lift` pulls the tile up into the space the one
// before it leaves open, which is what makes the page read as a collage rather
// than a grid. Values are in vw so the whole arrangement scales together.
const TILES = [
  { col: '2 / span 12', ratio: 'aspect-[4/3]', lift: '', sizes: '50vw' },
  { col: '15 / span 9', ratio: 'aspect-[3/4]', lift: 'lg:-mt-[30vw]', sizes: '38vw' },
  { col: '4 / span 11', ratio: 'aspect-[3/2]', lift: 'lg:-mt-[16vw]', sizes: '46vw' },
  { col: '15 / span 8', ratio: 'aspect-[3/4]', lift: 'lg:-mt-[8vw]', sizes: '34vw' },
  { col: '2 / span 10', ratio: 'aspect-[3/2]', lift: 'lg:-mt-[12vw]', sizes: '42vw' },
];

function Tile({ project, i }: { project: Project; i: number }) {
  const tile = TILES[i % TILES.length];
  return (
    <div
      className={`grid grid-cols-1 px-6 sm:px-8 lg:grid-cols-[repeat(24,minmax(0,1fr))] lg:px-0 ${tile.lift}`}
    >
      <Reveal
        className="lg:[grid-column:var(--col)]"
        style={{ '--col': tile.col } as CSSProperties}
        amount={0.15}
      >
        <Link href={`/portfolio/${project.id}`} className="group block">
          <div className={`relative ${tile.ratio} overflow-hidden bg-cream`}>
            <Image
              src={project.cover}
              alt=""
              fill
              sizes={`(min-width: 1024px) ${tile.sizes}, 100vw`}
              className="grade object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.04]"
            />
            {/* Nothing is written on the photograph until it is pointed at */}
            <div
              className="absolute inset-0 bg-ink/0 transition-colors duration-700 ease-out-expo lg:group-hover:bg-ink/25"
              aria-hidden
            />
            <div
              className="absolute inset-0 hidden items-center justify-center lg:flex"
              aria-hidden
            >
              <span className="translate-y-3 font-serif text-5xl tracking-tighter2 text-paper opacity-0 transition-all duration-700 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 xl:text-6xl">
                {project.suburb}
              </span>
            </div>
          </div>

          {/* Touch has no hover, so the same label sits under the photograph
              on small screens instead of over it. */}
          <div className="mt-4 flex items-baseline justify-between gap-4 lg:hidden">
            <span className="font-serif text-3xl tracking-tighter2">{project.suburb}</span>
            <span className="meta-sm text-stone" data-numeric>
              {project.year}
            </span>
          </div>

          <span className="sr-only">
            {project.title}, {project.location}
          </span>
        </Link>
      </Reveal>
    </div>
  );
}

// Index of the work: a photograph per project, scattered down the page, with
// the suburb revealed on hover. No titles, no captions, no grid.
export default function ProjectsPage() {
  return (
    <>
      <section className="container-x pb-14 pt-32 lg:pb-24 lg:pt-40">
        <Reveal>
          <div className="meta mb-6 text-stone">Our projects</div>
        </Reveal>
        <WordRise
          as="h1"
          className="display max-w-4xl text-balance"
          segments={[{ text: 'Landscape design and' }, { text: 'construction projects.', italic: true }]}
          stagger={0.05}
        />
      </section>

      <section className="pb-24 lg:pb-40">
        <div className="flex flex-col gap-12 lg:gap-0">
          {projects.map((project, i) => (
            <Tile key={project.id} project={project} i={i} />
          ))}
        </div>
      </section>

      <Cta
        title="Have a project in mind?"
        body={`Tell ${studio.founder} what you are planning. Every enquiry is answered within two business days.`}
      />
    </>
  );
}
