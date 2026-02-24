"use client";

// ============================================================
// AddButton v2 — Componente reutilizable O247
// Animación en 3 fases secuenciales (no simultáneas):
//   1. Texto hace fade+slide out
//   2. Contenedor se comprime suavemente  
//   3. Estrella aparece con spring
// ============================================================

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AddButtonProps {
  itemId: string;
  label?: string;
  className?: string;
  onAdd?: (id: string) => void;
  onRemove?: (id: string) => void;
}

// Estrella SVG elegante
function StarIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2.5L14.09 8.76H20.68L15.29 12.74L17.38 19L12 15.02L6.62 19L8.71 12.74L3.32 8.76H9.91L12 2.5Z"
        fill="#1a1a1a"
        opacity="0.85"
      />
    </svg>
  );
}

export default function AddButton({
  itemId,
  label = "Agregar al Plan",
  className = "",
  onAdd,
  onRemove,
}: AddButtonProps) {
  const storageKey = `o247_plan_${itemId}`;
  const [added, setAdded] = useState(false);
  const [phase, setPhase] = useState<"idle" | "collapsing" | "done">("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(storageKey) === "true") {
        setAdded(true);
        setPhase("done");
      }
    } catch {}
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [storageKey]);

  function handleClick() {
    if (phase === "collapsing") return;

    if (!added) {
      // → Activar: texto sale, luego comprimir, luego estrella
      setPhase("collapsing");
      timeoutRef.current = setTimeout(() => {
        setAdded(true);
        setPhase("done");
        try { sessionStorage.setItem(storageKey, "true"); } catch {}
        onAdd?.(itemId);
      }, 420); // tiempo que tarda el texto en salir + comprimir
    } else {
      // → Desactivar: estrella sale, expandir, texto aparece
      setPhase("collapsing");
      timeoutRef.current = setTimeout(() => {
        setAdded(false);
        setPhase("idle");
        try { sessionStorage.removeItem(storageKey); } catch {}
        onRemove?.(itemId);
      }, 320);
    }
  }

  // Ancho del botón según fase
  const isCompressed = phase === "done" || (phase === "collapsing" && !added);

  return (
    <motion.button
      onClick={handleClick}
      className={`relative overflow-hidden rounded-full select-none cursor-pointer flex items-center justify-center ${className}`}
      animate={{
        width: isCompressed ? 48 : "auto",
        minWidth: isCompressed ? 48 : 160,
      }}
      transition={{
        width: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
        minWidth: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
      }}
      style={{
        height: 44,
        background:
          "linear-gradient(135deg, #b8860b 0%, #e8c84a 28%, #ffe680 50%, #e8c84a 72%, #b8860b 100%)",
        backgroundSize: "200% 200%",
        boxShadow: added
          ? "0 6px 24px rgba(255,200,0,0.5), 0 2px 8px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.3)"
          : "0 4px 16px rgba(184,134,11,0.4), 0 2px 6px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.28)",
      }}
      whileHover={{ scale: 1.03, transition: { duration: 0.18 } }}
      whileTap={{ scale: 0.96, transition: { duration: 0.08 } }}
    >
      {/* Shine sweep */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-full"
        style={{
          background:
            "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.48) 50%, transparent 70%)",
          backgroundSize: "250% 100%",
        }}
        animate={{ backgroundPosition: ["250% 0%", "-250% 0%"] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "linear", repeatDelay: 2.5 }}
      />

      {/* Borde interno */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow:
            "inset 0 0 0 1px rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.06)",
        }}
      />

      {/* Contenido — AnimatePresence controla el swap */}
      <div className="relative z-10 flex items-center justify-center px-5">
        <AnimatePresence mode="wait">
          {!added ? (
            <motion.div
              key="add-label"
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{
                opacity: 0,
                x: -4,
                transition: { duration: 0.22, ease: "easeIn" },
              }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <motion.span
                className="font-bold text-gunmetal/65 leading-none"
                style={{ fontSize: "1rem", marginTop: "-1px" }}
              >
                +
              </motion.span>
              <span
                style={{
                  fontSize: "0.6rem",
                  fontFamily: "var(--font-tech)",
                  letterSpacing: "0.16em",
                  color: "rgba(26,26,26,0.8)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="star-label"
              initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{
                opacity: 0,
                scale: 0.5,
                rotate: 20,
                transition: { duration: 0.18, ease: "easeIn" },
              }}
              transition={{
                duration: 0.4,
                ease: [0.34, 1.56, 0.64, 1], // spring suave
                delay: 0.05,
              }}
            >
              <StarIcon />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}