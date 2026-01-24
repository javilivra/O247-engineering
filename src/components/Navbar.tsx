
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HamburgerMenu, CloseCircle } from '@solar-icons/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Detectar scroll para efecto de "sombra"
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#f7f7f5]/90 backdrop-blur-md border-b border-gray-200 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO */}
        <div className="text-2xl font-bold tracking-tighter text-[#1a1a1a]">
          O247
        </div>

        {/* MENÚ DE ESCRITORIO (Desktop) */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link href="/planning" className="text-xs font-bold tracking-widest text-[#4a4a4a] hover:text-[#a7e26e] uppercase transition-colors">
            Planning
          </Link>
          <Link href="/disney" className="text-xs font-bold tracking-widest text-[#4a4a4a] hover:text-[#a7e26e] uppercase transition-colors">
            Disney World
          </Link>
          <Link href="/universal" className="text-xs font-bold tracking-widest text-[#4a4a4a] hover:text-[#a7e26e] uppercase transition-colors">
            Universal
          </Link>
          <Link href="/vanguard" className="bg-[#1a1a1a] text-white px-5 py-2 rounded-full text-xs font-bold tracking-widest hover:bg-[#a7e26e] hover:text-[#1a1a1a] transition-all uppercase flex items-center gap-2">
            ✦ Vanguard
          </Link>
        </div>

        {/* BOTÓN MENÚ MÓVIL (Mobile) */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-[#1a1a1a] focus:outline-none transition-transform active:scale-95"
          >
            {isMounted && (isOpen ? (
              <CloseCircle size={32} color="#1a1a1a" />
            ) : (
              <HamburgerMenu size={32} color="#1a1a1a" />
            ))}
          </button>
        </div>
      </div>

      {/* MENÚ DESPLEGABLE MÓVIL */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#f7f7f5] border-b border-gray-200 shadow-xl flex flex-col items-center py-8 space-y-6">
          <Link href="/planning" className="text-sm font-bold tracking-widest text-[#1a1a1a] uppercase" onClick={() => setIsOpen(false)}>
            Planning
          </Link>
          <Link href="/disney" className="text-sm font-bold tracking-widest text-[#1a1a1a] uppercase" onClick={() => setIsOpen(false)}>
            Disney World
          </Link>
          <Link href="/universal" className="text-sm font-bold tracking-widest text-[#1a1a1a] uppercase" onClick={() => setIsOpen(false)}>
            Universal
          </Link>
          <Link href="/vanguard" className="text-sm font-bold tracking-widest text-[#a7e26e] uppercase" onClick={() => setIsOpen(false)}>
            ✦ Vanguard Mode
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
