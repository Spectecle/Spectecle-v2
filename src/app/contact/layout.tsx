import type { Metadata } from "next";

const BASE_URL = "https://spectecle.com";

export const metadata: Metadata = {
  title: "Contact Spectecle: Free Strategy Call",
  description:
    "Contact Spectecle SEO & Web Design for a free 30-minute strategy call. Web design, SEO, and AI automation for businesses nationwide. Response within 24 hours, no commitment required.",
  keywords: [
    "contact web design agency",
    "hire web designer",
    "web design quote",
    "free website consultation",
    "SEO consultation",
    "get a website quote",
    "digital agency contact",
    "AI automation consultation",
    "web agency phone number",
    "web design near me",
    "start a web project",
    "free strategy call web design",
    "contact SEO agency",
    "book web design consultation",
  ],
  openGraph: {
    title: "Contact Spectecle: Free Strategy Call",
    description:
      "Book a free 30-minute strategy call with Spectecle SEO & Web Design. Honest advice, no commitment, response within 24 hours.",
    url: `${BASE_URL}/contact`,
  },
  alternates: { canonical: `${BASE_URL}/contact` },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${BASE_URL}/contact`,
      name: "Contact Spectecle SEO & Web Design: Free Strategy Call",
      description:
        "Contact Spectecle for a free strategy call. Web design, SEO, and AI automation for businesses nationwide.",
      url: `${BASE_URL}/contact`,
      publisher: { "@id": `${BASE_URL}/#organization` },
      mainEntity: {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${BASE_URL}/#organization`,
        name: "Spectecle SEO & Web Design",
        telephone: "+13133534105",
        email: "hello@spectecle.com",
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Contact", item: `${BASE_URL}/contact` },
      ],
    },
  ],
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
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
