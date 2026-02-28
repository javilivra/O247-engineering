
import { Icon } from '@/components/Icon';
import Image from 'next/image';
import Link from 'next/link';

export default function CuandoViajarPage() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-celeste/10 text-celeste font-semibold px-3 py-1 rounded-full text-sm mb-4">
              <Icon icon="solar:calendar-bold-duotone" width={20} />
              Paso 2
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gunmetal !leading-tight">
            La Mejor Época para Viajar a Orlando
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Orlando es un destino mágico durante todo el año, pero cada temporada ofrece una experiencia diferente. Aquí desglosamos el clima, la afluencia y los eventos para ayudarte a decidir.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold text-gunmetal mb-4 flex items-center gap-3">
              <Icon icon="solar:graph-up-bold-duotone" width={28} className="text-celeste" />
              Análisis por Temporada
            </h2>
            
            <div className="space-y-6">
              {/* Temporada Baja */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-gunmetal">Temporada Baja (Poca gente y precios bajos)</h3>
                <p className="text-sm text-gray-500 mb-2">Ideal para presupuestos ajustados y quienes odian las filas.</p>
                <p className="text-sm text-gray-600 mb-3"><b className="text-gunmetal">Cuándo:</b> Fines de enero a principios de marzo, fines de agosto a fines de septiembre.</p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2"><Icon icon="solar:check-circle-bold" className="text-green-500 mt-1" /><div><b>Pros:</b> Precios más bajos en hoteles y vuelos, menos gente en los parques, clima agradable en primavera.</div></li>
                  <li className="flex items-start gap-2"><Icon icon="solar:close-circle-bold" className="text-red-500 mt-1" /><div><b>Contras:</b> Horarios de parque más cortos, algunas atracciones pueden estar en mantenimiento, riesgo de clima muy caluroso y húmedo a fines del verano.</div></li>
                </ul>
              </div>

              {/* Temporada Media */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-gunmetal">Temporada Media (El mejor balance)</h3>
                <p className="text-sm text-gray-500 mb-2">Un excelente equilibrio entre buen clima y multitudes manejables.</p>
                <p className="text-sm text-gray-600 mb-3"><b className="text-gunmetal">Cuándo:</b> Fines de abril a mayo, octubre a mediados de noviembre.</p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2"><Icon icon="solar:check-circle-bold" className="text-green-500 mt-1" /><div><b>Pros:</b> Clima espectacular (especialmente en octubre), multitudes moderadas, eventos especiales como el Food & Wine Festival de Epcot y Halloween.</div></li>
                  <li className="flex items-start gap-2"><Icon icon="solar:close-circle-bold" className="text-red-500 mt-1" /><div><b>Contras:</b> Los precios empiezan a subir, puede haber picos de gente alrededor de fines de semana largos.</div></li>
                </ul>
              </div>

              {/* Temporada Alta */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-gunmetal">Temporada Alta (Máxima magia y multitudes)</h3>
                <p className="text-sm text-gray-500 mb-2">Para quienes quieren vivir la experiencia completa con todos los shows y desfiles.</p>
                <p className="text-sm text-gray-600 mb-3"><b className="text-gunmetal">Cuándo:</b> Fines de marzo a mediados de abril (Spring Break), junio a mediados de agosto (verano), Día de Acción de Gracias y Navidad.</p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2"><Icon icon="solar:check-circle-bold" className="text-green-500 mt-1" /><div><b>Pros:</b> Horarios de parque extendidos, todos los espectáculos y desfiles disponibles, ambiente festivo increíble en Navidad.</div></li>
                  <li className="flex items-start gap-2"><Icon icon="solar:close-circle-bold" className="text-red-500 mt-1" /><div><b>Contras:</b> Precios en su punto más alto, multitudes muy grandes, calor y humedad intensos en verano.</div></li>
                </ul>
              </div>
            </div>
          </section>

          <div className="border-t border-gray-200"></div>

          <section>
            <h2 className="text-2xl font-bold text-gunmetal mb-4 flex items-center gap-3">
              <Icon icon="solar:bolt-bold-duotone" width={28} className="text-celeste" />
              Clima en Orlando: Qué esperar
            </h2>
            <p className="text-gray-600 mb-4">
              Orlando tiene un clima subtropical. Esto significa veranos calientes y húmedos con tormentas frecuentes por la tarde, e inviernos suaves y secos. 
            </p>
            <ul className="text-sm text-gray-700 bg-gray-50 rounded-lg p-4 space-y-1">
                <li><b>Verano (Jun-Sep):</b> Temperaturas de 25-35°C. Humedad alta. Lluvias casi a diario.</li>
                <li><b>Otoño (Oct-Nov):</b> Temperaturas de 18-28°C. Menos humedad, muy agradable.</li>
                <li><b>Invierno (Dic-Feb):</b> Temperaturas de 10-22°C. Días soleados, noches frescas.</li>
                <li><b>Primavera (Mar-May):</b> Temperaturas de 15-28°C. Clima ideal, popular para viajar.</li>
            </ul>
          </section>

        </div>

        <div className="mt-10 text-center">
          <Link href="/orlando/donde-dormir" className="bg-gunmetal hover:bg-gunmetal/90 text-white font-bold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center gap-2">
              Continuar al Paso 3: Dónde Dormir
              <Icon icon="solar:arrow-right-bold" width={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
