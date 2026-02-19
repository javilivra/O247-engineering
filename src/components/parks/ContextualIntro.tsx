'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContextualIntroProps {
  short: React.ReactNode;
  expanded?: React.ReactNode;
}

export default function ContextualIntro({ short, expanded }: ContextualIntroProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative z-10">
      <div className="text-xl md:text-2xl font-medium text-gunmetal leading-relaxed font-sans">
        {short}
        {expanded && (
          <AnimatePresence>
            {isOpen && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }} className="overflow-hidden">
                <div className="pt-6 space-y-6 text-base md:text-lg text-gunmetal/80 font-normal leading-relaxed">
                  {expanded}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
      {expanded && (
        <button onClick={() => setIsOpen(!isOpen)} className="mt-6 flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-widest text-sunset hover:text-gunmetal transition-colors">
          <span>{isOpen ? "[ - ] COMPRIMIR LECTURA" : "[ + ] SEGUIR LEYENDO"}</span>
        </button>
      )}
    </div>
  );
}
