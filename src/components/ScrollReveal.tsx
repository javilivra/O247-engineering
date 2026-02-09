"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface Props {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  className?: string; // F47: Permitir clases externas
  delay?: number;
  stagger?: number;
  once?: boolean; // F47: Opción para permitir re-animación
}

export const ScrollReveal = ({ 
  children, 
  width = "fit-content", 
  className = "", 
  delay = 0, 
  stagger = 0,
  once = false // Por defecto permitimos re-animar (Mejora UX)
}: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: once, margin: "-50px 0px" }); 
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      // Si sale de pantalla y once=false, reseteamos a hidden
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.21, 0.47, 0.32, 0.98],
                delay: delay,
                staggerChildren: stagger 
            }
        },
      }}
      initial="hidden"
      animate={controls}
      // F47: Estilos inline reemplazados por Tailwind
      className={`relative ${width === "100%" ? "w-full" : "w-fit"} ${className}`}
    >
      {children}
    </motion.div>
  );
};