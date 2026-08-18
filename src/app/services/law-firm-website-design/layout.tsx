import type { Metadata } from "next";

const BASE_URL = "https://spectecle.com";
const PAGE_URL = `${BASE_URL}/services/law-firm-website-design`;

export const metadata: Metadata = {
  title: "Law Firm Website Design | Attorney Websites",
  description:
    "Custom law firm website design for attorneys and legal practices nationwide. Authority-first design, practice area pages, and consultation-focused conversion, built to earn client trust.",
  keywords: [
    "law firm website design",
    "attorney website design",
    "legal website design",
    "law firm web design agency",
    "website for lawyers",
    "law firm SEO",
    "personal injury attorney website",
    "family law website design",
    "criminal defense attorney website",
    "estate planning website design",
    "immigration lawyer website",
    "law firm website design near me",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Law Firm Website Design | Attorney Websites | Spectecle",
    description:
      "Custom law firm website design built to earn client trust. Authority-first design, practice area pages, and consultation-focused conversion.",
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Law Firm Website Design | Attorney Websites | Spectecle",
    description:
      "Custom law firm website design built to earn client trust and convert consultations.",
  },
};

const faqs = [
  {
    q: "How is a law firm website different from a regular business website?",
    a: "Legal services are a high-trust, high-stakes purchase. Visitors are often searching during a stressful moment and deciding, in seconds, whether to trust you with something serious. A law firm site has to establish credibility immediately: credentials, case focus, and a clear, low-pressure path to a consultation, not just a generic contact form.",
  },
  {
    q: "Do you design sites for solo attorneys and small firms, or only large practices?",
    a: "Both. We've built sites for solo practitioners and small, focused practices, and the same principles apply regardless of size: clear practice area pages, strong credibility signals, and a consultation flow that actually converts.",
  },
  {
    q: "Can you build pages for multiple practice areas?",
    a: "Yes. Multi-practice firms get a dedicated, individually optimized page for each practice area, so someone searching for a specific issue, like custody or a DUI, lands on content built specifically for that search, not a generic services page.",
  },
  {
    q: "Do you follow attorney advertising rules?",
    a: "We build the site around the content and disclosures you provide and will work with your guidance on state bar advertising requirements. We are not a substitute for your own compliance review, and we recommend having your content reviewed against your state bar's advertising rules before launch.",
  },
  {
    q: "Will the site help with local SEO for my practice area and city?",
    a: "Yes. Local SEO is available alongside the website build: Google Business Profile optimization, location-specific content, and legal schema markup that helps you show up for searches like 'family lawyer near me' or 'personal injury attorney in [your city].'",
  },
  {
    q: "Can you migrate content from our current website?",
    a: "Yes. We audit your existing site's content, redirect old URLs properly to protect any search rankings you've already earned, and rebuild what's worth keeping into the new design.",
  },
  {
    q: "How much does a law firm website cost?",
    a: "Every project is custom quoted based on the number of practice areas, pages, and integrations you need. Reach out for a free, no-pressure quote scoped to your firm.",
  },
  {
    q: "Do you offer ongoing website maintenance for law firms?",
    a: "Yes. Ongoing care plans keep your site secure, current, and updated as your team, results, and practice areas change, without you needing an in-house web team.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Law Firm Website Design",
    serviceType: "Law Firm Website Design",
    provider: { "@id": `${BASE_URL}/#organization` },
    audience: {
      "@type": "Audience",
      audienceType: "Law Firms and Attorneys",
    },
    areaServed: [{ "@type": "Country", name: "United States" }],
    description:
      "Custom website design for law firms and attorneys: authority-first design, practice area pages, attorney credential pages, and consultation-focused conversion.",
    url: PAGE_URL,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Law Firm Website Design Services",
      itemListElement: [
        "Family Law",
        "Personal Injury",
        "Estate Planning & Probate",
        "Criminal Defense",
        "Business & Corporate Law",
        "Immigration Law",
        "Real Estate Law",
        "Bankruptcy Law",
      ].map((area) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: `${area} Website Design` },
      })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
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
      { "@type": "ListItem", position: 3, name: "Law Firm Website Design", item: PAGE_URL },
    ],
  },
];

export default function LawFirmWebsiteDesignLayout({ children }: { children: React.ReactNode }) {
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
