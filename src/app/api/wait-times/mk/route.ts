// DEPRECATED — mantenemos la ruta por compatibilidad pero redirige a la nueva
// La nueva arquitectura está en /api/park/[parkSlug]/live
import { NextResponse } from "next/server";
import { getParkLiveData } from "@/lib/parkData";

export async function GET() {
  try {
    const data = await getParkLiveData("magic-kingdom");
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60" },
    });
  } catch (error) {
    console.error("[wait-times/mk] Error:", error);
    return NextResponse.json({ error: "Failed to fetch wait times" }, { status: 503 });
  }
}
