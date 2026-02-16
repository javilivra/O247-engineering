"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link";
// Asegúrate de que este componente exista en esta ruta (es el mismo que usas para Disney)
import ParkCard, { ParkData } from "@/components/parks/ParkCard";
import ParkDetailHero_Universal from "@/components/parks/ParkDetailHero_Universal";
import DistrictsGrid_Universal from "@/components/parks/DistrictGrid_Universal";
import LogisticsPanel_Universal from "@/components/parks/LogisticPanel_Universal";
import ActivityList_Universal from "@/components/parks/ActivityList_Universal";

// ============================================================
// DATA: UNIVERSAL ORLANDO RESORT
// ============================================================

const universalData: ParkData[] = [
  {
    id: "epic",
    name: "Epic Universe",
    slogan: "El futuro es ahora. Cinco mundos inmersivos, desde Nintendo hasta Monstruos Clásicos.",
    image: "/images/universal_images/EpicUniverse_Entrance_Night.webp", // Asegúrate de tener esta imagen o usa un placeholder
    temp: 26,
    stats: { attractions: 12, shows: 4 },
    schedule: { early: "08:00 AM", regular: "09:00 - 22:00", show: "21:30 (Helios)" },
    weatherType: "sun",
  },
  {
    id: "ioa",
    name: "Islands of Adventure",
    slogan: "Aventura épica. El hogar de Hogwarts, Jurassic World y Marvel Super Hero Island.",
    image: "/images/universal_images/island_adventure.webp",
    temp: 28,
    stats: { attractions: 18, shows: 3 },
    schedule: { early: "08:00 AM", regular: "09:00 - 21:00", show: "Dusk (Hogwarts)" },
    weatherType: "cloudy",
  },
  {
    id: "usf",
    name: "Universal Studios",
    slogan: "Salta a la pantalla. Diagon Alley, Minions y la acción del cine clásico y moderno.",
    image: "/images/universal_images/Universal_Studios_Entrance.webp",
    temp: 29,
    stats: { attractions: 14, shows: 6 },
    schedule: { early: "08:00 AM", regular: "09:00 - 21:00", show: "21:00 (CineSational)" },
    weatherType: "sun",
  },
  {
    id: "volcano",
    name: "Volcano Bay",
    slogan: "Oasis tropical tecnológico. Filas virtuales TapuTapu y relajación total.",
    image: "/images/universal_images/volcano_bay_2.webp",
    temp: 30,
    stats: { attractions: 19, shows: 0 },
    schedule: { early: "09:00 AM", regular: "10:00 - 18:00", show: "-" },
    weatherType: "sun",
  },
];

export default function UniversalParksPage() {
  // Estado para la expansión de tarjetas (Efecto Acordeón)
  const [expandedId, setExpandedId] = useState<string | null>("epic"); // Epic abierto por defecto

  const handleCardClick = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-bone pt-0 pb-20 px-6 md:px-12 lg:px-24 font-sans text-gunmetal">
      
      <div className="w-full max-w-[1440px] mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col gap-4 mb-8 pt-4">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 4, y: 0 }}
                className="font-display text-4xl md:text-5xl font-bold text-gunmetal tracking-tight"
            >
                Universo de Acción
            </motion.h1>
            <p className="type-body text-gunmetal/60 max-w-2xl">
                Tres parques temáticos increíbles y un parque acuático. Desde la magia de Harry Potter hasta la adrenalina de Jurassic World.
            </p>
        </div>

        {/* PARKS GRID (ACORDEÓN) */}
        <motion.div 
          layout 
          className="flex flex-col lg:flex-row gap-4 h-[600px] lg:h-[500px]"
        >
          {universalData.map((park) => {
            const isExpanded = expandedId === park.id;
            
            return (
              <motion.div
                key={park.id}
                layout
                className={`min-w-0 h-full ${isExpanded ? "flex-[4]" : "flex-[1]"}`}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
              >
                <ParkCard
                  data={park}
                  isExpanded={isExpanded}
                  onClick={() => handleCardClick(park.id)}
                />
              </motion.div>
            );
          })}
        </motion.div>

                <div id="active-view">
                    <ParkDetailHero_Universal />
                    <DistrictsGrid_Universal />
                    <LogisticsPanel_Universal />
                    <ActivityList_Universal />
                </div>

        {/* GLOSARIO TÉCNICO (Adaptado a Universal) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full mt-6 flex flex-col items-center"
        >
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 px-8 py-3 rounded-full border border-gunmetal/5 bg-white shadow-sm">
            {[
              { key: "EPA", label: "Early Park Admission (Huéspedes)" },
              { key: "REG", label: "Horario Regular" },
              { key: "SHOW", label: "Espectáculo Nocturno" },
            ].map((term) => (
              <span
                key={term.key}
                className="text-[10px] text-gunmetal/60 font-mono uppercase tracking-wide"
              >
                <span className="font-bold text-sunset">{term.key}:</span>{" "}
                {term.label}
              </span>
            ))}
          </div>
        </motion.div>
        
        {/* Enlace a Tickets (Cross-selling) */}
        <div className="mt-12 text-center">
            <Link 
                href="/universal/tickets"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-celeste hover:text-gunmetal transition-colors border-b border-celeste/20 hover:border-gunmetal pb-1"
            >
                Ver Estrategia de Tickets Park-to-Park <Icon icon="solar:arrow-right-up-linear" />
            </Link>
        </div>

      </div>
    </main>
  );
}