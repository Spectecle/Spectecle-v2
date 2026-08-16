export type ServiceItem = {
  n: string;
  title: string;
  desc: string;
  href: string;
  image: string;
};

export const services: ServiceItem[] = [
  {
    n: "01",
    title: "Web Design & Development",
    desc: "Custom websites built for speed, search rankings, and real conversions. Design and development happen in the same room, with no translation layers in between.",
    href: "/services/web-design-detroit",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    n: "02",
    title: "SEO",
    desc: "Local SEO that puts you in front of customers searching in your city. Technical audits, content, and link building, tracked with real numbers, not vanity metrics.",
    href: "/services/seo-agency-detroit",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
  },
  {
    n: "03",
    title: "Ad Campaigns",
    desc: "Paid search and social campaigns built to convert, not just get clicks. Every dollar tracked back to real leads and revenue, never vanity impressions.",
    href: "/services",
    image: "https://images.unsplash.com/photo-1607703703674-df96af81dffa?q=80&w=1600&auto=format&fit=crop",
  },
  {
    n: "04",
    title: "AI & Automation",
    desc: "Custom AI agents built from scratch, trained on your services, connected to your CRM, and tested until they actually work. Not a chatbot plugin.",
    href: "/services/ai-automation",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop",
  },
];
