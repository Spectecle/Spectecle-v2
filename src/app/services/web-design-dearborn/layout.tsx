import type { Metadata } from "next";
import { dearbornFaqs } from "./faqs";

const BASE_URL = "https://spectecle.com";
const PAGE_URL = `${BASE_URL}/services/web-design-dearborn`;

export const metadata: Metadata = {
  title: "Dearborn Web Design & Website Development",
  description:
    "Web design for Dearborn and Dearborn Heights businesses, from a studio based in Dearborn. Fast, custom websites built to rank locally. Get a free quote.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "Dearborn Web Design & Website Development | Spectecle",
    description: "Custom websites for Dearborn and Dearborn Heights businesses, from a studio based in Dearborn.",
    url: PAGE_URL,
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Web Design & Development: Dearborn, Michigan",
    serviceType: "Web Design",
    provider: { "@id": `${BASE_URL}/#organization` },
    areaServed: [
      { "@type": "City", name: "Dearborn" },
      { "@type": "City", name: "Dearborn Heights" },
    ],
    description:
      "Custom, fast-loading websites for Dearborn and Dearborn Heights businesses, with local SEO built in and ongoing care after launch.",
    url: PAGE_URL,
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dearbornFaqs.map((f) => ({
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
      { "@type": "ListItem", position: 3, name: "Web Design Dearborn", item: PAGE_URL },
    ],
  },
];

export default function WebDesignDearbornLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
