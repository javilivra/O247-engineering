"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

// ============================================================
// COOKIE HELPERS
// ============================================================

const COOKIE_NAME = "o247_consent";
const COOKIE_EXPIRY_DAYS = 365;

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`;
}

interface ConsentState {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
};

// ============================================================
// COMPONENT
// ============================================================

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentState>(DEFAULT_CONSENT);

  useEffect(() => {
    const stored = getCookie(COOKIE_NAME);
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
    try {
      const parsed = JSON.parse(stored) as ConsentState;
      setConsent(parsed);
      applyConsent(parsed);
    } catch {
      setVisible(true);
    }
  }, []);

  const applyConsent = (state: ConsentState) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("o247:consent", { detail: state }));
    }
    if (!state.analytics && typeof window !== "undefined") {
      (window as any)["ga-disable-GA_MEASUREMENT_ID"] = true;
    }
  };

  const saveConsent = (state: ConsentState) => {
    setCookie(COOKIE_NAME, JSON.stringify(state), COOKIE_EXPIRY_DAYS);
    setConsent(state);
    applyConsent(state);
    setVisible(false);
  };

  const acceptAll = () => saveConsent({ necessary: true, analytics: true, marketing: true });
  const rejectAll = () => saveConsent({ necessary: true, analytics: false, marketing: false });
  const saveCustom = () => saveConsent(consent);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed bottom-0 left-0 right-0 z-[9990] p-4 md:p-6"
      >
        <div className="max-w-3xl mx-auto bg-gunmetal rounded-2xl shadow-2xl border border-white/5 overflow-hidden">

          <div className="p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mt-0.5">
                <Icon icon="solar:cookie-bold-duotone" width={22} className="text-sunset" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-white mb-1">Tu privacidad importa</h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  Usamos cookies esenciales para que el sitio funcione. Las opcionales nos ayudan a entender cómo usás O247 para poder mejorarlo.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-6">
              <button onClick={acceptAll} className="px-6 py-2.5 bg-white text-gunmetal rounded-full text-sm font-bold hover:bg-white/90 transition-colors active:scale-[0.98]">
                Aceptar todas
              </button>
              <button onClick={rejectAll} className="px-6 py-2.5 bg-white/10 text-white rounded-full text-sm font-bold hover:bg-white/20 transition-colors border border-white/10 active:scale-[0.98]">
                Solo esenciales
              </button>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-xs text-white/40 hover:text-white/70 font-bold uppercase tracking-widest transition-colors flex items-center gap-1.5 ml-auto"
              >
                <Icon icon={showDetails ? "solar:alt-arrow-up-linear" : "solar:settings-linear"} width={14} />
                {showDetails ? "Cerrar" : "Personalizar"}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
              >
                <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-white/5 pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold text-white">Esenciales</span>
                      <p className="text-xs text-white/40 mt-0.5">Necesarias para que el sitio funcione.</p>
                    </div>
                    <div className="w-11 h-6 bg-emerald-500 rounded-full relative opacity-60 cursor-not-allowed">
                      <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold text-white">Analíticas</span>
                      <p className="text-xs text-white/40 mt-0.5">Nos ayudan a entender qué secciones son más útiles.</p>
                    </div>
                    <button
                      onClick={() => setConsent(prev => ({ ...prev, analytics: !prev.analytics }))}
                      className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${consent.analytics ? "bg-emerald-500" : "bg-white/20"}`}
                    >
                      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all duration-200 ${consent.analytics ? "right-0.5" : "left-0.5"}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold text-white">Marketing</span>
                      <p className="text-xs text-white/40 mt-0.5">Permiten medir la efectividad de campañas.</p>
                    </div>
                    <button
                      onClick={() => setConsent(prev => ({ ...prev, marketing: !prev.marketing }))}
                      className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${consent.marketing ? "bg-emerald-500" : "bg-white/20"}`}
                    >
                      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all duration-200 ${consent.marketing ? "right-0.5" : "left-0.5"}`} />
                    </button>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <button onClick={saveCustom} className="px-6 py-2.5 bg-sunset text-white rounded-full text-sm font-bold hover:brightness-110 transition-all active:scale-[0.98]">
                      Guardar preferencias
                    </button>
                    <a href="/privacy" className="text-[10px] text-white/30 hover:text-white/50 uppercase tracking-widest transition-colors">
                      Política de privacidad
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}