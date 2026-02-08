"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

// IMPORTACIONES
import { MK_ATTRACTIONS } from '@/data/mk-attractions-data'; 
import BentoCard from '@/app/disney/BentoCard'; 

// TIPOS
type SortOption = 'land' | 'tier' | 'name';
type CategoryOption = 'attractions' | 'dining' | 'shows' | 'characters';

// --- CONFIGURACIÓN DEL SLIDER HERO ---
const HERO_IMAGES = [
  '/images/mk_att_heroslide_1.webp',
  '/images/mk_att_heroslide_2.jpg',
  '/images/mk_att_heroslide_3.webp',
  '/images/mk_att_heroslide_4.jpg',
  '/images/mk_att_heroslide_5.jpg',
  '/images/mk_att_heroslide_6.jpg',
  '/images/mk_att_heroslide_7.jpg',
  '/images/mk_att_heroslide_8.jpg',
  '/images/mk_att_heroslide_9.jpg'
];

// --- DATA SETS ADICIONALES (MOCK DATA PARA PASO 3) ---
// Idealmente esto iría en archivos separados (mk-dining.ts, etc), pero lo ponemos aquí para que funcione ya.

const MK_DINING = [
    { id: 'd1', name: "Casey's Corner", land: 'Main Street, U.S.A.', tier: 'Quick Service', status: 'open', waitTime: 'Mobile Order', type: 'Dining', vibes: ['quick', 'snack'], image: 'https://cdn1.parksmedia.wdpromedia.com/media/resort/1/18185_header_caseys_corner.jpg', description: 'Los famosos hot dogs y corn dogs de Main Street con pianista en vivo.' },
    { id: 'd2', name: "Be Our Guest Restaurant", land: 'Fantasyland', tier: 'Table Service', status: 'open', waitTime: 'Reservas', type: 'Dining', vibes: ['table', 'indoor'], image: 'https://cdn1.parksmedia.wdpromedia.com/media/resort/1/18196_header_be_our_guest.jpg', description: 'Cena dentro del castillo de la Bestia. Una experiencia inmersiva francesa.' },
    { id: 'd3', name: "Cosmic Ray's Starlight Café", land: 'Tomorrowland', tier: 'Quick Service', status: 'open', waitTime: 'Mobile Order', type: 'Dining', vibes: ['quick', 'indoor', 'ac'], image: 'https://cdn1.parksmedia.wdpromedia.com/media/resort/1/18190_header_cosmic_rays.jpg', description: 'Hamburguesas y pollo con el alienígena Sonny Eclipse tocando el piano.' },
    { id: 'd4', name: "Aloha Isle", land: 'Adventureland', tier: 'Snack', status: 'open', waitTime: 'Mobile Order', type: 'Dining', vibes: ['snack', 'chill'], image: 'https://cdn1.parksmedia.wdpromedia.com/media/resort/1/18206_header_aloha_isle.jpg', description: 'El hogar del legendario Dole Whip. Un clásico imperdible.' },
    { id: 'd5', name: "Main Street Bakery (Starbucks)", land: 'Main Street, U.S.A.', tier: 'Coffee', status: 'open', waitTime: '15 min', type: 'Dining', vibes: ['coffee', 'snack'], image: 'https://cdn1.parksmedia.wdpromedia.com/media/resort/1/18182_header_main_street_bakery.jpg', description: 'Tu parada obligatoria para café Starbucks y treats de Disney.' },
    { id: 'd6', name: "Jungle Navigation Co. LTD Skipper Canteen", land: 'Adventureland', tier: 'Table Service', status: 'open', waitTime: 'Reservas', type: 'Dining', vibes: ['table', 'indoor', 'chill'], image: 'https://cdn1.parksmedia.wdpromedia.com/media/resort/1/18203_header_skipper_canteen.jpg', description: 'Cocina exótica servida por los bromistas skippers del Jungle Cruise.' },
];

