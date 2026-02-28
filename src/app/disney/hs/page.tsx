"use client";
import { adaptParkItems } from '@/lib/parkItemAdapter';

import React from 'react';
import ParkPageLayout from '@/components/parks/ParkPageLayout';
import { HS_ATTRACTIONS, HS_DINING, HS_SHOWS, HS_CHARACTERS } from '@/data/hs-data';

export default function HollywoodStudiosPage() {
  return (
    <ParkPageLayout
      config={{
        parkName: "Hollywood Studios",
        parkSubtitle: "El protagonista de la película sos vos",
        parkTagline: "LUCES, CÁMARA, AVENTURA",

        heroSlides: ["/images/hs.jpg"],
        heroSlideDuration: 5000,

        introShort: (
          <p>Es el parque donde de las historias <strong className="text-gunmetal font-black">dejan la pantalla y viven a tu alrededor</strong>: Desde mundos épicos como Star Wars y Toy Story, hasta clásicos llenos de adrenalina. <strong className="text-gunmetal font-black"> Cada atracción te convierte en parte de la acción</strong>.</p>
        ),
        introExpanded: (
          <>
            <p><strong className="text-gunmetal">Star Wars: Galaxy&apos;s Edge</strong> no es una seccion tematica — es un mundo que respira. Batuu existe con su propia economia, idioma y reglas sociales. Rise of the Resistance es considerada la atraccion mas ambiciosa jamas construida por Disney.</p>
            <p><strong className="text-gunmetal">Toy Story Land</strong> te encoge al tamano de un juguete en el patio trasero de Andy. <strong className="text-gunmetal">Tower of Terror</strong> sigue siendo una de las experiencias más intensas y <strong className="text-gunmetal">Fantasmic!</strong> cierra las noches con un espectaculo de agua, fuego y proyecciones que es dificil de superar.</p>
            <div className="pl-4 border-l-2 border-sunset">
              <p className="italic text-gunmetal">&quot;Hollywood Studios es el parque donde <strong className="text-gunmetal">menos caminas y más intensamente vives</strong>. Es compacto, pero cada metro te teletransporta a la pantalla grande.&quot;</p>
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
          attractions: { data: adaptParkItems(HS_ATTRACTIONS, 'hs', 'disney-world') },
          dining: { data: HS_DINING },
          shows: { data: HS_SHOWS },
          characters: { data: HS_CHARACTERS },
        },

        alerts: HS_ATTRACTIONS,
      }}
    />
  );
}