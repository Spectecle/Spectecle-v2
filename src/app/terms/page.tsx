import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const EFFECTIVE_DATE = "October 27, 2026";
const COMPANY = "Spectecle LLC";
const EMAIL = "admin@spectecle.com";
const WEBSITE = "spectecle.com";

const sections = [
  {
    id: "information-only",
    title: "1. Information only",
    body: `Content on the Site, including articles, pricing, case studies, examples, calculators and AI chat responses, is general information. It is not a quote, an offer, a guarantee of results or professional advice. Results described for any client are specific to that client and are not a prediction of yours. Services are provided only under a signed Master Services Agreement.`,
  },
  {
    id: "pricing",
    title: "2. Pricing",
    body: `Prices shown on the Site may change without notice and are not binding until stated in a signed Service Level Agreement or Project Agreement.`,
  },
  {
    id: "acceptable-use",
    title: "3. Acceptable use",
    body: `You will not: use the Site unlawfully; attempt to gain unauthorized access to it or our systems; introduce malware; scrape or copy the Site in bulk; submit false information or someone else's information; or use the Site to harass anyone.`,
  },
  {
    id: "intellectual-property",
    title: "4. Intellectual property",
    body: `The Site and its content, design, code, logos and the Spectecle name are owned by Spectecle or its licensors and protected by law. You may view and print pages for personal, non-commercial use. No other use is permitted without our written permission.`,
  },
  {
    id: "submissions",
    title: "5. Submissions",
    body: `If you send us ideas, feedback or materials through the Site, you grant us a non-exclusive, royalty-free right to use them, and we have no obligation to keep them confidential except as stated in our Privacy Policy.`,
  },
  {
    id: "third-party-links",
    title: "6. Third-party links",
    body: `The Site may link to other websites. We do not control and are not responsible for them.`,
  },
  {
    id: "disclaimer",
    title: "7. Disclaimer",
    body: `THE SITE IS PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, TO THE MAXIMUM EXTENT PERMITTED BY LAW.`,
  },
  {
    id: "limitation-of-liability",
    title: "8. Limitation of liability",
    body: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, SPECTECLE AND ITS MEMBERS, MANAGERS, EMPLOYEES AND CONTRACTORS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SITE, AND OUR TOTAL LIABILITY FOR ANY CLAIM RELATING TO THE SITE WILL NOT EXCEED ONE HUNDRED DOLLARS ($100). Any claim must be brought only against Spectecle LLC, not any individual.`,
  },
  {
    id: "indemnity",
    title: "9. Indemnity",
    body: `You will indemnify Spectecle against claims arising from your misuse of the Site or violation of these Terms.`,
  },
  {
    id: "disputes",
    title: "10. Disputes",
    body: `These Terms are governed by Michigan law. Any dispute will be resolved in the state or federal courts in Wayne County, Michigan, or in small claims court, and you waive any right to bring or join a class action. Any claim must be filed within one (1) year after it arises.`,
  },
  {
    id: "clients",
    title: "11. Clients",
    body: `If you are a Spectecle client, your Master Services Agreement controls over these Terms.`,
  },
  {
    id: "changes",
    title: "12. Changes",
    body: `We may update these Terms by posting a new version with a new effective date. Continued use after that date is acceptance.`,
  },
  {
    id: "contact",
    title: "13. Contact",
    body: `Spectecle LLC, admin@spectecle.com.`,
  },
];

export default function TermsPage() {
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
            Website Terms of Use
          </h1>
          <p className="mt-4 text-[var(--site-text-secondary)] text-base">
            Effective date: {EFFECTIVE_DATE} &nbsp;·&nbsp; {COMPANY} &nbsp;·&nbsp;{" "}
            <a href={`https://${WEBSITE}`} className="text-[#9a5423] hover:underline">
              {WEBSITE}
            </a>
          </p>
          <p className="mt-6 text-[var(--site-text-secondary)] leading-relaxed max-w-2xl">
            These Terms of Use govern your use of spectecle.com and any page, form, chat tool or
            download on it (the &quot;Site&quot;), operated by Spectecle LLC, a Michigan limited
            liability company (&quot;Spectecle,&quot; &quot;we,&quot; &quot;us,&quot; each meaning
            Spectecle LLC only and never any individual). By using the Site, you agree to these
            Terms. If you do not agree, do not use the Site.
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

      {/* ── TERMS CONTENT ─────────────────────────────── */}
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
              <p className="text-[var(--site-text-secondary)] leading-relaxed text-sm">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="py-12 px-6 border-t border-[var(--site-border)] bg-[var(--site-surface)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[var(--site-text-muted)] text-sm uppercase tracking-widest mb-4">
            Questions About These Terms?
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-[var(--site-text-primary)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Reach out — we&apos;re here to help.
          </h2>
          <p className="mt-4 text-[var(--site-text-secondary)] text-base max-w-lg mx-auto">
            Email us at{" "}
            <a href={`mailto:${EMAIL}`} className="text-[#9a5423] hover:underline">
              {EMAIL}
            </a>{" "}
            with any questions about these Terms.
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
