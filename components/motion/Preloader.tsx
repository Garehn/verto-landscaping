'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, animate, motion } from 'framer-motion';
import { EASE, EASE_PANEL } from './ease';
import { useIntro } from './intro';

const SEEN_KEY = 'verto-intro-seen';

export function Preloader() {
  const { setReady } = useIntro();
  const [phase, setPhase] = useState<'pending' | 'active' | 'gone'>('pending');
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || sessionStorage.getItem(SEEN_KEY)) {
      setPhase('gone');
      setReady(true);
      return;
    }
    setPhase('active');
    const controls = animate(0, 100, {
      duration: 1.2,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        sessionStorage.setItem(SEEN_KEY, '1');
        // Lift the curtain; hero starts as it rises.
        setReady(true);
        setPhase('gone');
      },
    });
    return () => controls.stop();
  }, [setReady]);

  // Hold scroll while the curtain is down.
  useEffect(() => {
    if (phase === 'active') {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [phase]);

  return (
    <AnimatePresence>
      {phase === 'active' && (
        <motion.div
          key="curtain"
          className="fixed inset-0 z-[100] bg-paper text-ink"
          exit={{ y: '-100%' }}
          transition={{ duration: 1, ease: EASE_PANEL }}
          aria-hidden
        >
          <div className="absolute left-6 top-6 sm:left-8 sm:top-8 meta text-stone">
            Verto Landscapes
          </div>
          <div className="absolute right-6 top-6 sm:right-8 sm:top-8 meta text-stone">
            Castlecrag, Sydney
          </div>

          <div className="flex h-full items-center justify-center overflow-hidden">
            <motion.div
              className="font-serif text-[18vw] leading-none tracking-tighter2 sm:text-[13vw]"
              initial={{ y: '55%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
            >
              Verto
            </motion.div>
          </div>

          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 meta text-stone">
            Garden design &amp; build
          </div>
          <div
            className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 font-mono text-sm tabular"
            data-numeric
          >
            {String(count).padStart(3, '0')}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
