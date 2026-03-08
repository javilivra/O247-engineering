'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MonthStrategy } from '@/data/strategy-2026';
import { Icon } from '@/components/Icon';

const MONTH_LABELS: Record<string, string> = {
  enero: 'Enero', febrero: 'Febrero', marzo: 'Marzo', abril: 'Abril',
  mayo: 'Mayo', junio: 'Junio', julio: 'Julio', agosto: 'Agosto',
  septiembre: 'Septiembre', octubre: 'Octubre', noviembre: 'Noviembre', diciembre: 'Diciembre',
};

const CROWD_CONFIG = {
  1: { label: 'Muy baja', color: '#a7e26e' },
  2: { label: 'Baja',     color: '#6ecf5a' },
  3: { label: 'Moderada', color: '#00B4D8' },
  4: { label: 'Alta',     color: '#FF7043' },
  5: { label: 'Extrema',  color: '#EF4444' },
};

function getAvgCrowd(s: MonthStrategy): number {
  const all = s.weeks.flatMap(w => w.days.map(d => d.crowdLevel));
  return Math.round(all.reduce((a, b) => a + b, 0) / all.length);
}

function getWeatherIcon(summary: string): string {
  const l = summary.toLowerCase();
  if (l.includes('lluvia') || l.includes('lluvioso')) return 'solar:cloud-rain-bold-duotone';
  if (l.includes('tormenta')) return 'solar:cloud-storm-bold-duotone';
  if (l.includes('nublado') || l.includes('nube')) return 'solar:clouds-bold-duotone';
  return 'solar:sun-2-bold-duotone';
}

function extractTemp(summary: string): string {
  const m = summary.match(/(\d+)[–—-](\d+)/);
  return m ? `${m[1]}-${m[2]}°C` : '-';
}

interface Props {
  strategy: MonthStrategy;
  prev: MonthStrategy | null;
  next: MonthStrategy | null;
}

export function StrategyHero({ strategy, prev, next }: Props) {
  const [expanded, setExpanded] = useState(false);

  const avgCrowd = Math.min(5, Math.max(1, getAvgCrowd(strategy))) as keyof typeof CROWD_CONFIG;
  const { label: crowdLabel, color: crowdColor } = CROWD_CONFIG[avgCrowd];
  const weatherIcon = getWeatherIcon(strategy.weather.summary);
  const temp = extractTemp(strategy.weather.summary);
  const highlightEvents = strategy.events.filter(e => e.highlight).length;

  return (
    <section className="bg-bone">
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 pt-10 pb-12">

        {/* Nav prev/next */}
        <div className="flex items-center justify-between mb-10">
          <Link href="/mapping" className="flex items-center gap-2 text-gunmetal/40 hover:text-gunmetal/70 transition-colors">
            <Icon icon="solar:arrow-left-bold" width={13} className="text-gunmetal/40" />
            <span className="type-tech text-[10px] uppercase tracking-[0.2em]">Mapping Anual</span>
          </Link>
          <div className="flex items-center gap-3">
            {prev && (
              <Link href={`/mapping/${prev.slug}`} className="flex items-center gap-1.5 text-gunmetal/40 hover:text-gunmetal/70 transition-colors">
                <Icon icon="solar:arrow-left-bold" width={12} className="text-gunmetal/40" />
                <span className="type-tech text-[10px] uppercase tracking-[0.15em]">{MONTH_LABELS[prev.slug]}</span>
              </Link>
            )}
            {prev && next && <span className="text-gunmetal/20 text-xs">|</span>}
            {next && (
              <Link href={`/mapping/${next.slug}`} className="flex items-center gap-1.5 text-gunmetal/40 hover:text-gunmetal/70 transition-colors">
                <span className="type-tech text-[10px] uppercase tracking-[0.15em]">{MONTH_LABELS[next.slug]}</span>
                <Icon icon="solar:arrow-right-bold" width={12} className="text-gunmetal/40" />
              </Link>
            )}
          </div>
        </div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-sans text-4xl md:text-5xl font-bold text-gunmetal mb-6"
        >
          {MONTH_LABELS[strategy.slug]}
        </motion.h1>

        {/* ContextualIntro */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="text-xl md:text-2xl font-medium text-gunmetal leading-relaxed font-sans">
            <p>{strategy.crowds.summary}</p>
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 space-y-4 text-base md:text-lg text-gunmetal/80 font-normal leading-relaxed">
                    <p>{strategy.weather.summary}</p>
                    {strategy.mainTip && (
                      <div className="pl-4 border-l-2 border-sunset">
                        <p className="italic text-gunmetal">{strategy.mainTip}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-6 flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-widest text-sunset hover:text-gunmetal transition-colors"
          >
            <span>{expanded ? '[ - ] COMPRIMIR LECTURA' : '[ + ] SEGUIR LEYENDO'}</span>
          </button>
        </motion.div>

        {/* Pills — glass-bone-pill, Icon sin style prop (regla del sistema) */}
        <div className="flex flex-wrap gap-2.5 mt-8">

          {/* Multitud — color dinámico via span wrapper */}
          <div className="glass-bone-pill flex items-center gap-2 px-3.5 py-2">
            <span style={{ color: crowdColor }}>
              <Icon icon="solar:users-group-rounded-bold-duotone" width={15} />
            </span>
            <span className="type-tech text-[10px] text-gunmetal/45 uppercase tracking-wider">Multitud</span>
            <span className="type-tech text-[11px] font-bold" style={{ color: crowdColor }}>{crowdLabel}</span>
          </div>

          {/* Clima */}
          <div className="glass-bone-pill flex items-center gap-2 px-3.5 py-2">
            <Icon icon={weatherIcon} width={15} className="text-celeste" />
            <span className="type-tech text-[10px] text-gunmetal/45 uppercase tracking-wider">Clima</span>
            <span className="type-tech text-[11px] font-bold text-celeste">{temp}</span>
          </div>

          {/* Disney tier */}
          <div className="glass-bone-pill flex items-center gap-2 px-3.5 py-2">
            <Icon icon="solar:castle-minimalistic-bold-duotone" width={15} className="text-sunset" />
            <span className="type-tech text-[10px] text-gunmetal/45 uppercase tracking-wider">Disney</span>
            <span className="type-tech text-[11px] font-bold text-sunset">{strategy.pricing.disneyTier}</span>
          </div>

          {/* Eventos destacados */}
          {highlightEvents > 0 && (
            <div className="glass-bone-pill flex items-center gap-2 px-3.5 py-2">
              <Icon icon="solar:star-bold-duotone" width={15} className="text-vanguard-green" />
              <span className="type-tech text-[11px] font-bold text-vanguard-green">
                {highlightEvents} evento{highlightEvents > 1 ? 's' : ''} destacado{highlightEvents > 1 ? 's' : ''}
              </span>
            </div>
          )}

        </div>

        <div className="mt-10 h-px bg-gunmetal/5" />
      </div>
    </section>
  );
}