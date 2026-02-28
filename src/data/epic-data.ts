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
  { id: 'epic-mario-kart', name: "Mario Kart: Bowser's Challenge", land: 'Super Nintendo World', tier: 'Tier 1', type: 'Attraction', image: '/images/universal_images/EpicUniverse_Entrance_Night.webp', vibes: ['family','indoor','interactive','immersive'], waitTime: '90 min', status: 'open', description: 'Carrera interactiva en el mundo de Mario Kart con realidad aumentada y cascos AR.' },
  { id: 'epic-ministry', name: 'Harry Potter and the Ministry of Magic', land: 'The Wizarding World — Ministry of Magic', tier: 'Tier 1', type: 'Attraction', image: '/images/universal_images/EpicUniverse_Entrance_Night.webp', vibes: ['thrill','indoor','dark','immersive'], waitTime: '80 min', status: 'open', description: 'Nueva atracción de Harry Potter ambientada en el París mágico de los años 90.' },
  { id: 'epic-monsters', name: 'Monsters Unchained: The Frankenstein Experiment', land: 'Monsters Unchained', tier: 'Tier 1', type: 'Attraction', image: '/images/universal_images/EpicUniverse_Entrance_Night.webp', vibes: ['thrill','indoor','dark'], waitTime: '60 min', status: 'open', description: 'Escape del laboratorio del Dr. Frankenstein con los monstruos clásicos de Universal.' },
  { id: 'epic-starfall', name: 'Starfall Racers', land: 'Celestial Park', tier: 'Tier 1', type: 'Attraction', image: '/images/universal_images/EpicUniverse_Entrance_Night.webp', vibes: ['thrill','outdoor','coaster'], waitTime: '75 min', status: 'open', description: 'Duelo de montañas rusas entrelazadas sobre el Celestial Park. 2 pistas paralelas.' },
  { id: 'epic-yoshi', name: "Yoshi's Adventure", land: 'Super Nintendo World', tier: 'Tier 2', type: 'Attraction', image: '/images/universal_images/EpicUniverse_Entrance_Night.webp', vibes: ['family','outdoor'], waitTime: '30 min', status: 'open', description: 'Paseo familiar sobre Yoshi en busca de huevos por el Reino Champiñón.' },
  { id: 'epic-hogwarts-express-epic', name: 'Hogwarts Express — Hogsmeade', land: 'The Wizarding World — Ministry of Magic', tier: 'Tier 1', type: 'Attraction', image: '/images/universal_images/EpicUniverse_Entrance_Night.webp', vibes: ['family','indoor','immersive'], waitTime: '25 min', status: 'open', description: 'Nuevo tramo del Expreso de Hogwarts en Epic Universe. Experiencia diferente al original.' },
  { id: 'epic-orbis', name: 'Constellation Carousel', land: 'Celestial Park', tier: 'Tier 3', type: 'Attraction', image: '/images/universal_images/EpicUniverse_Entrance_Night.webp', vibes: ['family','outdoor'], waitTime: '10 min', status: 'open', description: 'Carrusel temático de constelaciones para toda la familia en el parque central.' },
  { id: 'epic-space-racer', name: 'Space Racer', land: 'Celestial Park', tier: 'Tier 3', type: 'Attraction', image: '/images/universal_images/EpicUniverse_Entrance_Night.webp', vibes: ['family','outdoor'], waitTime: '15 min', status: 'open', description: 'Atracción familiar de autos espaciales en Celestial Park.' },
  { id: 'epic-werewolf', name: 'Curse of the Werewolf', land: 'Monsters Unchained', tier: 'Tier 2', type: 'Attraction', image: '/images/universal_images/EpicUniverse_Entrance_Night.webp', vibes: ['thrill','indoor','dark'], waitTime: '40 min', status: 'open', description: 'Atracción de hombre lobo en el corazón del mundo de los monstruos clásicos.' },
]);

export const EPIC_DINING: ParkItem[] = [
  { id: 'epic-d-toadstool', name: 'Toadstool Café', land: 'Super Nintendo World', tier: 'Table Service', type: 'Dining', image: '/images/universal_images/EpicUniverse_Entrance_Night.webp', vibes: ['table','indoor','themed'], status: 'open', description: 'Restaurante de mesa con temática de Mario. El Toadstool Mushroom Soup es el plato estrella.' },
  { id: 'epic-d-helios', name: 'Helios Grand Hotel Restaurant', land: 'Celestial Park', tier: 'Table Service', type: 'Dining', image: '/images/universal_images/EpicUniverse_Entrance_Night.webp', vibes: ['table','indoor'], status: 'open', description: 'Restaurante del hotel central de Epic Universe con vista al parque.' },
];

export const EPIC_SHOWS: ParkItem[] = [
  { id: 'epic-s-helios', name: 'Helios Grand Spectacular', land: 'Celestial Park', tier: 'Nighttime Show', type: 'Show', image: '/images/universal_images/EpicUniverse_Entrance_Night.webp', vibes: ['outdoor','nighttime'], status: 'open', description: 'Espectáculo nocturno de agua, fuego y proyecciones en Celestial Park.' },
];

export const EPIC_CHARACTERS: ParkItem[] = [
  { id: 'epic-c-mario', name: 'Mario & Luigi — Nintendo World', land: 'Super Nintendo World', tier: 'Meet & Greet', type: 'Character', image: '/images/universal_images/EpicUniverse_Entrance_Night.webp', vibes: ['family'], status: 'open', description: 'Encuentro con Mario y Luigi en Super Nintendo World.' },
  { id: 'epic-c-princess-peach', name: 'Princess Peach — Nintendo World', land: 'Super Nintendo World', tier: 'Meet & Greet', type: 'Character', image: '/images/universal_images/EpicUniverse_Entrance_Night.webp', vibes: ['family'], status: 'open', description: 'Encuentro con la Princesa Peach.' },
];
