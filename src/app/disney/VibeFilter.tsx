"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { MK_VIBES } from "@/data/mk-attractions-data";

interface VibeFilterProps {
  currentVibe: string;
  onVibeChange: (id: string) => void;
}

export default function VibeFilter({ currentVibe, onVibeChange }: VibeFilterProps) {
  return (
    <div className="w-full flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar py-2 mask-linear-fade">
      <div className="flex items-center gap-2 bg-white/50 backdrop-blur-xl border border-white/40 p-1.5 rounded-full shadow-sm">
        
        {MK_VIBES.map((vibe) => {
          const isActive = currentVibe === vibe.id;
          
          return (
            <button
              key={vibe.id}
              onClick={() => onVibeChange(vibe.id)}
              className={`relative px-4 py-2.5 rounded-full flex items-center gap-2 transition-all duration-300 outline-none focus:outline-none group ${
                isActive ? "text-white" : "text-gunmetal/60 hover:text-gunmetal"
              }`}
            >
              {/* FONDO ANIMADO (La "Burbuja" que se desliza) */}
              {isActive && (
                <motion.div
                  layoutId="activeVibeBubble"
                  className="absolute inset-0 bg-gunmetal rounded-full shadow-lg"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}

              {/* ICONO Y TEXTO (Z-Index para estar sobre la burbuja) */}
              <span className="relative z-10 flex items-center gap-2">
                <Icon 
                    icon={vibe.icon} 
                    className={`text-lg transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} 
                />
                <span className="text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">
                    {vibe.label}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}