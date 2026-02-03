"use client";

import { useEffect } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { motion, useSpring, useTransform, animate, Variants } from "framer-motion";

// DEFINICIÓN DE DATOS
export type WeatherType = "sun" | "rain" | "cloud" | "snow" | "storm";

export interface ParkData {
  id: string;
  name: string;
  slogan: string;
  image: string;
  temp: number;
  stats: {
    attractions: number;
    shows: number;
  };
  schedule: {
    early: string;
    regular: string;
    show?: string;
  };
  weatherType: WeatherType;
}

// --- SUB-COMPONENTE: CONTADOR ANIMADO ---
function Counter({ value, label, delay = 0 }: { value: number, label: string, delay?: number }) {
  const count = useSpring(0, { duration: 2000, bounce: 0 });
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const timeout = setTimeout(() => {
        animate(count, value, { duration: 1.5, ease: "circOut" });
    }, delay);
    return () => clearTimeout(timeout);
  }, [count, value, delay]);

  return (
    <div className="flex flex-col items-end">
      <motion.span className="font-sans text-4xl font-bold text-white leading-[0.85] tracking-tighter drop-shadow-lg tabular-nums">
        {rounded}
      </motion.span>
      <span className="font-mono text-[9px] text-white/60 tracking-widest mt-1 uppercase">
        {label}
      </span>
    </div>
  );
}

// --- SUB-COMPONENTE: CLIMA INTELIGENTE ---
function WeatherIcon({ type }: { type: WeatherType }) {
    const iconMap = {
        sun: "solar:sun-2-bold-duotone",
        rain: "solar:cloud-rain-bold-duotone",
        cloud: "solar:clouds-bold-duotone",
        snow: "solar:snowflake-bold-duotone",
        storm: "solar:cloud-storm-bold-duotone"
    };

    const variants: Variants = {
        sun: { rotate: 360, transition: { duration: 12, repeat: Infinity, ease: "linear" } },
        rain: { y: [0, 3, 0], transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } },
        cloud: { x: [-2, 2, -2], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } },
        snow: { rotate: [-10, 10, -10], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } },
        storm: { opacity: [1, 0.5, 1], transition: { duration: 0.5, repeat: Infinity, repeatDelay: 3 } }
    };

    return (
        <motion.div variants={variants} animate={type}>
            <Icon icon={iconMap[type]} className="text-white w-5 h-5" />
        </motion.div>
    );
}

interface ParkCardProps {
  data: ParkData;
}

