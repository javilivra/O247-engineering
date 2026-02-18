"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@/components/Icon";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// --- DATA: SECCIONES DE LOS TÉRMINOS ---
const TERMS_SECTIONS = [
  {
    id: "intro",
    title: "01. Protocolo de Acceso",
    content: (
      <>
        <p>
          Bienvenido a <strong>O247 Engineering</strong>. Al acceder, navegar o utilizar nuestro sistema de planificación y herramientas de ingeniería de viaje, usted acepta estar vinculado por estos Términos y Condiciones.
        </p>
        <p>
          Si no está de acuerdo con alguna parte de estos términos, debe detener el uso de nuestros servicios inmediatamente. Estos términos constituyen un acuerdo legalmente vinculante entre usted (el "Usuario") y O247 Engineering.
        </p>
      </>
    ),
  },
  {
    id: "disclaimer",
    title: "02. Descargo de Responsabilidad (Disclaimer)",
    content: (
      <>
        <p>
          <strong>No afiliación oficial:</strong> O247 Engineering es un proyecto independiente de planificación y optimización. No estamos afiliados, asociados, autorizados, respaldados ni conectados oficialmente de ninguna manera con The Walt Disney Company, Universal Studios, o cualquiera de sus subsidiarias o afiliadas.
        </p>
        <p>
          <strong>Naturaleza de los Datos:</strong> Todas las estimaciones de tiempos de espera, afluencia de multitudes y cálculos de costos son proyecciones basadas en datos históricos y algoritmos propios. O247 no garantiza la exactitud en tiempo real de estas predicciones, ya que las operaciones de los parques pueden variar por clima, mantenimiento o decisiones operativas imprevistas.
        </p>
      </>
    ),
  },
  {
    id: "ip",
    title: "03. Propiedad Intelectual",
    content: (
      <>
        <p>
          Todo el contenido, la arquitectura de la información, los algoritmos de planificación ("The Core"), el diseño visual, los logotipos y el código fuente presentes en este sitio son propiedad exclusiva de <strong>Javier & Carolina / O247 Engineering</strong> y están protegidos por leyes internacionales de derechos de autor.
        </p>
        <p>
          Se prohíbe estrictamente la reproducción, distribución o ingeniería inversa de cualquier parte de este sitio sin nuestro consentimiento expreso por escrito.
        </p>
      </>
    ),
  },
  {
    id: "usage",
    title: "04. Uso Aceptable",
    content: (
      <>
        <p>
          Usted se compromete a utilizar nuestro sitio solo para fines legales y de planificación personal. Está prohibido:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-sunset">
          <li>Utilizar bots, scrapers o métodos automatizados para extraer datos de nuestro sistema.</li>
          <li>Intentar vulnerar la seguridad o autenticación del sitio.</li>
          <li>Utilizar nuestra marca para engañar a terceros o hacerse pasar por representantes de O247.</li>
        </ul>
      </>
    ),
  },
  {
    id: "liability",
    title: "05. Limitación de Responsabilidad",
    content: (
      <>
        <p>
          En la medida máxima permitida por la ley aplicable, O247 Engineering no será responsable de ningún daño indirecto, incidental, especial o consecuente (incluyendo, entre otros, la pérdida de disfrute de su viaje, costos adicionales incurridos en el parque o cambios en las operaciones de las atracciones) que surjan del uso de nuestra información.
        </p>
        <p>
          Nuestra responsabilidad se limita estrictamente a la provisión de la herramienta de software "tal cual" (as-is).
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "06. Modificaciones del Sistema",
    content: (
      <>
        <p>
          Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto del servicio en cualquier momento. Asimismo, podemos actualizar estos Términos y Condiciones periódicamente. Es su responsabilidad revisar esta página para estar al tanto de los cambios.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("intro");

  // Función para scroll suave
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      // Ajuste de offset por el Navbar fijo
      const y = element.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <main className="bg-bone min-h-screen">
      <Navbar />

      {/* HEADER SIMPLE */}
      <section className="pt-40 pb-16 px-6 border-b border-gunmetal/5">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gunmetal/5 border border-gunmetal/10 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-sunset"></span>
            <span className="type-tech text-[10px] text-gunmetal uppercase tracking-widest font-bold">
              Legal Framework
            </span>
          </div>
          <h1 className="type-display text-4xl md:text-6xl text-gunmetal mb-4">
            Términos y Condiciones
          </h1>
          <p className="type-body text-gunmetal/60 text-lg max-w-2xl">
            Protocolos de uso y lineamientos legales para operar dentro del ecosistema O247.
            <br />
            <span className="font-mono text-xs text-gunmetal/40 mt-2 block">
              ÚLTIMA ACTUALIZACIÓN DEL SISTEMA: 09 FEBRERO 2026
            </span>
          </p>
        </div>
      </section>

      {/* CONTENT GRID */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* SIDEBAR DE NAVEGACIÓN (Sticky) */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-32">
              <h3 className="type-tech text-xs text-gunmetal/40 uppercase tracking-widest mb-6 font-bold">
                Índice de Contenidos
              </h3>
              <nav className="flex flex-col gap-1 border-l border-gunmetal/10">
                {TERMS_SECTIONS.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`text-left px-4 py-3 text-sm font-bold transition-all duration-300 border-l-2 -ml-[2px] ${
                      activeSection === section.id
                        ? "border-sunset text-gunmetal bg-white/50"
                        : "border-transparent text-gunmetal/40 hover:text-gunmetal/70 hover:border-gunmetal/20"
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>

              {/* Botón de Contacto Rápido */}
              <div className="mt-10 p-6 bg-white rounded-2xl border border-gunmetal/5 shadow-sm">
                <Icon icon="solar:question-circle-bold-duotone" className="text-sunset w-8 h-8 mb-3" />
                <p className="text-sm text-gunmetal font-bold mb-1">¿Dudas legales?</p>
                <p className="text-xs text-gunmetal/60 mb-4">Escríbenos directamente.</p>
                <Link 
                  href="/contact" 
                  className="text-[10px] font-mono font-bold uppercase tracking-widest text-gunmetal border-b border-gunmetal/20 hover:border-sunset hover:text-sunset transition-all"
                >
                  Contactar Soporte -&gt;
                </Link>
              </div>
            </div>
          </div>

          {/* CONTENIDO PRINCIPAL */}
          <div className="lg:col-span-8 space-y-16">
            {TERMS_SECTIONS.map((section) => (
              <motion.div 
                key={section.id} 
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                onViewportEnter={() => setActiveSection(section.id)}
                className="scroll-mt-32"
              >
                <h2 className="type-display text-2xl md:text-3xl text-gunmetal mb-6">
                  {section.title}
                </h2>
                <div className="type-body text-gunmetal/70 leading-relaxed space-y-6 text-base md:text-lg">
                  {section.content}
                </div>
              </motion.div>
            ))}

            {/* Cierre */}
            <div className="pt-12 border-t border-gunmetal/10 mt-12">
              <p className="text-sm text-gunmetal/50">
                Al continuar utilizando <strong>O247 Engineering</strong>, reconoces que has leído y entendido estos protocolos.
              </p>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}