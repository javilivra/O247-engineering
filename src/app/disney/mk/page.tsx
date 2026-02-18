"use client";

import React from 'react';
import type { Attraction } from '@/data/types';
import { MK_ATTRACTIONS } from '@/data/mk-attractions-data';
import { MK_DINING } from '@/data/mk-dining-data';
import { MK_SHOWS } from '@/data/mk-shows-data';
import { MK_CHARACTERS } from '@/data/mk-characters-data';
import ParkPageLayout from '@/components/parks/ParkPageLayout';
import type { FilterSection, FilterChip } from '@/components/parks/FilterModal';

// ============================================================
// HERO SLIDES
// ============================================================
const HERO_SLIDES = [
  "/images/mk_att_heroslide_1.jpg.webp",
  "/images/mk_att_heroslide_2.jpg",
  "/images/mk_att_heroslide_3.webp",
  "/images/mk_att_heroslide_4.jpg",
  "/images/mk_att_heroslide_5.jpg",
  "/images/mk_att_heroslide_6.jpg",
  "/images/mk_att_heroslide_7.jpg",
  "/images/mk_att_heroslide_8.jpg",
  "/images/mk_att_heroslide_9.jpg",
];

// ============================================================
// FILTER TAXONOMY — Attractions (maps to real Attraction fields)
// ============================================================
const asA = (item: any) => item as Attraction;

const ATTRACTION_FILTER_SECTIONS: FilterSection[] = [
  {
    id: 'access', title: 'Acceso', icon: 'solar:ticket-bold-duotone',
    chips: [
      { id: 'standby', label: 'Standby', match: (i) => asA(i).access === 'Standby' },
      { id: 'll-multi', label: 'Multi Pass', match: (i) => asA(i).access === 'LL Multi Pass' },
      { id: 'll-single', label: 'Single Pass', match: (i) => asA(i).access === 'LL Single Pass' },
      { id: 'vq', label: 'Virtual Queue', match: (i) => asA(i).access === 'Virtual Queue' },
    ],
  },
  {
    id: 'thrill', title: 'Intensidad', icon: 'solar:bolt-bold-duotone',
    chips: [
      { id: 'motion-sick', label: 'Mareo posible', match: (i) => asA(i).warnings.motionSickness },
      { id: 'no-motion', label: 'Sin mareo', match: (i) => !asA(i).warnings.motionSickness },
      { id: 'drops', label: 'Caídas', match: (i) => asA(i).warnings.drops },
      { id: 'darkness', label: 'Oscuridad', match: (i) => asA(i).warnings.darkness },
      { id: 'spinning', label: 'Giros', match: (i) => asA(i).warnings.spinning },
      { id: 'loud', label: 'Ruido fuerte', match: (i) => asA(i).warnings.loudNoises },
      { id: 'flash', label: 'Luces', match: (i) => asA(i).warnings.flashingLights },
    ],
  },
  {
    id: 'height', title: 'Altura mínima', icon: 'solar:ruler-bold-duotone',
    chips: [
      { id: 'h-any', label: 'Sin restricción', match: (i) => asA(i).heightReq === 0 },
      { id: 'h-89', label: '89cm+', match: (i) => asA(i).heightReq > 0 && asA(i).heightReq <= 89 },
      { id: 'h-97', label: '97cm+', match: (i) => asA(i).heightReq > 0 && asA(i).heightReq <= 97 },
      { id: 'h-102', label: '102cm+', match: (i) => asA(i).heightReq > 0 && asA(i).heightReq <= 102 },
      { id: 'h-112', label: '112cm+', match: (i) => asA(i).heightReq > 0 && asA(i).heightReq <= 112 },
      { id: 'h-122', label: '122cm+', match: (i) => asA(i).heightReq >= 122 },
    ],
  },
  {
    id: 'climate', title: 'Clima y confort', icon: 'solar:snowflake-bold-duotone',
    chips: [
      { id: 'ac-indoor', label: 'A/C Indoor', match: (i) => asA(i).hasAc && asA(i).isIndoor },
      { id: 'outdoor', label: 'Aire libre', match: (i) => !asA(i).isIndoor },
      { id: 'water', label: 'Te mojás', match: (i) => asA(i).warnings.water },
    ],
  },
  {
    id: 'physical', title: 'Consideraciones físicas', icon: 'solar:heart-pulse-bold-duotone',
    chips: [
      { id: 'pregnancy', label: 'No embarazadas', match: (i) => asA(i).warnings.pregnancyRestriction },
      { id: 'back-neck', label: 'Riesgo espalda/cuello', match: (i) => asA(i).warnings.backNeckIssues },
    ],
  },
  {
    id: 'accessibility', title: 'Accesibilidad', icon: 'solar:wheelchair-bold-duotone',
    chips: [
      { id: 'wheelchair', label: 'Silla de ruedas OK', match: (i) => asA(i).accessibility.wheelchair && !asA(i).accessibility.mustTransfer },
      { id: 'must-transfer', label: 'Requiere transferencia', match: (i) => asA(i).accessibility.mustTransfer },
      { id: 'service-animals', label: 'Animales de servicio', match: (i) => asA(i).accessibility.serviceAnimals },
      { id: 'audio-desc', label: 'Audio descripción', match: (i) => asA(i).accessibility.audioDescription },
      { id: 'captions', label: 'Subtítulos', match: (i) => asA(i).accessibility.closedCaptions || asA(i).accessibility.handheldCaptioning },
    ],
  },
];

