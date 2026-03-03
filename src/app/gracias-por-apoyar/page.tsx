"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Check } from "lucide-react";

export default function GraciasPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent]   = useState(false);

  const handleSubscribe = () => {
    if (!email) return;
    // TODO Fase 2: conectar Resend / Mailchimp
    console.log("Lead capturado:", email);
    setSent(true);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16" style={{ background: "#F7F7F5" }}>
      <div className="w-full max-w-md">

        {/* Stripe decorativa */}
        <div className="h-1 w-20 mx-auto rounded-full mb-10" style={{ background: "linear-gradient(90deg, #FF7043, #FFD54F, #00B4D8)" }} />

        {/* Icono + título */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl mx-auto flex items-center justify-center mb-5"
            style={{ background: "rgba(255,112,67,0.07)", border: "1.5px solid rgba(255,112,67,0.18)" }}>
            <span className="text-3xl">✨</span>
          </div>
          <h1 className="text-2xl font-semibold mb-3" style={{ color: "#25343F", letterSpacing: "-0.025em" }}>
            Gracias por impulsar la magia.
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(37,52,63,0.58)", maxWidth: 300, margin: "0 auto" }}>
            Tu apoyo nos permite seguir mejorando la experiencia y creando contenido útil para toda la comunidad.
          </p>
        </div>

        {/* Recurso descargable */}
        <div className="rounded-2xl p-5 mb-4"
          style={{ background: "white", border: "1.5px solid rgba(37,52,63,0.08)", boxShadow: "0 4px 20px rgba(37,52,63,0.06)" }}>
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
              style={{ background: "rgba(0,180,216,0.07)", border: "1.5px solid rgba(0,180,216,0.18)" }}>
              <span className="text-xl">🪄</span>
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-bold tracking-widest uppercase mb-0.5" style={{ color: "rgba(37,52,63,0.3)" }}>
                Recurso exclusivo
              </div>
              <div className="text-sm font-semibold mb-1" style={{ color: "#25343F" }}>
                Mini Glosario Disney & Universal
              </div>
              <div className="text-xs leading-relaxed" style={{ color: "rgba(37,52,63,0.5)" }}>
                Lightning Lane, Genie+, Rope Drop, Express Pass y 10 términos más que necesitás conocer antes de viajar.
              </div>
            </div>
          </div>
          
          <a href="/downloads/glosario-disney-universal-o247.pdf"
            download
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-200"
            style={{ background: "#00B4D8", color: "white", display: "flex" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#0096B7")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#00B4D8")}
          >
            <Download size={14} />
            Descargar PDF gratis
          </a>
        </div>

        {/* Email capture */}
        <div className="rounded-2xl p-5 mb-6"
          style={{ background: "white", border: "1.5px solid rgba(37,52,63,0.08)", boxShadow: "0 4px 20px rgba(37,52,63,0.06)" }}>
          {!sent ? (
            <>
              <div className="text-sm font-medium mb-1" style={{ color: "#25343F" }}>
                ¿Querés recibir actualizaciones y recursos exclusivos?
              </div>
              <div className="text-xs mb-4" style={{ color: "rgba(37,52,63,0.42)" }}>
                Guías nuevas, alertas de parques y herramientas antes que nadie. Sin spam.
              </div>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  placeholder="tu@email.com"
                  className="flex-1 text-sm px-3 py-2.5 rounded-lg outline-none"
                  style={{ border: "1.5px solid rgba(37,52,63,0.11)", background: "rgba(37,52,63,0.03)", color: "#25343F" }}
                />
                <button
                  onClick={handleSubscribe}
                  disabled={!email}
                  style={{
                    background: email ? "#FF7043" : "rgba(37,52,63,0.07)",
                    color: email ? "white" : "rgba(37,52,63,0.28)",
                    padding: "10px 16px", borderRadius: 10, fontSize: 13,
                    fontWeight: 500, border: "none",
                    cursor: email ? "pointer" : "not-allowed",
                    flexShrink: 0,
                  }}
                >
                  Suscribirme
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center gap-2 py-2">
              <Check size={15} style={{ color: "#FF7043" }} />
              <span className="text-sm font-medium" style={{ color: "#FF7043" }}>
                ¡Listo! Te avisamos cuando haya novedades.
              </span>
            </div>
          )}
        </div>

        {/* Volver */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-sm" style={{ color: "rgba(37,52,63,0.38)" }}>
            <ArrowLeft size={13} /> Volver al inicio
          </Link>
        </div>

      </div>
    </main>
  );
}