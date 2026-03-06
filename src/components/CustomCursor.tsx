"use client";

import { useEffect, useRef, useState } from "react";

// ============================================================
// O247 CustomCursor v2.1 — Dot + Magical Sparkle Trail
// Sin ring. Solo dot sunset instantáneo + partículas estrella.
// ============================================================

const CFG = {
  DOT_SIZE: 6,
  SPARKLE_RATE: 2,
  SPARKLE_LIFE: 28,
  SPARKLE_SIZE_MIN: 2,
  SPARKLE_SIZE_MAX: 6,
  SPARKLE_SPEED: 0.6,
  COLOR_SUNSET: "#FF7043",
  COLOR_CELESTE: "#00B4D8",
  COLOR_WHITE: "#f7f7f5",
};

type CursorState = "default" | "hover-link" | "hover-card" | "hover-cta" | "press";

interface Sparkle {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  life: number; maxLife: number;
  color: string;
  rotation: number; rotSpeed: number;
}

class SparkleEngine {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  particles: Sparkle[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.resize();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  emit(x: number, y: number, count: number, state: CursorState) {
    const colors = state === "hover-cta"
      ? [CFG.COLOR_SUNSET, "#FF8A65", "#FFCCBC"]
      : state === "hover-card"
        ? [CFG.COLOR_CELESTE, "#80DEEA", CFG.COLOR_WHITE]
        : [CFG.COLOR_SUNSET, CFG.COLOR_CELESTE, CFG.COLOR_WHITE, "#FFD54F"];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.3 + Math.random() * CFG.SPARKLE_SPEED;
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.4,
        size: CFG.SPARKLE_SIZE_MIN + Math.random() * (CFG.SPARKLE_SIZE_MAX - CFG.SPARKLE_SIZE_MIN),
        life: CFG.SPARKLE_LIFE,
        maxLife: CFG.SPARKLE_LIFE,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.3,
      });
    }
  }

  tick() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles = this.particles.filter(p => p.life > 0);
    for (const p of this.particles) {
      p.life--;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.015;
      p.vx *= 0.98;
      p.rotation += p.rotSpeed;
      const alpha = p.life / p.maxLife;
      const eased = alpha * alpha;
      const size = p.size * (0.3 + eased * 0.7);
      this.ctx.save();
      this.ctx.globalAlpha = eased * 0.85;
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);
      this.ctx.fillStyle = p.color;
      this.ctx.shadowColor = p.color;
      this.ctx.shadowBlur = size * 2;
      this.drawStar(size);
      this.ctx.restore();
    }
  }

  private drawStar(size: number) {
    const ctx = this.ctx;
    const outer = size;
    const inner = size * 0.35;
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const oa = (i * Math.PI) / 2;
      const ia = oa + Math.PI / 4;
      if (i === 0) ctx.moveTo(Math.cos(oa) * outer, Math.sin(oa) * outer);
      else ctx.lineTo(Math.cos(oa) * outer, Math.sin(oa) * outer);
      ctx.lineTo(Math.cos(ia) * inner, Math.sin(ia) * inner);
    }
    ctx.closePath();
    ctx.fill();
  }
}

