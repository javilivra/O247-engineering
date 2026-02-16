"use client";

import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { ScrollReveal } from "./ScrollReveal";
import TextReveal from "./TextReveal";

const PRINCIPLES = [
  {
    icon: "solar:bag-cross-bold-duotone",
    title: "No vendemos paquetes.",
    description: "No somos una agencia. No cobramos comisión por venderte un hotel o un ticket. La recomendación no cambia según quién paga más.",
    accentColor: "text-sunset",
    accentBg: "bg-sunset/10",
  },
  {
    icon: "solar:sort-from-top-to-bottom-bold-duotone",
    title: "No priorizamos lo que paga más.",
    description: "No hay contenido patrocinado disfrazado de consejo. Si algo es bueno, lo decimos. Si algo no vale la pena, también.",
    accentColor: "text-celeste",
    accentBg: "bg-celeste/10",
  },
  {
    icon: "solar:chat-round-unread-bold-duotone",
    title: "No recomendamos sin explicar.",
    description: "Cada sugerencia tiene un porqué visible. Si decimos que tal fecha es mejor, te mostramos la razón. Vos decidís.",
    accentColor: "text-emerald-400",
    accentBg: "bg-emerald-500/10",
  },
  {
    icon: "solar:list-cross-bold-duotone",
    title: "No convertimos tu viaje en una lista infinita.",
    description: "Menos es más. Priorizamos lo que realmente impacta tu experiencia. El objetivo es claridad, no saturación.",
    accentColor: "text-purple-400",
    accentBg: "bg-purple-500/10",
  },
];

export default function Differentiators() {
  return (
    <section className="py-28 px-6 md:px-12 lg:px-24 bg-gunmetal relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.03] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header — left aligned */}
        <div className="mb-16">
          <ScrollReveal>
            <span className="type-tech text-[10px] text-white/30 uppercase tracking-widest mb-4 block">
              Nuestros principios
            </span>
          </ScrollReveal>
          <TextReveal className="type-display text-4xl md:text-5xl text-white mb-6 leading-tight" staggerSpeed={20}>
            Qué hace diferente a O247.
          </TextReveal>
          <ScrollReveal delay={0.4}>
            <p className="type-body text-lg text-white/50 max-w-2xl leading-relaxed">
              La diferencia no está en tener más información. Está en cómo se organiza.
            </p>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRINCIPLES.map((principle, index) => (
            <ScrollReveal key={index} delay={index * 0.12} width="100%">
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="group bg-white/[0.04] backdrop-blur-sm rounded-2xl p-8 border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.07] transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className={`shrink-0 w-12 h-12 rounded-xl ${principle.accentBg} flex items-center justify-center`}>
                    <Icon icon={principle.icon} className={`w-6 h-6 ${principle.accentColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white mb-2">{principle.title}</h3>
                    <p className="type-body text-sm text-white/50 leading-relaxed">{principle.description}</p>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Closing */}
        <ScrollReveal delay={0.5}>
          <div className="mt-16 pt-16 border-t border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-white/10" />
              <Icon icon="solar:verified-check-bold" width={20} className="text-sunset" />
              <div className="h-px w-12 bg-white/10" />
            </div>
            <p className="type-body text-lg text-white/60 max-w-xl leading-relaxed">
              Explicamos el contexto. Mostramos el criterio. Priorizamos claridad sobre urgencia.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}