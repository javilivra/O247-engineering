"use client";

import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

// Definimos la estructura exacta de cada paso para evitar errores de TypeScript
export type LogisticsStep = {
  id: string | number;
  label: string;      // Texto del nodo (ej: "Hotel")
  icon: string;       // Icono del nodo
  
  // Configuración de la línea que SALE de este paso hacia el siguiente
  connectionType?: "walk" | "ride" | "transfer" | "none"; 
  connectionLabel?: string; // Texto sobre la línea (ej: "Caminar 5m")
  isCompleted?: boolean;    // Para controlar si ya pasamos por aquí
};

interface LogisticsStepperProps {
  steps: LogisticsStep[];
}

export default function LogisticsStepper({ steps }: LogisticsStepperProps) {
  return (
    <div className="w-full py-6 overflow-x-auto">
      {/* Contenedor Flex que alinea Círculos y Líneas */}
      <div className="flex items-start justify-between min-w-[320px] px-2">
        
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const isActive = step.isCompleted || index === 0; // Lógica simple de estado

          return (
            <React.Fragment key={step.id}>
              
              {/* 1. EL NODO (CÍRCULO) */}
              <div className="relative flex flex-col items-center z-10">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ 
                    scale: isActive ? 1 : 0.9, 
                    opacity: 1,
                    backgroundColor: isActive ? "#fff" : "#f3f4f6", // Blanco o Gris claro
                    borderColor: isActive ? "#FF6B6B" : "#e5e7eb"   // Sunset o Gris borde
                  }}
                  transition={{ duration: 0.5, delay: index * 0.4 }}
                  className={`
                    w-12 h-12 rounded-full border-[3px] flex items-center justify-center shadow-sm transition-colors duration-500
                    ${isActive ? "text-gunmetal shadow-md shadow-sunset/10" : "text-gray-300"}
                  `}
                >
                  <Icon icon={step.icon} width="20" height="20" />
                </motion.div>
                
                {/* Etiqueta del Nodo (Hotel, Entrada, etc) */}
                <motion.span 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.4 + 0.2 }}
                  className={`mt-2 text-[10px] font-bold uppercase tracking-widest text-center max-w-[80px] ${isActive ? "text-gunmetal" : "text-gray-300"}`}
                >
                  {step.label}
                </motion.span>
              </div>

              {/* 2. LA LÍNEA CONECTORA (SI NO ES EL ÚLTIMO) */}
              {!isLast && (
                <div className="flex-1 relative flex flex-col items-center justify-start mx-2 mt-6">
                  
                  {/* Contenedor de la línea */}
                  <div className="relative w-full h-[2px] flex items-center">
                    
                    {/* Fondo de la línea (Gris base) */}
                    <div className={`absolute w-full h-full bg-gray-200 ${step.connectionType === 'walk' ? 'bg-transparent border-b-2 border-dashed border-gray-300' : ''}`} />

                    {/* Relleno Animado (Progreso) */}
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: index * 0.4 + 0.5, ease: "easeInOut" }}
                      className={`h-full ${step.connectionType === 'walk' ? 'bg-transparent border-b-2 border-dashed border-sunset' : 'bg-gunmetal'}`}
                    />

                    {/* Icono viajero (Caminando o Bus) moviéndose sobre la línea */}
                    <motion.div
                        initial={{ left: "0%", opacity: 0 }}
                        animate={{ left: "100%", opacity: 1 }}
                        transition={{ duration: 1.5, delay: index * 0.4 + 0.5, ease: "easeInOut" }}
                        className="absolute -top-3 -ml-2 text-gunmetal/80"
                    >
                        <Icon 
                            icon={step.connectionType === 'walk' ? "solar:walking-round-bold" : "solar:bus-bold"} 
                            width="14" 
                        />
                    </motion.div>
                  </div>

                  {/* Texto descriptivo DEBAJO o SOBRE la línea (Caminar 5m) */}
                  <span className="text-[9px] font-medium text-gray-400 uppercase tracking-wide mt-2">
                    {step.connectionLabel}
                  </span>
                </div>
              )}

            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}