export default function CustomCursor() {
  // Detecta si el dispositivo tiene puntero (mouse) o es táctil
  // Usa pointer: fine = mouse preciso. pointer: coarse = touch.
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  useEffect(() => {
    setIsPointerDevice(window.matchMedia('(pointer: fine)').matches);
  }, []);

  const dotRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mouse = useRef({ x: -200, y: -200 });
  const prevMouse = useRef({ x: -200, y: -200 });
  const isVisible = useRef(false);
  const isActive = useRef(false);
  const cursorState = useRef<CursorState>("default");
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    if (!isPointerDevice) return; // No correr en touch/tablet
    if (typeof window === "undefined") return;

    const dot = dotRef.current;
    const canvas = canvasRef.current;
    if (!dot || !canvas) return;

    const engine = new SparkleEngine(canvas);

    const activate = () => {
      if (isActive.current) return;
      isActive.current = true;
      const style = document.createElement("style");
      style.textContent = "*, *::before, *::after { cursor: none !important; }";
      document.head.appendChild(style);
      styleRef.current = style;
      dot.style.display = "block";
      canvas.style.display = "block";
    };

    const deactivate = () => {
      if (!isActive.current) return;
      isActive.current = false;
      if (styleRef.current) {
        try { document.head.removeChild(styleRef.current); } catch { }
        styleRef.current = null;
      }
      dot.style.display = "none";
      canvas.style.display = "none";
      isVisible.current = false;
    };

    const checkSize = () => {
      if (window.innerWidth >= 1024) activate();
      else deactivate();
    };

    const detectState = (target: HTMLElement): CursorState => {
      if (target.closest("[data-cursor='cta']") || target.closest(".btn-cta")) return "hover-cta";
      if (target.closest("[data-cursor='card']") || target.closest("[data-cursor-hover]")) return "hover-card";
      if (target.closest("a") || target.closest("button")) return "hover-link";
      return "default";
    };

    const applyDot = (state: CursorState) => {
      cursorState.current = state;
      switch (state) {
        case "hover-cta":
          dot.style.background = CFG.COLOR_SUNSET;
          dot.style.boxShadow = `0 0 10px ${CFG.COLOR_SUNSET}, 0 0 20px ${CFG.COLOR_SUNSET}60`;
          break;
        case "hover-card":
          dot.style.background = CFG.COLOR_CELESTE;
          dot.style.boxShadow = `0 0 10px ${CFG.COLOR_CELESTE}, 0 0 20px ${CFG.COLOR_CELESTE}60`;
          break;
        case "hover-link":
          dot.style.background = CFG.COLOR_SUNSET;
          dot.style.boxShadow = `0 0 8px ${CFG.COLOR_SUNSET}80`;
          break;
        case "press":
          dot.style.background = CFG.COLOR_SUNSET;
          dot.style.boxShadow = `0 0 16px ${CFG.COLOR_SUNSET}`;
          break;
        default:
          dot.style.background = CFG.COLOR_SUNSET;
          dot.style.boxShadow = `0 0 4px ${CFG.COLOR_SUNSET}60`;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isActive.current) return;
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!isVisible.current) {
        isVisible.current = true;
        dot.style.opacity = "1";
      }
      const state = detectState(e.target as HTMLElement);
      if (state !== cursorState.current) applyDot(state);
    };

    const onMouseDown = () => {
      if (!isActive.current) return;
      applyDot("press");
      engine.emit(mouse.current.x, mouse.current.y, 12, cursorState.current);
    };

    const onMouseUp = () => {
      if (!isActive.current) return;
      const target = document.elementFromPoint(mouse.current.x, mouse.current.y) as HTMLElement;
      applyDot(target ? detectState(target) : "default");
    };

    const onMouseLeave = () => {
      if (!isActive.current) return;
      isVisible.current = false;
      dot.style.opacity = "0";
    };

    const onResize = () => { checkSize(); engine.resize(); };

    const render = () => {
      if (isActive.current && isVisible.current) {
        dot.style.transform = `translate(${mouse.current.x - CFG.DOT_SIZE / 2}px, ${mouse.current.y - CFG.DOT_SIZE / 2}px)`;

        const dx = mouse.current.x - prevMouse.current.x;
        const dy = mouse.current.y - prevMouse.current.y;
        const speed = Math.sqrt(dx * dx + dy * dy);
        if (speed > 2) {
          const count = Math.min(Math.floor(speed * 0.15), CFG.SPARKLE_RATE);
          engine.emit(mouse.current.x, mouse.current.y, count, cursorState.current);
        }
        prevMouse.current = { ...mouse.current };
      }
      engine.tick();
      rafRef.current = requestAnimationFrame(render);
    };

    checkSize();
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      if (styleRef.current) {
        try { document.head.removeChild(styleRef.current); } catch { }
      }
    };
  }, [isPointerDevice]);

  // No renderizar nada en dispositivos táctiles
  if (!isPointerDevice) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ display: "none", zIndex: 9996 }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          display: "none",
          opacity: 0,
          width: CFG.DOT_SIZE,
          height: CFG.DOT_SIZE,
          borderRadius: "50%",
          background: CFG.COLOR_SUNSET,
          boxShadow: `0 0 4px ${CFG.COLOR_SUNSET}60`,
          transition: "opacity 0.3s ease, background 0.2s ease, box-shadow 0.2s ease",
          willChange: "transform",
          zIndex: 9998,
        }}
      />
    </>
  );
}