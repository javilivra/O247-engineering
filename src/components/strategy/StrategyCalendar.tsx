'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MonthStrategy, CalendarDay } from '@/data/strategy-2026';
import { DayScheduleMap, ParkDaySchedule, CALENDAR_PARKS } from '@/services/strategyData';
import { Icon } from '@/components/Icon';

interface Props {
  strategy: MonthStrategy;
  scheduleMap?: DayScheduleMap; // puede ser undefined si la API falló
}

// ─── Paleta de colores O247 para crowd levels ────────────────────────────────
// Verde tech → Celeste → Sunset → Rojo tech
// Refleja el sistema semántico del Sistema Visual Estructural O247
const CROWD_HEX: Record<number, string> = {
  1: '#a7e26e', // vanguard-green — muy tranquilo
  2: '#7dd665', // vanguard-green atenuado
  3: '#00B4D8', // celeste — neutro/informativo
  4: '#FF7043', // sunset — alerta/acción
  5: '#EF4444', // rojo tech — evitar/error
};

const CROWD_BG_CLASS: Record<number, string> = {
  1: 'bg-[#a7e26e]',
  2: 'bg-[#7dd665]',
  3: 'bg-[#00B4D8]',
  4: 'bg-[#FF7043]',
  5: 'bg-[#EF4444]',
};

const CROWD_TEXT_CLASS: Record<number, string> = {
  1: 'text-[#0f1a06]',
  2: 'text-[#0f1a06]',
  3: 'text-[#001a1f]',
  4: 'text-[#1a0800]',
  5: 'text-[#1a0000]',
};

const CROWD_LABEL: Record<number, string> = {
  1: 'Muy baja',
  2: 'Baja',
  3: 'Moderada',
  4: 'Alta',
  5: 'Extrema',
};

const CROWD_DESCRIPTION: Record<number, string> = {
  1: 'Ideal para visitar. Filas cortas, acceso libre.',
  2: 'Buen momento. Algunas filas en atracciones clave.',
  3: 'Esperas normales. Planificá con anticipación.',
  4: 'Concurrido. Priorizá Lightning Lane.',
  5: 'Alta saturación. Considerá parques alternativos.',
};

// ─── Iconos de recomendación ──────────────────────────────────────────────────
const REC_CONFIG = {
  go:      { icon: 'solar:check-circle-bold',         color: 'text-[#a7e26e]', bg: 'bg-[#a7e26e]/10', label: 'Ir' },
  neutral: { icon: 'solar:minus-circle-bold',          color: 'text-[#00B4D8]', bg: 'bg-[#00B4D8]/10', label: 'Neutro' },
  avoid:   { icon: 'solar:close-circle-bold',          color: 'text-[#EF4444]', bg: 'bg-[#EF4444]/10', label: 'Evitar' },
};

// ─── Icono por parque ─────────────────────────────────────────────────────────
const PARK_ICON: Record<string, string> = {
  'magic-kingdom':        'solar:castle-minimalistic-bold-duotone',
  'epcot':                'solar:planet-bold-duotone',
  'hollywood-studios':    'solar:camera-bold-duotone',
  'animal-kingdom':       'solar:leaf-bold-duotone',
  'universal-studios':    'solar:clapperboard-open-bold-duotone',
  'islands-of-adventure': 'solar:map-point-wave-bold-duotone',
  'epic-universe':        'solar:stars-bold-duotone',
};

// ─── Helper: fecha YYYY-MM-DD desde año/mes/día ───────────────────────────────
function toDateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

// ─── Helper: crowd level para un día dado (desde weeks[]) ─────────────────────
function getCrowdLevelForDay(strategy: MonthStrategy, dateNum: number): number {
  for (const week of strategy.weeks) {
    const found = week.days.find((d) => d.date === dateNum);
    if (found) return found.crowdLevel;
  }
  return 3;
}

