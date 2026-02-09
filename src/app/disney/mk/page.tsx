"use client";

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useSpring, useTransform, Variants } from 'framer-motion';
import { Icon } from '@iconify/react';
import Link from 'next/link';

// COMPONENTES
import LogisticsStepper, { LogisticsStep } from '@/components/LogisticsStepper';

// DATA EXTERNA (F07 - Solucionado)
import { GLOSSARY_DB, LANDS_DATA, BUCKET_ITEMS, BUCKET_LEVELS, DISNEY_RESORTS } from '@/data/mk-data';
import { TRANSPORT_RATES } from '@/data/mk-logistics';

// --- MODALES (GLOSARIO & MAPA) ---
// Idealmente estos deberían ir a /components/modals/, pero por ahora los dejamos aquí para no romper imports,
// aunque reducidos y optimizados.

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

// --- VARIANTES ANIMACIÓN ---
const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };

// --- SUB-SECCIONES (Refactorizadas para usar Data Externa) ---

function DirectoryItem({ icon, label }: { icon: string, label: string }) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 cursor-pointer group">
            <Icon icon={icon} className="w-8 h-8 text-gunmetal/30 group-hover:text-sunset transition-colors" />
            <span className="text-[9px] font-bold text-gunmetal/50 uppercase tracking-widest group-hover:text-gunmetal font-mono">{label}</span>
        </div>
    )
}

function TransportCard({ label, subLabel, selected, onClick, imageSrc, type }: any) {
    const imgSizeClass = type === 'bus' ? 'w-64 h-48 -right-10 -top-24' : (type === 'car' ? 'w-48 h-32 -right-4 -top-10' : 'w-40 h-40 -right-6 -top-8'); 
    return (
        <button onClick={onClick} className={`relative h-28 w-full rounded-2xl border-2 transition-all duration-300 text-left overflow-visible group ${selected ? 'border-sky-500 bg-white ring-2 ring-sky-500 z-10' : 'border-gray-200 bg-white hover:border-gray-300 z-0'}`}>
            <div className="absolute bottom-3 left-3 z-10 max-w-[65%] leading-tight">
                <span className={`block text-[10px] font-black uppercase tracking-wider ${selected ? 'text-sky-600' : 'text-gunmetal'}`}>{label}</span>
                <span className="block text-[8px] font-bold text-gray-400 mt-0.5 truncate">{subLabel}</span>
            </div>
            <div className={`absolute ${imgSizeClass} transition-transform duration-500 z-20 pointer-events-none ${selected ? 'scale-110 -translate-y-1' : 'group-hover:scale-105'}`}>
                 {imageSrc && <img src={imageSrc} alt={label} className="w-full h-full object-contain drop-shadow-xl" />}
            </div>
        </button>
    )
}

