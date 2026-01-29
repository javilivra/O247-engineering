"use client";
import { ScrollReveal } from "./ScrollReveal";
import { Icon } from "@iconify/react";

export default function Workflow() {
  return (
    // CONFIRMADO: El fondo de esta sección es color Hueso (bg-bone)
    <section className="py-24 relative overflow-hidden bg-bone">
      <div className="max-w-5xl mx-auto px-6 relative">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-display font-medium text-center text-gunmetal mb-20 tracking-tight">
            Ingeniería aplicada a <br />
            <span className="text-sunset">tu experiencia.</span>
          </h2>
        </ScrollReveal>

        <div className="relative space-y-24">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gunmetal/10 -ml-[0.5px]"></div>

          {/* Paso 1 */}
          <ScrollReveal>
            <div className="relative grid md:grid-cols-2 gap-12 items-center">
              <div className="md:text-right md:pr-12 order-2 md:order-1">
                <h3 className="text-2xl font-display font-medium mb-3">1. Ingesta de Datos</h3>
                <p className="text-gunmetal/80 font-light">
                  Conectamos con las APIs oficiales. Clima, filas y afluencia procesados al instante.
                </p>
              </div>
              <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-sunset rounded-full border-4 border-bone shadow-sm transform -translate-x-1/2 z-10"></div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gunmetal/5 order-1 md:order-2 ml-12 md:ml-12">
                <div className="flex items-center gap-2 font-mono text-xs text-gunmetal/50 mb-2">
                  <Icon icon="solar:server-square-cloud-outline" className="text-sunset" width="16" /> 
                  RAW_DATA_STREAM
                </div>
                <div className="h-2 bg-gunmetal/5 rounded-full w-3/4 mb-2 animate-pulse"></div>
                <div className="h-2 bg-gunmetal/5 rounded-full w-1/2"></div>
              </div>
            </div>
          </ScrollReveal>

          {/* Paso 2 */}
          <ScrollReveal delay={0.2}>
            <div className="relative grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gunmetal/5 mr-12 md:mr-12 hidden md:block text-right">
                <div className="flex items-center justify-end gap-2 mb-2 font-mono text-xs text-sunset">
                  PROCESSING... <Icon icon="solar:cpu-bolt-outline" width="16" />
                </div>
                 <div className="space-y-2">
                    <div className="h-2 bg-gunmetal/5 rounded-full w-full ml-auto"></div>
                    <div className="h-2 bg-sunset/20 rounded-full w-2/3 ml-auto"></div>
                 </div>
              </div>
              <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-sunset rounded-full border-4 border-bone shadow-sm transform -translate-x-1/2 z-10"></div>
              <div className="md:pl-12 ml-12 md:ml-0">
                <h3 className="text-2xl font-display font-medium mb-3">2. Algoritmo O247</h3>
                <p className="text-gunmetal/80 font-light">
                  No es magia, es matemática. Nuestro motor calcula la ruta más eficiente.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Paso 3 */}
          <ScrollReveal delay={0.3}>
            <div className="relative grid md:grid-cols-2 gap-12 items-center">
              <div className="md:text-right md:pr-12 order-2 md:order-1">
                <h3 className="text-2xl font-display font-medium mb-3">3. Ejecución</h3>
                <p className="text-gunmetal/80 font-light">
                  Recibes un plan paso a paso. Si una atracción se rompe, el sistema recalcula.
                </p>
              </div>
              <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-sunset rounded-full border-4 border-bone shadow-sm transform -translate-x-1/2 z-10"></div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gunmetal/5 order-1 md:order-2 ml-12 md:ml-12">
                <div className="flex items-center gap-3 mb-2">
                  <Icon icon="solar:check-circle-outline" className="text-sunset" width="20" />
                  <span className="font-display font-medium text-sm">Itinerario Activo</span>
                </div>
                <div className="text-xs text-gunmetal/60 font-mono">T. Espera estimado: 15 min</div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}