"use client";

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
// DESPUÉS (O247 Icon System — LOCAL, FUNCIONA SIEMPRE)
import { Icon } from "@/components/Icon";

// DATA EXTERNA
import { GLOSSARY_DB, LANDS_DATA, BUCKET_ITEMS, BUCKET_LEVELS } from '@/data/mk-data';
import { TRANSPORT_RATES, ORIGIN_ZONES_DETAILED } from '@/data/mk-logistics';

// ============================================================
// HERO SLIDER CONFIG
// ============================================================

const HERO_IMAGES = [
  '/images/mk_att_heroslide_1.webp',
  '/images/mk_att_heroslide_2.jpg',
  '/images/mk_att_heroslide_3.webp',
  '/images/mk_att_heroslide_4.jpg',
  '/images/mk_att_heroslide_5.jpg',
  '/images/mk_att_heroslide_6.jpg',
  '/images/mk_att_heroslide_7.jpg',
  '/images/mk_att_heroslide_8.jpg',
  '/images/mk_att_heroslide_9.jpg',
];

// ============================================================
// MODALES
// ============================================================

function GlossaryModal({ termKey, onClose }: { termKey: string | null, onClose: () => void }) {
    useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = ''; }; }, []);
    if (!termKey || !GLOSSARY_DB[termKey]) return null;
    const data = GLOSSARY_DB[termKey];
    return createPortal(
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9999] flex items-center justify-center px-6">
            <div className="absolute inset-0 bg-gunmetal/60 backdrop-blur-xl" onClick={onClose} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative w-full max-w-md mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-gray-50/50 p-4 flex justify-between items-center border-b border-gray-100">
                    <span className="text-[10px] font-bold uppercase tracking-widest font-mono text-celeste">Glosario O247</span>
                    <button onClick={onClose}><Icon icon="solar:close-circle-bold" className="w-6 h-6 text-gray-400" /></button>
                </div>
                <div className="p-8">
                    <h3 className="text-2xl font-black text-gunmetal font-mono mb-4">{data.title}</h3>
                    <p className="text-sm text-gunmetal/80 font-sans leading-relaxed">{data.def}</p>
                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
}

function MapModal({ onClose }: { onClose: () => void }) {
    useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = ''; }; }, []);
    return createPortal(
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gunmetal/80 backdrop-blur-xl" onClick={onClose}>
            <div className="relative w-full h-full max-w-[90vw] max-h-[90vh] bg-white rounded-2xl overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="bg-white p-4 flex justify-between items-center border-b border-gray-100 shrink-0">
                    <h3 className="text-sm font-bold text-gunmetal font-mono uppercase">Mapa Oficial 2026</h3>
                    <button onClick={onClose}><Icon icon="solar:close-circle-bold" className="w-8 h-8 text-gunmetal/30" /></button>
                </div>
                <div className="flex-1 w-full bg-gray-100 relative">
                    <iframe src="/maps/MK_0126_SP_mapa.pdf#view=FitH&toolbar=0&navpanes=0&scrollbar=0" className="w-full h-full border-none" title="Mapa Magic Kingdom PDF" />
                </div>
            </div>
        </motion.div>, document.body
    );
}

function Term({ id, children, onOpen }: { id: string, children: React.ReactNode, onOpen: (id: string) => void }) {
    return (
        <span onClick={(e) => { e.stopPropagation(); onOpen(id); }} className="cursor-help font-bold text-gunmetal border-b-2 border-dashed border-sunset/40 hover:border-sunset hover:text-sunset transition-colors px-0.5">
            {children}
        </span>
    );
}

// ============================================================
// ANIMATION VARIANTS
// ============================================================

const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };

// ============================================================
// SECCION UNO: LOGISTICA Y PROTOCOLO DE ARRIBO
// ============================================================

type TransportOption = 'bus' | 'car' | 'uber';
type UserOrigin = 'resort' | 'external';

interface RouteStep {
    icon: string;
    label: string;
    time: number;
    mode: 'walk' | 'ride' | 'transfer' | 'wait' | 'destination';
    isWarning?: boolean;
}

interface CostBreakdown {
    label: string;
    amount: number;
    isFree?: boolean;
}

function TransportCard({ label, subLabel, selected, onClick, imageSrc, type }: {
    label: string; subLabel: string; selected: boolean; onClick: () => void;
    imageSrc: string; type: TransportOption;
}) {
    return (
        <motion.button
            onClick={onClick}
            layout="position"
            whileHover={{ y: -2, transition: { duration: 0.3, ease: 'easeOut' } }}
            whileTap={{ scale: 0.99 }}
            className={`relative h-32 w-full rounded-2xl border-2 transition-all duration-300 text-left overflow-visible group ${
                selected ? 'border-celeste bg-white ring-2 ring-celeste/30 shadow-lg shadow-celeste/10 z-10' :
                'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md z-0'
            }`}
        >
            <div className="absolute bottom-3 left-4 z-10 max-w-[60%] leading-tight">
                <span className={`block text-[11px] font-black uppercase tracking-wider ${selected ? 'text-celeste' : 'text-gunmetal'}`}>{label}</span>
                <span className="block text-[9px] font-bold text-gunmetal/40 mt-0.5">{subLabel}</span>
            </div>
            <div className={`absolute transition-all duration-500 z-20 pointer-events-none ${
                type === 'bus' ? '-right-6 -top-10 w-52 h-40' :
                type === 'car' ? '-right-3 -top-6 w-44 h-32' :
                '-right-4 -top-5 w-36 h-36'
            } ${selected ? 'scale-110 -translate-y-2' : 'group-hover:scale-105 group-hover:-translate-y-1'}`}>
                <img src={imageSrc} alt={label} className="w-full h-full object-contain drop-shadow-xl" />
            </div>
        </motion.button>
    );
}

