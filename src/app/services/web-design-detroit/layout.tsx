import type { Metadata } from "next";

const BASE_URL = "https://spectecle.com";
const PAGE_URL = `${BASE_URL}/services/web-design-detroit`;

export const metadata: Metadata = {
  title: "Web Design & Development Detroit, MI",
  description:
    "Custom web design and development for Detroit businesses. Next.js, React, Core Web Vitals: sites built to rank on Google and convert visitors into customers.",
  keywords: [
    "web design Detroit",
    "web designer Detroit Michigan",
    "web development Detroit MI",
    "custom website design Detroit",
    "Next.js web development Michigan",
    "small business website design Detroit",
    "professional web design Michigan",
    "e-commerce website design Detroit",
    "responsive web design Detroit",
    "affordable web design Detroit Michigan",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Web Design & Development Detroit, MI | Spectecle",
    description:
      "Custom web design and development for Detroit businesses. Sites built to rank, load fast, and convert.",
    url: PAGE_URL,
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Web Design & Development: Detroit, Michigan",
    provider: { "@id": `${BASE_URL}/#organization` },
    areaServed: [
      { "@type": "City", name: "Detroit" },
      { "@type": "State", name: "Michigan" },
      { "@type": "Country", name: "United States" },
    ],
    description:
      "Custom web design and development using Next.js and React. High-performance, conversion-optimized websites for businesses in Detroit, Michigan and beyond.",
    url: PAGE_URL,
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does a website cost for a small business?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Web design costs vary based on scope and goals. Simple brochure sites, custom web applications, and e-commerce stores each have different requirements. We provide transparent, itemized quotes after a free 30-minute discovery call. No hidden fees, no surprises.",
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
        name: "What's included in your monthly website maintenance plans?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Maintenance retainers include performance monitoring, security patches, content updates, uptime monitoring, and priority support with fast response times.",
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
      { "@type": "ListItem", position: 3, name: "Web Design & Development", item: PAGE_URL },
    ],
  },
];

export default function WebDesignLayout({ children }: { children: React.ReactNode }) {
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
