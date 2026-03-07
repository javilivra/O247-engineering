'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MonthStrategy, CalendarDay } from '@/data/strategy-2026';

interface Props {
  strategy: MonthStrategy;
}

const CROWD_COLOR: Record<number, string> = {
  1: '#34d399',
  2: '#86efac',
  3: '#fbbf24',
  4: '#fb923c',
  5: '#f87171',
};

const CROWD_BG: Record<number, string> = {
  1: 'bg-emerald-500/80',
  2: 'bg-green-400/80',
  3: 'bg-yellow-400/80',
  4: 'bg-orange-400/80',
  5: 'bg-red-400/80',
};

const CROWD_LABEL: Record<number, string> = {
  1: 'Muy baja',
  2: 'Baja',
  3: 'Moderada',
  4: 'Alta',
  5: 'Extrema',
};

export function StrategyCalendar({ strategy }: Props) {
  const [tooltip, setTooltip] = useState<(CalendarDay & { weekLabel: string }) | null>(null);

  return (
    <section className="px-6 lg:px-12 py-10 border-t border-white/5">
      <h2 className="text-white text-xl font-bold mb-2">Calendario de multitudes</h2>
      <p className="text-white/40 text-sm mb-6">Cada día está coloreado según el nivel de multitud estimado.</p>

      <div className="space-y-4">
        {strategy.weeks.map((week) => (
          <div key={week.weekLabel}>
            <p className="text-white/40 text-xs uppercase tracking-wider mb-2 font-medium">{week.weekLabel}</p>
            <div className="flex flex-wrap gap-2">
              {week.days.map((day) => (
                <motion.button
                  key={`${week.weekLabel}-${day.date}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setTooltip(
                      tooltip?.date === day.date && tooltip?.weekLabel === week.weekLabel
                        ? null
                        : { ...day, weekLabel: week.weekLabel }
                    )
                  }
                  className={`relative w-10 h-10 rounded-lg ${CROWD_BG[day.crowdLevel]} flex flex-col items-center justify-center cursor-pointer transition-all ${
                    tooltip?.date === day.date && tooltip?.weekLabel === week.weekLabel
                      ? 'ring-2 ring-white'
                      : ''
                  }`}
                  style={{ color: '#0f172a' }}
                >
                  <span className="text-xs font-bold leading-none">{day.date}</span>
                  <span className="text-[9px] leading-none mt-0.5 opacity-80">{day.dayName}</span>
                  {day.note && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white shadow-sm" />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mt-4 rounded-xl bg-white/10 border border-white/15 p-4 flex items-start gap-3"
          >
            <div
              className="w-3 h-3 rounded-full shrink-0 mt-1"
              style={{ backgroundColor: CROWD_COLOR[tooltip.crowdLevel] }}
            />
            <div>
              <p className="text-white font-semibold text-sm">
                {tooltip.dayName} {tooltip.date} — Multitud {CROWD_LABEL[tooltip.crowdLevel]}
              </p>
              {tooltip.note && (
                <p className="text-white/60 text-sm mt-0.5">{tooltip.note}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 mt-6 pt-4 border-t border-white/5">
        <span className="text-white/30 text-xs uppercase tracking-wider font-medium">Leyenda:</span>
        {Object.entries(CROWD_LABEL).map(([level, label]) => (
          <div key={level} className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: CROWD_COLOR[Number(level)] }}
            />
            <span className="text-white/50 text-xs">{label}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-white" />
          <span className="text-white/50 text-xs">Evento notable</span>
        </div>
      </div>
    </section>
  );
}