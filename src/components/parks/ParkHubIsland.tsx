"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@/components/Icon";

const HUB_ITEMS = [
  { icon: "solar:routing-3-bold-duotone",          label: "Cómo llegar",  sublabel: "Transporte",      anchor: "llegada",     accent: "139,92,246"  },
  { icon: "solar:signpost-2-bold-duotone",          label: "Logística",    sublabel: "Genie+ y LL",    anchor: "logistica",   accent: "234,88,12"   },
  { icon: "solar:checklist-bold-duotone",           label: "Estrategia",   sublabel: "Plan de visita", anchor: "estrategia",  accent: "34,197,94"   },
  { icon: "solar:stars-minimalistic-bold-duotone",  label: "Imperdibles",  sublabel: "Atracciones clave", anchor: "imperdibles", accent: "56,189,248" },
];

interface ParkHubIslandProps { basePath: string; }

export default function ParkHubIsland({ basePath }: ParkHubIslandProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {HUB_ITEMS.map((item, i) => (
        <motion.div
          key={item.anchor}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07, duration: 0.45, type: "spring", stiffness: 200, damping: 20 }}
          whileHover={{ y: -4, transition: { duration: 0.2, ease: [0.16,1,0.3,1] } }}
          whileTap={{ scale: 0.97 }}
        >
          <Link
            href={`${basePath}/guide#${item.anchor}`}
            className="block relative overflow-hidden rounded-2xl group"
            style={{
              background: 'rgba(255,255,255,0.55)',
              backdropFilter: 'blur(24px) saturate(200%)',
              WebkitBackdropFilter: 'blur(24px) saturate(200%)',
              border: '1px solid rgba(255,255,255,0.7)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.9) inset, 0 -1px 0 rgba(0,0,0,0.04) inset',
              padding: '16px',
            }}
          >
            {/* Specular highlight top */}
            <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
              style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.95) 40%, rgba(255,255,255,0.6) 70%, transparent)' }} />

            {/* Color glow on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl"
              style={{ background: `radial-gradient(ellipse at 80% 10%, rgba(${item.accent},0.12) 0%, transparent 65%)` }} />

            {/* Border accent on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl pointer-events-none"
              style={{ boxShadow: `inset 0 0 0 1px rgba(${item.accent},0.35)` }} />

            <div className="relative z-10 flex flex-col gap-3">
              {/* Icon pill */}
              <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `rgba(${item.accent},0.12)`,
                  border: `1px solid rgba(${item.accent},0.2)`,
                }}>
                <span style={{ color: `rgba(${item.accent},1)`, display: 'inline-flex', filter: `drop-shadow(0 0 4px rgba(${item.accent},0.4))` }}>
                  <Icon icon={item.icon} width={17} />
                </span>
              </div>

              {/* Text — dark para fondo claro */}
              <div>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#25343F', lineHeight: 1.2, marginBottom: '3px' }}>
                  {item.label}
                </p>
                <p style={{ fontSize: '9.5px', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: `rgba(${item.accent},0.85)` }}>
                  {item.sublabel}
                </p>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
