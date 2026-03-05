// ============================================================
// rateLimit.ts
// Utilidad simple de rate limiting en memoria por IP.
// Funciona por instancia del servidor — suficiente para
// bloquear bots en un sitio de tráfico moderado.
// Para producción de alto volumen: migrar a Vercel KV o Upstash.
// ============================================================

interface RateLimitRecord {
    count: number;
    resetAt: number;
}

// Store en memoria — vive mientras la instancia del servidor esté activa
const store = new Map<string, RateLimitRecord>();

// Limpieza periódica para evitar que el Map crezca indefinidamente
setInterval(() => {
    const now = Date.now();
    store.forEach((record, key) => {
        if (record.resetAt < now) store.delete(key);
    });
}, 60_000);

export function checkRateLimit(
    ip: string,
    limit: number,
    windowSeconds: number
): { allowed: boolean; remaining: number } {
    const now = Date.now();
    const record = store.get(ip);

    // Primera petición o ventana expirada — reiniciar contador
    if (!record || record.resetAt < now) {
        store.set(ip, { count: 1, resetAt: now + windowSeconds * 1_000 });
        return { allowed: true, remaining: limit - 1 };
    }

    // Límite alcanzado
    if (record.count >= limit) {
        return { allowed: false, remaining: 0 };
    }

    // Dentro del límite — incrementar
    record.count++;
    return { allowed: true, remaining: limit - record.count };
}
