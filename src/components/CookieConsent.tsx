"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000); // Un poco más de delay
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "circOut" }}
          className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-4"
        >
          {/* Usamos bg-white puro para que resalte sobre el fondo bg-bone */}
          <div className="bg-white rounded-full shadow-[0_10px_30px_rgba(37,52,63,0.15)] py-3 px-6 md:px-8 flex flex-col md:flex-row items-center gap-4 md:gap-8 border border-bone/50 max-w-xl w-full md:w-auto">
            
            <p className="text-gunmetal text-xs md:text-sm font-medium text-center md:text-left">
              This website uses <span className="font-bold text-sunset">cookies</span> to optimize your travel planning adventure.
            </p>

            <div className="flex items-center gap-3 w-full md:w-auto justify-center">
                {/* Botón Gunmetal que cambia a Sunset */}
                <button 
                    onClick={() => setIsVisible(false)}
                    className="bg-gunmetal text-white text-[10px] md:text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-full hover:bg-sunset hover:text-gunmetal transition-colors duration-300 w-full md:w-auto"
                >
                    Accept
                </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}