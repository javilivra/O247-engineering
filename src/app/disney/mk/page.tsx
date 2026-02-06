"use client";

import React, { useState, useEffect, useRef } from 'react';
// IMPORTANTE: createPortal es necesario para los Modales Full Screen
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useSpring, useTransform, Variants } from 'framer-motion';
import { Icon } from '@iconify/react';
import Link from 'next/link';

// 1. IMPORTAMOS EL NUEVO STEPPER
import LogisticsStepper, { LogisticsStep } from '@/components/LogisticsStepper';

// =====================================================================
// 📖 GLOSARIO & MAPA: BASE DE DATOS Y COMPONENTES
// =====================================================================

// 1. DATA: Definiciones Centralizadas
const GLOSSARY_DB: Record<string, { title: string, def: string }> = {
    "rope-drop": {
        title: "ROPE DROP",
        def: "Táctica de llegar a los molinetes 45-60 min antes de la apertura oficial. Disney literalmente 'baja una cuerda' (Rope Drop) para permitir el acceso masivo. Estar aquí te garantiza 1 o 2 atracciones principales sin fila."
    },
    "early-entry": {
        title: "EARLY THEME PARK ENTRY",
        def: "Beneficio exclusivo para huéspedes de Hoteles Disney (y asociados). Permite entrar a CUALQUIER parque 30 minutos antes que el público general. Vital para Fantasyland o Tomorrowland."
    },
    "virtual-queue": {
        title: "VIRTUAL QUEUE (VQ)",
        def: "Sistema de fila digital gratuito para atracciones de ultra-demanda (ej. TRON). No existe fila física ('Standby'). Debes 'pescar' un lugar en la App de Disney a las 7:00 AM o 1:00 PM exactas."
    },
    "mobile-order": {
        title: "MOBILE FOOD ORDER",
        def: "Sistema obligatorio en temporada alta para pedir comida rápida desde tu celular. Eliges el restaurante y la comida en la App, pagas, y solo te acercas al mostrador cuando la app te avisa que está lista."
    },
    "lightning-lane": {
        title: "LIGHTNING LANE (LL)",
        def: "La fila rápida (antiguo FastPass). Se accede comprando el 'Multi Pass' o el 'Single Pass'. Es la vía para saltarse la fila normal y reducir esperas de 90 min a 5-10 min."
    },
    "e-ticket": {
        title: "E-TICKET RIDE",
        def: "Término histórico de Disney para referirse a las atracciones de máxima categoría, mayor presupuesto y mayor emoción (ej. Space Mountain, Seven Dwarfs Mine Train)."
    }
};

// 2. COMPONENTE: El Modal Flotante (Glosario)
function GlossaryModal({ termKey, onClose }: { termKey: string | null, onClose: () => void }) {
    // BLOQUEO DE SCROLL
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    if (!termKey || !GLOSSARY_DB[termKey]) return null;
    const data = GLOSSARY_DB[termKey];

    return createPortal(
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center px-6"
        >
            <div className="absolute inset-0 bg-gunmetal/60 backdrop-blur-xl transition-all" onClick={onClose} />
            <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative w-full max-w-md mx-auto"
            >
                <div className="absolute -inset-[2px] rounded-2xl overflow-hidden">
                    <div className="absolute inset-[-50%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FF7043_0%,#00B4D8_50%,#FF7043_100%)] opacity-100" />
                </div>
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
                    <div className="bg-gray-50/50 p-4 flex justify-between items-center border-b border-gray-100">
                        <div className="flex items-center gap-2 text-celeste">
                            <Icon icon="solar:book-bookmark-bold-duotone" className="w-5 h-5" />
                            <span className="text-[10px] font-bold uppercase tracking-widest font-mono">Glosario O247</span>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-sunset transition-colors">
                            <Icon icon="solar:close-circle-bold" className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="p-8">
                        <h3 className="text-2xl font-black text-gunmetal font-mono mb-4 tracking-tight uppercase border-b-2 border-sunset/20 pb-2 inline-block">
                            {data.title}
                        </h3>
                        <p className="text-sm text-gunmetal/80 font-sans leading-relaxed">
                            {data.def}
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
}

// 3. COMPONENTE: Modal de Mapa
function MapModal({ onClose }: { onClose: () => void }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    if (!mounted) return null;

    return createPortal(
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-gunmetal/80 backdrop-blur-xl"
            onClick={onClose}
        >
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full h-full max-w-[90vw] max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-white/20"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Mapa */}
                <div className="bg-white p-4 flex justify-between items-center border-b border-gray-100 z-10 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                            <Icon icon="solar:map-point-bold-duotone" className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gunmetal font-mono uppercase tracking-wider">Mapa Oficial 2026</h3>
                            <p className="text-[10px] text-gray-400 font-sans">Magic Kingdom Park • Fuente: Disney Parks</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <Icon icon="solar:close-circle-bold" className="w-8 h-8 text-gunmetal/30 hover:text-sunset" />
                    </button>
                </div>

                {/* VISUALIZADOR PDF */}
                <div className="flex-1 w-full bg-gray-100 relative">
                    <iframe 
                        src="/maps/MK_0126_SP_mapa.pdf#view=FitH&toolbar=0&navpanes=0&scrollbar=0"
                        className="w-full h-full border-none"
                        title="Mapa Magic Kingdom PDF"
                    />
                </div>

                {/* Footer Controls */}
                <div className="bg-white p-4 border-t border-gray-100 flex justify-between items-center shrink-0">
                    <span className="text-[10px] font-bold text-gunmetal/40 font-mono">V.2026.01</span>
                    <a 
                        href="/maps/MK_0126_SP_mapa.pdf" 
                        download 
                        className="px-4 py-2 bg-gunmetal text-white text-xs font-bold rounded-lg font-mono hover:bg-sunset transition-colors flex items-center gap-2"
                    >
                        <Icon icon="solar:download-bold-duotone" />
                        DESCARGAR PDF
                    </a>
                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
}

// 4. COMPONENTE: Term
function Term({ id, children, onOpen }: { id: string, children: React.ReactNode, onOpen: (id: string) => void }) {
    return (
        <span 
            onClick={(e) => { e.stopPropagation(); onOpen(id); }}
            className="cursor-help font-bold text-gunmetal border-b-2 border-dashed border-sunset/40 hover:border-sunset hover:text-sunset hover:bg-sunset/5 transition-all duration-200 px-0.5 rounded relative group z-10"
        >
            {children}
            <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-sunset rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </span>
    );
}

// --- CONSTANTES ---
const RATES = {
    parking: 30,
    uber_avg: 25,
    minnie_van: 45
};

// --- DATA: HOTELES DISNEY ---
const DISNEY_RESORTS = [
    { name: "Disney's Grand Floridian Resort", category: "Deluxe" },
    { name: "Disney's Polynesian Village", category: "Deluxe" },
    { name: "Disney's Contemporary Resort", category: "Deluxe" },
    { name: "Disney's Animal Kingdom Lodge", category: "Deluxe" },
    { name: "Disney's Wilderness Lodge", category: "Deluxe" },
    { name: "Disney's Caribbean Beach", category: "Moderate" },
    { name: "Disney's Coronado Springs", category: "Moderate" },
    { name: "Disney's Pop Century Resort", category: "Value" },
    { name: "Disney's Art of Animation", category: "Value" },
    { name: "Disney's All-Star Movies", category: "Value" }
];

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
  visible: { 
    opacity: 1, y: 0, 
    filter: "none", 
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }
  }
};

// =====================================================================
// 🧱 BLOQUE DE COMPONENTES SECUNDARIOS
// =====================================================================

function DirectoryItem({ icon, label }: { icon: string, label: string }) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 cursor-pointer group">
            <Icon icon={icon} className="w-8 h-8 text-gunmetal/30 group-hover:text-sunset transition-colors duration-300" />
            <span className="text-[9px] font-bold text-gunmetal/50 uppercase tracking-widest group-hover:text-gunmetal transition-colors font-mono">{label}</span>
        </div>
    )
}

