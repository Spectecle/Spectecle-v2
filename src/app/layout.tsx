import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const BASE_URL = "https://spectecle.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Spectecle | Web Design, SEO & AI Agency — Detroit, MI",
    template: "%s | Spectecle Agency",
  },
  description:
    "Spectecle is a premium web design, SEO & AI automation agency based in Detroit, MI. We build high-converting websites, dominate search rankings, and automate business workflows for ambitious companies worldwide.",
  keywords: [
    "web design agency Detroit",
    "web design Michigan",
    "SEO agency Detroit",
    "SEO marketing Michigan",
    "AI automation agency",
    "web development Detroit",
    "digital marketing agency Michigan",
    "Next.js web development",
    "professional web design",
    "web design agency near me",
    "affordable web design Detroit",
    "small business website design",
    "e-commerce web design",
    "local SEO Michigan",
    "Spectecle agency",
  ],
  authors: [{ name: "Spectecle Agency", url: BASE_URL }],
  creator: "Spectecle Agency",
  publisher: "Spectecle Agency",
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
    siteName: "Spectecle Agency",
    title: "Spectecle | Web Design, SEO & AI Agency — Detroit, MI",
    description:
      "Premium web design, SEO & AI automation agency in Detroit, MI. We build websites that convert, rankings that dominate, and systems that scale.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spectecle | Web Design, SEO & AI Agency",
    description:
      "Premium web design, SEO & AI automation agency in Detroit, MI. We build websites that convert and scale.",
    site: "@spectecle",
    creator: "@spectecle",
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": `${BASE_URL}/#organization`,
      name: "Spectecle Agency",
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
        "Spectecle is a premium web design, SEO & AI automation agency based in Detroit, MI, serving clients worldwide.",
      telephone: "+13133534105",
      email: "hello@spectecle.com",
      foundingDate: "2012",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Detroit",
        addressRegion: "MI",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 42.3314,
        longitude: -83.0458,
      },
      areaServed: [
        { "@type": "City", name: "Detroit" },
        { "@type": "State", name: "Michigan" },
        { "@type": "Country", name: "United States" },
        "Worldwide",
      ],
      sameAs: [
        "https://x.com/spectecle",
        "https://www.instagram.com/spectecle/",
        "https://github.com/Spectecle",
      ],
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
      name: "Spectecle Agency",
      description: "Premium web design, SEO & AI automation agency — Detroit, MI",
      publisher: { "@id": `${BASE_URL}/#organization` },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <div className="noise-overlay" aria-hidden="true" />
        <SmoothScroll>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