const MK_SHOWS = [
    { id: 's1', name: "Happily Ever After", land: 'Main Street, U.S.A.', tier: 'Nighttime', status: 'open', waitTime: '20:00 HS', type: 'Show', vibes: ['fireworks', 'stage'], image: 'https://cdn1.parksmedia.wdpromedia.com/media/resort/1/18240_header_happily_ever_after.jpg', description: 'El espectáculo de fuegos artificiales y proyecciones más emotivo.' },
    { id: 's2', name: "Disney Festival of Fantasy Parade", land: 'Parade Route', tier: 'Parade', status: 'open', waitTime: '15:00 HS', type: 'Show', vibes: ['parade'], image: 'https://cdn1.parksmedia.wdpromedia.com/media/resort/1/18242_header_festival_fantasy.jpg', description: 'Desfile diurno con carrozas espectaculares y el dragón Maléfica.' },
    { id: 's3', name: "Mickey's Magical Friendship Faire", land: 'Cinderella Castle', tier: 'Stage Show', status: 'open', waitTime: 'Varios', type: 'Show', vibes: ['stage', 'kids'], image: 'https://cdn1.parksmedia.wdpromedia.com/media/resort/1/18245_header_friendship_faire.jpg', description: 'Show en el escenario del castillo con Mickey, Tiana, Rapunzel y Elsa.' },
];

const MK_CHARACTERS = [
    { id: 'c1', name: "Meet Mickey at Town Square Theater", land: 'Main Street, U.S.A.', tier: 'Icon', status: 'open', waitTime: '25 min', type: 'Character', vibes: ['mickey', 'indoor', 'ac'], image: 'https://cdn1.parksmedia.wdpromedia.com/media/resort/1/18260_header_meet_mickey.jpg', description: 'Conoce al jefe en su traje de mago. ¡Habla con él!' },
    { id: 'c2', name: "Princess Fairytale Hall", land: 'Fantasyland', tier: 'Princess', status: 'open', waitTime: '35 min', type: 'Character', vibes: ['princess', 'indoor', 'ac'], image: 'https://cdn1.parksmedia.wdpromedia.com/media/resort/1/18265_header_princess_hall.jpg', description: 'Encuentro real con Cenicienta, Elena, Tiana o Rapunzel.' },
    { id: 'c3', name: "Meet Buzz Lightyear", land: 'Tomorrowland', tier: 'Pixar', status: 'open', waitTime: 'Intermitente', type: 'Character', vibes: ['pixar', 'kids'], image: 'https://cdn1.parksmedia.wdpromedia.com/media/resort/1/18268_header_buzz.jpg', description: 'Al infinito y más allá en el Rocket Tower Plaza.' },
];

// --- 1. CONFIGURACIÓN DE NIVELES DE NAVEGACIÓN ---

// NIVEL 1: Categorías Principales
const CATEGORY_TABS = [
    { id: 'attractions', label: 'Atracciones', icon: 'solar:star-fall-bold-duotone' },
    { id: 'dining', label: 'Dining', icon: 'ph:fork-knife-bold' },
    { id: 'shows', label: 'Shows', icon: 'mdi:magic' },
    { id: 'characters', label: 'Personajes', icon: 'tabler:mickey' }
];

// NIVEL 2: Sub-filtros Dinámicos
const FILTER_OPTIONS: Record<string, { id: string; label: string; icon: string }[]> = {
    attractions: [
        { id: 'all', label: 'Todo', icon: 'solar:widget-2-bold-duotone' },
        { id: 'thrill', label: 'Thrills', icon: 'solar:bolt-bold-duotone' },
        { id: 'indoor', label: 'Indoor / A.C.', icon: 'solar:snowflake-bold-duotone' },
        { id: 'classic', label: 'Clásicos', icon: 'solar:crown-star-bold-duotone' },
        { id: 'water', label: 'Agua', icon: 'solar:drop-bold-duotone' },
        { id: 'kids', label: 'Kids', icon: 'solar:balloon-bold-duotone' },
        { id: 'meet', label: 'Meet', icon: 'solar:user-hand-up-bold-duotone' },
        { id: 'chill', label: 'Chill', icon: 'solar:cup-hot-bold-duotone' },
    ],
    dining: [
        { id: 'all', label: 'Todo', icon: 'solar:widget-2-bold-duotone' },
        { id: 'quick', label: 'Rápido', icon: 'solar:hamburger-menu-bold-duotone' },
        { id: 'table', label: 'Mesa', icon: 'solar:chef-hat-bold-duotone' },
        { id: 'snack', label: 'Snacks', icon: 'solar:cookie-bold-duotone' },
        { id: 'coffee', label: 'Café', icon: 'solar:cup-bold-duotone' },
        { id: 'chill', label: 'Chill', icon: 'solar:cup-hot-bold-duotone' },
    ],
    shows: [
        { id: 'all', label: 'Todo', icon: 'solar:widget-2-bold-duotone' },
        { id: 'fireworks', label: 'Fireworks', icon: 'solar:stars-minimalistic-bold-duotone' },
        { id: 'parade', label: 'Desfiles', icon: 'solar:confetti-bold-duotone' },
        { id: 'stage', label: 'Escenario', icon: 'solar:masks-bold-duotone' },
        { id: 'kids', label: 'Kids', icon: 'solar:balloon-bold-duotone' },
    ],
    characters: [
        { id: 'all', label: 'Todo', icon: 'solar:widget-2-bold-duotone' },
        { id: 'princess', label: 'Princesas', icon: 'solar:crown-bold-duotone' },
        { id: 'mickey', label: 'Clásicos', icon: 'tabler:mickey' },
        { id: 'pixar', label: 'Pixar', icon: 'solar:planet-bold-duotone' },
        { id: 'indoor', label: 'Indoor / A.C.', icon: 'solar:snowflake-bold-duotone' },
    ]
};

