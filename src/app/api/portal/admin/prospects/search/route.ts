import { NextResponse } from "next/server";
import { getSession, isAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { isTrustedOrigin } from "@/lib/origin-check";
import { searchBusinessesWithoutWebsite } from "@/lib/places";
import { PLACE_TYPE_LABEL_BY_VALUE } from "@/lib/google-place-types";

export async function POST(req: Request) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const admin = await getSession();
  if (!admin || !isAdmin(admin.email)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = (await req.json().catch(() => null)) as {
    includedType?: string;
    location?: string;
    pageToken?: string;
  } | null;

  const includedType = body?.includedType?.trim();
  const location = body?.location?.trim();
  const category = includedType ? PLACE_TYPE_LABEL_BY_VALUE[includedType] : undefined;
  if (!includedType || !category || !location) {
    return NextResponse.json({ error: "A valid category and location are required" }, { status: 400 });
  }

  let results;
  let nextPageToken: string | null;
  try {
    ({ results, nextPageToken } = await searchBusinessesWithoutWebsite(
      `${category} in ${location}`,
      body?.pageToken,
      includedType
    ));
  } catch (err) {
    console.error("[prospects/search] Places API error:", err);
    return NextResponse.json({ error: "Places API request failed — check GOOGLE_PLACES_API_KEY" }, { status: 502 });
  }

  if (results.length > 0) {
    // status/notes are deliberately left out of the upsert payload so an
    // overlapping repeat search refreshes rating/phone/etc. without
    // clobbering call progress already recorded on an existing row.
    const { error } = await supabase.from("prospects").upsert(
      results.map((r) => ({
        place_id: r.placeId,
        business_name: r.name,
        category,
        search_location: location,
        address: r.address,
        phone: r.phone,
        rating: r.rating,
        review_count: r.reviewCount,
        updated_at: new Date().toISOString(),
      })),
      { onConflict: "place_id" }
    );
    if (error) {
      console.error("[prospects/search] upsert error:", error);
      return NextResponse.json({ error: "Failed to save results" }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true, count: results.length, nextPageToken });
}
