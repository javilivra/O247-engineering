// src/data/types.ts
// ===================================================
// TIPOS UNIFICADOS -- Single Source of Truth
// Escala: 100-150 atracciones entre Disney + Universal
// ===================================================

/** Estados operativos normalizados para TODOS los items */
export type ItemStatus = 'open' | 'closed' | 'refurbishment' | 'down';

/** Categorias de contenido */
export type ItemType = 'Attraction' | 'Dining' | 'Show' | 'Character';

/** Tipos de acceso a filas */
export type AccessType = 'Standby' | 'LL Single Pass' | 'LL Multi Pass' | 'Virtual Queue' | 'None';

/** Resort de origen del parque */
export type ParkResort = 'disney-world' | 'universal-orlando' | 'seaworld';

/** Parques individuales */
export type ParkId =
    | 'mk' | 'epcot' | 'hs' | 'ak'                     // Disney World
    | 'us' | 'ioa' | 'epic' | 'volcano'                  // Universal Orlando
    | 'sw' | 'bg';                                        // SeaWorld / Busch Gardens

/**
 * Tipo base que TODOS los items del parque comparten.
 * BentoCard, listados, filtros consumen este tipo.
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

// ===================================================
// ATTRACTION -- Tipo completo expandido
// ===================================================

/** Video POV de YouTube */
export interface AttractionPOV {
    videoId: string;           // ID del video de YouTube (ej: 'dQw4w9WgXcQ')
    channelName: string;       // Nombre del canal para dar credito
    channelUrl: string;        // URL del canal
    thumbnailUrl?: string;     // Override de thumbnail (si no, se genera desde videoId)
}

/** Actividades relacionadas cercanas */
export interface RelatedActivity {
    title: string;
    type: 'shopping' | 'dining' | 'photo' | 'experience' | 'game' | 'show';
    description: string;
    icon?: string;
}

/** Accesibilidad */
export interface AccessibilityInfo {
    wheelchair: boolean;              // Accesible en silla de ruedas
    mustTransfer: boolean;            // Requiere transferencia del vehiculo
    serviceAnimals: boolean;          // Permite animales de servicio
    closedCaptions: boolean;          // Tiene subtitulos
    assistiveListening: boolean;      // Tiene sistema de escucha asistida
    signLanguage: boolean;            // Tiene interpretacion en lengua de senas
    handheldCaptioning: boolean;      // Dispositivo portatil de subtitulos
    audioDescription: boolean;        // Descripcion en audio
    notes?: string;                   // Notas adicionales de accesibilidad
}

/** Advertencias de intensidad y salud */
export interface RideWarnings {
    motionSickness: boolean;          // Puede causar mareos
    darkness: boolean;                // Oscuridad significativa
    heights: boolean;                 // Alturas
    drops: boolean;                   // Caidas bruscas
    flashingLights: boolean;          // Luces estroboscopicas
    loudNoises: boolean;              // Ruidos fuertes / explosiones
    water: boolean;                   // Te puedes mojar
    spinning: boolean;                // Giros / rotacion
    claustrophobic: boolean;          // Espacios cerrados
    scareFactor: 1 | 2 | 3 | 4 | 5;  // 1=suave, 5=intenso
    pregnancyRestriction: boolean;    // No recomendado para embarazadas
    backNeckIssues: boolean;          // No recomendado con problemas de espalda/cuello
    notes?: string;                   // Nota libre de advertencia
}

/** Politica de lockers */
export interface LockerPolicy {
    required: boolean;                // Lockers obligatorios
    location: string;                 // Donde estan
    cost: string;                     // Precio o "Gratis" o "Incluido"
    notes?: string;
}

/** Politica de filmacion y fotografias */
export interface PhotoPolicy {
    camerasAllowed: boolean;          // Se pueden usar camaras
    phonesAllowed: boolean;           // Se pueden usar celulares
    flashAllowed: boolean;            // Se puede usar flash
    goProAllowed: boolean;            // Se pueden usar GoPro / action cams
    hasOnRidePhoto: boolean;          // Disney/Universal saca foto oficial
    photoPassIncluded: boolean;       // La foto esta incluida en Memory Maker / PhotoPass
    notes?: string;
}

/** Franja horaria de espera estimada (forecast) */
export interface WaitForecastSlot {
    hour: number;     // 8 = 8:00 AM, 13 = 1:00 PM, etc.
    wait: number;     // Minutos estimados
}

/** Espera promedio por mes (datos historicos) */
export type MonthlyWaitAverage = Record<number, number>;  // 1-12 -> minutos

/**
 * Tipo extendido para Atracciones con datos completos.
 * Escala para Disney World, Universal Orlando, y futuros parques.
 */
export interface Attraction extends ParkItem {
    type: 'Attraction';
    slug: string;

    // --- Identificacion ---
    park: ParkId;                     // Parque al que pertenece
    resort: ParkResort;               // Resort de origen
    mapId: number;                    // Numero en el mapa oficial
    wdwId?: string;                   // ID en la API de Disney/Universal (para wait times en vivo)

    // --- Clasificacion ---
    rideSystem: string;               // Tipo de vehiculo (ej: 'Coaster Motocicleta', 'Bote', 'Omnimover')
    yearOpened: number;               // Ano de apertura
    capacity?: number;                // Pasajeros por vehiculo

    // --- Metricas operativas ---
    reliabilityScore: number;         // 0-100 (fuente: datos historicos de cierres)
    reliabilitySource: string;        // De donde sale el dato (ej: 'Historico 12 meses O247')

    // --- Requisitos fisicos ---
    heightReq: number;                // cm (0 = sin restriccion)
    hasAc: boolean;
    isIndoor: boolean;
    duration: number;                 // minutos

    // --- Sistema de acceso ---
    access: AccessType;
    accessExplained: string;          // Explicacion completa para usuarios nuevos

    // --- Tiempos de espera ---
    avgWaitByMonth: MonthlyWaitAverage;   // Promedio por mes
    forecastToday: WaitForecastSlot[];    // Forecast por franja horaria
    bestTime: string;                     // Recomendacion editorial

    // --- Contenido editorial ---
    description: string;              // 2-3 parrafos de contexto
    secretTip: string;                // Dato que nadie cuenta
    insiderFacts: string[];           // Datos que nadie esta informando

    // --- Video POV ---
    pov?: AttractionPOV;

    // --- Actividades relacionadas ---
    relatedActivities: RelatedActivity[];

    // --- Seguridad y advertencias ---
    warnings: RideWarnings;

    // --- Accesibilidad ---
    accessibility: AccessibilityInfo;

    // --- Lockers ---
    lockers: LockerPolicy;

    // --- Fotografia ---
    photoPolicy: PhotoPolicy;
}