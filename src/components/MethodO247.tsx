"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// DESPUÉS (O247 Icon System — LOCAL, FUNCIONA SIEMPRE)
import { Icon } from "@/components/Icon";
import { ScrollReveal } from "./ScrollReveal";
import TextReveal from "./TextReveal";

// ============================================================
// DATA
// ============================================================

const METHOD_STEPS = [
  {
    id: "context",
    number: "01",
    title: "Entender tu tipo de viaje",
    summary: "Las decisiones correctas dependen del contexto.",
    body: "Primera vez no es lo mismo que quinta vez. Viaje con niños no es lo mismo que viaje en pareja. Viaje de 3 días no es lo mismo que viaje de 10. Antes de recomendar nada, necesitamos entender desde dónde empezás.",
    icon: "solar:compass-bold-duotone",
    accent: "from-celeste/15 to-celeste/5",
    accentText: "text-celeste",
  },
  {
    id: "priorities",
    number: "02",
    title: "Ordenar decisiones según impacto",
    summary: "Primero lo que mueve el sistema. Después los detalles.",
    body: "No todo tiene la misma importancia. Elegir bien las fechas tiene más impacto que elegir dónde almorzar. Reservar ciertos restaurantes con 60 días de anticipación cambia la experiencia completa. Nosotros separamos lo urgente de lo secundario.",
    icon: "solar:sort-vertical-bold-duotone",
    accent: "from-sunset/15 to-sunset/5",
    accentText: "text-sunset",
  },
  {
    id: "errors",
    number: "03",
    title: "Reducir errores antes de reservar",
    summary: "Menos errores evitables. Más claridad antes de confirmar.",
    body: "El problema no es no saber todo. El problema es tomar decisiones en desorden. Comprar tickets antes de elegir fechas. Reservar hotel sin entender las zonas. Llegar al parque sin saber cómo funciona Lightning Lane. Cada error se paga con tiempo o con plata.",
    icon: "solar:shield-check-bold-duotone",
    accent: "from-emerald-500/15 to-emerald-500/5",
    accentText: "text-emerald-600",
  },
];

// ============================================================
// COMPONENT
// ============================================================

export default function MethodO247() {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  return (
    <section className="py-28 px-6 md:px-12 lg:px-24 bg-bone relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header — left aligned */}
        <div className="mb-16">
          <ScrollReveal>
            <span className="type-tech text-[10px] text-gunmetal/40 uppercase tracking-widest mb-4 block">
              Nuestro enfoque
            </span>
          </ScrollReveal>
          <TextReveal className="type-display text-4xl md:text-5xl text-gunmetal mb-6 leading-tight" staggerSpeed={18}>
            El Método O247.
          </TextReveal>
          <ScrollReveal delay={0.4}>
            <p className="type-body text-lg text-gunmetal/60 max-w-2xl leading-relaxed">
              No improvisamos. No acumulamos tips sueltos. Aplicamos un criterio estructurado para que cada decisión tenga sentido.
            </p>
          </ScrollReveal>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {METHOD_STEPS.map((step, index) => {
            const isOpen = activeStep === step.id;

            return (
              <ScrollReveal key={step.id} delay={index * 0.15} width="100%">
                <motion.div
                  layout
                  className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${
                    isOpen ? "border-gunmetal/15 shadow-lg" : "border-gunmetal/5 hover:border-gunmetal/15 hover:shadow-md"
                  }`}
                >
                  <button
                    onClick={() => setActiveStep(isOpen ? null : step.id)}
                    className="w-full p-8 md:p-10 flex items-start gap-6 text-left group"
                    data-cursor-hover
                  >
                    <div className={`shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.accent} flex items-center justify-center transition-transform duration-300 ${isOpen ? "scale-110" : "group-hover:scale-105"}`}>
                      <Icon icon={step.icon} className={`w-7 h-7 ${step.accentText}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="type-tech text-[10px] text-gunmetal/30 uppercase tracking-widest font-bold block mb-2">
                        {step.number}
                      </span>
                      <h3 className={`type-display text-xl md:text-2xl text-gunmetal mb-2 transition-colors duration-300 ${isOpen ? step.accentText : ""}`}>
                        {step.title}
                      </h3>
                      <p className="type-body text-sm text-gunmetal/50 leading-relaxed">
                        {step.summary}
                      </p>
                    </div>

                    <div className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 mt-1 ${
                      isOpen ? "bg-gunmetal border-gunmetal text-white rotate-45" : "bg-bone border-gunmetal/10 text-gunmetal/40"
                    }`}>
                      <Icon icon="solar:add-circle-linear" width={20} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                      >
                        <div className="px-8 md:px-10 pb-10 pt-0 md:pl-[calc(2.5rem+4rem+1.5rem)]">
                          <div className={`w-12 h-0.5 rounded-full bg-gradient-to-r ${step.accent} mb-5`} />
                          <p className="type-body text-gunmetal/70 leading-relaxed text-base max-w-2xl">
                            {step.body}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}