function AnimatedNumber({ value }: { value: number }) {
    const spring = useSpring(0, { bounce: 0, duration: 600 });
    const display = useTransform(spring, (current) => Math.round(current));
    useEffect(() => { spring.set(value); }, [value, spring]);
    return <motion.span>{display}</motion.span>;
}

function TransportCard({ label, subLabel, selected, onClick, imageSrc, type }: any) {
    const imgSizeClass = type === 'bus' 
        ? 'w-64 h-48 -right-10 -top-24' 
        : (type === 'car' 
            ? 'w-48 h-32 -right-4 -top-10' 
            : 'w-40 h-40 -right-6 -top-8'); 

    return (
        <button 
            onClick={onClick}
            className={`
                relative h-28 w-full rounded-2xl border-2 transition-all duration-300 text-left overflow-visible group
                ${selected 
                    ? 'border-sky-500 bg-white ring-2 ring-sky-500 z-10' 
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md z-0'}
            `}
        >
            <div className="absolute bottom-3 left-3 z-10 max-w-[65%] leading-tight">
                <span className={`block text-[10px] font-black uppercase tracking-wider ${selected ? 'text-sky-600' : 'text-gunmetal'}`}>
                    {label}
                </span>
                <span className="block text-[8px] font-bold text-gray-400 mt-0.5 truncate">
                    {subLabel}
                </span>
            </div>

            <div className={`
                absolute ${imgSizeClass} transition-transform duration-500 ease-out z-20 pointer-events-none
                ${selected ? 'scale-110 translate-y-[-5px]' : 'group-hover:scale-105'}
            `}>
                {imageSrc ? (
                    <img 
                        src={imageSrc} 
                        alt={label} 
                        className="w-full h-full object-contain drop-shadow-xl"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Icon icon="solar:box-bold-duotone" className="w-10 h-10 text-gray-300" />
                    </div>
                )}
            </div>
        </button>
    )
}

