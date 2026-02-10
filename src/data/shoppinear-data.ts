// src/data/shoppinear-data.ts

// ============================================================
// CATEGORIAS DE COMPRA - Matriz de Decision
// ============================================================

export interface ShoppingCategory {
    id: string;
    title: string;
    subtitle: string;
    icon: string;
    context: string;
    logic: {
        makesSense: string[];
        skipIf: string[];
        commonError: string;
    };
}

export const SHOPPING_CRITERIA: ShoppingCategory[] = [
    {
        id: 'apparel',
        title: 'Ropa y Calzado',
        subtitle: 'ANALISIS DE INVENTARIO Y TALLES',
        icon: 'solar:t-shirt-bold-duotone',
        context: 'La ropa no es necesariamente mas barata en terminos nominales. La ventaja real es la ingenieria de producto: telas, durabilidad y molderia que no se consigue en origen.',
        logic: {
            makesSense: [
                'Buscas talles especificos (XS real, 3XL+, anchos especiales).',
                'Necesitas ropa tecnica (deportiva de alto rendimiento, frio extremo).',
                'Valoras la durabilidad sobre la moda rapida.',
            ],
            skipIf: [
                'Solo buscas precio bajo (hay opciones locales competitivas).',
                'Vas a comprar basicos genericos sin probarte.',
                'Tu maleta ya esta al limite de peso.',
            ],
            commonError: 'Comprar por impulso en el primer outlet creyendo que es una oportunidad unica. El stock suele ser remanente.',
        },
    },
    {
        id: 'tech',
        title: 'Tecnologia Personal',
        subtitle: 'COMPATIBILIDAD Y GARANTIA',
        icon: 'solar:devices-bold-duotone',
        context: 'La ansiedad tecnologica es comun. Pero que un producto este disponible en BestBuy no significa que sea viable para tu vida diaria en tu pais.',
        logic: {
            makesSense: [
                'El modelo no existe en tu pais (lanzamientos recientes).',
                'La brecha de precio supera el 40% (considerando impuestos de aduana).',
                'Aceptas el riesgo de una garantia limitada o nula.',
            ],
            skipIf: [
                'Necesitas cuotas o financiacion para pagarlo.',
                'El teclado o enchufes requieren adaptadores molestos.',
                'Es un producto voluminoso (TVs, Monitores) con alto riesgo de rotura.',
            ],
            commonError: 'Ignorar las bandas de frecuencia de celulares (compatibilidad 4G/5G) o voltajes de electrodomesticos.',
        },
    },
    {
        id: 'souvenirs',
        title: 'Recuerdos y Merch',
        subtitle: 'VALOR EMOCIONAL VS. OBJETO GENERICO',
        icon: 'solar:magic-stick-3-bold-duotone',
        context: 'El "Efecto Disney" distorsiona el valor. Un peluche de $40 parece razonable en Main Street, pero es un objeto inerte en tu casa. Buscamos recuerdos, no cosas.',
        logic: {
            makesSense: [
                'Es un objeto de coleccion unico o fechado (ej: Pin del ano).',
                'Tiene utilidad diaria (taza de oficina, ropa de casa).',
                'Representa un momento especifico vivido en el viaje.',
            ],
            skipIf: [
                'Es un item generico que podrias encontrar en un supermercado local.',
                'Es voluminoso y dificil de transportar.',
                'Lo compras "para regalar" por compromiso.',
            ],
            commonError: 'Llenar la maleta de orejas y varitas que terminaran en un cajon. El contexto emocional se queda en el parque.',
        },
    },
    {
        id: 'cosmetics',
        title: 'Cosmeticos y Salud',
        subtitle: 'FORMULACIONES Y REGULACIONES',
        icon: 'solar:heart-pulse-bold-duotone',
        context: 'EE.UU. tiene formulaciones de productos que no existen en Latinoamerica. La FDA permite ingredientes activos en concentraciones distintas. Ahi esta el valor real.',
        logic: {
            makesSense: [
                'Productos dermatologicos con formulaciones exclusivas (retinol, acidos).',
                'Vitaminas y suplementos con concentraciones no disponibles en tu pais.',
                'Marcas de farmacia (CeraVe, La Roche-Posay) a fraccion del precio.',
            ],
            skipIf: [
                'Es maquillaje de moda que caduca rapido.',
                'No conoces tu tipo de piel ni has investigado ingredientes.',
                'Compras al peso sin plan (luego no cabe en la maleta).',
            ],
            commonError: 'Stockearse de productos sin verificar fechas de vencimiento. Los precios bajos a veces indican productos proximos a vencer.',
        },
    },
    {
        id: 'toys',
        title: 'Juguetes y Coleccionables',
        subtitle: 'EXCLUSIVIDAD VS. DISTRIBUCION GLOBAL',
        icon: 'solar:gamepad-bold-duotone',
        context: 'El mercado de juguetes en EE.UU. tiene exclusivos reales pero tambien mucha distribucion global. La clave es saber que es genuinamente exclusivo y que no.',
        logic: {
            makesSense: [
                'LEGO/Funko exclusivos de parques Disney o Universal (no se venden online).',
                'Juegos de mesa o figuras de coleccion sin distribucion en tu pais.',
                'Juguetes educativos de marcas como Melissa & Doug a mitad de precio.',
            ],
            skipIf: [
                'Es un juguete mainstream disponible en Amazon de tu pais.',
                'Es grande o fragil y dificil de empacar.',
                'Es para ninos que van a perder interes en 2 semanas.',
            ],
            commonError: 'Comprar LEGO sets grandes sin calcular que ocupan media maleta. Tip: pedi que te lo envien por correo desde la tienda.',
        },
    },
];

