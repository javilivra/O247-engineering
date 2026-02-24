"use client";

// ============================================================
// AttractionPageClient.tsx  v9.0 — "Editorial Dark"
//
// Diseño completamente nuevo. Inspirado en el template Stitch
// pero adaptado a la identidad O247.
//
// FILOSOFÍA:
// – Hero cinematográfico full viewport
// – Información en jerarquía estricta (decisión → comprensión → inmersión)
// – Tipografía editorial dominante
// – Escala de grises dominante con sunset/celeste como acentos quirúrgicos
// – Cero redundancia de datos
// – Sin navbar ni footer
//
// SECCIONES:
//   1. HERO         — imagen + título + HUD de decisión rápida
//   2. MISIÓN       — descripción completa + specs técnicos
//   3. PROTOCOLOS   — boardingSteps / cómo funciona
//   4. ESTRATEGIA   — cuándo ir + forecast visual + tip insider
//   5. INSIDER      — insiderFacts exclusivos O247
//   6. POV          — embed YouTube inmersivo
//   7. ACTIVIDADES  — dining/shopping/experiences relacionadas
// ============================================================

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddButton from "@/components/AddButton";
import type { Attraction, WaitForecastSlot } from "@/data/types";

type ExtendedAttraction = Attraction & {
  heroImage?: string;
  boardingSteps?: { step: number; title: string; description: string }[];
  strategyTips?: string[];
};

// ── UTILS ─────────────────────────────────────────────────────
function toTitleCase(s: string) {
  return s.toLowerCase().split(" ").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
}
function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const fn = () => setM(window.innerWidth < 768);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return m;
}

// ── DESIGN TOKENS ─────────────────────────────────────────────
const T = {
  bone:     "#f7f7f5",
  carbon:   "#0e0f11",
  surface:  "#16181c",
  panel:    "#1e2026",
  border:   "rgba(255,255,255,0.07)",
  borderMd: "rgba(255,255,255,0.12)",
  text:     "#f0f0ee",
  muted:    "rgba(240,240,238,0.42)",
  faint:    "rgba(240,240,238,0.18)",
  sunset:   "#FF7043",
  celeste:  "#00B4D8",
  green:    "#4ade80",
  amber:    "#fbbf24",
  grad:     "linear-gradient(90deg, #FF7043 0%, #00B4D8 100%)",
  gradDiag: "linear-gradient(135deg, #FF7043 0%, #00B4D8 100%)",
};

// ── TIPOGRAFÍA ────────────────────────────────────────────────
const F = {
  display: { fontFamily: "var(--font-primary)", fontWeight: 800, letterSpacing: "-0.04em" } as React.CSSProperties,
  title:   { fontFamily: "var(--font-primary)", fontWeight: 700, letterSpacing: "-0.025em" } as React.CSSProperties,
  body:    { fontFamily: "var(--font-primary)", fontWeight: 400 } as React.CSSProperties,
  tech:    { fontFamily: "var(--font-tech)", letterSpacing: "0.15em", textTransform: "uppercase" as const },
};

// ── ÍCONOS SVG INLINE ─────────────────────────────────────────
const Icons = {
  back:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>,
  clock:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>,
  ruler:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M21 6H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1z"/><path d="M7 6V4"/><path d="M11 6V3"/><path d="M15 6V4"/><path d="M19 6V3"/></svg>,
  signal:  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="14" width="3" height="6" rx="1"/><rect x="7" y="10" width="3" height="10" rx="1" opacity="0.7"/><rect x="12" y="6" width="3" height="14" rx="1" opacity="0.5"/><rect x="17" y="2" width="3" height="18" rx="1" opacity="0.3"/></svg>,
  bolt:    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13Z"/></svg>,
  play:    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.14v14l11-7-11-7z"/></svg>,
  star:    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  warn:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  youtube: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  food:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>,
  photo:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  game:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="2"/></svg>,
  bag:     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
};

// ── SECCIÓN WRAPPER ───────────────────────────────────────────
function Section({ children, id, style = {} }: { children: React.ReactNode; id?: string; style?: React.CSSProperties }) {
  return (
    <section id={id} style={{ padding: "80px 0", borderTop: `1px solid ${T.border}`, ...style }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
        {children}
      </div>
    </section>
  );
}

// ── SECTION LABEL ─────────────────────────────────────────────
function SectionLabel({ icon, label, accent = false }: { icon?: React.ReactNode; label: string; accent?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "40px" }}>
      {icon && <span style={{ color: accent ? T.sunset : T.celeste, opacity: 0.8 }}>{icon}</span>}
      <span style={{ ...F.tech, fontSize: "10px", color: T.muted }}>{label}</span>
      <div style={{ flex: 1, height: "1px", background: T.border, marginLeft: "8px" }}/>
    </div>
  );
}

