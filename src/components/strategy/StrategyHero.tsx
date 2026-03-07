'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MonthStrategy } from '@/data/strategy-2026';
import { Icon } from '@/components/Icon';

const MONTH_LABELS: Record<string, string> = {
  enero: 'Enero', febrero: 'Febrero', marzo: 'Marzo',
  abril: 'Abril', mayo: 'Mayo', junio: 'Junio',
  julio: 'Julio', agosto: 'Agosto', septiembre: 'Septiembre',
  octubre: 'Octubre', noviembre: 'Noviembre', diciembre: 'Diciembre',
};

const CROWD_CONFIG = {
  1: { label: 'Muy baja',  color: 'text-[#a7e26e]', bg: 'bg-[#a7e26e]/15' },
  2: { label: 'Baja',      color: 'text-[#6ecf5a]', bg: 'bg-[#6ecf5a]/15' },
  3: { label: 'Moderada',  color: 'text-[#00B4D8]', bg: 'bg-[#00B4D8]/15' },
  4: { label: 'Alta',      color: 'text-[#FF7043]', bg: 'bg-[#FF7043]/15' },
  5: { label: 'Extrema',   color: 'text-red-400',   bg: 'bg-red-500/15'   },
};

function getAvgCrowd(s: MonthStrategy): number {
  const all = s.weeks.flatMap(w => w.days.map(d => d.crowdLevel));
  return Math.round(all.reduce((a, b) => a + b, 0) / all.length);
}

function getWeatherIcon(summary: string): string {
  const l = summary.toLowerCase();
  if (l.includes('lluvia') || l.includes('lluvioso')) return 'solar:cloud-rain-bold-duotone';
  if (l.includes('tormenta'))                           return 'solar:cloud-storm-bold-duotone';
  if (l.includes('nublado') || l.includes('nube'))      return 'solar:clouds-bold-duotone';
  return 'solar:sun-2-bold-duotone';
}

function extractTemp(summary: string): string {
  const m = summary.match(/(\d+)[–—-](\d+)/);
  return m ? `${m[1]}–${m[2]}°C` : '–';
}

interface Props {
  strategy: MonthStrategy;
  prev: MonthStrategy | null;
  next: MonthStrategy | null;
}

export function StrategyHero({ strategy, prev, next }: Props) {
  const avgCrowd = Math.min(5, Math.max(1, getAvgCrowd(strategy))) as keyof typeof CROWD_CONFIG;
  const crowdCfg = CROWD_CONFIG[avgCrowd];
  const weatherIcon = getWeatherIcon(strategy.weather.summary);
  const temp = extractTemp(strategy.weather.summary);
  const highlightEvents = strategy.events.filter(e => e.highlight).length;

  return (
    <section className="relative min-h-[420px] flex flex-col justify-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a2730] via-[#25343F] to-[#1a2730]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      {/* Orbs */}
      <div className="absolute top-8 right-8 w-72 h-72 rounded-full pointer-events-none" style={{ background: 'rgba(0,180,216,0.08)', filter: 'blur(80px)' }} />
      <div className="absolute -bottom-8 left-0 w-56 h-56 rounded-full pointer-events-none" style={{ background: 'rgba(255,112,67,0.07)', filter: 'blur(60px)' }} />

      {/* Nav */}
      <div className="absolute top-6 left-0 right-0 px-6 lg:px-12 flex items-center justify-between z-10">
        <Link href="/mapping" className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors">
          <Icon icon="solar:arrow-left-bold" width={14} />
          <span className="type-tech text-[10px] uppercase tracking-[0.2em]">Mapping Anual</span>
        </Link>
        <div className="flex items-center gap-3">
          {prev && (
            <Link href={`/mapping/${prev.slug}`} className="flex items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors">
              <Icon icon="solar:arrow-left-bold" width={13} />
              <span className="type-tech text-[10px] uppercase tracking-[0.15em]">{MONTH_LABELS[prev.slug]}</span>
            </Link>
          )}
          {prev && next && <span className="text-white/15 text-xs">|</span>}
          {next && (
            <Link href={`/mapping/${next.slug}`} className="flex items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors">
              <span className="type-tech text-[10px] uppercase tracking-[0.15em]">{MONTH_LABELS[next.slug]}</span>
              <Icon icon="solar:arrow-right-bold" width={13} />
            </Link>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 lg:px-12 pb-10 pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

          {/* Eyebrow — type-tech */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#00B4D8', boxShadow: '0 0 6px rgba(0,180,216,0.6)' }} />
            <span className="type-tech text-[10px] text-white/40 uppercase tracking-[0.25em]">
              Estrategia Orlando · {strategy.year}
            </span>
          </div>

          {/* H1 — type-display */}
          <h1 className="type-display text-white mb-3 capitalize" style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', lineHeight: '0.95' }}>
            {MONTH_LABELS[strategy.slug]}
          </h1>

          {/* Intro — type-body */}
          <p className="type-body text-white/50 text-sm max-w-lg mb-6 leading-relaxed">
            {strategy.crowds.summary}
          </p>

          {/* Pills */}
          <div className="flex flex-wrap gap-2">
            {/* Multitud */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${crowdCfg.bg} border border-white/10`}>
              <Icon icon="solar:users-group-rounded-bold-duotone" width={14} className={crowdCfg.color} />
              <span className="type-tech text-[10px] text-white/60 uppercase tracking-wider">Multitud:</span>
              <span className={`type-tech text-[10px] font-bold ${crowdCfg.color}`}>{crowdCfg.label}</span>
            </div>
            {/* Clima */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00B4D8]/15 border border-white/10">
              <Icon icon={weatherIcon} width={14} className="text-[#00B4D8]" />
              <span className="type-tech text-[10px] text-white/60 uppercase tracking-wider">Clima:</span>
              <span className="type-tech text-[10px] font-bold text-[#00B4D8]">{temp}</span>
            </div>
            {/* Disney */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF7043]/15 border border-white/10">
              <Icon icon="solar:castle-minimalistic-bold-duotone" width={14} className="text-[#FF7043]" />
              <span className="type-tech text-[10px] text-white/60 uppercase tracking-wider">Disney:</span>
              <span className="type-tech text-[10px] font-bold text-[#FF7043]">{strategy.pricing.disneyTier}</span>
            </div>
            {/* Eventos */}
            {highlightEvents > 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#a7e26e]/15 border border-white/10">
                <Icon icon="solar:star-bold-duotone" width={14} className="text-[#a7e26e]" />
                <span className="type-tech text-[10px] text-[#a7e26e]">
                  {highlightEvents} evento{highlightEvents > 1 ? 's' : ''} destacado{highlightEvents > 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>

        </motion.div>
      </div>

      {/* Separador */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)' }} />
    </section>
  );
}