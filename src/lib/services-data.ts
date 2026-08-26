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
    desc: "Custom web design built for speed, SEO, and conversions.",
    href: "/services/web-design-detroit",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    n: "02",
    title: "SEO",
    desc: "Local SEO that ranks you higher and drives more traffic.",
    href: "/services/seo-agency-detroit",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
  },
  {
    n: "03",
    title: "Ad Campaigns",
    desc: "Paid search and social ads built to convert, not just click.",
    href: "/services",
    image: "https://images.unsplash.com/photo-1607703703674-df96af81dffa?q=80&w=1600&auto=format&fit=crop",
  },
  {
    n: "04",
    title: "AI & Automation",
    desc: "Custom AI agents and automation that save time and scale.",
    href: "/services/ai-automation",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop",
  },
];
