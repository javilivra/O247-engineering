// @STATUS: V4.0 - HOME REDESIGN + CUSTOM CURSOR
import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google"; 
import "./globals.css";

// COMPONENTES GLOBALES
import CookieConsent from "@/components/CookieConsent";
import SmoothScroll from "@/components/SmoothScroll"; 
import Navbar from "@/components/Navbar"; 
import GlobalBreadcrumbs from "@/components/GlobalBreadcrumbs";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { ModalProvider } from "@/context/ModalContext";

// 1. CONFIGURACIÓN DE FUENTES
const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// 2. METADATA SEO (Alineada a brand voice O247 — sin jerga técnica)
export const metadata: Metadata = {
  title: {
    template: "%s | O247",
    default: "O247 | Planificá tu viaje a Orlando con claridad",
  },
  description: "La guía estructurada en español para Disney World y Universal Studios. Menos caos, mejores decisiones, más tiempo para disfrutar.",
  metadataBase: new URL("https://o247.com"),
  openGraph: {
    title: "O247 | Planificá tu viaje a Orlando con claridad",
    description: "Toda la información que necesitás para entender Orlando antes de reservar. Guías detalladas, criterio real y sin presión de venta.",
    url: "https://o247.com",
    siteName: "O247",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "O247 | Planificá tu viaje a Orlando con claridad",
    description: "Guías estructuradas para Disney World y Universal Studios en español.",
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
    <html lang="es" className={`${monoFont.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&display=swap" 
          rel="stylesheet" 
        />
      </head>
      
      <body 
        className="antialiased min-h-screen bg-bone text-gunmetal font-sans selection:bg-sunset selection:text-white"
      >
        <ModalProvider>
          {/* Custom Cursor — solo desktop, oculto en touch devices */}
          <CustomCursor />
          
          {/* UI SHELL GLOBAL */}
          <Navbar />
          <SmoothScroll>
             <GlobalBreadcrumbs />
             {children}
          </SmoothScroll>
          <CookieConsent />
          <Footer />
        </ModalProvider>
      </body>
    </html>
  );
}