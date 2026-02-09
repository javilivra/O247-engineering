"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { ScrollReveal } from "./ScrollReveal";

const stepsData = [
  {
    id: 1,
    question: "¿Cómo está formado",
    highlight: "tu equipo de viaje?",
    options: [
      { id: "family", label: "Familia", sub: "Modo: Kids", icon: "solar:users-group-rounded-bold-duotone" },
      { id: "couple", label: "Pareja", sub: "Modo: Romance", icon: "solar:heart-angle-bold-duotone" },
      { id: "friends", label: "Amigos", sub: "Modo: Thrill", icon: "solar:glass-cheers-bold-duotone" },
      { id: "solo", label: "Solo", sub: "Modo: Solo", icon: "solar:user-bold-duotone" },
    ]
  },
  {
    id: 2,
    question: "¿Qué buscan vivir",
    highlight: "en esta aventura?",
    options: [
      { id: "magic", label: "Magia Pura", sub: "Focus: Disney", icon: "solar:magic-stick-3-bold-duotone" },
      { id: "thrill", label: "Adrenalina", sub: "Focus: Universal", icon: "solar:roller-coaster-bold-duotone" },
      { id: "chill", label: "Relax & Food", sub: "Low Pace", icon: "solar:wineglass-triangle-bold-duotone" },
      { id: "mix", label: "Mix Total", sub: "Balanced", icon: "solar:infinity-bold-duotone" },
    ]
  }
];

export default function TravelerSelector() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selections, setSelections] = useState<{ [key: number]: string }>({});
  
  // F17: Estado para manejar la "Calibración"
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [isDone, setIsDone] = useState(false);

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

  // F17: Handler funcional
  const handleCalibrate = () => {
    setIsCalibrating(true);
    // Simular proceso de backend
    setTimeout(() => {
        setIsCalibrating(false);
        setIsDone(true);
        // Aquí redirigiríamos a la página de resultados
        // router.push('/planning/result');
    }, 2000);
  };

  return (
    <section className="py-24 bg-gunmetal text-bone relative overflow-hidden min-h-[700px] flex flex-col justify-center">
      
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none">
          <path d="M-100 600 C 200 400, 600 900, 1500 200" stroke="url(#gradientLine)" strokeWidth="1.5" />
          <path d="M-100 400 C 300 700, 800 200, 1500 500" stroke="url(#gradientLine)" strokeWidth="1.5" opacity="0.5"/>
          <defs>
            <linearGradient id="gradientLine" x1="0" y1="0" x2="100%" y2="0">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#00B4D8" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col items-center">
        <ScrollReveal width="100%">
          
          <div className="flex justify-center mb-12">
             <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
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
                className="w-full flex flex-col items-center"
            >
                <div className="text-center mb-16 w-full">
                    <h2 className="type-display text-4xl md:text-6xl text-white mb-4">
                    {currentData.question} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset to-celeste">{currentData.highlight}</span>
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-5xl mx-auto">
                    {currentData.options.map((option) => {
                    const isSelected = selections[currentStep] === option.id;
                    
                    return (
                        <motion.button
                            key={option.id}
                            onClick={() => handleSelect(option.id)}
                            className={`
                                group relative aspect-square flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 border w-full
                                ${isSelected 
                                ? "border-sunset bg-sunset/10 shadow-[0_0_30px_rgba(255,112,67,0.2)]" 
                                : "border-white/10 hover:border-celeste/50 bg-white/5 hover:bg-white/10" 
                                }
                            `}
                        >
                        <div className={`
                            w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300
                            ${isSelected 
                                ? "bg-sunset text-gunmetal shadow-lg shadow-sunset/20" 
                                : "bg-white/5 text-bone/80 group-hover:bg-celeste group-hover:text-gunmetal"
                            }
                        `}>
                            <Icon icon={option.icon} width="32" />
                        </div>

                        <h3 className={`text-xl font-display font-medium mb-2 tracking-tight ${isSelected ? "text-sunset" : "text-white"}`}>
                            {option.label}
                        </h3>
                        <span className="type-tech text-[10px] text-celeste/70">
                            {option.sub}
                        </span>

                        {isSelected && (
                            <motion.div 
                                initial={{ scale: 0 }} animate={{ scale: 1 }}
                                className="absolute top-4 right-4 w-6 h-6 bg-sunset rounded-full flex items-center justify-center text-gunmetal shadow-sm"
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

          <div className="flex items-end justify-between mt-16 border-t border-white/10 pt-8 w-full max-w-5xl mx-auto">
            <div className="w-1/3">
                {currentStep > 1 && (
                    <button onClick={handleBack} className="type-tech group flex items-center gap-3 text-[10px] text-white/40 hover:text-white transition-colors">
                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-gunmetal transition-colors">
                            <Icon icon="solar:arrow-left-linear" width="16" />
                        </div>
                        <span className="hidden md:inline">VOLVER</span>
                    </button>
                )}
            </div>

            <div className="w-1/3 flex justify-center">
                {currentStep === totalSteps && selections[totalSteps] && (
                    <div className="flex flex-col items-center gap-4">
                        {/* F17: Botón Funcional con Estados */}
                        <button 
                            onClick={handleCalibrate}
                            disabled={isCalibrating || isDone}
                            className={`
                                px-10 py-4 rounded-full font-bold tracking-wide transition-all shadow-[0_0_30px_rgba(255,112,67,0.3)] hover:scale-105 type-tech text-xs
                                ${isDone 
                                    ? "bg-emerald-500 text-white cursor-default" 
                                    : "bg-gradient-to-r from-sunset to-celeste text-gunmetal hover:brightness-110"
                                }
                            `}
                        >
                            {isCalibrating ? (
                                <span className="flex items-center gap-2">
                                    <Icon icon="svg-spinners:ring-resize" width="16" /> CALIBRANDO...
                                </span>
                            ) : isDone ? (
                                <span className="flex items-center gap-2">
                                    <Icon icon="solar:check-circle-bold" width="16" /> ¡CALIBRADO!
                                </span>
                            ) : (
                                "CALIBRAR PREFERENCIAS"
                            )}
                        </button>
                        <p className="type-tech text-[9px] text-white/20 text-center">
                            Acepto los <button className="underline hover:text-white">Términos</button>.
                        </p>
                    </div>
                )}
            </div>
            
            <div className="w-1/3 flex justify-end">
                <span className="type-display text-4xl text-white/10">
                    0{currentStep}<span className="text-lg opacity-50">/0{totalSteps}</span>
                </span>
            </div>
          </div>

        </ScrollReveal>
      </div>
    </section>
  );
}