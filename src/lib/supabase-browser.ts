import { createClient } from "@supabase/supabase-js";

// Uses the publishable key (safe to expose to the browser) — only ever used
// for uploadToSignedUrl(), where the token itself carries the upload
// authorization. Never import the service-role client (src/lib/supabase.ts)
// here.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export function getSupabaseBrowserClient() {
  if (!url || !publishableKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY."
    );
  }
  return createClient(url, publishableKey);
}
