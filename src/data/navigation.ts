// ============================================================
// navigation.ts — Datos de navegación del sitio O247
// Extraído de Navbar.tsx para separar datos de lógica de UI.
// Para agregar o modificar links, editar SOLO este archivo.
// ============================================================

export interface NavSection {
    title: string;
    links: { href: string; label: string; badge?: string; highlight?: boolean }[];
}

export interface NavItem {
    id: string;
    label: string;
    href?: string;
    sections?: NavSection[];
    spotlight?: { tag: string; title: string; desc: string; href?: string };
}

export const NAV_ITEMS: NavItem[] = [
    {
        id: 'orlando',
        label: 'Orlando',
        spotlight: { tag: 'PLANIFICACIÓN Y COSTOS', title: 'Calculadora de presupuesto', desc: 'Estimá el costo real de tu viaje según duración, alojamiento y tipo de tickets.', href: '/orlando/presupuesto' },
        sections: [
            {
                title: 'GUÍA DE CIUDAD',
                links: [
                    { href: '/orlando', label: 'Guía de Ciudad', highlight: true },
                    { href: '/orlando/cuando-viajar', label: 'Cuándo Viajar' },
                    { href: '/orlando/donde-dormir', label: 'Dónde Dormir' },
                    { href: '/orlando/movilidad', label: 'Cómo Moverte' },
                ],
            },
            {
                title: 'PLANIFICACIÓN',
                links: [
                    { href: '/orlando/duracion', label: 'Duración del Viaje' },
                    { href: '/orlando/presupuesto', label: 'Presupuesto y Costos' },
                    { href: '/orlando/clima', label: 'Clima y Multitudes' },
                    { href: '/orlando/ninos', label: 'Viajar con Niños' },
                ],
            },
            {
                title: 'TICKETS Y MAPAS',
                links: [
                    { href: '/orlando/tickets', label: 'Guía de Tickets' },
                    { href: '/disney/tickets', label: 'Comprar Tickets Disney' },
                    { href: '/universal/tickets', label: 'Comprar Tickets Universal' },
                    { href: '/orlando/mapa', label: 'Mapa Interactivo' },
                ],
            },
            {
                title: 'EXTRAS',
                links: [
                    { href: '/orlando/gastronomia', label: 'Gastronomía' },
                    { href: '/shoppinear', label: 'Guía de Compras' },
                    { href: '/orlando/rider-switch', label: 'Rider Switch y Single Rider' },
                    { href: '/orlando/extras', label: 'Más Allá de los Parques' },
                ],
            },
        ],
    },
    {
        id: 'disney',
        label: 'Disney World',
        spotlight: { tag: 'DESTACADO', title: 'Guía Lightning Lane', desc: 'Domina el sistema de filas rápidas y evita esperas.', href: '/disney/tickets#ll' },
        sections: [
            {
                title: 'PARQUES TEMATICOS',
                links: [
                    { href: '/disney/mk', label: 'Magic Kingdom' },
                    { href: '/disney/epcot', label: 'EPCOT' },
                    { href: '/disney/hs', label: 'Hollywood Studios' },
                    { href: '/disney/ak', label: 'Animal Kingdom' },
                    { href: '/disney/parks', label: 'Ver Todos los Parques', highlight: true },
                ],
            },
            {
                title: 'LOGÍSTICA & TICKETS',
                links: [
                    { href: '/disney/tickets', label: 'Tickets Inteligentes' },
                    { href: '/disney/tickets#ll', label: 'Lightning Lane', badge: 'PRO', highlight: true },
                    { href: '/disney/virtual', label: 'Filas Virtuales' },
                ],
            },
            {
                title: 'HOTELES & RESORTS',
                links: [
                    { href: '/disney/resorts/skyliner', label: 'Skyliner Resorts' },
                    { href: '/disney/resorts/monorail', label: 'Monorail Resorts' },
                    { href: '/disney/resorts/walking', label: 'Walking Distance' },
                ],
            },
        ],
    },
    {
        id: 'universal',
        label: 'Universal',
        spotlight: { tag: 'NUEVO', title: 'Epic Universe 2025', desc: 'Todo sobre el nuevo parque temático más grande.', href: '/universal/epic' },
        sections: [
            {
                title: 'PARQUES TEMATICOS',
                links: [
                    { href: '/universal/epic', label: 'Epic Universe', badge: '2025', highlight: true },
                    { href: '/universal/us', label: 'Universal Studios' },
                    { href: '/universal/ioa', label: 'Islands of Adventure' },
                    { href: '/universal/volcano', label: 'Volcano Bay' },
                    { href: '/universal/parks', label: 'Ver Todos los Parques', highlight: true },
                ],
            },
            {
                title: 'TICKETS & PASES',
                links: [
                    { href: '/universal/tickets', label: 'Park-to-Park' },
                    { href: '/universal/express', label: 'Express Pass Hack' },
                ],
            },
        ],
    },
    {
        id: 'shoppinear',
        label: 'Shoppinear',
        spotlight: { tag: 'UTIL', title: 'Calculadora de Compras', desc: 'Calcula si realmente conviene comprar algo en Orlando vs. tu pais.', href: '/shoppinear#calculadora' },
        sections: [
            {
                title: 'PROTOCOLO DE COMPRAS',
                links: [
                    { href: '/shoppinear#protocolo-matriz', label: 'Matriz de Decision' },
                    { href: '/shoppinear#protocolo-ropa', label: 'Ropa y Calzado' },
                    { href: '/shoppinear#protocolo-tecnologia', label: 'Tecnologia' },
                    { href: '/shoppinear#protocolo-souvenirs', label: 'Souvenirs y Merch' },
                ],
            },
            {
                title: 'DONDE COMPRAR',
                links: [
                    { href: '/shoppinear#zonas-outlets', label: 'Premium Outlets' },
                    { href: '/shoppinear#zonas-springs', label: 'Disney Springs' },
                    { href: '/shoppinear#zonas-walmart', label: 'Walmart & Target' },
                    { href: '/shoppinear#zonas-todas', label: 'Ver Todas las Zonas', highlight: true },
                ],
            },
            {
                title: 'HERRAMIENTAS',
                links: [
                    { href: '/shoppinear#calculadora', label: 'Calculadora de Compras', highlight: true },
                    { href: '/shoppinear#tips-ahorro', label: 'Tips de Ahorro' },
                    { href: '/shoppinear#tips-tax', label: 'Guia Tax-Free' },
                ],
            },
        ],
    },
    { id: 'mapping', label: 'Mapping Anual', href: '/mapping' },
    { id: 'faq', label: 'FAQ', href: '/#faq' },
];
