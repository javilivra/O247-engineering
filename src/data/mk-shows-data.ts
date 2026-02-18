// src/data/mk-shows-data.ts
import type { ParkItem } from './types';

export const MK_SHOWS: ParkItem[] = [
  {
    id: 's1',
    name: 'Happily Ever After',
    land: 'Main Street, U.S.A.',
    tier: 'Nighttime',
    status: 'open',
    waitTime: '20:00 HS',
    type: 'Show',
    vibes: ['fireworks', 'stage'],
    image: '/images/shows/mk/Happily_Ever_After.webp',
    description: 'El espectáculo de fuegos artificiales y proyecciones más emotivo.',
  },
  {
    id: 's2',
    name: 'Disney Festival of Fantasy Parade',
    land: 'Parade Route',
    tier: 'Parade',
    status: 'open',
    waitTime: '15:00 HS',
    type: 'Show',
    vibes: ['parade'],
    image: '/images/shows/mk/Disney_Festival_of_Fantasy_Parade.webp',
    description: 'Desfile diurno con carrozas espectaculares y el dragón Maléfica.',
  },
  {
    id: 's3',
    name: "Mickey's Magical Friendship Faire",
    land: 'Cinderella Castle',
    tier: 'Stage Show',
    status: 'open',
    waitTime: 'Varios',
    type: 'Show',
    vibes: ['stage', 'kids'],
    image: '/images/shows/mk/Mickey_Magical_Friendship_Fair.webp',
    description: 'Show en el escenario del castillo con Mickey, Tiana, Rapunzel y Elsa.',
  },
];