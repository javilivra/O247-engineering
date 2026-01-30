"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export default function LogisticsPanel() {
  return (
    <section className="mb-24">
      {/* HEADER DE SECCIÓN */}
      <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-gunmetal/5 rounded-xl">
            <Icon icon="solar:route-bold-duotone" className="w-8 h-8 text-gunmetal" />
          </div>
          <div>
              <h3 className="text-2xl font-bold text-gunmetal font-display tracking-tight">
                  Protocolos de Acceso y Logística
              </h3>
              <p className="text-sm text-gunmetal/60 font-sans">Estado de flujos en tiempo real.</p>
          </div>
      </div>

      {/* 1. ESTACIONAMIENTO INTELIGENTE */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gunmetal/5 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                  <div className="flex items-center gap-3 mb-2">
                      <Icon icon="solar:wheel-bold-duotone" className="w-5 h-5 text-gunmetal/40" />
                      <h4 className="text-lg font-bold text-gunmetal font-display">Estacionamiento Inteligente</h4>
                  </div>
                  <span className="inline-block px-3 py-1 bg-celeste/10 text-celeste text-[10px] font-bold uppercase tracking-wider rounded border border-celeste/20 font-mono">
                      PARKING GRATUITO
                  </span>
              </div>
              
              {/* Alerta de Saturación */}
              <div className="flex items-center gap-3 px-4 py-2 bg-red-50 border border-red-100 rounded-lg">
                  <Icon icon="solar:danger-triangle-bold" className="w-5 h-5 text-red-500 animate-pulse" />
                  <span className="text-xs font-bold text-red-700 font-mono">Saturación: Vie/Sáb {'>'} 19:00h</span>
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Garage Orange */}
              <div className="p-5 bg-[#fff8f6] border border-[#ffede6] rounded-2xl flex items-center justify-between group hover:border-sunset/30 transition-colors">
                  <div className="flex flex-col">
                      <span className="font-bold text-gunmetal text-sm font-display mb-1">Orange Garage</span>
                      <span className="text-[10px] font-mono text-sunset/80 font-bold">WEST SIDE</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
              </div>

              {/* Garage Lime */}
              <div className="p-5 bg-[#fafff6] border border-[#f0ffe6] rounded-2xl flex items-center justify-between group hover:border-lime-500/30 transition-colors">
                  <div className="flex flex-col">
                      <span className="font-bold text-gunmetal text-sm font-display mb-1">Lime Garage</span>
                      <span className="text-[10px] font-mono text-lime-600/80 font-bold">TOWN CENTER</span>
                  </div>
                   <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]"></div>
              </div>

              {/* Garage Grapefruit */}
              <div className="p-5 bg-[#fff6f8] border border-[#ffe6eb] rounded-2xl flex items-center justify-between group hover:border-rose-500/30 transition-colors">
                  <div className="flex flex-col">
                      <span className="font-bold text-gunmetal text-sm font-display mb-1">Grapefruit Garage</span>
                      <span className="text-[10px] font-mono text-rose-600/80 font-bold">MARKETPLACE</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
              </div>
          </div>
      </div>

      {/* 2. MATRIZ DE TRANSPORTE & HOTELES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Transporte (Ocupa 2 columnas) */}
          <div className="md:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gunmetal/5">
              <div className="flex items-center gap-3 mb-6 border-b border-gunmetal/5 pb-4">
                  <Icon icon="solar:bus-bold-duotone" className="w-6 h-6 text-gunmetal/40" />
                  <h4 className="text-lg font-bold text-gunmetal font-display">Matriz de Transporte</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Desde Hoteles */}
                  <div>
                      <h5 className="text-[10px] font-bold text-celeste uppercase tracking-widest mb-4 font-mono">
                          Desde Hoteles Disney
                      </h5>
                      <p className="text-sm text-gunmetal mb-3 font-bold font-display">Servicio Directo</p>
                      <ul className="text-xs text-gunmetal/60 space-y-3 font-mono">
                          <li className="flex items-center gap-3">
                              <Icon icon="solar:check-circle-bold" className="w-4 h-4 text-emerald-500" />
                              Bus gratuito cada 20 min
                          </li>
                          <li className="flex items-center gap-3">
                              <Icon icon="solar:check-circle-bold" className="w-4 h-4 text-emerald-500" />
                              Sassagoula Boat (Select Resorts)
                          </li>
                      </ul>
                  </div>

                  {/* Desde Parques (Alerta) */}
                  <div>
                      <h5 className="text-[10px] font-bold text-sunset uppercase tracking-widest mb-4 font-mono">
                          Desde Parques
                      </h5>
                      <p className="text-sm text-gunmetal mb-3 font-bold font-display">Requiere Trasbordo</p>
                      <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex gap-3 items-start">
                          <Icon icon="solar:info-circle-bold" className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                          <p className="text-[10px] text-orange-900/80 leading-relaxed font-sans">
                              No hay buses directos Parque {'>'} Disney Springs después de las 16:00. Debes ir a un Resort y trasbordar.
                          </p>
                      </div>
                  </div>
              </div>
          </div>

          {/* Hoteles Vecinos (Columna derecha) */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gunmetal/5 flex flex-col justify-center relative overflow-hidden group">
              {/* Decoración de fondo */}
              <div className="absolute right-0 top-0 w-32 h-32 bg-gunmetal/5 rounded-full -mr-10 -mt-10 group-hover:bg-celeste/10 transition-colors duration-500"></div>

              <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                      <Icon icon="solar:buildings-bold-duotone" className="w-6 h-6 text-gunmetal/40" />
                      <h4 className="text-lg font-bold text-gunmetal font-display">Hoteles Vecinos</h4>
                  </div>
                  <p className="text-sm text-gunmetal/60 mb-6 leading-relaxed font-sans">
                      Acceso peatonal directo a través del puente Skybridge desde Hoteles Hilton, Wyndham y B Resort.
                  </p>
                  <div className="pt-4 border-t border-gunmetal/5">
                      <span className="text-[10px] text-gunmetal/40 font-mono font-bold uppercase tracking-wider flex items-center gap-2">
                          <Icon icon="solar:walking-bold" className="w-4 h-4" />
                          Walking Time: 5-15 min
                      </span>
                  </div>
              </div>
          </div>

      </div>
    </section>
  );
}