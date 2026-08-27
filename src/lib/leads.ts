import { supabase } from "@/lib/supabase";

export type Lead = {
  id: string;
  organization_id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  message: string | null;
  source: string;
  created_at: string;
};

export async function getLeadsForOrg(organizationId: string): Promise<Lead[]> {
  const { data, error } = await supabase
    .from("leads")
    .select("id, organization_id, name, email, phone, message, source, created_at")
    .eq("organization_id", organizationId)
    .order("created_at", { ascending: false })
    .returns<Lead[]>();
  if (error) {
    console.error("[leads] fetch error:", error);
    return [];
  }
  return data ?? [];
}
