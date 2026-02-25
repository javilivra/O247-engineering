'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Icon } from '@/components/Icon';

// ============================================================
// DICCIONARIO DE MARCA
// ============================================================
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
  "guide": "Guía",
  "tron-lightcycle-run": "TRON Lightcycle / Run",
  "space-mountain": "Space Mountain",
  "velocicoaster": "VelociCoaster",
  "seven-dwarfs-mine-train": "Seven Dwarfs Mine Train",
  "tianas-bayou-adventure": "Tiana's Bayou Adventure",
};

// ============================================================
// ESTRUCTURA DE PARQUES
// ============================================================
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

// ============================================================
// RUTAS CON HERO OSCURO — slugs reales
// ============================================================
const DARK_HERO_SLUGS = [
  "tron-lightcycle-run",
  "space-mountain",
  "velocicoaster",
  "seven-dwarfs-mine-train",
  "tianas-bayou-adventure",
];

// ============================================================
// ANIMATED UNDERLINE — componente interno
// ============================================================
function AnimatedLink({
  href,
  children,
  className,
  isDark,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  isDark?: boolean;
}) {
  return (
    <Link href={href} className={`group relative ${className || ''}`}>
      <span className={`
        transition-colors duration-200
        ${isDark
          ? 'text-white/50 group-hover:text-white/90'
          : 'text-gunmetal/50 group-hover:text-gunmetal'}
      `}>
        {children}
      </span>
      {/* Underline que crece de izquierda a derecha */}
      <span className={`
        absolute bottom-0 left-0 h-px w-0 
        group-hover:w-full 
        transition-all duration-300 ease-out
        ${isDark ? 'bg-white/40' : 'bg-celeste/60'}
      `} />
    </Link>
  );
}

// ============================================================
// SEPARATOR — animado
// ============================================================
function Separator({ isDark }: { isDark: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      className={`
        select-none font-light transition-colors duration-300
        ${isDark ? 'text-white/15' : 'text-gunmetal/15'}
      `}
    >
      /
    </motion.span>
  );
}

