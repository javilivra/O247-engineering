"use client";

import React from 'react';
import ParkPageLayout from '@/components/parks/ParkPageLayout';
import { EPCOT_ATTRACTIONS, EPCOT_DINING, EPCOT_SHOWS, EPCOT_CHARACTERS } from '@/data/epcot-data';

export default function EpcotPage() {
  return (
    <ParkPageLayout
      config={{
        parkName: "Epcot",
        parkSubtitle: "Unión de cultura e innovación",
        parkTagline: "EL FUTURO QUE SOÑO WALT DISNEY",

        heroSlides: ["/images/epcot_hero.webp","/images/epcot_hero2.webp"],
        heroSlideDuration: 5000,

        introShort: (
          <p>Es el parque donde la <strong className="text-gunmetal font-black">curiosidad toma forma</strong>. Bajo la icónica <strong className="text-gunmetal font-black">Spaceship Earth</strong>, invita a recorrer en un mismo día <strong className="text-gunmetal font-black">ideas, culturas y mundos distintos</strong>.</p>
        ),
        introExpanded: (
          <>
            <p>Organizado en cuatro regiones — <strong className="text-gunmetal">World Celebration</strong>, <strong className="text-gunmetal">World Discovery</strong>, <strong className="text-gunmetal">World Nature</strong> y <strong className="text-gunmetal">World Showcase</strong> — EPCOT propone dos energías complementarias. En la parte frontal predominan experiencias dinámicas como <strong className="text-gunmetal">Guardians of the Galaxy: Cosmic Rewind</strong> y <strong className="text-gunmetal">Test Track</strong>. Hacia el lago, once pabellones representan países con arquitectura detallada, gastronomía propia y artistas culturales.</p>
            <p>Es el parque que más se disfruta sin prisa. El recorrido completo del World Showcase supera los 2 km, y la experiencia gastronómica adquiere un rol central, especialmente durante los festivales estacionales que transforman el ambiente y amplían la oferta culinaria.</p>
            <div className="pl-4 border-l-2 border-sunset">
              <p className="italic text-gunmetal">&quot;EPCOT no se mide por cantidad de atracciones. Se mide por cuánto estás dispuesto a explorar en un solo día.&quot;</p>
            </div>
          </>
        ),

        categoryTabs: [
          { id: 'attractions', label: 'Atracciones', icon: 'solar:star-fall-bold-duotone' },
          { id: 'dining', label: 'Dining', icon: 'ph:fork-knife-bold' },
          { id: 'shows', label: 'Shows', icon: 'mdi:magic' },
          { id: 'characters', label: 'Personajes', icon: 'tabler:mickey' },
        ],
        defaultCategory: 'attractions',

        categories: {
          attractions: { data: EPCOT_ATTRACTIONS },
          dining: { data: EPCOT_DINING },
          shows: { data: EPCOT_SHOWS },
          characters: { data: EPCOT_CHARACTERS },
        },

        alerts: EPCOT_ATTRACTIONS,
      }}
    />
  );
}