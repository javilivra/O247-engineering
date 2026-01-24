import Link from 'next/link';

export default function Home() {
  return (
    <main className="pt-24 flex flex-col items-center w-full min-h-screen bg-background-light selection:bg-primary selection:text-charcoal overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative w-full max-w-[1280px] px-6 py-20 lg:py-32 flex flex-col items-center text-center">
        
        {/* Glow de Fondo */}
        <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-primary/40 to-transparent rounded-full blur-[100px]"></div>
        </div>

        {/* Badge Superior */}
        <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-[#5a7a3a] text-xs font-bold tracking-wider mb-6 border border-primary/20 font-display uppercase">
          Ingeniería de Memorias
        </span>

        {/* Título Principal */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-charcoal leading-[1.1] tracking-tight mb-6 max-w-5xl font-display w-full">
          La ingeniería detrás de <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-600">
            tu próxima memoria
          </span>
        </h1>

        {/* Bajada / Subtítulo */}
        <p className="text-lg text-charcoal/60 max-w-2xl mb-10 font-medium font-body">
          Optimización. Sincronización. Memoria. Experimenta la precisión donde la magia y la tecnología convergen para crear el itinerario perfecto.
        </p>

        {/* Barra de Búsqueda Hero (Estática) */}
        <div className="w-full max-w-4xl transition-all duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] origin-top hover:scale-[1.01]">
          <div className="flex flex-row items-center p-1.5 bg-white rounded-[16px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">
            <div className="flex-1 flex items-center px-6 h-14 md:h-16">
              <span className="text-charcoal/40 mr-4 material-symbols-outlined">search</span>
              <div className="flex-1 relative flex items-center">
                <input 
                  className="w-full h-full bg-transparent border-none focus:outline-none text-charcoal placeholder-charcoal/40 text-base font-medium font-body" 
                  placeholder="¿Cuántos días necesito para los parques?" 
                  type="text"
                />
              </div>
            </div>
            <button className="h-14 md:h-16 px-8 md:px-10 text-white font-bold text-sm hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 font-display tracking-widest shadow-lg shadow-primary/20 shrink-0 uppercase rounded-full bg-[#222f30] relative overflow-hidden group">
              <span className="relative z-10">INICIAR</span>
              {/* Gradiente sutil en hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

      </section>

      {/* --- SECCIÓN DISNEY (Ejemplo Visual) --- */}
      <section id="disney" className="w-full max-w-[1280px] px-6 py-16 grid lg:grid-cols-2 gap-16 items-center">
        {/* Imagen / Card */}
        <div className="order-2 lg:order-1 relative group/card perspective-1000">
           <div className="absolute -left-10 -top-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
           <div className="relative h-[400px] w-full bg-white/50 backdrop-blur-sm border border-white/60 rounded-3xl flex items-center justify-center shadow-xl">
              <p className="text-charcoal/30 font-bold uppercase tracking-widest">Visualización 3D</p>
           </div>
        </div>

        {/* Texto */}
        <div className="order-1 lg:order-2 flex flex-col justify-center space-y-6">
          <div className="flex items-center gap-2 text-charcoal/60 font-bold uppercase tracking-wider text-sm font-display">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Disney World
          </div>
          <h2 className="text-4xl font-extrabold text-charcoal font-display">Ingeniería de la Magia</h2>
          <p className="text-lg text-charcoal/70 leading-relaxed font-body">
            Experimenta la estética del glassmorphism guiada por los clásicos. Hemos deconstruido la experiencia del parque para optimizar tu coeficiente de alegría.
          </p>
        </div>
      </section>

    </main>
  );
}