"use client";

import React from 'react';
import ParkPageLayout from '@/components/parks/ParkPageLayout';
import { AK_ATTRACTIONS, AK_DINING, AK_SHOWS, AK_CHARACTERS } from '@/data/ak-data';

export default function AnimalKingdomPage() {
  return (
    <ParkPageLayout
      config={{
        parkName: "Animal Kingdom",
        parkSubtitle: "Naturaleza Indómita",
        parkTagline: "DONDE LO SALVAJE TIENE VOZ",

        heroSlides: ["/images/cinderellacastlehero.jpg"], // TODO: reemplazar con imagen real de AK
        heroSlideDuration: 5000,

        introShort: (
          <p>Animal Kingdom es el parque mas <strong className="text-gunmetal font-black">grande en extension</strong> de Disney World y el unico donde <strong className="text-gunmetal font-black">la naturaleza real compite con la fantasia</strong>: safaris con animales vivos conviven con Pandora, el mundo de Avatar.</p>
        ),
        introExpanded: (
          <>
            <p><strong className="text-gunmetal">Pandora — The World of Avatar</strong> es la zona tematica mas inmersiva de todo Disney World. Flight of Passage simula volar sobre un banshee usando un sistema de vehiculos unico que sincroniza movimiento, viento, aromas y proyeccion 3D. Na&apos;vi River Journey es un recorrido en bote con el animatronico mas avanzado jamas construido.</p>
            <p>El <strong className="text-gunmetal">Kilimanjaro Safaris</strong> es un recorrido de 22 minutos por una sabana de 45 hectareas con animales reales — jirafas, elefantes, leones, hipopotamos. Cada recorrido es diferente porque los animales se mueven libremente. La mejor hora es temprano en la manana cuando los animales estan activos.</p>
            <div className="pl-4 border-l-2 border-sunset">
              <p className="italic text-gunmetal">&quot;Animal Kingdom cierra mas temprano que los demas parques. <strong className="text-gunmetal">No es un parque de medio dia — pero tampoco necesitas hasta las 10 PM</strong>. La clave es llegar al rope drop.&quot;</p>
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
          attractions: { data: AK_ATTRACTIONS },
          dining: { data: AK_DINING },
          shows: { data: AK_SHOWS },
          characters: { data: AK_CHARACTERS },
        },

        alerts: AK_ATTRACTIONS,
      }}
    />
  );
}