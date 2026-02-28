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
// EPCOT — STUB DATA (status + type corrected)
// ============================================================

export const EPCOT_ATTRACTIONS: ParkItem[] = withPov([
  {
    id: 'ep-guardians', name: 'Guardians of the Galaxy: Cosmic Rewind',
    land: 'World Discovery', tier: 'Tier 1', type: 'Attraction',
    image: '/images/attractions/ep/ep-guardians_galaxy.webp', vibes: ['thrill', 'indoor', 'dark'],
    waitTime: '90 min', status: 'open',
    description: 'Montaña rusa interior con lanzamiento inverso y tecnología de rotación omnidireccional.',
  },
  {
    id: 'ep-test-track', name: 'Test Track',
    land: 'World Discovery', tier: 'Tier 1', type: 'Attraction',
    image: '/images/attractions/ep/ep-test-track_outside.webp', vibes: ['thrill', 'outdoor', 'fast'],
    waitTime: '70 min', status: 'open',
    description: 'Diseñá tu propio vehículo virtual y ponelo a prueba a 105 km/h.',
  },
  {
    id: 'ep-frozen', name: 'Frozen Ever After',
    land: 'World Showcase — Norway', tier: 'Tier 1', type: 'Attraction',
    image: '/images/attractions/ep/ep-frozen_ever_after.webp', vibes: ['family', 'indoor', 'water'],
    waitTime: '60 min', status: 'open',
    description: 'Recorrido en bote por Arendelle con animatrónicos avanzados.',
  },
  {
    id: 'ep-remy', name: "Remy's Ratatouille Adventure",
    land: 'World Showcase — France', tier: 'Tier 2', type: 'Attraction',
    image: '/images/attractions/ep/ep-remy_ratatouille.webp', vibes: ['family', 'indoor', 'trackless'],
    waitTime: '50 min', status: 'open',
    description: 'Atracción trackless en 4D donde te encogés al tamaño de una rata.',
  },
  {
    id: 'ep-soarin', name: "Soarin' Around the World",
    land: 'World Nature', tier: 'Tier 1', type: 'Attraction',
    image: '/images/attractions/ep/ep-soarin_over_the_world.webp', vibes: ['family', 'indoor', 'simulator'],
    waitTime: '55 min', status: 'open',
    description: 'Simulador de vuelo sobre paisajes icónicos del mundo.',
  },
  {
    id: 'ep-living-seas', name: 'The Seas with Nemo & Friends',
    land: 'World Nature', tier: 'Tier 3', type: 'Attraction',
    image: '/images/attractions/ep/ep-the_seas_with_nemo.webp', vibes: ['family', 'indoor', 'gentle'],
    waitTime: '15 min', status: 'open',
    description: 'Recorrido suave en clamóvil a través de un acuario real.',
  },
  {
    id: 'ep-spaceship-earth', name: 'Spaceship Earth',
    land: 'World Celebration', tier: 'Tier 2', type: 'Attraction',
    image: '/images/attractions/ep/ep-spaceship_earth_2.webp', vibes: ['classic', 'indoor', 'gentle'],
    waitTime: '20 min', status: 'open',
    description: 'Recorrido dentro de la icónica esfera geodésica.',
  },
  {
    id: 'ep-mission-space', name: 'Mission: SPACE',
    land: 'World Discovery', tier: 'Tier 2', type: 'Attraction',
    image: '/images/attractions/ep/ep-mission_space.webp', vibes: ['thrill', 'indoor', 'simulator'],
    waitTime: '25 min', status: 'open',
    description: 'Simulador centrífugo. Versión Orange (intensa) y Green (suave).',
  },
  {
    id: 'ep-figment', name: 'Journey Into Imagination with Figment',
    land: 'World Celebration', tier: 'Tier 3', type: 'Attraction',
    image: '/images/attractions/ep/ep-journey_into_imagination_2.webp', vibes: ['classic', 'indoor', 'gentle'],
    waitTime: '10 min', status: 'open',
    description: 'Recorrido clásico dedicado a la imaginación con el dragón Figment.',
  },
  {
    id: 'ep-land', name: 'Living with the Land',
    land: 'World Nature', tier: 'Tier 3', type: 'Attraction',
    image: '/images/attractions/ep/ep-living_land.webp', vibes: ['educational', 'indoor', 'gentle'],
    waitTime: '15 min', status: 'open',
    description: 'Recorrido en bote por los invernaderos reales de Epcot.',
  },
  {
    id: 'ep-gran-fiesta', name: 'Gran Fiesta Tour Starring The Three Caballeros',
    land: 'World Showcase — Mexico', tier: 'Tier 3', type: 'Attraction',
    image: '/images/shows/ep/ep-gran_fiesta_tour.webp', vibes: ['family', 'indoor', 'boat', 'classic'],
    waitTime: '10 min', status: 'open',
    description: 'Paseo en bote por México con los Tres Caballeros. Clásico de Epcot, ideal para el calor.',
  },
  {
    id: 'ep-china-film', name: 'Reflections of China',
    land: 'World Showcase — China', tier: 'Tier 3', type: 'Attraction',
    image: '/images/shows/ep/ep-reflections_of_China_2.webp', vibes: ['family', 'indoor', 'film', 'classic'],
    waitTime: '5 min', status: 'open',
    description: 'Film en 360° sobre la cultura y paisajes de China. Sin colas, sin reserva.',
  },
  {
    id: 'ep-canada-film', name: "O Canada!",
    land: 'World Showcase — Canada', tier: 'Tier 3', type: 'Attraction',
    image: '/images/shows/ep/ep_o_Canada.webp', vibes: ['family', 'indoor', 'film', 'classic'],
    waitTime: '5 min', status: 'open',
    description: 'Film en 360° sobre Canadá. Actualizado recientemente con nuevas escenas.',
  },
  {
    id: 'ep-france-film', name: 'Impressions de France',
    land: 'World Showcase — France', tier: 'Tier 3', type: 'Attraction',
    image: '/images/shows/ep/ep-impressions_de_France.webp', vibes: ['family', 'indoor', 'film', 'classic'],
    waitTime: '5 min', status: 'open',
    description: 'Film clásico sobre Francia. Relajante y con aire acondicionado.',
  },
  {
    id: 'ep-beauty-beast', name: 'Beauty and the Beast Sing-Along',
    land: 'World Showcase — France', tier: 'Tier 3', type: 'Attraction',
    image: '/images/shows/ep/ep-beauty_beast.webp', vibes: ['family', 'indoor', 'show', 'musical'],
    waitTime: '10 min', status: 'open',
    description: 'Versión alternativa de La Bella y la Bestia en formato sing-along.',
  },
  {
    id: 'ep-wonders-xian',  name: 'Wonders of Xian',
    land: 'World Showcase — China', tier: 'Tier 3', type: 'Attraction',
    image: '/images/epcot.jpg', vibes: ['family', 'indoor', 'film'],
    waitTime: '5 min', status: 'open',
    description: 'Documental sobre la ciudad de Xian y sus guerreros de terracota.',
  },
]);

