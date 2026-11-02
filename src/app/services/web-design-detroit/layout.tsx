import type { Metadata } from "next";
import { webDesignFaqs } from "./faqs";

const BASE_URL = "https://spectecle.com";
const PAGE_URL = `${BASE_URL}/services/web-design-detroit`;

export const metadata: Metadata = {
  title: "Web Design Detroit: Custom Websites That Convert",
  description:
    "Custom web design for Detroit businesses: fast, mobile-first websites with SEO built in, designed to turn visitors into calls. Free quote in one business day.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "Web Design Detroit: Custom Websites That Convert | Spectecle",
    description:
      "Custom web design for Detroit businesses. Fast, mobile-first websites with SEO built in, designed to turn visitors into calls.",
    url: PAGE_URL,
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Web Design & Development: Detroit, Michigan",
    serviceType: "Web design",
    provider: { "@id": `${BASE_URL}/#organization` },
    areaServed: [
      { "@type": "City", name: "Detroit" },
      { "@type": "AdministrativeArea", name: "Metro Detroit" },
      { "@type": "State", name: "Michigan" },
    ],
    description:
      "Custom web design and development for Detroit and Metro Detroit businesses: mobile-first websites with SEO, analytics, and clear paths to call or book, plus ongoing care after launch.",
    url: PAGE_URL,
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: webDesignFaqs.map((f) => ({
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
      { "@type": "ListItem", position: 3, name: "Web Design Detroit", item: PAGE_URL },
    ],
  },
];

export default function WebDesignLayout({ children }: { children: React.ReactNode }) {
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
