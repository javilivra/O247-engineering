"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// DESPUÉS (O247 Icon System — LOCAL, FUNCIONA SIEMPRE)
import { Icon } from "@/components/Icon";

// DATA: Top 10 Actividades (Orden Inverso para cuenta regresiva)
const activities = [
  {
    rank: "10",
    title: "Pasear por el lago en auto anfibio",
    desc: "Experimenta un recorrido único en los Amphicars vintage que navegan por Lake Buena Vista. Una atracción clásica que combina ingeniería automotriz y náutica.",
    isFree: false,
    icon: "solar:wheel-bold-duotone"
  },
  {
    rank: "09",
    title: "Cenar en un Counter Service",
    desc: "Opciones rápidas de alta calidad como Chicken Guy!, D-Luxe Burger o The Polite Pig ofrecen gastronomía superior sin necesidad de reserva.",
    isFree: false,
    icon: "solar:chef-hat-heart-bold-duotone"
  },
  {
    rank: "08",
    title: "Comprar en marcas no Disney",
    desc: "Explora flagships de marcas globales como LEGO, Uniqlo, Zara y Sephora con inventario exclusivo y diseños arquitectónicos únicos integrados al distrito.",
    isFree: false,
    icon: "solar:bag-heart-bold-duotone"
  },
  {
    rank: "07",
    title: "Volar en el Globo aerostático Aerophile",
    desc: "Asciende 400 pies en el globo de helio atado más grande del mundo para vistas panorámicas de 360 grados de todo Walt Disney World Resort.",
    isFree: false,
    icon: "solar:wind-bold-duotone"
  },
  {
    rank: "06",
    title: "Disfrutar del Entretenimiento nocturno",
    desc: "Múltiples escenarios al aire libre ofrecen música en vivo, desde solistas hasta bandas completas, creando una atmósfera vibrante sin costo adicional.",
    isFree: true,
    icon: "solar:music-library-bold-duotone"
  },
  {
    rank: "05",
    title: "Maravillarse con Cirque Du Soleil",
    desc: "Una colaboración exclusiva entre Disney Animation y Cirque du Soleil. Acrobacias de clase mundial y animación clásica se unen en 'Drawn to Life'.",
    isFree: false,
    icon: "solar:ticket-sale-bold-duotone"
  },
  {
    rank: "04",
    title: "Recorrer cada piso de Coca Cola Store",
    desc: "Un edificio icónico inspirado en una botella de Coca-Cola de los años 20. Explora merchandise exclusivo, conoce al Oso Polar y sube al Rooftop Bar.",
    isFree: true,
    icon: "solar:bottle-bold-duotone"
  },
  {
    rank: "03",
    title: "Comer cookies en Gideon's Bakehouse",
    desc: "Famosa por sus cookies de casi media libra y su estética gótica victoriana. La fila virtual es común debido a su inmensa popularidad.",
    isFree: false,
    icon: "solar:cookie-bold-duotone"
  },
  {
    rank: "02",
    title: "Cenar en un Restaurante Table Service",
    desc: "La mayor concentración de restaurantes premiados por James Beard en Florida. Opciones como The Boathouse, Morimoto Asia o Chef Art Smith's Homecomin'.",
    isFree: false,
    icon: "solar:wineglass-triangle-bold-duotone"
  },
  {
    rank: "01",
    title: "Perder la conciencia en World of Disney",
    desc: "La tienda Disney más grande del mundo. Sumérgete en un mar de merchandising, coleccionables y recuerdos mágicos en un entorno temático inigualable.",
    isFree: false,
    icon: "solar:magic-stick-3-bold-duotone"
  }
];

export default function ActivityList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mb-24">
      {/* HEADER */}
      <div className="mb-12 max-w-2xl">
        <h3 className="text-3xl font-bold text-gunmetal font-display tracking-tight mb-4">
            Top 10 Actividades
        </h3>
        <p className="text-base text-gunmetal/70 font-sans leading-relaxed">
            Una mezcla curada de experiencias gratuitas que aprovechan el ambiente único del distrito y opciones exclusivas para un recuerdo inolvidable.
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