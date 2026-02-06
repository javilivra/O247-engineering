// @STATUS: GOLDEN MASTER V2.1 - GLOBAL LAYOUT WITH STEPPER & BREADCRUMBS
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google"; 
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";
import SmoothScroll from "@/components/SmoothScroll"; 
import Navbar from "@/components/Navbar"; 
import VerticalStepper from "@/components/VerticalStepper"; 
import GlobalBreadcrumbs from "@/components/GlobalBreadcrumbs"; // <--- 1. IMPORTAR

const techMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ORLANDO 247 La felicidad de viajar a Disney",
  description: "Advanced Travel Systems for Orlando Theme Parks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${techMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&display=swap" 
          rel="stylesheet" 
        />
      </head>
      
      <body 
        className="antialiased min-h-screen bg-[#f7f7f5] text-[#1a1a1a]"
        suppressHydrationWarning={true}
      >
        {/* ELEMENTOS FIJOS GLOBALES (UI SHELL) */}
        
        <Navbar />
        
        {/* 2. STEPPER GLOBAL: Se mantiene fijo sobre toda la app */}
        <VerticalStepper />

        {/* CONTENIDO SCROLLEABLE */}
        <SmoothScroll>
           {/* 3. BREADCRUMBS: Flotando sobre el contenido (Hero) */}
           <GlobalBreadcrumbs />
           
           {children}
        </SmoothScroll>

        {/* MODALES Y TOASTS */}
        <CookieConsent />
      </body>
    </html>
  );
}