export const EPCOT_DINING: ParkItem[] = [
  {
    id: 'ep-d-garden', name: 'Garden Grill',
    land: 'World Nature', tier: 'Table Service', type: 'Dining',
    image: '/images/epcot.jpg', vibes: ['table', 'character', 'indoor'],
    status: 'open', description: 'Restaurante rotativo con personajes.',
  },
  {
    id: 'ep-d-mexico', name: 'San Angel Inn',
    land: 'World Showcase — Mexico', tier: 'Table Service', type: 'Dining',
    image: '/images/epcot.jpg', vibes: ['table', 'indoor', 'themed'],
    status: 'open', description: 'Cena bajo las estrellas dentro de la pirámide.',
  },
  {
    id: 'ep-d-sunshine', name: 'Sunshine Seasons',
    land: 'World Nature', tier: 'Quick Service', type: 'Dining',
    image: '/images/epcot.jpg', vibes: ['quick', 'indoor', 'variety'],
    status: 'open', description: 'Food court con múltiples estaciones.',
  },
];

export const EPCOT_SHOWS: ParkItem[] = [
  {
    id: 'ep-s-luminous', name: 'Luminous The Symphony of Us',
    land: 'World Showcase Lagoon', tier: 'Nighttime', type: 'Show',
    image: '/images/epcot.jpg', vibes: ['fireworks', 'night', 'water'],
    status: 'open', description: 'Show nocturno con fuegos artificiales y proyecciones.',
  },
  {
    id: 'ep-s-voices', name: 'Voices of Liberty',
    land: 'World Showcase — America', tier: 'Stage Show', type: 'Show',
    image: '/images/epcot.jpg', vibes: ['stage', 'indoor', 'music'],
    status: 'open', description: 'Grupo a capella en el pabellón americano.',
  },
];

export const EPCOT_CHARACTERS: ParkItem[] = [
  {
    id: 'ep-c-anna-elsa', name: 'Anna & Elsa — Royal Sommerhus',
    land: 'World Showcase — Norway', tier: 'Princess', type: 'Character',
    image: '/images/epcot.jpg', vibes: ['princess', 'indoor'],
    waitTime: '45 min', status: 'open', description: 'Meet & greet con Anna y Elsa.',
  },
  {
    id: 'ep-c-mulan', name: 'Mulan — China Pavilion',
    land: 'World Showcase — China', tier: 'Princess', type: 'Character',
    image: '/images/epcot.jpg', vibes: ['princess', 'outdoor'],
    waitTime: '15 min', status: 'open', description: 'Encuentro con Mulan.',
  },
];