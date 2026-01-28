"use client";

import { ScrollReveal } from "./ScrollReveal";
import { Icon } from "@iconify/react";

export default function Footer() {
  return (
    <>
      {/* SECCIÓN BIG CTA (Llamada a la acción gigante) */}
      <section className="py-32 px-6 bg-[#f7f7f5] border-t border-black/5">
        <ScrollReveal width="100%">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-display font-medium text-[#1a1a1a] mb-8 tracking-tighter">
              Ready to optimize?
            </h2>
            <p className="text-xl text-[#4a4a4a] mb-12 max-w-2xl mx-auto font-light">
              Deja de ser un turista y conviértete en un estratega. La ingeniería de tu viaje comienza hoy.
            </p>
            <button className="group bg-[#1a1a1a] text-white px-8 py-4 rounded-full text-lg font-medium inline-flex items-center gap-2 hover:bg-[#a7e26e] hover:text-[#1a1a1a] transition-all duration-300 shadow-lg hover:shadow-[#a7e26e]/20">
              Comenzar Planificación
              {/* Flecha Solar con animación de desplazamiento */}
              <Icon 
                icon="solar:arrow-right-linear" 
                width="24" 
                className="group-hover:translate-x-1 transition-transform duration-300" 
              />
            </button>
          </div>
        </ScrollReveal>
      </section>

      {/* SECCIÓN FOOTER LEGAL & LINKS */}
      <footer className="bg-white border-t border-black/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-[#a7e26e] rounded-lg flex items-center justify-center text-[#1a1a1a]">
                <Icon icon="solar:infinity-bold" width="20" />
             </div>
             <span className="font-display font-bold text-xl tracking-tight text-[#1a1a1a]">O247</span>
          </div>

          {/* Enlaces */}
          <div className="flex gap-8 text-sm text-[#4a4a4a] font-medium">
            <a href="#" className="hover:text-[#a7e26e] transition-colors">Features</a>
            <a href="#" className="hover:text-[#a7e26e] transition-colors">Pricing</a>
            <a href="#" className="hover:text-[#a7e26e] transition-colors">About</a>
            <a href="#" className="hover:text-[#a7e26e] transition-colors">Contact</a>
          </div>

          {/* Copyright */}
          <div className="text-xs text-gray-400 font-mono">
            © 2026 O247 Engineering. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}