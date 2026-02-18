// Ruta: src/components/AnnualMapping.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
// DESPUÉS (O247 Icon System — LOCAL, FUNCIONA SIEMPRE)
import { Icon } from "@/components/Icon";
import { MonthData } from '@/data/annual-mapping'; 

// ------------------------------------------------------------------
// 1. SUB-COMPONENTE: ONBOARDING HERO (NUEVO)
// ------------------------------------------------------------------
const MappingOnboarding = () => {
  return (
    <div className="relative pt-12 pb-16 px-6 md:px-8 max-w-[1400px] mx-auto">
      {/* Background Decorativo Sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-gradient-to-b from-white/50 to-transparent opacity-60 blur-3xl -z-10 pointer-events-none" />

      <div className="flex flex-col md:flex-row items-end gap-12">
        {/* COLUMNA IZQUIERDA: Texto Estratégico */}
        <div className="flex-1 max-w-2xl">
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-6"
           >
              <Icon icon="solar:radar-2-bold" />
              <span>O247 Intelligence Layer</span>
           </motion.div>
           
           <motion.h1 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-5xl md:text-6xl font-black text-gunmetal tracking-tighter leading-[0.95] mb-6"
           >
             Mapeo Anual <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-gunmetal to-gunmetal/60">
               Estratégico.
             </span>
           </motion.h1>
           
           <motion.p 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-lg text-gunmetal/60 leading-relaxed font-medium max-w-xl"
           >
             No adivines tu fecha. Nuestra tecnología <strong>Atmo-Sync™</strong> cruza 5 años de data histórica para proyectar el escenario real de tu viaje.
           </motion.p>
        </div>

        {/* COLUMNA DERECHA: Leyenda Visual (Educativa) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex-1 w-full md:w-auto"
        >
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gunmetal/5 grid grid-cols-1 sm:grid-cols-3 gap-4">
             {/* Variable 1: Clima */}
             <div className="flex flex-col items-center text-center p-3 rounded-2xl hover:bg-gunmetal/5 transition-colors">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-3">
                   <Icon icon="solar:sun-fog-bold-duotone" className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-gunmetal mb-1">Clima Real</span>
                <p className="text-[10px] text-gunmetal/50 leading-tight">Temp. promedio histórica (Máx/Mín)</p>
             </div>

             {/* Variable 2: Multitudes */}
             <div className="flex flex-col items-center text-center p-3 rounded-2xl hover:bg-gunmetal/5 transition-colors">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-3">
                   <Icon icon="solar:users-group-rounded-bold" className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-gunmetal mb-1">Afluencia</span>
                <p className="text-[10px] text-gunmetal/50 leading-tight">Densidad basada en eventos y feriados</p>
             </div>

             {/* Variable 3: Costo */}
             <div className="flex flex-col items-center text-center p-3 rounded-2xl hover:bg-gunmetal/5 transition-colors">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                   <Icon icon="solar:wallet-money-bold-duotone" className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-gunmetal mb-1">Inversión</span>
                <p className="text-[10px] text-gunmetal/50 leading-tight">Escala de precios de tickets y hoteles</p>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ------------------------------------------------------------------
// 2. COMPONENTE MONTHCARD (Sin cambios estructurales, solo props)
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

      {/* METEOROLOGÍA & GEAR */}
      <div className="relative z-10 px-8 grid grid-cols-2 gap-4 mt-4">
         {/* TARJETA 1: CLIMA */}
         <div className="aspect-square bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-4 flex flex-col items-center justify-center text-center shadow-lg group-hover:bg-white/15 transition-colors relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent opacity-50 pointer-events-none"></div>
            <Icon icon="solar:sun-fog-bold-duotone" className={`w-10 h-10 mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] ${theme.accent}`} />
            <div className="flex flex-col items-center">
                <span className="text-[8px] font-bold text-white/50 uppercase tracking-widest bg-black/20 px-2 py-0.5 rounded-full backdrop-blur-sm mb-1">
                    Promedio
                </span>
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
// 3. COMPONENTE PRINCIPAL (Layout)
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
      {/* 1. ONBOARDING HERO (Reemplaza al anterior) */}
      <MappingOnboarding />

      {/* 2. GRID DE CARDS */}
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