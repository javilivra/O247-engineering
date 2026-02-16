"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import Link from 'next/link';

// DATA
import type { ParkItem } from '@/data/types';
import { MK_ATTRACTIONS } from '@/data/mk-attractions-data';
import { MK_DINING } from '@/data/mk-dining-data';
import { MK_SHOWS } from '@/data/mk-shows-data';
import { MK_CHARACTERS } from '@/data/mk-characters-data';
import BentoCard from '@/app/disney/BentoCard';

// TIPOS
type SortOption = 'land' | 'tier' | 'name';
type CategoryOption = 'attractions' | 'dining' | 'shows' | 'characters';

// VARIANTES DE ANIMACIÓN
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };

// ============================================================
// CONFIGURACIÓN DE FILTROS
// ============================================================

const CATEGORY_TABS = [
  { id: 'attractions', label: 'Atracciones', icon: 'solar:star-fall-bold-duotone' },
  { id: 'dining', label: 'Dining', icon: 'ph:fork-knife-bold' },
  { id: 'shows', label: 'Shows', icon: 'mdi:magic' },
  { id: 'characters', label: 'Personajes', icon: 'tabler:mickey' },
];

const FILTER_OPTIONS: Record<string, { id: string; label: string; icon: string }[]> = {
  attractions: [
    { id: 'all', label: 'Todo', icon: 'solar:widget-2-bold-duotone' },
    { id: 'LL Multi Pass', label: 'LL Multi Pass', icon: 'solar:ticket-sale-bold-duotone' },
    { id: 'LL Single Pass', label: 'LL Single Pass', icon: 'solar:ticket-bold-duotone' },
    { id: 'Refugio Climático', label: 'Indoor / A.C.', icon: 'solar:snowflake-bold-duotone' },
    { id: 'Clásicos 1971', label: 'Clásicos', icon: 'solar:crown-star-bold-duotone' },
    { id: 'Agua', label: 'Agua', icon: 'solar:drop-bold-duotone' },
    { id: 'Niños', label: 'Kids', icon: 'solar:balloon-bold-duotone' },
    { id: 'Personajes', label: 'Meet', icon: 'solar:user-hand-up-bold-duotone' },
    { id: 'Relax', label: 'Chill', icon: 'solar:cup-hot-bold-duotone' },
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
  ],
};

// ============================================================
// CONTEXTUAL INTRO
// ============================================================

function ContextualIntro() {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-px bg-gunmetal/20"></div>
        <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase font-mono text-gunmetal/40">COMO ESTA PENSADO</h3>
      </div>
      <div className="text-xl md:text-2xl font-medium text-gunmetal leading-relaxed font-sans">
        <p>Magic Kingdom no es solo un parque tematico; es una <strong className="text-gunmetal font-black">referencia global</strong> en <strong className="text-gunmetal font-black">diseno de fantasia aplicada</strong>.</p>
        <AnimatePresence>
          {isExpanded && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }} className="overflow-hidden">
              <div className="pt-6 space-y-6 text-base md:text-lg text-gunmetal/80 font-normal leading-relaxed">
                <p>Para quien llega por primera vez, el impacto es inmediato: el <strong className="text-gunmetal">Castillo de Cenicienta</strong> ordena la mirada y establece el tono del recorrido. Pero detras de esa primera impresion hay algo mas complejo. El parque esta construido como una <strong className="text-gunmetal">ciudad escenica en capas</strong>: mientras el visitante camina por calles perfectamente coreografiadas, la operacion real sucede en un nivel inferior invisible, los <strong className="text-gunmetal">Utilidors</strong>, pensados para que la logistica nunca interfiera con la narrativa.</p>
                <p>Esa logica atraviesa todo el parque. Conviven la <strong className="text-gunmetal">nostalgia fundacional</strong> de 1971 con atracciones disenadas bajo <strong className="text-gunmetal">estandares tecnologicos</strong> actuales, sin que una anule a la otra. No se trata unicamente de subir a juegos, sino de moverse entre lenguajes distintos: del ritmo pausado de Main Street al pulso futurista de Tomorrowland.</p>
                <div className="pl-4 border-l-2 border-sunset">
                  <p className="italic text-gunmetal">&quot;Magic Kingdom funciona porque <strong className="text-gunmetal">nada esta librado al azar</strong>. La ilusion no es espontanea: esta disenada, mantenida y repetida todos los dias.&quot;</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <button onClick={() => setIsExpanded(!isExpanded)} className="mt-6 flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-widest text-sunset hover:text-gunmetal transition-colors group">
        <span>{isExpanded ? "[ - ] COMPRIMIR LECTURA" : "[ + ] SEGUIR LEYENDO"}</span>
      </button>
    </div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================

