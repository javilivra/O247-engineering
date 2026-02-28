
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Icon } from '@/components/Icon';

const contentData = {
  directo: {
    text: "Orlando tiene dos aeropuertos principales (MCO y SFB). La elección depende de si priorizas cercanía o precio en aerolíneas low-cost.",
    dato: "MCO está más cerca de Disney/Universal, pero SFB suele tener vuelos más baratos."
  },
  miami: {
    text: "Si viajas a Miami primero, puedes llegar a Orlando en auto (4hs aprox) o con el nuevo tren Brightline, una opción cómoda y rápida.",
    dato: "El tren Brightline te deja en el aeropuerto MCO, conectado con los transportes de Disney y Universal."
  }
};

export default function LlegadaContent() {
  const [activeTab, setActiveTab] = useState('directo');

  return (
    <div className="space-y-4">
      {/* Toggle Buttons */}
      <div>
        <p className="font-semibold text-gunmetal text-sm mb-2">¿Llegás desde Miami o vuelo directo?</p>
        <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-full">
          <button 
            onClick={() => setActiveTab('directo')}
            className={`w-full text-center px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${activeTab === 'directo' ? 'bg-white text-gunmetal shadow' : 'text-gray-500'}`}
          >
            Vuelo directo (MCO/SFB)
          </button>
          <button 
            onClick={() => setActiveTab('miami')}
            className={`w-full text-center px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${activeTab === 'miami' ? 'bg-white text-gunmetal shadow' : 'text-gray-500'}`}
          >
            Desde Miami
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
      <Link href="/orlando/llegada" className="bg-celeste/10 hover:bg-celeste/20 text-celeste font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm w-full">
          Profundizar en Llegada
          <Icon icon="solar:arrow-right-linear" width={18} />
      </Link>
    </div>
  );
}
