// =============================================================================
// GET /api/park/[parkSlug]/live
// Retorna tiempos en vivo para un parque específico
// Fuente: ThemeParks.wiki
// Ejemplos:
//   /api/park/magic-kingdom/live
//   /api/park/epcot/live
//   /api/park/hollywood-studios/live
//   /api/park/animal-kingdom/live
//   /api/park/universal-studios/live
//   /api/park/islands-of-adventure/live
// =============================================================================
import { NextResponse } from "next/server";
import { getParkLiveData, PARK_ENTITY_IDS } from "@/lib/parkData";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ parkSlug: string }> }
) {
  const { parkSlug } = await params;

  if (!PARK_ENTITY_IDS[parkSlug]) {
    return NextResponse.json(
      { error: `Park "${parkSlug}" not supported. Valid parks: ${Object.keys(PARK_ENTITY_IDS).join(", ")}` },
      { status: 404 }
    );
  }

  try {
    const data = await getParkLiveData(parkSlug);
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
        "X-Data-Source": "themeparks.wiki",
        "X-Park": parkSlug,
      },
    });
  } catch (error) {
    console.error(`[park/${parkSlug}/live] Error:`, error);
    return NextResponse.json(
      { error: "External API unavailable", park: parkSlug },
      { status: 503 }
    );
  }
}
