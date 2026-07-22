'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

type Props = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  label?: string;
  className?: string;
  captionClassName?: string;
};

export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  label,
  className = '',
  captionClassName = 'text-stone',
}: Props) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - r.left, 0), r.width);
    setPos((x / r.width) * 100);
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      updateFromClientX(e.clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [updateFromClientX]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 2));
    else if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 2));
    else if (e.key === 'Home') setPos(0);
    else if (e.key === 'End') setPos(100);
    else return;
    e.preventDefault();
  };

  return (
    <figure className={className}>
      <div
        ref={ref}
        className="relative aspect-[16/10] cursor-ew-resize select-none overflow-hidden bg-cream/40"
        onPointerDown={(e) => {
          dragging.current = true;
          updateFromClientX(e.clientX);
        }}
      >
        {/* Before (base) */}
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          sizes="(min-width: 1024px) 1100px, 100vw"
          className="object-cover"
          priority={false}
          draggable={false}
        />

        {/* After (clipped overlay) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={afterSrc}
            alt={afterAlt}
            fill
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="object-cover"
            draggable={false}
          />
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 px-3 py-1.5 bg-paper-KEEP/85 text-ink text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm pointer-events-none">
          Before
        </div>
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-paper/95 text-ink text-[10px] uppercase tracking-[0.2em] pointer-events-none">
          After
        </div>

        {/* Handle */}
        <motion.div
          role="slider"
          aria-label={label ? `Before and after: ${label}` : 'Before and after slider'}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          tabIndex={0}
          onKeyDown={onKey}
          className="absolute top-0 bottom-0 w-px bg-paper outline-none"
          style={{ left: `${pos}%` }}
          whileTap={{ scale: 1.05 }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-12 rounded-full bg-paper shadow-[0_4px_16px_rgba(0,0,0,0.25)] flex items-center justify-center">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#1A1A17" strokeWidth="1.5">
              <path d="M9 6l-5 6 5 6M15 6l5 6-5 6" />
            </svg>
          </div>
        </motion.div>
      </div>
      {label && (
        <figcaption className={`meta-sm mt-4 ${captionClassName}`}>
          {label}
        </figcaption>
      )}
    </figure>
  );
}
