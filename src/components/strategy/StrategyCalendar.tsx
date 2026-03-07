'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MonthStrategy } from '@/data/strategy-2026';
import { DayScheduleMap, ParkDaySchedule, CALENDAR_PARKS } from '@/services/strategyData';
import { Icon } from '@/components/Icon';

// ─────────────────────────────────────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────────────────────────────────────
interface Props {
  strategy: MonthStrategy;
  scheduleMap?: DayScheduleMap;
}

// ─────────────────────────────────────────────────────────────────────────────
// SISTEMA DE COLOR O247 (crowd levels)
// ─────────────────────────────────────────────────────────────────────────────
const CROWD_COLOR: Record<number, string> = {
  1: '#a7e26e', // vanguard-green — Muy baja
  2: '#6ecf5a', // verde medio   — Baja
  3: '#00B4D8', // celeste        — Moderada
  4: '#FF7043', // sunset         — Alta
  5: '#EF4444', // rojo tech      — Extrema
};

const CROWD_LABEL: Record<number, string> = {
  1: 'Muy baja',
  2: 'Baja',
  3: 'Moderada',
  4: 'Alta',
  5: 'Extrema',
};

const CROWD_DESC: Record<number, string> = {
  1: 'Ideal. Filas cortas en todo el parque.',
  2: 'Buen día. Algunas esperas en hits.',
  3: 'Normal. Planificá con anticipación.',
  4: 'Concurrido. Priorizá Lightning Lane.',
  5: 'Saturado. Considerá parques alternativos.',
};

// ─────────────────────────────────────────────────────────────────────────────
// SISTEMA DE RECOMENDACIÓN
// ─────────────────────────────────────────────────────────────────────────────
type RecType = 'go' | 'neutral' | 'avoid';

const REC_CONFIG: Record<RecType, { label: string; color: string; icon: string; bg: string; border: string }> = {
  go:      { label: 'Ir',     color: '#a7e26e', icon: 'solar:check-circle-bold',  bg: 'rgba(167,226,110,0.10)', border: 'rgba(167,226,110,0.22)' },
  neutral: { label: 'Neutro', color: '#00B4D8', icon: 'solar:minus-circle-bold',  bg: 'rgba(0,180,216,0.08)',   border: 'rgba(0,180,216,0.18)'   },
  avoid:   { label: 'Evitar', color: '#EF4444', icon: 'solar:close-circle-bold',  bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.18)'   },
};

// ─────────────────────────────────────────────────────────────────────────────
// ÍCONOS Y FOTOS POR PARQUE
// ─────────────────────────────────────────────────────────────────────────────
const PARK_ICON: Record<string, string> = {
  'magic-kingdom':        'solar:castle-minimalistic-bold-duotone',
  'epcot':                'solar:planet-bold-duotone',
  'hollywood-studios':    'solar:camera-bold-duotone',
  'animal-kingdom':       'solar:leaf-bold-duotone',
  'universal-studios':    'solar:clapperboard-open-bold-duotone',
  'islands-of-adventure': 'solar:map-point-wave-bold-duotone',
  'epic-universe':        'solar:stars-bold-duotone',
};

const PARK_IMAGE: Record<string, string> = {
  'magic-kingdom':        '/parks/magic-kingdom.jpg',
  'epcot':                '/parks/epcot.jpg',
  'hollywood-studios':    '/parks/hollywood-studios.jpg',
  'animal-kingdom':       '/parks/animal-kingdom.jpg',
  'universal-studios':    '/parks/universal-studios.jpg',
  'islands-of-adventure': '/parks/islands-of-adventure.jpg',
  'epic-universe':        '/parks/epic-universe.jpg',
};

// ─────────────────────────────────────────────────────────────────────────────
// LÓGICA DE RECOMENDACIÓN EDITORIAL (fallback sin API)
// ─────────────────────────────────────────────────────────────────────────────
function deriveRec(parkSlug: string, crowdLevel: number, dayOfWeek: number): RecType {
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const highDemand    = ['magic-kingdom', 'universal-studios', 'islands-of-adventure', 'hollywood-studios'];
  const alternatives  = ['animal-kingdom', 'epcot', 'epic-universe'];

  if (crowdLevel <= 2) return 'go';
  if (crowdLevel === 3) {
    if (highDemand.includes(parkSlug) && isWeekend) return 'neutral';
    return 'go';
  }
  if (crowdLevel === 4) {
    if (highDemand.includes(parkSlug) && isWeekend) return 'avoid';
    if (alternatives.includes(parkSlug)) return 'go';
    return 'neutral';
  }
  // nivel 5 — extrema
  if (alternatives.includes(parkSlug)) return 'neutral';
  return 'avoid';
}

function toDateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

const MONTH_NAMES: Record<number, string> = {
  0: 'Enero', 1: 'Febrero', 2: 'Marzo', 3: 'Abril',
  4: 'Mayo', 5: 'Junio', 6: 'Julio', 7: 'Agosto',
  8: 'Septiembre', 9: 'Octubre', 10: 'Noviembre', 11: 'Diciembre',
};

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTE: Park Card (columna izquierda)
// ─────────────────────────────────────────────────────────────────────────────
function ParkCard({
  parkSlug,
  parkLabel,
  openTime,
  closeTime,
  rec,
  specialEvent,
}: {
  parkSlug: string;
  parkLabel: string;
  openTime?: string;
  closeTime?: string;
  rec: RecType;
  specialEvent?: string | null;
}) {
  const cfg = REC_CONFIG[rec];
  const imgSrc = PARK_IMAGE[parkSlug] ?? '/parks/default.jpg';

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-200 group"
      style={{
        background: 'rgba(255,255,255,0.035)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Imagen hero del parque */}
      <div className="relative h-[72px] overflow-hidden">
        <img
          src={imgSrc}
          alt={parkLabel}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        {/* Degradado sobre foto */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(37,52,63,0.7) 0%, transparent 60%)' }}
        />
        {/* Nombre del parque sobre la foto */}
        <div className="absolute inset-0 flex items-end px-3 pb-2">
          <div className="flex items-center gap-1.5">
            <Icon
              icon={PARK_ICON[parkSlug] ?? 'solar:planet-bold-duotone'}
              width={12}
              className="text-white/70 shrink-0"
            />
            <span className="text-white text-xs font-bold drop-shadow">{parkLabel}</span>
          </div>
        </div>
        {/* Badge recomendación — top right */}
        <div
          className="absolute top-2 right-2 flex items-center gap-1 rounded-full px-2 py-0.5"
          style={{ backgroundColor: cfg.bg, border: `1px solid ${cfg.border}` }}
        >
          <span style={{ color: cfg.color, display: 'flex' }}>
            <Icon icon={cfg.icon} width={10} />
          </span>
          <span className="text-[9px] font-bold" style={{ color: cfg.color }}>{cfg.label}</span>
        </div>
      </div>

      {/* Info del parque */}
      <div className="px-3 py-2.5 space-y-1.5">
        {/* Horario */}
        {openTime && (
          <div className="flex items-center gap-1.5">
            <Icon icon="solar:clock-circle-bold-duotone" width={11} className="text-[#00B4D8] shrink-0" />
            <span className="text-[#00B4D8] text-[11px] font-medium">
              {openTime} – {closeTime}
            </span>
          </div>
        )}

        {/* Evento especial */}
        {specialEvent && (
          <div
            className="rounded-lg px-2 py-1"
            style={{ backgroundColor: 'rgba(255,112,67,0.10)', border: '1px solid rgba(255,112,67,0.22)' }}
          >
            <p className="text-[10px] leading-tight" style={{ color: '#FF7043' }}>
              <span className="font-bold">Evento: </span>{specialEvent}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────
export function StrategyCalendar({ strategy, scheduleMap }: Props) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const monthNumber = strategy.monthIndex + 1;

  // Días planos del mes
  const allDays = useMemo(
    () => strategy.weeks.flatMap((w) => w.days),
    [strategy.weeks],
  );

  // Crowd level para un día
  const getCrowdLevel = (day: number): number =>
    allDays.find((d) => d.date === day)?.crowdLevel ?? 3;

  const getNoteForDay = (day: number): string | null =>
    allDays.find((d) => d.date === day)?.note ?? null;

  const selectedDayData = useMemo(
    () => allDays.find((d) => d.date === selectedDay) ?? null,
    [allDays, selectedDay],
  );

  // Schedules API para el día seleccionado
  const selectedSchedules = useMemo((): ParkDaySchedule[] => {
    if (!selectedDay || !scheduleMap) return [];
    const key = toDateKey(strategy.year, monthNumber, selectedDay);
    return scheduleMap[key] ?? [];
  }, [selectedDay, scheduleMap, strategy.year, monthNumber]);

  // Offset y total de días
  const firstDayOffset = useMemo(
    () => new Date(strategy.year, monthNumber - 1, 1).getDay(),
    [strategy.year, monthNumber],
  );
  const daysInMonth = useMemo(
    () => new Date(strategy.year, monthNumber, 0).getDate(),
    [strategy.year, monthNumber],
  );

  // Park cards para el día seleccionado
  const parkCardsData = useMemo(() => {
    if (!selectedDay) return [];
    const crowdLevel = getCrowdLevel(selectedDay);
    const dateStr = toDateKey(strategy.year, monthNumber, selectedDay);
    const dow = new Date(dateStr + 'T12:00:00').getDay();

    if (selectedSchedules.length > 0) {
      return selectedSchedules.map((s) => ({
        parkSlug: s.parkSlug,
        parkLabel: s.parkLabel,
        openTime: s.openTime,
        closeTime: s.closeTime,
        rec: s.recommendation,
        specialEvent: s.specialEvent ?? null,
      }));
    }

    return CALENDAR_PARKS.map((p) => ({
      parkSlug: p.slug,
      parkLabel: p.label,
      openTime: '09:00',
      closeTime: '21:00',
      rec: deriveRec(p.slug, crowdLevel, dow),
      specialEvent: null,
    }));
  }, [selectedDay, selectedSchedules, strategy.year, monthNumber]);

  const crowdLevelSelected = selectedDay ? getCrowdLevel(selectedDay) : null;

  return (
    <section className="px-4 sm:px-6 lg:px-12 py-12 border-t border-white/5">

      {/* Título de sección */}
      <div className="mb-8">
        <h2 className="text-white text-xl font-bold mb-1">Mapa de multitudes</h2>
        <p className="text-white/35 text-sm">
          Seleccioná un día para ver el análisis detallado por parque.
        </p>
      </div>

      {/* ── GRID 3 COLUMNAS ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_280px] gap-6 items-start">

        {/* ════════════════════════════════════════════════════════════
            COL 1 — Sugerencias de parques
        ════════════════════════════════════════════════════════════ */}
        <div className="order-2 lg:order-1 lg:sticky lg:top-24">

          {/* Header col */}
          <div className="mb-4">
            <p className="text-white font-bold text-sm mb-0.5">Sugerencias de Parques</p>
            <p className="text-white/25 text-[10px] uppercase tracking-widest font-semibold">
              Horarios y Tips
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!selectedDay ? (
              <motion.div
                key="parks-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl flex flex-col items-center justify-center gap-3 py-14"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px dashed rgba(255,255,255,0.07)',
                }}
              >
                <Icon icon="solar:buildings-2-bold-duotone" width={32} className="text-white/10" />
                <p className="text-white/20 text-xs text-center px-6 leading-relaxed">
                  Tocá un día en el calendario para ver el análisis por parque
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={`parks-day-${selectedDay}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="space-y-2"
              >
                {/* Contexto del día */}
                <div className="mb-3 flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: CROWD_COLOR[getCrowdLevel(selectedDay)] }}
                  />
                  <p className="text-white/60 text-xs">
                    <span className="text-white font-bold">
                      {selectedDayData?.dayName} {selectedDay}
                    </span>
                    {' '}· Multitud{' '}
                    <span className="font-semibold" style={{ color: CROWD_COLOR[getCrowdLevel(selectedDay)] }}>
                      {CROWD_LABEL[getCrowdLevel(selectedDay)]}
                    </span>
                  </p>
                </div>

                {getNoteForDay(selectedDay) && (
                  <div className="mb-3 rounded-xl px-3 py-2 flex items-start gap-2"
                    style={{ background: 'rgba(0,180,216,0.06)', border: '1px solid rgba(0,180,216,0.14)' }}
                  >
                    <Icon icon="solar:info-circle-bold-duotone" width={12} className="text-[#00B4D8] shrink-0 mt-0.5" />
                    <p className="text-white/50 text-[10px] leading-relaxed">{getNoteForDay(selectedDay)}</p>
                  </div>
                )}

                {/* Cards de parques */}
                {parkCardsData.map((p) => (
                  <ParkCard
                    key={p.parkSlug}
                    parkSlug={p.parkSlug}
                    parkLabel={p.parkLabel}
                    openTime={p.openTime ?? undefined}
                    closeTime={p.closeTime ?? undefined}
                    rec={p.rec}
                    specialEvent={p.specialEvent}
                  />
                ))}

                {/* Placeholder Fase 2 */}
                <div
                  className="rounded-xl px-3 py-2.5 flex items-center gap-2 mt-1"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <Icon icon="solar:magic-stick-3-bold-duotone" width={12} className="text-white/15 shrink-0" />
                  <p className="text-white/15 text-[10px]">
                    En Fase 2 podrás agregar este día a tu planificación con IA.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ════════════════════════════════════════════════════════════
            COL 2 — Glass Calendar (protagonista)
        ════════════════════════════════════════════════════════════ */}
        <div className="order-1 lg:order-2">
          {/* ── GLASS CARD ── */}
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.045)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              border: '1px solid rgba(255,255,255,0.11)',
              boxShadow: `
                0 24px 48px rgba(0,0,0,0.35),
                0 8px 16px rgba(0,0,0,0.20),
                inset 0 1px 0 rgba(255,255,255,0.10),
                inset 0 -1px 0 rgba(0,0,0,0.15)
              `,
            }}
          >
            {/* ── Header del calendario ── */}
            <div
              className="px-5 pt-5 pb-4"
              style={{
                background: 'rgba(255,255,255,0.025)',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {/* Mes + año */}
              <h3 className="text-white font-bold text-2xl tracking-tight mb-3">
                {MONTH_NAMES[strategy.monthIndex] ?? `Mes ${monthNumber}`}
                <span className="text-white/30 font-normal text-lg ml-2">{strategy.year}</span>
              </h3>

              {/* Leyenda de multitudes — inline horizontal */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                <span className="text-white/25 text-[10px] uppercase tracking-widest font-medium mr-1">
                  Multitudes:
                </span>
                {([1, 2, 3, 4, 5] as const).map((level) => (
                  <div key={level} className="flex items-center gap-1.5">
                    <div
                      className="w-2.5 h-1 rounded-full"
                      style={{ backgroundColor: CROWD_COLOR[level] }}
                    />
                    <span className="text-white/40 text-[10px]">{CROWD_LABEL[level]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Cabecera días de semana ── */}
            <div className="grid grid-cols-7 px-4 pt-4 pb-2">
              {['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'].map((d) => (
                <div key={d} className="flex justify-center">
                  <span className="text-white/20 text-[9px] uppercase tracking-[0.12em] font-semibold">
                    {d}
                  </span>
                </div>
              ))}
            </div>

            {/* ── Grid de días ── */}
            <div className="grid grid-cols-7 px-3 pb-5 gap-1">
              {/* Celdas vacías de offset */}
              {Array.from({ length: firstDayOffset }).map((_, i) => (
                <div key={`offset-${i}`} className="aspect-square" />
              ))}

              {/* Días del mes */}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                const level = getCrowdLevel(day);
                const crowdColor = CROWD_COLOR[level];
                const note = getNoteForDay(day);
                const isSelected = selectedDay === day;
                const isToday = (() => {
                  const now = new Date();
                  return (
                    now.getFullYear() === strategy.year &&
                    now.getMonth() + 1 === monthNumber &&
                    now.getDate() === day
                  );
                })();

                return (
                  <motion.button
                    key={day}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setSelectedDay(isSelected ? null : day)}
                    className="relative flex flex-col items-center justify-between py-2.5 px-1 rounded-xl cursor-pointer transition-colors duration-150"
                    style={{
                      background: isSelected
                        ? 'rgba(255,255,255,0.10)'
                        : 'rgba(255,255,255,0.02)',
                      border: isSelected
                        ? '1px solid rgba(255,255,255,0.22)'
                        : isToday
                        ? `1px solid ${crowdColor}55`
                        : '1px solid transparent',
                      minHeight: '52px',
                    }}
                  >
                    {/* Número del día */}
                    <span
                      className="text-sm font-bold leading-none"
                      style={{
                        color: isSelected
                          ? '#fff'
                          : isToday
                          ? crowdColor
                          : 'rgba(255,255,255,0.65)',
                      }}
                    >
                      {day}
                    </span>

                    {/* ── LÍNEA DE COLOR CROWD — el elemento visual clave ── */}
                    <div
                      className="w-8 rounded-full mt-1.5"
                      style={{
                        height: '3px',
                        backgroundColor: crowdColor,
                        boxShadow: isSelected
                          ? `0 0 10px ${crowdColor}CC, 0 0 4px ${crowdColor}88`
                          : `0 0 5px ${crowdColor}55`,
                        opacity: isSelected ? 1 : 0.72,
                      }}
                    />

                    {/* Dot de nota especial */}
                    {note && (
                      <span
                        className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full"
                        style={{ backgroundColor: 'rgba(255,255,255,0.55)' }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* ── Chip del día seleccionado — debajo del calendario ── */}
          <AnimatePresence>
            {selectedDay && crowdLevelSelected && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="mt-3 rounded-2xl px-4 py-3 flex items-center gap-3"
                style={{
                  background: `${CROWD_COLOR[crowdLevelSelected]}0D`,
                  border: `1px solid ${CROWD_COLOR[crowdLevelSelected]}30`,
                }}
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: CROWD_COLOR[crowdLevelSelected],
                    boxShadow: `0 0 8px ${CROWD_COLOR[crowdLevelSelected]}88`,
                  }}
                />
                <p className="text-xs text-white/60">
                  <span className="font-bold" style={{ color: CROWD_COLOR[crowdLevelSelected] }}>
                    {selectedDayData?.dayName} {selectedDay}
                  </span>
                  {'  '}·{'  '}
                  {CROWD_DESC[crowdLevelSelected]}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ════════════════════════════════════════════════════════════
            COL 3 — Recomendaciones del mes
        ════════════════════════════════════════════════════════════ */}
        <div className="order-3 lg:sticky lg:top-24">
          <div className="space-y-4">

            {/* Header */}
            <div className="flex items-center gap-2 mb-5">
              <Icon icon="solar:hand-stars-bold-duotone" width={16} className="text-[#00B4D8]" />
              <h3 className="text-white font-bold text-sm">Recomendaciones</h3>
            </div>

            {/* Tips generales — bullet list */}
            <div
              className="rounded-2xl p-4 space-y-3"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {[
                strategy.crowds.tip,
                strategy.crowds.summary,
              ].filter(Boolean).map((tip, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span style={{ color: '#a7e26e', display: 'flex' }} className="shrink-0 mt-0.5">
                    <Icon icon="solar:check-circle-bold" width={14} />
                  </span>
                  <p className="text-white/55 text-xs leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>

            {/* Mejor / Peor semana */}
            <div
              className="rounded-2xl p-4 space-y-3"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <p className="text-white/20 text-[10px] uppercase tracking-widest font-semibold mb-1">
                Semanas clave
              </p>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#a7e26e' }} />
                <div>
                  <p className="text-[10px] text-white/25 uppercase tracking-wider mb-0.5 font-medium">Mejor semana</p>
                  <p className="text-white/60 text-xs leading-relaxed">{strategy.crowds.bestWeek}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#EF4444' }} />
                <div>
                  <p className="text-[10px] text-white/25 uppercase tracking-wider mb-0.5 font-medium">Semana a evitar</p>
                  <p className="text-white/60 text-xs leading-relaxed">{strategy.crowds.worstWeek}</p>
                </div>
              </div>
            </div>

            {/* Eventos del mes — advertencias críticas */}
            {strategy.events && strategy.events.length > 0 && (
              <div
                className="rounded-2xl p-4"
                style={{
                  background: 'rgba(255,112,67,0.05)',
                  border: '1px solid rgba(255,112,67,0.20)',
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ color: '#FF7043', display: 'flex' }} className="shrink-0">
                    <Icon icon="solar:danger-triangle-bold-duotone" width={14} />
                  </span>
                  <p
                    className="text-[10px] uppercase tracking-widest font-bold"
                    style={{ color: '#FF7043' }}
                  >
                    Advertencias críticas
                  </p>
                </div>
                <div className="space-y-2.5">
                  {strategy.events.slice(0, 3).map((ev, i) => (
                    <div key={i}>
                      {i > 0 && (
                        <div
                          className="my-2"
                          style={{ height: '1px', background: 'rgba(255,112,67,0.12)' }}
                        />
                      )}
                    <p className="text-white/70 text-[11px] font-semibold mb-0.5">{ev.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Leyenda recomendaciones */}
            <div
              className="rounded-2xl p-4"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <p className="text-white/20 text-[10px] uppercase tracking-widest font-semibold mb-3">
                Referencias
              </p>
              {(['go', 'neutral', 'avoid'] as RecType[]).map((rec) => {
                const cfg = REC_CONFIG[rec];
                return (
                  <div key={rec} className="flex items-center gap-2.5 mb-2 last:mb-0">
                    <span style={{ color: cfg.color, display: 'flex' }}>
                      <Icon icon={cfg.icon} width={13} />
                    </span>
                    <span className="text-white/50 text-xs font-medium">{cfg.label}</span>
                    <span className="text-white/20 text-[10px]">
                      {rec === 'go'      && '— Ideal para hoy'}
                      {rec === 'neutral' && '— Podés ir, no es óptimo'}
                      {rec === 'avoid'   && '— Evitarlo este día'}
                    </span>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}