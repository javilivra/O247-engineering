"use client";

// ============================================================
// AttractionBentoGrid.tsx
// 5 BentoCards para la página de atracción
// Estética: fondo negro/gunmetal oscuro, acentos sunset→celeste
// Cards:
//   1. Confiabilidad   — gauge circular animado CSS
//   2. Sistema acceso  — visual pase LL con gradiente
//   3. Duración        — timer con anillo animado
//   4. Altura mínima   — regla de medición visual
//   5. Reseñas         — carousel en loop automático
// ============================================================

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Attraction } from "@/data/types";

// ── COLORES BASE ──────────────────────────────────────────────
const C = {
  bg:      "#0f0f11",       // fondo de las cards
  surface: "#1a1a1e",       // superficie interna
  border:  "rgba(255,255,255,0.06)",
  text:    "rgba(255,255,255,0.9)",
  muted:   "rgba(255,255,255,0.38)",
  sunset:  "#FF7043",
  celeste: "#00B4D8",
};

// Gradiente O247 sunset → celeste
const GRAD = `linear-gradient(90deg, ${C.sunset} 0%, ${C.celeste} 100%)`;
const GRAD_DIAG = `linear-gradient(135deg, ${C.sunset} 0%, ${C.celeste} 100%)`;

// ── TIPOGRAFÍA helpers ────────────────────────────────────────
const FONT_DISPLAY: React.CSSProperties = {
  fontFamily: "var(--font-primary)",
  fontWeight: 700,
  letterSpacing: "-0.03em",
};
const FONT_TECH: React.CSSProperties = {
  fontFamily: "var(--font-tech)",
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
};

// ── TIPOS ─────────────────────────────────────────────────────
type ExtendedAttraction = Attraction & {
  reviews?: { id: string; text: string; author?: string; rating?: number }[];
  communityScore?: number;
  insiderFacts?: string[];
};

// ── CARD WRAPPER ──────────────────────────────────────────────
function BentoCard({
  children,
  className = "",
  style = {},
  cols = 1,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  cols?: 1 | 2;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={{
        background: C.bg,
        borderRadius: "24px",
        border: `1px solid ${C.border}`,
        overflow: "hidden",
        position: "relative",
        gridColumn: cols === 2 ? "span 2" : "span 1",
        boxShadow: "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
        ...style,
      }}
    >
      {/* Noise texture overlay para profundidad */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
        }}
      />
      <div style={{ position: "relative", zIndex: 1, height: "100%" }}>
        {children}
      </div>
    </motion.div>
  );
}

// ── CARD 1: CONFIABILIDAD ─────────────────────────────────────
function CardConfiabilidad({ score }: { score: number }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // SVG gauge — círculo con stroke animado
  const R = 68;
  const CIRCUMFERENCE = 2 * Math.PI * R;
  const progress = animated ? (score / 100) : 0;
  const offset = CIRCUMFERENCE * (1 - progress);

  const color = score >= 90 ? C.celeste : score >= 70 ? "#a8e6cf" : C.sunset;
  const label = score >= 90 ? "Excelente" : score >= 70 ? "Buena" : score >= 40 ? "Regular" : "Baja";

  return (
    <BentoCard>
      <div ref={ref} style={{ padding: "28px", height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Label */}
        <p style={{ ...FONT_TECH, fontSize: "10px", color: C.muted, marginBottom: "20px" }}>
          Confiabilidad
        </p>

        {/* Visual gauge */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          {/* Glow detrás del gauge */}
          <div style={{
            position: "absolute",
            width: "120px", height: "120px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
            filter: "blur(20px)",
          }} />

          <svg width="160" height="160" viewBox="0 0 160 160" style={{ transform: "rotate(-90deg)" }}>
            {/* Track */}
            <circle
              cx="80" cy="80" r={R}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Progress */}
            <circle
              cx="80" cy="80" r={R}
              fill="none"
              stroke="url(#gaugeGrad)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1)" }}
            />
            <defs>
              <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={C.sunset} />
                <stop offset="100%" stopColor={C.celeste} />
              </linearGradient>
            </defs>
          </svg>

          {/* Número central */}
          <div style={{ position: "absolute", textAlign: "center" }}>
            <p style={{ ...FONT_DISPLAY, fontSize: "2.2rem", color: C.text, lineHeight: 1 }}>
              {score}<span style={{ fontSize: "1rem", opacity: 0.5 }}>%</span>
            </p>
            <p style={{ ...FONT_TECH, fontSize: "9px", color: color, marginTop: "4px" }}>
              {label}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: `1px solid ${C.border}` }}>
          <p style={{ fontSize: "11px", fontFamily: "var(--font-primary)", color: C.muted, lineHeight: 1.5 }}>
            Basado en historial de cierres no programados de los últimos 12 meses.
          </p>
        </div>
      </div>
    </BentoCard>
  );
}

