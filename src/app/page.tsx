import Hero from "@/components/Hero";
import HeroScrollWrapper from "@/components/HeroScrollWrapper";
import FounderStory from "@/components/FounderStory";
import MiniSurvey from "@/components/MiniSurvey";
import MethodO247 from "@/components/MethodO247";
import Differentiators from "@/components/Differentiators";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <main className="bg-bone min-h-screen w-full selection:bg-sunset selection:text-white font-sans">

      <HeroScrollWrapper>
        <Hero />
      </HeroScrollWrapper>

      <div className="relative w-full">
        <div className="absolute inset-0 z-0 pointer-events-none bg-dot-pattern opacity-[0.35]" />

        <div className="relative z-10">
          {/* 1. Origen — no se toca */}
          <FounderStory />

          {/* 2. Personalización simbólica — "Tu caso importa" */}
          <MiniSurvey />

          {/* 3. El puente — Cómo pensamos */}
          <MethodO247 />

          {/* 4. Credibilidad — Principios, no features */}
          <Differentiators />

          {/* 5. Cierre — Eliminar fricción final */}
          <FAQ />
        </div>
      </div>

    </main>
  );
}