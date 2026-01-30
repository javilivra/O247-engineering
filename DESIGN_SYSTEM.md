O247 Design System | Briefs de Identidad y Comportamiento (UX/UI)

Versión: 1.0 (Golden Master) Alcance: Voz, Física y Movimiento.



BRIEF 1: IDENTIDAD VERBAL & UX WRITING

Filosofía: "El Concierge Invisible". O247 es un ingeniero local experto que te susurra el camino, no un robot frío ni un vendedor de feria.

1. La Voz Dual (Alineada con Tipografía)

Voz Principal (Google Sans): Empática, predictiva, resolutiva. Habla de beneficios y disfrute.

Tono: Autoridad Calmada. "Por aquí es más rápido".

Voz de Soporte (JetBrains Mono): Precisa, transparente, técnica. Habla de datos y estado del sistema.

Tono: Informativo. "Latencia: 0ms. Precisión: 98%."

2. Diccionario de Traducción (Backend -> Frontend)

El usuario no quiere "configurar algoritmos", quiere "diseñar su día".

Concepto Técnico (Lo que hace el código)	Concepto de Usuario (Lo que lee en pantalla)	Contexto de Uso
Optimizar Ruta / Calcular	Revelar mi Plan / Diseñar mi Día	Botones de Acción Primaria (CTA)
Base de Datos / Inputs	Secretos / Estrategia	Títulos de secciones de contenido
Error de Carga / 404	Puliendo la magia... / Recalculando	Mensajes de estado / Toasts
Login / Sign Up	Identificarse / Desbloquear Acceso	Navegación
Configuración	Mis Preferencias / Mi Estilo	Menú de usuario
3. Microcopy Estratégico

Botones: Nunca usar una sola palabra genérica ("Enviar"). Usar Verbo + Beneficio ("Ver Itinerario Inteligente").

Alertas: Nunca culpar al usuario ("Ingresaste mal la fecha"). Ser proactivo ("Necesitamos una fecha para empezar"). ﻿



Prohibido: No usar vidrio sobre fondos planos (bg-bone). Ahí se usa blanco sólido (bg-white) para garantizar contraste y legibilidad.




BRIEF 2: LENGUAJE DE FORMAS Y FÍSICA (SPATIAL UI)

Filosofía: "Suavidad Estructural". La estructura es sólida (Tech) pero al tacto es suave (Oasis).

1. Sistema de Bordes (Border Radius)

Contenedores Estándar (rounded-2xl / 16px): Para tarjetas, modales, imágenes y secciones principales. Transmite modernidad y amabilidad.

Elementos Interactivos (rounded-full / 50px): Para botones, pills de navegación y etiquetas. Invita al tacto ("tap-friendly").

Elementos Técnicos (rounded-md / 6px): Uso restringido. Solo para elementos internos de datos muy densos (ej. una pequeña etiqueta de código dentro de una tarjeta) para denotar "pieza de ingeniería".

2. Densidad de Información (Aire vs. Dato)

Nivel Inspiracional (Hero/Landing): Padding generoso (p-8, py-24). El aire es lujo.

Nivel Funcional (Itinerario/Dashboard): Densidad media-alta.

Regla: No usamos tablas de Excel. Usamos "Micro-Tarjetas".

En lugar de una fila de tabla, usamos un contenedor blanco sobre fondo bone, con sombra suave. La información se agrupa, no se apila.

3. Glassmorphism (Uso Táctico)

Regla: El vidrio (backdrop-blur-md bg-white/70) solo se usa si el elemento FLOTA sobre un contexto visual rico (mapas, fotos inmersivas).

Prohibido: No usar vidrio sobre fondos planos (bg-bone). Ahí se usa blanco sólido (bg-white) para garantizar contraste y legibilidad.





BRIEF 3: COMPORTAMIENTO Y MICRO-INTERACCIONES

Filosofía: "Fluidez Líquida". La interfaz no salta, fluye. No esperamos, procesamos.

1. Velocidad y Curvas

Duración: 300ms - 400ms. Ni instantáneo (se siente roto) ni lento (se siente pesado).

Easing: "Ease-out" para entradas (entra rápido, frena suave). La interfaz debe sentirse receptiva.

