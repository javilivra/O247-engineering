"use client";
import { ScrollReveal } from "./ScrollReveal";

// Componente Stateless
const StatItem = ({ number, label, sub }: { number: string; label: string, sub?: string }) => (
  <div className="flex flex-col items-center justify-center p-6 border-r border-gunmetal/5 last:border-r-0">
    <span className="type-display text-4xl md:text-5xl text-gunmetal tracking-tight">
      {number}
    </span>
    <span className="type-tech text-[10px] text-gunmetal/60 mt-2 uppercase tracking-widest">
      {label}
    </span>
    {/* F49: Etiqueta de contexto para transparencia */}
    {sub && <span className="text-[9px] text-gunmetal/30 mt-1 font-mono">{sub}</span>}
  </div>
);

export default function StatsTicker() {
  return (
    // F49: Sombra inline reemplazada por 'shadow-averi-reverse'
    <div className="relative z-10 bg-bone -mt-10 rounded-t-[40px] pt-12 pb-16 border-t border-white/60 shadow-averi-reverse">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal width="100%">
          <div className="grid grid-cols-2 md:grid-cols-4 bg-white rounded-3xl shadow-sm border border-gunmetal/5 overflow-hidden">
            {/* F49: Datos etiquetados como Promedios/Objetivos para ser honestos */}
            <StatItem number="+14h" label="Ahorro Promedio" sub="*Por viaje completo" />
            <StatItem number="98%" label="Precisión Histórica" sub="*Datos 2024-2025" />
            <StatItem number="0.4s" label="Latencia Media" />
            <StatItem number="24/7" label="Soporte IA" />
          </div>
          
          <div className="flex items-center justify-center gap-2 mt-6 opacity-60">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-celeste opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-celeste"></span>
            </span>
            <p className="type-tech text-[10px] text-gunmetal uppercase tracking-widest">
              System Status: Operational // O247 Core v1.2.4
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}