import type { ParkItem } from './types';
import { POV_DATA } from './pov-data';

function withPov<T extends { id: string; pov?: { videoId: string; channelName: string; channelUrl: string } }>(items: T[]): T[] {
  return items.map(item => {
    const videoId = POV_DATA[item.id];
    if (!videoId || item.pov?.videoId) return item;
    return { ...item, pov: { videoId, channelName: '', channelUrl: '' } };
  });
}

export const IOA_ATTRACTIONS: ParkItem[] = withPov([
  { id: 'ioa-hagrid', name: "Hagrid's Magical Creatures Motorbike Adventure", land: 'The Wizarding World — Hogsmeade', tier: 'Tier 1', type: 'Attraction', image: '/images/attractions/ioa/ioa_hagrid.webp', heroImage: '/images/attractions/hero/hero_att_ioa-hagrid.webp', vibes: ['thrill','outdoor','immersive'], waitTime: '120 min', status: 'open', description: 'La atracción más ambiciosa de Universal. Motocicleta mágica por el Bosque Prohibido.' },
  { id: 'ioa-velocicoaster', name: 'Jurassic World VelociCoaster', land: 'Jurassic World', tier: 'Tier 1', type: 'Attraction', image: '/images/attractions/ioa/ioa_velocicoaster.webp', heroImage: '/images/attractions/hero/hero_att_ioa-velocicoaster.webp', vibes: ['thrill','outdoor','coaster'], waitTime: '90 min', status: 'open', description: 'La montaña rusa más rápida de Florida: 113 km/h con inversiones.' },
  { id: 'ioa-forbidden-journey', name: 'Harry Potter and the Forbidden Journey', land: 'The Wizarding World — Hogsmeade', tier: 'Tier 1', type: 'Attraction', image: '/images/attractions/ioa/ioa_forbidden-journey.webp', heroImage: '/images/attractions/hero/hero_att_ioa-forbidden-journey.webp', vibes: ['thrill','indoor','dark','immersive'], waitTime: '75 min', status: 'open', description: 'Vuelo junto a Harry Potter por Hogwarts y sus alrededores.' },
  { id: 'ioa-hulk', name: 'The Incredible Hulk Coaster', land: 'Marvel Super Hero Island', tier: 'Tier 1', type: 'Attraction', image: '/images/attractions/ioa/ioa_hulk.webp', heroImage: '/images/attractions/hero/hero_att_ioa-hulk.webp', vibes: ['thrill','outdoor','coaster'], waitTime: '60 min', status: 'open', description: 'Lanzamiento electromagnético a 67 km/h en 2 segundos.' },
  { id: 'ioa-spiderman', name: 'The Amazing Adventures of Spider-Man', land: 'Marvel Super Hero Island', tier: 'Tier 1', type: 'Attraction', image: '/images/attractions/ioa/ioa_spiderman.webp', heroImage: '/images/attractions/hero/hero_att_ioa-spiderman.webp', vibes: ['family','indoor','simulator','dark'], waitTime: '45 min', status: 'open', description: 'Clásico de Universal. 3D + efectos físicos junto a Spider-Man.' },
  { id: 'ioa-jurassic-river', name: 'Jurassic Park River Adventure', land: 'Jurassic World', tier: 'Tier 2', type: 'Attraction', image: '/images/attractions/ioa/ioa_jurassic-river.webp', heroImage: '/images/attractions/hero/hero_att_ioa-jurassic-river.webp', vibes: ['family','outdoor','water'], waitTime: '40 min', status: 'open', description: 'Recorrido en bote con caída de 25 metros y dinosaurios.' },
  { id: 'ioa-pteranodon', name: 'Pteranodon Flyers', land: 'Jurassic World', tier: 'Tier 3', type: 'Attraction', image: '/images/attractions/ioa/ioa_pteranodon.webp', heroImage: '/images/attractions/hero/hero_att_ioa-pteranodon.webp', vibes: ['family','outdoor'], waitTime: '30 min', status: 'open', description: 'Vuelo tranquilo sobre Jurassic World — solo con niños.' },
  { id: 'ioa-dragon-challenge', name: 'Flight of the Hippogriff', land: 'The Wizarding World — Hogsmeade', tier: 'Tier 2', type: 'Attraction', image: '/images/attractions/ioa/ioa_dragon-challenge.webp', heroImage: '/images/attractions/hero/hero_att_ioa-dragon-challenge.webp', vibes: ['family','outdoor','coaster'], waitTime: '35 min', status: 'open', description: 'Montaña rusa familiar con vuelta sobre Hagrid y el Hipogrifo.' },
  { id: 'ioa-popeye', name: "Popeye & Bluto's Bilge-Rat Barges", land: "Toon Lagoon", tier: 'Tier 2', type: 'Attraction', image: '/images/attractions/ioa/ioa_popeye.webp', heroImage: '/images/attractions/hero/hero_att_ioa-popeye.webp', vibes: ['family','outdoor','water'], waitTime: '25 min', status: 'open', description: 'Rafting circular — casi seguro te mojás.' },
  { id: 'ioa-cat-in-hat', name: 'The Cat in the Hat', land: "Seuss Landing", tier: 'Tier 3', type: 'Attraction', image: '/images/attractions/ioa/ioa_cat-in-hat.webp', heroImage: '/images/attractions/hero/hero_att_ioa-cat-in-hat.webp', vibes: ['family','indoor'], waitTime: '15 min', status: 'open', description: 'Paseo familiar por el mundo de Dr. Seuss.' },
]);

export const IOA_DINING: ParkItem[] = [
  { id: 'ioa-d-three-broomsticks', name: 'Three Broomsticks', land: 'The Wizarding World — Hogsmeade', tier: 'Quick Service', type: 'Dining', image: '/images/universal_images/island_adventure.webp', vibes: ['quick','indoor','themed'], status: 'open', description: 'Comida del mundo mágico en Hogsmeade.' },
  { id: 'ioa-d-jurassic', name: 'Thunder Falls Terrace', land: 'Jurassic World', tier: 'Quick Service', type: 'Dining', image: '/images/universal_images/island_adventure.webp', vibes: ['quick','indoor'], status: 'open', description: 'Pollo y costillas frente a la cascada de Jurassic River.' },
];

export const IOA_SHOWS: ParkItem[] = [];
export const IOA_CHARACTERS: ParkItem[] = [
  { id: 'ioa-c-spiderman', name: 'Spider-Man — Marvel Island', land: 'Marvel Super Hero Island', tier: 'Meet & Greet', type: 'Character', image: '/images/universal_images/island_adventure.webp', vibes: ['family'], status: 'open', description: 'Encuentro con Spider-Man.' },
];
