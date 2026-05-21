export type ProjectShape = {
  size: string;
  pos: string;
  opacity: string;
};

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
  gradient: string;
  cardDesc: string;
  cardResult: string;
  cardResultColor: string;
  shapes: ProjectShape[];
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
    slug: "indoor-garden",
    title: "Indoor Garden",
    domain: "indoorgarden.com",
    category: "Web Design",
    industry: "Retail / E-commerce",
    location: "Michigan",
    tags: ["E-commerce Website Design", "Plant Shop Michigan", "SEO Content Strategy"],
    gradient: "from-[#D25124] via-[#C04020] to-[#7A1800]",
    cardDesc:
      "E-commerce website design for a Michigan indoor plant shop moving from Instagram DMs to a full online storefront. A targeted SEO content strategy around plant care and indoor gardening searches grew organic traffic 220% in 5 months — 40% of revenue now flows through the site.",
    cardResult: "+220% Organic Traffic",
    cardResultColor: "text-[#F07A3A]",
    shapes: [
      { size: "w-20 h-20 rounded-3xl", pos: "top-6 right-6", opacity: "bg-white/10" },
      { size: "w-10 h-10 rounded-2xl", pos: "top-4 right-28", opacity: "bg-white/5" },
      { size: "w-32 h-2 rounded", pos: "bottom-16 left-6", opacity: "bg-white/10" },
      { size: "w-20 h-2 rounded", pos: "bottom-10 left-6", opacity: "bg-white/8" },
    ],
    tagline: "From Instagram DMs to a thriving online store",
    metaTitle: "Indoor Garden — E-commerce Web Design Case Study | Spectecle",
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
      "We designed and built a full-featured e-commerce site with a warm, organic aesthetic that matched their brand identity. Product pages were designed to let the photography shine, with a streamlined 3-step checkout flow. Alongside the build, we developed an SEO content strategy targeting plant care and indoor gardening keywords — turning search traffic into a predictable acquisition channel.",
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
    screenshotUrl: "https://image.thum.io/get/width/1200/crop/750/viewportWidth/1440/noanimate/https://indoorgarden.com",
  },

  {
    slug: "salazar-drywall-pros",
    title: "Salazar Drywall Pros",
    domain: "salazardrywallpros.com",
    category: "Local SEO",
    industry: "Home Services / Construction",
    location: "Michigan",
    tags: ["Contractor Website Design", "Local SEO Detroit", "Google Map Pack"],
    gradient: "from-[#C03020] via-[#A82818] to-[#6B1808]",
    cardDesc:
      "Contractor website design and aggressive local SEO for a Detroit-area drywall company — built from zero online presence to #1 Google rankings for 'drywall contractor Michigan.' Includes 40+ citation listings, geo-targeted service area pages, and Google Map Pack placement.",
    cardResult: "#1 Local Rankings",
    cardResultColor: "text-[#F07A3A]",
    shapes: [
      { size: "w-32 h-8 rounded", pos: "top-8 right-6", opacity: "bg-white/10" },
      { size: "w-32 h-8 rounded", pos: "top-20 right-6", opacity: "bg-white/7" },
      { size: "w-24 h-8 rounded", pos: "top-32 right-6", opacity: "bg-white/5" },
      { size: "w-20 h-2 rounded", pos: "bottom-10 left-6", opacity: "bg-white/10" },
    ],
    tagline: "From word of mouth to page one on Google",
    metaTitle: "Salazar Drywall Pros — Local SEO & Web Design Case Study | Spectecle",
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
      "Salazar Drywall Pros was a family-owned contracting business that relied entirely on word-of-mouth referrals. They had no website, no Google presence, and no way for new customers to find them online. Meanwhile, competitors — many with inferior craftsmanship — were winning jobs simply because they showed up first on Google. The family knew their work spoke for itself. They needed digital presence to match.",
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
    screenshotUrl: "https://image.thum.io/get/width/1200/crop/750/viewportWidth/1440/noanimate/https://salazardrywallpros.com",
  },

  {
    slug: "detroit-glass-mirror",
    title: "Detroit Glass & Mirror",
    domain: "detroitglassandmirror.com",
    category: "Local SEO",
    industry: "Home Services / Glass",
    location: "Detroit, MI",
    tags: ["Detroit Web Design", "Glass Company SEO", "Map Pack Ranking"],
    gradient: "from-[#E06828] via-[#D25124] to-[#7A1808]",
    cardDesc:
      "Website redesign and local SEO for Detroit's premier glass and mirror company. Google Map Pack placement for 'glass company Detroit' and 'shower glass installation Michigan.' PageSpeed jumped 31 → 94 and monthly quote requests doubled in under 90 days.",
    cardResult: "Google Map Pack",
    cardResultColor: "text-[#F07A3A]",
    shapes: [
      { size: "w-20 h-20 rotate-45", pos: "top-6 right-8", opacity: "bg-white/10" },
      { size: "w-12 h-12 rotate-45", pos: "top-14 right-24", opacity: "bg-white/6" },
      { size: "w-8 h-8 rotate-45", pos: "top-4 right-20", opacity: "bg-white/4" },
      { size: "w-36 h-1.5 rounded", pos: "bottom-14 left-6", opacity: "bg-white/10" },
      { size: "w-24 h-1.5 rounded", pos: "bottom-8 left-6", opacity: "bg-white/8" },
    ],
    tagline: "Detroit's premier glass shop — now impossible to miss on Google",
    metaTitle: "Detroit Glass & Mirror — Local SEO & Website Redesign Case Study | Spectecle",
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
      "We redesigned the website with a clean, professional look that loaded fast and worked flawlessly on mobile. We created dedicated service pages for shower glass, custom mirrors, commercial glazing, and auto glass — each optimized for specific search terms. A full local SEO campaign followed: Google Business Profile optimization, NAP cleanup across 35+ directories, a review acquisition strategy, and structured data targeting Detroit-area glass searches.",
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
    screenshotUrl: "https://image.thum.io/get/width/1200/crop/750/viewportWidth/1440/noanimate/https://detroitglassandmirror.com",
  },

  {
    slug: "the-stat-clinic",
    title: "The Stat Clinic",
    domain: "thestatclinic.com",
    category: "Web Design",
    industry: "Sports Performance & Health",
    location: "Michigan",
    tags: ["Healthcare Website Design", "Sports Clinic SEO", "Online Booking Michigan"],
    gradient: "from-[#D25124] via-[#B83020] to-[#8B2000]",
    cardDesc:
      "Custom website design and SEO for a Michigan sports performance and health clinic. Integrated online booking grew appointment volume 85%; a content strategy targeting athletic recovery and performance searches drove +156% organic traffic in under 6 months.",
    cardResult: "+85% Appointments",
    cardResultColor: "text-[#F07A3A]",
    shapes: [
      { size: "w-4 h-20 rounded", pos: "top-8 right-8", opacity: "bg-white/10" },
      { size: "w-4 h-14 rounded", pos: "top-8 right-16", opacity: "bg-white/8" },
      { size: "w-4 h-24 rounded", pos: "top-8 right-24", opacity: "bg-white/6" },
      { size: "w-4 h-10 rounded", pos: "top-8 right-32", opacity: "bg-white/4" },
      { size: "w-28 h-1.5 rounded", pos: "bottom-10 left-6", opacity: "bg-white/10" },
    ],
    tagline: "Performance-grade digital presence for a data-driven clinic",
    metaTitle: "The Stat Clinic — Web Design & SEO Case Study | Spectecle",
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
      "The Stat Clinic's previous website made it hard for prospective clients to understand the depth of their services or take the next step and book. Their data-driven, performance-first approach to athletic health deserved a digital presence that matched that precision — instead they had a generic template site that buried their expertise and made booking an afterthought.",
    solution:
      "We built a new site with a clear service architecture, practitioner profiles that established clinical authority, and an integrated online booking system that made scheduling effortless. We then developed an SEO strategy targeting sports performance, athletic recovery, and local health searches — creating content that answered the specific questions athletes and trainers were typing into Google.",
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
    screenshotUrl: "https://image.thum.io/get/width/1200/crop/750/viewportWidth/1440/noanimate/https://thestatclinic.com",
  },

  {
    slug: "thematek",
    title: "Thematek",
    domain: "thematek.com",
    category: "AI & Automation",
    industry: "Technology / IT Services",
    location: "Michigan",
    tags: ["AI Business Automation", "IT Company Website", "Michigan Tech"],
    gradient: "from-[#E86830] via-[#D25124] to-[#B83020]",
    cardDesc:
      "Website redesign and custom AI automation for a Michigan IT services company. A GPT-4 intake agent — trained on their full service catalog, integrated with CRM and Slack via n8n — now handles 68% of client inquiries 24/7, saving 40+ team hours per month.",
    cardResult: "68% Automated",
    cardResultColor: "text-[#F07A3A]",
    shapes: [
      { size: "w-8 h-8 rounded", pos: "top-6 right-6", opacity: "bg-white/10" },
      { size: "w-8 h-8 rounded", pos: "top-6 right-18", opacity: "bg-white/8" },
      { size: "w-8 h-8 rounded", pos: "top-6 right-30", opacity: "bg-white/6" },
      { size: "w-8 h-8 rounded", pos: "top-18 right-6", opacity: "bg-white/8" },
      { size: "w-8 h-8 rounded", pos: "top-18 right-18", opacity: "bg-white/5" },
      { size: "w-28 h-1.5 rounded", pos: "bottom-10 left-6", opacity: "bg-white/10" },
    ],
    tagline: "Cutting-edge website. Even sharper AI behind the scenes.",
    metaTitle: "Thematek — Web Design & AI Automation Case Study | Spectecle",
    metaDescription:
      "How Spectecle redesigned Thematek's website and deployed a custom AI intake agent that now handles 68% of client inquiries — tripling enterprise lead quality.",
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
      "Thematek's website didn't reflect their sophistication as a technology company — it looked like a template site, not the work of an innovative IT firm. Beyond aesthetics, they were spending significant team time answering the same introductory client questions over and over. They wanted to reclaim that time without sacrificing the quality of their client experience.",
    solution:
      "We rebuilt their website with a modern, technology-forward design system that positioned Thematek as the premium IT firm they are. Then we built and deployed a custom AI intake agent trained on their full service catalog — capable of qualifying leads, answering detailed service questions, capturing project requirements, and routing complex inquiries to the right team member. The agent runs 24/7 and integrates directly with their CRM.",
    features: [
      { icon: "monitor", label: "Brand & Design Refresh", desc: "Modern, tech-forward visual identity that communicates innovation and expertise" },
      { icon: "bot", label: "Custom AI Intake Agent", desc: "LLM-powered agent trained on Thematek's services, qualifying leads around the clock" },
      { icon: "layers", label: "Service Architecture", desc: "Clear service pages with capability proof points and enterprise case study content" },
      { icon: "refresh-cw", label: "Automation Workflows", desc: "n8n-based workflows connecting the AI agent to CRM and team Slack channels" },
      { icon: "rocket", label: "Performance Optimization", desc: "Sub-2s load times and a 96 PageSpeed score — fast as the tech they build" },
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
    screenshotUrl: "https://image.thum.io/get/width/1200/crop/750/viewportWidth/1440/noanimate/https://thematek.com",
  },

  {
    slug: "glam-by-abeer",
    title: "Glam by Abeer",
    domain: "glambyabeer.com",
    category: "SEO",
    industry: "Beauty & Personal Care",
    location: "Michigan",
    tags: ["Beauty Studio Website", "Makeup Artist SEO Michigan", "Luxury Portfolio Design"],
    gradient: "from-[#F07A3A] via-[#D25124] to-[#A83418]",
    cardDesc:
      "Luxury portfolio website and local SEO for a Michigan makeup artist — ranking page one for 15+ searches including 'makeup artist Michigan,' 'lash extensions near me,' and 'bridal makeup Detroit.' Booking calendar now fills 3 months in advance from organic search alone.",
    cardResult: "15+ Keywords Ranked",
    cardResultColor: "text-[#F07A3A]",
    shapes: [
      { size: "w-24 h-24 rounded-full", pos: "top-4 right-8", opacity: "bg-white/10" },
      { size: "w-12 h-12 rounded-full", pos: "top-16 right-28", opacity: "bg-white/6" },
      { size: "w-6 h-6 rounded-full", pos: "top-6 right-24", opacity: "bg-white/8" },
      { size: "w-32 h-1.5 rounded", pos: "bottom-14 left-6", opacity: "bg-white/10" },
      { size: "w-20 h-1.5 rounded", pos: "bottom-8 left-6", opacity: "bg-white/7" },
    ],
    tagline: "Luxury beauty brand — discovered on Google, booked for months",
    metaTitle: "Glam by Abeer — Web Design & Beauty SEO Case Study | Spectecle",
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
      "Glam by Abeer had a loyal clientele and a beautifully curated Instagram presence, but no website. Potential clients were searching 'makeup artist near me' and 'lash extensions Michigan' — and finding other artists instead. Abeer's quality was unmatched, but without a web presence, she was invisible in the search results where clients were looking.",
    solution:
      "We designed a luxury-aesthetic portfolio website that put her work front and center — full-bleed galleries filtered by service type, with an elegant booking flow and clear pricing architecture. We then launched a local SEO strategy targeting Michigan beauty keywords across all her service offerings, optimized her Google Business Profile, and implemented structured data for her services to capture both map and organic search placements.",
    features: [
      { icon: "camera", label: "Luxury Portfolio Design", desc: "Full-screen galleries with category filtering by service — bridal, lashes, glam, and more" },
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
    screenshotUrl: "https://image.thum.io/get/width/1200/crop/750/viewportWidth/1440/noanimate/https://glambyabeer.com",
  },

  {
    slug: "nm-legal-firm",
    title: "NM Legal Firm",
    domain: "nmlegalfirm.com",
    category: "SEO",
    industry: "Legal / Law Firm",
    location: "Michigan",
    tags: ["Law Firm Website Design", "Legal SEO Michigan", "Attorney Marketing"],
    gradient: "from-[#8B3020] via-[#6B2010] to-[#4B1808]",
    cardDesc:
      "Authority-focused law firm website design and legal SEO for Michigan attorney Neda Mohiedeen. Page one Google rankings for primary practice area keywords, structured data for rich results, and a consultation funnel that tripled qualified inquiry volume.",
    cardResult: "3× Consultations",
    cardResultColor: "text-slate-300",
    shapes: [
      { size: "w-4 h-24 rounded", pos: "top-8 right-8", opacity: "bg-white/10" },
      { size: "w-4 h-16 rounded", pos: "top-8 right-16", opacity: "bg-white/7" },
      { size: "w-4 h-20 rounded", pos: "top-8 right-24", opacity: "bg-white/5" },
      { size: "w-28 h-1.5 rounded", pos: "bottom-14 left-6", opacity: "bg-white/10" },
      { size: "w-20 h-1.5 rounded", pos: "bottom-8 left-6", opacity: "bg-white/7" },
    ],
    tagline: "Authority-first web presence for a Michigan attorney",
    metaTitle: "NM Legal Firm — Law Firm Website & SEO Case Study | Spectecle",
    metaDescription:
      "How Spectecle designed a credibility-first law firm website and SEO strategy for Michigan attorney Neda Mohiedeen, ranking page one for practice area keywords and tripling consultation requests.",
    metaKeywords: [
      "law firm website design Michigan",
      "attorney website case study",
      "legal SEO Michigan",
      "lawyer website design Detroit",
      "Spectecle law firm web design case study",
    ],
    heroMetrics: [
      { value: "Pg. 1", label: "Google Rankings" },
      { value: "3×", label: "Consultation Requests" },
      { value: "100%", label: "Mobile Optimized" },
      { value: "8 wks", label: "Delivery Time" },
    ],
    challenge:
      "Attorney Neda Mohiedeen's previous website was a generic template that failed to communicate her expertise, experience, or personality. In a competitive legal market, first impressions online matter enormously — and hers wasn't making one. She was invisible in Google search for her practice areas and converting very few of the visitors who did find her site.",
    solution:
      "We designed a custom law firm website built on the twin pillars of trust and authority — professional photography integration, clear practice area pages, bar membership and credential display, and a streamlined consultation booking flow. Then we launched an SEO campaign targeting her specific practice areas in Michigan, with legal service structured data, a content strategy answering common client questions, and technical optimization across the board.",
    features: [
      { icon: "briefcase", label: "Authority-First Design", desc: "Trust signals, credentials, bar membership, and professional photography woven throughout" },
      { icon: "file-text", label: "Practice Area Pages", desc: "SEO-optimized individual pages for each practice area targeting Michigan legal searches" },
      { icon: "calendar", label: "Consultation Funnel", desc: "Streamlined contact flow designed to convert website visitors into consultation bookings" },
      { icon: "code", label: "Legal Schema Markup", desc: "LegalService, Attorney, and LawFirm schema for enhanced SERP presence and rich results" },
      { icon: "book-open", label: "Legal Content Strategy", desc: "Blog targeting FAQ and informational keyword searches in Neda's practice areas" },
      { icon: "smartphone", label: "Mobile Optimization", desc: "Fast, accessible design for clients seeking urgent legal counsel from any device" },
    ],
    deliverables: [
      "Custom law firm website",
      "Practice area landing pages",
      "Attorney profile & credentials page",
      "Consultation booking integration",
      "SEO keyword strategy & on-page optimization",
      "Legal schema & structured data",
      "Legal blog & content strategy",
      "GA4 & Search Console setup",
    ],
    services: ["Web Design & Development", "SEO Strategy", "Content Marketing"],
    results: [
      { value: "Pg. 1", label: "Google for primary practice keywords" },
      { value: "3×", label: "Consultation request volume" },
      { value: "96", label: "PageSpeed score" },
      { value: "Top 5", label: "Michigan attorney keyword rankings" },
    ],
    testimonial: {
      quote:
        "Working with Spectecle was hands down the best investment I made for my firm. The website looks professional and authoritative, and within a few months I was getting consultation requests from clients who found me on Google. Highly recommend.",
      author: "Neda Mohiedeen",
      role: "Attorney, NM Legal Firm",
      initials: "NM",
      avatarGradient: "from-[#E86830] to-[#B83020]",
    },
    year: "2024",
    liveUrl: "https://nmlegalfirm.com",
    screenshotUrl: "https://image.thum.io/get/width/1200/crop/750/viewportWidth/1440/noanimate/https://nmlegalfirm.com",
  },
];
