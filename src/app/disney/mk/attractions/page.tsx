"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

// IMPORTACIONES DE DATOS NORMALIZADOS
import type { ParkItem } from '@/data/types';
import { MK_ATTRACTIONS } from '@/data/mk-attractions-data';
import { MK_DINING } from '@/data/mk-dining-data';
import { MK_SHOWS } from '@/data/mk-shows-data';
import { MK_CHARACTERS } from '@/data/mk-characters-data';
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
  '/images/mk_att_heroslide_9.jpg',
];

// --- CONFIGURACIÓN DE NIVELES DE NAVEGACIÓN ---

const CATEGORY_TABS = [
  { id: 'attractions', label: 'Atracciones', icon: 'solar:star-fall-bold-duotone' },
  { id: 'dining', label: 'Dining', icon: 'ph:fork-knife-bold' },
  { id: 'shows', label: 'Shows', icon: 'mdi:magic' },
  { id: 'characters', label: 'Personajes', icon: 'tabler:mickey' },
];

const FILTER_OPTIONS: Record<string, { id: string; label: string; icon: string }[]> = {
  attractions: [
    { id: 'all', label: 'Todo', icon: 'solar:widget-2-bold-duotone' },
    { id: 'Adrenalina', label: 'Thrills', icon: 'solar:bolt-bold-duotone' },
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

export default function AttractionsPage() {
  const [category, setCategory] = useState<CategoryOption>('attractions');
  const [currentVibe, setCurrentVibe] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('land');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset sub-filter al cambiar categoría
  useEffect(() => {
    setCurrentVibe('all');
  }, [category]);

  // Alertas (solo atracciones cerradas/en refurbishment)
  const activeAlerts = MK_ATTRACTIONS.filter(
    (a) => a.status === 'closed' || a.status === 'refurbishment' || a.status === 'down'
  );
  const [alertIndex, setAlertIndex] = useState(0);
  const nextAlert = () => setAlertIndex((prev) => (prev + 1) % activeAlerts.length);

  // Hero slider
  useEffect(() => {
    const timer = setInterval(
      () => setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length),
      4000
    );
    return () => clearInterval(timer);
  }, []);

  // Preload all hero images on mount
  useEffect(() => {
    HERO_IMAGES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  // Selección de base de datos
  const getSourceData = (): ParkItem[] => {
    switch (category) {
      case 'attractions':
        return MK_ATTRACTIONS;
      case 'dining':
        return MK_DINING;
      case 'shows':
        return MK_SHOWS;
      case 'characters':
        return MK_CHARACTERS;
      default:
        return MK_ATTRACTIONS;
    }
  };

  // Filtrado
  const filtered = getSourceData().filter((item) => {
    if (currentVibe === 'all') return true;
    return item.vibes.includes(currentVibe);
  });

  // Ordenamiento
  const sortedItems = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'tier':
        return a.tier.localeCompare(b.tier);
      case 'land':
      default:
        return a.land.localeCompare(b.land) || a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="min-h-screen bg-bone text-gunmetal font-sans selection:bg-celeste selection:text-white pb-32 relative">
      {/* 1. HERO SLIDER */}
      <div className="absolute inset-x-0 top-0 h-[85vh] overflow-hidden z-0">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentImageIndex}
            src={HERO_IMAGES[currentImageIndex]}
            alt="Magic Kingdom Atmosphere"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/images/tron_mk.jpg';
            }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-bone via-bone/80 to-transparent" />
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
              <span className="font-mono text-xs font-bold tracking-[0.3em] uppercase">
                ABRIENDO LA BÓVEDA CON O247
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-6 leading-[0.9] drop-shadow-2xl">
              La Bóveda de <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-celeste to-white">
                Magic Kingdom
              </span>
            </h1>
            <p className="text-lg text-white/90 font-medium max-w-xl leading-relaxed drop-shadow-lg">
              No es solo un listado con todas las atracciones. Acabas de encontrar la caja fuerte.
              Acá guardamos lo mejor del parque, la info justa y los detalles que hacen la
              diferencia. ¡Abrila y descubrí todo!
            </p>
          </motion.div>
        </section>

        {/* B. BARRA DE CONTROL */}
        <div className="sticky top-0 z-40 py-4 transition-all">
          <div className="absolute inset-0 bg-transparent" />

          <div className="relative z-10 container mx-auto px-6 flex flex-col gap-4">
            {/* NIVEL 1: CATEGORÍAS */}
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
                      <span className="text-[11px] font-bold uppercase tracking-widest leading-none">
                        {tab.label}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTabDot"
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-celeste rounded-full"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* ORDENAR */}
              <div className="flex items-center bg-white/50 backdrop-blur-md border border-white/40 p-1 rounded-full shadow-sm shrink-0 ml-auto">
                <span className="hidden md:flex items-center gap-2 text-[9px] font-bold text-gunmetal/40 uppercase tracking-widest px-3 border-r border-gunmetal/10 mr-1">
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
                    className={`relative px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 outline-none ${
                      sortBy === opt.id
                        ? 'bg-white text-gunmetal shadow-md ring-1 ring-black/5'
                        : 'text-gunmetal/50 hover:text-gunmetal hover:bg-white/40'
                    }`}
                  >
                    <Icon icon={opt.icon} className={sortBy === opt.id ? 'text-celeste' : ''} />
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* NIVEL 2: SUB-FILTROS */}
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
                            {activeAlerts[alertIndex].name}{' '}
                            <span className="opacity-60 font-medium">se encuentra en</span>{' '}
                            <span className="text-red-300 border-b border-red-500/50 pb-0.5">
                              {activeAlerts[alertIndex].status === 'refurbishment'
                                ? 'Remodelación Mayor'
                                : 'Cierre Temporal'}
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
                        <div
                          key={idx}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            idx === alertIndex
                              ? 'w-6 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'
                              : 'w-1.5 bg-white/20'
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={nextAlert}
                      className="order-2 md:order-1 bg-white/5 hover:bg-white/20 text-white border border-white/10 hover:border-white/40 p-3 rounded-full transition-all duration-300 group/nav shadow-lg hover:scale-110 active:scale-95"
                    >
                      <Icon
                        icon="solar:arrow-right-linear"
                        width={20}
                        className="group-hover/nav:translate-x-0.5 transition-transform"
                      />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Grid */}
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
                  <Icon
                    icon="solar:confounded-square-bold-duotone"
                    className="mx-auto mb-4 text-4xl opacity-50"
                  />
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
            <span className="text-[9px] text-white/50 uppercase tracking-widest font-bold mb-0.5">
              VANGUARD IA
            </span>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
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