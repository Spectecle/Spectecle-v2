import type { Metadata } from "next";

const BASE_URL = "https://spectecle.com";

export const metadata: Metadata = {
  title: "Contact Spectecle — Free Strategy Call | Detroit, MI",
  description:
    "Contact Spectecle SEO & Web Design in Detroit, MI for a free 30-minute strategy call. Web design, SEO, and AI automation for businesses in Michigan and nationwide. Response within 24 hours, no commitment required.",
  keywords: [
    "contact web design agency Detroit",
    "hire web designer Michigan",
    "web design quote Detroit MI",
    "free website consultation Michigan",
    "SEO consultation Detroit",
    "get a website quote Michigan",
    "digital agency Detroit contact",
    "AI automation consultation Michigan",
    "web agency phone number Detroit",
    "web design near me Detroit",
    "start a web project Michigan",
    "free strategy call web design",
    "contact SEO agency Detroit",
    "book web design consultation",
  ],
  openGraph: {
    title: "Contact Spectecle — Free Strategy Call | Detroit, MI",
    description:
      "Book a free 30-minute strategy call with Spectecle SEO & Web Design in Detroit, MI. Honest advice, no commitment, response within 24 hours.",
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
      name: "Contact Spectecle SEO & Web Design — Free Strategy Call",
      description:
        "Contact Spectecle for a free strategy call. Web design, SEO, and AI automation for businesses in Detroit, Michigan and beyond.",
      url: `${BASE_URL}/contact`,
      publisher: { "@id": `${BASE_URL}/#organization` },
      mainEntity: {
        "@type": "LocalBusiness",
        "@id": `${BASE_URL}/#organization`,
        name: "Spectecle SEO & Web Design",
        telephone: "+13133534105",
        email: "hello@spectecle.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Detroit",
          addressRegion: "MI",
          addressCountry: "US",
        },
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
