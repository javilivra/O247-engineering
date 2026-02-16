"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const districts = [
  {
    title: "The Waterfront",
    desc: "Vistas panorámicas hacia la laguna central y los parques. El escenario ideal para cenas al atardecer en lugares icónicos como Jimmy Buffett's.",
    insight: "Acceso directo al Water Taxi.",
    icon: "solar:water-sun-bold-duotone"
  },
  {
    title: "Upper Deck",
    desc: "El nivel superior donde la vida nocturna cobra vida. Hogar de Bob Marley's, el cine Cinemark y clubes de baile.",
    insight: "Menor congestión antes de las 20:00.",
    icon: "solar:music-note-bold-duotone"
  },
  {
    title: "The Promenade",
    desc: "La arteria principal que conecta el Hub de seguridad con la entrada de los parques. Tiendas flagship y snacks rápidos.",
    insight: "Paso obligatorio de alto flujo.",
    icon: "solar:road-bold-duotone"
  },
  {
    title: "Entertainment Zone",
    desc: "Áreas dedicadas a experiencias inmersivas como el Hollywood Drive-In Golf y el Great Movie Escape.",
    insight: "Ideal para días sin ticket de parque.",
    icon: "solar:gamepad-bold-duotone"
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