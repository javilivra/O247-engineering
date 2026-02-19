'use client';

import { useEffect } from 'react';
import { Icon } from '@/components/Icon';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useSpring, useTransform, animate, AnimatePresence } from 'framer-motion';

// ============================================================
// TYPES
// ============================================================

export type WeatherType = 'sun' | 'rain' | 'cloud' | 'snow' | 'storm';

export interface ParkData {
  id: string;
  name: string;
  slogan: string;
  image: string;
  temp: number;
  stats: {
    attractions: number;
    shows: number;
  };
  schedule: {
    early: string;
    regular: string;
    show?: string;
  };
  weatherType: WeatherType;
}

// ============================================================
// COUNTER
// ============================================================

function Counter({ value, delay = 0 }: { value: number; delay?: number }) {
  const count = useSpring(0, { duration: 2000, bounce: 0 });
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    const t = setTimeout(() => animate(count, value, { duration: 1.5, ease: 'circOut' }), delay);
    return () => clearTimeout(t);
  }, [count, value, delay]);

  return <motion.span>{rounded}</motion.span>;
}

// ============================================================
// WEATHER
// ============================================================

const WEATHER_ICONS: Record<WeatherType, string> = {
  sun: 'solar:sun-2-bold-duotone',
  rain: 'solar:cloud-rain-bold-duotone',
  cloud: 'solar:clouds-bold-duotone',
  snow: 'solar:snowflake-bold-duotone',
  storm: 'solar:cloud-storm-bold-duotone',
};

// ============================================================
// PARK CARD
// ============================================================

interface ParkCardProps {
  data: ParkData;
  isExpanded: boolean;
  onClick: () => void;
  route?: string;
}

