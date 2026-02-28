
import { Icon } from '@/components/Icon';
import Image from 'next/image';
import Link from 'next/link';

export default function DondeDormirPage() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-celeste/10 text-celeste font-semibold px-3 py-1 rounded-full text-sm mb-4">
              <Icon icon="solar:bed-bold-duotone" width={20} />
              Paso 3
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gunmetal !leading-tight">
            Dónde Dormir: Dentro vs. Fuera de los Parques
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Tu elección de alojamiento es una de las decisiones más importantes. Analizamos las ventajas y desventajas de quedarte en un hotel oficial versus uno externo.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold text-gunmetal mb-4 flex items-center gap-3">
              <Icon icon="solar:castle-bold-duotone" width={28} className="text-celeste" />
              Hoteles Dentro del Resort (Disney & Universal)
            </h2>
            <p className="text-gray-600 mb-4">
              Alojarse "en la burbuja" significa sumergirse en la magia las 24 horas del día. Es la opción más cómoda, especialmente para familias con niños pequeños.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2"><Icon icon="solar:like-bold"/> Ventajas</h3>
                <ul className="space-y-2 text-green-700">
                  <li className="flex items-start gap-2"><Icon icon="solar:check-circle-bold" className="mt-1 shrink-0"/><b>Early Park Entry:</b> Entrás a los parques 30 minutos antes que el resto. ¡Clave para atracciones populares!</li>
                  <li className="flex items-start gap-2"><Icon icon="solar:check-circle-bold" className="mt-1 shrink-0"/><b>Transporte Gratuito:</b> Una red de buses, botes y el Skyliner te conectan con todo sin costo.</li>
                  <li className="flex items-start gap-2"><Icon icon="solar:check-circle-bold" className="mt-1 shrink-0"/><b>Inmersión Temática:</b> Los hoteles son una extensión de la magia de los parques.</li>
                  <li className="flex items-start gap-2"><Icon icon="solar:check-circle-bold" className="mt-1 shrink-0"/><b>Compras Directo al Hotel:</b> Tus compras en los parques pueden ser enviadas a tu habitación.</li>
                </ul>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-bold text-red-800 mb-2 flex items-center gap-2"><Icon icon="solar:dislike-bold"/> Desventajas</h3>
                <ul className="space-y-2 text-red-700">
                  <li className="flex items-start gap-2"><Icon icon="solar:close-circle-bold" className="mt-1 shrink-0"/><b>Costo Elevado:</b> Suelen ser significativamente más caros que opciones externas.</li>
                  <li className="flex items-start gap-2"><Icon icon="solar-close-circle-bold" className="mt-1 shrink-0"/><b>Habitaciones Pequeñas:</b> Especialmente en los hoteles de categoría "Value" (económicos).</li>
                  <li className="flex items-start gap-2"><Icon icon="solar-close-circle-bold" className="mt-1 shrink-0"/><b>Comida de Resort:</b> Estás más limitado a las opciones de comida de Disney, que son más caras.</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="border-t border-gray-200"></div>

          <section>
            <h2 className="text-2xl font-bold text-gunmetal mb-4 flex items-center gap-3">
              <Icon icon="solar:buildings-3-bold-duotone" width={28} className="text-celeste" />
              Hoteles Fuera del Resort (Externos)
            </h2>
            <p className="text-gray-600 mb-4">
              Alojarse fuera te da más flexibilidad, espacio y usualmente un mejor precio. Es ideal si planeas alquilar un auto y explorar más allá de los parques temáticos.
            </p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2"><Icon icon="solar:like-bold"/> Ventajas</h3>
                <ul className="space-y-2 text-green-700">
                  <li className="flex items-start gap-2"><Icon icon="solar:check-circle-bold" className="mt-1 shrink-0"/><b>Mejor Relación Precio/Calidad:</b> Obtenés más espacio y mejores servicios por tu dinero.</li>
                  <li className="flex items-start gap-2"><Icon icon="solar:check-circle-bold" className="mt-1 shrink-0"/><b>Más Espacio:</b> Fácil de encontrar suites o departamentos con cocina, ideal para familias.</li>
                  <li className="flex items-start gap-2"><Icon icon="solar:check-circle-bold" className="mt-1 shrink-0"/><b>Variedad de Comida:</b> Acceso a cientos de restaurantes y supermercados.</li>
                  <li className="flex items-start gap-2"><Icon icon="solar:check-circle-bold" className="mt-1 shrink-0"/><b>Flexibilidad:</b> Perfecto para visitar otros parques (SeaWorld, Busch Gardens) o ir de compras.</li>
                </ul>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-bold text-red-800 mb-2 flex items-center gap-2"><Icon icon="solar:dislike-bold"/> Desventajas</h3>
                <ul className="space-y-2 text-red-700">
                  <li className="flex items-start gap-2"><Icon icon="solar:close-circle-bold" className="mt-1 shrink-0"/><b>Necesitas Auto:</b> El alquiler, seguro, peajes y estacionamiento suman costos.</li>
                  <li className="flex items-start gap-2"><Icon icon="solar:close-circle-bold" className="mt-1 shrink-0"/><b>Sin Beneficios Disney:</b> Te pierdes el Early Entry y la conveniencia del transporte oficial.</li>
                  <li className="flex items-start gap-2"><Icon icon="solar:close-circle-bold" className="mt-1 shrink-0"/><b>Menos Magia:</b> Estás fuera de la "burbuja" y la atmósfera inmersiva.</li>
                  <li className="flex items-start gap-2"><Icon icon="solar-close-circle-bold" className="mt-1 shrink-0"/><b>Resort Fees:</b> Muchos hoteles cobran tasas diarias adicionales.</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <p className="text-sm text-blue-800"><b>Zonas populares fuera del Resort:</b> <b>International Drive</b> (cerca de todo, mucho para hacer), <b>Lake Buena Vista</b> (cerca de Disney Springs) y <b>Kissimmee</b> (opciones de casas y villas económicas).</p>
            </div>
          </section>

        </div>

        <div className="mt-10 text-center">
          <Link href="/orlando/movilidad" className="bg-gunmetal hover:bg-gunmetal/90 text-white font-bold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center gap-2">
              Continuar al Paso 4: Cómo Moverte
              <Icon icon="solar:arrow-right-bold" width={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