// ============================================================
// SIMPLE FILTERS — Dining / Shows / Characters
// ============================================================
const DINING_FILTERS: FilterChip[] = [
  { id: 'quick', label: 'Rápido', match: (i) => i.vibes.includes('quick') },
  { id: 'table', label: 'Mesa', match: (i) => i.vibes.includes('table') },
  { id: 'snack', label: 'Snack', match: (i) => i.vibes.includes('snack') },
  { id: 'coffee', label: 'Café', match: (i) => i.vibes.includes('coffee') },
  { id: 'indoor-d', label: 'Indoor', match: (i) => i.vibes.includes('indoor') || i.vibes.includes('ac') },
  { id: 'chill-d', label: 'Chill', match: (i) => i.vibes.includes('chill') },
];

const SHOWS_FILTERS: FilterChip[] = [
  { id: 'fireworks', label: 'Fireworks', match: (i) => i.vibes.includes('fireworks') },
  { id: 'parade', label: 'Desfiles', match: (i) => i.vibes.includes('parade') },
  { id: 'stage', label: 'Escenario', match: (i) => i.vibes.includes('stage') },
  { id: 'kids-s', label: 'Kids', match: (i) => i.vibes.includes('kids') },
];

const CHARACTERS_FILTERS: FilterChip[] = [
  { id: 'princess', label: 'Princesas', match: (i) => i.vibes.includes('princess') || i.tier === 'Princess' },
  { id: 'mickey-c', label: 'Clásicos', match: (i) => i.vibes.includes('mickey') || i.tier === 'Icon' },
  { id: 'pixar-c', label: 'Pixar', match: (i) => i.vibes.includes('pixar') || i.tier === 'Pixar' },
  { id: 'indoor-c', label: 'Indoor', match: (i) => i.vibes.includes('indoor') || i.vibes.includes('ac') },
];

// ============================================================
// PAGE
// ============================================================

export default function MagicKingdomPage() {
  return (
    <ParkPageLayout
      config={{
        parkName: "Magic Kingdom",
        parkSubtitle: "El Corazon de la Magia",
        parkTagline: "DONDE LA FANTASIA REINA",

        heroSlides: HERO_SLIDES,
        heroSlideDuration: 5000,

        mapPdfUrl: "/images/maps/mk_0216_sp_mapa.pdf",

        introShort: (
          <p>Magic Kingdom no es solo un parque tematico; es una <strong className="text-gunmetal font-black">referencia global</strong> en <strong className="text-gunmetal font-black">diseno de fantasia aplicada</strong>.</p>
        ),
        introExpanded: (
          <>
            <p>Para quien llega por primera vez, el impacto es inmediato: el <strong className="text-gunmetal">Castillo de Cenicienta</strong> ordena la mirada y establece el tono del recorrido. Pero detras de esa primera impresion hay algo mas complejo. El parque esta construido como una <strong className="text-gunmetal">ciudad escenica en capas</strong>: mientras el visitante camina por calles perfectamente coreografiadas, la operacion real sucede en un nivel inferior invisible, los <strong className="text-gunmetal">Utilidors</strong>, pensados para que la logistica nunca interfiera con la narrativa.</p>
            <p>Esa logica atraviesa todo el parque. Conviven la <strong className="text-gunmetal">nostalgia fundacional</strong> de 1971 con atracciones disenadas bajo <strong className="text-gunmetal">estandares tecnologicos</strong> actuales, sin que una anule a la otra. No se trata unicamente de subir a juegos, sino de moverse entre lenguajes distintos: del ritmo pausado de Main Street al pulso futurista de Tomorrowland.</p>
            <div className="pl-4 border-l-2 border-sunset">
              <p className="italic text-gunmetal">&quot;Magic Kingdom funciona porque <strong className="text-gunmetal">nada esta librado al azar</strong>. La ilusion no es espontanea: esta disenada, mantenida y repetida todos los dias.&quot;</p>
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
          attractions: {
            data: MK_ATTRACTIONS,
            filterSections: ATTRACTION_FILTER_SECTIONS,
          },
          dining: {
            data: MK_DINING,
            inlineFilters: DINING_FILTERS,
          },
          shows: {
            data: MK_SHOWS,
            inlineFilters: SHOWS_FILTERS,
          },
          characters: {
            data: MK_CHARACTERS,
            inlineFilters: CHARACTERS_FILTERS,
          },
        },

        alerts: MK_ATTRACTIONS,
      }}
    />
  );
}