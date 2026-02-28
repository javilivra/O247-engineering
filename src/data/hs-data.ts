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
// HOLLYWOOD STUDIOS — STUB DATA
// ============================================================

export const HS_ATTRACTIONS: ParkItem[] = withPov([
  {
    id: 'hs-rise', name: 'Rise of the Resistance',
    land: "Star Wars: Galaxy's Edge", tier: 'Tier 1', type: 'Attraction',
    image: '/images/attractions/hs/hs-rise_of_resistance.webp', vibes: ['thrill', 'indoor', 'dark', 'immersive'],
    waitTime: '120 min', status: 'open',
    description: 'La atracción más ambiciosa de Disney. 18 minutos de narrativa continua.',
  },
  {
    id: 'hs-smugglers', name: 'Millennium Falcon: Smugglers Run',
    land: "Star Wars: Galaxy's Edge", tier: 'Tier 1', type: 'Attraction',
    image: '/images/attractions/hs/hs-milennium_falcon.webp', vibes: ['thrill', 'indoor', 'simulator', 'interactive'],
    waitTime: '75 min', status: 'open',
    description: 'Piloteá el Millennium Falcon en una misión interactiva.',
  },
  {
    id: 'hs-slinky', name: 'Slinky Dog Dash',
    land: 'Toy Story Land', tier: 'Tier 1', type: 'Attraction',
    image: '/images/attractions/hs/hs-slinky_dog_dash.webp', vibes: ['family', 'outdoor', 'coaster'],
    waitTime: '80 min', status: 'open',
    description: 'Montaña rusa familiar con temática de Slinky Dog.',
  },
  {
    id: 'hs-tower', name: 'Tower of Terror',
    land: 'Sunset Boulevard', tier: 'Tier 1', type: 'Attraction',
    image: '/images/attractions/hs/hs-tower_of_terror.webp', vibes: ['thrill', 'indoor', 'dark', 'drops'],
    waitTime: '60 min', status: 'open',
    description: 'Ascensor de caída libre con secuencias aleatorias.',
  },
  {
    id: 'hs-rnrc', name: "Rock 'n' Roller Coaster",
    land: 'Sunset Boulevard', tier: 'Tier 1', type: 'Attraction',
    image: '/images/attractions/hs/hs-rock_roll_coaster.webp', vibes: ['thrill', 'indoor', 'dark', 'fast'],
    waitTime: '65 min', status: 'open',
    description: 'Montaña rusa interior: 0 a 97 km/h en 2.8 segundos.',
  },
  {
    id: 'hs-toy-mania', name: 'Toy Story Mania!',
    land: 'Toy Story Land', tier: 'Tier 2', type: 'Attraction',
    image: '/images/attractions/hs/hs-toy_story_mania.webp', vibes: ['family', 'indoor', 'interactive'],
    waitTime: '50 min', status: 'open',
    description: 'Juego de puntería interactivo 4D.',
  },
  {
    id: 'hs-mickey-runaway', name: "Mickey & Minnie's Runaway Railway",
    land: 'Hollywood Boulevard', tier: 'Tier 2', type: 'Attraction',
    image: '/images/attractions/hs/hs-mickey_minnie_runaway.webp', vibes: ['family', 'indoor', 'trackless'],
    waitTime: '45 min', status: 'open',
    description: 'Atracción trackless dentro de un cortometraje animado.',
  },
  {
    id: 'hs-alien', name: 'Alien Swirling Saucers',
    land: 'Toy Story Land', tier: 'Tier 3', type: 'Attraction',
    image: '/images/attractions/hs/hs-alien_swirling_saucers.webp', vibes: ['family', 'outdoor', 'spinning'],
    waitTime: '30 min', status: 'open',
    description: 'Plato giratorio con temática de los aliens.',
  },
  {
    id: 'hs-muppets', name: 'MuppetVision 3D',
    land: 'Grand Avenue', tier: 'Tier 3', type: 'Attraction',
    image: '/images/attractions/hs/hs-muppet_vision_3d_2.webp', vibes: ['classic', 'indoor', 'show'],
    waitTime: '10 min', status: 'open',
    description: 'Show 3D/4D con los Muppets.',
  },
  {
    id: 'hs-star-tours', name: 'Star Tours — The Adventures Continue',
    land: 'Echo Lake', tier: 'Tier 2', type: 'Attraction',
    image: '/images/attractions/hs/hs-star_tours_adventure.webp', vibes: ['thrill', 'indoor', 'simulator'],
    waitTime: '25 min', status: 'open',
    description: 'Simulador de vuelo Star Wars con destinos aleatorios.',
  },
  {
    id: 'hs-lightning', name: "Lightning McQueen's Racing Academy",
    land: 'Hollywood Boulevard', tier: 'Tier 3', type: 'Attraction',
    image: '/images/attractions/hs/hs-lightning_mcqueen_racing_academy.webp', vibes: ['family', 'indoor', 'show'],
    waitTime: '15 min', status: 'open',
    description: 'Show de Lightning McQueen con efectos especiales y pantallas inmersivas.',
  },
  {
    id: 'hs-mermaid', name: 'Voyage of the Little Mermaid',
    land: 'Animation Courtyard', tier: 'Tier 3', type: 'Attraction',
    image: '/images/attractions/hs/hs-voyage_little_mermaid.webp', vibes: ['family', 'indoor', 'show', 'dark'],
    waitTime: '20 min', status: 'open',
    description: 'Show con marionetas, efectos de agua y escenas de La Sirenita.',
  },
  {
    id: 'hs-disney-junior', name: 'Disney Junior Play and Dance!',
    land: 'Animation Courtyard', tier: 'Tier 3', type: 'Attraction',
    image: '/images/attractions/hs/hs-disney_jr_play_dance.webp', vibes: ['family', 'indoor', 'show', 'kids'],
    waitTime: '10 min', status: 'open',
    description: 'Show interactivo con personajes de Disney Junior para los más chicos.',
  },
]);

