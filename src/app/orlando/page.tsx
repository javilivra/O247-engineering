
"use client"

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import GuideStep from '@/components/orlando/GuideStep';
import HistoryProgress from '@/components/orlando/HistoryProgress';
import LlegadaContent from '@/components/orlando/LlegadaContent';
import CuandoViajarContent from '@/components/orlando/CuandoViajarContent';
import DondeDormirContent from '@/components/orlando/DondeDormirContent';
import ComoMoverteContent from '@/components/orlando/ComoMoverteContent';
import EntenderEntradasContent from '@/components/orlando/EntenderEntradasContent';

const SimpleStepContent = ({ text, linkHref, linkText }) => (
  <div className="space-y-4">
    <p className="text-gray-600 leading-relaxed text-sm">{text}</p>
    <Link href={linkHref} className="bg-celeste/10 hover:bg-celeste/20 text-celeste font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm w-full">
      {linkText}
      <Icon icon="solar:arrow-right-linear" width={18} />
    </Link>
  </div>
);

const guideSteps = [
  { 
    stepNumber: 1, 
    title: "Llegar a Orlando", 
    isCompleted: true, 
    content: <LlegadaContent />,
    image: "https://images.unsplash.com/photo-1620392135402-28e18b433a92?q=80&w=2532&auto=format&fit=crop"
  },
  { 
    stepNumber: 2, 
    title: "Cuándo conviene viajar", 
    isCompleted: true, 
    content: <CuandoViajarContent />,
    image: "https://images.unsplash.com/photo-1597466599228-a9643df5a7f5?q=80&w=2574&auto=format&fit=crop"
  },
  { 
    stepNumber: 3, 
    title: "Dónde dormir según tu plan", 
    isCompleted: true, 
    content: <DondeDormirContent />,
    image: "https://images.unsplash.com/photo-1565538873535-9463a56113b2?q=80&w=2670&auto=format&fit=crop"
  },
  { 
    stepNumber: 4, 
    title: "Cómo moverte por la ciudad", 
    isCompleted: true, 
    content: <ComoMoverteContent />,
    image: "https://images.unsplash.com/photo-1572989839363-a6873fe6a4f9?q=80&w=2574&auto=format&fit=crop"
  },
  { 
    stepNumber: 5, 
    title: "Entender las entradas", 
    isCompleted: false, 
    content: <EntenderEntradasContent />,
    image: "https://images.unsplash.com/photo-1554228943-43dedff388e4?q=80&w=2670&auto=format&fit=crop"
  },
  { 
    stepNumber: 6, 
    title: "Qué hacer además de los parques", 
    isCompleted: false, 
    content: <SimpleStepContent text="Desde los outlets hasta Disney Springs y CityWalk, hay un mundo de actividades para tus días de descanso. Te mostramos lo que no te podés perder." linkHref="/orlando/experiencia" linkText="Descubrir más actividades" />,
    image: "https://images.unsplash.com/photo-1600528640033-5b583216b399?q=80&w=2574&auto=format&fit=crop"
  },
];

export default function OrlandoGuidePage() {
  const [activeStep, setActiveStep] = useState(3);

  const handleStepClick = (stepNumber) => {
    setActiveStep(activeStep === stepNumber ? null : stepNumber);
  };
  
  const currentStepData = guideSteps.find(s => s.stepNumber === (activeStep || 3)) || guideSteps[2];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div>
          <main>
            <div className="text-left mb-8">
              <p className="text-sm font-bold text-celeste uppercase tracking-wider mb-2">Guía de Inicio</p>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gunmetal !leading-tight">
                Cómo funciona Orlando en <span className="text-celeste">6 pasos claros</span>
              </h1>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl">
                Antes de reservar parques u hoteles, entendé cómo está organizada la ciudad. Una visión general para planificar sin estrés.
              </p>
            </div>

            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg mb-8">
                <Image 
                    src={currentStepData.image}
                    layout="fill"
                    objectFit="cover"
                    alt={currentStepData.title}
                    className="transition-transform duration-500 ease-in-out transform hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white font-bold">
                  Paso {currentStepData.stepNumber} — {currentStepData.title}
                </div>
            </div>

            <div className="mb-12">
              <HistoryProgress />
            </div>

            <div className="space-y-4">
              {guideSteps.map((step) => (
                <GuideStep
                  key={step.stepNumber}
                  stepNumber={step.stepNumber}
                  title={step.title}
                  isCompleted={step.isCompleted}
                  isActive={activeStep === step.stepNumber}
                  onClick={() => handleStepClick(step.stepNumber)}
                >
                  {step.content}
                </GuideStep>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