// ============================================================
// DROPDOWN ITEM
// ============================================================
function DropdownItem({
  href,
  name,
  isActive,
}: {
  href: string;
  name: string;
  isActive?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        flex items-center gap-2 px-4 py-2 text-[10px] font-mono uppercase tracking-widest
        transition-all duration-150
        ${isActive
          ? 'text-celeste bg-celeste/5'
          : 'text-gunmetal/60 hover:text-gunmetal hover:bg-gunmetal/4'}
      `}
    >
      {isActive && (
        <span className="w-1 h-1 rounded-full bg-celeste shrink-0" />
      )}
      {!isActive && <span className="w-1 h-1 rounded-full bg-transparent shrink-0" />}
      {name}
    </Link>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function GlobalBreadcrumbs() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hasHydrated, setHasHydrated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setHasHydrated(true); }, []);

  // Cerrar dropdown al hacer clic fuera — ref en el contenedor padre, no en el loop
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!hasHydrated || pathname === '/') return null;

  const pathSegments = pathname.split('/').filter(s => s !== '' && s !== 'parks');
  const isDark = pathSegments.some(seg => DARK_HERO_SLUGS.includes(seg));

  const positionClass = isDark
    ? "absolute top-[90px] left-0 z-30"
    : "relative mt-20 mb-2 z-30";

  const getName = (segment: string) =>
    PATH_MAP[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const generateHref = (segments: string[], index: number) => {
    const current = segments.slice(0, index + 1);
    if (current[0] === 'disney' && current.length === 1) return '/disney/parks';
    if (current[0] === 'universal' && current.length === 1) return '/universal/parks';
    return `/${current[0]}/${current.slice(1).join('/')}`;
  };

  const getSiblings = (resortId: string, parkId: string) =>
    RESORT_DATA[resortId]?.parks || [];

  const segmentsData = pathSegments.map((seg, i) => {
    const resort = pathSegments[0];
    const isPark = RESORT_DATA[resort]?.parks.some(p => p.id === seg);
    return {
      seg,
      name: getName(seg),
      href: generateHref(pathSegments, i),
      isInteractive: isPark,
      siblings: isPark ? getSiblings(resort, seg) : [],
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
      className={`${positionClass} px-6 md:px-12 w-full pointer-events-none hidden md:block`}
    >
      <div className="max-w-7xl mx-auto">
        <nav
          ref={containerRef}
          className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest pointer-events-auto w-fit flex-wrap leading-none"
        >

          {/* HOME — icono con micro-animación */}
          <Link href="/" className="group flex items-center transition-all duration-200">
            <motion.span
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className={`
                flex items-center justify-center
                transition-colors duration-200
                ${isDark ? 'text-white/40 hover:text-white/90' : 'text-gunmetal/35 hover:text-celeste'}
              `}
            >
              <Icon icon="solar:home-bold-duotone" width={14} />
            </motion.span>
          </Link>

          <Separator isDark={isDark} />

          {segmentsData.map((segment, index) => {
            const isLast = index === segmentsData.length - 1;

            return (
              <motion.div
                key={`${segment.seg}-${index}`}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex items-center gap-2"
              >

                {segment.isInteractive ? (
                  /* SEGMENTO CON DROPDOWN */
                  <div className="relative flex items-center gap-0.5">
                    {isLast ? (
                      <span className={`
                        font-bold tracking-widest
                        ${isDark ? 'text-white' : 'text-celeste'}
                        flex items-center gap-0.5
                      `}>
                        {/* Dot activo pulsante */}
                        <motion.span
                          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          className="inline-block w-1 h-1 rounded-full bg-celeste mr-1"
                        />
                        {segment.name}
                      </span>
                    ) : (
                      <AnimatedLink href={segment.href} isDark={isDark}>
                        {segment.name}
                      </AnimatedLink>
                    )}

                    {/* Chevron dropdown */}
                    <motion.button
                      onClick={() => setOpenDropdown(openDropdown === segment.seg ? null : segment.seg)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`
                        ml-0.5 p-0.5 rounded transition-colors duration-150
                        ${isDark
                          ? 'text-white/30 hover:text-white/70 hover:bg-white/8'
                          : 'text-gunmetal/25 hover:text-gunmetal/60 hover:bg-gunmetal/6'}
                      `}
                    >
                      <motion.span
                        animate={{ rotate: openDropdown === segment.seg ? 180 : 0 }}
                        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                        className="flex items-center"
                      >
                        <Icon icon="solar:alt-arrow-down-linear" width={9} />
                      </motion.span>
                    </motion.button>

                    {/* Dropdown */}
                    <AnimatePresence>
                      {openDropdown === segment.seg && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.97 }}
                          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                          className="
                            absolute top-full left-1/2 -translate-x-1/2 mt-3
                            w-max min-w-[180px]
                            bg-white/95 backdrop-blur-xl
                            rounded-xl
                            shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)]
                            border border-gunmetal/6
                            py-1.5
                            z-50
                            overflow-hidden
                          "
                        >
                          {/* Línea de acento superior */}
                          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-celeste/40 to-transparent" />

                          {segment.siblings.map((sibling, si) => (
                            <motion.div
                              key={sibling.id}
                              initial={{ opacity: 0, x: -4 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: si * 0.04, duration: 0.15 }}
                            >
                              <DropdownItem
                                href={`/${pathSegments[0]}/${sibling.id}`}
                                name={sibling.name}
                                isActive={sibling.id === segment.seg}
                              />
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                ) : isLast ? (
                  /* ÚLTIMO SEGMENTO — activo, no linkeable */
                  <span className={`
                    font-bold tracking-widest flex items-center gap-1.5
                    ${isDark ? 'text-white' : 'text-celeste'}
                  `}>
                    <motion.span
                      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="inline-block w-1 h-1 rounded-full bg-celeste"
                    />
                    {segment.name}
                  </span>

                ) : (
                  /* SEGMENTO INTERMEDIO — linkeable */
                  <AnimatedLink href={segment.href} isDark={isDark}>
                    {segment.name}
                  </AnimatedLink>
                )}

                {!isLast && <Separator isDark={isDark} />}
              </motion.div>
            );
          })}
        </nav>
      </div>
    </motion.div>
  );
}