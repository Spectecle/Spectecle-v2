import { supabase } from "@/lib/supabase";

export type ResolveOrgResult = { ok: true; id: string | null } | { ok: false; error: string };

/** Resolves the org to attach a client to: creates a new one if `newOrganization`
 * is given, otherwise passes through `organizationId` as-is (null if neither). */
export async function resolveOrganizationId(
  organizationId: string | undefined,
  newOrganization: { name?: string; websiteUrl?: string } | undefined
): Promise<ResolveOrgResult> {
  const newName = newOrganization?.name?.trim();
  if (newName) {
    const { data, error } = await supabase
      .from("organizations")
      .insert({ name: newName, website_url: newOrganization?.websiteUrl?.trim() || null })
      .select("id")
      .single();
    if (error || !data) {
      console.error("[organization-admin] create error:", error);
      return { ok: false, error: "Failed to create organization" };
    }
    return { ok: true, id: data.id };
  }
  return { ok: true, id: organizationId?.trim() || null };
}
