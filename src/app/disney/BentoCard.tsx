"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import Image from 'next/image';

interface BentoData {
  id: string;
  name: string;
  land: string;
  tier: string;
  status: string;
  waitTime?: string;
  type?: string; 
  vibes: string[];
  image: string;
  description?: string;
}

export default function BentoCard({ data }: { data: BentoData }) {
  
  // 1. SOLUCIÓN AL ERROR (FALLBACK SAFE IMAGE)
  // Verificamos si data.image existe y no está vacía. Si falla, usamos una de respaldo.
  const safeImage = (data.image && data.image.trim() !== "") 
    ? data.image 
    : '/images/mk_att_heroslide_1.webp'; // <--- Imagen de seguridad local

  // 2. DETECTOR DE TIPO
  const cardType = data.type || 'Attraction';

  // 3. CONFIGURACIÓN VISUAL
  const getTypeConfig = () => {
    switch (cardType) {
      case 'Dining':
        return {
            icon: 'solar:chef-hat-bold-duotone',
            accent: 'text-orange-400',
            bgBadge: 'bg-orange-500/20 text-orange-200',
            actionLabel: 'Ver Menú'
        };
      case 'Show':
        return {
            icon: 'solar:masks-bold-duotone',
            accent: 'text-purple-400',
            bgBadge: 'bg-purple-500/20 text-purple-200',
            actionLabel: 'Horarios'
        };
      case 'Character':
        return {
            icon: 'solar:crown-star-bold-duotone',
            accent: 'text-pink-400',
            bgBadge: 'bg-pink-500/20 text-pink-200',
            actionLabel: 'Ubicación'
        };
      case 'Attraction':
      default:
        return {
            icon: 'solar:ticket-star-bold-duotone',
            accent: 'text-celeste',
            bgBadge: 'bg-celeste/20 text-celeste',
            actionLabel: 'Detalles'
        };
    }
  };

  const config = getTypeConfig();

  // 4. BADGE DE ESTADO
  const getStatusBadge = () => {
    if (data.status === 'closed' || data.status === 'refurbishment') {
        return (
            <div className="absolute top-3 right-3 z-20 bg-red-600/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-red-400/30 shadow-lg">
                Cerrado
            </div>
        );
    }
    
    return (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
            <div className="bg-gunmetal/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-white/10 shadow-lg flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${data.status === 'down' ? 'bg-red-500' : 'bg-green-400'}`}></span>
                {data.waitTime || 'Disponible'}
            </div>
        </div>
    );
  };

  return (
    <motion.div 
        whileHover={{ y: -5, scale: 1.01 }}
        className="group relative h-64 md:h-72 w-full rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 bg-gunmetal"
    >
      {/* A. IMAGEN DE FONDO (USANDO safeImage) */}
      <div className="absolute inset-0 z-0">
         <Image 
            src={safeImage} 
            alt={data.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            // Esto evita errores si usas dominios externos (como las URLs de Disney)
            unoptimized={safeImage.startsWith('http')} 
         />
         <div className="absolute inset-0 bg-gradient-to-t from-gunmetal via-gunmetal/40 to-transparent opacity-90" />
      </div>

      {/* B. BADGES */}
      <div className={`absolute top-3 left-3 z-20 ${config.bgBadge} backdrop-blur-md text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-[0.15em] border border-white/5 shadow-sm`}>
          {data.tier}
      </div>

      {getStatusBadge()}

      {/* C. CONTENIDO */}
      <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col justify-end h-full">
          
          <div className="flex items-center gap-1.5 mb-1 opacity-80">
              <Icon icon="solar:map-point-bold" width={12} className="text-white/70" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">
                  {data.land}
              </span>
          </div>

          <h3 className="text-xl md:text-2xl font-black text-white leading-tight mb-2 line-clamp-2 group-hover:text-celeste transition-colors">
              {data.name}
          </h3>

          {data.description && (
              <p className="text-xs text-white/60 line-clamp-2 mb-4 font-medium leading-relaxed hidden sm:block">
                  {data.description}
              </p>
          )}

          {/* D. FOOTER */}
          <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-1">
              <div className="flex items-center gap-2">
                  {data.vibes.slice(0, 3).map((vibe) => (
                      <div key={vibe} className="bg-white/10 p-1.5 rounded-full" title={vibe}>
                         <Icon 
                            icon={
                                vibe === 'thrill' ? 'solar:bolt-bold' :
                                vibe === 'indoor' ? 'solar:snowflake-bold' :
                                vibe === 'kids' ? 'solar:balloon-bold' :
                                vibe === 'dining' ? 'solar:chef-hat-bold' :
                                'solar:star-bold' 
                            } 
                            width={10} 
                            className="text-white/80" 
                         />
                      </div>
                  ))}
                  {data.vibes.length > 3 && (
                      <span className="text-[9px] text-white/40 font-bold">+{data.vibes.length - 3}</span>
                  )}
              </div>

              <div className="flex items-center gap-1 group/btn">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${config.accent}`}>
                      {config.actionLabel}
                  </span>
                  <Icon 
                    icon="solar:arrow-right-linear" 
                    width={14} 
                    className={`${config.accent} transition-transform group-hover/btn:translate-x-1`} 
                  />
              </div>
          </div>
      </div>
    </motion.div>
  );
}