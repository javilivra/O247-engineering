'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@/components/Icon';
import Link from 'next/link';
import ParkCard, { ParkData } from '@/components/parks/ParkCard';
import ParkDetailHero from "@/components/parks/ParkDetailHero";
import DistrictsGrid from "@/components/parks/DistrictsGrid";
import LogisticsPanel from "@/components/parks/LogisticsPanel";
import ActivityList from "@/components/parks/ActivityList";

// Importar el componente reutilizable
import ContextualIntro from '@/components/parks/ContextualIntro';

// ============================================================
// DATA
// ============================================================

const PARK_ROUTES: Record<string, string> = {
  mk: '/disney/mk',
  epcot: '/disney/epcot',
  hs: '/disney/hs',
  ak: '/disney/ak',
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
    image: "/images/ak.jpg", 
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
    image: "/images/blizzard_beach.webp",
    temp: -2,
    stats: { attractions: 12, shows: 0 },
    schedule: { early: "N/A", regular: "CERRADO" },
    weatherType: "snow",
  },
];

// ============================================================
// PAGE
// ============================================================

export default function ParksPage() {
  const [expandedPark, setExpandedPark] = useState<string | null>("mk");
  const [expandedWater, setExpandedWater] = useState<string | null>(null);

  const handleParkClick = (id: string) => {
    setExpandedPark((prev) => (prev === id ? null : id));
  };

  const handleWaterClick = (id: string) => {
    setExpandedWater((prev) => (prev === id ? null : id));
  };

  // Text for the main Parks Panel intro
  const panelIntroShort = (
    <p>Disney World tiene <strong>4 parques temáticos</strong> principales y <strong>2 parques acuáticos</strong>. Cada uno ofrece una experiencia completamente distinta, con su propio ritmo, horarios y tipo de atracciones.</p>
  );

  const panelIntroExpanded = (
    <>
        <p>Elegir qué parques visitar y en qué orden es una de las decisiones más importantes del viaje. No todos los parques necesitan la misma cantidad de tiempo: Magic Kingdom suele necesitar un día completo, mientras que Animal Kingdom se puede cubrir en medio día.</p>
        <div className="pl-4 border-l-2 border-sunset">
            <p className="italic text-gunmetal">Los horarios de apertura anticipada (Early Entry) cambian según tu hotel, y los shows nocturnos definen a qué hora conviene terminar el día. Acá podés explorar cada parque en detalle antes de tomar esa decisión.</p>
        </div>
    </>
  );

  // Text for the Disney Springs section intro
  const springsIntroShort = (
    <p>Un distrito al aire libre donde el paseo es parte del viaje — desde el bellísimo<strong className="text-gunmetal"> Coca-Cola Store</strong>, degustando lo sabores del mundo, hasta volar a 120mts de altura con <strong className="text-gunmetal">Aerophile Balloon Flight</strong>.</p>
  );

  const springsIntroExpanded = (
    <>
        <p>Disney Springs no es un parque. Es un espacio pensado para recorrer sin reloj, donde la experiencia no depende de una atracción sino del entorno.</p>
        <p>Aquí conviven <strong className="text-gunmetal">restaurantes de autor, marcas globales y tiendas exclusivas de Disney</strong> en un circuito que se siente más cercano a un barrio creativo que a un complejo temático. La música en vivo aparece sin anunciarse, las terrazas miran al agua y cada sector tiene su propio ritmo.</p>
        <p>No hay filas que organizar ni reservas que definan el día. <strong className="text-gunmetal">Hay elección</strong>.
Elegís cenar frente al lago. Elegís entrar en una tienda que solo existe acá. Elegís quedarte un rato más cuando el atardecer cambia el tono del lugar.
Disney Springs no busca impactar con volumen. Funciona por atmósfera.
Por detalles. Por esa sensación de estar en un lugar que <strong className="text-gunmetal">combina entretenimiento, diseño y movimiento constante</strong> sin límites.</p>
        <div className="pl-4 border-l-2 border-sunset">
            <p className="italic text-gunmetal">Disney Springs no se recorre para marcar pendientes.
            Se explora cuando querés que el viaje respire.</p>
        </div>
    </>
  );

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
             <ContextualIntro short={panelIntroShort} expanded={panelIntroExpanded} />
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
          className="flex flex-col lg:flex-row gap-4 w-full lg:h-[520px] mb-8"
        >
          {parksData.map((park) => {
            const isExpanded = expandedPark === park.id;
            const route = PARK_ROUTES[park.id];

            return (
              <motion.div
                key={park.id}
                layout
                className={`relative min-w-0 h-auto lg:h-full ${isExpanded ? "lg:flex-[4]" : "lg:flex-[1]"}`}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
              >
                <ParkCard
                  data={park}
                  isExpanded={isExpanded}
                  onClick={() => handleParkClick(park.id)}
                  route={route}
                />
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
          className="flex flex-col lg:flex-row gap-4 w-full lg:h-[420px] mb-12"
        >
          {waterParksData.map((park) => {
            const isExpanded = expandedWater === park.id;
            return (
              <motion.div
                key={park.id}
                layout
                className={`relative min-w-0 h-auto lg:h-full ${isExpanded ? "lg:flex-[4]" : "lg:flex-[1]"}`}
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

        <div id="active-view">
        <ParkDetailHero />
        <div className="py-12">
        <ContextualIntro short={springsIntroShort} expanded={springsIntroExpanded} />
        </div>
            <DistrictsGrid />
            <LogisticsPanel />
            <ActivityList />
        </div>

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
