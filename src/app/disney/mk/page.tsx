"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';

// --- CONSTANTES ---
const RATES = {
    parking: 30,
    uber_avg: 25,
    minnie_van: 45
};

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
  visible: { 
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }
  }
};

export default function MagicKingdomPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f5] pt-28 pb-20 px-6 md:px-12 lg:px-24 font-sans text-[#1a1a1a]">
      
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-[1200px] mx-auto flex flex-col gap-10"
      >

        {/* 1. BREADCRUMB */}
        <motion.div variants={itemVariants} className="flex flex-col gap-4 relative z-30">
            <nav className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-gunmetal/40 font-mono">
                <Link href="/" className="hover:text-gunmetal hover:underline decoration-sunset decoration-2 underline-offset-4 transition-all duration-300">
                    HOME
                </Link>
                <Icon icon="solar:alt-arrow-right-linear" className="text-gunmetal/30" />
                <Link href="/disney/parks" className="hover:text-gunmetal hover:underline decoration-sunset decoration-2 underline-offset-4 transition-all duration-300">
                    DISNEY WORLD
                </Link>
                <Icon icon="solar:alt-arrow-right-linear" className="text-gunmetal/30" />
                <span className="text-sunset font-bold cursor-default">MAGIC KINGDOM</span>
            </nav>
        </motion.div>

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
                    <Image 
                        src="/images/tron_mk.jpg" 
                        alt="Tron Lightcycle Run"
                        fill
                        className="object-cover object-center"
                        priority
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
                
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-gunmetal leading-[0.9] tracking-tighter mb-4">
                    Magic<br/>Kingdom
                </h1>
                
                <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sunset to-celeste leading-tight mb-8">
                    El Corazón de la Magia
                </h2>

                <p className="text-sm md:text-base text-gunmetal/60 font-medium leading-relaxed max-w-md mb-10">
                    Seis tierras encantadas te esperan con atracciones clásicas, fuegos artificiales deslumbrantes y encuentros con personajes que definen la experiencia Disney.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-3 bg-[#1a1a1a] text-white px-5 py-2.5 rounded-full shadow-xl">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">HOY</span>
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
                    <span className="text-6xl font-black text-gunmetal tracking-tighter">85</span>
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
                    <span className="text-4xl font-bold text-gunmetal tracking-tight">Moderada</span>
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
                        <span className="text-lg font-bold flex items-center gap-2 group-hover:text-celeste transition-colors">
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
                <h3 className="text-lg font-bold text-gunmetal">Directorio</h3>
                <span className="bg-gunmetal/5 text-gunmetal text-[9px] font-bold px-2 py-1 rounded font-mono">142_ITEMS</span>
            </div>
            <div className="bg-white rounded-3xl border border-white/50 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 divide-x divide-gunmetal/5">
                    <DirectoryItem icon="solar:ticket-bold-duotone" label="Atracciones" />
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

// --- ACORDEÓN PRINCIPAL ---
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
            <button onClick={expandAll} className="text-[9px] font-bold uppercase tracking-wider text-gunmetal/40 hover:text-sunset transition-colors px-3 py-1 bg-white rounded border border-transparent hover:border-gray-200">
                [ + ] Expandir Todo
            </button>
            <button onClick={collapseAll} className="text-[9px] font-bold uppercase tracking-wider text-gunmetal/40 hover:text-sunset transition-colors px-3 py-1 bg-white rounded border border-transparent hover:border-gray-200">
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
                        <span className="font-bold text-gunmetal text-sm md:text-base tracking-tight">{section.title}</span>
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

// ===============================================
// 🧠 LOGÍSTICA V12: SOPORTE MIXTO PNG/WEBP
// ===============================================
function LogisticsContent() {
    // Estados
    const [userType, setUserType] = useState<'resort' | 'external'>('resort');
    const [transport, setTransport] = useState<'bus' | 'car' | 'uber'>('bus');

    useEffect(() => {
        if (userType === 'resort') setTransport('bus');
        else setTransport('car');
    }, [userType]);

    // Data Dinámica del Stepper
    const getSteps = () => {
        if (userType === 'resort') {
            if (transport === 'bus') {
                return [
                    { icon: "solar:bed-bold-duotone", label: "Tu Habitación", type: "start" },
                    { icon: "solar:walking-round-bold-duotone", label: "Caminar a Parada", type: "walk", note: "3-5 min" },
                    { icon: "solar:bus-bold-duotone", label: "Bus Disney", type: "ride", highlight: true, note: "Directo" },
                    { icon: "solar:castle-bold-duotone", label: "Entrada", type: "end" }
                ];
            } else { 
                return [
                    { icon: "solar:bed-bold-duotone", label: "Tu Habitación", type: "start" },
                    { icon: "solar:car-bold-duotone", label: "Conducir", type: "ride" },
                    { icon: "solar:ticket-bold-duotone", label: "Estacionar (TTC)", type: "transfer", warning: true },
                    { icon: "solar:sailing-bold-duotone", label: "Cruzar Lago", type: "ride" },
                    { icon: "solar:castle-bold-duotone", label: "Entrada", type: "end" }
                ];
            }
        } else {
            if (transport === 'car') {
                return [
                    { icon: "solar:city-bold-duotone", label: "Tu Hotel", type: "start" },
                    { icon: "solar:car-bold-duotone", label: "Conducir", type: "ride" },
                    { icon: "solar:ticket-bold-duotone", label: "Estacionar (TTC)", type: "transfer", warning: true, note: "Ticket & Transportation Ctr." },
                    { icon: "solar:sailing-bold-duotone", label: "Cruzar Lago", type: "ride", note: "Ferry o Monorriel" },
                    { icon: "solar:castle-bold-duotone", label: "Entrada", type: "end" }
                ];
            } else {
                return [
                    { icon: "solar:city-bold-duotone", label: "Tu Hotel", type: "start" },
                    { icon: "solar:smartphone-bold-duotone", label: "Viaje App", type: "ride" },
                    { icon: "solar:walking-round-bold-duotone", label: "Caminar", type: "walk" },
                    { icon: "solar:sailing-bold-duotone", label: "Cruzar Lago", type: "ride", note: "Ferry o Monorriel" },
                    { icon: "solar:castle-bold-duotone", label: "Entrada", type: "end" }
                ];
            }
        }
    };

    const steps = getSteps();
    const hasTTC = steps.some(s => s.warning);

    // Métricas
    const calculateMetrics = () => {
        let time = 0; let cost = 0;
        if (userType === 'resort') {
            time = transport === 'bus' ? 20 : 35;
            cost = transport === 'uber' ? RATES.uber_avg : 0;
        } else {
            time = transport === 'car' ? 45 : 30;
            cost = transport === 'car' ? RATES.parking : RATES.uber_avg;
        }
        return { time, cost };
    };
    const metrics = calculateMetrics();

    return (
        <div className="flex flex-col gap-10">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold text-gunmetal mb-2">Configurador de Arribo</h2>
                <p className="text-sm text-gunmetal/60 max-w-2xl">
                    Simula tu logística. El sistema detecta ineficiencias (como el TTC) y calcula el esfuerzo real.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* COLUMNA IZQUIERDA: CONFIGURACIÓN */}
                <div className="flex-1 space-y-8">
                    
                    {/* Selectores */}
                    <div className="space-y-4">
                        <div className="flex p-1 bg-gray-100 rounded-xl">
                            <button onClick={() => setUserType('resort')} className={`flex-1 py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${userType === 'resort' ? 'bg-white text-gunmetal shadow-sm' : 'text-gray-400 hover:text-gunmetal'}`}>Hotel Disney</button>
                            <button onClick={() => setUserType('external')} className={`flex-1 py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${userType === 'external' ? 'bg-white text-gunmetal shadow-sm' : 'text-gray-400 hover:text-gunmetal'}`}>Visitante Externo</button>
                        </div>
                        
                        {/* TARJETAS 3D (SOPORTE MIXTO PNG/WEBP) */}
                        <div className="grid grid-cols-3 gap-4 pt-10"> 
                            <AnimatePresence>
                                {userType === 'resort' && (
                                    <TransportCard 
                                        label="Bus Oficial" 
                                        subLabel="Transporte Disney"
                                        selected={transport === 'bus'} 
                                        onClick={() => setTransport('bus')} 
                                        imageSrc="/images/bus_render.png"  // PNG estándar
                                        type="bus"
                                    />
                                )}
                            </AnimatePresence>
                            <TransportCard 
                                label="Auto Propio" 
                                subLabel="Parking Estándar"
                                selected={transport === 'car'} 
                                onClick={() => setTransport('car')} 
                                imageSrc="/images/car_render.png" // PNG estándar
                                type="car" 
                            />
                            <TransportCard 
                                label="Uber / Lyft" 
                                subLabel="App Rideshare"
                                selected={transport === 'uber'} 
                                onClick={() => setTransport('uber')} 
                                imageSrc="/images/uber_render.webp" // WEBP para el que ya tienes
                                type="uber"
                            />
                        </div>
                    </div>

                    {/* Visualizador de Ruta */}
                    <div className="pt-8 pb-4 relative w-full">
                        <div className="flex items-start justify-between relative w-full px-4"> 
                            {/* LÍNEA DE FONDO */}
                            <div className="absolute top-5 left-9 right-9 h-[3px] bg-gray-100 -z-0 rounded-full"></div>
                            
                            {steps.map((step, idx) => (
                                <StepNode 
                                    key={idx} 
                                    icon={step.icon} 
                                    label={step.label} 
                                    warning={step.warning} 
                                    highlight={step.highlight}
                                    note={step.note}
                                    finish={step.type === 'end'}
                                />
                            ))}
                        </div>
                        
                        {/* Mensaje Educativo TTC */}
                        <AnimatePresence>
                            {hasTTC && (
                                <motion.div initial={{opacity:0, y:-5}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="mt-8 p-3 bg-orange-50 rounded-xl border border-orange-100 flex items-start gap-3">
                                    <Icon icon="solar:info-circle-bold" className="text-orange-500 w-5 h-5 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-[11px] font-bold text-orange-800 uppercase tracking-wide mb-1">¿Qué es el TTC?</p>
                                        <p className="text-[11px] text-orange-700/80 leading-relaxed">
                                            El <strong>Ticket & Transportation Center</strong> es el estacionamiento general. No está en la puerta del parque. Debes estacionar, tomar un tram, y luego un Ferry o Monorriel para cruzar el lago Seven Seas Lagoon.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* COLUMNA DERECHA: VEREDICTO */}
                <div className="lg:w-[380px] space-y-4">
                    <div className={`p-6 rounded-2xl border-l-4 shadow-xl transition-all duration-500 ${hasTTC ? 'bg-white border-orange-500' : 'bg-sky-50 border-sky-500'}`}>
                        <div className="flex items-center gap-3 mb-3">
                            <div className={`p-2 rounded-full ${hasTTC ? 'bg-orange-100 text-orange-600' : 'bg-sky-100 text-sky-600'}`}>
                                <Icon icon={hasTTC ? "solar:info-circle-bold" : "solar:verified-check-bold"} className="w-5 h-5" />
                            </div>
                            <h4 className={`text-xs font-black uppercase tracking-widest ${hasTTC ? 'text-orange-900' : 'text-sky-900'}`}>
                                {hasTTC ? "Ruta con Fricción" : "Ruta Eficiente"}
                            </h4>
                        </div>
                        <p className={`text-xs font-medium leading-relaxed ${hasTTC ? 'text-orange-700' : 'text-sky-800'}`}>
                            {hasTTC 
                                ? "Esta ruta incluye trasbordos obligatorios. Considera llegar 30 min antes para compensar el cruce del lago." 
                                : "¡Excelente elección! Esta ruta te deja directamente en los molinetes de entrada, ahorrando tiempo valioso."}
                        </p>
                    </div>

                    <div className="bg-gunmetal text-white p-6 rounded-2xl shadow-2xl">
                        <div className="flex justify-between items-end mb-4 border-b border-white/10 pb-4">
                            <span className="text-[10px] font-bold uppercase opacity-50">Tiempo Total Est.</span>
                            <span className="text-3xl font-black"><AnimatedNumber value={metrics.time} /> <span className="text-sm font-bold opacity-50">min</span></span>
                        </div>
                        <div className="flex justify-between items-end">
                            <span className="text-[10px] font-bold uppercase opacity-50">Costo Diario</span>
                            <span className={`text-2xl font-black ${metrics.cost === 0 ? 'text-emerald-400' : 'text-white'}`}>
                                {metrics.cost === 0 ? 'GRATIS' : `$${metrics.cost}`}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// --- COMPONENTE TRANSPORT CARD V3 (ESCALA REALISTA +50% SIZE) ---
function TransportCard({ label, subLabel, selected, onClick, imageSrc, type }: any) {
    // Escala +50% y centrado
    const imgSizeClass = type === 'bus' 
        ? 'w-52 h-36 -right-6 -top-10' 
        : (type === 'car' 
            ? 'w-48 h-32 -right-4 -top-9' 
            : 'w-44 h-28 -right-2 -top-7');

    return (
        <button 
            onClick={onClick}
            className={`
                relative h-28 w-full rounded-2xl border-2 transition-all duration-300 text-left overflow-visible group
                ${selected 
                    ? 'border-sky-500 bg-white shadow-[0_10px_30px_-10px_rgba(56,189,248,0.3)] ring-1 ring-sky-500 z-10' 
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md z-0'}
            `}
        >
            {/* Texto */}
            <div className="absolute bottom-3 left-3 z-10 max-w-[65%] leading-tight">
                <span className={`block text-[10px] font-black uppercase tracking-wider ${selected ? 'text-sky-600' : 'text-gunmetal'}`}>
                    {label}
                </span>
                <span className="block text-[8px] font-bold text-gray-400 mt-0.5 truncate">
                    {subLabel}
                </span>
            </div>

            {/* Imagen */}
            <div className={`
                absolute ${imgSizeClass} transition-transform duration-500 ease-out z-20 pointer-events-none
                ${selected ? 'scale-110 translate-y-[-5px]' : 'group-hover:scale-105'}
            `}>
                {/* Fallback */}
                <div className={`
                    absolute inset-0 rounded-full blur-xl opacity-20 transition-colors
                    ${selected ? 'bg-sky-400' : 'bg-gray-400'}
                `}></div>
                
                {imageSrc ? (
                    <Image 
                        src={imageSrc} 
                        alt={label} 
                        fill 
                        className="object-contain drop-shadow-xl"
                        sizes="(max-width: 768px) 100vw, 33vw"
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

function StepNode({ icon, label, warning, highlight, finish, note }: any) {
    return (
        <div className="flex flex-col items-center relative z-10 gap-2 w-20 group">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 shadow-sm transition-all duration-300 z-20 ${
                warning ? 'bg-orange-500 border-orange-100 text-white' : 
                (highlight ? 'bg-sky-500 border-sky-100 text-white' : 
                (finish ? 'bg-gunmetal border-gray-200 text-white' : 'bg-white border-gray-100 text-gunmetal'))
            }`}>
                <Icon icon={icon} width="18" />
            </div>
            <div className="text-center">
                <span className={`block text-[9px] font-bold uppercase leading-tight ${warning ? 'text-orange-600' : (highlight ? 'text-sky-600' : 'text-gunmetal/70')}`}>{label}</span>
                {note && <span className="block text-[8px] text-gray-400 font-medium mt-0.5">{note}</span>}
            </div>
        </div>
    )
}

function AnimatedNumber({ value }: { value: number }) {
    const spring = useSpring(0, { bounce: 0, duration: 600 });
    const display = useTransform(spring, (current) => Math.round(current));
    useEffect(() => { spring.set(value); }, [value, spring]);
    return <motion.span>{display}</motion.span>;
}

// --- CONTENIDO ESTÁTICO ---
function StrategyContent() {
    return (
        <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3 bg-[#f7f7f5] rounded-xl p-6 flex flex-col justify-between min-h-[200px] border border-gray-200">
                 <div className="flex items-baseline">
                    <span className="text-8xl font-black text-gunmetal tracking-tighter leading-none">02</span>
                    <span className="text-lg font-bold text-sunset uppercase tracking-widest ml-2">DÍAS</span>
                 </div>
                 <p className="text-xs text-gunmetal/60 font-medium leading-relaxed mt-4">
                    Métrica calculada para cubrir el 100% de las 6 tierras sin estrés operativo.
                 </p>
            </div>
            <div className="w-full md:w-2/3 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border border-gray-100 p-4 rounded-xl flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-ai-blue">
                             <Icon icon="solar:bolt-bold-duotone" />
                        </div>
                        <div>
                            <h4 className="font-bold text-xs text-gunmetal">Early Entry</h4>
                            <p className="text-[10px] text-gray-400">Ventaja Operativa</p>
                        </div>
                    </div>
                    <div className="bg-white border border-gray-100 p-4 rounded-xl flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                             <Icon icon="solar:wifi-bold-duotone" />
                        </div>
                        <div>
                            <h4 className="font-bold text-xs text-gunmetal">Sincro Digital</h4>
                            <p className="text-[10px] text-gray-400">Genie+ Requerido</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function LandsContent() {
    const lands = [
        { name: "Main Street U.S.A.", desc: "Nostalgia victoriana y compras.", icon: "solar:shop-bold-duotone" },
        { name: "Adventureland", desc: "Selvas exóticas y piratas.", icon: "solar:compass-bold-duotone" },
        { name: "Frontierland", desc: "El lejano oeste y montañas.", icon: "solar:mountains-bold-duotone" },
        { name: "Liberty Square", desc: "Historia colonial y fantasmas.", icon: "solar:bell-bold-duotone" },
        { name: "Fantasyland", desc: "El corazón de los cuentos.", icon: "solar:castle-bold-duotone" },
        { name: "Tomorrowland", desc: "Futuro, neón y velocidad.", icon: "solar:rocket-bold-duotone" },
    ];
    return (
        <div className="space-y-4">
             <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-gunmetal">6 Reinos Inmersivos</h3>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {lands.map((land, i) => (
                    <div key={i} className="p-4 border border-gray-100 rounded-xl hover:border-sunset/50 hover:bg-gray-50 transition-all cursor-pointer group">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-sm text-gunmetal group-hover:text-sunset transition-colors">{land.name}</h4>
                            <Icon icon={land.icon} className="text-gray-300 group-hover:text-sunset" />
                        </div>
                        <p className="text-[11px] text-gray-500 leading-tight">{land.desc}</p>
                    </div>
                ))}
             </div>
        </div>
    )
}

function BucketListContent() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2">Must Do - Atracciones</h4>
                <ul className="space-y-3">
                    {['TRON Lightcycle / Run', 'Seven Dwarfs Mine Train', 'Space Mountain', 'Haunted Mansion', 'Pirates of the Caribbean'].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-medium text-gunmetal">
                            <span className="text-sunset font-mono text-xs font-bold">0{i+1}</span>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2">Must Eat - Snacks</h4>
                <ul className="space-y-3">
                    {['Dole Whip (Adventureland)', 'Cheeseburger Spring Rolls', 'Corn Dog Nuggets', 'Warm Cinnamon Roll'].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-medium text-gunmetal">
                            <Icon icon="solar:star-bold" className="w-3 h-3 text-emerald-400" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

function DirectoryItem({ icon, label }: { icon: string, label: string }) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 cursor-pointer group">
            <Icon icon={icon} className="w-8 h-8 text-gunmetal/30 group-hover:text-sunset transition-colors duration-300" />
            <span className="text-[9px] font-bold text-gunmetal/50 uppercase tracking-widest group-hover:text-gunmetal transition-colors font-mono">{label}</span>
        </div>
    )
}