"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// DESPUÉS (O247 Icon System — LOCAL, FUNCIONA SIEMPRE)
import { Icon } from "@/components/Icon";

// DATA: Top 10 Actividades CityWalk
const activities = [
  {
    rank: "10",
    title: "Minigolf en Hollywood Drive-In",
    desc: "Dos campos de 18 hoyos inspirados en películas de terror y ciencia ficción de los años 50: 'The Haunting of Ghostly Greens' y 'Invaders from Planet Putt'.",
    isFree: false,
    icon: "solar:golf-bold-duotone"
  },
  {
    rank: "09",
    title: "Comida rápida en Red Oven Pizza",
    desc: "Probablemente la mejor pizza napolitana de servicio rápido en Orlando. Horno de piedra a 900 grados y mesas al aire libre.",
    isFree: false,
    icon: "solar:chef-hat-heart-bold-duotone"
  },
  {
    rank: "08",
    title: "Shopping en Universal Studios Store",
    desc: "La tienda insignia moderna con merchandising exclusivo de Harry Potter, Nintendo y Universal Monsters. Diseño abierto y minimalista.",
    isFree: false,
    icon: "solar:bag-heart-bold-duotone"
  },
  {
    rank: "07",
    title: "Escapar en Great Movie Escape",
    desc: "Salas de escape de última generación temáticas de 'Jurassic World' y 'Back to the Future'. Experiencia inmersiva premium.",
    isFree: false,
    icon: "solar:key-bold-duotone"
  },
  {
    rank: "06",
    title: "Relajarse en Margaritaville",
    desc: "El clásico de Jimmy Buffett. Disfruta de la atmósfera relajada, el volcán que entra en erupción (margaritas) y el hidroavión 'Hemisphere Dancer'.",
    isFree: false,
    icon: "solar:water-sun-bold-duotone"
  },
  {
    rank: "05",
    title: "Donas en Voodoo Doughnut",
    desc: "El fenómeno de culto de Portland. Pide la 'Voodoo Doll' o la 'Bacon Maple Bar'. La fila es larga, pero avanza rápido.",
    isFree: false,
    icon: "solar:donut-bold-duotone"
  },
  {
    rank: "04",
    title: "Historia musical en Hard Rock Cafe",
    desc: "El Hard Rock Cafe más grande del mundo. Una arquitectura impresionante tipo coliseo con piezas invaluables de la historia del rock.",
    isFree: false,
    icon: "solar:music-library-bold-duotone"
  },
  {
    rank: "03",
    title: "Karaoke en Rising Star",
    desc: "No es un karaoke normal; aquí cantas con una banda en vivo y coristas. Una experiencia de estrella de rock auténtica.",
    isFree: false,
    icon: "solar:microphone-bold-duotone"
  },
  {
    rank: "02",
    title: "Burgushi en The Cowfish",
    desc: "Fusión única de hamburguesas y sushi. Su 'Burgushi' (sushi rolls con ingredientes de hamburguesa) es una experiencia culinaria obligada.",
    isFree: false,
    icon: "solar:fish-bold-duotone"
  },
  {
    rank: "01",
    title: "Brunch en Toothsome Chocolate",
    desc: "Una fábrica de chocolate Steampunk del siglo XIX. Famosa por sus batidos gigantescos y un menú de brunch disponible todo el día.",
    isFree: false,
    icon: "solar:cup-bold-duotone"
  }
];

export default function ActivityList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mb-24">
      {/* HEADER */}
      <div className="mb-12 max-w-2xl">
        <h3 className="text-3xl font-bold text-gunmetal font-display tracking-tight mb-4">
            Top 10 CityWalk
        </h3>
        <p className="text-base text-gunmetal/70 font-sans leading-relaxed">
            Una selección de las experiencias más vibrantes, desde gastronomía temática hasta entretenimiento inmersivo, justo a la salida de los parques.
        </p>
      </div>

      {/* LISTA ACORDEÓN */}
      <div className="flex flex-col gap-4">
        {activities.map((item, index) => {
            const isOpen = openIndex === index;
            
            return (
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: index * 0.05 }}
                    className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 ${isOpen ? 'border-sunset shadow-lg shadow-sunset/5' : 'border-gunmetal/5 hover:border-gunmetal/20'}`}
                >
                    <button 
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
                    >
                        <div className="flex items-center gap-6 md:gap-8">
                            {/* RANKING */}
                            <span className={`text-2xl font-bold font-display w-10 ${isOpen ? 'text-sunset' : 'text-gunmetal'}`}>
                                #{item.rank}
                            </span>
                            
                            {/* ICONO */}
                            <div className={`hidden md:flex w-12 h-12 rounded-xl items-center justify-center transition-colors ${isOpen ? 'bg-sunset/10 text-sunset' : 'bg-gunmetal/5 text-gunmetal/40 group-hover:text-sunset'}`}>
                                <Icon icon={item.icon} width="24" />
                            </div>

                            {/* TEXTO */}
                            <div className="flex flex-col items-start gap-2">
                                <span className={`text-lg font-bold font-display transition-colors ${isOpen ? 'text-gunmetal' : 'text-gunmetal/80 group-hover:text-gunmetal'}`}>
                                    {item.title}
                                </span>
                                {/* BADGE COSTO */}
                                {item.isFree ? (
                                    <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-celeste/10 text-celeste border border-celeste/20 font-mono">
                                        Gratuito
                                    </span>
                                ) : (
                                    <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-gunmetal/5 text-gunmetal/40 border border-gunmetal/10 font-mono">
                                        Con Costo
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* FLECHA */}
                        <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-gunmetal/30 group-hover:text-sunset"
                        >
                            <Icon icon="solar:alt-arrow-down-bold" width="20" />
                        </motion.div>
                    </button>

                    {/* CONTENIDO DESPLEGABLE */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <div className="px-6 pb-8 pt-0 pl-[calc(3.5rem+1.5rem)] md:pl-[calc(2.5rem+2rem+3rem)] max-w-4xl">
                                    <p className="text-sm text-gunmetal/70 font-sans leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            );
        })}
      </div>
    </section>
  );
}