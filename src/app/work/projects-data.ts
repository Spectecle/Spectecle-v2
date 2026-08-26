export type CaseStudyFeature = {
  icon: string;
  label: string;
  desc: string;
};

export type CaseStudyTestimonial = {
  quote: string;
  author: string;
  role: string;
  initials: string;
  avatarGradient: string;
};

export type ProjectData = {
  slug: string;
  title: string;
  domain: string;
  category: string;
  industry: string;
  location: string;
  tags: string[];
  cardDesc: string;
  cardResult: string;
  cardResultColor: string;
  // Case study fields
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  challenge: string;
  solution: string;
  features: CaseStudyFeature[];
  deliverables: string[];
  services: string[];
  testimonial?: CaseStudyTestimonial;
  year: string;
  liveUrl: string;
  screenshotUrl: string;
};

export const projects: ProjectData[] = [
  {
    slug: "vue-optometry",
    title: "Vue Optometry",
    domain: "vueoptometry.com",
    category: "Web Design",
    industry: "Healthcare / Optometry",
    location: "Dearborn, Michigan",
    tags: ["Optometry Website Design", "Membership Plan Website", "Ongoing Website Care"],
    cardDesc:
      "Ongoing website care for Vùe Eye Boutique Optometry, a membership-based practice that skips insurance entirely. We keep the site current as their offerings, promotions, and messaging evolve.",
    cardResult: "Always Up-to-Date",
    cardResultColor: "text-[#9a5423]",
    tagline: "Keeping a membership-based eye care brand current online",
    metaTitle: "Vue Optometry: Website Design & Ongoing Care Case Study | Spectecle",
    metaDescription:
      "How Spectecle supports Vùe Eye Boutique Optometry with ongoing website updates and care for their membership-based, insurance-free eye care model.",
    metaKeywords: [
      "optometry website design Michigan",
      "eye care website Dearborn",
      "membership plan website design",
      "optometrist web design case study",
      "Spectecle healthcare web design",
    ],
    challenge:
      "Vùe runs a distinctive membership model with no insurance needed, a message that has to stay clear and current as plans and promotions change, without an in-house web team.",
    solution:
      "We act as Vue's ongoing web partner: fast content updates, reorganized plan information, and messaging that always matches how the practice operates today.",
    features: [
      { icon: "repeat", label: "Ongoing Content Updates", desc: "Fast turnaround on copy, imagery, and page changes as the practice evolves" },
      { icon: "list", label: "Information Architecture", desc: "Reorganizing complex content, like insurance and plan details, into something scannable" },
      { icon: "star", label: "Membership-First Messaging", desc: "Clear, consistent messaging around Vue's no-insurance-needed membership model" },
      { icon: "image", label: "Visual Refreshes", desc: "Updating photography and layout as the practice's brand and offerings evolve" },
      { icon: "message-square", label: "Direct Request Portal", desc: "Vue submits and tracks update requests directly through the Spectecle client portal" },
    ],
    deliverables: [
      "Website design & build",
      "Membership plan page design",
      "Ongoing content & copy updates",
      "Information reorganization",
      "Client portal access for update requests",
    ],
    services: ["Web Design & Development", "Ongoing Website Care"],
    year: "2026",
    liveUrl: "https://vueoptometry.com",
    screenshotUrl: "/screenshots/vueoptometry.png",
  },
  {
    slug: "glam-by-abeer",
    title: "Glam by Abeer",
    domain: "glambyabeer.com",
    category: "SEO",
    industry: "Beauty & Personal Care",
    location: "Michigan",
    tags: ["Beauty Studio Website", "Makeup Artist SEO Michigan", "Luxury Portfolio Design"],
    cardDesc:
      "Luxury portfolio website and local SEO for a Michigan makeup artist, ranking page one for 15+ searches including 'makeup artist Michigan,' 'lash extensions near me,' and 'bridal makeup Detroit.' Booking calendar now fills 3 months in advance from organic search alone.",
    cardResult: "15+ Keywords Ranked",
    cardResultColor: "text-[#9a5423]",
    tagline: "Luxury beauty brand: discovered on Google, booked for months",
    metaTitle: "Glam by Abeer: Web Design & Beauty SEO Case Study | Spectecle",
    metaDescription:
      "How Spectecle built a luxury portfolio website and local SEO campaign for Michigan makeup artist Glam by Abeer, ranking for 15+ beauty keywords and filling her booking calendar months in advance.",
    metaKeywords: [
      "makeup artist website design Michigan",
      "beauty studio website case study",
      "local SEO for makeup artists",
      "beauty brand website design",
      "Spectecle beauty web design case study",
    ],
    challenge:
      "Abeer had loyal clients and a strong Instagram following, but no website, so searches like 'makeup artist near me' sent business to competitors instead.",
    solution:
      "We built a luxury portfolio site with a clear booking flow, then ran a local SEO campaign that put her on page one for 15+ Michigan beauty searches.",
    features: [
      { icon: "camera", label: "Luxury Portfolio Design", desc: "Full-screen galleries with category filtering by service: bridal, lashes, glam, and more" },
      { icon: "calendar", label: "Online Booking Integration", desc: "Appointment booking with service selection, pricing display, and deposit collection" },
      { icon: "search", label: "Local Beauty SEO", desc: "Targeting 'makeup artist Michigan', 'lash extensions near me', and 13+ keyword variants" },
      { icon: "map-pin", label: "Google Business Profile", desc: "GBP optimization with service listings, pricing, photo strategy, and review system" },
      { icon: "code", label: "Schema Markup", desc: "LocalBusiness and BeautySalon schema driving rich result eligibility in Google" },
      { icon: "link", label: "Social Media Bridge", desc: "Instagram feed integration connecting social audience to website booking funnel" },
    ],
    deliverables: [
      "Luxury portfolio website",
      "Service gallery with category filtering",
      "Online booking & deposit system",
      "Local SEO campaign (15+ keywords)",
      "Google Business Profile setup & optimization",
      "Structured data & schema markup",
      "Instagram feed integration",
    ],
    services: ["Web Design & Development", "Local SEO", "Google Business Profile"],
    year: "2024",
    liveUrl: "https://glambyabeer.com",
    screenshotUrl: "/screenshots/glambyabeer.png",
  },
  {
    slug: "mi-family-lawyer",
    title: "MI Family Lawyer",
    domain: "mifamilylawyer.com",
    category: "SEO",
    industry: "Legal / Family Law",
    location: "Michigan",
    tags: ["Family Law Website Design", "Attorney SEO Michigan", "Legal Marketing"],
    cardDesc:
      "Authority-focused website design and SEO for Michigan family law attorney Neda Mohiedeen, built to convert first-time visitors into consultation requests during one of the hardest moments in their lives.",
    cardResult: "Custom Law Firm Site",
    cardResultColor: "text-[#9a5423]",
    tagline: "Authority-first web presence for a Michigan family law attorney",
    metaTitle: "MI Family Lawyer: Family Law Website & SEO Case Study | Spectecle",
    metaDescription:
      "How Spectecle designed a credibility-first family law website and SEO strategy for Michigan attorney Neda Mohiedeen.",
    metaKeywords: [
      "family law website design Michigan",
      "attorney website case study",
      "family lawyer SEO Michigan",
      "lawyer website design Detroit",
      "Spectecle law firm web design case study",
    ],
    challenge:
      "Family law clients reach out during hard moments. A generic template site wasn't building trust, and wasn't showing up when Michigan families searched for help.",
    solution:
      "We built a credibility-first site around trust and practice-area clarity, then ran local SEO targeting her specific practice areas across Michigan.",
    features: [
      { icon: "briefcase", label: "Authority-First Design", desc: "Trust signals, credentials, bar membership, and a warm, approachable tone throughout" },
      { icon: "file-text", label: "Practice Area Pages", desc: "SEO-optimized pages for each family law service, from divorce to custody to support" },
      { icon: "calendar", label: "Consultation Funnel", desc: "A streamlined, low-pressure path from visitor to booked consultation" },
      { icon: "code", label: "Legal Schema Markup", desc: "LegalService and Attorney schema for stronger presence in search results" },
      { icon: "book-open", label: "Legal Content Strategy", desc: "Content answering the questions families search before they ever call a lawyer" },
      { icon: "smartphone", label: "Mobile Optimization", desc: "Fast, accessible design for clients reaching out at any hour, from any device" },
    ],
    deliverables: [
      "Custom family law website",
      "Practice area landing pages",
      "Attorney profile & credentials page",
      "Consultation booking flow",
      "SEO keyword strategy & on-page optimization",
      "Legal schema & structured data",
      "GA4 & Search Console setup",
    ],
    services: ["Web Design & Development", "SEO Strategy"],
    testimonial: {
      quote:
        "Working with Spectecle was hands down the best investment I made for my firm. The website looks professional and authoritative, and within a few months I was getting consultation requests from clients who found me on Google. Highly recommend.",
      author: "Neda Mohiedeen",
      role: "Attorney, MI Family Lawyer",
      initials: "NM",
      avatarGradient: "from-[#E86830] to-[#B83020]",
    },
    year: "2024",
    liveUrl: "https://mifamilylawyer.com",
    screenshotUrl: "/screenshots/mifamilylawyer.png",
  },
  {
    slug: "dearborn-cleaners",
    title: "Dearborn Cleaners",
    domain: "dearborncleaners.com",
    category: "Web Design",
    industry: "Home Services / Mold Remediation & Specialty Cleaning",
    location: "Dearborn, Michigan",
    tags: ["Website Redesign", "Mold Remediation Website", "Home Services Michigan"],
    cardDesc:
      "A complete website rebuild for Dearborn Cleaners LLC, a mold remediation and specialty cleaning company, built to convert urgent, high-stress inquiries into booked inspections.",
    cardResult: "Complete Rebuild",
    cardResultColor: "text-[#9a5423]",
    tagline: "Turning an urgent problem into an easy first call",
    metaTitle: "Dearborn Cleaners: Website Redesign Case Study | Spectecle",
    metaDescription:
      "How Spectecle rebuilt the website for Dearborn Cleaners LLC, a Michigan mold remediation and specialty cleaning company, from the ground up.",
    metaKeywords: [
      "mold remediation website design",
      "specialty cleaning website Michigan",
      "Dearborn Michigan web design",
      "home services website redesign",
      "Spectecle case study",
    ],
    challenge:
      "Mold remediation is urgent. Customers searching for help are already stressed, and the old site wasn't built to move them quickly toward booking.",
    solution:
      "We rebuilt the site around that urgency, leading with a clear next step and insurance-process messaging that turns a stressful search into one easy call.",
    features: [
      { icon: "zap", label: "Urgency-First Messaging", desc: "Homepage built around the real reason customers are searching: a problem that can't wait" },
      { icon: "shield", label: "Insurance-Ready Positioning", desc: "Clear messaging around documentation and process for insurance claims" },
      { icon: "list", label: "Service Breakdown Pages", desc: "Individual pages for mold remediation and specialty cleaning services" },
      { icon: "smartphone", label: "Mobile-First Design", desc: "Built for customers searching from their phone in the middle of a problem" },
      { icon: "calendar", label: "Simple Booking Path", desc: "A clear, low-friction way to schedule an inspection from any page" },
    ],
    deliverables: [
      "Full website rebuild",
      "Service-specific landing pages",
      "Insurance-documentation messaging",
      "Mobile-optimized design",
      "Inspection scheduling flow",
    ],
    services: ["Web Design & Development"],
    year: "2026",
    liveUrl: "https://dearborncleaners.com",
    screenshotUrl: "/screenshots/dearborncleaners.png",
  },
  {
    slug: "detroit-glass-mirror",
    title: "Detroit Glass & Mirror",
    domain: "detroitglassandmirror.com",
    category: "Local SEO",
    industry: "Home Services / Glass",
    location: "Detroit, MI",
    tags: ["Detroit Web Design", "Glass Company SEO", "Map Pack Ranking"],
    cardDesc:
      "Website redesign and local SEO for Detroit's premier glass and mirror company. Google Map Pack placement for 'glass company Detroit' and 'shower glass installation Michigan.' PageSpeed jumped 31 → 94 and monthly quote requests doubled in under 90 days.",
    cardResult: "Google Map Pack",
    cardResultColor: "text-[#9a5423]",
    tagline: "Detroit's premier glass shop, now impossible to miss",
    metaTitle: "Detroit Glass & Mirror: Local SEO & Website Redesign Case Study | Spectecle",
    metaDescription:
      "How Spectecle helped Detroit Glass & Mirror enter the Google Map Pack with a full website redesign and local SEO campaign, doubling monthly quote requests.",
    metaKeywords: [
      "glass company website design Detroit",
      "local SEO Detroit case study",
      "Detroit small business website",
      "glass shop SEO Michigan",
      "Spectecle Detroit web design case study",
    ],
    challenge:
      "A decade-old, slow, non-mobile site was losing local jobs to out-of-area competitors who simply ranked higher on Google.",
    solution:
      "We rebuilt the site fast and mobile-first, then ran a local SEO campaign, citation cleanup, service pages, and schema, that landed them in the Map Pack for Detroit glass searches.",
    features: [
      { icon: "layers", label: "Service-Specific Pages", desc: "Individual pages for shower glass, mirrors, commercial glazing, and auto glass with keyword targeting" },
      { icon: "map-pin", label: "Google Map Pack Optimization", desc: "Technical and off-page work targeting top-3 Map Pack placement in Detroit search results" },
      { icon: "link", label: "Citation Cleanup", desc: "Identified and corrected inconsistent NAP data across 35+ online directories" },
      { icon: "smartphone", label: "Mobile-Responsive Redesign", desc: "Fast, clean site built for the local mobile searcher looking for same-day glass service" },
      { icon: "star", label: "Review Generation Strategy", desc: "Systematic process for turning satisfied customers into Google reviews" },
      { icon: "code", label: "Schema Markup", desc: "LocalBusiness, GeoCoordinates, and service-specific structured data for Detroit searches" },
    ],
    deliverables: [
      "Full website redesign",
      "Service-specific landing pages",
      "Google Business Profile optimization",
      "35+ local citation corrections",
      "Mobile-first responsive build",
      "Review generation system",
      "Structured data & schema markup",
    ],
    services: ["Web Design & Development", "Local SEO", "Citation Building", "Google Business Profile"],
    year: "2024",
    liveUrl: "https://detroitglassandmirror.com",
    screenshotUrl: "/screenshots/detroitglassandmirror.png",
  },
  {
    slug: "salazar-drywall-pros",
    title: "Salazar Drywall Pros",
    domain: "salazardrywallpros.com",
    category: "Local SEO",
    industry: "Home Services / Construction",
    location: "Michigan",
    tags: ["Contractor Website Design", "Local SEO Detroit", "Google Map Pack"],
    cardDesc:
      "Contractor website design and aggressive local SEO for a Detroit-area drywall company, built from zero online presence to #1 Google rankings for 'drywall contractor Michigan.' Includes 40+ citation listings, geo-targeted service area pages, and Google Map Pack placement.",
    cardResult: "#1 Local Rankings",
    cardResultColor: "text-[#9a5423]",
    tagline: "From word of mouth to page one on Google",
    metaTitle: "Salazar Drywall Pros: Local SEO & Web Design Case Study | Spectecle",
    metaDescription:
      "How Spectecle took Salazar Drywall Pros from zero online presence to #1 local search rankings in their Michigan service area, generating 4x more leads.",
    metaKeywords: [
      "contractor website design Michigan",
      "local SEO for contractors",
      "drywall company website case study",
      "contractor local SEO Michigan",
      "Spectecle local SEO case study",
    ],
    challenge:
      "A word-of-mouth contractor with no website and no Google presence was losing jobs to competitors who simply showed up first in search.",
    solution:
      "We built a trust-first site and ran an aggressive local SEO push, citations, geo-targeted pages, and reviews, to rank #1 for Michigan drywall searches.",
    features: [
      { icon: "monitor", label: "Project Portfolio Gallery", desc: "Before/after galleries organized by service type, showcasing craftsmanship and quality" },
      { icon: "map-pin", label: "Service Area Landing Pages", desc: "Geo-targeted pages for each city and neighborhood in their coverage area" },
      { icon: "star", label: "Google Business Profile", desc: "GBP setup, service area configuration, photo optimization, and review generation" },
      { icon: "link", label: "Local Citation Building", desc: "Consistent business name, address, phone across 40+ local directory listings" },
      { icon: "shield", label: "Trust Signal Integration", desc: "License display, insurance info, years in business, and star ratings in the hero" },
      { icon: "zap", label: "Lead Capture System", desc: "Click-to-call, quote request form with fast-response SLA and follow-up automation" },
    ],
    deliverables: [
      "Professional contractor website",
      "Project portfolio with before/after galleries",
      "Google Business Profile setup & optimization",
      "40+ local citation listings",
      "Geo-targeted service area pages",
      "Review generation system",
      "Lead capture forms & click-to-call",
      "Monthly local SEO reporting",
    ],
    services: ["Web Design & Development", "Local SEO", "Google Business Profile", "Citation Building"],
    year: "2024",
    liveUrl: "https://salazardrywallpros.com",
    screenshotUrl: "/screenshots/salazardrywallpros.png",
  },
  {
    slug: "indoor-garden",
    title: "Indoor Garden",
    domain: "indoorgarden.com",
    category: "Web Design",
    industry: "Retail / E-commerce",
    location: "Michigan",
    tags: ["E-commerce Website Design", "Plant Shop Michigan", "SEO Content Strategy"],
    cardDesc:
      "E-commerce website design for a Michigan indoor plant shop moving from Instagram DMs to a full online storefront. A targeted SEO content strategy around plant care and indoor gardening searches grew organic traffic 220% in 5 months. 40% of revenue now flows through the site.",
    cardResult: "+220% Organic Traffic",
    cardResultColor: "text-[#9a5423]",
    tagline: "From Instagram DMs to a thriving online store",
    metaTitle: "Indoor Garden: E-commerce Web Design Case Study | Spectecle",
    metaDescription:
      "How Spectecle launched a full e-commerce website for Indoor Garden, moving them off Instagram sales and achieving +220% organic traffic growth through targeted SEO.",
    metaKeywords: [
      "e-commerce website design Michigan",
      "plant shop website design",
      "online store web design case study",
      "indoor garden website SEO",
      "Spectecle e-commerce case study",
    ],
    challenge:
      "A loyal Instagram following had no way to check out, and no way for new customers to find the shop through search.",
    solution:
      "We built a full e-commerce storefront, then ran an SEO content strategy around plant-care searches that grew organic traffic 220% in five months.",
    features: [
      { icon: "shopping-cart", label: "E-commerce Storefront", desc: "Full product catalog with variant selection, cart, and optimized checkout flow" },
      { icon: "layers", label: "Brand & Visual Design", desc: "Warm, organic visual language across all pages, product cards, and marketing materials" },
      { icon: "search", label: "SEO Content Strategy", desc: "Blog and category pages targeting plant care, indoor gardening, and care guide searches" },
      { icon: "smartphone", label: "Mobile Shopping Experience", desc: "Optimized mobile checkout with minimal steps and touch-friendly product browsing" },
      { icon: "book-open", label: "Plant Care Blog", desc: "Editorial content hub attracting organic search traffic from plant enthusiast queries" },
      { icon: "mail", label: "Email Marketing Integration", desc: "Newsletter signup with automated welcome series and post-purchase flows" },
    ],
    deliverables: [
      "Custom e-commerce website",
      "Product catalog & inventory system",
      "Brand design system",
      "SEO content strategy & blog setup",
      "Mobile-optimized checkout flow",
      "Email marketing integration",
      "Analytics & conversion tracking",
    ],
    services: ["Web Design & Development", "E-commerce", "SEO Strategy"],
    year: "2024",
    liveUrl: "https://indoorgarden.com",
    screenshotUrl: "/screenshots/indoorgarden.png",
  },
  {
    slug: "thematek",
    title: "Thematek",
    domain: "thematek.com",
    category: "AI & Automation",
    industry: "Technology / IT Services",
    location: "Michigan",
    tags: ["AI Business Automation", "IT Company Website", "Michigan Tech"],
    cardDesc:
      "Website redesign and custom AI automation for a Michigan IT services company. A GPT-4 intake agent, trained on their full service catalog, integrated with CRM and Slack via n8n, now handles 68% of client inquiries 24/7, saving 40+ team hours per month.",
    cardResult: "68% Automated",
    cardResultColor: "text-[#9a5423]",
    tagline: "Cutting-edge website. Even sharper AI behind the scenes.",
    metaTitle: "Thematek: Web Design & AI Automation Case Study | Spectecle",
    metaDescription:
      "How Spectecle redesigned Thematek's website and deployed a custom AI intake agent that now handles 68% of client inquiries, tripling enterprise lead quality.",
    metaKeywords: [
      "IT company website design Michigan",
      "AI automation case study",
      "tech company website redesign",
      "AI chatbot for business Michigan",
      "Spectecle AI automation case study",
    ],
    challenge:
      "Thematek's site didn't match their sophistication as an IT firm, and their team was losing hours answering the same intake questions daily.",
    solution:
      "We rebuilt the site with a tech-forward design, then deployed a custom AI intake agent that now handles 68% of inquiries around the clock.",
    features: [
      { icon: "monitor", label: "Brand & Design Refresh", desc: "Modern, tech-forward visual identity that communicates innovation and expertise" },
      { icon: "bot", label: "Custom AI Intake Agent", desc: "LLM-powered agent trained on Thematek's services, qualifying leads around the clock" },
      { icon: "layers", label: "Service Architecture", desc: "Clear service pages with capability proof points and enterprise case study content" },
      { icon: "refresh-cw", label: "Automation Workflows", desc: "n8n-based workflows connecting the AI agent to CRM and team Slack channels" },
      { icon: "rocket", label: "Performance Optimization", desc: "Sub-2s load times and a 96 PageSpeed score, fast as the tech they build" },
      { icon: "users", label: "Lead Generation System", desc: "Optimized CTAs and contact flows designed for enterprise client acquisition" },
    ],
    deliverables: [
      "Full website redesign",
      "Custom AI intake agent (GPT-4 based)",
      "CRM & Slack integration via n8n",
      "Service architecture & capability pages",
      "Performance optimization",
      "Analytics & lead tracking setup",
    ],
    services: ["Web Design & Development", "AI & Automation", "Workflow Automation"],
    year: "2024",
    liveUrl: "https://thematek.com",
    screenshotUrl: "/screenshots/thematek.png",
  },
  {
    slug: "the-stat-clinic",
    title: "The Stat Clinic",
    domain: "thestatclinic.com",
    category: "Web Design",
    industry: "Sports Performance & Health",
    location: "Michigan",
    tags: ["Healthcare Website Design", "Sports Clinic SEO", "Online Booking Michigan"],
    cardDesc:
      "Custom website design and SEO for a Michigan sports performance and health clinic. Integrated online booking grew appointment volume 85%; a content strategy targeting athletic recovery and performance searches drove +156% organic traffic in under 6 months.",
    cardResult: "+85% Appointments",
    cardResultColor: "text-[#9a5423]",
    tagline: "Performance-grade digital presence for a data-driven clinic",
    metaTitle: "The Stat Clinic: Web Design & SEO Case Study | Spectecle",
    metaDescription:
      "How Spectecle built a conversion-focused website and SEO strategy for The Stat Clinic in Michigan, increasing online appointment bookings by 85% and organic traffic by 156%.",
    metaKeywords: [
      "sports clinic website design Michigan",
      "healthcare website design case study",
      "sports performance clinic SEO",
      "medical clinic website Michigan",
      "Spectecle healthcare web design",
    ],
    challenge:
      "A generic template site buried the clinic's expertise and made booking an afterthought for prospective clients.",
    solution:
      "We built a clear service architecture with integrated booking, then ran an SEO strategy around sports-performance searches that grew organic traffic 156% and bookings 85%.",
    features: [
      { icon: "layers", label: "Service Architecture", desc: "Individual service pages for each clinic offering with clear outcomes and booking prompts" },
      { icon: "calendar", label: "Online Booking System", desc: "Integrated scheduling with appointment type selection, reminders, and confirmation flows" },
      { icon: "book-open", label: "Performance Content Hub", desc: "Athletic performance and recovery blog for topical authority and organic search traffic" },
      { icon: "search", label: "SEO Keyword Strategy", desc: "Research and targeting of sports performance, recovery, and local health search queries" },
      { icon: "users", label: "Practitioner Profiles", desc: "Staff bios with credentials, certifications, and specialties building expertise signals" },
      { icon: "smartphone", label: "Mobile UX", desc: "Optimized for on-the-go athletes booking sessions from their phones" },
    ],
    deliverables: [
      "Custom website with service pages",
      "Online booking integration",
      "Practitioner profile pages",
      "Performance blog & content hub",
      "SEO keyword research & strategy",
      "On-page SEO optimization",
      "GA4 & conversion tracking setup",
    ],
    services: ["Web Design & Development", "SEO Strategy", "Content Marketing"],
    year: "2024",
    liveUrl: "https://thestatclinic.com",
    screenshotUrl: "/screenshots/thestatclinic.png",
  },
];

export function pickProjects(slugs: string[]): ProjectData[] {
  return slugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is ProjectData => !!p);
}
