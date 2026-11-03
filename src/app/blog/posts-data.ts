export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; text: string; caseStudySlug: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  image: string;
  readTime: string;
  publishedAt: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  caseStudySlug?: string;
  caseStudyTitle?: string;
  content: ContentBlock[];
};

export const posts: BlogPost[] = [
  {
    slug: "choose-web-designer-detroit",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80",
    title: "How to Choose a Web Designer in Metro Detroit: Questions to Ask",
    excerpt:
      "The questions to ask a Detroit web designer before you hire, what good answers sound like, and the red flags that cost small businesses time and money.",
    category: "Web Design",
    categoryColor: "text-[#9a5423]",
    readTime: "6 min read",
    publishedAt: "November 2, 2026",
    metaTitle: "How to Choose a Web Designer in Metro Detroit",
    metaDescription:
      "The questions to ask a Detroit web designer before you hire, what good answers sound like, and the red flags that cost small businesses time and money.",
    metaKeywords: [
      "how to choose a web designer",
      "web design agency detroit",
      "website agency detroit",
      "questions to ask a web designer",
      "hire web designer detroit",
    ],
    content: [
      {
        type: "p",
        text: "Metro Detroit has no shortage of web designers: solo freelancers, small studios, national agencies with a Detroit page, and website builders that promise a site in an afternoon. They can all show you a nice homepage. What separates them is what happens before and after launch: whether the site brings in calls, whether it shows up in Google, and whether you can get help when something breaks. These are the questions that reveal the difference, and what good answers sound like.",
      },
      {
        type: "h2",
        text: "What Does a Web Designer Actually Do?",
      },
      {
        type: "p",
        text: "A web designer plans, designs, and usually builds your website. Depending on who you hire, that can also include writing the content, setting up search basics, connecting booking or payment tools, and looking after the site once it's live. Before you compare quotes, find out which of those are included, because two proposals with the same title can cover very different work.",
      },
      {
        type: "h2",
        text: "Questions to Ask Before You Hire",
      },
      {
        type: "h3",
        text: "Can I see sites you've built for businesses like mine?",
      },
      {
        type: "p",
        text: "Look past screenshots. Open the live sites on your phone, try to find the phone number, and see how fast they load. Ask which ones are still clients. A designer whose old sites are still running well, and still updated, is one who builds for the long term.",
      },
      {
        type: "h3",
        text: "Who will actually do the work?",
      },
      {
        type: "p",
        text: "Some agencies sell the project and pass it to a junior designer or an outside team. That isn't always bad, but you should know who you'll be talking to and who will fix things later.",
      },
      {
        type: "h3",
        text: "How will the site help me get found on Google?",
      },
      {
        type: "p",
        text: "A good answer is specific: page titles and descriptions for each service, a clear page structure, fast load times, a sitemap, and Google Search Console and Analytics set up at launch so you can see how people find you. A vague \"it's SEO-friendly\" isn't an answer.",
      },
      {
        type: "h3",
        text: "What happens to my current rankings if you replace my site?",
      },
      {
        type: "p",
        text: "If your current site gets any search traffic, the new one needs to keep those page addresses or redirect them properly. Designers who skip this step can wipe out years of rankings overnight. Ask how they handle it.",
      },
      {
        type: "h3",
        text: "Who owns the website, the domain, and the content?",
      },
      {
        type: "p",
        text: "You should be able to get your domain, your content, and a copy of your site if you ever leave. Get the answer in writing, and make sure the domain is registered in your name, not the designer's.",
      },
      {
        type: "h3",
        text: "What platform will you build on, and can I make edits myself?",
      },
      {
        type: "p",
        text: "There's no single right platform. What matters is that the choice fits your business and that you know what you can change yourself. Ask what everyday edits like hours, photos, or a new service will look like after launch.",
      },
      {
        type: "h3",
        text: "What's included after launch?",
      },
      {
        type: "p",
        text: "Websites need updates, backups, and security checks. Ask what's included, how you request changes, and how quickly they're usually handled. A shared place to track requests and see what was done beats a long email thread.",
      },
      {
        type: "h3",
        text: "How do you price the project, and what's not included?",
      },
      {
        type: "p",
        text: "You should get a written, itemized scope before work starts: the pages, features, and connections included, the timeline, and what costs extra. Be wary of a single number with no breakdown.",
      },
      {
        type: "h2",
        text: "Red Flags",
      },
      {
        type: "ul",
        items: [
          "They can't show live sites, only mockups or screenshots.",
          "The domain or hosting would be in their name, not yours.",
          "No plan for redirects when replacing a site that already ranks.",
          "\"Guaranteed number one on Google.\" Nobody can promise that.",
          "A quote with no written scope, or pressure to sign on the first call.",
          "Silence about what happens after launch.",
        ],
      },
      {
        type: "h2",
        text: "Freelancer, Studio, or Big Agency?",
      },
      {
        type: "ul",
        items: [
          "Freelancers can be affordable and personal, but one person can be a single point of failure if they get busy or move on.",
          "Small studios usually give you the people doing the work directly, with more than one skill set under one roof.",
          "Large agencies have more resources and process, but you may deal mostly with account managers, and smaller projects can get less attention.",
        ],
      },
      {
        type: "p",
        text: "Whichever you choose, the questions above apply.",
      },
      {
        type: "h2",
        text: "How We Answer These at Spectecle",
      },
      {
        type: "p",
        text: "We're a small studio based in Dearborn, and the same team designs, builds, and handles the SEO, so search basics are part of every site from the start. Google Search Console and Analytics are set up at launch, old pages are redirected so rankings carry over, and after launch, requests and reports live in The Loop, our client portal. We send a written, itemized scope before any work starts.",
      },
      {
        type: "h2",
        text: "Choosing a Web Designer: Questions",
      },
      {
        type: "h3",
        text: "How long should a small business website take?",
      },
      {
        type: "p",
        text: "Most custom websites take a few weeks from kickoff to launch. The biggest factor is usually how quickly content and feedback come back, followed by any booking, payment, or CRM connections the site needs.",
      },
      {
        type: "h3",
        text: "Should I hire a local web designer?",
      },
      {
        type: "p",
        text: "You don't have to, but it helps. A local designer knows your market and the searches your customers use, and can meet when it matters.",
      },
      {
        type: "h3",
        text: "Do I need SEO if I'm getting a new website?",
      },
      {
        type: "p",
        text: "The basics should be built into the website itself. Ongoing SEO, like your Google Business Profile, reviews, and new content, is separate and worth it if your customers find businesses like yours on Google.",
      },
    ],
  },
  {
    slug: "bilingual-websites-dearborn",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    title: "Bilingual Websites for Dearborn Businesses: English and Arabic Done Right",
    excerpt:
      "How Dearborn businesses can build an English and Arabic website that reads naturally, works right-to-left, and shows up in Google in both languages.",
    category: "Web Design",
    categoryColor: "text-[#9a5423]",
    readTime: "5 min read",
    publishedAt: "November 2, 2026",
    metaTitle: "Bilingual Websites in Dearborn: English and Arabic",
    metaDescription:
      "How Dearborn businesses can build an English and Arabic website that reads naturally, works right-to-left, and shows up in Google in both languages.",
    metaKeywords: [
      "bilingual website dearborn",
      "arabic website design",
      "english arabic website",
      "arabic web design michigan",
      "web design dearborn",
    ],
    content: [
      {
        type: "p",
        text: "Dearborn has one of the largest Arab American communities in the country, and many of the customers walking into its shops, clinics, and offices are more comfortable reading Arabic than English. A website in both languages tells those customers they're welcome before they ever call. Done badly, though, it can look broken, confuse Google, and do more harm than an English-only site. This guide covers how to do it right, based on what we learned building Explore Dearborn, our own bilingual events guide for the city.",
      },
      {
        type: "h2",
        text: "What Is a Bilingual Website?",
      },
      {
        type: "p",
        text: "A bilingual website offers the same content in two languages, with an easy way to switch between them. A good one is more than a translation pasted onto the same pages. Each language gets its own pages, its own layout direction, and its own search listing, so an Arabic speaker and an English speaker both get a site that feels like it was made for them.",
      },
      {
        type: "h2",
        text: "Why It Matters for Dearborn Businesses",
      },
      {
        type: "ul",
        items: [
          "Customers decide faster in their first language. Prices, services, insurance, and directions are where misunderstandings cost you a customer.",
          "Families share links. A son or daughter finds you in English and sends the Arabic page to a parent.",
          "Few local competitors do it well. Many Dearborn sites either skip Arabic or bolt on an automatic translation widget, so a well-built Arabic version stands out.",
        ],
      },
      {
        type: "h2",
        text: "How We Built Explore Dearborn in Two Languages",
      },
      {
        type: "p",
        text: "Explore Dearborn (exploredearborn.com) lists events around the city in English and Arabic. These are the decisions that made it work:",
      },
      {
        type: "ul",
        items: [
          "Separate pages for each language. English lives at the main address, and Arabic lives under /ar/. Each language version has its own address that people can share and Google can list.",
          "Real right-to-left layout. Arabic pages are marked as Arabic and right-to-left, so the whole layout flips: menus, text alignment, icons, and reading order.",
          "An Arabic font that's actually designed for Arabic. The Arabic pages load a typeface made for Arabic script, and only on Arabic pages, so English pages stay fast.",
          "Mixed text handled on purpose. The English brand name, email addresses, and web links stay left-to-right inside Arabic sentences, so they don't come out scrambled.",
          "A language switch on every page that goes to the same page in the other language, not back to the homepage.",
          "Search engines told how the two versions relate. Each page points to its other-language twin, so Google shows the Arabic page to Arabic searchers and the English page to everyone else.",
        ],
      },
      {
        type: "h2",
        text: "The Most Common Mistakes",
      },
      {
        type: "ul",
        items: [
          "Automatic translation widgets. They produce awkward or wrong Arabic, and the translated text usually isn't something Google can list as its own page.",
          "Arabic text on an English layout. Right-aligned paragraphs inside a left-to-right page look broken, especially on phones.",
          "Phone numbers, prices, and dates that flip. Numbers and mixed English-Arabic lines need to be set up deliberately, or they display in the wrong order.",
          "Only translating the homepage. Customers click through to services and contact pages. If those switch back to English, the effort is lost.",
          "One language's pages hidden from Google. If the Arabic pages share an address with the English ones or aren't linked properly, they never show up in search.",
          "Forms that don't work in Arabic. Labels, error messages, and confirmation emails all need translating, and email fields should stay left-to-right.",
        ],
      },
      {
        type: "h2",
        text: "What to Translate First",
      },
      {
        type: "p",
        text: "You don't need every page on day one. Start where a misunderstanding costs the most:",
      },
      {
        type: "ul",
        items: [
          "Your homepage and main service pages.",
          "Contact details, hours, location, and directions.",
          "Anything about prices, insurance, payment, or booking.",
          "Your contact or booking form, including its error and thank-you messages.",
          "Frequently asked questions.",
        ],
      },
      {
        type: "p",
        text: "Blog posts and older news can follow later.",
      },
      {
        type: "h2",
        text: "Getting the Arabic Right",
      },
      {
        type: "p",
        text: "Have the Arabic written or reviewed by a fluent speaker who knows your industry. Many Dearborn customers read Modern Standard Arabic but speak a regional dialect, so keep the wording clear and professional rather than overly formal. Keep brand names, product names, and anything a customer might search for in English as they are, and keep the tone the same as your English pages. The Arabic version should sound like the same business, not a different one.",
      },
      {
        type: "h2",
        text: "How Bilingual Pages Show Up in Google",
      },
      {
        type: "p",
        text: "When each language has its own page and the pages point to each other, Google can match the right version to the right searcher. An Arabic search for a service in Dearborn can bring up your Arabic page, while English searchers see the English one. Mention in your Google Business Profile description that you serve customers in Arabic, too.",
      },
      {
        type: "h2",
        text: "Bilingual Website Questions",
      },
      {
        type: "h3",
        text: "Should Arabic be on a separate website?",
      },
      {
        type: "p",
        text: "Usually not. Keeping both languages on one website, with Arabic under its own section like /ar/, is simpler to manage and builds up a single site's reputation in Google instead of splitting it in two.",
      },
      {
        type: "h3",
        text: "Can I add Arabic to my existing website?",
      },
      {
        type: "p",
        text: "Often, yes. Most modern websites can add a second language. How much work it takes depends on whether the site's design can flip to right-to-left cleanly and how many pages you want translated.",
      },
      {
        type: "h3",
        text: "Is automatic translation good enough?",
      },
      {
        type: "p",
        text: "It's fine for a rough idea, but not for the pages customers act on. A fluent writer catches meaning, tone, and industry terms that automatic tools get wrong, and the result is pages Google can actually list.",
      },
      {
        type: "h3",
        text: "Does a bilingual site cost twice as much?",
      },
      {
        type: "p",
        text: "No. The design and build are shared, and the extra work is the translation, the right-to-left layout, and the language setup. We scope it after a free discovery call, like any project.",
      },
    ],
  },
  {
    slug: "local-seo-detroit-guide",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    title: "Local SEO in Detroit: A Practical Guide for Small Businesses",
    excerpt:
      "What actually moves local rankings for Metro Detroit businesses: your Google Business Profile, reviews, consistent business details, and pages worth ranking.",
    category: "Local SEO",
    categoryColor: "text-[#9a5423]",
    readTime: "6 min read",
    publishedAt: "November 2, 2026",
    metaTitle: "Local SEO in Detroit: A Practical Guide for Small Businesses",
    metaDescription:
      "How Detroit-area small businesses get into Google's map results and local searches: Business Profile, reviews, citations, and pages that rank.",
    metaKeywords: [
      "local seo detroit",
      "local seo metro detroit",
      "seo for small businesses detroit",
      "google business profile detroit",
      "local seo dearborn",
    ],
    caseStudySlug: "detroit-glass-mirror",
    caseStudyTitle: "Detroit Glass & Mirror",
    content: [
      {
        type: "p",
        text: "Local SEO decides whether your business shows up when someone in Detroit, Dearborn, or the suburbs around them searches for what you do. It's the reason one plumber, salon, or law firm appears in Google's map results and another doesn't, even when the second one does better work. This guide covers what actually moves local rankings, in the order we'd tackle it for a small Metro Detroit business.",
      },
      {
        type: "h2",
        text: "What Is Local SEO?",
      },
      {
        type: "p",
        text: "Local SEO is the work that helps a business appear in local search results: Google's map listings, near-me searches, and regular results for searches that include a place, like plumber in Dearborn. It covers your Google Business Profile, your reviews, how consistently your business details appear across the web, and whether your website has clear pages for the services and areas you cover.",
      },
      {
        type: "h2",
        text: "How Google Decides Who Shows Up in the Map Results",
      },
      {
        type: "p",
        text: "Google says local results are based mainly on three things: relevance, distance, and prominence.",
      },
      {
        type: "ul",
        items: [
          "Relevance: how well your Business Profile and website match what someone searched for. A complete profile with the right categories and services helps Google understand what you do.",
          "Distance: how far your business is from the person searching, or from the place named in their search. You can't change where you are, but you can make sure Google knows the areas you serve.",
          "Prominence: how well known your business is, based on information from across the web, including reviews, links, and mentions.",
        ],
      },
      {
        type: "p",
        text: "Distance is why local results look different across Metro Detroit. Someone searching from Dearborn and someone searching from Midtown can see different businesses for the same search. That's normal, and it's why a business usually ranks best close to where it's based and works hardest to rank farther out.",
      },
      {
        type: "h2",
        text: "Your Google Business Profile, Step by Step",
      },
      {
        type: "p",
        text: "For most local businesses, the Google Business Profile does more to bring in calls than any other single thing. Work through it in this order.",
      },
      {
        type: "h3",
        text: "1. Pick the right primary category",
      },
      {
        type: "p",
        text: "Choose the category that describes your main business as specifically as possible, then add secondary categories only for services you really offer. The primary category is one of the strongest signals Google uses to decide which searches you appear for.",
      },
      {
        type: "h3",
        text: "2. List every service",
      },
      {
        type: "p",
        text: "Add each service you offer with a short, plain description. Use the words customers use, not internal jargon. If you serve customers at their location, set your service area to the cities and neighborhoods you actually cover.",
      },
      {
        type: "h3",
        text: "3. Set accurate hours",
      },
      {
        type: "p",
        text: "Keep regular hours current and add special hours for holidays. A business that shows as open when someone searches has an advantage, and wrong hours lead to bad reviews.",
      },
      {
        type: "h3",
        text: "4. Add real photos",
      },
      {
        type: "p",
        text: "Show your work, your team, your storefront or vehicles, and your space. Real photos help people choose you, and they show that the business is active. Add new ones as you complete new work.",
      },
      {
        type: "h3",
        text: "5. Write a clear description",
      },
      {
        type: "p",
        text: "Explain what you do, who you do it for, and where, in plain language. Put the most common questions customers ask on your website too, so people can find the answers before they call.",
      },
      {
        type: "h2",
        text: "Reviews: A Steady Flow, Not a Burst",
      },
      {
        type: "p",
        text: "Reviews affect both whether you show up and whether people pick you. What matters most is a steady stream of recent, genuine reviews, not a large number collected once and then forgotten.",
      },
      {
        type: "ul",
        items: [
          "Ask every customer, right after the job is done or the appointment ends, while the experience is fresh.",
          "Send the direct review link from your Google Business Profile so leaving a review takes one tap.",
          "Reply to every review, positive or negative. A calm, helpful reply to a bad review reassures the next customer reading it.",
          "Never pay for reviews, offer discounts in exchange for them, or ask only the customers you expect to be happy. Google's policies prohibit selectively asking for positive reviews.",
        ],
      },
      {
        type: "h2",
        text: "Citations and Consistent Business Details",
      },
      {
        type: "p",
        text: "A citation is any place online that lists your business name, address, and phone number: directories, maps apps, review sites, and local organizations. When those details match everywhere, search engines are more confident they all describe the same business. When they don't, for example an old phone number on one site and a new one on another, that confidence drops.",
      },
      {
        type: "p",
        text: "Start with the listings that matter most, and make sure the name, address, phone number, and website are identical on each:",
      },
      {
        type: "ul",
        items: [
          "Google Business Profile",
          "Bing Places, which also feeds Microsoft's search and assistant results",
          "Apple Business Connect, for Apple Maps and Siri",
          "Yelp and the Better Business Bureau",
          "Your local chamber of commerce, such as the Dearborn Area Chamber or the Detroit Regional Chamber",
          "Directories specific to your industry",
        ],
      },
      {
        type: "h2",
        text: "Pages That Rank for Detroit Searches",
      },
      {
        type: "p",
        text: "Your website gives Google the detail your Business Profile can't. Give each main service its own page, with a clear title, a plain explanation of what's included, photos of real work, and an easy way to contact you. A single services page that lists everything rarely ranks for anything.",
      },
      {
        type: "p",
        text: "Be careful with city pages. A page for each suburb that repeats the same text with a different city name swapped in is what Google calls a doorway page, and it can hurt the whole site. Create a page for an area only when you have something specific to say about working there: projects you've done, the kinds of customers you serve, or details that are different in that city.",
      },
      {
        type: "p",
        text: "Speed matters too. Most local searches happen on phones, often in a hurry. A site that loads slowly or makes the phone number hard to find loses the customer to the next result.",
      },
      {
        type: "h2",
        text: "Common Local SEO Mistakes",
      },
      {
        type: "p",
        text: "These are the problems we find most often when we audit Metro Detroit businesses.",
      },
      {
        type: "ul",
        items: [
          "A Google Business Profile that was set up once and never touched again.",
          "Different phone numbers or business names on different sites.",
          "Asking for reviews only occasionally, so months go by with nothing new.",
          "One generic services page instead of a page for each service.",
          "City pages that are copies of each other with the town name changed.",
          "A website that's slow on phones or hides the phone number.",
        ],
      },
      {
        type: "h2",
        text: "Local SEO Questions",
      },
      {
        type: "h3",
        text: "How long does local SEO take?",
      },
      {
        type: "p",
        text: "It depends on your competition and where you're starting. Fixing your Google Business Profile and getting a steady flow of reviews usually shows up first in the map results. Rankings in the regular results for competitive Detroit searches take longer and build over months.",
      },
      {
        type: "h3",
        text: "Do I need a website if I have a Google Business Profile?",
      },
      {
        type: "p",
        text: "Yes. Your profile gets you into the map results, but your website is where people check your work and decide whether to call. Google also uses your website to understand what you do and which areas you serve.",
      },
      {
        type: "h3",
        text: "Can I do local SEO myself?",
      },
      {
        type: "p",
        text: "You can do a lot of it: completing your Business Profile, asking for reviews, and keeping your details consistent are all things a business owner can handle. Where outside help usually pays off is the technical side of the website, service and area pages that are worth ranking, and keeping the work going month after month.",
      },
      {
        type: "callout",
        text: "See a Detroit local SEO project → Detroit Glass & Mirror: website redesign and local SEO",
        caseStudySlug: "detroit-glass-mirror",
      },
    ],
  },

  {
    slug: "photography-website-design-michigan",
    image: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=800&q=80",
    title: "How Michigan Photography Studios Can Get More Clients From Google",
    excerpt:
      "Most photographers compete hard on Instagram and ignore search entirely, which is exactly why local SEO is the highest-ROI marketing channel most Michigan studios aren't using.",
    category: "Local SEO",
    categoryColor: "text-[#9a5423]",
    readTime: "4 min read",
    publishedAt: "March 18, 2026",
    metaTitle: "Photography Website Design Michigan: More Google Bookings",
    metaDescription:
      "How Michigan photography studios rank in local search, optimize their Google Business Profile, and turn search traffic into steady booking inquiries.",
    metaKeywords: [
      "photography website design Michigan",
      "photographer SEO Michigan",
      "photography studio local SEO",
      "photographer Google Business Profile",
      "web design for photographers Michigan",
      "how to get more photography clients Michigan",
    ],
    content: [
      {
        type: "p",
        text: "Instagram is where photographers build an audience. Google is where they book clients. The gap between those two platforms is where most Michigan photography studios are leaving money on the table, and it's one of the most consistent patterns we see working with creative businesses across the state.",
      },
      {
        type: "h2",
        text: "What Is Local SEO for Photographers?",
      },
      {
        type: "p",
        text: "Local SEO for photographers is the work that helps your studio appear when someone nearby searches for the kind of session you offer, like a newborn photographer in Ann Arbor or a wedding photographer in metro Detroit. It covers your website, your Google Business Profile, your reviews, and how your business details appear across the web. Done well, it brings you people who are already looking to book.",
      },
      {
        type: "h2",
        text: "Why Search Traffic Books Differently Than Social",
      },
      {
        type: "p",
        text: "A potential client scrolling Instagram sees your work and might follow you. A client searching 'portrait photographer near me' or 'family photographer Michigan' is ready to book. They're deciding which studio to call first. That's the fundamental difference between discovery and intent. Search traffic converts at a significantly higher rate because the intent is already there before they land on your site.",
      },
      {
        type: "p",
        text: "For Michigan photography studios, this means a well-executed local SEO campaign consistently delivers the lowest cost-per-booking of any marketing channel, including referrals, paid ads, and social. The traffic compounds over time rather than stopping the moment you stop posting.",
      },
      {
        type: "h2",
        text: "The Four Pillars of Photography SEO in Michigan",
      },
      {
        type: "h3",
        text: "1. A Fast, Portfolio-First Website",
      },
      {
        type: "p",
        text: "Google cares deeply about page speed and mobile experience. Most photography portfolio sites, especially those built on older Squarespace or Wix templates, load slowly and are painful to browse on mobile. A modern site that loads in under 1.5 seconds and puts your photography front and center immediately gives you a significant ranking advantage over competitors on slower platforms.",
      },
      {
        type: "h3",
        text: "2. Location-Specific Keyword Strategy",
      },
      {
        type: "p",
        text: "The keywords that book sessions are hyper-specific. 'Photographer Michigan' is too broad. The conversion rate is low because the intent isn't clear. 'Portrait photographer Grand Rapids' or 'engagement photographer metro Detroit' is where the bookings happen. Your homepage and dedicated service pages need to target these longer, location-specific phrases naturally. Service pages (one for portraits, one for weddings, one for events), each targeting their own keyword set, dramatically outperform a single generic portfolio page.",
      },
      {
        type: "h3",
        text: "3. Google Business Profile Optimization",
      },
      {
        type: "p",
        text: "For local search, your Google Business Profile is often your first impression. A fully optimized GBP with your complete service list, regular photo updates, accurate service areas, and a strategy for accumulating Google reviews is essential. Most photographers set this up once and forget it, which means a competitor who actively manages theirs consistently outranks you in the map results where the majority of clicks happen.",
      },
      {
        type: "h3",
        text: "4. Schema Markup for Photographers",
      },
      {
        type: "p",
        text: "Structured data tells Google exactly what your business does, where you're located, what your services cover, and what past clients have said. Adding LocalBusiness, Photograph, and ImageGallery schema to your site increases your chances of showing up in rich results and improves the accuracy of how Google interprets your content, which directly affects how and where it ranks you.",
      },
      {
        type: "h2",
        text: "What This Looks Like in Practice",
      },
      {
        type: "p",
        text: "One pattern we see often: a Michigan photography studio with years of excellent work and a loyal Instagram following is still invisible in local search, because Google has nothing to rank. The fix is the combination covered above: a fast site on a modern stack, a complete Google Business Profile, a steady flow of reviews, and a landing page for each type of session.",
      },
      {
        type: "h2",
        text: "Common Mistakes Michigan Photographers Make Online",
      },
      {
        type: "p",
        text: "Most of these are easy to fix once you know to look for them.",
      },
      {
        type: "ul",
        items: [
          "Building the whole site as one gallery page, so Google has nothing to match a specific search like family photographer Royal Oak.",
          "Uploading full-resolution photos that make pages slow on phones, where most people browse portfolios.",
          "Not explaining what each type of session includes, so visitors leave to find someone who does.",
          "Letting the Google Business Profile go quiet, with old photos and no recent reviews.",
          "Sending every inquiry through Instagram DMs, where leads get buried.",
          "Copying the same paragraph onto pages for different cities, which Google treats as low-value duplicate content.",
        ],
      },
      {
        type: "h2",
        text: "Questions Photographers Ask Us",
      },
      {
        type: "h3",
        text: "Do I need a blog to rank?",
      },
      {
        type: "p",
        text: "Not to start. Pages for each type of session matter more. A blog helps later, when you have useful things to say about locations, planning a shoot, or what to wear, because those are questions clients actually search.",
      },
      {
        type: "h3",
        text: "Should I list every city I serve?",
      },
      {
        type: "p",
        text: "List the areas you really serve on your Google Business Profile and contact page. Create a separate page for a city only when you have something specific to say about shooting there, like the locations you use.",
      },
      {
        type: "h3",
        text: "How do I get more Google reviews?",
      },
      {
        type: "p",
        text: "Ask every client when they're happiest, usually when they receive their gallery, and send the direct review link from your Google Business Profile. Ask everyone, not only the clients you expect to be happy: screening who you ask breaks Google's review policy.",
      },
      {
        type: "h2",
        text: "Where to Start",
      },
      {
        type: "p",
        text: "The first step is understanding where you currently stand. A technical audit of your site's speed, keyword targeting, and GBP completeness will reveal exactly which gaps to close first. Ranking movement usually takes a few months of consistent work, and the results compound from there.",
      },
    ],
  },

  {
    slug: "contractor-website-design-michigan",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    title: "Local SEO for Michigan Contractors: How to Rank #1 for Your Trade",
    excerpt:
      "The best contractor in Michigan isn't always the one who wins the job. The one who shows up first on Google wins the job, and here's exactly how to be that contractor.",
    category: "Local SEO",
    categoryColor: "text-[#9a5423]",
    readTime: "5 min read",
    publishedAt: "March 4, 2026",
    metaTitle: "Contractor Website Design Michigan: Local SEO to Rank #1",
    metaDescription:
      "A local SEO guide for Michigan contractors, drywall companies, roofers, and home service businesses: how to rank #1 on Google and win more leads.",
    metaKeywords: [
      "contractor website design Michigan",
      "local SEO for contractors Michigan",
      "drywall company website design Michigan",
      "contractor Google Map Pack Michigan",
      "home services website SEO Michigan",
      "how to get more leads for contractors Michigan",
    ],
    caseStudySlug: "salazar-drywall-pros",
    caseStudyTitle: "Salazar Drywall Pros",
    content: [
      {
        type: "p",
        text: "The best contractor in Michigan isn't always the one who wins the job. The one who shows up first on Google wins the job. For decades, referrals were enough. Today, a homeowner needing drywall repair, a new roof, or a bathroom remodel types what they need into Google before they call anyone, and whoever ranks first gets the call. Whoever isn't on Google doesn't get considered.",
      },
      {
        type: "h2",
        text: "What Is Local SEO for Contractors?",
      },
      {
        type: "p",
        text: "Local SEO for contractors is everything that decides whether your company shows up when a homeowner nearby searches for your trade, both in Google's map results and in the regular results below them. It covers your Google Business Profile, your reviews, your service pages, and whether your business name, address, and phone number match everywhere they appear online.",
      },
      {
        type: "h2",
        text: "Why Local SEO Is the Highest-ROI Channel for Contractors",
      },
      {
        type: "p",
        text: "Unlike paid ads, which stop delivering leads the moment you stop paying, local SEO compounds over time. A contractor who ranks #1 for 'drywall contractor Michigan' or 'bathroom remodeler Detroit' owns that placement. Every day, qualified customers at the moment of decision see your name first. The investment is front-loaded; the returns are ongoing.",
      },
      {
        type: "h2",
        text: "The Anatomy of a Contractor Who Wins on Google",
      },
      {
        type: "h3",
        text: "Service Area Landing Pages",
      },
      {
        type: "p",
        text: "One homepage targeting your city is not enough. If you serve 8 cities or neighborhoods, you need 8 location-specific landing pages, each targeting the search terms that residents in that area actually type. 'Drywall repair Livonia' and 'drywall contractor Ann Arbor' are different searches that need different pages. Contractors with service area pages consistently rank for more searches and generate significantly more qualified leads than those without them.",
      },
      {
        type: "h3",
        text: "Google Map Pack Placement",
      },
      {
        type: "p",
        text: "The Map Pack (those three businesses that appear with the map at the top of local search results) captures the majority of clicks for contractor searches. Ranking in the Map Pack requires a fully optimized Google Business Profile, consistent NAP (name, address, phone) data across all directories, and a systematic strategy for accumulating 5-star reviews. This is not optional. If you're not in the Map Pack, you're invisible to most of the people searching for your services.",
      },
      {
        type: "h3",
        text: "Citation Building and NAP Consistency",
      },
      {
        type: "p",
        text: "Every local directory, Yelp, Angi, HomeAdvisor, BBB, and dozens of niche contractor directories, is a signal to Google about your business's legitimacy and location. Inconsistencies in your name, address, or phone number across these citations actively hurt your rankings. Auditing and correcting your citations is one of the highest-leverage local SEO tasks available to contractors.",
      },
      {
        type: "h3",
        text: "Trust Signals on Your Website",
      },
      {
        type: "p",
        text: "Contractors win online the same way they win in person: trust. Your website needs to display your license number, insurance information, years in business, and Google star rating prominently. Before-and-after photo galleries, video walkthroughs, and customer testimonials all increase conversion rates significantly, turning visitors into callers.",
      },
      {
        type: "h2",
        text: "A Real Example: A Detroit-Area Drywall Contractor",
      },
      {
        type: "p",
        text: "Salazar Drywall Pros, a drywall contractor serving Detroit and Southeast Michigan, built its business on referrals and repeat customers. We built their site around a project gallery, a page for each type of work, a testimonials page, and free-estimate requests on every page, and we maintain it: theme and plugin updates, backups, and a technical SEO cleanup that fixed missing search titles, a broken www redirect, and a duplicate page document hidden inside the services page. That foundation is what lets a contractor show up when homeowners search.",
      },
      {
        type: "callout",
        text: "Read the full build: zero to #1 → Salazar Drywall Pros Case Study",
        caseStudySlug: "salazar-drywall-pros",
      },
      {
        type: "h2",
        text: "Common Mistakes That Keep Contractors Off Page One",
      },
      {
        type: "p",
        text: "We see the same handful of problems on most contractor sites we audit.",
      },
      {
        type: "ul",
        items: [
          "Listing a cell number on one directory and an office line on another. Mismatched contact details weaken trust in your listing.",
          "One generic services page instead of a page for each type of job you want more of.",
          "No project photos, or only stock photos. Homeowners want to see real work.",
          "Asking for reviews once in a while instead of after every finished job.",
          "A website that's slow or hard to use on a phone, which is where most homeowners search.",
          "Service-area pages that repeat the same text with a different city name swapped in. Google treats those as doorway pages.",
        ],
      },
      {
        type: "h2",
        text: "Questions Contractors Ask Us",
      },
      {
        type: "h3",
        text: "Do I need a website if I have a Google Business Profile?",
      },
      {
        type: "p",
        text: "Yes. Your profile gets you into the map results, but your website is where homeowners check your work, your services, and whether you look established. Google also uses your website to understand what you do and where you work.",
      },
      {
        type: "h3",
        text: "Should I make a page for every city I work in?",
      },
      {
        type: "p",
        text: "Only where you can say something specific: projects you've done there, the kinds of homes you work on, or local details that matter to the job. A handful of genuinely useful area pages beats dozens of near-identical ones.",
      },
      {
        type: "h3",
        text: "How long before I see more calls?",
      },
      {
        type: "p",
        text: "It depends on your competition and where you're starting. Fixing your Google Business Profile and getting steady reviews usually shows up first in the map results. Organic rankings for competitive trades take longer.",
      },
      {
        type: "h2",
        text: "Where to Start",
      },
      {
        type: "p",
        text: "If you have no website, start there. If you have a site but no Map Pack presence, your Google Business Profile is the priority. If you're in the Map Pack but not ranking organically, a citation audit and content strategy is the next move. The right starting point depends on where you currently stand. A quick audit reveals exactly what to fix first.",
      },
    ],
  },

  {
    slug: "law-firm-website-design-michigan",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
    title: "Law Firm Website Design in Michigan: How Attorneys Get More Consultation Calls",
    excerpt:
      "Legal is one of the most competitive SEO verticals. The attorneys who consistently win online have websites built on trust and authority, not just aesthetics.",
    category: "Web Design & SEO",
    categoryColor: "text-[#41433a]",
    readTime: "4 min read",
    publishedAt: "February 19, 2026",
    metaTitle: "Law Firm Website Design Michigan: More Consultation Calls",
    metaDescription:
      "How Michigan attorneys and law firms build websites that rank on Google, establish authority, and turn visitors into consultation calls.",
    metaKeywords: [
      "law firm website design Michigan",
      "attorney website design Michigan",
      "legal SEO Michigan",
      "lawyer website Michigan",
      "attorney Google rankings Michigan",
      "how to get more legal clients Michigan",
    ],
    caseStudySlug: "mi-family-lawyer",
    caseStudyTitle: "MI Family Lawyer",
    content: [
      {
        type: "p",
        text: "Legal is one of the most competitive SEO verticals in existence. Michigan attorneys are competing against national directories like FindLaw, Avvo, and Justia (all with enormous domain authority) for the same local searches. The attorneys who win are those with websites built on trust, authority, and conversion, not just aesthetics. A template that 'looks professional' is not enough.",
      },
      {
        type: "h2",
        text: "What Makes a Law Firm Website Different?",
      },
      {
        type: "p",
        text: "A law firm website has a job most business sites don't: earning trust from someone who may be facing one of the hardest moments of their life. It has to explain each practice area clearly, show who the attorney is, and make a first conversation feel low-risk, while following the advertising rules that apply to lawyers.",
      },
      {
        type: "h2",
        text: "Why Most Law Firm Websites Don't Convert",
      },
      {
        type: "p",
        text: "The typical attorney website is a brochure: a digital business card with a stock courthouse photo, a list of practice areas, and a phone number. These sites don't earn trust. They don't communicate expertise. They don't give a potential client a reason to call over a competitor. In a high-stakes decision like choosing legal representation, trust and authority are the only things that matter, and most law firm sites communicate neither.",
      },
      {
        type: "h2",
        text: "The Trust Signals Every Michigan Attorney Website Needs",
      },
      {
        type: "h3",
        text: "Credentials Displayed Prominently",
      },
      {
        type: "p",
        text: "Your bar membership, years of practice, case outcomes, and any notable appointments or honors should be on the homepage, not buried in an About section. Potential clients scan for these signals in the first five seconds. If they don't see them, they move to the next result. Credentials aren't just reassuring. They're a ranking signal. Google's E-E-A-T guidelines specifically reward sites that demonstrate expertise and authoritativeness.",
      },
      {
        type: "h3",
        text: "Practice-Area Pages That Answer Real Questions",
      },
      {
        type: "p",
        text: "Each practice area you handle should have its own dedicated page. These pages should answer the specific questions clients are already typing into Google: 'What happens if I can't pay child support in Michigan?' or 'How does comparative fault work in a Michigan car accident?' This content doesn't just rank. It demonstrates expertise before the client ever calls, warming the lead and increasing the likelihood they reach out.",
      },
      {
        type: "h3",
        text: "A Clear, Low-Friction Consultation Path",
      },
      {
        type: "p",
        text: "Every page of your site should have one clear CTA: Schedule a Free Consultation. The form should be short, name, phone, and a brief description of the matter. The button should be visible without scrolling. Every additional click to reach a consultation request form costs you clients to competitors with simpler flows.",
      },
      {
        type: "h3",
        text: "Legal Schema Markup",
      },
      {
        type: "p",
        text: "LegalService, Attorney, and LawFirm schema tells Google exactly what type of practice you run, where you're located, and which areas of law you specialize in. This structured data improves SERP visibility and makes you eligible for rich result features, which increase click-through rates for attorney searches significantly.",
      },
      {
        type: "h2",
        text: "SEO Strategy for Michigan Attorneys",
      },
      {
        type: "p",
        text: "Ranking for legal keywords in Michigan requires both technical SEO and sustained content authority. Long-tail keywords, 'Michigan family law attorney free consultation,' 'criminal defense lawyer Detroit,' 'personal injury attorney Oakland County', are where high-intent searches happen. Building topical authority through practice-area content and a legal Q&A blog targeting Michigan-specific law questions consistently outperforms generic link-building strategies for attorneys.",
      },
      {
        type: "h2",
        text: "Case Study: NM Legal Firm",
      },
      {
        type: "p",
        text: "Michigan attorney Neda Mohiedeen came to us with a template website that was invisible in search and converting almost none of the traffic it received. We designed a custom site built on trust and authority, credentials front-and-center, practice-area pages targeting Michigan-specific legal searches, legal schema markup, and a consultation funnel optimized for conversion. Consultation request volume tripled within a few months of launch.",
      },
      {
        type: "callout",
        text: "Full strategy breakdown → MI Family Lawyer Case Study",
        caseStudySlug: "mi-family-lawyer",
      },
      {
        type: "h2",
        text: "Common Mistakes on Attorney Websites",
      },
      {
        type: "p",
        text: "These are the patterns that most often stop a visitor from reaching out.",
      },
      {
        type: "ul",
        items: [
          "Leading with the firm name instead of the problems clients need help with.",
          "One page covering every practice area, so it ranks for none of them.",
          "Stock photos of gavels and handshakes instead of the actual attorney.",
          "Long intake forms before a prospective client has spoken to anyone.",
          "Statements about past results that could create unjustified expectations, which lawyer advertising rules restrict.",
          "No way to reach the firm after hours, when many people start searching.",
        ],
      },
      {
        type: "h2",
        text: "Questions Attorneys Ask Us",
      },
      {
        type: "h3",
        text: "Should each practice area have its own page?",
      },
      {
        type: "p",
        text: "Yes. Someone searching for a custody lawyer wants a page about custody, not a list of everything the firm does. Separate pages also give Google a clear match for each type of case.",
      },
      {
        type: "h3",
        text: "Can we show client reviews on our site?",
      },
      {
        type: "p",
        text: "Many firms do, but check the advertising rules that apply to you first and avoid anything that promises an outcome. Linking to your Google reviews is a simple option.",
      },
      {
        type: "h3",
        text: "Do we need a blog?",
      },
      {
        type: "p",
        text: "A blog helps when it answers the questions people search before they call, like how custody is decided or what happens at a first consultation. Write for prospective clients, not for other lawyers.",
      },
      {
        type: "h2",
        text: "The Bottom Line",
      },
      {
        type: "p",
        text: "For Michigan attorneys, a well-built website is the highest-leverage marketing investment available. It works 24/7, compounds over time, and positions you as the authority before a potential client ever picks up the phone. The attorneys who invest in getting this right are consistently the ones gaining clients from competitors who haven't.",
      },
    ],
  },

  {
    slug: "makeup-artist-seo-michigan",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=800&q=80",
    title: "Makeup Artist SEO: How Michigan Beauty Studios Fill Their Booking Calendar",
    excerpt:
      "Most Michigan makeup artists live on Instagram and ignore Google, which is exactly why local SEO delivers such strong ROI for the beauty businesses that use it correctly.",
    category: "Local SEO",
    categoryColor: "text-[#9a5423]",
    readTime: "4 min read",
    publishedAt: "February 5, 2026",
    metaTitle: "Makeup Artist SEO Michigan: Fill Your Booking Calendar",
    metaDescription:
      "How Michigan makeup artists and beauty studios use local SEO and Google Business Profile to rank for 'makeup artist near me' and fill their calendars.",
    metaKeywords: [
      "makeup artist website design Michigan",
      "beauty studio SEO Michigan",
      "makeup artist Google Business Profile",
      "lash extensions SEO Michigan",
      "beauty studio website Michigan",
      "how to get more makeup clients Michigan",
    ],
    caseStudySlug: "glam-by-abeer",
    caseStudyTitle: "Glam by Abeer",
    content: [
      {
        type: "p",
        text: "Most Michigan makeup artists and beauty studios have the same digital footprint: a well-curated Instagram, maybe a Facebook page, and either no website or one that hasn't been updated in years. The problem isn't the quality of the work. It's that many new clients start their search on Google, not Instagram, and if you're not ranking there, those clients never see you.",
      },
      {
        type: "h2",
        text: "What Is Local SEO for Makeup Artists?",
      },
      {
        type: "p",
        text: "Local SEO for makeup artists is the work that puts your studio in front of people nearby who are searching for what you do, like bridal makeup or lash extensions. It covers your Google Business Profile, your reviews, your website's service pages, and how consistently your business details appear online.",
      },
      {
        type: "h2",
        text: "Why Google Converts Better Than Instagram for Bookings",
      },
      {
        type: "p",
        text: "Instagram is a discovery platform. Someone might save your post, tap through to your profile, and think about booking eventually. Google is an intent platform. When someone types 'makeup artist near me Michigan' or 'lash extensions Grand Rapids,' they're actively looking to book right now. The conversion rate from a Google search to a consultation request is significantly higher than from an Instagram story to a DM, yet most beauty professionals invest the majority of their marketing time on social and almost none on search.",
      },
      {
        type: "h2",
        text: "Keyword Strategy for Michigan Beauty Studios",
      },
      {
        type: "p",
        text: "The highest-value keywords for Michigan makeup artists combine service type with location. 'Bridal makeup artist Michigan,' 'lash extensions Detroit,' 'permanent makeup near me,' and 'airbrush makeup Grand Rapids' are all high-intent searches with direct booking potential. A comprehensive beauty website should have dedicated pages for each service (bridal, event, lashes, brows, permanent), each targeting the specific phrases your ideal clients are searching. This structure dramatically outperforms a single portfolio page trying to rank for everything.",
      },
      {
        type: "h2",
        text: "Google Business Profile for Beauty Studios",
      },
      {
        type: "p",
        text: "For local service businesses, the Google Business Profile is often more important than the website itself for generating direct calls and bookings. A fully optimized GBP includes your complete service list with pricing, regular photo updates showcasing your work, a review strategy that generates consistent 5-star ratings, and correct service area settings if you travel to clients. Most beauty professionals set up their GBP once and never touch it again, which is why simply maintaining it actively becomes a significant ranking advantage over competitors.",
      },
      {
        type: "ul",
        items: [
          "Complete your service list with every service type, duration, and starting price",
          "Add new photos regularly so your profile shows recent work",
          "Respond to every review, positive and negative",
          "Answer the most common client questions on your website and in your profile description",
          "Enable messaging and booking if you use an online booking system",
        ],
      },
      {
        type: "h2",
        text: "Case Study: Glam by Abeer",
      },
      {
        type: "p",
        text: "We built a portfolio-first website and local search setup for Glam by Abeer, a Dearborn makeup artist. The site groups her galleries by bridal, full glam, and photoshoots, sends every Book Now button to a single booking page, and includes a blog on skin prep and makeup tips. Search titles were written for Dearborn makeup searches and backed by a Google Business Profile.",
      },
      {
        type: "callout",
        text: "Full case study → Glam by Abeer: portfolio website and local SEO for a Dearborn makeup artist",
        caseStudySlug: "glam-by-abeer",
      },
      {
        type: "h2",
        text: "Common Mistakes Beauty Studios Make Online",
      },
      {
        type: "p",
        text: "Each of these quietly costs bookings.",
      },
      {
        type: "ul",
        items: [
          "Relying only on Instagram, where posts drop out of view within days.",
          "A single portfolio page instead of a page for each service you want to be booked for.",
          "Taking bookings through DMs, which slows clients down and loses inquiries.",
          "Business details that differ between Instagram, Google, and the website.",
          "Large photo files that make the site slow on phones.",
        ],
      },
      {
        type: "h2",
        text: "Questions Makeup Artists Ask Us",
      },
      {
        type: "h3",
        text: "Do I need a website if my Instagram is doing well?",
      },
      {
        type: "p",
        text: "Instagram is great for showing your work to people who already follow you. A website is what shows up when someone who has never heard of you searches on Google, and it's a place you control that doesn't depend on an algorithm.",
      },
      {
        type: "h3",
        text: "What should my booking page include?",
      },
      {
        type: "p",
        text: "The services you offer, how long each takes, what's included, your location or travel area, and one clear way to book. The fewer messages it takes to book, the more people finish.",
      },
      {
        type: "h3",
        text: "How do I get more Google reviews?",
      },
      {
        type: "p",
        text: "Ask every client right after their appointment, while the look is fresh, and send the direct review link from your Google Business Profile. Ask everyone: screening who you ask breaks Google's review policy.",
      },
      {
        type: "h2",
        text: "Getting Started",
      },
      {
        type: "p",
        text: "If you're a Michigan makeup artist with no website, that's the first priority. If you have a site but no GBP presence, that's next. If you have both but aren't ranking, it's time for a keyword audit and a service page content strategy. Ranking movement usually takes a few months, and unlike Instagram, the results compound rather than decay the moment you stop posting.",
      },
    ],
  },

  {
    slug: "ai-business-automation-michigan",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    title: "AI Business Automation in 2026: What Michigan Companies Are Actually Using It For",
    excerpt:
      "The conversation around AI has been dominated by hype. Here's what Michigan businesses are actually deploying, and what's genuinely delivering measurable ROI.",
    category: "AI & Automation",
    categoryColor: "text-[#9a5423]",
    readTime: "4 min read",
    publishedAt: "January 22, 2026",
    metaTitle: "AI Business Automation Michigan 2026: What Works",
    metaDescription:
      "What Michigan small and mid-size businesses use AI automation for in 2026, from lead qualification agents to workflow automation, and the ROI to expect.",
    metaKeywords: [
      "AI business automation Michigan",
      "AI automation for small business Michigan",
      "business process automation Michigan",
      "AI lead qualification Michigan",
      "AI chatbot for business Michigan",
      "n8n automation Michigan",
    ],
    caseStudySlug: "thematek",
    caseStudyTitle: "Thematek",
    content: [
      {
        type: "p",
        text: "The conversation around AI in business has been dominated by hype. Every week brings a new headline about some capability that sounds transformative in theory and impossible to implement in practice. Here's what we're actually seeing Michigan businesses deploy, and what's genuinely delivering return on investment.",
      },
      {
        type: "h2",
        text: "What Business Automation Actually Means",
      },
      {
        type: "p",
        text: "Automation, at its core, is replacing repetitive manual tasks with systems that handle them reliably, at scale, without additional headcount. AI automation specifically refers to systems that can make decisions, generate responses, or process unstructured information, emails, messages, documents, in ways traditional software can't. For most Michigan small and mid-size businesses, the practical entry points are in communication, lead management, and internal workflows.",
      },
      {
        type: "h2",
        text: "5 AI Use Cases Delivering Real ROI for Michigan Businesses",
      },
      {
        type: "h3",
        text: "1. AI Lead Qualification Agents",
      },
      {
        type: "p",
        text: "An AI intake agent, built on a language model trained on your specific services, pricing, and qualification criteria, handles the initial conversation with a prospect, determines whether they're a fit, captures project requirements, and routes them to the right person. For a business answering the same intake questions every day, that frees up real team time. This is what we built for Thematek, a Detroit IT company: an intake agent trained on their own service catalog that answers common questions at any hour and sends qualified leads to their CRM and Slack.",
      },
      {
        type: "h3",
        text: "2. Follow-Up and Nurture Sequences",
      },
      {
        type: "p",
        text: "Most businesses do a poor job of following up with leads who don't convert immediately. They're too busy serving existing clients. An automated follow-up system triggered by specific actions (requesting a quote, downloading a resource, going silent for 48 hours) keeps prospects engaged without requiring manual effort. Tools like n8n and Make can connect your CRM, email platform, and calendar to create these sequences without writing a line of code.",
      },
      {
        type: "h3",
        text: "3. Customer Support Automation",
      },
      {
        type: "p",
        text: "For businesses with repetitive customer questions, service hours, pricing, process questions, FAQs, an AI support agent running on your website can handle a large share of routine inquiries without human involvement. Unlike traditional chatbots with rigid decision trees, LLM-powered agents understand natural language and handle the variations in how people phrase the same question.",
      },
      {
        type: "h3",
        text: "4. Scheduling and Booking Automation",
      },
      {
        type: "p",
        text: "Connecting an AI intake agent to a scheduling system creates a loop where a prospect can go from initial inquiry to confirmed appointment without a single manual step on your end. For service businesses, this dramatically reduces the time-to-book for qualified leads and eliminates the back-and-forth scheduling conversation entirely.",
      },
      {
        type: "h3",
        text: "5. Automated Reporting and Analytics",
      },
      {
        type: "p",
        text: "Pulling data from multiple sources (Google Analytics, Search Console, your CRM, your ad platforms) into a unified weekly report used to require a dedicated analyst or significant manual work. Tools like n8n and Zapier now make this automatable for most Michigan small businesses, delivering a clean performance overview to your inbox every Monday with no manual compilation.",
      },
      {
        type: "h2",
        text: "What It Costs and What It Returns",
      },
      {
        type: "p",
        text: "The cost of a custom AI intake agent like the one we built for Thematek depends on how many services it needs to know, which systems it connects to, and how much ongoing tuning it needs. We scope and quote each one individually, and the return depends on how much repetitive work it takes off your team's plate.",
      },
      {
        type: "callout",
        text: "See how we built Thematek's AI intake agent →",
        caseStudySlug: "thematek",
      },
      {
        type: "h2",
        text: "Common Mistakes With AI Automation",
      },
      {
        type: "p",
        text: "Most automation projects that disappoint make one of these mistakes.",
      },
      {
        type: "ul",
        items: [
          "Automating a process that isn't written down yet. Fix the process first, then automate it.",
          "Letting an AI agent answer questions it wasn't trained on, instead of handing off to a person.",
          "Not telling customers when they're talking to an AI.",
          "Sending customer data to tools without checking how they store and use it.",
          "Skipping a human review step for anything that commits your business, like quotes or refunds.",
          "Building it once and never checking the answers it gives.",
        ],
      },
      {
        type: "h2",
        text: "Questions Business Owners Ask Us",
      },
      {
        type: "h3",
        text: "Will an AI agent replace my staff?",
      },
      {
        type: "p",
        text: "In the businesses we work with, it takes the repetitive first steps off the team's plate: answering common questions, collecting details, and routing requests. People still handle the conversations that need judgment.",
      },
      {
        type: "h3",
        text: "What do we need before we start?",
      },
      {
        type: "p",
        text: "A clear list of your services, the questions customers ask most, and the steps your team follows today. If those live in someone's head, writing them down is the first step.",
      },
      {
        type: "h3",
        text: "How do we know it's working?",
      },
      {
        type: "p",
        text: "Look at how many inquiries it handles without a person, how quickly customers get a response, and whether the leads it sends your team are a good fit. Review a sample of its conversations regularly.",
      },
      {
        type: "h2",
        text: "Where to Start",
      },
      {
        type: "p",
        text: "The best starting point is identifying your single highest-volume repetitive task that currently consumes team time. For most service businesses, that's initial client inquiry handling. For e-commerce, it's customer support. For agencies, it's lead qualification and project scoping. Build the automation for one problem, measure the result, and scale from there.",
      },
    ],
  },

  {
    slug: "ecommerce-website-design-michigan",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
    title: "E-commerce Website Design: How Michigan Shops Are Moving Beyond Instagram Sales",
    excerpt:
      "Instagram DMs are not a business model. They're a workaround. Here's how Michigan product businesses are building the infrastructure to turn their social following into a real, scalable operation.",
    category: "Web Design",
    categoryColor: "text-[#41433a]",
    readTime: "4 min read",
    publishedAt: "January 8, 2026",
    metaTitle: "E-commerce Website Design Michigan: Beyond Instagram Sales",
    metaDescription:
      "How Michigan retailers build e-commerce websites that capture search traffic, own their sales channel, and grow beyond Instagram DM orders.",
    metaKeywords: [
      "e-commerce website design Michigan",
      "online store design Michigan",
      "e-commerce web design Detroit",
      "move from Instagram to website Michigan",
      "Shopify website design Michigan",
      "product website design Michigan",
    ],
    caseStudySlug: "indoor-garden",
    caseStudyTitle: "Indoor Garden",
    content: [
      {
        type: "p",
        text: "Instagram DMs are not a business model. They're a workaround, a sign that a business is generating real demand but hasn't built the infrastructure to capture it properly. For Michigan product-based businesses, Instagram has been an incredible discovery tool, but the businesses actually scaling their operations are the ones who've built a proper e-commerce website alongside their social presence.",
      },
      {
        type: "h2",
        text: "What Is E-commerce SEO?",
      },
      {
        type: "p",
        text: "E-commerce SEO is the work that helps your products show up when people search for them on Google, in regular results and in Google's shopping results. It covers product and category pages, product structured data, site speed, and content that answers the questions shoppers ask before they buy.",
      },
      {
        type: "h2",
        text: "The Problem With Relying on Instagram for Sales",
      },
      {
        type: "p",
        text: "When every sale requires a DM conversation, your revenue is capped by your time. Inventory management is a nightmare. Payment collection is inconsistent. Shipping is manual. And most critically: you own none of it. Algorithm changes, account restrictions, or a platform-wide outage can eliminate your sales channel overnight. A properly built e-commerce site removes all of these constraints.",
      },
      {
        type: "h2",
        text: "What a Properly Built E-commerce Site Gives You",
      },
      {
        type: "h3",
        text: "An Owned Sales Channel",
      },
      {
        type: "p",
        text: "Unlike social platforms, your website is property you own and control. No algorithm determines who sees your products. No policy change can restrict your reach. Your email list, your product pages, your checkout flow, your customer data, all yours, permanently.",
      },
      {
        type: "h3",
        text: "Search Traffic That Compounds",
      },
      {
        type: "p",
        text: "When a Michigan plant enthusiast searches 'buy monstera online Michigan' or 'indoor plants delivered Detroit,' they're ready to purchase. An e-commerce site optimized for those searches captures demand that would never find you on Instagram, and it compounds over time as your site builds domain authority. The channel doesn't decay the moment you stop posting.",
      },
      {
        type: "h3",
        text: "Conversion-Optimized Checkout",
      },
      {
        type: "p",
        text: "An Instagram DM-to-purchase flow usually takes several back-and-forth messages before payment, with drop-off at each step. A well-designed checkout reduces this to three clicks: product, cart, payment.",
      },
      {
        type: "h3",
        text: "Email List and Repeat Purchase Flows",
      },
      {
        type: "p",
        text: "Every customer who buys through your website becomes an owned marketing asset. Email marketing for e-commerce converts at 3–5× the rate of social advertising. Post-purchase flows, back-in-stock notifications, and abandoned cart sequences generate revenue passively, none of which are possible when you're selling through DMs.",
      },
      {
        type: "h2",
        text: "How to Make Your Products Discoverable on Google",
      },
      {
        type: "p",
        text: "E-commerce SEO for Michigan businesses centers on product pages optimized for purchase-intent keywords, category pages targeting broader search terms, and a content strategy (care guides, how-to articles, comparison posts) that attracts top-of-funnel traffic and builds topical authority. Product schema markup (name, price, availability, reviews) unlocks rich results in both Google Shopping and organic search, significantly increasing click-through rates.",
      },
      {
        type: "h2",
        text: "A Typical Starting Point",
      },
      {
        type: "p",
        text: "A typical starting point: a plant shop selling only through Instagram DMs, with no website, no checkout, and no email list. The fix is a full e-commerce site with a product catalog, a short checkout, and content built around plant care and indoor gardening searches, so new customers can find the shop and buy without messaging back and forth.",
      },
      {
        type: "callout",
        text: "See the Indoor Garden case study →",
        caseStudySlug: "indoor-garden",
      },
      {
        type: "h2",
        text: "Common Mistakes When Moving Sales Off Instagram",
      },
      {
        type: "p",
        text: "These are the problems we fix most often in new online stores.",
      },
      {
        type: "ul",
        items: [
          "Copying manufacturer descriptions word for word, so your product pages look like everyone else's.",
          "Product photos with huge file sizes that slow the site down on phones.",
          "Asking customers to create an account before they can check out.",
          "No product structured data, so Google can't show availability and other details in results.",
          "Not collecting email addresses, so every repeat sale depends on social media reach.",
        ],
      },
      {
        type: "h2",
        text: "Questions Shop Owners Ask Us",
      },
      {
        type: "h3",
        text: "Should I keep selling on Instagram?",
      },
      {
        type: "p",
        text: "Yes. Instagram is still a good place to show new products. Link your posts to product pages so the sale happens on a site you own, with a proper checkout and an email signup.",
      },
      {
        type: "h3",
        text: "Which platform should my store use?",
      },
      {
        type: "p",
        text: "It depends on your catalog, how you ship, and who will run the store day to day. We recommend a platform after looking at those, not before.",
      },
      {
        type: "h3",
        text: "What do I need to get started?",
      },
      {
        type: "p",
        text: "Product photos, descriptions, your shipping and return policies, and a list of your best sellers. That's enough to plan the catalog and the first pages to build.",
      },
      {
        type: "h2",
        text: "Making the Transition",
      },
      {
        type: "p",
        text: "Moving from Instagram-only to a properly built e-commerce site typically takes 6–10 weeks for a product-based Michigan business, and the site keeps selling for you long after launch.",
      },
    ],
  },
];
