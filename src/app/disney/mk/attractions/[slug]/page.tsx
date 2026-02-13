"use client";

import React, { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';
import { MK_ATTRACTIONS } from '@/data/mk-attractions-data';
import type { Attraction, WaitForecastSlot } from '@/data/types';

// ===================================================
// CONSTANTS
// ===================================================
const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const ease = [0.25, 0.1, 0.25, 1.0] as const;

const STATUS_MAP: Record<string, { label: string; color: string; icon: string }> = {
    open: { label: 'Operativa', color: 'bg-emerald-500', icon: 'solar:check-circle-bold' },
    closed: { label: 'Cerrada', color: 'bg-red-500', icon: 'solar:close-circle-bold' },
    refurbishment: { label: 'En Remodelacion', color: 'bg-amber-500', icon: 'solar:hammer-bold' },
    down: { label: 'Fuera de Servicio', color: 'bg-red-600', icon: 'solar:danger-triangle-bold' },
};

const ACCESS_ICONS: Record<string, string> = {
    'Standby': 'solar:users-group-two-rounded-bold',
    'LL Multi Pass': 'solar:ticket-bold',
    'LL Single Pass': 'solar:ticket-sale-bold',
    'Virtual Queue': 'solar:smartphone-bold',
    'None': 'solar:close-circle-bold',
};

const SCARE_LABELS = ['', 'Suave', 'Moderada', 'Intensa', 'Muy Intensa', 'Extrema'];
const SCARE_COLORS = ['', 'bg-emerald-500', 'bg-yellow-500', 'bg-orange-500', 'bg-red-500', 'bg-red-700'];

const ACTIVITY_ICONS: Record<string, string> = {
    shopping: 'solar:bag-4-bold-duotone',
    dining: 'solar:chef-hat-bold-duotone',
    photo: 'solar:camera-bold-duotone',
    experience: 'solar:star-bold-duotone',
    game: 'solar:gamepad-bold-duotone',
    show: 'solar:clapperboard-play-bold-duotone',
};

// ===================================================
// SUB-COMPONENTS
// ===================================================

/** Onboarding tooltip for concepts */
function InfoTooltip({ label, children }: { label: string; children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    return (
        <span className="relative inline-flex items-center gap-1">
            <span>{label}</span>
            <button
                onClick={() => setOpen(!open)}
                className="text-celeste hover:text-sunset transition-colors"
                aria-label={`Info sobre ${label}`}
            >
                <Icon icon="solar:info-circle-bold" width={14} />
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        transition={{ duration: 0.2, ease }}
                        className="absolute bottom-full left-0 mb-2 z-50 w-72 bg-gunmetal text-white text-xs leading-relaxed p-3 rounded-xl shadow-xl border border-white/10"
                    >
                        {children}
                        <button onClick={() => setOpen(false)} className="absolute top-2 right-2 text-white/40 hover:text-white">
                            <Icon icon="solar:close-circle-bold" width={14} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </span>
    );
}

/** YouTube POV thumbnail with play button */
function POVSection({ pov }: { pov: NonNullable<Attraction['pov']> }) {
    const thumb = pov.thumbnailUrl || `https://img.youtube.com/vi/${pov.videoId}/maxresdefault.jpg`;
    const ytUrl = `https://www.youtube.com/watch?v=${pov.videoId}`;
    return (
        <div className="rounded-2xl overflow-hidden border border-gunmetal/10 shadow-sm">
            <div className="px-5 py-3 bg-gunmetal/5 flex items-center gap-2">
                <Icon icon="solar:videocamera-record-bold-duotone" width={18} className="text-red-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gunmetal/60">Experiencia POV</span>
            </div>
            <a href={ytUrl} target="_blank" rel="noopener noreferrer" className="block relative group">
                <div className="relative w-full aspect-video bg-gunmetal/10">
                    <Image src={thumb} alt="POV Video" fill className="object-cover" unoptimized />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                            <Icon icon="logos:youtube-icon" width={40} />
                        </div>
                    </div>
                </div>
                <div className="px-5 py-3 bg-white flex items-center justify-between">
                    <span className="text-xs text-gunmetal/60">Video de <strong className="text-gunmetal">{pov.channelName}</strong></span>
                    <Icon icon="solar:arrow-right-up-linear" width={14} className="text-gunmetal/40" />
                </div>
            </a>
        </div>
    );
}

/** Forecast chart - bar graph */
function ForecastChart({ data, label }: { data: WaitForecastSlot[]; label?: string }) {
    if (!data || data.length === 0) return null;
    const maxWait = Math.max(...data.map(d => d.wait), 1);
    return (
        <div>
            {label && <span className="text-[10px] font-bold uppercase tracking-widest text-gunmetal/40 block mb-3">{label}</span>}
            <div className="flex items-end gap-1 h-24">
                {data.map((slot) => {
                    const pct = (slot.wait / maxWait) * 100;
                    const isHigh = pct > 70;
                    const isMed = pct > 40;
                    return (
                        <div key={slot.hour} className="flex-1 flex flex-col items-center gap-1" title={`${slot.hour}:00 — ${slot.wait} min`}>
                            <span className="text-[8px] font-bold text-gunmetal/40">{slot.wait}</span>
                            <div
                                className={`w-full rounded-t-sm transition-all ${isHigh ? 'bg-red-400' : isMed ? 'bg-amber-400' : 'bg-emerald-400'}`}
                                style={{ height: `${Math.max(pct, 4)}%` }}
                            />
                            <span className="text-[8px] text-gunmetal/30">{slot.hour > 12 ? slot.hour - 12 + 'p' : slot.hour + 'a'}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/** Monthly average selector */
function MonthlyAverage({ data }: { data: Record<number, number> }) {
    const [selected, setSelected] = useState(new Date().getMonth() + 1);
    return (
        <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gunmetal/40 block mb-3">Espera Promedio por Mes</span>
            <div className="flex flex-wrap gap-1.5 mb-3">
                {MONTHS.map((m, i) => (
                    <button
                        key={m}
                        onClick={() => setSelected(i + 1)}
                        className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition-all ${
                            selected === i + 1 ? 'bg-celeste text-white' : 'bg-gunmetal/5 text-gunmetal/50 hover:bg-gunmetal/10'
                        }`}
                    >
                        {m}
                    </button>
                ))}
            </div>
            <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-gunmetal">{data[selected] || 0}</span>
                <span className="text-sm text-gunmetal/50">min promedio</span>
            </div>
        </div>
    );
}

/** Warning badges */
function WarningBadges({ warnings }: { warnings: Attraction['warnings'] }) {
    const active: { label: string; icon: string; color: string }[] = [];
    if (warnings.motionSickness) active.push({ label: 'Mareos', icon: 'solar:tornado-bold', color: 'text-amber-600' });
    if (warnings.darkness) active.push({ label: 'Oscuridad', icon: 'solar:moon-bold', color: 'text-indigo-500' });
    if (warnings.heights) active.push({ label: 'Alturas', icon: 'solar:arrow-up-bold', color: 'text-sky-500' });
    if (warnings.drops) active.push({ label: 'Caidas', icon: 'solar:arrow-down-bold', color: 'text-red-500' });
    if (warnings.flashingLights) active.push({ label: 'Luces Flash', icon: 'solar:flash-bold', color: 'text-yellow-500' });
    if (warnings.loudNoises) active.push({ label: 'Ruido Fuerte', icon: 'solar:volume-loud-bold', color: 'text-orange-500' });
    if (warnings.water) active.push({ label: 'Agua', icon: 'solar:drop-bold', color: 'text-blue-500' });
    if (warnings.spinning) active.push({ label: 'Giros', icon: 'solar:refresh-bold', color: 'text-purple-500' });
    if (warnings.claustrophobic) active.push({ label: 'Claustrofobia', icon: 'solar:box-minimalistic-bold', color: 'text-stone-500' });
    if (warnings.pregnancyRestriction) active.push({ label: 'No Embarazadas', icon: 'solar:heart-bold', color: 'text-pink-500' });
    if (warnings.backNeckIssues) active.push({ label: 'Espalda/Cuello', icon: 'solar:bone-bold', color: 'text-rose-500' });

    if (active.length === 0) return null;

    return (
        <div className="rounded-2xl border border-red-200 bg-red-50/50 p-5">
            <div className="flex items-center gap-2 mb-4">
                <Icon icon="solar:danger-triangle-bold-duotone" width={20} className="text-red-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">Advertencias</span>
                <div className="ml-auto flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gunmetal/40">Intensidad</span>
                    <span className={`${SCARE_COLORS[warnings.scareFactor]} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>
                        {SCARE_LABELS[warnings.scareFactor]}
                    </span>
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
                {active.map(w => (
                    <span key={w.label} className="inline-flex items-center gap-1.5 bg-white text-gunmetal text-xs font-bold px-3 py-1.5 rounded-full border border-gunmetal/5">
                        <Icon icon={w.icon} width={14} className={w.color} />
                        {w.label}
                    </span>
                ))}
            </div>
            {warnings.notes && <p className="mt-3 text-xs text-red-700/70 leading-relaxed">{warnings.notes}</p>}
        </div>
    );
}


// ===================================================
// MAIN PAGE COMPONENT
// ===================================================
export default function AttractionDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const attraction = MK_ATTRACTIONS.find((a) => a.slug === slug) as Attraction | undefined;

    // --- 404 ---
    if (!attraction) {
        return (
            <div className="min-h-screen bg-bone flex items-center justify-center font-sans">
                <div className="text-center">
                    <Icon icon="solar:ghost-bold-duotone" width={64} className="mx-auto mb-4 text-gunmetal/30" />
                    <h1 className="text-2xl font-black text-gunmetal mb-2">Atraccion no encontrada</h1>
                    <p className="text-gunmetal/60 mb-6">No existe una atraccion con el slug &quot;{slug}&quot;</p>
                    <Link href="/disney/mk" className="inline-flex items-center gap-2 bg-sunset text-gunmetal px-6 py-3 rounded-full font-bold text-sm hover:brightness-110 transition-all">
                        <Icon icon="solar:arrow-left-linear" width={16} />
                        Volver a Magic Kingdom
                    </Link>
                </div>
            </div>
        );
    }

    const safeImage = attraction.image?.trim() ? attraction.image : '/images/mk_att_heroslide_1.webp';
    const status = STATUS_MAP[attraction.status] || STATUS_MAP.open;
    const accessIcon = ACCESS_ICONS[attraction.access] || 'solar:question-circle-bold';

    return (
        <div className="min-h-screen bg-bone font-sans text-gunmetal">

            {/* ========== HERO ========== */}
            <div className="relative w-full h-[65vh] md:h-[70vh] overflow-hidden">
                <Image src={safeImage} alt={attraction.name} fill className="object-cover" priority unoptimized={safeImage.startsWith('http')} />
                <div className="absolute inset-0 bg-gradient-to-t from-gunmetal via-gunmetal/40 to-transparent" />

                {/* Back */}
                <div className="absolute top-20 left-5 md:left-10 z-20">
                    <button onClick={() => router.back()} className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2.5 rounded-full border border-white/15 hover:bg-white/20 transition-colors text-xs font-bold uppercase tracking-widest min-h-[44px]">
                        <Icon icon="solar:arrow-left-linear" width={16} />
                        <span className="hidden sm:inline">Volver</span>
                    </button>
                </div>

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-10 lg:p-20 z-20">
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>

                        {/* Tags */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="bg-white/10 backdrop-blur-md text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest border border-white/10">
                                {attraction.land}
                            </span>
                            <span className="bg-celeste/20 backdrop-blur-md text-celeste text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest border border-celeste/20">
                                {attraction.tier}
                            </span>
                            <span className={`${status.color} text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest inline-flex items-center gap-1`}>
                                <Icon icon={status.icon} width={11} />
                                {status.label}
                            </span>
                            {attraction.yearOpened && (
                                <span className="bg-white/10 text-white/60 text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
                                    Desde {attraction.yearOpened}
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[0.9] mb-2">
                            {attraction.name}
                        </h1>

                        {/* Ride System */}
                        {attraction.rideSystem && (
                            <p className="text-white/50 text-sm font-medium mt-1">{attraction.rideSystem}</p>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* ========== HUD PANEL ========== */}
            <div className="relative z-10 -mt-6 mx-4 md:mx-10 lg:mx-20">
                <motion.div
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease }}
                    className="bg-white rounded-2xl shadow-xl border border-gunmetal/5 p-5 grid grid-cols-2 md:grid-cols-5 gap-4"
                >
                    {/* Wait Time */}
                    <div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-gunmetal/40 block mb-0.5">Espera Actual</span>
                        <span className="text-xl font-black text-gunmetal">{attraction.waitTime}</span>
                    </div>
                    {/* Duration */}
                    <div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-gunmetal/40 block mb-0.5">Duracion</span>
                        <span className="text-xl font-black text-gunmetal">{attraction.duration > 0 ? `${attraction.duration} min` : 'Variable'}</span>
                    </div>
                    {/* Access */}
                    <div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-gunmetal/40 block mb-0.5">
                            <InfoTooltip label="Acceso">
                                <p className="font-normal">{attraction.accessExplained}</p>
                            </InfoTooltip>
                        </span>
                        <span className="text-sm font-black text-gunmetal inline-flex items-center gap-1.5">
                            <Icon icon={accessIcon} width={16} className="text-celeste" />
                            {attraction.access}
                        </span>
                    </div>
                    {/* Reliability */}
                    <div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-gunmetal/40 block mb-0.5">
                            <InfoTooltip label="Fiabilidad">
                                <p className="font-normal">Porcentaje del tiempo que la atraccion funciona sin cierres inesperados. <strong>Fuente:</strong> {attraction.reliabilitySource}</p>
                            </InfoTooltip>
                        </span>
                        <span className={`text-xl font-black ${attraction.reliabilityScore >= 90 ? 'text-emerald-600' : attraction.reliabilityScore >= 70 ? 'text-amber-600' : 'text-red-600'}`}>
                            {attraction.reliabilityScore}%
                        </span>
                    </div>
                    {/* Height */}
                    <div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-gunmetal/40 block mb-0.5">Altura Min.</span>
                        <span className="text-xl font-black text-gunmetal">{attraction.heightReq > 0 ? `${attraction.heightReq} cm` : 'Libre'}</span>
                    </div>
                </motion.div>
            </div>

            {/* ========== CONTENT GRID ========== */}
            <div className="mx-4 md:mx-10 lg:mx-20 py-10 grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* ======= MAIN COLUMN ======= */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Description */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3, ease }}
                        className="bg-white rounded-2xl p-6 border border-gunmetal/5 shadow-sm">
                        <h2 className="text-[10px] font-bold uppercase tracking-widest text-gunmetal/40 mb-3">Sobre esta Atraccion</h2>
                        <p className="text-gunmetal leading-relaxed">{attraction.description}</p>
                    </motion.div>

                    {/* Access Explained */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35, ease }}
                        className="bg-celeste/5 rounded-2xl p-6 border border-celeste/15">
                        <div className="flex items-center gap-2 mb-3">
                            <Icon icon={accessIcon} width={20} className="text-celeste" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-celeste">Como Acceder: {attraction.access}</span>
                        </div>
                        <p className="text-gunmetal text-sm leading-relaxed">{attraction.accessExplained}</p>
                    </motion.div>

                    {/* POV */}
                    {attraction.pov && (
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4, ease }}>
                            <POVSection pov={attraction.pov} />
                        </motion.div>
                    )}

                    {/* Secret Tip */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45, ease }}
                        className="bg-gradient-to-br from-sunset/10 to-celeste/10 rounded-2xl p-6 border border-sunset/20">
                        <div className="flex items-center gap-2 mb-2">
                            <Icon icon="solar:star-bold-duotone" width={18} className="text-sunset" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-sunset">Dato Secreto O247</span>
                        </div>
                        <p className="text-gunmetal font-medium leading-relaxed">{attraction.secretTip}</p>
                    </motion.div>

                    {/* Insider Facts */}
                    {attraction.insiderFacts && attraction.insiderFacts.length > 0 && (
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5, ease }}
                            className="bg-white rounded-2xl p-6 border border-gunmetal/5 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Icon icon="solar:lightbulb-bolt-bold-duotone" width={20} className="text-amber-500" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600">Lo que Nadie te Cuenta</span>
                            </div>
                            <ul className="space-y-2.5">
                                {attraction.insiderFacts.map((fact, i) => (
                                    <li key={i} className="flex items-start gap-2.5">
                                        <Icon icon="solar:arrow-right-bold" width={12} className="text-celeste mt-1 shrink-0" />
                                        <span className="text-sm text-gunmetal/80 leading-relaxed">{fact}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}

                    {/* Warnings */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.55, ease }}>
                        <WarningBadges warnings={attraction.warnings} />
                    </motion.div>

                    {/* Wait Time Analysis */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6, ease }}
                        className="bg-white rounded-2xl p-6 border border-gunmetal/5 shadow-sm space-y-6">
                        <div className="flex items-center gap-2 mb-1">
                            <Icon icon="solar:chart-2-bold-duotone" width={20} className="text-celeste" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-celeste">Analisis de Espera</span>
                        </div>

                        {/* Forecast Today */}
                        <ForecastChart data={attraction.forecastToday} label="Estimado Hoy por Franja Horaria" />

                        {/* Monthly */}
                        <div className="pt-4 border-t border-gunmetal/5">
                            <MonthlyAverage data={attraction.avgWaitByMonth} />
                        </div>

                        {/* Best Time */}
                        <div className="pt-4 border-t border-gunmetal/5 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                                <Icon icon="solar:clock-circle-bold-duotone" width={20} className="text-emerald-600" />
                            </div>
                            <div>
                                <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-600 block">Mejor Momento</span>
                                <span className="text-sm font-bold text-gunmetal">{attraction.bestTime}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Related Activities */}
                    {attraction.relatedActivities && attraction.relatedActivities.length > 0 && (
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.65, ease }}
                            className="bg-white rounded-2xl p-6 border border-gunmetal/5 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Icon icon="solar:compass-big-bold-duotone" width={20} className="text-purple-500" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-purple-500">Actividades Cercanas</span>
                            </div>
                            <div className="space-y-3">
                                {attraction.relatedActivities.map((act, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 bg-gunmetal/[0.02] rounded-xl">
                                        <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                                            <Icon icon={ACTIVITY_ICONS[act.type] || 'solar:star-bold-duotone'} width={16} className="text-purple-500" />
                                        </div>
                                        <div>
                                            <span className="text-sm font-bold text-gunmetal block">{act.title}</span>
                                            <span className="text-xs text-gunmetal/60 leading-relaxed">{act.description}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* ======= SIDEBAR ======= */}
                <div className="space-y-5">

                    {/* Specs Card */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4, ease }}
                        className="bg-gunmetal rounded-2xl p-5 text-white">
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-5">Especificaciones</h3>
                        <div className="space-y-4">
                            {[
                                { icon: 'solar:ruler-bold-duotone', label: 'Altura Minima', value: attraction.heightReq > 0 ? `${attraction.heightReq} cm` : 'Sin restriccion' },
                                { icon: 'solar:stopwatch-bold-duotone', label: 'Duracion', value: attraction.duration > 0 ? `${attraction.duration} min` : 'Variable' },
                                { icon: 'solar:snowflake-bold-duotone', label: 'Aire Acondicionado', value: attraction.hasAc ? 'Si' : 'No' },
                                { icon: 'solar:home-bold-duotone', label: 'Interior', value: attraction.isIndoor ? 'Si' : 'No' },
                                { icon: 'solar:settings-bold-duotone', label: 'Sistema', value: attraction.rideSystem },
                                { icon: 'solar:calendar-bold-duotone', label: 'Inauguracion', value: String(attraction.yearOpened) },
                                ...(attraction.capacity ? [{ icon: 'solar:users-group-rounded-bold-duotone', label: 'Capacidad', value: `${attraction.capacity} pasajeros` }] : []),
                                { icon: 'solar:map-point-bold-duotone', label: 'Mapa #', value: String(attraction.mapId) },
                            ].map((spec, i) => (
                                <React.Fragment key={i}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2.5">
                                            <Icon icon={spec.icon} width={16} className="text-celeste" />
                                            <span className="text-xs font-medium text-white/60">{spec.label}</span>
                                        </div>
                                        <span className="text-xs font-bold text-right max-w-[50%]">{spec.value}</span>
                                    </div>
                                    {i < 7 && <div className="w-full h-px bg-white/5" />}
                                </React.Fragment>
                            ))}
                        </div>
                    </motion.div>

                    {/* Lockers */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45, ease }}
                        className={`rounded-2xl p-5 border ${attraction.lockers.required ? 'bg-amber-50 border-amber-200' : 'bg-white border-gunmetal/5'}`}>
                        <div className="flex items-center gap-2 mb-3">
                            <Icon icon="solar:lock-keyhole-bold-duotone" width={18} className={attraction.lockers.required ? 'text-amber-600' : 'text-gunmetal/40'} />
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${attraction.lockers.required ? 'text-amber-600' : 'text-gunmetal/40'}`}>
                                Lockers {attraction.lockers.required && '— OBLIGATORIO'}
                            </span>
                        </div>
                        {attraction.lockers.required ? (
                            <div className="space-y-1.5 text-sm">
                                <p className="text-gunmetal"><strong>Ubicacion:</strong> {attraction.lockers.location}</p>
                                <p className="text-gunmetal"><strong>Costo:</strong> {attraction.lockers.cost}</p>
                                {attraction.lockers.notes && <p className="text-amber-700 text-xs leading-relaxed mt-2">{attraction.lockers.notes}</p>}
                            </div>
                        ) : (
                            <p className="text-xs text-gunmetal/50">No se requieren lockers. Podes llevar tu mochila/cartera.</p>
                        )}
                    </motion.div>

                    {/* Photo/Camera Policy */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5, ease }}
                        className="bg-white rounded-2xl p-5 border border-gunmetal/5">
                        <div className="flex items-center gap-2 mb-3">
                            <Icon icon="solar:camera-bold-duotone" width={18} className="text-gunmetal/40" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gunmetal/40">Fotografia y Filmacion</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            {[
                                { label: 'Celular', ok: attraction.photoPolicy.phonesAllowed },
                                { label: 'Camara', ok: attraction.photoPolicy.camerasAllowed },
                                { label: 'GoPro', ok: attraction.photoPolicy.goProAllowed },
                                { label: 'Flash', ok: attraction.photoPolicy.flashAllowed },
                            ].map(p => (
                                <div key={p.label} className="flex items-center gap-1.5">
                                    <Icon icon={p.ok ? 'solar:check-circle-bold' : 'solar:close-circle-bold'} width={14}
                                        className={p.ok ? 'text-emerald-500' : 'text-red-400'} />
                                    <span className="text-gunmetal/70">{p.label}</span>
                                </div>
                            ))}
                        </div>
                        {attraction.photoPolicy.hasOnRidePhoto && (
                            <div className="mt-3 pt-3 border-t border-gunmetal/5 flex items-center gap-2">
                                <Icon icon="solar:camera-add-bold" width={14} className="text-celeste" />
                                <span className="text-xs text-gunmetal/70">
                                    Foto automatica {attraction.photoPolicy.photoPassIncluded ? '(incluida en Memory Maker)' : '(compra separada)'}
                                </span>
                            </div>
                        )}
                        {attraction.photoPolicy.notes && (
                            <p className="mt-2 text-[11px] text-gunmetal/50 leading-relaxed">{attraction.photoPolicy.notes}</p>
                        )}
                    </motion.div>

                    {/* Accessibility */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.55, ease }}
                        className="bg-white rounded-2xl p-5 border border-gunmetal/5">
                        <div className="flex items-center gap-2 mb-3">
                            <Icon icon="solar:wheelchair-bold-duotone" width={18} className="text-blue-500" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500">Accesibilidad</span>
                        </div>
                        <div className="space-y-2 text-xs">
                            {[
                                { label: 'Silla de ruedas', ok: attraction.accessibility.wheelchair },
                                { label: 'Requiere transferencia', ok: !attraction.accessibility.mustTransfer, invertLogic: true },
                                { label: 'Animales de servicio', ok: attraction.accessibility.serviceAnimals },
                                { label: 'Subtitulos', ok: attraction.accessibility.closedCaptions },
                                { label: 'Escucha asistida', ok: attraction.accessibility.assistiveListening },
                                { label: 'Descripcion en audio', ok: attraction.accessibility.audioDescription },
                            ].map(a => (
                                <div key={a.label} className="flex items-center gap-2">
                                    <Icon icon={a.ok ? 'solar:check-circle-bold' : 'solar:close-circle-bold'} width={14}
                                        className={a.ok ? 'text-emerald-500' : 'text-red-400'} />
                                    <span className="text-gunmetal/70">{a.label}</span>
                                </div>
                            ))}
                        </div>
                        {attraction.accessibility.notes && (
                            <p className="mt-3 text-[11px] text-blue-600/70 leading-relaxed bg-blue-50 rounded-lg p-2">{attraction.accessibility.notes}</p>
                        )}
                    </motion.div>

                    {/* Vibes */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6, ease }}
                        className="bg-white rounded-2xl p-5 border border-gunmetal/5">
                        <div className="flex items-center gap-2 mb-3">
                            <Icon icon="solar:heart-pulse-bold-duotone" width={18} className="text-purple-500" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-purple-500">Vibes</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {attraction.vibes.map(v => (
                                <span key={v} className="bg-gunmetal/5 text-gunmetal px-3 py-1.5 rounded-full text-xs font-bold">{v}</span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Powered by Queue-Times */}
                    <div className="text-center pt-2">
                        <a href="https://queue-times.com/en-US" target="_blank" rel="noopener noreferrer"
                            className="text-[9px] text-gunmetal/30 hover:text-gunmetal/50 transition-colors">
                            Tiempos en vivo: Powered by Queue-Times.com
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}