import type { Metadata } from "next";

const BASE_URL = "https://spectecle.com";
const PAGE_URL = `${BASE_URL}/services/the-loop`;

export const metadata: Metadata = {
  title: "The Loop — Client Portal",
  description:
    "The Loop is Spectecle's private client portal: track requests, analytics, rankings, invoices, and reports in one place. Included free with every project.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "The Loop | Spectecle Client Portal",
    description:
      "A private client portal for tracking requests, analytics, invoices, and reports, all in one place. Included with every project.",
    url: PAGE_URL,
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "The Loop",
    provider: { "@id": `${BASE_URL}/#organization` },
    areaServed: [{ "@type": "Country", name: "United States" }],
    description:
      "A private client portal for tracking requests, analytics, invoices, and reports, included free with every Spectecle project.",
    url: PAGE_URL,
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is The Loop included with every project?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Every client gets access at no extra cost, from kickoff through launch and beyond.",
        },
      },
      {
        "@type": "Question",
        name: "What can I see inside The Loop?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Open requests, site analytics, rankings, invoices, and reports, all tied to your account.",
        },
      },
      {
        "@type": "Question",
        name: "How do I get access?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You'll get an email invite once your project starts. Sign in anytime with a secure link, no password required.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${BASE_URL}/services` },
      { "@type": "ListItem", position: 3, name: "The Loop", item: PAGE_URL },
    ],
  },
];

export default function TheLoopLayout({ children }: { children: React.ReactNode }) {
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
