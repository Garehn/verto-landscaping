'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import {
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';
import { WordRise } from '@/components/motion/WordRise';
import { Reveal } from '@/components/motion/Reveal';
import { studio } from '@/lib/content';

const Terrain = dynamic(() => import('@/components/three/Terrain'), {
  ssr: false,
  loading: () => null,
});

// The 3D moment: a slowly breathing topographic landform, pushed through
// by scroll, with the studio's statement over it.
export function TerrainSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // Mount the canvas only when the section approaches the viewport.
  const near = useInView(sectionRef, { margin: '900px 0px', once: true });
  const visible = useInView(sectionRef, { margin: '10% 0px' });

  const scrollRef = useRef(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    scrollRef.current = v;
  });

  return (
    <section ref={sectionRef} className="relative bg-ink text-paper">
      <div className="relative h-[140vh]">
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
          {/* Terrain canvas */}
          {!reduced && near && (
            <div className={`absolute inset-0 ${visible ? '' : 'invisible'}`} aria-hidden>
              <Terrain scrollRef={scrollRef} />
            </div>
          )}

          {/* Statement */}
          <div className="container-x relative flex h-full flex-col justify-center">
            <Reveal className="mb-10 flex items-center gap-6">
              <span className="meta-sm text-brass" data-numeric>05</span>
              <span className="meta text-sage">Topography</span>
              <span className="h-px flex-1 bg-paper/10" aria-hidden />
            </Reveal>

            <WordRise
              as="h2"
              className="display max-w-4xl"
              segments={[
                { text: 'We shape ground' },
                { text: 'that holds its shape.', italic: true },
              ]}
              stagger={0.08}
            />

            <Reveal delay={0.3} className="mt-8 max-w-md">
              <p className="text-base leading-relaxed text-paper/70 sm:text-lg">
                Levels, drainage, soil and stone — the parts of a garden nobody
                photographs, done so well that everything above them looks inevitable.
              </p>
            </Reveal>

            {/* Groundwork capability strip */}
            <div className="absolute bottom-8 left-0 right-0">
              <div className="container-x">
                <div className="grid gap-6 border-t border-paper/15 pt-6 sm:grid-cols-3">
                  {[
                    { n: 'A', title: 'Levels & retaining', body: 'Cut, fill and walls that hold' },
                    { n: 'B', title: 'Drainage & stormwater', body: 'Detention and subsurface systems' },
                    { n: 'C', title: 'Soil & preparation', body: 'The budget below grade, spent well' },
                  ].map((item) => (
                    <div key={item.n} className="flex items-baseline gap-4">
                      <span className="meta-sm text-brass" data-numeric>{item.n}</span>
                      <span>
                        <span className="meta block text-paper/85">{item.title}</span>
                        <span className="mt-1 block text-xs text-sage/80">{item.body}</span>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <span className="meta-sm text-sage/70">Survey — {studio.address.suburb}</span>
                  <span className="meta-sm text-sage/70" data-numeric>{studio.coords}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
