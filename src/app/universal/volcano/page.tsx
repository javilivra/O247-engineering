"use client";
import { adaptParkItems } from '@/lib/parkItemAdapter';
import React from 'react';
import ParkPageLayout from '@/components/parks/ParkPageLayout';
import { VOLCANO_ATTRACTIONS, VOLCANO_DINING, VOLCANO_SHOWS, VOLCANO_CHARACTERS } from '@/data/volcano-data';

export default function VolcanoBayPage() {
  return (
    <ParkPageLayout
      config={{
        parkName: "Volcano Bay",
        parkSubtitle: "El parque acuático de Universal Orlando",
        parkTagline: "AGUA, SOL Y ADRENALINA",
        heroSlides: ["/images/universal_images/volcano_bay_2.webp"],
        heroSlideDuration: 5000,
        introShort: (
          <p>El parque acuático más tecnológico de Orlando: <strong className="text-gunmetal font-black">sin colas físicas gracias al sistema TapTu</strong>. Reservás tu turno con una pulsera y disfrutás la playa hasta que te llaman. <strong className="text-gunmetal font-black">El volcán Krakatau domina todo el parque</strong>.</p>
        ),
        introExpanded: (
          <>
            <p><strong className="text-gunmetal">TapTu Band</strong> es la revolución de Volcano Bay — recibís una pulsera al entrar, tapás en cada atracción y esperás en la playa hasta que te notifican que es tu turno.</p>
            <p><strong className="text-gunmetal">Krakatau Aqua Coaster</strong> sube y baja dentro del volcán con proyecciones. <strong className="text-gunmetal">Ko&apos;okiri Body Plunge</strong> es la caída más intensa: 18 metros verticales desde la cima.</p>
            <div className="pl-4 border-l-2 border-sunset">
              <p className="italic text-gunmetal">&quot;Volcano Bay no es un parque acuático tradicional. Es una experiencia de playa con toboganes de primer nivel.&quot;</p>
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
          attractions: { data: adaptParkItems(VOLCANO_ATTRACTIONS, 'volcano', 'universal-orlando') },
          dining: { data: VOLCANO_DINING },
          shows: { data: VOLCANO_SHOWS },
          characters: { data: VOLCANO_CHARACTERS },
        },
        alerts: VOLCANO_ATTRACTIONS,
      }}
    />
  );
}