// ── HUD STAT PILL ─────────────────────────────────────────────
function HudStat({ icon, label, value, unit, accent }: {
  icon: React.ReactNode; label: string; value: string; unit?: string; accent?: string;
}) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: "6px",
      padding: "16px 20px",
      background: "rgba(255,255,255,0.04)",
      border: `1px solid ${T.border}`,
      borderRadius: "14px",
      backdropFilter: "blur(20px)",
      flex: 1, minWidth: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "5px", color: T.muted }}>
        {icon}
        <span style={{ ...F.tech, fontSize: "8.5px", color: T.muted }}>{label}</span>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "3px" }}>
        <span style={{
          ...F.display, fontSize: "1.8rem", lineHeight: 1,
          color: accent || T.text,
          ...(accent ? { background: T.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" } : {}),
        }}>{value}</span>
        {unit && <span style={{ ...F.tech, fontSize: "9px", color: T.muted }}>{unit}</span>}
      </div>
    </div>
  );
}

// ── GAUGE CONFIABILIDAD ───────────────────────────────────────
function ReliabilityGauge({ score }: { score: number }) {
  const [anim, setAnim] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnim(true); }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const R = 52, CIRC = 2 * Math.PI * R;
  const offset = CIRC * (1 - (anim ? score / 100 : 0));
  const label = score >= 90 ? "Excelente" : score >= 75 ? "Buena" : score >= 55 ? "Regular" : "Baja";
  const dotC = score >= 90 ? T.green : score >= 75 ? T.celeste : score >= 55 ? T.amber : T.sunset;

  return (
    <div ref={ref} style={{ display: "flex", alignItems: "center", gap: "20px" }}>
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div style={{ position: "absolute", inset: "-10px", background: `radial-gradient(circle, ${dotC}18 0%, transparent 65%)`, filter: "blur(10px)" }}/>
        <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8"/>
          <circle cx="60" cy="60" r={R} fill="none" stroke="url(#rg)" strokeWidth="8" strokeLinecap="round"
            strokeDasharray={CIRC} strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1)" }}
          />
          <defs>
            <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={T.sunset}/>
              <stop offset="100%" stopColor={T.celeste}/>
            </linearGradient>
          </defs>
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", transform: "rotate(90deg)" }}>
          <span style={{ ...F.display, fontSize: "1.4rem", color: T.text, lineHeight: 1 }}>
            {score}<span style={{ fontSize: "0.7rem", opacity: 0.4 }}>%</span>
          </span>
        </div>
      </div>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "6px" }}>
          <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: dotC }}/>
          <span style={{ ...F.title, fontSize: "1.1rem", color: T.text }}>{label}</span>
        </div>
        <span style={{ ...F.tech, fontSize: "9px", color: T.muted, display: "block", marginBottom: "10px" }}>
          Historial 12 meses · O247 data
        </span>
        <div style={{ width: "140px", height: "3px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
          <div style={{ height: "100%", width: anim ? `${score}%` : "0%", background: T.grad, transition: "width 1.4s cubic-bezier(0.22,1,0.36,1)", borderRadius: "2px" }}/>
        </div>
      </div>
    </div>
  );
}

