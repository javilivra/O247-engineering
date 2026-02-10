// src/data/mk-characters-data.ts
import type { ParkItem } from './types';

export const MK_CHARACTERS: ParkItem[] = [
  {
    id: 'c1',
    name: 'Meet Mickey at Town Square Theater',
    land: 'Main Street, U.S.A.',
    tier: 'Icon',
    status: 'open',
    waitTime: '25 min',
    type: 'Character',
    vibes: ['mickey', 'indoor', 'ac'],
    image: 'https://cdn1.parksmedia.wdpromedia.com/media/resort/1/18260_header_meet_mickey.jpg',
    description: 'Conoce al jefe en su traje de mago. ¡Habla con él!',
  },
  {
    id: 'c2',
    name: 'Princess Fairytale Hall',
    land: 'Fantasyland',
    tier: 'Princess',
    status: 'open',
    waitTime: '35 min',
    type: 'Character',
    vibes: ['princess', 'indoor', 'ac'],
    image: 'https://cdn1.parksmedia.wdpromedia.com/media/resort/1/18265_header_princess_hall.jpg',
    description: 'Encuentro real con Cenicienta, Elena, Tiana o Rapunzel.',
  },
  {
    id: 'c3',
    name: 'Meet Buzz Lightyear',
    land: 'Tomorrowland',
    tier: 'Pixar',
    status: 'open',
    waitTime: 'Intermitente',
    type: 'Character',
    vibes: ['pixar', 'kids'],
    image: 'https://cdn1.parksmedia.wdpromedia.com/media/resort/1/18268_header_buzz.jpg',
    description: 'Al infinito y más allá en el Rocket Tower Plaza.',
  },
];