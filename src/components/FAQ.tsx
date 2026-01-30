"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { Icon } from "@iconify/react";

// DATA: Preguntas alineadas a la narrativa O247
const faqs = [
  {
    question: "¿O247 reserva los tickets por mí?",
    answer: "Nosotros diseñamos la estrategia y te decimos exactamente qué comprar y cuándo. Te damos los enlaces oficiales directos. Tú tienes el control final de la transacción, nosotros aseguramos la precisión de la elección."
  },
  {
    question: "¿Cómo funciona el cálculo de filas en tiempo real?",
    answer: "Nuestro motor 'Gate' escanea las APIs oficiales de los parques cada 30 segundos y cruza esos datos con históricos de los últimos 5 años. Esto nos permite predecir 'ventanas de oportunidad' invisibles para la app oficial."
  },
  {
    question: "¿Sirve si viajo con niños pequeños?",
    answer: "Absolutamente. El algoritmo tiene un modo 'Low Pace' específico para familias. Prioriza descansos, ubicaciones de baños y atracciones sin restricciones de altura, evitando caminatas innecesarias."
  },
  {
    question: "¿Qué pasa si llueve y se cierran atracciones?",
    answer: "El sistema es reactivo. Si una atracción marcada en tu ruta se detiene, recibirás una notificación instantánea con una ruta alternativa recalculada para que no pierdas tiempo esperando bajo la lluvia."
  },
  {
    question: "¿Es una suscripción mensual o pago único?",
    answer: "Creemos en la flexibilidad. Puedes pagar por 'Itinerario Único' para un viaje específico, o tener una suscripción anual si eres un viajero frecuente o agente de viajes."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Variante simple para los items hijos (la animación la controla el ScrollReveal padre)
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    // ID="faq" es CRÍTICO para el scroll desde el Navbar
    <section id="faq" className="py-24 bg-bone relative">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header con ScrollReveal simple */}
        <ScrollReveal>
          <div className="mb-16 text-center md:text-left">
            <span className="type-tech text-sunset text-xs uppercase tracking-widest mb-2 block">
              Soporte & Dudas
            </span>
            <h2 className="type-display text-4xl md:text-5xl text-gunmetal">
              Resolviendo incógnitas.
            </h2>
          </div>
        </ScrollReveal>

        {/* LISTA CON EFECTO CASCADA (Stagger) */}
        {/* Envolvemos todo en un ScrollReveal con stagger definido */}
        <ScrollReveal width="100%" stagger={0.15}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div 
                key={index}
                variants={itemVariants} // Hereda el control del padre
                className={`
                  mb-4 last:mb-0 group rounded-2xl border transition-all duration-300 overflow-hidden bg-white
                  ${isOpen ? "border-sunset/30 shadow-lg shadow-sunset/5" : "border-gunmetal/5 hover:border-gunmetal/20"}
                `}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                >
                  <span className={`type-display text-lg md:text-xl transition-colors duration-300 ${isOpen ? "text-sunset" : "text-gunmetal"}`}>
                    {faq.question}
                  </span>
                  
                  {/* ICONO ANIMADO (+ / -) Estilo Averi */}
                  <div className={`
                    relative w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300
                    ${isOpen ? "bg-sunset border-sunset text-white rotate-45" : "bg-bone border-gunmetal/10 text-gunmetal group-hover:border-gunmetal/30"}
                  `}>
                    <Icon icon="solar:add-circle-linear" width="24" className="transition-transform duration-300" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }} // Curva Bezier suave tipo Averi
                    >
                      <div className="px-6 md:px-8 pb-8 pt-0">
                        <p className="type-body text-gunmetal/70 leading-relaxed max-w-2xl">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </ScrollReveal>

      </div>
    </section>
  );
}