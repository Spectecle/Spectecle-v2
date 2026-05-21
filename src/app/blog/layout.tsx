import type { Metadata } from "next";

const BASE_URL = "https://spectecle.com";

export const metadata: Metadata = {
  title: "Blog — Web Design, SEO & AI Insights",
  description:
    "Actionable guides on web design, local SEO, and AI automation for Michigan businesses. Learn how photographers, contractors, law firms, beauty studios, and e-commerce shops grow with digital marketing.",
  keywords: [
    "web design blog Michigan",
    "local SEO guide Michigan",
    "photography website SEO Michigan",
    "contractor website design Michigan guide",
    "law firm website SEO Michigan",
    "makeup artist SEO Michigan",
    "AI automation guide Michigan",
    "e-commerce website design Michigan",
    "digital marketing Michigan blog",
    "web design tips Detroit",
  ],
  openGraph: {
    title: "Blog | Spectecle SEO & Web Design — AI & SEO Insights",
    description:
      "Actionable guides on web design, local SEO, and AI automation for businesses in Michigan and beyond.",
    url: `${BASE_URL}/blog`,
  },
  alternates: { canonical: `${BASE_URL}/blog` },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      "@id": `${BASE_URL}/blog`,
      name: "Spectecle Blog — Web Design, SEO & AI Insights",
      description:
        "Actionable guides on web design, local SEO, and AI automation for Michigan businesses.",
      url: `${BASE_URL}/blog`,
      publisher: { "@id": `${BASE_URL}/#organization` },
      inLanguage: "en-US",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
      ],
    },
  ],
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
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
