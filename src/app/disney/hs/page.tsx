"use client";

import React from 'react';
import ParkPageLayout from '@/components/parks/ParkPageLayout';
import { HS_ATTRACTIONS, HS_DINING, HS_SHOWS, HS_CHARACTERS } from '@/data/hs-data';

export default function HollywoodStudiosPage() {
  return (
    <ParkPageLayout
      config={{
        parkName: "Hollywood Studios",
        parkSubtitle: "Donde el Cine Cobra Vida",
        parkTagline: "LUCES, CÁMARA, AVENTURA",

        heroSlides: ["/images/hs.jpg"],
        heroSlideDuration: 5000,

        introShort: (
          <p>Hollywood Studios es el parque de las <strong className="text-gunmetal font-black">franquicias inmersivas</strong>: Star Wars, Toy Story y Rock &apos;n&apos; Roller Coaster conviven en un espacio disenado para hacerte <strong className="text-gunmetal font-black">sentir dentro de la pelicula</strong>.</p>
        ),
        introExpanded: (
          <>
            <p><strong className="text-gunmetal">Star Wars: Galaxy&apos;s Edge</strong> no es una seccion tematica — es un planeta. Batuu existe con su propia economia, idioma y reglas sociales. Rise of the Resistance es considerada la atraccion mas ambiciosa jamas construida por Disney, combinando multiples sistemas de vehiculos en una narrativa continua de 18 minutos.</p>
            <p><strong className="text-gunmetal">Toy Story Land</strong> te encoge al tamano de un juguete en el patio trasero de Andy. <strong className="text-gunmetal">Tower of Terror</strong> sigue siendo una de las experiencias mas intensas de todo Disney World. Y <strong className="text-gunmetal">Fantasmic!</strong> cierra las noches con un espectaculo de agua, fuego y proyecciones que es dificil de superar.</p>
            <div className="pl-4 border-l-2 border-sunset">
              <p className="italic text-gunmetal">&quot;Hollywood Studios es el parque donde <strong className="text-gunmetal">menos caminas y mas intensamente vives</strong>. Es compacto, pero cada metro cuadrado esta cargado de narrativa.&quot;</p>
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
          attractions: { data: HS_ATTRACTIONS },
          dining: { data: HS_DINING },
          shows: { data: HS_SHOWS },
          characters: { data: HS_CHARACTERS },
        },

        alerts: HS_ATTRACTIONS,
      }}
    />
  );
}