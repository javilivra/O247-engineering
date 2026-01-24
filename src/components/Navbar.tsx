'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 pointer-events-none flex justify-center pt-5 transition-all duration-500 ${isScrolled ? 'header-scrolled' : ''}`}>
      
      {/* CÁPSULA PRINCIPAL */}
      <div 
        id="navbar-pill"
        className={`pointer-events-auto relative flex items-center justify-between p-1.5 
        bg-white/85 backdrop-blur-md rounded-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white/40 
        transition-all duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]
        ${isScrolled ? 'bg-transparent backdrop-blur-none shadow-none border-transparent w-[96%]' : 'w-[92%] max-w-[1400px]'}`}
      >

        {/* 1. CONTENEDOR LOGO */}
        <div className={`relative z-20 flex items-center justify-center rounded-[12px] px-6 transition-all duration-[600ms] 
          ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg border border-white/40 h-14 py-2' : ''}`}>
          <Link href="/" className="font-sans font-black text-2xl tracking-tighter text-[#222f30] hover:scale-105 transition-transform">
            O247
          </Link>
        </div>

        {/* 2. BARRA DE BÚSQUEDA (MECANISMO ORIGINAL STITCH) */}
        <div className={`absolute left-[108px] top-1/2 -translate-y-1/2 z-10 w-full max-w-[340px] origin-left transition-all duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isScrolled ? 'opacity-100 scale-100 pointer-events-auto delay-200' : 'opacity-0 scale-90 pointer-events-none delay-0'}`}>
          <div className="flex items-center w-full h-12 bg-white/95 backdrop-blur-md rounded-[16px] border border-gray-100 shadow-lg px-4">
            <span className="material-symbols-outlined text-gray-400 mr-3 text-lg">🔍</span>
            <input className="w-full bg-transparent border-none focus:outline-none text-[#222f30] placeholder-gray-400 text-sm font-medium" placeholder="Busca hoteles, parques..." type="text"/>
          </div>
        </div>

        {/* 3. PUENTE DE LUZ */}
        <div className="light-bridge"></div>

        {/* 4. CONTENEDOR DERECHO (NAV + VANGUARD) */}
        <div className={`relative z-20 flex items-center gap-2 pr-1 rounded-[12px] transition-all duration-[600ms] 
          ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg border border-white/40 h-14 pl-6 pr-2 py-2' : ''}`}>
          
          <nav className="hidden lg:flex items-center mr-4 gap-1">
            {['PLANNING', 'DISNEY WORLD', 'UNIVERSAL'].map((item) => (
              <Link key={item} href="#" className="relative px-4 py-2 text-xs font-bold font-sans text-[#222f30] hover:text-black transition-colors uppercase tracking-wide group">
                {item}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#a7e26e] rounded-full transition-all duration-300 group-hover:w-4/5"></span>
              </Link>
            ))}
          </nav>

          {/* Botón Vanguard Original */}
          <button className="vanguard-btn group">
            <div className="v-particles"></div>
            <div className="flex items-center justify-center w-4 h-4">
              <svg className="w-4 h-4 fill-[#e5e5e5] group-hover:fill-[#A7E26E] transition-colors" viewBox="0 0 24 24"><path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"/></svg>
            </div>
            <div className="v-text-container">
              <div className="v-txt txt-1">VANGUARD</div>
              <div className="v-txt txt-2">
                <span>I</span><span>N</span><span>I</span><span>T</span>
              </div>
            </div>
          </button>
        </div>

      </div>
    </header>
  );
}