'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MonthStrategy } from '@/data/strategy-2026';
import { Icon } from '@/components/Icon';

interface Props {
  strategy: MonthStrategy;
}

const PARK_LABELS: Record<string, string> = {
  mk: 'Magic Kingdom',
  epcot: 'EPCOT',
  hs: 'Hollywood Studios',
  ak: 'Animal Kingdom',
  tl: 'Typhoon Lagoon',
  bb: 'Blizzard Beach',
  epic: 'Epic Universe',
  ioa: 'Islands of Adventure',
  us: 'Universal Studios Florida',
  volcano: 'Volcano Bay',
};

const PARK_ICON: Record<string, string> = {
  mk: 'solar:castle-minimalistic-bold-duotone',
  epcot: 'solar:globus-bold-duotone',
  hs: 'solar:clapperboard-play-bold-duotone',
  ak: 'solar:leaf-bold-duotone',
  tl: 'solar:swimming-bold-duotone',
  bb: 'solar:snowflake-bold-duotone',
  epic: 'solar:planet-bold-duotone',
  ioa: 'solar:magic-stick-3-bold-duotone',
  us: 'solar:camera-bold-duotone',
  volcano: 'solar:fire-bold-duotone',
};

const EVENT_TYPE_LABEL: Record<string, string> = {
  festival: 'Festival',
  event: 'Evento',
  special: 'Especial',
  runDisney: 'runDisney',
};

const EVENT_TYPE_COLOR: Record<string, string> = {
  festival: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  event: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  special: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  runDisney: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
};

export function StrategyEditorial({ strategy }: Props) {
  return (
    <section className="px-6 lg:px-12 py-10 border-t border-white/5">

      {/* Parques recomendados */}
      <h2 className="text-white text-xl font-bold mb-6">Parques recomendados para este mes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {strategy.topParks.map((park, i) => (
          <motion.div
            key={park.parkId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                <Icon icon={PARK_ICON[park.parkId] || 'solar:planet-bold-duotone'} width={18} className="text-blue-400" />
              </div>
              <p className="text-white font-semibold text-sm">{PARK_LABELS[park.parkId] || park.parkId}</p>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">{park.reason}</p>
          </motion.div>
        ))}
      </div>

      {/* Tip principal + Evitar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 flex gap-3">
          <Icon icon="solar:star-bold-duotone" width={20} className="text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-emerald-400 text-xs uppercase tracking-wider font-medium mb-2">Tip principal O247</p>
            <p className="text-white/80 text-sm leading-relaxed">{strategy.mainTip}</p>
          </div>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5 flex gap-3">
          <Icon icon="solar:danger-triangle-bold-duotone" width={20} className="text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-red-400 text-xs uppercase tracking-wider font-medium mb-2">Qué evitar</p>
            <p className="text-white/80 text-sm leading-relaxed">{strategy.avoidTip}</p>
          </div>
        </div>
      </div>

      {/* Eventos del mes */}
      {strategy.events.length > 0 && (
        <div className="mb-10">
          <h3 className="text-white text-lg font-bold mb-4">Eventos del mes</h3>
          <div className="space-y-3">
            {strategy.events.map((event, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-4 rounded-xl border ${
                  event.highlight
                    ? 'bg-white/8 border-white/15'
                    : 'bg-white/3 border-white/8'
                }`}
              >
                {event.highlight && (
                  <Icon icon="solar:star-bold-duotone" width={16} className="text-yellow-400 shrink-0 mt-0.5" />
                )}
                {!event.highlight && (
                  <Icon icon="solar:calendar-bold-duotone" width={16} className="text-white/30 shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium">{event.name}</p>
                  <p className="text-white/40 text-xs mt-0.5">{event.dates}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full border shrink-0 ${EVENT_TYPE_COLOR[event.type]}`}>
                  {EVENT_TYPE_LABEL[event.type]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA Fase 2 — placeholder */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-500/20 p-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
          <Icon icon="solar:robot-bold-duotone" width={24} className="text-blue-400" />
        </div>
        <h3 className="text-white font-bold text-lg mb-2">Armá tu viaje en {strategy.slug.charAt(0).toUpperCase() + strategy.slug.slice(1)}</h3>
        <p className="text-white/50 text-sm mb-4 max-w-sm mx-auto">
          Próximamente: nuestro agente de planificación IA te ayudará a construir un itinerario personalizado basado en este análisis.
        </p>
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/15 text-white/50 text-sm cursor-default">
          <Icon icon="solar:clock-circle-bold-duotone" width={16} />
          Disponible en Fase 2
        </div>
      </div>
    </section>
  );
}