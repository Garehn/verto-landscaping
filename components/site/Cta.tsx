import Link from 'next/link';
import Image from 'next/image';
import { studio } from '@/lib/content';
import { Marquee } from '@/components/motion/Marquee';
import { WordRise, type WordSegment } from '@/components/motion/WordRise';
import { Reveal } from '@/components/motion/Reveal';

const marqueeItems = ['Verto Landscapes', 'Castlecrag', 'Sydney', 'Design', 'Build', 'Care'];

type Props = {
  title?: string;
  body?: string;
  href?: string;
  cta?: string;
};

const defaultSegments: WordSegment[] = [
  { text: "Let's begin" },
  { text: 'yours.', italic: true },
];

export function Cta({
  title,
  body = `Tell ${studio.founder} about the garden you have, and the one you want. Every enquiry is answered within two business days.`,
  href = '/contact',
  cta = 'Start a project',
}: Props) {
  const segments: WordSegment[] = title ? [{ text: title }] : defaultSegments;

  return (
    <section className="overflow-hidden bg-ink text-paper">
      <Marquee className="border-y border-paper/10 py-5">
        {marqueeItems.map((item) => (
          <span key={item} className="meta flex items-center text-paper/60">
            <span className="px-8">{item}</span>
            <span className="text-brass">·</span>
          </span>
        ))}
      </Marquee>

      <div className="container-x py-20 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <WordRise as="h2" className="display-md" segments={segments} stagger={0.07} />
            <Reveal delay={0.25} className="mt-8 max-w-md">
              <p className="text-lg leading-relaxed text-paper/75 text-pretty">{body}</p>
            </Reveal>
            <Reveal delay={0.4} className="mt-12 flex flex-wrap gap-4">
              <Link href={href} className="btn-cta group">
                {cta} <span aria-hidden className="arrow">→</span>
              </Link>
              <a href={studio.phoneHref} className="btn-ghost-light group" data-numeric>
                {studio.phone}
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.3} className="lg:col-span-4 lg:col-start-9">
            <div className="space-y-6 border-l border-paper/15 pl-8">
              <Image src="/images/real/logo-white.png" alt="" aria-hidden width={160} height={128} className="h-20 w-auto opacity-90" />
              <div>
                <div className="meta-sm mb-2 text-sage">Studio</div>
                <div className="text-sm leading-relaxed text-paper/75">
                  {studio.address.street}
                  <br />
                  {studio.address.suburb} {studio.address.state} {studio.address.postcode}
                </div>
              </div>
              <div>
                <div className="meta-sm mb-2 text-sage">Direct</div>
                <div className="text-sm leading-relaxed text-paper/75">
                  <a href={`mailto:${studio.email}`} className="link-underline">
                    {studio.email}
                  </a>
                  <br />
                  <a href={studio.phoneHref} data-numeric className="hover:text-paper">
                    {studio.phone}
                  </a>
                </div>
              </div>
              <div>
                <div className="meta-sm mb-2 text-sage">Hours</div>
                <div className="text-sm leading-relaxed text-paper/75">Mon–Fri · 8am–5pm</div>
              </div>
              <div>
                <div className="meta-sm mb-2 text-sage">Response</div>
                <div className="text-sm leading-relaxed text-paper/75">Every enquiry answered within two business days</div>
              </div>
              <div className="meta-sm pt-2 text-sage/70" data-numeric>
                {studio.coords}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
