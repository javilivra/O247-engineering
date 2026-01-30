"use client";

import { ScrollReveal } from "./ScrollReveal";
import { Icon } from "@iconify/react";

export default function Subscribe() {
  return (
    <section className="py-24 bg-gunmetal relative overflow-hidden">
      
      {/* DECORACIÓN: Grid sutil de fondo para textura Tech */}
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

          {/* FORMULARIO INPUT TIPO AVERI (Minimalista) */}
          <div className="max-w-md mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-sunset to-celeste rounded-full opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
            
            <form className="relative flex items-center bg-white rounded-full p-1.5 shadow-2xl">
              <div className="pl-6 text-gunmetal/40">
                <Icon icon="solar:letter-linear" width="20" />
              </div>
              <input 
                type="email" 
                placeholder="tu@email.com" 
                className="w-full bg-transparent border-none outline-none text-gunmetal placeholder:text-gunmetal/30 px-4 py-3 font-medium type-body"
                required
              />
              <button 
                type="submit"
                className="bg-gunmetal text-white rounded-full px-6 py-3 font-bold uppercase tracking-wider text-xs hover:bg-sunset hover:text-gunmetal transition-all duration-300 type-tech shadow-lg"
              >
                Unirme
              </button>
            </form>
            
            <p className="mt-4 text-[10px] text-white/30 type-tech uppercase tracking-widest">
              Sin spam. Solo ingeniería de viajes.
            </p>
          </div>
        </ScrollReveal>
      </div>
      
      {/* FOOTER LINKS SIMPLES (Dentro del mismo bloque visual) */}
      <div className="max-w-7xl mx-auto px-6 mt-32 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center opacity-40 hover:opacity-100 transition-opacity duration-500">
        <span className="type-tech text-xs text-white">© 2026 O247 ENGINEERING</span>
        <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="type-tech text-xs text-white hover:text-sunset transition-colors">INSTAGRAM</a>
            <a href="#" className="type-tech text-xs text-white hover:text-sunset transition-colors">LINKEDIN</a>
            <a href="#" className="type-tech text-xs text-white hover:text-sunset transition-colors">CONTACTO</a>
        </div>
      </div>

    </section>
  );
}