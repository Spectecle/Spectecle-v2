import type { Metadata } from "next";

const BASE_URL = "https://spectecle.com";
const PAGE_URL = `${BASE_URL}/services/medical-website-design`;

export const metadata: Metadata = {
  title: "Medical Website Design | Doctor & Dentist Websites",
  description:
    "Custom medical website design for doctors, dentists, and private practices nationwide. Patient-first design, service pages, and appointment-focused conversion, built to earn patient trust.",
  keywords: [
    "medical website design",
    "doctor website design",
    "dentist website design",
    "medical practice website design",
    "healthcare website design agency",
    "private practice website design",
    "website for doctors",
    "internal medicine website design",
    "dental website design",
    "medical practice SEO",
    "optometry website design",
    "medical website design near me",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Medical Website Design | Doctor & Dentist Websites | Spectecle",
    description:
      "Custom medical website design built to earn patient trust. Patient-first design, service pages, and appointment-focused conversion.",
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Medical Website Design | Doctor & Dentist Websites | Spectecle",
    description:
      "Custom medical website design built to earn patient trust and fill your schedule.",
  },
};

const faqs = [
  {
    q: "How is a medical website different from a regular business website?",
    a: "Patients research providers before they ever call, and they're often anxious, in discomfort, or comparing options quickly. A healthcare site has to build credibility and calm at the same time: clear provider credentials, an easy way to see what you treat, and a simple, low-pressure way to request an appointment.",
  },
  {
    q: "Do you design sites for dentists and other specialty practices?",
    a: "Yes. We've designed for dentists, optometrists, internal medicine, chiropractic and physical therapy practices, med spas, mental health practices, and specialty clinics. Every specialty gets service pages written around what that specific type of patient is actually searching for.",
  },
  {
    q: "Can the site integrate with our existing scheduling software?",
    a: "In most cases, yes. We'll work with the booking or patient portal system your practice already uses, whether that's an embedded widget, a request form that routes to your front desk, or a link to your existing scheduler.",
  },
  {
    q: "Will our website be HIPAA compliant?",
    a: "We build with patient privacy as a priority: privacy-conscious forms, secure hosting, and no unnecessary collection of health information on the public site. HIPAA compliance for your practice as a whole depends on your specific systems and processes beyond just the website, so we recommend confirming your full compliance setup with your own legal or compliance advisor.",
  },
  {
    q: "Will the site help with local SEO for my practice?",
    a: "Yes. Local SEO is available alongside the website build: Google Business Profile optimization, location-specific content, and medical schema markup that helps you show up for searches like 'dentist near me' or 'internal medicine doctor in [your city].'",
  },
  {
    q: "Can you migrate content from our current website?",
    a: "Yes. We audit your existing site's content, redirect old URLs properly to protect any search rankings you've already earned, and rebuild what's worth keeping into the new design.",
  },
  {
    q: "How much does a medical practice website cost?",
    a: "Every project is custom quoted based on the number of services, providers, and integrations you need. Reach out for a free, no-pressure quote scoped to your practice.",
  },
  {
    q: "Do you offer ongoing website maintenance for medical practices?",
    a: "Yes. Ongoing care plans keep your site secure, current, and updated as your providers, services, and hours change, without you needing an in-house web team.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Medical & Healthcare Website Design",
    serviceType: "Medical Website Design",
    provider: { "@id": `${BASE_URL}/#organization` },
    audience: {
      "@type": "Audience",
      audienceType: "Doctors, Dentists, and Medical Practices",
    },
    areaServed: [{ "@type": "Country", name: "United States" }],
    description:
      "Custom website design for doctors, dentists, and private practices: patient-first design, service pages, provider bio pages, and appointment-focused conversion.",
    url: PAGE_URL,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Medical Website Design Services",
      itemListElement: [
        "Dentists",
        "Internal Medicine",
        "Private Practice",
        "Optometry",
        "Chiropractic & Physical Therapy",
        "Med Spas & Aesthetics",
        "Mental Health Practices",
        "Specialty Clinics",
      ].map((specialty) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: `${specialty} Website Design` },
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
      { "@type": "ListItem", position: 3, name: "Medical Website Design", item: PAGE_URL },
    ],
  },
];

export default function MedicalWebsiteDesignLayout({ children }: { children: React.ReactNode }) {
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
