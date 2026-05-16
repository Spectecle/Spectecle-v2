import type { Metadata } from "next";

const BASE_URL = "https://spectecle.com";

export const metadata: Metadata = {
  title: "Spectecle | Detroit Web Design, SEO & AI Agency — Walid Alhassan",
  description:
    "Spectecle is Detroit's founder-led web design, SEO & AI automation agency. Built by Walid Alhassan — 10 years web development, 12 years IT systems engineering, 4 years AI. Serving six-figure businesses across metro Detroit and Michigan.",
  keywords: [
    "web design agency Detroit Michigan",
    "Walid Alhassan web designer Detroit",
    "Spectecle agency Detroit",
    "SEO agency Detroit Michigan",
    "AI automation agency Michigan",
    "web developer Detroit Michigan",
    "local SEO Detroit",
    "custom website design Michigan",
    "digital marketing agency Detroit",
    "Next.js web development Michigan",
    "web design for small business Michigan",
    "professional web designer Detroit",
    "best web design agency Michigan",
    "affordable web design Detroit",
    "web design near me Detroit",
    "business website design Michigan",
    "SEO company Detroit Michigan",
    "Google Business Profile optimization Michigan",
  ],
  authors: [{ name: "Walid Alhassan", url: `${BASE_URL}/about` }],
  creator: "Walid Alhassan",
  publisher: "Spectecle Agency",
  category: "Web Design & Digital Marketing Agency",
  openGraph: {
    title: "Spectecle | Detroit Web Design, SEO & AI Agency — Meet Walid Alhassan",
    description:
      "10 years web development. 12 years IT engineering. 4 years AI. Detroit's founder-led agency building websites that convert, rank, and scale — for Michigan's six-figure businesses.",
    url: `${BASE_URL}/hello`,
    type: "website",
    locale: "en_US",
    siteName: "Spectecle Agency",
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Spectecle Agency — Detroit Web Design, SEO & AI Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spectecle | Detroit Web Design, SEO & AI Agency",
    description:
      "Founder-led web design, SEO & AI automation agency in Detroit, MI. Built by Walid Alhassan — 10yr web dev, 12yr IT engineering, 4yr AI.",
    images: [`${BASE_URL}/opengraph-image`],
    creator: "@spectecle",
    site: "@spectecle",
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
  other: {
    "geo.region": "US-MI",
    "geo.placename": "Detroit, Michigan",
    "geo.position": "42.3314;-83.0458",
    ICBM: "42.3314, -83.0458",
  },
};

const faqItems = [
  {
    question: "How much does a professional website cost in Michigan?",
    answer:
      "At Spectecle, custom website projects start at $2,500 for small businesses and scale based on complexity, number of pages, and integrations needed. Unlike agencies that charge $15,000–$50,000 for templated work, every Spectecle site is built from scratch in Next.js — faster, better-ranking, and entirely yours. SEO retainers and AI automation packages are available separately.",
  },
  {
    question: "What makes Spectecle different from other web design agencies in Detroit?",
    answer:
      "Spectecle is founder-led — every project is handled directly by Walid Alhassan, a web developer with 10 years of experience, an IT systems engineer with 12 years in enterprise infrastructure, and an AI practitioner for 4 years. You never deal with account managers or handoffs. The same person who talks to you also designs, builds, and launches your site.",
  },
  {
    question: "How long does it take to build a website?",
    answer:
      "Most Spectecle projects are delivered in 4–8 weeks from kickoff to launch, depending on complexity. E-commerce sites and projects with custom AI integrations may take longer. There is no team bureaucracy — decisions happen fast and revisions never get lost in translation.",
  },
  {
    question: "What is local SEO and how does it help my Michigan business?",
    answer:
      "Local SEO is the process of optimizing your website and Google Business Profile so your business appears at the top of searches like 'web designer near me' or 'law firm Detroit Michigan.' Spectecle builds local SEO into every website — including structured data markup, Google Business Profile optimization, location-specific content, and a review acquisition strategy — so your site starts ranking from day one.",
  },
  {
    question: "Do I need an AI agent for my business?",
    answer:
      "If your business handles repetitive intake, quotes, scheduling, or customer questions, an AI agent can replace hours of manual work per week. Spectecle builds custom AI intake agents trained on your specific services, pricing, and FAQs — integrated directly with your CRM and communication tools. It's not a generic chatbot — it's a system that understands your business.",
  },
  {
    question: "Does Spectecle work with businesses outside of Detroit?",
    answer:
      "Yes. Spectecle is headquartered in Detroit, MI and specializes in metro Detroit and Michigan businesses, but we work with clients across the United States. If you are a serious business looking for a results-focused web design and digital growth partner, location is not a barrier.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${BASE_URL}/hello`,
      name: "Spectecle — Detroit Web Design, SEO & AI Automation Agency",
      url: `${BASE_URL}/hello`,
      description:
        "Meet Spectecle — a Detroit-based web design, SEO & AI automation agency founded by Walid Alhassan. Serving six-figure businesses across metro Detroit and Michigan.",
      inLanguage: "en-US",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/#organization` },
      publisher: { "@id": `${BASE_URL}/#organization` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${BASE_URL}/walid.jpg`,
        description: "Walid Alhassan — Founder of Spectecle Agency, Detroit MI",
      },
    },
    {
      "@type": ["ProfessionalService", "LocalBusiness"],
      "@id": `${BASE_URL}/#organization`,
      name: "Spectecle Agency",
      alternateName: "Spectecle",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
        width: 400,
        height: 400,
      },
      image: `${BASE_URL}/walid.jpg`,
      description:
        "Spectecle is a Detroit-based web design, SEO & AI automation agency founded by Walid Alhassan, serving six-figure businesses across metro Detroit and Michigan.",
      telephone: "+13133534105",
      email: "hello@spectecle.com",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Detroit",
        addressRegion: "MI",
        postalCode: "48201",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 42.33143,
        longitude: -83.04575,
      },
      hasMap: "https://maps.google.com/?q=Detroit,MI",
      areaServed: [
        { "@type": "City", name: "Detroit" },
        { "@type": "City", name: "Ann Arbor" },
        { "@type": "City", name: "Dearborn" },
        { "@type": "City", name: "Troy" },
        { "@type": "State", name: "Michigan" },
        { "@type": "Country", name: "United States" },
      ],
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
                "Custom Next.js websites engineered for speed, conversion, and search — built for Michigan businesses.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "SEO & Local Search Optimization",
              description:
                "Local SEO, technical SEO, Google Business Profile optimization, and content strategy for Detroit and Michigan businesses.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI & Workflow Automation",
              description:
                "Custom AI intake agents, workflow automation, and intelligent CRM integrations built from scratch for Michigan businesses.",
            },
          },
        ],
      },
      founder: { "@id": `${BASE_URL}/#founder` },
      sameAs: [
        "https://x.com/spectecle",
        "https://www.instagram.com/spectecle/",
        "https://github.com/Spectecle",
      ],
    },
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#founder`,
      name: "Walid Alhassan",
      givenName: "Walid",
      familyName: "Alhassan",
      jobTitle: "Founder & Lead Strategist",
      description:
        "Walid Alhassan is a Detroit-based web developer with 10 years of experience, an IT systems engineer with 12 years of experience, and an AI practitioner with 4 years of experience. He is the founder of Spectecle Agency.",
      image: `${BASE_URL}/walid.jpg`,
      url: `${BASE_URL}/about`,
      worksFor: { "@id": `${BASE_URL}/#organization` },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Detroit",
        addressRegion: "MI",
        addressCountry: "US",
      },
      knowsAbout: [
        "Web Design & Development",
        "Search Engine Optimization",
        "AI & Business Automation",
        "IT Systems Engineering",
        "Local SEO Michigan",
        "Next.js Development",
        "Google Business Profile Optimization",
        "E-commerce Web Design",
      ],
      sameAs: [
        "https://x.com/spectecle",
        "https://www.instagram.com/spectecle/",
        "https://github.com/Spectecle",
      ],
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
        { "@type": "ListItem", position: 2, name: "Meet Spectecle", item: `${BASE_URL}/hello` },
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
