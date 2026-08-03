import type { Metadata } from "next";

const BASE_URL = "https://spectecle.com";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies — Web Design, SEO & AI Work",
  description:
    "Real projects. Measurable results. Browse Spectecle's portfolio of web design, local SEO, and AI automation work for businesses across the U.S. — from photography studios and law firms to IT companies and beauty brands.",
  keywords: [
    "web design portfolio",
    "web design case studies",
    "photography website design case study",
    "contractor website design",
    "law firm website design",
    "beauty studio website design",
    "makeup artist website design",
    "healthcare clinic website design",
    "e-commerce website design",
    "IT company website design",
    "drywall contractor local SEO",
    "Google Map Pack ranking",
    "AI automation business case study",
    "local SEO results",
    "web design agency portfolio",
    "attorney website design",
    "glass company website design",
    "sports clinic SEO",
    "digital agency case studies",
    "web design results",
  ],
  openGraph: {
    title: "Portfolio & Case Studies | Spectecle SEO & Web Design",
    description:
      "Real projects, real results. Web design, SEO & AI automation case studies for clients nationwide.",
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
        "Web design, SEO, and AI automation case studies for real businesses nationwide. Industries include photography, contractors, legal, beauty, healthcare, e-commerce, and IT.",
      url: `${BASE_URL}/work`,
      publisher: { "@id": `${BASE_URL}/#organization` },
      about: [
        { "@type": "Thing", "name": "Photography Website Design" },
        { "@type": "Thing", "name": "Contractor Website Design" },
        { "@type": "Thing", "name": "Family Law Website Design" },
        { "@type": "Thing", "name": "Beauty Studio Website Design" },
        { "@type": "Thing", "name": "Healthcare Website Design" },
        { "@type": "Thing", "name": "Optometry Website Design" },
        { "@type": "Thing", "name": "Home Services Website Design" },
        { "@type": "Thing", "name": "E-commerce Website Design" },
        { "@type": "Thing", "name": "IT Company Website Design" },
        { "@type": "Thing", "name": "Local SEO" },
        { "@type": "Thing", "name": "AI Business Automation" },
        { "@type": "Thing", "name": "Google Map Pack Ranking" },
      ],
      hasPart: [
        { "@type": "WebPage", name: "Optometry Website Design & Ongoing Care — Vue Optometry", url: `${BASE_URL}/work/vue-optometry` },
        { "@type": "WebPage", name: "Beauty Studio Website & Makeup Artist SEO — Glam by Abeer", url: `${BASE_URL}/work/glam-by-abeer` },
        { "@type": "WebPage", name: "Family Law Website Design & Legal SEO — MI Family Lawyer", url: `${BASE_URL}/work/mi-family-lawyer` },
        { "@type": "WebPage", name: "Home Services Website Redesign — Dearborn Cleaners", url: `${BASE_URL}/work/dearborn-cleaners` },
        { "@type": "WebPage", name: "Glass Company Website & Local SEO — Detroit Glass & Mirror", url: `${BASE_URL}/work/detroit-glass-mirror` },
        { "@type": "WebPage", name: "Contractor Website Design & Local SEO — Salazar Drywall Pros", url: `${BASE_URL}/work/salazar-drywall-pros` },
        { "@type": "WebPage", name: "E-commerce Website Design — Indoor Garden", url: `${BASE_URL}/work/indoor-garden` },
        { "@type": "WebPage", name: "IT Company Website & AI Automation — Thematek", url: `${BASE_URL}/work/thematek` },
        { "@type": "WebPage", name: "Sports Clinic Website Design & SEO — The Stat Clinic", url: `${BASE_URL}/work/the-stat-clinic` },
      ],
    },
    {
      "@type": "ItemList",
      name: "Industries Served — Spectecle Web Design & SEO Portfolio",
      description: "Businesses nationwide that Spectecle has built websites, run local SEO, and deployed AI automation for.",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Optometry & Eye Care — Website Design & Ongoing Care", url: `${BASE_URL}/work/vue-optometry` },
        { "@type": "ListItem", position: 2, name: "Beauty Studios & Makeup Artists — Local SEO", url: `${BASE_URL}/work/glam-by-abeer` },
        { "@type": "ListItem", position: 3, name: "Law Firms & Attorneys — Legal Website SEO", url: `${BASE_URL}/work/mi-family-lawyer` },
        { "@type": "ListItem", position: 4, name: "Home Services & Specialty Cleaning — Website Redesign", url: `${BASE_URL}/work/dearborn-cleaners` },
        { "@type": "ListItem", position: 5, name: "Glass & Mirror Companies — Website Design", url: `${BASE_URL}/work/detroit-glass-mirror` },
        { "@type": "ListItem", position: 6, name: "Drywall & Home Services Contractors — Local SEO", url: `${BASE_URL}/work/salazar-drywall-pros` },
        { "@type": "ListItem", position: 7, name: "E-commerce & Plant Retail — Online Store Design", url: `${BASE_URL}/work/indoor-garden` },
        { "@type": "ListItem", position: 8, name: "IT & Technology Companies — AI Automation", url: `${BASE_URL}/work/thematek` },
        { "@type": "ListItem", position: 9, name: "Sports Performance & Healthcare Clinics — Website SEO", url: `${BASE_URL}/work/the-stat-clinic` },
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
