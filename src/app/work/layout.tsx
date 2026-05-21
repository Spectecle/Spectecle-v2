import type { Metadata } from "next";

const BASE_URL = "https://spectecle.com";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies — Web Design, SEO & AI Work",
  description:
    "Real projects. Measurable results. Browse Spectecle's portfolio of web design, local SEO, and AI automation work for businesses in Detroit, Michigan and across the U.S. — from photography studios and law firms to IT companies and beauty brands.",
  keywords: [
    "web design portfolio Detroit Michigan",
    "web design case studies Michigan",
    "photography website design Michigan case study",
    "contractor website design Michigan",
    "law firm website design Michigan",
    "beauty studio website design Michigan",
    "makeup artist website design Michigan",
    "healthcare clinic website design Michigan",
    "e-commerce website design Michigan",
    "IT company website design Michigan",
    "drywall contractor local SEO Michigan",
    "Google Map Pack ranking Michigan",
    "AI automation business Michigan case study",
    "local SEO Detroit Michigan results",
    "web design agency portfolio Michigan",
    "attorney website design Michigan",
    "glass company website Detroit",
    "sports clinic SEO Michigan",
    "digital agency case studies Michigan",
    "web design results Detroit",
  ],
  openGraph: {
    title: "Portfolio & Case Studies | Spectecle SEO & Web Design — Detroit, MI",
    description:
      "Real projects, real results. Web design, SEO & AI automation case studies for Michigan businesses and clients nationwide.",
    url: `${BASE_URL}/work`,
  },
  alternates: { canonical: `${BASE_URL}/work` },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${BASE_URL}/work`,
      name: "Portfolio & Case Studies | Spectecle SEO & Web Design",
      description:
        "Web design, SEO, and AI automation case studies for real businesses — Michigan and nationwide. Industries include photography, contractors, legal, beauty, healthcare, e-commerce, and IT.",
      url: `${BASE_URL}/work`,
      publisher: { "@id": `${BASE_URL}/#organization` },
      about: [
        { "@type": "Thing", "name": "Photography Website Design Michigan" },
        { "@type": "Thing", "name": "Contractor Website Design Michigan" },
        { "@type": "Thing", "name": "Law Firm Website Design Michigan" },
        { "@type": "Thing", "name": "Beauty Studio Website Design Michigan" },
        { "@type": "Thing", "name": "Healthcare Website Design Michigan" },
        { "@type": "Thing", "name": "E-commerce Website Design Michigan" },
        { "@type": "Thing", "name": "IT Company Website Design Michigan" },
        { "@type": "Thing", "name": "Local SEO Detroit Michigan" },
        { "@type": "Thing", "name": "AI Business Automation Michigan" },
        { "@type": "Thing", "name": "Google Map Pack Ranking Michigan" },
      ],
      hasPart: [
        { "@type": "WebPage", name: "Photography Studio Web Design & Local SEO — Sunshine Photo Shots", url: `${BASE_URL}/work/sunshine-photo-shots` },
        { "@type": "WebPage", name: "E-commerce Website Design — Indoor Garden Michigan", url: `${BASE_URL}/work/indoor-garden` },
        { "@type": "WebPage", name: "Contractor Website Design & Local SEO — Salazar Drywall Pros", url: `${BASE_URL}/work/salazar-drywall-pros` },
        { "@type": "WebPage", name: "Detroit Glass Company Website & Local SEO — Detroit Glass & Mirror", url: `${BASE_URL}/work/detroit-glass-mirror` },
        { "@type": "WebPage", name: "Sports Clinic Website Design & SEO — The Stat Clinic Michigan", url: `${BASE_URL}/work/the-stat-clinic` },
        { "@type": "WebPage", name: "IT Company Website & AI Automation — Thematek Michigan", url: `${BASE_URL}/work/thematek` },
        { "@type": "WebPage", name: "Beauty Studio Website & Makeup Artist SEO — Glam by Abeer Michigan", url: `${BASE_URL}/work/glam-by-abeer` },
        { "@type": "WebPage", name: "Law Firm Website Design & Legal SEO — NM Legal Firm Michigan", url: `${BASE_URL}/work/nm-legal-firm` },
      ],
    },
    {
      "@type": "ItemList",
      name: "Industries Served — Spectecle Web Design & SEO Portfolio",
      description: "Michigan businesses and clients nationwide that Spectecle has built websites, run local SEO, and deployed AI automation for.",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Photography Studios — Web Design & Local SEO Michigan", url: `${BASE_URL}/work/sunshine-photo-shots` },
        { "@type": "ListItem", position: 2, name: "E-commerce & Plant Retail — Online Store Design Michigan", url: `${BASE_URL}/work/indoor-garden` },
        { "@type": "ListItem", position: 3, name: "Drywall & Home Services Contractors — Local SEO Detroit Michigan", url: `${BASE_URL}/work/salazar-drywall-pros` },
        { "@type": "ListItem", position: 4, name: "Glass & Mirror Companies — Website Design Detroit Michigan", url: `${BASE_URL}/work/detroit-glass-mirror` },
        { "@type": "ListItem", position: 5, name: "Sports Performance & Healthcare Clinics — Website SEO Michigan", url: `${BASE_URL}/work/the-stat-clinic` },
        { "@type": "ListItem", position: 6, name: "IT & Technology Companies — AI Automation Michigan", url: `${BASE_URL}/work/thematek` },
        { "@type": "ListItem", position: 7, name: "Beauty Studios & Makeup Artists — Local SEO Michigan", url: `${BASE_URL}/work/glam-by-abeer` },
        { "@type": "ListItem", position: 8, name: "Law Firms & Attorneys — Legal Website SEO Michigan", url: `${BASE_URL}/work/nm-legal-firm` },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Portfolio", item: `${BASE_URL}/work` },
      ],
    },
  ],
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
