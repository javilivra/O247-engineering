"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@/components/Icon';
import Image from 'next/image';
import Link from 'next/link';
import type { ParkItem } from '@/data/types';

function buildHref(data: ParkItem): string {
  const a = data as any;
  const slug = a.slug || data.id;
  const park = a.park || data.id.split('-')[0];
  const resort = a.resort || 'disney-world';
  const base = resort === 'universal-orlando' ? 'universal' : 'disney';
  return `/${base}/${park}/${slug}`;
}

function getAttractionType(data: ParkItem): string {
  const v = data.vibes || [];
  if (v.includes('coaster')) return 'Roller Coaster';
  if (v.includes('simulator')) return 'Simulador';
  if (v.includes('drops')) return 'Torre Caída';
  if (v.includes('water')) return 'Water Ride';
  if (v.includes('spinning')) return 'Spinning';
  if (v.includes('walkthrough')) return 'Sendero';
  if (v.includes('boat')) return 'Bote';
  if (v.includes('train')) return 'Tren';
  if (v.includes('film')) return 'Film 360°';
  if (v.includes('interactive')) return 'Interactivo';
  if (v.includes('dark') && v.includes('indoor')) return 'Dark Ride';
  if (v.includes('immersive')) return 'Dark Ride';
  if (v.includes('show')) return 'Show';
  return 'Atracción';
}

function getAccessBadge(data: ParkItem): { label: string; color: string } | null {
  const a = data as any;
  if (!a.access) return null;
  if (a.access === 'LL Multi Pass')  return { label: 'MultiPass [G1]', color: '#00B4D8' };
  if (a.access === 'LL Single Pass') return { label: 'Lightning [G2]', color: '#F4A261' };
  if (a.access === 'Virtual Queue')  return { label: 'Virtual Queue',  color: '#9B5DE5' };
  return null;
}

function getTypeConfig(type: string) {
  switch (type) {
    case 'Dining':    return { accent: '#F4A261', badge: 'rgba(244,162,97,0.2)',  text: 'rgba(253,211,177,0.9)' };
    case 'Show':      return { accent: '#9B5DE5', badge: 'rgba(155,93,229,0.2)',  text: 'rgba(210,180,255,0.9)' };
    case 'Character': return { accent: '#F72585', badge: 'rgba(247,37,133,0.2)',  text: 'rgba(255,180,220,0.9)' };
    default:          return { accent: '#00B4D8', badge: 'rgba(0,180,216,0.15)',  text: 'rgba(180,240,255,0.9)' };
  }
}

