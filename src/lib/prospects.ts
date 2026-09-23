import { supabase } from "@/lib/supabase";

export type ProspectStatus = "new" | "contacted" | "not_interested" | "converted";

export type Prospect = {
  id: string;
  place_id: string;
  business_name: string;
  category: string | null;
  search_location: string | null;
  address: string | null;
  phone: string | null;
  rating: number | null;
  review_count: number | null;
  status: ProspectStatus;
  notes: string | null;
  created_at: string;
};

export async function getProspects(): Promise<Prospect[]> {
  const { data, error } = await supabase
    .from("prospects")
    .select(
      "id, place_id, business_name, category, search_location, address, phone, rating, review_count, status, notes, created_at"
    )
    .order("created_at", { ascending: false })
    .returns<Prospect[]>();

  if (error) {
    console.error("[prospects] fetch error:", error);
    return [];
  }
  return data ?? [];
}
