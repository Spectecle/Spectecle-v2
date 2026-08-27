import type { Metadata } from "next";

const BASE_URL = "https://spectecle.com";
const PAGE_URL = `${BASE_URL}/services/web-design-birmingham-mi`;

export const metadata: Metadata = {
  title: "Web Design & Development Birmingham, MI",
  description:
    "Custom web design for Birmingham, Michigan businesses. Next.js, React, Core Web Vitals: refined, high-performance websites built for Oakland County's most discerning brands.",
  keywords: [
    "web design Birmingham MI",
    "web designer Birmingham Michigan",
    "website design Oakland County",
    "web development Birmingham MI",
    "custom website design Birmingham",
    "Next.js web development Oakland County",
    "small business website design Birmingham MI",
    "professional web design Bloomfield Hills",
    "boutique website design Michigan",
    "luxury brand web design Michigan",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Web Design & Development Birmingham, MI | Spectecle",
    description:
      "Custom web design for Birmingham, Michigan businesses. Refined sites built to rank, load fast, and convert.",
    url: PAGE_URL,
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Web Design & Development: Birmingham, Michigan",
    provider: { "@id": `${BASE_URL}/#organization` },
    areaServed: [
      { "@type": "City", name: "Birmingham" },
      { "@type": "AdministrativeArea", name: "Oakland County" },
      { "@type": "State", name: "Michigan" },
      { "@type": "Country", name: "United States" },
    ],
    description:
      "Custom web design and development using Next.js and React for Birmingham, Michigan and Oakland County businesses. High-performance, conversion-optimized websites for boutiques, practices, and professional brands.",
    url: PAGE_URL,
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does a website cost in Birmingham, MI?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Web design costs vary based on scope and goals. Brochure sites, custom web applications, and e-commerce stores for boutiques or practices each have different requirements. We provide transparent, itemized quotes after a free 30-minute discovery call. No hidden fees, no surprises.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to build a website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most custom websites take a few weeks from kickoff to launch. Simpler brochure sites move faster. Timeline depends on feedback turnaround and the complexity of integrations required.",
        },
      },
      {
        "@type": "Question",
        name: "Do you build websites with SEO built in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Every site we build includes on-page SEO from day one: proper heading structure, schema markup, fast load times, and Core Web Vitals optimization. SEO is not an afterthought.",
        },
      },
      {
        "@type": "Question",
        name: "Do you only work with businesses in Birmingham?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Birmingham is a core part of our Oakland County service area alongside Bloomfield Hills, Royal Oak, Troy, and Franklin, and we work with businesses across Metro Detroit and beyond. If your brand holds itself to a high standard, we're a fit regardless of zip code.",
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
      { "@type": "ListItem", position: 3, name: "Web Design & Development: Birmingham, MI", item: PAGE_URL },
    ],
  },
];

export default function WebDesignBirminghamLayout({ children }: { children: React.ReactNode }) {
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
