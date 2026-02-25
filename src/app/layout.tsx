// @STATUS: GOLDEN MASTER V5 — Hide Navbar/Footer on attraction pages
import { NavbarProvider } from '@/context/NavbarContext';
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
import BackButton from "@/components/BackButton";
import { ModalProvider } from "@/context/ModalContext";
import ShellWrapper from "@/components/ShellWrapper";

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | O247",
    default: "O247 | Tu Viaje a Orlando, Estructurado",
  },
  description: "Plataforma de planificación estructurada para Disney World y Universal Studios Orlando. Información clara, organizada y sin ruido.",
  metadataBase: new URL("https://o247.com"),
  openGraph: {
    title: "O247 | Tu Viaje a Orlando, Estructurado",
    description: "Planificá tu viaje a Orlando con la información correcta. Disney World y Universal en un solo lugar.",
    url: "https://o247.com",
    siteName: "O247",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "O247 | Tu Viaje a Orlando, Estructurado",
    description: "Planificación estructurada para Disney World y Universal.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f7f7f5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${monoFont.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&display=swap" 
          rel="stylesheet" 
        />
        <link rel="preconnect" href="https://api.iconify.design" />
      </head>
      
      <body className="antialiased min-h-screen bg-bone text-gunmetal font-sans selection:bg-sunset selection:text-white">
        <ModalProvider>
          <CustomCursor />
          {/* ShellWrapper decide qué mostrar según la ruta */}
          <ShellWrapper>
            <NavbarProvider>{children}</NavbarProvider>
          </ShellWrapper>
          <CookieConsent />
        </ModalProvider>
      </body>
    </html>
  );
}