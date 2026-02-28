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
  { id: 'us-gringotts', name: 'Harry Potter and the Escape from Gringotts', land: 'The Wizarding World — Diagon Alley', tier: 'Tier 1', type: 'Attraction', image: '/images/universal_images/universal_studios.jpg', vibes: ['thrill','indoor','dark','immersive'], waitTime: '75 min', status: 'open', description: 'Escape épico del banco Gringotts con dragones, Voldemort y efectos 4D.' },
  { id: 'us-hollywood', name: 'Hollywood Rip Ride Rockit', land: 'Production Central', tier: 'Tier 1', type: 'Attraction', image: '/images/universal_images/universal_studios.jpg', vibes: ['thrill','outdoor','coaster'], waitTime: '60 min', status: 'open', description: 'Montaña rusa vertical con banda sonora personalizable. Sube 51 metros.' },
  { id: 'us-mummy', name: 'Revenge of the Mummy', land: 'New York', tier: 'Tier 1', type: 'Attraction', image: '/images/universal_images/universal_studios.jpg', vibes: ['thrill','indoor','dark','coaster'], waitTime: '50 min', status: 'open', description: 'Montaña rusa psicológica en oscuridad total con efectos de fuego.' },
  { id: 'us-transformers', name: 'Transformers: The Ride-3D', land: 'Production Central', tier: 'Tier 1', type: 'Attraction', image: '/images/universal_images/universal_studios.jpg', vibes: ['thrill','indoor','simulator','dark'], waitTime: '55 min', status: 'open', description: 'Batalla épica junto a los Autobots en simulador 3D con efectos físicos.' },
  { id: 'us-hogwarts-express-us', name: 'Hogwarts Express — Kings Cross', land: 'The Wizarding World — Diagon Alley', tier: 'Tier 1', type: 'Attraction', image: '/images/universal_images/universal_studios.jpg', vibes: ['family','indoor','immersive'], waitTime: '30 min', status: 'open', description: 'Viaje en tren de Kings Cross a Hogsmeade. Requiere ticket Park-to-Park.' },
  { id: 'us-minion', name: 'Despicable Me Minion Mayhem', land: 'Production Central', tier: 'Tier 2', type: 'Attraction', image: '/images/universal_images/universal_studios.jpg', vibes: ['family','indoor','simulator'], waitTime: '45 min', status: 'open', description: 'Simulador familiar donde te convertís en un Minion con Gru y sus hijas.' },
  { id: 'us-simpsons', name: 'The Simpsons Ride', land: 'Springfield', tier: 'Tier 2', type: 'Attraction', image: '/images/universal_images/universal_studios.jpg', vibes: ['family','indoor','simulator'], waitTime: '35 min', status: 'open', description: 'Simulador en Springfield con toda la familia Simpson y Krusty el Payaso.' },
  { id: 'us-fast-furious', name: 'Fast & Furious — Supercharged', land: 'Production Central', tier: 'Tier 2', type: 'Attraction', image: '/images/universal_images/universal_studios.jpg', vibes: ['family','indoor','simulator'], waitTime: '40 min', status: 'open', description: 'Carrera a máxima velocidad con Dom y Letty en persecución de villanos.' },
  { id: 'us-bourne', name: 'The Bourne Stuntacular', land: 'New York', tier: 'Tier 2', type: 'Attraction', image: '/images/universal_images/universal_studios.jpg', vibes: ['show','indoor'], waitTime: '20 min', status: 'open', description: 'Show de acción en vivo con tecnología de pantalla LED masiva y actores reales.' },
  { id: 'us-men-black', name: 'Men in Black Alien Attack', land: 'World Expo', tier: 'Tier 2', type: 'Attraction', image: '/images/universal_images/universal_studios.jpg', vibes: ['family','indoor','interactive'], waitTime: '35 min', status: 'open', description: 'Shooter interactivo — eliminá alienígenas y acumulá puntos.' },
  { id: 'us-race-through-ny', name: 'Race Through New York Starring Jimmy Fallon', land: 'New York', tier: 'Tier 2', type: 'Attraction', image: '/images/universal_images/universal_studios.jpg', vibes: ['family','indoor','simulator'], waitTime: '25 min', status: 'open', description: 'Carrera por Nueva York con Jimmy Fallon en simulador 4D.' },
  { id: 'us-horror-makeup', name: 'Universal Orlando\'s Horror Make-Up Show', land: 'Production Central', tier: 'Tier 3', type: 'Attraction', image: '/images/universal_images/universal_studios.jpg', vibes: ['family','indoor','show'], waitTime: '10 min', status: 'open', description: 'Show de efectos especiales de maquillaje de terror con comedia en vivo.' },
  { id: 'us-animal-actors', name: 'Animal Actors on Location!', land: 'Woody Woodpecker\'s KidZone', tier: 'Tier 3', type: 'Attraction', image: '/images/universal_images/universal_studios.jpg', vibes: ['family','indoor','show'], waitTime: '10 min', status: 'open', description: 'Show con animales entrenados de Hollywood y sus entrenadores.' },
  { id: 'us-fievel', name: "Fievel's Playland", land: "Woody Woodpecker's KidZone", tier: 'Tier 3', type: 'Attraction', image: '/images/universal_images/universal_studios.jpg', vibes: ['family','outdoor','kids'], waitTime: '5 min', status: 'open', description: 'Área de juegos temática de Fievel el ratón. Ideal para niños menores de 8.' },
  { id: 'us-woody-roller', name: "Woody Woodpecker's Nuthouse Coaster", land: "Woody Woodpecker's KidZone", tier: 'Tier 3', type: 'Attraction', image: '/images/universal_images/universal_studios.jpg', vibes: ['family','outdoor','coaster'], waitTime: '15 min', status: 'open', description: 'Montaña rusa junior sin restricción de altura. Primera coaster de los más chicos.' },
]);

