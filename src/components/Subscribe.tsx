"use client";

import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

export default function Subscribe() {
  // F18: Estados para control del formulario
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    // Simulación de llamada a API (1.5s)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStatus("success");
    setEmail("");
  };

  return (
    <section className="py-24 bg-gunmetal relative overflow-hidden">
      
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <ScrollReveal>
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
               <span className="w-1.5 h-1.5 rounded-full bg-celeste animate-pulse"></span>
               <span className="type-tech text-[10px] text-celeste uppercase tracking-widest">Early Access v1.0</span>
            </div>
            
            <h2 className="type-display text-5xl md:text-7xl text-white mb-6 tracking-tight">
              Diseña tu viaje <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset to-celeste">
                con precisión.
              </span>
            </h2>
            
            <p className="type-body text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
              Únete a la lista de espera. Recibe acceso anticipado al motor de planificación y guías exclusivas de Orlando.
            </p>
          </div>

          <div className="max-w-md mx-auto relative group min-h-[80px]">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl p-4 flex items-center justify-center gap-3"
                >
                    <Icon icon="solar:check-circle-bold" width="24" />
                    <span className="font-bold font-sans">¡Te has unido correctamente!</span>
                </motion.div>
              ) : (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-sunset to-celeste rounded-full opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
                    
                    {/* F18: Formulario funcional */}
                    <form onSubmit={handleSubmit} className="relative flex items-center bg-white rounded-full p-1.5 shadow-2xl">
                    <div className="pl-6 text-gunmetal/40">
                        <Icon icon="solar:letter-linear" width="20" />
                    </div>
                    <input 
                        type="email" 
                        placeholder="tu@email.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={status === "loading"}
                        className="w-full bg-transparent border-none outline-none text-gunmetal placeholder:text-gunmetal/30 px-4 py-3 font-medium type-body disabled:opacity-50"
                        required
                    />
                    <button 
                        type="submit"
                        disabled={status === "loading"}
                        className="bg-gunmetal text-white rounded-full px-6 py-3 font-bold uppercase tracking-wider text-xs hover:bg-sunset hover:text-gunmetal transition-all duration-300 type-tech shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {status === "loading" ? (
                            <Icon icon="svg-spinners:ring-resize" width="16" />
                        ) : "Unirme"}
                    </button>
                    </form>
                    
                    <p className="mt-4 text-[10px] text-white/30 type-tech uppercase tracking-widest">
                    Sin spam. Solo ingeniería de viajes.
                    </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-32 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center opacity-40 hover:opacity-100 transition-opacity duration-500">
        <span className="type-tech text-xs text-white">© 2026 O247 ENGINEERING</span>
        <div className="flex gap-6 mt-4 md:mt-0">
            {/* Links seguros o placeholers funcionales */}
            <button className="type-tech text-xs text-white hover:text-sunset transition-colors">INSTAGRAM</button>
            <button className="type-tech text-xs text-white hover:text-sunset transition-colors">LINKEDIN</button>
            <button className="type-tech text-xs text-white hover:text-sunset transition-colors">CONTACTO</button>
        </div>
      </div>

    </section>
  );
}