Origen: Las tarjetas y menús no aparecen de la nada; nacen desde el punto de interacción (zoom-in suave o slide-up). ﻿

2. El "Spinner" Narrativo (The Trust Builder)

REGLA DE ORO: Nunca usar un spinner de carga genérico para acciones de valor (como calcular un itinerario).

Patrón de Carga O247:

User Action: Click en "Revelar mi Plan".

Estado de Carga: Aparece un Skeleton Screen (estructura gris pulsante) + Texto en JetBrains Mono (text-celeste) que cambia cada 800ms:

> Conectando con satélite climático...

> Analizando afluencia en tiempo real...

> Optimizando rutas de escape...

Resultado: Fade-in suave del contenido final. Objetivo: Convertir la espera en una demostración de la potencia de la ingeniería.

3. Feedback Táctil

Hover: Todos los elementos interactivos deben reaccionar al cursor.

Botones: Elevación sutil (shadow-lg) o brillo (brightness-105).

Tarjetas: Micro-desplazamiento hacia arriba (-translate-y-1).

Click/Tap: Efecto de "prensa" (scale-95) para confirmar que la acción física fue registrada.



INTRODUCCIÓN ESTRATÉGICA: LA DUALIDAD TIPOGRÁFICA DE O247

En O247, no elegimos tipografías por su estética, sino por su función en la economía de la atención del usuario. Nuestra plataforma debe resolver una tensión fundamental: la planificación de un viaje a Orlando es un sueño emocional ("Oasis"), pero su ejecución exitosa es un problema complejo de ingeniería y datos ("Tech").

Para resolver esto, hemos desarrollado un sistema tipográfico de doble voz, diseñado para guiar el cerebro del usuario a través de diferentes modos de procesamiento de información sin generar fricción.

1. La Voz Narrativa (El Oasis): Google Sans Flex

El 90% de la experiencia de usuario se basa en la fluidez. Necesitamos que el usuario lea guías largas, entienda conceptos complejos de planificación y se sumerja en la "magia" sin sentir fatiga cognitiva.

Por qué la elegimos: Google Sans Flex no es una fuente estática; es una fuente variable moderna. Esto es crucial para la ingeniería del sitio. Nos permite un control granular sobre el peso, el ancho y, críticamente, el "tamaño óptico". La fuente se auto-optimiza para ser perfectamente legible tanto en un título gigante de héroe como en un texto pequeño al pie de página, manteniendo una personalidad geométrica, limpia y amigable que reduce el estrés visual.

2. La Voz de la Precisión (El Tech): JetBrains Mono

Dentro de la narrativa fluida, existen puntos de datos críticos que no pueden ser ambiguos: tiempos de espera, precios, fechas exactas, códigos de confirmación y estados del sistema de IA. Si estos datos se presentan con la misma fuente "suave" que el resto del texto, se pierden en el ruido.

Por qué la elegimos: JetBrains Mono es una tipografía monoespaciada diseñada para leer código. Su rigidez es su mayor virtud. Al imponer un ritmo vertical estricto donde cada carácter ocupa el mismo espacio, crea una "interrupción" visual deliberada. Le indica al cerebro del usuario: "Detente. Esto no es una historia, esto es un dato duro. Procesa con precisión". Es la herramienta para inyectar ingeniería dentro de la experiencia.

En resumen: Usamos Google Sans Flex para invitar al usuario a soñar y leer, y JetBrains Mono para despertar su atención analítica en los momentos de decisión.




= O247 ENGINEERING | FRONTEND MASTER BRIEF & DESIGN SYSTEM =
Version: 3.0 (Final Consolidated)
Status: VIGENTE - FUENTE ÚNICA DE VERDAD

[DIRECTIVA PARA EL AGENTE DESARROLLADOR (GEMINI)]
Este documento define las leyes inmutables del frontend de O247. Debes internalizar estas reglas de colorimetría, tipografía, jerarquía y comportamiento antes de generar cualquier código. Cualquier desviación de este sistema será considerada un error crítico de implementación. Tu objetivo es construir interfaces que equilibren la calma visual ("Oasis") con la precisión de datos ("Tech").

---

