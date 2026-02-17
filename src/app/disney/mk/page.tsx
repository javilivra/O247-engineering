"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import Link from 'next/link';

// DATA
import type { ParkItem, Attraction } from '@/data/types';
import { MK_ATTRACTIONS } from '@/data/mk-attractions-data';
import { MK_DINING } from '@/data/mk-dining-data';
import { MK_SHOWS } from '@/data/mk-shows-data';
import { MK_CHARACTERS } from '@/data/mk-characters-data';
import BentoCard from '@/app/disney/BentoCard';

// ============================================================
// TYPES
// ============================================================
type SortOption = 'popularity' | 'land' | 'name';
type CategoryOption = 'attractions' | 'dining' | 'shows' | 'characters';

// ============================================================
// ANIMATION VARIANTS
// ============================================================
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };

// ============================================================
// HERO (unchanged)
// ============================================================
const HERO_SLIDES = [
  "/images/mk_att_heroslide_1.jpg.webp",
  "/images/mk_att_heroslide_2.jpg",
  "/images/mk_att_heroslide_3.webp",
  "/images/mk_att_heroslide_4.jpg",
  "/images/mk_att_heroslide_5.jpg",
  "/images/mk_att_heroslide_6.jpg",
  "/images/mk_att_heroslide_7.jpg",
  "/images/mk_att_heroslide_8.jpg",
  "/images/mk_att_heroslide_9.jpg",
];
const SLIDE_DURATION = 5000;

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setCurrent((p) => (p + 1) % HERO_SLIDES.length), SLIDE_DURATION);
  }, []);
  useEffect(() => { startAutoplay(); return () => { if (intervalRef.current) clearInterval(intervalRef.current); }; }, [startAutoplay]);
  const goTo = (i: number) => { setCurrent(i); startAutoplay(); };
  return (
    <div className="absolute right-0 top-0 bottom-0 w-[75%] h-full pointer-events-none select-none">
      <div className="relative w-full h-full overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent 5%, black 40%)', WebkitMaskImage: 'linear-gradient(to right, transparent 5%, black 40%)' }}>
        <AnimatePresence mode="wait">
          <motion.img key={current} src={HERO_SLIDES[current]} alt={`Magic Kingdom ${current + 1}`} initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ opacity: { duration: 0.8, ease: "easeOut" }, scale: { duration: 8, ease: "linear" } }} className="absolute inset-0 w-full h-full object-cover object-center" />
        </AnimatePresence>
      </div>
      <div className="absolute bottom-6 right-8 flex items-center gap-2 pointer-events-auto z-30">
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} className={`relative h-1 rounded-full transition-all duration-500 overflow-hidden ${i === current ? 'w-8 bg-white/30' : 'w-2 bg-white/20 hover:bg-white/40'}`} aria-label={`Slide ${i + 1}`}>
            {i === current && <motion.div className="absolute inset-0 bg-sunset rounded-full origin-left" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }} key={`p-${current}`} />}
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// CONTEXTUAL INTRO (unchanged)
// ============================================================
function ContextualIntro() {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-6"><div className="w-8 h-px bg-gunmetal/20" /><h3 className="text-[10px] font-bold tracking-[0.2em] uppercase font-mono text-gunmetal/40">COMO ESTA PENSADO</h3></div>
      <div className="text-xl md:text-2xl font-medium text-gunmetal leading-relaxed font-sans">
        <p>Magic Kingdom no es solo un parque tematico; es una <strong className="text-gunmetal font-black">referencia global</strong> en <strong className="text-gunmetal font-black">diseno de fantasia aplicada</strong>.</p>
        <AnimatePresence>
          {isExpanded && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }} className="overflow-hidden">
              <div className="pt-6 space-y-6 text-base md:text-lg text-gunmetal/80 font-normal leading-relaxed">
                <p>Para quien llega por primera vez, el impacto es inmediato: el <strong className="text-gunmetal">Castillo de Cenicienta</strong> ordena la mirada y establece el tono del recorrido. Pero detras de esa primera impresion hay algo mas complejo. El parque esta construido como una <strong className="text-gunmetal">ciudad escenica en capas</strong>: mientras el visitante camina por calles perfectamente coreografiadas, la operacion real sucede en un nivel inferior invisible, los <strong className="text-gunmetal">Utilidors</strong>, pensados para que la logistica nunca interfiera con la narrativa.</p>
                <p>Esa logica atraviesa todo el parque. Conviven la <strong className="text-gunmetal">nostalgia fundacional</strong> de 1971 con atracciones disenadas bajo <strong className="text-gunmetal">estandares tecnologicos</strong> actuales, sin que una anule a la otra. No se trata unicamente de subir a juegos, sino de moverse entre lenguajes distintos: del ritmo pausado de Main Street al pulso futurista de Tomorrowland.</p>
                <div className="pl-4 border-l-2 border-sunset"><p className="italic text-gunmetal">&quot;Magic Kingdom funciona porque <strong className="text-gunmetal">nada esta librado al azar</strong>. La ilusion no es espontanea: esta disenada, mantenida y repetida todos los dias.&quot;</p></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <button onClick={() => setIsExpanded(!isExpanded)} className="mt-6 flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-widest text-sunset hover:text-gunmetal transition-colors group"><span>{isExpanded ? "[ - ] COMPRIMIR LECTURA" : "[ + ] SEGUIR LEYENDO"}</span></button>
    </div>
  );
}

