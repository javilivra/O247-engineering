// @STATUS: REFACTORED V7.0 -- NEW IA STRUCTURE FOR "PLANIFICAR ORLANDO"
"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// --- ICONOS SVG (Inline, zero-dependency) ---
const IconHamburger = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const IconClose = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);
const IconChevron = ({ open }: { open: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);
const IconPlus = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 6v12m-6-6h12" />
  </svg>
);
const IconMinus = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 12h12" />
  </svg>
);
const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

// --- DATA ---
interface NavItem {
  id: string;
  label: string;
  href?: string;          // Link directo (FAQ, News, Mapping)
  sections?: NavSection[]; // Mega menu sections
  spotlight?: {
    tag: string;
    title: string;
    desc: string;
  };
}

interface NavSection {
  title: string;
  links: { href: string; label: string; badge?: string; highlight?: boolean }[];
}

const NAV_ITEMS: NavItem[] = [
  // 1. PLANIFICAR ORLANDO (Nuevo orden y estructura)
  {
    id: 'planning',
    label: 'Orlando',
    spotlight: { tag: 'HERRAMIENTA', title: 'Calculadora de Presupuesto', desc: 'Estima el costo real de tu viaje en 2 minutos.' },
    sections: [
      {
        title: 'ESTRATEGIA TEMPORAL',
        links: [
          { href: '/planning/dates', label: 'El Algoritmo de Fechas' },
          { href: '/planning/duration', label: 'Calculadora de Duración' },
          { href: '/planning/budget', label: 'Presupuesto y Costos' },
          { href: '/planning/weather', label: 'Clima y Multitudes' },
        ],
      },
      {
        title: 'INFRAESTRUCTURA',
        links: [
          { href: '/planning/hotels', label: 'Matriz de Alojamiento' },
          { href: '/planning/transport', label: 'Auto vs. Uber' },
          { href: '/planning/airport', label: 'Traslados Aeropuerto (MCO)' },
          { href: '/planning/brightline', label: 'Conexión Miami (Brightline)' },
        ],
      },
      {
        title: 'ACCESO TÁCTICO',
        links: [
          { href: '/planning/tickets-guide', label: 'Ingeniería de Tickets' },
          { href: '/disney/tickets', label: 'Tickets Disney: Base vs. Hopper' },
          { href: '/universal/tickets', label: 'Tickets Universal: Park-to-Park' },
          { href: '/planning/map', label: 'Mapa General de Parques' },
        ],
      },
      {
        title: 'FACTOR HUMANO',
        links: [
          { href: '/planning/kids', label: 'Protocolo Infantil' },
          { href: '/planning/rider-switch', label: 'Rider Switch & Strollers' },
          { href: '/planning/dining', label: 'Gastronomía: Tipos de Comida' },
          { href: '/shoppinear', label: 'Compras: Outlets & Malls' },
        ],
      },
    ],
  },
  // 2. DISNEY WORLD
  {
    id: 'disney',
    label: 'Disney World',
    spotlight: { tag: 'DESTACADO', title: 'Guía Lightning Lane', desc: 'Domina el sistema de filas rápidas y evita esperas.' },
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
  // 3. UNIVERSAL
  {
    id: 'universal',
    label: 'Universal',
    spotlight: { tag: 'NUEVO', title: 'Epic Universe 2025', desc: 'Todo sobre el nuevo parque temático más grande.' },
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
  // 4. SHOPPINEAR
  {
    id: 'shoppinear',
    label: 'Shoppinear',
    spotlight: { tag: 'UTIL', title: 'Calculadora de Compras', desc: 'Calcula si realmente conviene comprar algo en Orlando vs. tu pais.' },
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
  // 5. MAPPING ANUAL
  { 
    id: 'mapping', 
    label: 'Mapping Anual', 
    href: '/mapping' 
  },
  // 6. FAQ
  { id: 'faq', label: 'FAQ', href: '/#faq' },
];

// --- COMPONENTE PRINCIPAL ---
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [desktopMenu, setDesktopMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // -- Detección de páginas con hero oscuro --
  const isHome = pathname === '/';
  const IMMERSIVE_PATHS = ['tron', 'space', 'velocicoaster'];
  const isImmersive = IMMERSIVE_PATHS.some((p) => pathname.includes(p));
  const isTransparentHero = isHome || isImmersive;

  // -- Scroll detection (throttled via rAF) --
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // -- Cerrar menú mobile al navegar --
  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
    setDesktopMenu(null);
  }, [pathname]);

  // -- Scroll lock cuando menú mobile está abierto --
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // -- Escape handler --
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileOpen) setMobileOpen(false);
        if (desktopMenu) setDesktopMenu(null);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen, desktopMenu]);

  // -- Focus trap para menú mobile --
  useEffect(() => {
    if (!mobileOpen || !mobileMenuRef.current) return;

    const menu = mobileMenuRef.current;
    const focusableSelector = 'a[href], button, [tabindex]:not([tabindex="-1"])';
    const focusableEls = menu.querySelectorAll<HTMLElement>(focusableSelector);
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    // Focus al primer elemento al abrir
    firstEl?.focus();

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl?.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl?.focus();
        }
      }
    };

    document.addEventListener('keydown', trapFocus);
    return () => document.removeEventListener('keydown', trapFocus);
  }, [mobileOpen]);

  // -- Lógica visual --
  const isDesktopMenuOpen = !!desktopMenu;

  const useDarkText = !isDesktopMenuOpen && (
    (isTransparentHero && isScrolled) || !isTransparentHero
  );

  const navBg = isDesktopMenuOpen
    ? 'bg-transparent border-transparent'
    : isScrolled
      ? 'bg-white/80 backdrop-blur-md border-b border-gunmetal/5 shadow-sm'
      : 'bg-transparent border-transparent';

  const textClass = useDarkText
    ? 'text-gunmetal hover:text-gunmetal/70'
    : 'text-white hover:text-white/80';

  const logoClass = useDarkText ? 'text-gunmetal' : 'text-white';

  // -- Toggle mobile sub-menu --
  const toggleMobileSection = useCallback((id: string) => {
    setMobileExpanded((prev) => (prev === id ? null : id));
  }, []);

  return (
    <>
      {/* == BACKDROP MEGA MENU (Desktop) == */}
      <AnimatePresence>
        {desktopMenu && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-gunmetal/60 backdrop-blur-3xl"
            onClick={() => setDesktopMenu(null)}
          />
        )}
      </AnimatePresence>

      {/* == HEADER == */}
      <header
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${navBg}`}
        onMouseLeave={() => setDesktopMenu(null)}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 h-[72px] md:h-[80px] flex items-center justify-between relative z-50">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="O247 -- Ir al inicio">
            <span className={`text-2xl font-bold tracking-tight antialiased font-display ${logoClass}`}>
              O247
            </span>
          </Link>

          {/* NAV DESKTOP */}
          <nav className="hidden xl:flex items-center gap-1 h-full" aria-label="Navegación principal">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.id}
                className="h-full flex items-center"
                onMouseEnter={() => !item.href && setDesktopMenu(item.id)}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`px-4 py-2 text-[14px] tracking-wide antialiased font-sans font-medium transition-colors duration-300 ${textClass}`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    className={`px-4 py-2 flex items-center gap-1.5 text-[14px] tracking-wide outline-none cursor-default antialiased font-sans font-medium transition-colors duration-300 ${
                      desktopMenu === item.id ? 'text-white font-bold' : textClass
                    }`}
                    aria-expanded={desktopMenu === item.id}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <span className={desktopMenu === item.id ? 'text-sunset' : useDarkText ? 'text-gunmetal/40' : 'text-white/40'}>
                      {desktopMenu === item.id ? <IconMinus /> : <IconPlus />}
                    </span>
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* HAMBURGER (Mobile) */}
          <button
            className={`xl:hidden p-3 min-w-[48px] min-h-[48px] flex items-center justify-center ${useDarkText ? 'text-gunmetal' : 'text-white'} transition-colors duration-300`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <IconClose /> : <IconHamburger />}
          </button>
        </div>

        {/* == MEGA MENU DESKTOP == */}
        <AnimatePresence>
          {desktopMenu && (() => {
            const item = NAV_ITEMS.find((i) => i.id === desktopMenu);
            if (!item?.sections) return null;
            return (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-[80px] left-0 w-full hidden xl:block overflow-hidden origin-top z-50"
                onMouseEnter={() => setDesktopMenu(desktopMenu)}
                onMouseLeave={() => setDesktopMenu(null)}
              >
                <div className="max-w-[1400px] mx-auto px-8 pb-16 pt-0">
                  <div className="w-full h-px bg-white/10 mb-10" />

                  <div className="flex gap-12">
                    {/* COLUMNAS DE LINKS */}
                    <div className="flex gap-10 flex-1">
                      {item.sections.map((section) => (
                        <div key={section.title} className="min-w-[180px]">
                          <div className="mb-5 text-[11px] font-bold tracking-[0.2em] text-white/40 uppercase font-mono">
                            {section.title}
                          </div>
                          <div className="flex flex-col gap-1">
                            {section.links.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setDesktopMenu(null)}
                                className="group flex items-center justify-between w-full py-2 pr-4"
                              >
                                <div className="flex items-center gap-2">
                                  <span className={`text-[14px] font-medium tracking-tight transition-colors duration-200 antialiased font-sans ${
                                    link.highlight
                                      ? 'text-sunset drop-shadow-[0_0_8px_rgba(255,112,67,0.4)]'
                                      : 'text-white/90 group-hover:text-sunset'
                                  }`}>
                                    {link.label}
                                  </span>
                                  {link.badge && (
                                    <span className="px-1.5 py-0.5 bg-sunset text-gunmetal text-[9px] font-bold rounded-sm tracking-wide font-mono">
                                      {link.badge}
                                    </span>
                                  )}
                                </div>
                                <span className="text-sunset opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-[-10px] group-hover:translate-x-0">
                                  <IconArrow />
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* SPOTLIGHT */}
                    {item.spotlight && (
                      <div className="w-[280px] border-l border-white/10 pl-10">
                        <div className="flex items-center gap-2 mb-4 text-white/40">
                          <span className="text-[10px] font-bold tracking-[0.2em] uppercase font-mono">{item.spotlight.tag}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 leading-tight font-display tracking-tight">
                          {item.spotlight.title}
                        </h3>
                        <p className="text-[13px] text-white/60 leading-relaxed font-medium font-sans">
                          {item.spotlight.desc}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </header>

      {/* == MENÚ MOBILE (Full-screen overlay) == */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 bg-gunmetal z-[60] flex flex-col overflow-y-auto"
          >
            {/* Header del menú mobile */}
            <div className="flex items-center justify-between px-6 h-[72px] border-b border-white/10 shrink-0">
              <Link href="/" className="text-2xl font-bold text-white font-display tracking-tight" onClick={() => setMobileOpen(false)}>
                O247
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-3 min-w-[48px] min-h-[48px] flex items-center justify-center text-white/60 hover:text-white transition-colors"
                aria-label="Cerrar menú"
              >
                <IconClose />
              </button>
            </div>

            {/* Items de navegación */}
            <nav className="flex-1 px-6 pt-6 pb-8" aria-label="Navegación móvil">
              <div className="flex flex-col gap-2">
                {NAV_ITEMS.map((item) => {
                  if (item.href) {
                    // Link directo
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between py-4 px-4 text-white font-medium text-base rounded-xl hover:bg-white/5 transition-colors min-h-[48px]"
                      >
                        {item.label}
                        <IconArrow />
                      </Link>
                    );
                  }

                  // Sección expandible
                  const isExpanded = mobileExpanded === item.id;
                  return (
                    <div key={item.id}>
                      <button
                        onClick={() => toggleMobileSection(item.id)}
                        className={`flex items-center justify-between w-full py-4 px-4 text-white font-medium text-base rounded-xl transition-colors min-h-[48px] ${
                          isExpanded ? 'bg-white/5' : 'hover:bg-white/5'
                        }`}
                        aria-expanded={isExpanded}
                      >
                        <span>{item.label}</span>
                        <IconChevron open={isExpanded} />
                      </button>

                      <AnimatePresence>
                        {isExpanded && item.sections && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pr-2 pb-4 pt-2">
                              {item.sections.map((section) => (
                                <div key={section.title} className="mb-4 last:mb-0">
                                  <div className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase font-mono mb-3 px-4">
                                    {section.title}
                                  </div>
                                  {section.links.map((link) => (
                                    <Link
                                      key={link.href}
                                      href={link.href}
                                      onClick={() => setMobileOpen(false)}
                                      className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-white/5 transition-colors min-h-[44px]"
                                    >
                                      <span className={`text-sm font-medium ${
                                        link.highlight ? 'text-sunset' : 'text-white/80'
                                      }`}>
                                        {link.label}
                                      </span>
                                      {link.badge && (
                                        <span className="px-1.5 py-0.5 bg-sunset text-gunmetal text-[9px] font-bold rounded-sm tracking-wide font-mono">
                                          {link.badge}
                                        </span>
                                      )}
                                    </Link>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </nav>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}