"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@/components/Icon';

interface StepData {
  stepNumber: number;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  image: string;
  content: React.ReactNode;
  linkHref: string;
  linkText: string;
}

function DatoClave({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl mt-3" style={{ background: 'rgba(0,180,216,0.07)', border: '1px solid rgba(0,180,216,0.15)' }}>
      <Icon icon={icon} width={16} className="text-celeste shrink-0 mt-0.5" />
      <p style={{ fontSize: '12px', color: 'rgba(37,52,63,0.7)', lineHeight: 1.6, fontFamily: 'monospace' }}>{text}</p>
    </div>
  );
}

function ToggleTabs({ options, active, onChange }: { options: { id: string; label: string; icon: string }[]; active: string; onChange: (id: string) => void }) {
  return (
    <div className="flex gap-2 p-1 rounded-xl mb-4" style={{ background: 'rgba(37,52,63,0.06)', border: '1px solid rgba(37,52,63,0.08)' }}>
      {options.map(opt => (
        <button key={opt.id} onClick={() => onChange(opt.id)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-300"
          style={{ background: active === opt.id ? 'white' : 'transparent', boxShadow: active === opt.id ? '0 2px 8px rgba(37,52,63,0.12)' : 'none', fontSize: '11px', fontWeight: 700, fontFamily: 'monospace', letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: active === opt.id ? '#25343F' : 'rgba(37,52,63,0.45)' }}>
          <Icon icon={opt.icon} width={13} />
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function LlegadaContent() {
  const [tab, setTab] = useState('directo');
  const data: Record<string, { text: string; dato: string }> = {
    directo: { text: 'Orlando tiene dos aeropuertos: MCO (Orlando International) y SFB (Sanford). MCO está mejor conectado con Disney y Universal. SFB suele tener vuelos más baratos con aerolíneas low-cost.', dato: 'MCO está a 25 min de Disney y 20 min de Universal. Uber desde MCO cuesta aprox. $30–45.' },
    miami: { text: 'Si llegás a Miami primero, podés llegar a Orlando en auto (4hs por la I-4) o con el tren Brightline, que conecta Miami con el aeropuerto MCO de forma cómoda y directa.', dato: 'Brightline Miami → MCO: ~3.5hs, desde $79. Salidas cada 2 horas. Incluye equipaje.' },
  };
  return (
    <div>
      <ToggleTabs active={tab} onChange={setTab} options={[{ id: 'directo', label: 'Vuelo directo', icon: 'solar:plane-bold-duotone' }, { id: 'miami', label: 'Desde Miami', icon: 'solar:map-point-wave-bold-duotone' }]} />
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
          <p style={{ fontSize: '13px', color: 'rgba(37,52,63,0.72)', lineHeight: 1.7 }}>{data[tab].text}</p>
          <DatoClave icon="solar:pin-bold-duotone" text={data[tab].dato} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function CuandoViajarContent() {
  const [tab, setTab] = useState('gente');
  const data: Record<string, { text: string; dato: string }> = {
    gente: { text: 'Para evitar multitudes, viajá en temporada baja: segunda quincena de enero, septiembre o primera quincena de mayo. Los parques tienen menos filas y mejor ambiente general.', dato: 'La segunda quincena de enero (post Año Nuevo) es el momento más tranquilo del año en Disney.' },
    presupuesto: { text: 'Septiembre es el mes más económico: vuelos, hoteles y tickets en mínimos históricos. La temporada de huracanes es baja pero el riesgo real es mínimo en Orlando.', dato: 'Reservar vuelos y hoteles con 90–120 días de anticipación puede significar un 25–40% de ahorro.' },
    clima: { text: 'Noviembre–Abril es la temporada seca y agradable (20–27°C). Mayo–Agosto tiene calor extremo y lluvias vespertinas. Diciembre–enero puede tener frío por la noche.', dato: 'Los parques acuáticos son obligatorios en verano. Llevá poncho liviano para lluvias de tarde.' },
  };
  return (
    <div>
      <ToggleTabs active={tab} onChange={setTab} options={[{ id: 'gente', label: 'Menos gente', icon: 'solar:users-group-rounded-bold-duotone' }, { id: 'presupuesto', label: 'Precio', icon: 'solar:dollar-minimalistic-bold-duotone' }, { id: 'clima', label: 'Clima', icon: 'solar:sun-bold-duotone' }]} />
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
          <p style={{ fontSize: '13px', color: 'rgba(37,52,63,0.72)', lineHeight: 1.7 }}>{data[tab].text}</p>
          <DatoClave icon="solar:calendar-bold-duotone" text={data[tab].dato} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function DondeDormirContent() {
  const [tab, setTab] = useState('dentro');
  const data: Record<string, { text: string; dato: string }> = {
    dentro: { text: 'Alojarse en hoteles oficiales de Disney o Universal te da transporte gratuito, entrada anticipada (Early Entry) y la magia de estar dentro del universo temático las 24 horas.', dato: 'Early Entry en Disney = 30 min antes de apertura. En Universal = 1 hora antes. Vale mucho.' },
    fuera: { text: 'Quedarte fuera (International Drive, Kissimmee, Lake Buena Vista) permite conseguir villas o suites a mejor precio. Ideal si alquilás auto y buscás flexibilidad.', dato: 'En I-Drive hay hoteles desde $80/noche con cocina y pileta. Uber al parque: $12–20.' },
    airbnb: { text: 'Las casas vacacionales en Kissimmee y Davenport son ideales para grupos grandes. Pileta privada, cocina equipada y más espacio por menos dinero que un hotel de resort.', dato: 'Zonas recomendadas: Reunion Resort, Champions Gate, Windsor Hills. A 20–30 min de Disney.' },
  };
  return (
    <div>
      <ToggleTabs active={tab} onChange={setTab} options={[{ id: 'dentro', label: 'En resort', icon: 'solar:buildings-bold-duotone' }, { id: 'fuera', label: 'Fuera', icon: 'solar:home-2-bold-duotone' }, { id: 'airbnb', label: 'Casa vacac.', icon: 'solar:key-bold-duotone' }]} />
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
          <p style={{ fontSize: '13px', color: 'rgba(37,52,63,0.72)', lineHeight: 1.7 }}>{data[tab].text}</p>
          <DatoClave icon="solar:star-bold-duotone" text={data[tab].dato} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ComoMoverteContent() {
  const [tab, setTab] = useState('auto');
  const data: Record<string, { text: string; dato: string }> = {
    auto: { text: 'Alquilar auto da máxima libertad: outlets, restaurantes fuera del resort, playas (Cocoa Beach a 1hs). El estacionamiento en Disney y Universal cuesta $30/día.', dato: 'Usá Waze para evitar peajes. El SunPass es automático — guardá las boletas del alquiler.' },
    uber: { text: 'Uber y Lyft son abundantes en Orlando. Desde MCO a Disney: $35–50. Dentro de Disney, el transporte interno es gratuito y conecta todos los resorts y parques.', dato: 'Disney Skyliner (góndola aérea gratuita) conecta EPCOT, Hollywood Studios y varios hoteles.' },
    transporte: { text: 'El transporte interno de Disney (buses, botes, monoriel, Skyliner) es gratuito y eficiente. Universal tiene shuttles gratuitos para huéspedes de sus hoteles oficiales.', dato: 'El monoriel de Disney conecta Magic Kingdom con EPCOT y hoteles Monorail en minutos.' },
  };
  return (
    <div>
      <ToggleTabs active={tab} onChange={setTab} options={[{ id: 'auto', label: 'Auto', icon: 'solar:steering-wheel-bold-duotone' }, { id: 'uber', label: 'Uber/Lyft', icon: 'solar:smartphone-bold-duotone' }, { id: 'transporte', label: 'Resort', icon: 'solar:bus-bold-duotone' }]} />
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
          <p style={{ fontSize: '13px', color: 'rgba(37,52,63,0.72)', lineHeight: 1.7 }}>{data[tab].text}</p>
          <DatoClave icon="solar:route-bold-duotone" text={data[tab].dato} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function EntenderEntradasContent() {
  const [tab, setTab] = useState('disney');
  const data: Record<string, { text: string; dato: string }> = {
    disney: { text: 'Disney vende tickets por fecha con precios variables. El Park Hopper permite visitar varios parques por día (después de las 2 PM). Genie+ ($30/día) saltea filas en atracciones moderadas.', dato: 'Lightning Lane Single Pass ($15–30) es obligatorio para Rise of the Resistance y Tron. Reservá el día.' },
    universal: { text: 'Universal tiene tickets de 1 a 5 días. El Express Pass ($80–200) saltea filas en todas las atracciones. Huéspedes de hoteles Premier tienen Express Pass incluido e ilimitado.', dato: 'El Park-to-Park ticket es obligatorio para usar el Hogwarts Express entre Diagon Alley y Hogsmeade.' },
    combo: { text: 'Los combos Disney + Universal requieren mínimo 7 días. Lo ideal es 4 días Disney, 2–3 días Universal. Epic Universe abrió en mayo 2025 — agregá un día extra para visitarlo.', dato: 'Comprá tickets por separado en los sitios oficiales — los combos oficiales Disney+Universal no existen.' },
  };
  return (
    <div>
      <ToggleTabs active={tab} onChange={setTab} options={[{ id: 'disney', label: 'Disney', icon: 'solar:star-bold-duotone' }, { id: 'universal', label: 'Universal', icon: 'solar:planet-bold-duotone' }, { id: 'combo', label: 'Ambos', icon: 'solar:ticket-bold-duotone' }]} />
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
          <p style={{ fontSize: '13px', color: 'rgba(37,52,63,0.72)', lineHeight: 1.7 }}>{data[tab].text}</p>
          <DatoClave icon="solar:dollar-minimalistic-bold-duotone" text={data[tab].dato} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ExtrasContent() {
  const items = [
    { icon: 'solar:shop-bold-duotone', label: 'Premium Outlets', desc: 'Orlando tiene 2 outlets de clase mundial. Marcas de lujo con 25–65% de descuento. Indispensable al menos una tarde.' },
    { icon: 'solar:confetti-bold-duotone', label: 'Disney Springs', desc: 'Zona comercial y gastronómica de Disney. Entrada gratuita sin tickets. Restaurantes de chefs reconocidos.' },
    { icon: 'solar:map-bold-duotone', label: 'CityWalk Universal', desc: 'El polo de entretenimiento de Universal. Bares, restaurantes y tiendas. Solo pagás estacionamiento.' },
    { icon: 'solar:sun-bold-duotone', label: 'Playas cercanas', desc: 'Cocoa Beach (1hs al este) y Clearwater (1.5hs al oeste). Ideal para días de descanso entre parques.' },
  ];
  return (
    <div className="flex flex-col gap-2">
      {items.map(item => (
        <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'rgba(37,52,63,0.04)', border: '1px solid rgba(37,52,63,0.06)' }}>
          <Icon icon={item.icon} width={18} className="text-sunset shrink-0 mt-0.5" />
          <div>
            <p style={{ fontSize: '11px', fontWeight: 800, fontFamily: 'monospace', letterSpacing: '0.08em', color: '#25343F', textTransform: 'uppercase', marginBottom: '2px' }}>{item.label}</p>
            <p style={{ fontSize: '12px', color: 'rgba(37,52,63,0.65)', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function GuideStep({ step, isActive, onClick }: { step: StepData; isActive: boolean; onClick: () => void }) {
  return (
    <motion.div layout onClick={onClick} className="rounded-2xl overflow-hidden cursor-pointer"
      style={{ background: isActive ? 'white' : 'rgba(247,247,245,0.8)', border: isActive ? `1px solid ${step.color}35` : '1px solid rgba(37,52,63,0.07)', boxShadow: isActive ? `0 8px 32px ${step.color}15, 0 2px 8px rgba(37,52,63,0.06)` : '0 1px 3px rgba(37,52,63,0.04)', transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
      <div className="flex items-center gap-4 p-4">
        <div className="relative shrink-0">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300" style={{ background: isActive ? step.color : 'rgba(37,52,63,0.06)' }}>
            <span style={{ color: isActive ? 'white' : 'rgba(37,52,63,0.35)', display: 'inline-flex' }}><Icon icon={step.icon} width={22} /></span>
          </div>
          <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: isActive ? step.color : 'rgba(37,52,63,0.1)', transition: 'all 0.3s' }}>
            <span style={{ fontSize: '8px', fontWeight: 900, fontFamily: 'monospace', color: isActive ? 'white' : 'rgba(37,52,63,0.45)' }}>{String(step.stepNumber).padStart(2, '0')}</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#25343F', lineHeight: 1.3, marginBottom: '2px' }}>{step.title}</h3>
          <p style={{ fontSize: '10px', fontFamily: 'monospace', letterSpacing: '0.08em', color: 'rgba(37,52,63,0.38)', textTransform: 'uppercase' }}>{step.subtitle}</p>
        </div>
        <motion.div animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}>
          <span style={{ color: isActive ? step.color : 'rgba(37,52,63,0.22)', display: 'inline-flex' }}><Icon icon="solar:alt-arrow-down-bold" width={18} /></span>
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div key="content" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }} className="overflow-hidden">
            <div className="px-4 pb-4 pt-3" style={{ borderTop: '1px solid rgba(37,52,63,0.06)' }}>
              <div className="relative w-full rounded-xl overflow-hidden mb-4" style={{ height: '130px' }}>
                <Image src={step.image} alt={step.title} fill className="object-cover" unoptimized />
                <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${step.color}55 0%, rgba(37,52,63,0.65) 100%)` }} />
                <div className="absolute bottom-3 left-3">
                  <span style={{ fontFamily: 'monospace', fontSize: '8.5px', fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase' }}>
                    PASO {step.stepNumber} — {step.title}
                  </span>
                </div>
              </div>
              {step.content}
              <Link href={step.linkHref} onClick={e => e.stopPropagation()}
                className="flex items-center justify-between w-full mt-4 px-4 py-3 rounded-xl transition-all duration-300 group/cta hover:-translate-y-0.5"
                style={{ background: `${step.color}10`, border: `1px solid ${step.color}20` }}>
                <span style={{ fontSize: '11px', fontWeight: 800, fontFamily: 'monospace', letterSpacing: '0.1em', textTransform: 'uppercase', color: step.color }}>{step.linkText}</span>
                <span style={{ color: step.color, display: 'inline-flex' }}><Icon icon="solar:arrow-right-bold" width={15} /></span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ProgressRail({ steps, activeStep, onStepClick }: { steps: StepData[]; activeStep: number | null; onStepClick: (n: number) => void }) {
  return (
    <div className="flex items-center gap-0 mb-8 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
      {steps.map((step, i) => {
        const isActive = activeStep === step.stepNumber;
        return (
          <div key={step.stepNumber} className="flex items-center shrink-0">
            <button onClick={() => onStepClick(step.stepNumber)}
              className="flex flex-col items-center gap-1 px-2.5 py-2 rounded-xl transition-all duration-300"
              style={{ background: isActive ? `${step.color}12` : 'transparent' }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                style={{ background: isActive ? step.color : 'rgba(37,52,63,0.07)', boxShadow: isActive ? `0 0 12px ${step.color}50` : 'none' }}>
                <span style={{ color: isActive ? 'white' : 'rgba(37,52,63,0.3)', display: 'inline-flex' }}><Icon icon={step.icon} width={14} /></span>
              </div>
              <span style={{ fontSize: '7.5px', fontFamily: 'monospace', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: isActive ? step.color : 'rgba(37,52,63,0.3)', whiteSpace: 'nowrap' }}>
                {step.subtitle}
              </span>
            </button>
            {i < steps.length - 1 && <div className="w-4 h-px" style={{ background: 'rgba(37,52,63,0.08)' }} />}
          </div>
        );
      })}
    </div>
  );
}

export default function OrlandoGuidePage() {
  const [activeStep, setActiveStep] = useState<number | null>(1);

  const handleStepClick = (stepNumber: number) => {
    setActiveStep(prev => prev === stepNumber ? null : stepNumber);
  };

  const STEPS: StepData[] = [
    { stepNumber: 1, title: 'Llegar a Orlando', subtitle: 'Llegada', icon: 'solar:plane-bold-duotone', color: '#00B4D8', image: 'https://images.unsplash.com/photo-1620392135402-28e18b433a92?q=80&w=1200&auto=format&fit=crop', content: <LlegadaContent />, linkHref: '/orlando/llegada', linkText: 'Guía completa de llegada' },
    { stepNumber: 2, title: 'Cuándo conviene viajar', subtitle: 'Temporadas', icon: 'solar:calendar-bold-duotone', color: '#FF7043', image: 'https://images.unsplash.com/photo-1597466599228-a9643df5a7f5?q=80&w=1200&auto=format&fit=crop', content: <CuandoViajarContent />, linkHref: '/orlando/cuando-viajar', linkText: 'Ver calendario de temporadas' },
    { stepNumber: 3, title: 'Dónde dormir', subtitle: 'Alojamiento', icon: 'solar:buildings-bold-duotone', color: '#9B5DE5', image: 'https://images.unsplash.com/photo-1565538873535-9463a56113b2?q=80&w=1200&auto=format&fit=crop', content: <DondeDormirContent />, linkHref: '/orlando/donde-dormir', linkText: 'Explorar alojamiento' },
    { stepNumber: 4, title: 'Cómo moverte', subtitle: 'Movilidad', icon: 'solar:steering-wheel-bold-duotone', color: '#F59E0B', image: 'https://images.unsplash.com/photo-1572989839363-a6873fe6a4f9?q=80&w=1200&auto=format&fit=crop', content: <ComoMoverteContent />, linkHref: '/orlando/movilidad', linkText: 'Guía de transporte' },
    { stepNumber: 5, title: 'Entender las entradas', subtitle: 'Tickets', icon: 'solar:ticket-bold-duotone', color: '#10B981', image: 'https://images.unsplash.com/photo-1554228943-43dedff388e4?q=80&w=1200&auto=format&fit=crop', content: <EntenderEntradasContent />, linkHref: '/orlando/tickets', linkText: 'Guía de tickets y precios' },
    { stepNumber: 6, title: 'Qué hacer además', subtitle: 'Extras', icon: 'solar:confetti-bold-duotone', color: '#FF7043', image: 'https://images.unsplash.com/photo-1600528640033-5b583216b399?q=80&w=1200&auto=format&fit=crop', content: <ExtrasContent />, linkHref: '/orlando/experiencias', linkText: 'Ver todas las experiencias' },
  ];

  const activeStepData = STEPS.find(s => s.stepNumber === activeStep);

  return (
    <div className="min-h-screen" style={{ background: '#f7f7f5' }}>
      <div className="max-w-2xl mx-auto px-4 py-10 pb-20">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16,1,0.3,1] }} className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-celeste" style={{ boxShadow: '0 0 6px #00B4D8' }} />
            <span style={{ fontFamily: 'monospace', fontSize: '10px', fontWeight: 800, letterSpacing: '0.2em', color: '#00B4D8', textTransform: 'uppercase' }}>Guía de Inicio</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.6rem,5vw,2.4rem)', fontWeight: 900, color: '#25343F', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '10px' }}>
            Orlando en <span style={{ color: '#00B4D8' }}>6 pasos</span> claros
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(37,52,63,0.6)', lineHeight: 1.7 }}>
            Antes de reservar parques u hoteles, entendé cómo funciona la ciudad. Esta guía te orienta paso a paso desde la llegada hasta los extras.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeStepData && (
            <motion.div key={activeStepData.stepNumber} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
              className="relative w-full rounded-2xl overflow-hidden mb-6" style={{ height: '170px', boxShadow: `0 8px 32px ${activeStepData.color}20` }}>
              <Image src={activeStepData.image} alt={activeStepData.title} fill className="object-cover" unoptimized />
              <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${activeStepData.color}55 0%, rgba(37,52,63,0.72) 100%)` }} />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}>
                    <Icon icon={activeStepData.icon} width={13} className="text-white" />
                  </div>
                  <span style={{ fontFamily: 'monospace', fontSize: '8px', fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
                    PASO {activeStepData.stepNumber} DE {STEPS.length}
                  </span>
                </div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'white', lineHeight: 1.2 }}>{activeStepData.title}</h2>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <ProgressRail steps={STEPS} activeStep={activeStep} onStepClick={handleStepClick} />

        <div className="flex flex-col gap-3">
          {STEPS.map((step, i) => (
            <motion.div key={step.stepNumber} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16,1,0.3,1] }}>
              <GuideStep step={step} isActive={activeStep === step.stepNumber} onClick={() => handleStepClick(step.stepNumber)} />
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="mt-10 p-5 rounded-2xl text-center" style={{ background: 'rgba(37,52,63,0.04)', border: '1px solid rgba(37,52,63,0.08)' }}>
          <p style={{ fontFamily: 'monospace', fontSize: '9.5px', fontWeight: 800, letterSpacing: '0.18em', color: 'rgba(37,52,63,0.35)', textTransform: 'uppercase', marginBottom: '6px' }}>¿Listo para planificar?</p>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#25343F', marginBottom: '12px' }}>Explorá los parques</h3>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/disney" className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5" style={{ background: '#00B4D8', color: 'white', fontSize: '12px', fontWeight: 800, fontFamily: 'monospace', letterSpacing: '0.08em' }}>
              <Icon icon="solar:star-bold-duotone" width={13} />
              Disney World
            </Link>
            <Link href="/universal" className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5" style={{ background: '#25343F', color: 'white', fontSize: '12px', fontWeight: 800, fontFamily: 'monospace', letterSpacing: '0.08em' }}>
              <Icon icon="solar:planet-bold-duotone" width={13} />
              Universal
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
