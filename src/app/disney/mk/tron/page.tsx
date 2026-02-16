"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import VideoLite from '@/components/VideoLite';

export default function TronPage() {
    return (
        <div className="min-h-screen bg-gunmetal font-sans text-white relative selection:bg-celeste selection:text-gunmetal overflow-x-hidden">
            
            {/* 0. FONDO FIXED INMERSIVO (THE GRID) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {/* Imagen de Fondo */}
                <img 
                    src="/images/tron_mk.jpg" 
                    alt="TRON Background" 
                    className="w-full h-full object-cover opacity-60" 
                />
                
                {/* Overlay Gradiente para legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-t from-gunmetal via-gunmetal/90 to-black/40" />
                
                {/* Grid Tecnológico Decorativo (CSS Puro) */}
                <div className="absolute inset-0 opacity-20" 
                     style={{ 
                         backgroundImage: 'linear-gradient(to right, rgba(0, 180, 216, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 180, 216, 0.1) 1px, transparent 1px)',
                         backgroundSize: '40px 40px',
                         maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)'
                     }} 
                />
            </div>

            {/* 1. HERO SECTION */}
            {/* pt-40: Espacio vital para el Navbar y Breadcrumb Globales */}
            <section className="relative z-20 container mx-auto px-6 md:px-12 max-w-7xl pt-40 pb-20">
                <div className="flex flex-col justify-end min-h-[50vh]">
                    
                    {/* Tags Superiores */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        <span className="bg-celeste/20 backdrop-blur-md border border-celeste/30 text-celeste px-3 py-1 rounded text-[10px] font-bold tracking-widest uppercase font-mono flex items-center gap-2">
                            <Icon icon="solar:map-point-bold" /> MAGIC KINGDOM
                        </span>
                        <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded text-[10px] font-bold tracking-widest uppercase font-mono">
                            ATRACCIÓN DE INTENSIDAD
                        </span>
                        <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded text-[10px] font-bold tracking-widest uppercase font-mono">
                            ALTA VELOCIDAD
                        </span>
                    </div>

                    {/* Título Masivo */}
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="font-sans font-black text-6xl md:text-8xl lg:text-9xl text-white leading-[0.9] tracking-tighter uppercase mb-8 drop-shadow-2xl"
                    >
                        TRON <span className="text-transparent bg-clip-text bg-gradient-to-r from-celeste to-white">Lightcycle</span> / Run
                    </motion.h1>

                    {/* Botones de Acción */}
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                        className="flex flex-wrap gap-4"
                    >
                        <button className="flex items-center gap-2 bg-celeste hover:bg-celeste/90 text-gunmetal px-6 py-3 rounded-xl font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(0,180,216,0.3)] group">
                            <Icon icon="solar:refresh-circle-bold" className="text-xl group-hover:rotate-180 transition-transform" />
                            <span className="text-xs md:text-sm uppercase">Sincronizar Itinerario</span>
                        </button>
                        <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-lg text-white border border-white/20 px-6 py-3 rounded-xl font-bold tracking-wide transition-all group">
                            <Icon icon="solar:ticket-star-bold" className="text-xl text-white/70 group-hover:text-white" />
                            <span className="text-xs md:text-sm uppercase">Estado Fila Virtual</span>
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* 2. HUD DE DATOS FLOTANTE (Barra de Estado) */}
            <div className="relative z-30 w-full border-y border-white/10 bg-gunmetal/80 backdrop-blur-xl">
                <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
                        
                        {/* Dato 1 */}
                        <div className="p-6 flex items-center gap-4 hover:bg-white/5 transition-colors">
                            <div className="p-3 bg-celeste/10 rounded-lg text-celeste">
                                <Icon icon="solar:clock-circle-bold" width={24} />
                            </div>
                            <div>
                                <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase font-mono">ESPERA ACTUAL</p>
                                <p className="text-xl md:text-2xl font-bold text-white font-mono">VQ ONLY</p>
                            </div>
                        </div>

                        {/* Dato 2 */}
                        <div className="p-6 flex items-center gap-4 hover:bg-white/5 transition-colors">
                            <div className="p-3 bg-sunset/10 rounded-lg text-sunset">
                                <Icon icon="solar:ticket-bold" width={24} />
                            </div>
                            <div>
                                <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase font-mono">ESTADO VQ</p>
                                <p className="text-xl md:text-2xl font-bold text-white font-mono uppercase">AGOTADO</p>
                            </div>
                        </div>

                        {/* Dato 3 */}
                        <div className="p-6 flex items-center gap-4 hover:bg-white/5 transition-colors">
                            <div className="p-3 bg-celeste/10 rounded-lg text-celeste">
                                <Icon icon="solar:wallet-money-bold" width={24} />
                            </div>
                            <div>
                                <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase font-mono">PRECIO ILL</p>
                                <p className="text-xl md:text-2xl font-bold text-white font-mono">$20.00</p>
                            </div>
                        </div>

                        {/* Dato 4 */}
                        <div className="p-6 flex items-center gap-4 bg-celeste text-gunmetal relative overflow-hidden group">
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"/>
                            <div className="p-3 bg-gunmetal/10 rounded-lg relative z-10">
                                <Icon icon="solar:graph-new-bold" width={24} />
                            </div>
                            <div className="relative z-10">
                                <p className="text-gunmetal/60 text-[10px] font-bold tracking-widest uppercase font-mono">CARGA DE RED</p>
                                <p className="text-xl md:text-2xl font-bold font-mono uppercase">ALTA</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* 3. CONTENIDO PRINCIPAL (Grid 3 Columnas) */}
            <main className="relative z-20 container mx-auto px-6 md:px-12 max-w-7xl py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* COLUMNA 1: LA MISIÓN (Texto Narrativo) */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3 text-celeste border-b border-white/10 pb-4">
                            <Icon icon="solar:code-square-bold" width={24} />
                            <h3 className="text-sm font-bold tracking-[0.2em] uppercase font-mono">LA MISIÓN</h3>
                        </div>
                        
                        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm relative overflow-hidden">
                            {/* Decoración UI */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-celeste/5 rounded-full blur-2xl -mr-10 -mt-10"/>
                            
                            <p className="text-white/80 leading-relaxed font-light mb-6">
                                <strong className="text-white font-bold">Inicia la sincronización.</strong> Deja atrás el mundo real y únete al Team Blue en una carrera épica a través de La Red, el mundo digitalizado sin horizontes.
                            </p>
                            <p className="text-white/80 leading-relaxed font-light">
                                El objetivo: Superar a los feroces Programas del Team Orange. Tu misión es cruzar con éxito los <strong>8 Portales de Energía</strong> y asegurar la victoria.
                            </p>

                            <div className="mt-8 p-4 border-l-2 border-celeste bg-celeste/5 rounded-r-lg">
                                <span className="text-[10px] font-bold text-celeste tracking-widest uppercase block mb-1 font-mono">INTELIGENCIA DE OBJETIVO</span>
                                <p className="text-sm font-medium italic text-white/60">"La Red es más que un juego. Es el futuro de la ingeniería de viajes."</p>
                            </div>
                        </div>
                    </div>

                    {/* COLUMNA 2: PROTOCOLOS (Timeline Interactivo) */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3 text-celeste border-b border-white/10 pb-4">
                            <Icon icon="solar:settings-bold" width={24} />
                            <h3 className="text-sm font-bold tracking-[0.2em] uppercase font-mono">PROTOCOLOS</h3>
                        </div>

                        <div className="space-y-4">
                            {/* PASO 1 */}
                            <div className="relative group">
                                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/10 group-hover:bg-celeste transition-colors"/>
                                <div className="ml-6 p-5 bg-gunmetal border border-white/10 rounded-xl hover:border-celeste/50 transition-all relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Icon icon="solar:scanner-bold" width={40} className="text-celeste"/>
                                    </div>
                                    <div className="flex gap-4 relative z-10">
                                        <span className="text-celeste font-mono font-bold text-xl">01</span>
                                        <div>
                                            <h4 className="font-bold text-sm tracking-widest uppercase text-white mb-1">Sincronizar (Laser SHV)</h4>
                                            <p className="text-xs text-white/50">Carga tu perfil físico en la interfaz de la Lightcycle mediante biometría digital.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* PASO 2 */}
                            <div className="relative group">
                                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/10 group-hover:bg-sunset transition-colors"/>
                                <div className="ml-6 p-5 bg-gunmetal border border-white/10 rounded-xl hover:border-sunset/50 transition-all relative overflow-hidden">
                                     <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Icon icon="solar:box-minimalistic-bold" width={40} className="text-sunset"/>
                                    </div>
                                    <div className="flex gap-4 relative z-10">
                                        <span className="text-sunset font-mono font-bold text-xl">02</span>
                                        <div>
                                            <h4 className="font-bold text-sm tracking-widest uppercase text-white mb-1">Cargar (Dual Lockers)</h4>
                                            <p className="text-xs text-white/50">Deposita equipamiento personal. Sistema obligatorio de taquillas de doble acceso.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* PASO 3 */}
                            <div className="relative group">
                                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/10 group-hover:bg-celeste transition-colors"/>
                                <div className="ml-6 p-5 bg-gunmetal border border-white/10 rounded-xl hover:border-celeste/50 transition-all relative overflow-hidden">
                                     <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Icon icon="solar:rocket-2-bold" width={40} className="text-celeste"/>
                                    </div>
                                    <div className="flex gap-4 relative z-10">
                                        <span className="text-celeste font-mono font-bold text-xl">03</span>
                                        <div>
                                            <h4 className="font-bold text-sm tracking-widest uppercase text-white mb-1">Lanzar (95 km/h)</h4>
                                            <p className="text-xs text-white/50">Activa la propulsión. Alcanza la velocidad máxima en menos de 3.5 segundos.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* COLUMNA 3: ESPECIFICACIONES (Lista Técnica) */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3 text-celeste border-b border-white/10 pb-4">
                            <Icon icon="solar:tuning-2-bold" width={24} />
                            <h3 className="text-sm font-bold tracking-[0.2em] uppercase font-mono">ESPECIFICACIONES</h3>
                        </div>

                        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-6">
                            
                            <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                <span className="text-white/60 text-xs uppercase tracking-wide">Altura Mínima</span>
                                <span className="font-mono font-bold text-white text-lg">122cm</span>
                            </div>
                            
                            <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                <span className="text-white/60 text-xs uppercase tracking-wide">Accesibilidad</span>
                                <span className="font-mono font-bold text-white text-sm text-right">Transferencia ECV</span>
                            </div>

                            <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                <span className="text-white/60 text-xs uppercase tracking-wide">Seguridad Física</span>
                                <span className="font-mono font-bold text-white text-sm text-right">Sujeción Activa</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-white/60 text-xs uppercase tracking-wide">Lanzamiento</span>
                                <span className="font-mono font-bold text-white text-sm text-right">Inducción LSM</span>
                            </div>

                            {/* Alerta Sunset */}
                            <div className="bg-sunset/10 border border-sunset/20 p-4 rounded-lg flex gap-3">
                                <Icon icon="solar:danger-triangle-bold" className="text-sunset shrink-0" width={20} />
                                <div>
                                    <p className="text-[10px] font-bold text-sunset uppercase tracking-widest mb-1">ADVERTENCIA DEL SISTEMA</p>
                                    <p className="text-[10px] text-white/60 leading-relaxed">
                                        Maniobras de alta fuerza G y cambios de luz rápidos. Asegura todos los objetos sueltos.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </main>