export default function AttractionsPage() {
  // ESTADOS
  const [category, setCategory] = useState<CategoryOption>('attractions');
  const [currentVibe, setCurrentVibe] = useState('all'); // Nivel 2
  const [sortBy, setSortBy] = useState<SortOption>('land');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // --- LÓGICA INTELIGENTE DE RESET ---
  useEffect(() => {
    setCurrentVibe('all');
  }, [category]);

  // --- LOGICA DE DATA Y ALERTAS ---
  const activeAlerts = MK_ATTRACTIONS.filter(a => 
      a.status === 'closed' || a.status === 'refurbishment' || a.status === 'down'
  );
  const [alertIndex, setAlertIndex] = useState(0);
  const nextAlert = () => setAlertIndex((prev) => (prev + 1) % activeAlerts.length);

  useEffect(() => {
    const timer = setInterval(() => setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length), 6000);
    return () => clearInterval(timer);
  }, []);

  // --- 2. SELECCIÓN DE BASE DE DATOS (SWITCH) ---
  const getSourceData = () => {
      switch (category) {
          case 'attractions': return MK_ATTRACTIONS;
          case 'dining': return MK_DINING;
          case 'shows': return MK_SHOWS;
          case 'characters': return MK_CHARACTERS;
          default: return MK_ATTRACTIONS;
      }
  };

  // --- 3. FILTRADO UNIFICADO ---
  const filtered = getSourceData().filter((item) => {
    // Filtro por Vibe (Nivel 2)
    if (currentVibe === 'all') return true;
    return item.vibes.includes(currentVibe);
  });

  // --- 4. ORDENAMIENTO ---
  const sortedItems = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'name': return a.name.localeCompare(b.name);
      case 'tier': return a.tier.localeCompare(b.tier); 
      case 'land': default: return a.land.localeCompare(b.land) || a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-gunmetal font-sans selection:bg-celeste selection:text-white pb-32 relative">
      
      {/* 1. HERO SLIDER */}
      <div className="absolute inset-x-0 top-0 h-[85vh] overflow-hidden z-0">
          <AnimatePresence mode="popLayout">
                <motion.img
                    key={currentImageIndex} 
                    src={HERO_IMAGES[currentImageIndex]}
                    alt="Magic Kingdom Atmosphere"
                    initial={{ opacity: 0, scale: 1.1 }} 
                    animate={{ opacity: 1, scale: 1 }}  
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }} 
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = '/images/tron_mk.jpg'; }}
                />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent opacity-80" />
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#f7f7f5] via-[#f7f7f5]/80 to-transparent" />
      </div>

      {/* 2. CONTENIDO */}
      <div className="relative z-10">

          {/* A. HEADER TEXT */}
          <section className="container mx-auto px-6 md:px-12 pt-48 pb-12 md:pt-60 md:pb-16">
             <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-4xl"
             >
                 <div className="flex items-center gap-2 text-celeste mb-4 drop-shadow-md">
                    <Icon icon="solar:safe-square-bold-duotone" width={24} />
                    <span className="font-mono text-xs font-bold tracking-[0.3em] uppercase">ABRIENDO LA BÓVEDA CON O247</span>
                 </div>
                 <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-6 leading-[0.9] drop-shadow-2xl">
                    La Bóveda de <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-celeste to-white">Magic Kingdom</span>
                 </h1>
                 <p className="text-lg text-white/90 font-medium max-w-xl leading-relaxed drop-shadow-lg">
                    No es solo un listado con todas las atracciones. Acabas de encontra la caja fuerte. Acá guardamos lo mejor del parque, la info justa y los detalles que hacen la diferencia. ¡Abrìla y descubrí todo!
                 </p>
             </motion.div>
          </section>

          {/* ====================================================================
             B. BARRA DE CONTROL INTELIGENTE (NIVEL 1 & 2)
             ====================================================================
          */}
          <div className="sticky top-0 z-40 py-4 transition-all">
            <div className="absolute inset-0 bg-transparent" />
            
            <div className="relative z-10 container mx-auto px-6 flex flex-col gap-4">
                
                {/* NIVEL 1: CATEGORÍAS PRINCIPALES */}
                <div className="flex flex-col xl:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 bg-white/70 backdrop-blur-xl p-1.5 rounded-full shadow-lg border border-white/40 w-full md:w-auto overflow-x-auto no-scrollbar">
                        {CATEGORY_TABS.map((tab) => {
                            const isActive = category === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setCategory(tab.id as CategoryOption)}
                                    className={`relative px-5 py-3 rounded-full flex items-center gap-2.5 transition-all duration-300 shrink-0 ${
                                        isActive 
                                        ? 'bg-gunmetal text-white shadow-md' 
                                        : 'hover:bg-white/50 text-gunmetal/60 hover:text-gunmetal'
                                    }`}
                                >
                                    <Icon icon={tab.icon} width={20} className={isActive ? 'text-celeste' : 'opacity-70'} />
                                    <span className="text-[11px] font-bold uppercase tracking-widest leading-none">{tab.label}</span>
                                    {isActive && (
                                        <motion.div layoutId="activeTabDot" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-celeste rounded-full" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* ORDENAR */}
                    <div className="flex items-center bg-white/50 backdrop-blur-md border border-white/40 p-1 rounded-full shadow-sm shrink-0 ml-auto">
                        <span className="hidden md:flex items-center gap-2 text-[9px] font-bold text-gunmetal/40 uppercase tracking-widest px-3 border-r border-gunmetal/10 mr-1">
                            <Icon icon="solar:sort-vertical-linear" className="text-sm"/> Ordenar
                        </span>
                        {[
                            { id: 'land', label: 'Zona', icon: 'solar:map-point-bold-duotone' },
                            { id: 'tier', label: 'Top', icon: 'solar:star-bold-duotone' },
                            { id: 'name', label: 'A-Z', icon: 'solar:text-square-bold-duotone' }
                        ].map((opt) => (
                            <button 
                                key={opt.id}
                                onClick={() => setSortBy(opt.id as SortOption)}
                                className={`relative px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 outline-none ${
                                    sortBy === opt.id ? 'bg-white text-gunmetal shadow-md ring-1 ring-black/5' : 'text-gunmetal/50 hover:text-gunmetal hover:bg-white/40'
                                }`}
                            >
                                <Icon icon={opt.icon} className={sortBy === opt.id ? 'text-celeste' : ''} />
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* NIVEL 2: SUB-FILTROS DINÁMICOS */}
                <div className="w-full overflow-x-auto no-scrollbar pb-2">
                    <div className="flex items-center gap-2 w-max">
                        {FILTER_OPTIONS[category]?.map((filter) => {
                            const isSelected = currentVibe === filter.id;
                            return (
                                <button
                                    key={filter.id}
                                    onClick={() => setCurrentVibe(filter.id)}
                                    className={`relative px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 border ${
                                        isSelected
                                        ? 'bg-white border-white text-gunmetal shadow-sm'
                                        : 'bg-white/20 border-white/10 text-white hover:bg-white/30'
                                    }`}
                                >
                                    <Icon 
                                        icon={filter.icon} 
                                        className={isSelected ? 'text-celeste' : 'text-white/70'} 
                                        width={16} 
                                    />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">
                                        {filter.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

            </div>
          </div>

          {/* C. CONTENIDO PRINCIPAL */}
          <main className="container mx-auto px-6 md:px-12 pt-8">
            
            {/* Alertas (Solo visibles en Atracciones para no molestar en Dining) */}
            {activeAlerts.length > 0 && category === 'attractions' && (
                 <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10 bg-gradient-to-r from-red-950 via-red-900 to-red-950 border-l-4 border-red-600 text-white p-6 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.15)] relative overflow-hidden group"
                 >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-start gap-5 w-full">
                            <div className="bg-red-500/20 p-3.5 rounded-full text-red-500 shrink-0 border border-red-500/20 shadow-inner mt-1">
                                <Icon icon="solar:danger-triangle-bold" width={32} />
                            </div>
                            
                            <div className="flex flex-col flex-1">
                                <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                                    </span>
                                    BOLETÍN DE INGENIERÍA ({alertIndex + 1}/{activeAlerts.length})
                                </span>
                                
                                <div className="h-12 md:h-10 relative overflow-hidden w-full">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={alertIndex}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute inset-0"
                                        >
                                            <p className="text-sm md:text-base font-bold text-white leading-tight">
                                                {activeAlerts[alertIndex].name} <span className="opacity-60 font-medium">se encuentra en</span> <span className="text-red-300 border-b border-red-500/50 pb-0.5">{activeAlerts[alertIndex].status === 'refurbishment' ? 'Remodelación Mayor' : 'Cierre Temporal'}</span>.
                                            </p>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {activeAlerts.length > 1 && (
                            <div className="flex flex-row md:flex-col items-center justify-center gap-4 shrink-0 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
                                <div className="flex gap-1.5 order-1 md:order-2">
                                    {activeAlerts.map((_, idx) => (
                                        <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === alertIndex ? 'w-6 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'w-1.5 bg-white/20'}`} />
                                    ))}
                                </div>
                                <button onClick={nextAlert} className="order-2 md:order-1 bg-white/5 hover:bg-white/20 text-white border border-white/10 hover:border-white/40 p-3 rounded-full transition-all duration-300 group/nav shadow-lg hover:scale-110 active:scale-95">
                                    <Icon icon="solar:arrow-right-linear" width={20} className="group-hover/nav:translate-x-0.5 transition-transform" />
                                </button>
                            </div>
                        )}
                    </div>
                 </motion.div>
            )}

            {/* Grid Layout Suave (Dinámico) */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-auto pb-20">
                <AnimatePresence mode='popLayout'>
                    {sortedItems.length > 0 ? (
                        sortedItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layout="position"
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                exit={{ opacity: 0 }} 
                                transition={{ layout: { duration: 0.4, ease: "easeInOut" }, opacity: { duration: 0.3 } }}
                                className={item.tier === 'Tier 1' || item.tier === 'Nighttime' ? 'md:col-span-2' : 'col-span-1'}
                            >
                                {/* @ts-ignore: Ignoramos diferencias menores de tipado entre Attraction y Dining por ahora */}
                                <BentoCard data={item} />
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center text-gunmetal/50">
                            <Icon icon="solar:confounded-square-bold-duotone" className="mx-auto mb-4 text-4xl opacity-50" />
                            <p className="font-bold text-sm uppercase tracking-widest">No hay resultados</p>
                            <p className="text-xs mt-2">Prueba cambiando los filtros.</p>
                        </div>
                    )}
                </AnimatePresence>
            </motion.div>

          </main>
      </div>

      {/* 3. THE DOCK */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-6 pointer-events-none">
          <div className="pointer-events-auto bg-gunmetal/90 backdrop-blur-xl text-white pl-6 pr-2 py-2 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/10 flex items-center justify-between gap-4 hover:scale-[1.02] transition-transform duration-300 group">
              <div className="flex flex-col">
                  <span className="text-[9px] text-white/50 uppercase tracking-widest font-bold mb-0.5">VANGUARD IA</span>
                  <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      <span className="text-xs font-bold text-white">Sistema Activo</span>
                  </div>
              </div>
              <button className="bg-celeste hover:bg-white hover:text-gunmetal text-gunmetal px-6 py-3 rounded-full font-bold text-[10px] md:text-xs uppercase tracking-widest transition-colors flex items-center gap-2 shadow-lg shadow-celeste/20">
                  <Icon icon="solar:magic-stick-3-bold" width={16} />
                  <span>Optimizar Ruta</span>
              </button>
          </div>
      </div>
    </div>
  );
}