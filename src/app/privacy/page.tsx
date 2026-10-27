import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const EFFECTIVE_DATE = "October 27, 2026";
const COMPANY = "Spectecle LLC";
const EMAIL = "admin@spectecle.com";
const WEBSITE = "spectecle.com";

const collectedInfo = [
  {
    category: "Contact information",
    examples: "Name, business name, email, phone",
    source: "You, through forms, email or sign-up",
  },
  {
    category: "Account information",
    examples: "Login email, password (stored encrypted), preferences, saved items",
    source: "You",
  },
  {
    category: "Client and billing records",
    examples: "Contracts, invoices, project files, support requests",
    source: "You; payments are processed by third-party processors, and we do not store full card numbers",
  },
  {
    category: "Usage and device data",
    examples: "Pages viewed, features used, app version, device type, operating system, IP address, crash logs",
    source: "Automatically, through cookies, SDKs and server logs",
  },
  {
    category: "Approximate location",
    examples: "City-level location derived from IP address; precise location only if you allow it in your device settings",
    source: "Automatically or with your permission",
  },
  {
    category: "Business listing data",
    examples: "Business name, address, hours, images and descriptions submitted for featured listings",
    source: "Businesses that submit them",
  },
  {
    category: "Public event information",
    examples: "Event names, dates, locations and descriptions",
    source: "Public calendars and websites",
  },
];

