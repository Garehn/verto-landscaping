'use client';

import { useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

// Infinite horizontal marquee. Children are rendered twice; CSS animation
// translates the track by -50% for a seamless loop.
export function Marquee({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <div className={`overflow-hidden ${className ?? ''}`} aria-hidden>
      <div className={`flex w-max ${reduced ? '' : 'marquee-track'}`}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center">{children}</div>
      </div>
    </div>
  );
}
