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
    isLoading: true,
    isError: false,
    refetch: () => {},
  });

  const apiSlug = PARK_SLUG_MAP[parkSlug] ?? parkSlug;

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
          isLoading: false,
          isError: false,
        }));
      } else {
        setResult(prev => ({ ...prev, isLoading: false }));
      }
    } catch {
      setResult(prev => ({ ...prev, isLoading: false, isError: true }));
    }
  }, [apiSlug, attractionName]);

  useEffect(() => {
    setResult(prev => ({ ...prev, refetch: fetchLive }));
    fetchLive();
    const interval = setInterval(fetchLive, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchLive, refreshInterval]);

  return result;
}