// ── CARD 2: SISTEMA DE ACCESO ─────────────────────────────────
function CardAcceso({ access, accessExplained }: { access: string; accessExplained: string }) {
  const isLL = access.includes("LL");
  const isMulti = access.includes("Multi");
  const isSingle = access.includes("Single");
  const isVQ = access.includes("Virtual");

  const accentColor = isLL ? C.sunset : isVQ ? C.celeste : "rgba(255,255,255,0.4)";

  return (
    <BentoCard>
      <div style={{ padding: "28px", height: "100%", display: "flex", flexDirection: "column" }}>
        <p style={{ ...FONT_TECH, fontSize: "10px", color: C.muted, marginBottom: "20px" }}>
          Sistema de Acceso
        </p>

        {/* Visual del pase */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "100%" }}>

            {/* Tarjeta visual tipo pase */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: "100%",
                maxWidth: "220px",
                margin: "0 auto",
                height: "120px",
                borderRadius: "16px",
                background: isLL
                  ? GRAD_DIAG
                  : isVQ
                    ? `linear-gradient(135deg, #00B4D8 0%, #0077A8 100%)`
                    : "rgba(255,255,255,0.08)",
                padding: "1px",
                boxShadow: isLL
                  ? `0 20px 60px ${C.sunset}40, 0 4px 20px rgba(0,0,0,0.5)`
                  : `0 20px 40px rgba(0,0,0,0.4)`,
                display: "block",
              }}
            >
              <div style={{
                width: "100%", height: "100%",
                borderRadius: "15px",
                background: isLL
                  ? `linear-gradient(135deg, rgba(255,112,67,0.85) 0%, rgba(0,180,216,0.85) 100%)`
                  : "rgba(30,30,34,0.9)",
                backdropFilter: "blur(12px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "16px 18px",
              }}>
                {/* Header del pase */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{
                    fontSize: "9px",
                    fontFamily: "var(--font-tech)",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: isLL ? "rgba(255,255,255,0.9)" : C.muted,
                  }}>
                    {isMulti ? "Lightning Lane" : isSingle ? "Lightning Lane" : isVQ ? "Virtual Queue" : "Standby"}
                  </span>
                  {/* Logo LL */}
                  {isLL && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white" opacity="0.8">
                      <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
                    </svg>
                  )}
                </div>

                {/* Tipo */}
                <div>
                  <p style={{
                    fontSize: "1.1rem",
                    fontFamily: "var(--font-primary)",
                    fontWeight: 800,
                    color: "white",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}>
                    {isMulti ? "Multi Pass" : isSingle ? "Single Pass" : isVQ ? "Boarding Group" : "Standby Only"}
                  </p>
                  {/* Puntos decorativos tipo tarjeta */}
                  <div style={{ display: "flex", gap: "4px", marginTop: "8px" }}>
                    {[...Array(4)].map((_, i) => (
                      <div key={i} style={{
                        width: "24px", height: "4px",
                        borderRadius: "2px",
                        background: i === 0 ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)",
                      }} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Glow detrás */}
            <div style={{
              position: "absolute",
              bottom: "-10px", left: "50%",
              transform: "translateX(-50%)",
              width: "80%", height: "40px",
              background: isLL ? `${C.sunset}30` : "rgba(255,255,255,0.04)",
              filter: "blur(20px)",
              borderRadius: "50%",
            }} />
          </div>
        </div>

        {/* Explicación */}
        <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: `1px solid ${C.border}` }}>
          <p style={{ fontSize: "11px", fontFamily: "var(--font-primary)", color: C.muted, lineHeight: 1.55 }}>
            {accessExplained.slice(0, 90)}{accessExplained.length > 90 ? "…" : ""}
          </p>
        </div>
      </div>
    </BentoCard>
  );
}

