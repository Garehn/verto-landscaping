import { Counter } from '@/components/motion/Counter';
import { Reveal } from '@/components/motion/Reveal';

// Numbers pulled from the studio's own copy, nothing invented.
const stats: { value?: number; suffix?: string; label: string; detail: string }[] = [
  {
    label: 'Your future project',
    detail: 'Taking time to craft perfection ensures value, care, and lasting satisfaction for any endeavour.',
  },
  {
    label: 'Service radius',
    detail: 'Every suburb within the Lower North Shore and Northern Beaches is where we love to be.',
  },
  {
    value: 2,
    label: 'Design presentations',
    detail: 'Formal reviews before costing, you sign off before we build.',
  },
  {
    value: 1,
    label: 'Lead on site, daily',
    detail: 'One project lead from first excavation to final set-out.',
  },
];

export function StatsBand() {
  return (
    <section className="bg-paper text-ink">
      <div className="container-x py-16 lg:py-24">
        <Reveal className="mb-12 flex items-center gap-6">
          <span className="meta-sm text-verde" data-numeric>03</span>
          <span className="meta text-stone">Anything you can imagine we can create</span>
          <span className="h-px flex-1 bg-ink/10" aria-hidden />
        </Reveal>

        <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.1}
              className={i === 0 ? '' : 'lg:border-l lg:border-ink/10 lg:pl-8'}
            >
              {stat.value === undefined ? (
                // Some of these are a statement rather than a number.
                <div className="font-serif text-4xl leading-[1.1] tracking-tighter2 text-balance lg:text-5xl">
                  {stat.label}
                </div>
              ) : (
                <>
                  <div className="font-serif text-6xl tracking-tighter2 lg:text-7xl">
                    <Counter to={stat.value} />
                  </div>
                  <div className="meta mt-4 text-ink/80">{stat.label}</div>
                </>
              )}
              <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-stone text-pretty">
                {stat.detail}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
