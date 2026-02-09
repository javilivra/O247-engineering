import Hero from "@/components/Hero";
import HeroScrollWrapper from "@/components/HeroScrollWrapper";
import StatsTicker from "@/components/StatsTicker";
import Workflow from "@/components/Workflow";
import BentoGrid from "@/components/BentoGrid";
import TravelerSelector from "@/components/TravelerSelector";
import FAQ from "@/components/FAQ";
import Subscribe from "@/components/Subscribe";

export default function Home() {
  return (
    <main className="bg-bone min-h-screen w-full selection:bg-sunset selection:text-white font-sans">

      <HeroScrollWrapper>
        <Hero />
      </HeroScrollWrapper>

      <div className="relative w-full">
        <div className="absolute inset-0 z-0 pointer-events-none bg-dot-pattern opacity-[0.35]" />

        <div className="relative z-10">
          <StatsTicker />
          <TravelerSelector />
          <Workflow />
          <BentoGrid />
          <FAQ />
          <Subscribe />
        </div>
      </div>

    </main>
  );
}