"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AIRPORTS = [
  { id: "MCO", code: "MCO", label: "Orlando International", lng: -81.3085, lat: 28.4312, primary: true, info: { disney: "25 min", universal: "22 min", note: "Terminal Brightline dentro del aeropuerto" } },
  { id: "SFB", code: "SFB", label: "Orlando Sanford", lng: -81.2375, lat: 28.7758, primary: false, info: { disney: "55 min", universal: "50 min", note: "Aerolíneas low-cost · sin conexión Brightline" } },
  { id: "TPA", code: "TPA", label: "Tampa International", lng: -82.5332, lat: 27.9755, primary: false, info: { disney: "75 min", universal: "70 min", note: "Alternativa desde el oeste de Florida" } },
  { id: "MIA", code: "MIA", label: "Miami International", lng: -80.2870, lat: 25.7959, primary: false, info: { disney: "4 h auto / 3.5 h tren", universal: "4 h auto / 3.5 h tren", note: "Estación Brightline conectada al aeropuerto" } },
  { id: "FLL", code: "FLL", label: "Fort Lauderdale–Hollywood", lng: -80.1528, lat: 26.0726, primary: false, info: { disney: "3.5 h auto", universal: "3.5 h auto", note: "Estación Brightline a 5 min del aeropuerto" } },
];

const PARKS = [
  { id: "disney", label: "Walt Disney World", lng: -81.5631, lat: 28.3852, color: "#FF7043" },
  { id: "universal", label: "Universal Orlando", lng: -81.4662, lat: 28.4743, color: "#00B4D8" },
];

const BRIGHTLINE: [number, number][] = [
  [-80.1528, 26.0726],
  [-80.2870, 25.7959],
  [-80.9000, 26.9000],
  [-81.1500, 27.6000],
  [-81.3085, 28.4312],
];

type Airport = typeof AIRPORTS[0];

function Tooltip({ point, x, y }: { point: Airport; x: number; y: number }) {
  const flipLeft = x > 58;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.15 }}
      className="absolute z-30 pointer-events-none"
      style={{
        ...(flipLeft ? { right: `${100 - x + 2}%` } : { left: `${x + 2}%` }),
        top: `${Math.min(Math.max(y, 10), 75)}%`,
        transform: "translateY(-50%)",
      }}
    >
      <div className="rounded-2xl p-4 min-w-[210px] shadow-2xl"
        style={{ background: "rgba(15,25,35,0.97)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(20px)" }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="font-black font-mono text-[11px] tracking-widest px-2 py-0.5 rounded-md"
            style={{ background: "#FF7043", color: "white" }}>{point.code}</span>
          <span className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>{point.label}</span>
        </div>
        <div className="space-y-1.5 mb-3">
          {[
            { label: "Walt Disney World", value: point.info.disney, color: "#FF7043" },
            { label: "Universal Orlando", value: point.info.universal, color: "#00B4D8" },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-8">
              <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.22)" }}>{row.label}</span>
              <span className="text-[11px] font-bold tabular-nums" style={{ color: row.color }}>{row.value}</span>
            </div>
          ))}
        </div>
        <p className="text-[9px] font-mono pt-2"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.28)" }}>
          {point.info.note}
        </p>
      </div>
    </motion.div>
  );
}

