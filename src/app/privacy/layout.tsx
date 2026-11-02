import type { Metadata } from "next";

const BASE_URL = "https://spectecle.com";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Spectecle LLC collects, uses, and shares information through spectecle.com, The Loop client portal, and Spectecle apps, including Explore Dearborn.",
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "Privacy Policy | Spectecle SEO & Web Design",
    description:
      "How Spectecle SEO & Web Design collects, uses, and protects your personal information.",
    url: `${BASE_URL}/privacy`,
  },
  alternates: { canonical: `${BASE_URL}/privacy` },
  robots: { index: true, follow: false },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
