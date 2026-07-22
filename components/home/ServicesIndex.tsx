'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { coreServices } from '@/lib/content';
import { images, type ImageRef } from '@/lib/unsplash';
import { Reveal } from '@/components/motion/Reveal';
import { EASE } from '@/components/motion/ease';

// Editorial index of capabilities. On pointer devices a floating image
// preview trails the cursor over the hovered row.
const previewFor: Record<string, ImageRef> = {
  design: 'service_design',
  hardscape: 'service_build',
  planting: 'service_planting',
  turf: 'service_care',
  irrigation: 'process_build',
  lighting: 'slider_1',
};

export function ServicesIndex() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 180, damping: 24, mass: 0.6 });
  const y = useSpring(my, { stiffness: 180, damping: 24, mass: 0.6 });

  function onMove(e: React.MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  }

  const activeService = coreServices.find((s) => s.id === active);

  return (
    <section className="bg-paper text-ink">
      <div className="container-x pb-20 pt-2 lg:pb-28">
        <Reveal className="mb-10 flex items-center gap-6">
          <span className="meta-sm text-brass" data-numeric>04</span>
          <span className="meta text-stone">Capabilities</span>
          <span className="h-px flex-1 bg-ink/10" aria-hidden />
          <Link href="/services" className="meta link-underline hidden py-1 sm:inline-block">
            All services
          </Link>
        </Reveal>

        <div
          ref={containerRef}
          className="relative"
          onMouseMove={reduced ? undefined : onMove}
          onMouseLeave={() => setActive(null)}
        >
          {coreServices.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.06} y={24}>
              <Link
                href="/services"
                className="group relative z-10 flex items-baseline gap-6 border-t border-ink/10 py-6 transition-colors duration-500 last:border-b last:border-ink/10 sm:gap-10 sm:py-7"
                onMouseEnter={() => setActive(service.id)}
                onFocus={() => setActive(service.id)}
                onBlur={() => setActive(null)}
              >
                <span className="meta-sm w-8 shrink-0 text-brass" data-numeric>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0">
                  <span className="block font-serif text-3xl tracking-tighter2 transition-transform duration-500 ease-out-expo group-hover:translate-x-2 sm:text-4xl lg:text-5xl">
                    {service.title}
                  </span>
                  <span className="meta-sm mt-2 flex flex-wrap items-center gap-x-3 text-stone">
                    {service.scope.map((tag, t) => (
                      <span key={tag} className="flex items-center gap-3">
                        {t > 0 && <span className="text-brass">·</span>}
                        {tag}
                      </span>
                    ))}
                  </span>
                </span>
                <span className="ml-auto hidden max-w-[16rem] text-sm leading-snug text-stone md:block">
                  {service.body}
                </span>
                <span
                  aria-hidden
                  className="hidden text-xl text-stone transition-all duration-500 ease-out-expo group-hover:translate-x-1 group-hover:text-ink sm:block"
                >
                  →
                </span>
              </Link>
            </Reveal>
          ))}

          {/* Floating cursor preview — pointer devices only */}
          {!reduced && (
            <motion.div
              className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block"
              style={{ x, y }}
              aria-hidden
            >
              <AnimatePresence>
                {activeService && (
                  <motion.div
                    key={activeService.id}
                    className="relative -translate-x-1/2 -translate-y-1/2 overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <Image
                      src={images[previewFor[activeService.id]].src}
                      alt=""
                      width={340}
                      height={240}
                      className="grade h-[240px] w-[340px] object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