// ============================================================
// ZONAS DE COMPRAS
// ============================================================

export interface ShoppingZone {
    id: string;
    name: string;
    type: 'outlet' | 'mall' | 'park-retail' | 'big-box';
    icon: string;
    distanceFromParks: string;
    priceLevel: 1 | 2 | 3;
    bestFor: string[];
    avoid: string[];
    tip: string;
    hours: string;
}

export const SHOPPING_ZONES: ShoppingZone[] = [
    {
        id: 'vineland',
        name: 'Orlando Vineland Premium Outlets',
        type: 'outlet',
        icon: 'solar:bag-bold-duotone',
        distanceFromParks: '10 min de Disney',
        priceLevel: 2,
        bestFor: ['Nike, Adidas, Under Armour a precios reales de outlet', 'Coach, Kate Spade, Michael Kors', 'Ropa deportiva y calzado tecnico'],
        avoid: ['Comprar sin cuponera (hay descuentos extra en el Guest Services)', 'Ir en fin de semana (colas de 30+ min en caja)'],
        tip: 'Anda entre semana antes de las 11 AM. Pedi la cuponera VIP en Guest Services mostrando tu pasaporte extranjero.',
        hours: 'Lun-Sab 10:00-23:00, Dom 10:00-21:00',
    },
    {
        id: 'intl-drive',
        name: 'Orlando International Premium Outlets',
        type: 'outlet',
        icon: 'solar:bag-bold-duotone',
        distanceFromParks: '15 min de Universal',
        priceLevel: 2,
        bestFor: ['Mas variedad de marcas europeas', 'Saks Off Fifth, Neiman Marcus Last Call', 'Mejor layout para caminar'],
        avoid: ['Duplicar visita si ya fuiste a Vineland (70% mismo inventario)', 'Zona de food court cara y mala'],
        tip: 'Si tu hotel esta cerca de Universal, este es tu outlet. Si estas en Disney, ve a Vineland.',
        hours: 'Lun-Sab 10:00-23:00, Dom 10:00-21:00',
    },
    {
        id: 'disney-springs',
        name: 'Disney Springs',
        type: 'park-retail',
        icon: 'solar:star-bold-duotone',
        distanceFromParks: 'Dentro de Disney (bus gratis)',
        priceLevel: 3,
        bestFor: ['Merchandise exclusivo Disney sin pagar entrada a parque', 'World of Disney (tienda mas grande del mundo)', 'LEGO Store con piezas exclusivas'],
        avoid: ['Comprar souvenirs genericos (son iguales en todos los parques)', 'Comer ahi sin reserva (precios de parque tematico)'],
        tip: 'Es gratis entrar y el estacionamiento es gratis. Ideal para el ultimo dia de viaje.',
        hours: 'Dom-Jue 10:00-23:00, Vie-Sab 10:00-23:30',
    },
    {
        id: 'citywalk',
        name: 'Universal CityWalk',
        type: 'park-retail',
        icon: 'solar:star-bold-duotone',
        distanceFromParks: 'Entrada de Universal',
        priceLevel: 3,
        bestFor: ['Merchandise Harry Potter y Nintendo exclusivo', 'Tiendas tematicas unicas', 'Es gratis entrar despues de las 6 PM'],
        avoid: ['Precios premium en todo', 'Comprar comida generica (hay mejores opciones afuera)'],
        tip: 'Los precios son identicos a los de dentro de los parques. Si ya entraste al parque, compra adentro.',
        hours: 'Abierto hasta 2:00 AM',
    },
    {
        id: 'walmart-target',
        name: 'Walmart & Target',
        type: 'big-box',
        icon: 'solar:cart-large-bold-duotone',
        distanceFromParks: '10-20 min de cualquier parque',
        priceLevel: 1,
        bestFor: ['Snacks, agua, protector solar a precio real', 'Ropa basica (Hanes, Fruit of the Loom) ultra barata', 'Medicamentos sin receta, vitaminas, cosmeticos de farmacia'],
        avoid: ['Ir sin lista (terminas comprando de mas)', 'Comprar electronica ahi (mejor precio en BestBuy o Amazon)'],
        tip: 'El Walmart de Irlo Bronson Hwy (Kissimmee) es el mas cercano a Disney. Anda la primera noche para provisiones.',
        hours: '6:00-23:00 todos los dias',
    },
    {
        id: 'millenia',
        name: 'The Mall at Millenia',
        type: 'mall',
        icon: 'solar:shop-bold-duotone',
        distanceFromParks: '20 min de Universal',
        priceLevel: 3,
        bestFor: ['Apple Store (si necesitas servicio tecnico o accesorios)', 'Marcas de lujo: Louis Vuitton, Gucci, Burberry', 'BestBuy cercano para electronica'],
        avoid: ['Ir esperando precios de outlet (es un mall premium)', 'Perder mas de 2 horas ahi'],
        tip: 'Solo vale la pena si buscas algo especifico de lujo o necesitas la Apple Store. No es un destino de "paseo".',
        hours: 'Lun-Sab 10:00-21:00, Dom 11:00-19:00',
    },
];

