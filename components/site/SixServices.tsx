import Link from 'next/link';
import { coreServices, type CoreServiceIcon } from '@/lib/content';
import { FadeIn } from './FadeIn';

const ICON_PATHS: Record<CoreServiceIcon, React.ReactNode> = {
  // Drafting triangle + pencil
  design: (
    <>
      <path d="M4 22L20 22" />
      <path d="M5 22L13 4L21 22" />
      <path d="M9 16H17" />
    </>
  ),
  // Stacked stones / paving
  hardscape: (
    <>
      <rect x="3" y="14" width="8" height="5" />
      <rect x="13" y="14" width="8" height="5" />
      <rect x="6" y="8" width="8" height="5" />
      <rect x="16" y="8" width="5" height="5" />
      <rect x="3" y="3" width="6" height="4" />
      <rect x="11" y="3" width="10" height="4" />
    </>
  ),
  // Leaf / sapling
  planting: (
    <>
      <path d="M12 21V11" />
      <path d="M12 11C12 11 6 9 6 4C6 4 11 4 12 8" />
      <path d="M12 11C12 11 18 9 18 4C18 4 13 4 12 8" />
    </>
  ),
  // Grass blades
  turf: (
    <>
      <path d="M3 21C3 17 5 13 7 12" />
      <path d="M9 21C9 16 11 11 13 10" />
      <path d="M15 21C15 16 17 13 19 12" />
      <path d="M21 21C21 18 22 16 22 15" />
      <line x1="2" y1="21" x2="22" y2="21" />
    </>
  ),
  // Water droplet
  irrigation: (
    <>
      <path d="M12 3C12 3 5 11 5 16C5 19.866 8.134 22 12 22C15.866 22 19 19.866 19 16C19 11 12 3 12 3Z" />
      <path d="M9 17C9 15 10 13 12 13" opacity="0.6" />
    </>
  ),
  // Sun / radiating lines
  lighting: (
    <>
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2V5" />
      <path d="M12 19V22" />
      <path d="M2 12H5" />
      <path d="M19 12H22" />
      <path d="M4.93 4.93L7.05 7.05" />
      <path d="M16.95 16.95L19.07 19.07" />
      <path d="M4.93 19.07L7.05 16.95" />
      <path d="M16.95 7.05L19.07 4.93" />
    </>
  ),
};

export function SixServices() {
  return (
    <section className="container-x py-24 lg:py-32 border-t border-line">
      <FadeIn className="mb-14 flex items-end justify-between gap-8 flex-wrap">
        <div>
          <div className="eyebrow mb-4">What we do</div>
          <h2 className="display max-w-3xl text-balance">
            Six capabilities, <span className="display-italic">one studio.</span>
          </h2>
        </div>
        <p className="max-w-md text-stone leading-relaxed">
          A complete in-house team — so the path from a first conversation to the third spring runs through one studio, not six.
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-line">
        {coreServices.map((s, i) => (
          <FadeIn key={s.id} delay={(i % 3) * 0.06} className="group relative border-b border-r border-line p-8 lg:p-10 transition-colors hover:bg-cream/60">
            <Link href={`/services#${s.id}`} className="block">
              <div className="flex items-start gap-4 mb-5">
                <span className="shrink-0 size-12 rounded-full border border-ink/15 flex items-center justify-center transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    {ICON_PATHS[s.icon]}
                  </svg>
                </span>
                <div className="text-xs uppercase tracking-[0.18em] text-stone pt-3.5">
                  0{i + 1}
                </div>
              </div>

              <h3 className="font-serif text-2xl md:text-[1.7rem] tracking-tighter2 mb-3 text-balance">
                {s.title}
              </h3>
              <p className="text-stone leading-relaxed mb-6">{s.body}</p>

              <div className="text-xs uppercase tracking-[0.2em] text-ink flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
                Learn more
                <span aria-hidden>→</span>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
