// src/data/mk-data.ts

// --- GLOSARIO ---
export const GLOSSARY_DB: Record<string, { title: string, def: string }> = {
    "rope-drop": {
        title: "ROPE DROP",
        def: "Táctica de llegar a los molinetes 45-60 min antes de la apertura oficial. Disney literalmente 'baja una cuerda' (Rope Drop) para permitir el acceso masivo. Estar aquí te garantiza 1 o 2 atracciones principales sin fila."
    },
    "early-entry": {
        title: "EARLY THEME PARK ENTRY",
        def: "Beneficio exclusivo para huéspedes de Hoteles Disney (y asociados). Permite entrar a CUALQUIER parque 30 minutos antes que el público general. Vital para Fantasyland o Tomorrowland."
    },
    "virtual-queue": {
        title: "VIRTUAL QUEUE (VQ)",
        def: "Sistema de fila digital gratuito para atracciones de ultra-demanda (ej. TRON). No existe fila física ('Standby'). Debes 'pescar' un lugar en la App de Disney a las 7:00 AM o 1:00 PM exactas."
    },
    "mobile-order": {
        title: "MOBILE FOOD ORDER",
        def: "Sistema obligatorio en temporada alta para pedir comida rápida desde tu celular. Eliges el restaurante y la comida en la App, pagas, y solo te acercas al mostrador cuando la app te avisa que está lista."
    },
    "lightning-lane": {
        title: "LIGHTNING LANE (LL)",
        def: "La fila rápida (antiguo FastPass). Se accede comprando el 'Multi Pass' o el 'Single Pass'. Es la vía para saltarse la fila normal y reducir esperas de 90 min a 5-10 min."
    },
    "e-ticket": {
        title: "E-TICKET RIDE",
        def: "Término histórico de Disney para referirse a las atracciones de máxima categoría, mayor presupuesto y mayor emoción (ej. Space Mountain, Seven Dwarfs Mine Train)."
    }
};

// --- TIERRAS (LANDS) ---
export const LANDS_DATA = [
    {
        id: 0,
        name: "Main Street U.S.A.",
        alias: "EL CUELLO DE BOTELLA",
        icon: "solar:shop-bold-duotone",
        reality: "Es el único punto de entrada y salida. Es una trampa de tiempo en la mañana y un bloqueo humano en la noche.",
        tactics: [
            { title: "Rope Drop", desc: "¡No te detengas! Tu objetivo es cruzarla rápido para llegar a las atracciones." },
            { title: "Compras", desc: "Nunca compres al entrar. Las tiendas cierran 1h después del parque." },
            { title: "Café", desc: "Starbucks tiene la fila más larga. Usa Mobile Order o trae del hotel." }
        ],
        intel: { attraction: "Walt Disney World Railroad", food: "Casey's Corner", shop: "Emporium" }
    },
    {
        id: 1,
        name: "Adventureland",
        alias: "LA ZONA DE CALOR",
        icon: "solar:compass-bold-duotone",
        reality: "Pasillos estrechos + vegetación densa = Humedad elevada. Zona donde la paciencia se agota.",
        tactics: [
            { title: "Jungle Cruise", desc: "Demanda engañosa. Tiempos altos temprano. Prioridad media en Lightning Lane." },
            { title: "Hidratación", desc: "Usa Sunshine Tree Terrace para agua gratis (vasos de hielo)." },
            { title: "Dole Whip", desc: "Usa Mobile Order en Aloha Isle mientras caminas desde Piratas." }
        ],
        intel: { attraction: "Pirates of the Caribbean", food: "Aloha Isle", shop: "Plaza del Sol Caribe" }
    },
    {
        id: 2,
        name: "Frontierland",
        alias: "EL EXTREMO FÍSICO",
        icon: "solar:mountains-bold-duotone",
        reality: "Callejón sin salida geográfico. Si vas al fondo y la atracción está cerrada, debes caminar todo de vuelta.",
        tactics: [
            { title: "Tiana’s Bayou", desc: "Atracción de Fila Virtual. Si no tienes grupo a las 7:00 AM, no vayas." },
            { title: "Desfiles", desc: "La calle principal se bloquea 20 min. Cruza a Adventureland por el pasaje de madera." }
        ],
        intel: { attraction: "Big Thunder Mountain", food: "Pecos Bill", shop: "Frontier Trading Post" }
    },
    {
        id: 3,
        name: "Liberty Square",
        alias: "EL PIVOTE ESTRATÉGICO",
        icon: "solar:bell-bold-duotone",
        reality: "El mejor lugar para recuperar HP (Puntos de Salud) y comer con aire acondicionado.",
        tactics: [
            { title: "Refugio", desc: "Columbia Harbour House (2do piso). Vacío, A/C potente y baños limpios." },
            { title: "Haunted Mansion", desc: "Si el 'Wait Score' baja de 35 min, ve de inmediato." }
        ],
        intel: { attraction: "Haunted Mansion", food: "Columbia Harbour House", shop: "Memento Mori" }
    },
    {
        id: 4,
        name: "Fantasyland",
        alias: "LA ZONA DE CAOS",
        icon: "solar:castle-bold-duotone",
        reality: "Mayor densidad de strollers del mundo. Navegación difícil y ruido alto.",
        tactics: [
            { title: "Seven Dwarfs", desc: "¿Pagar Lightning Lane Single Pass? O247 recomienda SÍ para salvar piernas." },
            { title: "Smart Cut", desc: "Mickey’s PhilharMagic: Sin fila, A/C y 12 min sentados. Úsalo si hace >32°C." }
        ],
        intel: { attraction: "Seven Dwarfs Mine Train", food: "Be Our Guest", shop: "Sir Mickey's" }
    },
    {
        id: 5,
        name: "Tomorrowland",
        alias: "LA PARRILLA DE CONCRETO",
        icon: "solar:rocket-bold-duotone",
        reality: "Mucho concreto, poca sombra. El sol rebota y quema más aquí que en otro lado.",
        tactics: [
            { title: "TRON", desc: "Requiere Virtual Queue estricta a las 7:00 AM exactas." },
            { title: "Descanso", desc: "PeopleMover: 10 min sentado, brisa y sombra. Úsalo tras 15.000 pasos." }
        ],
        intel: { attraction: "TRON Lightcycle / Run", food: "Cosmic Ray's", shop: "Star Traders" }
    }
];