// ─── Componente principal ─────────────────────────────────────────────────────
export function StrategyCalendar({ strategy, scheduleMap }: Props) {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  // Construir lista plana de todos los días del mes desde strategy.weeks
  // monthIndex es 0-based → convertir a 1-based para Date y dateKeys
  const monthNumber = strategy.monthIndex + 1;
  const allDays = useMemo(() => strategy.weeks.flatMap((w) => w.days), [strategy.weeks]);

  // Día seleccionado como objeto CalendarDay
  const selectedDay = useMemo(
    () => allDays.find((d) => d.date === selectedDate) ?? null,
    [allDays, selectedDate]
  );

  // Schedules del día seleccionado
  const selectedSchedules = useMemo((): ParkDaySchedule[] => {
    if (!selectedDate || !scheduleMap) return [];
    const key = toDateKey(strategy.year, monthNumber, selectedDate);
    return scheduleMap[key] ?? [];
  }, [selectedDate, scheduleMap, strategy.year, monthNumber]);

  // Primer día de la semana del mes (para offset del grid)
  const firstDayOffset = useMemo(() => {
    const d = new Date(strategy.year, monthNumber - 1, 1);
    return d.getDay();
  }, [strategy.year, monthNumber]);

  // Total de días en el mes
  const daysInMonth = useMemo(
    () => new Date(strategy.year, monthNumber, 0).getDate(),
    [strategy.year, monthNumber]
  );

  const hasScheduleData = scheduleMap && Object.keys(scheduleMap).length > 0;

  return (
    <section className="px-4 sm:px-6 lg:px-12 py-10 border-t border-white/5">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-white text-xl font-bold mb-1">Mapa de multitudes</h2>
        <p className="text-white/40 text-sm">
          Seleccioná un día para ver el análisis detallado por parque.
        </p>
      </div>

      {/* Layout 3 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr_280px] gap-6 lg:gap-4">

        {/* ── COLUMNA 1: Leyenda ── */}
        <div className="lg:sticky lg:top-24 lg:self-start space-y-6">

          {/* Escala de multitudes */}
          <div>
            <p className="text-white/30 text-[10px] uppercase tracking-widest font-medium mb-3">
              Nivel de multitud
            </p>
            <div className="space-y-2">
              {([1, 2, 3, 4, 5] as const).map((level) => (
                <div key={level} className="flex items-center gap-2.5">
                  <div
                    className="w-5 h-5 rounded-md flex-shrink-0"
                    style={{ backgroundColor: CROWD_HEX[level] }}
                  />
                  <div>
                    <p className="text-white/70 text-xs font-medium leading-none">
                      {CROWD_LABEL[level]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recomendaciones */}
          <div>
            <p className="text-white/30 text-[10px] uppercase tracking-widest font-medium mb-3">
              Recomendación
            </p>
            <div className="space-y-2">
              {(['go', 'neutral', 'avoid'] as const).map((rec) => {
                const cfg = REC_CONFIG[rec];
                return (
                  <div key={rec} className="flex items-center gap-2">
                    <Icon icon={cfg.icon} width={14} className={cfg.color} />
                    <span className="text-white/50 text-xs">{cfg.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Eventos */}
          <div>
            <p className="text-white/30 text-[10px] uppercase tracking-widest font-medium mb-3">
              Referencias
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white/80 flex-shrink-0" />
                <span className="text-white/50 text-xs">Nota especial</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-sunset flex-shrink-0" />
                <span className="text-white/50 text-xs">Evento ticketeado</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── COLUMNA 2: Calendario ── */}
        <div>
          {/* Cabecera días de semana */}
          <div className="grid grid-cols-7 mb-2">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((d) => (
              <div key={d} className="text-center">
                <span className="text-white/25 text-[10px] uppercase tracking-wider font-medium">
                  {d}
                </span>
              </div>
            ))}
          </div>

          {/* Grid de días */}
          <div className="grid grid-cols-7 gap-1">
            {/* Offset del primer día */}
            {Array.from({ length: firstDayOffset }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {/* Días del mes */}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const dayData = allDays.find((d) => d.date === day);
              const level = dayData?.crowdLevel ?? 3;
              const hasNote = !!dayData?.note;
              const dateKey = toDateKey(strategy.year, monthNumber, day);
              const hasSpecialEvent = scheduleMap?.[dateKey]?.some((s) => s.specialEvent);
              const isSelected = selectedDate === day;

              return (
                <motion.button
                  key={day}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDate(isSelected ? null : day)}
                  className={`
                    relative aspect-square rounded-lg flex flex-col items-center justify-center
                    cursor-pointer transition-all duration-150
                    ${isSelected
                      ? 'ring-2 ring-white ring-offset-1 ring-offset-transparent'
                      : 'hover:ring-1 hover:ring-white/30'
                    }
                  `}
                  style={{ backgroundColor: CROWD_HEX[level] }}
                >
                  <span
                    className={`text-xs font-bold leading-none ${CROWD_TEXT_CLASS[level]}`}
                  >
                    {day}
                  </span>

                  {/* Indicador nota editorial */}
                  {hasNote && (
                    <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-white/80 shadow-sm" />
                  )}

                  {/* Indicador evento ticketeado */}
                  {hasSpecialEvent && (
                    <span
                      className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 rounded-full shadow-sm"
                      style={{ backgroundColor: '#FF7043' }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Leyenda inline — mobile */}
          <div className="flex flex-wrap gap-3 mt-5 pt-4 border-t border-white/5 lg:hidden">
            {([1, 2, 3, 4, 5] as const).map((level) => (
              <div key={level} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: CROWD_HEX[level] }} />
                <span className="text-white/40 text-xs">{CROWD_LABEL[level]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── COLUMNA 3: Panel de día seleccionado ── */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <AnimatePresence mode="wait">
            {!selectedDay ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full min-h-[200px] rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col items-center justify-center gap-3 p-6"
              >
                <Icon
                  icon="solar:calendar-search-bold-duotone"
                  width={32}
                  className="text-white/15"
                />
                <p className="text-white/25 text-sm text-center leading-relaxed">
                  Seleccioná un día en el calendario para ver el análisis por parque
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={selectedDay.date}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
              >
                {/* Header del día */}
                <div
                  className="px-4 py-3 flex items-center justify-between"
                  style={{ backgroundColor: `${CROWD_HEX[selectedDay.crowdLevel]}18` }}
                >
                  <div>
                    <p className="text-white font-bold text-base">
                      {selectedDay.dayName} {selectedDay.date}
                    </p>
                    <p
                      className="text-xs font-medium mt-0.5"
                      style={{ color: CROWD_HEX[selectedDay.crowdLevel] }}
                    >
                      Multitud {CROWD_LABEL[selectedDay.crowdLevel]}
                    </p>
                  </div>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: CROWD_HEX[selectedDay.crowdLevel],
                      color: CROWD_TEXT_CLASS[selectedDay.crowdLevel].replace('text-[', '').replace(']', ''),
                    }}
                  >
                    {selectedDay.crowdLevel}
                  </div>
                </div>

                {/* Descripción del nivel */}
                <div className="px-4 py-2.5 border-b border-white/5">
                  <p className="text-white/50 text-xs leading-relaxed">
                    {CROWD_DESCRIPTION[selectedDay.crowdLevel]}
                  </p>
                  {selectedDay.note && (
                    <div className="mt-2 flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0 mt-1" />
                      <p className="text-white/70 text-xs leading-relaxed">{selectedDay.note}</p>
                    </div>
                  )}
                </div>

                {/* Parques */}
                <div className="px-4 py-3">
                  <p className="text-white/30 text-[10px] uppercase tracking-widest font-medium mb-3">
                    {hasScheduleData ? 'Análisis por parque' : 'Recomendación por parque'}
                  </p>

                  <div className="space-y-1.5">
                    {hasScheduleData && selectedSchedules.length > 0
                      ? // Con datos reales de ThemeParks.wiki
                        selectedSchedules.map((s) => {
                          const rec = REC_CONFIG[s.recommendation];
                          return (
                            <div
                              key={s.parkSlug}
                              className={`flex items-center gap-2.5 rounded-xl px-3 py-2 ${rec.bg}`}
                            >
                              <Icon
                                icon={PARK_ICON[s.parkSlug] ?? 'solar:planet-bold-duotone'}
                                width={14}
                                className="text-white/40 flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-white/80 text-xs font-semibold truncate">
                                  {s.parkShort}
                                </p>
                                {s.openTime && (
                                  <p className="text-white/35 text-[10px] leading-none mt-0.5">
                                    {s.openTime} – {s.closeTime}
                                    {s.specialEvent && (
                                      <span className="ml-1 text-[#FF7043]">
                                        · {s.specialEvent}
                                      </span>
                                    )}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                <Icon icon={rec.icon} width={14} className={rec.color} />
                                <span className={`text-[10px] font-medium ${rec.color}`}>
                                  {rec.label}
                                </span>
                              </div>
                            </div>
                          );
                        })
                      : // Sin datos de API — modo editorial puro
                        CALENDAR_PARKS.map((park) => {
                          const dayOfWeek = new Date(
                            `${strategy.year}-${String(monthNumber).padStart(2, '0')}-${String(selectedDay.date).padStart(2, '0')}T12:00:00`
                          ).getDay();
                          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                          const level = selectedDay.crowdLevel;

                          // Lógica de fallback simple
                          let rec: 'go' | 'neutral' | 'avoid' = 'go';
                          const highDemand = ['magic-kingdom', 'universal-studios', 'islands-of-adventure', 'hollywood-studios'];
                          if (level === 5) {
                            rec = highDemand.includes(park.slug) ? 'avoid' : 'neutral';
                          } else if (level === 4) {
                            rec = highDemand.includes(park.slug) && isWeekend ? 'avoid' :
                                  highDemand.includes(park.slug) ? 'neutral' : 'go';
                          } else if (level === 3) {
                            rec = highDemand.includes(park.slug) && isWeekend ? 'neutral' : 'go';
                          }

                          const recCfg = REC_CONFIG[rec];
                          return (
                            <div
                              key={park.slug}
                              className={`flex items-center gap-2.5 rounded-xl px-3 py-2 ${recCfg.bg}`}
                            >
                              <Icon
                                icon={PARK_ICON[park.slug] ?? 'solar:planet-bold-duotone'}
                                width={14}
                                className="text-white/40 flex-shrink-0"
                              />
                              <p className="text-white/80 text-xs font-semibold flex-1">
                                {park.short}
                              </p>
                              <div className="flex items-center gap-1">
                                <Icon icon={recCfg.icon} width={14} className={recCfg.color} />
                                <span className={`text-[10px] font-medium ${recCfg.color}`}>
                                  {recCfg.label}
                                </span>
                              </div>
                            </div>
                          );
                        })
                    }
                  </div>
                </div>

                {/* Footer — placeholder Fase 2 */}
                <div className="px-4 pb-4">
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5 flex items-center gap-2">
                    <Icon
                      icon="solar:magic-stick-3-bold-duotone"
                      width={14}
                      className="text-white/20 flex-shrink-0"
                    />
                    <p className="text-white/20 text-[10px] leading-relaxed">
                      En Fase 2 podrás agregar este día a tu planificación con IA.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}