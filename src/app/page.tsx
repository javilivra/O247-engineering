import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HeroScrollWrapper from "@/components/HeroScrollWrapper"; 
import StatsTicker from "@/components/StatsTicker";
import Workflow from "@/components/Workflow";
import BentoGrid from "@/components/BentoGrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#f7f7f5] min-h-screen w-full selection:bg-[#a7e26e] selection:text-black font-sans">
      
      {/* 1. ZONA SUPERIOR (Intacta) */}
      <Navbar />

      <HeroScrollWrapper>
         <Hero />
      </HeroScrollWrapper>

      {/* 2. ZONA DE INGENIERÍA (Estilo Averi) */}
      {/* Envolvemos estas 3 secciones para que compartan el fondo técnico */}
      <div className="relative w-full">
        
        {/* CAPA DE FONDO: Trama de puntos técnica (Style: Engineering) */}
        {/* Nota: Asegúrate de haber pegado la clase .bg-dot-pattern en tu globals.css */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-dot-pattern opacity-[0.35]" />

        {/* CONTENIDO: Flotando sobre la trama */}
        <div className="relative z-10">
          <StatsTicker />
          <Workflow />
          <BentoGrid />
        </div>

      </div>

      {/* 3. ZONA INFERIOR */}
      <Footer />

    </main>
  );
}