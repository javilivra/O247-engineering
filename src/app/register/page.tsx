"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

// --- BENEFICIOS (Value Props) ---
const BENEFITS = [
  {
    icon: "solar:tuning-square-2-bold-duotone",
    title: "Recomendaciones a tu Medida",
    desc: "La web ocultará lo que no te interesa y resaltará las ofertas perfectas para tu grupo (según tu quiz).",
    color: "text-sunset"
  },
  {
    icon: "solar:calendar-mark-bold-duotone",
    title: "Planificador IA",
    desc: "Guarda fechas, crea rutas de compras optimizadas y calcula impuestos automáticamente.",
    color: "text-celeste"
  },
  {
    icon: "solar:bell-bing-bold-duotone",
    title: "Alertas de Ahorro",
    desc: "Te avisamos si cambian los precios o si hay un feriado fiscal cerca de tu viaje.",
    color: "text-vanguard-green" // Asumiendo verde, si no usar text-emerald-500
  }
];

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Simulación de Registro
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Aquí iría la lógica real (Supabase, Firebase, Auth0)
    // Simulamos un delay de red
    setTimeout(() => {
      // REDIRECCIÓN INTELIGENTE -> PLANNING
      router.push("/planning"); 
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-bone flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      
      {/* Fondo Decorativo Sutil */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-sunset/5 rounded-full blur-3xl pointer-events-none" />

      {/* --- CONTENEDOR PRINCIPAL (Tarjeta Split) --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-6xl bg-white rounded-[32px] shadow-averi border border-gunmetal/5 overflow-hidden grid grid-cols-1 lg:grid-cols-2 relative z-10"
      >
        
        {/* COLUMNA IZQUIERDA: FORMULARIO (Zona de Acción) */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2 lg:order-1">
          
          {/* Header Emocional */}
          <div className="mb-10">
            <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
                <Icon icon="solar:arrow-left-linear" className="text-gunmetal/40 group-hover:text-gunmetal transition-colors" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-gunmetal/40 group-hover:text-gunmetal transition-colors">Volver</span>
            </Link>
            <h1 className="type-display text-3xl md:text-4xl text-gunmetal mb-3 leading-tight">
              Guarda tu Plan Mágico.
            </h1>
            <p className="type-body text-gunmetal/60 text-lg">
              Ya analizamos tu perfil. Crea tu acceso para no perder tu configuración y desbloquear al <strong className="text-gunmetal">Asistente Inteligente.</strong>
            </p>
          </div>

          {/* Social Login (Prioritario) */}
          <div className="flex flex-col gap-3 mb-8">
            <button className="flex items-center justify-center gap-3 w-full py-3.5 px-4 bg-white border border-gunmetal/10 rounded-xl hover:bg-gray-50 hover:border-gunmetal/30 transition-all shadow-sm group">
                <Icon icon="logos:google-icon" className="w-5 h-5" />
                <span className="text-sm font-bold text-gunmetal">Continuar con Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 w-full py-3.5 px-4 bg-white border border-gunmetal/10 rounded-xl hover:bg-gray-50 hover:border-gunmetal/30 transition-all shadow-sm group">
                <Icon icon="logos:apple" className="w-5 h-5 mb-0.5" />
                <span className="text-sm font-bold text-gunmetal">Continuar con Apple</span>
            </button>
          </div>

          {/* Separador */}
          <div className="relative flex py-2 items-center mb-8">
            <div className="flex-grow border-t border-gunmetal/10"></div>
            <span className="flex-shrink-0 mx-4 text-xs font-mono text-gunmetal/30 uppercase tracking-widest">O usa tu correo</span>
            <div className="flex-grow border-t border-gunmetal/10"></div>
          </div>

          {/* Formulario Manual */}
          <form onSubmit={handleRegister} className="space-y-5">
            
            {/* Nombre (Solo Pila) */}
            <div className="space-y-1.5">
                <label className="text-xs font-bold text-gunmetal uppercase tracking-wide ml-1">Nombre</label>
                <input 
                    type="text" 
                    placeholder="Ej. Juan" 
                    className="w-full bg-bone px-4 py-3.5 rounded-xl border border-transparent focus:bg-white focus:border-sunset/50 focus:ring-4 focus:ring-sunset/10 outline-none transition-all text-gunmetal placeholder:text-gunmetal/30"
                    required
                />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
                <label className="text-xs font-bold text-gunmetal uppercase tracking-wide ml-1">Email</label>
                <input 
                    type="email" 
                    placeholder="juan@ejemplo.com" 
                    className="w-full bg-bone px-4 py-3.5 rounded-xl border border-transparent focus:bg-white focus:border-sunset/50 focus:ring-4 focus:ring-sunset/10 outline-none transition-all text-gunmetal placeholder:text-gunmetal/30"
                    required
                />
            </div>

            {/* Password con Toggle */}
            <div className="space-y-1.5">
                <label className="text-xs font-bold text-gunmetal uppercase tracking-wide ml-1">Contraseña</label>
                <div className="relative">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Crear contraseña segura" 
                        className="w-full bg-bone px-4 py-3.5 rounded-xl border border-transparent focus:bg-white focus:border-sunset/50 focus:ring-4 focus:ring-sunset/10 outline-none transition-all text-gunmetal placeholder:text-gunmetal/30 pr-12"
                        required
                    />
                    <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gunmetal/30 hover:text-gunmetal transition-colors"
                    >
                        <Icon icon={showPassword ? "solar:eye-bold" : "solar:eye-closed-bold"} className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* CTA Principal */}
            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-4 bg-gunmetal text-white rounded-xl font-bold uppercase tracking-widest hover:bg-sunset transition-colors shadow-lg shadow-gunmetal/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
            >
                {isLoading ? (
                    <>
                        <Icon icon="line-md:loading-loop" className="w-5 h-5" />
                        Procesando...
                    </>
                ) : (
                    <>
                        Ver mi Itinerario Personalizado
                        <Icon icon="solar:arrow-right-linear" className="w-5 h-5" />
                    </>
                )}
            </button>

            {/* Micro-copy de Confianza */}
            <p className="text-center text-[10px] text-gunmetal/40 max-w-xs mx-auto leading-relaxed">
                <Icon icon="solar:shield-check-bold" className="inline w-3 h-3 mr-1 align-text-bottom" />
                Odiamos el spam tanto como tú. Tus datos se usan para personalizar la ingeniería de tu viaje, no para venderlos.
            </p>

          </form>
        </div>

        {/* COLUMNA DERECHA: REFUERZO DE VALOR (Visual) */}
        <div className="bg-gunmetal relative p-8 md:p-12 lg:p-16 flex flex-col justify-center order-1 lg:order-2 overflow-hidden">
            
            {/* Elementos Decorativos de Fondo */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-sunset/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>

            <div className="relative z-10">
                <div className="mb-12">
                    <span className="px-3 py-1 rounded-full border border-white/20 text-white/50 text-[10px] font-mono uppercase tracking-widest bg-white/5">
                        O247 Engineering Access
                    </span>
                    <h2 className="type-display text-3xl md:text-4xl text-white mt-6 mb-2">
                        Desbloquea la versión<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset to-celeste">optimizada para vos.</span>
                    </h2>
                </div>

                <div className="space-y-8">
                    {BENEFITS.map((item, idx) => (
                        <div key={idx} className="flex gap-5 group">
                            <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors ${item.color}`}>
                                <Icon icon={item.icon} className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Testimonio o Prueba Social Sutil */}
                <div className="mt-16 pt-8 border-t border-white/10 flex items-center gap-4">
                    <div className="flex -space-x-3">
                        {[1,2,3].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-full bg-bone border-2 border-gunmetal overflow-hidden relative">
                                <Image src={`/images/avatar-${i}.jpg`} alt="User" width={32} height={32} className="object-cover bg-gray-300" />
                            </div>
                        ))}
                    </div>
                    <p className="text-white/40 text-xs">
                        Únete a otros <strong className="text-white">1,200+ viajeros</strong> inteligentes.
                    </p>
                </div>
            </div>
        </div>

      </motion.div>
    </main>
  );
}