// --- BUCKET LIST ---
export const BUCKET_ITEMS = [
    // NIVEL 1
    [
        { title: "Protocolo Dole Whip", type: "Snack", desc: "Cómetelo en Aloha Isle. Tip O247: Usa Mobile Order para no hacer fila al sol." },
        { title: "El Muro Morado", type: "Photo Op", desc: "Un clásico de Instagram en Tomorrowland. La luz de la tarde es la mejor para esta foto." },
        { title: "Encontrar a Pascal", type: "Discovery", desc: "Busca los camaleones escondidos en el área de descanso de Rapunzel en Fantasyland." }
    ],
    // NIVEL 2
    [
        { title: "Héroe Galáctico", type: "Gaming", desc: "Obtén 999,999 puntos en Buzz Lightyear. Apunta al volcán y debajo de la garra de Zurg." },
        { title: "Castillo Vacío", type: "Photo Op", desc: "Reserva desayuno temprano en Crystal Palace o quédate hasta el Kiss Goodnight para esta foto." }
    ],
    // NIVEL 3
    [
        { title: "The Flag Retreat", type: "Ceremony", desc: "5:00 PM en Town Square. Emotiva ceremonia patriótica con veteranos. Un momento de calma." },
        { title: "Kiss Goodnight", type: "Magic", desc: "30 min después del cierre. El castillo se ilumina y suena un mensaje de despedida especial." },
        { title: "Correo Mágico", type: "Legacy", desc: "Envía una postal desde los buzones reales de Main Street. Tendrá el matasellos de Magic Kingdom." }
    ],
    // NIVEL 4
    [
        { title: "Cinderella’s Table", type: "Dining", desc: "Comer dentro del castillo. Requiere reserva 60 días antes. Si fallas, usa nuestras alertas." },
        { title: "Fireworks Party", type: "Event", desc: "¿Vale la pena? Sí, si odias las multitudes y tienes presupuesto extra para verlos sentado." },
        { title: "Keys to the Kingdom", type: "Tour", desc: "Tour guiado de 5 horas que baja a los túneles subterráneos (Utilidors). Solo adultos." }
    ]
];

// --- NIVELES BUCKET ---
export const BUCKET_LEVELS = [
    { 
        id: 0, label: "Classic", desc: "Nivel 1", 
        style: "bg-white border-gray-200 text-gunmetal hover:bg-gray-50",
        activeStyle: "bg-white border-gray-300 text-gunmetal ring-2 ring-gray-200 shadow-lg"
    },
    { 
        id: 1, label: "Gold", desc: "Nivel 2", 
        style: "bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 text-amber-900 hover:to-amber-200",
        activeStyle: "bg-gradient-to-br from-amber-100 to-amber-200 border-amber-400 text-amber-950 ring-2 ring-amber-300 shadow-lg shadow-amber-100"
    },
    { 
        id: 2, label: "Platinum", desc: "Nivel 3", 
        style: "bg-gradient-to-br from-slate-100 to-slate-200 border-slate-300 text-slate-700 hover:to-slate-300",
        activeStyle: "bg-gradient-to-br from-slate-200 to-slate-300 border-slate-400 text-slate-900 ring-2 ring-slate-400 shadow-lg shadow-slate-200"
    },
    { 
        id: 3, label: "Black", desc: "Nivel 4", 
        style: "bg-gunmetal border-gunmetal text-gray-400 hover:text-white",
        activeStyle: "bg-gunmetal border-black text-white ring-2 ring-gray-700 shadow-xl shadow-gray-900/50"
    },
];

// --- HOTELES ---
export const DISNEY_RESORTS = [
    { name: "Disney's Grand Floridian Resort", category: "Deluxe" },
    { name: "Disney's Polynesian Village", category: "Deluxe" },
    { name: "Disney's Contemporary Resort", category: "Deluxe" },
    { name: "Disney's Animal Kingdom Lodge", category: "Deluxe" },
    { name: "Disney's Wilderness Lodge", category: "Deluxe" },
    { name: "Disney's Caribbean Beach", category: "Moderate" },
    { name: "Disney's Coronado Springs", category: "Moderate" },
    { name: "Disney's Pop Century Resort", category: "Value" },
    { name: "Disney's Art of Animation", category: "Value" },
    { name: "Disney's All-Star Movies", category: "Value" }
];