"use client";
import React from 'react';
import ParkPageLayout from '@/components/parks/ParkPageLayout';
import { EPIC_ATTRACTIONS, EPIC_DINING, EPIC_SHOWS, EPIC_CHARACTERS } from '@/data/epic-data';

export default function EpicUniversePage() {
  return (
    <ParkPageLayout
      config={{
        parkName: "Epic Universe",
        parkSubtitle: "El parque temático más grande de Universal",
        parkTagline: "CINCO MUNDOS. UN UNIVERSO.",
        heroSlides: ["/images/universal_images/EpicUniverse_Entrance_Night.webp"],
        heroSlideDuration: 5000,
        introShort: (
          <p>Abierto en <strong className="text-gunmetal font-black">2025</strong>, Epic Universe es el parque más ambicioso de Universal: cinco mundos completamente inmersivos que incluyen <strong className="text-gunmetal font-black">Super Nintendo World, Harry Potter y Monstruos Clásicos</strong>.</p>
        ),
        introExpanded: (
          <>
            <p><strong className="text-gunmetal">Super Nintendo World</strong> es el primer parque de Nintendo en Estados Unidos — Mario Kart usa AR para convertirte en jugador dentro del juego.</p>
            <p><strong className="text-gunmetal">The Wizarding World — Ministry of Magic</strong> lleva Harry Potter a París de los años 90. <strong className="text-gunmetal">Classic Monsters</strong> es la zona más original con la atracción más oscura del resort.</p>
            <div className="pl-4 border-l-2 border-sunset">
              <p className="italic text-gunmetal">&quot;Epic Universe redefine lo que puede ser un parque temático. No es una actualización — es un nuevo estándar.&quot;</p>
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
          attractions: { data: EPIC_ATTRACTIONS },
          dining: { data: EPIC_DINING },
          shows: { data: EPIC_SHOWS },
          characters: { data: EPIC_CHARACTERS },
        },
        alerts: EPIC_ATTRACTIONS,
      }}
    />
  );
}
