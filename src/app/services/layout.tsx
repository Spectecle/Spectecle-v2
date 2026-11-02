import type { Metadata } from "next";
import { SectionJsonLd } from "@/components/SectionJsonLd";

const BASE_URL = "https://spectecle.com";

export const metadata: Metadata = {
  title: "Web Design, SEO & AI Automation Services",
  description:
    "Web design, SEO, and AI automation from a Detroit studio: fast Next.js sites that rank, local SEO that brings in calls, and automation that saves hours.",
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
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
      <SectionJsonLd path="/services" json={JSON.stringify(jsonLd)} />
      {children}
    </>
  );
}
