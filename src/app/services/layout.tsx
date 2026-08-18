import type { Metadata } from "next";

const BASE_URL = "https://spectecle.com";

export const metadata: Metadata = {
  title: "Web Design, SEO & AI Automation Services",
  description:
    "Spectecle offers professional web design, SEO, and AI automation services for businesses nationwide. Custom Next.js websites that rank on Google, data-driven SEO that drives organic traffic, and intelligent workflow automation that scales your business.",
  keywords: [
    "web design services",
    "web design agency",
    "custom website design",
    "SEO services",
    "SEO agency",
    "local SEO services",
    "AI automation services",
    "workflow automation small business",
    "Next.js web development",
    "web development agency",
    "digital marketing agency",
    "Google ranking services",
    "e-commerce web design",
    "AI chatbot development",
    "web design near me",
    "affordable web design",
    "professional web designer",
    "SEO company",
    "AI agent development",
    "web design and SEO agency",
  ],
  openGraph: {
    title: "Web Design, SEO & AI Services | Spectecle SEO & Web Design",
    description:
      "Professional web design, SEO & AI automation for businesses nationwide. Custom websites that rank and convert. SEO that dominates. Automation that scales.",
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
        "Custom, high-performance websites built with Next.js and React for businesses nationwide. Mobile-first, SEO-ready, and optimized for Core Web Vitals.",
      provider: { "@id": `${BASE_URL}/#organization` },
      serviceType: "Web Design & Development",
      areaServed: [{ "@type": "Country", name: "United States" }],
      url: `${BASE_URL}/services#web-design`,
    },
    {
      "@type": "Service",
      "@id": `${BASE_URL}/services#seo`,
      name: "SEO & Digital Marketing Services",
      description:
        "Results-driven SEO for businesses nationwide. Technical SEO, local search optimization, keyword strategy, content, and link building to reach page one on Google.",
      provider: { "@id": `${BASE_URL}/#organization` },
      serviceType: "Search Engine Optimization",
      areaServed: [{ "@type": "Country", name: "United States" }],
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
      areaServed: [{ "@type": "Country", name: "United States" }],
      url: `${BASE_URL}/services#ai`,
    },
    {
      "@type": "Service",
      "@id": `${BASE_URL}/services/law-firm-website-design`,
      name: "Law Firm Website Design",
      description:
        "Custom website design for law firms and attorneys nationwide: authority-first design, practice area pages, and consultation-focused conversion.",
      provider: { "@id": `${BASE_URL}/#organization` },
      serviceType: "Law Firm Website Design",
      areaServed: [{ "@type": "Country", name: "United States" }],
      url: `${BASE_URL}/services/law-firm-website-design`,
    },
    {
      "@type": "Service",
      "@id": `${BASE_URL}/services/medical-website-design`,
      name: "Medical & Healthcare Website Design",
      description:
        "Custom website design for doctors, dentists, and private practices nationwide: patient-first design, service pages, and appointment-focused conversion.",
      provider: { "@id": `${BASE_URL}/#organization` },
      serviceType: "Medical Website Design",
      areaServed: [{ "@type": "Country", name: "United States" }],
      url: `${BASE_URL}/services/medical-website-design`,
    },
    {
      "@type": "FAQPage",
      "@id": `${BASE_URL}/services#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Do you offer local SEO services?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, we help single-location and multi-location businesses show up in local search results anywhere in the country. We also work remotely with clients across the U.S. and internationally.",
          },
        },
        {
          "@type": "Question",
          name: "How much does a website cost for a small business?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Web design costs vary based on scope, complexity, and your goals. Simple brochure sites, custom web applications, and full e-commerce stores each have different requirements. We provide transparent, itemized quotes after a free 30-minute discovery call. No hidden fees, no surprises.",
          },
        },
        {
          "@type": "Question",
          name: "How long does SEO take to show results?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most businesses see meaningful ranking improvements within 3–6 months of consistent SEO work. For competitive local or national keywords, expect 4–8 months to reach page one. We provide monthly reporting so you always know exactly where you stand.",
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
          name: "Do you work with clients remotely?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. The majority of our work is done remotely with clients across the United States and internationally. Our process is built for seamless remote collaboration, from kickoff calls to launch. Distance is never a barrier.",
          },
        },
        {
          "@type": "Question",
          name: "Can you take over an existing website or help with a redesign?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We conduct a full audit of your existing site (performance, SEO health, UX, and conversion rate), then either optimize it in place or migrate it to a better platform. Many clients come to us with a site that just isn't performing and leave with one that does.",
          },
        },
        {
          "@type": "Question",
          name: "What's included in your ongoing care plans?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Care plans include performance monitoring, security patches, content updates, uptime monitoring, and priority support with fast response times. Think of us as your dedicated on-call digital team, without the overhead of a full-time hire.",
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
