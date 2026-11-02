import type { Metadata } from "next";

const BASE_URL = "https://spectecle.com";

export const metadata: Metadata = {
  title: { absolute: "About Spectecle | Detroit Web Design & SEO Studio" },
  description:
    "Spectecle is a Detroit web design, SEO, and AI automation studio built around a small senior team: no account managers, no outsourcing, no handoffs.",
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "About Spectecle | Web Design, SEO & AI Automation Agency",
    description:
      "A small, senior team building web design, SEO, and AI automation for businesses nationwide, no account managers, no outsourced work, no handoffs.",
    url: `${BASE_URL}/about`,
  },
  alternates: { canonical: `${BASE_URL}/about` },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${BASE_URL}/about`,
      name: "About Spectecle: Web Design, SEO & AI Automation Agency",
      url: `${BASE_URL}/about`,
      description:
        "The story and principles behind Spectecle, a web design, SEO, and AI automation agency serving businesses nationwide.",
      publisher: { "@id": `${BASE_URL}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "About", item: `${BASE_URL}/about` },
      ],
    },
  ],
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
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
