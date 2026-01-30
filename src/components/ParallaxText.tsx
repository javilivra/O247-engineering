"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxText({ 
  children, 
  speed = -50, 
  className = "" 
}: { 
  children: React.ReactNode, 
  speed?: number, 
  className?: string 
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
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