export const HS_DINING: ParkItem[] = [
  {
    id: 'hs-d-ogas', name: "Oga's Cantina",
    land: "Star Wars: Galaxy's Edge", tier: 'Table Service', type: 'Dining',
    image: '/images/hs.jpg', vibes: ['table', 'themed', 'indoor', 'drinks'],
    status: 'open', description: 'Bar temático de Star Wars con DJ Rex.',
  },
  {
    id: 'hs-d-docking', name: 'Docking Bay 7',
    land: "Star Wars: Galaxy's Edge", tier: 'Quick Service', type: 'Dining',
    image: '/images/hs.jpg', vibes: ['quick', 'themed', 'indoor'],
    status: 'open', description: 'Quick service temático en Batuu.',
  },
  {
    id: 'hs-d-50s', name: "50's Prime Time Café",
    land: 'Echo Lake', tier: 'Table Service', type: 'Dining',
    image: '/images/hs.jpg', vibes: ['table', 'themed', 'indoor', 'fun'],
    status: 'open', description: 'Restaurante años 50 donde los meseros te "retan".',
  },
];

export const HS_SHOWS: ParkItem[] = [
  {
    id: 'hs-s-fantasmic', name: 'Fantasmic!',
    land: 'Sunset Boulevard', tier: 'Nighttime', type: 'Show',
    image: '/images/hs.jpg', vibes: ['fireworks', 'night', 'water'],
    status: 'open', description: 'Espectáculo nocturno épico con agua, fuego y láser.',
  },
  {
    id: 'hs-s-indy', name: 'Indiana Jones Epic Stunt Spectacular',
    land: 'Echo Lake', tier: 'Stage Show', type: 'Show',
    image: '/images/hs.jpg', vibes: ['stage', 'outdoor', 'action'],
    status: 'open', description: 'Show en vivo con secuencias de acción reales.',
  },
];

export const HS_CHARACTERS: ParkItem[] = [
  {
    id: 'hs-c-kylo', name: "Kylo Ren — Galaxy's Edge",
    land: "Star Wars: Galaxy's Edge", tier: 'Icon', type: 'Character',
    image: '/images/hs.jpg', vibes: ['starwars', 'outdoor'],
    waitTime: '20 min', status: 'open', description: 'Kylo Ren patrullando Batuu.',
  },
  {
    id: 'hs-c-olaf', name: 'Olaf — Celebrity Spotlight',
    land: 'Echo Lake', tier: 'Icon', type: 'Character',
    image: '/images/hs.jpg', vibes: ['indoor', 'kids'],
    waitTime: '25 min', status: 'open', description: 'Meet & greet con Olaf.',
  },
];