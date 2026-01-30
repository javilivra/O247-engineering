import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HeroScrollWrapper from "@/components/HeroScrollWrapper"; 
import StatsTicker from "@/components/StatsTicker";
import Workflow from "@/components/Workflow";
import BentoGrid from "@/components/BentoGrid";
import Footer from "@/components/Footer"; // Mantenemos tu Footer si lo deseas, o usa el integrado en Subscribe
import TravelerSelector from "@/components/TravelerSelector";
import FAQ from "@/components/FAQ";           // <--- NUEVO IMPORT
import Subscribe from "@/components/Subscribe"; // <--- NUEVO IMPORT
import CookieConsent from "@/components/CookieConsent"; // <--- NUEVO IMPORT

export default function Home() {
  return (
    // Color de fondo base y selección alineada a la marca
    <main className="bg-[#f7f7f5] min-h-screen w-full selection:bg-[#a7e26e] selection:text-black font-sans">
      
      {/* 1. ZONA SUPERIOR (Navbar & Hero con Scroll) */}
      <Navbar />

      <HeroScrollWrapper>
         <Hero />
      </HeroScrollWrapper>

      {/* 2. ZONA DE CONTENIDO */}
      <div className="relative w-full">
        
        {/* Capa de fondo con trama de puntos (sutil en secciones claras) */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-dot-pattern opacity-[0.35]" />

        <div className="relative z-10">
          
          {/* A. TICKER (Conexión visual con el Hero) */}
          <StatsTicker />

          {/* B. PREGUNTA CLAVE (Post-Hero Inmediato) */}
          <TravelerSelector />

          {/* C. EXPLICACIÓN (Cómo funciona) */}
          <Workflow />
          
          {/* D. CARACTERÍSTICAS (Bento Grid) */}
          <BentoGrid />
          
          {/* E. PREGUNTAS FRECUENTES (Nuevo - Scroll Target) */}
          <FAQ />
          
          {/* F. SUSCRIPCIÓN Y CIERRE (Nuevo) */}
          <Subscribe />
          
        </div>

      </div>

      {/* 3. ZONA INFERIOR */}
      {/* Nota: Subscribe ya incluye un footer minimalista. Si prefieres tu Footer original, déjalo aquí.
          Si quieres usar el de Subscribe, puedes comentar la línea de abajo. */}
      {/* <Footer /> */} 

      {/* 4. CONSENTIMIENTO FLOTANTE */}
      <CookieConsent />

    </main>
  );
}