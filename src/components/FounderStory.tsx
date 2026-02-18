"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// DESPUÉS (O247 Icon System — LOCAL, FUNCIONA SIEMPRE)
import { Icon } from "@/components/Icon";
import Image from "next/image"; // Asegúrate de tener una foto tuya en public/images/founder.jpg
import { ScrollReveal } from "./ScrollReveal";

const PAIN_POINTS = [
  { text: "¿A qué hora abre la fila virtual?", x: -20, y: -40, delay: 0 },
  { text: "¡Se agotaron las reservas de Cenicienta!", x: 30, y: -60, delay: 1.2 },
  { text: "¿Lloverá a las 3 PM?", x: -40, y: 10, delay: 2.5 },
  { text: "Me duelen los pies...", x: 50, y: 40, delay: 0.5 },
  { text: "¿Genie+ o Lightning Lane?", x: -10, y: 60, delay: 3 },
  { text: "El bus tarda 40 minutos...", x: 40, y: -10, delay: 1.8 },
];

export default function FounderStory() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    // Mantenemos el wrapper estructural del antiguo StatsTicker para que encaje en el layout (bg-bone, -mt-10)
    <section className="relative z-10 bg-bone -mt-10 rounded-t-[40px] pt-20 pb-24 border-t border-white/60 shadow-averi-reverse overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal width="100%">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* --- COLUMNA IZQUIERDA: TU HISTORIA --- */}
            <div className="relative z-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gunmetal/5 border border-gunmetal/10 mb-6">
                 <span className="w-1.5 h-1.5 rounded-full bg-sunset animate-pulse"></span>
                 <span className="type-tech text-[10px] text-gunmetal uppercase tracking-widest">Engineering Logic</span>
              </div>

              <h2 className="type-display text-4xl md:text-5xl text-gunmetal mb-6 leading-tight">
              ¿Por qué existe O247? <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset to-celeste">
                  Te lo confieso.
                </span>
              </h2>

              <div className="space-y-4 type-body text-lg text-gunmetal/80 mb-8">
                <p>
                  Tardamos varios viajes en entender "la magia". Los primeros fueron un caos de filas interminables, comer lo que se podia y <strong className="text-gunmetal font-bold">la sensación constante de estar perdiendonos algo.</strong>
                </p>
                <p>
                  Nos dimos cuenta de que Disney y Universal no son solo magia; <strong className="text-gunmetal font-bold">son un sistema operativo complejo</strong>. Y como cualquier sistema, se puede hackear, optimizar y dominar.
                </p>
                <p>
                  No somos agentes de viajes. Somos un ingeniero y una analista que se obsesionaron con resolver el mito de la "Planificación Perfecta".
                </p>
              </div>

{/* CIERRE SOCIAL */}
<div className="flex items-center gap-6 pt-6 border-t border-gunmetal/5">
                
                {/* Foto del Fundador */}
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg">
                    <Image 
                        src="/images/founder.jpg" 
                        alt="Foto del Fundador" 
                        fill 
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw" // Optimización para móviles
                    /> 
                </div>
                
                <div>
                    <h3 className="font-display font-bold text-gunmetal text-lg">Javier & Carolina</h3>
                    <p className="type-tech text-[10px] text-gunmetal/50 uppercase tracking-widest mb-2">Creative Founders, ORLANDO 247</p>
                    <div className="flex gap-4">
                        <a href="#" className="text-gunmetal/40 hover:text-sunset transition-colors"><Icon icon="solar:camera-bold" width="20" /></a>
                        <a href="#" className="text-gunmetal/40 hover:text-sunset transition-colors"><Icon icon="logos:twitter" width="18" className="grayscale hover:grayscale-0 transition-all" /></a>
                        <a href="#" className="text-gunmetal/40 hover:text-sunset transition-colors"><Icon icon="logos:linkedin-icon" width="18" className="grayscale hover:grayscale-0 transition-all" /></a>
                    </div>
                </div>
              </div>
            </div>

            {/* --- COLUMNA DERECHA: LA NUBE DE ANSIEDAD (Interactiva) --- */}
            <div 
                className="relative h-[500px] w-full bg-white rounded-3xl border border-gunmetal/5 shadow-sm flex items-center justify-center overflow-hidden group cursor-crosshair"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Fondo sutil grid */}
                <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

                {/* MENSAJE DE VALIDACIÓN (Aparece al Hover) */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="absolute z-10 text-center px-6"
                >
                    <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#a7e26e]/20 text-[#a7e26e] shadow-lg shadow-[#a7e26e]/20">
                        <Icon icon="solar:check-circle-bold" width="32" />
                    </div>
                    <h3 className="type-display text-3xl text-gunmetal mb-2">Respira.</h3>
                    <p className="type-body text-gunmetal/60">O247 se encarga del ruido.<br/>Vos encargate de disfrutar.</p>
                </motion.div>

                {/* BURBUJAS DE ANSIEDAD (Desaparecen al Hover) */}
                <AnimatePresence>
                    {!isHovered && (
                        <div className="absolute inset-0">
                            {PAIN_POINTS.map((point, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ 
                                        opacity: 1, 
                                        scale: 1,
                                        y: [0, -15, 0], // Flotación
                                        x: [0, 10, 0]
                                    }}
                                    exit={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }} // Efecto "Clean up"
                                    transition={{ 
                                        y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" },
                                        x: { duration: 5 + i, repeat: Infinity, ease: "easeInOut" },
                                        opacity: { duration: 0.5, delay: i * 0.1 }
                                    }}
                                    className="absolute p-4 bg-white border border-gunmetal/10 rounded-2xl shadow-lg shadow-gunmetal/5 max-w-[200px]"
                                    style={{
                                        top: `${50 + point.y}%`,
                                        left: `${50 + point.x}%`,
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: 5
                                    }}
                                >
                                    {/* Icono de alerta pequeño */}
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-50 text-red-500 rounded-full flex items-center justify-center border border-white shadow-sm">
                                        <Icon icon="solar:bell-bing-bold-duotone" width="12" />
                                    </div>
                                    <p className="type-body text-xs font-bold text-gunmetal leading-tight">
                                        "{point.text}"
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </AnimatePresence>
                
                {/* Label inferior */}
                <div className="absolute bottom-6 type-tech text-[9px] text-gunmetal/30 uppercase tracking-widest pointer-events-none">
                    {isHovered ? "System Optimized" : "Hover to optimize logistics"}
                </div>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}