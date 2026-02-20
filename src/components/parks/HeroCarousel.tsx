'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroCarouselProps {
  slides: string[];
  duration?: number;
}

export default function HeroCarousel({ slides, duration = 5000 }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Preload all images on component mount
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide;
    });
  }, [slides]);

  // Autoplay logic
  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, duration);
  }, [slides.length, duration]);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoplay]);

  const goTo = (i: number) => {
    setCurrent(i);
    startAutoplay(); // Restart timer on manual navigation
  };

  return (
    <div className="absolute right-0 top-0 bottom-0 w-[75%] h-full pointer-events-none select-none">
      <div
        className="relative w-full h-full overflow-hidden bg-black" // Black background as a safety net
        style={{
          maskImage: 'linear-gradient(to right, transparent 5%, black 40%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 5%, black 40%)',
        }}
      >
        <AnimatePresence initial={false}>
          <motion.img
            key={current}
            src={slides[current]}
            alt={`Slide ${current + 1}`}
            initial={{ opacity: 0, scale: 1.08 }} // Start transparent and slightly zoomed
            animate={{ opacity: 1, scale: 1 }}   // Fade in and zoom out (Ken Burns effect)
            exit={{ opacity: 0 }}                // Simple fade out, no other transforms
            transition={{
              opacity: { duration: 1.5, ease: 'linear' }, // MUST be linear for a perfect cross-fade
              scale: { duration: 8, ease: 'linear' },     // Ken Burns effect duration
            }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </AnimatePresence>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 right-8 flex items-center gap-2 pointer-events-auto z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`relative h-1 rounded-full transition-all duration-500 overflow-hidden ${
              i === current ? 'w-8 bg-white/30' : 'w-2 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Slide ${i + 1}`}
          >
            {i === current && (
              <motion.div
                className="absolute inset-0 bg-sunset rounded-full origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: duration / 1000, ease: "linear" }}
                key={`p-${current}`}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
