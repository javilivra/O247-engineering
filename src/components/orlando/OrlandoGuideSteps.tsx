'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@/components/Icon';

const STEPS = [
  {
    id: 1,
    title: 'Llegar a Orlando',
    href: '/orlando/llegada',
    icon: 'solar:plane-bold-duotone',
  },
  {
    id: 2,
    title: 'Cuándo conviene viajar',
    href: '/orlando/cuando-viajar',
    icon: 'solar:calendar-bold-duotone',
  },
  {
    id: 3,
    title: 'Dónde dormir según tu plan',
    href: '/orlando/donde-dormir',
    icon: 'solar:buildings-bold-duotone',
  },
  {
    id: 4,
    title: 'Cómo moverte por la ciudad',
    href: '/orlando/movilidad',
    icon: 'solar:bus-bold-duotone',
  },
  {
    id: 5,
    title: 'Entender las entradas',
    href: '/orlando/tickets',
    icon: 'solar:ticket-bold-duotone',
  },
  {
    id: 6,
    title: 'Qué hacer además de los parques',
    href: '/orlando/experiencia',
    icon: 'solar:stars-bold-duotone',
  },
];

export default function OrlandoGuideSteps() {
  const [active, setActive] = useState(1);

  return (
    <section id="guia" className="max-w-6xl mx-auto px-6 lg:px-12 py-24">
      <h2 className="type-display text-3xl md:text-4xl text-gunmetal text-center mb-16">
        Cómo funciona Orlando en 6 pasos claros
      </h2>

      <div className="flex flex-col gap-6">
        {STEPS.map(step => {
          const isActive = active === step.id;

          return (
            <motion.div
              key={step.id}
              layout
              onClick={() => setActive(step.id)}
              className={`bg-white rounded-3xl p-8 border transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'border-celeste shadow-xl'
                  : 'border-gunmetal/10 hover:border-gunmetal/30'
              }`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-celeste/10 flex items-center justify-center text-celeste">
                  <Icon icon={step.icon} className="w-6 h-6" />
                </div>

                <h3 className="type-display text-xl text-gunmetal">
                  {step.title}
                </h3>
              </div>

              {isActive && (
                <div className="mt-6">
                  <p className="type-body text-sm text-gunmetal/60 mb-6">
                    Introducción estratégica del tema para que el usuario
                    entienda el contexto antes de profundizar.
                  </p>

                  <a
                    href={step.href}
                    className="inline-block px-6 py-3 bg-gunmetal text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-sunset transition-all">
                    Ver guía completa
                  </a>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
