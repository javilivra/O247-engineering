"use client";

import { Icon } from '@/components/Icon';
import Link from 'next/link';
import { motion } from 'framer-motion';
import UIFloridaMap from '@/components/UIFloridaMap';

export default function LlegadaPage() {
  return (
    <div className="bg-gray-50">
      <div className="relative overflow-hidden" style={{ background: "#15202b" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
                style={{ background: "rgba(0,180,216,0.1)", border: "1px solid rgba(0,180,216,0.2)", color: "#00B4D8" }}>
                <Icon icon="solar:airplane-bold-duotone" width={13} />
                Paso 1 — Llegada
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-5"
                style={{ color: "white", letterSpacing: "-0.03em" }}>
                Cómo llegar<br />
                <span style={{ color: "#FF7043" }}>a Orlando</span>
              </h1>
              <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.48)" }}>
                Florida tiene cinco aeropuertos relevantes para tu viaje. La elección correcta depende de tu origen,
                presupuesto y si viajás desde Miami en tren o en auto.
              </p>
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { code: "MCO", sub: "Principal",       time: "25 min", col: "#FFD54F" },
                  { code: "MIA", sub: "Con Brightline",  time: "3.5 h",  col: "rgba(255,255,255,0.45)" },
                  { code: "FLL", sub: "Fort Lauderdale", time: "3.5 h",  col: "rgba(255,255,255,0.45)" },
                ].map((s) => (
                  <div key={s.code} className="rounded-xl p-3 text-center"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="text-base font-black font-mono mb-0.5" style={{ color: s.col }}>{s.code}</div>
                    <div className="text-[9px] uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>{s.sub}</div>
                    <div className="text-[10px] font-semibold" style={{ color: "#FF7043" }}>{s.time} a Disney</div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl p-3 flex items-start gap-3"
                style={{ background: "rgba(255,213,79,0.06)", border: "1px solid rgba(255,213,79,0.15)" }}>
                <span style={{ fontSize: 16 }}>🚄</span>
                <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                  <strong style={{ color: "#FFD54F" }}>Tren Brightline</strong> — conecta FLL y MIA con MCO en ~3.5 horas.
                  Cómodo, puntual y sin estrés de tráfico.
                </p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }} style={{ height: 460 }}>
              <UIFloridaMap />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gunmetal mb-4 flex items-center gap-3">
              <Icon icon="solar:airplane-bold-duotone" width={28} className="text-celeste" />
              Aeropuertos directos a Orlando
            </h2>
            <p className="text-gray-600 mb-6">
              La forma más común de llegar es volando directamente a uno de los dos aeropuertos de Orlando.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-gunmetal">Aeropuerto Internacional de Orlando (MCO)</h3>
                <p className="text-sm text-gray-500">El más grande y cercano a los parques.</p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li className="flex items-start gap-2"><Icon icon="solar:check-circle-bold" className="text-green-500 mt-1" /><b>Ubicación:</b> 20-30 min de Disney y Universal.</li>
                  <li className="flex items-start gap-2"><Icon icon="solar:check-circle-bold" className="text-green-500 mt-1" /><b>Transporte:</b> Buses Disney, Brightline, shuttle y ride-sharing.</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-gunmetal">Aeropuerto Internacional de Orlando Sanford (SFB)</h3>
                <p className="text-sm text-gray-500">Vuelos de aerolíneas low-cost.</p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li className="flex items-start gap-2"><Icon icon="solar:check-circle-bold" className="text-green-500 mt-1" /><b>Ubicación:</b> 45-60 min de los parques.</li>
                  <li className="flex items-start gap-2"><Icon icon="solar:close-circle-bold" className="text-red-500 mt-1" /><b>Transporte:</b> Menos opciones de transporte directo.</li>
                </ul>
              </div>
            </div>
            <div className="bg-lime-50 border-l-4 border-lime-400 p-4 rounded-r-lg">
              <div className="flex">
                <div className="py-1"><Icon icon="solar:dollar-minimalistic-bold-duotone" width={24} className="text-lime-600" /></div>
                <div className="ml-3">
                  <p className="text-sm font-bold text-lime-800">Costo vs. Conveniencia</p>
                  <p className="text-sm text-lime-700">Aunque SFB sea más barato, sumá el costo del transporte terrestre. MCO es más conveniente para la mayoría.</p>
                </div>
              </div>
            </div>
          </section>

          <div className="border-t border-gray-200" />

          <section>
            <h2 className="text-2xl font-bold text-gunmetal mb-4 flex items-center gap-3">
              <Icon icon="solar:train-bold-duotone" width={28} className="text-celeste" />
              Viajando desde Miami o Fort Lauderdale
            </h2>
            <p className="text-gray-600 mb-6">
              Muchos viajeros combinan Miami o Fort Lauderdale con Orlando. Tenés dos opciones para el traslado.
            </p>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-4">
                <Icon icon="solar:steering-wheel-bold-duotone" width={28} className="text-gunmetal/70 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gunmetal">Alquiler de Auto</h4>
                  <p className="text-gray-600 text-sm">~4 horas. Total flexibilidad pero sumá peajes, nafta y estacionamiento en parques ($25–30/día).</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Icon icon="solar:train-bold-duotone" width={28} className="text-gunmetal/70 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gunmetal">Tren Brightline</h4>
                  <p className="text-gray-600 text-sm">FLL o MIA → MCO en ~3.5 horas. Cómodo, sin tráfico y con terminal dentro del aeropuerto de Orlando.</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <div className="flex">
                <div className="py-1"><Icon icon="solar:lightbulb-bold-duotone" width={24} className="text-blue-600" /></div>
                <div className="ml-3">
                  <p className="text-sm font-bold text-blue-800">Recomendación</p>
                  <p className="text-sm text-blue-700">Si solo vas a parques, el tren es ideal. Si querés explorar Orlando libremente, el auto es indispensable.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-10 text-center">
          <Link href="/orlando/cuando-viajar"
            className="bg-gunmetal hover:bg-gunmetal/90 text-white font-bold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center gap-2">
            Continuar al Paso 2: Cuándo Viajar
            <Icon icon="solar:arrow-right-bold" width={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
