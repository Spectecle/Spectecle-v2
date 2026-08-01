import { supabase } from "@/lib/supabase";
import { prettifyDomain } from "@/lib/organizations";

export type ResolveOrgResult = { ok: true; id: string | null } | { ok: false; error: string };

// Sentinel prefix groupByOrganization uses for a legacy, not-yet-assigned
// domain bucket (see src/lib/organizations.ts) — selecting one of these in
// a dropdown means "promote this bucket to a real organization."
const LEGACY_DOMAIN_PREFIX = "domain:";

/** Resolves the org to attach a client to: creates a new one if `newOrganization`
 * is given, promotes a legacy domain bucket if a `domain:` key was selected,
 * otherwise passes through `organizationId` as a real org id (null if neither). */
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

  const selection = organizationId?.trim();
  if (selection?.startsWith(LEGACY_DOMAIN_PREFIX)) {
    return promoteLegacyDomain(selection.slice(LEGACY_DOMAIN_PREFIX.length));
  }

  return { ok: true, id: selection || null };
}

/** Turns a legacy, not-yet-assigned domain bucket (e.g. everyone @nmlegalfirm.com
 * with no organization_id) into a real organization row, and backfills every
 * currently-unassigned user on that domain into it — the same promotion that
 * already happens when an admin renames a legacy bucket via OrganizationNameEditor. */
async function promoteLegacyDomain(domain: string): Promise<ResolveOrgResult> {
  const { data: created, error: createError } = await supabase
    .from("organizations")
    .insert({ name: prettifyDomain(domain), domain })
    .select("id")
    .single();

  if (createError || !created) {
    console.error("[organization-admin] promote error:", createError);
    return { ok: false, error: "Failed to create organization" };
  }

  const { error: backfillError } = await supabase
    .from("portal_users")
    .update({ organization_id: created.id })
    .is("organization_id", null)
    .ilike("email", `%@${domain}`);

  if (backfillError) {
    console.error("[organization-admin] backfill error:", backfillError);
  }

  return { ok: true, id: created.id };
}
