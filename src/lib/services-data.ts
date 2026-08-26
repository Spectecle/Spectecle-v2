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
    image: "https://images.unsplash.com/photo-1519332978332-21b7d621d05e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    n: "02",
    title: "SEO",
    desc: "Local SEO that ranks you higher and drives more traffic.",
    href: "/services/seo-agency-detroit",
    image: "https://images.unsplash.com/photo-1762180980045-4d7c5a6c0fc9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    n: "03",
    title: "Ad Campaigns",
    desc: "Paid search and social ads built to convert, not just click.",
    href: "/services",
    image: "https://images.unsplash.com/photo-1603433457737-73cccfc88d8b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    n: "04",
    title: "AI & Automation",
    desc: "Custom AI agents and automation that save time and scale.",
    href: "/services/ai-automation",
    image: "https://images.unsplash.com/photo-1548248823-ce16a73b6d49?q=80&w=1200&auto=format&fit=crop",
  },
];
