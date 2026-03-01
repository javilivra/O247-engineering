// @STATUS: REFACTORED V7.2 -- Update Orlando navigation
"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavbar } from '@/context/NavbarContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const IconHamburger = () => (
  <svg width={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const IconClose = () => (
  <svg width={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);
const IconChevron = ({ open }: { open: boolean }) => (
  <svg width={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);
const IconPlus = () => (
  <svg width={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 6v12m-6-6h12" />
  </svg>
);
const IconMinus = () => (
  <svg width={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 12h12" />
  </svg>
);
const IconArrow = () => (
  <svg width={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

interface NavItem {
  id: string;
  label: string;
  href?: string;
  sections?: NavSection[];
  spotlight?: { tag: string; title: string; desc: string; href?: string; };
}
interface NavSection {
  title: string;
  links: { href: string; label: string; badge?: string; highlight?: boolean }[];
}

const NAV_ITEMS: NavItem[] = [
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
          { href: '/disney/tickets', label: 'Comprar Tickets Disney'},
          { href: '/universal/tickets', label: 'Comprar Tickets Universal'},
          { href: '/orlando/mapa', label: 'Mapa Interactivo' },
        ],
      },
      {
        title: 'EXTRAS',
        links: [
          { href: '/orlando/gastronomia', label: 'Gastronomía' },
          { href: '/shoppinear', label: 'Guía de Compras'},
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

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [desktopMenu, setDesktopMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const { mode: navbarMode } = useNavbar();
  const isHome = pathname === '/';
  const isAttractionPage = (() => {
    const segments = pathname.split('/').filter(Boolean);
    return segments.length >= 3 && (segments[0] === 'disney' || segments[0] === 'universal');
  })();
  const isOrlandoGuide = pathname === '/orlando'; const isTransparentHero = navbarMode === 'dark' || isHome || isAttractionPage || isOrlandoGuide;

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
    setDesktopMenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

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

  useEffect(() => {
    if (!mobileOpen || !mobileMenuRef.current) return;
    const menu = mobileMenuRef.current;
    const focusableEls = menu.querySelectorAll<HTMLElement>('a[href], button, [tabindex]:not([tabindex="-1"])');
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];
    firstEl?.focus();
    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === firstEl) { e.preventDefault(); lastEl?.focus(); }
      } else {
        if (document.activeElement === lastEl) { e.preventDefault(); firstEl?.focus(); }
      }
    };
    document.addEventListener('keydown', trapFocus);
    return () => document.removeEventListener('keydown', trapFocus);
  }, [mobileOpen]);

  const isDesktopMenuOpen = !!desktopMenu;

  // Logo animation state and logic
  const [logoExpanded, setLogoExpanded] = useState(false);
  const [logoCollapsing, setLogoCollapsing] = useState(false);
  const periodicRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const expandLogo = useCallback(() => {
    setLogoCollapsing(false);
    setLogoExpanded(true);
  }, []);

  const collapseLogo = useCallback(() => {
    setLogoCollapsing(true);
    setLogoExpanded(false);
    setTimeout(() => setLogoCollapsing(false), 400);
  }, []);

  const schedulePeriodic = useCallback(() => {
    if (periodicRef.current) clearTimeout(periodicRef.current);
    periodicRef.current = setTimeout(() => {
      expandLogo();
      setTimeout(() => collapseLogo(), 2500);
      schedulePeriodic();
    }, 90000);
  }, [expandLogo, collapseLogo]);

  useEffect(() => {
    const t = setTimeout(() => {
      expandLogo();
      setTimeout(() => {
        if (window.scrollY > 20) collapseLogo();
      }, 2500);
    }, 600);
    schedulePeriodic();
    return () => {
      clearTimeout(t);
      if (periodicRef.current) clearTimeout(periodicRef.current);
    };
  }, [expandLogo, collapseLogo, schedulePeriodic]);

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

  const logoExpandedRef = useRef(logoExpanded);
  useEffect(() => { logoExpandedRef.current = logoExpanded; }, [logoExpanded]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY > 20;
          if (scrolled && logoExpandedRef.current) collapseLogo();
          if (!scrolled && !logoExpandedRef.current) expandLogo();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [expandLogo, collapseLogo]);

  const useDarkText = !isDesktopMenuOpen && ((isTransparentHero && isScrolled) || !isTransparentHero);

  const navBg = isDesktopMenuOpen
    ? 'bg-transparent border-transparent'
    : isScrolled
      ? 'bg-white/90 backdrop-blur-md border-b border-gunmetal/6 shadow-sm'
      : isTransparentHero
        ? 'bg-transparent border-transparent'
        : 'bg-bone/95 backdrop-blur-sm border-b border-gunmetal/8';

  const logoClass = useDarkText ? 'text-gunmetal' : 'text-white';

  const toggleMobileSection = useCallback((id: string) => {
    setMobileExpanded((prev) => (prev === id ? null : id));
  }, []);

  return (
    <>
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

      <header
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ease-out ${navBg}`}
        onMouseLeave={() => setDesktopMenu(null)}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 h-[72px] md:h-[80px] flex items-center justify-between relative z-50">
          <Link href="/" className="flex items-center group" aria-label="O247 — Ir al inicio" style={{ textDecoration: 'none' }}>
            <span className={`text-2xl font-bold tracking-tight antialiased font-display transition-colors duration-300 flex items-center ${logoClass}`}>
              <span>O</span>
              <span style={{
                  display: 'block',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  maxWidth: logoExpanded ? '120px' : '0px',
                  opacity: logoExpanded ? 1 : 0,
                  letterSpacing: logoExpanded ? '-0.02em' : '-0.1em',
                  transition: logoCollapsing
                    ? 'max-width 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease 0s, letter-spacing 0.5s ease'
                    : 'max-width 1.0s cubic-bezier(0.16,1,0.3,1), opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s, letter-spacing 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s',
                }}>
                RLANDO
              </span>
              <span>247</span>
            </span>
          </Link>

          <nav className="hidden xl:flex items-center gap-1 h-full" aria-label="Navegación principal">
            {NAV_ITEMS.map((item) => (
              <div key={item.id} className="h-full flex items-center group" onMouseEnter={() => !item.href && setDesktopMenu(item.id)}>
                {item.href ? (
                  <Link href={item.href} className={`px-4 py-2 text-[14px] tracking-wide antialiased font-sans font-medium transition-colors duration-300 relative group ${pathname === item.href ? 'text-celeste' : useDarkText ? 'text-gunmetal hover:text-sunset' : 'text-white hover:text-sunset'}`}>
                    {item.label}
                    {pathname === item.href && (
                      <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-celeste rounded-full" />
                    )}
                  </Link>
                ) : (
                  <button className={`px-4 py-2 flex items-center gap-1.5 text-[14px] tracking-wide outline-none cursor-pointer antialiased font-sans font-medium transition-colors duration-300 ${desktopMenu === item.id ? 'text-white font-bold' : pathname.startsWith(`/${item.id}`) ? 'text-celeste' : useDarkText ? 'text-gunmetal hover:text-sunset' : 'text-white hover:text-sunset'}`} aria-expanded={desktopMenu === item.id} aria-haspopup="true">
                    <span className="relative">
                      {item.label}
                      {!desktopMenu && pathname.startsWith(`/${item.id}`) && (
                        <span className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-celeste rounded-full" />
                      )}
                    </span>
                    <span className={`transition-colors duration-300 ${desktopMenu === item.id ? 'text-sunset' : useDarkText ? 'text-gunmetal/40 group-hover:text-sunset' : 'text-white/40 group-hover:text-sunset'}`}>
                      <IconChevron open={desktopMenu === item.id} />
                    </span>
                  </button>
                )}
              </div>
            ))}
          </nav>

          <button className={`xl:hidden p-3 min-w-[48px] min-h-[48px] flex items-center justify-center transition-colors duration-300 ${useDarkText ? 'text-gunmetal' : 'text-white'}`} onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={mobileOpen} aria-controls="mobile-menu">
            {mobileOpen ? <IconClose /> : <IconHamburger />}
          </button>
        </div>

        <AnimatePresence>
          {desktopMenu && (() => {
            const item = NAV_ITEMS.find((i) => i.id === desktopMenu);
            if (!item?.sections) return null;
            return (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="absolute top-[80px] left-0 w-full hidden xl:block overflow-hidden origin-top z-50" style={{ marginTop: '-8px', paddingTop: '8px' }} onMouseEnter={() => setDesktopMenu(desktopMenu)} onMouseLeave={() => setDesktopMenu(null)}>
                <div className="max-w-[1400px] mx-auto px-8 pb-16 pt-0">
                  <div className="w-full h-px bg-white/10 mb-10" />
                  <div className="flex gap-12">
                    <div className="flex gap-10 flex-1">
                      {item.sections.map((section) => (
                        <div key={section.title} className="min-w-[180px]">
                          <div className="mb-5 text-[11px] font-bold tracking-[0.2em] text-white/40 uppercase font-mono">{section.title}</div>
                          <div className="flex flex-col gap-1">
                            {section.links.map((link) => (
                              <Link key={link.href} href={link.href} onClick={() => setDesktopMenu(null)} className="group flex items-center justify-between w-full py-2 pr-4">
                                <div className="flex items-center gap-2">
                                  <span className={`text-[14px] font-medium tracking-tight transition-colors duration-200 antialiased font-sans ${link.highlight ? 'text-sunset drop-shadow-[0_0_8px_rgba(255,112,67,0.4)]' : 'text-white/90 group-hover:text-sunset'}`}>
                                    {link.label}
                                  </span>
                                  {link.badge && (
                                    <span className="px-1.5 py-0.5 bg-sunset text-gunmetal text-[9px] font-bold rounded-sm tracking-wide font-mono">{link.badge}</span>
                                  )}
                                </div>
                                <span className="text-sunset opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-[-10px] group-hover:translate-x-0"><IconArrow /></span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    {item.spotlight && (
                      <div className="w-[280px] border-l border-white/10 pl-10">
                        <div className="flex items-center gap-2 mb-4 text-white/40">
                          <span className="text-[10px] font-bold tracking-[0.2em] uppercase font-mono">{item.spotlight.tag}</span>
                        </div>
                        {item.spotlight.href ? (
                          <Link href={item.spotlight.href} onClick={() => setDesktopMenu(null)} className="group block">
                            <h3 className="text-xl font-bold text-white mb-2 leading-tight font-display tracking-tight group-hover:text-sunset transition-colors duration-200">{item.spotlight.title}</h3>
                            <p className="text-[13px] text-white/60 leading-relaxed font-medium font-sans mb-3">{item.spotlight.desc}</p>
                            <span className="text-[11px] font-bold text-sunset uppercase tracking-widest font-mono flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">Ver más <IconArrow /></span>
                          </Link>
                        ) : (
                          <>
                            <h3 className="text-xl font-bold text-white mb-2 leading-tight font-display tracking-tight">{item.spotlight.title}</h3>
                            <p className="text-[13px] text-white/60 leading-relaxed font-medium font-sans">{item.spotlight.desc}</p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div id="mobile-menu" ref={mobileMenuRef} role="dialog" aria-modal="true" aria-label="Menú de navegación" initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} className="fixed inset-0 bg-gunmetal z-[60] flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between px-6 h-[72px] border-b border-white/10 shrink-0">
              <Link href="/" className="text-2xl font-bold text-white font-display tracking-tight" onClick={() => setMobileOpen(false)}>O247</Link>
              <button onClick={() => setMobileOpen(false)} className="p-3 min-w-[48px] min-h-[48px] flex items-center justify-center text-white/60 hover:text-white transition-colors" aria-label="Cerrar menú"><IconClose /></button>
            </div>

            <nav className="flex-1 px-6 pt-6 pb-8" aria-label="Navegación móvil">
              <div className="flex flex-col gap-2">
                {NAV_ITEMS.map((item) => {
                  if (item.href) {
                    return (
                      <Link key={item.id} href={item.href} onClick={() => setMobileOpen(false)} className={`flex items-center justify-between py-4 px-4 font-medium text-base rounded-xl hover:bg-white/5 transition-colors min-h-[48px] ${pathname === item.href ? 'text-celeste' : 'text-white'}`}>
                        <span className="flex items-center gap-2">
                          {pathname === item.href && <span className="w-1.5 h-1.5 rounded-full bg-celeste shrink-0" />}
                          {item.label}
                        </span>
                        <IconArrow />
                      </Link>
                    );
                  }
                  const isExpanded = mobileExpanded === item.id;
                  return (
                    <div key={item.id}>
                      <button onClick={() => toggleMobileSection(item.id)} className={`flex items-center justify-between w-full py-4 px-4 font-medium text-base rounded-xl transition-colors min-h-[48px] ${isExpanded ? 'bg-white/5' : 'hover:bg-white/5'} ${pathname.startsWith(`/${item.id}`) && !isExpanded ? 'text-celeste' : 'text-white'}`} aria-expanded={isExpanded}>
                        <span className="flex items-center gap-2">
                          {pathname.startsWith(`/${item.id}`) && <span className="w-1.5 h-1.5 rounded-full bg-celeste shrink-0" />}
                          {item.label}
                        </span>
                        <IconChevron open={isExpanded} />
                      </button>
                      <AnimatePresence>
                        {isExpanded && item.sections && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                            <div className="pl-4 pr-2 pb-4 pt-2">
                              {item.sections.map((section) => (
                                <div key={section.title} className="mb-4 last:mb-0">
                                  <div className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase font-mono mb-3 px-4">{section.title}</div>
                                  {section.links.map((link) => (
                                    <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-white/5 transition-colors min-h-[44px]">
                                      <span className={`text-sm font-medium ${link.highlight ? 'text-sunset' : 'text-white/80'}`}>{link.label}</span>
                                      {link.badge && <span className="px-1.5 py-0.5 bg-sunset text-gunmetal text-[9px] font-bold rounded-sm tracking-wide font-mono">{link.badge}</span>}
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
