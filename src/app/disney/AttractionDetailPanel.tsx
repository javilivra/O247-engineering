"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@/components/Icon';
import Image from 'next/image';

// Interfaz extendida para manejar datos más profundos en el futuro
interface DetailData {
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
  // Campos extra que agregaremos luego a la data real
  strategy?: string; 
  history?: string;
}

interface Props {
  attraction: DetailData | null;
  onClose: () => void;
}

export default function AttractionDetailPanel({ attraction, onClose }: Props) {
  if (!attraction) return null;

  // Fallback de imagen por seguridad
  const safeImage = (attraction.image && attraction.image.trim() !== "") 
    ? attraction.image 
    : '/images/mk_att_heroslide_1.webp';

  return (
    <AnimatePresence>
      {attraction && (
        <>
          {/* 1. BACKDROP (Fondo oscuro borroso) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* 2. EL PANEL LATERAL (SLIDE IN) */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-bone z-[60] shadow-2xl overflow-y-auto"
          >
            {/* --- HEADER CON IMAGEN --- */}
            <div className="relative h-72 w-full">
               <Image 
                 src={safeImage} 
                 alt={attraction.name} 
                 fill 
                 className="object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-gunmetal via-transparent to-transparent opacity-90" />
               
               {/* Botón Cerrar Flotante */}
               <button 
                 onClick={onClose}
                 className="absolute top-6 right-6 bg-white/10 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/20 transition-all border border-white/20 z-50"
               >
                 <Icon icon="solar:close-circle-bold" width={24} />
               </button>

               {/* Título e Info Principal */}
               <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-celeste text-gunmetal text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">
                      {attraction.tier}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest opacity-80">
                      <Icon icon="solar:map-point-bold" /> {attraction.land}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black leading-none mb-2">
                    {attraction.name}
                  </h2>
               </div>
            </div>

            {/* --- CUERPO DEL CONTENIDO --- */}
            <div className="p-8 flex flex-col gap-8 text-gunmetal">
               
               {/* 1. STATUS BAR */}
               <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gunmetal/5">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-gunmetal/50 font-bold">Estado Actual</span>
                    <div className="flex items-center gap-2 mt-1">
                       <div className={`w-2 h-2 rounded-full ${attraction.status === 'open' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                       <span className="font-bold text-lg leading-none">
                         {attraction.status === 'open' ? (attraction.waitTime || 'Disponible') : 'Cerrado'}
                       </span>
                    </div>
                  </div>
                  <div className="w-px h-8 bg-gunmetal/10" />
                  <div className="flex flex-col items-end">
                     <span className="text-[10px] uppercase tracking-widest text-gunmetal/50 font-bold">Vibe</span>
                     <div className="flex gap-1 mt-1">
                        {attraction.vibes.slice(0,3).map(v => (
                           <Icon key={v} icon="solar:star-bold-duotone" className="text-celeste" width={16} />
                        ))}
                     </div>
                  </div>
               </div>

               {/* 2. DESCRIPCIÓN O247 */}
               <div>
                  <h3 className="flex items-center gap-2 font-black text-lg uppercase tracking-wide mb-3 text-gunmetal">
                     <Icon icon="solar:document-text-bold-duotone" className="text-celeste" />
                     El Informe
                  </h3>
                  <p className="text-sm leading-relaxed text-gunmetal/70 font-medium">
                    {attraction.description || "Aquí irá la descripción detallada, la historia oculta y los datos curiosos que hacen única a esta experiencia."}
                  </p>
               </div>

               {/* 3. ESTRATEGIA (Placeholder para contenido futuro) */}
               <div className="bg-gunmetal text-white p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Icon icon="solar:magic-stick-3-bold" width={100} />
                  </div>
                  <h3 className="relative z-10 flex items-center gap-2 font-black text-sm uppercase tracking-[0.2em] mb-3 text-celeste">
                     Estrategia O247
                  </h3>
                  <p className="relative z-10 text-xs leading-relaxed text-white/80">
                     Aquí mostraremos el mejor momento para visitar, dónde sentarse para la mejor foto y secretos técnicos. (Contenido pendiente de carga).
                  </p>
               </div>

               {/* 4. BOTÓN DE ACCIÓN */}
               <button className="w-full bg-celeste hover:bg-celeste/90 text-white font-bold py-4 rounded-xl uppercase tracking-widest text-sm shadow-lg shadow-celeste/20 transition-all flex items-center justify-center gap-2">
                  <Icon icon="solar:add-circle-bold" width={18} />
                  Agregar a mi Plan
               </button>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}