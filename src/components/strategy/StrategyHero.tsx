'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MonthStrategy } from '@/data/strategy-2026';
import { Icon } from '@/components/Icon';

const CROWD_CONFIG = {
  1: { label: 'Muy baja', color: 'text-emerald-400', bg: 'bg-emerald-500/20', bar: 'bg-emerald-400', width: 'w-1/5' },
  2: { label: 'Baja', color: 'text-green-400', bg: 'bg-green-500/20', bar: 'bg-green-400', width: 'w-2/5' },
  3: { label: 'Moderada', color: 'text-yellow-400', bg: 'bg-yellow-500/20', bar: 'bg-yellow-400', width: 'w-3/5' },
  4: { label: 'Alta', color: 'text-orange-400', bg: 'bg-orange-500/20', bar: 'bg-orange-400', width: 'w-4/5' },
  5: { label: 'Extrema', color: 'text-red-400', bg: 'bg-red-500/20', bar: 'bg-red-400', width: 'w-full' },
} as const;

const WEATHER_ICON: Record<string, string> = {
  frio: 'solar:snowflake-bold-duotone',
  fresco: 'solar:sun-fog-bold-duotone',
  calido: 'solar:sun-bold-duotone',
  calor: 'solar:sun-2-bold-duotone',
  lluvia: 'solar:cloud-rain-bold-duotone',
};

const MONTH_LABELS: Record<string, string> = {
  enero: 'Enero', febrero: 'Febrero', marzo: 'Marzo', abril: 'Abril',
  mayo: 'Mayo', junio: 'Junio', julio: 'Julio', agosto: 'Agosto',
  septiembre: 'Septiembre', octubre: 'Octubre', noviembre: 'Noviembre', diciembre: 'Diciembre',
};

function getWeatherIcon(summary: string): string {
  const s = summary.toLowerCase();
  if (s.includes('lluvia') || s.includes('lluv')) return WEATHER_ICON.lluvia;
  if (s.includes('fría') || s.includes('frío') || s.includes('frio')) return WEATHER_ICON.frio;
  if (s.includes('fresc')) return WEATHER_ICON.fresco;
  if (s.includes('calor') || s.includes('húmed') || s.includes('veran')) return WEATHER_ICON.calor;
  return WEATHER_ICON.calido;
}

function getAvgCrowd(strategy: MonthStrategy): number {
  const all = strategy.weeks.flatMap(w => w.days.map(d => d.crowdLevel));
  return Math.round(all.reduce((a, b) => a + b, 0) / all.length) as 1 | 2 | 3 | 4 | 5;
}

function extractTemp(summary: string): string {
  const match = summary.match(/(\d{2})[–-](\d{2})°C/);
  return match ? `${match[1]}–${match[2]}°C` : '–';
}

interface Props {
  strategy: MonthStrategy;
  prev: MonthStrategy | null;
  next: MonthStrategy | null;
}

export function StrategyHero({ strategy, prev, next }: Props) {
  const avgCrowd = getAvgCrowd(strategy) as keyof typeof CROWD_CONFIG;
  const crowdCfg = CROWD_CONFIG[avgCrowd];
  const weatherIcon = getWeatherIcon(strategy.weather.summary);
  const temp = extractTemp(strategy.weather.summary);

  return (
    <section className="relative min-h-[420px] flex flex-col justify-end overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Decorative orb */}
      <div className="absolute top-12 right-12 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-purple-500/10 blur-2xl pointer-events-none" />

      {/* Nav prev/next */}
      <div className="absolute top-6 left-0 right-0 px-6 lg:px-12 flex items-center justify-between z-10">
        <Link href="/mapping" className="flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors text-sm">
          <Icon icon="solar:arrow-left-bold" width={16} />
          Mapping Anual
        </Link>
        <div className="flex items-center gap-3">
          {prev && (
            <Link href={`/mapping/${prev.slug}`} className="flex items-center gap-1.5 text-white/60 hover:text-white/90 transition-colors text-sm">
              <Icon icon="solar:arrow-left-bold" width={14} />
              {MONTH_LABELS[prev.slug]}
            </Link>
          )}
          {prev && next && <span className="text-white/20">|</span>}
          {next && (
            <Link href={`/mapping/${next.slug}`} className="flex items-center gap-1.5 text-white/60 hover:text-white/90 transition-colors text-sm">
              {MONTH_LABELS[next.slug]}
              <Icon icon="solar:arrow-right-bold" width={14} />
            </Link>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 lg:px-12 pb-10 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Label */}
          <p className="text-white/40 text-xs uppercase tracking-widest mb-2 font-medium">
            Estrategia · {strategy.year}
          </p>

          {/* Month name */}
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 capitalize leading-none">
            {MONTH_LABELS[strategy.slug]}
          </h1>

          {/* Metrics pills */}
          <div className="flex flex-wrap gap-3">
            {/* Crowd */}
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${crowdCfg.bg} border border-white/10`}>
              <Icon icon="solar:users-group-rounded-bold-duotone" width={16} className={crowdCfg.color} />
              <span className="text-white/80 text-sm">Multitud:</span>
              <span className={`text-sm font-semibold ${crowdCfg.color}`}>{crowdCfg.label}</span>
            </div>

            {/* Weather */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/20 border border-white/10">
              <Icon icon={weatherIcon} width={16} className="text-sky-400" />
              <span className="text-white/80 text-sm">Clima:</span>
              <span className="text-sky-400 text-sm font-semibold">{temp}</span>
            </div>

            {/* Pricing */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-white/10">
              <Icon icon="solar:dollar-minimalistic-bold-duotone" width={16} className="text-amber-400" />
              <span className="text-white/80 text-sm">Disney:</span>
              <span className="text-amber-400 text-sm font-semibold">{strategy.pricing.disneyTier}</span>
            </div>

            {/* Events count */}
            {strategy.events.filter(e => e.highlight).length > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-white/10">
                <Icon icon="solar:star-bold-duotone" width={16} className="text-purple-400" />
                <span className="text-white/80 text-sm">
                  {strategy.events.filter(e => e.highlight).length} evento{strategy.events.filter(e => e.highlight).length > 1 ? 's' : ''} destacado{strategy.events.filter(e => e.highlight).length > 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}