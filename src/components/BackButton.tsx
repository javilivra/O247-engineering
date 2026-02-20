'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Icon } from '@/components/Icon';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function BackButton() {
    const router = useRouter();
    const pathname = usePathname();
    const [show, setShow] = useState(false);

    // Lista de rutas donde el botón de volver NO debe aparecer.
    const noBackPaths = [
        '/',
        '/disney/parks',
        '/universal/parks',
        '/shoppinear',
        '/mapping',
    ];

    useEffect(() => {
        // El botón se muestra si la ruta actual NO está en la lista `noBackPaths`.
        setShow(!noBackPaths.includes(pathname));
    }, [pathname]);

    return (
        <AnimatePresence>
            {show && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{ delay: 0.4, duration: 0.3, ease: 'easeInOut' }}
                    onClick={() => router.back()}
                    className="fixed top-24 left-4 md:left-6 z-50 w-11 h-11 bg-white/70 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 group active:scale-95 border border-white/50"
                    aria-label="Volver a la página anterior"
                >
                    <Icon icon="solar:arrow-left-linear" width={22} className="text-gunmetal group-hover:text-sunset transition-colors" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
