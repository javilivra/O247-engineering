'use client';
// =============================================================================
// HeroCarousel — Carrusel de fondo estilo Disney Springs
// Usa background-image CSS (no <img>) para que el gradiente de fusión
// funcione perfecto sin maskImage ni capas superpuestas
// =============================================================================
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

interface HeroCarouselProps {
  slides: string[];
  duration?: number;
  onSlideChange?: (index: number, total: number) => void;
}

export default function HeroCarousel({ slides, duration = 5000, onSlideChange }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Preload
  useEffect(() => {
    slides.forEach((src) => { const img = new Image(); img.src = src; });
  }, [slides]);

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((c) => {
        const next = (c + 1) % slides.length;
        setPrev(c);
        onSlideChange?.(next, slides.length);
        return next;
      });
    }, duration);
  }, [slides.length, duration, onSlideChange]);

  useEffect(() => {
    startAutoplay();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startAutoplay]);

  return (
    // Ocupa todo el hero — el gradiente del layout maneja la fusión
    <div className="absolute inset-0 w-full h-full overflow-hidden">

      {/* Slide anterior — se queda estático mientras el nuevo aparece encima */}
      {prev !== null && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[prev]})` }}
        />
      )}

      {/* Slide actual — fade in + Ken Burns */}
      <motion.div
        key={current}
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${slides[current]})` }}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          opacity: { duration: 1.5, ease: 'linear' },
          scale: { duration: 8, ease: 'linear' },
        }}
      />
    </div>
  );
}
