
import { Icon } from '@/components/Icon';
import Image from 'next/image';
import Link from 'next/link';

export default function MovilidadPage() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-celeste/10 text-celeste font-semibold px-3 py-1 rounded-full text-sm mb-4">
              <Icon icon="solar:bus-bold-duotone" width={20} />
              Paso 4
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gunmetal !leading-tight">
            Moverte por Orlando: Auto vs. Transporte Oficial
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Orlando es una ciudad muy extensa. Entender tus opciones de transporte es clave para un viaje sin estrés y para no perder tiempo valioso.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold text-gunmetal mb-4 flex items-center gap-3">
              <Icon icon="solar:steering-wheel-bold-duotone" width={28} className="text-celeste" />
              Opción 1: Alquilar un Auto
            </h2>
            <p className="text-gray-600 mb-4">
              La opción que ofrece máxima libertad. Es casi indispensable si te alojas fuera de un hotel de Disney o Universal, o si quieres explorar más allá de los parques.
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-bold text-gunmetal mb-2">Puntos a considerar:</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-3"><Icon icon="solar:dollar-bold-duotone" className="text-gray-500 mt-1 shrink-0"/><div><b>Costos Asociados:</b> Al precio del alquiler debes sumar el seguro, los peajes (muy comunes en Orlando) y el costo del estacionamiento en los parques (entre $25-$30 por día).</div></li>
                  <li className="flex items-start gap-3"><Icon icon="solar:map-point-bold-duotone" className="text-gray-500 mt-1 shrink-0"/><div><b>Estacionamiento en Parques:</b> Todos los parques tienen estacionamientos gigantes. Una vez que estacionas, un trencito (tram) te lleva a la entrada. Para Magic Kingdom, estacionarás en el TTC (Ticket and Transportation Center) y desde allí tomarás un monorriel o un ferry.</div></li>
                   <li className="flex items-start gap-3"><Icon icon="solar:traffic-economy-bold-duotone" className="text-gray-500 mt-1 shrink-0"/><div><b>Navegación y Tráfico:</b> Usar Waze o Google Maps es fundamental. La I-4 es la arteria principal y puede tener mucho tráfico, especialmente en hora pico.</div></li>
                </ul>
            </div>
             <div className="mt-4 bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg text-sm text-green-800">
              <b>Recomendación:</b> Ideal para viajeros que se quedan fuera, quieren visitar playas, ir de compras a los outlets o tienen un itinerario variado.
            </div>
          </section>

          <div className="border-t border-gray-200"></div>

          <section>
            <h2 className="text-2xl font-bold text-gunmetal mb-4 flex items-center gap-3">
              <Icon icon="solar:bus-bold-duotone" width={28} className="text-celeste" />
              Opción 2: Transporte de los Resorts y Uber/Lyft
            </h2>
            <p className="text-gray-600 mb-4">
              Si te hospedas dentro de Disney o Universal, puedes depender casi exclusivamente de su sistema de transporte gratuito, complementando con viajes compartidos.
            </p>
             <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-bold text-gunmetal mb-2">Cómo funciona:</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-3"><Icon icon="solar:plain-bold-duotone" className="text-gray-500 mt-1 shrink-0"/><div><b>Transporte de Disney:</b> Es una red enorme y gratuita de buses, botes, el famoso Monorriel y el moderno teleférico Skyliner. Conectan todos los hoteles, parques y Disney Springs. La frecuencia es buena, pero en horas pico puede haber esperas.</div></li>
                  <li className="flex items-start gap-3"><Icon icon="solar:bus-bold-duotone" className="text-gray-500 mt-1 shrink-0"/><div><b>Transporte de Universal:</b> Buses y botes conectan sus hoteles con los dos parques temáticos y el complejo de entretenimiento CityWalk. Es muy eficiente y rápido.</div></li>
                   <li className="flex items-start gap-3"><Icon icon="solar:taxi-bold-duotone" className="text-gray-500 mt-1 shrink-0"/><div><b>Uber y Lyft (Minnie Vans):</b> Para viajes fuera de la red (ej. de un hotel Disney a un outlet) o si quieres ahorrar tiempo, Uber y Lyft son la mejor opción. Disney también ofrece su propio servicio premium, las "Minnie Vans".</div></li>
                </ul>
            </div>
             <div className="mt-4 bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg text-sm text-green-800">
              <b>Recomendación:</b> La mejor opción para quienes se hospedan dentro de un resort y su plan se centra exclusivamente en los parques de ese resort.
            </div>
          </section>

        </div>

        <div className="mt-10 text-center">
          <Link href="/orlando/tickets" className="bg-gunmetal hover:bg-gunmetal/90 text-white font-bold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center gap-2">
              Continuar al Paso 5: Entender las Entradas
              <Icon icon="solar:arrow-right-bold" width={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
