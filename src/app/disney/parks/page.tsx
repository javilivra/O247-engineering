"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link";
import ParkCard, { ParkData } from "@/components/parks/ParkCard";

// ============================================================
// DATA
// ============================================================

const PARK_ROUTES: Record<string, string> = {
  mk: "/disney/mk",
  epcot: "/disney/epcot",
  hs: "/disney/hs",
  ak: "/disney/ak",
};

const parksData: ParkData[] = [
  {
    id: "mk",
    name: "Magic Kingdom",
    slogan: "El epicentro de la fantasía. El parque más emblemático de Disney, con atracciones clásicas y shows nocturnos icónicos.",
    image: "/images/mk.jpg",
    temp: 28,
    stats: { attractions: 35, shows: 6 },
    schedule: { early: "08:30 AM", regular: "09:00 - 22:00", show: "21:00 (HEA)" },
    weatherType: "sun",
  },
  {
    id: "epcot",
    name: "Epcot",
    slogan: "Innovación humana y cultura. Tecnología, gastronomía mundial y experiencias únicas en un solo lugar.",
    image: "/images/epcot.jpg",
    temp: 24,
    stats: { attractions: 18, shows: 5 },
    schedule: { early: "08:30 AM", regular: "09:00 - 21:00", show: "21:00 (Luminous)" },
    weatherType: "rain",
  },
  {
    id: "hs",
    name: "Hollywood Studios",
    slogan: "Magia del cine y aventura. Desde Star Wars hasta Toy Story, las franquicias cobran vida.",
    image: "/images/hs.jpg",
    temp: 29,
    stats: { attractions: 14, shows: 7 },
    schedule: { early: "08:30 AM", regular: "09:00 - 21:00", show: "20:30 (Fantasmic!)" },
    weatherType: "cloud",
  },
  {
    id: "ak",
    name: "Animal Kingdom",
    slogan: "Naturaleza indómita. Safaris, Pandora y un enfoque único en la vida salvaje.",
    image: "/images/cinderellacastlehero.jpg", // TODO: reemplazar con imagen real de AK
    temp: 26,
    stats: { attractions: 12, shows: 3 },
    schedule: { early: "07:30 AM", regular: "08:00 - 18:00" },
    weatherType: "sun",
  },
];

const waterParksData: ParkData[] = [
  {
    id: "tl",
    name: "Typhoon Lagoon",
    slogan: "Paraíso tropical con olas gigantes y toboganes para toda la familia.",
    image: "/images/typhoon_lagoon.webp",
    temp: 31,
    stats: { attractions: 11, shows: 0 },
    schedule: { early: "N/A", regular: "10:00 - 17:00" },
    weatherType: "sun",
  },
  {
    id: "bb",
    name: "Blizzard Beach",
    slogan: "Diversión helada bajo el sol de Florida. Temática de estación de ski.",
    image: "/images/cinderellacastlehero.jpg", // TODO: reemplazar
    temp: -2,
    stats: { attractions: 12, shows: 0 },
    schedule: { early: "N/A", regular: "CERRADO" },
    weatherType: "snow",
  },
];

const INTRO_TEXT = {
  short: "Disney World tiene 4 parques temáticos principales y 2 parques acuáticos. Cada uno ofrece una experiencia completamente distinta, con su propio ritmo, horarios y tipo de atracciones.",
  full: "Elegir qué parques visitar y en qué orden es una de las decisiones más importantes del viaje. No todos los parques necesitan la misma cantidad de tiempo: Magic Kingdom suele necesitar un día completo, mientras que Animal Kingdom se puede cubrir en medio día. Los horarios de apertura anticipada (Early Entry) cambian según tu hotel, y los shows nocturnos definen a qué hora conviene terminar el día. Acá podés explorar cada parque en detalle antes de tomar esa decisión.",
};

// ============================================================
// PAGE
// ============================================================

