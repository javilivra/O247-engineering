'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Icon } from '@/components/Icon';

// 🗺️ DICCIONARIO DE MARCA
const PATH_MAP: Record<string, string> = {
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
    "tron": "TRON Lightcycle / Run",
    "space": "Space Mountain",
    "velocicoaster": "VelociCoaster",
    "seven-dwarfs": "Seven Dwarfs Mine Train",
    "tiana": "Tiana's Bayou Adventure",
};

// 🎢 ESTRUCTURA DE PARQUES
const RESORT_DATA: Record<string, { name: string; parks: { id: string; name: string }[] }> = {
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


// 🌑 LISTA DE RUTAS CON HERO OSCURO
const DARK_HERO_PATHS = [
    "tron",
    "space",
    "velocicoaster"
];

export default function GlobalBreadcrumbs() {
    const pathname = usePathname();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [hasHydrated, setHasHydrated] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setHasHydrated(true);
    }, []);

    // Cerrar dropdown al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);


    if (!hasHydrated || pathname === '/') {
        return null;
    }

    const handleToggleDropdown = (name: string) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    const pathSegments = pathname.split('/').filter(segment => segment !== '' && segment !== 'parks');
    const isDarkMode = pathSegments.some(seg => DARK_HERO_PATHS.includes(seg));
    
    const textColor = isDarkMode ? "text-white/60" : "text-gunmetal/60";
    const hoverTextColor = isDarkMode ? "hover:text-white" : "hover:text-gunmetal";
    const separatorColor = isDarkMode ? "text-white/20" : "text-gunmetal/20";
    const activeColor = "text-celeste"; 

    const positionClass = isDarkMode 
        ? "absolute top-[90px] left-0 z-30" 
        : "relative mt-20 mb-2 z-30";

    const getName = (segment: string) => PATH_MAP[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    const generateHref = (segments: string[], index: number) => {
        const currentPath = segments.slice(0, index + 1);
        if (currentPath[0] === 'disney' && currentPath.length === 1) return '/disney/parks';
        if (currentPath[0] === 'universal' && currentPath.length === 1) return '/universal/parks';
        if ((currentPath[0] === 'disney' || currentPath[0] === 'universal') && currentPath.length > 1) {
            return `/${currentPath[0]}/${currentPath.slice(1).join('/')}`;
        }
        return `/${currentPath.join('/')}`;
    };

    const getSiblings = (resortId: string, parkId: string) => {
        const resort = RESORT_DATA[resortId];
        if (!resort) return [];
        return resort.parks.filter(p => p.id !== parkId);
    }

    const segmentsData = pathSegments.map((seg, i) => {
        const resortSegment = pathSegments[0];
        const isParkSegment = RESORT_DATA[resortSegment]?.parks.some(p => p.id === seg);
        return {
            name: getName(seg),
            href: generateHref(pathSegments, i),
            isInteractive: isParkSegment,
            siblings: isParkSegment ? getSiblings(resortSegment, seg) : []
        };
    });

    return (
        <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`${positionClass} px-6 md:px-12 w-full pointer-events-none`}
        >
            <div className="max-w-7xl mx-auto">
                <nav className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest pointer-events-auto w-fit flex-wrap leading-none">
                    
                    <Link href="/" className={`${textColor} ${hoverTextColor} transition-colors flex items-center gap-1 group font-medium`}>
                        <span className="group-hover:underline decoration-celeste decoration-2 underline-offset-4">INICIO</span>
                    </Link>

                    <span className={`${separatorColor} font-light`}>/</span>

                    {segmentsData.map((segment, index) => {
                        const isLast = index === segmentsData.length - 1;
                        let elementToRender;

                        if (segment.isInteractive) {
                            elementToRender = (
                                <div className="relative flex items-center" ref={dropdownRef}>
                                    {isLast ? (
                                        <span className={`${activeColor} font-bold drop-shadow-sm`}>{segment.name}</span>
                                    ) : (
                                        <Link href={segment.href!} className={`${textColor} ${hoverTextColor} transition-colors hover:underline decoration-celeste/30 decoration-1 underline-offset-4 font-medium`}>
                                            {segment.name}
                                        </Link>
                                    )}
                                    <button onClick={() => handleToggleDropdown(segment.name)} className={`ml-1 p-0.5 rounded-sm transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}>
                                        <Icon
                                            icon="solar:alt-arrow-down-linear"
                                            width={10}
                                            className={`transition-transform duration-200 ${openDropdown === segment.name ? 'rotate-180' : ''} ${isLast ? activeColor : textColor}`}
                                        />
                                    </button>

                                    <AnimatePresence>
                                    {openDropdown === segment.name && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: -5, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -5, scale: 0.98 }}
                                            transition={{ duration: 0.2, ease: "easeOut" }}
                                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 w-max min-w-[160px] bg-white rounded-lg shadow-xl border border-gunmetal/5 py-1.5 z-50 pointer-events-auto"
                                        >
                                            {segment.siblings.map(sibling => (
                                                <Link key={sibling.id} href={`/${pathSegments[0]}/${sibling.id}`} className="block uppercase px-4 py-1.5 text-xs text-gunmetal hover:bg-gunmetal/5 transition-colors whitespace-nowrap text-center font-sans tracking-normal font-medium">
                                                    {sibling.name}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                    </AnimatePresence>
                                </div>
                            );
                        } else {
                            if (isLast) {
                                elementToRender = <span className={`${activeColor} font-bold drop-shadow-sm cursor-default`}>{segment.name}</span>;
                            } else {
                                elementToRender = <Link href={segment.href!} className={`${textColor} ${hoverTextColor} transition-colors hover:underline decoration-celeste/30 decoration-1 underline-offset-4 font-medium`}>{segment.name}</Link>;
                            }
                        }

                        return (
                            <div key={index} className="flex items-center gap-2">
                                {elementToRender}
                                {!isLast && <span className={`${separatorColor} font-light`}>/</span>}
                            </div>
                        );
                    })}
                </nav>
            </div>
        </motion.div>
    );
}