// @STATUS: GOLDEN MASTER - HERO SECTION FINAL MVP
"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
  const questions = [
    "Ej: Armar itinerario para Magic Kingdom con niños...",
    "Ej: Presupuesto económico para 4 personas en Octubre...",
    "Ej: Dónde comer en Epcot sin reserva previa...",
    "Ej: Cuál es el mejor día para ir a Universal Studios..."
  ];
  
  const typewriterText = useTypewriter(questions);

  return (
    <section className="relative w-full h-[100vh] bg-black overflow-hidden flex items-center">
      
      {/* 1. VISUAL LAYER: IMAGEN DE FONDO + FUNDIDO PERFECTO */}
      <div className="absolute inset-0 z-0 w-full h-full">
         {/* La imagen alineada a la derecha ocupando el 65% */}
         <div 
          className="absolute right-0 top-0 w-[65%] h-full bg-cover bg-no-repeat opacity-90"
          style={{ 
            // REEMPLAZA CON TU IMAGEN DE CASTILLO O PARQUE
            backgroundImage: "url('/images/pexels-jmendezrf-12569701.jpg')", 
            backgroundPosition: "center center", 
          }} 
        />

        {/* EL "PARCHE" DE INTEGRACIÓN:
            Gradiente agresivo desde la izquierda (negro sólido) hacia la derecha (transparente).
            Cubre el corte de la imagen y permite que el texto de la izquierda sea legible.
        */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent w-[80%]" />
        
        {/* Gradiente inferior para integrar el DataTicker */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
      </div>

      {/* 2. CONTENT LAYER: TEXTO Y BUSCADOR */}
      <div className="w-full max-w-[1400px] mx-auto px-8 h-full flex items-center relative z-10">
        <div className="w-full lg:w-3/5 flex flex-col justify-center items-start text-left pt-12">
          
          {/* Título Principal */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-6 font-sans"
          >
            Organizarte bien, <br />
            también es parte <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a7e26e] to-emerald-400 drop-shadow-sm">
              de la Magia.
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-[19px] text-[#e0e0e0]/80 max-w-xl leading-relaxed font-medium mb-12 font-sans"
          >
            <strong className="text-white">ORLANDO 247</strong> en equipo con <strong className="text-white">GATE</strong>, nuestro experto inteligente, se ocupan de las decisiones para que vos vivas la experiencia antes, durante y después del viaje.
          </motion.p>

          {/* SEARCH BAR INTELIGENTE (Glass to Solid Interaction) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl relative group"
          >
            {/* ESTADO NORMAL: Glass (bg-white/5) + Borde fino
               ESTADO FOCUS: Sólido (bg-[#f7f7f5]) + Sombra suave + Texto negro
            */}
            <div className="relative overflow-hidden rounded-full bg-white/10 border border-white/20 backdrop-blur-md transition-all duration-300 group-focus-within:bg-[#f7f7f5] group-focus-within:border-transparent group-focus-within:shadow-[0_0_30px_rgba(255,255,255,0.15)] group-focus-within:scale-[1.01]">
              
              {/* Icono Lupa */}
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-white/50 transition-colors duration-300 group-focus-within:text-[#1a1a1a]">
                 <SearchIcon size={22} />
              </div>
              
              {/* Input */}
              <input 
                type="text" 
                placeholder={typewriterText}
                className="w-full py-5 pl-16 pr-[260px] bg-transparent text-white placeholder:text-white/40 text-[16px] font-medium outline-none transition-colors duration-300 group-focus-within:text-[#1a1a1a] group-focus-within:placeholder:text-[#1a1a1a]/40 font-sans"
              />
              
              {/* BOTÓN CTA: Estilo Stitch (Azul -> Verde) */}
              <button className="absolute right-1.5 top-1.5 bottom-1.5 px-8 rounded-full font-bold text-[11px] tracking-[0.15em] uppercase flex items-center gap-2 text-white shadow-lg transition-all duration-300 hover:brightness-110 hover:shadow-[#3498db]/20 active:scale-95 bg-gradient-to-r from-[#3498db] to-[#a7e26e] font-sans">
                GATE YO TE ELIJO
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
};

export default Hero;