== SECCIÓN 1: FILOSOFÍA CENTRAL "OASIS TECH" ==

El diseño de O247 se basa en dos pilares contradictorios pero complementarios:
1. Bienestar Digital (Oasis): La interfaz base debe reducir la carga cognitiva. Usamos fondos neutros cálidos (no blancos puros) para evitar la fatiga ocular durante sesiones largas de planificación.
2. Precisión Ingenieril (Tech): Los datos críticos, estados del sistema y elementos de IA deben destacarse con precisión quirúrgica, utilizando tipografía monoespaciada y colores vibrantes de acento.

---

== SECCIÓN 2: SISTEMA DE COLORIMETRÍA ==

La aplicación estricta de la regla 60-30-10 es obligatoria para gestionar la economía de la atención del usuario.

A. PALETA CORE (Tokens Inmutables)
| Rol Semántico | Nombre Tailwind | Valor HEX | Función Estricta |
| :--- | :--- | :--- | :--- |
| Dominante (60%) | `bg-bone` | `#f7f7f5` | Lienzo base. Silencio visual. Fondo por defecto. |
| Estructura (30%)| `text-gunmetal` | `#25343F` | Texto principal, bordes sutiles, secciones oscuras. |
| Acción (7%) | `bg-sunset` | `#FF7043` | Call to Action (CTA) primario, urgencia, energía. |
| Tech/IA (3%) | `bg-celeste` | `#00B4D8` | Indicadores de IA, datos estables, confianza tech. |

B. REGLAS DE APLICACIÓN (60-30-10)
1. El 60% de la pantalla debe ser `bone` (o blanco en tarjetas sobre bone). El fondo no compite.
2. El 30% es contenido estructurado en `gunmetal`.
3. El 10% de acento se divide: Sunset para lo que el usuario DEBE hacer; Celeste para lo que el sistema ESTÁ haciendo.

C. DEGRADADOS Y EFECTOS (Uso Restringido)
1. "Tech Gradient" (Texto/Bordes): `bg-gradient-to-r from-sunset to-celeste`. Solo para H1s display o bordes premium.
2. "Action Gradient" (Botones Únicos): `bg-gradient-to-r from-celeste to-sunset`. Solo para un botón de héroe único por página.
3. Sombras de Color: Usar `shadow-sunset/15` (o similar) para estados de foco/energía, no sombras negras.

---

== SECCIÓN 3: SISTEMA TIPOGRÁFICO DE CONVIVENCIA ==

La jerarquía se define por el rol semántico, no por decisiones estéticas arbitrarias.

A. LAS FUENTES
1. Primaria (Narrativa/Estructural): `Google Sans Flex` (Variable). Usar para guiar al usuario y contar la historia.
2. Secundaria (Datos/Técnica): `JetBrains Mono`. Usar para "inyectar" precisión: números, fechas, estados, etiquetas.

B. ESCALA MODULAR RESPONSIVA (Referencia)
| Rol | Mobile | Desktop (`lg:`) | Clase Tailwind Resultante |
| :--- | :--- | :--- | :--- |
| H1 (Hero) | `text-5xl` | `text-8xl` | `text-5xl lg:text-8xl` |
| H2 (Section)| `text-3xl` | `text-5xl` | `text-3xl lg:text-5xl` |
| H3 (Card) | `text-xl` | `text-2xl` | `text-xl lg:text-2xl` |
| Body/Label | `text-base`| `text-base` | `text-base` / `text-sm` |

---

== SECCIÓN 4: CLASES SEMÁNTICAS DE INGENIERÍA (HERRAMIENTAS) ==

Debes utilizar estas abstracciones (que deben estar en `globals.css`) en lugar de utilidades crudas para garantizar la consistencia.

A. `.type-display` (Para H1, H2 y Números Gigantes)
Rol: Impacto máximo narrativo.
Definición CSS: `@apply font-sans font-black tracking-tighter leading-none text-gunmetal; font-variation-settings: "opsz" 32, "wdth" 100, "GRAD" 50;`

B. `.type-body` (Para Párrafos de Lectura)
Rol: Lectura inmersiva de bajo esfuerzo cognitivo.
Definición CSS: `@apply font-sans text-base font-normal tracking-normal leading-relaxed text-gunmetal/80;`