export default function UIFloridaMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);
  const [ready, setReady] = useState(false);
  const [hovered, setHovered] = useState<Airport | null>(null);
  const [tipPos, setTipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let cancelled = false;

    (async () => {
      const mapboxgl = (await import("mapbox-gl")).default;
      if (cancelled) return;

      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

      const map = new mapboxgl.Map({
        container: containerRef.current!,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [-81.2, 27.2] as [number, number],
        zoom: 5.6,
        pitch: 0,
        bearing: 0,
        interactive: false,
        attributionControl: false,
      });

      mapRef.current = map;

      map.on("load", () => {
        if (cancelled) return;

        map.addSource("bl", {
          type: "geojson",
          data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: BRIGHTLINE } },
        });
        map.addLayer({ id: "bl-glow", type: "line", source: "bl", layout: { "line-cap": "round" }, paint: { "line-color": "#FFD54F", "line-width": 8, "line-opacity": 0.07, "line-blur": 6 } });
        map.addLayer({ id: "bl-dash", type: "line", source: "bl", layout: { "line-cap": "round" }, paint: { "line-color": "#FFD54F", "line-width": 1.5, "line-opacity": 0.5, "line-dasharray": [2, 3] } });

        PARKS.forEach((p) => {
          const el = document.createElement("div");
          el.style.cssText = `width:14px;height:14px;border-radius:50%;background:${p.color};border:2px solid rgba(255,255,255,0.12);opacity:0;box-shadow:0 0 18px ${p.color}55;transition:opacity .8s ease;`;
          const lbl = document.createElement("span");
          lbl.textContent = p.label;
          lbl.style.cssText = `position:absolute;left:18px;top:50%;transform:translateY(-50%);font:700 9px/1 monospace;letter-spacing:.08em;text-transform:uppercase;color:${p.color};opacity:.8;white-space:nowrap;pointer-events:none;`;
          const wrap = document.createElement("div");
          wrap.style.cssText = "position:relative;display:flex;align-items:center;";
          wrap.append(el, lbl);
          new mapboxgl.Marker(wrap as unknown as HTMLElement, { anchor: "center" }).setLngLat([p.lng, p.lat]).addTo(map);
          setTimeout(() => { el.style.opacity = "1"; }, 900);
          setInterval(() => {
            el.style.boxShadow = `0 0 28px ${p.color}99`;
            setTimeout(() => { el.style.boxShadow = `0 0 10px ${p.color}44`; }, 700);
          }, 2200);
        });

        AIRPORTS.forEach((ap, i) => {
          const sz = ap.primary ? 13 : 9;
          const col = ap.primary ? "#FFD54F" : "rgba(255,255,255,0.5)";
          const el = document.createElement("div");
          el.style.cssText = `width:${sz}px;height:${sz}px;border-radius:50%;background:${col};border:1.5px solid rgba(255,255,255,0.18);cursor:pointer;opacity:0;box-shadow:0 0 ${ap.primary ? 20 : 8}px ${ap.primary ? "#FFD54F55" : "rgba(255,255,255,.15)"};transition:opacity .5s ease,transform .2s ease;`;
          const code = document.createElement("span");
          code.textContent = ap.code;
          code.style.cssText = `position:absolute;left:${sz + 5}px;top:50%;transform:translateY(-50%);font:${ap.primary ? 900 : 700} ${ap.primary ? "11px" : "9px"}/1 monospace;letter-spacing:.1em;color:${col};pointer-events:none;white-space:nowrap;`;
          const wrap = document.createElement("div");
          wrap.style.cssText = "position:relative;display:flex;align-items:center;";
          wrap.append(el, code);
          wrap.addEventListener("mouseenter", () => {
            el.style.transform = "scale(1.5)";
            const rect = containerRef.current!.getBoundingClientRect();
            const pt = map.project([ap.lng, ap.lat]);
            setTipPos({ x: (pt.x / rect.width) * 100, y: (pt.y / rect.height) * 100 });
            setHovered(ap);
          });
          wrap.addEventListener("mouseleave", () => { el.style.transform = "scale(1)"; setHovered(null); });
          new mapboxgl.Marker(wrap as unknown as HTMLElement, { anchor: "center" }).setLngLat([ap.lng, ap.lat]).addTo(map);
          setTimeout(() => { el.style.opacity = "1"; }, 500 + i * 160);
        });

        setReady(true);
      });
    })();

    return () => {
      cancelled = true;
      (mapRef.current as mapboxgl.Map | null)?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="relative w-full h-full" style={{ position: "absolute", inset: 0 }}>
      <div ref={containerRef} className="absolute inset-0" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(15,25,35,0.65) 100%)" }} />
      <AnimatePresence>
        {hovered && <Tooltip point={hovered} x={tipPos.x} y={tipPos.y} />}
      </AnimatePresence>
      <motion.div className="absolute bottom-4 left-4"
        initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ delay: 1.2, duration: 0.7 }}>
        <div className="rounded-xl px-3 py-2.5 flex flex-col gap-1.5"
          style={{ background: "rgba(15,25,35,0.88)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(10px)" }}>
          {[
            { color: "#FFD54F", label: "Aeropuerto" },
            { color: "#FF7043", label: "Walt Disney World" },
            { color: "#00B4D8", label: "Universal Orlando" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className="rounded-full flex-shrink-0" style={{ width: 6, height: 6, background: item.color }} />
              <span className="text-[9px] font-mono uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.32)" }}>{item.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 mt-0.5">
            <div className="flex gap-px">{[0,1,2].map(i => <div key={i} style={{ width:4,height:1.5,background:"#FFD54F",borderRadius:1 }} />)}</div>
            <span className="text-[9px] font-mono uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.32)" }}>Ruta Brightline</span>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {!ready && (
          <motion.div className="absolute inset-0 flex items-center justify-center"
            style={{ background: "#15202b" }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex flex-col items-center gap-3">
              <div className="w-5 h-5 rounded-full border-2 animate-spin"
                style={{ borderColor: "rgba(255,112,67,0.3)", borderTopColor: "#FF7043" }} />
              <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.18)" }}>Cargando mapa</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