export const US_DINING: ParkItem[] = [
  { id: 'us-d-leaky', name: 'The Leaky Cauldron', land: 'The Wizarding World — Diagon Alley', tier: 'Quick Service', type: 'Dining', image: '/images/universal_images/universal_studios.jpg', vibes: ['quick','indoor','themed'], status: 'open', description: 'Comida del mundo mágico en Diagon Alley. Probá la Pumpkin Juice.' },
  { id: 'us-d-krusty', name: "Krusty Burger", land: 'Springfield', tier: 'Quick Service', type: 'Dining', image: '/images/universal_images/universal_studios.jpg', vibes: ['quick','outdoor','themed'], status: 'open', description: 'La hamburguesería de Krusty el Payaso directamente de Springfield.' },
  { id: 'us-d-bumblebee', name: "Bumblebee Man's Taco Truck", land: 'Springfield', tier: 'Quick Service', type: 'Dining', image: '/images/universal_images/universal_studios.jpg', vibes: ['quick','outdoor','themed'], status: 'open', description: 'Tacos mexicanos del personaje secundario de Los Simpsons.' },
  { id: 'us-d-three-broomsticks-us', name: "Hopping Pot", land: 'The Wizarding World — Diagon Alley', tier: 'Quick Service', type: 'Dining', image: '/images/universal_images/universal_studios.jpg', vibes: ['quick','outdoor','themed'], status: 'open', description: 'Cervezas de mantequilla y bebidas del mundo mágico al aire libre.' },
];

export const US_SHOWS: ParkItem[] = [
  { id: 'us-s-bourne', name: 'The Bourne Stuntacular', land: 'New York', tier: 'Live Show', type: 'Show', image: '/images/universal_images/universal_studios.jpg', vibes: ['indoor','action'], status: 'open', description: 'Show de acción y efectos especiales basado en Jason Bourne.' },
  { id: 'us-s-animal', name: 'Animal Actors on Location!', land: "Woody Woodpecker's KidZone", tier: 'Live Show', type: 'Show', image: '/images/universal_images/universal_studios.jpg', vibes: ['indoor','family'], status: 'open', description: 'Show con animales entrenados de Hollywood.' },
];

export const US_CHARACTERS: ParkItem[] = [
  { id: 'us-c-minions', name: 'Minions — Production Central', land: 'Production Central', tier: 'Meet & Greet', type: 'Character', image: '/images/universal_images/universal_studios.jpg', vibes: ['family'], status: 'open', description: 'Encuentro con Kevin, Stuart y Bob.' },
  { id: 'us-c-spiderman-us', name: 'Spider-Man — New York', land: 'New York', tier: 'Meet & Greet', type: 'Character', image: '/images/universal_images/universal_studios.jpg', vibes: ['family'], status: 'open', description: 'Encuentro con Spider-Man en Nueva York.' },
];
