"use client";

import { useState } from "react";
import SupportModal from "@/components/SupportModal";

function SupportHeartIcon({ size = 14, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path
        d="M10 16.5S3 12 3 7.5A3.5 3.5 0 0 1 9.5 5.6L10 6l.5-.4A3.5 3.5 0 0 1 17 7.5C17 12 10 16.5 10 16.5z"
        fill={color}
        opacity="0.9"
      />
      <path d="M14.5 3.5l.5 1.2M16.5 5l1.2.5M15.8 6.5l1.3.2" stroke={color} strokeWidth="1.1" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
}

type Variant = "hero" | "outline" | "inline" | "ghost";

interface Props {
  variant?: Variant;
  label?: string;
  className?: string;
}

export default function SupportButton({
  variant = "hero",
  label = "Apoyar O247",
  className = "",
}: Props) {
  const [open, setOpen] = useState(false);

  const variantClass: Record<Variant, string> = {
    hero: [
      "relative px-7 py-2.5 rounded-full",
      "font-bold text-[11px] tracking-[0.15em] uppercase text-white",
      "shadow-lg transition-all duration-300",
      "hover:brightness-110 hover:shadow-lg",
      "active:scale-95",
      "flex items-center gap-2",
    ].join(" "),
    outline: [
      "px-5 py-2.5 rounded-full",
      "border-2 border-sunset/60 bg-transparent",
      "font-bold text-[11px] tracking-[0.15em] uppercase text-sunset",
      "transition-all duration-200",
      "hover:bg-sunset hover:border-sunset hover:text-white hover:shadow-lg",
      "active:scale-95",
      "flex items-center gap-2",
    ].join(" "),
    inline: [
      "px-6 py-3 rounded-full",
      "font-bold text-[11px] tracking-[0.15em] uppercase text-white",
      "shadow-md transition-all duration-300",
      "hover:brightness-110 hover:shadow-lg",
      "active:scale-95",
      "flex items-center gap-2",
    ].join(" "),
    ghost: [
      "px-4 py-2 rounded-full bg-transparent",
      "font-semibold text-[11px] tracking-[0.12em] uppercase",
      "text-gunmetal/40 hover:text-sunset",
      "transition-colors duration-200",
      "flex items-center gap-2",
    ].join(" "),
  };

  const gradientStyle =
    variant === "hero" || variant === "inline"
      ? { background: "linear-gradient(to right, #00B4D8, #FF7043)" }
      : {};

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Apoyar el proyecto O247"
        className={`${variantClass[variant]} ${className}`}
        style={{ fontFamily: "var(--font-sans)", cursor: "pointer", border: "none", ...gradientStyle }}
      >
        <SupportHeartIcon size={14} color="white" />
        {label}
      </button>
      <SupportModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}