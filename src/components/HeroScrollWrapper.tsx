"use client";

import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const HeroScrollWrapper = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Detectamos el scroll de la página completa
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transformaciones:
  // 1. Escala: De 1 (pantalla completa) a 0.95 (tarjeta pequeña)
  // 2. Bordes: De 0px (cuadrado) a 32px (redondeado)
  // 3. Y: Un pequeño desplazamiento para suavizar
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], [0, 32]);
  
  // Un filtro oscuro que aparece encima cuando scrolleas para dar foco a lo nuevo
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.2]);

  return (
    <div ref={containerRef} className="h-[120vh] w-full relative flex items-start justify-center bg-bone">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <motion.div
          style={{ scale, borderRadius }}
          className="relative w-full h-full overflow-hidden shadow-2xl origin-top"
        >
          {children}
          
          {/* Overlay opcional para oscurecer el hero al bajar */}
          <motion.div 
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-black pointer-events-none z-30"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroScrollWrapper;