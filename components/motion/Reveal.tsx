'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';
import { EASE } from './ease';

export function Reveal({
  children,
  className,
  style,
  delay = 0,
  y = 32,
  duration = 0.9,
  amount = 0.25,
}: {
  children: ReactNode;
  className?: string;
  // Used by the project collage to place a frame on the full-bleed grid.
  style?: CSSProperties;
  delay?: number;
  y?: number;
  duration?: number;
  amount?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className} style={style}>{children}</div>;
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
