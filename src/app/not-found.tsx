"use client";

import Link from "next/link";
import { useRouter } from "next/navigation"; // Necesario para el botón "Atrás"
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export default function NotFound() {
  const router = useRouter(); // Hook para controlar el historial

  return (
    <main className="min-h-screen bg-gunmetal text-bone flex flex-col items-center justify-center relative overflow-hidden px-6">
      
      {/* DECORACIÓN DE FONDO */}
      <div className="absolute inset-0 opacity-[0.05]" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-4xl w-full relative z-10 flex flex-col items-center text-center">
        
        {/* 1. HEADER TÉCNICO */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
        >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="type-tech text-xs text-red-400 tracking-[0.2em] font-bold">
                ERROR CODE: 404_ROUTE_MISSING
            </span>
        </motion.div>

        {/* 2. VIDEO MICKEY */}
        <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="relative w-full aspect-video max-w-2xl rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 mb-10 group"
        >
            <div className="absolute inset-0 bg-gunmetal/10 mix-blend-multiply pointer-events-none z-10"></div>
            <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700"
            >
                <source src="/videos/404-lost.mp4" type="video/mp4" />
            </video>

            {/* UI VIDEO */}
            <div className="absolute bottom-4 left-6 z-20 flex flex-col items-start">
                <span className="type-tech text-[10px] text-white/60">LOCATION</span>
                <span className="type-display text-sm text-white tracking-wider">TERMINAL DESCONOCIDA</span>
            </div>
            <div className="absolute bottom-4 right-6 z-20">
                <Icon icon="solar:videocamera-record-bold" className="text-red-500 animate-pulse" width="16" />
            </div>
        </motion.div>

        {/* 3. MENSAJE */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-2xl flex flex-col items-center"
        >
            <h1 className="type-display text-4xl md:text-6xl mb-4 text-white">
                Houston, perdimos la ruta.
            </h1>
            <p className="type-body text-white/60 text-lg mb-8 leading-relaxed max-w-lg">
                El algoritmo no pudo aterrizar en esta página. <br className="hidden md:block"/>
                Mickey sigue buscando la puerta de embarque.
            </p>

            {/* 4. BOTONERA DE RESCATE */}
            <div className="flex flex-col gap-4 w-full md:w-auto">
                
                {/* FILA PRINCIPAL */}
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full">
                    {/* BOTÓN 1: HOME (Sunset - Acción Principal) */}
                    <Link 
                        href="/" 
                        className="type-tech w-full md:w-auto bg-sunset text-gunmetal px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(255,112,67,0.3)] hover:scale-105 flex items-center justify-center gap-2"
                    >
                        {/* Icono Home Claro */}
                        <Icon icon="solar:home-2-bold" width="18" />
                        Regresar a la Pista
                    </Link>

                    {/* BOTÓN 2: SOPORTE (Glass - Acción Secundaria) */}
                    <Link 
                        href="/contact" 
                        className="type-tech w-full md:w-auto px-8 py-4 rounded-full border border-white/20 text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-gunmetal transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <Icon icon="solar:headset-mic-bold" width="16" />
                        Soporte
                    </Link>
                </div>

                {/* PLAN B: VOLVER ATRÁS (Enlace sutil debajo) */}
                <button 
                    onClick={() => router.back()}
                    className="type-tech text-white/40 hover:text-white text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 mt-2 transition-colors duration-300 py-2"
                >
                    <Icon icon="solar:arrow-left-linear" width="14" />
                    Volver a la página anterior
                </button>

            </div>
        </motion.div>

      </div>

      {/* FOOTER TÉCNICO */}
      <div className="absolute bottom-6 w-full text-center">
        <p className="type-tech text-[10px] text-white/20 uppercase">
            SYSTEM_ID: O247_ENGINE_V1.0 // LOG_REF: NAV_FAILURE
        </p>
      </div>

    </main>
  );
}