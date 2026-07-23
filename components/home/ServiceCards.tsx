import Link from 'next/link';
import Image from 'next/image';
import { images, type ImageRef } from '@/lib/unsplash';
import { Reveal } from '@/components/motion/Reveal';

const cards: { title: string; body: string; image: ImageRef; href: string }[] = [
  {
    title: 'Design',
    body: 'Site survey, master plan and planting design — measured drawings.',
    image: 'svc_design',
    href: '/services#design',
  },
  {
    title: 'Construction',
    body: 'Stone, timber, water and steel — built by crews we keep.',
    image: 'svc_construct',
    href: '/services#build',
  },
  {
    title: 'Planting',
    body: 'Palettes built for the soil and climate, grown on at our nursery.',
    image: 'svc_planting',
    href: '/services#planting',
  },
  {
    title: 'Care',
    body: 'Quarterly visits that hold the garden while it grows in.',
    image: 'svc_care',
    href: '/services#care',
  },
];

export function ServiceCards() {
  return (
    <section className="bg-paper text-ink">
      <div className="container-x pb-20 lg:pb-28">
        <Reveal className="mb-12 flex items-center gap-6">
          <span className="meta-sm text-brass" data-numeric>02</span>
          <span className="meta text-stone">What we do</span>
          <span className="h-px flex-1 bg-ink/10" aria-hidden />
        </Reveal>

        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.08}>
              <Link href={card.href} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-cream">
                  <Image
                    src={images[card.image].src}
                    alt={images[card.image].alt}
                    fill
                    sizes="(min-width: 1024px) 320px, 50vw"
                    className="grade object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.05]"
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-2xl tracking-tighter2">{card.title}</h3>
                  <span
                    aria-hidden
                    className="text-lg text-stone transition-all duration-500 ease-out-expo group-hover:translate-x-1 group-hover:text-ink"
                  >
                    →
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink/65 text-pretty">{card.body}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