export default function ParkCard({ data }: ParkCardProps) {
  return (
    <div 
      className="group relative h-[500px] lg:h-[550px] w-full rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:flex-[2.5] flex-1 min-w-0 border border-white/5 bg-gunmetal shadow-xl hover:shadow-2xl"
    >
        {/* EFECTO BORDE ACTIVO (Glow sutil) */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 bg-gradient-to-br from-sunset/50 via-transparent to-gunmetal p-[1px] rounded-3xl">
            <div className="w-full h-full bg-gunmetal rounded-3xl"></div>
        </div>

        <div className="relative w-full h-full flex rounded-3xl overflow-hidden z-10 bg-gunmetal">
            
            {/* --- SECCIÓN IZQUIERDA (FOTO) --- */}
            <div className="relative w-full h-full group-hover:w-[40%] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden bg-gunmetal z-10">
                
                {/* IMAGEN DE FONDO */}
                <div className="absolute inset-0 bg-gunmetal">
                    <Image 
                        src={data.image} 
                        alt={data.name} 
                        fill 
                        className="object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    />
                    {/* Gradientes para legibilidad */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gunmetal via-gunmetal/20 to-transparent mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gunmetal/10" />
                </div>

                {/* HUD: CLIMA */}
                <div className="absolute top-6 left-6 flex items-center gap-3 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 pl-2 pr-4 py-1.5 transition-all duration-300 group-hover:border-vanguard-green/50 shadow-lg z-20">
                    <div className="flex flex-col leading-none border-r border-white/20 pr-2 mr-1">
                        <span className="font-mono text-[8px] text-vanguard-green font-bold tracking-wider">AHORA</span>
                        <span className="font-mono text-[8px] text-white/40 tracking-wider">FEED</span>
                    </div>
                    <WeatherIcon type={data.weatherType} />
                    <span className="font-mono text-sm text-white font-medium">{data.temp}°</span>
                </div>

                {/* HUD: TELEMETRÍA */}
                <div className="absolute top-6 right-6 flex flex-col items-end text-right space-y-4 z-20">
                    <Counter value={data.stats.attractions} label="Atracciones" />
                    <div className="opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-200 ease-out">
                         <Counter value={data.stats.shows} label="Shows Activos" delay={200} />
                    </div>
                </div>

                {/* TEXTO GRANDE (INFO PRINCIPAL) */}
                {/* FIX SUPERPOSICIÓN:
                    - Salida (Hover): delay-0 (Se va rápido).
                    - Entrada (Normal): delay-400 (Espera a que termine la animación de cierre).
                */}
                <div className="absolute bottom-8 left-8 max-w-[85%] transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4 group-hover:delay-0 delay-400 z-20">
                    <h3 className="font-sans text-4xl font-bold text-white tracking-tight leading-none mb-3 drop-shadow-md">
                        {data.name}
                    </h3>
                    <div className="h-1 w-12 bg-sunset mb-4 rounded-full shadow-[0_0_15px_rgba(255,112,67,0.6)]"></div>
                    <p className="font-sans text-[13px] font-medium text-bone/90 leading-relaxed max-w-[280px]">
                        {data.slogan}
                    </p>
                    
                    <div className="mt-5 font-mono text-[10px] text-celeste/80 leading-relaxed tracking-wide bg-gunmetal/80 backdrop-blur px-3 py-2 rounded border border-white/10 inline-block shadow-lg">
                        <span className="text-white font-bold">REG:</span> {data.schedule.regular}
                        {data.schedule.show && (
                            <> <span className="mx-1 text-white/20">|</span> <span className="text-sunset font-bold">SHOW:</span> {data.schedule.show}</>
                        )}
                    </div>
                </div>

                {/* TÍTULO PEQUEÑO (Estado Expandido) */}
                {/* FIX SUPERPOSICIÓN:
                    - Entrada (Hover): delay-300 (Entra suave después de que el grande se fue).
                    - Salida (Normal): delay-0 (Se va inmediatamente).
                */}
                <div className="absolute bottom-6 left-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-0 group-hover:delay-300 z-20">
                     <h3 className="font-sans text-3xl font-bold text-white leading-none tracking-tight text-shadow-lg">
                        {data.name}
                    </h3>
                </div>
            </div>

            {/* --- SECCIÓN DERECHA: DATOS TÉCNICOS --- */}
            {/* FIX LINEA BLANCA:
                - z-index: 0 (Queda por debajo de la foto si hubiera superposición)
                - -ml-[1px]: Margen negativo para eliminar cualquier hueco de sub-pixel.
            */}
            <div className="relative w-0 group-hover:w-[60%] bg-[#f7f7f5] h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-center overflow-hidden -ml-[1px] z-0">
                
                {/* CONTENIDO INTERNO */}
                {/* FIX LAYOUT: min-w-[420px] asegura que el contenido no se rompa mientras se anima el ancho */}
                <div className="w-[420px] min-w-[420px] p-10 flex flex-col whitespace-nowrap h-full justify-center"> 
                    
                    <div className="mb-8 pb-4 border-b border-gunmetal/10 flex justify-between items-end pr-6">
                        <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-gunmetal/40">
                            Protocolos de Acceso
                        </h4>
                        <div className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 bg-vanguard-green rounded-full animate-pulse"></div>
                             <span className="font-mono text-[9px] text-vanguard-green font-bold">SYSTEM_READY</span>
                        </div>
                    </div>
                    
                    <div className="space-y-3 pr-6">
                        {[
                            { label: "Logística de Entrada", icon: "solar:route-bold-duotone", code: "LOG_01" },
                            { label: "Análisis de Afluencia", icon: "solar:graph-up-bold-duotone", code: "ANL_02" },
                            { label: "Zonificación Térmica", icon: "solar:map-point-bold-duotone", code: "ZON_03" },
                            { label: "Activos Disponibles", icon: "solar:box-minimalistic-bold-duotone", code: "AST_04" }
                        ].map((item, i) => (
                            <div 
                                key={item.code}
                                className="flex items-center justify-between p-4 rounded-xl border border-gunmetal/5 bg-white hover:border-sunset/30 hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all cursor-pointer group/item translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                                style={{ transitionDelay: `${250 + (i * 60)}ms`, transitionDuration: '500ms' }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-gunmetal/5 flex items-center justify-center group-hover/item:bg-sunset/10 transition-colors">
                                        <Icon 
                                            icon={item.icon} 
                                            className="text-gunmetal/50 group-hover/item:text-sunset transition-colors w-5 h-5" 
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-sans text-[14px] font-bold text-gunmetal group-hover/item:text-gunmetal">
                                            {item.label}
                                        </span>
                                        <span className="font-mono text-[9px] text-gunmetal/30 group-hover/item:text-sunset/60 transition-colors">
                                            CODE: {item.code}
                                        </span>
                                    </div>
                                </div>
                                <Icon icon="solar:arrow-right-linear" className="text-sunset opacity-0 -translate-x-4 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300" />
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-4 border-t border-gunmetal/5 pr-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-500">
                        <button className="w-full py-3 bg-gunmetal text-white rounded-lg font-bold text-xs hover:bg-gunmetal/90 transition-colors flex items-center justify-center gap-2 group/btn">
                            <span>ACCEDER AL DASHBOARD</span>
                            <Icon icon="solar:alt-arrow-right-linear" className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </div>

                </div>
            </div>

        </div>
    </div>
  );
}