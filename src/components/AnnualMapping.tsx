// Ruta: src/components/AnnualMapping.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { MonthData } from '@/data/annual-mapping'; 

// ------------------------------------------------------------------
// 1. DEFINICIÓN DEL COMPONENTE MONTHCARD
// ------------------------------------------------------------------
const MonthCard = ({ data }: { data: MonthData }) => {
  
  const themeColors = {
    emerald: { bg: 'bg-emerald-500', text: 'text-emerald-100', accent: 'text-emerald-400', soft: 'bg-emerald-500/20' },
    amber: { bg: 'bg-amber-500', text: 'text-amber-100', accent: 'text-amber-400', soft: 'bg-amber-500/20' },
    rose: { bg: 'bg-rose-500', text: 'text-rose-100', accent: 'text-rose-400', soft: 'bg-rose-500/20' },
    cyan: { bg: 'bg-cyan-500', text: 'text-cyan-100', accent: 'text-cyan-400', soft: 'bg-cyan-500/20' },
  };
  
  const theme = themeColors[data.colorTheme] || themeColors.emerald;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative h-[620px] w-full rounded-[32px] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] bg-gunmetal"
    >
      {/* IMAGEN DE FONDO + EFECTOS */}
      <div className="absolute inset-0 overflow-hidden rounded-[32px]">
        {data.image && (
          <img 
            src={data.image} 
            alt={data.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/90 opacity-90" />
        <div className="absolute inset-0 bg-gunmetal/20 mix-blend-multiply" />
      </div>

      {/* CONTENIDO SUPERIOR */}
      <div className="relative z-10 p-8 flex justify-between items-start">
        <div>
          <span className={`inline-block px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest backdrop-blur-xl border border-white/20 ${theme.bg} text-white shadow-lg mb-3`}>
            {data.seasonTag}
          </span>
          <h3 className="text-5xl font-black text-white drop-shadow-lg tracking-tighter">
            {data.name}
          </h3>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="flex gap-0.5 text-xl font-bold text-white">
             <span className={data.priceLevel >= 1 ? 'text-sunset' : 'text-white/20'}>$</span>
             <span className={data.priceLevel >= 2 ? 'text-sunset' : 'text-white/20'}>$</span>
             <span className={data.priceLevel >= 3 ? 'text-sunset' : 'text-white/20'}>$</span>
          </div>
          <span className="text-[9px] font-bold text-white/60 uppercase tracking-wide mt-1">Costo</span>
        </div>
      </div>

      {/* METEOROLOGÍA & GEAR (VISUALIZACIÓN MÍN/MÁX) */}
      <div className="relative z-10 px-8 grid grid-cols-2 gap-4 mt-4">
         
         {/* TARJETA 1: CLIMA (RANGO) */}
         <div className="aspect-square bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-4 flex flex-col items-center justify-center text-center shadow-lg group-hover:bg-white/15 transition-colors relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent opacity-50 pointer-events-none"></div>
            
            <Icon icon="solar:sun-fog-bold-duotone" className={`w-10 h-10 mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] ${theme.accent}`} />
            
            <div className="flex flex-col items-center">
                {/* ETIQUETA PROMEDIO */}
                <span className="text-[8px] font-bold text-white/50 uppercase tracking-widest bg-black/20 px-2 py-0.5 rounded-full backdrop-blur-sm mb-1">
                    Promedio
                </span>

                {/* TEMPERATURAS: GRANDE (MAX) / CHICA (MIN) */}
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white leading-none tracking-tight">
                        {data.tempMax}
                    </span>
                    <span className="text-lg font-bold text-white/60">
                        / {data.tempMin}
                    </span>
                </div>

                <span className="text-[9px] font-bold text-white/90 uppercase tracking-widest mt-1">
                    Máx / Mín
                </span>
            </div>
         </div>
         
         {/* TARJETA 2: ROPA / GEAR */}
         <div className="aspect-square bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-4 flex flex-col items-center justify-center text-center shadow-lg group-hover:bg-white/15 transition-colors relative overflow-hidden">
             <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent opacity-50 pointer-events-none"></div>

            <Icon icon={data.gearIcon} className="w-12 h-12 mb-3 text-white/90 drop-shadow-md" />
            
            <div className="flex flex-col items-center">
                <span className="text-lg font-bold text-white leading-tight mb-1">{data.gearLabel}</span>
                <span className="text-[9px] font-bold text-white/80 uppercase tracking-widest">Recomendado</span>
            </div>
         </div>

      </div>

      {/* FOOTER: MULTITUDES & INSIGHT */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
         <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-5 mb-4">
            <div className="flex justify-between items-center mb-3">
               <div className="flex items-center gap-2">
                  <Icon icon="solar:users-group-rounded-bold" className="text-white/60 w-4 h-4" />
                  <span className="text-[10px] font-bold text-white/80 uppercase tracking-[0.2em]">Multitudes</span>
               </div>
               <span className={`text-xs font-bold ${theme.accent}`}>{data.crowdLabel}</span>
            </div>
            
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-4">
               <motion.div 
                 initial={{ width: 0 }}
                 whileInView={{ width: `${data.crowdPercent}%` }}
                 transition={{ duration: 1, delay: 0.2 }}
                 className={`h-full rounded-full ${theme.bg} shadow-[0_0_12px_currentColor]`}
               />
            </div>

            <p className="text-[13px] leading-relaxed text-white/95 font-medium line-clamp-2">
               {data.insight}
            </p>
         </div>

         <button className="w-full py-3.5 bg-primary text-white font-bold tracking-tight rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-white/10 group/btn">
            <span>Ver Estrategia</span>
            <Icon icon="solar:arrow-right-bold" className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
         </button>
      </div>
    </motion.div>
  );
};

// ------------------------------------------------------------------
// 2. COMPONENTE PRINCIPAL
// ------------------------------------------------------------------
interface AnnualMappingProps {
  initialData: MonthData[];
}

export default function AnnualMapping({ initialData }: AnnualMappingProps) {
  
  if (!initialData || initialData.length === 0) {
    return <div className="p-10 text-center text-gunmetal/50">Cargando datos climáticos...</div>;
  }

  return (
    <section className="bg-bone min-h-screen pb-24">
      
      {/* 1. HERO SECTION */}
      <div className="relative pt-16 pb-12 px-6 md:px-8 max-w-[1400px] mx-auto">
         <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-black text-gunmetal tracking-tight mb-4">
               Comparativa Estratégica
            </h2>
            <p className="text-gunmetal/60 text-lg md:text-xl leading-relaxed">
               Nuestra tecnología <strong className="text-gunmetal">Atmo-Sync™</strong> conecta con bases de datos históricas de Orlando para mostrarte promedios reales de temperatura (Mínima y Máxima) y probabilidad de lluvia.
            </p>
         </div>
      </div>

      {/* 2. GRID DE CARDS (Sin Selector) */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {initialData.map((month) => (
                <div key={month.id}>
                    <MonthCard data={month} />
                </div>
            ))}
        </div>

        {/* 3. BLOQUE ATMOSPHERE (Footer) */}
        <div className="relative rounded-[40px] overflow-hidden bg-gunmetal shadow-2xl border border-white/5 mx-auto">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-sunset/10 rounded-full blur-[100px]" />
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Icon icon="solar:thermometer-bold" className="w-64 h-64 text-white" />
            </div>

            <div className="relative z-10 p-10 md:p-16 max-w-4xl">
                <div className="flex items-center gap-3 mb-6">
                    <Icon icon="solar:verified-check-bold" className="text-sunset w-6 h-6" />
                    <span className="text-sunset font-mono font-bold uppercase tracking-[0.2em] text-[11px]">
                        O247 Intelligence
                    </span>
                </div>
                
                <h3 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight leading-none">
                    Sentir el clima <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset to-celeste">
                        antes de despegar.
                    </span>
                </h3>
                
                <p className="text-lg text-white/60 leading-relaxed mb-10 font-sans max-w-2xl">
                   No usamos promedios genéricos. Nuestro algoritmo pondera la humedad de Orlando y los eventos especiales de Disney para darte una predicción de "Sensación Real".
                </p>
            </div>
        </div>

      </div>
    </section>
  );
}