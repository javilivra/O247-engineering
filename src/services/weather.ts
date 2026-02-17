// Ruta: src/services/weather.ts

const LAT = 28.4177;
const LON = -81.5812;

interface MonthlyClimate {
  month: number;
  avgTempMax: number; // Antes solo avgTemp
  avgTempMin: number; // NUEVO
  rainDays: number;
}

export async function getOrlandoClimate(): Promise<MonthlyClimate[]> {
  const startDate = '2019-01-01';
  const endDate = '2023-12-31';

  // AGREGAMOS temperature_2m_min A LA PETICIÓN
  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${LAT}&longitude=${LON}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=America%2FNew_York`;

  try {
    const res = await fetch(url, { next: { revalidate: 86400 } }); 
    if (!res.ok) throw new Error('Error fetching weather data');
    const data = await res.json();

    const daily = data.daily;
    const monthlyStats: Record<number, { maxSum: number; minSum: number; count: number; rainDays: number }> = {};

    for (let i = 0; i < 12; i++) {
      monthlyStats[i] = { maxSum: 0, minSum: 0, count: 0, rainDays: 0 };
    }

    daily.time.forEach((dateStr: string, index: number) => {
      const date = new Date(dateStr);
      const month = date.getUTCMonth(); 
      const max = daily.temperature_2m_max[index];
      const min = daily.temperature_2m_min[index]; // NUEVO
      const rain = daily.precipitation_sum[index];

      if (max !== null && min !== null) {
        monthlyStats[month].maxSum += max;
        monthlyStats[month].minSum += min; // NUEVO
        monthlyStats[month].count++;
      }
      
      if (rain > 2.0) {
        monthlyStats[month].rainDays++;
      }
    });

    const climateData = Object.keys(monthlyStats).map((key) => {
      const m = parseInt(key);
      const stats = monthlyStats[m];
      return {
        month: m,
        avgTempMax: Math.round(stats.maxSum / stats.count), // Promedio Máxima
        avgTempMin: Math.round(stats.minSum / stats.count), // Promedio Mínima
        rainDays: Math.round(stats.rainDays / 5) 
      };
    });

    return climateData;

  } catch (error) {
    console.error("Fallo al obtener clima histórico:", error);
    // Fallback con min/max aproximados
    return Array.from({ length: 12 }, (_, i) => ({ month: i, avgTempMax: 28, avgTempMin: 18, rainDays: 5 }));
  }
}