"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
// DESPUÉS (O247 Icon System — LOCAL, FUNCIONA SIEMPRE)
import { Icon } from "@/components/Icon";
import TextReveal from "./TextReveal";

const faqs = [
  {
    question: "¿Esto reemplaza a un agente de viajes?",
    answer: "No. O247 te da la información y el criterio para tomar decisiones informadas. Un agente ejecuta reservas. Nosotros te enseñamos a entender el destino para que reserves mejor, con o sin agente."
  },
  {
    question: "¿Necesito usar inteligencia artificial?",
    answer: "No. Hoy la plataforma es 100% contenido estructurado que podés leer y aplicar a tu ritmo. Estamos trabajando en herramientas futuras, pero no son necesarias para planificar bien."
  },
  {
    question: "¿O247 es gratis?",
    answer: "Todo el contenido informativo y las guías de planificación son de acceso libre. No hay muros de pago ni contenido bloqueado. En el futuro vamos a ofrecer herramientas avanzadas con costo, pero las anunciaremos con transparencia."
  },
  {
    question: "¿Es solo para Disney o cubre Universal también?",
    answer: "Cubrimos Disney World y Universal Studios Orlando. Cada parque tiene su propia estructura de contenido, con la misma profundidad y nivel de detalle."
  },
  {
    question: "¿Qué pasa si ya viajé antes a Orlando?",
    answer: "Mejor todavía. Mucha información se actualiza año a año: Lightning Lane cambió, Epic Universe abrió, precios se ajustaron. Incluso si ya fuiste, hay decisiones que probablemente podrías tomar mejor."
  },
  {
    question: "¿Funciona si improviso y no sigo un plan estricto?",
    answer: "Sí. No necesitás seguir nada al pie de la letra. La idea es que entiendas cómo funciona el destino para que, incluso improvisando, tomes mejores decisiones. Saber por qué un día es mejor que otro ya es una ventaja enorme."
  },
  {
    question: "¿Tengo que registrarme para usar O247?",
    answer: "No. Podés explorar todo el contenido sin crear cuenta. El registro va a estar disponible más adelante para funcionalidades avanzadas, pero nunca va a ser obligatorio para acceder a la información."
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="faq" className="py-28 px-6 md:px-12 lg:px-24 bg-bone relative">
      <div className="max-w-5xl mx-auto">

        {/* Header — left aligned */}
        <div className="mb-16">
          <ScrollReveal>
            <span className="type-tech text-[10px] text-gunmetal/40 uppercase tracking-widest mb-4 block">
              Preguntas frecuentes
            </span>
          </ScrollReveal>
          <TextReveal className="type-display text-4xl md:text-5xl text-gunmetal mb-6 leading-tight" staggerSpeed={18}>
            Antes de seguir, resolvamos dudas.
          </TextReveal>
          <ScrollReveal delay={0.3}>
            <p className="type-body text-lg text-gunmetal/60 max-w-xl">
              Claridad sin defensiva. Seguridad sin exageración.
            </p>
          </ScrollReveal>
        </div>

        {/* List */}
        <ScrollReveal width="100%" stagger={0.1}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`mb-3 last:mb-0 group rounded-2xl border transition-all duration-300 overflow-hidden bg-white ${
                  isOpen ? "border-gunmetal/15 shadow-lg" : "border-gunmetal/5 hover:border-gunmetal/15"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                  data-cursor-hover
                >
                  <span className={`type-display text-lg md:text-xl transition-colors duration-300 pr-4 ${
                    isOpen ? "text-gunmetal" : "text-gunmetal/80"
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    isOpen ? "bg-gunmetal border-gunmetal text-white rotate-45" : "bg-bone border-gunmetal/10 text-gunmetal/40 group-hover:border-gunmetal/30"
                  }`}>
                    <Icon icon="solar:add-circle-linear" width={20} className="transition-transform duration-300" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-6 md:px-8 pb-8 pt-0">
                        <p className="type-body text-gunmetal/60 leading-relaxed max-w-2xl">
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