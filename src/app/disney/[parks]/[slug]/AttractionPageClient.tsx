"use client";

// ============================================================
// CLIENT COMPONENT — AttractionPageClient.tsx
// Ruta: src/app/disney/[park]/[slug]/AttractionPageClient.tsx
//
// Recibe la atracción ya resuelta desde el Server Component (page.tsx).
// Maneja toda la UI: motion, íconos, video, interacciones.
// ============================================================

import { motion } from 'framer-motion';
import { Icon } from '@/components/Icon';
import VideoLite from '@/components/VideoLite';
import type { Attraction } from '@/data/types';

// ============================================================
// TIPOS EXTENDIDOS
// ============================================================
type ExtendedAttraction = Attraction & {
  boardingSteps?: {
    step: number;
    title: string;
    description: string;
    accentColor?: 'celeste' | 'sunset';
    icon: string;
  }[];
  reviews?: {
    id: string;
    text: string;
    rating?: number;
    highlight?: boolean;
  }[];
  heroImage?: string;
  strategyTips?: { title: string; description: string }[];
  communityScore?: number;
  communityTotal?: number;
};

// ============================================================
// HELPERS UI
// ============================================================
const TIER_COLORS: Record<string, string> = {
  'Tier 1': 'bg-sunset/10 text-sunset border-sunset/20',
  'Tier 2': 'bg-celeste/10 text-celeste border-celeste/20',
  'Tier 3': 'bg-gunmetal/8 text-gunmetal/60 border-gunmetal/10',
};

const ACCESS_ICONS: Record<string, string> = {
  'Virtual Queue': 'solar:smartphone-bold',
  'LL Single Pass': 'solar:ticket-star-bold',
  'LL Multi Pass': 'solar:ticket-bold',
  'Standby': 'solar:people-nearby-bold',
  'None': 'solar:close-circle-bold',
};

function ReliabilityDot({ score }: { score: number }) {
  const color =
    score >= 90 ? 'bg-vanguard-green' :
    score >= 70 ? 'bg-celeste' :
    score >= 40 ? 'bg-sunset' :
    'bg-gunmetal/30';
  const label =
    score >= 90 ? 'Alta' :
    score >= 70 ? 'Media' :
    score >= 40 ? 'Baja' :
    'Cerrada';
  return (
    <span className="flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full ${color} shadow-sm`} />
      <span className="type-tech text-[10px] text-gunmetal/50 uppercase tracking-widest">{label}</span>
    </span>
  );
}

