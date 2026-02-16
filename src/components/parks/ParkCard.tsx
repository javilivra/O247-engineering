"use client";

import { useEffect } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { motion, useSpring, useTransform, animate } from "framer-motion";

// ============================================================
// TYPES
// ============================================================

export type WeatherType = "sun" | "rain" | "cloud" | "snow" | "storm";

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
    const t = setTimeout(() => animate(count, value, { duration: 1.5, ease: "circOut" }), delay);
    return () => clearTimeout(t);
  }, [count, value, delay]);

  return <motion.span>{rounded}</motion.span>;
}

// ============================================================
// WEATHER
// ============================================================

const WEATHER_ICONS: Record<WeatherType, string> = {
  sun: "solar:sun-2-bold-duotone",
  rain: "solar:cloud-rain-bold-duotone",
  cloud: "solar:clouds-bold-duotone",
  snow: "solar:snowflake-bold-duotone",
  storm: "solar:cloud-storm-bold-duotone",
};

// ============================================================
// PARK CARD
// ============================================================

interface ParkCardProps {
  data: ParkData;
  isExpanded: boolean;
  onClick: () => void;
}

export default function ParkCard({ data, isExpanded, onClick }: ParkCardProps) {
  return (
    <motion.div
      layout
      onClick={onClick}
      className={`relative rounded-3xl overflow-hidden cursor-pointer border border-white/5 bg-gunmetal shadow-xl select-none ${
        isExpanded ? "flex-[4]" : "flex-[1]"
      }`}
      style={{ minWidth: 0, height: "100%" }}
      transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
      whileHover={!isExpanded ? { flex: 1.3 } : undefined}
    >
      {/* ============ BACKGROUND IMAGE ============ */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data.image}
          alt={data.name}
          fill
          className={`object-cover transition-all duration-[1.2s] ease-out ${
            isExpanded ? "scale-105 opacity-90" : "scale-110 opacity-40"
          }`}
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-gunmetal via-gunmetal/60 to-gunmetal/30" />
        <div className={`absolute inset-0 transition-opacity duration-700 ${
          isExpanded ? "opacity-0" : "opacity-50"
        } bg-gunmetal`} />
      </div>

      {/* ============ COMPACT STATE: Vertical name + expand icon ============ */}
      <div
        className={`absolute inset-0 z-20 flex flex-col items-center justify-between py-8 transition-all duration-500 ${
          isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Top: expand icon */}
        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-sunset/50 hover:bg-sunset/10 transition-all duration-300">
          <Icon icon="solar:add-circle-linear" width={20} className="text-white/60" />
        </div>

        {/* Middle: vertical name */}
        <div
          className="flex-1 flex items-center justify-center"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          <h3 className="font-sans text-2xl md:text-3xl font-bold text-white tracking-tight whitespace-nowrap">
            {data.name}
          </h3>
        </div>

        {/* Bottom: temp badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 backdrop-blur-md rounded-full border border-white/10">
          <Icon icon={WEATHER_ICONS[data.weatherType]} width={16} className="text-white/70" />
          <span className="font-mono text-xs text-white/80 font-medium">{data.temp}°</span>
        </div>
      </div>

      {/* ============ EXPANDED STATE: Full content ============ */}
      <div
        className={`absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-10 transition-all duration-500 ${
          isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Top bar: weather + stats */}
        <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
          {/* Weather */}
          <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 px-4 py-2.5">
            <Icon icon={WEATHER_ICONS[data.weatherType]} width={20} className="text-white/80" />
            <span className="font-mono text-base text-white font-bold">{data.temp}°</span>
          </div>

          {/* Stats */}
          <div className="flex gap-3">
            <div className="bg-black/40 backdrop-blur-md rounded-xl border border-white/10 px-5 py-3 text-center">
              <span className="block font-sans text-3xl font-bold text-white leading-none tabular-nums">
                <Counter value={data.stats.attractions} />
              </span>
              <span className="font-mono text-[8px] text-white/50 uppercase tracking-widest mt-1 block">
                Atracciones
              </span>
            </div>
            {data.stats.shows > 0 && (
              <div className="bg-black/40 backdrop-blur-md rounded-xl border border-white/10 px-5 py-3 text-center">
                <span className="block font-sans text-3xl font-bold text-white leading-none tabular-nums">
                  <Counter value={data.stats.shows} delay={200} />
                </span>
                <span className="font-mono text-[8px] text-white/50 uppercase tracking-widest mt-1 block">
                  Shows
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom content */}
        <div className="max-w-lg">
          <motion.h3
            initial={false}
            animate={{ y: isExpanded ? 0 : 20, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.5, delay: isExpanded ? 0.2 : 0 }}
            className="font-sans text-4xl md:text-5xl font-bold text-white tracking-tight leading-none mb-3"
          >
            {data.name}
          </motion.h3>

          <motion.div
            initial={false}
            animate={{ width: isExpanded ? 48 : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.4, delay: isExpanded ? 0.3 : 0 }}
            className="h-1 bg-sunset rounded-full mb-4"
            style={{ boxShadow: "0 0 15px rgba(255,112,67,0.5)" }}
          />

          <motion.p
            initial={false}
            animate={{ y: isExpanded ? 0 : 15, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.5, delay: isExpanded ? 0.35 : 0 }}
            className="font-sans text-sm text-bone/80 leading-relaxed mb-5"
            style={{ overflowWrap: "break-word" }}
          >
            {data.slogan}
          </motion.p>

          {/* Schedule */}
          <motion.div
            initial={false}
            animate={{ y: isExpanded ? 0 : 15, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.5, delay: isExpanded ? 0.4 : 0 }}
            className="font-mono text-[10px] text-white/70 leading-relaxed tracking-wide bg-gunmetal/70 backdrop-blur px-4 py-2.5 rounded-xl border border-white/10 inline-flex flex-wrap gap-x-4 gap-y-1 items-center"
          >
            <span>
              <span className="text-white font-bold">REG:</span> {data.schedule.regular}
            </span>
            {data.schedule.early !== "N/A" && (
              <span>
                <span className="text-celeste font-bold">EARLY:</span> {data.schedule.early}
              </span>
            )}
            {data.schedule.show && (
              <span>
                <span className="text-sunset font-bold">SHOW:</span> {data.schedule.show}
              </span>
            )}
          </motion.div>
        </div>

        {/* Collapse hint */}
        <motion.div
          initial={false}
          animate={{ opacity: isExpanded ? 1 : 0 }}
          transition={{ delay: isExpanded ? 0.6 : 0 }}
          className="absolute bottom-6 right-6"
        >
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-sunset/50 hover:bg-sunset/10 transition-all duration-300 rotate-45">
            <Icon icon="solar:add-circle-linear" width={20} className="text-white/60" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}