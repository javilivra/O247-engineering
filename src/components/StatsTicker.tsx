"use client";
import { ScrollReveal } from "./ScrollReveal";

const StatItem = ({ number, label }: { number: string; label: string }) => (
  <div className="flex flex-col items-center justify-center p-6 border-r border-black/5 last:border-r-0">
    <span className="text-4xl md:text-5xl font-display font-medium text-[#1a1a1a] tracking-tight">
      {number}
    </span>
    <span className="text-xs font-mono text-[#4a4a4a] mt-2 uppercase tracking-wider">
      {label}
    </span>
  </div>
);

export default function StatsTicker() {
  return (
    <div className="relative z-10 bg-[#f7f7f5] -mt-10 rounded-t-[40px] pt-12 pb-16 border-t border-white/60 shadow-[-10px_-10px_30px_rgba(0,0,0,0.03)]">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 bg-white rounded-3xl shadow-sm border border-black/5 overflow-hidden">
            <StatItem number="14h" label="Ahorradas" />
            <StatItem number="98%" label="Precisión" />
            <StatItem number="0s" label="Latencia" />
            <StatItem number="24/7" label="Soporte IA" />
          </div>
          <p className="text-center text-[#4a4a4a] mt-6 font-mono text-[10px] uppercase tracking-widest opacity-50">
            System Status: Operational // O247 Core v1.2
          </p>
        </ScrollReveal>
      </div>
    </div>
  );
}