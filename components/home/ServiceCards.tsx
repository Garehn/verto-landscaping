import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/motion/Reveal';

const cards: { title: string; body: string; image: string; href: string }[] = [
  {
    title: 'Design',
    body: 'Survey, levels and full construction drawings.',
    image: '/images/proj/edinburgh/aerial.jpg',
    href: '/services#design',
  },
  {
    title: 'Paving & stone',
    body: 'Sandstone, bluestone and granite cobble, laid to line.',
    image: '/images/proj/battlement/cobble-texture.jpg',
    href: '/services#paving',
  },
  {
    title: 'Retaining',
    body: 'Sandstone block, masonry, steps and structures.',
    image: '/images/proj/site/timber-lawn.jpg',
    href: '/services#retaining',
  },
  {
    title: 'Pools & decking',
    body: 'Coping, surrounds, hardwood decks and glass fencing.',
    image: '/images/proj/edinburgh/pool-detail.jpg',
    href: '/services#pools',
  },
];

export function ServiceCards() {
  return (
    <section className="bg-paper text-ink">
      <div className="container-x pb-20 lg:pb-28">
        <Reveal className="mb-12 flex items-center gap-6">
          <span className="meta-sm text-verde" data-numeric>02</span>
          <span className="meta text-stone">What we do</span>
          <span className="h-px flex-1 bg-ink/10" aria-hidden />
        </Reveal>

        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.08}>
              <Link href={card.href} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-cream">
                  <Image
                    src={card.image}
                    alt={card.title}
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
