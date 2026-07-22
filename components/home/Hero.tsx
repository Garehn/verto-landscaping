'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { images } from '@/lib/unsplash';
import { studio } from '@/lib/content';
import { useIntro } from '@/components/motion/intro';
import { WordRise } from '@/components/motion/WordRise';
import { EASE } from '@/components/motion/ease';

export function Hero() {
  const { ready } = useIntro();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Parallax + fade as the hero scrolls away.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '9%']);
  const contentY = useTransform(scrollYProgress, [0, 0.6], ['0%', '-24%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const show = reduced ? true : ready;

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[660px] overflow-hidden bg-ink text-paper">
      {/* Image — slow settle-in, then scroll parallax. Wrapper is oversized
          vertically so the parallax never exposes the section behind it. */}
      <motion.div
        className="absolute inset-x-0 -top-[12%] -bottom-[12%] will-change-transform"
        style={reduced ? undefined : { y: imgY }}
      >
        <motion.div
          className="absolute inset-0"
          initial={reduced ? false : { scale: 1.14 }}
          animate={show ? { scale: 1 } : undefined}
          transition={{ duration: 2.2, ease: EASE }}
        >
          <Image
            src={images.hero.src}
            alt={images.hero.alt}
            fill
            priority
            sizes="100vw"
            className="grade object-cover"
          />
        </motion.div>
      </motion.div>
      <div className="grade-overlay absolute inset-0" aria-hidden />

      {/* Corner meta layer */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={reduced ? false : { opacity: 0 }}
        animate={show ? { opacity: 1 } : undefined}
        transition={{ duration: 1.2, delay: 0.9, ease: 'easeOut' }}
        aria-hidden
      >
        <div className="meta-sm absolute right-6 top-24 text-paper/70 sm:right-8 sm:top-28">
          Castlecrag — Sydney
        </div>
        <div className="meta-sm absolute bottom-8 right-6 text-paper/70 sm:right-8" data-numeric>
          {studio.coords}
        </div>
        <div className="absolute bottom-0 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 pb-6 sm:flex">
          <span className="meta-sm text-paper/70">Scroll</span>
          <span className="block h-10 w-px overflow-hidden bg-paper/20">
            <span className="scroll-cue-line block h-full w-full bg-paper/80" />
          </span>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="container-x relative flex h-full flex-col justify-end pb-20 sm:pb-24"
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-5xl">
          <motion.div
            className="meta mb-7 text-paper/75"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={show ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
          >
            Garden design &amp; build studio
          </motion.div>

          <WordRise
            as="h1"
            className="display"
            segments={[{ text: 'Gardens that' }, { text: 'hold time.', italic: true }]}
            play={show}
            delay={0.15}
            stagger={0.09}
          />

          <motion.p
            className="mt-8 max-w-xl text-lg leading-relaxed text-paper/80 text-pretty sm:text-xl"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={show ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, delay: 0.75, ease: EASE }}
          >
            A small studio building considered outdoor spaces for homes that deserve them.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={show ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, delay: 0.9, ease: EASE }}
          >
            <Link href="/contact" className="btn-light group">
              Start a project <span aria-hidden className="arrow">→</span>
            </Link>
            <Link href="/portfolio" className="btn-ghost-light group">
              See the work <span aria-hidden className="arrow">→</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
