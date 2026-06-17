import type { Metadata } from "next";

const BASE_URL = "https://spectecle.com";
const PAGE_URL = `${BASE_URL}/services/seo-agency-detroit`;

export const metadata: Metadata = {
  title: "SEO Agency Detroit, MI — Local & Technical SEO",
  description:
    "Detroit SEO agency specializing in local search, technical SEO, and content strategy. Page-one rankings for Michigan businesses that need to be found.",
  keywords: [
    "SEO agency Detroit",
    "SEO company Detroit Michigan",
    "local SEO Detroit",
    "SEO services Michigan",
    "Detroit digital marketing agency",
    "Google Business Profile optimization Detroit",
    "technical SEO Michigan",
    "local SEO company near me",
    "SEO for small business Detroit",
    "search engine optimization Michigan",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "SEO Agency Detroit, MI | Spectecle",
    description:
      "Detroit SEO agency specializing in local search, technical SEO, and content strategy. Page-one rankings for Michigan businesses.",
    url: PAGE_URL,
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "SEO & Digital Marketing — Detroit, Michigan",
    provider: { "@id": `${BASE_URL}/#organization` },
    areaServed: [
      { "@type": "City", name: "Detroit" },
      { "@type": "State", name: "Michigan" },
      { "@type": "Country", name: "United States" },
    ],
    description:
      "Search-first SEO strategies combining technical audits, local search optimization, and content to push Detroit businesses to page one and keep them there.",
    url: PAGE_URL,
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How long does SEO take to show results in Detroit?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most businesses see meaningful ranking improvements within 3–6 months of consistent SEO work. For competitive local Detroit markets, expect 4–8 months to reach page one. We provide monthly reporting so you always know where you stand.",
        },
      },
      {
        "@type": "Question",
        name: "What is local SEO and why does my Detroit business need it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Local SEO optimizes your business to appear in Google searches with geographic intent — 'web designer near me' or 'attorney Detroit.' It includes Google Business Profile optimization, local citations, and geo-targeted content. For any business serving a local area, it's the highest-ROI marketing channel available.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer Google Business Profile optimization in Detroit?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Google Business Profile optimization is a core part of our local SEO service. We handle category selection, service descriptions, photo optimization, Q&A, and review strategy — the factors that determine whether you appear in the local map pack.",
        },
      },
      {
        "@type": "Question",
        name: "How do you measure SEO success?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We track keyword rankings, organic traffic, click-through rates, and most importantly — leads and revenue attributed to organic search. Every month you receive a clear report with the metrics that actually matter to your business.",
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
      { "@type": "ListItem", position: 3, name: "SEO Agency Detroit", item: PAGE_URL },
    ],
  },
];

export default function SEOLayout({ children }: { children: React.ReactNode }) {
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
