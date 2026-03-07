import { notFound } from 'next/navigation';
import { getStrategyBySlug, getAdjacentMonths, STRATEGY_2026 } from '@/data/strategy-2026';
import { StrategyHero } from '@/components/strategy/StrategyHero';
import { StrategyAnalysis } from '@/components/strategy/StrategyAnalysis';
import { StrategyCalendar } from '@/components/strategy/StrategyCalendar';
import { StrategyEditorial } from '@/components/strategy/StrategyEditorial';

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

  return (
    <main className="min-h-screen bg-slate-900">
      <StrategyHero strategy={strategy} prev={prev} next={next} />
      <StrategyAnalysis strategy={strategy} />
      <StrategyCalendar strategy={strategy} />
      <StrategyEditorial strategy={strategy} />
    </main>
  );
}