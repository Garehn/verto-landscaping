'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { images } from '@/lib/unsplash';
import { studio } from '@/lib/content';
import { useIntro } from '@/components/motion/intro';
import { WordRise } from '@/components/motion/WordRise';
import { EASE } from '@/components/motion/ease';

// Framed cinematic hero. Pass `videoSrc` (e.g. "/video/hero.mp4") to swap
// the still for a looping clip — poster falls back to the hero image.
export function Hero({ videoSrc }: { videoSrc?: string }) {
  const { ready } = useIntro();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  const show = reduced ? true : ready;

  return (
    <section ref={ref} className="pt-16 sm:pt-20">
      <div className="container-x pt-4 sm:pt-6">
        <div className="relative h-[calc(100svh-7.5rem)] min-h-[540px] overflow-hidden bg-ink-2 text-paper">
          {/* Media */}
          <motion.div
            className="absolute inset-x-0 -top-[10%] -bottom-[10%] will-change-transform"
            style={reduced ? undefined : { y: imgY }}
          >
            <motion.div
              className="absolute inset-0"
              initial={reduced ? false : { scale: 1.12 }}
              animate={show ? { scale: 1 } : undefined}
              transition={{ duration: 2, ease: EASE }}
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

          {/* Content — short, with a large CTA */}
          <div className="relative flex h-full flex-col justify-end p-6 sm:p-10 lg:p-14">
            <motion.div
              className="meta mb-5 text-paper/80"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={show ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
            >
              Landscape design &amp; construction — Sydney
            </motion.div>

            <WordRise
              as="h1"
              className="display max-w-4xl"
              segments={[{ text: 'Gardens that' }, { text: 'hold time.', italic: true }]}
              play={show}
              delay={0.1}
              stagger={0.08}
            />

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-4"
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={show ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
            >
              <Link href="/contact" className="btn-light group !px-10 !py-5 text-sm">
                Start your project <span aria-hidden className="arrow">→</span>
              </Link>
              <Link href="/portfolio" className="btn-ghost-light group">
                See our work <span aria-hidden className="arrow">→</span>
              </Link>
            </motion.div>

            {/* Bottom hairline meta */}
            <motion.div
              className="mt-8 flex items-center justify-between gap-6 border-t border-paper/25 pt-5"
              initial={reduced ? false : { opacity: 0 }}
              animate={show ? { opacity: 1 } : undefined}
              transition={{ duration: 1, delay: 0.9 }}
            >
              <div className="meta-sm hidden items-center gap-5 text-paper/75 md:flex" aria-hidden>
                <span>Design</span>
                <span className="text-brass">·</span>
                <span>Construct</span>
                <span className="text-brass">·</span>
                <span>Care</span>
              </div>
              <div className="meta-sm flex items-center gap-3 text-paper/75">
                <span>Scroll</span>
                <span className="block h-5 w-px overflow-hidden bg-paper/25" aria-hidden>
                  <span className="scroll-cue-line block h-full w-full bg-paper/80" />
                </span>
              </div>
              <div className="meta-sm text-paper/75" data-numeric>
                {studio.coords}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