function RouteStepper({ steps }: { steps: RouteStep[] }) {
    return (
        <div className="w-full py-8">
            <div className="flex items-center justify-between relative">
                {steps.map((step, index) => {
                    const isLast = index === steps.length - 1;
                    const isFirst = index === 0;
                    const isWalking = step.mode === 'walk' || step.mode === 'wait';
                    return (
                        <React.Fragment key={index}>
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: index * 0.12, duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
                                className="relative flex flex-col items-center z-10"
                            >
                                {step.time > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.12 + 0.4, duration: 0.4, ease: 'easeOut' }}
                                        className={`absolute -top-9 px-2 py-1 rounded-lg text-[9px] font-bold font-mono whitespace-nowrap ${
                                            step.isWarning ? 'bg-orange-100 text-orange-600' : 'bg-celeste/10 text-celeste'
                                        }`}
                                    >
                                        {step.time} min
                                    </motion.div>
                                )}
                                <motion.div
                                    initial={{ backgroundColor: '#F8FAFC', borderColor: '#E5E7EB' }}
                                    animate={{
                                        backgroundColor: step.isWarning ? '#FFF7ED' : isFirst || isLast ? '#25343F' : '#F8FAFC',
                                        borderColor: step.isWarning ? '#FB923C' : isFirst || isLast ? '#25343F' : '#00B4D8',
                                        boxShadow: step.isWarning
                                            ? '0 0 0 4px rgba(251,146,60,0.1)'
                                            : isFirst || isLast ? '0 2px 8px rgba(37,52,63,0.15)' : '0 0 0 3px rgba(0,180,216,0.08)',
                                    }}
                                    transition={{ delay: index * 0.12 + 0.15, duration: 0.6, ease: 'easeOut' }}
                                    className="w-11 h-11 rounded-full border-2 flex items-center justify-center relative"
                                >
                                    <Icon icon={step.icon} width={18} className={step.isWarning ? 'text-orange-500' : isFirst || isLast ? 'text-white' : 'text-celeste'} />
                                    {step.isWarning && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1, scale: [1, 1.3, 1] }}
                                            transition={{ opacity: { delay: index * 0.12 + 0.5 }, scale: { repeat: Infinity, duration: 2.5, ease: 'easeInOut' } }}
                                            className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white"
                                        />
                                    )}
                                </motion.div>
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.12 + 0.3, duration: 0.4 }}
                                    className={`mt-2 text-[9px] font-bold uppercase tracking-widest text-center ${step.isWarning ? 'text-orange-500' : 'text-gunmetal/50'}`}
                                >
                                    {step.label}
                                </motion.span>
                            </motion.div>
                            {!isLast && (
                                <div className="flex-1 relative mx-2 mt-[-6px]">
                                    {isWalking ? (
                                        <div className="w-full h-[2px] border-b-2 border-dashed border-gray-200" />
                                    ) : (
                                        <div className="w-full h-[2px] bg-gray-200 rounded-full" />
                                    )}
                                    <motion.div
                                        initial={{ width: '0%' }}
                                        animate={{ width: '100%' }}
                                        transition={{ delay: index * 0.12 + 0.3, duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
                                        className="absolute top-0 left-0 h-[2px]"
                                    >
                                        {isWalking ? (
                                            <div className={`w-full h-full border-b-2 border-dashed ${steps[index + 1]?.isWarning ? 'border-orange-400' : 'border-celeste/60'}`} />
                                        ) : (
                                            <div className={`w-full h-full rounded-full ${steps[index + 1]?.isWarning ? 'bg-orange-400' : 'bg-celeste'}`} />
                                        )}
                                    </motion.div>
                                    <motion.div
                                        initial={{ left: '0%', opacity: 0 }}
                                        animate={{ left: '50%', opacity: 0.6 }}
                                        transition={{ delay: index * 0.12 + 0.6, duration: 0.6, ease: 'easeOut' }}
                                        className="absolute -top-2.5 -ml-2"
                                    >
                                        <Icon
                                            icon={isWalking ? 'solar:walking-round-bold' : step.mode === 'ride' ? 'solar:bus-bold' : step.mode === 'transfer' ? 'solar:transfer-horizontal-bold' : 'solar:route-bold'}
                                            width={12}
                                            className={steps[index + 1]?.isWarning ? 'text-orange-400' : 'text-celeste'}
                                        />
                                    </motion.div>
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}

function OnboardingBanner({ onDismiss }: { onDismiss: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="mb-6 bg-celeste/5 border border-celeste/20 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                {[
                    { step: '1', text: 'Elegi donde dormis' },
                    { step: '2', text: 'Elegi como llegas' },
                    { step: '3', text: 'Mira el veredicto' },
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-celeste text-white text-[10px] font-bold flex items-center justify-center shrink-0">{item.step}</span>
                        <span className="text-xs font-medium text-gunmetal/70 whitespace-nowrap">{item.text}</span>
                        {i < 2 && <Icon icon="solar:arrow-right-linear" width={12} className="text-gunmetal/20 ml-2 hidden sm:block" />}
                    </div>
                ))}
            </div>
            <button onClick={onDismiss} className="p-1.5 rounded-full hover:bg-gunmetal/5 transition-colors shrink-0">
                <Icon icon="solar:close-circle-linear" width={18} className="text-gunmetal/30" />
            </button>
        </motion.div>
    );
}

