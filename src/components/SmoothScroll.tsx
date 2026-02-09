"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  // F21: Guardamos la referencia del frame para cancelarlo
  const reqIdRef = useRef<number | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      // Guardamos el ID del frame
      reqIdRef.current = requestAnimationFrame(raf);
    }

    reqIdRef.current = requestAnimationFrame(raf);

    return () => {
      // CLEANUP CRÍTICO: Detener el loop y destruir instancia
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}