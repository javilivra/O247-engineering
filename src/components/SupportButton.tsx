"use client";

import { useState } from "react";
import SupportModal from "@/components/SupportModal";

function SupportHandsIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <path d="M2.5 12c0-.55.45-1 1-1H4.5v4H3.5a1 1 0 0 1-1-1v-2z" stroke={color} strokeWidth="1.25" strokeLinejoin="round"/>
      <path d="M4.5 11l2-3.2a1.1 1.1 0 0 1 .95-.55H11c.55 0 1 .45 1 1v.5h1c.55 0 1 .45 1 1v2.7c0 .55-.45 1-1 1H7L4.5 13V11z" stroke={color} strokeWidth="1.25" strokeLinejoin="round"/>
      <path d="M8.5 6.5V4M7.2 5.3l1.3-1.3 1.3 1.3" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

type Variant = "outline" | "inline" | "ghost";
interface Props { variant?: Variant; label?: string; className?: string; }

export default function SupportButton({ variant = "outline", label = "Apoyar O247", className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const [hov, setHov]   = useState(false);

  const styles: Record<Variant, { base: React.CSSProperties; hover: React.CSSProperties }> = {
    outline: {
      base:  { padding: "8px 16px", borderRadius: 10, border: "1.5px solid rgba(255,112,67,0.55)", background: "transparent", color: "#FF7043", fontSize: 13, fontWeight: 500 },
      hover: { background: "#FF7043", color: "white", borderColor: "#FF7043", boxShadow: "0 4px 14px rgba(255,112,67,0.28)" },
    },
    inline: {
      base:  { padding: "11px 22px", borderRadius: 12, border: "1.5px solid rgba(255,112,67,0.22)", background: "rgba(255,112,67,0.06)", color: "#FF7043", fontSize: 14, fontWeight: 500 },
      hover: { background: "#FF7043", color: "white", borderColor: "#FF7043", boxShadow: "0 6px 22px rgba(255,112,67,0.3)" },
    },
    ghost: {
      base:  { padding: "6px 10px", borderRadius: 8, border: "none", background: "transparent", color: "rgba(37,52,63,0.5)", fontSize: 13, fontWeight: 500 },
      hover: { color: "#FF7043", background: "rgba(255,112,67,0.06)" },
    },
  };

  const current    = hov ? { ...styles[variant].base, ...styles[variant].hover } : styles[variant].base;
  const iconColor  = hov ? (variant === "ghost" ? "#FF7043" : "white") : (variant === "ghost" ? "rgba(37,52,63,0.42)" : "#FF7043");

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        aria-label="Apoyar el proyecto O247"
        className={className}
        style={{ display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer", transition: "all 0.2s ease", fontFamily: "var(--font-sans)", ...current }}
      >
        <SupportHandsIcon size={15} color={iconColor} />
        {label}
      </button>
      <SupportModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}