
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Icon } from '@/components/Icon';

const contentData = {
  auto: {
    title: "Sí, libertad total",
    text: "Alquilar un auto te da la máxima flexibilidad para explorar Orlando y sus alrededores, ir de compras o visitar playas cercanas. Es ideal si te hospedas fuera de los complejos principales.",
    dato: "No olvides el costo del estacionamiento en los parques (aprox. $30/día) y los peajes. El Ticket and Transportation Center (TTC) es el hub para llegar a Magic Kingdom."
  },
  transporte: {
    title: "No, transporte oficial/Uber",
    text: "Si te quedas en un hotel de Disney o Universal, su transporte gratuito es muy eficiente para moverte entre parques y hoteles. Para otros destinos, Uber y Lyft son abundantes y convenientes.",
    dato: "El transporte interno de los resorts es gratuito, pero usarlo para ir a un outlet o a otro complejo puede ser lento. Un Uber puede ahorrarte mucho tiempo."
  }
};

export default function ComoMoverteContent() {
  const [selection, setSelection] = useState('auto');

  const handleSelection = (newSelection) => {
    setSelection(newSelection);
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="font-semibold text-gunmetal text-sm mb-2">¿Vas a alquilar un auto?</p>
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => handleSelection('auto')}
            className={`flex flex-col items-center justify-center gap-1 text-center p-3 rounded-lg text-sm font-semibold transition-all border-2 ${selection === 'auto' ? 'bg-white text-gunmetal shadow border-celeste' : 'bg-gray-100 text-gray-600 border-transparent'}`}
          >
            <Icon icon="solar:steering-wheel-bold-duotone" width="28" />
            <span>{contentData.auto.title}</span>
          </button>
          <button 
            onClick={() => handleSelection('transporte')}
            className={`flex flex-col items-center justify-center gap-1 text-center p-3 rounded-lg text-sm font-semibold transition-all border-2 ${selection === 'transporte' ? 'bg-white text-gunmetal shadow border-celeste' : 'bg-gray-100 text-gray-600 border-transparent'}`}
          >
             <Icon icon="solar:bus-bold-duotone" width="28" />
            <span>{contentData.transporte.title}</span>
          </button>
        </div>
      </div>

      <div className="relative">
          <AnimatePresence mode="wait">
              <motion.div
                  key={selection}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="space-y-4"
              >
                  <p className="text-gray-600 leading-relaxed text-sm">
                      {contentData[selection].text}
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg text-sm text-blue-700">
                    <b>Dato Clave:</b> {contentData[selection].dato}
                  </div>
              </motion.div>
          </AnimatePresence>
      </div>
      
      <Link href="/orlando/movilidad" className="text-sm text-gray-500 hover:text-gunmetal font-semibold flex items-center justify-center gap-1 w-full">
          Editar selección <Icon icon="solar:pen-new-square-linear" />
      </Link>
    </div>
  );
}
