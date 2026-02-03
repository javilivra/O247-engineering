"use client";

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function VerticalStepper() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Estado para detectar si estamos en el top (para ocultar o estilizar)
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      setIsTop(v < 0.05);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-8 items-center pointer-events-none">
      
      {/* TRACK (Línea de fondo) */}
      <div className="absolute top-0 bottom-0 w-px bg-white/10 h-full rounded-full overflow-hidden">
        {/* PROGRESS (Línea de llenado) */}
        <motion.div 
          className="w-full bg-gradient-to-b from-celeste to-sunset origin-top"
          style={{ scaleY, height: '100%' }}
        />
      </div>

      {/* NODOS (Puntos de anclaje visuales) */}
      {/* Nota: Estos son visuales. Si quisieras clicks, necesitarías lógica de 'scrollTo' */}
      
      {/* Inicio */}
      <div className="relative group">
        <motion.div 
            animate={{ 
                borderColor: isTop ? '#a7e26e' : 'rgba(255,255,255,0.2)',
                scale: isTop ? 1.2 : 1
            }}
            className="w-3 h-3 rounded-full border-2 bg-gunmetal transition-colors duration-500" 
        />
        {/* Label al hover */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[9px] font-bold text-white uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/50 backdrop-blur px-2 py-1 rounded">
            Inicio
        </div>
      </div>

      {/* Medio (Referencia visual) */}
      <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
      <div className="w-1.5 h-1.5 rounded-full bg-white/20" />

      {/* Final */}
      <div className="relative group">
        <div className="w-2 h-2 rounded-full border border-white/20 bg-gunmetal" />
        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[9px] font-bold text-white uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/50 backdrop-blur px-2 py-1 rounded">
            Fin
        </div>
      </div>

    </div>
  );
}