"use client";
import React from 'react';
import ParkPageLayout from '@/components/parks/ParkPageLayout';
import { US_ATTRACTIONS, US_DINING, US_SHOWS, US_CHARACTERS } from '@/data/us-data';

export default function UniversalStudiosPage() {
  return (
    <ParkPageLayout
      config={{
        parkName: "Universal Studios Florida",
        parkSubtitle: "Entrá a las películas más icónicas",
        parkTagline: "LUCES, CÁMARA, ACCIÓN",
        heroSlides: ["/images/universal_images/universal_studios.jpg"],
        heroSlideDuration: 5000,
        introShort: (
          <p>El parque donde las <strong className="text-gunmetal font-black">películas cobran vida</strong>: desde el mundo mágico de Harry Potter en Diagon Alley hasta Springfield con los Simpsons. <strong className="text-gunmetal font-black">Cada zona es un set cinematográfico habitable</strong>.</p>
        ),
        introExpanded: (
          <>
            <p><strong className="text-gunmetal">Diagon Alley</strong> es la zona temática más inmersiva de Universal — una calle mágica completa con tiendas, restaurantes y el Escape from Gringotts como atracción central.</p>
            <p><strong className="text-gunmetal">Hollywood Rip Ride Rockit</strong> sube verticalmente antes de cruzar el parque a 96 km/h. <strong className="text-gunmetal">Revenge of the Mummy</strong> sigue siendo uno de los dark rides más intensos de Orlando.</p>
            <div className="pl-4 border-l-2 border-sunset">
              <p className="italic text-gunmetal">&quot;Universal Studios es el parque que más evoluciona año a año. Lo que era verdad hace 3 años puede no serlo hoy.&quot;</p>
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
          attractions: { data: US_ATTRACTIONS },
          dining: { data: US_DINING },
          shows: { data: US_SHOWS },
          characters: { data: US_CHARACTERS },
        },
        alerts: US_ATTRACTIONS,
      }}
    />
  );
}
