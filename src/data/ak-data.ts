import { POV_DATA } from './pov-data';
import type { ParkItem } from './types';

// Auto-inyecta videoId desde POV_DATA si no está definido en el item
function withPov<T extends { id: string; pov?: { videoId: string; channelName: string; channelUrl: string } }>(items: T[]): T[] {
  return items.map(item => {
    const videoId = POV_DATA[item.id];
    if (!videoId) return item;
    if (item.pov?.videoId) return item; // ya tiene pov definido, no pisar
    return { ...item, pov: { videoId, channelName: '', channelUrl: '' } };
  });
}


// ============================================================
// ANIMAL KINGDOM — STUB DATA
// ============================================================

export const AK_ATTRACTIONS: ParkItem[] = withPov([
  {
    id: 'ak-flight', name: 'Avatar Flight of Passage',
    land: 'Pandora — The World of Avatar', tier: 'Tier 1', type: 'Attraction',
    image: '/images/cinderellacastlehero.jpg', vibes: ['thrill', 'indoor', 'simulator', 'immersive'],
    waitTime: '100 min', status: 'open',
    description: 'Simulador de vuelo sobre un banshee. La atracción más inmersiva de Disney World.',
  },
  {
    id: 'ak-navi', name: "Na'vi River Journey",
    land: 'Pandora — The World of Avatar', tier: 'Tier 2', type: 'Attraction',
    image: '/images/cinderellacastlehero.jpg', vibes: ['family', 'indoor', 'gentle', 'water'],
    waitTime: '55 min', status: 'open',
    description: 'Recorrido en bote por un bosque bioluminiscente.',
  },
  {
    id: 'ak-everest', name: 'Expedition Everest',
    land: 'Asia', tier: 'Tier 1', type: 'Attraction',
    image: '/images/cinderellacastlehero.jpg', vibes: ['thrill', 'outdoor', 'coaster'],
    waitTime: '45 min', status: 'open',
    description: 'Montaña rusa a través del Himalaya con tramo en reversa.',
  },
  {
    id: 'ak-safari', name: 'Kilimanjaro Safaris',
    land: 'Africa', tier: 'Tier 1', type: 'Attraction',
    image: '/images/cinderellacastlehero.jpg', vibes: ['family', 'outdoor', 'animals'],
    waitTime: '40 min', status: 'open',
    description: 'Safari de 22 minutos por 45 hectáreas con animales reales.',
  },
  {
    id: 'ak-kali', name: 'Kali River Rapids',
    land: 'Asia', tier: 'Tier 2', type: 'Attraction',
    image: '/images/cinderellacastlehero.jpg', vibes: ['thrill', 'outdoor', 'water'],
    waitTime: '35 min', status: 'open',
    description: 'Rápidos de río. Preparate para mojarte mucho.',
  },
  {
    id: 'ak-dinosaur', name: 'DINOSAUR',
    land: 'DinoLand U.S.A.', tier: 'Tier 2', type: 'Attraction',
    image: '/images/cinderellacastlehero.jpg', vibes: ['thrill', 'indoor', 'dark'],
    waitTime: '30 min', status: 'open',
    description: 'Viaje en el tiempo para rescatar un dinosaurio. Oscuro e intenso.',
  },
  {
    id: 'ak-tree', name: "It's Tough to Be a Bug!",
    land: 'Discovery Island', tier: 'Tier 3', type: 'Attraction',
    image: '/images/cinderellacastlehero.jpg', vibes: ['family', 'indoor', 'show'],
    waitTime: '15 min', status: 'open',
    description: 'Show 3D/4D dentro del Árbol de la Vida.',
  },
  {
    id: 'ak-gorilla', name: 'Gorilla Falls Exploration Trail',
    land: 'Africa', tier: 'Tier 3', type: 'Attraction',
    image: '/images/cinderellacastlehero.jpg', vibes: ['family', 'outdoor', 'animals', 'walk'],
    status: 'open', description: 'Sendero autoguiado con gorilas e hipopótamos.',
  },
  {
    id: 'ak-triceratop', name: 'TriceraTop Spin',
    land: 'DinoLand U.S.A.', tier: 'Tier 3', type: 'Attraction',
    image: '/images/cinderellacastlehero.jpg', vibes: ['family', 'outdoor', 'spinning'],
    waitTime: '15 min', status: 'open',
    description: 'Atracción giratoria estilo Dumbo con dinosaurios.',
  },
]);

export const AK_DINING: ParkItem[] = [
  {
    id: 'ak-d-satuli', name: "Satu'li Canteen",
    land: 'Pandora — The World of Avatar', tier: 'Quick Service', type: 'Dining',
    image: '/images/cinderellacastlehero.jpg', vibes: ['quick', 'indoor', 'healthy'],
    status: 'open', description: 'El mejor quick service de Disney World.',
  },
  {
    id: 'ak-d-tusker', name: 'Tusker House',
    land: 'Africa', tier: 'Table Service', type: 'Dining',
    image: '/images/cinderellacastlehero.jpg', vibes: ['table', 'character', 'indoor', 'buffet'],
    status: 'open', description: 'Buffet africano con Donald y amigos en safari.',
  },
  {
    id: 'ak-d-flame', name: 'Flame Tree Barbecue',
    land: 'Discovery Island', tier: 'Quick Service', type: 'Dining',
    image: '/images/cinderellacastlehero.jpg', vibes: ['quick', 'outdoor', 'bbq'],
    status: 'open', description: 'Costillas y pulled pork con vistas al lago.',
  },
];

export const AK_SHOWS: ParkItem[] = [
  {
    id: 'ak-s-nemo', name: 'Finding Nemo: The Big Blue... and Beyond!',
    land: 'DinoLand U.S.A.', tier: 'Stage Show', type: 'Show',
    image: '/images/cinderellacastlehero.jpg', vibes: ['stage', 'indoor', 'kids', 'musical'],
    status: 'open', description: 'Musical en vivo con marionetas basado en Nemo.',
  },
  {
    id: 'ak-s-lion', name: 'Festival of the Lion King',
    land: 'Africa', tier: 'Stage Show', type: 'Show',
    image: '/images/cinderellacastlehero.jpg', vibes: ['stage', 'indoor', 'musical'],
    status: 'open', description: 'Show teatral con acróbatas y música del Rey León. Imperdible.',
  },
];

export const AK_CHARACTERS: ParkItem[] = [
  {
    id: 'ak-c-mickey', name: "Mickey & Minnie — Adventurers Outpost",
    land: 'Discovery Island', tier: 'Icon', type: 'Character',
    image: '/images/cinderellacastlehero.jpg', vibes: ['mickey', 'indoor'],
    waitTime: '30 min', status: 'open', description: 'Mickey y Minnie de exploradores.',
  },
  {
    id: 'ak-c-donald', name: 'Donald — DinoLand',
    land: 'DinoLand U.S.A.', tier: 'Icon', type: 'Character',
    image: '/images/cinderellacastlehero.jpg', vibes: ['classic', 'outdoor'],
    waitTime: '15 min', status: 'open', description: 'Donald con traje de dinosaurio.',
  },
];