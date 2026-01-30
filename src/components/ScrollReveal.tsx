"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface Props {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;   // Retraso para secuenciar elementos manualmente
  stagger?: number; // Tiempo entre la aparición de hijos (efecto cascada)
}

export const ScrollReveal = ({ children, width = "fit-content", delay = 0, stagger = 0 }: Props) => {
  const ref = useRef(null);
  // Margin "-50px" asegura que la animación inicie cuando el elemento ya entró un poco en pantalla
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" }); 
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 40 }, // Empieza un poco más abajo para mayor dramatismo
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.9, // Un poco más lento para acompañar a Lenis
                ease: [0.21, 0.47, 0.32, 0.98], // Curva física (Expo Out)
                delay: delay,
                staggerChildren: stagger 
            }
        },
      }}
      initial="hidden"
      animate={controls}
      style={{ width, position: "relative" }}
    >
      {children}
    </motion.div>
  );
};