"use client";

import React from 'react';
import ParkPageLayout from '@/components/parks/ParkPageLayout';
import { EPCOT_ATTRACTIONS, EPCOT_DINING, EPCOT_SHOWS, EPCOT_CHARACTERS } from '@/data/epcot-data';

export default function EpcotPage() {
  return (
    <ParkPageLayout
      config={{
        parkName: "Epcot",
        parkSubtitle: "Innovación Humana y Cultura",
        parkTagline: "DONDE EL FUTURO SE ENCUENTRA CON EL MUNDO",

        heroSlides: ["/images/epcot_hero.webp","/images/epcot_hero2.webp"],
        heroSlideDuration: 5000,

        introShort: (
          <p>Es el parque más <strong className="text-gunmetal font-black">ambicioso conceptualmente</strong> de Disney World. Identificado con su iconica esféra plateada <strong className="text-gunmetal font-black">"Spaceship Earth"</strong>, invita a recorrer dos universos en un mismo día:<strong className="text-gunmetal font-black"> la innovación y diversidad del mundo</strong>.</p>
        ),
        introExpanded: (
          <>
            <p>Dividido en cuatro regiones — <strong className="text-gunmetal">World Celebration</strong>, <strong className="text-gunmetal">World Discovery</strong>, <strong className="text-gunmetal">World Nature</strong> y <strong className="text-gunmetal">World Showcase</strong> — el parque funciona como dos experiencias en una. La parte frontal alberga atracciones de tecnologia como Guardians of the Galaxy: Cosmic Rewind y Test Track. La parte posterior es un recorrido por 11 pabellones de paises con arquitectura real, gastronomia auténtica y artistas locales.</p>
            <p>Epcot requiere una estrategia diferente a Magic Kingdom. El ritmo es más pausado, la caminata es significativamente mayor (el World Showcase tiene 2 km de circunferencia), y la experiencia gastronomica es central — especialmente durante los festivales estacionales que transforman el parque por completo.</p>
            <div className="pl-4 border-l-2 border-sunset">
              <p className="italic text-gunmetal">&quot;Epcot no compite con Magic Kingdom. <strong className="text-gunmetal">Compite con tu capacidad de absorber experiencias</strong> en un solo dia.&quot;</p>
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