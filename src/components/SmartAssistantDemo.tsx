// @STATUS: GOLDEN MASTER V2 - A11Y TEXT SIZE FIX (F33)
"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
// DESPUÉS (O247 Icon System — LOCAL, FUNCIONA SIEMPRE)
import { Icon } from "@/components/Icon";

const SCENARIOS = [
  {
    id: 1,
    query: "Almorzar rápido en Epcot",
    icon: "solar:hamburger-menu-bold-duotone",
    options: [
      { id: 'opt1', title: 'Space 220', meta: 'Espera: 120m', status: 'bad', price: '$$$$' },
      { id: 'opt2', title: 'Regal Eagle', meta: 'Espera: 15m', status: 'optimal', badge: 'MEJOR OPCIÓN', price: '$' },
      { id: 'opt3', title: 'Via Napoli', meta: 'Espera: 65m', status: 'neutral', price: '$$$' },
    ]
  },
  {
    id: 2,
    query: "Atracción MK sin fila",
    icon: "solar:magic-stick-3-bold-duotone",
    options: [
      { id: 'optA', title: '7 Dwarfs Mine', meta: 'Fila: 95m', status: 'bad', price: 'LL$' },
      { id: 'optC', title: 'Big Thunder', meta: 'Fila: 20m', status: 'optimal', badge: 'SMART PICK', price: 'FREE' },
      { id: 'optB', title: 'Peter Pan', meta: 'Fila: 55m', status: 'neutral', price: 'LL$' },
    ]
  }
];

