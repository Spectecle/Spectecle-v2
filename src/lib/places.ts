export type ProspectResult = {
  placeId: string;
  name: string;
  address: string | null;
  phone: string | null;
  rating: number | null;
  reviewCount: number | null;
};

type PlacesSearchResponse = {
  places?: Array<{
    id: string;
    displayName?: { text?: string };
    formattedAddress?: string;
    nationalPhoneNumber?: string;
    websiteUri?: string;
    rating?: number;
    userRatingCount?: number;
  }>;
  nextPageToken?: string;
};

// Every field the response should include must be named here explicitly --
// Places API (New) omits anything not in the mask, including nextPageToken.
const FIELD_MASK =
  "places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount,nextPageToken";

/** Places API (New) Text Search -- Google's own official endpoint for
 * "find businesses matching a text query," used deliberately instead of
 * scraping Google Maps/Search HTML (which violates Google's Terms of
 * Service and breaks on every layout change). Filters results down to only
 * businesses with no `websiteUri` on file -- the sole "no website" signal
 * used here, per explicit product decision (no secondary search-engine
 * verification pass). This is a billed API call, unlike PageSpeed's free
 * tier -- see GOOGLE_PLACES_API_KEY in .env.local.example. */
export async function searchBusinessesWithoutWebsite(
  query: string,
  pageToken?: string
): Promise<{ results: ProspectResult[]; nextPageToken: string | null }> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) throw new Error("GOOGLE_PLACES_API_KEY is not set");

  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": FIELD_MASK,
    },
    body: JSON.stringify(pageToken ? { textQuery: query, pageToken } : { textQuery: query }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Places API error: ${res.status} — ${body}`);
  }

  const data = (await res.json()) as PlacesSearchResponse;
  const results: ProspectResult[] = (data.places ?? [])
    .filter((p) => !p.websiteUri)
    .map((p) => ({
      placeId: p.id,
      name: p.displayName?.text ?? "Unknown business",
      address: p.formattedAddress ?? null,
      phone: p.nationalPhoneNumber ?? null,
      rating: typeof p.rating === "number" ? p.rating : null,
      reviewCount: typeof p.userRatingCount === "number" ? p.userRatingCount : null,
    }));

  return { results, nextPageToken: data.nextPageToken ?? null };
}
