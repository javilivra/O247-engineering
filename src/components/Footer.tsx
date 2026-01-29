"use client";

import { ScrollReveal } from "./ScrollReveal";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image"; // Importamos el componente de imagen optimizada

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link 
    href={href} 
    // Reemplazo: hover:text-[#a7e26e] -> hover:text-sunset
    className="text-white/60 hover:text-sunset transition-colors duration-200 text-sm block py-1.5"
  >
    {children}
  </Link>
);

const FooterColumn = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-4">
    <h4 className="text-white font-medium text-sm tracking-wide font-display">{title}</h4>
    <div className="flex flex-col gap-1">
      {children}
    </div>
  </div>
);

export default function Footer() {
  return (
    // Reemplazo: bg-[#f7f7f5] -> bg-bone
    <footer className="bg-bone px-4 pb-6 pt-0">
      <ScrollReveal width="100%">
        
        {/* CAJA FLOTANTE */}
        {/* Reemplazo: bg-[#1a1a1a] -> bg-gunmetal */}
        {/* Reemplazo: shadow-[#1a1a1a]/10 -> shadow-gunmetal/10 */}
        <div className="bg-gunmetal rounded-[48px] text-white py-20 relative overflow-hidden shadow-2xl shadow-gunmetal/10">
          
          {/* CONTENEDOR DE ALINEACIÓN (max-w-7xl igual que navbar) */}
          <div className="max-w-7xl mx-auto px-6 w-full">

            {/* 1. BIG CTA CENTER */}
            <div className="flex flex-col items-center text-center mb-24 relative z-10">
              {/* Reemplazo: text-[#a7e26e] -> text-sunset */}
              {/* Reemplazo: border-[#a7e26e]/30 -> border-sunset/30 */}
              <span className="text-sunset text-xs font-mono uppercase tracking-widest mb-6 border border-sunset/30 px-3 py-1 rounded-full">
                Engineering your Experience
              </span>
              <h2 className="text-5xl md:text-8xl font-display font-medium tracking-tighter text-white mb-10">
                Optimiza tu Viaje
              </h2>
              {/* Reemplazo: text-[#1a1a1a] -> text-gunmetal */}
              {/* Reemplazo: hover:bg-[#a7e26e] -> hover:bg-sunset */}
              {/* Reemplazo: hover:text-[#1a1a1a] -> hover:text-gunmetal */}
              <button className="group bg-white text-gunmetal px-8 py-4 rounded-full text-base font-semibold inline-flex items-center gap-2 hover:bg-sunset hover:text-gunmetal hover:scale-105 transition-all duration-300">
                Comenzar Gratis
                <Icon 
                  icon="solar:arrow-right-linear" 
                  width="20" 
                  className="group-hover:translate-x-1 transition-transform" 
                />
              </button>
            </div>

            {/* 2. LINKS GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 border-t border-white/10 pt-16 pb-16">
              <FooterColumn title="Plataforma">
                <FooterLink href="#">O247 AI Core</FooterLink>
                <FooterLink href="#">Monitor de Filas</FooterLink>
                <FooterLink href="#">Alertas Dining</FooterLink>
                <FooterLink href="#">Precios</FooterLink>
              </FooterColumn>

              <FooterColumn title="Explorar">
                <FooterLink href="#">Disney World</FooterLink>
                <FooterLink href="#">Universal Studios</FooterLink>
                <FooterLink href="#">SeaWorld</FooterLink>
                <FooterLink href="#">Hoteles & Villas</FooterLink>
              </FooterColumn>

              <FooterColumn title="Recursos">
                <FooterLink href="#">Blog de Ingeniería</FooterLink>
                <FooterLink href="#">Crowd Calendar</FooterLink>
                <FooterLink href="#">Calculadora</FooterLink>
                <FooterLink href="#">Changelog</FooterLink>
              </FooterColumn>

              <FooterColumn title="Compañía">
                <FooterLink href="#">Sobre Nosotros</FooterLink>
                <FooterLink href="#">Manifiesto</FooterLink>
                <FooterLink href="#">Carreras</FooterLink>
                <FooterLink href="#">Contacto</FooterLink>
              </FooterColumn>
            </div>

            {/* 3. BOTTOM BAR (Rediseñada) */}
            <div className="border-t border-white/10 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                
                {/* SECCIÓN IZQUIERDA: O247 + STUDIO LIVIX */}
                <div className="flex flex-col gap-4">
                    {/* O247 Copyright */}
                    <div className="flex items-center gap-2 text-white/40 text-xs font-mono">
                       {/* Reemplazo: bg-[#a7e26e] -> bg-sunset */}
                       {/* Reemplazo: text-[#1a1a1a] -> text-gunmetal */}
                       <div className="w-5 h-5 bg-sunset rounded text-gunmetal flex items-center justify-center">
                          <Icon icon="solar:infinity-bold" width="12" />
                       </div>
                       <span className="text-white font-display font-bold text-lg tracking-tight">O247</span>
                       <span className="ml-2">© 2026 Engineering.</span>
                    </div>

                    {/* STUDIO LIVIX CREDIT (Pequeño y a la izquierda) */}
                    <div className="flex items-center gap-2 text-white/30 text-[10px] font-mono uppercase tracking-wider pl-1">
                        <span>Powered by</span>
                        {/* Asegúrate de que la imagen esté en /public/images/studiolivix-logo.png */}
                        <Image 
                          src="/images/studiolivix-logo.png"
                          alt="Studio Livix"
                          width={70} // Tamaño pequeño controlado
                          height={25}
                          className="opacity-50 hover:opacity-100 transition-opacity duration-300"
                        />
                    </div>
                </div>
                
                {/* SECCIÓN DERECHA: Legal Links */}
                <div className="flex gap-6 text-white/40 text-xs font-mono">
                  {/* Reemplazo: hover:text-[#a7e26e] -> hover:text-sunset */}
                  <Link href="#" className="hover:text-sunset transition-colors">Términos & Condiciones</Link>
                  {/* Reemplazo: hover:text-[#a7e26e] -> hover:text-sunset */}
                  <Link href="#" className="hover:text-sunset transition-colors">Privacidad & Seguridad</Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}