// ============================================================
// COMPONENT
// ============================================================
export default function AttractionPageClient({ attraction }: { attraction: Attraction }) {
  const a = attraction as ExtendedAttraction;

  const {
    name, land, tier, status, waitTime,
    reliabilityScore, heightReq,
    duration, rideSystem, yearOpened, capacity,
    access, accessExplained,
    image, heroImage,
    vibes, bestTime, secretTip, description, insiderFacts,
    pov, warnings, accessibility, lockers, photoPolicy,
    boardingSteps, reviews, strategyTips,
    communityScore, communityTotal,
  } = a;

  const displayHero = heroImage || image;
  const tierColor = TIER_COLORS[tier] || TIER_COLORS['Tier 3'];
  const accessIcon = ACCESS_ICONS[access] || 'solar:ticket-bold';
  const isClosed = status === 'closed';

  return (
    <div className="min-h-screen bg-bone font-sans text-gunmetal selection:bg-sunset selection:text-white overflow-x-hidden">

      {/* ── 0. HERO VISUAL ── */}
      <section className="relative w-full h-[70vh] min-h-[520px] overflow-hidden">
        <img
          src={displayHero}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bone via-bone/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-bone/40 via-transparent to-transparent" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(0,180,216,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,180,216,0.15) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 70%)',
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="container mx-auto px-6 md:px-12 max-w-7xl pb-10 pt-40">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-3 mb-5"
            >
              <span className="bg-gunmetal/80 backdrop-blur-md border border-gunmetal/20 text-bone px-3 py-1 rounded type-tech text-[10px] flex items-center gap-2">
                <Icon icon="solar:map-point-bold" className="w-3 h-3" /> {land}
              </span>
              <span className={`backdrop-blur-md border px-3 py-1 rounded type-tech text-[10px] ${tierColor}`}>
                {tier}
              </span>
              {vibes.slice(0, 2).map((vibe) => (
                <span key={vibe} className="bg-gunmetal/60 backdrop-blur-md border border-gunmetal/10 text-bone/80 px-3 py-1 rounded type-tech text-[10px]">
                  {vibe}
                </span>
              ))}
              {isClosed && (
                <span className="bg-sunset/90 backdrop-blur-md border border-sunset/30 text-gunmetal px-3 py-1 rounded type-tech text-[10px] font-bold">
                  ⚠ CERRADA
                </span>
              )}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="type-display text-5xl md:text-7xl lg:text-8xl text-gunmetal leading-[0.9] tracking-tighter uppercase mb-6"
            >
              {name}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button className="btn-primary flex items-center gap-2 group">
                <Icon icon="solar:refresh-circle-bold" className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
                <span className="type-tech text-xs uppercase">Sincronizar Itinerario</span>
              </button>
              <button className="flex items-center gap-2 bg-bone/80 backdrop-blur-md border border-gunmetal/20 text-gunmetal px-6 py-3 rounded-full hover:border-gunmetal/40 hover:-translate-y-0.5 transition-all duration-300 group">
                <Icon icon={accessIcon} className="w-5 h-5 text-gunmetal/60 group-hover:text-celeste transition-colors" />
                <span className="type-tech text-xs uppercase">{access}</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 1. HUD DE DATOS ── */}
      <div className="relative z-30 w-full border-y border-gunmetal/8 bg-white shadow-averi">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gunmetal/8">

            <div className="p-6 flex items-center gap-4 hover:bg-bone transition-colors duration-200">
              <div className="p-3 bg-celeste/10 rounded-xl text-celeste shrink-0">
                <Icon icon="solar:clock-circle-bold" className="w-6 h-6" />
              </div>
              <div>
                <p className="type-tech text-[10px] text-gunmetal/40 uppercase tracking-widest">ESPERA ACTUAL</p>
                <p className="type-tech text-xl md:text-2xl font-bold text-gunmetal">{isClosed ? '—' : waitTime}</p>
              </div>
            </div>

            <div className="p-6 flex items-center gap-4 hover:bg-bone transition-colors duration-200">
              <div className="p-3 bg-celeste/10 rounded-xl text-celeste shrink-0">
                <Icon icon={accessIcon} className="w-6 h-6" />
              </div>
              <div>
                <p className="type-tech text-[10px] text-gunmetal/40 uppercase tracking-widest">TIPO ACCESO</p>
                <p className="type-tech text-sm font-bold text-gunmetal uppercase">{access}</p>
              </div>
            </div>

            <div className="p-6 flex items-center gap-4 hover:bg-bone transition-colors duration-200">
              <div className="p-3 bg-celeste/10 rounded-xl text-celeste shrink-0">
                <Icon icon="solar:hourglass-bold" className="w-6 h-6" />
              </div>
              <div>
                <p className="type-tech text-[10px] text-gunmetal/40 uppercase tracking-widest">DURACIÓN</p>
                <p className="type-tech text-xl md:text-2xl font-bold text-gunmetal">
                  {duration > 0 ? `${duration} min` : '—'}
                </p>
              </div>
            </div>

            <div className={`p-6 flex items-center gap-4 transition-colors duration-200 ${reliabilityScore < 70 ? 'bg-sunset' : 'hover:bg-bone'}`}>
              <div className={`p-3 rounded-xl shrink-0 ${reliabilityScore < 70 ? 'bg-gunmetal/10' : 'bg-gunmetal/5'}`}>
                <Icon icon="solar:graph-new-bold" className={`w-6 h-6 ${reliabilityScore < 70 ? 'text-gunmetal' : 'text-gunmetal/60'}`} />
              </div>
              <div>
                <p className={`type-tech text-[10px] uppercase tracking-widest ${reliabilityScore < 70 ? 'text-gunmetal/60' : 'text-gunmetal/40'}`}>CONFIABILIDAD</p>
                <p className="type-tech text-xl md:text-2xl font-bold text-gunmetal">
                  {reliabilityScore > 0 ? `${reliabilityScore}%` : 'N/A'}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── 2. CONTENIDO PRINCIPAL ── */}
      <main className="container mx-auto px-6 md:px-12 max-w-7xl py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* COL 1 — LA MISIÓN */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-celeste border-b border-gunmetal/10 pb-4">
              <Icon icon="solar:code-square-bold" className="w-5 h-5" />
              <h3 className="type-tech text-sm uppercase tracking-[0.2em]">LA MISIÓN</h3>
            </div>
            <div className="card-oasis p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-celeste/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
              <p className="type-body mb-6">{description}</p>
              {insiderFacts && insiderFacts.length > 0 && (
                <div className="space-y-3 mt-6 pt-6 border-t border-gunmetal/8">
                  <span className="type-tech text-[10px] text-celeste uppercase tracking-widest block">DATOS INTERNOS</span>
                  {insiderFacts.map((fact, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="type-tech text-celeste text-xs shrink-0 mt-0.5">→</span>
                      <p className="type-body text-xs text-gunmetal/70">{fact}</p>
                    </div>
                  ))}
                </div>
              )}
              {secretTip && (
                <div className="mt-6 p-4 border-l-2 border-sunset bg-sunset/5 rounded-r-xl">
                  <span className="type-tech text-[10px] text-sunset uppercase tracking-widest block mb-1">TIP SECRETO</span>
                  <p className="type-body text-xs italic text-gunmetal/70">{secretTip}</p>
                </div>
              )}
            </div>
          </div>

          {/* COL 2 — PROTOCOLOS o LOGÍSTICA */}
          <div className="space-y-6">
            {boardingSteps && boardingSteps.length > 0 ? (
              <>
                <div className="flex items-center gap-3 text-celeste border-b border-gunmetal/10 pb-4">
                  <Icon icon="solar:settings-bold" className="w-5 h-5" />
                  <h3 className="type-tech text-sm uppercase tracking-[0.2em]">PROTOCOLOS</h3>
                </div>
                <div className="space-y-3">
                  {boardingSteps.map((step) => {
                    const accent = step.accentColor === 'sunset' ? 'sunset' : 'celeste';
                    return (
                      <div key={step.step} className="relative group">
                        <div className={`absolute left-0 top-0 bottom-0 w-[2px] bg-gunmetal/10 group-hover:bg-${accent} transition-colors duration-300 rounded-full`} />
                        <div className="ml-5 card-oasis p-5 hover:shadow-averi-hover hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                            <Icon icon={step.icon} className={`w-10 h-10 text-${accent}`} />
                          </div>
                          <div className="flex gap-4 relative z-10">
                            <span className={`type-tech text-${accent} text-xl font-bold shrink-0`}>
                              {String(step.step).padStart(2, '0')}
                            </span>
                            <div>
                              <h4 className="type-tech text-sm tracking-widest uppercase text-gunmetal mb-1">{step.title}</h4>
                              <p className="type-body text-xs text-gunmetal/60">{step.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 text-celeste border-b border-gunmetal/10 pb-4">
                  <Icon icon="solar:settings-bold" className="w-5 h-5" />
                  <h3 className="type-tech text-sm uppercase tracking-[0.2em]">ACCESO Y LOGÍSTICA</h3>
                </div>
                <div className="card-oasis p-6 space-y-5">
                  <div className="flex justify-between items-start gap-4">
                    <span className="type-body text-xs text-gunmetal/60 uppercase tracking-wide shrink-0">Tipo de acceso</span>
                    <span className="type-tech font-bold text-gunmetal text-sm text-right">{access}</span>
                  </div>
                  <div className="border-t border-gunmetal/8 pt-4">
                    <span className="type-tech text-[10px] text-celeste uppercase tracking-widest block mb-2">CÓMO FUNCIONA</span>
                    <p className="type-body text-xs text-gunmetal/70 leading-relaxed">{accessExplained}</p>
                  </div>
                  {lockers.required && (
                    <div className="border-t border-gunmetal/8 pt-4">
                      <span className="type-tech text-[10px] text-sunset uppercase tracking-widest block mb-2">LOCKERS</span>
                      <p className="type-body text-xs text-gunmetal/70">{lockers.notes || `${lockers.location} — ${lockers.cost}`}</p>
                    </div>
                  )}
                  {photoPolicy.hasOnRidePhoto && (
                    <div className="border-t border-gunmetal/8 pt-4 flex items-center gap-2">
                      <Icon icon="solar:camera-bold" className="w-4 h-4 text-celeste shrink-0" />
                      <span className="type-body text-xs text-gunmetal/70">
                        Foto automática incluida.{photoPolicy.photoPassIncluded ? ' Incluida en Memory Maker.' : ''}
                      </span>
                    </div>
                  )}
                  {bestTime && (
                    <div className="mt-4 p-4 border-l-2 border-celeste bg-celeste/5 rounded-r-xl">
                      <span className="type-tech text-[10px] text-celeste uppercase tracking-widest block mb-1">MEJOR MOMENTO</span>
                      <p className="type-body text-xs italic text-gunmetal/70">{bestTime}</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* COL 3 — ESPECIFICACIONES */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-celeste border-b border-gunmetal/10 pb-4">
              <Icon icon="solar:tuning-2-bold" className="w-5 h-5" />
              <h3 className="type-tech text-sm uppercase tracking-[0.2em]">ESPECIFICACIONES</h3>
            </div>
            <div className="card-oasis p-6 space-y-4">
              {heightReq > 0 && (
                <div className="flex justify-between items-center border-b border-gunmetal/8 pb-4">
                  <span className="type-body text-xs text-gunmetal/60 uppercase tracking-wide">Altura mínima</span>
                  <span className="type-tech font-bold text-gunmetal text-lg">{heightReq} cm</span>
                </div>
              )}
              <div className="flex justify-between items-center border-b border-gunmetal/8 pb-4">
                <span className="type-body text-xs text-gunmetal/60 uppercase tracking-wide">Sistema</span>
                <span className="type-tech font-bold text-gunmetal text-xs text-right max-w-[55%]">{rideSystem}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gunmetal/8 pb-4">
                <span className="type-body text-xs text-gunmetal/60 uppercase tracking-wide">Inauguración</span>
                <span className="type-tech font-bold text-gunmetal">{yearOpened}</span>
              </div>
              {(capacity ?? 0) > 0 && (
                <div className="flex justify-between items-center border-b border-gunmetal/8 pb-4">
                  <span className="type-body text-xs text-gunmetal/60 uppercase tracking-wide">Capacidad / vehículo</span>
                  <span className="type-tech font-bold text-gunmetal">{capacity} pers.</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="type-body text-xs text-gunmetal/60 uppercase tracking-wide">Confiabilidad</span>
                <ReliabilityDot score={reliabilityScore} />
              </div>

              {(() => {
                const w = [];
                if (warnings.pregnancyRestriction) w.push('No embarazadas');
                if (warnings.backNeckIssues) w.push('Sin problemas de espalda/cuello');
                if (warnings.motionSickness) w.push('Puede causar mareos');
                if (warnings.darkness) w.push('Oscuridad');
                if (warnings.drops) w.push('Caídas');
                if (warnings.water) w.push('Puede mojarse');
                if (warnings.spinning) w.push('Giros');
                if (warnings.heights) w.push('Alturas');
                if (w.length === 0) return null;
                return (
                  <div className="bg-sunset/8 border border-sunset/20 p-4 rounded-xl flex gap-3 mt-2">
                    <Icon icon="solar:danger-triangle-bold" className="text-sunset w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="type-tech text-[10px] text-sunset uppercase tracking-widest mb-2">ADVERTENCIAS</p>
                      <div className="flex flex-wrap gap-1">
                        {w.map((label) => (
                          <span key={label} className="type-tech text-[10px] text-gunmetal/60 bg-gunmetal/5 px-2 py-0.5 rounded">{label}</span>
                        ))}
                      </div>
                      {warnings.notes && (
                        <p className="type-body text-[11px] text-gunmetal/60 leading-relaxed mt-2">{warnings.notes}</p>
                      )}
                    </div>
                  </div>
                );
              })()}

              {accessibility.mustTransfer && (
                <div className="bg-celeste/8 border border-celeste/20 p-4 rounded-xl flex gap-3">
                  <Icon icon="solar:accessibility-bold" className="text-celeste w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="type-tech text-[10px] text-celeste uppercase tracking-widest mb-1">ACCESIBILIDAD</p>
                    <p className="type-body text-[11px] text-gunmetal/60">Requiere transferencia de ECV/silla de ruedas.</p>
                    {accessibility.notes && (
                      <p className="type-body text-[11px] text-gunmetal/60 mt-1">{accessibility.notes}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

      {/* ── 3. VIDEO POV ── */}
      {pov?.videoId && (
        <section className="border-t border-gunmetal/8 bg-white">
          <div className="container mx-auto px-6 md:px-12 max-w-7xl py-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3 text-celeste">
                <Icon icon="solar:videocamera-record-bold" className="w-5 h-5" />
                <h3 className="type-tech text-sm uppercase tracking-[0.2em]">VISUALIZACIÓN POV</h3>
              </div>
              <a
                href={`https://www.youtube.com/watch?v=${pov.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 type-tech text-[10px] uppercase text-gunmetal/40 hover:text-celeste transition-colors"
              >
                {pov.channelName} <Icon icon="solar:arrow-right-up-linear" className="w-3 h-3" />
              </a>
            </div>
            <VideoLite videoId={pov.videoId} title={`${name} — POV`} coverImage={displayHero} />
          </div>
        </section>
      )}

      {/* ── 4. ESTRATEGIA Y COMUNIDAD ── */}
      <section className="container mx-auto px-6 md:px-12 max-w-7xl py-20 border-t border-gunmetal/8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          <div className="card-oasis p-8 relative overflow-hidden">
            <div className="absolute -right-12 -top-12 text-celeste/5 pointer-events-none">
              <Icon icon="solar:chess-pawn-bold" className="w-48 h-48" />
            </div>
            <h3 className="type-display text-xl text-gunmetal mb-6 flex items-center gap-3">
              <Icon icon="solar:lightbulb-bolt-bold" className="text-celeste w-5 h-5 shrink-0" />
              MÓDULO DE ESTRATEGIA
            </h3>
            {strategyTips && strategyTips.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {strategyTips.map((tip, i) => (
                  <div key={i}>
                    <h4 className="type-tech text-celeste text-[10px] tracking-widest uppercase mb-2">{tip.title}</h4>
                    <p className="type-body text-xs text-gunmetal/70 leading-relaxed">{tip.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="type-tech text-celeste text-[10px] tracking-widest uppercase mb-2">MEJOR MOMENTO</h4>
                  <p className="type-body text-xs text-gunmetal/70 leading-relaxed">{bestTime}</p>
                </div>
                <div>
                  <h4 className="type-tech text-celeste text-[10px] tracking-widest uppercase mb-2">TIPO DE ACCESO</h4>
                  <p className="type-body text-xs text-gunmetal/70 leading-relaxed">{accessExplained}</p>
                </div>
              </div>
            )}
            <button className="btn-primary w-full justify-center flex items-center gap-2">
              <Icon icon="solar:file-download-bold" className="w-4 h-4" />
              <span className="type-tech text-xs uppercase">Agregar a mi Itinerario</span>
            </button>
          </div>

          <div className="space-y-6">
            {communityScore && (
              <div className="flex justify-between items-end border-b border-gunmetal/10 pb-4">
                <div>
                  <h3 className="type-tech text-[10px] text-gunmetal/40 uppercase tracking-[0.2em] mb-1">ANÁLISIS DE LA COMUNIDAD</h3>
                  <p className="type-display text-3xl text-gunmetal">
                    Satisfacción <span className="text-sunset">{communityScore}/10</span>
                  </p>
                </div>
                {communityTotal && (
                  <div className="text-right">
                    <p className="type-tech text-[10px] text-gunmetal/40 uppercase mb-1">TOTAL AUDITORÍAS</p>
                    <p className="type-tech text-xl text-gunmetal">{communityTotal.toLocaleString()}</p>
                  </div>
                )}
              </div>
            )}
            {reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="flex gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${review.highlight ? 'bg-celeste/10 border border-celeste/30' : 'bg-gunmetal/5 border border-gunmetal/10'}`}>
                    <span className={`type-tech text-[9px] font-bold ${review.highlight ? 'text-celeste' : 'text-gunmetal/40'}`}>{review.id}</span>
                  </div>
                  <div className="card-oasis p-4 flex-1">
                    <p className={`type-body text-xs italic ${review.highlight ? 'text-gunmetal/70' : 'text-gunmetal/50'}`}>"{review.text}"</p>
                    {review.rating && review.highlight && (
                      <div className="flex gap-1 mt-3 text-sunset">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Icon key={i} icon="solar:star-bold" className="w-3 h-3" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="card-oasis p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Icon icon="solar:star-bold" className="w-5 h-5 text-sunset" />
                  <span className="type-tech text-sm uppercase tracking-[0.2em] text-gunmetal">INSIGHT O247</span>
                </div>
                <p className="type-body text-sm text-gunmetal/70 italic">"{secretTip}"</p>
                <div className="mt-4 pt-4 border-t border-gunmetal/8">
                  <ReliabilityDot score={reliabilityScore} />
                  <p className="type-body text-xs text-gunmetal/40 mt-1">{a.reliabilitySource}</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}