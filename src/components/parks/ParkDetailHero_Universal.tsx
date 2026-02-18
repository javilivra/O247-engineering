"use client";

// DESPUÉS (O247 Icon System — LOCAL, FUNCIONA SIEMPRE)
import { Icon } from "@/components/Icon";
import { motion } from "framer-motion";

export default function ParkDetailHero() {
  return (
    <section className="relative w-full h-[500px] rounded-[32px] overflow-hidden mb-12 group">
      {/* 1. IMAGEN DE FONDO (Parallax suave por CSS) */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-full md:w-[70%] bg-cover bg-center transition-transform duration-[3s] ease-out group-hover:scale-105"
        style={{ backgroundImage: "url('/images/universal_images/universal_planeta_citywalk.webp')" }} 
      >
         {/* Capa de oscurecimiento para mejorar contraste */}
         <div className="absolute inset-0 bg-gunmetal/20 mix-blend-multiply"></div>
      </div>

      {/* 2. GRADIENTE DE FUSIÓN (Para que el texto se lea sobre el color sólido a la izquierda) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#f7f7f5] via-[#f7f7f5] via-[30%] to-transparent z-10"></div>

      {/* 3. CONTENIDO TÉCNICO */}
      <div className="relative z-20 h-full flex flex-col justify-center pl-8 md:pl-12 max-w-[650px]">
        
        {/* Tagline Superior */}
        <motion.div 
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="flex items-center gap-3 mb-6"
        >
            <div className="h-px w-8 bg-gunmetal/30"></div>
            <span className="font-mono text-gunmetal/60 text-[10px] font-bold tracking-[0.2em] uppercase">
                El Epicentro del Entretenimiento
            </span>
        </motion.div>

        {/* Título Principal */}
        <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-[56px] md:text-[64px] font-sans font-bold text-gunmetal tracking-tighter leading-[0.95] mb-8"
        >
            Universal CityWalk,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset to-celeste">
                Donde todo comienza
            </span>
        </motion.h2>

        {/* Descripción */}
        <p className="text-base font-sans font-medium text-gunmetal/70 leading-relaxed mb-10 max-w-[480px]">
            La fusión de alta energía entre Universal Studios y Islands of Adventure. Gastronomía temática, vida nocturna y entretenimiento sin límites.
        </p>

        {/* Data Points (Chips) */}
        <div className="flex flex-wrap items-center gap-4">
            {/* Status Chip */}
            <div className="bg-gunmetal text-white px-5 py-3 rounded-full text-[11px] font-bold tracking-wide flex items-center gap-3 shadow-xl shadow-gunmetal/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sunset opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sunset"></span>
                </span>
                <span className="font-mono">ABIERTO <span className="mx-2 text-white/30">|</span> 26°C</span>
            </div>

            {/* Time Chip */}
            <div className="bg-white border border-gunmetal/10 text-gunmetal px-5 py-3 rounded-full text-[11px] font-bold tracking-wide flex items-center gap-2 shadow-sm">
                <Icon icon="solar:clock-circle-bold" className="w-4 h-4 text-celeste" />
                <span className="font-mono">08:00 AM - 02:00 AM</span>
            </div>
        </div>

      </div>
    </section>
  );
}