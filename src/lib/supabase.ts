import { createClient } from '@supabase/supabase-js';

// Cliente público — solo para operaciones de escritura del survey (insert).
// Usa la clave pública (anon key). Nunca exponer SUPABASE_SECRET_KEY en este archivo.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export const supabase = createClient(url, key);
