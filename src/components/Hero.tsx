"use client";

import React, { useState, useEffect } from 'react';
import { Magnifer } from '@solar-icons/react';

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center px-4 bg-[#f7f7f5] text-[#1a1a1a]">
      
      {/* Badge Superior */}
      <div className="mb-6 px-3 py-1 rounded-full bg-[#e8f5e9] border border-[#a7e26e] text-xs font-medium text-[#1a1a1a] tracking-wide uppercase">
        Ingeniería de Memorias
      </div>

      {/* Titular Principal */}
      <h1 className="text-5xl md:text-7xl font-bold text-center leading-tight tracking-tight mb-6 max-w-4xl">
        La ingeniería detrás de <br />
        <span className="text-[#a7e26e]">tu próxima memoria</span>
      </h1>

      {/* Subtítulo */}
      <p className="text-lg md:text-xl text-[#4a4a4a] text-center max-w-2xl mb-12 leading-relaxed">
        Optimización. Sincronización. Memoria. Experimenta la precisión donde la magia 
        y la tecnología convergen para crear el itinerario perfecto.
      </p>

      {/* Buscador con SOLAR ICON */}
      <div className="w-full max-w-2xl relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
           {/* Lupa estilo Duotone */}
           {isMounted && <Magnifer size={24} color="#9ca3af" />}
        </div>
        <input 
          type="text" 
          placeholder="¿Cuántos días necesito para los parques?"
          className="w-full py-4 pl-14 pr-32 rounded-full bg-white border-2 border-transparent focus:border-[#a7e26e] shadow-[0_4px_20px_rgba(0,0,0,0.05)] text-lg outline-none transition-all duration-300 placeholder-gray-400"
        />
        <button className="absolute right-2 top-2 bottom-2 bg-[#1a1a1a] text-white px-6 rounded-full font-medium hover:bg-[#a7e26e] hover:text-[#1a1a1a] transition-colors duration-300">
          INICIAR
        </button>
      </div>

    </section>
  );
};

export default Hero;