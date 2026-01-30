// @STATUS: GOLDEN MASTER - HERO SECTION FINAL MVP
"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Se mantiene para el useTypewriter o animaciones internas si las hubiera
import ParallaxText from "./ParallaxText"; // <--- NUEVO: Motor de profundidad
import { ScrollReveal } from "./ScrollReveal"; // <--- NUEVO: Motor de entrada

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

// --- HOOK TYPEWRITER (Efecto de escritura en el buscador) ---
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

const Hero = () => {
  // UX WRITING UPDATE: Mensajes alineados a "Diseñar Experiencia"
  const questions = [
    "Diseñar mi día perfecto en Magic Kingdom...",
    "Estrategias para evitar filas en Avatar...",
    "Dónde comer en Disney Springs?",
    "Cuál es el mejor día para ir a Universal Studios?"
  ];
  
  const typewriterText = useTypewriter(questions);

  return (
    // COLOR UPDATE: bg-black -> bg-gunmetal
    <section className="relative w-full h-[100vh] bg-gunmetal overflow-hidden flex items-center">
      
      {/* 1. VISUAL LAYER: IMAGEN DE FONDO + FUNDIDO PERFECTO */}
      <div className="absolute inset-0 z-0 w-full h-full">
         {/* La imagen alineada a la derecha ocupando el 65% */}
         <div 
          className="absolute right-0 top-0 w-[65%] h-full bg-cover bg-no-repeat opacity-90"
          style={{ 
            backgroundImage: "url('/images/pexels-jmendezrf-12569701.jpg')", 
            backgroundPosition: "center center", 
          }} 
        />

        {/* EL "PARCHE" DE INTEGRACIÓN: from-gunmetal via-gunmetal/90 */}
        <div className="absolute inset-0 bg-gradient-to-r from-gunmetal via-gunmetal/90 to-transparent w-[80%]" />
        
        {/* Gradiente inferior: from-gunmetal */}
        <div className="absolute inset-0 bg-gradient-to-t from-gunmetal via-transparent to-transparent opacity-80" />
      </div>

      {/* 2. CONTENT LAYER: TEXTO Y BUSCADOR */}
      <div className="w-full max-w-[1400px] mx-auto px-8 h-full flex items-center relative z-10">
        <div className="w-full lg:w-3/5 flex flex-col justify-center items-start text-left pt-12">
          
          {/* SYSTEM STATUS LABEL (Nuevo elemento "Tech") */}
          <ScrollReveal delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bone/5 border border-white/10 mb-8 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-celeste opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-celeste"></span>
                </span>
                <span className="type-tech text-[10px] text-bone/70 uppercase tracking-widest">System Operational</span>
            </div>
          </ScrollReveal>

          {/* Título Principal CON EFECTO PARALLAX */}
          <ScrollReveal delay={0.2}>
            <ParallaxText speed={-50}> {/* <--- EL EFECTO 3D: Sube más lento (-50) que el scroll */}
                <h1 className="type-display text-5xl md:text-7xl mb-6 text-white">
                    Organizar bien tu viaje <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset to-celeste drop-shadow-sm">
                    también es MÁGICO.
                    </span>
                </h1>
            </ParallaxText>
          </ScrollReveal>

          {/* Subtítulo */}
          <ScrollReveal delay={0.4}>
            <p className="type-body text-lg md:text-[19px] text-bone/80 max-w-xl mb-12">
                <strong className="text-white">ORLANDO 247</strong> te enseña desde cuándo viajar hasta optimizar cada paso que des en los parques. Usa nuestra base de conocimiento para planear a tu ritmo o deja que el motor de O247 organice todo por vos.
            </p>
          </ScrollReveal>

          {/* SEARCH BAR INTELIGENTE */}
          <ScrollReveal delay={0.6}>
            <div className="w-full max-w-2xl relative group">
                {/* CONTAINER: Focus state with Gunmetal Theme colors */}
                <div className="relative overflow-hidden rounded-full bg-white/10 border border-white/20 backdrop-blur-md transition-all duration-300 group-focus-within:bg-bone group-focus-within:border-transparent group-focus-within:shadow-[0_0_30px_rgba(255,112,67,0.15)] group-focus-within:scale-[1.01]">
                
                {/* Icono Lupa */}
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-white/50 transition-colors duration-300 group-focus-within:text-gunmetal">
                    <SearchIcon size={22} />
                </div>
                
                {/* Input */}
                <input 
                    type="text" 
                    placeholder={typewriterText}
                    className="w-full py-5 pl-16 pr-[260px] bg-transparent text-white placeholder:text-white/40 text-[16px] font-medium outline-none transition-colors duration-300 group-focus-within:text-gunmetal group-focus-within:placeholder:text-gunmetal/40 font-sans"
                />
                
                {/* BOTÓN CTA: Action Gradient (Celeste -> Sunset) */}
                <button className="absolute right-1.5 top-1.5 bottom-1.5 px-8 rounded-full font-bold text-[11px] tracking-[0.15em] uppercase flex items-center gap-2 text-white shadow-lg transition-all duration-300 hover:brightness-110 hover:shadow-celeste/20 active:scale-95 bg-gradient-to-r from-celeste to-sunset font-sans">
                    REVELAR MI PLAN
                    <ArrowRight size={14} />
                </button>
                </div>
            </div>
          </ScrollReveal>

        </div>
      </div>

    </section>
  );
};

export default Hero;