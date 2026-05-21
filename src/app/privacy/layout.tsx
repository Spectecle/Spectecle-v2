import type { Metadata } from "next";

const BASE_URL = "https://spectecle.com";

export const metadata: Metadata = {
  title: "Privacy Policy | Spectecle SEO & Web Design",
  description:
    "Spectecle SEO & Web Design's Privacy Policy — how we collect, use, and protect your personal information. We are committed to transparency and your right to privacy.",
  keywords: [
    "Spectecle privacy policy",
    "web agency privacy policy",
    "data protection Spectecle",
  ],
  openGraph: {
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
