import type { ParkItem } from './types';

export const VOLCANO_ATTRACTIONS: ParkItem[] = [
  { id: 'vb-krakatau', name: 'Krakatau Aqua Coaster', land: 'Krakatau', tier: 'Tier 1', type: 'Attraction', image: '/images/universal_images/volcano_bay_2.webp', vibes: ['thrill','outdoor','water'], waitTime: '60 min', status: 'open', description: 'Montaña rusa acuática dentro del volcán Krakatau.' },
  { id: 'vb-punga', name: "Punga Racers", land: 'Rainforest Village', tier: 'Tier 2', type: 'Attraction', image: '/images/universal_images/volcano_bay_2.webp', vibes: ['family','outdoor','water'], waitTime: '30 min', status: 'open', description: 'Carrera en tobogán con bolsas de aranga.' },
  { id: 'vb-ohyah', name: "Oh Yeah! & Do Yeah!", land: 'Rainforest Village', tier: 'Tier 2', type: 'Attraction', image: '/images/universal_images/volcano_bay_2.webp', vibes: ['thrill','outdoor','water'], waitTime: '25 min', status: 'open', description: 'Caídas de 4 y 6 metros al agua.' },
  { id: 'vb-kopiko', name: 'Kopiko Wai Winding River', land: 'Rainforest Village', tier: 'Tier 3', type: 'Attraction', image: '/images/universal_images/volcano_bay_2.webp', vibes: ['family','outdoor','water'], waitTime: '10 min', status: 'open', description: 'Río lento por el interior del volcán.' },
  { id: 'vb-honu', name: 'Honu ika Moana', land: 'Wave Village', tier: 'Tier 1', type: 'Attraction', image: '/images/universal_images/volcano_bay_2.webp', vibes: ['thrill','outdoor','water'], waitTime: '45 min', status: 'open', description: 'Tobogán de bote familiar de alta velocidad.' },
  { id: 'vb-maku', name: 'Maku Puihi Round Raft Rides', land: 'Rainforest Village', tier: 'Tier 2', type: 'Attraction', image: '/images/universal_images/volcano_bay_2.webp', vibes: ['family','outdoor','water'], waitTime: '35 min', status: 'open', description: 'Descenso grupal en balsa circular.' },
  { id: 'vb-taniwha', name: 'Taniwha Tubes', land: 'Rainforest Village', tier: 'Tier 2', type: 'Attraction', image: '/images/universal_images/volcano_bay_2.webp', vibes: ['family','outdoor','water'], waitTime: '20 min', status: 'open', description: 'Toboganes de tubo individuales en cascada.' },
  { id: 'vb-kala', name: 'Ko\'okiri Body Plunge', land: 'Krakatau', tier: 'Tier 1', type: 'Attraction', image: '/images/universal_images/volcano_bay_2.webp', vibes: ['thrill','outdoor','water'], waitTime: '40 min', status: 'open', description: 'Caída vertical de 18 metros desde el volcán.' },
];

export const VOLCANO_DINING: ParkItem[] = [
  { id: 'vb-d-kohola', name: "Kohola Reef Restaurant", land: 'Wave Village', tier: 'Quick Service', type: 'Dining', image: '/images/universal_images/volcano_bay_2.webp', vibes: ['quick','outdoor'], status: 'open', description: 'Comida tropical frente a la playa principal.' },
];

export const VOLCANO_SHOWS: ParkItem[] = [];
export const VOLCANO_CHARACTERS: ParkItem[] = [];