C. `.type-tech` (Para Datos, Etiquetas y UI Técnica)
Rol: Precisión, datos duros, elementos del sistema.
Definición CSS: `@apply font-mono font-medium tracking-wider leading-tight text-gunmetal;` (A menudo se anula el color a Sunset o Celeste según el estado).

---

== SECCIÓN 5: GUARDARRAÍLES CRÍTICOS (ANTI-PATRONES) ==

1. PROHIBIDO usar JetBrains Mono para títulos narrativos o párrafos largos. Rompe la fluidez.
2. PROHIBIDO usar texto claro (bone/blanco) sobre fondos Sunset o Celeste. El contraste WCAG falla. Siempre usar texto Gunmetal sobre acentos.
3. PROHIBIDO usar grises genéricos (`text-gray-400`). Todas las opacidades deben derivar de la base Gunmetal (ej. `text-gunmetal/50`).
4. Si una pantalla tiene más de DOS elementos principales compitiendo en color Sunset, la jerarquía está rota. Reevaluar.


O247 Design System | Documento Maestro de Colorimetría

Versión: 1.0 (Golden Master)

Estado: Vigente

Filosofía: "Oasis Tech" – Un equilibrio entre calma visual (Bienestar Digital) y eficiencia tecnológica vibrante.



1. La Paleta Core (Identidad)

Estos cuatro colores son los pilares absolutos de la marca. No deben alterarse.

Nombre Semántico	Nombre Tailwind	Valor HEX	Rol Principal	Psicología/Función
Base Oasis	bg-bone	#f7f7f5	Lienzo Dominante	Calma, neutralidad, bajo estrés cognitivo. Sustituto del blanco puro.
Tech Dark	text-gunmetal	#25343F	Texto y Contraste	Sofisticación técnica, legibilidad, estructura.
Acción Solar	bg-sunset	#FF7043	Acento Primario	Urgencia, energía, "Call to Action" principal.
Tech Flow	bg-celeste	#00B4D8	Acento Secundario	Confianza, frescura, información tecnológica, inteligencia artificial.
2. Estrategia de Uso: La Regla 60-30-10

La aplicación de los colores debe adherirse estrictamente a estos ratios para garantizar la jerarquía visual y la gestión de la economía de la atención del usuario.

🟦 El 60%: Silencio Visual (Dominante)

