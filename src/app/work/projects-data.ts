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
  heroMetrics: Array<{ value: string; label: string }>;
  challenge: string;
  solution: string;
  features: CaseStudyFeature[];
  deliverables: string[];
  services: string[];
  results: Array<{ value: string; label: string }>;
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
    cardResultColor: "text-[#cb7c46]",
    tagline: "Keeping a membership-first eye care brand's site as current as their business",
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
    heroMetrics: [
      { value: "Membership", label: "Business Model" },
      { value: "Ongoing", label: "Site Care & Updates" },
      { value: "Boutique", label: "Brand Positioning" },
      { value: "Dearborn, MI", label: "Location" },
    ],
    challenge:
      "Vùe Eye Boutique Optometry runs on a distinctive model: affordable, membership-based eye care with no insurance needed. That message has to come through clearly and stay current on the site as plans, promotions, and services evolve, without the practice needing an in-house web team to manage it.",
    solution:
      "Beyond the initial build, we act as Vue's ongoing web partner, handling content updates, reorganizing information as their offerings change (like restructuring their insurance list into a clearer format, or refreshing seasonal promotions), and making sure the site always reflects how the practice actually operates today, not how it operated at launch.",
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
    results: [
      { value: "Live", label: "Active, evolving site" },
      { value: "Fast Turnaround", label: "On update requests" },
      { value: "Boutique", label: "Brand-consistent design" },
    ],
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
    cardResultColor: "text-[#cb7c46]",
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
    heroMetrics: [
      { value: "15+", label: "Keywords Ranked" },
      { value: "5×", label: "Instagram-to-Site Traffic" },
      { value: "3 mo", label: "Booked in Advance" },
      { value: "5 wks", label: "Delivery Time" },
    ],
    challenge:
      "Glam by Abeer had a loyal clientele and a beautifully curated Instagram presence, but no website. Potential clients were searching 'makeup artist near me' and 'lash extensions Michigan,' finding other artists instead. Abeer's quality was unmatched, but without a web presence, she was invisible in the search results where clients were looking.",
    solution:
      "We designed a luxury-aesthetic portfolio website that put her work front and center: full-bleed galleries filtered by service type, with an elegant booking flow and clear pricing architecture. We then launched a local SEO strategy targeting Michigan beauty keywords across all her service offerings, optimized her Google Business Profile, and implemented structured data for her services to capture both map and organic search placements.",
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
    results: [
      { value: "15+", label: "Beauty keywords ranked page one" },
      { value: "5×", label: "Instagram-to-website traffic" },
      { value: "3 mo", label: "Booking calendar filled in advance" },
      { value: "98", label: "PageSpeed score" },
    ],
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
    cardResultColor: "text-[#cb7c46]",
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
    heroMetrics: [
      { value: "Custom", label: "Design & Build" },
      { value: "Family Law", label: "Practice Focus" },
      { value: "100%", label: "Mobile Optimized" },
      { value: "Michigan", label: "Local SEO Focus" },
    ],
    challenge:
      "Attorney Neda Mohiedeen needed a website that reflected the trust and sensitivity family law requires. Clients are often reaching out during one of the hardest moments in their lives. A generic, template-driven site wasn't building that trust, and wasn't showing up in local search when Michigan families needed her most.",
    solution:
      "We designed a custom family law website built around trust and approachability: clear practice area pages, credentials and bar membership front and center, and a consultation flow that feels like a first conversation, not a form. Alongside the redesign, we launched a local SEO strategy targeting her specific practice areas and service area in Michigan.",
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
    results: [
      { value: "Custom", label: "Design built around trust, not templates" },
      { value: "Local", label: "SEO targeting Michigan family law searches" },
      { value: "Mobile-Ready", label: "Fast and accessible on every device" },
    ],
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
    cardResultColor: "text-[#cb7c46]",
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
    heroMetrics: [
      { value: "Full", label: "Website Rebuild" },
      { value: "Mold & Cleaning", label: "Specialty Focus" },
      { value: "Mobile-First", label: "Design Approach" },
      { value: "Michigan", label: "Service Area" },
    ],
    challenge:
      "Mold remediation is an urgent, high-stress service. Customers searching for help are usually dealing with property damage, insurance claims, and a ticking clock. Dearborn Cleaners needed a website that could meet that urgency head-on: build trust fast, explain the process clearly, and make it easy to book an inspection without adding to the stress.",
    solution:
      "We rebuilt the site from the ground up around that urgency: a direct homepage leading with the core message (\"Mold doesn't wait. Neither should you.\"), clear service breakdowns, and messaging built around the insurance-documentation process customers actually care about. Every page is built to move a stressed-out homeowner toward one clear next step: schedule an inspection.",
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
    results: [
      { value: "Rebuilt", label: "From the ground up" },
      { value: "Live", label: "New site now serving customers" },
      { value: "Mobile-First", label: "Built for on-the-go search" },
    ],
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
    cardResultColor: "text-[#cb7c46]",
    tagline: "Detroit's premier glass shop, now impossible to miss on Google",
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
    heroMetrics: [
      { value: "Top 3", label: "Google Map Pack" },
      { value: "2×", label: "Monthly Quote Requests" },
      { value: "35+", label: "Citations Corrected" },
      { value: "4 wks", label: "Delivery Time" },
    ],
    challenge:
      "Detroit Glass and Mirror had been serving the community for over a decade, but their website was frozen in 2012. It was slow, not mobile-friendly, and completely invisible in local search results. Out-of-area competitors with polished websites and stronger Google profiles were winning Detroit jobs that rightfully belonged to this long-standing local shop. They needed a modern digital presence that matched their reputation.",
    solution:
      "We redesigned the website with a clean, professional look that loaded fast and worked flawlessly on mobile. We created dedicated service pages for shower glass, custom mirrors, commercial glazing, and auto glass, each optimized for specific search terms. A full local SEO campaign followed: Google Business Profile optimization, NAP cleanup across 35+ directories, a review acquisition strategy, and structured data targeting Detroit-area glass searches.",
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
    results: [
      { value: "Top 3", label: "Google Map Pack for primary keywords" },
      { value: "2×", label: "Monthly quote requests" },
      { value: "35+", label: "Citations corrected and unified" },
      { value: "94", label: "PageSpeed score (was 31)" },
    ],
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
    cardResultColor: "text-[#cb7c46]",
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
    heroMetrics: [
      { value: "#1", label: "Local Search Ranking" },
      { value: "4×", label: "Lead Generation" },
      { value: "40+", label: "Directory Listings" },
      { value: "5 wks", label: "Delivery Time" },
    ],
    challenge:
      "Salazar Drywall Pros was a family-owned contracting business that relied entirely on word-of-mouth referrals. They had no website, no Google presence, and no way for new customers to find them online. Meanwhile, competitors, many with inferior craftsmanship, were winning jobs simply because they showed up first on Google. The family knew their work spoke for itself. They needed digital presence to match.",
    solution:
      "We built a professional, trust-first website showcasing their project portfolio, crew credentials, and service coverage area. Then we launched an aggressive local SEO campaign: Google Business Profile setup and optimization, local citation building across 40+ directories, geo-targeted landing pages for each service area, and a systematic review generation strategy. We targeted high-intent keywords like 'drywall contractor near me' and 'drywall repair [city name]' across their full coverage area.",
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
    results: [
      { value: "#1", label: "Ranked for primary drywall keywords" },
      { value: "4×", label: "More leads per month" },
      { value: "40+", label: "Directory listings established" },
      { value: "Top 3", label: "Google Map Pack placement" },
    ],
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
    cardResultColor: "text-[#cb7c46]",
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
    heroMetrics: [
      { value: "+220%", label: "Organic Traffic" },
      { value: "40%", label: "Revenue from Website" },
      { value: "1.2s", label: "Avg Load Time" },
      { value: "8 wks", label: "Delivery Time" },
    ],
    challenge:
      "Indoor Garden had built a loyal following on Instagram but had no website. Every order was processed through DMs, creating a chaotic, unscalable ordering process with no checkout flow, no inventory management, and no way for new customers to discover them through search. They needed an e-commerce presence that was as beautiful as their product photography and could grow beyond social media.",
    solution:
      "We designed and built a full-featured e-commerce site with a warm, organic aesthetic that matched their brand identity. Product pages were designed to let the photography shine, with a streamlined 3-step checkout flow. Alongside the build, we developed an SEO content strategy targeting plant care and indoor gardening keywords, turning search traffic into a predictable acquisition channel.",
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
    results: [
      { value: "+220%", label: "Organic traffic growth in 5 months" },
      { value: "40%", label: "Revenue now from website" },
      { value: "0→100%", label: "Online sales presence launched" },
      { value: "1.2s", label: "Average page load time" },
    ],
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
    cardResultColor: "text-[#cb7c46]",
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
    heroMetrics: [
      { value: "68%", label: "Inquiries Automated" },
      { value: "3×", label: "Enterprise Lead Quality" },
      { value: "96", label: "PageSpeed Score" },
      { value: "10 wks", label: "Delivery Time" },
    ],
    challenge:
      "Thematek's website didn't reflect their sophistication as a technology company. It looked like a template site, not the work of an innovative IT firm. Beyond aesthetics, they were spending significant team time answering the same introductory client questions over and over. They wanted to reclaim that time without sacrificing the quality of their client experience.",
    solution:
      "We rebuilt their website with a modern, technology-forward design system that positioned Thematek as the premium IT firm they are. Then we built and deployed a custom AI intake agent trained on their full service catalog, capable of qualifying leads, answering detailed service questions, capturing project requirements, and routing complex inquiries to the right team member. The agent runs 24/7 and integrates directly with their CRM.",
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
    results: [
      { value: "68%", label: "Client inquiries handled by AI" },
      { value: "3×", label: "Improvement in enterprise lead quality" },
      { value: "96", label: "Google PageSpeed score" },
      { value: "40 hrs", label: "Team time saved per month" },
    ],
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
    cardResultColor: "text-[#cb7c46]",
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
    heroMetrics: [
      { value: "+156%", label: "Organic Traffic" },
      { value: "+85%", label: "Online Bookings" },
      { value: "3×", label: "New Client Inquiries" },
      { value: "7 wks", label: "Delivery Time" },
    ],
    challenge:
      "The Stat Clinic's previous website made it hard for prospective clients to understand the depth of their services or take the next step and book. Their data-driven, performance-first approach to athletic health deserved a digital presence that matched that precision. Instead, they had a generic template site that buried their expertise and made booking an afterthought.",
    solution:
      "We built a new site with a clear service architecture, practitioner profiles that established clinical authority, and an integrated online booking system that made scheduling effortless. We then developed an SEO strategy targeting sports performance, athletic recovery, and local health searches, creating content that answered the specific questions athletes and trainers were typing into Google.",
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
    results: [
      { value: "+156%", label: "Organic traffic growth" },
      { value: "+85%", label: "Online appointment bookings" },
      { value: "3×", label: "New client inquiry volume" },
      { value: "97", label: "PageSpeed score" },
    ],
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
