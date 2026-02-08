import { NextResponse } from 'next/server';
// Importamos la librería que acabamos de instalar
const Themeparks = require('themeparks');

export async function GET() {
  try {
    // 1. Instanciamos el parque Magic Kingdom
    const mk = new Themeparks.Parks.WaltDisneyWorldMagicKingdom();

    // 2. Pedimos los tiempos de espera (Esto tarda unos milisegundos)
    const waitTimes = await mk.getWaitTimes();

    // 3. Devolvemos la data limpia al frontend
    return NextResponse.json(waitTimes, { status: 200 });
    
  } catch (error) {
    console.error("Error fetching MK wait times:", error);
    return NextResponse.json(
        { error: 'Failed to fetch wait times' }, 
        { status: 500 }
    );
  }
}