{/* 4. VISUALIZACIÓN POV (Optimizado con VideoLite) */}
<section className="relative w-full border-t border-white/10 bg-black/40">
                <div className="container mx-auto px-6 md:px-12 max-w-7xl py-16">
                    
                    {/* Header... (Igual que antes) */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3 text-celeste">
                            <Icon icon="solar:videocamera-record-bold" width={24} />
                            <h3 className="text-sm font-bold tracking-[0.2em] uppercase font-mono">VISUALIZACIÓN POV INMERSIVA</h3>
                        </div>
                        
                        {/* BOTÓN EXTRA: VER EN YOUTUBE (Actualizado) */}
                        <div className="flex items-center gap-4">
                            <a 
                                href="https://www.youtube.com/watch?v=VmqMoKVau2Y"  // <--- LINK CORREGIDO
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hidden md:flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-white/50 hover:text-celeste transition-colors"
                            >
                                Abrir en App Externa <Icon icon="solar:arrow-right-up-linear" />
                            </a>
                        </div>
                    </div>

                    {/* COMPONENTE LIGERO (Carga instantánea) */}
                    {/* Solo pasas el ID: VmqMoKVau2Y */}
                    <VideoLite 
    videoId="VmqMoKVau2Y"  // <--- ID ACTUALIZADO (Link Verdadero)
    title="TRON Lightcycle Run - POV Oficial"
    coverImage="/images/tron_mk.jpg" 
/>
                    
                </div>
            </section>



            {/* 5. MÓDULO ESTRATEGIA Y COMUNIDAD */}
            <section className="container mx-auto px-6 md:px-12 max-w-7xl py-20 border-t border-white/10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    
                    {/* Tarjeta Estrategia */}
                    <div className="bg-celeste/5 border border-celeste/20 rounded-2xl p-8 relative overflow-hidden">
                        <div className="absolute -right-10 -top-10 text-celeste/5">
                            <Icon icon="solar:chess-pawn-bold" width={200} />
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                            <Icon icon="solar:lightbulb-bolt-bold" className="text-celeste"/>
                            MÓDULO DE ESTRATEGIA
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-celeste font-bold text-[10px] tracking-widest uppercase mb-2">SINERGIA NOCTURNA</h4>
                                <p className="text-xs text-white/70 leading-relaxed">
                                    Los niveles atmosféricos alcanzan su punto máximo tras el anochecer. El dosel de luces se sincroniza con el audio para un 140% de inmersión.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-celeste font-bold text-[10px] tracking-widest uppercase mb-2">LLAVES DIGITALES</h4>
                                <p className="text-xs text-white/70 leading-relaxed">
                                    Asegura tu entrada vía Fila Virtual (07:00 / 13:00) o despliega fondos ILL para acceso prioritario inmediato.
                                </p>
                            </div>
                        </div>

                        <button className="mt-8 w-full bg-celeste text-gunmetal py-3 rounded-lg font-bold text-xs tracking-widest uppercase hover:bg-white transition-colors">
                            DESCARGAR GUÍA ESTRATÉGICA (.PDF)
                        </button>
                    </div>

                    {/* Tarjeta Comunidad */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-end border-b border-white/10 pb-4">
                            <div>
                                <h3 className="text-[10px] font-bold text-white/50 tracking-[0.2em] uppercase">ANÁLISIS DE LA COMUNIDAD</h3>
                                <p className="text-3xl font-bold text-white">Satisfacción <span className="text-sunset">9.8/10</span></p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-white/50 uppercase">TOTAL AUDITORÍAS</p>
                                <p className="text-xl font-mono text-white">14,208</p>
                            </div>
                        </div>

                        {/* Review 1 */}
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-gunmetal border border-celeste/50 flex items-center justify-center shrink-0">
                                <span className="text-[9px] font-bold text-celeste">TR-01</span>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex-1">
                                <p className="text-xs italic text-white/80 font-light">
                                    "La mecánica de lanzamiento es superior a las montañas rusas de generación anterior. La integración digital con Vanguard es perfecta."
                                </p>
                                <div className="flex gap-1 mt-2 text-sunset">
                                    {[1,2,3,4,5].map(i => <Icon key={i} icon="solar:star-bold" width={12}/>)}
                                </div>
                            </div>
                        </div>

                        {/* Review 2 */}
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-gunmetal border border-white/20 flex items-center justify-center shrink-0">
                                <span className="text-[9px] font-bold text-white/50">TR-04</span>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex-1">
                                <p className="text-xs italic text-white/50 font-light">
                                    "La duración de la misión es más corta de lo esperado pero los niveles de intensidad están dentro de los parámetros nominales."
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
}