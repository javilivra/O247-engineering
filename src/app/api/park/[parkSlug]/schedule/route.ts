// =============================================================================
// GET /api/park/[parkSlug]/schedule
// Retorna horarios del parque para el mes actual
// Ejemplo: /api/park/magic-kingdom/schedule
// =============================================================================
import { NextResponse } from "next/server";
import { getParkSchedule, PARK_ENTITY_IDS } from "@/lib/parkData";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ parkSlug: string }> }
) {
  const { parkSlug } = await params;

  if (!PARK_ENTITY_IDS[parkSlug]) {
    return NextResponse.json({ error: `Park "${parkSlug}" not supported` }, { status: 404 });
  }

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  try {
    const data = await getParkSchedule(parkSlug, year, month);
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=300",
        "X-Data-Source": "themeparks.wiki",
      },
    });
  } catch (error) {
    console.error(`[park/${parkSlug}/schedule] Error:`, error);
    return NextResponse.json({ error: "Schedule unavailable" }, { status: 503 });
  }
}
