
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Icon } from '@/components/Icon';

const contentData = {
  uno: {
    text: "Los tickets \"Base\" te permiten entrar a un parque por día. Son la opción más simple y económica, ideal para primeras visitas o si querés explorar cada parque a fondo y sin apuro.",
    dato: "Elegir fechas fijas para tus tickets y comprarlos con anticipación puede reducir el costo total de tus entradas en hasta un 12%."
  },
  varios: {
    text: "El adicional \"Park Hopper\" te deja cambiar de parque después de las 2 PM (sujeto a disponibilidad). Es perfecto para revisitar atracciones favoritas o combinar un parque de día con una cena en Epcot.",
    dato: "Considerá el Genie+ o Lightning Lane para evitar filas largas en atracciones populares, especialmente si tenés un ticket Park Hopper y poco tiempo."
  }
};

export default function EntenderEntradasContent() {
  const [activeTab, setActiveTab] = useState('uno');

  return (
    <div className="space-y-4">
      <div>
        <p className="font-semibold text-gunmetal text-sm mb-2">¿Querés visitar un parque por día o varios?</p>
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => setActiveTab('uno')}
            className={`flex items-center justify-center gap-2 text-center p-3 rounded-lg text-sm font-semibold transition-all border-2 ${activeTab === 'uno' ? 'bg-white text-gunmetal shadow border-celeste' : 'bg-gray-100 text-gray-600 border-transparent'}`}
          >
            <Icon icon="solar:ticket-bold-duotone" />
            Uno por día
          </button>
          <button 
            onClick={() => setActiveTab('varios')}
            className={`flex items-center justify-center gap-2 text-center p-3 rounded-lg text-sm font-semibold transition-all border-2 ${activeTab === 'varios' ? 'bg-white text-gunmetal shadow border-celeste' : 'bg-gray-100 text-gray-600 border-transparent'}`}
          >
             <Icon icon="solar:tickets-bold-duotone" />
            Varios (Park Hopper)
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
                          <div className="py-1"><Icon icon="solar:dollar-minimalistic-bold-duotone" width={20} className="text-lime-600" /></div>
                          <div className="ml-3">
                              <p className="text-xs font-bold text-lime-800">DATO CLAVE</p>
                              <p className="text-sm text-lime-700">{contentData[activeTab].dato}</p>
                          </div>
                      </div>
                  </div>
              </motion.div>
          </AnimatePresence>
      </div>
      
      <Link href="/orlando/tickets" className="bg-gunmetal hover:bg-gunmetal/90 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm w-full">
          Continuar al siguiente paso
          <Icon icon="solar:check-read-linear" width={18} />
      </Link>
    </div>
  );
}
