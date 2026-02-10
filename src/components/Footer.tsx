"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";

// ----------------------------------------------------------------------
// 🔴 CONFIGURACIÓN DE REDES SOCIALES
// Reemplaza las comillas vacías o los ejemplos con tus links reales.
// ----------------------------------------------------------------------
const SOCIAL_URLS = {
  twitter: "https://x.com/O247_ok",
  youtube: "https://youtube.com/@O247travelers",
  instagram: "https://www.instagram.com/o247_ok/" 
};

// ----------------------------------------------------------------------
// DATOS DE NAVEGACIÓN
// ----------------------------------------------------------------------
const FOOTER_LINKS = [
  {
    title: "Parques",
    links: [
      { label: "Magic Kingdom", href: "/disney/mk" },
      { label: "Epcot", href: "/disney/epcot" },
      { label: "Hollywood Studios", href: "/disney/hs" },
      { label: "Animal Kingdom", href: "/disney/ak" },
    ],
  },
  {
    title: "Herramientas",
    links: [
      { label: "Calendario de Multitudes", href: "/tools/crowd-calendar" },
      { label: "Calculadora Genie+", href: "/tools/genie-calc" },
      { label: "Alertas de Clima", href: "/tools/weather" },
      { label: "Mapas Interactivos", href: "/maps" },
    ],
  },
  {
    title: "Ingeniería",
    links: [
      { label: "Sobre O247", href: "/about" },
      { label: "La Lógica (Method)", href: "/methodology" },
      { label: "Changelog v1.2", href: "/changelog" },
      { label: "Contacto", href: "/contact" },
    ],
  },
];

// COMPONENTE DE ENLACE SOCIAL (Estilo Minimalista)
const SocialLink = ({ icon, href, label }: { icon: string; href: string; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative flex items-center gap-3 text-gunmetal/50 hover:text-sunset transition-colors duration-300 w-fit"
  >
    {/* Icono: Hereda color, sube un poco al hover */}
    <Icon icon={icon} className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
    
    <span className="text-sm font-medium hidden md:block">{label}</span>
    
    {/* Efecto Underline Trail (Animación) */}
    <span className="absolute -bottom-1 left-0 w-full h-px bg-sunset scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
  </a>
);

export default function Footer() {
  return (
    <footer className="relative z-10 bg-bone pt-10 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* --- MAIN CARD --- */}
        <div className="bg-white rounded-[32px] border border-gunmetal/5 shadow-averi p-8 md:p-12 overflow-hidden relative">
          
          {/* 1. TOP SECTION: Logo & Manifesto */}
          <div className="flex flex-col lg:flex-row justify-between items-start mb-12 lg:mb-20 gap-10">
            <div className="max-w-md">
              <Link href="/" className="flex items-center gap-2 mb-6 group w-fit">
                <div className="w-8 h-8 bg-gunmetal rounded-lg flex items-center justify-center text-white font-bold font-display text-xl group-hover:bg-sunset transition-colors duration-500">
                  O
                </div>
                <span className="font-display font-bold text-2xl text-gunmetal tracking-tight">
                  O247 <span className="text-gunmetal/30">Engineering</span>
                </span>
              </Link>
              <p className="type-body text-gunmetal/60 text-base md:text-lg leading-relaxed">
                Ingeniería aplicada a la magia. Transformamos el caos de la planificación en una arquitectura de viaje perfecta.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex-shrink-0 w-full lg:w-auto">
               <Link href="/plan" className="group relative inline-flex w-full lg:w-auto items-center justify-center px-8 py-4 bg-gunmetal rounded-2xl overflow-hidden transition-all hover:scale-[1.02] hover:shadow-lg">
                  <span className="relative z-10 font-bold text-white tracking-widest text-xs uppercase flex items-center gap-3">
                    Comenzar Planificación
                    <Icon icon="solar:arrow-right-up-linear" className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300"/>
                  </span>
                  {/* Gradiente sutil al hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-sunset to-sunset/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
               </Link>
            </div>
          </div>

          {/* 2. GRID LINKS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-4 mb-16 border-t border-gunmetal/5 pt-12">
            {FOOTER_LINKS.map((column, idx) => (
              <div key={idx} className="flex flex-col gap-5">
                <h4 className="type-tech text-[10px] text-gunmetal/30 uppercase tracking-widest font-bold">
                  {column.title}
                </h4>
                <div className="flex flex-col gap-3">
                    {column.links.map((link, i) => (
                    <Link 
                        key={i} 
                        href={link.href}
                        className="relative w-fit text-gunmetal/80 font-medium hover:text-sunset transition-colors duration-200 group text-sm md:text-base"
                    >
                        {link.label}
                        {/* Wavespace Underline Effect */}
                        <span className="absolute -bottom-0.5 left-0 w-full h-px bg-sunset scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </Link>
                    ))}
                </div>
              </div>
            ))}

            {/* Columna Extra: Social (Minimalista y Conectada) */}
            <div className="flex flex-col gap-6">
                <h4 className="type-tech text-[10px] text-gunmetal/30 uppercase tracking-widest font-bold">
                  Redes
                </h4>
                <div className="flex flex-col gap-4">
                    {/* Usamos iconos de línea 'ri' para limpieza visual */}
                    <SocialLink 
                        icon="ri:twitter-x-line" 
                        label="Twitter / X" 
                        href={SOCIAL_URLS.twitter} 
                    />
                    <SocialLink 
                        icon="ri:youtube-line" 
                        label="YouTube" 
                        href={SOCIAL_URLS.youtube} 
                    />
                    <SocialLink 
                        icon="ri:instagram-line" 
                        label="Instagram" 
                        href={SOCIAL_URLS.instagram} 
                    />
                </div>
            </div>
          </div>

          {/* 3. BOTTOM: Copyright & Status */}
          <div className="flex flex-col-reverse md:flex-row justify-between items-center pt-8 border-t border-gunmetal/5 gap-6">
            
            {/* Legal */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-[10px] font-bold text-gunmetal/30 font-mono uppercase tracking-wide">
                <span>© 2026 O247 ENGINEERING LLC.</span>
                <div className="flex gap-4">
                    <Link href="/privacy" className="hover:text-gunmetal transition-colors">Privacy</Link>
                    <Link href="/terms" className="hover:text-gunmetal transition-colors">Terms</Link>
                    <Link href="/sitemap" className="hover:text-gunmetal transition-colors">Sitemap</Link>
                </div>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-bone border border-gunmetal/5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="type-tech text-[9px] text-gunmetal/60 uppercase tracking-widest font-bold">
                    All Systems Operational
                </span>
            </div>
          </div>

          {/* Decoración de fondo sutil (Marca de agua) */}
          <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-gradient-to-tl from-sunset/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        </div>
      </div>
    </footer>
  );
}