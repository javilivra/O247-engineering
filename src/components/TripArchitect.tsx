"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useModal } from "@/context/ModalContext";

// --- DATA: Opciones del Configurador ---
const TRAVEL_TYPES = [
  { id: "family", label: "Familia", icon: "solar:users-group-rounded-bold-duotone", desc: "Modo: Kids & Logistics" },
  { id: "couple", label: "Pareja", icon: "solar:heart-angle-bold-duotone", desc: "Modo: Romance & Dining" },
  { id: "friends", label: "Amigos", icon: "solar:beer-mug-bold-duotone", desc: "Modo: Thrill & Nightlife" },
  { id: "solo", label: "Solo", icon: "solar:user-id-bold-duotone", desc: "Modo: Efficiency & Speed" },
];

const VIBE_TYPES = [
  { id: "commando", label: "Comando", icon: "solar:running-bold-duotone", desc: "De 7AM a cierre. Máxima eficiencia." },
  { id: "chill", label: "Relax", icon: "solar:tea-cup-bold-duotone", desc: "Sin madrugar. Disfrute y piscinas." },
  { id: "balanced", label: "Balanceado", icon: "solar:scale-bold-duotone", desc: "Estrategia mixta. Lo mejor de ambos." },
];

export default function TripArchitect() {
  const { openSignUp } = useModal();
  const [step, setStep] = useState(1);
  const [precision, setPrecision] = useState(15); // Gamificación: Empieza bajo
  const [selections, setSelections] = useState({ type: "", vibe: "" });

  // Función para avanzar y simular "calibración"
  const handleSelection = (key: string, value: string, nextStep: number, boost: number) => {
    setSelections({ ...selections, [key]: value });
    setPrecision((prev) => Math.min(prev + boost, 98)); // Sube la "precisión"
    setTimeout(() => setStep(nextStep), 300); // Pequeño delay para ver la animación de selección
  };

  return (
    <section className="relative bg-gunmetal py-24 px-6 overflow-hidden">
      {/* Fondo técnico sutil */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-celeste/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER: EL POR QUÉ */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 mb-4"
                >
                    <div className="h-px w-8 bg-sunset"></div>
                    <span className="text-sunset font-mono text-xs uppercase tracking-[0.2em] font-bold">
                        Data Initialization
                    </span>
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6 leading-tight">
                    ¿Cómo está formado <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset to-celeste">
                        tu equipo de viaje?
                    </span>
                </h2>
                <p className="text-white/60 text-lg max-w-lg leading-relaxed">
                    No te damos información genérica. Filtramos el ruido. 
                    Dinos quién eres y nuestro sistema ocultará lo que no te sirve 
                    (adiós precios de pañales si viajas solo).
                </p>
            </div>

            {/* GAMIFICACIÓN: PANEL DE PRECISIÓN */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl w-full md:w-auto min-w-[250px]">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">Precisión del Algoritmo</span>
                    <Icon icon="solar:cpu-bolt-bold-duotone" className="text-celeste w-4 h-4 animate-pulse" />
                </div>
                <div className="flex items-end gap-2">
                    <span className="text-5xl font-black text-white font-mono tracking-tighter">
                        {precision}%
                    </span>
                </div>
                {/* Barra de progreso visual */}
                <div className="w-full h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden">
                    <motion.div 
                        initial={{ width: "15%" }}
                        animate={{ width: `${precision}%` }}
                        transition={{ duration: 1, ease: "circOut" }}
                        className="h-full bg-gradient-to-r from-sunset to-celeste"
                    />
                </div>
            </div>
        </div>

        {/* INTERACTIVE AREA (Multistep) */}
        <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
                
                {/* PASO 1: TIPO DE GRUPO */}
                {step === 1 && (
                    <motion.div 
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {TRAVEL_TYPES.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => handleSelection("type", type.id, 2, 35)}
                                    className="group relative h-64 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-celeste/50 rounded-3xl p-8 flex flex-col justify-end transition-all duration-300 hover:-translate-y-2"
                                >
                                    {/* Icono Flotante */}
                                    <div className="absolute top-8 left-8 p-4 bg-white/5 rounded-2xl text-white/50 group-hover:text-celeste group-hover:bg-celeste/10 transition-colors">
                                        <Icon icon={type.icon} className="w-8 h-8" />
                                    </div>
                                    
                                    <div className="text-left">
                                        <h3 className="text-2xl font-bold text-white mb-2">{type.label}</h3>
                                        <p className="font-mono text-[10px] text-sunset uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">
                                            {type.desc}
                                        </p>
                                    </div>
                                    
                                    {/* Selección Visual */}
                                    <div className="absolute inset-0 border-2 border-celeste rounded-3xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none" />
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* PASO 2: RITMO (VIBE) */}
                {step === 2 && (
                    <motion.div 
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                        className="w-full"
                    >
                        <h3 className="text-white/80 text-xl mb-8 font-light">
                            Seleccionaste: <strong className="text-white capitalize">{selections.type}</strong>. 
                            Ahora, ¿cuál es tu ritmo?
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {VIBE_TYPES.map((vibe) => (
                                <button
                                    key={vibe.id}
                                    onClick={() => handleSelection("vibe", vibe.id, 3, 40)}
                                    className="group relative flex items-center gap-6 p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/50 rounded-2xl transition-all text-left"
                                >
                                    <div className="w-16 h-16 rounded-full bg-gunmetal flex items-center justify-center border border-white/10 group-hover:border-emerald-400 text-emerald-400">
                                        <Icon icon={vibe.icon} className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-1">{vibe.label}</h4>
                                        <p className="text-xs text-white/50">{vibe.desc}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                        <button 
                            onClick={() => setStep(1)} 
                            className="mt-8 text-white/30 hover:text-white text-xs font-mono uppercase tracking-widest flex items-center gap-2"
                        >
                            <Icon icon="solar:arrow-left-linear" /> Volver atrás
                        </button>
                    </motion.div>
                )}

                {/* PASO 3: FINAL (GATE) */}
                {step === 3 && (
                    <motion.div 
                        key="step3"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-3xl p-10 md:p-14 text-center max-w-3xl mx-auto border border-white/20 relative overflow-hidden"
                    >
                        {/* Confetti o brillo sutil */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sunset via-celeste to-emerald-500" />

                        <div className="mb-8 flex justify-center">
                            <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-100">
                                <Icon icon="solar:verified-check-bold-duotone" className="w-10 h-10" />
                            </div>
                        </div>

                        <h3 className="text-3xl md:text-4xl font-display font-black text-gunmetal mb-4">
                            Perfil Optimizado al <span className="text-emerald-500">95%</span>
                        </h3>
                        <p className="text-gunmetal/60 text-lg mb-10 max-w-xl mx-auto">
                            Hemos configurado la plataforma para un viaje 
                            <strong> {selections.type}</strong> con ritmo <strong>{selections.vibe}</strong>.
                            <br/>¿Quieres guardar esta configuración para siempre?
                        </p>

                        <div className="mt-8 flex flex-col md:flex-row items-center justify-end gap-4">
                            <button 
                                onClick={openSignUp}
                                className="group relative inline-flex w-full md:w-auto items-center justify-center px-8 py-4 bg-gunmetal text-white rounded-xl font-bold uppercase tracking-widest transition-all hover:bg-sunset hover:shadow-lg"
                            >
                                <span>Crear Cuenta y Guardar</span>
                                <Icon icon="solar:arrow-right-linear" className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            
                            {/* CTA Secundario: Guest */}
                            <button className="px-8 py-4 text-gunmetal/50 font-bold uppercase tracking-widest text-xs hover:text-gunmetal transition-colors">
                                Solo explorar por ahora
                            </button>
                        </div>
                        
                        <p className="mt-6 text-[10px] text-gunmetal/30 font-mono">
                            *No se requiere tarjeta de crédito. La cuenta básica es gratuita.
                        </p>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>

        {/* INDICADOR DE PASOS (Solo visible si no ha terminado) */}
        {step < 3 && (
            <div className="absolute bottom-0 right-6 md:right-0 opacity-20">
                <span className="text-9xl font-black text-white font-display">0{step}</span>
                <span className="text-4xl font-bold text-white font-display">/02</span>
            </div>
        )}

      </div>
    </section>
  );
}