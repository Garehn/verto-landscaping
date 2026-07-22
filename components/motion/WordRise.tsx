'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from './ease';

export type WordSegment = { text: string; italic?: boolean };

// Words rise out of an overflow mask, one after another — the signature
// cinematic headline reveal. Pass `play` to gate on the preloader; omit it
// to trigger on scroll into view.
export function WordRise({
  segments,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.07,
  duration = 1.05,
  play,
  as: Tag = 'h2',
}: {
  segments: WordSegment[];
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  play?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
}) {
  const reduced = useReducedMotion();
  const words = segments.flatMap((seg) =>
    seg.text
      .split(' ')
      .filter(Boolean)
      .map((word) => ({ word, italic: seg.italic }))
  );

  if (reduced) {
    return (
      <Tag className={className}>
        {words.map((w, i) => (
          <span key={i} className={w.italic ? 'display-italic' : undefined}>
            {w.word}{' '}
          </span>
        ))}
      </Tag>
    );
  }

  const MotionTag = motion.create(Tag);
  const controlled = play !== undefined;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      {...(controlled
        ? { animate: play ? 'show' : 'hidden' }
        : { whileInView: 'show', viewport: { once: true, amount: 0.4 } })}
    >
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]"
        >
          <motion.span
            className={`inline-block will-change-transform ${w.italic ? 'display-italic' : ''} ${wordClassName ?? ''}`}
            variants={{
              hidden: { y: '115%' },
              show: {
                y: '0%',
                transition: { duration, ease: EASE, delay: delay + i * stagger },
              },
            }}
          >
            {w.word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