function LogisticsContent() {
    const [userType, setUserType] = useState<'resort' | 'external'>('resort');
    const [transport, setTransport] = useState<'bus' | 'car' | 'uber'>('bus');
    const [selectedResort, setSelectedResort] = useState("Seleccionar Hotel Disney...");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showComparison, setShowComparison] = useState(false); 
    
    // Simplificación de métricas para demo
    const time = userType === 'resort' && transport === 'bus' ? 20 : 45;
    const cost = userType === 'resort' && transport === 'bus' ? 0 : 30;

    const steps: LogisticsStep[] = userType === 'resort' 
        ? [{ id: 1, icon: "solar:bed-bold", label: "Hotel", connectionType: "walk" }, { id: 2, icon: "solar:bus-bold", label: "Bus", connectionType: "ride" }, { id: 3, icon: "solar:castle-bold", label: "MK", connectionType: "none" }]
        : [{ id: 1, icon: "solar:city-bold", label: "Hotel", connectionType: "ride" }, { id: 2, icon: "solar:ticket-bold", label: "TTC", connectionType: "ride" }, { id: 3, icon: "solar:castle-bold", label: "MK", connectionType: "none" }];

    return (
        <div className="flex flex-col gap-8">
            <h2 className="text-3xl font-black text-gunmetal font-sans border-b border-gunmetal/5 pb-4">Configurador de Arribo</h2>
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-1 w-full space-y-6">
                    <div className="flex p-1 bg-gray-100 rounded-xl">
                        <button onClick={() => setUserType('resort')} className={`flex-1 py-3 text-xs font-bold uppercase transition-all ${userType === 'resort' ? 'bg-sunset text-white shadow-sm rounded-lg' : 'text-gray-400'}`}>Hotel Disney</button>
                        <button onClick={() => setUserType('external')} className={`flex-1 py-3 text-xs font-bold uppercase transition-all ${userType === 'external' ? 'bg-sunset text-white shadow-sm rounded-lg' : 'text-gray-400'}`}>Fuera de Disney</button>
                    </div>
                    {/* Tarjetas simplificadas */}
                    <div className="grid grid-cols-3 gap-4 pt-12">
                        {userType === 'resort' && <TransportCard label="Bus Oficial" subLabel="Gratis" selected={transport === 'bus'} onClick={() => setTransport('bus')} imageSrc="/images/bus_render.png" type="bus" />}
                        <TransportCard label="Auto Propio" subLabel="Parking" selected={transport === 'car'} onClick={() => setTransport('car')} imageSrc="/images/car_render.png" type="car" />
                        <TransportCard label="Uber" subLabel="Rideshare" selected={transport === 'uber'} onClick={() => setTransport('uber')} imageSrc="/images/uberlyft_render.png" type="uber" />
                    </div>
                    <LogisticsStepper steps={steps} />
                </div>
                {/* Panel derecho simplificado */}
                <div className="lg:w-[300px] bg-gunmetal text-white p-6 rounded-2xl shadow-xl">
                    <h4 className="text-xs font-bold uppercase tracking-widest font-mono opacity-50 mb-4">Análisis de Costos</h4>
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-2xl font-black font-mono">{time} min</span>
                        <span className={`text-2xl font-black font-mono ${cost === 0 ? 'text-emerald-400' : 'text-white'}`}>{cost === 0 ? 'GRATIS' : `$${cost}`}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function StrategyContent() {
    const [activeStep, setActiveStep] = useState(0);
    const [activeTerm, setActiveTerm] = useState<string | null>(null);
    
    // CONTENIDO EDUCATIVO (Se mantiene aquí porque contiene componentes <Term>)
    const educationalSteps = [
        { title: "Densidad & Fatiga", tag: "CORE LOGIC", icon: "solar:graph-up-bold-duotone", content: <>MK es denso. Dividir el parque reduce el estrés en un 40%.</> },
        { title: "Protocolo Apertura", tag: "LOGÍSTICA", icon: "solar:alarm-play-bold-duotone", content: <>Usa <Term id="early-entry" onOpen={setActiveTerm}>Early Entry</Term> para Fantasyland si eres huésped.</> },
        { title: "Barreras Digitales", tag: "VIRTUAL QUEUE", icon: "solar:smartphone-2-bold-duotone", content: <>TRON usa <Term id="virtual-queue" onOpen={setActiveTerm}>Fila Virtual</Term>. Solicita a las 7:00 AM.</> },
    ];

    return (
        <>
            <AnimatePresence>{activeTerm && <GlossaryModal termKey={activeTerm} onClose={() => setActiveTerm(null)} />}</AnimatePresence>
            <div className="flex flex-col md:flex-row gap-6">
                 <div className="w-full md:w-1/3 bg-bone rounded-xl p-6 flex flex-col justify-between border border-gray-200">
                     <div><span className="text-8xl font-black text-gunmetal">02</span><span className="text-lg font-bold text-sunset ml-2">DÍAS</span></div>
                     <p className="text-xs text-gunmetal/60 font-medium">Tiempo mínimo recomendado.</p>
                 </div>
                 <div className="w-full md:w-2/3 bg-white border border-gray-100 rounded-xl p-6 relative">
                     <div className="flex justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Icon icon={educationalSteps[activeStep].icon} className="text-celeste w-5 h-5" />
                            <h4 className="text-lg font-bold text-gunmetal">{educationalSteps[activeStep].title}</h4>
                        </div>
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
    )
}

function LandsContent() {
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [selectedLandId, setSelectedLandId] = useState<number>(0);
    const activeData = LANDS_DATA[selectedLandId];

    return (
        <>
            <AnimatePresence>{isMapOpen && <MapModal onClose={() => setIsMapOpen(false)} />}</AnimatePresence>
            <div className="space-y-6">
                 <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-gunmetal">Tablero de Operaciones</h3>
                    <button onClick={() => setIsMapOpen(true)} className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-bold">
                        <Icon icon="solar:map-bold-duotone" /> VER GEODATA (PDF)
                    </button>
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
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg border-l-4 border-gunmetal text-xs italic">"{activeData.reality}"</div>
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
    )
}

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
                    <button key={level.id} onClick={() => setActiveTab(level.id)} className={`relative flex-shrink-0 w-36 h-24 rounded-xl border p-4 flex flex-col justify-between ${activeTab === level.id ? level.activeStyle : level.style}`}>
                        <span className="text-[9px] font-bold font-mono opacity-70">{level.desc}</span>
                        <span className="text-sm font-black uppercase">{level.label}</span>
                    </button>
                ))}
            </div>
            <div className="relative w-full flex flex-col md:flex-row gap-8 items-center min-h-[350px]">
                 <div className="w-full md:w-[60%] h-[300px] flex items-center justify-center relative">
                     <button onClick={prevCard} className="absolute left-0 z-50 p-2 bg-white rounded-full shadow-lg"><Icon icon="solar:alt-arrow-left-linear" /></button>
                     <button onClick={nextCard} className="absolute right-0 z-50 p-2 bg-white rounded-full shadow-lg"><Icon icon="solar:alt-arrow-right-linear" /></button>
                     
                     <AnimatePresence mode='wait'>
                        <motion.div 
                            key={`${activeTab}-${cardIndex}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className="w-[80%] h-full bg-white rounded-3xl shadow-2xl border-4 border-white flex flex-col items-center justify-center"
                        >
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
    )
}

function TheCoreAccordion() {
  const [openSections, setOpenSections] = useState<number[]>([]);
  const toggleSection = (index: number) => setOpenSections(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  const sections = [
    { id: 0, title: "Logística y Protocolo de Arribo", icon: "solar:map-point-bold-duotone", component: <LogisticsContent /> },
    { id: 1, title: "Estrategia de Tiempos", icon: "solar:stopwatch-bold-duotone", component: <StrategyContent /> },
    { id: 2, title: "Topografía del Reino (Tierras)", icon: "solar:layers-minimalistic-bold-duotone", component: <LandsContent /> },
    { id: 3, title: "Experiencias y Bucket List", icon: "solar:clipboard-check-bold-duotone", component: <BucketListContent /> },
  ];

  return (
    <div className="flex flex-col gap-6">
      {sections.map((section, idx) => (
          <div key={section.id} className="group">
            <div onClick={() => toggleSection(section.id)} className={`relative z-10 bg-white rounded-2xl p-4 pr-6 flex items-center justify-between shadow-sm border cursor-pointer transition-all ${openSections.includes(section.id) ? 'border-sunset ring-1 ring-sunset/20' : 'border-transparent'}`}>
                <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${openSections.includes(section.id) ? 'bg-gunmetal text-white' : 'bg-bone text-gunmetal'}`}>
                        <Icon icon={section.icon} className="w-6 h-6" />
                    </div>
                    <div><span className="block text-[9px] font-bold text-gunmetal/40 uppercase tracking-widest font-mono mb-0.5">PASO 0{idx + 1}</span><span className="font-bold text-gunmetal text-base">{section.title}</span></div>
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

