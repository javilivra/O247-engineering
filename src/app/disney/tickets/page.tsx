"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// --- DATA: MATRIZ DE TICKETS ---
const TICKET_TYPES = [
  {
    id: "base",
    title: "Ticket Base",
    label: "FUNDAMENTAL",
    desc: "1 Parque Principal por día. Bloqueado al primer parque que eliges. Ideal para logística simple.",
    features: ["4 Parques Principales", "Reingreso al mismo parque"],
    missing: ["No Park Hopping", "No Parques de Agua"],
    color: "text-gunmetal",
    bg: "bg-white",
    border: "border-gunmetal/10"
  },
  {
    id: "hopper",
    title: "Park Hopper",
    label: "AGILIDAD",
    desc: "Visita múltiples parques el mismo día. Desayuna en MK, cena en Epcot. Vital para viajes cortos.",
    features: ["Todo lo del Base", "Cambio de parque ilimitado"],
    missing: ["No Parques de Agua"],
    color: "text-sunset",
    bg: "bg-bone",
    border: "border-sunset/30"
  },
  {
    id: "water",
    title: "Water & Sports",
    label: "ACCIÓN",
    desc: "Ticket Base + Visitas a Parques de Agua y Golf. Cantidad de visitas extra = Días de ticket.",
    features: ["Ticket Base", "Typhoon/Blizzard Beach", "Golf / Minigolf"],
    missing: ["No Park Hopping"],
    color: "text-celeste",
    bg: "bg-bone",
    border: "border-celeste/30"
  },
  {
    id: "plus",
    title: "Park Hopper Plus",
    label: "ULTIMATE",
    desc: "El 'All-Access'. Combina la libertad del Hopper con las visitas extra y extiende tu vigencia +1 día.",
    features: ["Park Hopping Ilimitado", "Parques de Agua & Deportes", "+1 Día de Vigencia Extra"],
    missing: [],
    color: "text-emerald-600",
    bg: "bg-emerald-50/50",
    border: "border-emerald-200"
  }
];

// --- LÓGICA DE CALENDARIO Y VIGENCIA ---
const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const YEARS = [2026, 2027];

// Lógica oficial de vigencia Disney (Días comprados -> Ventana de uso)
const calculateValidity = (ticketDays: number, isPlus: boolean) => {
  let window = ticketDays;
  if (ticketDays === 1) window = 1;
  else if (ticketDays <= 3) window = ticketDays + 2;
  else if (ticketDays <= 7) window = ticketDays + 3;
  else window = ticketDays + 4;
  
  if (isPlus) window += 1;
  return window;
};

// Generador de días del mes
const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