export default function SmartAssistantDemo() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.5 });
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 150], [1, 0]);
  const yOffset = useTransform(scrollY, [0, 150], [0, 40]);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [step, setStep] = useState(0); 
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const currentScenario = SCENARIOS[scenarioIndex];

  const addTimeout = (callback: () => void, ms: number) => {
    const id = setTimeout(callback, ms);
    timeoutsRef.current.push(id);
  };

  const clearTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  useEffect(() => {
    clearTimeouts();
    if (isInView) {
      if (step === 0) {
         addTimeout(() => setStep(1), 800); 
         addTimeout(() => setStep(2), 2500);
         addTimeout(() => setStep(3), 4000);
         addTimeout(() => setStep(4), 5000);
         addTimeout(() => {
            setStep(0);
            setScenarioIndex((prev) => (prev + 1) % SCENARIOS.length);
         }, 7500);
      }
    } else {
       setStep(0);
    }
    return () => clearTimeouts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, isInView]);

  return (
    <motion.div 
      ref={containerRef}
      style={{ opacity, y: yOffset }}
      className="w-full max-w-[360px] mx-auto font-sans relative z-20" // Aumentado max-w para acomodar texto más grande
    >
      <div className="flex items-center justify-center gap-2 mb-8 opacity-80">
          <Icon icon="solar:cpu-bolt-bold-duotone" className="text-sunset w-4 h-4 shadow-lg shadow-sunset/50" />
          {/* F33: Aumentado de 10px a 11px */}
          <span className="text-[11px] font-bold text-white tracking-[0.2em] uppercase shadow-black drop-shadow-md">Motor de Decisión O247</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
            key={`input-${currentScenario.id}`}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
            transition={{ duration: 0.5 }}
            className="mb-6 relative z-30"
        >
            <div className="bg-gunmetal/90 backdrop-blur-xl border border-white/20 px-4 py-4 rounded-2xl flex items-center gap-3 shadow-2xl">
                <div className="bg-sunset/20 p-2 rounded-full text-sunset">
                    <Icon icon={currentScenario.icon} width="20" />
                </div>
                <div>
                    {/* F33: Aumentado de 10px a 11px */}
                    <div className="text-[11px] text-white/50 uppercase font-bold">Objetivo</div>
                    <div className="text-sm font-medium text-white">"{currentScenario.query}"</div>
                </div>
            </div>
        </motion.div>
      </AnimatePresence>

      <div className="space-y-2 relative z-10">
        {currentScenario.options.map((option, idx) => {
            const isOptimal = option.status === 'optimal';
            const isAnalyzing = step === 2; 
            const isSelected = step >= 2 && isOptimal;
            const isFlying = step >= 3 && isOptimal;
            
            return (
                <AnimatePresence key={option.id}>
                    {!isFlying && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ 
                                opacity: step >= 1 ? (isSelected || step < 2 ? 1 : 0.3) : 0, 
                                x: step >= 1 ? 0 : -20,
                                scale: isSelected ? 1.05 : 1,
                                backgroundColor: isSelected ? 'rgba(255, 112, 67, 0.15)' : 'rgba(20, 20, 25, 0.85)',
                                borderColor: isSelected ? 'rgba(255, 112, 67, 0.6)' : 'rgba(255, 255, 255, 0.1)',
                                boxShadow: isSelected ? '0 0 30px rgba(255,112,67,0.15)' : 'none'
                            }}
                            transition={{ delay: idx * 0.1 + 0.2, duration: 0.4 }}
                            className="relative p-3.5 rounded-xl border backdrop-blur-md flex justify-between items-center group overflow-hidden"
                        >
                            {isAnalyzing && (
                                <motion.div 
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '200%' }}
                                    transition={{ duration: 0.8, delay: idx * 0.15, ease: "linear" }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
                                />
                            )}
                            <div className="flex items-center gap-3">
                                <div className={`w-1 h-8 rounded-full transition-colors duration-500 ${isSelected ? 'bg-sunset shadow-[0_0_10px_#ff7043]' : 'bg-white/10'}`} />
                                <div>
                                    <div className="text-sm font-bold text-white">{option.title}</div>
                                    <div className="flex items-center gap-2 text-[11px] font-mono text-white/60 mt-0.5">
                                        <span className={isSelected ? 'text-white' : ''}>{option.meta}</span>
                                        <span className="w-1 h-1 rounded-full bg-white/20" />
                                        <span>{option.price}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {isOptimal && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: isSelected ? 1 : 0, scale: isSelected ? 1 : 0 }}
                                    // F33: Aumentado de 8px a 10px
                                    className="bg-sunset text-gunmetal text-[10px] font-bold px-2 py-0.5 rounded-md shadow-lg"
                                >
                                    {option.badge}
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            );
        })}
      </div>

      <div className="mt-10 relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Itinerario Inteligente</div>
          
          <motion.div 
            animate={{ scale: step === 3 ? 1.05 : 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="h-16 bg-gunmetal/90 backdrop-blur-2xl border border-white/20 rounded-2xl flex items-center px-4 gap-3 relative overflow-hidden shadow-2xl z-20"
          >
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center grayscale opacity-40">
                  <span className="text-sm">🏰</span>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <AnimatePresence mode="popLayout">
                  {step >= 3 ? (
                      <motion.div
                          layoutId={`optimal-item-${scenarioIndex}`} 
                          initial={{ opacity: 0, y: -60, scale: 0.9, filter: "blur(10px)" }}
                          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ type: "spring", stiffness: 180, damping: 18, mass: 1.2 }}
                          className="flex-1 h-10 bg-sunset/10 border border-sunset/60 rounded-lg flex items-center px-3 gap-3 shadow-[0_0_20px_rgba(255,112,67,0.3)]"
                      >
                         <div className="bg-sunset text-gunmetal rounded-full p-0.5">
                            <Icon icon="solar:check-circle-bold" className="w-3 h-3" />
                         </div>
                         <div className="flex flex-col">
                             <span className="text-[10px] font-bold text-white uppercase truncate leading-none mb-0.5">
                                {SCENARIOS[scenarioIndex].options.find(o => o.status === 'optimal')?.title}
                             </span>
                             <span className="text-[9px] font-mono text-sunset leading-none">Añadido al Plan</span>
                         </div>
                      </motion.div>
                  ) : (
                      <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 h-9 border border-dashed border-white/10 rounded-lg flex items-center justify-center"
                      >
                          <span className="text-[10px] text-white/20 animate-pulse">Esperando selección...</span>
                      </motion.div>
                  )}
              </AnimatePresence>
          </motion.div>
      </div>
    </motion.div>
  );
}