"use client";

// DESPUÉS (O247 Icon System — LOCAL, FUNCIONA SIEMPRE)
import { Icon } from "@/components/Icon";
import { motion } from "framer-motion";

const districts = [
  {
    title: "Town Center",
    desc: "Arquitectura española renacentista que alberga las boutiques de moda más exclusivas y el manantial central.",
    insight: "Acceso directo desde el garage Lime.",
    icon: "solar:bag-heart-bold-duotone"
  },
  {
    title: "The Marketplace",
    desc: "El corazón familiar con ambiente clásico americano. Hogar de World of Disney y Earl of Sandwich.",
    insight: "Zona de mayor congestión peatonal.",
    icon: "solar:shop-bold-duotone"
  },
  {
    title: "The Landing",
    desc: "Distrito gastronómico frente al agua con estética industrial y los restaurantes signature más premiados.",
    insight: "Mejores vistas para el atardecer.",
    icon: "solar:chef-hat-bold-duotone"
  },
  {
    title: "West Side",
    desc: "Entretenimiento de alto voltaje con House of Blues, AMC y el espectáculo de Cirque du Soleil.",
    insight: "Estacionar en garage Orange para cercanía.",
    icon: "solar:music-note-bold-duotone"
  }
];

export default function DistrictsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
      {districts.map((item, index) => (
        <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 border border-gunmetal/5 hover:border-sunset/30"
        >
            <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-gunmetal font-display tracking-tight group-hover:text-sunset transition-colors">
                    {item.title}
                </h3>
                <div className="p-2 bg-bone rounded-lg group-hover:bg-sunset/10 transition-colors">
                     <Icon icon={item.icon} className="text-gunmetal/40 group-hover:text-sunset w-6 h-6 transition-colors" />
                </div>
            </div>
            
            <p className="text-sm text-gunmetal/60 mb-6 font-sans leading-relaxed">
                {item.desc}
            </p>
            
            <div className="pt-4 border-t border-gunmetal/5">
                <p className="text-[10px] font-mono font-bold uppercase tracking-wide flex items-center gap-2">
                    <span className="text-gunmetal/30">O247 Insight:</span> 
                    <span className="text-celeste">{item.insight}</span>
                </p>
            </div>
        </motion.div>
      ))}
    </div>
  );
}