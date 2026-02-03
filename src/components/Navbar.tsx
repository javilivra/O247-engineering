// @STATUS: GOLDEN MASTER V5.4 - TRANSPARENT INTERNAL & DARK TEXT FIX
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// --- ICONOS ---
const Minus = ({ size = 24 }: { size?: number }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 12h12" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const Add = ({ size = 24 }: { size?: number }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 6v12m-6-6h12" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const HamburgerMenu = ({ size = 24 }: { size?: number }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const CloseCircle = ({ size = 24 }: { size?: number }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const StarsMinimalistic = ({ size = 24, className }: { size?: number, className?: string }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}><path d="M12 2L14.3175 9.68253L22 12L14.3175 14.3175L12 22L9.68253 14.3175L2 12L9.68253 9.68253L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const ChevronRight = ({ size = 16 }: { size?: number }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>);

// --- COMPONENTES AUXILIARES ---
const MenuHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-6 text-[11px] font-bold tracking-[0.2em] text-white/40 uppercase leading-relaxed antialiased font-mono">
    {children}
  </div>
);

const MenuLink = ({ href, title, highlight = false, badge }: { href: string, title: string, highlight?: boolean, badge?: string }) => (
  <Link href={href} className="group flex items-center justify-between w-full py-2 pr-4">
    <div className="flex items-center gap-2">
      <span className={`text-[14px] font-medium tracking-tight transition-colors duration-200 antialiased font-sans ${highlight ? 'text-sunset drop-shadow-[0_0_8px_rgba(255,112,67,0.4)]' : 'text-white/90 group-hover:text-sunset'}`}>
        {title}
      </span>
      {badge && (
        <span className="px-1.5 py-0.5 bg-sunset text-gunmetal text-[9px] font-bold rounded-sm tracking-wide shadow-none font-mono">
          {badge}
        </span>
      )}
    </div>
    <motion.div 
      initial={{ opacity: 0, x: -5 }} 
      whileHover={{ opacity: 1, x: 0 }} 
      className="text-sunset opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-[-10px] group-hover:translate-x-0"
    >
      <ChevronRight size={14} />
    </motion.div>
  </Link>
);

// --- DATA ---
const NAV_LABELS = [
  { id: 'planning', label: 'Planning' }, 
  { id: 'disney', label: 'Disney World' }, 
  { id: 'universal', label: 'Universal Studios' }, 
  { id: 'shoppinear', label: 'Shoppinear' }, 
  { id: 'news', label: 'News247', type: 'link', href: '/news' }, 
  { id: 'faq', label: 'FAQ', type: 'link', href: '/#faq' }
];

const SPOTLIGHTS: Record<string, any> = { 
  planning: { 
    tag: 'SPOTLIGHT', 
    title: 'El Algoritmo O247', 
    desc: 'Ingeniería aplicada para maximizar la diversión.',
    imageText: 'ALGORITMO',
    guideTitle: 'Guía de Planificación',
    guideText: 'Define la arquitectura de tu viaje. Desde la optimización logística hasta la sincronización de itinerarios.'
  }, 
  disney: { 
    tag: 'DESTACADO', 
    title: 'Guía Lightning Lane', 
    desc: 'Domina el sistema de filas rápidas y evita esperas.',
    imageText: 'LIGHTNING LANE',
    guideTitle: 'Explora Disney World',
    guideText: 'Navega por los 4 parques temáticos, hoteles resort y sistemas de transporte con precisión.'
  }, 
  universal: { 
    tag: 'NUEVO', 
    title: 'Epic Universe 2025', 
    desc: 'Todo sobre el nuevo parque temático más grande.',
    imageText: 'EPIC UNIVERSE',
    guideTitle: 'Universo de Acción',
    guideText: 'Dos parques legendarios, un parque acuático y el nuevo gigante. Estrategias de recorrido.'
  }, 
  shoppinear: { 
    tag: 'AHORRO', 
    title: 'Cuponeras Premium', 
    desc: 'Accede a descuentos secretos de Outlets.',
    imageText: 'OUTLETS VIP',
    guideTitle: 'Compras Inteligentes',
    guideText: 'Mapas de outlets, cupones digitales y rutas de ahorro estratégico para maximizar tu presupuesto.'
  } 
};

// --- COMPONENTES PRINCIPAL ---
const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  useEffect(() => { setActiveMenu(null); setMobileMenuOpen(false); }, [pathname]);

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 20); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (activeMenu || mobileMenuOpen) { document.body.style.overflow = 'hidden'; } 
    else { document.body.style.overflow = ''; }
    return () => { document.body.style.overflow = ''; };
  }, [activeMenu, mobileMenuOpen]);

  // --- LÓGICA VISUAL ---
  const isMenuOpen = !!activeMenu;

  // 1. Lógica del Fondo (Container)
  let navContainerClass = "";

  if (isMenuOpen) {
    // Si el menú está abierto, transparente (el backdrop hace el trabajo)
    navContainerClass = "bg-transparent border-transparent";
  } else {
    // LÓGICA UNIFICADA:
    // Si hay scroll: Fondo Blanco Vidrioso (Glass)
    // Si NO hay scroll: Transparente (Tanto para Home como para Internas)
    navContainerClass = isScrolled 
      ? "bg-white/80 backdrop-blur-md border-b border-gunmetal/5 shadow-sm" 
      : "bg-transparent border-transparent";
  }

  // 2. Lógica del Texto (Colores)
  // Usamos texto OSCURO (Gunmetal) si:
  // - El menú está CERRADO
  // - Y:
  //    a) Estamos en HOME y hay SCROLL (Fondo blanco -> Texto oscuro)
  //    b) O estamos en INTERNA (Siempre fondo claro -> Texto oscuro desde el inicio)
  const useDarkText = !isMenuOpen && ( (isHome && isScrolled) || !isHome );

  const headerTextColor = useDarkText 
    ? "text-gunmetal hover:text-gunmetal/70" 
    : "text-white hover:text-white/80";
  
  const logoClass = useDarkText ? "text-gunmetal" : "text-white";
  const hamburgerColor = useDarkText ? "text-gunmetal" : "text-white";

  const loginBorder = useDarkText
    ? "border-gunmetal/20 text-gunmetal hover:bg-gunmetal hover:text-white"
    : "border-white/30 text-white hover:bg-white hover:text-gunmetal";


  // --- RENDER SPOTLIGHT ---
  const renderSpotlightCard = (id: string) => {
    const data = SPOTLIGHTS[id]; if (!data) return null;
    return (
      <Link href="#" className="group relative flex flex-col justify-between h-full w-full rounded-2xl overflow-hidden transition-all duration-300">
          <div className="absolute inset-0 bg-transparent group-hover:bg-white transition-colors duration-300 ease-in-out" />
          <div className="p-6 relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4 text-white/40 group-hover:text-gunmetal/40 transition-colors duration-300">
              <StarsMinimalistic size={16} />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase font-mono">{data.tag}</span>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-gunmetal transition-colors duration-300 font-display tracking-tight">{data.title}</h3>
              <p className="text-[13px] text-white/60 leading-relaxed font-medium font-sans group-hover:text-gunmetal/80 transition-colors duration-300">{data.desc}</p>
            </div>
            <div className="mt-auto w-full h-32 rounded-xl bg-white/10 group-hover:bg-sunset/5 transition-colors duration-500 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center text-white/20 group-hover:text-gunmetal/20 font-bold text-xs uppercase tracking-widest transition-colors font-mono">
                [{data.imageText}]
                </div>
            </div>
          </div>
      </Link>
    );
  };

  return (
    <>
      <AnimatePresence>
        {activeMenu && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-gunmetal/60 backdrop-blur-3xl"
            onMouseEnter={() => setActiveMenu(null)} 
          />
        )}
      </AnimatePresence>

      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${navContainerClass}`}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="max-w-[1400px] mx-auto px-8 h-[80px] flex items-center justify-between relative z-50">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className={`text-2xl font-bold tracking-tight antialiased font-display ${logoClass}`}>
              O247
            </span>
          </Link>

          {/* MENU DESKTOP */}
          <nav className="hidden xl:flex items-center gap-1 h-full">
            {NAV_LABELS.map((item) => (
              <div key={item.id} className="h-full flex items-center" onMouseEnter={() => !item.type && setActiveMenu(item.id)}>
                {item.type === 'link' ? (
                  <Link href={item.href || '#'} className={`px-4 py-2 text-[14px] tracking-wide antialiased font-sans font-medium transition-colors duration-300 ${headerTextColor}`}>
                    {item.label}
                  </Link>
                ) : (
                  <button className={`px-4 py-2 flex items-center gap-1.5 text-[14px] tracking-wide outline-none cursor-default antialiased font-sans font-medium transition-colors duration-300 ${activeMenu === item.id ? 'text-white font-bold' : headerTextColor}`}>
                    {item.label}
                    <motion.div initial={false} animate={{ rotate: activeMenu === item.id ? 180 : 0 }} transition={{ duration: 0.3 }} className={`${activeMenu === item.id ? 'text-sunset' : (useDarkText ? 'text-gunmetal/40' : 'text-white/40')}`}>
                       {activeMenu === item.id ? <Minus size={12} /> : <Add size={12} />}
                    </motion.div>
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* BOTONES */}
          <div className="hidden xl:flex items-center gap-3">
            <Link href="/login" className={`px-5 py-2 rounded-full border text-[13px] antialiased transition-all duration-300 font-sans font-medium ${loginBorder}`}>Log In</Link>
            <Link href="/signup" className="relative px-5 py-2 rounded-full bg-sunset text-gunmetal text-[13px] font-bold tracking-wide hover:brightness-110 transition-all duration-300 font-sans overflow-hidden hover:shadow-[0_0_15px_rgba(255,112,67,0.4)]">
              Sign Up
            </Link>
          </div>

          {/* HAMBURGER */}
          <button className={`xl:hidden p-2 ${hamburgerColor} transition-colors duration-300`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <CloseCircle size={28} /> : <HamburgerMenu size={28} />}
          </button>
        </div>

        {/* MEGA MENU */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} 
              className="absolute top-[80px] left-0 w-full hidden xl:block overflow-hidden origin-top z-50"
              onMouseEnter={() => setActiveMenu(activeMenu)} onMouseLeave={() => setActiveMenu(null)}
            >
              <div className="max-w-[1400px] mx-auto px-8 pb-16 pt-0">
                <div className="w-full h-px bg-white/10 mb-10"></div>
                
                <div className="grid grid-cols-5 gap-0">
                  {/* COL 1 */}
                  <div className="col-span-1 pr-8">
                    {activeMenu === 'planning' && (
                        <>
                          <MenuHeader>CÓMO, CUÁNDO Y DÓNDE</MenuHeader>
                          <div className="flex flex-col gap-1">
                            <MenuLink href="/planning/method" title="Metodología O247" />
                            <MenuLink href="/planning/start" title="Primeros Pasos" />
                            <MenuLink href="/planning/calendar" title="Crowd Calendar" badge="VITAL" />
                            <MenuLink href="/planning/budget" title="Ingeniería de Costos" />
                          </div>
                        </>
                    )}
                    {activeMenu === 'disney' && (
                        <>
                          <MenuHeader>PARQUES TEMÁTICOS</MenuHeader>
                          <div className="flex flex-col gap-1">
                            <MenuLink href="/disney/mk" title="Magic Kingdom" />
                            <MenuLink href="/disney/epcot" title="EPCOT" />
                            <MenuLink href="/disney/hs" title="Hollywood Studios" />
                            <MenuLink href="/disney/ak" title="Animal Kingdom" />
                            
                            {/* ENLACE VER TODOS */}
                            <div className="mt-4 pt-4 border-t border-white/5">
                                <Link href="/disney/parks" className="flex items-center gap-2 text-[12px] font-bold text-sunset hover:text-white uppercase tracking-wider transition-colors duration-200 group/link">
                                    Ver todos...
                                    <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                                </Link>
                            </div>
                          </div>
                        </>
                    )}
                    {activeMenu === 'universal' && (
                        <>
                           <MenuHeader>PARQUES TEMÁTICOS</MenuHeader>
                          <div className="flex flex-col gap-1">
                            <MenuLink href="/universal/epic" title="Epic Universe" highlight badge="2025" />
                            <MenuLink href="/universal/us" title="Universal Studios" />
                            <MenuLink href="/universal/ioa" title="Islands of Adventure" />
                            <MenuLink href="/universal/volcano" title="Volcano Bay" />
                          </div>
                        </>
                    )}
                    {activeMenu === 'shoppinear' && (
                        <>
                          <MenuHeader>PREMIUM OUTLETS</MenuHeader>
                          <div className="flex flex-col gap-1"><MenuLink href="/shop/vineland" title="Vineland Ave" /><MenuLink href="/shop/intl" title="International Dr" /></div>
                        </>
                    )}
                  </div>

                  {/* COL 2 */}
                  <div className="col-span-1 px-8">
                    {activeMenu === 'planning' && (
                         <>
                           <MenuHeader>HERRAMIENTAS</MenuHeader>
                           <div className="flex flex-col gap-1"><MenuLink href="#" title="Calculadora de Gastos" /><MenuLink href="#" title="Checklists PDF" /><MenuLink href="#" title="Agente GATE" highlight /></div>
                        </>
                    )}
                    {activeMenu === 'disney' && (
                         <>
                          <MenuHeader>LOGÍSTICA & TICKETS</MenuHeader>
                          <div className="flex flex-col gap-1"><MenuLink href="/disney/tickets" title="Tickets Inteligentes" /><MenuLink href="/disney/ll" title="Lightning Lane" highlight badge="PRO" /><MenuLink href="/disney/virtual" title="Filas Virtuales" /></div>
                        </>
                    )}
                     {activeMenu === 'universal' && (
                         <>
                           <MenuHeader>CITYWALK</MenuHeader>
                           <div className="flex flex-col gap-1"><MenuLink href="/universal/citywalk-dining" title="Mejores Restaurantes" /><MenuLink href="/universal/citywalk-entertainment" title="Entretenimiento" /></div>
                        </>
                    )}
                    {activeMenu === 'shoppinear' && (
                         <>
                          <MenuHeader>MALLS & LUJO</MenuHeader>
                          <div className="flex flex-col gap-1"><MenuLink href="/shop/millenia" title="Mall at Millenia" /><MenuLink href="/shop/florida" title="The Florida Mall" /></div>
                        </>
                    )}
                  </div>

                  {/* COL 3 */}
                  <div className="col-span-1 px-8">
                    {activeMenu === 'planning' && (
                         <>
                          <MenuHeader>SOPORTE</MenuHeader>
                          <div className="flex flex-col gap-1"><MenuLink href="#" title="Comunidad" /><MenuLink href="#" title="Ayuda" /></div>
                        </>
                    )}
                    {activeMenu === 'disney' && (
                         <>
                           <MenuHeader>HOTELES & RESORTS</MenuHeader>
                           <div className="flex flex-col gap-1"><MenuLink href="#" title="Skyliner Resorts" /><MenuLink href="#" title="Monorail Resorts" /><MenuLink href="#" title="Walking Distance" /></div>
                        </>
                    )}
                    {activeMenu === 'universal' && (
                         <>
                           <MenuHeader>TICKETS & PASES</MenuHeader>
                           <div className="flex flex-col gap-1"><MenuLink href="/universal/tickets" title="Park-to-Park" /><MenuLink href="/universal/express" title="Express Pass Hack" /><MenuLink href="/universal/vip" title="VIP Experience" /></div>
                        </>
                    )}
                     {activeMenu === 'shoppinear' && (
                         <>
                           <MenuHeader>ESTRATEGIA</MenuHeader>
                           <div className="flex flex-col gap-1"><MenuLink href="/shop/coupons" title="Cuponeras Digitales" /><MenuLink href="/shop/clearance" title="Rutas de Clearance" /></div>
                        </>
                    )}
                  </div>

                  {/* COL 4 */}
                  <div className="col-span-1 border-r border-white/10 px-8">
                     {renderSpotlightCard(activeMenu || '')}
                  </div>

                  {/* COL 5 */}
                  <div className="col-span-1 pl-8">
                    {activeMenu && SPOTLIGHTS[activeMenu] && (
                        <div className="pt-0"> 
                            <MenuHeader>{SPOTLIGHTS[activeMenu].guideTitle}</MenuHeader>
                            <p className="text-[13px] text-white/60 leading-relaxed font-medium font-sans border-t border-white/10 pt-4 mt-2">
                                {SPOTLIGHTS[activeMenu].guideText}
                            </p>
                        </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
           <motion.div initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }}
           className="fixed inset-0 bg-gunmetal z-50 pt-28 px-6 overflow-y-auto text-white"
         >
            <div className="flex flex-col gap-8 pb-10">
              {NAV_LABELS.map((item) => (<div key={item.id} className="border-b border-white/10 pb-6"><Link href={item.href || '#'} className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4 block font-mono">{item.label}</Link></div>))}
              <Link href="/login" className="block text-center py-4 border border-white/30 rounded-full font-bold text-white font-sans hover:bg-white hover:text-gunmetal transition-colors">Log In</Link>
              <Link href="/signup" className="block text-center py-4 bg-sunset text-gunmetal rounded-full font-bold font-sans hover:brightness-110 transition-colors">Sign Up</Link>
            </div>
         </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;