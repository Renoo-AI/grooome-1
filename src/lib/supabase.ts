import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase is wired up and ready. Provide credentials via environment
 * variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY) to go live.
 *
 * When credentials are absent (e.g. demo / preview), the app automatically
 * falls back to a local store so the full booking experience still works.
 *
 * See `supabase/schema.sql` for the required tables.
 */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string)
  : null;
