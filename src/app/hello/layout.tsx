import type { Metadata } from "next";

const BASE_URL = "https://spectecle.com";

export const metadata: Metadata = {
  title: "Get a Free Web Design & SEO Quote | Spectecle",
  description:
    "Spectecle is a web design, SEO, ad campaign & AI automation agency serving businesses nationwide. Custom Next.js websites, local SEO, paid ads, and AI agents built to convert. Get your free quote today.",
  keywords: [
    "web design agency",
    "Spectecle agency",
    "SEO agency",
    "AI automation agency",
    "ad campaign management",
    "PPC advertising agency",
    "Google Ads management",
    "web developer",
    "local SEO services",
    "custom website design",
    "digital marketing agency",
    "Next.js web development",
    "web design for small business",
    "professional web designer",
    "best web design agency",
    "affordable web design",
    "web design near me",
    "business website design",
    "SEO company",
    "Google Business Profile optimization",
  ],
  authors: [{ name: "Spectecle SEO & Web Design", url: BASE_URL }],
  creator: "Spectecle SEO & Web Design",
  publisher: "Spectecle SEO & Web Design",
  category: "Web Design & Digital Marketing Agency",
  openGraph: {
    title: "Get a Free Web Design & SEO Quote | Spectecle",
    description:
      "Web design. SEO. Ad campaigns. AI automation. One dedicated team building websites that convert, rank, and scale for businesses nationwide.",
    url: `${BASE_URL}/hello`,
    type: "website",
    locale: "en_US",
    siteName: "Spectecle SEO & Web Design",
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Spectecle SEO & Web Design: Web Design, SEO & AI Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get a Free Web Design & SEO Quote | Spectecle",
    description:
      "Web design, SEO, ad campaigns & AI automation agency serving businesses nationwide.",
    images: [`${BASE_URL}/opengraph-image`],
  },
  alternates: { canonical: `${BASE_URL}/hello` },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const faqItems = [
  {
    question: "How much does a professional website cost?",
    answer:
      "Every Spectecle project is custom quoted based on complexity, number of pages, and integrations needed, not a one-size-fits-all package. Every site is built from scratch in Next.js: faster, better-ranking, and entirely yours. SEO retainers and AI automation packages are available separately. Reach out for a free quote tailored to your business.",
  },
  {
    question: "What makes Spectecle different from other web design agencies?",
    answer:
      "Spectecle brings web design, SEO, ad campaigns, and AI automation together under one dedicated team, so every part of your digital presence is built to work together instead of being handled by separate vendors who never talk to each other. No account managers, no outsourcing, no handoffs. The team that talks to you also designs, builds, and launches your site.",
  },
  {
    question: "How long does it take to build a website?",
    answer:
      "Timelines depend on scope and complexity, and we agree on a clear timeline with you upfront before any work begins. E-commerce sites and projects with custom AI integrations naturally take longer. There is no team bureaucracy. Decisions happen fast and revisions never get lost in translation.",
  },
  {
    question: "What is local SEO and how does it help my business?",
    answer:
      "Local SEO is the process of optimizing your website and Google Business Profile so your business appears at the top of searches like 'web designer near me' or 'law firm in [your city].' Spectecle builds local SEO into every website, including structured data markup, Google Business Profile optimization, location-specific content, and a review acquisition strategy, so your site starts ranking from day one.",
  },
  {
    question: "Do I need an AI agent for my business?",
    answer:
      "If your business handles repetitive intake, quotes, scheduling, or customer questions, an AI agent can replace hours of manual work per week. Spectecle builds custom AI intake agents trained on your specific services, pricing, and FAQs, integrated directly with your CRM and communication tools. It's not a generic chatbot. It's a system that understands your business.",
  },
  {
    question: "Does Spectecle work with businesses nationwide?",
    answer:
      "Yes. Spectecle works with clients across the United States, with deep local-SEO expertise for businesses that also want to dominate their local market. If you are a serious business looking for a results-focused web design and digital growth partner, location is not a barrier.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${BASE_URL}/hello`,
      name: "Get a Free Web Design & SEO Quote | Spectecle",
      url: `${BASE_URL}/hello`,
      description:
        "Spectecle is a web design, SEO, ad campaign & AI automation agency serving businesses nationwide. Get your free quote today.",
      inLanguage: "en-US",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/#organization` },
      publisher: { "@id": `${BASE_URL}/#organization` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
        description: "Spectecle SEO & Web Design logo",
      },
    },
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${BASE_URL}/#organization`,
      name: "Spectecle SEO & Web Design",
      alternateName: "Spectecle",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
        width: 400,
        height: 400,
      },
      image: `${BASE_URL}/logo.png`,
      description:
        "Spectecle is a web design, SEO, ad campaign & AI automation agency serving businesses nationwide.",
      telephone: "+13133534105",
      email: "hello@spectecle.com",
      priceRange: "$$",
      areaServed: [{ "@type": "Country", name: "United States" }],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Digital Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Web Design & Development",
              description:
                "Custom Next.js websites engineered for speed, conversion, and search, built for businesses nationwide.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "SEO & Local Search Optimization",
              description:
                "Local SEO, technical SEO, Google Business Profile optimization, and content strategy for businesses nationwide.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Ad Campaigns",
              description:
                "Paid search and social campaigns built to convert, tracked back to real leads and revenue for businesses nationwide.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI & Workflow Automation",
              description:
                "Custom AI intake agents, workflow automation, and intelligent CRM integrations built from scratch for businesses nationwide.",
            },
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${BASE_URL}/hello#faq`,
      mainEntity: faqItems.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Get a Free Quote", item: `${BASE_URL}/hello` },
      ],
    },
  ],
};

export default function HelloLayout({ children }: { children: React.ReactNode }) {
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
