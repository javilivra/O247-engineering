"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Beneficios visuales
const BENEFITS = [
  { icon: "solar:tuning-square-2-bold-duotone", title: "Personalización", desc: "Filtramos el ruido. Solo lo que te sirve.", color: "text-sunset" },
  { icon: "solar:calendar-mark-bold-duotone", title: "Planificador IA", desc: "Rutas optimizadas y cálculo de afluencia.", color: "text-celeste" },
  { icon: "solar:bell-bing-bold-duotone", title: "Alertas Reales", desc: "Avisos de clima y cambios de precios.", color: "text-emerald-400" }
];

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Evitar scroll cuando está abierto
  React.useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onClose(); // Cerrar modal
      router.push("/planning"); // Redirigir al dashboard
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          
          {/* 1. Backdrop Blureado (El fondo oscuro y borroso) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gunmetal/60 backdrop-blur-md transition-all"
          />

          {/* 2. El Modal (La Tarjeta Flotante) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl bg-white rounded-[32px] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 max-h-[90vh] lg:h-auto overflow-y-auto lg:overflow-visible"
          >
            {/* Botón Cerrar */}
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-black/5 rounded-full backdrop-blur-sm transition-colors group"
            >
                <Icon icon="solar:close-circle-bold" className="w-8 h-8 text-gunmetal/30 group-hover:text-gunmetal" />
            </button>

            {/* COLUMNA IZQUIERDA: Formulario */}
            <div className="p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1 bg-white">
              <div className="mb-8">
                <h2 className="type-display text-3xl text-gunmetal mb-2 leading-tight">
                  Guarda tu Plan.
                </h2>
                <p className="type-body text-gunmetal/60 text-sm">
                  Accede a tu ingeniería de viaje personalizada.
                </p>
              </div>

              {/* Botones Sociales OFICIALES */}
              <div className="flex flex-col gap-3 mb-6">
                <button className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-white border border-gunmetal/10 rounded-xl hover:bg-gray-50 transition-all shadow-sm group">
                    <Icon icon="logos:google-icon" className="w-5 h-5" />
                    <span className="text-sm font-bold text-gunmetal">Continuar con Google</span>
                </button>
                <button className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-white border border-gunmetal/10 rounded-xl hover:bg-gray-50 transition-all shadow-sm group">
                    <Icon icon="logos:apple" className="w-5 h-5 -mt-0.5" />
                    <span className="text-sm font-bold text-gunmetal">Continuar con Apple</span>
                </button>
              </div>

              <div className="relative flex py-2 items-center mb-6">
                <div className="flex-grow border-t border-gunmetal/10"></div>
                <span className="flex-shrink-0 mx-4 text-[10px] font-mono text-gunmetal/30 uppercase tracking-widest">O manual</span>
                <div className="flex-grow border-t border-gunmetal/10"></div>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gunmetal uppercase tracking-wide">Nombre</label>
                        <input type="text" placeholder="Tu nombre" className="w-full bg-bone px-4 py-3 rounded-lg border-transparent focus:bg-white focus:ring-2 focus:ring-sunset/20 outline-none text-sm" required />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gunmetal uppercase tracking-wide">Email</label>
                        <input type="email" placeholder="hola@..." className="w-full bg-bone px-4 py-3 rounded-lg border-transparent focus:bg-white focus:ring-2 focus:ring-sunset/20 outline-none text-sm" required />
                    </div>
                </div>
                
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gunmetal uppercase tracking-wide">Contraseña</label>
                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            className="w-full bg-bone px-4 py-3 rounded-lg border-transparent focus:bg-white focus:ring-2 focus:ring-sunset/20 outline-none text-sm pr-10"
                            required
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gunmetal/30 hover:text-gunmetal">
                            <Icon icon={showPassword ? "solar:eye-bold" : "solar:eye-closed-bold"} />
                        </button>
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full py-3.5 bg-gunmetal text-white rounded-xl font-bold uppercase tracking-widest hover:bg-sunset transition-colors shadow-lg shadow-gunmetal/20 flex items-center justify-center gap-2 mt-2 text-xs"
                >
                    {isLoading ? <Icon icon="line-md:loading-loop" /> : <>Desbloquear Panel <Icon icon="solar:arrow-right-linear" /></>}
                </button>
              </form>
            </div>

            {/* COLUMNA DERECHA: Visual & Beneficios */}
            <div className="bg-gunmetal relative p-8 lg:p-12 flex flex-col justify-center order-1 lg:order-2 overflow-hidden min-h-[300px]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-sunset/20 rounded-full blur-3xl pointer-events-none -mr-10 -mt-10"></div>
                <div className="relative z-10">
                    <span className="inline-block px-3 py-1 rounded-full border border-white/20 text-white/50 text-[9px] font-mono uppercase tracking-widest bg-white/5 mb-6">
                        O247 Access
                    </span>
                    <h3 className="text-2xl md:text-3xl font-display text-white mb-8">
                        Únete a la <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset to-celeste">Ingeniería de Viajes.</span>
                    </h3>
                    <div className="space-y-5">
                        {BENEFITS.map((item, idx) => (
                            <div key={idx} className="flex gap-4 items-start">
                                <Icon icon={item.icon} className={`w-5 h-5 mt-0.5 ${item.color}`} />
                                <div>
                                    <h4 className="text-white font-bold text-sm">{item.title}</h4>
                                    <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}