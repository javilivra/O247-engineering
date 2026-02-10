"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// --- DATA: SECCIONES DE PRIVACIDAD ---
const PRIVACY_SECTIONS = [
  {
    id: "collection",
    title: "01. Recolección de Datos",
    content: (
      <>
        <p>
          Para optimizar su ingeniería de viaje, O247 recolecta información limitada y necesaria. Esto incluye:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-sunset">
          <li><strong>Datos de Identidad:</strong> Nombre, correo electrónico (al registrarse o suscribirse).</li>
          <li><strong>Datos de Navegación:</strong> Comportamiento dentro de la app, atracciones visitadas virtualmente y preferencias de configuración para mejorar nuestro algoritmo de recomendación ("The Core").</li>
          <li><strong>Datos Técnicos:</strong> Dirección IP, tipo de navegador y dispositivo, utilizados estrictamente para seguridad y optimización de rendimiento.</li>
        </ul>
      </>
    ),
  },
  {
    id: "usage",
    title: "02. Uso de la Información",
    content: (
      <>
        <p>
          No vendemos sus datos. La información recolectada se utiliza exclusivamente para:
        </p>
        <ol className="list-decimal pl-5 space-y-2 mt-4 marker:text-gunmetal font-medium">
          <li>Calibrar las herramientas de predicción de multitudes personalizadas para su perfil.</li>
          <li>Procesar transacciones y acceso a herramientas premium.</li>
          <li>Enviar actualizaciones críticas sobre el sistema (ej: cambios en Genie+ o cierres de parques).</li>
          <li>Mejorar la infraestructura técnica del sitio.</li>
        </ol>
      </>
    ),
  },
  {
    id: "cookies",
    title: "03. Cookies y Rastreo",
    content: (
      <>
        <p>
          Utilizamos cookies ("Digital Footprints") esenciales para mantener su sesión activa y recordar sus configuraciones de planificación entre visitas.
        </p>
        <p>
          También empleamos cookies analíticas anónimas (Google Analytics) para entender cómo fluye el tráfico en el sitio. Usted puede desactivar estas cookies desde la configuración de su navegador, aunque algunas herramientas de O247 podrían perder funcionalidad.
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    title: "04. Terceros e Integraciones",
    content: (
      <>
        <p>
          O247 opera con proveedores de infraestructura de clase mundial para garantizar la seguridad:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-sunset">
          <li><strong>Pagos:</strong> Procesados externamente vía Stripe/LemonSqueezy. O247 nunca almacena sus datos completos de tarjeta de crédito.</li>
          <li><strong>Autenticación:</strong> Gestionada a través de protocolos seguros (Auth0 / NextAuth).</li>
          <li><strong>Hosting:</strong> Vercel Inc. (Servidores en EE.UU.).</li>
        </ul>
      </>
    ),
  },
  {
    id: "security",
    title: "05. Protocolos de Seguridad",
    content: (
      <>
        <p>
          Implementamos estándares de industria (SSL/TLS Encryption) para proteger sus datos en tránsito y en reposo. Sin embargo, ningún sistema digital es 100% impenetrable. Nos comprometemos a notificar cualquier brecha de seguridad dentro de las 72 horas de ser detectada.
        </p>
      </>
    ),
  },
  {
    id: "rights",
    title: "06. Sus Derechos (GDPR/CCPA)",
    content: (
      <>
        <p>
          Usted es el dueño de sus datos. Tiene derecho a:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-sunset">
          <li><strong>Acceso:</strong> Solicitar una copia de los datos que tenemos sobre usted.</li>
          <li><strong>Rectificación:</strong> Corregir información inexacta.</li>
          <li><strong>Olvido:</strong> Solicitar la eliminación total de su cuenta y datos asociados de nuestros servidores.</li>
        </ul>
      </>
    ),
  },
];

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("collection");

  // Función para scroll suave
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <main className="bg-bone min-h-screen">
      <Navbar />

      {/* HEADER */}
      <section className="pt-40 pb-16 px-6 border-b border-gunmetal/5">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gunmetal/5 border border-gunmetal/10 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="type-tech text-[10px] text-gunmetal uppercase tracking-widest font-bold">
              Data Protection
            </span>
          </div>
          <h1 className="type-display text-4xl md:text-6xl text-gunmetal mb-4">
            Política de Privacidad
          </h1>
          <p className="type-body text-gunmetal/60 text-lg max-w-2xl">
            Cómo protegemos, procesamos y respetamos sus datos dentro del ecosistema O247.
            <br />
            <span className="font-mono text-xs text-gunmetal/40 mt-2 block">
              VIGENCIA: DESDE FEBRERO 2026
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
                Estructura de Datos
              </h3>
              <nav className="flex flex-col gap-1 border-l border-gunmetal/10">
                {PRIVACY_SECTIONS.map((section) => (
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

              {/* Botón de Gestión de Datos */}
              <div className="mt-10 p-6 bg-white rounded-2xl border border-gunmetal/5 shadow-sm">
                <Icon icon="solar:shield-check-bold-duotone" className="text-emerald-500 w-8 h-8 mb-3" />
                <p className="text-sm text-gunmetal font-bold mb-1">Gestión de Datos</p>
                <p className="text-xs text-gunmetal/60 mb-4">Solicitar baja o copia de datos.</p>
                <Link 
                  href="/contact" 
                  className="text-[10px] font-mono font-bold uppercase tracking-widest text-gunmetal border-b border-gunmetal/20 hover:border-emerald-500 hover:text-emerald-600 transition-all"
                >
                  Contactar Privacy Team -&gt;
                </Link>
              </div>
            </div>
          </div>

          {/* CONTENIDO PRINCIPAL */}
          <div className="lg:col-span-8 space-y-16">
            {PRIVACY_SECTIONS.map((section) => (
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
                O247 Engineering se reserva el derecho de actualizar esta política. Se notificará a los usuarios registrados sobre cambios significativos.
              </p>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}