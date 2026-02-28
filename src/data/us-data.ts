import type { ParkItem } from './types';
import { POV_DATA } from './pov-data';

function withPov<T extends { id: string; pov?: { videoId: string; channelName: string; channelUrl: string } }>(items: T[]): T[] {
  return items.map(item => {
    const videoId = POV_DATA[item.id];
    if (!videoId || item.pov?.videoId) return item;
    return { ...item, pov: { videoId, channelName: '', channelUrl: '' } };
  });
}

export const US_ATTRACTIONS: ParkItem[] = withPov([
  { id: 'us-minion', name: 'Despicable Me Minion Mayhem', land: 'Production Central', tier: 'Tier 2', type: 'Attraction', image: '/images/universal_images/universal_studios.jpg', vibes: ['family','indoor','simulator'], waitTime: '45 min', status: 'open', description: 'Simulador familiar donde te convertís en un Minion.' },
  { id: 'us-hollywood', name: 'Hollywood Rip Ride Rockit', land: 'Production Central', tier: 'Tier 1', type: 'Attraction', image: '/images/universal_images/universal_studios.jpg', vibes: ['thrill','outdoor','coaster'], waitTime: '60 min', status: 'open', description: 'Montaña rusa vertical con banda sonora personalizable.' },
  { id: 'us-transformers', name: 'Transformers: The Ride-3D', land: 'Production Central', tier: 'Tier 1', type: 'Attraction', image: '/images/universal_images/universal_studios.jpg', vibes: ['thrill','indoor','simulator','dark'], waitTime: '55 min', status: 'open', description: 'Batalla épica junto a los Autobots en 3D.' },
  { id: 'us-simpsons', name: 'The Simpsons Ride', land: 'Springfield', tier: 'Tier 2', type: 'Attraction', image: '/images/universal_images/universal_studios.jpg', vibes: ['family','indoor','simulator'], waitTime: '35 min', status: 'open', description: 'Simulador en Springfield con toda la familia Simpson.' },
  { id: 'us-fast-furious', name: 'Fast & Furious — Supercharged', land: 'Production Central', tier: 'Tier 2', type: 'Attraction', image: '/images/universal_images/universal_studios.jpg', vibes: ['family','indoor','simulator'], waitTime: '40 min', status: 'open', description: 'Carrera a máxima velocidad con Dom y Letty.' },
  { id: 'us-mummy', name: 'Revenge of the Mummy', land: 'New York', tier: 'Tier 1', type: 'Attraction', image: '/images/universal_images/universal_studios.jpg', vibes: ['thrill','indoor','dark','coaster'], waitTime: '50 min', status: 'open', description: 'Montaña rusa psicológica en la oscuridad total.' },
  { id: 'us-bourne', name: 'The Bourne Stuntacular', land: 'New York', tier: 'Tier 2', type: 'Attraction', image: '/images/universal_images/universal_studios.jpg', vibes: ['show','indoor'], waitTime: '20 min', status: 'open', description: 'Show de acción en vivo con tecnología de proyección avanzada.' },
  { id: 'us-diagon', name: 'Harry Potter and the Escape from Gringotts', land: 'The Wizarding World — Diagon Alley', tier: 'Tier 1', type: 'Attraction', image: '/images/universal_images/universal_studios.jpg', vibes: ['thrill','indoor','dark','immersive'], waitTime: '75 min', status: 'open', description: 'Escape épico del banco Gringotts con dragones y Voldemort.' },
  { id: 'us-hogwarts-express', name: 'Hogwarts Express — Kings Cross', land: 'The Wizarding World — Diagon Alley', tier: 'Tier 1', type: 'Attraction', image: '/images/universal_images/universal_studios.jpg', vibes: ['family','indoor','immersive'], waitTime: '30 min', status: 'open', description: 'Viaje en tren de Kings Cross a Hogsmeade.' },
]);

export const US_DINING: ParkItem[] = [
  { id: 'us-d-leaky', name: 'The Leaky Cauldron', land: 'The Wizarding World — Diagon Alley', tier: 'Quick Service', type: 'Dining', image: '/images/universal_images/universal_studios.jpg', vibes: ['quick','indoor','themed'], status: 'open', description: 'Comida del mundo mágico en Diagon Alley.' },
  { id: 'us-d-krusty', name: "Krusty Burger", land: 'Springfield', tier: 'Quick Service', type: 'Dining', image: '/images/universal_images/universal_studios.jpg', vibes: ['quick','outdoor','themed'], status: 'open', description: 'La hamburguesería de Krusty el Payaso.' },
];

export const US_SHOWS: ParkItem[] = [
  { id: 'us-s-bourne', name: 'The Bourne Stuntacular', land: 'New York', tier: 'Live Show', type: 'Show', image: '/images/universal_images/universal_studios.jpg', vibes: ['indoor','action'], status: 'open', description: 'Show de acción y efectos especiales.' },
];

export const US_CHARACTERS: ParkItem[] = [
  { id: 'us-c-minions', name: 'Minions — Production Central', land: 'Production Central', tier: 'Meet & Greet', type: 'Character', image: '/images/universal_images/universal_studios.jpg', vibes: ['family'], status: 'open', description: 'Encuentro con los Minions.' },
];
