import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client.
 *
 * Safe to call from client components. Uses only the public anon key — the
 * service-role key and any LLM keys NEVER touch the browser bundle.
 *
 * When NEXT_PUBLIC_USE_MOCK_DATA is "true" the app reads from src/lib/mock-data
 * and never actually hits Supabase; this client is still constructed so auth
 * scaffolding compiles and is ready to switch on.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://mock.supabase.co";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "mock-anon-key";

  return createBrowserClient(url, anonKey);
}

export const USE_MOCK_DATA =
  process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "false"; // default to mock