const sections: { id: string; title: string; body: React.ReactNode }[] = [
  {
    id: "information-we-collect",
    title: "1. Information we collect",
    body: null, // rendered as the collectedInfo table below
  },
  {
    id: "how-we-use-information",
    title: "2. How we use information",
    body: "We use information to provide, operate and improve the Services; create and manage accounts; respond to requests; send service messages; send marketing emails you can opt out of at any time; measure performance; prevent fraud and abuse; enforce our terms; and comply with law.",
  },
  {
    id: "how-we-share-information",
    title: "3. How we share information",
    body: (
      <>
        We share information only with: service providers that host, analyze, process payments,
        send messages or provide AI processing for us, under obligations to protect it; app stores
        and platforms as needed to deliver the app; authorities or other parties when required by
        law or to protect rights, safety and property; and a successor in a merger, acquisition or
        sale of assets.{" "}
        <strong className="font-semibold text-[var(--site-text-primary)]">
          We do not sell your personal information
        </strong>
        , and we do not share it for cross-context behavioral advertising.
      </>
    ),
  },
  {
    id: "cookies-and-analytics",
    title: "4. Cookies and analytics",
    body: "We use cookies and similar tools to keep the Services working and to understand usage, including analytics services such as Google Analytics. You can control cookies in your browser settings and limit ad tracking in your device settings.",
  },
  {
    id: "ai-features",
    title: "5. AI features",
    body: "Some Services use third-party AI providers to generate responses or automate tasks. Information you enter into an AI feature is sent to those providers to produce a response. Do not enter sensitive personal information into AI features. AI output may be inaccurate.",
  },
  {
    id: "retention",
    title: "6. Retention",
    body: "We keep information only as long as needed for the purposes above, to meet legal, tax and accounting obligations, and to resolve disputes. Client records are generally kept for seven (7) years after the relationship ends.",
  },
  {
    id: "security",
    title: "7. Security",
    body: "We use reasonable administrative, technical and physical safeguards. No system is completely secure, and we cannot guarantee the security of information.",
  },
  {
    id: "children",
    title: "8. Children",
    body: "The Services are not directed to children under 13, and we do not knowingly collect their personal information. If you believe a child has provided us information, contact us and we will delete it.",
  },
  {
    id: "your-choices-and-rights",
    title: "9. Your choices and rights",
    body: `You may request access to, correction of or deletion of your personal information, and you may close your account at any time, by contacting us at ${EMAIL}. If the law of your state gives you additional privacy rights, we will honor requests as that law requires. We will verify your identity before acting on a request.`,
  },
  {
    id: "changes",
    title: "10. Changes",
    body: "We may update this Privacy Policy by posting a new version with a new effective date. Material changes will be highlighted on the Services or sent by email.",
  },
  {
    id: "contact",
    title: "11. Contact",
    body: `Spectecle LLC, ${EMAIL}.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(198,153,71,0.08) 0%, transparent 70%)" }}
      />

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative pt-[176px] pb-10 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#9a5423]/20 text-sm text-[#9a5423] font-medium mb-8">
            <span className="w-2 h-2 bg-[#9a5423]" />
            Legal
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold text-[var(--site-text-primary)] leading-tight"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Privacy Policy
          </h1>
          <p className="mt-4 text-[var(--site-text-secondary)] text-base">
            Effective date: {EFFECTIVE_DATE} &nbsp;·&nbsp; {COMPANY} &nbsp;·&nbsp;{" "}
            <a href={`https://${WEBSITE}`} className="text-[#9a5423] hover:underline">
              {WEBSITE}
            </a>
          </p>
          <p className="mt-6 text-[var(--site-text-secondary)] leading-relaxed max-w-2xl">
            This Privacy Policy explains how Spectecle LLC (&quot;Spectecle,&quot; &quot;we,&quot;
            &quot;us,&quot; each meaning Spectecle LLC only and never any individual) collects, uses
            and shares information through spectecle.com, The Loop client portal, and Spectecle
            apps, software and online services, including Explore Dearborn (together, the
            &quot;Services&quot;). It does not cover websites we build or host for clients. Each
            client is responsible for its own website&apos;s privacy practices.
          </p>
        </div>
      </section>

      {/* ── TABLE OF CONTENTS ─────────────────────────── */}
      <section className="px-6 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="border border-[var(--site-border)] p-7">
            <p className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest mb-5">
              Table of Contents
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-sm text-[var(--site-text-secondary)] hover:text-[#9a5423] transition-colors py-1"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── POLICY CONTENT ───────────────────────────── */}
      <section className="px-6 pb-14">
        <div className="max-w-4xl mx-auto space-y-10">
          {sections.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-28">
              <h2
                className="text-xl md:text-2xl font-bold text-[var(--site-text-primary)] mb-6 pb-4 border-b border-[var(--site-border)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {section.title}
              </h2>
              {section.id === "information-we-collect" ? (
                <div className="overflow-x-auto border border-[var(--site-border)]">
                  <table className="w-full min-w-[560px] text-sm text-left">
                    <thead className="bg-[var(--site-surface)] text-[var(--site-text-muted)]">
                      <tr>
                        <th scope="col" className="px-4 py-3 font-medium">Category</th>
                        <th scope="col" className="px-4 py-3 font-medium">Examples</th>
                        <th scope="col" className="px-4 py-3 font-medium">Source</th>
                      </tr>
                    </thead>
                    <tbody className="text-[var(--site-text-secondary)] leading-relaxed">
                      {collectedInfo.map((row) => (
                        <tr key={row.category} className="border-t border-[var(--site-border)] align-top">
                          <th scope="row" className="px-4 py-3 font-normal text-[var(--site-text-primary)]">
                            {row.category}
                          </th>
                          <td className="px-4 py-3">{row.examples}</td>
                          <td className="px-4 py-3">{row.source}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-[var(--site-text-secondary)] leading-relaxed text-sm">
                  {section.body}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="py-12 px-6 border-t border-[var(--site-border)] bg-[var(--site-surface)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[var(--site-text-muted)] text-sm uppercase tracking-widest mb-4">
            Privacy Questions?
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-[var(--site-text-primary)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Reach out — we&apos;re here to help.
          </h2>
          <p className="mt-4 text-[var(--site-text-secondary)] text-base max-w-lg mx-auto">
            Email us at{" "}
            <a
              href={`mailto:${EMAIL}`}
              className="text-[#9a5423] hover:underline"
            >
              {EMAIL}
            </a>{" "}
            with any privacy-related questions.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-0.5 cursor-pointer"
            >
              <span>Contact Us</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] text-sm transition-colors cursor-pointer"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
