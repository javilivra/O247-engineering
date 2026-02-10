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
    image: 'https://cdn1.parksmedia.wdpromedia.com/media/resort/1/18240_header_happily_ever_after.jpg',
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
    image: 'https://cdn1.parksmedia.wdpromedia.com/media/resort/1/18242_header_festival_fantasy.jpg',
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
    image: 'https://cdn1.parksmedia.wdpromedia.com/media/resort/1/18245_header_friendship_faire.jpg',
    description: 'Show en el escenario del castillo con Mickey, Tiana, Rapunzel y Elsa.',
  },
];