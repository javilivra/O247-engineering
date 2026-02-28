// ============================================================
// ADAPTER: ParkItem → Attraction
// Convierte datos simples en el tipo completo Attraction
// con valores por defecto razonables para Fase 1
// ============================================================
import type { ParkItem, Attraction, ParkId, ParkResort } from '@/data/types';

function generateSlug(id: string): string {
  return id;
}

export function adaptParkItem(
  item: ParkItem,
  park: ParkId,
  resort: ParkResort
): Attraction {
  return {
    ...item,
    type: 'Attraction',
    slug: generateSlug(item.id),
    park,
    resort,
    mapId: 0,
    rideSystem: item.vibes?.includes('coaster') ? 'Roller Coaster'
      : item.vibes?.includes('simulator') ? 'Simulator'
      : item.vibes?.includes('dark') ? 'Dark Ride'
      : item.vibes?.includes('spinning') ? 'Spinning Ride'
      : item.vibes?.includes('water') ? 'Water Ride'
      : 'Dark Ride',
    yearOpened: 2000,
    reliabilityScore: 85,
    reliabilitySource: 'O247 Editorial',
    heightReq: 0,
    hasAc: item.vibes?.includes('indoor') ?? false,
    isIndoor: item.vibes?.includes('indoor') ?? false,
    duration: 5,
    access: 'Standby',
    accessExplained: 'Fila tradicional.',
    avgWaitByMonth: { 1:45,2:45,3:50,4:55,5:50,6:60,7:65,8:65,9:50,10:50,11:45,12:55 },
    forecastToday: [
      { hour: 9,  label: '9am',     waitMin: 30, tag: 'low' },
      { hour: 11, label: '11am',    waitMin: 55, tag: 'peak' },
      { hour: 13, label: '1pm',     waitMin: 65, tag: 'peak' },
      { hour: 15, label: '3pm',     waitMin: 50 },
      { hour: 17, label: '5pm',     waitMin: 35, tag: 'low' },
      { hour: 19, label: '7pm',     waitMin: 25, tag: 'low' },
    ],
    bestTime: 'Primera hora del día o última hora de la tarde.',
    secretTip: 'Llegá temprano para evitar las filas más largas del día.',
    insiderFacts: ['Datos editoriales próximamente.'],
    relatedActivities: [],
    accessibility: {
      wheelchair: true,
      mustTransfer: false,
      serviceAnimals: true,
      closedCaptions: false,
      assistiveListening: false,
      signLanguage: false,
      handheldCaptioning: false,
      audioDescription: false,
    },
    warnings: {
      motionSickness: item.vibes?.includes('simulator') ?? false,
      darkness: item.vibes?.includes('dark') ?? false,
      heights: item.vibes?.includes('coaster') ?? false,
      drops: item.vibes?.includes('drops') ?? false,
      flashingLights: false,
      loudNoises: false,
      water: item.vibes?.includes('water') ?? false,
      spinning: item.vibes?.includes('spinning') ?? false,
      claustrophobic: item.vibes?.includes('indoor') ?? false,
      scareFactor: item.tier === 'Tier 1' ? 3 : item.tier === 'Tier 2' ? 2 : 1,
      pregnancyRestriction: item.tier === 'Tier 1',
      backNeckIssues: item.vibes?.includes('coaster') ?? false,
    },

    description: item.description ?? '',
    lockers: {
      required: false,
      location: "Antes de la fila",
      cost: "Gratis",
    },
    photoPolicy: {
      camerasAllowed: true,
      phonesAllowed: true,
      flashAllowed: false,
      goProAllowed: false,
      hasOnRidePhoto: false,
      photoPassIncluded: false,
    },
  };
}

export function adaptParkItems(
  items: ParkItem[],
  park: ParkId,
  resort: ParkResort
): Attraction[] {
  return items
    .filter(item => item.type === 'Attraction')
    .map(item => adaptParkItem(item, park, resort));
}
