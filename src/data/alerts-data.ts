// ============================================================
// ALERTS DATA — Sistema de alertas editorial O247
// ============================================================
//
// ESTRUCTURA PREPARADA PARA FASE 2 (cron job / API auto-update)
//
// HOW TO USE:
// 1. Agregá una alerta manualmente en la sección correspondiente
// 2. El sistema la muestra automáticamente en la página del parque
// 3. En Fase 2, un cron job poblará este archivo desde ThemeParks.wiki API
//
// TIPOS DE ALERTA:
//   'closure'       — Cierre definitivo
//   'refurbishment' — Remodelación con fecha de reapertura
//   'temporary'     — Cierre temporal sin fecha
//   'opening'       — Atracción futura con fecha de apertura estimada
//   'change'        — Cambio operativo (nombre, sistema de acceso, etc.)
//
// SOURCE FIELD (para Fase 2):
//   'editorial'     — Cargado manualmente por el equipo O247
//   'api'           — Poblado automáticamente por cron job
// ============================================================

export type AlertType = 'closure' | 'refurbishment' | 'temporary' | 'opening' | 'change';
export type AlertSource = 'editorial' | 'api';
export type ParkId = 'mk' | 'epcot' | 'hs' | 'ak' | 'usf' | 'ioa' | 'vb' | 'eu';

export interface ParkAlert {
  id: string;
  parkId: ParkId;
  attractionId?: string;       // ID de la atracción en la data (opcional — puede ser alerta de parque)
  attractionName: string;
  type: AlertType;
  title: string;               // Texto corto para el banner
  description?: string;        // Descripción larga (para página de atracción)
  startDate?: string;          // ISO date — cuándo empieza
  endDate?: string;            // ISO date — cuándo termina (estimado)
  estimatedReopenDate?: string; // Para refurbishment
  estimatedOpenDate?: string;  // Para opening
  isActive: boolean;           // Control manual de visibilidad
  source: AlertSource;
  lastUpdated: string;         // ISO date — última actualización editorial
  sourceUrl?: string;          // URL de la fuente (para Fase 2)
}

// ============================================================
// MAGIC KINGDOM
// ============================================================
const MK_ALERTS: ParkAlert[] = [
  {
    id: 'mk-btmr-refurb-2024',
    parkId: 'mk',
    attractionId: 'btmr',
    attractionName: 'Big Thunder Mountain Railroad',
    type: 'refurbishment',
    title: 'Big Thunder Mountain Railroad se encuentra en Remodelación Mayor',
    description: 'Big Thunder Mountain Railroad está cerrada por una remodelación mayor que incluirá efectos especiales mejorados. Se espera reapertura en 2026.',
    startDate: '2024-01-01',
    estimatedReopenDate: '2026-06-01',
    isActive: true,
    source: 'editorial',
    lastUpdated: '2025-03-02',
    sourceUrl: 'https://disneyworld.disney.go.com',
  },
];

// ============================================================
// HOLLYWOOD STUDIOS
// ============================================================
const HS_ALERTS: ParkAlert[] = [
  {
    id: 'hs-rnrc-closure-2025',
    parkId: 'hs',
    attractionId: 'hs-rnrc',
    attractionName: "Rock 'n' Roller Coaster",
    type: 'closure',
    title: "Rock 'n' Roller Coaster cerró definitivamente el 2 de marzo de 2025",
    description: "Rock 'n' Roller Coaster cerró sus puertas definitivamente el 2 de marzo de 2025 para dar paso a una nueva atracción temática de Muppets. Fue una de las atracciones icónicas de Hollywood Studios durante más de 25 años.",
    startDate: '2025-03-02',
    isActive: true,
    source: 'editorial',
    lastUpdated: '2025-03-02',
    sourceUrl: 'https://disneyworld.disney.go.com',
  },
];

// ============================================================
// EPCOT
// ============================================================
const EPCOT_ALERTS: ParkAlert[] = [];

// ============================================================
// ANIMAL KINGDOM
// ============================================================
const AK_ALERTS: ParkAlert[] = [];

// ============================================================
// UNIVERSAL STUDIOS FLORIDA
// ============================================================
const USF_ALERTS: ParkAlert[] = [];

// ============================================================
// ISLANDS OF ADVENTURE
// ============================================================
const IOA_ALERTS: ParkAlert[] = [];

// ============================================================
// VOLCANO BAY
// ============================================================
const VB_ALERTS: ParkAlert[] = [];

// ============================================================
// EPIC UNIVERSE
// ============================================================
const EU_ALERTS: ParkAlert[] = [
  {
    id: 'eu-opening-2025',
    parkId: 'eu',
    attractionName: 'Epic Universe',
    type: 'opening',
    title: 'Epic Universe abre el 22 de mayo de 2025',
    description: 'El nuevo parque de Universal Orlando abre sus puertas el 22 de mayo de 2025. Incluye Super Nintendo World, The Wizarding World of Harry Potter — Ministry of Magic, Monsters Unchained, How to Train Your Dragon y Celestial Park.',
    estimatedOpenDate: '2025-05-22',
    isActive: true,
    source: 'editorial',
    lastUpdated: '2025-03-02',
    sourceUrl: 'https://www.universalorlando.com',
  },
];

// ============================================================
// EXPORT — índice por parque para lookup O(1)
// Preparado para Fase 2: el cron job puede hacer ALERTS_BY_PARK[parkId].push(newAlert)
// ============================================================
export const ALERTS_BY_PARK: Record<ParkId, ParkAlert[]> = {
  mk:   MK_ALERTS,
  epcot: EPCOT_ALERTS,
  hs:   HS_ALERTS,
  ak:   AK_ALERTS,
  usf:  USF_ALERTS,
  ioa:  IOA_ALERTS,
  vb:   VB_ALERTS,
  eu:   EU_ALERTS,
};

// Todas las alertas activas — útil para un futuro dashboard editorial
export const ALL_ACTIVE_ALERTS = Object.values(ALERTS_BY_PARK)
  .flat()
  .filter(a => a.isActive);

// Helper para Fase 2 — el cron job usará esta firma
export function getAlertsForPark(parkId: ParkId): ParkAlert[] {
  return (ALERTS_BY_PARK[parkId] || []).filter(a => a.isActive);
}
