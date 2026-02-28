import type { ParkItem } from './types';
import { POV_DATA } from './pov-data';

function withPov<T extends { id: string; pov?: { videoId: string; channelName: string; channelUrl: string } }>(items: T[]): T[] {
  return items.map(item => {
    const videoId = POV_DATA[item.id];
    if (!videoId || item.pov?.videoId) return item;
    return { ...item, pov: { videoId, channelName: '', channelUrl: '' } };
  });
}

export const EPIC_ATTRACTIONS: ParkItem[] = withPov([
  { id: 'epic-mario', name: 'Mario Kart: Bowser\'s Challenge', land: 'Super Nintendo World', tier: 'Tier 1', type: 'Attraction', image: '/images/universal_images/EpicUniverse_Entrance_Night.webp', vibes: ['family','indoor','interactive','immersive'], waitTime: '90 min', status: 'open', description: 'Carrera interactiva en el mundo de Mario Kart con AR.' },
  { id: 'epic-yoshi', name: 'Yoshi\'s Adventure', land: 'Super Nintendo World', tier: 'Tier 2', type: 'Attraction', image: '/images/universal_images/EpicUniverse_Entrance_Night.webp', vibes: ['family','outdoor'], waitTime: '30 min', status: 'open', description: 'Paseo familiar sobre Yoshi por el Reino Champiñón.' },
  { id: 'epic-ministry', name: 'Harry Potter and the Ministry of Magic', land: 'The Wizarding World — Ministry of Magic', tier: 'Tier 1', type: 'Attraction', image: '/images/universal_images/EpicUniverse_Entrance_Night.webp', vibes: ['thrill','indoor','dark','immersive'], waitTime: '80 min', status: 'open', description: 'Nueva atracción de Harry Potter en el Ministerio de Magia.' },
  { id: 'epic-monsters', name: 'Monsters Unchained: The Frankenstein Experiment', land: 'Classic Monsters Café', tier: 'Tier 1', type: 'Attraction', image: '/images/universal_images/EpicUniverse_Entrance_Night.webp', vibes: ['thrill','indoor','dark'], waitTime: '60 min', status: 'open', description: 'Escape del laboratorio del Dr. Frankenstein con los monstruos clásicos.' },
  { id: 'epic-starfall', name: 'Starfall Racers', land: 'Celestial Park', tier: 'Tier 1', type: 'Attraction', image: '/images/universal_images/EpicUniverse_Entrance_Night.webp', vibes: ['thrill','outdoor','coaster'], waitTime: '75 min', status: 'open', description: 'Duelo de montañas rusas entrelazadas sobre Celestial Park.' },
  { id: 'epic-constellation', name: 'Constellation Carousel', land: 'Celestial Park', tier: 'Tier 3', type: 'Attraction', image: '/images/universal_images/EpicUniverse_Entrance_Night.webp', vibes: ['family','outdoor'], waitTime: '10 min', status: 'open', description: 'Carrusel temático de constelaciones para toda la familia.' },
]);

export const EPIC_DINING: ParkItem[] = [
  { id: 'epic-d-mario', name: 'Toadstool Café', land: 'Super Nintendo World', tier: 'Quick Service', type: 'Dining', image: '/images/universal_images/EpicUniverse_Entrance_Night.webp', vibes: ['quick','indoor','themed'], status: 'open', description: 'Comida temática de Mario con hongos gigantes.' },
];

export const EPIC_SHOWS: ParkItem[] = [
  { id: 'epic-s-helios', name: 'Helios Grand Hotel Show', land: 'Celestial Park', tier: 'Live Show', type: 'Show', image: '/images/universal_images/EpicUniverse_Entrance_Night.webp', vibes: ['outdoor'], status: 'open', description: 'Espectáculo nocturno en el hotel central de Epic Universe.' },
];

export const EPIC_CHARACTERS: ParkItem[] = [
  { id: 'epic-c-mario', name: 'Mario & Luigi — Nintendo World', land: 'Super Nintendo World', tier: 'Meet & Greet', type: 'Character', image: '/images/universal_images/EpicUniverse_Entrance_Night.webp', vibes: ['family'], status: 'open', description: 'Encuentro con Mario y Luigi.' },
];
