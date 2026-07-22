import { Counter } from '@/components/motion/Counter';
import { Reveal } from '@/components/motion/Reveal';

// Numbers pulled from the studio's own copy — nothing invented.
const stats = [
  { value: 8, suffix: '', label: 'Projects a year — never more' },
  { value: 4, suffix: '', label: 'Care visits in the first year' },
  { value: 2, suffix: '', label: 'Formal design presentations' },
];

export function StatsBand() {
  return (
    <section className="bg-paper text-ink">
      <div className="container-x py-24 lg:py-32">
        <Reveal className="mb-16 flex items-center gap-6">
          <span className="meta-sm text-brass" data-numeric>03</span>
          <span className="meta text-stone">Slow on purpose</span>
          <span className="h-px flex-1 bg-ink/10" aria-hidden />
        </Reveal>

        <div className="grid gap-12 sm:grid-cols-3 sm:gap-8">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.12} className={i === 0 ? '' : 'sm:border-l sm:border-ink/10 sm:pl-8'}>
              <div className="font-serif text-7xl tracking-tighter2 lg:text-8xl">
                <Counter to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="meta mt-5 text-stone">{stat.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
