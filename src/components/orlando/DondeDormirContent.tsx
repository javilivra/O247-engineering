
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Icon } from '@/components/Icon';

const contentData = {
  familia: {
    text: "Alojarse en hoteles oficiales de Disney o Universal ('dentro') te sumerge en la magia 24/7 y ofrece transporte gratuito. Es ideal para familias, aunque suele ser más costoso.",
    dato: "Elegir un hotel dentro del resort casi siempre garantiza el beneficio de Early Entry (entrada anticipada) a los parques temáticos."
  },
  pareja: {
    text: "Alojarse 'afuera' (en zonas como International Drive o Kissimmee) permite conseguir villas o suites espaciosas a mejor precio. Es una gran opción si rentas auto y buscas más flexibilidad.",
    dato: "Muchos hoteles fuera de los parques cobran 'resort fees' adicionales. Siempre verifica el precio final antes de reservar."
  }
};

export default function DondeDormirContent() {
  const [activeTab, setActiveTab] = useState('familia');

  return (
    <div className="space-y-4">
      <div>
        <p className="font-semibold text-gunmetal text-sm mb-2">¿Con quién viajás?</p>
        <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-full">
          <button 
            onClick={() => setActiveTab('familia')}
            className={`flex items-center justify-center gap-2 text-center px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${activeTab === 'familia' ? 'bg-white text-gunmetal shadow' : 'text-gray-500'}`}
          >
            <Icon icon="solar:users-group-rounded-bold-duotone" />
            Familia con niños
          </button>
          <button 
            onClick={() => setActiveTab('pareja')}
            className={`flex items-center justify-center gap-2 text-center px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${activeTab === 'pareja' ? 'bg-white text-gunmetal shadow' : 'text-gray-500'}`}
          >
             <Icon icon="solar:heart-bold-duotone" />
            Pareja o Amigos
          </button>
        </div>
      </div>

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
                          <div className="py-1"><Icon icon="solar:key-bold-duotone" width={20} className="text-lime-600" /></div>
                          <div className="ml-3">
                              <p className="text-xs font-bold text-lime-800">DATO CLAVE</p>
                              <p className="text-sm text-lime-700">{contentData[activeTab].dato}</p>
                          </div>
                      </div>
                  </div>
              </motion.div>
          </AnimatePresence>
      </div>
      
      <Link href="/orlando/donde-dormir" className="bg-gunmetal hover:bg-gunmetal/90 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm w-full">
          Continuar al siguiente paso
          <Icon icon="solar:check-read-linear" width={18} />
      </Link>
    </div>
  );
}
