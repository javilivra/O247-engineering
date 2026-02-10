"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';
import { MK_ATTRACTIONS } from '@/data/mk-attractions-data';
import type { Attraction } from '@/data/types';

export default function AttractionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  // Find attraction by slug
  const attraction = MK_ATTRACTIONS.find((a) => a.slug === slug) as Attraction | undefined;

  if (!attraction) {
    return (
      <div className="min-h-screen bg-bone flex items-center justify-center font-sans">
        <div className="text-center">
          <Icon icon="solar:ghost-bold-duotone" width={64} className="mx-auto mb-4 text-gunmetal/30" />
          <h1 className="text-2xl font-black text-gunmetal mb-2">Atraccion no encontrada</h1>
          <p className="text-gunmetal/60 mb-6">No existe una atraccion con el slug "{slug}"</p>
          <Link
            href="/disney/mk/attractions"
            className="inline-flex items-center gap-2 bg-sunset text-gunmetal px-6 py-3 rounded-full font-bold text-sm hover:brightness-110 transition-all"
          >
            <Icon icon="solar:arrow-left-linear" width={16} />
            Volver a La Boveda
          </Link>
        </div>
      </div>
    );
  }

  const safeImage = (attraction.image && attraction.image.trim() !== '') ? attraction.image : '/images/mk_att_heroslide_1.webp';

  const statusLabel = {
    open: 'Operativa',
    closed: 'Cerrada',
    refurbishment: 'En Remodelacion',
    down: 'Fuera de Servicio',
  }[attraction.status];

  const statusColor = {
    open: 'bg-green-500',
    closed: 'bg-red-500',
    refurbishment: 'bg-amber-500',
    down: 'bg-red-600',
  }[attraction.status];

  return (
    <div className="min-h-screen bg-bone font-sans text-gunmetal">
      {/* HERO */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        <Image
          src={safeImage}
          alt={attraction.name}
          fill
          className="object-cover"
          priority
          unoptimized={safeImage.startsWith('http')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gunmetal via-gunmetal/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-gunmetal/60 to-transparent" />

        {/* Back button */}
        <div className="absolute top-24 left-6 md:left-12 z-20">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-colors min-h-[44px]"
          >
            <Icon icon="solar:arrow-left-linear" width={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Volver</span>
          </button>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-24 z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Tags */}
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-white/10">
                {attraction.land}
              </span>
              <span className="bg-celeste/20 backdrop-blur-md text-celeste text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-celeste/20">
                {attraction.tier}
              </span>
              <span className={`${statusColor} text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest`}>
                {statusLabel}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-4">
              {attraction.name}
            </h1>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-6">
              <button className="bg-sunset text-gunmetal px-6 py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-sunset/20">
                <Icon icon="solar:calendar-add-bold" width={18} />
                Sincronizar Itinerario
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full font-bold text-sm uppercase tracking-widest border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2">
                <Icon icon="solar:clock-circle-bold" width={18} />
                Estado Fila
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* HUD - Data panel */}
      <div className="relative z-10 -mt-8 mx-6 md:mx-12 lg:mx-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl border border-gunmetal/5 p-6 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-gunmetal/40 block mb-1">Espera Actual</span>
            <span className="text-2xl font-black text-gunmetal">{attraction.waitTime}</span>
          </div>
          <div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-gunmetal/40 block mb-1">Duracion</span>
            <span className="text-2xl font-black text-gunmetal">{attraction.duration} min</span>
          </div>
          <div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-gunmetal/40 block mb-1">Acceso</span>
            <span className="text-base font-black text-gunmetal">{attraction.access}</span>          </div>
          <div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-gunmetal/40 block mb-1">Fiabilidad</span>
            <span className="text-2xl font-black text-gunmetal">{attraction.reliabilityScore}%</span>
          </div>
        </motion.div>
      </div>

      {/* CONTENT */}
      <div className="mx-6 md:mx-12 lg:mx-24 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Secret Tip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-sunset/10 to-celeste/10 rounded-2xl p-6 border border-sunset/20"
          >
            <div className="flex items-center gap-2 mb-3">
              <Icon icon="solar:star-bold-duotone" width={20} className="text-sunset" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-sunset">Dato Secreto O247</span>
            </div>
            <p className="text-gunmetal font-medium leading-relaxed">{attraction.secretTip}</p>
          </motion.div>

          {/* Best Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl p-6 border border-gunmetal/5 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-3">
              <Icon icon="solar:clock-circle-bold-duotone" width={20} className="text-celeste" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-celeste">Ventana de Oportunidad</span>
            </div>
            <p className="text-gunmetal font-bold text-lg">{attraction.bestTime}</p>
          </motion.div>

          {/* Vibes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-2xl p-6 border border-gunmetal/5 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <Icon icon="solar:heart-pulse-bold-duotone" width={20} className="text-purple-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-500">Vibes</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {attraction.vibes.map((vibe) => (
                <span key={vibe} className="bg-gunmetal/5 text-gunmetal px-4 py-2 rounded-full text-sm font-bold">
                  {vibe}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar - Specs */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-gunmetal rounded-2xl p-6 text-white"
          >
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-6">Especificaciones</h3>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon icon="solar:ruler-bold-duotone" width={20} className="text-celeste" />
                  <span className="text-sm font-medium text-white/70">Altura Minima</span>
                </div>
                <span className="font-bold">{attraction.heightReq > 0 ? `${attraction.heightReq} cm` : 'Sin restriccion'}</span>
              </div>
              <div className="w-full h-px bg-white/10" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon icon="solar:snowflake-bold-duotone" width={20} className="text-celeste" />
                  <span className="text-sm font-medium text-white/70">Aire Acondicionado</span>
                </div>
                <span className="font-bold">{attraction.hasAc ? 'Si' : 'No'}</span>
              </div>
              <div className="w-full h-px bg-white/10" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon icon="solar:home-bold-duotone" width={20} className="text-celeste" />
                  <span className="text-sm font-medium text-white/70">Interior</span>
                </div>
                <span className="font-bold">{attraction.isIndoor ? 'Si' : 'No'}</span>
              </div>
              <div className="w-full h-px bg-white/10" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon icon="solar:map-point-bold-duotone" width={20} className="text-celeste" />
                  <span className="text-sm font-medium text-white/70">Mapa #</span>
                </div>
                <span className="font-bold">{attraction.mapId}</span>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-gradient-to-br from-celeste/10 to-sunset/10 rounded-2xl p-6 border border-celeste/20 text-center"
          >
            <Icon icon="solar:magic-stick-3-bold-duotone" width={32} className="mx-auto mb-3 text-celeste" />
            <h3 className="font-black text-gunmetal mb-2">Agregar a mi Plan</h3>
            <p className="text-xs text-gunmetal/60 mb-4">O247 optimizara tu ruta incluyendo esta atraccion</p>
            <button className="w-full bg-sunset text-gunmetal py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-sunset/20">
              Agregar
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}