function StrategyContent() {
    const [activeStep, setActiveStep] = useState(0);
    const [activeTerm, setActiveTerm] = useState<string | null>(null);

    const openGlossary = (term: string) => setActiveTerm(term);
    const closeGlossary = () => setActiveTerm(null);

    const educationalSteps = [
        {
            title: "Densidad & Fatiga",
            tag: "CORE LOGIC",
            icon: "solar:graph-up-bold-duotone",
            content: (
                <>
                    Magic Kingdom tiene la mayor densidad de atracciones de Florida. Intentar hacerlo en un día garantiza fatiga física y perderse los <Term id="e-ticket" onOpen={openGlossary}>E-Ticket Rides</Term>. Dividir el parque reduce el estrés en un 40%.
                </>
            )
        },
        {
            title: "Protocolo de Apertura",
            tag: "LOGÍSTICA",
            icon: "solar:alarm-play-bold-duotone",
            content: (
                <>
                    La apertura no es igual para todos. Si estás en Hotel Disney, usa la <Term id="early-entry" onOpen={openGlossary}>Early Entry</Term> para Fantasyland. Si estás fuera, llega para el <Term id="rope-drop" onOpen={openGlossary}>Rope Drop</Term> y posiciónate hacia Adventureland.
                </>
            )
        },
        {
            title: "Barreras Digitales",
            tag: "VIRTUAL QUEUE",
            icon: "solar:smartphone-2-bold-duotone",
            content: (
                <>
                    Atracciones como TRON y Tiana usan <Term id="virtual-queue" onOpen={openGlossary}>Fila Virtual</Term>. Debes solicitar acceso en la app a las 7:00 AM en punto. No existen filas físicas normales para estas experiencias en hora pico.
                </>
            )
        },
        {
            title: "Gastronomía Táctica",
            tag: "MOBILE ORDER",
            icon: "solar:hamburger-menu-bold-duotone",
            content: (
                <>
                    Be Our Guest requiere reserva 60 días antes. Para comida rápida, usa siempre <Term id="mobile-order" onOpen={openGlossary}>Mobile Order</Term> en la app: evita filas de caja y ve directo a recoger tu comida (Pick-up).
                </>
            )
        },
        {
            title: "Infraestructura",
            tag: "POWER & DATA",
            icon: "solar:battery-charge-bold-duotone",
            content: "La dependencia de My Disney Experience consumirá tu batería en 4 horas. Lleva Power Bank obligatorio. El WiFi se satura; ten datos móviles listos para las 7:00 AM."
        }
    ];

    const handleNext = () => {
        setActiveStep((prev) => (prev + 1) % educationalSteps.length);
    };

    const handlePrev = () => {
        setActiveStep((prev) => (prev - 1 + educationalSteps.length) % educationalSteps.length);
    };

    return (
        <>
            <AnimatePresence>
                {activeTerm && <GlossaryModal termKey={activeTerm} onClose={closeGlossary} />}
            </AnimatePresence>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3 bg-[#f7f7f5] rounded-xl p-6 flex flex-col justify-between min-h-[220px] border border-gray-200">
                     <div className="flex items-baseline font-mono">
                        <span className="text-8xl font-black text-gunmetal tracking-tighter leading-none">02</span>
                        <span className="text-lg font-bold text-sunset uppercase tracking-widest ml-2">DÍAS</span>
                     </div>
                     <div className="mt-4">
                        <p className="text-[10px] font-bold text-gunmetal/40 uppercase tracking-widest font-mono mb-1">RECOMENDACIÓN O247</p>
                        <p className="text-xs text-gunmetal/60 font-medium leading-relaxed font-sans">
                            Tiempo mínimo para cubrir el 100% de las 6 tierras sin estrés operativo.
                        </p>
                     </div>
                </div>

                <div className="w-full md:w-2/3 bg-white border border-gray-100 rounded-xl p-6 flex flex-col relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-celeste/10 flex items-center justify-center text-celeste">
                                 <Icon icon={educationalSteps[activeStep].icon} className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="block text-[9px] font-bold text-celeste uppercase tracking-widest font-mono">
                                    ESTRATEGIA: {educationalSteps[activeStep].tag}
                                </span>
                                <h4 className="text-lg font-bold text-gunmetal font-sans leading-tight">
                                    {educationalSteps[activeStep].title}
                                </h4>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                             <button 
                                onClick={handlePrev}
                                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gunmetal/40 hover:text-sunset hover:border-sunset transition-all"
                             >
                                 <Icon icon="solar:arrow-left-linear" />
                             </button>
                             <div className="text-[10px] font-bold text-gunmetal/30 font-mono w-8 text-center">
                                {activeStep + 1}/{educationalSteps.length}
                             </div>
                             <button 
                                onClick={handleNext}
                                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gunmetal/40 hover:text-sunset hover:border-sunset transition-all"
                             >
                                 <Icon icon="solar:arrow-right-linear" />
                             </button>
                        </div>
                    </div>

                    <div className="relative min-h-[80px]">
                        <AnimatePresence mode='wait'>
                            <motion.div 
                                key={activeStep}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.3 }}
                                className="text-sm text-gunmetal/70 leading-relaxed font-sans"
                            >
                                {educationalSteps[activeStep].content}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-50">
                        <motion.div 
                            className="h-full bg-sunset"
                            initial={{ width: 0 }}
                            animate={{ width: `${((activeStep + 1) / educationalSteps.length) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

// --------------------------------------------------------
// 🗺️ LANDS CONTENT V2: TABLERO DE OPERACIONES TÁCTICAS
// --------------------------------------------------------
function LandsContent() {
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [selectedLandId, setSelectedLandId] = useState<number>(0);

    // DATA ACTUALIZADA CON TUS TEXTOS ESTRATÉGICOS
    const LANDS_DATA = [
        {
            id: 0,
            name: "Main Street U.S.A.",
            alias: "EL CUELLO DE BOTELLA",
            icon: "solar:shop-bold-duotone",
            reality: "Es el único punto de entrada y salida. Es una trampa de tiempo en la mañana y un bloqueo humano en la noche.",
            tactics: [
                { title: "Rope Drop", desc: "¡No te detengas! Tu objetivo es cruzarla rápido para llegar a las atracciones." },
                { title: "Compras", desc: "Nunca compres al entrar. Las tiendas cierran 1h después del parque." },
                { title: "Café", desc: "Starbucks tiene la fila más larga. Usa Mobile Order o trae del hotel." }
            ],
            intel: { attraction: "Walt Disney World Railroad", food: "Casey's Corner", shop: "Emporium" }
        },
        {
            id: 1,
            name: "Adventureland",
            alias: "LA ZONA DE CALOR",
            icon: "solar:compass-bold-duotone",
            reality: "Pasillos estrechos + vegetación densa = Humedad elevada. Zona donde la paciencia se agota.",
            tactics: [
                { title: "Jungle Cruise", desc: "Demanda engañosa. Tiempos altos temprano. Prioridad media en Lightning Lane." },
                { title: "Hidratación", desc: "Usa Sunshine Tree Terrace para agua gratis (vasos de hielo)." },
                { title: "Dole Whip", desc: "Usa Mobile Order en Aloha Isle mientras caminas desde Piratas." }
            ],
            intel: { attraction: "Pirates of the Caribbean", food: "Aloha Isle", shop: "Plaza del Sol Caribe" }
        },
        {
            id: 2,
            name: "Frontierland",
            alias: "EL EXTREMO FÍSICO",
            icon: "solar:mountains-bold-duotone",
            reality: "Callejón sin salida geográfico. Si vas al fondo y la atracción está cerrada, debes caminar todo de vuelta.",
            tactics: [
                { title: "Tiana’s Bayou", desc: "Atracción de Fila Virtual. Si no tienes grupo a las 7:00 AM, no vayas." },
                { title: "Desfiles", desc: "La calle principal se bloquea 20 min. Cruza a Adventureland por el pasaje de madera." }
            ],
            intel: { attraction: "Big Thunder Mountain", food: "Pecos Bill", shop: "Frontier Trading Post" }
        },
        {
            id: 3,
            name: "Liberty Square",
            alias: "EL PIVOTE ESTRATÉGICO",
            icon: "solar:bell-bold-duotone",
            reality: "El mejor lugar para recuperar HP (Puntos de Salud) y comer con aire acondicionado.",
            tactics: [
                { title: "Refugio", desc: "Columbia Harbour House (2do piso). Vacío, A/C potente y baños limpios." },
                { title: "Haunted Mansion", desc: "Si el 'Wait Score' baja de 35 min, ve de inmediato." }
            ],
            intel: { attraction: "Haunted Mansion", food: "Columbia Harbour House", shop: "Memento Mori" }
        },
        {
            id: 4,
            name: "Fantasyland",
            alias: "LA ZONA DE CAOS",
            icon: "solar:castle-bold-duotone",
            reality: "Mayor densidad de strollers del mundo. Navegación difícil y ruido alto.",
            tactics: [
                { title: "Seven Dwarfs", desc: "¿Pagar Lightning Lane Single Pass? O247 recomienda SÍ para salvar piernas." },
                { title: "Smart Cut", desc: "Mickey’s PhilharMagic: Sin fila, A/C y 12 min sentados. Úsalo si hace >32°C." }
            ],
            intel: { attraction: "Seven Dwarfs Mine Train", food: "Be Our Guest", shop: "Sir Mickey's" }
        },
        {
            id: 5,
            name: "Tomorrowland",
            alias: "LA PARRILLA DE CONCRETO",
            icon: "solar:rocket-bold-duotone",
            reality: "Mucho concreto, poca sombra. El sol rebota y quema más aquí que en otro lado.",
            tactics: [
                { title: "TRON", desc: "Requiere Virtual Queue estricta a las 7:00 AM exactas." },
                { title: "Descanso", desc: "PeopleMover: 10 min sentado, brisa y sombra. Úsalo tras 15.000 pasos." }
            ],
            intel: { attraction: "TRON Lightcycle / Run", food: "Cosmic Ray's", shop: "Star Traders" }
        }
    ];

    const activeData = LANDS_DATA[selectedLandId];

    return (
        <>
             <AnimatePresence>
                {isMapOpen && <MapModal onClose={() => setIsMapOpen(false)} />}
            </AnimatePresence>

            <div className="space-y-6">
                 {/* Header & Map Button */}
                 <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-gunmetal font-sans">Tablero de Operaciones</h3>
                    <button 
                        onClick={() => setIsMapOpen(true)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-lg text-[10px] font-bold text-emerald-700 hover:bg-emerald-100 transition-colors font-mono tracking-wide"
                    >
                        <Icon icon="solar:map-bold-duotone" className="w-3 h-3" />
                        VER GEODATA (PDF)
                    </button>
                 </div>

                 <div className="flex flex-col lg:flex-row gap-6">
                    {/* COLUMNA 1: SELECTOR DE TIERRAS */}
                    <div className="w-full lg:w-1/3 grid grid-cols-2 lg:grid-cols-1 gap-2">
                        {LANDS_DATA.map((land) => (
                            <button
                                key={land.id}
                                onClick={() => setSelectedLandId(land.id)}
                                className={`
                                    p-3 rounded-xl border text-left transition-all duration-300 flex items-center gap-3 group
                                    ${selectedLandId === land.id 
                                        ? 'bg-gunmetal border-gunmetal text-white shadow-lg' 
                                        : 'bg-white border-gray-100 hover:border-sunset/50 text-gunmetal'}
                                `}
                            >
                                <Icon 
                                    icon={land.icon} 
                                    className={`w-5 h-5 ${selectedLandId === land.id ? 'text-celeste' : 'text-gray-300 group-hover:text-sunset'}`} 
                                />
                                <span className={`text-xs font-bold font-sans ${selectedLandId === land.id ? 'text-white' : 'text-gunmetal'}`}>
                                    {land.name}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* COLUMNA 2: DETALLE TÁCTICO (MASTER VIEW) */}
                    <div className="w-full lg:w-2/3">
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={selectedLandId}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-full flex flex-col"
                            >
                                {/* Header del Detalle */}
                                <div className="mb-4 pb-4 border-b border-gray-100">
                                    <span className="text-[10px] font-bold font-mono text-sunset uppercase tracking-widest">
                                        {activeData.alias}
                                    </span>
                                    <h2 className="text-2xl font-black text-gunmetal font-sans mt-1">
                                        {activeData.name}
                                    </h2>
                                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border-l-4 border-gunmetal">
                                        <p className="text-xs text-gunmetal/80 italic font-sans">
                                            "{activeData.reality}"
                                        </p>
                                    </div>
                                </div>

                                {/* Tácticas */}
                                <div className="space-y-4 mb-6 flex-1">
                                    {activeData.tactics.map((tactic, i) => (
                                        <div key={i} className="flex gap-3 items-start">
                                            <div className="mt-1 min-w-[16px]">
                                                <Icon icon="solar:check-circle-bold" className="w-4 h-4 text-emerald-500" />
                                            </div>
                                            <div>
                                                <h5 className="text-xs font-bold text-gunmetal font-mono uppercase">{tactic.title}</h5>
                                                <p className="text-xs text-gray-500 font-sans leading-relaxed">{tactic.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Quick Intel (Icons) */}
                                <div className="mt-auto pt-4 border-t border-gray-100 grid grid-cols-3 gap-2">
                                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                                        <Icon icon="solar:star-fall-bold-duotone" className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                                        <span className="block text-[9px] font-bold text-gray-400 uppercase font-mono">Top Ride</span>
                                        <span className="block text-[10px] font-bold text-gunmetal font-sans leading-tight mt-0.5">{activeData.intel.attraction}</span>
                                    </div>
                                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                                        <Icon icon="solar:chef-hat-heart-bold-duotone" className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                                        <span className="block text-[9px] font-bold text-gray-400 uppercase font-mono">Eat</span>
                                        <span className="block text-[10px] font-bold text-gunmetal font-sans leading-tight mt-0.5">{activeData.intel.food}</span>
                                    </div>
                                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                                        <Icon icon="solar:bag-heart-bold-duotone" className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                                        <span className="block text-[9px] font-bold text-gray-400 uppercase font-mono">Shop</span>
                                        <span className="block text-[10px] font-bold text-gunmetal font-sans leading-tight mt-0.5">{activeData.intel.shop}</span>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                 </div>
            </div>
        </>
    )
}

// --------------------------------------------------------
// 🏆 BUCKET LIST: COLECCIONISTA DE MOMENTOS (SPIN STACK)
// --------------------------------------------------------
function BucketListContent() {
    const [activeTab, setActiveTab] = useState(0);
    const [cardIndex, setCardIndex] = useState(0);
    const [activeTerm, setActiveTerm] = useState<string | null>(null);

    const openGlossary = (term: string) => setActiveTerm(term);
    const closeGlossary = () => setActiveTerm(null);

    // Reiniciar índice de tarjeta al cambiar de nivel
    useEffect(() => {
        setCardIndex(0);
    }, [activeTab]);

    // --- DATOS DE NIVELES ---
    const LEVELS = [
        { 
            id: 0, label: "Classic", desc: "Nivel 1", 
            style: "bg-white border-gray-200 text-gunmetal hover:bg-gray-50",
            activeStyle: "bg-white border-gray-300 text-gunmetal ring-2 ring-gray-200 shadow-lg"
        },
        { 
            id: 1, label: "Gold", desc: "Nivel 2", 
            style: "bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 text-amber-900 hover:to-amber-200",
            activeStyle: "bg-gradient-to-br from-amber-100 to-amber-200 border-amber-400 text-amber-950 ring-2 ring-amber-300 shadow-lg shadow-amber-100"
        },
        { 
            id: 2, label: "Platinum", desc: "Nivel 3", 
            style: "bg-gradient-to-br from-slate-100 to-slate-200 border-slate-300 text-slate-700 hover:to-slate-300",
            activeStyle: "bg-gradient-to-br from-slate-200 to-slate-300 border-slate-400 text-slate-900 ring-2 ring-slate-400 shadow-lg shadow-slate-200"
        },
        { 
            id: 3, label: "Black", desc: "Nivel 4", 
            style: "bg-gunmetal border-gunmetal text-gray-400 hover:text-white",
            activeStyle: "bg-[#1a1a1a] border-black text-white ring-2 ring-gray-700 shadow-xl shadow-gray-900/50"
        },
    ];

    // --- DATOS DE ITEMS ---
    const BUCKET_ITEMS = [
        // NIVEL 1
        [
            { title: "Protocolo Dole Whip", type: "Snack", desc: (<>Cómetelo en Aloha Isle. Tip O247: Usa <Term id="mobile-order" onOpen={openGlossary}>Mobile Order</Term> para no hacer fila al sol.</>) },
            { title: "El Muro Morado", type: "Photo Op", desc: "Un clásico de Instagram en Tomorrowland. La luz de la tarde es la mejor para esta foto." },
            { title: "Encontrar a Pascal", type: "Discovery", desc: "Busca los camaleones escondidos en el área de descanso de Rapunzel en Fantasyland." }
        ],
        // NIVEL 2
        [
            { title: "Héroe Galáctico", type: "Gaming", desc: "Obtén 999,999 puntos en Buzz Lightyear. Apunta al volcán y debajo de la garra de Zurg." },
            { title: "Castillo Vacío", type: "Photo Op", desc: "Reserva desayuno temprano en Crystal Palace o quédate hasta el Kiss Goodnight para esta foto." }
        ],
        // NIVEL 3
        [
            { title: "The Flag Retreat", type: "Ceremony", desc: "5:00 PM en Town Square. Emotiva ceremonia patriótica con veteranos. Un momento de calma." },
            { title: "Kiss Goodnight", type: "Magic", desc: "30 min después del cierre. El castillo se ilumina y suena un mensaje de despedida especial." },
            { title: "Correo Mágico", type: "Legacy", desc: "Envía una postal desde los buzones reales de Main Street. Tendrá el matasellos de Magic Kingdom." }
        ],
        // NIVEL 4
        [
            { title: "Cinderella’s Table", type: "Dining", desc: "Comer dentro del castillo. Requiere reserva 60 días antes. Si fallas, usa nuestras alertas." },
            { title: "Fireworks Party", type: "Event", desc: "¿Vale la pena? Sí, si odias las multitudes y tienes presupuesto extra para verlos sentado." },
            { title: "Keys to the Kingdom", type: "Tour", desc: "Tour guiado de 5 horas que baja a los túneles subterráneos (Utilidors). Solo adultos." }
        ]
    ];

    const currentItems = BUCKET_ITEMS[activeTab];
    const itemsLength = currentItems.length;
    const activeItem = currentItems[cardIndex];

    const nextCard = () => setCardIndex((prev) => (prev + 1) % itemsLength);
    const prevCard = () => setCardIndex((prev) => (prev - 1 + itemsLength) % itemsLength);

    return (
        <>
            <AnimatePresence>
                {activeTerm && <GlossaryModal termKey={activeTerm} onClose={closeGlossary} />}
            </AnimatePresence>

            <div className="flex flex-col gap-10">
                {/* 1. TABS DE NIVELES */}
                <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide px-1 snap-x">
                    {LEVELS.map((level) => (
                        <button
                            key={level.id}
                            onClick={() => setActiveTab(level.id)}
                            className={`relative flex-shrink-0 w-36 h-24 rounded-xl border flex flex-col justify-between p-4 transition-all duration-300 snap-center ${activeTab === level.id ? level.activeStyle : level.style}`}
                        >
                            <div className={`w-7 h-5 rounded-md bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 opacity-80 shadow-sm ${activeTab === level.id ? 'opacity-100' : 'grayscale opacity-40'}`} />
                            <div className="text-left z-10">
                                <span className="block text-[9px] font-bold font-mono tracking-widest uppercase opacity-70 mb-1">{level.desc}</span>
                                <span className="block text-sm font-black font-sans tracking-wide uppercase">{level.label}</span>
                            </div>
                            {level.id > 1 && <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full blur-xl -mr-5 -mt-5 pointer-events-none" />}
                        </button>
                    ))}
                </div>

                {/* 2. SPLIT CONTENT (60% FOTOS SPIN | 40% TEXTO FLOTANTE) */}
                <div className="relative w-full flex flex-col md:flex-row gap-8 items-center min-h-[450px]"> 
                    
                    {/* 🟢 IZQUIERDA (60%): FOTO STACK GIRATORIO */}
                    <div className="relative w-full md:w-[60%] h-[400px] flex items-center justify-center">
                        
                        {/* Controles de Navegación */}
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between z-50 pointer-events-none px-4">
                            <button onClick={prevCard} className="pointer-events-auto w-10 h-10 rounded-full bg-white/80 backdrop-blur shadow-lg flex items-center justify-center text-gunmetal hover:scale-110 transition-all border border-white/50">
                                <Icon icon="solar:alt-arrow-left-linear" className="w-5 h-5" />
                            </button>
                            <button onClick={nextCard} className="pointer-events-auto w-10 h-10 rounded-full bg-white/80 backdrop-blur shadow-lg flex items-center justify-center text-gunmetal hover:scale-110 transition-all border border-white/50">
                                <Icon icon="solar:alt-arrow-right-linear" className="w-5 h-5" />
                            </button>
                        </div>

                        {/* El Stack de Cartas */}
                        <div className="relative w-[85%] h-full flex items-center justify-center">
                            {currentItems.map((item, index) => {
                                let relativeIndex = (index - cardIndex + itemsLength) % itemsLength;
                                const isVisible = relativeIndex < 3 || relativeIndex > itemsLength - 2; 
                                
                                // Matemáticas para el efecto "Spin Stack"
                                const yOffset = relativeIndex * 15; 
                                const scale = 1 - (relativeIndex * 0.05);
                                const opacity = relativeIndex === 0 ? 1 : 1 - (relativeIndex * 0.3);
                                const zIndex = itemsLength - relativeIndex;
                                const rotate = relativeIndex * 8; 

                                return (
                                    <motion.div
                                        key={`${activeTab}-${index}`}
                                        animate={{
                                            top: relativeIndex === 0 ? 'auto' : undefined,
                                            y: relativeIndex === 0 ? 0 : Math.abs(relativeIndex) * 25,
                                            x: relativeIndex * 35,
                                            rotate: rotate,
                                            scale: scale,
                                            opacity: relativeIndex > 2 ? 0 : opacity,
                                            zIndex: zIndex,
                                            filter: relativeIndex === 0 ? 'blur(0px)' : 'blur(2px)'
                                        }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                        className="absolute w-full max-w-sm h-[280px] bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-4 border-white overflow-hidden origin-center"
                                        style={{ display: relativeIndex > 2 ? 'none' : 'block' }}
                                    >
                                        <div className="w-full h-full bg-gray-200 relative">
                                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                                <Icon icon="solar:gallery-wide-bold-duotone" className="w-24 h-24 opacity-30" />
                                            </div>
                                            {/* Badge Tipo */}
                                            <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur text-[10px] font-black font-mono text-gunmetal uppercase tracking-widest shadow-sm">
                                                {item.type}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* 🟣 DERECHA (40%): TEXTO FLOTANTE */}
                    <div className="w-full md:w-[40%] pl-6 flex flex-col justify-center min-h-[250px]">
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={cardIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                {/* Header Breadcrumb */}
                                <div className="mb-3 flex items-center gap-3 opacity-40">
                                    <span className="text-[9px] font-bold font-mono uppercase tracking-widest text-gunmetal">
                                        {LEVELS[activeTab].label}
                                    </span>
                                    <div className="h-px flex-1 bg-gunmetal"></div>
                                    <span className="text-[9px] font-bold font-mono text-gunmetal">
                                        0{cardIndex + 1} / 0{itemsLength}
                                    </span>
                                </div>

                                <h3 className="text-4xl font-black text-gunmetal font-sans leading-[0.9] mb-5 tracking-tight">
                                    {activeItem.title}
                                </h3>
                                
                                <div className="text-sm text-gunmetal/80 font-sans leading-relaxed font-medium mb-8">
                                    {activeItem.desc}
                                </div>

                                <button className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#1a1a1a] text-white hover:bg-sunset transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 group">
                                    <span className="text-[10px] font-bold font-mono uppercase tracking-widest">
                                        Agregar al Plan
                                    </span>
                                    <Icon icon="solar:arrow-right-linear" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </>
    )
}

// --------------------------------------------------------
// 🧠 LOGÍSTICA V24: CALCULADORA EDUCATIVA + COMPARADOR + TIPOGRAFÍA DE MARCA
// --------------------------------------------------------
function LogisticsContent() {
    const [userType, setUserType] = useState<'resort' | 'external'>('resort');
    const [transport, setTransport] = useState<'bus' | 'car' | 'uber'>('bus');
    const [selectedResort, setSelectedResort] = useState("Seleccionar Hotel Disney...");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showComparison, setShowComparison] = useState(false); 
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Cerrar dropdown al hacer click fuera
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (userType === 'resort') setTransport('bus');
        else setTransport('car');
        setShowComparison(false); // Resetear comparador al cambiar tipo usuario
    }, [userType]);

    // Data Dinámica del Stepper
    const getSteps = (): LogisticsStep[] => {
        if (userType === 'resort') {
            if (transport === 'bus') {
                return [
                    { id: 1, icon: "solar:bed-bold-duotone", label: "Tu Habitación", connectionType: "walk", connectionLabel: "Caminar 3m" },
                    { id: 2, icon: "solar:bus-bold-duotone", label: "Bus Disney", connectionType: "ride", connectionLabel: "Bus Directo" },
                    { id: 3, icon: "solar:castle-bold-duotone", label: "Entrada", connectionType: "none" }
                ];
            } else { 
                return [
                    { id: 1, icon: "solar:bed-bold-duotone", label: "Tu Habitación", connectionType: "ride", connectionLabel: "Auto Propio" },
                    { id: 2, icon: "solar:ticket-bold-duotone", label: "TTC Parking", connectionType: "ride", connectionLabel: "Ferry / Monorriel" },
                    { id: 3, icon: "solar:castle-bold-duotone", label: "Entrada", connectionType: "none" }
                ];
            }
        } else {
            if (transport === 'car') {
                return [
                    { id: 1, icon: "solar:city-bold-duotone", label: "Tu Hotel", connectionType: "ride", connectionLabel: "Conducir" },
                    { id: 2, icon: "solar:ticket-bold-duotone", label: "TTC Parking", connectionType: "ride", connectionLabel: "Ferry / Monorriel" },
                    { id: 3, icon: "solar:castle-bold-duotone", label: "Entrada", connectionType: "none" }
                ];
            } else {
                return [
                    { id: 1, icon: "solar:city-bold-duotone", label: "Tu Hotel", connectionType: "ride", connectionLabel: "Uber / Lyft" },
                    { id: 2, icon: "solar:map-point-bold-duotone", label: "Drop-off", connectionType: "walk", connectionLabel: "Caminar 5m" },
                    { id: 3, icon: "solar:castle-bold-duotone", label: "Entrada", connectionType: "none" }
                ];
            }
        }
    };

    const steps = getSteps();
    const hasTTC = steps.some(s => s.label.includes("TTC"));

    // --- LÓGICA EDUCATIVA Y DE COSTOS ---
    const getDetailedMetrics = () => {
        let time = 0;
        let totalCost = 0;
        let breakdown: { label: string, value: string | number, note?: string, highlight?: boolean }[] = [];

        if (userType === 'resort') {
            if (transport === 'bus') {
                time = 20;
                totalCost = 0;
                breakdown = [
                    { label: "Ticket Bus", value: "GRATIS", note: "Beneficio Hotel" },
                    { label: "Parking Parque", value: "GRATIS", note: "Ahorras $30", highlight: true }
                ];
            } else if (transport === 'car') {
                time = 35;
                totalCost = 0; 
                breakdown = [
                    { label: "Gasolina Est.", value: "~$2 USD" },
                    { label: "Parking Parque", value: "GRATIS", note: "Beneficio Hotel", highlight: true }
                ];
            } else { // Uber
                time = 20;
                totalCost = RATES.uber_avg;
                breakdown = [
                    { label: "Tarifa Uber", value: `$${RATES.uber_avg} USD` },
                    { label: "Propina Est.", value: "~$3-5 USD", note: "Opcional" }
                ];
            }
        } else { // External
            if (transport === 'car') {
                time = 45;
                totalCost = RATES.parking;
                breakdown = [
                    { label: "Parking Disney", value: `$${RATES.parking} USD` },
                    { label: "Gasolina Est.", value: "~$3 USD" }
                ];
            } else { // Uber
                time = 25;
                totalCost = RATES.uber_avg;
                breakdown = [
                    { label: "Tarifa Uber", value: `$${RATES.uber_avg} USD` },
                    { label: "Propina Est.", value: "~$3-5 USD", note: "Opcional" }
                ];
            }
        }
        return { time, totalCost, breakdown };
    };

    const metrics = getDetailedMetrics();

    return (
        <div className="flex flex-col gap-8">
            {/* JERARQUÍA 1: TÍTULO PRINCIPAL DE LA SECCIÓN (Narrativa -> Sans) */}
            <div className="border-b border-gunmetal/5 pb-4">
                <h2 className="text-3xl font-black text-gunmetal tracking-tight mb-2 font-sans">Configurador de Arribo</h2>
                <p className="text-sm font-medium text-gunmetal/60 max-w-2xl leading-relaxed font-sans">
                    Simula tu logística. El sistema detecta ineficiencias (como el TTC) y calcula el esfuerzo real.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                
                {/* COLUMNA IZQUIERDA: CONTROLES */}
                <div className="flex-1 w-full space-y-6">
                    
                    {/* SELECTOR TIPO ALOJAMIENTO */}
                    <div>
                        {/* Label Guía -> Tech/Mono */}
                        <div className="mb-2 pl-1">
                            <span className="text-[10px] font-bold text-gunmetal/40 uppercase tracking-widest font-mono">¿Te vas a hospedar en...?</span>
                        </div>
                        <div className="flex p-1 bg-gray-100 rounded-xl">
                            {/* Botones: Sans (Narrativa de opción) */}
                            <button 
                                onClick={() => setUserType('resort')} 
                                className={`flex-1 py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all font-sans ${userType === 'resort' ? 'bg-sunset text-white shadow-sm' : 'text-gray-400 hover:text-gunmetal'}`}
                            >
                                Hotel Disney
                            </button>
                            <button 
                                onClick={() => setUserType('external')} 
                                className={`flex-1 py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all font-sans ${userType === 'external' ? 'bg-sunset text-white shadow-sm' : 'text-gray-400 hover:text-gunmetal'}`}
                            >
                                Fuera de Disney
                            </button>
                        </div>
                    </div>

                    {/* DROPDOWN (CONDICIONAL) */}
                    <AnimatePresence>
                        {userType === 'resort' && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-visible z-50 relative"
                                ref={dropdownRef}
                            >
                                <button 
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className={`w-full flex items-center justify-between p-4 bg-white border rounded-xl transition-all duration-300 ${isDropdownOpen ? 'border-sunset ring-2 ring-sunset/20' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gunmetal/5 flex items-center justify-center text-gunmetal">
                                            <Icon icon="solar:city-bold-duotone" width="18" />
                                        </div>
                                        {/* Nombre Hotel -> Sans */}
                                        <span className={`text-sm font-bold font-sans ${selectedResort === "Seleccionar Hotel Disney..." ? 'text-gray-400' : 'text-gunmetal'}`}>
                                            {selectedResort}
                                        </span>
                                    </div>
                                    <Icon icon="solar:alt-arrow-down-linear" className={`text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* LISTA FLOTANTE */}
                                <AnimatePresence>
                                    {isDropdownOpen && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-100 shadow-2xl max-h-60 overflow-y-auto z-50 p-2 overscroll-contain"
                                            onWheel={(e) => e.stopPropagation()}
                                        >
                                            {DISNEY_RESORTS.map((resort, i) => (
                                                <div 
                                                    key={i}
                                                    onClick={() => {
                                                        setSelectedResort(resort.name);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer flex items-center justify-between group transition-colors"
                                                >
                                                    <span className="text-xs font-bold text-gunmetal/80 group-hover:text-gunmetal font-sans">{resort.name}</span>
                                                    {/* Tag Categoría -> Mono (Tech) */}
                                                    <span className={`text-[9px] font-bold px-2 py-1 rounded border font-mono ${
                                                        resort.category === 'Deluxe' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                                        resort.category === 'Moderate' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                                        'bg-blue-50 text-blue-600 border-blue-100'
                                                    }`}>
                                                        {resort.category.toUpperCase()}
                                                    </span>
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                    {/* TARJETAS DE TRANSPORTE (AUMENTO WHITE SPACE: PT-24) */}
                    <div className="grid grid-cols-3 gap-4 pt-24"> 
                        <AnimatePresence>
                            {userType === 'resort' && (
                                <TransportCard 
                                    label="Bus Oficial" 
                                    subLabel="Transporte Disney"
                                    selected={transport === 'bus'} 
                                    onClick={() => setTransport('bus')} 
                                    imageSrc="/images/bus_render.png" 
                                    type="bus"
                                />
                            )}
                        </AnimatePresence>
                        <TransportCard 
                            label="Auto Propio" 
                            subLabel="Parking Estándar"
                            selected={transport === 'car'} 
                            onClick={() => setTransport('car')} 
                            imageSrc="/images/car_render.png" 
                            type="car" 
                        />
                        <TransportCard 
                            label="Uber / Lyft" 
                            subLabel="App Rideshare"
                            selected={transport === 'uber'} 
                            onClick={() => setTransport('uber')} 
                            imageSrc="/images/uberlyft_render.png" 
                            type="uber"
                        />
                    </div>

                    {/* STEPPER ANIMADO */}
                    <div className="pt-4 relative w-full">
                        <LogisticsStepper steps={steps} />
                        
                        <AnimatePresence>
                            {hasTTC && (
                                <motion.div initial={{opacity:0, y:-5}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="mt-4 p-4 bg-orange-50 rounded-xl border border-orange-100 flex items-start gap-3">
                                    <Icon icon="solar:info-circle-bold" className="text-orange-500 w-5 h-5 shrink-0 mt-0.5" />
                                    <div>
                                        {/* Título TTC -> Mono/Tech (Identidad de marca) */}
                                        <p className="text-[10px] font-bold text-orange-800 uppercase tracking-wide mb-1 font-mono">¿Qué es el TTC?</p>
                                        {/* Descripción -> Sans/Narrativa */}
                                        <p className="text-xs text-orange-700/80 leading-relaxed font-medium font-sans">
                                            El <strong>Ticket & Transportation Center</strong> es el estacionamiento general. No está en la puerta del parque. Debes estacionar, tomar un tram, y luego un Ferry o Monorriel para cruzar el lago.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* NUEVO BOTÓN CONECTOR */}
                    <Link href="/disney/resorts" className="block mt-4">
                        <div className="w-full p-4 rounded-xl border border-dashed border-gunmetal/20 hover:border-sunset/50 hover:bg-sunset/5 transition-all duration-300 flex items-center justify-between group cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm text-gunmetal group-hover:text-sunset transition-colors">
                                    <Icon icon="solar:city-bold-duotone" width="20" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-gunmetal group-hover:text-sunset transition-colors font-sans">¿Dudas con tu Hotel?</h4>
                                    <p className="text-[10px] text-gunmetal/60 font-sans">Descubre los beneficios exclusivos de hospedarte en Disney.</p>
                                </div>
                            </div>
                            <div className="text-gunmetal/30 group-hover:text-sunset transition-colors">
                                <Icon icon="solar:arrow-right-bold" width="18" />
                            </div>
                        </div>
                    </Link>

                </div>

                {/* COLUMNA DERECHA: CALCULADORA EDUCATIVA + COMPARADOR */}
                <div className="lg:w-[380px] flex flex-col gap-4">
                    
                    {/* 1. BOX DE VEREDICTO (COLORES DINÁMICOS VERDE/ROJO SUTIL) */}
                    {!showComparison && (
                        <div className={`p-6 rounded-2xl border-l-4 shadow-xl transition-all duration-500 ${hasTTC ? 'bg-rose-50 border-rose-500' : 'bg-emerald-50 border-emerald-500'}`}>
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`p-2 rounded-full ${hasTTC ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                    <Icon icon={hasTTC ? "solar:info-circle-bold" : "solar:verified-check-bold"} className="w-5 h-5" />
                                </div>
                                {/* Titulo Veredicto -> Tech/Mono (Estado del sistema) */}
                                <h4 className={`text-xs font-black uppercase tracking-widest font-mono ${hasTTC ? 'text-rose-900' : 'text-emerald-900'}`}>
                                    {hasTTC ? "Ruta con Fricción" : "Ruta Eficiente"}
                                </h4>
                            </div>
                            {/* Descripción -> Sans (Explicación) */}
                            <p className={`text-xs font-medium leading-relaxed font-sans ${hasTTC ? 'text-rose-700' : 'text-emerald-800'}`}>
                                {hasTTC 
                                    ? "Esta ruta incluye trasbordos obligatorios. Considera llegar 30 min antes para compensar el cruce del lago." 
                                    : "¡Excelente elección! Esta ruta te deja directamente en los molinetes de entrada, ahorrando tiempo valioso."}
                            </p>
                        </div>
                    )}

                    {/* 2. BOX DE MÉTRICAS EDUCATIVA + BOTÓN COMPARAR */}
                    <div className="bg-gunmetal text-white p-6 rounded-2xl shadow-2xl mt-auto relative overflow-hidden transition-all duration-500">
                        
                        {/* HEADER CON TOGGLE */}
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                            {/* Label Header -> Tech/Mono */}
                            <span className="text-[10px] font-bold uppercase opacity-50 tracking-widest font-mono">
                                {showComparison ? "Tabla Comparativa" : "Análisis de Costos"}
                            </span>
                            <button 
                                onClick={() => setShowComparison(!showComparison)}
                                // Boton Tech -> Mono
                                className="text-[10px] font-bold uppercase tracking-wider text-celeste hover:text-white transition-colors flex items-center gap-1 group font-mono"
                            >
                                <Icon icon={showComparison ? "solar:undo-left-bold" : "solar:scale-bold-duotone"} className="transition-transform group-hover:scale-110" />
                                {showComparison ? "Volver" : "Comparar"}
                            </button>
                        </div>

                        {/* CONTENIDO CAMBIANTE */}
                        <AnimatePresence mode='wait'>
                            {showComparison ? (
                                // --- VISTA COMPARATIVA (TABLA) ---
                                <motion.div 
                                    key="compare"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-4"
                                >
                                    <div className="grid grid-cols-3 gap-2 text-[9px] font-bold opacity-50 uppercase mb-1 px-1 font-mono">
                                        <span>Opción</span>
                                        <span className="text-center">Tiempo</span>
                                        <span className="text-right">Costo</span>
                                    </div>
                                    
                                    {/* OPCIONES COMPARADAS (Dinámicas según UserType) */}
                                    <div className="space-y-2">
                                        {userType === 'resort' ? (
                                            <>
                                                <div className="grid grid-cols-3 gap-2 items-center text-xs py-3 px-3 bg-white/5 rounded-lg border border-white/5">
                                                    <span className="font-bold text-celeste font-sans">Bus Disney</span>
                                                    <span className="text-center font-mono">20m</span>
                                                    <span className="text-right font-bold text-emerald-400 font-mono">Gratis</span>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2 items-center text-xs py-3 px-3 bg-white/5 rounded-lg border border-white/5">
                                                    <span className="font-bold font-sans">Auto</span>
                                                    <span className="text-center font-mono text-orange-300">35m</span>
                                                    <span className="text-right font-mono">~$2</span>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2 items-center text-xs py-3 px-3 bg-white/5 rounded-lg border border-white/5">
                                                    <span className="font-bold font-sans">Uber</span>
                                                    <span className="text-center font-mono text-emerald-400">20m</span>
                                                    <span className="text-right font-mono">~$25</span>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="grid grid-cols-3 gap-2 items-center text-xs py-3 px-3 bg-white/5 rounded-lg border border-white/5">
                                                    <span className="font-bold text-celeste font-sans">Auto</span>
                                                    <span className="text-center font-mono text-orange-300">45m</span>
                                                    <span className="text-right font-mono">$30</span>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2 items-center text-xs py-3 px-3 bg-white/5 rounded-lg border border-white/5">
                                                    <span className="font-bold font-sans">Uber</span>
                                                    <span className="text-center font-mono text-emerald-400">25m</span>
                                                    <span className="text-right font-mono">~$25</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </motion.div>
                            ) : (
                                // --- VISTA DESGLOSADA (EDUCATIVA) ---
                                <motion.div 
                                    key="single"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* LISTA DE ITEMS EDUCATIVOS */}
                                    <div className="space-y-3 mb-6 min-h-[80px]">
                                        {metrics.breakdown.map((item, i) => (
                                            <div key={i} className="flex justify-between items-center text-xs pb-2 border-b border-white/5 last:border-0">
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="font-medium text-white/90 font-sans">{item.label}</span>
                                                    {item.note && <span className={`text-[8px] font-bold uppercase tracking-wide font-mono ${item.highlight ? 'text-emerald-400' : 'text-white/40'}`}>{item.note}</span>}
                                                </div>
                                                <span className={`font-bold font-mono ${item.value === 'GRATIS' ? 'text-emerald-400' : ''}`}>{item.value}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* TOTALES */}
                                    <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                                        <div>
                                            <span className="block text-[10px] font-bold uppercase opacity-50 mb-0.5 font-mono">Tiempo Est.</span>
                                            <span className="text-2xl font-black font-mono">{metrics.time} <span className="text-sm font-bold opacity-50">min</span></span>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-[10px] font-bold uppercase opacity-50 mb-0.5 font-mono">Total Diario</span>
                                            <span className={`text-2xl font-black font-mono ${metrics.totalCost === 0 ? 'text-emerald-400' : 'text-white'}`}>
                                                {metrics.totalCost === 0 ? 'GRATIS' : (
                                                    <>
                                                        ${metrics.totalCost}<span className="text-xs font-bold opacity-50 align-top">USD</span>
                                                    </>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    )
}

// =====================================================================
// 🧩 EL COMPONENTE "THE CORE" (DECLARADO ANTES DE LA PÁGINA)
// =====================================================================
function TheCoreAccordion() {
  const [openSections, setOpenSections] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    if (openSections.includes(index)) {
      setOpenSections(openSections.filter(i => i !== index));
    } else {
      setOpenSections([...openSections, index]);
    }
  };

  const expandAll = () => setOpenSections([0, 1, 2, 3]);
  const collapseAll = () => setOpenSections([]);

  const sections = [
    { id: 0, title: "Logística y Protocolo de Arribo", icon: "solar:map-point-bold-duotone", component: <LogisticsContent /> },
    { id: 1, title: "Estrategia de Tiempos", icon: "solar:stopwatch-bold-duotone", component: <StrategyContent /> },
    { id: 2, title: "Topografía del Reino (Tierras)", icon: "solar:layers-minimalistic-bold-duotone", component: <LandsContent /> },
    { id: 3, title: "Experiencias y Bucket List", icon: "solar:clipboard-check-bold-duotone", component: <BucketListContent /> },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end justify-between border-b border-gunmetal/5 pb-4">
        <div>
          <h3 className="text-xl font-bold font-sans text-gunmetal uppercase tracking-tight">The Core</h3>
          <p className="text-xs text-gunmetal/50 font-mono mt-1">ANÁLISIS ESTRUCTURAL DEL PARQUE</p>
        </div>
        <div className="flex gap-2">
            <button onClick={expandAll} className="text-[9px] font-bold uppercase tracking-wider text-gunmetal/40 hover:text-sunset transition-colors px-3 py-1 bg-white rounded border border-transparent hover:border-gray-200 font-mono">
                [ + ] Expandir Todo
            </button>
            <button onClick={collapseAll} className="text-[9px] font-bold uppercase tracking-wider text-gunmetal/40 hover:text-sunset transition-colors px-3 py-1 bg-white rounded border border-transparent hover:border-gray-200 font-mono">
                [ - ] Colapsar
            </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {sections.map((section, idx) => (
          <div key={section.id} className="group">
            <div 
                onClick={() => toggleSection(section.id)}
                className={`
                    relative z-10 bg-white rounded-2xl p-4 pr-6 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)] border cursor-pointer transition-all duration-300
                    ${openSections.includes(section.id) ? 'border-sunset shadow-lg ring-1 ring-sunset/20' : 'border-transparent hover:border-sunset/30'}
                `}
            >
                <div className="flex items-center gap-5">
                    <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300
                        ${openSections.includes(section.id) ? 'bg-gunmetal text-white' : 'bg-[#f7f7f5] text-gunmetal group-hover:bg-gunmetal group-hover:text-white'}
                    `}>
                        <Icon icon={section.icon} className="w-6 h-6" />
                    </div>
                    <div>
                        <span className="block text-[9px] font-bold text-gunmetal/40 uppercase tracking-widest font-mono mb-0.5">PASO 0{idx + 1}</span>
                        <span className="font-bold text-gunmetal text-sm md:text-base tracking-tight font-sans">{section.title}</span>
                    </div>
                </div>
                <div className={`
                    w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300
                    ${openSections.includes(section.id) ? 'bg-sunset border-sunset text-white rotate-90' : 'border-gunmetal/10 text-gunmetal group-hover:bg-sunset group-hover:border-sunset group-hover:text-white'}
                `}>
                    <Icon icon="solar:arrow-right-linear" />
                </div>
            </div>

            <AnimatePresence>
                {openSections.includes(section.id) && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
                        className="overflow-hidden bg-white border border-gray-100 rounded-2xl mx-2 shadow-inner"
                    >
                        <div className="p-6 md:p-8">
                            {section.component}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

// =====================================================================
// 🏰 COMPONENTE PRINCIPAL (EXPORT DEFAULT) - AL FINAL
// =====================================================================

export default function MagicKingdomPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f5] pt-0 pb-20 px-6 md:px-12 lg:px-24 font-sans text-[#1a1a1a]">
      
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-[1200px] mx-auto flex flex-col gap-10"
      >



        {/* 2. HERO SECTION */}
        <motion.div 
            variants={itemVariants} 
            className="relative w-full h-[550px] rounded-[32px] bg-[#f7f7f5] flex items-center overflow-hidden shadow-sm"
        >
            <div className="absolute right-0 top-0 bottom-0 w-[75%] h-full select-none pointer-events-none">
                <div 
                    className="relative w-full h-full"
                    style={{
                        maskImage: 'linear-gradient(to right, transparent 5%, black 40%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 5%, black 40%)'
                    }}
                >
                    <img 
                        src="/images/tron_mk.jpg" 
                        alt="Tron Lightcycle Run"
                        className="w-full h-full object-cover object-center"
                    />
                </div>
            </div>

            <div className="relative z-20 w-full max-w-[55%] pl-12 pr-4 flex flex-col justify-center h-full">
                <div className="flex items-center gap-3 mb-5">
                    <div className="h-px w-10 bg-gunmetal/20" />
                    <h2 className="text-[10px] font-bold tracking-[0.25em] uppercase text-gunmetal/40 font-sans">
                        DONDE LA FANTASÍA REINA
                    </h2>
                </div>
                
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-gunmetal leading-[0.9] tracking-tighter mb-4 font-sans">
                    Magic<br/>Kingdom
                </h1>
                
                <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sunset to-celeste leading-tight mb-8 font-sans">
                    El Corazón de la Magia
                </h2>

                <p className="text-sm md:text-base text-gunmetal/60 font-medium leading-relaxed max-w-md mb-10 font-sans">
                    Seis tierras encantadas te esperan con atracciones clásicas, fuegos artificiales deslumbrantes y encuentros con personajes que definen la experiencia Disney.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-3 bg-[#1a1a1a] text-white px-5 py-2.5 rounded-full shadow-xl">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                        <span className="text-[10px] font-bold uppercase tracking-wider font-mono">HOY</span>
                        <div className="w-px h-3 bg-white/20" />
                        <span className="text-xs font-bold font-mono">28°C</span>
                    </div>

                    <div className="flex items-center gap-3 bg-white text-gunmetal px-5 py-2.5 rounded-full shadow-lg border border-white/50 backdrop-blur">
                        <Icon icon="solar:clock-circle-bold-duotone" className="text-celeste w-4 h-4" />
                        <span className="text-xs font-bold font-mono tracking-wide">09:00 AM - 11:00 PM</span>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* 3. METRICS GRID */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-8 border border-white/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                <div className="flex justify-between items-start mb-4">
                    <span className="text-[9px] font-bold text-gunmetal/40 tracking-[0.2em] uppercase font-mono">WAIT SCORE</span>
                    <div className="p-2 bg-emerald-500/10 rounded-full text-emerald-600">
                        <Icon icon="solar:check-circle-bold-duotone" width="20" />
                    </div>
                </div>
                <div className="flex items-baseline gap-1">
                    <span className="text-6xl font-black text-gunmetal tracking-tighter font-mono">85</span>
                    <span className="text-xl text-gunmetal/20 font-medium font-mono">/100</span>
                </div>
                <div className="mt-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-gunmetal/60 font-mono uppercase">Óptimo Hoy</span>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-white/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-sunset" />
                <div className="flex justify-between items-start mb-4">
                    <span className="text-[9px] font-bold text-gunmetal/40 tracking-[0.2em] uppercase font-mono">AFLUENCIA</span>
                    <div className="p-2 bg-sunset/10 rounded-full text-sunset">
                        <Icon icon="solar:users-group-rounded-bold-duotone" width="20" />
                    </div>
                </div>
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gunmetal tracking-tight font-mono">Moderada</span>
                </div>
                <div className="mt-6 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-sunset" />
                    <span className="text-xs font-bold text-gunmetal/60 font-mono uppercase">Flujo Constante</span>
                </div>
            </div>

            <div className="bg-gunmetal rounded-3xl p-8 text-white shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden cursor-pointer group">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                <div className="relative z-10 flex flex-col items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500">
                        <Icon icon="solar:routing-3-bold-duotone" className="text-celeste w-7 h-7" />
                    </div>
                    <div>
                        <span className="text-[9px] font-bold text-white/30 tracking-[0.25em] uppercase block mb-2 font-mono">O247 SYSTEM</span>
                        <span className="text-lg font-bold flex items-center gap-2 group-hover:text-celeste transition-colors font-sans">
                            SINCRO DE RUTA 
                            <Icon icon="solar:arrow-right-linear" />
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* 4. THE CORE (ACCORDION SYSTEM) */}
        <motion.div variants={itemVariants} className="mt-4">
            <TheCoreAccordion />
        </motion.div>

       {/* 5. DIRECTORIO */}
       <motion.div variants={itemVariants} className="mt-8">
            <div className="flex items-center gap-4 mb-6">
                <h3 className="text-lg font-bold text-gunmetal font-sans">Directorio</h3>
                <span className="bg-gunmetal/5 text-gunmetal text-[9px] font-bold px-2 py-1 rounded font-mono">142_ITEMS</span>
            </div>
            <div className="bg-white rounded-3xl border border-white/50 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 divide-x divide-gunmetal/5">
                    
                    {/* --- AQUÍ ESTÁ LA CLAVE: EL LINK --- */}
                    <Link href="/disney/mk/attractions" className="group cursor-pointer block">
                        <DirectoryItem icon="solar:ticket-bold-duotone" label="Atracciones" />
                    </Link>
                    {/* ----------------------------------- */}

                    <DirectoryItem icon="solar:chef-hat-bold-duotone" label="Restaurantes" />
                    <DirectoryItem icon="solar:bolt-bold-duotone" label="Comida Rápida" />
                    <DirectoryItem icon="solar:mask-happly-bold-duotone" label="Personajes" />
                    <DirectoryItem icon="solar:bag-bold-duotone" label="Souvenirs" />
                </div>
            </div>
        </motion.div>

        <div className="h-20" /> 
      </motion.div>
    </div>
  );
}