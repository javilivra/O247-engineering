
"use client";

import { Icon } from '@/components/Icon';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

interface GuideStepProps {
  stepNumber: number;
  title: string;
  isCompleted: boolean;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export default function GuideStep({ stepNumber, title, isCompleted, isActive, onClick, children }: GuideStepProps) {
  return (
    <div className={clsx(
      'rounded-2xl border transition-all duration-300 ease-in-out',
      isActive ? 'bg-white shadow-lg border-celeste/50' : 'bg-white shadow-sm border-gray-200',
    )}>
      <div className="flex items-center justify-between p-4 cursor-pointer" onClick={onClick}>
        <div className="flex items-center gap-4">
          <div className={clsx(
            'w-10 h-10 rounded-full flex items-center justify-center',
            isCompleted ? 'bg-gray-100' : 'bg-celeste/10'
          )}>
            <Icon 
              icon={isCompleted ? "solar:check-read-bold-duotone" : "solar:pen-new-square-bold-duotone"} 
              width={24} 
              className={clsx(isCompleted ? 'text-gray-400' : 'text-celeste')} 
            />
          </div>
          <div>
            <h3 className="font-bold text-gunmetal">{title}</h3>
            <p className="text-sm text-gray-500">{isCompleted ? 'Paso completado' : 'Paso actual'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-3xl font-extrabold text-gray-200">0{stepNumber}</p>
          <Icon
              icon="solar:alt-arrow-down-bold-duotone"
              width={20}
              className={clsx('text-gunmetal/60 transition-transform duration-500 ease-in-out', isActive && 'rotate-180')}
          />
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-gray-200 pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