export default function ParksPage() {
  const [expandedPark, setExpandedPark] = useState<string | null>("mk");
  const [expandedWater, setExpandedWater] = useState<string | null>(null);
  const [showFullIntro, setShowFullIntro] = useState(false);

  const handleParkClick = (id: string) => {
    setExpandedPark((prev) => (prev === id ? null : id));
  };

  const handleWaterClick = (id: string) => {
    setExpandedWater((prev) => (prev === id ? null : id));
  };

  return (
    <main className="min-h-screen bg-bone pt-10 pb-20">
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* ============ HEADER ============ */}
        <div className="mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-sans text-4xl md:text-5xl font-bold text-gunmetal mb-6"
            style={{ overflowWrap: "break-word" }}
          >
            Panel de Parques
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <p
              className="type-body text-base text-gunmetal/60 max-w-3xl leading-relaxed"
              style={{ overflowWrap: "break-word" }}
            >
              {INTRO_TEXT.short}
            </p>

            <AnimatePresence>
              {showFullIntro && (
                <motion.p
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  className="type-body text-base text-gunmetal/50 max-w-3xl leading-relaxed overflow-hidden"
                  style={{ overflowWrap: "break-word" }}
                >
                  {INTRO_TEXT.full}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              onClick={() => setShowFullIntro(!showFullIntro)}
              className="mt-3 flex items-center gap-1.5 text-xs text-sunset hover:text-sunset/80 font-bold uppercase tracking-widest transition-colors"
            >
              <Icon
                icon="solar:alt-arrow-down-linear"
                width={14}
                className={`transition-transform duration-300 ${showFullIntro ? "rotate-180" : ""}`}
              />
              {showFullIntro ? "Menos detalles" : "Más detalles"}
            </button>
          </motion.div>
        </div>

        {/* ============ SECTION LABEL ============ */}
        <div className="flex items-center gap-3 mb-4">
          <span className="type-tech text-[10px] text-gunmetal/40 uppercase tracking-widest font-bold">
            Parques Temáticos
          </span>
          <div className="flex-1 h-px bg-gunmetal/5" />
        </div>

        {/* ============ MAIN PARKS ROW ============ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col lg:flex-row gap-3 w-full h-auto lg:h-[520px] mb-8"
        >
          {parksData.map((park) => {
            const isExpanded = expandedPark === park.id;
            const route = PARK_ROUTES[park.id];

            return (
              <motion.div
                key={park.id}
                layout
                className={`relative min-w-0 h-full ${isExpanded ? "flex-[4]" : "flex-[1]"}`}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
              >
                <ParkCard
                  data={park}
                  isExpanded={isExpanded}
                  onClick={() => handleParkClick(park.id)}
                />
                {/* Explorar parque button — visible when expanded */}
                {isExpanded && route && (
                  <Link
                    href={route}
                    className="absolute bottom-8 right-20 z-30 px-6 py-3 bg-sunset text-white rounded-full font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-lg hover:shadow-sunset/30 active:scale-[0.97] flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Explorar parque
                    <Icon icon="solar:arrow-right-linear" width={14} />
                  </Link>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* ============ WATER PARKS LABEL ============ */}
        <div className="flex items-center gap-3 mb-4 mt-12">
          <span className="type-tech text-[10px] text-gunmetal/40 uppercase tracking-widest font-bold">
            Parques Acuáticos
          </span>
          <div className="flex-1 h-px bg-gunmetal/5" />
        </div>

        {/* ============ WATER PARKS ROW ============ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col lg:flex-row gap-3 w-full h-auto lg:h-[420px] mb-12"
        >
          {waterParksData.map((park) => {
            const isExpanded = expandedWater === park.id;
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
                  onClick={() => handleWaterClick(park.id)}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* ============ GLOSSARY ============ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full mt-4 flex flex-col items-center"
        >
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 px-8 py-3 rounded-full border border-gunmetal/5 bg-white shadow-sm">
            {[
              { key: "EARLY", label: "Acceso Anticipado (huéspedes Disney)" },
              { key: "REG", label: "Horario Regular" },
              { key: "SHOW", label: "Espectáculo nocturno principal" },
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
      </div>
    </main>
  );
}