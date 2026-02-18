"use client";

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

// ============================================================
// TYPES (exported for consumers)
// ============================================================

export interface FilterChip {
  id: string;
  label: string;
  icon?: string;
  match: (item: any) => boolean;
}

export interface FilterSection {
  id: string;
  title: string;
  icon: string;
  chips: FilterChip[];
}

// ============================================================
// FILTER MODAL
// ============================================================

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  activeFilters: Set<string>;
  onToggle: (id: string) => void;
  onClearAll: () => void;
  onApply: () => void;
  sections: FilterSection[];
}

export default function FilterModal({
  open,
  onClose,
  activeFilters,
  onToggle,
  onClearAll,
  onApply,
  sections,
}: FilterModalProps) {
  const count = activeFilters.size;

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-gunmetal/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[70] bg-bone rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-gunmetal/15" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-gunmetal/5">
              <div>
                <h2 className="text-lg font-black text-gunmetal">Filtros</h2>
                {count > 0 && (
                  <p className="text-[11px] text-gunmetal/40 font-medium mt-0.5">
                    {count} {count === 1 ? 'seleccionado' : 'seleccionados'}
                  </p>
                )}
              </div>
              {count > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-xs font-bold text-sunset hover:text-sunset/70 transition-colors uppercase tracking-wider"
                >
                  Limpiar todo
                </button>
              )}
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4 space-y-6">
              {sections.map((section) => (
                <div key={section.id}>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon icon={section.icon} width={16} className="text-gunmetal/30" />
                    <h3 className="text-sm font-bold text-gunmetal">{section.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {section.chips.map((chip) => {
                      const active = activeFilters.has(chip.id);
                      return (
                        <button
                          key={chip.id}
                          onClick={() => onToggle(chip.id)}
                          className={`px-4 py-2 rounded-full text-[12px] font-semibold border-2 transition-all duration-250 ${
                            active
                              ? 'bg-sunset/10 border-sunset text-gunmetal shadow-sm'
                              : 'bg-white border-gunmetal/8 text-gunmetal/50 hover:border-gunmetal/20 hover:text-gunmetal/70'
                          }`}
                        >
                          {chip.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              <div className="h-4" />
            </div>

            {/* Footer */}
            <div className="border-t border-gunmetal/5 px-6 py-4 flex gap-3 bg-bone">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-full border-2 border-gunmetal/10 text-sm font-bold text-gunmetal/50 hover:border-gunmetal/20 hover:text-gunmetal transition-all duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={onApply}
                className="flex-1 py-3 rounded-full bg-gradient-to-r from-sunset to-[#FF8A65] text-white text-sm font-bold shadow-lg shadow-sunset/20 hover:shadow-xl hover:shadow-sunset/30 active:scale-[0.98] transition-all duration-300"
              >
                Aplicar{count > 0 ? ` (${count})` : ''}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}