"use client";
import { ScrollReveal } from "./ScrollReveal";
import { Icon } from "@iconify/react";

// Sub-componente interno para tarjetas
const FeatureCard = ({ title, desc, iconName, children, className = "" }: any) => (
  <div className={`group relative bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-black/5 overflow-hidden hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:border-[#a7e26e]/30 transition-all duration-500 ${className}`}>
    {/* Icono Gigante de Fondo (Marca de agua) */}
    <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
      <Icon icon={iconName} width="180" height="180" />
    </div>
    
    <div className="relative z-10 h-full flex flex-col">
      {/* Icono Principal */}
      <div className="w-12 h-12 bg-[#f7f7f5] rounded-xl flex items-center justify-center mb-6 text-[#1a1a1a] group-hover:bg-[#a7e26e] group-hover:text-white transition-colors duration-300">
        <Icon icon={iconName} width="24" height="24" />
      </div>
      
      <h3 className="text-2xl font-display font-medium text-[#1a1a1a] mb-3">{title}</h3>
      <p className="text-[#4a4a4a] leading-relaxed mb-8 font-light">{desc}</p>
      
      <div className="mt-auto w-full">
        {children}
      </div>
    </div>
  </div>
);

export default function BentoGrid() {
  return (
    <section className="py-24 px-4 bg-white/40">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-medium text-[#1a1a1a] mb-6">
              El sistema operativo de <br /> tu viaje.
            </h2>
            <p className="text-lg text-[#4a4a4a] max-w-2xl mx-auto font-light">
              Dejamos de lado la intuición. Utilizamos datos masivos y algoritmos predictivos.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card Grande Izquierda - Monitoring */}
          <ScrollReveal delay={0.1} width="100%">
            <FeatureCard
              title="Monitoreo 24/7"
              desc="Escaneo de tiempos de espera cada 30 segundos para detectar ventanas de oportunidad."
              iconName="solar:clock-circle-outline"
              className="md:col-span-2 min-h-[400px]"
            >
              <div className="w-full h-48 bg-[#f7f7f5] rounded-xl border border-dashed border-gray-300 flex items-end justify-around px-8 pb-4 relative overflow-hidden">
                 <div className="w-8 h-12 bg-gray-200 rounded-t-sm"></div>
                 <div className="w-8 h-24 bg-gray-300 rounded-t-sm"></div>
                 <div className="w-8 h-16 bg-[#a7e26e] rounded-t-sm shadow-lg transform translate-y-1 relative group cursor-help">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Optimized Window
                    </div>
                 </div>
                 <div className="w-8 h-28 bg-gray-200 rounded-t-sm"></div>
                 <div className="w-8 h-14 bg-gray-200 rounded-t-sm"></div>
                 
                 <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-[10px] font-mono shadow-sm border border-black/5 text-green-600 flex gap-2 items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> LIVE DATA
                 </div>
              </div>
            </FeatureCard>
          </ScrollReveal>

          {/* Card Derecha - Routing */}
          <ScrollReveal delay={0.2} width="100%">
            <FeatureCard
              title="Rutas Dinámicas"
              desc="Recálculo automático de itinerario en milisegundos si una atracción se detiene."
              iconName="solar:map-point-wave-outline"
              className="min-h-[400px]"
            >
               <div className="w-full h-full bg-[#f7f7f5] rounded-xl flex items-center justify-center p-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-black/5 w-full max-w-[200px]">
                     <div className="flex justify-between items-center mb-3">
                       <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                       <span className="text-[10px] font-mono text-gray-400 uppercase">Alert: Hagrid's Down</span>
                     </div>
                     <div className="space-y-2">
                        <div className="h-1.5 bg-gray-100 w-full rounded"></div>
                        <div className="h-1.5 bg-[#a7e26e] w-3/4 rounded animate-[pulse_2s_infinite]"></div>
                     </div>
                  </div>
               </div>
            </FeatureCard>
          </ScrollReveal>

          {/* Card Abajo 1 - Dining */}
          <ScrollReveal delay={0.3} width="100%">
            <FeatureCard
              title="Smart Dining"
              desc="Alertas de reservas imposibles y recomendaciones gastronómicas basadas en GPS."
              iconName="solar:chef-hat-outline" // Icono Solar Chef
              className="min-h-[300px]"
            />
          </ScrollReveal>

           {/* Card Abajo 2 - Security */}
           <ScrollReveal delay={0.4} width="100%">
            <FeatureCard
              title="Security & Trust"
              desc="Tus preferencias viajan seguras. Sin venta de datos. Encriptación Enterprise."
              iconName="solar:shield-check-outline"
              className="md:col-span-2 min-h-[300px]"
            >
               <div className="flex gap-3 mt-4">
                  <span className="px-3 py-1 bg-[#f7f7f5] rounded-full text-xs font-mono border border-black/5 text-gray-500 flex items-center gap-2">
                     <Icon icon="solar:lock-password-outline" /> AES-256
                  </span>
               </div>
            </FeatureCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}