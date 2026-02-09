"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Icono de Check animado
const AnimatedCheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <motion.path
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      d="M20 6L9 17l-5-5"
    />
  </svg>
);

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  useEffect(() => {
    // 1. Verificamos si ya existe el consentimiento guardado
    const hasConsent = localStorage.getItem("O247_COOKIE_CONSENT");
    
    // Si NO hay consentimiento previo, mostramos el banner tras 2.5s
    if (!hasConsent) {
        const timer = setTimeout(() => setIsVisible(true), 2500);
        return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    // 2. Guardamos la decisión en el navegador (Persistencia)
    localStorage.setItem("O247_COOKIE_CONSENT", "true");
    
    setIsAccepted(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 1200);
  };

  const handleReject = () => {
    // Opcional: Guardar rechazo para no volver a preguntar en X tiempo
    // Por ahora, simplemente cerramos:
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "circOut" }}
          className="fixed bottom-6 left-0 right-0 z-[60] flex justify-center px-4"
        >
          <div className="bg-white/90 backdrop-blur-md rounded-full shadow-[0_10px_30px_rgba(37,52,63,0.12)] border border-gunmetal/5 flex flex-col md:flex-row items-center gap-4 md:gap-6 pl-6 pr-2 py-2 max-w-2xl w-full md:w-auto">
            
            <p className="type-body text-[11px] md:text-xs font-medium text-center md:text-left text-gunmetal/80 leading-tight md:mr-2 py-2 md:py-0">
              Utilizamos cookies para <span className="font-bold text-sunset">calibrar la precisión</span> de tu experiencia.
            </p>

            <div className="flex items-center gap-1 w-full md:w-auto justify-center md:justify-end">
                <button 
                    onClick={handleReject}
                    className="type-tech text-[10px] font-bold uppercase tracking-wider text-gunmetal/40 hover:text-gunmetal/80 px-4 py-2 transition-colors duration-200"
                >
                    Rechazar
                </button>

                <button 
                    onClick={handleAccept}
                    disabled={isAccepted}
                    className={`type-tech relative flex items-center justify-center text-[10px] font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-sm min-w-[100px]
                      ${isAccepted 
                        ? "bg-sunset text-gunmetal px-5 py-2" 
                        : "bg-gunmetal text-white hover:bg-sunset hover:text-gunmetal px-5 py-2" 
                      }`}
                >
                    <AnimatePresence mode="wait">
                      {isAccepted ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <span className="sr-only">Aceptado</span>
                          <AnimatedCheckIcon />
                        </motion.div>
                      ) : (
                        <motion.span
                          key="text"
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.1 }}
                        >
                          ACEPTAR
                        </motion.span>
                      )}
                    </AnimatePresence>
                </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}