function IntensityBar({ level }: { level: number }) {
  const segments = 10;
  const filled = Math.round((level / 5) * segments);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <span style={{ fontFamily: 'monospace', fontSize: '7px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
        Intensity Level
      </span>
      <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end' }}>
        {Array.from({ length: segments }).map((_, i) => {
          const active = i < filled;
          const color = i < 3 ? '#22c55e' : i < 6 ? '#eab308' : '#ef4444';
          return (
            <div key={i} style={{
              width: '7px',
              height: '12px',
              borderRadius: '2px',
              background: active ? color : 'rgba(255,255,255,0.07)',
              boxShadow: active ? `0 0 5px ${color}90` : 'none',
            }} />
          );
        })}
      </div>
    </div>
  );
}

function CardFront({ data, config, hovered, added, onAdd, isAttraction }: {
  data: ParkItem;
  config: ReturnType<typeof getTypeConfig>;
  hovered: boolean;
  added: boolean;
  onAdd: (e: React.MouseEvent) => void;
  isAttraction: boolean;
}) {
  const safeImage = data.image?.trim() || '/images/mk_att_heroslide_1.webp';
  const accessBadge = getAccessBadge(data);
  const a = data as any;
  const scareFactor: number = a.warnings?.scareFactor ?? (data.tier === 'Tier 1' ? 4 : data.tier === 'Tier 2' ? 2 : 1);

  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
      <div className="absolute inset-0">
        <Image src={safeImage} alt={data.name} fill className="object-cover"
          style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)' }}
          sizes="(max-width: 768px) 100vw, 50vw" unoptimized={safeImage.startsWith('http')} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(14,15,17,0.98) 0%, rgba(14,15,17,0.55) 45%, rgba(14,15,17,0.15) 100%)' }} />
      </div>

      {isAttraction && (
        <div className="absolute top-3 left-3 z-10" style={{ background: 'rgba(14,15,17,0.72)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '8px', padding: '4px 10px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '8px', fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase' }}>
            {getAttractionType(data)}
          </span>
        </div>
      )}

      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5"
        style={{ background: 'rgba(14,15,17,0.72)', backdropFilter: 'blur(12px)', border: `1px solid ${accessBadge ? accessBadge.color + '35' : 'rgba(255,255,255,0.08)'}`, borderRadius: '100px', padding: '4px 10px' }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: accessBadge ? accessBadge.color : (data.status === 'open' ? '#22c55e' : '#ef4444'), boxShadow: `0 0 6px ${accessBadge ? accessBadge.color : (data.status === 'open' ? '#22c55e' : '#ef4444')}` }} />
        <span style={{ fontFamily: 'monospace', fontSize: '8px', fontWeight: 800, letterSpacing: '0.1em', color: accessBadge ? accessBadge.color : 'rgba(255,255,255,0.55)', textTransform: 'uppercase' }}>
          {accessBadge ? accessBadge.label : (data.waitTime || 'Disponible')}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
        {/* Land */}
        <div className="flex items-center gap-1 mb-1">
          <span style={{ color: config.accent, flexShrink: 0, display: "inline-flex" }}><Icon icon="solar:map-point-bold" width={9} /></span>
          <span style={{ fontFamily: 'monospace', fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' }}>{data.land}</span>
        </div>

        {/* Nombre */}
        <h3 style={{ fontWeight: 900, lineHeight: 1.2, marginBottom: '10px', transition: 'color 0.3s' }} className={`text-2xl md:text-3xl line-clamp-2 ${hovered ? 'text-celeste' : 'text-white'}`}>
          {data.name}
        </h3>

        {/* Línea divisoria */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Intensity Level debajo de la línea */}
          {isAttraction ? <IntensityBar level={scareFactor} /> : <span />}

          {/* DETALLES debajo de la línea con hover navbar */}
          <div className="group/det flex items-center gap-1.5" style={{ cursor: 'pointer' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '9px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', transition: 'color 0.25s' }} className={hovered ? 'text-sunset' : 'text-white/50'}>
              {isAttraction ? 'Detalles' : 'Girar'}
            </span>
            <span style={{ transition: 'color 0.25s, transform 0.25s', transform: hovered ? 'translateX(3px)' : 'translateX(0)', display: 'inline-flex' }} className={hovered ? 'text-sunset' : 'text-white/50'}>
              <Icon icon={isAttraction ? "solar:arrow-right-linear" : "solar:refresh-bold"} width={12} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardBack({ data, config, onFlipBack }: { data: ParkItem; config: ReturnType<typeof getTypeConfig>; onFlipBack: () => void }) {
  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col p-5"
      style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: 'linear-gradient(135deg, #0e0f11 0%, #14161f 100%)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ background: config.badge, borderRadius: '8px', padding: '4px 10px', border: `1px solid ${config.accent}25` }}>
          <span style={{ fontFamily: 'monospace', fontSize: '8px', fontWeight: 800, letterSpacing: '0.12em', color: config.text, textTransform: 'uppercase' }}>{data.type}</span>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onFlipBack(); }}
          style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Icon icon="solar:arrow-left-linear" width={13} className="text-white/55" />
        </button>
      </div>
      <h3 style={{ fontSize: '0.95rem', fontWeight: 900, color: 'white', lineHeight: 1.25, marginBottom: '4px' }}>{data.name}</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '12px' }}>
        <span style={{ color: config.accent, display: "inline-flex" }}><Icon icon="solar:map-point-bold" width={9} /></span>
        <span style={{ fontFamily: 'monospace', fontSize: '8px', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>{data.land}</span>
      </div>
      {data.description && (
        <p style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, marginBottom: '12px', flex: 1 }} className="line-clamp-4">{data.description}</p>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
        {[{ label: 'Tipo', value: data.tier }, { label: 'Espera', value: data.waitTime || 'N/A' }].map(({ label, value }) => (
          <div key={label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '9px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '7.5px', fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', display: 'block', marginBottom: '3px' }}>{label}</span>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'white' }}>{value}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: 'auto' }}>
        {data.vibes.slice(0, 5).map((vibe) => (
          <span key={vibe} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '100px', padding: '3px 8px', fontFamily: 'monospace', fontSize: '7.5px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{vibe}</span>
        ))}
      </div>
    </div>
  );
}

export default function BentoCard({ data }: { data: ParkItem }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const config = getTypeConfig(data.type);
  const isAttraction = data.type === 'Attraction';

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setAdded(prev => !prev);
  }

  if (isAttraction) {
    return (
      <Link href={buildHref(data)} className="block">
        <motion.div onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
          whileHover={{ y: -4 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl"
          style={{ height: '280px', background: '#0e0f11', transition: 'box-shadow 0.3s' }}>
          <CardFront data={data} config={config} hovered={hovered} added={added} onAdd={handleAdd} isAttraction />
        </motion.div>
      </Link>
    );
  }

  return (
    <div className="cursor-pointer" style={{ perspective: '1200px' }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onClick={() => setIsFlipped(f => !f)}>
      <motion.div animate={{ rotateY: isFlipped ? 180 : 0 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full rounded-2xl shadow-lg" style={{ height: '280px', transformStyle: 'preserve-3d' }}>
        <CardFront data={data} config={config} hovered={hovered} added={added} onAdd={handleAdd} isAttraction={false} />
        <CardBack data={data} config={config} onFlipBack={() => setIsFlipped(false)} />
      </motion.div>
    </div>
  );
}
