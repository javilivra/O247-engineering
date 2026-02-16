import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// ============================================================
// POST /api/survey-events
// 
// Recibe eventos de la MiniSurvey y los almacena.
// Fase 1: guarda en archivo JSON local.
// Fase 2: migrar a base de datos (Supabase, PlanetScale, etc.)
// ============================================================

const DATA_DIR = path.join(process.cwd(), "data");
const EVENTS_FILE = path.join(DATA_DIR, "survey-events.json");

interface SurveyEvent {
  event: string;
  timestamp: string;
  sessionId: string;
  userAgent: string;
  [key: string]: unknown;
}

// Asegurar que el directorio y archivo existan
async function ensureFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(EVENTS_FILE);
    } catch {
      await fs.writeFile(EVENTS_FILE, "[]", "utf-8");
    }
  } catch (err) {
    console.error("[Survey API] Error ensuring file:", err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.event) {
      return NextResponse.json({ error: "Missing event field" }, { status: 400 });
    }

    // Enriquecer el evento con metadata del server
    const enrichedEvent: SurveyEvent = {
      ...body,
      timestamp: body.timestamp || new Date().toISOString(),
      sessionId: request.cookies.get("o247_session")?.value || generateSessionId(),
      userAgent: request.headers.get("user-agent") || "unknown",
      ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown",
      referer: request.headers.get("referer") || "",
    };

    // Almacenar
    await ensureFile();
    const raw = await fs.readFile(EVENTS_FILE, "utf-8");
    const events: SurveyEvent[] = JSON.parse(raw);
    events.push(enrichedEvent);
    await fs.writeFile(EVENTS_FILE, JSON.stringify(events, null, 2), "utf-8");

    // Crear cookie de sesión si no existe
    const response = NextResponse.json({ ok: true });
    if (!request.cookies.get("o247_session")) {
      response.cookies.set("o247_session", enrichedEvent.sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30, // 30 días
        path: "/",
      });
    }

    return response;
  } catch (err) {
    console.error("[Survey API] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// GET para consultar métricas (proteger con auth en producción)
export async function GET() {
  try {
    await ensureFile();
    const raw = await fs.readFile(EVENTS_FILE, "utf-8");
    const events: SurveyEvent[] = JSON.parse(raw);

    // Métricas básicas
    const metrics = {
      total_events: events.length,
      unique_sessions: new Set(events.map(e => e.sessionId)).size,
      section_viewed: events.filter(e => e.event === "o247_survey_section_viewed").length,
      started: events.filter(e => e.event === "o247_survey_started").length,
      completed: events.filter(e => e.event === "o247_survey_completed").length,
      dismissed: events.filter(e => e.event === "o247_survey_dismissed").length,
      ignored: events.filter(e => e.event === "o247_survey_ignored").length,
      skips_by_question: {} as Record<string, number>,
      answers_by_question: {} as Record<string, Record<string, number>>,
      completion_rate: 0,
      engagement_rate: 0,
    };

    // Detalle por pregunta
    events.forEach(e => {
      if (e.event === "o247_survey_skip" && typeof e.questionId === "string") {
        metrics.skips_by_question[e.questionId] = (metrics.skips_by_question[e.questionId] || 0) + 1;
      }
      if (e.event === "o247_survey_answer" && typeof e.questionId === "string" && typeof e.optionId === "string") {
        if (!metrics.answers_by_question[e.questionId]) {
          metrics.answers_by_question[e.questionId] = {};
        }
        metrics.answers_by_question[e.questionId][e.optionId] =
          (metrics.answers_by_question[e.questionId][e.optionId] || 0) + 1;
      }
    });

    // Ratios
    if (metrics.section_viewed > 0) {
      metrics.engagement_rate = Math.round((metrics.started / metrics.section_viewed) * 100);
    }
    if (metrics.started > 0) {
      metrics.completion_rate = Math.round((metrics.completed / metrics.started) * 100);
    }

    return NextResponse.json(metrics);
  } catch (err) {
    console.error("[Survey API] Metrics error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

function generateSessionId(): string {
  return `s_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}