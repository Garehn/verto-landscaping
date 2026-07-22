'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { images, type ImageRef } from '@/lib/unsplash';

type Props = {
  title: string;
  location: string;
  year: string;
  image: ImageRef;
  size?: 'sm' | 'lg';
};

export function ProjectCard({ title, location, year, image, size = 'lg' }: Props) {
  const ref = images[image];
  return (
    <motion.article
      className="group"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`relative overflow-hidden bg-ink-2 ${size === 'lg' ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
        <Image
          src={ref.src}
          alt={ref.alt}
          fill
          sizes="(min-width: 1024px) 600px, 100vw"
          className="grade object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl tracking-tighter2">{title}</h3>
          <div className="mt-1 text-sm text-sage">{location}</div>
        </div>
        <div className="meta-sm text-sage tabular" data-numeric>{year}</div>
      </div>
    </motion.article>
  );
}
