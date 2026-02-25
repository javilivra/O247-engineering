'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Icon } from '@/components/Icon';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

// ============================================================
// DICCIONARIO DE NOMBRES para el tooltip
// ============================================================
const PATH_NAMES: Record<string, string> = {
  '/disney/parks': 'Disney World',
  '/universal/parks': 'Universal Orlando',
  '/disney/mk': 'Magic Kingdom',
  '/disney/epcot': 'EPCOT',
  '/disney/hs': 'Hollywood Studios',
  '/disney/ak': 'Animal Kingdom',
  '/universal/usf': 'Universal Studios',
  '/universal/ioa': 'Islands of Adventure',
  '/universal/vb': 'Volcano Bay',
  '/universal/eu': 'Epic Universe',
};

const PARENT_OVERRIDES: Record<string, string> = {
  '/disney/mk': '/disney/parks',
  '/disney/epcot': '/disney/parks',
  '/disney/hs': '/disney/parks',
  '/disney/ak': '/disney/parks',
  '/universal/usf': '/universal/parks',
  '/universal/ioa': '/universal/parks',
  '/universal/vb': '/universal/parks',
  '/universal/eu': '/universal/parks',
};

const NO_BACK_ROUTES = [
  '/',
  '/disney/parks',
  '/universal/parks',
  '/shoppinear',
  '/mapping',
];

function getParentPath(pathname: string): string | null {
  if (NO_BACK_ROUTES.includes(pathname)) return null;
  if (PARENT_OVERRIDES[pathname]) return PARENT_OVERRIDES[pathname];
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length <= 1) return null;
  const parent = '/' + segments.slice(0, -1).join('/');
  if (parent === '/disney') return '/disney/parks';
  if (parent === '/universal') return '/universal/parks';
  return parent;
}

function getParentName(path: string): string {
  if (PATH_NAMES[path]) return PATH_NAMES[path];
  // Fallback: último segmento capitalizado
  const last = path.split('/').filter(Boolean).pop() || '';
  return last.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// ============================================================
// COMPONENT — solo visible en mobile (md:hidden)
// ============================================================
export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const [parentPath, setParentPath] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setParentPath(getParentPath(pathname));
  }, [pathname]);

  const handleBack = () => {
    if (parentPath) router.push(parentPath);
  };

  const parentName = parentPath ? getParentName(parentPath) : '';

  return (
    <AnimatePresence>
      {parentPath && (
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ delay: 0.35, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-24 left-4 z-50 md:hidden"
        >
          <div className="relative">
            {/* BOTÓN */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleBack}
              onHoverStart={() => setShowTooltip(true)}
              onHoverEnd={() => setShowTooltip(false)}
              onTouchStart={() => setShowTooltip(true)}
              onTouchEnd={() => setTimeout(() => setShowTooltip(false), 800)}
              className="
                w-10 h-10
                bg-white/85 backdrop-blur-md
                rounded-full
                flex items-center justify-center
                shadow-[0_2px_12px_rgba(0,0,0,0.10),0_1px_3px_rgba(0,0,0,0.06)]
                hover:shadow-[0_4px_20px_rgba(0,0,0,0.14)]
                hover:bg-white
                border border-white/60
                transition-all duration-200
                group
              "
              aria-label={`Volver a ${parentName}`}
            >
              <motion.span
                whileHover={{ x: -1.5 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center"
              >
                <Icon
                  icon="solar:arrow-left-linear"
                  width={18}
                  className="text-gunmetal/60 group-hover:text-sunset transition-colors duration-200"
                />
              </motion.span>
            </motion.button>

            {/* TOOLTIP */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, x: -6, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -4, scale: 0.96 }}
                  transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="
                    absolute left-12 top-1/2 -translate-y-1/2
                    bg-gunmetal text-white
                    text-[10px] font-mono uppercase tracking-widest
                    px-3 py-1.5 rounded-lg
                    whitespace-nowrap
                    shadow-lg
                    pointer-events-none
                  "
                >
                  {/* Flecha izquierda del tooltip */}
                  <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[6px] border-r-gunmetal" />
                  ← {parentName}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
