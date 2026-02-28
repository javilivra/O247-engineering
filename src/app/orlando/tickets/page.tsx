
import { Icon } from '@/components/Icon';
import Link from 'next/link';

export default function TicketsPage() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-celeste/10 text-celeste font-semibold px-3 py-1 rounded-full text-sm mb-4">
              <Icon icon="solar:ticket-sale-bold-duotone" width={20} />
              Paso 5
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gunmetal !leading-tight">
            Guía para Entender las Entradas de los Parques
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Comprar tickets para Orlando puede ser abrumador. Aquí te explicamos los tipos de entradas, los sistemas de reserva y los extras que realmente valen la pena.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold text-gunmetal mb-4 flex items-center gap-3">
              <Icon icon="solar:ticket-bold-duotone" width={28} className="text-celeste" />
              Tipos de Tickets Base
            </h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-gunmetal">1 Parque por Día (Base Ticket)</h3>
                <p className="text-sm text-gray-600 mt-1">Esta es la entrada estándar. Te da acceso a <b>un solo parque temático por día</b>. Si compras un ticket de 4 días, puedes visitar un parque diferente cada día (ej. Lunes a Magic Kingdom, Martes a Epcot, etc.), pero no puedes cambiar de parque en el mismo día.</p>
                <p className="text-xs mt-2 font-semibold text-green-700">Ideal para: Primeras visitas, viajes con niños pequeños, o si prefieres explorar cada parque a fondo.</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-gunmetal">Park Hopper</h3>
                <p className="text-sm text-gray-600 mt-1">Este es un <b>adicional</b> que compras sobre tu ticket base. Te permite visitar más de un parque en el mismo día. La regla general es que puedes 'saltar' (hop) a tu segundo parque a partir de las 2 PM (siempre verifica la app de Disney para confirmar).</p>
                <p className="text-xs mt-2 font-semibold text-green-700">Ideal para: Viajes cortos, revisitar atracciones favoritas, o si quieres combinar la mañana en un parque con una cena en otro (ej. Epcot).</p>
              </div>
            </div>
          </section>

          <div className="border-t border-gray-200"></div>

          <section>
            <h2 className="text-2xl font-bold text-gunmetal mb-4 flex items-center gap-3">
              <Icon icon="solar:lightbulb-bolt-bold-duotone" width={28} className="text-celeste" />
              Sistemas para Evitar Filas: Genie+ y Lightning Lane
            </h2>
            <p className="text-gray-600 mb-4">
              Estos son los servicios de pago que reemplazaron al antiguo FastPass. Son complejos, pero pueden cambiar tu día si los usas bien.
            </p>
            <div className="space-y-4 text-sm">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-bold text-gunmetal">Genie+ (Servicio por día)</h4>
                    <p className="text-gray-700 mt-1">Es un servicio que compras por día y por persona. Te permite reservar, de a una por vez, una ventana de horario para acceder a la mayoría de las atracciones a través de una fila rápida llamada <b>"Lightning Lane"</b>. Una vez que usas tu reserva, puedes hacer la siguiente.</p>
                    <div className="mt-2 bg-blue-50 border-l-4 border-blue-400 p-2 rounded-r-lg text-xs text-blue-800"><b>Tip:</b> Se compra el mismo día de tu visita al parque, a partir de la medianoche. Las primeras reservas se hacen a las 7 AM.</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-bold text-gunmetal">Individual Lightning Lane (Atracciones a la carta)</h4>
                    <p className="text-gray-700 mt-1">Las 1-2 atracciones más populares de cada parque (ej. Tron, Guardians of the Galaxy) <b>NO están incluidas en Genie+</b>. Para acceder a su fila rápida, debes comprar un acceso individual ("Individual Lightning Lane" o ILL). El precio varía según la demanda y el día.</p>
                    <div className="mt-2 bg-blue-50 border-l-4 border-blue-400 p-2 rounded-r-lg text-xs text-blue-800"><b>Tip:</b> No necesitas haber comprado Genie+ para poder comprar un ILL.</div>
                </div>
            </div>
             <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg text-sm text-red-800">
              <b>Importante:</b> En Universal el sistema es diferente y se llama <b>Express Pass</b>. Es más simple (y más caro): lo compras y funciona como un pase VIP para casi todas las atracciones, sin necesidad de reservar horarios.
            </div>
          </section>

        </div>

        <div className="mt-10 text-center">
          <Link href="/orlando/experiencia" className="bg-gunmetal hover:bg-gunmetal/90 text-white font-bold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center gap-2">
              Continuar al Paso 6: Más Allá de los Parques
              <Icon icon="solar:arrow-right-bold" width={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
