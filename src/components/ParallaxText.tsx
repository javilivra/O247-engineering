"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface ParallaxTextProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  // F50: Permite personalizar el punto de inicio/fin del efecto
  offset?: any; 
}

export default function ParallaxText({ 
  children, 
  speed = -50, 
  className = "",
  offset = ["start end", "end start"]
}: ParallaxTextProps) {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}