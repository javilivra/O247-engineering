"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@/components/Icon';

interface TabOption { id: string; label: string; icon: string; }
interface StepData {
  stepNumber: number; title: string; subtitle: string; icon: string;
  accent: string; image: string; tag: string; intro: string;
  content: React.ReactNode; linkHref: string; linkText: string;
}

function DatoClave({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-2xl mt-4"
      style={{ background: 'rgba(255,112,67,0.12)', border: '1px solid rgba(255,112,67,0.25)' }}>
      <Icon icon="solar:fire-bold-duotone" width={15} className="text-sunset shrink-0 mt-0.5" />
      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, fontFamily: 'monospace' }}>{text}</p>
    </div>
  );
}

function ToggleTabs({ options, active, onChange, accent }: {
  options: TabOption[]; active: string; onChange: (id: string) => void; accent: string;
}) {
  return (
    <div className="flex gap-1.5 p-1 rounded-xl mb-5"
      style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}>
      {options.map(opt => (
        <button key={opt.id} onClick={() => onChange(opt.id)}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg transition-all duration-300"
          style={{
            background: active === opt.id ? accent : 'transparent',
            fontSize: '10px', fontWeight: 800, fontFamily: 'monospace',
            letterSpacing: '0.08em', textTransform: 'uppercase' as const,
            color: active === opt.id ? 'white' : 'rgba(255,255,255,0.4)',
            boxShadow: active === opt.id ? `0 2px 12px ${accent}50` : 'none',
          }}>
          <Icon icon={opt.icon} width={12} />
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function LlegadaContent({ accent }: { accent: string }) {
  const [tab, setTab] = useState('mco');
  const data: Record<string, { text: string; dato: string }> = {
    mco: { text: 'MCO (Orlando International) es el aeropuerto principal. A 25 min de Disney y 20 min de Universal. Vuelos directos desde Buenos Aires, México y Miami. Uber desde MCO: aprox. $35–50.', dato: 'Terminal B para Uber/Lyft — evitás la fila larga de la Terminal A.' },
    sfb: { text: 'SFB (Sanford) es el aeropuerto alternativo de low-cost. Frontier y otras operan acá. Está a 45 min de Disney. Vale si el vuelo ahorra considerablemente.', dato: 'Uber SFB → Disney: $60–80. Calculá si el ahorro en vuelo supera el transporte extra.' },
    miami: { text: 'Llegás a Miami primero: auto por la I-4 (4hs) o tren Brightline hasta MCO. Cómodo y directo, sin transbordo.', dato: 'Brightline Miami → MCO desde $79, ~3.5hs. Salidas cada 2 horas. Equipaje incluido.' },
  };
  return (
    <div>
      <ToggleTabs accent={accent} active={tab} onChange={setTab} options={[
        { id: 'mco', label: 'MCO directo', icon: 'solar:plane-bold-duotone' },
        { id: 'sfb', label: 'SFB low-cost', icon: 'solar:plane-2-bold-duotone' },
        { id: 'miami', label: 'Desde Miami', icon: 'solar:map-point-wave-bold-duotone' },
      ]} />
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.82)', lineHeight: 1.8 }}>{data[tab].text}</p>
          <DatoClave text={data[tab].dato} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function CuandoViajarContent({ accent }: { accent: string }) {
  const [tab, setTab] = useState('bajo');
  const data: Record<string, { text: string; dato: string }> = {
    bajo: { text: 'Segunda quincena de enero, primera quincena de mayo y septiembre son los momentos más tranquilos. Filas cortas y ambiente relajado en todos los parques.', dato: 'Enero post-festivo = el momento más tranquilo de Disney. Magic Kingdom con menos de 30 min en casi todo.' },
    precio: { text: 'Septiembre es el mes más económico en vuelos, hoteles y tickets. Temporada de huracanes, pero el riesgo real en Orlando es bajo — llueve rápido y escampa.', dato: 'Reservar con 90–120 días garantiza los mejores precios. Desde Argentina: buscar 4 meses antes.' },
    clima: { text: 'Noviembre–Abril: temporada seca (20–27°C), ideal. Mayo–Agosto: calor extremo con lluvias vespertinas breves. Diciembre–enero puede sorprender con frío nocturno.', dato: 'En verano los parques acuáticos son obligatorios. Poncho liviano de octubre a mayo.' },
  };
  return (
    <div>
      <ToggleTabs accent={accent} active={tab} onChange={setTab} options={[
        { id: 'bajo', label: 'Menos gente', icon: 'solar:users-group-rounded-bold-duotone' },
        { id: 'precio', label: 'Mejor precio', icon: 'solar:dollar-minimalistic-bold-duotone' },
        { id: 'clima', label: 'Clima ideal', icon: 'solar:sun-bold-duotone' },
      ]} />
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.82)', lineHeight: 1.8 }}>{data[tab].text}</p>
          <DatoClave text={data[tab].dato} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function DondeDormirContent({ accent }: { accent: string }) {
  const [tab, setTab] = useState('resort');
  const data: Record<string, { text: string; dato: string }> = {
    resort: { text: 'Hoteles oficiales de Disney o Universal dan transporte gratuito, Early Entry (30–60 min antes) e inmersión total en la experiencia temática. Más caro, pero la diferencia se siente.', dato: 'Early Entry: hacés Rise of the Resistance o Tron antes de que las filas exploten.' },
    fuera: { text: 'I-Drive, Kissimmee o Lake Buena Vista ofrecen hoteles y suites a mejor precio. Ideal con auto alquilado. Cocina, pileta y desayuno incluido en muchas opciones.', dato: 'I-Drive: hoteles desde $80/noche con pileta. Uber a Disney: $15–25 por viaje.' },
    airbnb: { text: 'Casas vacacionales en Kissimmee o Davenport: perfectas para grupos y familias. Pileta privada, cocina completa y más espacio por el mismo precio de un hotel.', dato: 'Zonas top: Reunion Resort, Windsor Hills, ChampionsGate. A 20–30 min de Disney por la I-4.' },
  };
  return (
    <div>
      <ToggleTabs accent={accent} active={tab} onChange={setTab} options={[
        { id: 'resort', label: 'En resort', icon: 'solar:buildings-bold-duotone' },
        { id: 'fuera', label: 'Fuera', icon: 'solar:home-2-bold-duotone' },
        { id: 'airbnb', label: 'Casa vacac.', icon: 'solar:key-bold-duotone' },
      ]} />
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.82)', lineHeight: 1.8 }}>{data[tab].text}</p>
          <DatoClave text={data[tab].dato} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ComoMoverteContent({ accent }: { accent: string }) {
  const [tab, setTab] = useState('auto');
  const data: Record<string, { text: string; dato: string }> = {
    auto: { text: 'Auto alquilado = libertad total. Outlets, restaurantes, playas (Cocoa Beach a 1hs). Estacionamiento Disney/Universal: $30/día. Waze funciona perfecto en Orlando.', dato: 'Los peajes son automáticos (SunPass). El alquiler los cobra después. Guardá las boletas.' },
    uber: { text: 'Uber y Lyft abundan en toda la ciudad. Transporte interno Disney es gratuito entre resorts y parques. El Skyliner conecta EPCOT, Hollywood Studios y varios hoteles.', dato: 'Skyliner = góndola aérea gratuita. Vista única del resort sin espera en horas pico.' },
    resort: { text: 'En hotel oficial: el sistema de Disney y Universal es eficiente y gratuito. Para salir del resort (outlets, restaurantes, playas), Uber es la opción más práctica.', dato: 'Monoriel Disney: conecta Magic Kingdom, EPCOT y hoteles en minutos. Gratis para huéspedes.' },
  };
  return (
    <div>
      <ToggleTabs accent={accent} active={tab} onChange={setTab} options={[
        { id: 'auto', label: 'Auto', icon: 'solar:steering-wheel-bold-duotone' },
        { id: 'uber', label: 'Uber / Lyft', icon: 'solar:smartphone-bold-duotone' },
        { id: 'resort', label: 'Transporte resort', icon: 'solar:bus-bold-duotone' },
      ]} />
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.82)', lineHeight: 1.8 }}>{data[tab].text}</p>
          <DatoClave text={data[tab].dato} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function EntenderEntradasContent({ accent }: { accent: string }) {
  const [tab, setTab] = useState('disney');
  const data: Record<string, { text: string; dato: string }> = {
    disney: { text: 'Disney vende tickets por fecha con precios variables. Park Hopper: varios parques por día desde las 2 PM. Genie+ ($30/día) para filas moderadas. Lightning Lane para Rise, Tron y Guardians.', dato: 'Comprá en el sitio oficial con fecha fija. Hasta 12% más barato que en la puerta.' },
    universal: { text: 'Universal: tickets de 1 a 5 días. Express Pass ($80–200) saltea filas en todo. Hoteles Premier: Express Pass ilimitado incluido. Park-to-Park obligatorio para el Hogwarts Express.', dato: 'Epic Universe abrió mayo 2025. Reservá 1 día extra — no está en tickets anteriores.' },
    combo: { text: 'Disney + Universal requiere mínimo 7–8 días. Ideal: 4 días Disney, 3 días Universal con Epic Universe. Comprá por separado — combos oficiales entre resorts no existen.', dato: 'Definí cuántos días tenés primero. Cada día vale mucho — no conviene apurar ninguno.' },
  };
  return (
    <div>
      <ToggleTabs accent={accent} active={tab} onChange={setTab} options={[
        { id: 'disney', label: 'Disney', icon: 'solar:star-bold-duotone' },
        { id: 'universal', label: 'Universal', icon: 'solar:planet-bold-duotone' },
        { id: 'combo', label: 'Ambos', icon: 'solar:ticket-bold-duotone' },
      ]} />
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.82)', lineHeight: 1.8 }}>{data[tab].text}</p>
          <DatoClave text={data[tab].dato} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ExtrasContent() {
  const items = [
    { icon: 'solar:shop-bold-duotone', label: 'Premium Outlets', desc: '2 outlets de clase mundial. Marcas de lujo con 25–65% off. Mínimo una tarde.' },
    { icon: 'solar:confetti-bold-duotone', label: 'Disney Springs', desc: 'Zona gastronómica de Disney. Entrada gratuita. Restaurantes de chefs reconocidos.' },
    { icon: 'solar:map-bold-duotone', label: 'CityWalk Universal', desc: 'Entretenimiento Universal. Bares y shows. Solo pagás estacionamiento.' },
    { icon: 'solar:sun-bold-duotone', label: 'Cocoa Beach', desc: '1hs al este. Playa del Atlántico. Ideal para un día de descanso.' },
    { icon: 'solar:swimming-bold-duotone', label: 'Clearwater Beach', desc: '1.5hs al oeste. Una de las mejores playas de EE.UU. Agua cristalina.' },
  ];
  return (
    <div className="grid grid-cols-1 gap-2.5">
      {items.map(item => (
        <div key={item.label} className="flex items-start gap-3 p-4 rounded-xl"
          style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
          <Icon icon={item.icon} width={18} className="text-sunset shrink-0 mt-0.5" />
          <div>
            <p style={{ fontSize: '11px', fontWeight: 800, fontFamily: 'monospace', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', marginBottom: '3px' }}>{item.label}</p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
function StepProgressBar({ steps, activeStep, onStepClick }: {
  steps: StepData[]; activeStep: number; onStepClick: (n: number) => void;
}) {
  const progress = ((activeStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full">
      {/* Barra de progreso */}
      <div className="relative w-full rounded-full mb-4" style={{ height: '2px', background: 'rgba(255,255,255,0.1)' }}>
        <motion.div className="absolute left-0 top-0 h-full rounded-full"
          style={{ background: 'linear-gradient(to right, #FF7043, #00B4D8)' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Chips de pasos */}
      <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
        {steps.map((step) => {
          const isActive = step.stepNumber === activeStep;
          const isPast = step.stepNumber < activeStep;
          return (
            <button key={step.stepNumber} onClick={() => onStepClick(step.stepNumber)}
              className="flex flex-col items-center gap-1.5 py-2.5 rounded-xl transition-all duration-300"
              style={{
                background: isActive ? `${step.accent}20` : 'rgba(255,255,255,0.05)',
                border: `1px solid ${isActive ? step.accent + '50' : 'rgba(255,255,255,0.08)'}`,
                boxShadow: isActive ? `0 0 16px ${step.accent}25` : 'none',
              }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: isActive ? step.accent : isPast ? 'rgba(255,112,67,0.25)' : 'rgba(255,255,255,0.08)',
                  boxShadow: isActive ? `0 0 12px ${step.accent}60` : 'none',
                }}>
                {isPast && !isActive
                  ? <Icon icon="solar:check-circle-bold" width={13} className="text-sunset" />
                  : <span style={{ fontSize: '9px', fontWeight: 900, fontFamily: 'monospace', color: isActive ? 'white' : 'rgba(255,255,255,0.3)' }}>{step.stepNumber}</span>
                }
              </div>
              <span style={{
                fontFamily: 'monospace', fontSize: '6px', fontWeight: isActive ? 800 : 600,
                letterSpacing: '0.05em', textTransform: 'uppercase' as const,
                color: isActive ? step.accent : isPast ? 'rgba(255,112,67,0.5)' : 'rgba(255,255,255,0.2)',
                lineHeight: 1.3, textAlign: 'center' as const,
              }}>
                {step.subtitle}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── PÁGINA PRINCIPAL ─────────────────────────────────────────────────────────
export default function OrlandoGuidePage() {
  const [activeStep, setActiveStep] = useState(1);

  const STEPS: StepData[] = [
    { stepNumber: 1, title: 'Llegar a Orlando', subtitle: 'Llegada', icon: 'solar:plane-bold-duotone', accent: '#00B4D8', tag: 'PASO 01', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1800&auto=format&fit=crop', intro: 'Dos aeropuertos, el tren Brightline desde Miami y múltiples opciones. Entender cómo llegás define la primera parte del viaje.', content: <LlegadaContent accent="#00B4D8" />, linkHref: '/orlando/llegada', linkText: 'Guía completa de llegada' },
    { stepNumber: 2, title: 'Cuándo conviene viajar', subtitle: 'Temporadas', icon: 'solar:calendar-bold-duotone', accent: '#FF7043', tag: 'PASO 02', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1800&auto=format&fit=crop', intro: 'Orlando funciona muy diferente según el mes. La temporada que elegís define las filas, los precios y el clima.', content: <CuandoViajarContent accent="#FF7043" />, linkHref: '/orlando/cuando-viajar', linkText: 'Ver calendario de temporadas' },
    { stepNumber: 3, title: 'Dónde dormir', subtitle: 'Alojamiento', icon: 'solar:buildings-bold-duotone', accent: '#9B5DE5', tag: 'PASO 03', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1800&auto=format&fit=crop', intro: 'El alojamiento define la estrategia de todo el viaje. Dentro o fuera del resort — cada opción tiene su lógica.', content: <DondeDormirContent accent="#9B5DE5" />, linkHref: '/orlando/donde-dormir', linkText: 'Explorar alojamiento' },
    { stepNumber: 4, title: 'Cómo moverte', subtitle: 'Movilidad', icon: 'solar:steering-wheel-bold-duotone', accent: '#F59E0B', tag: 'PASO 04', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1800&auto=format&fit=crop', intro: 'Orlando es una ciudad diseñada para el auto. Pero dentro del resort, el transporte interno puede ser suficiente.', content: <ComoMoverteContent accent="#F59E0B" />, linkHref: '/orlando/movilidad', linkText: 'Guía de transporte' },
    { stepNumber: 5, title: 'Entender las entradas', subtitle: 'Tickets', icon: 'solar:ticket-bold-duotone', accent: '#10B981', tag: 'PASO 05', image: 'https://images.unsplash.com/photo-1640957893706-1f81d9c2498f?q=80&w=1800&auto=format&fit=crop', intro: 'El sistema de tickets de Disney y Universal es más complejo de lo que parece. Entenderlo ahorra dinero y frustraciones.', content: <EntenderEntradasContent accent="#10B981" />, linkHref: '/orlando/tickets', linkText: 'Guía de tickets' },
    { stepNumber: 6, title: 'Qué hacer además', subtitle: 'Extras', icon: 'solar:confetti-bold-duotone', accent: '#FF7043', tag: 'PASO 06', image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1800&auto=format&fit=crop', intro: 'Orlando tiene mucho más allá de los parques. Outlets de lujo, playas, gastronomía de nivel y entretenimiento gratuito.', content: <ExtrasContent />, linkHref: '/orlando/experiencias', linkText: 'Ver todas las experiencias' },
  ];

  const currentStep = STEPS.find(s => s.stepNumber === activeStep)!;

  return (
    <div style={{ background: '#25343F', minHeight: '100vh' }}>

      {/* ── HERO FULL-WIDTH CON IMAGEN ── */}
      <div className="relative w-full overflow-hidden" style={{ minHeight: '100vh' }}>

        {/* Imagen de fondo que cambia con el paso */}
        <AnimatePresence mode="wait">
          <motion.div key={`img-${activeStep}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0">
            <Image src={currentStep.image} alt={currentStep.title} fill className="object-cover" unoptimized priority />
            {/* Gradiente oscuro para legibilidad */}
            <div className="absolute inset-0" style={{
              background: `linear-gradient(
                to bottom,
                rgba(37,52,63,0.55) 0%,
                rgba(37,52,63,0.3) 30%,
                rgba(37,52,63,0.65) 60%,
                rgba(37,52,63,0.95) 100%
              )`
            }} />
            {/* Gradiente de color del paso activo — sutil en los bordes */}
            <div className="absolute inset-0" style={{
              background: `radial-gradient(ellipse at 80% 20%, ${currentStep.accent}15 0%, transparent 60%)`
            }} />
          </motion.div>
        </AnimatePresence>

        {/* CONTENIDO SOBRE LA IMAGEN */}
        <div className="relative z-10 flex flex-col min-h-screen">

          {/* ── HEADER + PROGRESS (top) ── */}
          <div className="pt-28 md:pt-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">

            {/* Eyebrow */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="flex items-center gap-2.5 mb-6">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#FF7043', boxShadow: '0 0 8px #FF7043' }} />
              <span style={{ fontFamily: 'monospace', fontSize: '9px', fontWeight: 900, letterSpacing: '0.3em', color: '#FF7043', textTransform: 'uppercase' }}>
                Guía de Inicio — Orlando
              </span>
            </motion.div>

            {/* Título de la página */}
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}
              style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 900, color: 'white', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '32px' }}>
              Orlando en{' '}
              <span style={{ color: '#FF7043' }}>6 pasos</span>{' '}
              <span style={{ color: 'rgba(255,255,255,0.22)' }}>claros</span>
            </motion.h1>

            {/* PROGRESS BAR */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="p-4 rounded-2xl mb-0"
              style={{ background: 'rgba(37,52,63,0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <StepProgressBar steps={STEPS} activeStep={activeStep} onStepClick={setActiveStep} />
            </motion.div>
          </div>

          {/* ── SPACER ── */}
          <div className="flex-1" />

          {/* ── CONTENIDO DEL PASO (bottom, sobre la imagen) ── */}
          <div className="px-6 md:px-12 lg:px-20 pb-10 max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">

              {/* Columna izquierda: título del paso */}
              <AnimatePresence mode="wait">
                <motion.div key={`title-${activeStep}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>

                  {/* Tag del paso */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{ background: currentStep.accent, boxShadow: `0 4px 20px ${currentStep.accent}60` }}>
                      <Icon icon={currentStep.icon} width={16} className="text-white" />
                    </div>
                    <span style={{ fontFamily: 'monospace', fontSize: '9px', fontWeight: 900, letterSpacing: '0.2em', color: currentStep.accent, textTransform: 'uppercase' }}>
                      {currentStep.tag} — {currentStep.subtitle}
                    </span>
                  </div>

                  {/* Título grande del paso */}
                  <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 900, color: 'white', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '16px' }}>
                    {currentStep.title}
                  </h2>

                  {/* Intro */}
                  <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.75, maxWidth: '420px', borderLeft: `2px solid ${currentStep.accent}60`, paddingLeft: '12px' }}>
                    {currentStep.intro}
                  </p>

                  {/* Nav buttons */}
                  <div className="flex gap-3 mt-8">
                    <button onClick={() => setActiveStep(p => Math.max(1, p - 1))} disabled={activeStep === 1}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300"
                      style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', opacity: activeStep === 1 ? 0.3 : 1 }}>
                      <Icon icon="solar:arrow-left-bold" width={14} className="text-white/60" />
                      <span style={{ fontFamily: 'monospace', fontSize: '10px', fontWeight: 800, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>Anterior</span>
                    </button>
                    <button onClick={() => setActiveStep(p => Math.min(STEPS.length, p + 1))} disabled={activeStep === STEPS.length}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                      style={{ background: currentStep.accent, opacity: activeStep === STEPS.length ? 0.3 : 1, boxShadow: `0 4px 20px ${currentStep.accent}40` }}>
                      <span style={{ fontFamily: 'monospace', fontSize: '10px', fontWeight: 800, letterSpacing: '0.1em', color: 'white', textTransform: 'uppercase' }}>
                        {activeStep === STEPS.length ? 'Completado' : 'Siguiente'}
                      </span>
                      {activeStep < STEPS.length && <Icon icon="solar:arrow-right-bold" width={14} className="text-white" />}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Columna derecha: contenido dinámico del paso */}
              <AnimatePresence mode="wait">
                <motion.div key={`content-${activeStep}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-3xl p-6"
                  style={{ background: 'rgba(37,52,63,0.75)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)' }}>

                  {currentStep.content}

                  {/* CTA */}
                  <Link href={currentStep.linkHref}
                    className="flex items-center justify-between w-full mt-5 px-4 py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                    style={{ background: `${currentStep.accent}15`, border: `1px solid ${currentStep.accent}30` }}>
                    <span style={{ fontSize: '10px', fontWeight: 800, fontFamily: 'monospace', letterSpacing: '0.12em', textTransform: 'uppercase', color: currentStep.accent }}>
                      {currentStep.linkText}
                    </span>
                    <span style={{ color: currentStep.accent, display: "inline-flex" }}><Icon icon="solar:arrow-right-bold" width={13} /></span>
                  </Link>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER CTA ── */}
      <div className="px-6 md:px-12 lg:px-20 py-16 max-w-7xl mx-auto">
        <div className="p-8 rounded-3xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-2 mb-3">
            <Icon icon="solar:rocket-bold-duotone" width={20} className="text-sunset" />
            <span style={{ fontFamily: 'monospace', fontSize: '9px', fontWeight: 900, letterSpacing: '0.25em', color: '#FF7043', textTransform: 'uppercase' }}>
              ¿Listo para planificar?
            </span>
          </div>
          <h3 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 900, color: 'white', marginBottom: '20px', letterSpacing: '-0.02em' }}>
            Explorá los parques en detalle
          </h3>
          <div className="flex gap-4 flex-wrap">
            <Link href="/disney" className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: '#00B4D8', color: 'white', fontSize: '12px', fontWeight: 800, fontFamily: 'monospace', letterSpacing: '0.08em', textTransform: 'uppercase', boxShadow: '0 4px 20px rgba(0,180,216,0.4)' }}>
              <Icon icon="solar:star-bold-duotone" width={15} />
              Disney World
            </Link>
            <Link href="/universal" className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'white', fontSize: '12px', fontWeight: 800, fontFamily: 'monospace', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              <Icon icon="solar:planet-bold-duotone" width={15} />
              Universal Orlando
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
