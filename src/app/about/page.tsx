"use client";

import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Componente simple de ScrollReveal para esta página
const Reveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export default function AboutPage() {
  return (
    <main className="bg-bone min-h-screen selection:bg-sunset selection:text-white">
      <Navbar />

      {/* --- HERO: EL MANIFIESTO --- */}
      <section className="pt-40 pb-20 px-6 border-b border-gunmetal/5">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gunmetal/5 border border-gunmetal/10 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-sunset animate-pulse"></span>
              <span className="type-tech text-[10px] text-gunmetal uppercase tracking-widest font-bold">
                The O247 Philosophy
              </span>
            </div>
            <h1 className="type-display text-5xl md:text-7xl text-gunmetal leading-[0.9] tracking-tight mb-8">
              No es solo magia.<br />
              Es <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset to-celeste">Logística Aplicada.</span>
            </h1>
            <p className="type-body text-xl md:text-2xl text-gunmetal/60 max-w-3xl mx-auto leading-relaxed">
              Orlando se ha convertido en un sistema complejo. Nosotros decodificamos ese sistema para que vos solo tengas que disfrutarlo.
            </p>
          </Reveal>
        </div>
      </section>

      {/* --- SECTION 2: EL PROBLEMA VS LA SOLUCIÓN --- */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Columna Izquierda: La Historia */}
          <div className="space-y-8">
            <Reveal>
              <h2 className="type-display text-3xl md:text-4xl text-gunmetal mb-6">
                La "Ingeniería" detrás del nombre.
              </h2>
              <div className="type-body text-lg text-gunmetal/70 space-y-6">
                <p>
                  <strong className="text-gunmetal">O247</strong> nació de una frustración real. Como ingenieros y viajeros frecuentes, notamos un patrón: las familias gastaban miles de dólares para terminar estresadas, haciendo filas de 120 minutos bajo el sol y comiendo mal.
                </p>
                <p>
                  El problema no eran los parques; era la <strong className="text-gunmetal">falta de estrategia</strong>.
                </p>
                <p>
                  Decidimos aplicar principios de ingeniería industrial a la planificación de viajes: <strong>optimización de rutas, análisis de datos históricos y gestión de recursos (tiempo y energía).</strong>
                </p>
              </div>
            </Reveal>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 pt-4">
                <Reveal delay={0.2}>
                    <div className="p-6 rounded-2xl bg-bone border border-gunmetal/5">
                        <span className="block text-4xl font-display font-bold text-gunmetal mb-1">+10k</span>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-gunmetal/50">Datos Procesados</span>
                    </div>
                </Reveal>
                <Reveal delay={0.3}>
                    <div className="p-6 rounded-2xl bg-bone border border-gunmetal/5">
                        <span className="block text-4xl font-display font-bold text-gunmetal mb-1">100%</span>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-gunmetal/50">Lógica, 0% Suerte</span>
                    </div>
                </Reveal>
            </div>
          </div>

          {/* Columna Derecha: Visual (Imagen o Gráfico) */}
          <Reveal delay={0.4}>
            <div className="relative h-[600px] w-full rounded-[32px] overflow-hidden bg-gunmetal shadow-2xl">
                {/* Aquí iría una foto tuya en el parque o un gráfico técnico */}
                <Image 
                    src="/images/founder.jpg" // Asegúrate de que esta imagen exista
                    alt="Fundadores O247 en Magic Kingdom"
                    fill
                    className="object-cover opacity-80 hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay Técnico */}
                <div className="absolute inset-0 bg-gradient-to-t from-gunmetal via-transparent to-transparent opacity-90" />
                
                <div className="absolute bottom-8 left-8 right-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                            <Icon icon="solar:user-id-bold-duotone" className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-white font-bold text-lg">Javier & Carolina</p>
                            <p className="text-white/50 text-xs font-mono uppercase tracking-widest">Founders & Lead Engineers</p>
                        </div>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed border-l-2 border-sunset pl-4">
                        "Nuestro objetivo no es venderte un viaje, es diseñarte una experiencia sin fricción."
                    </p>
                </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* --- SECTION 3: THE CORE VALUES (Grid) --- */}
      <section className="py-24 px-6 bg-gunmetal relative overflow-hidden">
        {/* Fondo decorativo */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sunset/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />

        <div className="max-w-7xl mx-auto relative z-10">
            <Reveal>
                <h2 className="text-white type-display text-4xl mb-16 text-center">Nuestros Pilares de Diseño</h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Card 1 */}
                <Reveal delay={0.1}>
                    <div className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors h-full">
                        <div className="w-14 h-14 rounded-full bg-sunset/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Icon icon="solar:graph-new-up-bold-duotone" className="text-sunset w-8 h-8" />
                        </div>
                        <h3 className="text-white text-xl font-bold mb-4">Datos &gt; Intuición</h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                            No adivinamos cuándo ir a una atracción. Usamos patrones históricos de afluencia para predecirlo con precisión matemática.
                        </p>
                    </div>
                </Reveal>

                {/* Card 2 */}
                <Reveal delay={0.2}>
                    <div className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors h-full">
                        <div className="w-14 h-14 rounded-full bg-celeste/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Icon icon="solar:stopwatch-check-bold-duotone" className="text-celeste w-8 h-8" />
                        </div>
                        <h3 className="text-white text-xl font-bold mb-4">Eficiencia Radical</h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                            El tiempo es el recurso más caro en Orlando. Nuestros itinerarios están diseñados para minimizar pasos y maximizar experiencias.
                        </p>
                    </div>
                </Reveal>

                {/* Card 3 */}
                <Reveal delay={0.3}>
                    <div className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors h-full">
                        <div className="w-14 h-14 rounded-full bg-vanguard-green/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Icon icon="solar:heart-angle-bold-duotone" className="text-vanguard-green w-8 h-8" />
                        </div>
                        <h3 className="text-white text-xl font-bold mb-4">Transparencia Total</h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Te decimos la verdad sobre los costos, las multitudes y lo que realmente vale la pena. Sin promesas vacías de marketing.
                        </p>
                    </div>
                </Reveal>
            </div>
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="py-32 px-6 bg-bone text-center">
        <div className="max-w-3xl mx-auto">
            <Reveal>
                <h2 className="type-display text-4xl md:text-5xl text-gunmetal mb-8">
                    ¿Listo para optimizar tu viaje?
                </h2>
                <p className="text-lg text-gunmetal/60 mb-10">
                    Deja de planificar como turista y empieza a ejecutar como ingeniero.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                        href="/contact" 
                        className="px-8 py-4 bg-gunmetal text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-sunset transition-colors shadow-xl"
                    >
                        Hablemos del Proyecto
                    </Link>
                    <Link 
                        href="/disney/mk" 
                        className="px-8 py-4 bg-white text-gunmetal border border-gunmetal/10 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gray-50 transition-colors"
                    >
                        Ver Demo (Magic Kingdom)
                    </Link>
                </div>
            </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}