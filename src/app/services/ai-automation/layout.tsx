import type { Metadata } from "next";

const BASE_URL = "https://spectecle.com";
const PAGE_URL = `${BASE_URL}/services/ai-automation`;

export const metadata: Metadata = {
  title: "AI Automation & Workflow Automation Services",
  description:
    "Custom AI agents and workflow automation for businesses nationwide. Eliminate manual tasks, automate customer interactions, and scale operations without adding headcount.",
  keywords: [
    "AI automation services",
    "workflow automation",
    "AI agents for business",
    "business automation",
    "AI chatbot development",
    "CRM automation",
    "n8n automation",
    "AI integration services",
    "business process automation",
    "AI consulting",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "AI & Workflow Automation | Spectecle",
    description:
      "Custom AI agents and workflow automation for businesses nationwide. Eliminate manual tasks and scale without hiring.",
    url: PAGE_URL,
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI & Workflow Automation",
    provider: { "@id": `${BASE_URL}/#organization` },
    areaServed: [{ "@type": "Country", name: "United States" }],
    description:
      "Custom AI agents and workflow automation built from scratch for small and mid-size businesses. Eliminates repetitive tasks and scales operations without adding headcount.",
    url: PAGE_URL,
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is AI automation and how can it help my business?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AI automation replaces time-consuming, repetitive tasks with intelligent workflows. Common examples include automated lead follow-up, AI-powered customer support, automated reporting, CRM data entry, and document processing. For most businesses, automation saves 5–20 hours per week and meaningfully reduces operational costs.",
        },
      },
      {
        "@type": "Question",
        name: "What's the difference between a custom AI agent and a chatbot plugin?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A chatbot plugin is a generic, pre-built tool that answers basic FAQ-style questions. A custom AI agent is built specifically for your business — trained on your services, integrated with your CRM, and capable of handling complex, multi-step tasks autonomously. The difference in capability is significant.",
        },
      },
      {
        "@type": "Question",
        name: "What tools do you use for workflow automation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We build with n8n, Make, Zapier, and custom API integrations depending on what best fits your stack. For AI agents, we use OpenAI and other LLM providers. Every build is designed around your existing tools — we don't force you to switch platforms.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to build an AI automation system?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Simple workflow automations can be built and deployed in 1–2 weeks. Custom AI agents with CRM integration and testing typically take 3–6 weeks. We always start with a scoping session to give you an accurate timeline before any work begins.",
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
      { "@type": "ListItem", position: 3, name: "AI & Automation", item: PAGE_URL },
    ],
  },
];

export default function AILayout({ children }: { children: React.ReactNode }) {
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
