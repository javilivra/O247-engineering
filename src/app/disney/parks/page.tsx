"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link"; // <--- IMPORTACIÓN CLAVE PARA LA NAVEGACIÓN
import ParkCard, { ParkData } from "@/components/parks/ParkCard";
import ParkDetailHero from "@/components/parks/ParkDetailHero";
import DistrictsGrid from "@/components/parks/DistrictsGrid";
import LogisticsPanel from "@/components/parks/LogisticsPanel";
import ActivityList from "@/components/parks/ActivityList";

// --- DATA: LOS PARQUES ---
const parksData: ParkData[] = [
  {
    id: "mk",
    name: "Magic Kingdom",
    slogan: "El epicentro de la fantasía.",
    image: "/images/mk.jpg", 
    temp: 28,
    stats: { attractions: 35, shows: 6 },
    schedule: { early: "08:30 AM", regular: "09:00 - 22:00", show: "21:00 (HEA)" },
    weatherType: "sun"
  },
  {
    id: "epcot",
    name: "Epcot",
    slogan: "Innovación humana y cultura.",
    image: "/images/epcot.jpg",
    temp: 24,
    stats: { attractions: 18, shows: 5 },
    schedule: { early: "08:30 AM", regular: "09:00 - 21:00", show: "21:00 (Luminous)" },
    weatherType: "rain"
  },
  {
    id: "hs",
    name: "Hollywood Studios",
    slogan: "Magia del cine y aventura.",
    image: "/images/hs.jpg",
    temp: 29,
    stats: { attractions: 14, shows: 7 },
    schedule: { early: "08:30 AM", regular: "09:00 - 21:00", show: "20:30 (Fantasmic!)" },
    weatherType: "cloud"
  },
  {
    id: "ak",
    name: "Animal Kingdom",
    slogan: "Naturaleza indómita.",
    image: "/images/ak.jpg",
    temp: 26,
    stats: { attractions: 12, shows: 3 },
    schedule: { early: "07:30 AM", regular: "08:00 - 18:00" },
    weatherType: "sun"
  }
];

const waterParksData: ParkData[] = [
    {
      id: "tl",
      name: "Typhoon Lagoon",
      slogan: "Paraíso tropical y olas gigantes.",
      image: "/images/tl.jpg",
      temp: 31,
      stats: { attractions: 11, shows: 0 },
      schedule: { early: "N/A", regular: "10:00 - 17:00" },
      weatherType: "sun"
    },
    {
      id: "bb",
      name: "Blizzard Beach",
      slogan: "Diversión helada bajo el sol.",
      image: "/images/bb.jpg",
      temp: -2,
      stats: { attractions: 12, shows: 0 },
      schedule: { early: "N/A", regular: "CERRADO" },
      weatherType: "snow"
    }
];

// --- COMPONENTE: NEWS TICKER ---
const NewsTicker = () => (
  <div className="w-full bg-gunmetal border-y border-white/5 overflow-hidden py-3 flex relative z-10">
    <div className="flex whitespace-nowrap animate-marquee">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-16 mr-16">
            <span className="flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase text-bone/60">
                <span className="text-vanguard-green font-bold px-1.5 py-0.5 bg-vanguard-green/10 rounded border border-vanguard-green/20">NEW</span>
                Nueva atracción Tiana's Bayou Adventure - Coming Soon
            </span>
            <span className="flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase text-bone/60">
                <span className="text-sunset font-bold px-1.5 py-0.5 bg-sunset/10 rounded border border-sunset/20">ALERT</span>
                Actualización de Test Track en Epcot: Status Processing...
            </span>
            <span className="flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase text-bone/60">
                <span className="text-white font-bold px-1.5 py-0.5 bg-white/10 rounded border border-white/20">INFO</span>
                Nuevos protocolos de Virtual Queue disponibles
            </span>
        </div>
      ))}
    </div>
  </div>
);

export default function ParksPage() {
  return (
    <main className="min-h-screen bg-bone pt-10 pb-20"> 
      
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">
        
{/* HEADER */}
        {/* Consejo: Si aún sientes mucho espacio, puedes cambiar 'gap-6' por 'gap-2' o quitarlo */}
        <div className="flex flex-col gap-4 mb-8">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-4xl md:text-5xl font-bold text-gunmetal"
            >
                Panel de Parques
            </motion.h1>
        </div>

        {/* ROW 1: PARQUES PRINCIPALES (CON LINK A MK) */}
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col lg:flex-row gap-4 w-full h-auto lg:h-[550px] mb-4"
        >
            {parksData.map((park) => (
                // 🔗 AQUÍ ESTÁ LA MAGIA:
                // Si el ID es 'mk', crea un enlace real. Si no, es un div pasivo.
                park.id === 'mk' ? (
                  <Link key={park.id} href="/disney/mk" className="flex-1 min-w-0 h-full">
                     <ParkCard data={park} />
                  </Link>
                ) : (
                  // Para los demás parques (aún sin página), solo mostramos la card
                  <div key={park.id} className="flex-1 min-w-0 h-full">
                     <ParkCard data={park} />
                  </div>
                )
            ))}
        </motion.div>

        {/* ROW 2: PARQUES DE AGUA */}
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col lg:flex-row gap-4 w-full h-auto lg:h-[550px] mb-12"
        >
            {waterParksData.map((park) => (
                 <ParkCard key={park.id} data={park} />
            ))}
        </motion.div>
      </div>

      <NewsTicker />

      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 mt-12">
        
        <div className="w-full h-px bg-gunmetal/5 my-20"></div>

        <div id="active-view">
            <ParkDetailHero />
            <DistrictsGrid />
            <LogisticsPanel />
            <ActivityList />
        </div>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="w-full mt-10 flex flex-col items-center"
        >
            <h3 className="text-[10px] font-bold text-gunmetal/30 tracking-[0.2em] uppercase mb-4 font-mono">
                Glosario Técnico O247
            </h3>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 px-8 py-3 rounded-full border border-gunmetal/5 bg-white shadow-sm">
                {[
                    { key: "EE", label: "Early Entrance (Acceso Anticipado)" },
                    { key: "REG", label: "Regular Hours (Horario Habitual)" },
                    { key: "NOW", label: "Sincronización en tiempo real" }
                ].map((term) => (
                    <span key={term.key} className="text-[10px] text-gunmetal/60 font-mono uppercase tracking-wide">
                        <span className="font-bold text-sunset">{term.key}:</span> {term.label}
                    </span>
                ))}
            </div>
        </motion.div>

      </div>
    </main>
  );
}