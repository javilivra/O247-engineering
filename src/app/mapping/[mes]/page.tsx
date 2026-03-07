import { notFound } from 'next/navigation';
import { getStrategyBySlug, getAdjacentMonths, STRATEGY_2026 } from '@/data/strategy-2026';
import { getMonthParkSchedules, buildFallbackScheduleMap } from '@/services/strategyData';
import { StrategyHero } from '@/components/strategy/StrategyHero';
import { StrategyAnalysis } from '@/components/strategy/StrategyAnalysis';
import { StrategyCalendar } from '@/components/strategy/StrategyCalendar';
import { StrategyEditorial } from '@/components/strategy/StrategyEditorial';

// ISR: regenerar cada 24 horas
export const revalidate = 86400;

export async function generateStaticParams() {
  return STRATEGY_2026.map((m) => ({ mes: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ mes: string }> }) {
  const { mes } = await params;
  const strategy = getStrategyBySlug(mes);
  if (!strategy) return {};
  const month = mes.charAt(0).toUpperCase() + mes.slice(1);
  return {
    title: `${month} ${strategy.year} — Estrategia Orlando | O247`,
    description: strategy.crowds.summary.slice(0, 160),
  };
}

export default async function MonthStrategyPage({ params }: { params: Promise<{ mes: string }> }) {
  const { mes } = await params;
  const strategy = getStrategyBySlug(mes);
  if (!strategy) notFound();

  const { prev, next } = getAdjacentMonths(mes);

  // Construir mapa de crowd levels por semana para el service
  const weekCrowdLevels: Record<string, number> = {};
  strategy.weeks.forEach((week, i) => {
    // Tomar el crowd level promedio de la semana desde los días
    const levels = week.days.map((d) => d.crowdLevel);
    const avg = Math.round(levels.reduce((a, b) => a + b, 0) / levels.length);
    weekCrowdLevels[`semana-${i + 1}`] = avg;
  });

  // Intentar obtener schedules reales — fallback editorial si la API falla
  let scheduleMap;
  try {
    const month = strategy.monthIndex + 1; // monthIndex es 0-based, las APIs necesitan 1-based
    scheduleMap = await getMonthParkSchedules(strategy.year, month, weekCrowdLevels);
    // Si la API devolvió vacío (posible bloqueo o sin datos), usar fallback
    if (!scheduleMap || Object.keys(scheduleMap).length === 0) {
      scheduleMap = buildFallbackScheduleMap(strategy.year, month, weekCrowdLevels);
    }
  } catch {
    // API no disponible — modo editorial puro
    const month = strategy.monthIndex + 1;
    scheduleMap = buildFallbackScheduleMap(strategy.year, month, weekCrowdLevels);
  }

  return (
    <main className="min-h-screen bg-[#25343F]">
      <StrategyHero strategy={strategy} prev={prev} next={next} />
      <StrategyAnalysis strategy={strategy} />
      <StrategyCalendar strategy={strategy} scheduleMap={scheduleMap} />
      <StrategyEditorial strategy={strategy} />
    </main>
  );
}