export default function ParkCard({ data, isExpanded, onClick, route }: ParkCardProps) {
  return (
    <motion.div
      layout
      className={`relative rounded-3xl overflow-hidden border border-white/5 bg-gunmetal shadow-xl select-none w-full ${isExpanded ? 'h-[420px] lg:h-full' : 'h-[120px] lg:h-full'}`}
      transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
    >
      {/* ============ BACKGROUND IMAGE ============ */}
      <motion.div 
        layout="position" 
        className="absolute inset-0 z-0"
      >
        <Image
          src={data.image}
          alt={data.name}
          fill
          className={`object-cover transition-all duration-[1.2s] ease-out ${isExpanded ? 'scale-105 opacity-80' : 'scale-110 opacity-75'}`}
        />
        <div
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${isExpanded
              ? 'bg-gradient-to-t from-gunmetal via-gunmetal/70 to-transparent'
              : 'bg-gradient-to-t from-gunmetal from-10% to-transparent to-50%'}`}
        />
      </motion.div>

      {/* ============ COMPACT STATE (MOBILE) ============ */}
      <div className="lg:hidden">
        <AnimatePresence>
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeIn' }}
              className="absolute inset-0 z-20 flex items-center justify-between p-4"
            >
              <div
                className="flex-1 flex items-center justify-start"
              >
                <h3 className="font-sans text-2xl font-bold text-white tracking-tight">
                  {data.name}
                </h3>
              </div>

              <div 
                onClick={(e) => { e.stopPropagation(); onClick(); }}
                className="flex w-12 h-12 rounded-full border border-white/20 items-center justify-center hover:border-sunset/50 hover:bg-sunset/10 transition-all duration-300 cursor-pointer shrink-0"
              >
                <Icon icon="solar:add-circle-linear" width={28} className="text-white/80" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ============ COMPACT STATE (DESKTOP) ============ */}
      <div className="hidden lg:block">
        <AnimatePresence>
            {!isExpanded && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeIn' }}
                className="absolute inset-0 z-20 p-6 flex flex-col justify-between items-center"
            >
                <div onClick={(e) => { e.stopPropagation(); onClick(); }} className="absolute top-4 right-4 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-sunset/50 hover:bg-sunset/10 transition-all duration-300 cursor-pointer shrink-0">
                    <Icon icon="solar:add-circle-linear" width={28} className="text-white/80" />
                </div>

                <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <Icon icon={WEATHER_ICONS[data.weatherType]} width={20} className="text-white/80" />
                        <span className="font-mono text-sm font-bold">AHORA: {data.temp}°</span>
                    </div>
                    <h3 className="font-sans text-4xl font-bold text-white tracking-tight">
                        {data.name}
                    </h3>
                </div>
            </motion.div>
            )}
        </AnimatePresence>
      </div>

      {/* ============ EXPANDED STATE ============ */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            className="absolute inset-0 z-20 flex flex-col justify-between p-6 lg:p-8"
          >
            {/* --- TOP SECTION --- */}
            <div className="flex justify-between items-start">
              {/* Stats */}
              <div className="flex gap-3">
                <div className="bg-black/40 backdrop-blur-md rounded-xl border border-white/10 px-4 py-2 lg:px-5 lg:py-3 text-center">
                  <span className="block font-sans text-2xl lg:text-3xl font-bold text-white leading-none tabular-nums">
                    <Counter value={data.stats.attractions} />
                  </span>
                  <span className="font-mono text-[8px] text-white/50 uppercase tracking-widest mt-1 block">
                    Atracciones
                  </span>
                </div>
                {data.stats.shows > 0 && (
                  <div className="bg-black/40 backdrop-blur-md rounded-xl border border-white/10 px-4 py-2 lg:px-5 lg:py-3 text-center">
                    <span className="block font-sans text-2xl lg:text-3xl font-bold text-white leading-none tabular-nums">
                      <Counter value={data.stats.shows} delay={200} />
                    </span>
                    <span className="font-mono text-[8px] text-white/50 uppercase tracking-widest mt-1 block">
                      Shows
                    </span>
                  </div>
                )}
              </div>
              {/* Close Button */}
              <div onClick={(e) => { e.stopPropagation(); onClick(); }} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-sunset/50 hover:bg-sunset/10 transition-all duration-300 cursor-pointer">
                <Icon icon="solar:close-circle-bold-duotone" width={24} className="text-white/80" />
              </div>
            </div>

            {/* --- BOTTOM SECTION --- */}
            <div className="w-full">
              {/* Main Content */}
              <div className="max-w-lg mb-6">
                <h3 className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-none mb-3">
                  {data.name}
                </h3>
                <div className="h-1 bg-sunset rounded-full mb-4 w-12" style={{ boxShadow: '0 0 15px rgba(255,112,67,0.5)' }} />
                <p className="font-sans text-sm text-bone/80 leading-relaxed mb-4" style={{ overflowWrap: 'break-word' }}>
                  {data.slogan}
                </p>
                {/* Weather */}
                <div className="flex items-center gap-3">
                  <Icon icon={WEATHER_ICONS[data.weatherType]} width={20} className="text-white/80" />
                  <span className="font-mono text-sm text-white font-bold">AHORA: {data.temp}°</span>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex flex-row justify-between items-end gap-4">
                {/* Schedule */}
                <div className="font-mono text-[10px] text-white/70 leading-relaxed tracking-wide bg-gunmetal/70 backdrop-blur px-4 py-2.5 rounded-xl border border-white/10 inline-flex flex-wrap gap-x-4 gap-y-1 items-center">
                  <span><span className="text-white font-bold">REG:</span> {data.schedule.regular}</span>
                  {data.schedule.early !== 'N/A' && <span><span className="text-celeste font-bold">EARLY:</span> {data.schedule.early}</span>}
                  {data.schedule.show && <span><span className="text-sunset font-bold">SHOW:</span> {data.schedule.show}</span>}
                </div>
                {/* Explore Button */}
                {route && (
                  <Link
                    href={route}
                    className="z-30 px-6 py-3 bg-sunset text-white rounded-full font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-lg hover:shadow-sunset/30 active:scale-[0.97] flex items-center gap-2 self-end"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Explorar parque
                    <Icon icon="solar:arrow-right-linear" width={14} />
                  </Link>
                )}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
