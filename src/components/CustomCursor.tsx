"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const mousePos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });
  const followerScale = useRef(1);
  const targetScale = useRef(1);
  const isVisible = useRef(false);
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const isActive = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // No custom cursor on touch devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const dot = dotRef.current;
    const follower = followerRef.current;
    if (!dot || !follower) return;

    const LG_BREAKPOINT = 1024;

    // ---- Activate / Deactivate based on screen width ----
    const activate = () => {
      if (isActive.current) return;
      isActive.current = true;

      // Hide native cursor via injected style
      const style = document.createElement("style");
      style.textContent = "*, *::before, *::after { cursor: none !important; }";
      document.head.appendChild(style);
      styleRef.current = style;

      dot.style.display = "block";
      follower.style.display = "block";
    };

    const deactivate = () => {
      if (!isActive.current) return;
      isActive.current = false;

      // Restore native cursor
      if (styleRef.current) {
        try { document.head.removeChild(styleRef.current); } catch {}
        styleRef.current = null;
      }

      dot.style.display = "none";
      follower.style.display = "none";
      dot.style.opacity = "0";
      follower.style.opacity = "0";
      isVisible.current = false;
    };

    const checkSize = () => {
      if (window.innerWidth >= LG_BREAKPOINT) activate();
      else deactivate();
    };

    // ---- Mouse handlers ----
    const onMouseMove = (e: MouseEvent) => {
      if (!isActive.current) return;
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible.current) {
        isVisible.current = true;
        dot.style.opacity = "1";
        follower.style.opacity = "1";
      }
    };

    const onMouseDown = () => { if (isActive.current) targetScale.current = 0.7; };
    const onMouseUp = () => { if (isActive.current) targetScale.current = 1; };

    const onMouseEnterInteractive = () => {
      if (!isActive.current) return;
      targetScale.current = 2.5;
      dot.style.opacity = "0";
    };

    const onMouseLeaveInteractive = () => {
      if (!isActive.current) return;
      targetScale.current = 1;
      dot.style.opacity = "1";
    };

    const onMouseLeaveWindow = () => {
      if (!isActive.current) return;
      isVisible.current = false;
      dot.style.opacity = "0";
      follower.style.opacity = "0";
    };

    // ---- Render loop ----
    const render = () => {
      if (isActive.current) {
        dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.15;
        dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.15;
        followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.08;
        followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.08;
        followerScale.current += (targetScale.current - followerScale.current) * 0.12;

        dot.style.transform = `translate(${dotPos.current.x - 4}px, ${dotPos.current.y - 4}px)`;
        follower.style.transform = `translate(${followerPos.current.x - 20}px, ${followerPos.current.y - 20}px) scale(${followerScale.current})`;
      }
      requestRef.current = requestAnimationFrame(render);
    };

    // ---- Delegated hover detection ----
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a") || target.closest("button") || target.closest("[data-cursor-hover]")) {
        onMouseEnterInteractive();
      }
    };
    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a") || target.closest("button") || target.closest("[data-cursor-hover]")) {
        onMouseLeaveInteractive();
      }
    };

    // ---- Setup ----
    checkSize();
    window.addEventListener("resize", checkSize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeaveWindow);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    requestRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener("resize", checkSize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      // Restore native cursor
      if (styleRef.current) {
        try { document.head.removeChild(styleRef.current); } catch {}
        styleRef.current = null;
      }
    };
  }, []);

  return (
    <>
      {/* Dot: centro */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-gunmetal z-[9999] pointer-events-none"
        style={{ opacity: 0, display: "none", transition: "opacity 0.3s ease" }}
      />
      {/* Follower: círculo blend */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-gunmetal/60 z-[9998] pointer-events-none mix-blend-difference"
        style={{ opacity: 0, display: "none", transition: "opacity 0.3s ease" }}
      />
    </>
  );
}