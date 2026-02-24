// =============================================================================
// PARK DATA — Capa centralizada de datos de parques
// Fuentes: ThemeParks.wiki (live) + Queue-Times.com (histórico)
// Sin dependencias npm — REST puro con fetch nativo
// =============================================================================

// ─── IDs de entidades en ThemeParks.wiki ─────────────────────────────────────
// Obtenidos de: GET https://api.themeparks.wiki/v1/destinations
export const PARK_ENTITY_IDS: Record<string, string> = {
  "magic-kingdom":     "75ea578a-adc8-4116-a54d-dff36a59c8b9",
  "epcot":             "47f90d2c-e191-4239-a466-5892ef59a88f",
  "hollywood-studios": "288747d1-8b4f-4a64-867e-ea7c9b27bad8",
  "animal-kingdom":    "1c84a229-8862-4648-9c71-378dabb7d9b7",
  "universal-studios": "eb3f4560-2383-4a36-9152-6b3e5ed6bc57",
  "islands-of-adventure": "267615cc-8943-4c2a-ae2c-5da728ca591f",
};

// ─── IDs en Queue-Times.com ───────────────────────────────────────────────────
export const QUEUE_TIMES_IDS: Record<string, number> = {
  "magic-kingdom":        6,
  "epcot":                8,
  "hollywood-studios":    7,
  "animal-kingdom":       9,
  "universal-studios":    3,
  "islands-of-adventure": 5,
};

// ─── Caché en memoria ─────────────────────────────────────────────────────────
// En producción escalar a Vercel KV o Redis
interface CacheEntry { data: unknown; expiresAt: number }
const cache = new Map<string, CacheEntry>();

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (entry && Date.now() < entry.expiresAt) return entry.data as T;
  cache.delete(key);
  return null;
}

function setCached(key: string, data: unknown, ttlSeconds: number): void {
  cache.set(key, { data, expiresAt: Date.now() + ttlSeconds * 1000 });
}

// ─── ThemeParks.wiki — Live Data ──────────────────────────────────────────────
export async function getParkLiveData(parkSlug: string) {
  const entityId = PARK_ENTITY_IDS[parkSlug];
  if (!entityId) throw new Error(`Park not found: ${parkSlug}`);

  const cacheKey = `live_${parkSlug}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const res = await fetch(
    `https://api.themeparks.wiki/v1/entity/${entityId}/live`,
    { signal: AbortSignal.timeout(8000) }
  );

  if (!res.ok) throw new Error(`ThemeParks.wiki error: ${res.status}`);
  const data = await res.json();

  setCached(cacheKey, data, 300); // 5 minutos
  return data;
}

// ─── ThemeParks.wiki — Schedule ───────────────────────────────────────────────
export async function getParkSchedule(
  parkSlug: string,
  year: number,
  month: number
) {
  const entityId = PARK_ENTITY_IDS[parkSlug];
  if (!entityId) throw new Error(`Park not found: ${parkSlug}`);

  const cacheKey = `schedule_${parkSlug}_${year}_${month}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const res = await fetch(
    `https://api.themeparks.wiki/v1/entity/${entityId}/schedule/${year}/${month}`,
    { signal: AbortSignal.timeout(8000) }
  );

  if (!res.ok) throw new Error(`Schedule error: ${res.status}`);
  const data = await res.json();

  setCached(cacheKey, data, 3600); // 1 hora
  return data;
}

// ─── Queue-Times — Live (con datos históricos disponibles) ───────────────────
export async function getQueueTimesData(parkSlug: string) {
  const parkId = QUEUE_TIMES_IDS[parkSlug];
  if (!parkId) throw new Error(`Park not found in QueueTimes: ${parkSlug}`);

  const cacheKey = `qt_${parkSlug}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const res = await fetch(
    `https://queue-times.com/parks/${parkId}/queue_times.json`,
    { signal: AbortSignal.timeout(8000) }
  );

  if (!res.ok) throw new Error(`QueueTimes error: ${res.status}`);
  const data = await res.json();

  setCached(cacheKey, data, 300); // 5 minutos
  return data;
}

// ─── Buscar atracción por nombre dentro del live data ────────────────────────
export function findAttractionInLiveData(
  liveData: { liveData?: AttractionLive[] },
  attractionName: string
): AttractionLive | null {
  const rides: AttractionLive[] = liveData.liveData ?? [];
  const needle = attractionName.toLowerCase();
  return (
    rides.find(r => r.name?.toLowerCase() === needle) ??
    rides.find(r => r.name?.toLowerCase().includes(needle)) ??
    null
  );
}

// ─── Tipos ───────────────────────────────────────────────────────────────────
export interface AttractionLive {
  id: string;
  name: string;
  entityType: string;
  status: "OPERATING" | "CLOSED" | "REFURBISHMENT" | "DOWN";
  lastUpdated: string;
  queue?: {
    STANDBY?: { waitTime: number | null };
    SINGLE_RIDER?: { waitTime: number | null };
    PAID_SINGLE_RIDER?: { waitTime: number | null; available: boolean };
    RETURN_TIME?: { state: string; returnStart?: string; returnEnd?: string };
    BOARDING_GROUP?: { allocationStatus: string; currentGroupStart?: number; currentGroupEnd?: number };
  };
}
