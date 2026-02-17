// Ruta: src/app/mapping/page.tsx
import React from 'react';
import AnnualMapping from '@/components/AnnualMapping';
import { getOrlandoClimate } from '@/services/weather';
import { ANNUAL_DATA, MonthData } from '@/data/annual-mapping';

export default async function MappingPage() {
  const climateStats = await getOrlandoClimate();

  const mergedData: MonthData[] = ANNUAL_DATA.map((staticMonth, index) => {
    // Fallback seguro
    const apiData = climateStats[index] || { avgTempMax: 28, avgTempMin: 18, rainDays: 5 }; 

    // LÓGICA DE ETIQUETAS E ICONOS
    let dynamicSkyLabel = 'Soleado';
    let dynamicGearIcon = 'solar:sun-2-bold-duotone'; 

    if (apiData.rainDays >= 10) {
        dynamicSkyLabel = 'Lluvioso';
        dynamicGearIcon = 'solar:cloud-rain-bold-duotone'; 
    } else if (apiData.rainDays > 7) {
        dynamicSkyLabel = 'Tormentas';
        dynamicGearIcon = 'solar:cloud-storm-bold-duotone'; 
    } else if (apiData.avgTempMax > 28) { // Usamos Max para sensación de calor
        dynamicSkyLabel = 'Caluroso';
        dynamicGearIcon = 'solar:sun-fog-bold-duotone'; 
    } else if (apiData.avgTempMax < 22) { // Usamos Max para sensación de fresco
        dynamicSkyLabel = 'Fresco';
        dynamicGearIcon = 'solar:wind-bold-duotone'; 
    } else {
        dynamicSkyLabel = 'Despejado';
        dynamicGearIcon = 'solar:sun-2-bold-duotone'; 
    }

    return {
      ...staticMonth,
      // INYECTAMOS DATOS REALES DE API
      tempMax: `${apiData.avgTempMax}°`, 
      tempMin: `${apiData.avgTempMin}°`, 
      skyLabel: dynamicSkyLabel,
      gearIcon: dynamicGearIcon, 
    };
  });

  return (
    <main className="min-h-screen bg-bone pt-[80px]">
      <AnnualMapping initialData={mergedData} />
    </main>
  );
}