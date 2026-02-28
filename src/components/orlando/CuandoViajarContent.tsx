
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Icon } from '@/components/Icon';

const contentData = {
  gente: {
    text: "Para evitar multitudes, considera viajar en temporada baja (enero-febrero y septiembre). Disfrutarás de filas más cortas, aunque los parques pueden tener horarios reducidos y algunos espectáculos podrían no estar disponibles.",
    dato: "La segunda quincena de enero, justo después de las fiestas, es uno de los momentos más tranquilos para visitar."
  },
  presupuesto: {
    text: "Los precios de vuelos y hoteles son más bajos durante la temporada baja. Septiembre es particularmente económico, aunque coincide con la temporada de huracanes. Evita las semanas de feriados para no pagar de más.",
    dato: "Reservar con 3-6 meses de anticipación casi siempre garantiza mejores precios, sin importar la temporada."
  }
};

export default function CuandoViajarContent() {
  const [activeTab, setActiveTab] = useState('gente');

  return (
    <div className="space-y-4">
      {/* Toggle Buttons */}
      <div>
        <p className="font-semibold text-gunmetal text-sm mb-2">¿Qué priorizás para tu viaje?</p>
        <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-full">
          <button 
            onClick={() => setActiveTab('gente')}
            className={`w-full text-center px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${activeTab === 'gente' ? 'bg-white text-gunmetal shadow' : 'text-gray-500'}`}
          >
            Menos gente
          </button>
          <button 
            onClick={() => setActiveTab('presupuesto')}
            className={`w-full text-center px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${activeTab === 'presupuesto' ? 'bg-white text-gunmetal shadow' : 'text-gray-500'}`}
          >
            Mejor presupuesto
          </button>
        </div>
      </div>

      {/* Animated Content */}
      <div className="relative">
          <AnimatePresence mode="wait">
              <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="space-y-4"
              >
                  <p className="text-gray-600 leading-relaxed text-sm">
                      {contentData[activeTab].text}
                  </p>
                  <div className="bg-lime-50 border-l-4 border-lime-400 p-3 rounded-r-lg">
                      <div className="flex">
                          <div className="py-1"><Icon icon="solar:pin-bold-duotone" width={20} className="text-lime-600" /></div>
                          <div className="ml-3">
                              <p className="text-xs font-bold text-lime-800">DATO CLAVE</p>
                              <p className="text-sm text-lime-700">{contentData[activeTab].dato}</p>
                          </div>
                      </div>
                  </div>
              </motion.div>
          </AnimatePresence>
      </div>
      
      {/* CTA Button */}
      <Link href="/orlando/cuando-viajar" className="bg-celeste/10 hover:bg-celeste/20 text-celeste font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm w-full">
          Profundizar en Temporadas
          <Icon icon="solar:arrow-right-linear" width={18} />
      </Link>
    </div>
  );
}
