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

        heroSlides: ["/images/ak_hero.webp"], // TODO: reemplazar con imagen real de AK
        heroSlideDuration: 5000,

        introShort: (
          <p>La <strong className="text-gunmetal font-black"> Fantasía</strong> se fusiona con la belleza del <strong className="text-gunmetal font-black"> Mundo Natural</strong>. Senderos que abren paso entre la selva exuberante, safaris y el místico mundo con Pandora, cada rincón te convierte en explorador, conecta tus sentidos y te sorprende.</p>
        ),
        introExpanded: (
          <>
            <p><strong className="text-gunmetal">Pandora — The World of Avatar</strong> con montanas suspendidas, vegetación que brilla al caer la noche y una atmósfera que te seduce a cada paso. En <strong className="text-gunmetal">Flight of Passage</strong> te elevás sobre un banshee y planeás entre montañas flotantes, con el viento rozando el rostro y la respiración del animal marcando el ritmo del vuelo. En <strong className="text-gunmetal">Na&apos;vi River Journey</strong> el recorrido se vuelve íntimo y casi ceremonial. A lo largo del río, la selva bioluminiscente conduce hasta la <strong className="text-gunmetal">Shaman of Songs</strong>, quien entona su canto en honor a <strong className="text-gunmetal">Eywa</strong>, la fuerza que conecta toda vida en Pandora.</p>
            <p>El <strong className="text-gunmetal">Kilimanjaro Safaris</strong> atraviesa una extensa sabana habitada por animales reales — jirafas, elefantes, leones, hipopótamos. Cada recorrido cambia según su movimiento. Temprano por la mañana, cuando el aire aún es fresco, la actividad suele ser mayor y la experiencia más dinámica..</p>
            <div className="pl-4 border-l-2 border-sunset">
              <p className="italic text-gunmetal">&quot;Animal Kingdom cierra más temprano que los demás parques. <strong className="text-gunmetal">No es un parque de medio día — pero tampoco necesitas hasta las 10 PM</strong>. La clave es llegar al Rope Drop.&quot;</p>
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