import type { ParkItem } from './types';

// ============================================================
// EPCOT — STUB DATA (status + type corrected)
// ============================================================

export const EPCOT_ATTRACTIONS: ParkItem[] = [
  {
    id: 'ep-guardians', name: 'Guardians of the Galaxy: Cosmic Rewind',
    land: 'World Discovery', tier: 'Tier 1', type: 'Attraction',
    image: '/images/epcot.jpg', vibes: ['thrill', 'indoor', 'dark'],
    waitTime: '90 min', status: 'open',
    description: 'Montaña rusa interior con lanzamiento inverso y tecnología de rotación omnidireccional.',
  },
  {
    id: 'ep-test-track', name: 'Test Track',
    land: 'World Discovery', tier: 'Tier 1', type: 'Attraction',
    image: '/images/epcot.jpg', vibes: ['thrill', 'outdoor', 'fast'],
    waitTime: '70 min', status: 'open',
    description: 'Diseñá tu propio vehículo virtual y ponelo a prueba a 105 km/h.',
  },
  {
    id: 'ep-frozen', name: 'Frozen Ever After',
    land: 'World Showcase — Norway', tier: 'Tier 1', type: 'Attraction',
    image: '/images/epcot.jpg', vibes: ['family', 'indoor', 'water'],
    waitTime: '60 min', status: 'open',
    description: 'Recorrido en bote por Arendelle con animatrónicos avanzados.',
  },
  {
    id: 'ep-remy', name: "Remy's Ratatouille Adventure",
    land: 'World Showcase — France', tier: 'Tier 2', type: 'Attraction',
    image: '/images/epcot.jpg', vibes: ['family', 'indoor', 'trackless'],
    waitTime: '50 min', status: 'open',
    description: 'Atracción trackless en 4D donde te encogés al tamaño de una rata.',
  },
  {
    id: 'ep-soarin', name: "Soarin' Around the World",
    land: 'World Nature', tier: 'Tier 1', type: 'Attraction',
    image: '/images/epcot.jpg', vibes: ['family', 'indoor', 'simulator'],
    waitTime: '55 min', status: 'open',
    description: 'Simulador de vuelo sobre paisajes icónicos del mundo.',
  },
  {
    id: 'ep-living-seas', name: 'The Seas with Nemo & Friends',
    land: 'World Nature', tier: 'Tier 3', type: 'Attraction',
    image: '/images/epcot.jpg', vibes: ['family', 'indoor', 'gentle'],
    waitTime: '15 min', status: 'open',
    description: 'Recorrido suave en clamóvil a través de un acuario real.',
  },
  {
    id: 'ep-spaceship-earth', name: 'Spaceship Earth',
    land: 'World Celebration', tier: 'Tier 2', type: 'Attraction',
    image: '/images/epcot.jpg', vibes: ['classic', 'indoor', 'gentle'],
    waitTime: '20 min', status: 'open',
    description: 'Recorrido dentro de la icónica esfera geodésica.',
  },
  {
    id: 'ep-mission-space', name: 'Mission: SPACE',
    land: 'World Discovery', tier: 'Tier 2', type: 'Attraction',
    image: '/images/epcot.jpg', vibes: ['thrill', 'indoor', 'simulator'],
    waitTime: '25 min', status: 'open',
    description: 'Simulador centrífugo. Versión Orange (intensa) y Green (suave).',
  },
  {
    id: 'ep-figment', name: 'Journey Into Imagination with Figment',
    land: 'World Celebration', tier: 'Tier 3', type: 'Attraction',
    image: '/images/epcot.jpg', vibes: ['classic', 'indoor', 'gentle'],
    waitTime: '10 min', status: 'open',
    description: 'Recorrido clásico dedicado a la imaginación con el dragón Figment.',
  },
  {
    id: 'ep-land', name: 'Living with the Land',
    land: 'World Nature', tier: 'Tier 3', type: 'Attraction',
    image: '/images/epcot.jpg', vibes: ['educational', 'indoor', 'gentle'],
    waitTime: '15 min', status: 'open',
    description: 'Recorrido en bote por los invernaderos reales de Epcot.',
  },
];

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