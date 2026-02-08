"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

// 🗺️ DICCIONARIO DE MARCA
const PATH_MAP: Record<string, string> = {
    "disney": "Disney World",
    "mk": "Magic Kingdom",
    "epcot": "EPCOT",
    "hs": "Hollywood Studios",
    "ak": "Animal Kingdom",
    "attractions": "Atracciones",
    "dining": "Gastronomía",
    "resorts": "Hoteles",
    "tron": "TRON Lightcycle / Run",
    "space": "Space Mountain",
    "velocicoaster": "VelociCoaster",
    "seven-dwarfs": "Seven Dwarfs Mine Train",
    "tiana": "Tiana's Bayou Adventure",
};

// 🌑 LISTA DE RUTAS CON HERO OSCURO
const DARK_HERO_PATHS = [
    "tron",
    "space",
    "velocicoaster"
];

export default function GlobalBreadcrumbs() {
    const pathname = usePathname();

    if (pathname === '/') return null;

    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    const isDarkMode = pathSegments.some(seg => DARK_HERO_PATHS.includes(seg));
    
    // Clases dinámicas de Color
    const textColor = isDarkMode ? "text-white/60 hover:text-white" : "text-gunmetal/60 hover:text-gunmetal";
    const separatorColor = isDarkMode ? "text-white/20" : "text-gunmetal/20";
    const activeColor = "text-celeste"; 
    const ellipsisColor = isDarkMode ? "text-white/30" : "text-gunmetal/30";

    // LÓGICA DE POSICIONAMIENTO OPTIMIZADA (Sin espacios muertos)
    // Absolute: top-[90px] -> Justo debajo del navbar transparente.
    // Relative: mt-20 -> (80px) Compensa exactamente la altura del navbar fijo, sin gap extra.
    const positionClass = isDarkMode 
        ? "absolute top-[90px] left-0 z-30" 
        : "relative mt-20 mb-2 z-30";

    let visibleSegments = [];
    const TRIGGER_COMPRESSION_AT = 3; 
    const SHOW_LAST_N = 3; 

    const getName = (segment: string) => PATH_MAP[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    if (pathSegments.length > TRIGGER_COMPRESSION_AT) {
        visibleSegments = [
            { name: "...", href: null, isEllipsis: true },
            ...pathSegments.slice(-SHOW_LAST_N).map((seg, i) => ({
                name: getName(seg),
                href: `/${pathSegments.slice(0, pathSegments.length - SHOW_LAST_N + i + 1).join('/')}`,
                isEllipsis: false
            }))
        ];
    } else {
        visibleSegments = pathSegments.map((seg, i) => ({
            name: getName(seg),
            href: `/${pathSegments.slice(0, i + 1).join('/')}`,
            isEllipsis: false
        }));
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`${positionClass} px-6 md:px-12 w-full pointer-events-none`}
        >
            <div className="max-w-7xl mx-auto">
                <nav className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest pointer-events-auto w-fit flex-wrap leading-none">
                    
                    <Link href="/" className={`${textColor} transition-colors flex items-center gap-1 group font-medium`}>
                        <span className="group-hover:underline decoration-celeste decoration-2 underline-offset-4">INICIO</span>
                    </Link>

                    <span className={`${separatorColor} font-light`}>/</span>

                    {visibleSegments.map((segment, index) => {
                        const isLast = index === visibleSegments.length - 1;

                        return (
                            <div key={index} className="flex items-center gap-2">
                                {segment.isEllipsis ? (
                                    <span className={`${ellipsisColor} select-none tracking-widest`}>...</span>
                                ) : isLast ? (
                                    <span className={`${activeColor} font-bold drop-shadow-sm cursor-default`}>
                                        {segment.name}
                                    </span>
                                ) : (
                                    <Link 
                                        href={segment.href!} 
                                        className={`${textColor} transition-colors hover:underline decoration-celeste/30 decoration-1 underline-offset-4 font-medium`}
                                    >
                                        {segment.name}
                                    </Link>
                                )}

                                {!isLast && (
                                    <span className={`${separatorColor} font-light`}>/</span>
                                )}
                            </div>
                        );
                    })}
                </nav>
            </div>
        </motion.div>
    );
}