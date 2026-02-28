"use client";
import React from 'react';
import ParkPageLayout from '@/components/parks/ParkPageLayout';
import { IOA_ATTRACTIONS, IOA_DINING, IOA_SHOWS, IOA_CHARACTERS } from '@/data/ioa-data';

export default function IslandsOfAdventurePage() {
  return (
    <ParkPageLayout
      config={{
        parkName: "Islands of Adventure",
        parkSubtitle: "Donde cada isla es un mundo diferente",
        parkTagline: "AVENTURA SIN LÍMITES",
        heroSlides: ["/images/universal_images/island_adventure.webp"],
        heroSlideDuration: 5000,
        introShort: (
          <p>El parque de las <strong className="text-gunmetal font-black">atracciones más intensas de Orlando</strong>: Hagrid, VelociCoaster y Hogwarts conviven con Marvel, Jurassic World y Dr. Seuss. <strong className="text-gunmetal font-black">Sin segundas opciones — todo es Tier 1</strong>.</p>
        ),
        introExpanded: (
          <>
            <p><strong className="text-gunmetal">Hagrid&apos;s Magical Creatures Motorbike Adventure</strong> es considerada por muchos la mejor atracción del mundo — 17 minutos de narrativa continua en motocicleta por el Bosque Prohibido.</p>
            <p><strong className="text-gunmetal">VelociCoaster</strong> es la montaña rusa más rápida de Florida con 113 km/h. <strong className="text-gunmetal">The Wizarding World — Hogsmeade</strong> es la zona más fotogeniada de Universal.</p>
            <div className="pl-4 border-l-2 border-sunset">
              <p className="italic text-gunmetal">&quot;Islands of Adventure tiene la densidad de atracciones Tier 1 más alta de cualquier parque en Orlando. Cada hora cuenta.&quot;</p>
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
          attractions: { data: IOA_ATTRACTIONS },
          dining: { data: IOA_DINING },
          shows: { data: IOA_SHOWS },
          characters: { data: IOA_CHARACTERS },
        },
        alerts: IOA_ATTRACTIONS,
      }}
    />
  );
}
