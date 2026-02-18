"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@/components/Icon';
import Image from 'next/image';
import Link from 'next/link';
import type { ParkItem } from '@/data/types';

// Helper: get vibe icon
function getVibeIcon(vibe: string) {
  const map: Record<string, string> = {
    'Adrenalina': 'solar:bolt-bold',
    'Refugio Climatico': 'solar:snowflake-bold',
    'indoor': 'solar:snowflake-bold',
    'ac': 'solar:snowflake-bold',
    'Clasicos 1971': 'solar:crown-star-bold',
    'Agua': 'solar:drop-bold',
    'Ninos': 'solar:balloon-bold',
    'kids': 'solar:balloon-bold',
    'Personajes': 'solar:user-hand-up-bold',
    'Relax': 'solar:tea-cup-bold',
    'chill': 'solar:tea-cup-bold',
    'quick': 'solar:hamburger-menu-bold',
    'table': 'solar:chef-hat-bold',
    'snack': 'solar:cookie-bold',
    'coffee': 'solar:cup-bold',
    'fireworks': 'solar:stars-minimalistic-bold',
    'parade': 'solar:confetti-bold',
    'stage': 'solar:masks-bold',
    'princess': 'solar:crown-bold',
    'mickey': 'solar:star-bold',
    'pixar': 'solar:planet-bold',
  };
  return map[vibe] || 'solar:star-bold';
}

// Type config by category
function getTypeConfig(type: string) {
  switch (type) {
    case 'Dining':
      return { accent: 'text-orange-400', bgBadge: 'bg-orange-500/20 text-orange-200', actionLabel: 'Ver Menu' };
    case 'Show':
      return { accent: 'text-purple-400', bgBadge: 'bg-purple-500/20 text-purple-200', actionLabel: 'Horarios' };
    case 'Character':
      return { accent: 'text-pink-400', bgBadge: 'bg-pink-500/20 text-pink-200', actionLabel: 'Ubicacion' };
    case 'Attraction':
    default:
      return { accent: 'text-celeste', bgBadge: 'bg-celeste/20 text-celeste', actionLabel: 'Ver detalles' };
  }
}

// =============================================
// FRONT FACE
// =============================================
function CardFront({ data, config }: { data: ParkItem; config: ReturnType<typeof getTypeConfig> }) {
  const safeImage = (data.image && data.image.trim() !== '') ? data.image : '/images/mk_att_heroslide_1.webp';

  return (
    <div
      className="absolute inset-0 rounded-3xl overflow-hidden"
      style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
    >
      {/* Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={safeImage}
          alt={data.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized={safeImage.startsWith('http')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gunmetal via-gunmetal/40 to-transparent opacity-90" />
      </div>

      {/* Tier badge */}
      <div className={`absolute top-3 left-3 z-20 ${config.bgBadge} backdrop-blur-md text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-[0.15em] border border-white/5 shadow-sm`}>
        {data.tier}
      </div>

      {/* Status badge */}
      {(data.status === 'closed' || data.status === 'refurbishment') ? (
        <div className="absolute top-3 right-3 z-20 bg-red-600/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-red-400/30 shadow-lg">
          Cerrado
        </div>
      ) : (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
          <div className="bg-gunmetal/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-white/10 shadow-lg flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${data.status === 'down' ? 'bg-red-500' : 'bg-green-400'}`} />
            {data.waitTime || 'Disponible'}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col justify-end h-full">
        <div className="flex items-center gap-1.5 mb-1 opacity-80">
          <Icon icon="solar:map-point-bold" width={12} className="text-white/70" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">{data.land}</span>
        </div>

        <h3 className="text-xl md:text-2xl font-black text-white leading-tight mb-2 line-clamp-2 group-hover:text-celeste transition-colors">
          {data.name}
        </h3>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-1">
          <div className="flex items-center gap-2">
            {data.vibes.slice(0, 3).map((vibe) => (
              <div key={vibe} className="bg-white/10 p-1.5 rounded-full" title={vibe}>
                <Icon icon={getVibeIcon(vibe)} width={10} className="text-white/80" />
              </div>
            ))}
            {data.vibes.length > 3 && (
              <span className="text-[9px] text-white/40 font-bold">+{data.vibes.length - 3}</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <span className={`text-[10px] font-bold uppercase tracking-widest ${config.accent}`}>
              {data.type === 'Attraction' ? 'Detalles' : 'Girar'}
            </span>
            <Icon
              icon={data.type === 'Attraction' ? 'solar:arrow-right-linear' : 'solar:refresh-bold'}
              width={14}
              className={config.accent}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================
// BACK FACE (Dining / Shows / Characters only)
// =============================================
function CardBack({ data, config, onFlipBack }: { data: ParkItem; config: ReturnType<typeof getTypeConfig>; onFlipBack: () => void }) {
  return (
    <div
      className="absolute inset-0 rounded-3xl overflow-hidden bg-gunmetal p-6 flex flex-col"
      style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className={`${config.bgBadge} backdrop-blur-md text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-[0.15em] border border-white/5`}>
          {data.type}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onFlipBack(); }}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Volver"
        >
          <Icon icon="solar:arrow-left-linear" width={16} className="text-white/70" />
        </button>
      </div>

      {/* Name */}
      <h3 className="text-lg font-black text-white leading-tight mb-1">{data.name}</h3>
      <div className="flex items-center gap-1.5 mb-4">
        <Icon icon="solar:map-point-bold" width={12} className="text-white/40" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{data.land}</span>
      </div>

      {/* Description */}
      {data.description && (
        <p className="text-sm text-white/70 leading-relaxed mb-4 flex-1">{data.description}</p>
      )}

      {/* Info grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
          <span className="text-[9px] font-bold uppercase tracking-widest text-white/30 block mb-1">Tipo</span>
          <span className="text-xs font-bold text-white">{data.tier}</span>
        </div>
        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
          <span className="text-[9px] font-bold uppercase tracking-widest text-white/30 block mb-1">Espera</span>
          <span className="text-xs font-bold text-white">{data.waitTime || 'N/A'}</span>
        </div>
      </div>

      {/* Vibes */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {data.vibes.map((vibe) => (
          <div key={vibe} className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1.5 rounded-full border border-white/5">
            <Icon icon={getVibeIcon(vibe)} width={12} className={config.accent} />
            <span className="text-[10px] font-bold text-white/60 capitalize">{vibe}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// =============================================
// MAIN COMPONENT
// =============================================
export default function BentoCard({ data }: { data: ParkItem }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const config = getTypeConfig(data.type);

  // Attractions -> Link to detail page (NO flip)
  if (data.type === 'Attraction') {
    const slug = (data as any).slug || data.id.replace(/_/g, '-');
    return (
      <Link href={`/disney/mk/${slug}`} className="block group">
        <motion.div
          whileHover={{ y: -5, scale: 1.01 }}
          className="relative h-64 md:h-72 w-full rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 bg-gunmetal"
        >
          <CardFront data={data} config={config} />
        </motion.div>
      </Link>
    );
  }

  // Dining, Shows, Characters -> Flip card on click
  return (
    <div
      className="group cursor-pointer"
      style={{ perspective: '1200px' }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-64 md:h-72 w-full shadow-lg hover:shadow-2xl transition-shadow duration-300"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <CardFront data={data} config={config} />
        <CardBack data={data} config={config} onFlipBack={() => setIsFlipped(false)} />
      </motion.div>
    </div>
  );
}