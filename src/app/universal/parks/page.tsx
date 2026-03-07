import React from 'react';
import { getParkWeather } from '@/services/weather';
import UniversalParksClient from '@/components/parks/UniversalParksClient';

export const dynamic = 'force-dynamic';

const PARK_COORDS = {
  epic:    { lat: 28.4726, lon: -81.4674 },
  ioa:     { lat: 28.4722, lon: -81.4677 },
  us:      { lat: 28.4750, lon: -81.4665 },
  volcano: { lat: 28.4628, lon: -81.4695 },
};

export default async function UniversalParksPage() {
  const [epic, ioa, us, volcano] = await Promise.all([
    getParkWeather(PARK_COORDS.epic.lat,    PARK_COORDS.epic.lon),
    getParkWeather(PARK_COORDS.ioa.lat,     PARK_COORDS.ioa.lon),
    getParkWeather(PARK_COORDS.us.lat,      PARK_COORDS.us.lon),
    getParkWeather(PARK_COORDS.volcano.lat, PARK_COORDS.volcano.lon),
  ]);

  const weatherMap = { epic, ioa, us, volcano };

  return <UniversalParksClient weatherMap={weatherMap} />;
}