export default function MagicKingdomPage() {
  return (
    <div className="min-h-screen bg-bone pt-0 pb-20 px-6 md:px-12 lg:px-24 font-sans text-gunmetal">
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-[1200px] mx-auto flex flex-col gap-10">
        
        {/* HERO */}
        <motion.div variants={itemVariants} className="relative w-full h-[550px] rounded-[32px] bg-bone flex items-center overflow-hidden shadow-sm">
            <div className="absolute right-0 top-0 bottom-0 w-[75%] h-full pointer-events-none select-none">
                <div className="relative w-full h-full" style={{ maskImage: 'linear-gradient(to right, transparent 5%, black 40%)', WebkitMaskImage: 'linear-gradient(to right, transparent 5%, black 40%)' }}>
                    <img src="/images/tron_mk.jpg" alt="Tron Lightcycle Run" className="w-full h-full object-cover object-center" />
                </div>
            </div>
            <div className="relative z-20 w-full max-w-[55%] pl-12 pr-4 flex flex-col justify-center h-full">
                <div className="flex items-center gap-3 mb-5"><div className="h-px w-10 bg-gunmetal/20" /><h2 className="text-[10px] font-bold tracking-[0.25em] uppercase text-gunmetal/40">DONDE LA FANTASÍA REINA</h2></div>
                <h1 className="text-6xl md:text-8xl font-black text-gunmetal leading-[0.9] tracking-tighter mb-4">Magic<br/>Kingdom</h1>
                <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sunset to-celeste mb-8">El Corazón de la Magia</h2>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 bg-gunmetal text-white px-5 py-2.5 rounded-full shadow-xl"><div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /><span className="text-[10px] font-bold uppercase tracking-wider font-mono">HOY</span><div className="w-px h-3 bg-white/20" /><span className="text-xs font-bold font-mono">28°C</span></div>
                </div>
            </div>
        </motion.div>

        {/* METRICS */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-8 border border-white/50 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                <div className="flex justify-between items-start mb-4"><span className="text-[9px] font-bold text-gunmetal/40 tracking-[0.2em] uppercase font-mono">WAIT SCORE</span><Icon icon="solar:check-circle-bold-duotone" className="text-emerald-500 w-6 h-6" /></div>
                <span className="text-6xl font-black text-gunmetal tracking-tighter font-mono">85</span><span className="text-xl text-gunmetal/20 font-medium font-mono">/100</span>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-white/50 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-sunset" />
                <div className="flex justify-between items-start mb-4"><span className="text-[9px] font-bold text-gunmetal/40 tracking-[0.2em] uppercase font-mono">AFLUENCIA</span><Icon icon="solar:users-group-rounded-bold-duotone" className="text-sunset w-6 h-6" /></div>
                <span className="text-4xl font-bold text-gunmetal tracking-tight font-mono">Moderada</span>
            </div>
            <div className="bg-gunmetal rounded-3xl p-8 text-white shadow-2xl flex flex-col items-center justify-center text-center cursor-pointer group">
                <Icon icon="solar:routing-3-bold-duotone" className="text-celeste w-10 h-10 mb-4 group-hover:scale-110 transition-transform" />
                <span className="text-lg font-bold">SINCRO DE RUTA <Icon icon="solar:arrow-right-linear" className="inline ml-2" /></span>
            </div>
        </motion.div>

        {/* THE CORE */}
        <motion.div variants={itemVariants} className="mt-4"><TheCoreAccordion /></motion.div>

       {/* DIRECTORIO */}
       <motion.div variants={itemVariants} className="mt-8">
            <div className="flex items-center gap-4 mb-6"><h3 className="text-lg font-bold text-gunmetal">Directorio</h3><span className="bg-gunmetal/5 text-gunmetal text-[9px] font-bold px-2 py-1 rounded font-mono">142_ITEMS</span></div>
            <div className="bg-white rounded-3xl border border-white/50 shadow-sm p-8 grid grid-cols-2 md:grid-cols-5 gap-8 divide-x divide-gunmetal/5">
                <Link href="/disney/mk/attractions"><DirectoryItem icon="solar:ticket-bold-duotone" label="Atracciones" /></Link>
                <DirectoryItem icon="solar:chef-hat-bold-duotone" label="Restaurantes" />
                <DirectoryItem icon="solar:bolt-bold-duotone" label="Comida Rápida" />
                <DirectoryItem icon="solar:mask-happly-bold-duotone" label="Personajes" />
                <DirectoryItem icon="solar:bag-bold-duotone" label="Souvenirs" />
            </div>
        </motion.div>

        <div className="h-20" /> 
      </motion.div>
    </div>
  );
}