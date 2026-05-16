import type { Metadata } from "next";

const BASE_URL = "https://spectecle.com";

export const metadata: Metadata = {
  title: "Web Design, SEO & AI Automation Services in Detroit, MI",
  description:
    "Spectecle offers professional web design, SEO, and AI automation services in Detroit, Michigan. Custom Next.js websites that rank on Google, data-driven SEO that drives organic traffic, and intelligent workflow automation that scales your business. Serving Metro Detroit and clients nationwide.",
  keywords: [
    "web design services Detroit Michigan",
    "web design agency Detroit",
    "custom website design Michigan",
    "SEO services Detroit MI",
    "SEO agency Michigan",
    "local SEO Detroit",
    "AI automation services Michigan",
    "workflow automation small business",
    "Next.js web development Michigan",
    "web development Detroit",
    "digital marketing agency Detroit",
    "Google ranking services Michigan",
    "e-commerce web design Detroit",
    "AI chatbot development Michigan",
    "web design near me Detroit",
    "affordable web design Michigan",
    "professional web designer Detroit",
    "SEO company Michigan",
    "AI agent development",
    "web design and SEO agency",
  ],
  openGraph: {
    title: "Web Design, SEO & AI Services — Detroit, MI | Spectecle Agency",
    description:
      "Professional web design, SEO & AI automation for businesses in Detroit, Michigan and beyond. Custom websites that rank and convert. SEO that dominates. Automation that scales.",
    url: `${BASE_URL}/services`,
  },
  alternates: { canonical: `${BASE_URL}/services` },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${BASE_URL}/services#web-design`,
      name: "Web Design & Development Services",
      description:
        "Custom, high-performance websites built with Next.js and React for businesses in Detroit, Michigan and beyond. Mobile-first, SEO-ready, and optimized for Core Web Vitals.",
      provider: { "@id": `${BASE_URL}/#organization` },
      serviceType: "Web Design & Development",
      areaServed: [
        { "@type": "City", name: "Detroit" },
        { "@type": "State", name: "Michigan" },
        { "@type": "Country", name: "United States" },
      ],
      url: `${BASE_URL}/services#web-design`,
    },
    {
      "@type": "Service",
      "@id": `${BASE_URL}/services#seo`,
      name: "SEO & Digital Marketing Services",
      description:
        "Results-driven SEO for businesses in Detroit, Michigan and nationwide. Technical SEO, local search optimization, keyword strategy, content, and link building to reach page one on Google.",
      provider: { "@id": `${BASE_URL}/#organization` },
      serviceType: "Search Engine Optimization",
      areaServed: [
        { "@type": "City", name: "Detroit" },
        { "@type": "State", name: "Michigan" },
        { "@type": "Country", name: "United States" },
      ],
      url: `${BASE_URL}/services#seo`,
    },
    {
      "@type": "Service",
      "@id": `${BASE_URL}/services#ai`,
      name: "AI Automation & Workflow Services",
      description:
        "Custom AI agents, chatbot development, and end-to-end workflow automation for small and mid-size businesses. Using OpenAI, n8n, and custom APIs to eliminate manual work and scale operations.",
      provider: { "@id": `${BASE_URL}/#organization` },
      serviceType: "AI Automation",
      areaServed: [
        { "@type": "City", name: "Detroit" },
        { "@type": "State", name: "Michigan" },
        { "@type": "Country", name: "United States" },
      ],
      url: `${BASE_URL}/services#ai`,
    },
    {
      "@type": "FAQPage",
      "@id": `${BASE_URL}/services#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Do you offer web design and SEO services in Detroit, Michigan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — Spectecle is based in Detroit, MI and serves businesses across Metro Detroit, Dearborn, Southfield, Ann Arbor, Grand Rapids, and throughout Michigan. We also work remotely with clients across the U.S. and internationally.",
          },
        },
        {
          "@type": "Question",
          name: "How much does a website cost for a small business?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Web design costs vary based on scope, complexity, and your goals. Simple brochure sites, custom web applications, and full e-commerce stores each have different requirements. We provide transparent, itemized quotes after a free 30-minute discovery call — no hidden fees, no surprises.",
          },
        },
        {
          "@type": "Question",
          name: "How long does SEO take to show results?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most businesses see meaningful ranking improvements within 3–6 months of consistent SEO work. For competitive local markets like Detroit or statewide Michigan keywords, expect 4–8 months to reach page one. We provide monthly reporting so you always know exactly where you stand.",
          },
        },
        {
          "@type": "Question",
          name: "What is AI automation and how can it help my business?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AI automation replaces time-consuming, repetitive tasks with intelligent workflows. Common examples include: automated lead follow-up sequences, AI-powered customer support chatbots, automated reporting, CRM data entry, and document processing. For most businesses, automation saves 5–20 hours per week and meaningfully reduces operational costs.",
          },
        },
        {
          "@type": "Question",
          name: "Do you work with clients outside of Detroit?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. While we're proud to serve Metro Detroit and Michigan, the majority of our work is done remotely with clients across the United States and internationally. Our process is built for seamless remote collaboration — distance is never a barrier.",
          },
        },
        {
          "@type": "Question",
          name: "Can you take over an existing website or help with a redesign?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We conduct a full audit of your existing site — performance, SEO health, UX, and conversion rate — then either optimize it in place or migrate it to a better platform. Many clients come to us with a site that just isn't performing and leave with one that does.",
          },
        },
        {
          "@type": "Question",
          name: "What's included in your monthly maintenance plans?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Maintenance retainers include performance monitoring, security patches, content updates, uptime monitoring, and priority support with fast response times. Think of us as your dedicated on-call digital team — without the overhead of a full-time hire.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Services", item: `${BASE_URL}/services` },
      ],
    },
  ],
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
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
