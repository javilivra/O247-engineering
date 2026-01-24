import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f7f5] flex flex-col">
      <Navbar />
      <Hero />
    </main>
  );
}