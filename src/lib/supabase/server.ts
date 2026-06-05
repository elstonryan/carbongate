import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

interface CookieToSet {
  name: string;
  value: string;
  options: CookieOptions;
}

/**
 * Server-side Supabase client (App Router).
 *
 * Used in server components, route handlers and server actions. Reads/writes
 * the auth cookie. The service-role key is only ever referenced here on the
 * server — never shipped to the client.
 *
 * In mock mode this is constructed but not used for data fetching; pages read
 * from src/lib/mock-data instead.
 */
export async function createClient() {
  const cookieStore = await cookies();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://mock.supabase.co";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "mock-anon-key";

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if middleware refreshes user sessions.
        }
      },
    },
  });
}
