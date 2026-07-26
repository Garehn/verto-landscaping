import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { projects, studio } from '@/lib/content';
import { Reveal } from '@/components/motion/Reveal';
import { WordRise } from '@/components/motion/WordRise';
import { Cta } from '@/components/site/Cta';

export const metadata: Metadata = { title: 'Projects' };

// Clean two-column index: image first, title and location beneath, consistent
// aspect ratio throughout so the grid reads as one set of work.
export default function ProjectsPage() {
  return (
    <>
      <section className="container-x pb-14 pt-32 lg:pb-20 lg:pt-40">
        <Reveal>
          <div className="meta mb-6 text-stone">Our projects</div>
        </Reveal>
        <WordRise
          as="h1"
          className="display max-w-4xl text-balance"
          segments={[{ text: 'Landscape design and' }, { text: 'construction projects.', italic: true }]}
          stagger={0.05}
        />
        <Reveal delay={0.2}>
          <p className="body-lg mt-8 max-w-2xl text-ink/70 text-pretty">
            Paving, stonework, retaining, pool surrounds and driveways. Every
            project below sits within {studio.radiusKm}km of the studio in{' '}
            {studio.address.suburb}.
          </p>
        </Reveal>
      </section>

      <div className="container-x"><div className="rule" /></div>

      <section className="container-x pb-24 pt-14 lg:pb-32 lg:pt-20">
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:gap-x-10 lg:gap-y-20">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 2) * 0.1}>
              <Link href={`/portfolio/${project.id}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                  <Image
                    src={project.images[0]}
                    alt={`${project.title}, ${project.location}`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="grade object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h2 className="font-serif text-3xl tracking-tighter2 transition-colors duration-500 group-hover:text-verde sm:text-4xl">
                    {project.title}
                  </h2>
                  <span className="meta-sm shrink-0 text-stone" data-numeric>
                    {project.year}
                  </span>
                </div>
                <div className="meta-sm mt-3 flex flex-wrap items-center gap-x-3 text-stone">
                  <span>{project.location}</span>
                  {project.scope.map((tag) => (
                    <span key={tag} className="flex items-center gap-3">
                      <span className="text-verde">·</span>
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </Reveal>
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
