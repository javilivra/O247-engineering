"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { ScrollReveal } from "./ScrollReveal";

// --- DATOS ---
const stepsData = [
  {
    id: 1,
    question: "¿Cómo está formado",
    highlight: "tu equipo de viaje?",
    options: [
      { id: "family", label: "Familia", sub: "Con niños", icon: "solar:users-group-rounded-bold-duotone" },
      { id: "couple", label: "Pareja", sub: "Romántico", icon: "solar:heart-angle-bold-duotone" },
      { id: "friends", label: "Amigos", sub: "Adrenalina", icon: "solar:glass-cheers-bold-duotone" },
      { id: "solo", label: "Solo", sub: "A mi ritmo", icon: "solar:user-bold-duotone" },
    ]
  },
  {
    id: 2,
    question: "¿Qué buscan vivir",
    highlight: "en esta aventura?",
    options: [
      { id: "magic", label: "Magia Pura", sub: "Full Disney", icon: "solar:magic-stick-3-bold-duotone" },
      { id: "thrill", label: "Adrenalina", sub: "Universal & Co", icon: "solar:roller-coaster-bold-duotone" },
      { id: "chill", label: "Relax & Food", sub: "Sin apuro", icon: "solar:wineglass-triangle-bold-duotone" },
      { id: "mix", label: "Mix Total", sub: "Lo mejor de todo", icon: "solar:infinity-bold-duotone" },
    ]
  }
];

export default function TravelerSelector() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selections, setSelections] = useState<{ [key: number]: string }>({});

  const totalSteps = stepsData.length;
  const currentData = stepsData[currentStep - 1];

  const handleSelect = (optionId: string) => {
    setSelections({ ...selections, [currentStep]: optionId });
    if (currentStep < totalSteps) {
        setTimeout(() => setCurrentStep(prev => prev + 1), 400);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  return (
    // ESTRATEGIA APLICADA: Fondo oscuro (bg-gunmetal) para romper el flujo Hueso.
    // Usamos 'text-bone' para que el texto general sea claro sobre el fondo oscuro.
    <section className="py-24 bg-gunmetal text-bone relative overflow-hidden min-h-[700px] flex flex-col justify-center">
      
      {/* DECORACIÓN: Ondas en Celeste */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none">
          <path d="M-100 600 C 200 400, 600 900, 1500 200" stroke="url(#gradientLine)" strokeWidth="1.5" />
          <path d="M-100 400 C 300 700, 800 200, 1500 500" stroke="url(#gradientLine)" strokeWidth="1.5" opacity="0.5"/>
          <defs>
            {/* Usamos la variable CSS de tailwind para el color celeste si es necesario, o el hex directo en SVG */}
            <linearGradient id="gradientLine" x1="0" y1="0" x2="100%" y2="0">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#00B4D8" /> {/* Celeste Pool */}
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <ScrollReveal>
          
          {/* BARRA DE PROGRESO: Sunset */}
          <div className="flex justify-center mb-12">
             <div className="w-24 h-1 bg-bone/10 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-sunset"
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
             </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            >
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-display font-medium mb-4 tracking-tight">
                    {currentData.question} <br />
                    <span className="text-sunset">{currentData.highlight}</span>
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {currentData.options.map((option) => {
                    const isSelected = selections[currentStep] === option.id;
                    
                    return (
                        <motion.button
                            key={option.id}
                            onClick={() => handleSelect(option.id)}
                            className={`
                                group relative aspect-square flex flex-col items-center justify-center p-6 rounded-3xl transition-all duration-300 border-2
                                ${isSelected 
                                ? "border-sunset bg-sunset/10 shadow-[0_0_30px_rgba(255,112,67,0.2)]" // Activo Sunset
                                : "border-bone/10 hover:border-celeste/50 bg-bone/5" // Hover Celeste
                                }
                            `}
                        >
                        <div className={`
                            w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors duration-300
                            ${isSelected 
                                ? "bg-sunset text-gunmetal" 
                                : "bg-bone/10 text-bone group-hover:bg-celeste group-hover:text-gunmetal"
                            }
                        `}>
                            <Icon icon={option.icon} width="32" />
                        </div>

                        <h3 className={`text-xl font-display font-medium mb-1 ${isSelected ? "text-sunset" : "text-bone"}`}>
                            {option.label}
                        </h3>
                        <span className="text-xs font-mono uppercase tracking-wider text-celeste/70">
                            {option.sub}
                        </span>

                        {isSelected && (
                            <motion.div 
                            className="absolute top-4 right-4 w-6 h-6 bg-sunset rounded-full flex items-center justify-center text-gunmetal"
                            >
                            <Icon icon="solar:check-read-bold" width="14" />
                            </motion.div>
                        )}
                        </motion.button>
                    );
                    })}
                </div>
            </motion.div>
          </AnimatePresence>

          {/* FOOTER DE SECCIÓN */}
          <div className="flex items-end justify-between mt-16 border-t border-bone/5 pt-8">
            <div className="w-1/3">
                {currentStep > 1 && (
                    <button onClick={handleBack} className="group flex items-center gap-3 text-xs uppercase text-bone/40 hover:text-bone">
                        <div className="w-10 h-10 rounded-full border border-bone/20 flex items-center justify-center group-hover:bg-bone group-hover:text-gunmetal">
                            <Icon icon="solar:arrow-left-linear" width="18" />
                        </div>
                        <span className="hidden md:inline">Go Back</span>
                    </button>
                )}
            </div>

            <div className="w-1/3 flex justify-center">
                {currentStep === totalSteps && selections[totalSteps] && (
                    <div className="flex flex-col items-center gap-4">
                        <button className="bg-gradient-to-r from-sunset to-sunset hover:to-celeste text-gunmetal px-10 py-4 rounded-full font-bold tracking-wide hover:scale-105 transition-all shadow-lg shadow-sunset/20">
                            GENERAR MI PERFIL
                        </button>
                        <p className="text-[10px] text-bone/30 text-center">
                            Acepto los <a href="#" className="underline hover:text-bone">Términos</a>.
                        </p>
                    </div>
                )}
            </div>
            
            <div className="w-1/3 flex justify-end">
                <span className="text-4xl font-display font-medium text-bone/10">
                    0{currentStep}<span className="text-lg">/0{totalSteps}</span>
                </span>
            </div>
          </div>

        </ScrollReveal>
      </div>
    </section>
  );
}