Color: Bone (#f7f7f5) y Blanco Puro (#FFFFFF)

Objetivo: Crear un entorno de baja demanda cognitiva. El fondo no debe competir por la atención.

Aplicación: Fondos generales de página (el body), fondos de tarjetas de contenido estándar, espacios negativos.

⬛ El 30%: Estructura y Contenido (Secundario)

Color: Gunmetal (#25343F) y sus opacidades.

Objetivo: Entregar la información y definir la estructura sin ser agresivo.

Aplicación: Tipografía principal (H1-H6, párrafos), iconos de navegación, bordes sutiles, bloques de "inmersión oscura" (ej. Footer, secciones de alto contraste).

🟧 El 10%: La Moneda de Atención (Acento)

Colores: Sunset (#FF7043) y Celeste (#00B4D8)

Objetivo: Guiar al usuario hacia las acciones críticas y resaltar la inteligencia del sistema. El uso debe ser quirúrgico y deliberado.

División del 10%:

Sunset (7%): Reservado para la acción principal que queremos que el usuario realice (Botones primarios, alertas de urgencia).

Celeste (3%): Reservado para elementos informativos de valor, indicadores de IA, estados de progreso o acciones secundarias "tech". ﻿



3. Paleta de Recursos Extraordinarios (Utilidades)

Estos colores no son parte de la identidad de marca principal, pero son necesarios para la funcionalidad de una web app compleja. Deben usarse con extrema moderación y solo en contextos semánticos específicos.

Rol Semántico	Valor sugerido	Uso Estricto
Error / Destructivo	#E53935 (Rojo tech)	Mensajes de error crítico, borrar elementos. Nunca usar Sunset para errores negativos.
Éxito / Confirmación	#2E7D32 (Verde tech)	Opcional. A menudo el Celeste puede cubrir este rol. Usar solo si se necesita diferenciar "éxito" de "información tech".
Bordes / Divisores	gunmetal al 5-10% de opacidad	Usar siempre opacidades del Gunmetal (ej. border-gunmetal/10) para líneas divisorias. No introducir grises nuevos.
Placeholder / Deshabilitado	gunmetal al 30-40% de opacidad	Textos de ayuda, botones inactivos.
4. Guía de Aplicación por Componente

Reglas específicas para construir la interfaz.

4.1. Tipografía

Texto Principal (Body): Siempre text-gunmetal.

Texto Secundario/Labels: text-gunmetal con opacidad (ej. text-gunmetal/70).

Texto sobre fondos oscuros (Footer/Hero Dark): Siempre text-bone (o blanco si el contraste lo exige). Nunca usar grises.

Enlaces de texto (Inline): text-gunmetal con subrayado o peso bold. Hover: text-sunset.

4.2. Botones (Jerarquía de Acción)

Botón Primario (La acción #1 de la pantalla):

Fondo: bg-sunset

Texto: text-gunmetal (Para máximo contraste y punch)

Hover: hover:bg-sunset-glow o un ligero aclarado/escalado.

Botón Secundario (Alternativas):

Fondo: Transparente o bg-bone

Borde: border-2 border-gunmetal/20

Texto: text-gunmetal

Hover: hover:border-gunmetal, hover:bg-gunmetal/5.

Botón "Tech" / Terciario:

Usar text-celeste o iconos celestes para acciones relacionadas con ver detalles técnicos o funcionalidades de IA.

4.3. Iconografía

Iconos de Navegación/Interfaz: text-gunmetal.

Iconos de Acción/Highlights: text-sunset (ej. flechas en botones primarios, estrellas de destacado).

Iconos de Datos/Inteligencia/Tech: text-celeste (ej. iconos de CPU, nube, procesamiento, estadísticas).

4.4. Contenedores y Tarjetas

Tarjetas Estándar: Fondo blanco (bg-white) sobre el fondo general bg-bone. Sombra muy sutil (shadow-sm usando gunmetal/5). Borde casi invisible (border-gunmetal/5).

Secciones de Quiebre/Inmersión: Uso deliberado de bg-gunmetal para romper el flujo visual (ej. Footer, una sección de testimonios impactante).

5. Guardarraíles de Accesibilidad y Construcción

Contraste Sagrado: Nunca usar texto claro (blanco o bone) sobre fondos Sunset o Celeste. El contraste no es suficiente según WCAG. Siempre usar texto oscuro (text-gunmetal) sobre estos fondos de acento.

No Gritar: Si una pantalla tiene más de dos elementos visuales compitiendo en color Sunset, el diseño está fallando. Reevaluar la jerarquía. Solo un elemento principal debe "gritar".

Consistencia de Opacidad: Para generar variantes más claras de los colores (bordes, fondos sutiles), usar siempre las utilidades de opacidad de Tailwind sobre los colores base (ej. bg-sunset/10 para un fondo de alerta suave), en lugar de elegir nuevos códigos hexadecimales más claros.






6. Degradados y Efectos Especiales (Gradients & Glows)

El uso de degradados es clave en la identidad "Oasis Tech" para transmitir fluidez y modernidad. No deben usarse degradados aleatorios; solo las combinaciones aprobadas.

6.1. El "Tech Gradient" (Texto y Elementos Específicos)

Es la fusión visual de la energía (Sunset) y la tecnología (Celeste).

Definición: bg-gradient-to-r from-sunset to-celeste

Uso Exclusivo:

Textos destacados de alto impacto (H1 en Hero). Se usa con bg-clip-text text-transparent.

Bordes sutiles en tarjetas premium (usando técnicas de máscara o border-image).

Restricción: No usar en fondos de secciones completas ni en botones estándar.

6.2. El "Action Gradient" (Botones Especiales)

Una variación para botones que requieren un "impulso" visual extra, como el botón de búsqueda principal.

Definición: bg-gradient-to-r from-celeste to-sunset (Inverso al de texto para generar dinamismo).

Uso Exclusivo: Botones de acción primaria únicos que necesitan destacarse sobre el resto de la interfaz (ej. el botón "GATE YO TE ELIJO").

Restricción: No usar para botones primarios estándar de la interfaz (ej. "Guardar", "Aceptar"), los cuales deben ser bg-sunset sólido.

6.3. Sombras y Resplandores de Color (Colored Shadows)

En lugar de sombras negras estándar, utilizamos el color para dar una sensación de luz proyectada.

Sunset Glow (Foco de Atención):

Uso: Para indicar foco activo en inputs importantes o estados de "alerta/energía".

Implementación: Sombras suaves y difusas usando Sunset con baja opacidad. Ej: shadow-[0_0_30px_rgba(255,112,67,0.15)] o la utilidad .text-sunset-glow.

Gunmetal Shadow (Elevación Estándar):

Uso: Para dar profundidad a tarjetas y elementos flotantes estándar.

Implementación: shadow-sm o shadow-md usando siempre la base Gunmetal con muy baja opacidad (ej. rgba(37,52,63,0.05)), nunca negro puro, para evitar que se vea "sucio" sobre el fondo Bone. ﻿



7. Color en Visualización de Datos (Charts & Graphs)

Como aplicación de ingeniería, los gráficos son fundamentales. Los colores deben tener roles semánticos claros en las visualizaciones.

Celeste (#00B4D8): El color de los datos principales. Usar para las líneas de tendencia principales, barras de progreso estándar y métricas de "buen funcionamiento" o "procesamiento IA". Es el color de la información estable.

Sunset (#FF7043): El color de los highlights y alertas en datos. Usar para puntos críticos en un gráfico, picos de afluencia, alertas de espera alta o comparativas donde se quiere resaltar una oportunidad.

Gunmetal (#25343F): Ejes y etiquetas. Usar para todo el texto de soporte, ejes X/Y, leyendas y grillas (con opacidad baja).

Bone/Gris Claro: Usar para áreas de fondo de gráficos o datos de contexto secundarios que no deben llamar la atención.




8. PALETA DEFINIDA

🦴 Bone (#f7f7f5): Dominante (60%).

🌑 Gunmetal (#25343F): Secundario/Texto (30%).

☀️ Sunset (#FF7043): Acento Primario (Acción).

💧 Celeste (#00B4D8): Acento Secundario (Información/Tech).



Criterio del Artículo / Economía de la Atención	Evaluación de Nuestra Paleta	Nivel de Alineación
Tendencia: Bienestar Digital	EXCELENTE. Al elegir Bone (#f7f7f5) en lugar de blanco puro, estamos aplicando directamente esta tendencia. Es un fondo que reduce el estrés visual, perfecto para una web app de uso prolongado (planificación de viajes). Crea un entorno de "baja demanda cognitiva".	🟢 ALTA
Tendencia: Vibrancia Accesible	MUY BUENA. Usamos Sunset y Celeste, que son colores vibrantes y modernos. El desafío aquí (que ya abordamos) es asegurar que el contraste del texto sobre estos colores (o de estos colores sobre el fondo) cumpla con WCAG. Al usar texto Gunmetal sobre Bone, el contraste de lectura es perfecto.	🟢 ALTA
Regla 60-30-10	IMPLEMENTACIÓN DE LIBRO. Nuestra estructura es literalmente esta regla. Bone es el 60%, Gunmetal (textos y secciones oscuras) es el 30%, y la suma de Sunset y Celeste forma el 10% de acento. Esto garantiza que la atención se gestione eficientemente.	🟢 ALTA
Psicología del Color (Funcional)	CORRECTA. Usamos el naranja (Sunset) para la acción y la energía (CTAs, urgencia), coincidiendo con la psicología descrita. Usamos el cian/azul (Celeste) para la confianza y el toque tecnológico. La combinación crea el "Oasis Tech" que buscábamos.	🟢 ALTA
Gestión de la Atención	EFICIENTE. La paleta es muy respetuosa con la atención del usuario. No abruma. Usa la base neutra para calmar y los "pinchos" de color naranja solo donde es absolutamente necesario generar una conversión o acción.	🟢 ALTA