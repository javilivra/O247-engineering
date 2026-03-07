'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MonthStrategy } from '@/data/strategy-2026';
import { Icon } from '@/components/Icon';

interface Props {
  strategy: MonthStrategy;
}

type Tab = 'crowds' | 'weather' | 'pricing';

export function StrategyAnalysis({ strategy }: Props) {
  const [active, setActive] = useState<Tab>('crowds');

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'crowds',  label: 'Multitudes', icon: 'solar:users-group-rounded-bold-duotone' },
    { id: 'weather', label: 'Clima',       icon: 'solar:sun-bold-duotone'                },
    { id: 'pricing', label: 'Tarifas',     icon: 'solar:dollar-minimalistic-bold-duotone'},
  ];

  return (
    <section className="px-6 lg:px-12 py-10 border-t border-white/5">

      {/* H2 — type-display */}
      <h2 className="type-display text-white mb-6" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)' }}>
        Análisis del mes
      </h2>

      {/* Tab buttons — type-tech */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all border ${
              active === tab.id
                ? 'bg-white/15 border-white/30 text-white'
                : 'bg-white/5 border-white/10 text-white/50 hover:text-white/80 hover:bg-white/10'
            }`}
          >
            <Icon icon={tab.icon} width={15} />
            {/* type-tech: labels de navegación */}
            <span className="type-tech text-[11px] uppercase tracking-[0.12em]">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="rounded-2xl bg-white/5 border border-white/10 p-6"
        >
          {/* ── MULTITUDES ── */}
          {active === 'crowds' && (
            <div className="space-y-5">
              {/* type-body: texto descriptivo */}
              <p className="type-body text-white/70 text-sm leading-relaxed">{strategy.crowds.summary}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#a7e26e]/10 border border-[#a7e26e]/20 rounded-xl p-4">
                  {/* type-tech: label de categoría */}
                  <p className="type-tech text-[10px] text-[#a7e26e] uppercase tracking-[0.15em] mb-1">Mejor semana</p>
                  <p className="type-body text-white text-sm font-semibold">{strategy.crowds.bestWeek}</p>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                  <p className="type-tech text-[10px] text-red-400 uppercase tracking-[0.15em] mb-1">Semana a evitar</p>
                  <p className="type-body text-white text-sm font-semibold">{strategy.crowds.worstWeek}</p>
                </div>
              </div>
              <div className="bg-[#00B4D8]/10 border border-[#00B4D8]/20 rounded-xl p-4 flex gap-3">
                <Icon icon="solar:lightbulb-bold-duotone" width={18} className="text-[#00B4D8] shrink-0 mt-0.5" />
                <p className="type-body text-white/80 text-sm">{strategy.crowds.tip}</p>
              </div>
            </div>
          )}

          {/* ── CLIMA ── */}
          {active === 'weather' && (
            <div className="space-y-5">
              <p className="type-body text-white/70 text-sm leading-relaxed">{strategy.weather.summary}</p>
              <div>
                {/* type-tech: label de sección interna */}
                <p className="type-tech text-[10px] text-white/40 uppercase tracking-[0.2em] mb-3">Qué llevar</p>
                <div className="flex flex-wrap gap-2">
                  {strategy.weather.whatToPack.map((item, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00B4D8]/15 border border-[#00B4D8]/25 text-[#00B4D8]"
                    >
                      <Icon icon="solar:backpack-bold-duotone" width={13} />
                      {/* type-tech: tags */}
                      <span className="type-tech text-[11px] tracking-[0.05em]">{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── TARIFAS ── */}
          {active === 'pricing' && (
            <div className="space-y-5">
              <p className="type-body text-white/70 text-sm leading-relaxed">{strategy.pricing.summary}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon icon="solar:castle-minimalistic-bold-duotone" width={15} className="text-[#00B4D8]" />
                    {/* type-tech: label de parque */}
                    <p className="type-tech text-[10px] text-white/50 uppercase tracking-[0.15em]">Disney World</p>
                  </div>
                  <p className="type-body text-white text-sm font-semibold">{strategy.pricing.disneyTier}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon icon="solar:planet-bold-duotone" width={15} className="text-[#FF7043]" />
                    <p className="type-tech text-[10px] text-white/50 uppercase tracking-[0.15em]">Universal</p>
                  </div>
                  <p className="type-body text-white text-sm font-semibold">{strategy.pricing.universalTier}</p>
                </div>
              </div>
              <div className="bg-[#FF7043]/10 border border-[#FF7043]/20 rounded-xl p-4 flex gap-3">
                <Icon icon="solar:lightbulb-bold-duotone" width={18} className="text-[#FF7043] shrink-0 mt-0.5" />
                <p className="type-body text-white/80 text-sm">{strategy.pricing.tip}</p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}