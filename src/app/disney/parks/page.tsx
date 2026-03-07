import React from 'react';
import { getParkWeather } from '@/services/weather';
import DisneyParksClient from '@/components/parks/DisneyParksClient';

// ============================================================
// COORDENADAS POR PARQUE
// ============================================================

const PARK_COORDS = {
  mk:     { lat: 28.4177, lon: -81.5812 },
  epcot:  { lat: 28.3747, lon: -81.5494 },
  hs:     { lat: 28.3575, lon: -81.5583 },
  ak:     { lat: 28.3553, lon: -81.5900 },
  tl:     { lat: 28.3674, lon: -81.5279 },
  bb:     { lat: 28.3527, lon: -81.5771 },
};

// ============================================================
// SERVER COMPONENT
// ============================================================

export const dynamic = 'force-dynamic';

export default async function DisneyParksPage() {
  const [mk, epcot, hs, ak, tl, bb] = await Promise.all([
    getParkWeather(PARK_COORDS.mk.lat,    PARK_COORDS.mk.lon),
    getParkWeather(PARK_COORDS.epcot.lat, PARK_COORDS.epcot.lon),
    getParkWeather(PARK_COORDS.hs.lat,    PARK_COORDS.hs.lon),
    getParkWeather(PARK_COORDS.ak.lat,    PARK_COORDS.ak.lon),
    getParkWeather(PARK_COORDS.tl.lat,    PARK_COORDS.tl.lon),
    getParkWeather(PARK_COORDS.bb.lat,    PARK_COORDS.bb.lon),
  ]);

  const weatherMap = { mk, epcot, hs, ak, tl, bb };

  return <DisneyParksClient weatherMap={weatherMap} />;
}
