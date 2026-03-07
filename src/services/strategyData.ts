// =============================================================================
// STRATEGY DATA SERVICE
// Obtiene horarios reales de parques via ThemeParks.wiki (getParkSchedule)
// y los normaliza para el StrategyCalendar.
// Cacheado en build time (ISR) — no hay llamadas en runtime del usuario.
// =============================================================================

import { getParkSchedule } from '@/lib/parkData';

// ─── Parques que mostramos en el calendario ───────────────────────────────────
export const CALENDAR_PARKS = [
  { slug: 'magic-kingdom',        label: 'Magic Kingdom',     short: 'MK'  },
  { slug: 'epcot',                label: 'EPCOT',             short: 'EP'  },
  { slug: 'hollywood-studios',    label: 'Hollywood Studios', short: 'HS'  },
  { slug: 'animal-kingdom',       label: 'Animal Kingdom',    short: 'AK'  },
  { slug: 'universal-studios',    label: 'Universal Studios', short: 'US'  },
  { slug: 'islands-of-adventure', label: 'Islands of Adventure', short: 'IOA' },
  { slug: 'epic-universe',        label: 'Epic Universe',     short: 'EU'  },
] as const;

export type ParkSlug = typeof CALENDAR_PARKS[number]['slug'];
export type ParkShort = typeof CALENDAR_PARKS[number]['short'];

// ─── Tipos normalizados ───────────────────────────────────────────────────────
export interface ParkDaySchedule {
  parkSlug: ParkSlug;
  parkShort: ParkShort;
  parkLabel: string;
  date: string;           // 'YYYY-MM-DD'
  isOpen: boolean;
  openTime: string | null;  // '09:00'
  closeTime: string | null; // '22:00'
  specialEvent: string | null; // nombre del evento si hay (MNSSHP, MVMCP, etc.)
  recommendation: 'go' | 'neutral' | 'avoid';
}

export interface DayScheduleMap {
  [date: string]: ParkDaySchedule[]; // key: 'YYYY-MM-DD'
}

// ─── Parser de respuesta ThemeParks.wiki ─────────────────────────────────────
// Estructura real de la API:
// { schedule: [{ date, type, openingTime, closingTime, description?, ... }] }
interface RawScheduleEntry {
  date: string;
  type: 'OPERATING' | 'TICKETED_EVENT' | 'PRIVATE_EVENT' | 'CLOSED' | 'INFO';
  openingTime?: string;
  closingTime?: string;
  description?: string;
}

interface RawScheduleResponse {
  schedule?: RawScheduleEntry[];
}

function parseTime(isoTime?: string): string | null {
  if (!isoTime) return null;
  try {
    // isoTime viene como '2026-03-01T09:00:00-05:00'
    const d = new Date(isoTime);
    return d.toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'America/New_York',
    });
  } catch {
    return null;
  }
}

function parseDate(isoDate?: string): string | null {
  if (!isoDate) return null;
  // Puede venir como '2026-03-01' o '2026-03-01T00:00:00-05:00'
  return isoDate.slice(0, 10);
}

// ─── Lógica de recomendación ──────────────────────────────────────────────────
// Reglas editoriales explícitas, documentadas, modificables.
// No es IA — es criterio estructural codificado.
function deriveRecommendation(
  parkSlug: ParkSlug,
  isOpen: boolean,
  specialEvent: string | null,
  crowdLevelGlobal: number, // 1-5 del strategy-2026.ts para esa semana
  dayOfWeek: number, // 0=Dom, 6=Sáb
): 'go' | 'neutral' | 'avoid' {
  // Parque cerrado → evitar
  if (!isOpen) return 'avoid';

  // Evento ticketeado esa noche (MNSSHP, MVMCP) → parque cierra temprano → neutro
  if (specialEvent) return 'neutral';

  // Reglas por parque + día de semana + nivel global de multitud
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  if (crowdLevelGlobal <= 2) {
    // Temporada baja: todos los parques son buenos
    return 'go';
  }

  if (crowdLevelGlobal === 3) {
    // Temporada media: algunos parques se saturan más
    const highDemandParks: ParkSlug[] = ['magic-kingdom', 'universal-studios'];
    if (highDemandParks.includes(parkSlug) && isWeekend) return 'neutral';
    return 'go';
  }

  if (crowdLevelGlobal === 4) {
    // Temporada alta: evitar los más congestionados en fines de semana
    const avoidOnWeekend: ParkSlug[] = ['magic-kingdom', 'hollywood-studios', 'islands-of-adventure'];
    if (avoidOnWeekend.includes(parkSlug) && isWeekend) return 'avoid';
    const betterAlternatives: ParkSlug[] = ['animal-kingdom', 'epcot', 'epic-universe'];
    if (betterAlternatives.includes(parkSlug)) return 'go';
    return 'neutral';
  }

  // crowdLevelGlobal === 5: temporada extrema
  const surviveParks: ParkSlug[] = ['animal-kingdom', 'epic-universe'];
  if (surviveParks.includes(parkSlug)) return 'neutral';
  return 'avoid';
}