function LogisticsContent() {
    const [userType, setUserType] = useState<UserOrigin>('resort');
    const [transport, setTransport] = useState<TransportOption>('bus');
    const [selectedOrigin, setSelectedOrigin] = useState<string | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showComparison, setShowComparison] = useState(false);
    const [showOnboarding, setShowOnboarding] = useState(true);
    const [unit, setUnit] = useState<'km' | 'mi'>('km');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toDisplay = (miles: number) => {
        if (unit === 'km') return (miles * 1.60934).toFixed(1);
        return miles.toFixed(1);
    };

    const availableZones = ORIGIN_ZONES_DETAILED.filter(zone =>
        userType === 'resort' ? zone.options.some(o => o.type === 'disney') : zone.options.some(o => o.type === 'off')
    );

    const allOptions = ORIGIN_ZONES_DETAILED.flatMap(z => z.options);
    const originData = allOptions.find(o => o.id === selectedOrigin);
    const distance = originData?.distance || (userType === 'resort' ? 5 : 12);
    const originMode = originData?.mode || 'bus';

    useEffect(() => {
        if (userType === 'external') { setTransport('car'); setSelectedOrigin(null); }
        else { setTransport('bus'); setSelectedOrigin(null); }
    }, [userType]);

    useEffect(() => {
        if (selectedOrigin || transport !== 'bus') setShowOnboarding(false);
    }, [selectedOrigin, transport]);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIsDropdownOpen(false);
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const hasTTC = transport === 'car';

    function calculateRoute(): RouteStep[] {
        const steps: RouteStep[] = [];
        steps.push({ icon: userType === 'resort' ? 'solar:bed-bold' : 'solar:city-bold', label: userType === 'resort' ? 'Hotel' : 'Hospedaje', time: 0, mode: 'walk' });
        if (transport === 'bus' && userType === 'resort') {
            steps.push({ icon: 'solar:clock-circle-bold', label: 'Espera', time: TRANSPORT_RATES.friction.bus_wait, mode: 'wait' });
            steps.push({ icon: originMode === 'monorail' ? 'solar:train-bold' : originMode === 'boat' ? 'solar:sailing-bold' : 'solar:bus-bold', label: originMode === 'monorail' ? 'Monorail' : originMode === 'boat' ? 'Boat' : 'Bus', time: Math.round((distance / TRANSPORT_RATES.speeds.bus_mph) * 60), mode: 'ride' });
        } else if (transport === 'car') {
            steps.push({ icon: 'solar:wheel-bold', label: 'Conducir', time: Math.round((distance / TRANSPORT_RATES.speeds.car_mph) * 60), mode: 'ride' });
            steps.push({ icon: 'solar:ticket-bold', label: 'TTC', time: TRANSPORT_RATES.friction.ttc_transfer, mode: 'transfer', isWarning: true });
            steps.push({ icon: 'solar:sailing-bold', label: 'Ferry', time: 12, mode: 'ride' });
        } else if (transport === 'uber') {
            steps.push({ icon: 'solar:smartphone-2-bold', label: 'Uber', time: Math.round((distance / TRANSPORT_RATES.speeds.car_mph) * 60) + 5, mode: 'ride' });
        }
        steps.push({ icon: 'solar:shield-check-bold', label: 'Security', time: TRANSPORT_RATES.friction.security_check, mode: 'walk' });
        steps.push({ icon: 'solar:castle-bold', label: 'MK', time: 0, mode: 'destination' });
        return steps;
    }

    const routeSteps = calculateRoute();
    const totalTime = routeSteps.reduce((sum, s) => sum + s.time, 0);

    function calculateCosts(): { items: CostBreakdown[]; total: number } {
        const items: CostBreakdown[] = [];
        if (transport === 'bus' && userType === 'resort') {
            items.push({ label: 'Bus Disney', amount: 0, isFree: true });
        } else if (transport === 'car') {
            items.push(userType === 'resort' ? { label: 'Parking (Huesped)', amount: 0, isFree: true } : { label: 'Parking Standard', amount: TRANSPORT_RATES.costs.parking_standard });
            items.push({ label: 'Gasolina (est.)', amount: Math.round(distance * 0.15 * 100) / 100 });
        } else if (transport === 'uber') {
            items.push({ label: 'Uber/Lyft (est.)', amount: Math.round((TRANSPORT_RATES.costs.uber_base + distance * TRANSPORT_RATES.costs.uber_mile) * 100) / 100 });
        }
        return { items, total: items.reduce((sum, i) => sum + i.amount, 0) };
    }

    const costs = calculateCosts();
    const isEfficient = !hasTTC && totalTime < 40;

    function getComparisonData() {
        const opts: { label: string; time: number; cost: number; hasTTC: boolean }[] = [];
        if (userType === 'resort') {
            const t = TRANSPORT_RATES.friction.bus_wait + Math.round((distance / TRANSPORT_RATES.speeds.bus_mph) * 60) + TRANSPORT_RATES.friction.security_check;
            opts.push({ label: 'Bus Disney', time: t, cost: 0, hasTTC: false });
        }
        const carDrive = Math.round((distance / TRANSPORT_RATES.speeds.car_mph) * 60);
        opts.push({ label: 'Auto', time: carDrive + TRANSPORT_RATES.friction.ttc_transfer + 12 + TRANSPORT_RATES.friction.security_check, cost: userType === 'resort' ? 0 : TRANSPORT_RATES.costs.parking_standard, hasTTC: true });
        opts.push({ label: 'Uber/Lyft', time: carDrive + 5 + TRANSPORT_RATES.friction.security_check, cost: Math.round(TRANSPORT_RATES.costs.uber_base + distance * TRANSPORT_RATES.costs.uber_mile), hasTTC: false });
        return opts;
    }

    const getCategoryBadge = (zoneLabel: string) => {
        if (zoneLabel.includes('Magic Kingdom')) return { label: 'DELUXE', color: 'bg-amber-100 text-amber-700 border-amber-200' };
        if (zoneLabel.includes('Epcot')) return { label: 'MODERATE', color: 'bg-celeste/10 text-celeste border-celeste/20' };
        if (zoneLabel.includes('Animal')) return { label: 'VALUE', color: 'bg-sunset/10 text-sunset border-sunset/20' };
        return { label: 'OFF-SITE', color: 'bg-gray-100 text-gray-600 border-gray-200' };
    };

    const originLabel = originData?.label || (userType === 'resort' ? 'Seleccionar Hotel Disney...' : 'Seleccionar Zona...');

    return (
        <div className="flex flex-col gap-6">
            <AnimatePresence>{showOnboarding && <OnboardingBanner onDismiss={() => setShowOnboarding(false)} />}</AnimatePresence>
            <h2 className="text-3xl font-black text-gunmetal font-sans">Cómo Llegar a Magic Kingdom</h2>
            <p className="text-sm text-gunmetal/50 -mt-4">Simulá tu ruta y descubrí los tiempos y costos reales de cada opción.</p>

            <div className="flex items-center gap-2 -mt-2">
                <span className="text-[9px] font-bold uppercase tracking-widest text-gunmetal/30 font-mono">Distancias en</span>
                <div className="flex p-0.5 bg-gray-100 rounded-lg">
                    <button onClick={() => setUnit('km')} className={`px-3 py-1 text-[10px] font-bold uppercase rounded-md transition-all duration-300 ${unit === 'km' ? 'bg-white text-gunmetal shadow-sm' : 'text-gunmetal/30'}`}>KM</button>
                    <button onClick={() => setUnit('mi')} className={`px-3 py-1 text-[10px] font-bold uppercase rounded-md transition-all duration-300 ${unit === 'mi' ? 'bg-white text-gunmetal shadow-sm' : 'text-gunmetal/30'}`}>MI</button>
                </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-8 items-start">
                <div className="flex-1 w-full space-y-6">
                    <div className="flex p-1.5 bg-gray-100 rounded-2xl">
                        <button onClick={() => setUserType('resort')} className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-xl ${userType === 'resort' ? 'bg-sunset text-white shadow-md shadow-sunset/20' : 'text-gunmetal/40 hover:text-gunmetal/60'}`}>Hotel Disney</button>
                        <button onClick={() => setUserType('external')} className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-xl ${userType === 'external' ? 'bg-sunset text-white shadow-md shadow-sunset/20' : 'text-gunmetal/40 hover:text-gunmetal/60'}`}>Fuera de Disney</button>
                    </div>

                    <div className="relative" ref={dropdownRef}>
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl border-2 transition-all duration-300 bg-white ${isDropdownOpen ? 'border-celeste shadow-lg shadow-celeste/10' : 'border-gray-200 hover:border-gray-300'}`}>
                            <div className="flex items-center gap-3">
                                <Icon icon={userType === 'resort' ? 'solar:bed-bold' : 'solar:city-bold'} width={18} className="text-gunmetal/40" />
                                <span className={`text-sm font-medium ${selectedOrigin ? 'text-gunmetal' : 'text-gunmetal/40'}`}>{originLabel}</span>
                            </div>
                            <Icon icon="solar:alt-arrow-down-linear" width={16} className={`text-gunmetal/30 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.3 }} className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
                                    <div className="max-h-[300px] overflow-y-auto p-2">
                                        {availableZones.map((zone) => {
                                            const badge = getCategoryBadge(zone.label);
                                            return (
                                                <div key={zone.label}>
                                                    <div className="flex items-center gap-2 px-3 py-2 mt-1 first:mt-0">
                                                        <Icon icon={zone.icon} width={14} className="text-gunmetal/30" />
                                                        <span className="text-[9px] font-bold uppercase tracking-widest text-gunmetal/30 font-mono">{zone.label}</span>
                                                        <span className={`ml-auto text-[8px] font-bold px-2 py-0.5 rounded-full border ${badge.color}`}>{badge.label}</span>
                                                    </div>
                                                    {zone.options.filter(o => userType === 'resort' ? o.type === 'disney' : o.type === 'off').map((option) => (
                                                        <button key={option.id} onClick={() => { setSelectedOrigin(option.id); setIsDropdownOpen(false); }} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${selectedOrigin === option.id ? 'bg-celeste/10 text-celeste' : 'text-gunmetal/70 hover:bg-gray-50'}`}>
                                                            <span>{option.label}</span>
                                                            <span className="text-[10px] font-mono text-gunmetal/30">{toDisplay(option.distance)} {unit}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="pt-8">
                        <div className={`grid gap-5 ${userType === 'resort' ? 'grid-cols-3' : 'grid-cols-2'}`}>
                            <AnimatePresence>
                                {userType === 'resort' && (
                                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95, width: 0 }} transition={{ duration: 0.4 }}>
                                        <TransportCard label="Bus Oficial" subLabel="Gratis" selected={transport === 'bus'} onClick={() => setTransport('bus')} imageSrc="/images/bus_render.png" type="bus" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <TransportCard label="Auto Propio" subLabel={userType === 'resort' ? 'Parking Gratis' : `Parking $${TRANSPORT_RATES.costs.parking_standard}`} selected={transport === 'car'} onClick={() => setTransport('car')} imageSrc="/images/car_render.png" type="car" />
                            <TransportCard label="Uber / Lyft" subLabel="Rideshare" selected={transport === 'uber'} onClick={() => setTransport('uber')} imageSrc="/images/uberlyft_render.png" type="uber" />
                        </div>
                    </div>

                    <RouteStepper steps={routeSteps} />

                    <AnimatePresence>
                        {hasTTC && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                                <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-0.5"><Icon icon="solar:danger-triangle-bold" width={20} className="text-orange-500" /></div>
                                    <div>
                                        <h4 className="text-sm font-bold text-orange-800 mb-1">Atención: Ruta con TTC</h4>
                                        <p className="text-xs text-orange-700/80 leading-relaxed">Magic Kingdom es el unico parque donde <strong>no podes estacionar directamente</strong>. Los autos van al TTC, y de ahí cruzas en ferry o monorail. Esto agrega <strong>~{TRANSPORT_RATES.friction.ttc_transfer} minutos</strong>.</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* PANEL RESUMEN */}
                <div className="w-full xl:w-[340px] shrink-0 xl:sticky xl:top-24">
                    <motion.div layout className="bg-gunmetal text-white rounded-2xl shadow-2xl overflow-hidden">
                        <div className={`px-6 py-4 flex items-center gap-3 ${isEfficient ? 'bg-emerald-500/20' : 'bg-orange-500/20'}`}>
                            <Icon icon={isEfficient ? 'solar:check-circle-bold' : 'solar:danger-triangle-bold'} width={20} className={isEfficient ? 'text-emerald-400' : 'text-orange-400'} />
                            <span className={`text-xs font-bold uppercase tracking-widest ${isEfficient ? 'text-emerald-400' : 'text-orange-400'}`}>{isEfficient ? 'Ruta Eficiente' : 'Ruta con Friccion'}</span>
                        </div>
                        <div className="px-6 py-5 border-b border-white/10">
                            <div className="flex justify-between items-end">
                                <div><span className="text-[9px] font-bold uppercase tracking-widest text-white/40 block mb-1">Tiempo Total</span><span className="text-3xl font-black font-mono">{totalTime} min</span></div>
                                <div className="text-right"><span className="text-[9px] font-bold uppercase tracking-widest text-white/40 block mb-1">Costo Total</span><span className={`text-3xl font-black font-mono ${costs.total === 0 ? 'text-emerald-400' : 'text-white'}`}>{costs.total === 0 ? 'GRATIS' : `$${costs.total}`}</span></div>
                            </div>
                            <div className="mt-4">
                                <div className="flex justify-between items-center mb-1.5"><span className="text-[9px] font-bold uppercase tracking-widest text-white/30">Friccion</span><span className="text-[9px] font-bold font-mono text-white/30">{hasTTC ? 'ALTA' : 'BAJA'}</span></div>
                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden"><motion.div initial={{ width: '0%' }} animate={{ width: hasTTC ? '85%' : '20%' }} transition={{ duration: 1.2 }} className={`h-full rounded-full ${hasTTC ? 'bg-gradient-to-r from-orange-400 to-red-500' : 'bg-gradient-to-r from-emerald-400 to-celeste'}`} /></div>
                            </div>
                        </div>
                        <div className="px-6 py-5">
                            <AnimatePresence mode="wait">
                                {!showComparison ? (
                                    <motion.div key="breakdown" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        <span className="text-[9px] font-bold uppercase tracking-widest text-white/30 mb-3 block">Desglose</span>
                                        <div className="space-y-3">
                                            {costs.items.map((item, i) => (
                                                <div key={i} className="flex justify-between items-center"><span className="text-xs text-white/60">{item.label}</span><span className={`text-sm font-bold font-mono ${item.isFree ? 'text-emerald-400' : 'text-white'}`}>{item.isFree ? 'GRATIS' : `$${item.amount}`}</span></div>
                                            ))}
                                            {hasTTC && (<div className="flex justify-between items-center pt-2 border-t border-white/10"><span className="text-xs text-orange-400">Penalidad TTC</span><span className="text-sm font-bold font-mono text-orange-400">+{TRANSPORT_RATES.friction.ttc_transfer} min</span></div>)}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div key="comparison" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        <span className="text-[9px] font-bold uppercase tracking-widest text-white/30 mb-3 block">Comparativa</span>
                                        <div className="space-y-3">
                                            {getComparisonData().map((opt, i) => (
                                                <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${opt.hasTTC ? 'border-orange-500/30 bg-orange-500/5' : 'border-white/10 bg-white/5'}`}>
                                                    <div><span className="text-xs font-bold text-white block">{opt.label}</span>{opt.hasTTC && <span className="text-[9px] text-orange-400">Incluye TTC</span>}</div>
                                                    <div className="text-right"><span className="text-xs font-mono text-white/60 block">{opt.time} min</span><span className={`text-xs font-bold font-mono ${opt.cost === 0 ? 'text-emerald-400' : 'text-white'}`}>{opt.cost === 0 ? 'GRATIS' : `$${opt.cost}`}</span></div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <button onClick={() => setShowComparison(!showComparison)} className="mt-4 w-full py-3 rounded-xl border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-white hover:border-white/20 transition-colors flex items-center justify-center gap-2">
                                <Icon icon="solar:refresh-bold" width={14} className={`transition-transform duration-300 ${showComparison ? 'rotate-180' : ''}`} />
                                {showComparison ? 'Ver Desglose' : 'Comparar Opciones'}
                            </button>
                        </div>
                        {!isEfficient && (
                            <div className="px-6 pb-5">
                                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                    <p className="text-[10px] text-white/40 leading-relaxed"><Icon icon="solar:lightbulb-bold" width={12} className="inline text-sunset mr-1" /><strong className="text-white/60">Tip:</strong> Si vas en auto, llega 30 minutos antes de la apertura para minimizar la espera del TTC.</p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

// ============================================================
// SECCION DOS: ESTRATEGIA DE TIEMPOS
// ============================================================

function StrategyContent() {
    const [activeStep, setActiveStep] = useState(0);
    const [activeTerm, setActiveTerm] = useState<string | null>(null);
    const educationalSteps = [
        { title: "Densidad & Fatiga", tag: "CORE LOGIC", icon: "solar:graph-up-bold-duotone", content: <>MK es denso. Dividir el parque reduce el estres en un 40%.</> },
        { title: "Protocolo Apertura", tag: "LOGISTICA", icon: "solar:alarm-play-bold-duotone", content: <>Usa <Term id="early-entry" onOpen={setActiveTerm}>Early Entry</Term> para Fantasyland si eres huesped.</> },
        { title: "Barreras Digitales", tag: "VIRTUAL QUEUE", icon: "solar:smartphone-2-bold-duotone", content: <>TRON usa <Term id="virtual-queue" onOpen={setActiveTerm}>Fila Virtual</Term>. Solicita a las 7:00 AM.</> },
    ];
    return (
        <>
            <AnimatePresence>{activeTerm && <GlossaryModal termKey={activeTerm} onClose={() => setActiveTerm(null)} />}</AnimatePresence>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3 bg-bone rounded-xl p-6 flex flex-col justify-between border border-gray-200">
                    <div><span className="text-8xl font-black text-gunmetal">02</span><span className="text-lg font-bold text-sunset ml-2">DIAS</span></div>
                    <p className="text-xs text-gunmetal/60 font-medium">Tiempo minimo recomendado.</p>
                </div>
                <div className="w-full md:w-2/3 bg-white border border-gray-100 rounded-xl p-6 relative">
                    <div className="flex justify-between mb-4">
                        <div className="flex items-center gap-2"><Icon icon={educationalSteps[activeStep].icon} className="text-celeste w-5 h-5" /><h4 className="text-lg font-bold text-gunmetal">{educationalSteps[activeStep].title}</h4></div>
                        <div className="flex gap-2">
                            <button onClick={() => setActiveStep(p => Math.max(0, p - 1))}><Icon icon="solar:arrow-left-linear" /></button>
                            <span className="text-xs font-mono">{activeStep + 1}/{educationalSteps.length}</span>
                            <button onClick={() => setActiveStep(p => Math.min(educationalSteps.length - 1, p + 1))}><Icon icon="solar:arrow-right-linear" /></button>
                        </div>
                    </div>
                    <div className="text-sm text-gunmetal/70">{educationalSteps[activeStep].content}</div>
                </div>
            </div>
        </>
    );
}

// ============================================================
// SECCION TRES: REGIONES DEL REINO
// ============================================================

function LandsContent() {
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [selectedLandId, setSelectedLandId] = useState<number>(0);
    const activeData = LANDS_DATA[selectedLandId];
    return (
        <>
            <AnimatePresence>{isMapOpen && <MapModal onClose={() => setIsMapOpen(false)} />}</AnimatePresence>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-gunmetal">Regiones del Parque</h3>
                    <button onClick={() => setIsMapOpen(true)} className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-bold"><Icon icon="solar:map-bold-duotone" /> VER MAPA (PDF)</button>
                </div>
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-1/3 grid grid-cols-2 lg:grid-cols-1 gap-2">
                        {LANDS_DATA.map((land) => (
                            <button key={land.id} onClick={() => setSelectedLandId(land.id)} className={`p-3 rounded-xl border text-left flex items-center gap-3 ${selectedLandId === land.id ? 'bg-gunmetal text-white' : 'bg-white hover:border-sunset'}`}>
                                <Icon icon={land.icon} className={`w-5 h-5 ${selectedLandId === land.id ? 'text-celeste' : 'text-gray-300'}`} />
                                <span className="text-xs font-bold">{land.name}</span>
                            </button>
                        ))}
                    </div>
                    <div className="w-full lg:w-2/3 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                        <span className="text-[10px] font-bold font-mono text-sunset uppercase tracking-widest">{activeData.alias}</span>
                        <h2 className="text-2xl font-black text-gunmetal mt-1">{activeData.name}</h2>
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg border-l-4 border-gunmetal text-xs italic">&quot;{activeData.reality}&quot;</div>
                        <div className="space-y-4 mt-6">
                            {activeData.tactics.map((tactic, i) => (
                                <div key={i} className="flex gap-3 items-start">
                                    <Icon icon="solar:check-circle-bold" className="w-4 h-4 text-emerald-500 mt-0.5" />
                                    <div><h5 className="text-xs font-bold font-mono uppercase">{tactic.title}</h5><p className="text-xs text-gray-500">{tactic.desc}</p></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// ============================================================
// SECCION CUATRO: EXPERIENCIAS Y BUCKET LIST
// ============================================================

function BucketListContent() {
    const [activeTab, setActiveTab] = useState(0);
    const [cardIndex, setCardIndex] = useState(0);
    const currentItems = BUCKET_ITEMS[activeTab];
    const activeItem = currentItems[cardIndex];
    const nextCard = () => setCardIndex((prev) => (prev + 1) % currentItems.length);
    const prevCard = () => setCardIndex((prev) => (prev - 1 + currentItems.length) % currentItems.length);

    return (
        <div className="flex flex-col gap-10">
            <div className="flex overflow-x-auto gap-3 pb-4 px-1">
                {BUCKET_LEVELS.map((level) => (
                    <button key={level.id} onClick={() => { setActiveTab(level.id); setCardIndex(0); }} className={`relative flex-shrink-0 w-36 h-24 rounded-xl border p-4 flex flex-col justify-between ${activeTab === level.id ? level.activeStyle : level.style}`}>
                        <span className="text-[9px] font-bold font-mono opacity-70">{level.desc}</span>
                        <span className="text-sm font-black uppercase">{level.label}</span>
                    </button>
                ))}
            </div>
            <div className="relative w-full flex flex-col md:flex-row gap-8 items-center min-h-[350px]">
                <div className="w-full md:w-[60%] h-[300px] flex items-center justify-center relative">
                    <button onClick={prevCard} className="absolute left-0 z-50 p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"><Icon icon="solar:alt-arrow-left-linear" /></button>
                    <button onClick={nextCard} className="absolute right-0 z-50 p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"><Icon icon="solar:alt-arrow-right-linear" /></button>
                    <AnimatePresence mode="wait">
                        <motion.div key={`${activeTab}-${cardIndex}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="w-[80%] h-full bg-white rounded-3xl shadow-2xl border-4 border-white flex flex-col items-center justify-center">
                            <Icon icon="solar:gallery-wide-bold-duotone" className="w-20 h-20 text-gray-300" />
                            <div className="mt-4 px-3 py-1 bg-white rounded-full text-[10px] font-bold font-mono uppercase tracking-widest">{activeItem.type}</div>
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="w-full md:w-[40%] pl-4">
                    <h3 className="text-3xl font-black text-gunmetal leading-tight mb-4">{activeItem.title}</h3>
                    <p className="text-sm text-gunmetal/80 font-medium leading-relaxed">{activeItem.desc}</p>
                </div>
            </div>
        </div>
    );
}

// ============================================================
// THE CORE ACCORDION
// ============================================================

const SECTION_LABELS = ['UNO', 'DOS', 'TRES', 'CUATRO'];
const SECTION_ANCHORS = ['logistica', 'estrategia', 'tierras', 'bucket'];

function TheCoreAccordion() {
    const [openSections, setOpenSections] = useState<number[]>([]);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Detectar anchor en URL y abrir + scroll a esa sección
    useEffect(() => {
        const hash = window.location.hash.replace('#', '');
        if (!hash) return;
        const idx = SECTION_ANCHORS.indexOf(hash);
        if (idx === -1) return;
        setOpenSections([idx]);
        // Esperar a que el DOM renderice el contenido expandido
        setTimeout(() => {
            sectionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }, []);

    const toggleSection = (index: number) => setOpenSections(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
    const sections = [
        { id: 0, anchor: 'logistica', title: "Cómo Llegar al Parque", icon: "solar:map-point-bold-duotone", component: <LogisticsContent /> },
        { id: 1, anchor: 'estrategia', title: "Cuántos Días Dedicarle", icon: "solar:stopwatch-bold-duotone", component: <StrategyContent /> },
        { id: 2, anchor: 'tierras', title: "Regiones del Reino", icon: "solar:layers-minimalistic-bold-duotone", component: <LandsContent /> },
        { id: 3, anchor: 'bucket', title: "Experiencias Imperdibles", icon: "solar:clipboard-check-bold-duotone", component: <BucketListContent /> },
    ];

    return (
        <div className="flex flex-col gap-6">
            {sections.map((section, idx) => (
                <div key={section.id} id={section.anchor} ref={el => { sectionRefs.current[idx] = el; }} className="group scroll-mt-24">
                    <div onClick={() => toggleSection(section.id)} className={`relative z-10 bg-white rounded-2xl p-4 pr-6 flex items-center justify-between shadow-sm border cursor-pointer transition-all ${openSections.includes(section.id) ? 'border-sunset ring-1 ring-sunset/20' : 'border-transparent'}`}>
                        <div className="flex items-center gap-5">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${openSections.includes(section.id) ? 'bg-gunmetal text-white' : 'bg-bone text-gunmetal'}`}>
                                <Icon icon={section.icon} className="w-6 h-6" />
                            </div>
                            <div>
                                <span className="block text-[9px] font-bold text-gunmetal/40 uppercase tracking-widest font-mono mb-0.5">SECCION {SECTION_LABELS[idx]}</span>
                                <span className="font-bold text-gunmetal text-base">{section.title}</span>
                            </div>
                        </div>
                        <Icon icon="solar:arrow-right-linear" className={`transition-transform duration-300 ${openSections.includes(section.id) ? 'rotate-90 text-sunset' : 'text-gunmetal/30'}`} />
                    </div>
                    <AnimatePresence>
                        {openSections.includes(section.id) && (
                            <motion.div initial={{ height: 0, opacity: 0, marginTop: 0 }} animate={{ height: "auto", opacity: 1, marginTop: 12 }} exit={{ height: 0, opacity: 0, marginTop: 0 }} className="overflow-hidden bg-white border border-gray-100 rounded-2xl mx-2 shadow-inner">
                                <div className="p-6">{section.component}</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}

// ============================================================
// MAIN PAGE
// ============================================================

export default function AttractionsGuidePage() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length), 4000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        HERO_IMAGES.forEach((src) => { const img = new window.Image(); img.src = src; });
    }, []);

    return (
        <div className="min-h-screen bg-bone text-gunmetal font-sans selection:bg-celeste selection:text-white pb-32 relative">
            {/* HERO SLIDER */}
            <div className="absolute inset-x-0 top-0 h-[70vh] overflow-hidden z-0">
                <AnimatePresence initial={false}>
                    <motion.img
                        key={currentImageIndex}
                        src={HERO_IMAGES[currentImageIndex]}
                        alt="Magic Kingdom"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.src = '/images/tron_mk.jpg'; }}
                    />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-bone via-bone/80 to-transparent" />
            </div>

            {/* CONTENIDO */}
            <div className="relative z-10">
                {/* HEADER */}
                <section className="container mx-auto px-6 md:px-12 pt-48 pb-12 md:pt-60 md:pb-16">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="max-w-4xl">
                        <div className="flex items-center gap-2 text-celeste mb-4 drop-shadow-md">
                            <Icon icon="solar:compass-bold-duotone" width={24} />
                            <span className="font-mono text-xs font-bold tracking-[0.3em] uppercase">GUÍA COMPLETA DE MAGIC KINGDOM</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-6 leading-[0.9] drop-shadow-2xl">
                            Guía del <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-celeste to-white">Parque</span>
                        </h1>
                        <p className="text-lg text-white/90 font-medium max-w-xl leading-relaxed drop-shadow-lg">
                            Todo lo que necesitás saber para recorrer Magic Kingdom sin improvisar: cómo llegar, cuántos días dedicarle, las regiones del parque y las experiencias que no te podés perder.
                        </p>
                    </motion.div>
                </section>

                {/* CORE CONTENT */}
                <main className="container mx-auto px-6 md:px-12 pt-8">
                    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                        <motion.div variants={itemVariants}>
                            <TheCoreAccordion />
                        </motion.div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
}