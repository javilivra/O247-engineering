export interface SupportTier {
  id: string;
  emoji: string;
  label: string;
  amountARS: number;
  amountUSD: number;
  badge?: string;
  highlight?: boolean;
}

export interface SupportMethod {
  id: string;
  label: string;
  region: "international" | "argentina";
  icon: string;
  available: boolean;
}

export const SUPPORT_TIERS: SupportTier[] = [
  {
    id: "cafe",
    emoji: "☕",
    label: "Un café",
    amountARS: 4000,
    amountUSD: 3,
  },
  {
    id: "guia",
    emoji: "✨",
    label: "Una guía",
    amountARS: 7000,
    amountUSD: 5,
    badge: "Más elegido",
    highlight: true,
  },
  {
    id: "apoyo",
    emoji: "🚀",
    label: "Apoyo real",
    amountARS: 14000,
    amountUSD: 10,
  },
];

export const SUPPORT_METHODS: SupportMethod[] = [
  { id: "mercadopago", label: "MercadoPago",           region: "argentina",     icon: "🔵", available: true  },
  { id: "alias",       label: "Transferencia bancaria", region: "argentina",     icon: "🏦", available: true  },
  { id: "paypal",      label: "PayPal",                 region: "international", icon: "💙", available: false },
  { id: "stripe",      label: "Tarjeta internacional",  region: "international", icon: "💳", available: false },
];

export const BANK_DATA = {
  alias: "O247.ORLANDO",   // ← reemplazar con alias real
  cbu: "",                  // ← reemplazar con CBU real
  titular: "Orlando247",
};

export const PAYMENT_LINKS: Record<string, Record<string, string>> = {
  mercadopago: {
    cafe:  "",   // ← link MP $4.000
    guia:  "",   // ← link MP $7.000
    apoyo: "",   // ← link MP $14.000
    libre: "",   // ← link MP monto libre
  },
};

export const SUPPORT_COPY = {
  intro: {
    title: "Apoyar Orlando247",
    body: "Si O247 te ayudó a planificar mejor tu viaje, podés apoyar el proyecto para que sigamos explorando, actualizando y creando herramientas útiles para toda la comunidad.",
    cta: "Continuar",
  },
  method: {
    title: "¿Desde dónde querés apoyar?",
  },
  amount: {
    title: "Elegí tu aporte",
    freeLabel: "Monto libre",
    freePlaceholder: "Ingresá el monto en ARS",
    cta: "Ir al pago",
  },
};