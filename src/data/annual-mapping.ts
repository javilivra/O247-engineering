// Ruta: src/data/annual-mapping.ts

export type Level = 'low' | 'medium' | 'high';

export interface MonthData {
  id: string;
  name: string;
  seasonTag: string;
  tempMax: string;   // NUEVO: Ej "22°"
  tempMin: string;   // NUEVO: Ej "10°"
  skyLabel: string;  
  gearLabel: string; 
  gearIcon: string;  
  priceLevel: 1 | 2 | 3; 
  crowdLabel: string; 
  crowdPercent: number; 
  colorTheme: 'emerald' | 'amber' | 'rose' | 'cyan'; 
  insight: string;
  image: string;
}

export const ANNUAL_DATA: MonthData[] = [
  { 
    id: 'jan', name: 'Enero', seasonTag: 'Post-Fiestas', 
    tempMax: '22°', tempMin: '10°', // Orlando Enero: Agradable de día, frío de noche
    skyLabel: 'Fresco', gearLabel: 'Capas/Abrigo', gearIcon: 'solar:wind-bold-duotone',
    priceLevel: 2, crowdLabel: 'Media', crowdPercent: 65, colorTheme: 'cyan',
    insight: 'El secreto mejor guardado post-Reyes. Clima fresco que requiere abrigo ligero y multitudes bajas, excepto el fin de semana de la Maratón.',
    image: '/images/mk.jpg'
  },
  { 
    id: 'feb', name: 'Febrero', seasonTag: 'Princess Season', 
    tempMax: '24°', tempMin: '12°',
    skyLabel: 'Agradable', gearLabel: 'Ropa Cómoda', gearIcon: 'solar:sun-2-bold-duotone',
    priceLevel: 2, crowdLabel: 'Alta (Eventos)', crowdPercent: 75, colorTheme: 'rose',
    insight: 'Clima perfecto pero traicionero en multitudes: Presidents Day y la Princess Half Marathon disparan la asistencia.',
    image: '/images/epcot.jpg'
  },
  { 
    id: 'mar', name: 'Marzo', seasonTag: 'Spring Break', 
    tempMax: '26°', tempMin: '14°',
    skyLabel: 'Soleado', gearLabel: 'Capas Ligeras', gearIcon: 'solar:sun-fog-bold-duotone',
    priceLevel: 3, crowdLabel: 'Muy Alta', crowdPercent: 90, colorTheme: 'emerald',
    insight: 'Ambiente fresco y nítido. Las flores de primavera crean la visibilidad perfecta, pero las multitudes escolares son masivas.',
    image: '/images/disneysprings.jpg'
  },
  { 
    id: 'apr', name: 'Abril', seasonTag: 'Pascua', 
    tempMax: '29°', tempMin: '17°',
    skyLabel: 'Cálido', gearLabel: 'Shorts/Remera', gearIcon: 'solar:sun-2-bold-duotone',
    priceLevel: 3, crowdLabel: 'Muy Alta', crowdPercent: 85, colorTheme: 'amber',
    insight: 'Si evitas la semana de Pascua, la segunda quincena es excelente: el clima aún no sofoca y las multitudes empiezan a bajar.',
    image: '/images/hs.jpg'
  },
  { 
    id: 'may', name: 'Mayo', seasonTag: 'Pre-Verano', 
    tempMax: '32°', tempMin: '20°',
    skyLabel: 'Calor', gearLabel: 'Protección UV', gearIcon: 'solar:glasses-bold-duotone',
    priceLevel: 2, crowdLabel: 'Media', crowdPercent: 50, colorTheme: 'cyan',
    insight: 'El "Sweet Spot" del año. Calor manejable antes del verano y multitudes moderadas antes de que terminen las clases.',
    image: '/images/typhoon_lagoon.webp'
  },
  { 
    id: 'jun', name: 'Junio', seasonTag: 'Inicio Verano', 
    tempMax: '33°', tempMin: '23°',
    skyLabel: 'Húmedo', gearLabel: 'Ropa Técnica', gearIcon: 'solar:water-drop-bold-duotone',
    priceLevel: 2, crowdLabel: 'Alta', crowdPercent: 80, colorTheme: 'rose',
    insight: 'Comienza el desafío: Calor húmedo intenso y lluvias diarias. Las multitudes escolares están al máximo.',
    image: '/images/volcano_bay_2.webp'
  },
  { 
    id: 'jul', name: 'Julio', seasonTag: 'Pico de Calor', 
    tempMax: '34°', tempMin: '24°',
    skyLabel: 'Tormentas', gearLabel: 'Poncho & Fan', gearIcon: 'solar:cloud-rain-bold-duotone',
    priceLevel: 2, crowdLabel: 'Extrema', crowdPercent: 95, colorTheme: 'rose',
    insight: 'El mes más denso. El calor es un factor físico real. Requiere estrategia de "siesta" al mediodía obligatoria.',
    image: '/images/universal_images/Universal_Studios_Entrance.webp'
  },
  { 
    id: 'aug', name: 'Agosto', seasonTag: 'Halloween Start', 
    tempMax: '34°', tempMin: '24°',
    skyLabel: 'Lluvioso', gearLabel: 'Impermeable', gearIcon: 'solar:umbrella-bold-duotone',
    priceLevel: 1, crowdLabel: 'Baja (Fin de mes)', crowdPercent: 40, colorTheme: 'amber',
    insight: 'La paradoja: Calor infernal, pero multitudes muy bajas a partir de la segunda quincena. Comienza Halloween Party.',
    image: '/images/mk.jpg'
  },
  { 
    id: 'sep', name: 'Septiembre', seasonTag: 'Temporada Baja', 
    tempMax: '32°', tempMin: '23°',
    skyLabel: 'Huracanes', gearLabel: 'Secado Rápido', gearIcon: 'solar:wind-bold-duotone',
    priceLevel: 1, crowdLabel: 'Mínima', crowdPercent: 20, colorTheme: 'emerald',
    insight: 'El mes más barato y vacío del año. Filas cortas garantizadas. Riesgo alto de lluvias y huracanes.',
    image: '/images/epcot.jpg'
  },
  { 
    id: 'oct', name: 'Octubre', seasonTag: 'Spooky Season', 
    tempMax: '29°', tempMin: '19°',
    skyLabel: 'Agradable', gearLabel: 'Casual', gearIcon: 'solar:ghost-bold-duotone',
    priceLevel: 2, crowdLabel: 'Media', crowdPercent: 60, colorTheme: 'amber',
    insight: 'Clima agradable de nuevo. EPCOT explota por el Food & Wine Festival y Magic Kingdom cierra temprano por fiestas.',
    image: '/images/hs.jpg'
  },
  { 
    id: 'nov', name: 'Noviembre', seasonTag: 'Holiday Start', 
    tempMax: '26°', tempMin: '15°',
    skyLabel: 'Fresco', gearLabel: 'Cardigan', gearIcon: 'solar:snowflake-bold-duotone',
    priceLevel: 3, crowdLabel: 'Alta (Thanksgiving)', crowdPercent: 85, colorTheme: 'cyan',
    insight: 'Semana de Jersey y Thanksgiving son caóticos. Las semanas intermedias son excelentes en clima y afluencia.',
    image: '/images/mk.jpg'
  },
  { 
    id: 'dec', name: 'Diciembre', seasonTag: 'Festivo', 
    tempMax: '23°', tempMin: '12°',
    skyLabel: 'Variable', gearLabel: 'Abrigo', gearIcon: 'solar:gift-bold-duotone',
    priceLevel: 3, crowdLabel: 'Masiva', crowdPercent: 100, colorTheme: 'rose',
    insight: 'Mágico pero costoso. Desde el 20 de Dic es la semana más llena del año. Solo para ver decoración, no para subir a todo.',
    image: '/images/mk.jpg'
  },
];