import type { Metadata } from "next";

const BASE_URL = "https://spectecle.com";

export const metadata: Metadata = {
  title: "Privacy Policy | Spectecle Agency",
  description:
    "Spectecle Agency's Privacy Policy — how we collect, use, and protect your personal information. We are committed to transparency and your right to privacy.",
  keywords: [
    "Spectecle privacy policy",
    "web agency privacy policy",
    "data protection Spectecle",
  ],
  openGraph: {
    title: "Privacy Policy | Spectecle Agency",
    description:
      "How Spectecle Agency collects, uses, and protects your personal information.",
    url: `${BASE_URL}/privacy`,
  },
  alternates: { canonical: `${BASE_URL}/privacy` },
  robots: { index: true, follow: false },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
