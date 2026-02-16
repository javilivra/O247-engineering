// @STATUS: GOLDEN MASTER V-FINAL - CLEAN (NO BADGE, NO RIGHT COL)
"use client";

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion'; 

// --- ICONOS ---
const SearchIcon = ({ size = 24, className }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="11.5" cy="11.5" r="9.5" />
    <path d="M18.5 18.5L22 22" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowRight = ({ size = 20, className }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
    <path d="M5 12h14m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// --- HOOK TYPEWRITER ---
const useTypewriter = (phrases: string[]) => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (subIndex === phrases[index].length + 1 && !reverse) {
      setIsPaused(true);
      const timeout = setTimeout(() => { setReverse(true); setIsPaused(false); }, 2000);
      return () => clearTimeout(timeout);
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return;
    }
    if (isPaused) return;
    const timeout = setTimeout(() => {
      setText(phrases[index].substring(0, subIndex));
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 30 : 80);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, isPaused, phrases]);
  return text;
};

// --- VARIANTES DE ANIMACIÓN ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.3,
      delayChildren: 0.2 
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, y: 0,
    transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1.0] }
  }
};

const Hero = () => {
  const questions = [
    "Diseñar mi día perfecto en Magic Kingdom...",
    "Estrategias para evitar filas en Avatar...",
    "Dónde comer en Disney Springs?",
    "Cuál es el mejor día para ir a Universal Studios?"
  ];
  
  const typewriterText = useTypewriter(questions);

  return (
    <section className="relative w-full h-[100vh] bg-gunmetal overflow-hidden flex items-center">
      
      {/* 1. VISUAL LAYER */}
      <div className="absolute inset-0 z-0 w-full h-full">
         <div 
          className="absolute right-0 top-0 w-[65%] h-full bg-cover bg-no-repeat opacity-90"
          style={{ 
            backgroundImage: "url('/images/pexels-jmendezrf-12569701.jpg')", 
            backgroundPosition: "center center", 
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gunmetal via-gunmetal/90 to-transparent w-[80%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-gunmetal via-transparent to-transparent opacity-80" />
      </div>

      {/* 2. CONTENT GRID */}
      <div className="w-full max-w-[1400px] mx-auto px-8 h-full flex items-center relative z-10">
        
        {/* COLUMNA 1: IZQUIERDA (Expandida para ocupar el espacio visual) */}
        <motion.div 
          className="w-full flex flex-col justify-center items-start text-left pt-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Status Label (ELIMINADO AQUÍ) */}

          {/* Título Principal */}
          <motion.div variants={itemVariants} className="mb-6">
            <h1 className="type-display text-5xl md:text-7xl text-white leading-tight">
              Organizar bien tu viaje <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset to-celeste drop-shadow-sm">
                también es MÁGICO.
              </span>
            </h1>
          </motion.div>

          {/* Subtítulo */}
          <motion.div variants={itemVariants} className="mb-12">
            <p className="type-body text-lg md:text-[19px] text-bone/80 max-w-xl leading-relaxed">
                <strong className="text-white">ORLANDO 247</strong> te enseña desde cuándo viajar hasta cómo aprovechar cada hora en los parques. Usá este sitio para planear a tu ritmo y tomar mejores decisiones.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div variants={itemVariants} className="w-full">
            <div className="w-full max-w-2xl relative group">
                <div className="relative overflow-hidden rounded-full bg-white/10 border border-white/20 backdrop-blur-md transition-all duration-500 group-focus-within:bg-bone group-focus-within:border-transparent group-focus-within:shadow-[0_0_40px_rgba(255,112,67,0.1)]">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-white/50 transition-colors duration-300 group-focus-within:text-gunmetal">
                    <SearchIcon size={22} />
                </div>
                <input 
                    type="text" 
                    placeholder={typewriterText}
                    className="w-full py-5 pl-16 pr-[260px] bg-transparent text-white placeholder:text-white/40 text-[16px] font-medium outline-none transition-colors duration-300 group-focus-within:text-gunmetal group-focus-within:placeholder:text-gunmetal/40 font-sans"
                />
                <button className="absolute right-1.5 top-1.5 bottom-1.5 px-8 rounded-full font-bold text-[11px] tracking-[0.15em] uppercase flex items-center gap-2 text-white shadow-lg transition-all duration-300 hover:brightness-110 hover:shadow-celeste/20 active:scale-95 bg-gradient-to-r from-celeste to-sunset font-sans">
                    EXPLORAR ORLANDO
                    <ArrowRight size={14} />
                </button>
                </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;