// ============================================================
// breadcrumbMap.ts — Datos para GlobalBreadcrumbs
// Extraído de GlobalBreadcrumbs.tsx para separar datos de UI.
// Para agregar nombres de rutas o atracciones, editar SOLO este archivo.
// ============================================================

// Traduce slugs de URL a nombres legibles para los breadcrumbs
export const PATH_MAP: Record<string, string> = {
    "disney": "Disney World",
    "universal": "Universal Orlando",
    "parks": "Parques",
    "mk": "Magic Kingdom",
    "epcot": "EPCOT",
    "hs": "Hollywood Studios",
    "ak": "Animal Kingdom",
    "usf": "Universal Studios",
    "ioa": "Islands of Adventure",
    "vb": "Volcano Bay",
    "eu": "Epic Universe",
    "attractions": "Atracciones",
    "dining": "Gastronomía",
    "resorts": "Hoteles",
    "guide": "Guía",
    "tron-lightcycle-run": "TRON Lightcycle / Run",
    "space-mountain": "Space Mountain",
    "velocicoaster": "VelociCoaster",
    "seven-dwarfs-mine-train": "Seven Dwarfs Mine Train",
    "tianas-bayou-adventure": "Tiana's Bayou Adventure",
};

// Estructura de resorts y parques para los dropdowns de los breadcrumbs
export const RESORT_DATA: Record<string, { name: string; parks: { id: string; name: string }[] }> = {
    disney: {
        name: "Disney World",
        parks: [
            { id: "mk", name: "Magic Kingdom" },
            { id: "epcot", name: "EPCOT" },
            { id: "hs", name: "Hollywood Studios" },
            { id: "ak", name: "Animal Kingdom" },
        ]
    },
    universal: {
        name: "Universal Orlando",
        parks: [
            { id: "usf", name: "Universal Studios" },
            { id: "ioa", name: "Islands of Adventure" },
            { id: "vb", name: "Volcano Bay" },
            { id: "eu", name: "Epic Universe" },
        ]
    }
};

// Slugs de atracciones que tienen hero oscuro (ajusta el color de los breadcrumbs)
export const DARK_HERO_SLUGS = [
    "tron-lightcycle-run",
    "space-mountain",
    "velocicoaster",
    "seven-dwarfs-mine-train",
    "tianas-bayou-adventure",
];
