// src/data/types.ts
// ===================================================
// TIPOS UNIFICADOS -- Single Source of Truth
// ===================================================

/** Estados operativos normalizados para TODOS los items */
export type ItemStatus = 'open' | 'closed' | 'refurbishment' | 'down';

/** Categorías de contenido */
export type ItemType = 'Attraction' | 'Dining' | 'Show' | 'Character';

/**
 * Tipo base que TODOS los items del parque comparten.
 * BentoCard, AttractionDetailPanel, y filtros consumen este tipo.
 */
export interface ParkItem {
  id: string;
  name: string;
  land: string;
  tier: string;
  status: ItemStatus;
  waitTime?: string;
  type: ItemType;
  vibes: string[];
  image: string;
  description?: string;
}

/**
 * Tipo extendido para Atracciones con datos de ingeniería.
 * Solo mk-attractions-data.ts usa este tipo completo.
 */
export interface Attraction extends ParkItem {
  type: 'Attraction';
  mapId: number;
  reliabilityScore: number;
  heightReq: number;
  hasAc: boolean;
  isIndoor: boolean;
  duration: number;
  access: 'Standby' | 'LL Single Pass' | 'LL Multi Pass' | 'Virtual Queue' | 'None';
  bestTime: string;
  secretTip: string;
  slug?: string;
}