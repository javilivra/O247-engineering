// src/data/strategy-2026.ts
// Contenido editorial estratégico por mes — 2026
// Fuente: Datos históricos + Eventos confirmados Disney/Universal 2026

export type CrowdLevel = 1 | 2 | 3 | 4 | 5;
export type ParkType = 'disney' | 'universal' | 'ambos';
export type EventType = 'festival' | 'event' | 'special' | 'runDisney';

export interface CalendarDay {
  date: number;
  dayName: string;
  crowdLevel: CrowdLevel;
  note?: string;
}

export interface CalendarWeek {
  weekLabel: string;
  days: CalendarDay[];
}

export interface MonthEvent {
  name: string;
  park: ParkType;
  dates: string;
  type: EventType;
  highlight: boolean;
}

export interface MonthStrategy {
  slug: string;
  monthIndex: number;
  year: number;
  crowds: {
    summary: string;
    bestWeek: string;
    worstWeek: string;
    tip: string;
  };
  weather: {
    summary: string;
    whatToPack: string[];
  };
  pricing: {
    summary: string;
    disneyTier: string;
    universalTier: string;
    tip: string;
  };
  weeks: CalendarWeek[];
  topParks: { parkId: string; reason: string }[];
  mainTip: string;
  avoidTip: string;
  events: MonthEvent[];
}

