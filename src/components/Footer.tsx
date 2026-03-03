"use client";

import React from "react";
import Link from "next/link";
import SupportButton from "@/components/SupportButton";

const SOCIAL_URLS = {
  twitter:   "https://x.com/O247_ok",
  youtube:   "https://youtube.com/@O247travelers",
  instagram: "https://www.instagram.com/o247_ok/",
};

const FOOTER_LINKS = [
  {
    title: "Disney",
    links: [
      { label: "Magic Kingdom",     href: "/disney/mk"    },
      { label: "Epcot",             href: "/disney/epcot" },
      { label: "Hollywood Studios", href: "/disney/hs"    },
      { label: "Animal Kingdom",    href: "/disney/ak"    },
    ],
  },
  {
    title: "Universal",
    links: [
      { label: "Islands of Adventure", href: "/universal/ioa"  },
      { label: "Universal Studios",    href: "/universal/us"   },
      { label: "Epic Universe",        href: "/universal/epic" },
    ],
  },
  {
    title: "Herramientas",
    links: [
      { label: "Mapping Anual", href: "/tools/mapping-anual" },
      { label: "Clima Orlando", href: "/tools/weather"       },
    ],
  },
];

function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.733-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function IconYouTube({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  );
}

function SocialLink({
  icon: IconComponent,
  href,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center gap-3 text-gunmetal/50 hover:text-sunset transition-colors duration-300 w-fit"
    >
      <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
      <span className="text-sm font-medium hidden md:block">{label}</span>
      <span className="absolute -bottom-1 left-0 w-full h-px bg-sunset scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="relative z-10 bg-bone pt-10 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="bg-white rounded-[32px] border border-gunmetal/5 shadow-averi p-8 md:p-12 overflow-hidden relative">

          {/* 1. TOP: Logo + Apoyar */}
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
            <div className="flex-shrink-0 w-full lg:w-auto flex lg:items-start">
              <SupportButton variant="hero" label="Apoyar O247" />
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
                      <span className="absolute -bottom-0.5 left-0 w-full h-px bg-sunset scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Redes */}
            <div className="flex flex-col gap-6">
              <h4 className="type-tech text-[10px] text-gunmetal/30 uppercase tracking-widest font-bold">
                Redes
              </h4>
              <div className="flex flex-col gap-4">
                <SocialLink icon={IconX}         label="Twitter / X" href={SOCIAL_URLS.twitter}   />
                <SocialLink icon={IconYouTube}   label="YouTube"     href={SOCIAL_URLS.youtube}   />
                <SocialLink icon={IconInstagram} label="Instagram"   href={SOCIAL_URLS.instagram} />
              </div>
            </div>
          </div>

          {/* 3. BOTTOM BAR */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gunmetal/5 gap-5">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-[10px] font-bold text-gunmetal/30 font-mono uppercase tracking-wide">
              <span>© 2026 O247 Engineering</span>
              <div className="flex gap-4">
                <Link href="/privacy" className="hover:text-gunmetal transition-colors">Privacy</Link>
                <Link href="/terms"   className="hover:text-gunmetal transition-colors">Terms</Link>
              </div>
            </div>
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-bone border border-gunmetal/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="type-tech text-[9px] text-gunmetal/60 uppercase tracking-widest font-bold">
                All Systems Operational
              </span>
            </div>
          </div>

          {/* Decoración */}
          <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-gradient-to-tl from-sunset/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        </div>
      </div>
    </footer>
  );
}