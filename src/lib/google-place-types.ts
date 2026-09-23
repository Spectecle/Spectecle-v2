// A curated subset of Google's official Place Types ("Table A" -- the types
// usable as `includedType` on a Places API Text Search), scoped to the kinds
// of small local businesses this feature is actually for: ones that
// plausibly still don't have a website, and that are a realistic client for
// a web design agency. The full table has ~250 types (most irrelevant here
// -- airports, zoos, embassies, ~180 restaurant cuisine sub-types, etc.), so
// this is a deliberate subset, not the whole list. Every value below is
// copied verbatim from Google's docs
// (developers.google.com/maps/documentation/places/web-service/place-types)
// -- these are real Google category strings, not guesses.
export type PlaceTypeOption = { value: string; label: string };
export type PlaceTypeGroup = { group: string; options: PlaceTypeOption[] };

export const PLACE_TYPE_GROUPS: PlaceTypeGroup[] = [
  {
    group: "Home & Trade Services",
    options: [
      { value: "electrician", label: "Electrician" },
      { value: "plumber", label: "Plumber" },
      { value: "roofing_contractor", label: "Roofing Contractor" },
      { value: "painter", label: "Painter" },
      { value: "locksmith", label: "Locksmith" },
      { value: "moving_company", label: "Moving Company" },
      { value: "laundry", label: "Laundry" },
      { value: "storage", label: "Storage" },
      { value: "courier_service", label: "Courier Service" },
    ],
  },
  {
    group: "Personal Care & Wellness",
    options: [
      { value: "hair_salon", label: "Hair Salon" },
      { value: "hair_care", label: "Hair Care" },
      { value: "barber_shop", label: "Barber Shop" },
      { value: "beauty_salon", label: "Beauty Salon" },
      { value: "nail_salon", label: "Nail Salon" },
      { value: "makeup_artist", label: "Makeup Artist" },
      { value: "beautician", label: "Beautician" },
      { value: "body_art_service", label: "Body Art Service (Tattoo/Piercing)" },
      { value: "foot_care", label: "Foot Care" },
      { value: "massage", label: "Massage" },
      { value: "massage_spa", label: "Massage Spa" },
      { value: "spa", label: "Spa" },
      { value: "sauna", label: "Sauna" },
      { value: "tanning_studio", label: "Tanning Studio" },
      { value: "skin_care_clinic", label: "Skin Care Clinic" },
      { value: "physiotherapist", label: "Physiotherapist" },
      { value: "chiropractor", label: "Chiropractor" },
      { value: "yoga_studio", label: "Yoga Studio" },
      { value: "wellness_center", label: "Wellness Center" },
    ],
  },
  {
    group: "Professional & Business Services",
    options: [
      { value: "lawyer", label: "Lawyer" },
      { value: "consultant", label: "Consultant" },
      { value: "marketing_consultant", label: "Marketing Consultant" },
      { value: "insurance_agency", label: "Insurance Agency" },
      { value: "real_estate_agency", label: "Real Estate Agency" },
      { value: "employment_agency", label: "Employment Agency" },
      { value: "tailor", label: "Tailor" },
      { value: "florist", label: "Florist" },
      { value: "catering_service", label: "Catering Service" },
      { value: "funeral_home", label: "Funeral Home" },
      { value: "chauffeur_service", label: "Chauffeur Service" },
      { value: "astrologer", label: "Astrologer" },
      { value: "psychic", label: "Psychic" },
    ],
  },
  {
    group: "Pets",
    options: [
      { value: "veterinary_care", label: "Veterinary Care" },
      { value: "pet_care", label: "Pet Care" },
      { value: "pet_boarding_service", label: "Pet Boarding Service" },
    ],
  },
  {
    group: "Automotive",
    options: [
      { value: "car_repair", label: "Car Repair" },
      { value: "car_wash", label: "Car Wash" },
      { value: "car_dealer", label: "Car Dealer" },
      { value: "car_rental", label: "Car Rental" },
      { value: "tire_shop", label: "Tire Shop" },
    ],
  },
  {
    group: "Food & Retail",
    options: [
      { value: "bakery", label: "Bakery" },
      { value: "cafe", label: "Cafe" },
      { value: "coffee_shop", label: "Coffee Shop" },
      { value: "deli", label: "Deli" },
      { value: "ice_cream_shop", label: "Ice Cream Shop" },
      { value: "donut_shop", label: "Donut Shop" },
      { value: "juice_shop", label: "Juice Shop" },
      { value: "candy_store", label: "Candy Store" },
      { value: "restaurant", label: "Restaurant" },
      { value: "bar", label: "Bar" },
      { value: "hardware_store", label: "Hardware Store" },
      { value: "furniture_store", label: "Furniture Store" },
      { value: "garden_center", label: "Garden Center" },
      { value: "gift_shop", label: "Gift Shop" },
      { value: "jewelry_store", label: "Jewelry Store" },
      { value: "clothing_store", label: "Clothing Store" },
      { value: "shoe_store", label: "Shoe Store" },
      { value: "pet_store", label: "Pet Store" },
      { value: "bicycle_store", label: "Bicycle Store" },
      { value: "home_improvement_store", label: "Home Improvement Store" },
      { value: "flea_market", label: "Flea Market" },
      { value: "thrift_store", label: "Thrift Store" },
    ],
  },
  {
    group: "Fitness & Recreation",
    options: [
      { value: "gym", label: "Gym" },
      { value: "fitness_center", label: "Fitness Center" },
      { value: "sports_club", label: "Sports Club" },
      { value: "sports_coaching", label: "Sports Coaching" },
    ],
  },
  {
    group: "Other Businesses",
    options: [
      { value: "coworking_space", label: "Coworking Space" },
      { value: "farm", label: "Farm" },
      { value: "manufacturer", label: "Manufacturer" },
      { value: "supplier", label: "Supplier" },
      { value: "non_profit_organization", label: "Non-Profit Organization" },
    ],
  },
];

export const PLACE_TYPE_LABEL_BY_VALUE: Record<string, string> = Object.fromEntries(
  PLACE_TYPE_GROUPS.flatMap((g) => g.options.map((o) => [o.value, o.label]))
);
