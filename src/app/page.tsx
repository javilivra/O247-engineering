import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HeroScrollWrapper from "@/components/HeroScrollWrapper"; 
import StatsTicker from "@/components/StatsTicker";
import Workflow from "@/components/Workflow";
import BentoGrid from "@/components/BentoGrid";
import Footer from "@/components/Footer";
import TravelerSelector from "@/components/TravelerSelector";

export default function Home() {
  return (
    <main className="bg-[#f7f7f5] min-h-screen w-full selection:bg-[#a7e26e] selection:text-black font-sans">
      
      {/* 1. ZONA SUPERIOR (Intacta) */}
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
          {/* Aquí capturamos la intención del usuario apenas hace scroll */}
          <TravelerSelector />

          {/* C. EXPLICACIÓN (Cómo funciona) */}
          <Workflow />
          
          {/* D. CARACTERÍSTICAS (Bento Grid) */}
          <BentoGrid />
          
        </div>

      </div>

      {/* 3. ZONA INFERIOR */}
      <Footer />

    </main>
  );
}