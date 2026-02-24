"use client";

import React from 'react';
import ParkPageLayout from '@/components/parks/ParkPageLayout';
import { AK_ATTRACTIONS, AK_DINING, AK_SHOWS, AK_CHARACTERS } from '@/data/ak-data';

export default function AnimalKingdomPage() {
  return (
    <ParkPageLayout
      config={{
        parkName: "Animal Kingdom",
        parkSubtitle: "La Naturaleza en estado puro",
        parkTagline: "DESPERTA TU SEXTO SENTIDO",

        heroSlides: ["/images/ak_hero.webp"], // TODO: reemplazar con imagen real de AK
        heroSlideDuration: 5000,

        introShort: (
          <p>La naturaleza marca el ritmo y lo extraordinario aparece entre senderos y sabanas abiertas. <strong className="text-gunmetal font-black">Animal Kingdom invita a explorar</strong>, a mirar con atención y a dejar que el entorno guíe la experiencia.</p>
        ),
        introExpanded: (
          <>
            <p><strong className="text-gunmetal">Pandora — The World of Avatar</strong> despliega montañas suspendidas y vegetación luminosa que transforma el paisaje al caer la tarde. En <strong className="text-gunmetal">Flight of Passage</strong> el vuelo sobre un banshee se siente corporal, con el viento acompañando cada giro. En <strong className="text-gunmetal">Na&apos;vi River Journey</strong>, la selva bioluminiscente conduce hasta la <strong className="text-gunmetal">Shaman of Songs</strong>, quien canta en honor a <strong className="text-gunmetal">Eywa</strong>, la fuerza que conecta toda vida en Pandora.</p>
            <p>El <strong className="text-gunmetal">Kilimanjaro Safaris</strong> atraviesa una amplia sabana habitada por animales reales — jirafas, elefantes, leones, hipopótamos. Cada recorrido varía según su movimiento, y las primeras horas del día suelen ofrecer mayor actividad y mejores condiciones para observarlos.</p>
            <div className="pl-4 border-l-2 border-sunset">
              <p className="italic text-gunmetal">&quot;Animal Kingdom funciona mejor temprano. Su extensión y su ritmo cambian por completo cuando el día avanza.&quot;</p>
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