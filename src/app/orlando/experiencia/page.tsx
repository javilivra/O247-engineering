
import { Icon } from '@/components/Icon';
import Link from 'next/link';

export default function ExperienciaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="type-display text-4xl sm:text-5xl font-bold text-gunmetal">Más Allá de los Parques</h1>
        <p className="mt-4 text-lg max-w-3xl mx-auto text-gunmetal/80">
          Orlando no es solo montañas rusas. Hay un mundo de entretenimiento, gastronomía y compras por descubrir.
        </p>
      </div>

      <div className="prose prose-lg max-w-none prose-headings:text-gunmetal prose-headings:font-bold prose-a:text-celeste">
        
        <h2>Los Centros de Entretenimiento: Comida, Compras y Shows</h2>
        <p>Tanto Disney como Universal tienen sus propios distritos de entretenimiento con entrada gratuita. Son lugares ideales para visitar en tus días de descanso o después de un día de parque.</p>

        <div className="grid md:grid-cols-2 gap-8 my-10 not-prose">
          <div className="bg-white border-l-4 border-blue-500 p-6 shadow-sm rounded-r-lg">
            <div className="flex items-center gap-3 mb-3">
              <Icon icon="solar:store-2-bold-duotone" width={28} className="text-blue-600" />
              <h3 className="font-bold text-xl m-0 text-blue-800">Disney Springs</h3>
            </div>
            <p className="text-base text-gunmetal/80">Un enorme complejo al aire libre con tiendas únicas (como la tienda de Lego y la Coca-Cola), restaurantes de chefs famosos y shows en vivo. El estacionamiento es gratuito.</p>
             <ul className="text-base mt-4 space-y-2 text-blue-900">
              <li><strong className="font-bold">No te pierdas:</strong> World of Disney (la tienda Disney más grande del mundo), Gideon's Bakehouse (galletitas legendarias con filas de horas) y el show del Cirque du Soleil.</li>
            </ul>
          </div>
          <div className="bg-white border-l-4 border-orange-500 p-6 shadow-sm rounded-r-lg">
            <div className="flex items-center gap-3 mb-3">
              <Icon icon="solar:guitar-bold-duotone" width={28} className="text-orange-600" />
              <h3 className="font-bold text-xl m-0 text-orange-800">Universal CityWalk</h3>
            </div>
            <p className="text-base text-gunmetal/80">Más compacto y con una energía más de "fiesta". Conecta los dos parques temáticos de Universal. Ideal para cenar después del parque. El estacionamiento es gratuito después de las 6 PM.</p>
             <ul className="text-base mt-4 space-y-2 text-orange-900">
              <li><strong className="font-bold">No te pierdas:</strong> Voodoo Doughnut (donas excéntricas), The Toothsome Chocolate Emporium y el mini-golf de terror y ciencia ficción.</li>
            </ul>
          </div>
        </div>

        <h2>Paraíso de las Compras: Outlets y Malls</h2>
        <p>Orlando es un destino de compras reconocido mundialmente. Vas a encontrar precios significativamente más bajos que en muchos otros países, especialmente en marcas americanas.</p>

        <ul>
            <li><strong className="font-bold">Orlando Vineland Premium Outlets:</strong> Más cerca de la zona de Disney. Tiene un enfoque un poco más "premium" o de alta gama.</li>
            <li><strong className="font-bold">Orlando International Premium Outlets:</strong> Cerca del norte de International Drive. Es enorme y tiene una gran variedad de tiendas.</li>
            <li><strong className="font-bold">The Mall at Millenia:</strong> Un mall de lujo. Si buscás marcas como Apple, Chanel o Gucci, este es tu lugar.</li>
        </ul>

        <blockquote>
          <p>Para una guía de compras mucho más detallada, con estrategias, calculadora de conveniencia y análisis de zonas, visitá nuestra sección especializada:</p>
           <div className="mt-4">
             <Link href="/shoppinear" className="no-underline text-sm font-bold">→ Guía Completa de Compras en Orlando</Link>
          </div>
        </blockquote>

      </div>
    </div>
  );
}