// ============================================================
// FILTER TAXONOMY — Attractions (maps to real Attraction fields)
// ============================================================

interface FilterChip {
  id: string;
  label: string;
  icon?: string;
  match: (item: ParkItem) => boolean;
}

interface FilterSection {
  id: string;
  title: string;
  icon: string;
  chips: FilterChip[];
}

const asA = (item: ParkItem) => item as Attraction;

const ATTRACTION_FILTER_SECTIONS: FilterSection[] = [
  {
    id: 'access', title: 'Acceso', icon: 'solar:ticket-bold-duotone',
    chips: [
      { id: 'standby', label: 'Standby', match: (i) => asA(i).access === 'Standby' },
      { id: 'll-multi', label: 'Multi Pass', match: (i) => asA(i).access === 'LL Multi Pass' },
      { id: 'll-single', label: 'Single Pass', match: (i) => asA(i).access === 'LL Single Pass' },
      { id: 'vq', label: 'Virtual Queue', match: (i) => asA(i).access === 'Virtual Queue' },
    ],
  },
  {
    id: 'thrill', title: 'Intensidad', icon: 'solar:bolt-bold-duotone',
    chips: [
      { id: 'motion-sick', label: 'Mareo posible', match: (i) => asA(i).warnings.motionSickness },
      { id: 'no-motion', label: 'Sin mareo', match: (i) => !asA(i).warnings.motionSickness },
      { id: 'drops', label: 'Caídas', match: (i) => asA(i).warnings.drops },
      { id: 'darkness', label: 'Oscuridad', match: (i) => asA(i).warnings.darkness },
      { id: 'spinning', label: 'Giros', match: (i) => asA(i).warnings.spinning },
      { id: 'loud', label: 'Ruido fuerte', match: (i) => asA(i).warnings.loudNoises },
      { id: 'flash', label: 'Luces', match: (i) => asA(i).warnings.flashingLights },
    ],
  },
  {
    id: 'height', title: 'Altura mínima', icon: 'solar:ruler-bold-duotone',
    chips: [
      { id: 'h-any', label: 'Sin restricción', match: (i) => asA(i).heightReq === 0 },
      { id: 'h-89', label: '89cm+', match: (i) => asA(i).heightReq > 0 && asA(i).heightReq <= 89 },
      { id: 'h-97', label: '97cm+', match: (i) => asA(i).heightReq > 0 && asA(i).heightReq <= 97 },
      { id: 'h-102', label: '102cm+', match: (i) => asA(i).heightReq > 0 && asA(i).heightReq <= 102 },
      { id: 'h-112', label: '112cm+', match: (i) => asA(i).heightReq > 0 && asA(i).heightReq <= 112 },
      { id: 'h-122', label: '122cm+', match: (i) => asA(i).heightReq >= 122 },
    ],
  },
  {
    id: 'climate', title: 'Clima y confort', icon: 'solar:snowflake-bold-duotone',
    chips: [
      { id: 'ac-indoor', label: 'A/C Indoor', match: (i) => asA(i).hasAc && asA(i).isIndoor },
      { id: 'outdoor', label: 'Aire libre', match: (i) => !asA(i).isIndoor },
      { id: 'water', label: 'Te mojás', match: (i) => asA(i).warnings.water },
    ],
  },
  {
    id: 'physical', title: 'Consideraciones físicas', icon: 'solar:heart-pulse-bold-duotone',
    chips: [
      { id: 'pregnancy', label: 'No embarazadas', match: (i) => asA(i).warnings.pregnancyRestriction },
      { id: 'back-neck', label: 'Riesgo espalda/cuello', match: (i) => asA(i).warnings.backNeckIssues },
    ],
  },
  {
    id: 'accessibility', title: 'Accesibilidad', icon: 'solar:wheelchair-bold-duotone',
    chips: [
      { id: 'wheelchair', label: 'Silla de ruedas OK', match: (i) => asA(i).accessibility.wheelchair && !asA(i).accessibility.mustTransfer },
      { id: 'must-transfer', label: 'Requiere transferencia', match: (i) => asA(i).accessibility.mustTransfer },
      { id: 'service-animals', label: 'Animales de servicio', match: (i) => asA(i).accessibility.serviceAnimals },
      { id: 'audio-desc', label: 'Audio descripción', match: (i) => asA(i).accessibility.audioDescription },
      { id: 'captions', label: 'Subtítulos', match: (i) => asA(i).accessibility.closedCaptions || asA(i).accessibility.handheldCaptioning },
    ],
  },
];