export default function MagicKingdomPage() {
  const [category, setCategory] = useState<CategoryOption>('attractions');
  const [currentVibe, setCurrentVibe] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('land');

  // Reset sub-filter al cambiar categoría
  useEffect(() => { setCurrentVibe('all'); }, [category]);

  // Alertas (solo atracciones cerradas/en refurbishment)
  const activeAlerts = MK_ATTRACTIONS.filter(
    (a) => a.status === 'closed' || a.status === 'refurbishment' || a.status === 'down'
  );
  const [alertIndex, setAlertIndex] = useState(0);
  const nextAlert = () => setAlertIndex((prev) => (prev + 1) % activeAlerts.length);

  // Selección de base de datos
  const getSourceData = (): ParkItem[] => {
    switch (category) {
      case 'attractions': return MK_ATTRACTIONS;
      case 'dining': return MK_DINING;
      case 'shows': return MK_SHOWS;
      case 'characters': return MK_CHARACTERS;
      default: return MK_ATTRACTIONS;
    }
  };

  // Filtrado: LL filters buscan en campo 'access', el resto en 'vibes'
  const LL_FILTERS = ['LL Multi Pass', 'LL Single Pass', 'Virtual Queue'];
  const filtered = getSourceData().filter((item) => {
    if (currentVibe === 'all') return true;
    if (LL_FILTERS.includes(currentVibe)) {
      return (item as any).access === currentVibe;
    }
    return item.vibes.includes(currentVibe);
  });

  // Ordenamiento
  const sortedItems = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'name': return a.name.localeCompare(b.name);
      case 'tier': return a.tier.localeCompare(b.tier);
      case 'land':
      default: return a.land.localeCompare(b.land) || a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="min-h-screen bg-bone pt-0 pb-20 font-sans text-gunmetal">
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>

        {/* ============================================================ */}
        {/* 1. HERO */}
        {/* ============================================================ */}
        <motion.div variants={itemVariants} className="relative w-full h-[550px] bg-bone flex items-center overflow-hidden px-6 md:px-12 lg:px-24">
          <div className="absolute right-0 top-0 bottom-0 w-[75%] h-full pointer-events-none select-none">
            <div className="relative w-full h-full" style={{ maskImage: 'linear-gradient(to right, transparent 5%, black 40%)', WebkitMaskImage: 'linear-gradient(to right, transparent 5%, black 40%)' }}>
              <img src="/images/tron_mk.jpg" alt="Tron Lightcycle Run" className="w-full h-full object-cover object-center" />
            </div>
          </div>
          <div className="relative z-20 w-full max-w-[1200px] mx-auto">
            <div className="max-w-[55%] flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-5"><div className="h-px w-10 bg-gunmetal/20" /><h2 className="text-[10px] font-bold tracking-[0.25em] uppercase text-gunmetal/40">DONDE LA FANTASIA REINA</h2></div>
              <h1 className="text-6xl md:text-8xl font-black text-gunmetal leading-[0.9] tracking-tighter mb-4">Magic<br/>Kingdom</h1>
              <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sunset to-celeste mb-8">El Corazon de la Magia</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-gunmetal text-white px-5 py-2.5 rounded-full shadow-xl"><div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /><span className="text-[10px] font-bold uppercase tracking-wider font-mono">HOY</span><div className="w-px h-3 bg-white/20" /><span className="text-xs font-bold font-mono">28C</span></div>
                <Link href="/disney/mk/guide" className="flex items-center gap-2 bg-white/80 backdrop-blur-sm text-gunmetal px-5 py-2.5 rounded-full border border-gunmetal/10 shadow-sm hover:shadow-md hover:border-sunset/30 transition-all duration-300">
                  <Icon icon="solar:compass-bold-duotone" width={16} className="text-sunset" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Guía del Parque</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* 2. CONTEXTO + MÉTRICAS */}
        {/* ============================================================ */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div variants={itemVariants} className="py-12 border-b border-gunmetal/5">
            <ContextualIntro />
          </motion.div>


        </div>

        {/* ============================================================ */}
        {/* 3. BARRA DE FILTROS PREMIUM (STICKY) */}
        {/* ============================================================ */}
        <div className="sticky top-0 z-40 transition-all">
          {/* Fondo con blur para legibilidad */}
          <div className="absolute inset-0 bg-bone/95 backdrop-blur-xl border-b border-gunmetal/5" />

          <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 lg:px-24 py-4 flex flex-col gap-4">

            {/* NIVEL 1: CATEGORÍAS + SORT */}
            <div className="flex flex-col xl:flex-row items-center justify-between gap-4">
              {/* Category Tabs */}
              <div className="flex items-center gap-1 bg-white p-1.5 rounded-2xl shadow-sm border border-gunmetal/8 w-full md:w-auto overflow-x-auto no-scrollbar">
                {CATEGORY_TABS.map((tab) => {
                  const isActive = category === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setCategory(tab.id as CategoryOption)}
                      className={`relative px-5 py-3 rounded-xl flex items-center gap-2.5 transition-all duration-300 shrink-0 ${
                        isActive
                          ? 'bg-gunmetal text-white shadow-md'
                          : 'text-gunmetal/50 hover:text-gunmetal hover:bg-bone'
                      }`}
                    >
                      <Icon icon={tab.icon} width={18} className={isActive ? 'text-celeste' : 'opacity-60'} />
                      <span className="text-[11px] font-bold uppercase tracking-widest leading-none">
                        {tab.label}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="activeCategoryDot"
                          className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-celeste rounded-full"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Sort Selector */}
              <div className="flex items-center bg-white border border-gunmetal/8 p-1 rounded-xl shadow-sm shrink-0 ml-auto">
                <span className="hidden md:flex items-center gap-2 text-[9px] font-bold text-gunmetal/35 uppercase tracking-widest px-3 border-r border-gunmetal/8 mr-1">
                  <Icon icon="solar:sort-vertical-linear" className="text-sm" /> Ordenar
                </span>
                {[
                  { id: 'land', label: 'Zona', icon: 'solar:map-point-bold-duotone' },
                  { id: 'tier', label: 'Top', icon: 'solar:star-bold-duotone' },
                  { id: 'name', label: 'A-Z', icon: 'solar:text-square-bold-duotone' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSortBy(opt.id as SortOption)}
                    className={`relative px-4 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 outline-none ${
                      sortBy === opt.id
                        ? 'bg-gunmetal text-white shadow-sm'
                        : 'text-gunmetal/40 hover:text-gunmetal hover:bg-bone'
                    }`}
                  >
                    <Icon icon={opt.icon} width={14} className={sortBy === opt.id ? 'text-celeste' : ''} />
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* NIVEL 2: SUB-FILTROS (VIBES) */}
            <div className="w-full overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-2 w-max">
                {FILTER_OPTIONS[category]?.map((filter) => {
                  const isSelected = currentVibe === filter.id;
                  return (
                    <button
                      key={filter.id}
                      onClick={() => setCurrentVibe(filter.id)}
                      className={`relative px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-300 border text-[11px] font-bold uppercase tracking-widest ${
                        isSelected
                          ? 'bg-gunmetal border-gunmetal text-white shadow-md'
                          : 'bg-white border-gunmetal/8 text-gunmetal/50 hover:text-gunmetal hover:border-gunmetal/20 hover:shadow-sm'
                      }`}
                    >
                      <Icon
                        icon={filter.icon}
                        className={isSelected ? 'text-sunset' : 'text-gunmetal/30'}
                        width={16}
                      />
                      <span>{filter.label}</span>
                      {isSelected && filter.id !== 'all' && (
                        <span className="ml-1 text-[9px] text-white/50">
                          {filtered.length}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 4. ALERTAS + GRID DE CONTENIDO */}
        {/* ============================================================ */}
        <main className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-24 pt-8">

          {/* Alertas */}
          {activeAlerts.length > 0 && category === 'attractions' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10 bg-gradient-to-r from-red-950 via-red-900 to-red-950 border-l-4 border-red-600 text-white p-6 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.15)] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-5 w-full">
                  <div className="bg-red-500/20 p-3.5 rounded-full text-red-500 shrink-0 border border-red-500/20 shadow-inner mt-1">
                    <Icon icon="solar:danger-triangle-bold" width={32} />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
                      </span>
                      AVISO ({alertIndex + 1}/{activeAlerts.length})
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
                            {activeAlerts[alertIndex].name}{' '}
                            <span className="opacity-60 font-medium">se encuentra en</span>{' '}
                            <span className="text-red-300 border-b border-red-500/50 pb-0.5">
                              {activeAlerts[alertIndex].status === 'refurbishment' ? 'Remodelación' : 'Cierre Temporal'}
                            </span>
                            .
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

          {/* Grid de Cards */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-auto pb-20"
          >
            <AnimatePresence mode="popLayout">
              {sortedItems.length > 0 ? (
                sortedItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout="position"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      layout: { duration: 0.4, ease: 'easeInOut' },
                      opacity: { duration: 0.3 },
                    }}
                    className={
                      item.tier === 'Tier 1' || item.tier === 'Nighttime'
                        ? 'md:col-span-2'
                        : 'col-span-1'
                    }
                  >
                    <BentoCard data={item} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-gunmetal/50">
                  <Icon icon="solar:confounded-square-bold-duotone" className="mx-auto mb-4 text-4xl opacity-50" />
                  <p className="font-bold text-sm uppercase tracking-widest">No hay resultados</p>
                  <p className="text-xs mt-2">Probá cambiando los filtros.</p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </main>

      </motion.div>
    </div>
  );
}