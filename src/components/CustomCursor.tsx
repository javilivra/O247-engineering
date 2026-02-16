"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const mouse = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });
  const scale = useRef({ current: 1, target: 1 });
  const dotOpacity = useRef({ current: 1, target: 1 });
  const visible = useRef(false);
  const isDark = useRef(false); // true = cursor should be white (dark bg)
  const colorLerp = useRef(0); // 0 = gunmetal, 1 = white

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    const dot = dotRef.current;
    const fol = followerRef.current;
    if (!dot || !fol) return;

    // Ocultar cursor nativo
    const style = document.createElement("style");
    style.id = "o247-cursor-hide";
    style.textContent = "*, *::before, *::after { cursor: none !important; } html { cursor: none !important; }";
    document.head.appendChild(style);

    // ---- LUMINOSITY DETECTION ----
    // Muestrear el color del elemento bajo el cursor cada ~100ms
    let lastBgCheck = 0;

    const checkBackground = (x: number, y: number, now: number) => {
      if (now - lastBgCheck < 100) return;
      lastBgCheck = now;

      // Obtener el elemento real bajo el cursor (ignorando nuestros propios divs)
      dot.style.pointerEvents = "none";
      fol.style.pointerEvents = "none";

      const el = document.elementFromPoint(x, y);
      if (!el) return;

      // Recorrer hacia arriba hasta encontrar un fondo con color definido
      let target: Element | null = el;
      let bgColor = "";

      while (target && target !== document.documentElement) {
        const computed = window.getComputedStyle(target);
        const bg = computed.backgroundColor;

        // Saltar transparentes
        if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
          bgColor = bg;
          break;
        }
        target = target.parentElement;
      }

      if (!bgColor) {
        // Fallback: asumir bone (claro)
        isDark.current = false;
        return;
      }

      // Parsear RGB y calcular luminosidad
      const match = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (match) {
        const r = parseInt(match[1]);
        const g = parseInt(match[2]);
        const b = parseInt(match[3]);
        // Luminosidad relativa (fórmula simplificada)
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        isDark.current = luminance < 0.45;
      }
    };

    // ---- EVENTS ----
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!visible.current) {
        visible.current = true;
        followerPos.current.x = e.clientX;
        followerPos.current.y = e.clientY;
      }
    };

    const onDown = () => { scale.current.target = 0.6; };
    const onUp = () => { scale.current.target = 1; };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a") || t.closest("button") || t.closest("[data-cursor-hover]") || t.closest("input") || t.closest("textarea")) {
        scale.current.target = 2.5;
        dotOpacity.current.target = 0;
      }
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a") || t.closest("button") || t.closest("[data-cursor-hover]") || t.closest("input") || t.closest("textarea")) {
        scale.current.target = 1;
        dotOpacity.current.target = 1;
      }
    };

    const onLeave = () => { visible.current = false; };

    // ---- RENDER ----
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const render = () => {
      const now = performance.now();

      if (!visible.current) {
        dot.style.opacity = "0";
        fol.style.opacity = "0";
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      // Background check
      checkBackground(mouse.current.x, mouse.current.y, now);

      // Color lerp (0 = gunmetal/dark, 1 = white/light bg detected = dark cursor)
      const targetColor = isDark.current ? 1 : 0;
      colorLerp.current = lerp(colorLerp.current, targetColor, 0.12);

      // Colores interpolados
      const r = Math.round(lerp(37, 255, colorLerp.current));   // 37 = gunmetal R, 255 = white
      const g = Math.round(lerp(52, 255, colorLerp.current));   // 52 = gunmetal G
      const b = Math.round(lerp(63, 255, colorLerp.current));   // 63 = gunmetal B
      const color = `rgb(${r}, ${g}, ${b})`;

      // Dot: instantáneo
      dot.style.opacity = String(dotOpacity.current.current);
      dot.style.transform = `translate3d(${mouse.current.x - 4}px, ${mouse.current.y - 4}px, 0)`;
      dot.style.backgroundColor = color;

      // Follower: trailing
      followerPos.current.x = lerp(followerPos.current.x, mouse.current.x, 0.15);
      followerPos.current.y = lerp(followerPos.current.y, mouse.current.y, 0.15);

      scale.current.current = lerp(scale.current.current, scale.current.target, 0.18);
      dotOpacity.current.current = lerp(dotOpacity.current.current, dotOpacity.current.target, 0.2);

      fol.style.opacity = "1";
      fol.style.transform = `translate3d(${followerPos.current.x - 20}px, ${followerPos.current.y - 20}px, 0) scale(${scale.current.current})`;
      fol.style.borderColor = color.replace("rgb", "rgba").replace(")", ", 0.5)");

      rafRef.current = requestAnimationFrame(render);
    };

    // Bind
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      const el = document.getElementById("o247-cursor-hide");
      if (el) document.head.removeChild(el);
    };
  }, []);

  return (
    <div className="hidden lg:block" aria-hidden="true">
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#25343F",
          zIndex: 9999,
          pointerEvents: "none",
          opacity: 0,
          willChange: "transform",
        }}
      />
      <div
        ref={followerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1.5px solid rgba(37, 52, 63, 0.5)",
          zIndex: 9998,
          pointerEvents: "none",
          opacity: 0,
          willChange: "transform",
        }}
      />
    </div>
  );
}