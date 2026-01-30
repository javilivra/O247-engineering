"use client";
import { ScrollReveal } from "./ScrollReveal";
import { Icon } from "@iconify/react";

// Sub-componente interno para tarjetas (Estilo Oasis Tech)
const FeatureCard = ({ title, desc, iconName, children, className = "" }: any) => (
  <div className={`group relative bg-white rounded-2xl p-8 shadow-sm border border-gunmetal/5 overflow-hidden hover:shadow-lg hover:border-sunset/20 transition-all duration-500 ${className}`}>
    
    {/* Icono Gigante de Fondo (Marca de agua sutil) */}
    <div className="absolute top-0 right-0 p-6 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-500">
      <Icon icon={iconName} width="180" height="180" className="text-gunmetal" />
    </div>
    
    <div className="relative z-10 h-full flex flex-col">
      {/* Icono Principal: Bone -> Sunset al hover */}
      <div className="w-12 h-12 bg-bone rounded-xl flex items-center justify-center mb-6 text-gunmetal group-hover:bg-sunset group-hover:text-gunmetal transition-colors duration-300">
        <Icon icon={iconName} width="24" height="24" />
      </div>
      
      {/* Título y Descripción con Tipografía de Sistema */}
      <h3 className="text-2xl font-display font-medium text-gunmetal mb-3 tracking-tight">{title}</h3>
      <p className="type-body text-sm mb-8">{desc}</p>
      
      {/* Contenido Visual (Gráficos/UI) */}
      <div className="mt-auto w-full">
        {children}
      </div>
    </div>
  </div>
);

export default function BentoGrid() {
  return (
    // Fondo transparente para integrarse sobre el Bone del layout principal
    <section className="py-24 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="type-display text-4xl md:text-5xl text-gunmetal mb-6">
              El cerebro detrás de <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset to-celeste">
                la magia.
              </span>
            </h2>
            <p className="type-body text-lg max-w-2xl mx-auto">
              Dejamos de lado la intuición. Utilizamos datos masivos y algoritmos predictivos para garantizar tu experiencia.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card Grande Izquierda - Monitoring */}
          <ScrollReveal delay={0.1} width="100%">
            <FeatureCard
              title="Vigilancia de Afluencia"
              desc="Escaneo de tiempos de espera cada 30 segundos. Detectamos ventanas de oportunidad invisibles al ojo humano."
              iconName="solar:clock-circle-outline"
              className="md:col-span-2 min-h-[400px]"
            >
              {/* UI: Gráfico de Barras Tech */}
              <div className="w-full h-48 bg-bone rounded-xl border border-dashed border-gunmetal/10 flex items-end justify-around px-8 pb-4 relative overflow-hidden">
                 {/* Barras normales */}
                 <div className="w-8 h-12 bg-gunmetal/10 rounded-t-sm"></div>
                 <div className="w-8 h-24 bg-gunmetal/20 rounded-t-sm"></div>
                 
                 {/* Barra Optimizada (Sunset) */}
                 <div className="w-8 h-16 bg-sunset rounded-t-sm shadow-[0_0_15px_rgba(255,112,67,0.4)] transform translate-y-1 relative group cursor-help transition-all hover:h-20">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gunmetal text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-mono">
                        OPTIMAL_WINDOW
                    </div>
                 </div>
                 
                 <div className="w-8 h-28 bg-gunmetal/10 rounded-t-sm"></div>
                 <div className="w-8 h-14 bg-gunmetal/10 rounded-t-sm"></div>
                 
                 {/* Badge Tech */}
                 <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-[10px] border border-gunmetal/5 flex gap-2 items-center">
                    <span className="w-1.5 h-1.5 bg-celeste rounded-full animate-pulse"></span> 
                    <span className="type-tech text-gunmetal/70">LIVE DATA STREAM</span>
                 </div>
              </div>
            </FeatureCard>
          </ScrollReveal>

          {/* Card Derecha - Routing */}
          <ScrollReveal delay={0.2} width="100%">
            <FeatureCard
              title="Navegación Líquida"
              desc="Recálculo automático de itinerario en 0.4s si una atracción se detiene o el clima cambia."
              iconName="solar:map-point-wave-outline"
              className="min-h-[400px]"
            >
               <div className="w-full h-full bg-bone rounded-xl flex items-center justify-center p-4">
                  {/* Alerta UI */}
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gunmetal/5 w-full max-w-[200px]">
                     <div className="flex justify-between items-center mb-3">
                       <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                       <span className="type-tech text-[9px] text-gunmetal/50 uppercase">Alert: Hagrid's Down</span>
                     </div>
                     <div className="space-y-2">
                        <div className="h-1.5 bg-gunmetal/5 w-full rounded-full"></div>
                        <div className="h-1.5 bg-sunset w-3/4 rounded-full animate-pulse"></div>
                     </div>
                     <div className="mt-3 flex justify-end">
                        <span className="type-tech text-[9px] text-celeste">Recalculating...</span>
                     </div>
                  </div>
               </div>
            </FeatureCard>
          </ScrollReveal>

          {/* Card Abajo 1 - Dining */}
          <ScrollReveal delay={0.3} width="100%">
            <FeatureCard
              title="Gastronomía Estratégica"
              desc="Alertas de reservas imposibles y recomendaciones gastronómicas basadas en tu ubicación GPS."
              iconName="solar:chef-hat-outline"
              className="min-h-[300px]"
            />
          </ScrollReveal>

           {/* Card Abajo 2 - Security */}
           <ScrollReveal delay={0.4} width="100%">
            <FeatureCard
              title="Privacidad Blindada"
              desc="Tus preferencias viajan seguras. Sin venta de datos a terceros. Encriptación Enterprise."
              iconName="solar:shield-check-outline"
              className="md:col-span-2 min-h-[300px]"
            >
               <div className="flex gap-3 mt-4">
                  <span className="px-3 py-1.5 bg-bone rounded-md text-xs border border-gunmetal/10 text-gunmetal/60 flex items-center gap-2 font-mono">
                     <Icon icon="solar:lock-password-outline" /> AES-256 ENCRYPTION
                  </span>
               </div>
            </FeatureCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}