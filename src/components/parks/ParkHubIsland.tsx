"use client";
// ============================================================
// ParkHubIsland — 4 accesos rápidos a las secciones de la guía
// Reutilizable: recibe basePath ("/disney/mk", "/disney/ep", etc.)
// Visual: 4 rectangulos glassmorphism, similar al HUD de atracciones
// ============================================================

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Icon } from "@/components/Icon";

interface HubItem {
  icon: string;
  label: string;
  sublabel: string;
  anchor: string;
  accentColor: string;
}

const HUB_ITEMS: HubItem[] = [
  {
    icon: "solar:map-point-bold-duotone",
    label: "Cómo llegar",
    sublabel: "Logística",
    anchor: "logistica",
    accentColor: "rgba(255,112,67,0.9)", // sunset
  },
  {
    icon: "solar:stopwatch-bold-duotone",
    label: "Estrategia",
    sublabel: "Timing",
    anchor: "estrategia",
    accentColor: "rgba(56,189,248,0.9)", // celeste
  },
  {
    icon: "solar:layers-minimalistic-bold-duotone",
    label: "Tierras",
    sublabel: "Regiones",
    anchor: "tierras",
    accentColor: "rgba(255,112,67,0.9)",
  },
  {
    icon: "solar:clipboard-check-bold-duotone",
    label: "Bucket List",
    sublabel: "Imperdibles",
    anchor: "bucket",
    accentColor: "rgba(56,189,248,0.9)",
  },
];

interface ParkHubIslandProps {
  basePath: string; // e.g. "/disney/mk"
}

export default function ParkHubIsland({ basePath }: ParkHubIslandProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {HUB_ITEMS.map((item, i) => (
        <motion.div
          key={item.anchor}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07, duration: 0.4 }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.97 }}
          className="flex-1 min-w-0"
        >
          <Link
            href={`${basePath}/guide#${item.anchor}`}
            className="
              block relative overflow-hidden
              rounded-2xl px-3 py-3
              bg-white/10 backdrop-blur-md
              border border-white/20
              shadow-[0_4px_24px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.15)]
              hover:bg-white/20 hover:border-white/35 hover:shadow-[0_8px_32px_rgba(0,0,0,0.18)]
              transition-all duration-300
              cursor-pointer
              group
            "
          >
            {/* Glow de fondo */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
              style={{ background: `radial-gradient(circle at 50% 100%, ${item.accentColor}15, transparent 70%)` }}
            />

            {/* Contenido */}
            <div className="relative z-10 flex flex-col items-center gap-1.5 text-center">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${item.accentColor}20`, border: `1px solid ${item.accentColor}30` }}
              >
                <Icon icon={item.icon} width={16} className="opacity-90" />
              </div>
              <div>
                <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/50 font-mono leading-none mb-0.5">
                  {item.sublabel}
                </div>
                <div className="text-[11px] sm:text-xs font-black text-white leading-tight whitespace-nowrap">
                  {item.label}
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