export const STRATEGY_2026: MonthStrategy[] = [
  {
    slug: 'enero',
    monthIndex: 0,
    year: 2026,
    crowds: {
      summary: 'Enero es el respiro post-fiestas. Las primeras dos semanas son de las más tranquilas del año, con multitudes muy bajas que permiten recorrer los parques con comodidad real. La tercera semana se activa levemente por el Festival of the Arts en EPCOT y el Rock the Universe en Universal.',
      bestWeek: 'Primera y segunda semana (del 5 al 18)',
      worstWeek: 'Fin de semana del 1-4 (resaca de Año Nuevo)',
      tip: 'Es el único momento del año donde podés hacer dos parques Disney en un día sin sentirte abrumado.',
    },
    weather: {
      summary: 'Clima agradable de día (20-22°C) con noches que pueden bajar a 10°C. Sin lluvia significativa. El cielo despejado hace que las fotos sean espectaculares.',
      whatToPack: ['Abrigo ligero o campera', 'Capas (mañana fría, tarde cálida)', 'Ropa cómoda para caminar'],
    },
    pricing: {
      summary: 'Tarifas de temporada baja en hoteles Disney. Es uno de los meses más económicos del año para hospedarse dentro del resort.',
      disneyTier: 'Value ($)',
      universalTier: 'Regular ($$)',
      tip: 'Los paquetes de hotel+ticket de enero suelen ser los más baratos de todo el año.',
    },
    weeks: [
      {
        weekLabel: 'Sem 1 (1-4)',
        days: [
          { date: 1, dayName: 'Jue', crowdLevel: 5, note: 'Año Nuevo' },
          { date: 2, dayName: 'Vie', crowdLevel: 4 },
          { date: 3, dayName: 'Sáb', crowdLevel: 4 },
          { date: 4, dayName: 'Dom', crowdLevel: 3 },
        ],
      },
      {
        weekLabel: 'Sem 2 (5-11)',
        days: [
          { date: 5, dayName: 'Lun', crowdLevel: 1 },
          { date: 6, dayName: 'Mar', crowdLevel: 1 },
          { date: 7, dayName: 'Mié', crowdLevel: 1 },
          { date: 8, dayName: 'Jue', crowdLevel: 1 },
          { date: 9, dayName: 'Vie', crowdLevel: 2 },
          { date: 10, dayName: 'Sáb', crowdLevel: 2 },
          { date: 11, dayName: 'Dom', crowdLevel: 2 },
        ],
      },
      {
        weekLabel: 'Sem 3 (12-18)',
        days: [
          { date: 12, dayName: 'Lun', crowdLevel: 1 },
          { date: 13, dayName: 'Mar', crowdLevel: 1 },
          { date: 14, dayName: 'Mié', crowdLevel: 1 },
          { date: 15, dayName: 'Jue', crowdLevel: 1 },
          { date: 16, dayName: 'Vie', crowdLevel: 2, note: 'Inicio Festival of the Arts EPCOT' },
          { date: 17, dayName: 'Sáb', crowdLevel: 2 },
          { date: 18, dayName: 'Dom', crowdLevel: 2 },
        ],
      },
      {
        weekLabel: 'Sem 4 (19-25)',
        days: [
          { date: 19, dayName: 'Lun', crowdLevel: 2 },
          { date: 20, dayName: 'Mar', crowdLevel: 2 },
          { date: 21, dayName: 'Mié', crowdLevel: 2 },
          { date: 22, dayName: 'Jue', crowdLevel: 2 },
          { date: 23, dayName: 'Vie', crowdLevel: 3, note: 'Rock the Universe Universal' },
          { date: 24, dayName: 'Sáb', crowdLevel: 3, note: 'Rock the Universe Universal' },
          { date: 25, dayName: 'Dom', crowdLevel: 2 },
        ],
      },
      {
        weekLabel: 'Sem 5 (26-31)',
        days: [
          { date: 26, dayName: 'Lun', crowdLevel: 1 },
          { date: 27, dayName: 'Mar', crowdLevel: 1 },
          { date: 28, dayName: 'Mié', crowdLevel: 1 },
          { date: 29, dayName: 'Jue', crowdLevel: 1 },
          { date: 30, dayName: 'Vie', crowdLevel: 2 },
          { date: 31, dayName: 'Sáb', crowdLevel: 2 },
        ],
      },
    ],
    topParks: [
      { parkId: 'mk', reason: 'Filas cortas en todas las atracciones principales. Ideal para hacer TRON y Seven Dwarfs sin Lightning Lane.' },
      { parkId: 'epcot', reason: 'Festival of the Arts desde el 16. Arte, gastronomía y entretenimiento incluidos en el ticket regular.' },
      { parkId: 'ioa', reason: 'Multitudes bajas en Wizarding World. El momento ideal para disfrutar Hagrid sin esperar.' },
    ],
    mainTip: 'Llegá al parque antes de la apertura (rope drop). En enero con multitudes bajas podés hacer 6-8 atracciones antes del mediodía sin Lightning Lane.',
    avoidTip: 'Evitá el 1 de enero — es el día más caro y caótico del mes por la resaca de Año Nuevo.',
    events: [
      { name: 'Festival of the Arts — EPCOT', park: 'disney', dates: 'Ene 16 – Feb 23', type: 'festival', highlight: true },
      { name: 'Rock the Universe', park: 'universal', dates: 'Ene 23–24', type: 'event', highlight: false },
      { name: 'Disney After Hours — Magic Kingdom', park: 'disney', dates: 'Select nights', type: 'special', highlight: false },
    ],
  },
  {
    slug: 'febrero',
    monthIndex: 1,
    year: 2026,
    crowds: {
      summary: 'Febrero arranca tranquilo pero se complica progresivamente. El Presidents Day (16 Feb) y la Princess Half Marathon generan un pico de multitudes a fin de mes que muchos viajeros no anticipan.',
      bestWeek: 'Primera y segunda semana (1-15)',
      worstWeek: 'Última semana (24-28) — Princess Half Marathon + fin del Festival of Arts',
      tip: 'Si viajás la primera quincena de febrero tenés clima perfecto y multitudes aún manejables. La segunda quincena es una lotería.',
    },
    weather: {
      summary: 'El mejor clima del año. Temperaturas de 22-24°C de día, noches frescas de 12°C. Sin lluvia, cielos despejados. Muchos lo consideran el clima ideal para los parques.',
      whatToPack: ['Ropa cómoda de día', 'Campera para la noche', 'Lentes de sol'],
    },
    pricing: {
      summary: 'Temporada baja-media. Las tarifas suben hacia fin de mes por Presidents Day y los eventos deportivos.',
      disneyTier: 'Value / Regular ($ a $$)',
      universalTier: 'Regular ($$)',
      tip: 'Reservá hotel con anticipación si viajás en el fin de semana del 21-22 Feb — se llena por la maratón.',
    },
    weeks: [
      {
        weekLabel: 'Sem 1 (1-8)',
        days: [
          { date: 1, dayName: 'Dom', crowdLevel: 2 },
          { date: 2, dayName: 'Lun', crowdLevel: 1 },
          { date: 3, dayName: 'Mar', crowdLevel: 1 },
          { date: 4, dayName: 'Mié', crowdLevel: 1 },
          { date: 5, dayName: 'Jue', crowdLevel: 1 },
          { date: 6, dayName: 'Vie', crowdLevel: 2 },
          { date: 7, dayName: 'Sáb', crowdLevel: 2, note: 'Inicio Mardi Gras Universal' },
          { date: 8, dayName: 'Dom', crowdLevel: 2 },
        ],
      },
      {
        weekLabel: 'Sem 2 (9-15)',
        days: [
          { date: 9, dayName: 'Lun', crowdLevel: 2 },
          { date: 10, dayName: 'Mar', crowdLevel: 2 },
          { date: 11, dayName: 'Mié', crowdLevel: 2 },
          { date: 12, dayName: 'Jue', crowdLevel: 2 },
          { date: 13, dayName: 'Vie', crowdLevel: 2 },
          { date: 14, dayName: 'Sáb', crowdLevel: 3, note: 'San Valentín' },
          { date: 15, dayName: 'Dom', crowdLevel: 2 },
        ],
      },
      {
        weekLabel: 'Sem 3 (16-22)',
        days: [
          { date: 16, dayName: 'Lun', crowdLevel: 4, note: 'Presidents Day' },
          { date: 17, dayName: 'Mar', crowdLevel: 3 },
          { date: 18, dayName: 'Mié', crowdLevel: 2 },
          { date: 19, dayName: 'Jue', crowdLevel: 2 },
          { date: 20, dayName: 'Vie', crowdLevel: 3 },
          { date: 21, dayName: 'Sáb', crowdLevel: 4 },
          { date: 22, dayName: 'Dom', crowdLevel: 3 },
        ],
      },
      {
        weekLabel: 'Sem 4 (23-28)',
        days: [
          { date: 23, dayName: 'Lun', crowdLevel: 2, note: 'Fin Festival of Arts EPCOT' },
          { date: 24, dayName: 'Mar', crowdLevel: 2 },
          { date: 25, dayName: 'Mié', crowdLevel: 2 },
          { date: 26, dayName: 'Jue', crowdLevel: 3, note: 'Princess Half Marathon Weekend' },
          { date: 27, dayName: 'Vie', crowdLevel: 4, note: 'Princess Half Marathon' },
          { date: 28, dayName: 'Sáb', crowdLevel: 4, note: 'Princess Half Marathon' },
        ],
      },
    ],
    topParks: [
      { parkId: 'epcot', reason: 'Festival of the Arts hasta el 23. Arte gastronómico y shows de Broadway incluidos con el ticket.' },
      { parkId: 'ak', reason: 'Animal Kingdom es el parque más ignorado en febrero. Multitudes muy bajas incluso en fin de semana.' },
      { parkId: 'us', reason: 'Mardi Gras arranca el 7. Desfile nocturno y gastronomía internacional incluidos en el ticket regular.' },
    ],
    mainTip: 'Febrero es el mejor mes para hacer Animal Kingdom — el clima fresco es ideal para los safaris y las colas son mínimas.',
    avoidTip: 'Evitá el fin de semana del 26-28 si no vas a la Princess Half Marathon — los parques se llenan de runners y familias.',
    events: [
      { name: 'Festival of the Arts — EPCOT', park: 'disney', dates: 'Ene 16 – Feb 23', type: 'festival', highlight: true },
      { name: 'Mardi Gras Universal', park: 'universal', dates: 'Feb 7 – Abr 4', type: 'festival', highlight: true },
      { name: 'Princess Half Marathon Weekend', park: 'disney', dates: 'Feb 26 – Mar 2', type: 'runDisney', highlight: false },
    ],
  },
  {
    slug: 'marzo',
    monthIndex: 2,
    year: 2026,
    crowds: {
      summary: 'Marzo es sinónimo de Spring Break. Las multitudes escalan desde la primera semana y alcanzan su pico en Semana Santa. Es un mes visualmente hermoso — clima perfecto, flores de primavera — pero logísticamente desafiante.',
      bestWeek: 'Primera semana (1-7) antes que arranquen las vacaciones escolares',
      worstWeek: 'Semana de Pascua y Spring Break (mid-month)',
      tip: 'Si tu fecha es fija en marzo, priorizá Animal Kingdom y Hollywood Studios — son los que mejor absorben multitudes.',
    },
    weather: {
      summary: 'Clima primaveral ideal. 24-26°C de día, noches agradables de 14°C. Lluvias esporádicas pero sin el calor sofocante del verano.',
      whatToPack: ['Ropa ligera', 'Capas para la noche', 'Protector solar', 'Poncho liviano por las dudas'],
    },
    pricing: {
      summary: 'Temporada alta. Los precios de hotel son significativamente más caros que enero-febrero. Reservar con mínimo 3-4 meses de anticipación.',
      disneyTier: 'Peak / Spring ($$$$$)',
      universalTier: 'Peak ($$$)',
      tip: 'Los paquetes de hotel dentro de Disney suben hasta un 40% respecto a enero. Considerá hoteles fuera del resort.',
    },
    weeks: [
      {
        weekLabel: 'Sem 1 (1-8)',
        days: [
          { date: 1, dayName: 'Dom', crowdLevel: 2, note: 'Inicio Butterbeer Season Universal' },
          { date: 2, dayName: 'Lun', crowdLevel: 2 },
          { date: 3, dayName: 'Mar', crowdLevel: 2 },
          { date: 4, dayName: 'Mié', crowdLevel: 3, note: 'Inicio Flower & Garden EPCOT' },
          { date: 5, dayName: 'Jue', crowdLevel: 3 },
          { date: 6, dayName: 'Vie', crowdLevel: 3 },
          { date: 7, dayName: 'Sáb', crowdLevel: 3 },
          { date: 8, dayName: 'Dom', crowdLevel: 3 },
        ],
      },
      {
        weekLabel: 'Sem 2 (9-15)',
        days: [
          { date: 9, dayName: 'Lun', crowdLevel: 4 },
          { date: 10, dayName: 'Mar', crowdLevel: 4 },
          { date: 11, dayName: 'Mié', crowdLevel: 4 },
          { date: 12, dayName: 'Jue', crowdLevel: 4 },
          { date: 13, dayName: 'Vie', crowdLevel: 5, note: 'Spring Break comienza' },
          { date: 14, dayName: 'Sáb', crowdLevel: 5 },
          { date: 15, dayName: 'Dom', crowdLevel: 5 },
        ],
      },
      {
        weekLabel: 'Sem 3 (16-22)',
        days: [
          { date: 16, dayName: 'Lun', crowdLevel: 5 },
          { date: 17, dayName: 'Mar', crowdLevel: 5, note: "St. Patrick's Day" },
          { date: 18, dayName: 'Mié', crowdLevel: 5 },
          { date: 19, dayName: 'Jue', crowdLevel: 5 },
          { date: 20, dayName: 'Vie', crowdLevel: 5 },
          { date: 21, dayName: 'Sáb', crowdLevel: 5 },
          { date: 22, dayName: 'Dom', crowdLevel: 5 },
        ],
      },
      {
        weekLabel: 'Sem 4 (23-31)',
        days: [
          { date: 23, dayName: 'Lun', crowdLevel: 4 },
          { date: 24, dayName: 'Mar', crowdLevel: 4 },
          { date: 25, dayName: 'Mié', crowdLevel: 4 },
          { date: 26, dayName: 'Jue', crowdLevel: 3 },
          { date: 27, dayName: 'Vie', crowdLevel: 3 },
          { date: 28, dayName: 'Sáb', crowdLevel: 3 },
          { date: 29, dayName: 'Dom', crowdLevel: 3 },
          { date: 30, dayName: 'Lun', crowdLevel: 2 },
          { date: 31, dayName: 'Mar', crowdLevel: 2 },
        ],
      },
    ],
    topParks: [
      { parkId: 'epcot', reason: 'Flower & Garden desde el 4. Topiarios, jardines y Outdoor Kitchens hacen que la espera valga la pena.' },
      { parkId: 'ak', reason: 'El más manejable en Spring Break. Safaris y Pandora con mejor relación espera/experiencia.' },
      { parkId: 'ioa', reason: 'Mardi Gras termina el 4 de abril. Los desfiles nocturnos son un plus único en Universal.' },
    ],
    mainTip: 'Usá Lightning Lane Multi Pass desde el primer momento del día. En marzo sin estrategia de acceso rápido perdés entre 2 y 3 horas en filas.',
    avoidTip: 'Evitá Magic Kingdom los fines de semana de mid-marzo — es el parque más afectado por Spring Break con filas de hasta 2 horas en atracciones tier 1.',
    events: [
      { name: 'Flower & Garden Festival — EPCOT', park: 'disney', dates: 'Mar 4 – Jun 1', type: 'festival', highlight: true },
      { name: 'Mardi Gras Universal', park: 'universal', dates: 'Feb 7 – Abr 4', type: 'festival', highlight: true },
      { name: 'Butterbeer Season — HP Universal', park: 'universal', dates: 'Mar 1 – May 31', type: 'special', highlight: false },
      { name: 'Princess Half Marathon', park: 'disney', dates: 'Feb 26 – Mar 2', type: 'runDisney', highlight: false },
    ],
  },
  {
    slug: 'abril',
    monthIndex: 3,
    year: 2026,
    crowds: {
      summary: 'Abril es el mes más impredecible del año. La primera quincena puede ser de las más concurridas (Semana Santa, Spring Break tardío) mientras que la segunda quincena se transforma en uno de los mejores momentos para visitar. Todo depende de cuándo cae Pascua.',
      bestWeek: 'Segunda quincena (19-30) — post Spring Break',
      worstWeek: 'Semana de Pascua (variable según año)',
      tip: 'Si podés elegir, la tercera y cuarta semana de abril post-Pascua son oro puro: clima perfecto y multitudes bajas.',
    },
    weather: {
      summary: 'Calor agradable 27-29°C con noches de 17°C. El calor empieza a sentirse pero aún sin la humedad sofocante del verano. Ocasionalmente llueve por la tarde.',
      whatToPack: ['Ropa ligera', 'Protector solar alto SPF', 'Ropa para lluvia ligera', 'Hidratación constante'],
    },
    pricing: {
      summary: 'Temporada alta en Semana Santa, baja inmediatamente después. Gran diferencia de precio entre la primera y segunda quincena.',
      disneyTier: 'Peak Semana Santa / Regular post-Pascua',
      universalTier: 'Peak / Regular',
      tip: 'Mismo hotel puede costar hasta un 50% menos en la tercera semana de abril vs la Semana Santa.',
    },
    weeks: [
      {
        weekLabel: 'Sem 1 (1-5)',
        days: [
          { date: 1, dayName: 'Mié', crowdLevel: 4, note: 'Fin Mardi Gras Universal' },
          { date: 2, dayName: 'Jue', crowdLevel: 4 },
          { date: 3, dayName: 'Vie', crowdLevel: 4 },
          { date: 4, dayName: 'Sáb', crowdLevel: 5, note: 'Semana Santa' },
          { date: 5, dayName: 'Dom', crowdLevel: 5, note: 'Pascua 2026' },
        ],
      },
      {
        weekLabel: 'Sem 2 (6-12)',
        days: [
          { date: 6, dayName: 'Lun', crowdLevel: 4 },
          { date: 7, dayName: 'Mar', crowdLevel: 3 },
          { date: 8, dayName: 'Mié', crowdLevel: 3 },
          { date: 9, dayName: 'Jue', crowdLevel: 3 },
          { date: 10, dayName: 'Vie', crowdLevel: 3 },
          { date: 11, dayName: 'Sáb', crowdLevel: 3 },
          { date: 12, dayName: 'Dom', crowdLevel: 3 },
        ],
      },
      {
        weekLabel: 'Sem 3 (13-19)',
        days: [
          { date: 13, dayName: 'Lun', crowdLevel: 2 },
          { date: 14, dayName: 'Mar', crowdLevel: 2 },
          { date: 15, dayName: 'Mié', crowdLevel: 2 },
          { date: 16, dayName: 'Jue', crowdLevel: 2 },
          { date: 17, dayName: 'Vie', crowdLevel: 2, note: 'Grad Bash Universal' },
          { date: 18, dayName: 'Sáb', crowdLevel: 3, note: 'Grad Bash Universal' },
          { date: 19, dayName: 'Dom', crowdLevel: 2 },
        ],
      },
      {
        weekLabel: 'Sem 4 (20-30)',
        days: [
          { date: 20, dayName: 'Lun', crowdLevel: 2 },
          { date: 21, dayName: 'Mar', crowdLevel: 2 },
          { date: 22, dayName: 'Mié', crowdLevel: 2 },
          { date: 23, dayName: 'Jue', crowdLevel: 2 },
          { date: 24, dayName: 'Vie', crowdLevel: 2, note: 'Grad Bash Universal' },
          { date: 25, dayName: 'Sáb', crowdLevel: 2 },
          { date: 26, dayName: 'Dom', crowdLevel: 2 },
          { date: 27, dayName: 'Lun', crowdLevel: 1 },
          { date: 28, dayName: 'Mar', crowdLevel: 1 },
          { date: 29, dayName: 'Mié', crowdLevel: 1 },
          { date: 30, dayName: 'Jue', crowdLevel: 2, note: 'Grad Bash Universal' },
        ],
      },
    ],
    topParks: [
      { parkId: 'epcot', reason: 'Flower & Garden en pleno auge. La segunda quincena de abril es el momento ideal para disfrutarlo sin multitudes.' },
      { parkId: 'hs', reason: 'Post-Spring Break Hollywood Studios tiene los mejores tiempos de espera para Star Wars y Toy Story Land.' },
      { parkId: 'epic', reason: 'Epic Universe con multitudes manejables post-Pascua. Ideal para explorar los 5 mundos con calma.' },
    ],
    mainTip: 'La segunda quincena de abril post-Pascua es el secreto mejor guardado de todo el año. Clima perfecto, multitudes bajas y Flower & Garden activo.',
    avoidTip: 'No subestimes Semana Santa — es la segunda fecha más concurrida del año después de Navidad. Si caés en esa semana, reservá Lightning Lane con meses de anticipación.',
    events: [
      { name: 'Flower & Garden Festival — EPCOT', park: 'disney', dates: 'Mar 4 – Jun 1', type: 'festival', highlight: true },
      { name: 'Mardi Gras Universal', park: 'universal', dates: 'hasta Abr 4', type: 'festival', highlight: false },
      { name: 'Grad Bash — Universal', park: 'universal', dates: 'Abr 17, 18, 24, 30', type: 'event', highlight: false },
      { name: 'Butterbeer Season — HP', park: 'universal', dates: 'Mar 1 – May 31', type: 'special', highlight: false },
    ],
  },
  {
    slug: 'mayo',
    monthIndex: 4,
    year: 2026,
    crowds: {
      summary: 'Mayo es el "sweet spot" del año para los viajeros inteligentes. Las multitudes caen considerablemente respecto a la primavera y el verano aún no llegó. Las escuelas estadounidenses están en clase, lo que reduce significativamente la afluencia familiar.',
      bestWeek: 'Primera y segunda semana (4-17)',
      worstWeek: 'Memorial Day Weekend (23-25)',
      tip: 'Mayo es ideal para familias con hijos en edad escolar latinoamericanos que tienen vacaciones de invierno en julio-agosto.',
    },
    weather: {
      summary: 'Calor creciente 30-32°C con humedad moderada. Las lluvias vespertinas empiezan a hacerse más frecuentes. Las mañanas son hermosas.',
      whatToPack: ['Ropa técnica transpirable', 'Protector solar SPF 50+', 'Poncho o impermeable ligero', 'Botella de agua con hielo'],
    },
    pricing: {
      summary: 'Tarifas intermedias. Mejores ofertas que marzo-abril pero más cara que enero-febrero. Buena relación precio-experiencia.',
      disneyTier: 'Regular ($$)',
      universalTier: 'Regular ($$)',
      tip: 'Buscá paquetes de hotel+ticket — mayo suele tener promociones de "días gratis" en Disney.',
    },
    weeks: [
      {
        weekLabel: 'Sem 1 (1-3)',
        days: [
          { date: 1, dayName: 'Vie', crowdLevel: 2 },
          { date: 2, dayName: 'Sáb', crowdLevel: 2 },
          { date: 3, dayName: 'Dom', crowdLevel: 2 },
        ],
      },
      {
        weekLabel: 'Sem 2 (4-10)',
        days: [
          { date: 4, dayName: 'Lun', crowdLevel: 2, note: 'Star Wars Day' },
          { date: 5, dayName: 'Mar', crowdLevel: 2 },
          { date: 6, dayName: 'Mié', crowdLevel: 1 },
          { date: 7, dayName: 'Jue', crowdLevel: 1 },
          { date: 8, dayName: 'Vie', crowdLevel: 2 },
          { date: 9, dayName: 'Sáb', crowdLevel: 2 },
          { date: 10, dayName: 'Dom', crowdLevel: 2 },
        ],
      },
      {
        weekLabel: 'Sem 3 (11-17)',
        days: [
          { date: 11, dayName: 'Lun', crowdLevel: 1 },
          { date: 12, dayName: 'Mar', crowdLevel: 1 },
          { date: 13, dayName: 'Mié', crowdLevel: 1 },
          { date: 14, dayName: 'Jue', crowdLevel: 1 },
          { date: 15, dayName: 'Vie', crowdLevel: 2 },
          { date: 16, dayName: 'Sáb', crowdLevel: 2 },
          { date: 17, dayName: 'Dom', crowdLevel: 2 },
        ],
      },
      {
        weekLabel: 'Sem 4 (18-24)',
        days: [
          { date: 18, dayName: 'Lun', crowdLevel: 2 },
          { date: 19, dayName: 'Mar', crowdLevel: 2 },
          { date: 20, dayName: 'Mié', crowdLevel: 2 },
          { date: 21, dayName: 'Jue', crowdLevel: 2 },
          { date: 22, dayName: 'Vie', crowdLevel: 3, note: '1er aniv. Epic Universe' },
          { date: 23, dayName: 'Sáb', crowdLevel: 4, note: 'Memorial Day Weekend' },
          { date: 24, dayName: 'Dom', crowdLevel: 4 },
        ],
      },
      {
        weekLabel: 'Sem 5 (25-31)',
        days: [
          { date: 25, dayName: 'Lun', crowdLevel: 4, note: 'Memorial Day' },
          { date: 26, dayName: 'Mar', crowdLevel: 3, note: 'Abren ambos Water Parks Disney' },
          { date: 27, dayName: 'Mié', crowdLevel: 2 },
          { date: 28, dayName: 'Jue', crowdLevel: 2 },
          { date: 29, dayName: 'Vie', crowdLevel: 2 },
          { date: 30, dayName: 'Sáb', crowdLevel: 3 },
          { date: 31, dayName: 'Dom', crowdLevel: 2 },
        ],
      },
    ],
    topParks: [
      { parkId: 'mk', reason: 'Mayo es uno de los mejores meses para Magic Kingdom. Filas cortas y el clima aún no sofoca.' },
      { parkId: 'epcot', reason: 'Flower & Garden hasta el 1 de junio. Los Outdoor Kitchens tienen la mejor relación calidad-precio del año.' },
      { parkId: 'epic', reason: 'Primer aniversario de Epic Universe el 22 de mayo. Ambiente especial pero multitudes moderadas.' },
    ],
    mainTip: 'Aprovechá las mañanas en los parques y retirate al hotel al mediodía cuando el calor pega más fuerte. Volvé al atardecer para los shows nocturnos.',
    avoidTip: 'El Memorial Day Weekend (23-25 mayo) es una trampa — las multitudes se disparan inesperadamente. Si podés, evitá esos 3 días.',
    events: [
      { name: 'Flower & Garden Festival — EPCOT', park: 'disney', dates: 'hasta Jun 1', type: 'festival', highlight: true },
      { name: 'Butterbeer Season — HP', park: 'universal', dates: 'Mar 1 – May 31', type: 'special', highlight: false },
      { name: "Soarin' Across America — EPCOT", park: 'disney', dates: 'desde Memorial Day', type: 'special', highlight: true },
      { name: 'Water Parks Disney (ambos)', park: 'disney', dates: 'May 26 – Sep 8', type: 'special', highlight: false },
    ],
  },
  {
    slug: 'junio',
    monthIndex: 5,
    year: 2026,
    crowds: {
      summary: 'Junio marca el inicio del verano y con él, el aumento sostenido de multitudes. Las escuelas terminan en EEUU durante este mes, lo que dispara la afluencia familiar semana a semana. La primera semana aún es razonable; la última ya es verano pleno.',
      bestWeek: 'Primera semana (1-7) — último respiro antes del verano',
      worstWeek: 'Última semana (22-30) — verano pleno con familias estadounidenses',
      tip: 'Si viajás en junio, priorizá el rope drop y retírate al mediodía. El calor húmedo de junio es físicamente agotador.',
    },
    weather: {
      summary: 'Calor húmedo intenso 32-33°C con sensación térmica de 38-40°C. Lluvias casi diarias por la tarde entre las 15 y las 17hs. Las mañanas son las mejores horas del día.',
      whatToPack: ['Ropa técnica transpirable', 'Poncho impermeable', 'Fan personal', 'Protector solar SPF 50+', 'Mucha hidratación'],
    },
    pricing: {
      summary: 'Temporada alta de verano. Los precios suben significativamente respecto a mayo. Los hoteles Deluxe de Disney tienen mejor precio relativo que en otras épocas.',
      disneyTier: 'Summer ($$$$)',
      universalTier: 'Peak ($$$)',
      tip: 'En hoteles Deluxe Disney, el verano es paradójicamente más barato que la temporada regular. Considerá upgradear.',
    },
    weeks: [
      {
        weekLabel: 'Sem 1 (1-7)',
        days: [
          { date: 1, dayName: 'Lun', crowdLevel: 2, note: 'Fin Flower & Garden EPCOT' },
          { date: 2, dayName: 'Mar', crowdLevel: 2 },
          { date: 3, dayName: 'Mié', crowdLevel: 2 },
          { date: 4, dayName: 'Jue', crowdLevel: 2 },
          { date: 5, dayName: 'Vie', crowdLevel: 3 },
          { date: 6, dayName: 'Sáb', crowdLevel: 3 },
          { date: 7, dayName: 'Dom', crowdLevel: 3 },
        ],
      },
      {
        weekLabel: 'Sem 2 (8-14)',
        days: [
          { date: 8, dayName: 'Lun', crowdLevel: 3 },
          { date: 9, dayName: 'Mar', crowdLevel: 3 },
          { date: 10, dayName: 'Mié', crowdLevel: 3 },
          { date: 11, dayName: 'Jue', crowdLevel: 3 },
          { date: 12, dayName: 'Vie', crowdLevel: 3 },
          { date: 13, dayName: 'Sáb', crowdLevel: 4 },
          { date: 14, dayName: 'Dom', crowdLevel: 3 },
        ],
      },
      {
        weekLabel: 'Sem 3 (15-21)',
        days: [
          { date: 15, dayName: 'Lun', crowdLevel: 3 },
          { date: 16, dayName: 'Mar', crowdLevel: 3 },
          { date: 17, dayName: 'Mié', crowdLevel: 4 },
          { date: 18, dayName: 'Jue', crowdLevel: 4 },
          { date: 19, dayName: 'Vie', crowdLevel: 4 },
          { date: 20, dayName: 'Sáb', crowdLevel: 4 },
          { date: 21, dayName: 'Dom', crowdLevel: 4 },
        ],
      },
      {
        weekLabel: 'Sem 4 (22-30)',
        days: [
          { date: 22, dayName: 'Lun', crowdLevel: 4 },
          { date: 23, dayName: 'Mar', crowdLevel: 4 },
          { date: 24, dayName: 'Mié', crowdLevel: 4 },
          { date: 25, dayName: 'Jue', crowdLevel: 4 },
          { date: 26, dayName: 'Vie', crowdLevel: 4 },
          { date: 27, dayName: 'Sáb', crowdLevel: 5 },
          { date: 28, dayName: 'Dom', crowdLevel: 4 },
          { date: 29, dayName: 'Lun', crowdLevel: 4 },
          { date: 30, dayName: 'Mar', crowdLevel: 4 },
        ],
      },
    ],
    topParks: [
      { parkId: 'hs', reason: 'Hollywood Studios tiene los mejores shows nocturnos del verano. Fantasmic! en el calor de junio es una experiencia única.' },
      { parkId: 'volcano', reason: 'Volcano Bay en junio es imprescindible. El calor justifica plenamente un día de parque acuático.' },
      { parkId: 'ak', reason: 'Animal Kingdom cierra más temprano en verano — llegá al rope drop para los safaris con luz de mañana.' },
    ],
    mainTip: 'Estrategia siesta: llegá al parque a las 8am, salí al mediodía, descansá en el hotel con pileta, volvé a las 5pm para la tarde-noche. Es la única forma de sobrevivir el verano de Orlando.',
    avoidTip: 'Nunca planifiques junio sin Lightning Lane. Sin acceso prioritario, junio puede costar 4-5 horas de espera en atracciones tier 1.',
    events: [
      { name: 'Flower & Garden Festival — Últimos días', park: 'disney', dates: 'hasta Jun 1', type: 'festival', highlight: false },
      { name: 'Water Parks Disney (ambos abiertos)', park: 'disney', dates: 'May 26 – Sep 8', type: 'special', highlight: true },
      { name: 'Disney After Hours — Hollywood Studios', park: 'disney', dates: 'select nights', type: 'special', highlight: false },
    ],
  },
  {
    slug: 'julio',
    monthIndex: 6,
    year: 2026,
    crowds: {
      summary: 'Julio es el mes de mayor densidad del año. El 4 de julio y su fin de semana largo es la tercera fecha más concurrida del año después de Navidad y Semana Santa. Todo el mes mantiene multitudes extremas. No hay semana tranquila en julio.',
      bestWeek: 'Segunda y tercera semana (post 4 de julio)',
      worstWeek: '4 de julio y su fin de semana (2-5)',
      tip: 'En julio la estrategia siesta no es opcional, es supervivencia. El calor supera los 37°C con sensación térmica.',
    },
    weather: {
      summary: 'El mes más caluroso del año. 33-34°C de día con sensación térmica de 38-40°C. Lluvia casi garantizada cada tarde. 14 horas de sol. Mucho, mucho calor.',
      whatToPack: ['Ropa técnica transpirable (cambia 2 veces/día)', 'Poncho impermeable', 'Fan personal', 'Protector solar SPF 50+', 'Sales de rehidratación'],
    },
    pricing: {
      summary: 'Precios de temporada alta. Los hoteles Deluxe Disney son paradójicamente más baratos en verano — buena oportunidad para el lujo.',
      disneyTier: 'Summer ($$$$)',
      universalTier: 'Peak ($$$)',
      tip: 'Mirá específicamente los hoteles Deluxe Disney — en verano pueden costar lo mismo que un Moderate. Es la anomalía tarifaria de Disney.',
    },
    weeks: [
      {
        weekLabel: 'Sem 1 (1-5)',
        days: [
          { date: 1, dayName: 'Mié', crowdLevel: 4 },
          { date: 2, dayName: 'Jue', crowdLevel: 5 },
          { date: 3, dayName: 'Vie', crowdLevel: 5 },
          { date: 4, dayName: 'Sáb', crowdLevel: 5, note: '4th of July' },
          { date: 5, dayName: 'Dom', crowdLevel: 5 },
        ],
      },
      {
        weekLabel: 'Sem 2 (6-12)',
        days: [
          { date: 6, dayName: 'Lun', crowdLevel: 4 },
          { date: 7, dayName: 'Mar', crowdLevel: 4 },
          { date: 8, dayName: 'Mié', crowdLevel: 4 },
          { date: 9, dayName: 'Jue', crowdLevel: 4 },
          { date: 10, dayName: 'Vie', crowdLevel: 4 },
          { date: 11, dayName: 'Sáb', crowdLevel: 5 },
          { date: 12, dayName: 'Dom', crowdLevel: 4 },
        ],
      },
      {
        weekLabel: 'Sem 3 (13-19)',
        days: [
          { date: 13, dayName: 'Lun', crowdLevel: 4 },
          { date: 14, dayName: 'Mar', crowdLevel: 4 },
          { date: 15, dayName: 'Mié', crowdLevel: 4 },
          { date: 16, dayName: 'Jue', crowdLevel: 4 },
          { date: 17, dayName: 'Vie', crowdLevel: 4 },
          { date: 18, dayName: 'Sáb', crowdLevel: 5 },
          { date: 19, dayName: 'Dom', crowdLevel: 4 },
        ],
      },
      {
        weekLabel: 'Sem 4 (20-31)',
        days: [
          { date: 20, dayName: 'Lun', crowdLevel: 4 },
          { date: 21, dayName: 'Mar', crowdLevel: 3 },
          { date: 22, dayName: 'Mié', crowdLevel: 3 },
          { date: 23, dayName: 'Jue', crowdLevel: 3 },
          { date: 24, dayName: 'Vie', crowdLevel: 4 },
          { date: 25, dayName: 'Sáb', crowdLevel: 4 },
          { date: 26, dayName: 'Dom', crowdLevel: 4 },
          { date: 27, dayName: 'Lun', crowdLevel: 3 },
          { date: 28, dayName: 'Mar', crowdLevel: 3 },
          { date: 29, dayName: 'Mié', crowdLevel: 3 },
          { date: 30, dayName: 'Jue', crowdLevel: 3 },
          { date: 31, dayName: 'Vie', crowdLevel: 4 },
        ],
      },
    ],
    topParks: [
      { parkId: 'volcano', reason: 'En julio Volcano Bay es casi obligatorio. Un día entero de agua es la mejor decisión que podés tomar.' },
      { parkId: 'mk', reason: "Magic Kingdom de noche en julio es mágico — el calor baja y los fuegos artificiales del 4 de julio son únicos." },
      { parkId: 'hs', reason: "Hollywood Studios tiene las mejores experiencias indoor en verano. Star Wars Galaxy's Edge funciona perfectamente con calor." },
    ],
    mainTip: 'La única estrategia válida para julio: rope drop → 4 atracciones → hotel al mediodía → piscina → parque a las 5pm → shows nocturnos. Sin esto, julio es agotador.',
    avoidTip: 'El 4 de julio es el día con más gente del verano. Si estás en Orlando ese día, considerá Typhoon Lagoon o Volcano Bay en lugar de los parques temáticos.',
    events: [
      { name: '4th of July — Fuegos artificiales MK', park: 'disney', dates: '4 Jul', type: 'special', highlight: true },
      { name: 'Water Parks Disney (ambos)', park: 'disney', dates: 'hasta Sep 8', type: 'special', highlight: false },
      { name: 'Disney After Hours — Hollywood Studios', park: 'disney', dates: 'hasta Jul 27', type: 'special', highlight: false },
    ],
  },
  {
    slug: 'agosto',
    monthIndex: 7,
    year: 2026,
    crowds: {
      summary: 'Agosto es intenso en la primera mitad pero mejora notablemente hacia el final. Las escuelas estadounidenses empiezan a volver a clases entre el 10 y el 20 de agosto, lo que reduce las multitudes visiblemente. La segunda quincena es la más recomendable del verano.',
      bestWeek: 'Última semana (24-31) — escuelas vueltas, multitudes bajan',
      worstWeek: 'Primera semana (1-9) — verano pleno',
      tip: 'Agosto 28 arranca Halloween Horror Nights en Universal — si te gusta el género de terror, es el mejor momento para combinar parques.',
    },
    weather: {
      summary: '31-32°C con humedad máxima. Lluvias casi diarias. Similar a julio pero con una ligera mejora al final del mes cuando el calor empieza a ceder.',
      whatToPack: ['Ropa técnica transpirable', 'Poncho', 'Fan personal', 'Protector solar SPF 50+'],
    },
    pricing: {
      summary: 'Temporada alta en la primera quincena, baja rápidamente hacia fin de mes. Buena oportunidad de encontrar tarifas más razonables en la tercera semana.',
      disneyTier: 'Summer → Regular ($$$  → $$)',
      universalTier: 'Peak → Regular',
      tip: 'La tercera semana de agosto tiene una de las mejores relaciones precio-multitud del año en Disney.',
    },
    weeks: [
      {
        weekLabel: 'Sem 1 (1-9)',
        days: [
          { date: 1, dayName: 'Sáb', crowdLevel: 4, note: 'Back to Hogwarts Universal' },
          { date: 2, dayName: 'Dom', crowdLevel: 4 },
          { date: 3, dayName: 'Lun', crowdLevel: 4 },
          { date: 4, dayName: 'Mar', crowdLevel: 4 },
          { date: 5, dayName: 'Mié', crowdLevel: 4 },
          { date: 6, dayName: 'Jue', crowdLevel: 4 },
          { date: 7, dayName: 'Vie', crowdLevel: 4 },
          { date: 8, dayName: 'Sáb', crowdLevel: 5 },
          { date: 9, dayName: 'Dom', crowdLevel: 4 },
        ],
      },
      {
        weekLabel: 'Sem 2 (10-16)',
        days: [
          { date: 10, dayName: 'Lun', crowdLevel: 3 },
          { date: 11, dayName: 'Mar', crowdLevel: 3 },
          { date: 12, dayName: 'Mié', crowdLevel: 3 },
          { date: 13, dayName: 'Jue', crowdLevel: 3 },
          { date: 14, dayName: 'Vie', crowdLevel: 3 },
          { date: 15, dayName: 'Sáb', crowdLevel: 4, note: 'Passholder Days Universal' },
          { date: 16, dayName: 'Dom', crowdLevel: 3 },
        ],
      },
      {
        weekLabel: 'Sem 3 (17-23)',
        days: [
          { date: 17, dayName: 'Lun', crowdLevel: 3 },
          { date: 18, dayName: 'Mar', crowdLevel: 2 },
          { date: 19, dayName: 'Mié', crowdLevel: 2 },
          { date: 20, dayName: 'Jue', crowdLevel: 2 },
          { date: 21, dayName: 'Vie', crowdLevel: 3 },
          { date: 22, dayName: 'Sáb', crowdLevel: 3 },
          { date: 23, dayName: 'Dom', crowdLevel: 2 },
        ],
      },
      {
        weekLabel: 'Sem 4 (24-31)',
        days: [
          { date: 24, dayName: 'Lun', crowdLevel: 2 },
          { date: 25, dayName: 'Mar', crowdLevel: 2 },
          { date: 26, dayName: 'Mié', crowdLevel: 2 },
          { date: 27, dayName: 'Jue', crowdLevel: 2 },
          { date: 28, dayName: 'Vie', crowdLevel: 3, note: 'Halloween Horror Nights arranca' },
          { date: 29, dayName: 'Sáb', crowdLevel: 3, note: 'HHN + MNSSHP season' },
          { date: 30, dayName: 'Dom', crowdLevel: 2 },
          { date: 31, dayName: 'Lun', crowdLevel: 2 },
        ],
      },
    ],
    topParks: [
      { parkId: 'mk', reason: "Mickey's Not So Scary Halloween Party arranca en agosto. Las noches de fiesta en Magic Kingdom son únicas." },
      { parkId: 'us', reason: 'Halloween Horror Nights 35 comienza el 28. Si te gusta el terror, es la mejor experiencia de entretenimiento adulto del año.' },
      { parkId: 'epcot', reason: 'Food & Wine Festival arranca a fin de agosto. La mejor gastronomía del año en los parques.' },
    ],
    mainTip: 'La tercera semana de agosto (17-23) es la joya escondida del verano: multitudes moderadas, precio razonable y la temporada Halloween ya empezando.',
    avoidTip: 'Los fines de semana de la primera quincena de agosto son los peores del verano. Las familias aprovechan los últimos días antes de volver a clases.',
    events: [
      { name: 'Back to Hogwarts — Universal', park: 'universal', dates: 'Ago 1 – Sep 1', type: 'special', highlight: true },
      { name: 'EPCOT Food & Wine Festival', park: 'disney', dates: 'desde ~Ago 28', type: 'festival', highlight: true },
      { name: 'MNSSHP — Magic Kingdom', park: 'disney', dates: 'select nights Ago-Oct', type: 'event', highlight: true },
      { name: 'Halloween Horror Nights 35', park: 'universal', dates: 'Ago 28 – Nov 1', type: 'event', highlight: true },
      { name: 'Passholder Days — Universal', park: 'universal', dates: 'Ago 15 – Sep 30', type: 'special', highlight: false },
    ],
  },
  {
    slug: 'septiembre',
    monthIndex: 8,
    year: 2026,
    crowds: {
      summary: 'Septiembre es la temporada baja más real del año. Las escuelas en clase, sin feriados importantes y clima aún caluroso generan la combinación perfecta de multitudes bajas. Es el mes preferido de los entendidos.',
      bestWeek: 'Segunda y tercera semana (7-20)',
      worstWeek: 'Labor Day Weekend (5-7)',
      tip: 'Septiembre tiene la mejor relación experiencia-precio-multitudes de todo el año. El secreto que los viajeros expertos no comparten.',
    },
    weather: {
      summary: '30-31°C con humedad alta pero en descenso. Las lluvias vespertinas siguen siendo frecuentes pero menos intensas que julio-agosto. El calor empieza a ceder a fin de mes.',
      whatToPack: ['Ropa transpirable', 'Poncho liviano', 'Protector solar', 'Ropa de secado rápido'],
    },
    pricing: {
      summary: 'Temporada baja real. Hoteles, tickets y paquetes alcanzan sus mejores precios del segundo semestre del año.',
      disneyTier: 'Fall / Regular ($$)',
      universalTier: 'Regular ($$)',
      tip: 'Los paquetes de septiembre pueden ser hasta un 30% más baratos que agosto. Vale la pena comparar semana a semana.',
    },
    weeks: [
      {
        weekLabel: 'Sem 1 (1-6)',
        days: [
          { date: 1, dayName: 'Mar', crowdLevel: 2, note: 'Fin Back to Hogwarts Universal' },
          { date: 2, dayName: 'Mié', crowdLevel: 2 },
          { date: 3, dayName: 'Jue', crowdLevel: 2 },
          { date: 4, dayName: 'Vie', crowdLevel: 3 },
          { date: 5, dayName: 'Sáb', crowdLevel: 4, note: 'Labor Day Weekend' },
          { date: 6, dayName: 'Dom', crowdLevel: 4 },
        ],
      },
      {
        weekLabel: 'Sem 2 (7-13)',
        days: [
          { date: 7, dayName: 'Lun', crowdLevel: 3, note: 'Labor Day' },
          { date: 8, dayName: 'Mar', crowdLevel: 1, note: 'Fin Water Parks Disney' },
          { date: 9, dayName: 'Mié', crowdLevel: 1 },
          { date: 10, dayName: 'Jue', crowdLevel: 1 },
          { date: 11, dayName: 'Vie', crowdLevel: 2 },
          { date: 12, dayName: 'Sáb', crowdLevel: 2 },
          { date: 13, dayName: 'Dom', crowdLevel: 2 },
        ],
      },
      {
        weekLabel: 'Sem 3 (14-20)',
        days: [
          { date: 14, dayName: 'Lun', crowdLevel: 1 },
          { date: 15, dayName: 'Mar', crowdLevel: 1 },
          { date: 16, dayName: 'Mié', crowdLevel: 1 },
          { date: 17, dayName: 'Jue', crowdLevel: 1 },
          { date: 18, dayName: 'Vie', crowdLevel: 2 },
          { date: 19, dayName: 'Sáb', crowdLevel: 2 },
          { date: 20, dayName: 'Dom', crowdLevel: 2 },
        ],
      },
      {
        weekLabel: 'Sem 4 (21-30)',
        days: [
          { date: 21, dayName: 'Lun', crowdLevel: 1 },
          { date: 22, dayName: 'Mar', crowdLevel: 1 },
          { date: 23, dayName: 'Mié', crowdLevel: 1 },
          { date: 24, dayName: 'Jue', crowdLevel: 1 },
          { date: 25, dayName: 'Vie', crowdLevel: 2 },
          { date: 26, dayName: 'Sáb', crowdLevel: 2 },
          { date: 27, dayName: 'Dom', crowdLevel: 2 },
          { date: 28, dayName: 'Lun', crowdLevel: 1 },
          { date: 29, dayName: 'Mar', crowdLevel: 1 },
          { date: 30, dayName: 'Mié', crowdLevel: 1, note: 'Fin Passholder Days Universal' },
        ],
      },
    ],
    topParks: [
      { parkId: 'mk', reason: 'Magic Kingdom en septiembre con multitudes nivel 1-2 es una experiencia transformadora. Podés hacer todo el parque en un día.' },
      { parkId: 'us', reason: 'Halloween Horror Nights en septiembre tiene las mejores noches del evento — menos gente, más terror.' },
      { parkId: 'epcot', reason: 'Food & Wine Festival activo. Multitudes bajas + gastronomía mundial = combinación perfecta.' },
    ],
    mainTip: 'En septiembre podés hacer dos parques Disney en un día sin Lightning Lane. Es el único momento del año donde esto es realista.',
    avoidTip: 'El Labor Day Weekend (5-7 Sep) es la única trampa del mes. Evitá esos tres días y tenés septiembre libre.',
    events: [
      { name: 'EPCOT Food & Wine Festival', park: 'disney', dates: 'Ago-Nov', type: 'festival', highlight: true },
      { name: 'MNSSHP — Magic Kingdom', park: 'disney', dates: 'select nights', type: 'event', highlight: true },
      { name: 'Halloween Horror Nights 35', park: 'universal', dates: 'Ago 28 – Nov 1', type: 'event', highlight: true },
      { name: 'Passholder Days — Universal', park: 'universal', dates: 'hasta Sep 30', type: 'special', highlight: false },
    ],
  },
  {
    slug: 'octubre',
    monthIndex: 9,
    year: 2026,
    crowds: {
      summary: 'Octubre es el mes del Halloween. Las multitudes son moderadas-altas por los eventos de temporada pero manejables en días de semana. Los fines de semana de MNSSHP y HHN generan picos importantes. La energía del mes es única.',
      bestWeek: 'Segunda semana (5-11) — días de semana',
      worstWeek: 'Último fin de semana de octubre (Halloween)',
      tip: 'Los martes y miércoles de octubre son los días más tranquilos. Los fines de semana con eventos de Halloween son los más concurridos.',
    },
    weather: {
      summary: 'El clima empieza a mejorar notablemente. 28-30°C de día con noches de 18-20°C. Las lluvias disminuyen considerablemente. Es uno de los meses más agradables.',
      whatToPack: ['Ropa ligera de día', 'Campera para la noche', 'Disfraz si asistís a eventos Halloween'],
    },
    pricing: {
      summary: 'Temporada media. Precios moderados con picos en fines de semana de Halloween. Los días de semana ofrecen buena relación precio-experiencia.',
      disneyTier: 'Fall / Regular ($$)',
      universalTier: 'Regular / Peak',
      tip: 'Combiná días de semana con un fin de semana de evento Halloween para la mejor relación precio-experiencia.',
    },
    weeks: [
      {
        weekLabel: 'Sem 1 (1-4)',
        days: [
          { date: 1, dayName: 'Jue', crowdLevel: 2 },
          { date: 2, dayName: 'Vie', crowdLevel: 3 },
          { date: 3, dayName: 'Sáb', crowdLevel: 4, note: 'MNSSHP / HHN' },
          { date: 4, dayName: 'Dom', crowdLevel: 3 },
        ],
      },
      {
        weekLabel: 'Sem 2 (5-11)',
        days: [
          { date: 5, dayName: 'Lun', crowdLevel: 2 },
          { date: 6, dayName: 'Mar', crowdLevel: 2 },
          { date: 7, dayName: 'Mié', crowdLevel: 2 },
          { date: 8, dayName: 'Jue', crowdLevel: 2 },
          { date: 9, dayName: 'Vie', crowdLevel: 3 },
          { date: 10, dayName: 'Sáb', crowdLevel: 4, note: 'MNSSHP / HHN' },
          { date: 11, dayName: 'Dom', crowdLevel: 3 },
        ],
      },
      {
        weekLabel: 'Sem 3 (12-18)',
        days: [
          { date: 12, dayName: 'Lun', crowdLevel: 2 },
          { date: 13, dayName: 'Mar', crowdLevel: 2 },
          { date: 14, dayName: 'Mié', crowdLevel: 2 },
          { date: 15, dayName: 'Jue', crowdLevel: 2 },
          { date: 16, dayName: 'Vie', crowdLevel: 3 },
          { date: 17, dayName: 'Sáb', crowdLevel: 4, note: 'MNSSHP / HHN' },
          { date: 18, dayName: 'Dom', crowdLevel: 3 },
        ],
      },
      {
        weekLabel: 'Sem 4 (19-31)',
        days: [
          { date: 19, dayName: 'Lun', crowdLevel: 2 },
          { date: 20, dayName: 'Mar', crowdLevel: 2 },
          { date: 21, dayName: 'Mié', crowdLevel: 2 },
          { date: 22, dayName: 'Jue', crowdLevel: 3 },
          { date: 23, dayName: 'Vie', crowdLevel: 3 },
          { date: 24, dayName: 'Sáb', crowdLevel: 4, note: 'MNSSHP / HHN' },
          { date: 25, dayName: 'Dom', crowdLevel: 3 },
          { date: 26, dayName: 'Lun', crowdLevel: 3 },
          { date: 27, dayName: 'Mar', crowdLevel: 3 },
          { date: 28, dayName: 'Mié', crowdLevel: 3 },
          { date: 29, dayName: 'Jue', crowdLevel: 4 },
          { date: 30, dayName: 'Vie', crowdLevel: 4, note: 'Víspera Halloween' },
          { date: 31, dayName: 'Sáb', crowdLevel: 5, note: 'Halloween — Último MNSSHP/HHN' },
        ],
      },
    ],
    topParks: [
      { parkId: 'mk', reason: 'MNSSHP es la experiencia Halloween más mágica que existe. Vale cada centavo del ticket separado.' },
      { parkId: 'us', reason: 'Halloween Horror Nights 35 en octubre está en su mejor momento. Las casas embrujadas son de nivel cinematográfico.' },
      { parkId: 'epcot', reason: 'Food & Wine en pleno auge + decoración Halloween. EPCOT en octubre es irresistible.' },
    ],
    mainTip: 'Comprá tickets de MNSSHP o HHN con anticipación — se agotan. El horario regular del parque + evento de noche es la combinación perfecta para un día completo.',
    avoidTip: 'El 31 de octubre tiene el precio más alto del año para MNSSHP y HHN. Si el presupuesto importa, elegí una fecha de semana a principios de octubre.',
    events: [
      { name: 'MNSSHP — Magic Kingdom', park: 'disney', dates: 'select nights hasta Oct 31', type: 'event', highlight: true },
      { name: 'Halloween Horror Nights 35', park: 'universal', dates: 'hasta Nov 1', type: 'event', highlight: true },
      { name: 'EPCOT Food & Wine Festival', park: 'disney', dates: 'hasta ~Nov 22', type: 'festival', highlight: true },
    ],
  },
  {
    slug: 'noviembre',
    monthIndex: 10,
    year: 2026,
    crowds: {
      summary: 'Noviembre tiene una dualidad marcada: la primera quincena es de las más tranquilas del año, mientras que Thanksgiving (última semana) es una de las más concurridas. Son prácticamente dos meses distintos.',
      bestWeek: 'Primera y segunda semana (2-15)',
      worstWeek: 'Thanksgiving Week (22-29)',
      tip: 'Si podés elegir, la primera quincena de noviembre es uno de los mejores momentos del año: clima perfecto, multitudes bajas y Christmas ya arrancando.',
    },
    weather: {
      summary: 'Clima ideal. 25-27°C de día, noches de 15-18°C. Sin lluvias significativas. Es el comienzo del mejor período climático del año.',
      whatToPack: ['Ropa cómoda de día', 'Campera o sweater para la noche', 'Capas para la madrugada'],
    },
    pricing: {
      summary: 'Tarifas bajas en la primera quincena, se disparan en Thanksgiving. Gran diferencia entre ambas mitades del mes.',
      disneyTier: 'Fall Regular ($$) → Peak Thanksgiving ($$$$$)',
      universalTier: 'Regular → Peak',
      tip: 'Thanksgiving Week en Disney puede costar hasta 3 veces más que la primera semana de noviembre.',
    },
    weeks: [
      {
        weekLabel: 'Sem 1 (1-8)',
        days: [
          { date: 1, dayName: 'Dom', crowdLevel: 3, note: 'Fin HHN 35' },
          { date: 2, dayName: 'Lun', crowdLevel: 2 },
          { date: 3, dayName: 'Mar', crowdLevel: 2 },
          { date: 4, dayName: 'Mié', crowdLevel: 2 },
          { date: 5, dayName: 'Jue', crowdLevel: 2 },
          { date: 6, dayName: 'Vie', crowdLevel: 2 },
          { date: 7, dayName: 'Sáb', crowdLevel: 2 },
          { date: 8, dayName: 'Dom', crowdLevel: 2 },
        ],
      },
      {
        weekLabel: 'Sem 2 (9-15)',
        days: [
          { date: 9, dayName: 'Lun', crowdLevel: 2 },
          { date: 10, dayName: 'Mar', crowdLevel: 2 },
          { date: 11, dayName: 'Mié', crowdLevel: 2 },
          { date: 12, dayName: 'Jue', crowdLevel: 2 },
          { date: 13, dayName: 'Vie', crowdLevel: 2 },
          { date: 14, dayName: 'Sáb', crowdLevel: 3, note: 'Inicio Holidays Universal' },
          { date: 15, dayName: 'Dom', crowdLevel: 2 },
        ],
      },
      {
        weekLabel: 'Sem 3 (16-22)',
        days: [
          { date: 16, dayName: 'Lun', crowdLevel: 2 },
          { date: 17, dayName: 'Mar', crowdLevel: 2 },
          { date: 18, dayName: 'Mié', crowdLevel: 2 },
          { date: 19, dayName: 'Jue', crowdLevel: 2 },
          { date: 20, dayName: 'Vie', crowdLevel: 3 },
          { date: 21, dayName: 'Sáb', crowdLevel: 3 },
          { date: 22, dayName: 'Dom', crowdLevel: 3, note: 'Fin EPCOT Food & Wine' },
        ],
      },
      {
        weekLabel: 'Sem 4 (23-30)',
        days: [
          { date: 23, dayName: 'Lun', crowdLevel: 4 },
          { date: 24, dayName: 'Mar', crowdLevel: 4 },
          { date: 25, dayName: 'Mié', crowdLevel: 5, note: 'Víspera Thanksgiving' },
          { date: 26, dayName: 'Jue', crowdLevel: 5, note: 'Thanksgiving Day' },
          { date: 27, dayName: 'Vie', crowdLevel: 5 },
          { date: 28, dayName: 'Sáb', crowdLevel: 5, note: 'Inicio Festival Holidays EPCOT' },
          { date: 29, dayName: 'Dom', crowdLevel: 5 },
          { date: 30, dayName: 'Lun', crowdLevel: 4 },
        ],
      },
    ],
    topParks: [
      { parkId: 'mk', reason: "Mickey's Very Merry Christmas Party arranca en noviembre. Decoración navideña + menos gente = la mejor combinación." },
      { parkId: 'epcot', reason: 'Festival of Holidays desde el 27. Las tradiciones de 40+ países alrededor del World Showcase son únicas.' },
      { parkId: 'us', reason: 'Holidays at Universal arranca el 14. Grinchmas y Wizarding World navideño en su máximo esplendor.' },
    ],
    mainTip: 'La primera quincena de noviembre es probablemente el mejor momento del año para familias con niños pequeños: clima perfecto, multitudes bajas, decoración navideña empezando.',
    avoidTip: 'Thanksgiving Week es una de las tres peores semanas del año. Si no tenés opción, Lightning Lane es indispensable y reservá restaurantes con 2-3 meses de anticipación.',
    events: [
      { name: 'EPCOT Food & Wine — Últimos días', park: 'disney', dates: 'hasta ~Nov 22', type: 'festival', highlight: false },
      { name: 'EPCOT Festival of Holidays', park: 'disney', dates: 'Nov 27 – Dic 30', type: 'festival', highlight: true },
      { name: "Mickey's Very Merry Christmas Party", park: 'disney', dates: 'select nights Nov-Dic', type: 'event', highlight: true },
      { name: 'Holidays at Universal', park: 'universal', dates: 'Nov 14 – Ene 3, 2027', type: 'event', highlight: true },
    ],
  },
  {
    slug: 'diciembre',
    monthIndex: 11,
    year: 2026,
    crowds: {
      summary: 'Diciembre tiene la mayor brecha del año: la primera quincena es tranquila y navideña, la segunda es el período más concurrido del año. Navidad y Año Nuevo superan a cualquier otro momento en multitudes y precios.',
      bestWeek: 'Primera y segunda semana (1-18)',
      worstWeek: 'Navidad-Año Nuevo (19-31)',
      tip: 'Si viajás en diciembre, hacelo antes del 19. La magia navideña está igual de presente con 1/4 de las multitudes.',
    },
    weather: {
      summary: 'Clima perfecto 22-24°C de día, noches de 12-15°C. Sin lluvia. Es el mejor clima del año junto con enero-febrero.',
      whatToPack: ['Ropa cómoda de día', 'Campera o abrigo para la noche', 'Ropa de capas para la madrugada'],
    },
    pricing: {
      summary: 'La mayor diferencia del año: tarifas regulares hasta el 18, y luego las más altas del año en la última quincena.',
      disneyTier: 'Regular → Holiday ($$$$$$)',
      universalTier: 'Regular → Holiday ($$$$$)',
      tip: 'La semana del 22-29 de diciembre es la más cara del año en todos los hoteles de Orlando. Reservá con 6-12 meses de anticipación.',
    },
    weeks: [
      {
        weekLabel: 'Sem 1 (1-6)',
        days: [
          { date: 1, dayName: 'Mar', crowdLevel: 2 },
          { date: 2, dayName: 'Mié', crowdLevel: 2 },
          { date: 3, dayName: 'Jue', crowdLevel: 2 },
          { date: 4, dayName: 'Vie', crowdLevel: 2 },
          { date: 5, dayName: 'Sáb', crowdLevel: 3 },
          { date: 6, dayName: 'Dom', crowdLevel: 2 },
        ],
      },
      {
        weekLabel: 'Sem 2 (7-13)',
        days: [
          { date: 7, dayName: 'Lun', crowdLevel: 2 },
          { date: 8, dayName: 'Mar', crowdLevel: 2 },
          { date: 9, dayName: 'Mié', crowdLevel: 2 },
          { date: 10, dayName: 'Jue', crowdLevel: 2 },
          { date: 11, dayName: 'Vie', crowdLevel: 2 },
          { date: 12, dayName: 'Sáb', crowdLevel: 3 },
          { date: 13, dayName: 'Dom', crowdLevel: 2 },
        ],
      },
      {
        weekLabel: 'Sem 3 (14-20)',
        days: [
          { date: 14, dayName: 'Lun', crowdLevel: 2 },
          { date: 15, dayName: 'Mar', crowdLevel: 2 },
          { date: 16, dayName: 'Mié', crowdLevel: 3 },
          { date: 17, dayName: 'Jue', crowdLevel: 3 },
          { date: 18, dayName: 'Vie', crowdLevel: 4, note: 'Escuelas salen de vacaciones' },
          { date: 19, dayName: 'Sáb', crowdLevel: 4 },
          { date: 20, dayName: 'Dom', crowdLevel: 4 },
        ],
      },
      {
        weekLabel: 'Sem 4 (21-31)',
        days: [
          { date: 21, dayName: 'Lun', crowdLevel: 4 },
          { date: 22, dayName: 'Mar', crowdLevel: 5 },
          { date: 23, dayName: 'Mié', crowdLevel: 5 },
          { date: 24, dayName: 'Jue', crowdLevel: 5, note: 'Nochebuena' },
          { date: 25, dayName: 'Vie', crowdLevel: 5, note: 'Navidad' },
          { date: 26, dayName: 'Sáb', crowdLevel: 5 },
          { date: 27, dayName: 'Dom', crowdLevel: 5 },
          { date: 28, dayName: 'Lun', crowdLevel: 5 },
          { date: 29, dayName: 'Mar', crowdLevel: 5 },
          { date: 30, dayName: 'Mié', crowdLevel: 5 },
          { date: 31, dayName: 'Jue', crowdLevel: 5, note: 'Nochevieja' },
        ],
      },
    ],
    topParks: [
      { parkId: 'mk', reason: 'Magic Kingdom en diciembre es la experiencia navideña definitiva. El árbol de Cinderella Castle iluminado es una imagen para toda la vida.' },
      { parkId: 'epcot', reason: 'Festival of Holidays con las tradiciones de 40 países es único en el mundo. El Candlelight Processional es imperdible.' },
      { parkId: 'ioa', reason: 'Hogsmeade con nieve artificial y decoración navideña de Wizarding World es la versión más mágica del año.' },
    ],
    mainTip: 'Si viajás en la primera quincena de diciembre, tenés toda la magia navideña de Orlando con multitudes de temporada media. Es la mejor relación calidad-experiencia de las fiestas.',
    avoidTip: 'Semana Navidad-Año Nuevo: si no tenés otra opción, reservá todo con 6-12 meses de anticipación. Hoteles, restaurantes, Lightning Lane — todo. Sin reserva previa, la experiencia se degrada significativamente.',
    events: [
      { name: 'EPCOT Festival of Holidays', park: 'disney', dates: 'Nov 27 – Dic 30', type: 'festival', highlight: true },
      { name: "Mickey's Very Merry Christmas Party", park: 'disney', dates: 'select nights', type: 'event', highlight: true },
      { name: 'Holidays at Universal', park: 'universal', dates: 'Nov 14 – Ene 3, 2027', type: 'event', highlight: true },
    ],
  },
];

export function getStrategyBySlug(slug: string): MonthStrategy | undefined {
  return STRATEGY_2026.find((m) => m.slug === slug);
}

export function getAdjacentMonths(slug: string): { prev: MonthStrategy | null; next: MonthStrategy | null } {
  const index = STRATEGY_2026.findIndex((m) => m.slug === slug);
  return {
    prev: index > 0 ? STRATEGY_2026[index - 1] : null,
    next: index < STRATEGY_2026.length - 1 ? STRATEGY_2026[index + 1] : null,
  };
}