'use client';

import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Escape hatch for automated testing / debugging environments.
    if (window.localStorage.getItem('verto-debug-nosmooth') === '1') return;

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
    });

    let rafId = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
