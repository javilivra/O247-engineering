// @STATUS: GOLDEN MASTER V3.1 - INFRASTRUCTURE FIX (Google Sans Flex Version)
import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google"; 
import "./globals.css";

// COMPONENTES GLOBALES
import CookieConsent from "@/components/CookieConsent";
import SmoothScroll from "@/components/SmoothScroll"; 
import Navbar from "@/components/Navbar"; 
import GlobalBreadcrumbs from "@/components/GlobalBreadcrumbs";

// 1. CONFIGURACIÓN DE FUENTES
// Mantenemos JetBrains Mono optimizada con next/font
const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono", // Variable semántica corregida
  display: "swap",
});

// 2. METADATA SEO COMPLETA (F27 - Hallazgo de Auditoría)
export const metadata: Metadata = {
  title: {
    template: "%s | O247",
    default: "O247 | Ingeniería de Viajes a Orlando",
  },
  description: "Plataforma de planificación estratégica para Disney World y Universal Studios. Algoritmos de optimización, guías tácticas y herramientas de ahorro.",
  metadataBase: new URL("https://o247.com"), // Cambiar por tu dominio real cuando lo tengas
  openGraph: {
    title: "O247 | Ingeniería de Viajes a Orlando",
    description: "Maximiza tu viaje a Disney y Universal con ingeniería aplicada. Menos filas, más magia.",
    url: "https://o247.com",
    siteName: "O247 Engineering",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "O247 | Ingeniería de Viajes a Orlando",
    description: "Planificación táctica para parques temáticos.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1a1a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // F12: Idioma corregido a español
    <html lang="es" className={`${monoFont.variable}`}>
      <head>
        {/* F05: Mantenemos tu fuente Google Sans Flex original */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&display=swap" 
          rel="stylesheet" 
        />
      </head>
      
      <body 
        // Usamos bg-bone y text-gunmetal (tokens del sistema) en lugar de hexcodes hardcodeados
        className="antialiased min-h-screen bg-bone text-gunmetal font-sans selection:bg-sunset selection:text-white"
        // F12: Eliminamos la supresión de errores para asegurar calidad de código
      >
        {/* UI SHELL GLOBAL */}
        <Navbar />
        <SmoothScroll>
           <GlobalBreadcrumbs />
           {children}
        </SmoothScroll>

        <CookieConsent />
      </body>
    </html>
  );
}