// ============================================================
// TIPS DE AHORRO
// ============================================================

export interface SavingTip {
    id: string;
    title: string;
    icon: string;
    description: string;
    savings: string;
}

export const SAVING_TIPS: SavingTip[] = [
    {
        id: 'tax',
        title: 'No existe Tax-Free en Florida',
        icon: 'solar:bill-cross-bold-duotone',
        description: 'Florida cobra 6.5% de sales tax en casi todo. No hay devolucion de impuestos para turistas como en Europa. El precio en gondola NO es el precio final.',
        savings: 'Presupuesta +6.5% en cada compra',
    },
    {
        id: 'coupons',
        title: 'Cuponeras de Outlets',
        icon: 'solar:ticket-sale-bold-duotone',
        description: 'En Guest Services de cada outlet, mostra tu pasaporte extranjero y te dan una cuponera VIP con descuentos extra del 10-25% en tiendas seleccionadas. Es gratis.',
        savings: 'Ahorro promedio: 15% extra',
    },
    {
        id: 'cashback',
        title: 'Apps de Cashback',
        icon: 'solar:smartphone-2-bold-duotone',
        description: 'Rakuten, Ibotta y Honey devuelven entre 2-10% en compras. Funcionan con tarjetas internacionales. Activalas ANTES de viajar.',
        savings: 'Recuperas 3-8% del gasto total',
    },
    {
        id: 'timing',
        title: 'Cuando comprar en el viaje',
        icon: 'solar:calendar-bold-duotone',
        description: 'Nunca el primer dia (estas cansado y compras por impulso). Ideal: penultimo dia. Ya sabes que necesitas, que te gusto, y tenes margen para devolver si algo falla.',
        savings: 'Evitas compras impulsivas (-30%)',
    },
    {
        id: 'luggage',
        title: 'Estrategia de Maleta',
        icon: 'solar:suitcase-bold-duotone',
        description: 'Viaja con una maleta semivacia o lleva una plegable extra. El overweight de aerolineas cuesta $100-200. Calcula el peso ANTES de comprar, no en el aeropuerto.',
        savings: 'Evitas $100-200 de overweight',
    },
    {
        id: 'shipping',
        title: 'Envio a Domicilio',
        icon: 'solar:box-bold-duotone',
        description: 'Tiendas como Apple, Disney Store y Amazon pueden enviar a tu hotel. Para envios internacionales, usa un courier como Aerobox o Miami Box que consolida paquetes.',
        savings: 'Libera maleta para otros items',
    },
];

// ============================================================
// CALCULADORA - Categorias con tasas de aduana estimadas
// ============================================================

export interface CustomsCategory {
    id: string;
    label: string;
    icon: string;
    dutyRate: number; // porcentaje estimado sobre el precio
    notes: string;
}

export const CUSTOMS_CATEGORIES: CustomsCategory[] = [
    { id: 'electronics', label: 'Electronica', icon: 'solar:laptop-bold-duotone', dutyRate: 0, notes: 'Generalmente exenta si es uso personal (1 unidad)' },
    { id: 'clothing', label: 'Ropa y Calzado', icon: 'solar:t-shirt-bold-duotone', dutyRate: 35, notes: 'Depende del pais. Argentina: ~50% sobre excedente de franquicia' },
    { id: 'cosmetics', label: 'Cosmeticos', icon: 'solar:heart-pulse-bold-duotone', dutyRate: 25, notes: 'Suelen entrar dentro de la franquicia personal' },
    { id: 'toys', label: 'Juguetes', icon: 'solar:gamepad-bold-duotone', dutyRate: 20, notes: 'Saca de la caja para reducir volumen y evitar sospechas' },
    { id: 'food', label: 'Alimentos', icon: 'solar:cup-hot-bold-duotone', dutyRate: 0, notes: 'Permitido si esta sellado. Prohibido: carnes, lacteos, frutas' },
];

export const FL_SALES_TAX = 0.065;