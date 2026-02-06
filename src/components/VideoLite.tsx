"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface VideoLiteProps {
  videoId: string;
  title: string;
  coverImage?: string;
}

export default function VideoLite({ videoId, title, coverImage }: VideoLiteProps) {
  // URL directa para abrir la App
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  
  // Imagen de portada
  const thumbnail = coverImage || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <a 
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block w-full aspect-video rounded-2xl overflow-hidden bg-gunmetal border border-white/10 shadow-2xl group cursor-pointer"
      aria-label={`Reproducir ${title} en YouTube`}
    >
        <div className="relative w-full h-full">
            {/* 1. IMAGEN DE PORTADA */}
            <div className="absolute inset-0 bg-gunmetal" />
            
            <img 
                src={thumbnail} 
                alt={title}
                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                onError={(e) => {
                    e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                }}
            />
            
            {/* Overlay oscuro para que resalte el logo */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />

            {/* 2. BOTÓN PLAY OFICIAL YOUTUBE (Cambio Principal) */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    // Sombra fuerte para darle profundidad sobre el fondo
                    className="drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]" 
                >
                    {/* Usamos el icono oficial de la colección "logos". Ya viene con los colores. */}
                    <Icon icon="logos:youtube-icon" width={90} height={90} />
                </motion.div>
            </div>

            {/* 3. INFO DEL VIDEO */}
            <div className="absolute bottom-6 left-6 z-10 pr-6 pointer-events-none">
                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-[#FF0000] text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                        <Icon icon="solar:videocamera-record-bold" width={10} />
                        YouTube App
                    </span>
                </div>
                <h3 className="text-white font-bold text-lg md:text-xl tracking-tight drop-shadow-lg leading-tight">
                    {title}
                </h3>
            </div>
        </div>
    </a>
  );
}