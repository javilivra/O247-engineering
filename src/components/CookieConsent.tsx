"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/Icon";

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
        initial={{ y: 50, x: 50, opacity: 0 }}
        animate={{ y: 0, x: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-5 right-5 z-[9990] w-full max-w-sm"
      >
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(24px) saturate(200%)',
            WebkitBackdropFilter: 'blur(24px) saturate(200%)',
            border: '1px solid rgba(255,255,255,0.7)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.9) inset, 0 -1px 0 rgba(0,0,0,0.04) inset',
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
            style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.95) 40%, rgba(255,255,255,0.6) 70%, transparent)' }} />

          <div className="p-5">
            <div className="flex items-start gap-3.5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0 mt-0.5"
                style={{
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                }}
              >
                <span style={{ color: 'rgb(239, 68, 68)', display: 'inline-flex', filter: 'drop-shadow(0 0 4px rgba(239, 68, 68,0.4))' }}>
                  <Icon icon="solar:cookie-bold-duotone" width={22} />
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-gray-900 mb-0.5" style={{ color: '#25343F' }}>Tu privacidad importa</h3>
                <p className="text-xs text-gray-600 leading-snug" style={{ color: '#52606D' }}>
                  Usamos cookies para que el sitio funcione y para entender cómo mejorarlo. Podés aceptar todas o solo las esenciales.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <button onClick={acceptAll} className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-bold hover:bg-gray-800 transition-colors active:scale-[0.98]">
                Aceptar todas
              </button>
              <button onClick={rejectAll} className="flex-1 px-4 py-2 bg-white/60 backdrop-blur-sm border border-white/80 text-gray-800 rounded-lg text-xs font-bold hover:bg-white/80 transition-colors active:scale-[0.98]">
                Solo esenciales
              </button>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="h-full px-2.5 text-gray-500 hover:text-gray-800 transition-colors flex items-center justify-center rounded-lg hover:bg-black/5"
              >
                <Icon icon={showDetails ? "solar:close-circle-line-duotone" : "solar:settings-bold-duotone"} width={18} />
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
                style={{ background: 'rgba(0,0,0,0.02)', borderTop: '1px solid rgba(0,0,0,0.05)' }}
              >
                <div className="px-5 py-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-gray-800">Esenciales</span>
                      <p className="text-[11px] text-gray-500 mt-0">Necesarias para que el sitio funcione.</p>
                    </div>
                    <div className="w-10 h-5 bg-emerald-500 rounded-full relative opacity-50 cursor-not-allowed">
                      <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-gray-800">Analíticas</span>
                       <p className="text-[11px] text-gray-500 mt-0">Ayudan a entender qué es más útil.</p>
                    </div>
                    <button
                      onClick={() => setConsent(prev => ({ ...prev, analytics: !prev.analytics }))}
                      className={`w-10 h-5 rounded-full relative transition-colors duration-200 ${consent.analytics ? "bg-emerald-500" : "bg-black/20"}`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-200 ${consent.analytics ? "right-0.5" : "left-0.5"}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-gray-800">Marketing</span>
                      <p className="text-[11px] text-gray-500 mt-0">Miden la efectividad de campañas.</p>
                    </div>
                    <button
                      onClick={() => setConsent(prev => ({ ...prev, marketing: !prev.marketing }))}
                      className={`w-10 h-5 rounded-full relative transition-colors duration-200 ${consent.marketing ? "bg-emerald-500" : "bg-black/20"}`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-200 ${consent.marketing ? "right-0.5" : "left-0.5"}`} />
                    </button>
                  </div>

                  <div className="pt-2 mt-2 border-t border-black/5 flex items-center justify-between">
                     <button onClick={saveCustom} className="px-4 py-1.5 bg-gray-900 text-white rounded-md text-[11px] font-bold hover:bg-gray-800 transition-all active:scale-[0.98]">
                      Guardar
                    </button>
                    <a href="/privacy" className="text-[10px] text-gray-400 hover:text-gray-600 uppercase tracking-widest transition-colors">
                      Política de Privacidad
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
