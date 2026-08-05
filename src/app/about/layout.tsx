import type { Metadata } from "next";

const BASE_URL = "https://spectecle.com";

export const metadata: Metadata = {
  title: "About Walid Alhassan, Founder of Spectecle | Web Design & SEO",
  description:
    "Meet Walid Alhassan, 10-year web developer, 12-year IT systems engineer, and 4-year AI practitioner behind Spectecle. A web design agency serving businesses nationwide.",
  keywords: [
    "Walid Alhassan web designer",
    "Spectecle agency founder",
    "web designer 10 years experience",
    "IT systems engineer web design",
    "web developer web design agency",
    "AI automation web design",
    "web design agency owner",
    "national web designer",
    "web design expert",
    "boutique web design studio",
    "web developer 10 years experience",
    "AI web design",
  ],
  openGraph: {
    title: "About Walid Alhassan, Founder of Spectecle",
    description:
      "10 years web development. 12 years IT systems engineering. 4 years AI. Meet the founder of Spectecle, a boutique web design, SEO & AI automation agency.",
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
      name: "About Walid Alhassan, Founder of Spectecle SEO & Web Design",
      url: `${BASE_URL}/about`,
      description:
        "The background and story of Walid Alhassan, founder of Spectecle, a web design, SEO, and AI automation agency serving businesses nationwide.",
      publisher: { "@id": `${BASE_URL}/#organization` },
    },
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#founder`,
      name: "Walid Alhassan",
      givenName: "Walid",
      familyName: "Alhassan",
      jobTitle: "Founder & Lead Strategist",
      description:
        "Walid Alhassan is a web developer with 10 years of experience, an IT systems engineer with 12 years of experience, and an AI practitioner with 4 years of experience. He is the founder of Spectecle, a web design, SEO, and AI automation agency serving businesses nationwide.",
      worksFor: { "@id": `${BASE_URL}/#organization` },
      knowsAbout: [
        "Web Design & Development",
        "Search Engine Optimization",
        "AI & Business Automation",
        "IT Systems Engineering",
        "Local SEO",
        "E-commerce Web Design",
        "Next.js Development",
        "Google Business Profile Optimization",
      ],
      url: `${BASE_URL}/about`,
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