export default function DisneyTicketsPage() {
  // Estados del Configurador
  const [ticketDays, setTicketDays] = useState(4);
  const [isPlusMode, setIsPlusMode] = useState(false);
  
  // Estados del Calendario
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMonth, setViewMonth] = useState(0); // Enero = 0
  const [viewYear, setViewYear] = useState(2026);

  // Cálculos derivados
  const validityLength = calculateValidity(ticketDays, isPlusMode);
  
  // Rango de Fechas (Start -> End)
  const endDate = selectedDate ? new Date(selectedDate) : null;
  if (endDate) endDate.setDate(selectedDate!.getDate() + validityLength - 1);

  // Navegación Calendario
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else { setViewMonth(viewMonth + 1); }
  };
  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else { setViewMonth(viewMonth - 1); }
  };

  // Renderizado de Días
  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(viewMonth, viewYear);
    const startDay = getFirstDayOfMonth(viewMonth, viewYear);
    const days = [];

    // Espacios vacíos
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10" />);
    }

    // Días reales
    for (let d = 1; d <= daysInMonth; d++) {
      const currentDate = new Date(viewYear, viewMonth, d);
      const isSelected = selectedDate && currentDate.getTime() === selectedDate.getTime();
      
      // Lógica de Rango (Ventana de Vigencia)
      let isInRange = false;
      let isEnd = false;
      
      if (selectedDate && endDate) {
        if (currentDate > selectedDate && currentDate < endDate) isInRange = true;
        if (currentDate.getTime() === endDate.getTime()) isEnd = true;
      }

      days.push(
        <motion.button
          key={d}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSelectedDate(new Date(viewYear, viewMonth, d))}
          className={`
            h-10 w-10 text-xs font-mono font-bold rounded-full flex items-center justify-center relative z-10 transition-colors
            ${isSelected ? 'bg-sunset text-gunmetal shadow-glow' : ''}
            ${isInRange ? 'bg-celeste/20 text-gunmetal' : ''}
            ${isEnd ? 'bg-celeste text-white shadow-md' : ''}
            ${!isSelected && !isInRange && !isEnd ? 'text-gunmetal/60 hover:bg-gunmetal/5' : ''}
          `}
        >
          {d}
          {/* Conector visual para el rango */}
          {isInRange && <div className="absolute inset-y-0 left-[-50%] right-[-50%] bg-celeste/20 -z-10" />}
          {isSelected && endDate && <div className="absolute inset-y-0 right-[-50%] left-1/2 bg-celeste/20 -z-10" />}
          {isEnd && <div className="absolute inset-y-0 left-[-50%] right-1/2 bg-celeste/20 -z-10" />}
        </motion.button>
      );
    }
    return days;
  };

  return (
    <main className="bg-bone min-h-screen font-sans selection:bg-sunset selection:text-white">
      <Navbar />

      {/* --- HERO: MANIFIESTO ESTRATÉGICO --- */}
      <section className="pt-40 pb-24 px-6 border-b border-gunmetal/5 bg-white relative overflow-hidden">
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-celeste/5 rounded-full blur-[120px] pointer-events-none" 
        />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gunmetal/5 border border-gunmetal/10 mb-8 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-sunset animate-pulse shadow-[0_0_8px_#FF7043]"></span>
                <span className="type-tech text-[10px] text-gunmetal uppercase tracking-widest font-bold">
                  Ingeniería de Acceso v3.2
                </span>
            </div>
            <h1 className="type-display text-5xl md:text-7xl text-gunmetal mb-8 leading-[0.9] tracking-tight">
                No compres acceso.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset to-celeste animate-gradient-x">
                Compra estrategia.
                </span>
            </h1>
            <p className="type-body text-xl text-gunmetal/60 max-w-2xl mx-auto leading-relaxed">
                El error #1 es ignorar la ventana de vigencia. Usa nuestras herramientas para sincronizar tus tickets con tu itinerario real.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- NIVEL 1: MATRIZ DE DECISIÓN (GRID 2x2) --- */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
                <div>
                    <h2 className="type-display text-3xl text-gunmetal mb-2">Arquitectura de Tickets</h2>
                    <p className="type-body text-sm text-gunmetal/60">Selecciona el nivel de flexibilidad que requiere tu grupo.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {TICKET_TYPES.map((ticket, idx) => (
                    <motion.div 
                        key={ticket.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -5, boxShadow: "0px 10px 30px rgba(37, 52, 63, 0.08)" }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className={`p-10 rounded-[32px] border transition-all duration-300 group relative overflow-hidden ${ticket.bg} ${ticket.border}`}
                    >
                        <div className="flex justify-between items-start mb-6">
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-current ${ticket.color} bg-white/50 backdrop-blur-sm`}>
                                {ticket.label}
                            </span>
                            <div className={`p-3 rounded-2xl bg-white/80 ${ticket.color} shadow-sm group-hover:scale-110 transition-transform`}>
                                <Icon icon="solar:ticket-star-bold-duotone" className="w-6 h-6" />
                            </div>
                        </div>

                        <h3 className="type-display text-3xl text-gunmetal mb-3">{ticket.title}</h3>
                        <p className="type-body text-sm text-gunmetal/70 mb-10 min-h-[40px]">
                            {ticket.desc}
                        </p>

                        <div className="space-y-4">
                            {ticket.features.map((feat, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm font-medium text-gunmetal group-hover:translate-x-1 transition-transform" style={{transitionDelay: `${i * 50}ms`}}>
                                    <Icon icon="solar:check-circle-bold" className={`w-5 h-5 shrink-0 ${ticket.color}`} />
                                    {feat}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* --- NIVEL 2: SIMULADOR DE TIEMPO (CALENDARIO TÁCTICO) --- */}
      <section className="py-24 px-6 bg-white border-t border-gunmetal/5">
        <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-16">
                <span className="type-tech text-[10px] text-celeste uppercase tracking-widest block mb-2">Simulación Temporal</span>
                <h2 className="type-display text-4xl text-gunmetal">Calculadora de Ventana de Uso</h2>
                <p className="type-body text-base text-gunmetal/60 mt-4 max-w-xl mx-auto">
                    Los tickets tienen fecha de caducidad. Simula tu viaje real para ver exactamente hasta cuándo puedes usar tus entradas.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* 1. PANEL DE CONTROL (IZQUIERDA) */}
                <div className="lg:col-span-4 space-y-8 bg-bone p-8 rounded-[32px] border border-gunmetal/10 h-full">
                    
                    {/* Slider Días */}
                    <div>
                        <div className="flex justify-between mb-4 items-center">
                            <label className="text-xs font-bold text-gunmetal uppercase tracking-wide">Días de Parque</label>
                            <span className="text-4xl font-black text-gunmetal font-display">{ticketDays}</span>
                        </div>
                        <input 
                            type="range" min="1" max="10" value={ticketDays} 
                            onChange={(e) => setTicketDays(parseInt(e.target.value))}
                            className="w-full h-2 bg-gunmetal/10 rounded-lg appearance-none cursor-pointer accent-sunset"
                        />
                        <div className="flex justify-between mt-2 text-[9px] text-gunmetal/40 font-mono">
                            <span>1 día</span>
                            <span>10 días</span>
                        </div>
                    </div>

                    {/* Toggle Plus */}
                    <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gunmetal/5 shadow-sm">
                        <div>
                            <span className="block text-sm font-bold text-gunmetal">Opción Plus</span>
                            <span className="text-[10px] text-gunmetal/50">+1 día vigencia</span>
                        </div>
                        <motion.button 
                            onClick={() => setIsPlusMode(!isPlusMode)}
                            className={`w-12 h-7 rounded-full p-1 flex items-center ${isPlusMode ? 'bg-celeste' : 'bg-gunmetal/20'}`}
                            whileTap={{ scale: 0.9 }}
                        >
                            <motion.div 
                                className="w-5 h-5 bg-white rounded-full shadow-md"
                                layout
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                style={{
                                    x: isPlusMode ? "100%" : "0%"
                                }}
                            />
                        </motion.button>
                    </div>

                    {/* Ventana de Vigencia */}
                    <div className="bg-white/50 p-6 rounded-2xl border border-gunmetal/5 text-center shadow-inner">
                        <span className="type-tech text-[10px] text-gunmetal/40 uppercase tracking-widest mb-1 block">Rango de Uso</span>
                        <div className="text-4xl font-black text-celeste font-display">
                            {validityLength} <span className="text-base font-bold text-gunmetal/30">días</span>
                        </div>
                        <p className="text-[10px] text-gunmetal/50 mt-2 leading-tight max-w-xs mx-auto">
                            Tienes {validityLength} días calendario para usar tus {ticketDays} visitas.
                        </p>
                    </div>

                </div>

                {/* 2. CALENDARIO TÁCTICO (DERECHA) */}
                <div className="lg:col-span-8 bg-white p-8 md:p-12 rounded-[32px] border border-gunmetal/10 relative shadow-sm min-h-[500px]">
                    <div className="absolute top-0 right-0 p-8">
                        <span className="type-tech text-[10px] text-gunmetal/30 bg-gunmetal/5 px-2 py-1 rounded">2026-2027</span>
                    </div>

                    {/* HEADER CALENDARIO */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <motion.button 
                                whileTap={{ scale: 0.9 }} 
                                onClick={prevMonth} 
                                className="w-10 h-10 rounded-full bg-bone hover:bg-gunmetal/5 flex items-center justify-center transition-colors"
                            >
                                <Icon icon="solar:arrow-left-linear" className="w-5 h-5 text-gunmetal" />
                            </motion.button>
                            <div>
                                <h3 className="text-2xl font-bold text-gunmetal font-display">{MONTHS[viewMonth]} {viewYear}</h3>
                                <p className="text-xs text-gunmetal/40">Selecciona tu día de llegada</p>
                            </div>
                            <motion.button 
                                whileTap={{ scale: 0.9 }} 
                                onClick={nextMonth} 
                                className="w-10 h-10 rounded-full bg-bone hover:bg-gunmetal/5 flex items-center justify-center transition-colors"
                            >
                                <Icon icon="solar:arrow-right-linear" className="w-5 h-5 text-gunmetal" />
                            </motion.button>
                        </div>
                    </div>

                    {/* GRID DÍAS SEMANA */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d, i) => (
                            <div key={i} className="text-center text-[10px] font-bold text-gunmetal/30 uppercase tracking-widest py-2">
                                {d}
                            </div>
                        ))}
                    </div>

                    {/* GRID DÍAS MES (RENDER DINÁMICO) */}
                    <div className="grid grid-cols-7 gap-2">
                        {renderCalendarDays()}
                    </div>

                    {/* LEYENDA TÉCNICA */}
                    <div className="flex items-center gap-6 mt-8 pt-6 border-t border-gunmetal/5 text-[10px] font-mono text-gunmetal/50">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-sunset"></span> Inicio (Llegada)
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-celeste/40"></span> Ventana Válida
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-celeste"></span> Vencimiento
                        </div>
                    </div>

                </div>

            </div>

        </div>
      </section>

      {/* --- NIVEL 3: GRÁFICO DE VALOR (SWEET SPOT) --- */}
      <section className="py-24 px-6 relative bg-gunmetal text-white overflow-hidden rounded-[40px] m-4 shadow-2xl">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sunset/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
         
         <div className="max-w-5xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
                <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 mb-6 text-sunset font-mono text-xs uppercase tracking-widest">
                        <Icon icon="solar:graph-up-bold" />
                        <span>Análisis de Costo Marginal</span>
                    </div>
                    <h3 className="type-display text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                        El "Sweet Spot" <br/> de los 5 Días
                    </h3>
                    <p className="text-white/70 text-lg leading-relaxed mb-10 font-light">
                        La ingeniería de precios de Disney castiga las visitas cortas. 
                        A partir del día 5, agregar un día más cuesta casi lo mismo que una hamburguesa.
                    </p>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-white text-gunmetal rounded-full font-bold text-xs uppercase tracking-widest hover:bg-sunset hover:text-white transition-colors shadow-lg"
                    >
                        Ver Precios Oficiales
                    </motion.button>
                </motion.div>
            </div>

            {/* GRÁFICO BARRAS CON FRAMER MOTION */}
            <div className="h-80 flex items-end justify-between gap-3 px-6 pb-0 border-b border-white/10 relative">
                {[100, 92, 80, 55, 22, 18, 15, 12, 10, 10].map((h, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.1, ease: "circOut" }}
                        className="w-full relative group flex flex-col justify-end h-full"
                    >
                        {/* Barra */}
                        <div 
                            className={`w-full rounded-t-sm transition-all duration-500 ${i === 4 ? 'bg-sunset shadow-[0_0_30px_rgba(255,112,67,0.6)]' : 'bg-white/10 group-hover:bg-white/30'}`}
                        />
                        {/* Etiqueta Eje X */}
                        <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/30">D{i+1}</span>
                        
                        {/* Tooltip Sweet Spot */}
                        {i === 4 && (
                            <motion.div 
                                initial={{ y: -20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1, type: "spring" }}
                                className="absolute -top-14 left-1/2 -translate-x-1/2 bg-white text-gunmetal text-[10px] font-bold px-4 py-2 rounded-lg whitespace-nowrap shadow-xl z-20"
                            >
                                SWEET SPOT
                                <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}