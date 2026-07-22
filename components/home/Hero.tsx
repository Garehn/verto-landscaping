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

// Pass `videoSrc` (e.g. "/video/hero.mp4") to swap the still for a looping
// cinematic clip — poster falls back to the hero image while it loads.
export function Hero({ videoSrc }: { videoSrc?: string }) {
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
      {/* Media — slow settle-in, then scroll parallax. Wrapper is oversized
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
          {videoSrc && !reduced ? (
            <video
              className="grade absolute inset-0 h-full w-full object-cover"
              src={videoSrc}
              poster={images.hero.src}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden
            />
          ) : (
            <Image
              src={images.hero.src}
              alt={images.hero.alt}
              fill
              priority
              sizes="100vw"
              className="grade object-cover"
            />
          )}
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
      </motion.div>

      {/* Content */}
      <motion.div
        className="container-x relative flex h-full flex-col justify-end pb-24 sm:pb-28"
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-5xl">
          <motion.div
            className="meta mb-6 text-paper/75"
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

          <motion.div
            className="mt-7 flex flex-wrap items-center gap-x-10 gap-y-4"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={show ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, delay: 0.75, ease: EASE }}
          >
            <p className="max-w-md text-lg leading-snug text-paper/80 text-pretty sm:text-xl">
              A small studio building considered outdoor spaces for homes that deserve them.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-light group">
                Start a project <span aria-hidden className="arrow">→</span>
              </Link>
              <Link href="/portfolio" className="btn-ghost-light group">
                See the work <span aria-hidden className="arrow">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom meta bar — hairline with studio facts, scroll cue, coordinates */}
      <motion.div
        className="absolute inset-x-0 bottom-0"
        initial={reduced ? false : { opacity: 0 }}
        animate={show ? { opacity: 1 } : undefined}
        transition={{ duration: 1.2, delay: 1.05, ease: 'easeOut' }}
      >
        <div className="container-x">
          <div className="flex items-center justify-between gap-6 border-t border-paper/20 py-5">
            <div className="meta-sm hidden items-center gap-6 text-paper/70 md:flex" aria-hidden>
              <span>Design</span>
              <span className="text-brass">·</span>
              <span>Build</span>
              <span className="text-brass">·</span>
              <span>Care</span>
            </div>
            <div className="meta-sm flex items-center gap-3 text-paper/70">
              <span>Scroll</span>
              <span className="block h-6 w-px overflow-hidden bg-paper/20" aria-hidden>
                <span className="scroll-cue-line block h-full w-full bg-paper/80" />
              </span>
            </div>
            <div className="meta-sm text-paper/70" data-numeric>
              {studio.coords}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
