import { createClient } from '@supabase/supabase-js';

const supabaseUrl     = process.env.NEXT_PUBLIC_SUPABASE_URL     ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

function isConfigured() {
  return supabaseUrl.startsWith('https://') && supabaseAnonKey.length > 10;
}

// Client-side Supabase client (singleton)
let _browser: ReturnType<typeof createClient> | null = null;

export function getBrowserClient() {
  if (!isConfigured()) throw new Error('Supabase ist nicht konfiguriert. Bitte .env.local befüllen.');
  if (!_browser) _browser = createClient(supabaseUrl, supabaseAnonKey);
  return _browser;
}

// Legacy export – same as getBrowserClient but throws gracefully
export const supabase = isConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Server-side client with service role (only for API routes)
export function createServiceClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY ist nicht gesetzt.');
  if (!supabaseUrl) throw new Error('NEXT_PUBLIC_SUPABASE_URL ist nicht gesetzt.');
  return createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
