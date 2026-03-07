'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MonthStrategy } from '@/data/strategy-2026';
import { Icon } from '@/components/Icon';

interface Props {
  strategy: MonthStrategy;
}

type Tab = 'crowds' | 'weather' | 'pricing';

const CROWD_BAR: Record<number, { width: string; color: string }> = {
  1: { width: '20%', color: '#34d399' },
  2: { width: '40%', color: '#86efac' },
  3: { width: '60%', color: '#fbbf24' },
  4: { width: '80%', color: '#fb923c' },
  5: { width: '100%', color: '#f87171' },
};

export function StrategyAnalysis({ strategy }: Props) {
  const [active, setActive] = useState<Tab>('crowds');

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'crowds', label: 'Multitudes', icon: 'solar:users-group-rounded-bold-duotone' },
    { id: 'weather', label: 'Clima', icon: 'solar:sun-bold-duotone' },
    { id: 'pricing', label: 'Tarifas', icon: 'solar:dollar-minimalistic-bold-duotone' },
  ];

  return (
    <section className="px-6 lg:px-12 py-10">
      <h2 className="text-white text-xl font-bold mb-6">Análisis del mes</h2>

      {/* Tab buttons */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
              active === tab.id
                ? 'bg-white/15 border-white/30 text-white'
                : 'bg-white/5 border-white/10 text-white/50 hover:text-white/80 hover:bg-white/10'
            }`}
          >
            <Icon icon={tab.icon} width={16} />
            {tab.label}
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
          {active === 'crowds' && (
            <div className="space-y-5">
              <p className="text-white/70 text-sm leading-relaxed">{strategy.crowds.summary}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                  <p className="text-emerald-400 text-xs uppercase tracking-wider mb-1 font-medium">Mejor semana</p>
                  <p className="text-white text-sm font-semibold">{strategy.crowds.bestWeek}</p>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                  <p className="text-red-400 text-xs uppercase tracking-wider mb-1 font-medium">Semana a evitar</p>
                  <p className="text-white text-sm font-semibold">{strategy.crowds.worstWeek}</p>
                </div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3">
                <Icon icon="solar:lightbulb-bold-duotone" width={18} className="text-blue-400 shrink-0 mt-0.5" />
                <p className="text-white/80 text-sm">{strategy.crowds.tip}</p>
              </div>
            </div>
          )}

          {active === 'weather' && (
            <div className="space-y-5">
              <p className="text-white/70 text-sm leading-relaxed">{strategy.weather.summary}</p>
              <div>
                <p className="text-white/50 text-xs uppercase tracking-wider mb-3 font-medium">Qué llevar</p>
                <div className="flex flex-wrap gap-2">
                  {strategy.weather.whatToPack.map((item, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-500/15 border border-sky-500/25 text-sky-300 text-sm"
                    >
                      <Icon icon="solar:backpack-bold-duotone" width={14} />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {active === 'pricing' && (
            <div className="space-y-5">
              <p className="text-white/70 text-sm leading-relaxed">{strategy.pricing.summary}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon icon="solar:castle-minimalistic-bold-duotone" width={16} className="text-blue-400" />
                    <p className="text-white/60 text-xs uppercase tracking-wider font-medium">Disney World</p>
                  </div>
                  <p className="text-white font-semibold text-sm">{strategy.pricing.disneyTier}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon icon="solar:planet-bold-duotone" width={16} className="text-orange-400" />
                    <p className="text-white/60 text-xs uppercase tracking-wider font-medium">Universal</p>
                  </div>
                  <p className="text-white font-semibold text-sm">{strategy.pricing.universalTier}</p>
                </div>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-3">
                <Icon icon="solar:lightbulb-bold-duotone" width={18} className="text-amber-400 shrink-0 mt-0.5" />
                <p className="text-white/80 text-sm">{strategy.pricing.tip}</p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}