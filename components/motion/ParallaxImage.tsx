'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

// Full-bleed image with scroll parallax inside an overflow-hidden frame.
// The inner layer is oversized by `speed` so edges never show.
// NOTE: callers must pass a position class in `className` (e.g. `relative h-96`
// or `absolute inset-0`) — the root deliberately sets none of its own.
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  sizes = '100vw',
  priority = false,
  speed = 0.09,
  grade = true,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  speed?: number;
  grade?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ''}`}>
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={reduced ? undefined : { y, scale: 1 + speed * 2 }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${grade ? 'grade' : ''} ${imgClassName ?? ''}`}
        />
      </motion.div>
    </div>
  );
}
