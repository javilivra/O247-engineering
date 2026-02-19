"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// DESPUÉS (O247 Icon System — LOCAL, FUNCIONA SIEMPRE)
import { Icon } from "@/components/Icon";
import Link from 'next/link';

import type { ParkItem } from '@/data/types';
import BentoCard from '@/app/disney/BentoCard';
import HeroCarousel from '@/components/parks/HeroCarousel';
import FilterModal from '@/components/parks/FilterModal';
import type { FilterChip, FilterSection } from '@/components/parks/FilterModal';

// ============================================================
// TYPES — Park page config
// ============================================================

export interface CategoryTab {
  id: string;
  label: string;
  icon: string;
}

export interface CategoryConfig {
  data: ParkItem[];
  /** Filter sections for modal (attractions-style deep filters) */
  filterSections?: FilterSection[];
  /** Simple inline chips (dining/shows/characters style) */
  inlineFilters?: FilterChip[];
}

export interface ParkPageConfig {
  /** Park identity */
  parkName: string;
  parkSubtitle: string;
  parkTagline: string;

  /** Hero */
  heroSlides: string[];
  heroSlideDuration?: number;

  /** Map download */
  mapPdfUrl?: string;

  /** Contextual intro */
  introShort: React.ReactNode;
  introExpanded?: React.ReactNode;

  /** Categories */
  categoryTabs: CategoryTab[];
  categories: Record<string, CategoryConfig>;
  defaultCategory: string;

  /** Alerts (optional — typically from attractions data) */
  alerts?: ParkItem[];
}

// ============================================================
// ANIMATION VARIANTS
// ============================================================
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };

// ============================================================
// POPULARITY SORT
// ============================================================
const TIER_ORDER: Record<string, number> = {
  'Tier 1': 0, 'Nighttime': 0, 'Tier 2': 1, 'Icon': 1, 'Princess': 1,
  'Tier 3': 2, 'Quick Service': 1, 'Table Service': 0, 'Snack': 2,
  'Coffee': 2, 'Parade': 0, 'Stage Show': 1, 'Pixar': 1,
};
function getPopScore(item: ParkItem): number {
  return (TIER_ORDER[item.tier] ?? 3) * 1000 - (parseInt(item.waitTime || '0', 10) || 0);
}

type SortOption = 'popularity' | 'land' | 'name';

// ============================================================
// SHARED CHIP COMPONENTS
// ============================================================

function SummaryChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <motion.span
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sunset/10 border border-sunset/25 text-[10px] font-semibold text-gunmetal/70 shrink-0 whitespace-nowrap"
    >
      {label}
      <button onClick={onRemove} className="text-gunmetal/30 hover:text-sunset transition-colors ml-0.5">
        <Icon icon="solar:close-circle-bold" width={12} />
      </button>
    </motion.span>
  );
}

function InlineChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold border-2 shrink-0 whitespace-nowrap transition-all duration-300 ${
        active
          ? 'bg-sunset/10 border-sunset text-gunmetal shadow-[0_2px_8px_rgba(255,112,67,0.12)]'
          : 'bg-white border-gunmetal/6 text-gunmetal/35 hover:text-gunmetal/60 hover:border-sunset/20'
      }`}
    >
      {label}
    </motion.button>
  );
}

// ============================================================
// CONTEXTUAL INTRO
// ============================================================

function ContextualIntro({ short, expanded }: { short: React.ReactNode; expanded?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-px bg-gunmetal/20" />
        <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase font-mono text-gunmetal/40">COMO ESTA PENSADO</h3>
      </div>
      <div className="text-xl md:text-2xl font-medium text-gunmetal leading-relaxed font-sans">
        {short}
        {expanded && (
          <AnimatePresence>
            {isOpen && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }} className="overflow-hidden">
                <div className="pt-6 space-y-6 text-base md:text-lg text-gunmetal/80 font-normal leading-relaxed">
                  {expanded}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
      {expanded && (
        <button onClick={() => setIsOpen(!isOpen)} className="mt-6 flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-widest text-sunset hover:text-gunmetal transition-colors">
          <span>{isOpen ? "[ - ] COMPRIMIR LECTURA" : "[ + ] SEGUIR LEYENDO"}</span>
        </button>
      )}
    </div>
  );
}

// ============================================================
// MAIN LAYOUT
// ============================================================

export default function ParkPageLayout({ config }: { config: ParkPageConfig }) {
  const {
    parkName, parkSubtitle, parkTagline,
    heroSlides, heroSlideDuration,
    mapPdfUrl,
    introShort, introExpanded,
    categoryTabs, categories, defaultCategory,
    alerts = [],
  } = config;

  const [category, setCategory] = useState(defaultCategory);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const [pendingFilters, setPendingFilters] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const catConfig = categories[category];
  const hasModalFilters = !!catConfig?.filterSections?.length;
  const hasInlineFilters = !!catConfig?.inlineFilters?.length;

  // Reset on category change
  useEffect(() => {
    setActiveFilters(new Set());
    setPendingFilters(new Set());
    setSearchQuery('');
    setSearchOpen(false);
    setSortBy('popularity');
    setModalOpen(false);
  }, [category]);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  // Modal handlers
  const openModal = () => { setPendingFilters(new Set(activeFilters)); setModalOpen(true); };
  const togglePending = (id: string) => {
    setPendingFilters(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };
  const applyModal = () => { setActiveFilters(new Set(pendingFilters)); setModalOpen(false); };
  const clearPending = () => setPendingFilters(new Set());

  // Inline filter toggle
  const toggleFilter = (id: string) => {
    setActiveFilters(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };
  const removeFilter = (id: string) => {
    setActiveFilters(prev => { const n = new Set(prev); n.delete(id); return n; });
  };

  const hasActiveFilters = activeFilters.size > 0 || searchQuery.length > 0;
  const clearAll = () => { setActiveFilters(new Set()); setSearchQuery(''); setSearchOpen(false); };

  // Alerts
  const activeAlerts = alerts.filter(a => a.status === 'closed' || a.status === 'refurbishment' || a.status === 'down');
  const [alertIndex, setAlertIndex] = useState(0);
  const nextAlert = () => setAlertIndex((prev) => (prev + 1) % activeAlerts.length);

  // Data
  const sourceData = catConfig?.data ?? [];

  // All chips flattened for lookup
  const allChips = useMemo(() => {
    if (hasModalFilters) return catConfig.filterSections!.flatMap(s => s.chips);
    if (hasInlineFilters) return catConfig.inlineFilters!;
    return [];
  }, [catConfig, hasModalFilters, hasInlineFilters]);

  const getChipById = useCallback((id: string) => allChips.find(c => c.id === id), [allChips]);

  // Filter
  const filtered = useMemo(() => {
    return sourceData.filter((item) => {
      if (searchQuery.length > 0) {
        const q = searchQuery.toLowerCase();
        if (!item.name.toLowerCase().includes(q) && !item.land.toLowerCase().includes(q)) return false;
      }
      if (activeFilters.size > 0) {
        for (const fId of activeFilters) {
          const chip = getChipById(fId);
          if (chip && !chip.match(item)) return false;
        }
      }
      return true;
    });
  }, [sourceData, searchQuery, activeFilters, getChipById]);

  // Sort
  const sortedItems = useMemo(() => {
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'land': return a.land.localeCompare(b.land) || a.name.localeCompare(b.name);
        case 'popularity': default: return getPopScore(a) - getPopScore(b);
      }
    });
  }, [filtered, sortBy]);

  // Active filter labels
  const activeFilterLabels = useMemo(() => {
    return Array.from(activeFilters).map(id => {
      const chip = getChipById(id);
      return chip ? { id, label: chip.label } : null;
    }).filter(Boolean) as { id: string; label: string }[];
  }, [activeFilters, getChipById]);

  // Sort options
  const SORT_OPTS = [
    { id: 'popularity' as const, label: 'Popular', icon: 'solar:fire-bold-duotone' },
    { id: 'land' as const, label: 'Zona', icon: 'solar:map-point-bold-duotone' },
    { id: 'name' as const, label: 'A-Z', icon: 'solar:text-square-bold-duotone' },
  ];

  return (
    <div className="min-h-screen bg-bone pt-0 pb-20 font-sans text-gunmetal">
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>

        {/* ============================================================ */}
        {/* HERO */}
        {/* ============================================================ */}
        <motion.div variants={itemVariants} className="relative w-full h-[550px] bg-bone flex items-center overflow-hidden px-6 md:px-12 lg:px-24">
          <HeroCarousel slides={heroSlides} duration={heroSlideDuration} />
          <div className="relative z-20 w-full max-w-[1200px] mx-auto">
            <div className="max-w-[55%] flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-10 bg-gunmetal/20" />
                <h2 className="text-[10px] font-bold tracking-[0.25em] uppercase text-gunmetal/40">{parkTagline}</h2>
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-gunmetal leading-[0.9] tracking-tighter mb-4">
                {parkName.split(' ').map((word, i) => (
                  <React.Fragment key={i}>{i > 0 && <br/>}{word}</React.Fragment>
                ))}
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sunset to-celeste mb-8">{parkSubtitle}</h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3 bg-gunmetal text-white px-5 py-2.5 rounded-full shadow-xl">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-wider font-mono">HOY</span>
                  <div className="w-px h-3 bg-white/20" />
                  <span className="text-xs font-bold font-mono">28C</span>
                </div>
                {mapPdfUrl && (
                  <a
                    href={mapPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/80 backdrop-blur-sm text-gunmetal px-5 py-2.5 rounded-full border border-gunmetal/10 shadow-sm hover:shadow-md hover:border-sunset/30 transition-all duration-300"
                  >
                    <Icon icon="solar:map-bold-duotone" width={16} className="text-sunset" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Descargar Mapa</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* CONTEXTO */}
        {/* ============================================================ */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div variants={itemVariants} className="py-12 border-b border-gunmetal/5">
            <ContextualIntro short={introShort} expanded={introExpanded} />
          </motion.div>
        </div>

        {/* ============================================================ */}
        {/* STICKY FILTER BAR */}
        {/* ============================================================ */}
        <div className="sticky top-0 z-40">
          <div className="absolute inset-0 bg-bone/95 backdrop-blur-xl border-b border-gunmetal/5" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-3 space-y-2.5">

            {/* ROW 1: Categories + Filters btn + Search + Sort */}
            <div className="flex items-center gap-2">
              {/* Category tabs */}
              <div className="flex-1 min-w-0 overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-1 w-max">
                  {categoryTabs.map((tab) => {
                    const isActive = category === tab.id;
                    return (
                      <motion.button
                        key={tab.id}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setCategory(tab.id)}
                        className={`relative px-3 sm:px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 shrink-0 ${
                          isActive
                            ? 'bg-gunmetal text-white shadow-lg shadow-gunmetal/10'
                            : 'text-gunmetal/40 hover:text-gunmetal hover:bg-white'
                        }`}
                      >
                        <Icon icon={tab.icon} width={15} className={isActive ? 'text-sunset' : 'opacity-40'} />
                        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest leading-none">{tab.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* FILTROS button (modal categories) */}
              {hasModalFilters && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={openModal}
                  className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full border-2 transition-all duration-300 ${
                    activeFilters.size > 0
                      ? 'bg-sunset/10 border-sunset text-gunmetal shadow-sm'
                      : 'bg-white border-gunmetal/8 text-gunmetal/40 hover:border-sunset/25 hover:text-gunmetal/60'
                  }`}
                >
                  <Icon icon="solar:tuning-2-bold" width={15} className={activeFilters.size > 0 ? 'text-sunset' : ''} />
                  <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Filtros</span>
                  {activeFilters.size > 0 && (
                    <span className="w-4 h-4 rounded-full bg-sunset text-white text-[9px] font-bold flex items-center justify-center">
                      {activeFilters.size}
                    </span>
                  )}
                </motion.button>
              )}

              {/* Search */}
              <motion.button
                whileTap={{ scale: 0.93 }}
                onClick={() => { setSearchOpen(!searchOpen); if (searchOpen) setSearchQuery(''); }}
                className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                  searchOpen || searchQuery ? 'bg-sunset text-white shadow-md shadow-sunset/20' : 'text-gunmetal/30 hover:text-sunset hover:bg-sunset/5'
                }`}
              >
                <Icon icon={searchOpen ? "solar:close-circle-linear" : "solar:magnifer-linear"} width={16} />
              </motion.button>

              <div className="hidden md:block w-px h-6 bg-gunmetal/6 shrink-0" />

              {/* Sort (desktop) */}
              <div className="hidden md:flex items-center gap-0.5 shrink-0">
                {SORT_OPTS.map((opt) => (
                  <motion.button
                    key={opt.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSortBy(opt.id)}
                    className={`px-2.5 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-1 ${
                      sortBy === opt.id ? 'bg-gunmetal text-white shadow-sm' : 'text-gunmetal/25 hover:text-gunmetal/50'
                    }`}
                  >
                    <Icon icon={opt.icon} width={12} className={sortBy === opt.id ? 'text-sunset' : ''} />
                    <span className="hidden lg:inline">{opt.label}</span>
                  </motion.button>
                ))}
              </div>

              <span className="hidden md:inline font-mono text-[10px] text-gunmetal/20 font-bold tabular-nums shrink-0">
                {filtered.length}/{sourceData.length}
              </span>
            </div>

            {/* SEARCH INPUT */}
            <AnimatePresence>
              {searchOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }} className="overflow-hidden">
                  <div className="relative">
                    <Icon icon="solar:magnifer-linear" width={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gunmetal/25 pointer-events-none" />
                    <input
                      ref={searchRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={`Buscar en ${categoryTabs.find(t => t.id === category)?.label}...`}
                      className="w-full pl-10 pr-10 py-2 bg-white rounded-full text-sm text-gunmetal placeholder:text-gunmetal/20 border-2 border-gunmetal/6 focus:outline-none focus:border-sunset/40 focus:shadow-[0_0_0_3px_rgba(255,112,67,0.06)] transition-all duration-300"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gunmetal/25 hover:text-sunset transition-colors">
                        <Icon icon="solar:close-circle-bold" width={16} />
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ROW 2: Summary chips OR inline chips */}
            {hasModalFilters ? (
              activeFilterLabels.length > 0 && (
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  <AnimatePresence mode="popLayout">
                    {activeFilterLabels.map((f) => (
                      <SummaryChip key={f.id} label={f.label} onRemove={() => removeFilter(f.id)} />
                    ))}
                  </AnimatePresence>
                  <button onClick={clearAll} className="shrink-0 text-[10px] font-bold text-sunset hover:text-sunset/70 transition-colors uppercase tracking-wider ml-1 whitespace-nowrap">
                    Limpiar todo
                  </button>
                </div>
              )
            ) : hasInlineFilters ? (
              <div className="flex items-center gap-2">
                <div className="flex-1 min-w-0 overflow-x-auto no-scrollbar">
                  <div className="flex items-center gap-1.5 w-max py-0.5">
                    {catConfig.inlineFilters!.map((chip) => (
                      <InlineChip key={chip.id} label={chip.label} active={activeFilters.has(chip.id)} onClick={() => toggleFilter(chip.id)} />
                    ))}
                  </div>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <AnimatePresence>
                    {hasActiveFilters && (
                      <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                        onClick={clearAll} className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest text-sunset hover:text-white hover:bg-sunset border border-sunset/25 hover:border-sunset transition-all duration-300 whitespace-nowrap"
                      >
                        <Icon icon="solar:restart-bold" width={11} /> Limpiar
                      </motion.button>
                    )}
                  </AnimatePresence>
                  <span className="font-mono text-[10px] text-gunmetal/20 font-bold tabular-nums">{filtered.length}/{sourceData.length}</span>
                </div>
              </div>
            ) : null}

            {/* Mobile sort */}
            <div className="flex md:hidden items-center gap-1">
              {SORT_OPTS.map((opt) => (
                <button key={opt.id} onClick={() => setSortBy(opt.id)}
                  className={`flex-1 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-1 ${
                    sortBy === opt.id ? 'bg-gunmetal text-white' : 'text-gunmetal/25 bg-white'
                  }`}
                >
                  <Icon icon={opt.icon} width={11} className={sortBy === opt.id ? 'text-sunset' : ''} />
                  {opt.label}
                </button>
              ))}
              <span className="md:hidden font-mono text-[10px] text-gunmetal/20 font-bold tabular-nums shrink-0 ml-1">
                {filtered.length}/{sourceData.length}
              </span>
            </div>
          </div>
        </div>

        {/* FILTER MODAL */}
        {hasModalFilters && (
          <FilterModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            activeFilters={pendingFilters}
            onToggle={togglePending}
            onClearAll={clearPending}
            onApply={applyModal}
            sections={catConfig.filterSections!}
          />
        )}

        {/* ============================================================ */}
        {/* ALERTS + GRID */}
        {/* ============================================================ */}
        <main className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-24 pt-8">

          {/* Alerts */}
          {activeAlerts.length > 0 && category === defaultCategory && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
              className="mb-10 bg-gradient-to-r from-red-950 via-red-900 to-red-950 border-l-4 border-red-600 text-white p-4 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.15)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-start gap-5 w-full">
                  <div className="bg-red-500/20 p-3.5 rounded-full text-red-500 shrink-0 border border-red-500/20 shadow-inner mt-1">
                    <Icon icon="solar:danger-triangle-bold" width={28} />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                      <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" /></span>
                      AVISO ({alertIndex + 1}/{activeAlerts.length})
                    </span>
                    <div className="h-9 md:h-7 relative overflow-hidden w-full">
                      <AnimatePresence mode="wait">
                        <motion.div key={alertIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="absolute inset-0">
                          <p className="text-sm md:text-base font-bold text-white leading-tight">
                            {activeAlerts[alertIndex].name}{' '}
                            <span className="opacity-60 font-medium">se encuentra en</span>{' '}
                            <span className="text-red-300 border-b border-red-500/50 pb-0.5">{activeAlerts[alertIndex].status === 'refurbishment' ? 'Remodelación' : 'Cierre Temporal'}</span>.
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
                {activeAlerts.length > 1 && (
                  <div className="flex flex-row md:flex-col items-center justify-center gap-4 shrink-0 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
                    <div className="flex gap-1.5 order-1 md:order-2">{activeAlerts.map((_, idx) => (<div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === alertIndex ? 'w-6 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'w-1.5 bg-white/20'}`} />))}</div>
                    <button onClick={nextAlert} className="order-2 md:order-1 bg-white/5 hover:bg-white/20 text-white border border-white/10 hover:border-white/40 p-3 rounded-full transition-all duration-300 group/nav shadow-lg hover:scale-110 active:scale-95">
                      <Icon icon="solar:arrow-right-linear" width={20} className="group-hover/nav:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-auto pb-20">
            <AnimatePresence mode="popLayout">
              {sortedItems.length > 0 ? (
                sortedItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout="position"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ layout: { duration: 0.4, ease: 'easeInOut' }, opacity: { duration: 0.3 } }}
                    className={item.tier === 'Tier 1' || item.tier === 'Nighttime' ? 'md:col-span-2' : 'col-span-1'}
                  >
                    <BentoCard data={item} />
                  </motion.div>
                ))
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-20 text-center text-gunmetal/40">
                  <Icon icon="solar:ghost-smile-bold-duotone" className="mx-auto mb-4 text-5xl opacity-30" />
                  <p className="font-bold text-sm uppercase tracking-widest mb-2">Sin resultados</p>
                  <p className="text-xs text-gunmetal/30">Probá ajustando los filtros o buscando con otro nombre.</p>
                  {hasActiveFilters && (
                    <button onClick={clearAll} className="mt-4 px-4 py-2 rounded-full text-xs font-bold text-sunset border border-sunset/20 hover:bg-sunset hover:text-white transition-all duration-300">
                      Limpiar filtros
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </main>

      </motion.div>
    </div>
  );
}