// ── FORECAST BAR ──────────────────────────────────────────────
function ForecastBar({ slots }: { slots: WaitForecastSlot[] }) {
  const max = Math.max(...slots.map(s => s.waitMin), 1);
  return (
    <div style={{ display: "flex", gap: "6px", alignItems: "flex-end", height: "80px" }}>
      {slots.map((s) => {
        const pct = (s.waitMin / max) * 100;
        const isLow = s.waitMin <= max * 0.35;
        return (
          <div key={s.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", height: "100%", justifyContent: "flex-end" }}>
            <span style={{ ...F.tech, fontSize: "7px", color: isLow ? T.green : T.muted }}>{s.waitMin}m</span>
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${pct}%` }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * slots.indexOf(s), duration: 0.6, ease: [0.22,1,0.36,1] }}
              style={{
                width: "100%",
                borderRadius: "4px 4px 2px 2px",
                background: isLow
                  ? `linear-gradient(to top, ${T.celeste}80, ${T.celeste}30)`
                  : `linear-gradient(to top, rgba(255,255,255,0.12), rgba(255,255,255,0.05))`,
                border: s.tag === "best" ? `1px solid ${T.celeste}60` : "1px solid rgba(255,255,255,0.06)",
                minHeight: "4px",
              }}
            />
            <span style={{ ...F.tech, fontSize: "7px", color: T.faint }}>{s.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ── ACCESS BADGE ──────────────────────────────────────────────
function AccessBadge({ access }: { access: string }) {
  const isLL = access.includes("LL");
  const isVQ = access.includes("Virtual");
  const bg = isLL ? T.gradDiag : isVQ ? `linear-gradient(135deg, ${T.celeste}, #0077A8)` : "rgba(255,255,255,0.08)";
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "7px",
      background: bg, borderRadius: "10px",
      padding: "10px 16px",
      boxShadow: isLL ? `0 4px 20px ${T.sunset}25` : "none",
    }}>
      <span style={{ color: "rgba(255,255,255,0.85)" }}>{Icons.bolt}</span>
      <span style={{ ...F.tech, fontSize: "10px", color: "white" }}>{access}</span>
    </div>
  );
}

// ── WARNING PILLS ─────────────────────────────────────────────
type Warnings = {
  heights?: boolean; drops?: boolean; flashingLights?: boolean;
  loudNoises?: boolean; water?: boolean; spinning?: boolean; notes?: string;
};
function WarningPills({ warnings }: { warnings: Warnings }) {
  const map = [
    { key: "heights", label: "Alturas", emoji: "🏔️" },
    { key: "drops", label: "Caídas", emoji: "⬇️" },
    { key: "flashingLights", label: "Luces", emoji: "⚡" },
    { key: "loudNoises", label: "Ruido", emoji: "🔊" },
    { key: "water", label: "Mojás", emoji: "💧" },
    { key: "spinning", label: "Giros", emoji: "🌀" },
  ] as const;
  const active = map.filter(m => (warnings as Record<string, unknown>)[m.key]);
  if (!active.length) return null;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
      {active.map(m => (
        <span key={m.key} style={{
          ...F.tech, fontSize: "9px",
          background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)",
          color: T.amber, borderRadius: "8px", padding: "5px 10px",
          display: "flex", alignItems: "center", gap: "5px",
        }}>
          <span>{m.emoji}</span>{m.label}
        </span>
      ))}
      {warnings.notes && (
        <p style={{ ...F.body, fontSize: "11px", color: T.muted, lineHeight: 1.6, width: "100%", marginTop: "6px", borderLeft: `2px solid ${T.amber}40`, paddingLeft: "10px" }}>
          {warnings.notes}
        </p>
      )}
    </div>
  );
}

// ── ACTIVITY CARD ─────────────────────────────────────────────
// El tipo extiende el mínimo ya existente en los datos con campos opcionales
// que se pueden ir agregando gradualmente a la data de cada atracción.
type Activity = {
  title: string;
  type: string;
  description: string;
  image?: string;   // URL de imagen opcional (thumbnail 310x310 o similar)
  url?: string;     // Link externo o interno opcional
};

const TYPE_LABELS: Record<string, string> = {
  dining:     "Gastronomía",
  photo:      "Foto",
  game:       "Actividad",
  shopping:   "Tienda",
  experience: "Experiencia",
  character:  "Personaje",
};

function ActivityCard({ activity }: { activity: Activity }) {
  const iconMap: Record<string, React.ReactNode> = {
    dining: Icons.food, photo: Icons.photo, game: Icons.game,
    shopping: Icons.bag, experience: Icons.star, character: Icons.star,
  };
  const icon = iconMap[activity.type] || Icons.star;
  const typeLabel = TYPE_LABELS[activity.type] || activity.type;

  return (
    <div style={{
      borderRadius: "16px",
      overflow: "hidden",
      background: "rgba(255,255,255,0.03)",
      border: `1px solid ${T.border}`,
      transition: "border-color 0.2s, transform 0.2s",
      cursor: activity.url ? "pointer" : "default",
      display: "flex",
      flexDirection: "column",
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = T.borderMd;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = T.border;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Imagen — si existe muestra foto, si no muestra fondo degradado con ícono */}
      <div style={{
        width: "100%", aspectRatio: "16/9",
        position: "relative", overflow: "hidden", flexShrink: 0,
        background: activity.image
          ? "transparent"
          : `linear-gradient(135deg, rgba(255,112,67,0.12) 0%, rgba(0,180,216,0.12) 100%)`,
      }}>
        {activity.image ? (
          <img
            src={activity.image} alt={activity.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: T.celeste, opacity: 0.3, transform: "scale(2)" }}>{icon}</span>
          </div>
        )}
        {/* Overlay gradient inferior */}
        {activity.image && (
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(14,15,17,0.7) 100%)" }}/>
        )}
        {/* Type badge superpuesto */}
        <div style={{
          position: "absolute", top: "10px", left: "10px",
          display: "flex", alignItems: "center", gap: "5px",
          background: "rgba(14,15,17,0.65)", backdropFilter: "blur(10px)",
          border: `1px solid ${T.border}`, borderRadius: "100px",
          padding: "4px 10px",
        }}>
          <span style={{ color: T.celeste, display: "flex" }}>{icon}</span>
          <span style={{ ...F.tech, fontSize: "8px", color: T.celeste }}>{typeLabel}</span>
        </div>
      </div>

      {/* Texto */}
      <div style={{ padding: "14px 16px 16px", flex: 1 }}>
        <p style={{ ...F.title, fontSize: "0.88rem", color: T.text, marginBottom: "6px", lineHeight: 1.35 }}>
          {activity.title}
        </p>
        <p style={{ ...F.body, fontSize: "11.5px", color: T.muted, lineHeight: 1.6 }}>
          {activity.description}
        </p>
      </div>
    </div>
  );
}

// ── DEFAULT BOARDING STEPS ────────────────────────────────────
function getDefaultSteps(access: string, accessExplained: string) {
  const isLL = access.includes("LL");
  const isVQ = access.includes("Virtual");
  if (isVQ) return [
    { step: 1, title: "Unirte a la Fila Virtual", description: "Abre la app My Disney Experience y uníte al Boarding Group disponible. Solo disponible en momentos específicos del día." },
    { step: 2, title: "Esperar tu llamado", description: "Recibirás una notificación cuando tu grupo sea llamado. Tenés 2 horas para presentarte." },
    { step: 3, title: "Presentarte y embarcar", description: "Llega a la entrada de la atracción con tu grupo activo. El Cast Member escaneará tu MagicBand o app." },
  ];
  if (isLL) return [
    { step: 1, title: "Reservar Lightning Lane", description: "Desde la app My Disney Experience, reservá tu acceso LL. Los LL Multi Pass permiten una reserva activa a la vez." },
    { step: 2, title: "Llegar en tu ventana horaria", description: "Presentate dentro del rango de 1 hora asignado. Podés escanear tu MagicBand o mostrar el QR en la app." },
    { step: 3, title: "Ingresar por el carril rápido", description: "El carril LL tiene una fila notablemente más corta. Seguí las instrucciones del Cast Member." },
  ];
  return [
    { step: 1, title: "Unirte a la fila Standby", description: "Esta atracción opera solo con fila tradicional. Consultá el tiempo de espera en la app o en los carteles de la entrada." },
    { step: 2, title: "Avanzar en la cola", description: accessExplained.slice(0, 120) + "…" },
    { step: 3, title: "Embarcar", description: "Seguí las instrucciones del Cast Member. Dejá tus objetos en los lockers si la atracción los requiere." },
  ];
}

// ══════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ══════════════════════════════════════════════════════════════
export default function AttractionPageClient({ attraction }: { attraction: Attraction }) {
  const a = attraction as ExtendedAttraction;
  const isMobile = useIsMobile();
  const [povPlaying, setPovPlaying] = useState(false);
  const [povHovered, setPovHovered] = useState(false);

  const heroImage = a.heroImage || a.image;
  const name = toTitleCase(a.name);
  const tierColor = a.tier === "Tier 1" ? T.sunset : a.tier === "Tier 2" ? T.celeste : "rgba(255,255,255,0.4)";
  const waitVal = a.status === "closed" ? "Cerrada" : (a.waitTime || "N/A");
  const steps = a.boardingSteps || getDefaultSteps(a.access, a.accessExplained);
  const forecast: WaitForecastSlot[] = (a.forecastToday as unknown as WaitForecastSlot[]) ?? [];

  return (
    <div style={{ background: T.carbon, color: T.text, fontFamily: "var(--font-primary)", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ══════════════════════════════════════
          1. HERO — FULL VIEWPORT
          ══════════════════════════════════════ */}
      <section style={{ position: "relative", height: "100vh", minHeight: "640px", maxHeight: "900px", overflow: "hidden" }}>

        {/* Imagen */}
        <img src={heroImage} alt={name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.75 }}/>

        {/* Gradiente multicapa */}
        <div style={{
          position: "absolute", inset: 0,
          background: `
            linear-gradient(to right, rgba(14,15,17,0.85) 0%, rgba(14,15,17,0.2) 55%, rgba(14,15,17,0) 100%),
            linear-gradient(to top, rgba(14,15,17,1) 0%, rgba(14,15,17,0.6) 25%, transparent 55%)
          `,
        }}/>

        {/* Grid decorativo */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: `linear-gradient(to right, ${T.celeste} 1px, transparent 1px), linear-gradient(to bottom, ${T.celeste} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
        }}/>

        {/* Back button */}
        <button
          onClick={() => history.back()}
          style={{
            position: "absolute", top: "28px", left: "32px", zIndex: 20,
            display: "flex", alignItems: "center", gap: "8px",
            background: "rgba(14,15,17,0.5)", backdropFilter: "blur(16px)",
            border: `1px solid ${T.border}`, borderRadius: "100px",
            padding: "8px 14px 8px 10px", cursor: "pointer", color: T.muted,
            ...F.tech, fontSize: "9px",
          }}
        >
          {Icons.back} <span>Volver</span>
        </button>

        {/* Contenido hero */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: isMobile ? "0 24px 32px" : "0 60px 52px",
          maxWidth: "1320px", margin: "0 auto",
        }}>
          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}
          >
            <span style={{
              ...F.tech, fontSize: "9px",
              background: `${tierColor}20`, border: `1px solid ${tierColor}35`,
              color: tierColor, borderRadius: "100px", padding: "5px 12px",
              display: "flex", alignItems: "center", gap: "5px",
            }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: tierColor, display: "inline-block" }}/>
              {a.tier}
            </span>
            <span style={{
              ...F.tech, fontSize: "9px",
              background: "rgba(255,255,255,0.08)", border: `1px solid ${T.border}`,
              color: T.muted, borderRadius: "100px", padding: "5px 12px",
            }}>
              {a.land}
            </span>
            {a.vibes.slice(0, 2).map(v => (
              <span key={v} style={{
                ...F.tech, fontSize: "9px",
                background: "rgba(255,255,255,0.06)", border: `1px solid ${T.border}`,
                color: T.faint, borderRadius: "100px", padding: "5px 12px",
              }}>{v}</span>
            ))}
          </motion.div>

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            style={{
              ...F.display,
              fontSize: isMobile ? "clamp(2.8rem, 10vw, 4rem)" : "clamp(3.5rem, 7vw, 6.5rem)",
              lineHeight: 0.9, color: T.text, marginBottom: "20px",
              maxWidth: "700px",
            }}
          >
            {name}
          </motion.h1>

          {/* HUD de decisión rápida — solo las 4 más críticas */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            style={{
              display: "flex", gap: "8px", flexWrap: "wrap",
              marginBottom: "28px",
              maxWidth: "680px",
            }}
          >
            <HudStat icon={Icons.clock} label="Espera" value={waitVal} unit={waitVal !== "Cerrada" && waitVal !== "N/A" ? "" : undefined}/>
            <HudStat icon={Icons.bolt} label="Acceso" value={a.access.replace("LL ", "").replace(" Pass", "")} accent={a.access.includes("LL") ? T.sunset : undefined}/>
            <HudStat icon={Icons.clock} label="Duración" value={a.duration > 0 ? String(a.duration) : "—"} unit={a.duration > 0 ? "min" : undefined}/>
            <HudStat icon={Icons.ruler} label={a.heightReq > 0 ? "Alt. mín." : "Altura"} value={a.heightReq > 0 ? String(a.heightReq) : "Libre"} unit={a.heightReq > 0 ? "cm" : undefined}/>
          </motion.div>

          {/* AddButton + mapa miniatura en la misma fila */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ display: "flex", alignItems: "flex-end", gap: "16px", flexWrap: isMobile ? "wrap" : "nowrap" }}
          >
            <AddButton itemId={`${a.park}-${a.slug}`} label="Agregar al Plan"/>

            {/* Mapa miniatura — muestra la imagen jpeg del mapa oficial de Disney */}
            <div style={{
              width: isMobile ? "100%" : "260px",
              height: "120px",
              borderRadius: "14px",
              overflow: "hidden",
              border: `1px solid ${T.border}`,
              background: T.surface,
              position: "relative",
              flexShrink: 0,
            }}>
              {/* Imagen del mapa — cada atracción puede tener su mapImage en la data */}
              {(a as ExtendedAttraction & { mapImage?: string }).mapImage ? (
                <img
                  src={(a as ExtendedAttraction & { mapImage?: string }).mapImage}
                  alt={`Mapa ${name}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                /* Placeholder mientras no haya imagen de mapa */
                <div style={{
                  width: "100%", height: "100%",
                  background: `linear-gradient(135deg, ${T.surface} 0%, ${T.panel} 100%)`,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: "6px",
                }}>
                  {/* Ícono mapa */}
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: T.muted, opacity: 0.5 }}>
                    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
                    <line x1="8" y1="2" x2="8" y2="18"/>
                    <line x1="16" y1="6" x2="16" y2="22"/>
                  </svg>
                  <span style={{ ...F.tech, fontSize: "8px", color: T.faint }}>Mapa del área</span>
                </div>
              )}
              {/* Overlay con land label */}
              <div style={{
                position: "absolute", bottom: "8px", left: "8px",
                background: "rgba(14,15,17,0.7)", backdropFilter: "blur(8px)",
                border: `1px solid ${T.border}`, borderRadius: "100px",
                padding: "3px 9px",
              }}>
                <span style={{ ...F.tech, fontSize: "8px", color: T.muted }}>{a.land}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. MISIÓN + SPECS
          ══════════════════════════════════════ */}
      <Section id="mision">
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 380px", gap: "48px" }}>

          {/* Col izq — descripción + warnings */}
          <div>
            <SectionLabel icon={Icons.star} label="La experiencia"/>
            <p style={{
              ...F.body,
              fontSize: isMobile ? "1.1rem" : "1.25rem",
              lineHeight: 1.75, color: "rgba(240,240,238,0.75)",
              marginBottom: "32px",
            }}>
              {a.description}
            </p>

            {/* Access + reliability en línea */}
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center", marginBottom: "28px" }}>
              <AccessBadge access={a.access}/>
              <ReliabilityGauge score={a.reliabilityScore}/>
            </div>

            {/* Warnings */}
            {a.warnings && Object.values(a.warnings).some(v => v === true) && (
              <div style={{
                padding: "16px 20px",
                background: "rgba(251,191,36,0.05)",
                border: `1px solid rgba(251,191,36,0.15)`,
                borderRadius: "14px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
                  <span style={{ color: T.amber }}>{Icons.warn}</span>
                  <span style={{ ...F.tech, fontSize: "9px", color: T.amber }}>Advertencias</span>
                </div>
                <WarningPills warnings={a.warnings as Warnings}/>
              </div>
            )}
          </div>

          {/* Col der — specs tabla */}
          <div>
            <SectionLabel label="Especificaciones"/>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {[
                { label: "Sistema", value: a.rideSystem || "—" },
                { label: "Inauguración", value: a.yearOpened ? String(a.yearOpened) : "—" },
                { label: "Capacidad", value: a.capacity ? `${a.capacity} personas/bote` : "—" },
                { label: "Altura mínima", value: a.heightReq > 0 ? `${a.heightReq} cm` : "Sin restricción" },
                { label: "Aire acondicionado", value: a.hasAc ? "✓ Sí" : "✗ No" },
                { label: "Interior", value: a.isIndoor ? "✓ Cubierta" : "✗ Exterior" },
              ].map((r, i) => (
                <div key={r.label} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "14px 0",
                  borderBottom: `1px solid ${T.border}`,
                  borderTop: i === 0 ? `1px solid ${T.border}` : "none",
                }}>
                  <span style={{ ...F.tech, fontSize: "9px", color: T.muted }}>{r.label}</span>
                  <span style={{ ...F.title, fontSize: "0.85rem", color: T.text, textAlign: "right", maxWidth: "60%" }}>{r.value}</span>
                </div>
              ))}
            </div>

            {/* Accessexplained */}
            <div style={{ marginTop: "20px", padding: "16px", background: "rgba(0,180,216,0.06)", border: `1px solid rgba(0,180,216,0.15)`, borderRadius: "12px" }}>
              <span style={{ ...F.tech, fontSize: "8.5px", color: T.celeste, display: "block", marginBottom: "6px" }}>Cómo acceder</span>
              <p style={{ ...F.body, fontSize: "12px", color: T.muted, lineHeight: 1.65 }}>{a.accessExplained}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════
          3. POV — VIDEO INMERSIVO
          ══════════════════════════════════════ */}
      {a.pov?.videoId && (
        <Section id="pov" style={{ background: T.surface }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <SectionLabel icon={Icons.youtube} label="Punto de Vista — POV"/>
              <h2 style={{ ...F.display, fontSize: "1.8rem", color: T.text }}>Viví la experiencia antes de ir</h2>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {[{ label: "60 FPS" }, { label: "4K" }].map(b => (
                <span key={b.label} style={{
                  ...F.tech, fontSize: "8.5px", color: T.muted,
                  border: `1px solid ${T.border}`, borderRadius: "8px",
                  padding: "5px 10px", background: "rgba(255,255,255,0.03)",
                }}>{b.label}</span>
              ))}
            </div>
          </div>

          <div
            style={{
              position: "relative", width: "100%", paddingTop: "56.25%",
              borderRadius: "20px", overflow: "hidden", cursor: "pointer",
              boxShadow: `0 32px 80px rgba(0,0,0,0.5)`,
              border: `1px solid ${T.border}`,
            }}
            onClick={() => setPovPlaying(true)}
            onMouseEnter={() => setPovHovered(true)}
            onMouseLeave={() => setPovHovered(false)}
          >
            {povPlaying ? (
              <iframe
                src={`https://www.youtube.com/embed/${a.pov.videoId}?autoplay=1&rel=0&modestbranding=1`}
                title={name}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <img src={heroImage} alt={name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: povHovered ? "scale(1.03)" : "scale(1)", transition: "transform 0.6s ease" }}/>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.5))" }}/>
                {[
                  { top: "16px", left: "16px", borderStyle: "2px 0 0 2px" },
                  { top: "16px", right: "16px", borderStyle: "2px 2px 0 0" },
                  { bottom: "16px", left: "16px", borderStyle: "0 0 2px 2px" },
                  { bottom: "16px", right: "16px", borderStyle: "0 2px 2px 0" },
                ].map((c, i) => (
                  <div key={i} style={{
                    position: "absolute", width: "20px", height: "20px",
                    borderColor: T.celeste, borderStyle: "solid",
                    borderWidth: c.borderStyle, opacity: 0.5,
                    top: (c as { top?: string }).top, left: (c as { left?: string }).left,
                    right: (c as { right?: string }).right, bottom: (c as { bottom?: string }).bottom,
                  }}/>
                ))}
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <motion.div
                    animate={{ scale: povHovered ? 1.08 : 1 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      width: "72px", height: "72px", borderRadius: "50%",
                      background: "rgba(255,255,255,0.15)", backdropFilter: "blur(20px)",
                      border: `1.5px solid rgba(255,255,255,0.3)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: `0 0 0 ${povHovered ? "24px" : "0px"} rgba(0,180,216,0.08)`,
                      transition: "box-shadow 0.3s ease",
                    }}
                  >{Icons.play}</motion.div>
                </div>
                <div style={{
                  position: "absolute", bottom: "16px", right: "16px",
                  display: "flex", alignItems: "center", gap: "6px",
                  background: "rgba(14,15,17,0.7)", backdropFilter: "blur(12px)",
                  border: `1px solid ${T.border}`, borderRadius: "100px", padding: "6px 12px",
                }}>
                  <span style={{ color: "rgba(255,255,255,0.7)" }}>{Icons.youtube}</span>
                  <span style={{ ...F.tech, fontSize: "8.5px", color: "rgba(255,255,255,0.6)" }}>Ver en YouTube</span>
                </div>
                {a.pov.channelName && (
                  <div style={{ position: "absolute", bottom: "16px", left: "16px" }}>
                    <span style={{ ...F.tech, fontSize: "8px", color: "rgba(255,255,255,0.35)" }}>vía {a.pov.channelName}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </Section>
      )}

      {/* ══════════════════════════════════════
          4. PROTOCOLOS — boarding steps
          ══════════════════════════════════════ */}
      <Section id="protocolos">
        <SectionLabel label="Cómo funciona"/>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "16px" }}>
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                padding: "28px", background: T.panel,
                border: `1px solid ${T.border}`, borderRadius: "20px",
                position: "relative", overflow: "hidden",
              }}
            >
              <span style={{
                position: "absolute", top: "-10px", right: "20px",
                ...F.display, fontSize: "6rem", lineHeight: 1,
                color: "rgba(255,255,255,0.03)",
              }}>
                {String(s.step).padStart(2, "0")}
              </span>
              <div style={{ width: "28px", height: "2px", background: i === 0 ? T.sunset : i === 1 ? T.celeste : T.grad, borderRadius: "1px", marginBottom: "20px" }}/>
              <h3 style={{ ...F.title, fontSize: "1rem", color: T.text, marginBottom: "10px" }}>{s.title}</h3>
              <p style={{ ...F.body, fontSize: "12.5px", color: T.muted, lineHeight: 1.7 }}>{s.description}</p>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                background: i === 0 ? T.sunset : i === 1 ? T.grad : T.celeste, opacity: 0.6,
              }}/>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ══════════════════════════════════════
          4. ESTRATEGIA — cuándo ir + forecast + tip
          ══════════════════════════════════════ */}
      <Section id="estrategia">
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "48px" }}>

          {/* Forecast visual */}
          <div>
            <SectionLabel icon={Icons.clock} label="Mejor momento para ir" accent/>
            <p style={{ ...F.title, fontSize: "1.4rem", color: T.text, marginBottom: "8px", lineHeight: 1.3 }}>
              {a.bestTime}
            </p>
            <p style={{ ...F.body, fontSize: "12px", color: T.muted, marginBottom: "28px", lineHeight: 1.65 }}>
              Esperá significativamente menos en las franjas de menor demanda. Los datos son estimaciones basadas en historiales.
            </p>
            {forecast.length > 0 && (
              <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "16px", padding: "20px" }}>
                <span style={{ ...F.tech, fontSize: "9px", color: T.muted, display: "block", marginBottom: "16px" }}>
                  Forecast de espera — hoy
                </span>
                <ForecastBar slots={forecast}/>
              </div>
            )}
          </div>

          {/* Tip insider + insiderFacts */}
          <div>
            <SectionLabel label="Inteligencia O247"/>

            {/* Secret tip destacado */}
            <div style={{
              padding: "24px",
              background: `linear-gradient(135deg, rgba(255,112,67,0.08) 0%, rgba(0,180,216,0.08) 100%)`,
              border: `1px solid rgba(255,112,67,0.2)`,
              borderRadius: "16px",
              marginBottom: "16px",
              position: "relative",
            }}>
              <span style={{
                position: "absolute", top: "16px", left: "20px",
                ...F.tech, fontSize: "8.5px", color: T.sunset,
              }}>
                Solo en O247
              </span>
              <div style={{ width: "32px", height: "2px", background: T.grad, borderRadius: "1px", margin: "28px 0 14px" }}/>
              <p style={{
                ...F.body, fontSize: "1rem", fontStyle: "italic",
                color: "rgba(240,240,238,0.75)", lineHeight: 1.7,
              }}>
                "{a.secretTip}"
              </p>
            </div>

            {/* Insider facts */}
            {a.insiderFacts && a.insiderFacts.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {a.insiderFacts.slice(0, 3).map((fact: string, i: number) => (
                  <div key={i} style={{
                    display: "flex", gap: "12px", alignItems: "flex-start",
                    padding: "12px 14px",
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${T.border}`,
                    borderRadius: "10px",
                  }}>
                    <span style={{ ...F.tech, fontSize: "8px", color: T.celeste, opacity: 0.6, marginTop: "2px", flexShrink: 0 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p style={{ ...F.body, fontSize: "12px", color: T.muted, lineHeight: 1.65 }}>{fact}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════
          6. ACTIVIDADES RELACIONADAS
          ══════════════════════════════════════ */}
      {a.relatedActivities && a.relatedActivities.length > 0 && (
        <Section id="actividades" style={{ background: T.surface }}>
          {/* Header con título + contador */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                <span style={{ color: T.celeste, opacity: 0.8 }}>{Icons.star}</span>
                <span style={{ ...F.tech, fontSize: "10px", color: T.muted }}>También cerca</span>
                <div style={{ flex: 1, height: "1px", background: T.border, marginLeft: "8px", width: "60px" }}/>
              </div>
              <h2 style={{ ...F.display, fontSize: "1.6rem", color: T.text, lineHeight: 1 }}>
                Experiencias relacionadas
              </h2>
            </div>
            <span style={{
              ...F.tech, fontSize: "9px",
              color: T.muted,
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${T.border}`,
              borderRadius: "100px",
              padding: "5px 12px",
            }}>
              {a.relatedActivities.length} {a.relatedActivities.length === 1 ? "actividad" : "actividades"}
            </span>
          </div>

          {/* Grid adaptable:
              - 1 actividad:  1 columna ancha centrada (max 480px)
              - 2 actividades: 2 columnas
              - 3+:           3 columnas en desktop, 2 en tablet, 1 en mobile
              Las cards tienen imagen cuando el campo image está presente en la data.
          */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : a.relatedActivities.length === 1
                ? "minmax(0, 480px)"
                : a.relatedActivities.length === 2
                  ? "repeat(2, 1fr)"
                  : "repeat(3, 1fr)",
            gap: "14px",
            justifyContent: a.relatedActivities.length === 1 ? "start" : "stretch",
          }}>
            {a.relatedActivities.map((act: Activity, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <ActivityCard activity={act}/>
              </motion.div>
            ))}
          </div>

          {/* Nota editorial al pie */}
          <p style={{ ...F.body, fontSize: "11px", color: T.faint, marginTop: "24px", lineHeight: 1.6 }}>
            Las actividades relacionadas son seleccionadas editorialmente por el equipo O247 en base a proximidad y sinergia temática.
          </p>
        </Section>
      )}

      {/* ══════════════════════════════════════
          FOOTER MÍNIMO — solo branding
          ══════════════════════════════════════ */}
      <div style={{
        borderTop: `1px solid ${T.border}`,
        padding: "24px 60px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ ...F.display, fontSize: "1rem", background: T.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          O247
        </span>
        <span style={{ ...F.tech, fontSize: "8px", color: T.faint }}>
          {name} · {a.land} · Magic Kingdom
        </span>
      </div>

    </div>
  );
}