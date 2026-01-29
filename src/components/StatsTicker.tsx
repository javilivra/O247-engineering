"use client";
import { ScrollReveal } from "./ScrollReveal";

const StatItem = ({ number, label }: { number: string; label: string }) => (
  // Reemplazo: border-black/5 -> border-gunmetal/5
  <div className="flex flex-col items-center justify-center p-6 border-r border-gunmetal/5 last:border-r-0">
    {/* Reemplazo: text-[#1a1a1a] -> text-gunmetal */}
    <span className="text-4xl md:text-5xl font-display font-medium text-gunmetal tracking-tight">
      {number}
    </span>
    {/* Reemplazo: text-[#4a4a4a] -> text-gunmetal/70 */}
    <span className="text-xs font-mono text-gunmetal/70 mt-2 uppercase tracking-wider">
      {label}
    </span>
  </div>
);

export default function StatsTicker() {
  return (
    /* Reemplazo: bg-[#f7f7f5] -> bg-bone */
    /* Reemplazo: shadow-[-10px_-10px_30px_rgba(0,0,0,0.03)] -> shadow-[-10px_-10px_30px_rgba(37,52,63,0.03)] (Usando el RGB de gunmetal) */
    <div className="relative z-10 bg-bone -mt-10 rounded-t-[40px] pt-12 pb-16 border-t border-white/60 shadow-[-10px_-10px_30px_rgba(37,52,63,0.03)]">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          {/* Reemplazo: border-black/5 -> border-gunmetal/5 */}
          <div className="grid grid-cols-2 md:grid-cols-4 bg-white rounded-3xl shadow-sm border border-gunmetal/5 overflow-hidden">
            <StatItem number="14h" label="Ahorradas" />
            <StatItem number="98%" label="Precisión" />
            <StatItem number="0s" label="Latencia" />
            <StatItem number="24/7" label="Soporte IA" />
          </div>
          {/* Reemplazo: text-[#4a4a4a] -> text-gunmetal/70 */}
          <p className="text-center text-gunmetal/70 mt-6 font-mono text-[10px] uppercase tracking-widest opacity-50">
            System Status: Operational // O247 Core v1.2
          </p>
        </ScrollReveal>
      </div>
    </div>
  );
}