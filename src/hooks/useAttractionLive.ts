// =============================================================================
// useAttractionLive — Hook para datos en vivo de una atracción
// Llama a nuestra propia API Route (nunca a ThemeParks.wiki directamente)
// Se refresca automáticamente cada 5 minutos
// =============================================================================
"use client";
import { useEffect, useState, useCallback } from "react";
import type { AttractionLive } from "@/lib/parkData";

interface UseAttractionLiveResult {
  waitTime: number | null;
  status: AttractionLive["status"] | null;
  lastUpdated: string | null;
  hasLightningLane: boolean;
  hasVirtualQueue: boolean;
  openingTime: string | null;   // "9:00 AM" si el parque tiene horario hoy
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

// Mapeo de slugs de parque en O247 → slugs de la API
const PARK_SLUG_MAP: Record<string, string> = {
  "mk":  "magic-kingdom",
  "ep":  "epcot",
  "hs":  "hollywood-studios",
  "ak":  "animal-kingdom",
  "uso": "universal-studios",
  "ioa": "islands-of-adventure",
};

export function useAttractionLive(
  parkSlug: string,         // slug interno O247: "mk", "ep", "hs", "ak"
  attractionName: string,   // nombre exacto de la atracción
  refreshInterval = 300_000 // 5 minutos por defecto
): UseAttractionLiveResult {
  const [result, setResult] = useState<UseAttractionLiveResult>({
    waitTime: null,
    status: null,
    lastUpdated: null,
    hasLightningLane: false,
    hasVirtualQueue: false,
    openingTime: null,
    isLoading: true,
    isError: false,
    refetch: () => {},
  });

  const apiSlug = PARK_SLUG_MAP[parkSlug] ?? parkSlug;

  // Obtiene la hora de apertura del parque para hoy
  const fetchOpeningTime = useCallback(async (): Promise<string | null> => {
    try {
      const res = await fetch(`/api/park/${apiSlug}/schedule`);
      if (!res.ok) return null;
      const json = await res.json();
      const today = new Date().toISOString().slice(0, 10);
      const schedule = (json.schedule ?? json) as Array<{ date: string; openingTime?: string; type?: string }>;
      const todayEntry = schedule.find((s) => s.date?.startsWith(today) && s.type === "OPERATING");
      if (!todayEntry?.openingTime) return null;
      // Convertir ISO a "9:00 AM"
      const d = new Date(todayEntry.openingTime);
      return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "America/New_York" });
    } catch {
      return null;
    }
  }, [apiSlug]);

  const fetchLive = useCallback(async () => {
    try {
      const res = await fetch(`/api/park/${apiSlug}/live`);
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const json = await res.json();

      const rides: AttractionLive[] = json.liveData ?? [];
      const needle = attractionName.toLowerCase();

      const match =
        rides.find(r => r.name?.toLowerCase() === needle) ??
        rides.find(r => r.name?.toLowerCase().includes(needle));

      const openingTime = await fetchOpeningTime();

      if (match) {
        setResult(prev => ({
          ...prev,
          waitTime: match.queue?.STANDBY?.waitTime ?? null,
          status: match.status,
          lastUpdated: match.lastUpdated,
          hasLightningLane: !!(
            match.queue?.PAID_SINGLE_RIDER ||
            match.queue?.RETURN_TIME
          ),
          hasVirtualQueue: !!(match.queue?.BOARDING_GROUP),
          openingTime,
          isLoading: false,
          isError: false,
        }));
      } else {
        setResult(prev => ({ ...prev, openingTime, isLoading: false }));
      }
    } catch {
      setResult(prev => ({ ...prev, isLoading: false, isError: true }));
    }
  }, [apiSlug, attractionName, fetchOpeningTime]);

  useEffect(() => {
    setResult(prev => ({ ...prev, refetch: fetchLive }));
    fetchLive();
    const interval = setInterval(fetchLive, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchLive, refreshInterval]);

  return result;
}