// ── CARD 3: DURACIÓN ──────────────────────────────────────────
function CardDuracion({ duration }: { duration: number }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // Simular progreso del reloj basado en duración
  const secondsInCycle = duration * 60;
  const currentSecond = tick % secondsInCycle;
  const progress = currentSecond / secondsInCycle;

  const R = 52;
  const CIRC = 2 * Math.PI * R;
  const offset = CIRC * (1 - progress);

  // Minutos y segundos del reloj
  const displayMin = Math.floor(currentSecond / 60);
  const displaySec = currentSecond % 60;

  return (
    <BentoCard>
      <div style={{ padding: "28px", height: "100%", display: "flex", flexDirection: "column" }}>
        <p style={{ ...FONT_TECH, fontSize: "10px", color: C.muted, marginBottom: "20px" }}>
          Duración de la Experiencia
        </p>

        {/* Reloj SVG */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "relative" }}>
            {/* Glow */}
            <div style={{
              position: "absolute", inset: "-20px",
              background: `radial-gradient(circle, ${C.celeste}18 0%, transparent 70%)`,
              filter: "blur(16px)",
            }} />

            <svg width="130" height="130" viewBox="0 0 130 130" style={{ transform: "rotate(-90deg)" }}>
              {/* Ticks del reloj */}
              {[...Array(12)].map((_, i) => {
                const angle = (i / 12) * 360;
                const rad = (angle * Math.PI) / 180;
                const x1 = 65 + 58 * Math.cos(rad);
                const y1 = 65 + 58 * Math.sin(rad);
                const x2 = 65 + 52 * Math.cos(rad);
                const y2 = 65 + 52 * Math.sin(rad);
                return (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeLinecap="round" />
                );
              })}
              {/* Track */}
              <circle cx="65" cy="65" r={R} fill="none"
                stroke="rgba(255,255,255,0.05)" strokeWidth="7" />
              {/* Progress */}
              <circle cx="65" cy="65" r={R} fill="none"
                stroke="url(#timerGrad)" strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={CIRC}
                strokeDashoffset={offset}
                style={{ transition: "stroke-dashoffset 0.8s linear" }}
              />
              <defs>
                <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={C.sunset} />
                  <stop offset="100%" stopColor={C.celeste} />
                </linearGradient>
              </defs>
            </svg>

            {/* Tiempo central */}
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              transform: "rotate(90deg)",
            }}>
              <p style={{ ...FONT_TECH, fontSize: "9px", color: C.muted, marginBottom: "2px" }}>
                duración total
              </p>
              <p style={{ ...FONT_DISPLAY, fontSize: "1.6rem", color: C.text, lineHeight: 1 }}>
                {duration}<span style={{ fontSize: "0.9rem", opacity: 0.5 }}> min</span>
              </p>
            </div>
          </div>
        </div>

        {/* Barra de progreso linear debajo */}
        <div style={{ marginTop: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <span style={{ ...FONT_TECH, fontSize: "9px", color: C.muted }}>inicio</span>
            <span style={{ ...FONT_TECH, fontSize: "9px", color: C.muted }}>fin</span>
          </div>
          <div style={{ height: "3px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${progress * 100}%`,
              background: GRAD,
              borderRadius: "2px",
              transition: "width 0.8s linear",
            }} />
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

// ── CARD 4: ALTURA MÍNIMA ─────────────────────────────────────
function CardAltura({ heightReq }: { heightReq: number }) {
  const noReq = heightReq === 0;

  // Alturas de referencia para contextualizar
  const referencias = [
    { label: "Niño 4 años", cm: 102, emoji: "🧒" },
    { label: "Niño 7 años", cm: 122, emoji: "👦" },
    { label: "Adulto promedio", cm: 170, emoji: "🧑" },
  ];

  const maxHeight = 185;
  const barMax = maxHeight;

  return (
    <BentoCard>
      <div style={{ padding: "28px", height: "100%", display: "flex", flexDirection: "column" }}>
        <p style={{ ...FONT_TECH, fontSize: "10px", color: C.muted, marginBottom: "20px" }}>
          Altura Mínima Requerida
        </p>

        {noReq ? (
          // Sin restricción
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px" }}>
            <div style={{
              width: "64px", height: "64px", borderRadius: "50%",
              background: "rgba(0,180,216,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "2rem",
            }}>
              ✓
            </div>
            <p style={{ ...FONT_DISPLAY, fontSize: "1.1rem", color: C.celeste, textAlign: "center" }}>
              Sin restricción de altura
            </p>
            <p style={{ fontSize: "11px", fontFamily: "var(--font-primary)", color: C.muted, textAlign: "center" }}>
              Apta para todos los visitantes
            </p>
          </div>
        ) : (
          // Con restricción — regla visual
          <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: "16px", paddingBottom: "8px" }}>
            {/* Regla vertical */}
            <div style={{ position: "relative", width: "24px", flexShrink: 0, alignSelf: "stretch" }}>
              {/* Línea de la regla */}
              <div style={{
                position: "absolute", left: "10px", top: 0, bottom: 0, width: "2px",
                background: "rgba(255,255,255,0.08)",
              }} />
              {/* Marcas de la regla */}
              {[...Array(7)].map((_, i) => (
                <div key={i} style={{
                  position: "absolute",
                  left: "6px",
                  top: `${(i / 6) * 100}%`,
                  width: i % 2 === 0 ? "10px" : "6px",
                  height: "1px",
                  background: "rgba(255,255,255,0.15)",
                }} />
              ))}
              {/* Marcador de altura mínima */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{
                  position: "absolute",
                  left: "14px",
                  top: `${((barMax - heightReq) / barMax) * 100}%`,
                  width: "60px",
                  height: "2px",
                  background: GRAD,
                  transformOrigin: "left",
                }}
              >
                <div style={{
                  position: "absolute",
                  left: "4px",
                  top: "-10px",
                  background: GRAD_DIAG,
                  borderRadius: "6px",
                  padding: "2px 8px",
                  whiteSpace: "nowrap",
                }}>
                  <span style={{ ...FONT_TECH, fontSize: "9px", color: "white" }}>
                    {heightReq} cm
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Barras de referencia */}
            <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: "8px", height: "140px" }}>
              {referencias.map((ref) => {
                const heightPct = (ref.cm / barMax) * 100;
                const meetsReq = ref.cm >= heightReq;
                return (
                  <div key={ref.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end", gap: "4px" }}>
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${heightPct}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + referencias.indexOf(ref) * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        width: "100%",
                        background: meetsReq
                          ? GRAD_DIAG
                          : "rgba(255,255,255,0.07)",
                        borderRadius: "6px 6px 4px 4px",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    />
                    <span style={{ fontSize: "14px", lineHeight: 1 }}>{ref.emoji}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {!noReq && (
          <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: `1px solid ${C.border}` }}>
            <p style={{ fontSize: "11px", fontFamily: "var(--font-primary)", color: C.muted }}>
              Los visitantes deben medir al menos{" "}
              <span style={{ color: C.sunset, fontWeight: 700 }}>{heightReq} cm</span>{" "}
              para acceder a esta atracción.
            </p>
          </div>
        )}
      </div>
    </BentoCard>
  );
}

// ── CARD 5: RESEÑAS en loop ───────────────────────────────────
const DEFAULT_REVIEWS = [
  { id: "01", text: "Una de las mejores experiencias del parque. La noche es el mejor momento.", author: "Visitante verificado", rating: 5 },
  { id: "02", text: "El sistema Lightning Lane vale cada centavo. Sin esperas, pura magia.", author: "Familia García", rating: 5 },
  { id: "03", text: "Los efectos visuales son increíbles. Llevá algo con qué abrigarte, hace frío.", author: "Turista frecuente", rating: 4 },
  { id: "04", text: "Imperdible. La primera vez siempre sorprende, la segunda vez encontrás detalles nuevos.", author: "Fan de Disney", rating: 5 },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill={i < rating ? C.sunset : "rgba(255,255,255,0.12)"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function CardResenas({
  reviews,
  attractionName,
}: {
  reviews?: { id: string; text: string; author?: string; rating?: number }[];
  attractionName: string;
}) {
  const data = reviews && reviews.length > 0 ? reviews : DEFAULT_REVIEWS;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % data.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [data.length]);

  const review = data[current];

  return (
    <BentoCard cols={2}>
      <div style={{ padding: "28px", height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <p style={{ ...FONT_TECH, fontSize: "10px", color: C.muted }}>
            Voces de la comunidad
          </p>
          {/* Dots indicadores */}
          <div style={{ display: "flex", gap: "5px" }}>
            {data.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                style={{
                  width: i === current ? "20px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  background: i === current ? GRAD : "rgba(255,255,255,0.15)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* Review animada */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden", position: "relative" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Comillas decorativas */}
              <div style={{
                fontSize: "4rem",
                lineHeight: 0.8,
                marginBottom: "8px",
                background: GRAD,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "Georgia, serif",
                opacity: 0.6,
              }}>
                "
              </div>

              <p style={{
                fontSize: "1rem",
                fontFamily: "var(--font-primary)",
                fontWeight: 500,
                color: C.text,
                lineHeight: 1.6,
                letterSpacing: "-0.01em",
                marginBottom: "20px",
              }}>
                {review.text}
              </p>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: "12px", fontFamily: "var(--font-primary)", fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: "4px" }}>
                    {review.author || "Visitante verificado"}
                  </p>
                  <StarRating rating={review.rating || 5} />
                </div>
                {/* Número de review */}
                <span style={{
                  fontSize: "3rem",
                  fontFamily: "var(--font-tech)",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.04)",
                  letterSpacing: "-0.05em",
                  lineHeight: 1,
                }}>
                  {review.id}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer con atracción */}
        <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: GRAD,
          }} />
          <p style={{ ...FONT_TECH, fontSize: "9px", color: C.muted }}>
            {attractionName} · Reseñas verificadas O247
          </p>
        </div>
      </div>
    </BentoCard>
  );
}

// ── COMPONENTE PRINCIPAL ──────────────────────────────────────
export default function AttractionBentoGrid({ attraction }: { attraction: Attraction }) {
  const a = attraction as ExtendedAttraction;

  return (
    <section
      style={{
        background: "#0a0a0c",
        padding: "64px 24px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header de sección */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "40px" }}
        >
          <p style={{ ...FONT_TECH, fontSize: "10px", color: C.muted, marginBottom: "10px" }}>
            Datos de la atracción
          </p>
          <h2 style={{
            ...FONT_DISPLAY,
            fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
            color: C.text,
            lineHeight: 1.1,
          }}>
            Todo lo que necesitás{" "}
            <span style={{
              background: GRAD,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              saber antes de ir
            </span>
          </h2>
        </motion.div>

        {/* Grid Bento */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            gridAutoRows: "260px",
          }}
        >
          {/* Fila 1: 4 cards de 1 columna */}
          <CardConfiabilidad score={a.reliabilityScore} />
          <CardAcceso access={a.access} accessExplained={a.accessExplained} />
          <CardDuracion duration={a.duration} />
          <CardAltura heightReq={a.heightReq} />

          {/* Fila 2: 1 card ancha de reseñas (span 2) + 2 cards de contexto */}
          <CardResenas
            reviews={a.reviews}
            attractionName={a.name}
          />

          {/* Card: Mejor momento */}
          <BentoCard>
            <div style={{ padding: "28px", height: "100%", display: "flex", flexDirection: "column" }}>
              <p style={{ ...FONT_TECH, fontSize: "10px", color: C.muted, marginBottom: "20px" }}>
                Mejor momento
              </p>
              <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                <div>
                  {/* Ícono sol/luna animado */}
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    style={{ fontSize: "2.5rem", marginBottom: "12px", display: "block" }}
                  >
                    🕐
                  </motion.div>
                  <p style={{
                    fontSize: "0.95rem",
                    fontFamily: "var(--font-primary)",
                    fontWeight: 500,
                    color: C.text,
                    lineHeight: 1.55,
                  }}>
                    {a.bestTime}
                  </p>
                </div>
              </div>
              <div style={{
                marginTop: "16px", paddingTop: "16px",
                borderTop: `1px solid ${C.border}`,
              }}>
                <div style={{ height: "3px", background: "rgba(255,255,255,0.05)", borderRadius: "2px" }}>
                  <motion.div
                    style={{ height: "100%", background: GRAD, borderRadius: "2px", width: "0%" }}
                    whileInView={{ width: "72%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  />
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Card: Tip secreto */}
          <BentoCard>
            <div style={{ padding: "28px", height: "100%", display: "flex", flexDirection: "column" }}>
              <p style={{ ...FONT_TECH, fontSize: "10px", color: C.muted, marginBottom: "20px" }}>
                Tip insider
              </p>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                {/* Línea de acento */}
                <div style={{ width: "32px", height: "2px", background: GRAD, borderRadius: "1px", marginBottom: "14px" }} />
                <p style={{
                  fontSize: "0.88rem",
                  fontFamily: "var(--font-primary)",
                  fontStyle: "italic",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.65,
                }}>
                  "{a.secretTip}"
                </p>
              </div>
              <div style={{
                marginTop: "16px", paddingTop: "16px",
                borderTop: `1px solid ${C.border}`,
                display: "flex", alignItems: "center", gap: "6px",
              }}>
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: C.sunset }} />
                <p style={{ ...FONT_TECH, fontSize: "9px", color: C.muted }}>Solo en O247</p>
              </div>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}