// Flatten for lookup
const ALL_ATTRACTION_CHIPS = ATTRACTION_FILTER_SECTIONS.flatMap(s => s.chips);

// Simple inline filters for non-attraction categories (unchanged from before)
const SIMPLE_FILTERS: Record<string, FilterChip[]> = {
  dining: [
    { id: 'quick', label: 'Rápido', match: (i) => i.vibes.includes('quick') },
    { id: 'table', label: 'Mesa', match: (i) => i.vibes.includes('table') },
    { id: 'snack', label: 'Snack', match: (i) => i.vibes.includes('snack') },
    { id: 'coffee', label: 'Café', match: (i) => i.vibes.includes('coffee') },
    { id: 'indoor-d', label: 'Indoor', match: (i) => i.vibes.includes('indoor') || i.vibes.includes('ac') },
    { id: 'chill-d', label: 'Chill', match: (i) => i.vibes.includes('chill') },
  ],
  shows: [
    { id: 'fireworks', label: 'Fireworks', match: (i) => i.vibes.includes('fireworks') },
    { id: 'parade', label: 'Desfiles', match: (i) => i.vibes.includes('parade') },
    { id: 'stage', label: 'Escenario', match: (i) => i.vibes.includes('stage') },
    { id: 'kids-s', label: 'Kids', match: (i) => i.vibes.includes('kids') },
  ],
  characters: [
    { id: 'princess', label: 'Princesas', match: (i) => i.vibes.includes('princess') || i.tier === 'Princess' },
    { id: 'mickey-c', label: 'Clásicos', match: (i) => i.vibes.includes('mickey') || i.tier === 'Icon' },
    { id: 'pixar-c', label: 'Pixar', match: (i) => i.vibes.includes('pixar') || i.tier === 'Pixar' },
    { id: 'indoor-c', label: 'Indoor', match: (i) => i.vibes.includes('indoor') || i.vibes.includes('ac') },
  ],
};

