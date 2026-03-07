'use client';

import { motion } from 'framer-motion';
import { MonthStrategy } from '@/data/strategy-2026';
import { Icon } from '@/components/Icon';

interface Props {
  strategy: MonthStrategy;
}

const MONTH_LABELS: Record<string, string> = {
  enero: 'Enero', febrero: 'Febrero', marzo: 'Marzo', abril: 'Abril',
  mayo: 'Mayo', junio: 'Junio', julio: 'Julio', agosto: 'Agosto',
  septiembre: 'Septiembre', octubre: 'Octubre', noviembre: 'Noviembre', diciembre: 'Diciembre',
};

const PARK_LABELS: Record<string, string> = {
  mk: 'Magic Kingdom', epcot: 'EPCOT', hs: 'Hollywood Studios',
  ak: 'Animal Kingdom', tl: 'Typhoon Lagoon', bb: 'Blizzard Beach',
  epic: 'Epic Universe', ioa: 'Islands of Adventure',
  us: 'Universal Studios Florida', volcano: 'Volcano Bay',
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
  festival: 'Festival', event: 'Evento', special: 'Especial', runDisney: 'runDisney',
};

// Colores de eventos — O247 palette
const EVENT_TYPE_COLOR: Record<string, string> = {
  festival:  'bg-[#00B4D8]/20 text-[#00B4D8] border-[#00B4D8]/30',
  event:     'bg-[#FF7043]/20 text-[#FF7043] border-[#FF7043]/30',
  special:   'bg-[#a7e26e]/20 text-[#a7e26e] border-[#a7e26e]/30',
  runDisney: 'bg-white/10 text-white/70 border-white/20',
};

export function StrategyEditorial({ strategy }: Props) {
  const monthName = MONTH_LABELS[strategy.slug] ?? strategy.slug;

  return (
    <section className="px-6 lg:px-12 py-10 border-t border-white/5">

      {/* ── PARQUES RECOMENDADOS ── */}
      {/* H2 — type-display */}
      <h2 className="type-display text-white mb-6" style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)' }}>
        Parques recomendados para {monthName}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {strategy.topParks.map((park, i) => (
          <motion.div
            key={park.parkId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/[0.07] transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              {/* Iconografía: Informativo → Celeste (brief Doc N2 §11) */}
              <div className="w-9 h-9 rounded-xl bg-[#00B4D8]/15 flex items-center justify-center shrink-0">
                <Icon icon={PARK_ICON[park.parkId] || 'solar:planet-bold-duotone'} width={17} className="text-[#00B4D8]" />
              </div>
              {/* type-tech: nombre de parque como label estructural */}
              <p className="type-tech text-[11px] text-white uppercase tracking-[0.1em]">
                {PARK_LABELS[park.parkId] || park.parkId}
              </p>
            </div>
            {/* type-body: descripción/razón */}
            <p className="type-body text-white/55 text-sm leading-relaxed">{park.reason}</p>
          </motion.div>
        ))}
      </div>

      {/* ── TIP PRINCIPAL + EVITAR ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="bg-[#a7e26e]/10 border border-[#a7e26e]/20 rounded-2xl p-5 flex gap-3">
          <Icon icon="solar:lightbulb-bold-duotone" width={20} className="text-[#a7e26e] shrink-0 mt-0.5" />
          <div>
            {/* type-tech: label de categoría */}
            <p className="type-tech text-[10px] text-[#a7e26e] uppercase tracking-[0.15em] mb-1">Tip clave</p>
            {/* type-body: contenido */}
            <p className="type-body text-white/80 text-sm leading-relaxed">{strategy.mainTip}</p>
          </div>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5 flex gap-3">
          <Icon icon="solar:danger-triangle-bold-duotone" width={20} className="text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="type-tech text-[10px] text-red-400 uppercase tracking-[0.15em] mb-1">Evitar</p>
            <p className="type-body text-white/80 text-sm leading-relaxed">{strategy.avoidTip}</p>
          </div>
        </div>
      </div>

      {/* ── EVENTOS DEL MES ── */}
      {strategy.events.length > 0 && (
        <div className="mb-10">
          <h2 className="type-display text-white mb-4" style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)' }}>
            Eventos de {monthName}
          </h2>
          <div className="space-y-2">
            {strategy.events.map((event, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-3.5 rounded-xl border transition-colors ${
                  event.highlight ? 'bg-white/[0.06] border-white/12' : 'bg-white/[0.03] border-white/7'
                }`}
              >
                {event.highlight
                  ? <Icon icon="solar:star-bold-duotone" width={15} className="text-[#a7e26e] shrink-0 mt-0.5" />
                  : <Icon icon="solar:calendar-bold-duotone" width={15} className="text-white/25 shrink-0 mt-0.5" />
                }
                <div className="flex-1 min-w-0">
                  {/* type-body con énfasis en nombre */}
                  <p className="type-body text-white text-sm font-medium">{event.name}</p>
                  {/* type-tech: dato de fecha */}
                  <p className="type-tech text-[10px] text-white/35 mt-0.5 tracking-[0.08em]">{event.dates}</p>
                </div>
                <span className={`type-tech text-[9px] px-2 py-1 rounded-full border shrink-0 uppercase tracking-[0.1em] ${EVENT_TYPE_COLOR[event.type]}`}>
                  {EVENT_TYPE_LABEL[event.type]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── CTA FASE 2 ── */}
      <div className="rounded-2xl bg-gradient-to-br from-[#1a2a3a] to-[#1a2030] border border-white/10 p-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#00B4D8]/15 flex items-center justify-center mx-auto mb-4">
          <Icon icon="solar:robot-bold-duotone" width={24} className="text-[#00B4D8]" />
        </div>
        {/* type-display: título de CTA */}
        <h3 className="type-display text-white mb-2" style={{ fontSize: '1.1rem' }}>
          Armá tu viaje en {monthName}
        </h3>
        {/* type-body: descripción */}
        <p className="type-body text-white/45 text-sm mb-4 max-w-sm mx-auto leading-relaxed">
          Próximamente: nuestro agente de planificación IA te ayudará a construir un itinerario personalizado basado en este análisis.
        </p>
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/8 border border-white/12 text-white/40 cursor-default">
          <Icon icon="solar:clock-circle-bold-duotone" width={15} />
          {/* type-tech: tag de estado */}
          <span className="type-tech text-[10px] uppercase tracking-[0.15em]">Disponible en Fase 2</span>
        </div>
      </div>

    </section>
  );
}