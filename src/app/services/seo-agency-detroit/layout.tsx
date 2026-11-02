import type { Metadata } from "next";
import { seoFaqs } from "./faqs";

const BASE_URL = "https://spectecle.com";
const PAGE_URL = `${BASE_URL}/services/seo-agency-detroit`;

export const metadata: Metadata = {
  title: "SEO Agency Detroit: Local SEO That Brings Calls",
  description:
    "Detroit SEO agency for local businesses: technical fixes, Google Business Profile, and content that ranks, reported monthly. Get a free SEO audit.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "SEO Agency Detroit: Local SEO That Brings Calls | Spectecle",
    description:
      "Detroit SEO agency specializing in local search, technical SEO, and content strategy. Page-one rankings for Michigan businesses.",
    url: PAGE_URL,
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "SEO & Digital Marketing: Detroit, Michigan",
    provider: { "@id": `${BASE_URL}/#organization` },
    areaServed: [
      { "@type": "City", name: "Detroit" },
      { "@type": "State", name: "Michigan" },
      { "@type": "Country", name: "United States" },
    ],
    description:
      "Search-first SEO strategies combining technical audits, local search optimization, and content to push Detroit businesses to page one and keep them there.",
    url: PAGE_URL,
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: seoFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${BASE_URL}/services` },
      { "@type": "ListItem", position: 3, name: "SEO Agency Detroit", item: PAGE_URL },
    ],
  },
];

export default function SEOLayout({ children }: { children: React.ReactNode }) {
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
