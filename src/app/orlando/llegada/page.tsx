
import { Icon } from '@/components/Icon';
import Image from 'next/image';
import Link from 'next/link';

export default function LlegadaPage() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-celeste/10 text-celeste font-semibold px-3 py-1 rounded-full text-sm mb-4">
              <Icon icon="solar:airplane-bold-duotone" width={20} />
              Paso 1
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gunmetal !leading-tight">
            Opciones para llegar a Orlando
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Tu viaje a la magia empieza con una decisión clave: cómo llegar. Analizamos las principales rutas y medios de transporte para que elijas la mejor opción para tu presupuesto y comodidad.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 space-y-8">
          
          {/* Section: Vuelo Directo */}
          <section>
            <h2 className="text-2xl font-bold text-gunmetal mb-4 flex items-center gap-3">
              <Icon icon="solar:aéroport-bold-duotone" width={28} className="text-celeste" />
              Vuelo Directo: Aeropuertos de Orlando
            </h2>
            <p className="text-gray-600 mb-6">
              La forma más común de llegar es volando directamente a uno de los dos aeropuertos principales de la ciudad. Aunque parecen similares, la elección puede impactar tu logística y presupuesto.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-gunmetal">Aeropuerto Internacional de Orlando (MCO)</h3>
                <p className="text-sm text-gray-500">El más grande y cercano a los parques.</p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li className="flex items-start gap-2"><Icon icon="solar:check-circle-bold" className="text-green-500 mt-1" /> <b>Ubicación:</b> A 20-30 min de Disney y Universal.</li>
                  <li className="flex items-start gap-2"><Icon icon="solar:check-circle-bold" className="text-green-500 mt-1" /> <b>Transporte:</b> Conectado con buses de Disney, tren a Miami, y todos los servicios de shuttle y ride-sharing.</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-gunmetal">Aeropuerto Internacional de Orlando Sanford (SFB)</h3>
                <p className="text-sm text-gray-500">Suele tener vuelos de aerolíneas low-cost.</p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li className="flex items-start gap-2"><Icon icon="solar:check-circle-bold" className="text-green-500 mt-1" /> <b>Ubicación:</b> A 45-60 min de los parques.</li>
                  <li className="flex items-start gap-2"><Icon icon="solar:close-circle-bold" className="text-red-500 mt-1" /> <b>Transporte:</b> Menos opciones de transporte directo a los hoteles.</li>
                </ul>
              </div>
            </div>

            <div className="bg-lime-50 border-l-4 border-lime-400 p-4 rounded-r-lg">
              <div className="flex">
                  <div className="py-1"><Icon icon="solar:dollar-minimalistic-bold-duotone" width={24} className="text-lime-600" /></div>
                  <div className="ml-3">
                      <p className="text-sm font-bold text-lime-800">Análisis de Costo vs. Conveniencia</p>
                      <p className="text-sm text-lime-700">Aunque un vuelo a SFB sea más barato, considerá el costo y tiempo extra del transporte terrestre a tu hotel. MCO suele ser la opción más conveniente para la mayoría de los viajeros de parques temáticos.</p>
                  </div>
              </div>
            </div>
          </section>

          <div className="border-t border-gray-200"></div>

          {/* Section: Desde Miami */}
          <section>
            <h2 className="text-2xl font-bold text-gunmetal mb-4 flex items-center gap-3">
              <Icon icon="solar:train-bold-duotone" width={28} className="text-celeste" />
              Ruta Alternativa: Viajando desde Miami
            </h2>
            <p className="text-gray-600 mb-6">
              Muchos viajeros combinan Miami con Orlando. Si este es tu caso, tenés dos opciones principales para el traslado entre ciudades, cada una con sus pros y contras.
            </p>

            <div className="space-y-4 mb-6">
                <div className="flex items-start gap-4">
                    <Icon icon="solar:steering-wheel-bold-duotone" width={28} className="text-gunmetal/70 mt-1 flex-shrink-0" />
                    <div>
                        <h4 className="font-bold text-gunmetal">Alquiler de Auto</h4>
                        <p className="text-gray-600 text-sm">El viaje dura unas 4 horas. Te da total flexibilidad para moverte en Orlando, pero no olvides sumar el costo de peajes, nafta y estacionamiento en los parques (¡entre $25 y $30 por día!).</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <Icon icon="solar:train-bold-duotone" width={28} className="text-gunmetal/70 mt-1 flex-shrink-0" />
                    <div>
                        <h4 className="font-bold text-gunmetal">Tren de Alta Velocidad (Brightline)</h4>
                        <p className="text-gray-600 text-sm">El nuevo tren Brightline conecta el centro de Miami con el aeropuerto MCO de Orlando en aproximadamente 3.5 horas. Es una opción cómoda, sin estrés de tráfico, y te deja listo para tomar el transporte a tu hotel.</p>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <div className="flex">
                  <div className="py-1"><Icon icon="solar:lightbulb-bold-duotone" width={24} className="text-blue-600" /></div>
                  <div className="ml-3">
                      <p className="text-sm font-bold text-blue-800">Recomendación</p>
                      <p className="text-sm text-blue-700">Si no planeas visitar lugares fuera de Disney/Universal, el tren es una excelente opción. Si quieres más libertad para explorar Orlando y sus alrededores, el auto es indispensable.</p>
                  </div>
              </div>
            </div>

          </section>
        </div>

        {/* Navigation */}
        <div className="mt-10 text-center">
          <Link href="/orlando/cuando-viajar" className="bg-gunmetal hover:bg-gunmetal/90 text-white font-bold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center gap-2">
              Continuar al Paso 2: Cuándo Viajar
              <Icon icon="solar:arrow-right-bold" width={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
