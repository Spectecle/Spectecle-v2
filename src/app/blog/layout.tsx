import type { Metadata } from "next";

const BASE_URL = "https://spectecle.com";

export const metadata: Metadata = {
  title: "Blog: Web Design, SEO & AI Insights",
  description:
    "Actionable guides on web design, local SEO, and AI automation for small businesses nationwide. Learn how photographers, contractors, law firms, beauty studios, and e-commerce shops grow with digital marketing.",
  keywords: [
    "web design blog",
    "local SEO guide",
    "photography website SEO",
    "contractor website design guide",
    "law firm website SEO",
    "makeup artist SEO",
    "AI automation guide",
    "e-commerce website design",
    "digital marketing blog",
    "web design tips",
  ],
  openGraph: {
    title: "Blog | Spectecle SEO & Web Design: AI & SEO Insights",
    description:
      "Actionable guides on web design, local SEO, and AI automation for businesses nationwide.",
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
      name: "Spectecle Blog: Web Design, SEO & AI Insights",
      description:
        "Actionable guides on web design, local SEO, and AI automation for small businesses nationwide.",
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
