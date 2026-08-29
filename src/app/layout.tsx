import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ConditionalShell from "@/components/ConditionalShell";
import GA4PageViewTracker from "@/components/GA4PageViewTracker";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const GA_MEASUREMENT_ID = "G-VK8T7HE7NR";
const GOOGLE_ADS_CONVERSION_ID = "AW-18414328207";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const BASE_URL = "https://spectecle.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Spectecle | Web Design, SEO & AI Agency",
    template: "%s | Spectecle SEO & Web Design",
  },
  description:
    "Spectecle is a premium web design, SEO & AI automation agency serving businesses across the United States. We build high-converting websites, dominate search rankings, and automate business workflows for ambitious companies everywhere.",
  keywords: [
    "web design agency",
    "national web design agency",
    "SEO agency",
    "SEO marketing services",
    "AI automation agency",
    "web development company",
    "digital marketing agency",
    "Next.js web development",
    "professional web design",
    "web design agency near me",
    "affordable web design",
    "small business website design",
    "e-commerce web design",
    "local SEO services",
    "Spectecle agency",
  ],
  authors: [{ name: "Spectecle SEO & Web Design", url: BASE_URL }],
  creator: "Spectecle SEO & Web Design",
  publisher: "Spectecle SEO & Web Design",
  category: "Web Design & Digital Marketing Agency",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Spectecle SEO & Web Design",
    title: "Spectecle | Web Design, SEO & AI Agency",
    description:
      "Premium web design, SEO & AI automation agency serving businesses nationwide. We build websites that convert, rankings that dominate, and systems that scale.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spectecle | Web Design, SEO & AI Agency",
    description:
      "Premium web design, SEO & AI automation agency serving businesses nationwide. We build websites that convert and scale.",
  },
  alternates: {
    canonical: BASE_URL,
  },
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION && {
    verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION },
  }),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${BASE_URL}/#organization`,
      name: "Spectecle SEO & Web Design",
      alternateName: "Spectecle",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
        width: 400,
        height: 400,
      },
      image: `${BASE_URL}/logo.png`,
      description:
        "Spectecle is a premium web design, SEO & AI automation agency serving businesses across the United States.",
      telephone: "+13133534105",
      email: "hello@spectecle.com",
      foundingDate: "2014",
      priceRange: "$$",
      areaServed: [{ "@type": "Country", name: "United States" }],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Digital Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Web Design & Development",
              description:
                "Custom, conversion-focused websites built with Next.js and React for businesses of all sizes.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "SEO & Marketing",
              description:
                "Data-driven SEO strategies that improve search rankings, drive organic traffic, and grow revenue.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Ad Campaigns",
              description:
                "Paid search and social campaigns built to convert, tracked back to real leads and revenue, never vanity impressions.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI & Automation",
              description:
                "Custom AI agents, workflow automation, and intelligent integrations that save time and scale operations.",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Spectecle SEO & Web Design",
      description: "Premium web design, SEO & AI automation agency, serving businesses nationwide",
      publisher: { "@id": `${BASE_URL}/#organization` },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${hankenGrotesk.variable} ${fraunces.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased" suppressHydrationWarning>
        <div className="noise-overlay" aria-hidden="true" />
        <ConditionalShell>{children}</ConditionalShell>
        <GA4PageViewTracker />
        <Analytics />
        <SpeedInsights />
        {/* Google Consent Mode: default to denied until CookieConsent grants it,
            so analytics_storage/ad_storage stay off for first-time visitors. */}
        <Script id="google-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
            });
          `}
        </Script>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-tag" strategy="afterInteractive">
          {`
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
            gtag('config', '${GOOGLE_ADS_CONVERSION_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