// Category tabs
const CATEGORY_TABS: { id: CategoryOption; label: string; icon: string }[] = [
  { id: 'attractions', label: 'Atracciones', icon: 'solar:star-fall-bold-duotone' },
  { id: 'dining', label: 'Dining', icon: 'ph:fork-knife-bold' },
  { id: 'shows', label: 'Shows', icon: 'mdi:magic' },
  { id: 'characters', label: 'Personajes', icon: 'tabler:mickey' },
];

// Popularity sort
const TIER_ORDER: Record<string, number> = { 'Tier 1': 0, 'Nighttime': 0, 'Tier 2': 1, 'Icon': 1, 'Princess': 1, 'Tier 3': 2, 'Quick Service': 1, 'Table Service': 0, 'Snack': 2, 'Coffee': 2, 'Parade': 0, 'Stage Show': 1, 'Pixar': 1 };
function getPopScore(item: ParkItem): number {
  return (TIER_ORDER[item.tier] ?? 3) * 1000 - (parseInt(item.waitTime || '0', 10) || 0);
}

// ============================================================
// FILTER MODAL — Bottom Sheet (Attractions only)
// ============================================================

function FilterModal({
  open,
  onClose,
  activeFilters,
  onToggle,
  onClearAll,
  onApply,
}: {
  open: boolean;
  onClose: () => void;
  activeFilters: Set<string>;
  onToggle: (id: string) => void;
  onClearAll: () => void;
  onApply: () => void;
}) {
  const count = activeFilters.size;

  // Prevent body scroll when modal open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-gunmetal/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[70] bg-bone rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-gunmetal/15" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-gunmetal/5">
              <div>
                <h2 className="text-lg font-black text-gunmetal">Filtros</h2>
                {count > 0 && (
                  <p className="text-[11px] text-gunmetal/40 font-medium mt-0.5">
                    {count} {count === 1 ? 'seleccionado' : 'seleccionados'}
                  </p>
                )}
              </div>
              {count > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-xs font-bold text-sunset hover:text-sunset/70 transition-colors uppercase tracking-wider"
                >
                  Limpiar todo
                </button>
              )}
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4 space-y-6">
              {ATTRACTION_FILTER_SECTIONS.map((section) => (
                <div key={section.id}>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon icon={section.icon} width={16} className="text-gunmetal/30" />
                    <h3 className="text-sm font-bold text-gunmetal">{section.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {section.chips.map((chip) => {
                      const active = activeFilters.has(chip.id);
                      return (
                        <button
                          key={chip.id}
                          onClick={() => onToggle(chip.id)}
                          className={`px-4 py-2 rounded-full text-[12px] font-semibold border-2 transition-all duration-250 ${
                            active
                              ? 'bg-sunset/10 border-sunset text-gunmetal shadow-sm'
                              : 'bg-white border-gunmetal/8 text-gunmetal/50 hover:border-gunmetal/20 hover:text-gunmetal/70'
                          }`}
                        >
                          {chip.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Bottom padding for footer */}
              <div className="h-4" />
            </div>

            {/* Footer */}
            <div className="border-t border-gunmetal/5 px-6 py-4 flex gap-3 bg-bone">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-full border-2 border-gunmetal/10 text-sm font-bold text-gunmetal/50 hover:border-gunmetal/20 hover:text-gunmetal transition-all duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={onApply}
                className="flex-1 py-3 rounded-full bg-gradient-to-r from-sunset to-[#FF8A65] text-white text-sm font-bold shadow-lg shadow-sunset/20 hover:shadow-xl hover:shadow-sunset/30 active:scale-[0.98] transition-all duration-300"
              >
                Aplicar{count > 0 ? ` (${count})` : ''}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================================
// SMALL CHIP — for sticky bar summary chips
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

// ============================================================
// INLINE CHIP — for non-attraction categories (simple filter)
// ============================================================

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
// MAIN PAGE
// ============================================================

export default function MagicKingdomPage() {
  const [category, setCategory] = useState<CategoryOption>('attractions');
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const [pendingFilters, setPendingFilters] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

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
  const openModal = () => {
    setPendingFilters(new Set(activeFilters));
    setModalOpen(true);
  };
  const togglePending = (id: string) => {
    setPendingFilters(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };
  const applyModal = () => {
    setActiveFilters(new Set(pendingFilters));
    setModalOpen(false);
  };
  const clearPending = () => setPendingFilters(new Set());

  // Simple filter toggle (for non-attraction categories)
  const toggleFilter = (id: string) => {
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const removeFilter = (id: string) => {
    setActiveFilters(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const hasActiveFilters = activeFilters.size > 0 || searchQuery.length > 0;
  const clearAll = () => { setActiveFilters(new Set()); setSearchQuery(''); setSearchOpen(false); };

  // Alerts
  const activeAlerts = MK_ATTRACTIONS.filter(a => a.status === 'closed' || a.status === 'refurbishment' || a.status === 'down');
  const [alertIndex, setAlertIndex] = useState(0);
  const nextAlert = () => setAlertIndex((prev) => (prev + 1) % activeAlerts.length);

  // Data
  const sourceData = useMemo((): ParkItem[] => {
    switch (category) {
      case 'attractions': return MK_ATTRACTIONS;
      case 'dining': return MK_DINING;
      case 'shows': return MK_SHOWS;
      case 'characters': return MK_CHARACTERS;
      default: return MK_ATTRACTIONS;
    }
  }, [category]);

  // Resolve filter chips based on category
  const getChipById = useCallback((id: string): FilterChip | undefined => {
    if (category === 'attractions') return ALL_ATTRACTION_CHIPS.find(c => c.id === id);
    return SIMPLE_FILTERS[category]?.find(c => c.id === id);
  }, [category]);

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
        case 'popularity':
        default: return getPopScore(a) - getPopScore(b);
      }
    });
  }, [filtered, sortBy]);

  // Active filter labels for summary chips
  const activeFilterLabels = useMemo(() => {
    return Array.from(activeFilters).map(id => {
      const chip = getChipById(id);
      return chip ? { id, label: chip.label } : null;
    }).filter(Boolean) as { id: string; label: string }[];
  }, [activeFilters, getChipById]);

  const isAttractions = category === 'attractions';

  return (
    <div className="min-h-screen bg-bone pt-0 pb-20 font-sans text-gunmetal">
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>

        {/* ============================================================ */}
        {/* 1. HERO */}
        {/* ============================================================ */}
        <motion.div variants={itemVariants} className="relative w-full h-[550px] bg-bone flex items-center overflow-hidden px-6 md:px-12 lg:px-24">
          <HeroCarousel />
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
        {/* 2. CONTEXTO */}
        {/* ============================================================ */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-24">
          <motion.div variants={itemVariants} className="py-12 border-b border-gunmetal/5">
            <ContextualIntro />
          </motion.div>
        </div>

        {/* ============================================================ */}
        {/* 3. STICKY FILTER BAR */}
        {/* ============================================================ */}
        <div className="sticky top-0 z-40">
          <div className="absolute inset-0 bg-bone/95 backdrop-blur-xl border-b border-gunmetal/5" />

          <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-3 space-y-2.5">

            {/* ROW 1: Categories + Filter btn + Search + Sort */}
            <div className="flex items-center gap-2">

              {/* Category tabs */}
              <div className="flex-1 min-w-0 overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-1 w-max">
                  {CATEGORY_TABS.map((tab) => {
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

              {/* FILTROS button — only for attractions */}
              {isAttractions && (
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

              {/* Search toggle */}
              <motion.button
                whileTap={{ scale: 0.93 }}
                onClick={() => { setSearchOpen(!searchOpen); if (searchOpen) setSearchQuery(''); }}
                className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                  searchOpen || searchQuery ? 'bg-sunset text-white shadow-md shadow-sunset/20' : 'text-gunmetal/30 hover:text-sunset hover:bg-sunset/5'
                }`}
              >
                <Icon icon={searchOpen ? "solar:close-circle-linear" : "solar:magnifer-linear"} width={16} />
              </motion.button>

              <div className="hidden md:block w-px h-6 bg-gunmetal/6 shrink-0" />

              {/* Sort */}
              <div className="hidden md:flex items-center gap-0.5 shrink-0">
                {([
                  { id: 'popularity', label: 'Popular', icon: 'solar:fire-bold-duotone' },
                  { id: 'land', label: 'Zona', icon: 'solar:map-point-bold-duotone' },
                  { id: 'name', label: 'A-Z', icon: 'solar:text-square-bold-duotone' },
                ] as const).map((opt) => (
                  <motion.button
                    key={opt.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSortBy(opt.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-1 ${
                      sortBy === opt.id ? 'bg-gunmetal text-white shadow-sm' : 'text-gunmetal/25 hover:text-gunmetal/50'
                    }`}
                  >
                    <Icon icon={opt.icon} width={12} className={sortBy === opt.id ? 'text-sunset' : ''} />
                    <span className="hidden lg:inline">{opt.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Count */}
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
                      placeholder={`Buscar en ${CATEGORY_TABS.find(t => t.id === category)?.label}...`}
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

            {/* ROW 2: Summary chips (attractions) or inline chips (other categories) */}
            {isAttractions ? (
              /* ATTRACTIONS: Summary chips of applied filters + Limpiar */
              activeFilterLabels.length > 0 && (
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  <AnimatePresence mode="popLayout">
                    {activeFilterLabels.map((f) => (
                      <SummaryChip key={f.id} label={f.label} onRemove={() => removeFilter(f.id)} />
                    ))}
                  </AnimatePresence>
                  <button
                    onClick={clearAll}
                    className="shrink-0 text-[10px] font-bold text-sunset hover:text-sunset/70 transition-colors uppercase tracking-wider ml-1 whitespace-nowrap"
                  >
                    Limpiar todo
                  </button>
                </div>
              )
            ) : (
              /* OTHER CATEGORIES: Inline chips + clear */
              <div className="flex items-center gap-2">
                <div className="flex-1 min-w-0 overflow-x-auto no-scrollbar">
                  <div className="flex items-center gap-1.5 w-max py-0.5">
                    {SIMPLE_FILTERS[category]?.map((chip) => (
                      <InlineChip
                        key={chip.id}
                        label={chip.label}
                        active={activeFilters.has(chip.id)}
                        onClick={() => toggleFilter(chip.id)}
                      />
                    ))}
                  </div>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <AnimatePresence>
                    {hasActiveFilters && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={clearAll}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest text-sunset hover:text-white hover:bg-sunset border border-sunset/25 hover:border-sunset transition-all duration-300 whitespace-nowrap"
                      >
                        <Icon icon="solar:restart-bold" width={11} />
                        Limpiar
                      </motion.button>
                    )}
                  </AnimatePresence>
                  <span className="font-mono text-[10px] text-gunmetal/20 font-bold tabular-nums">
                    {filtered.length}/{sourceData.length}
                  </span>
                </div>
              </div>
            )}

            {/* Mobile sort */}
            <div className="flex md:hidden items-center gap-1">
              {([
                { id: 'popularity', label: 'Popular', icon: 'solar:fire-bold-duotone' },
                { id: 'land', label: 'Zona', icon: 'solar:map-point-bold-duotone' },
                { id: 'name', label: 'A-Z', icon: 'solar:text-square-bold-duotone' },
              ] as const).map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSortBy(opt.id)}
                  className={`flex-1 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-1 ${
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

        {/* ============================================================ */}
        {/* FILTER MODAL — Attractions only */}
        {/* ============================================================ */}
        <FilterModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          activeFilters={pendingFilters}
          onToggle={togglePending}
          onClearAll={clearPending}
          onApply={applyModal}
        />

        {/* ============================================================ */}
        {/* 4. ALERTS + GRID */}
        {/* ============================================================ */}
        <main className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-24 pt-8">

          {activeAlerts.length > 0 && category === 'attractions' && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
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
                      <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" /></span>
                      AVISO ({alertIndex + 1}/{activeAlerts.length})
                    </span>
                    <div className="h-12 md:h-10 relative overflow-hidden w-full">
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