// ─── Función principal ────────────────────────────────────────────────────────
// Llama getParkSchedule × 7 parques en paralelo y devuelve DayScheduleMap.
// Se llama desde el Server Component con revalidate (ISR 24h).
export async function getMonthParkSchedules(
  year: number,
  month: number,
  weekCrowdLevels: Record<string, number>, // weekLabel → crowdLevel del strategy-2026.ts
): Promise<DayScheduleMap> {
  const monthStr = String(month).padStart(2, '0');

  // Fetch paralelo de los 7 parques
  const results = await Promise.allSettled(
    CALENDAR_PARKS.map(async (park) => {
      const raw = await getParkSchedule(park.slug, year, month) as RawScheduleResponse;
      return { park, raw };
    })
  );

  const scheduleMap: DayScheduleMap = {};

  for (const result of results) {
    if (result.status === 'rejected') continue;
    const { park, raw } = result.value;
    const entries: RawScheduleEntry[] = raw?.schedule ?? [];

    for (const entry of entries) {
      const date = parseDate(entry.date);
      if (!date || !date.startsWith(`${year}-${monthStr}`)) continue;

      const isOpen = entry.type === 'OPERATING' || entry.type === 'TICKETED_EVENT';
      const specialEvent = entry.type === 'TICKETED_EVENT'
        ? (entry.description ?? 'Evento especial')
        : null;

      // Determinar crowdLevel global para esa fecha
      // Mapeamos date → weekLabel buscando en weekCrowdLevels
      const crowdLevel = getCrowdLevelForDate(date, weekCrowdLevels);
      const dayOfWeek = new Date(date + 'T12:00:00').getDay();

      const daySchedule: ParkDaySchedule = {
        parkSlug: park.slug,
        parkShort: park.short,
        parkLabel: park.label,
        date,
        isOpen,
        openTime: parseTime(entry.openingTime),
        closeTime: parseTime(entry.closingTime),
        specialEvent,
        recommendation: deriveRecommendation(
          park.slug,
          isOpen,
          specialEvent,
          crowdLevel,
          dayOfWeek,
        ),
      };

      if (!scheduleMap[date]) scheduleMap[date] = [];
      scheduleMap[date].push(daySchedule);
    }
  }

  return scheduleMap;
}

// ─── Helper: crowd level para una fecha dada ─────────────────────────────────
// weekCrowdLevels viene de strategy-2026.ts weeks[].crowdLevel
// Usamos un mapa simple: si la fecha cae en la semana del mes, usa ese nivel.
function getCrowdLevelForDate(
  date: string,
  weekCrowdLevels: Record<string, number>,
): number {
  const day = parseInt(date.slice(8, 10), 10);
  // Semanas aproximadas: 1-7, 8-14, 15-21, 22-28, 29-31
  if (day <= 7) return weekCrowdLevels['semana-1'] ?? 3;
  if (day <= 14) return weekCrowdLevels['semana-2'] ?? 3;
  if (day <= 21) return weekCrowdLevels['semana-3'] ?? 3;
  if (day <= 28) return weekCrowdLevels['semana-4'] ?? 3;
  return weekCrowdLevels['semana-5'] ?? 3;
}

// ─── Fallback: schedule vacío cuando la API falla ────────────────────────────
// Genera un schedule neutro basado solo en datos editoriales.
// Garantiza que el componente nunca quede en blanco.
export function buildFallbackScheduleMap(
  year: number,
  month: number,
  weekCrowdLevels: Record<string, number>,
): DayScheduleMap {
  const map: DayScheduleMap = {};
  const daysInMonth = new Date(year, month, 0).getDate();
  const monthStr = String(month).padStart(2, '0');

  for (let day = 1; day <= daysInMonth; day++) {
    const dayStr = String(day).padStart(2, '0');
    const date = `${year}-${monthStr}-${dayStr}`;
    const crowdLevel = getCrowdLevelForDate(date, weekCrowdLevels);
    const dayOfWeek = new Date(date + 'T12:00:00').getDay();

    map[date] = CALENDAR_PARKS.map((park) => ({
      parkSlug: park.slug,
      parkShort: park.short,
      parkLabel: park.label,
      date,
      isOpen: true,
      openTime: '09:00',
      closeTime: '21:00',
      specialEvent: null,
      recommendation: deriveRecommendation(park.slug, true, null, crowdLevel, dayOfWeek),
    }));
  }

  return map;
}