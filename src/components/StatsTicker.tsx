"use client";
import { ScrollReveal } from "./ScrollReveal";

const StatItem = ({ number, label }: { number: string; label: string }) => (
  // Borde gunmetal/5 para sutileza estructural
  <div className="flex flex-col items-center justify-center p-6 border-r border-gunmetal/5 last:border-r-0">
    {/* .type-display para el número: Impacto narrativo */}
    <span className="type-display text-4xl md:text-5xl text-gunmetal tracking-tight">
      {number}
    </span>
    {/* .type-tech para la etiqueta: Precisión de dato duro */}
    <span className="type-tech text-[10px] text-gunmetal/60 mt-2 uppercase tracking-widest">
      {label}
    </span>
  </div>
);

export default function StatsTicker() {
  return (
    // Fondo bone y sombra con tinte Gunmetal
    <div className="relative z-10 bg-bone -mt-10 rounded-t-[40px] pt-12 pb-16 border-t border-white/60 shadow-[-10px_-10px_30px_rgba(37,52,63,0.03)]">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          {/* Contenedor blanco con bordes sutiles */}
          <div className="grid grid-cols-2 md:grid-cols-4 bg-white rounded-3xl shadow-sm border border-gunmetal/5 overflow-hidden">
            {/* UX Writing: Beneficio + Ingeniería */}
            <StatItem number="+14h" label="Tiempo Ganado" />
            <StatItem number="98%" label="Precisión Histórica" />
            <StatItem number="0.1s" label="Sincronización" />
            <StatItem number="24/7" label="Agente GATE" />
          </div>
          
          {/* System Status Line: Estética terminal/ingeniería pura */}
          <div className="flex items-center justify-center gap-2 mt-6 opacity-60">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-celeste opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-celeste"></span>
            </span>
            <p className="type-tech text-[10px] text-gunmetal uppercase tracking-widest">
              System Status: Operational // O247 Core v1.2
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}