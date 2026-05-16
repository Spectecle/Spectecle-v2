import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const EFFECTIVE_DATE = "May 1, 2024";
const COMPANY = "Spectecle Agency";
const EMAIL = "hello@spectecle.com";
const WEBSITE = "spectecle.com";

const sections = [
  {
    id: "information-we-collect",
    title: "1. Information We Collect",
    content: [
      {
        subtitle: "Information You Provide",
        body: `When you fill out our contact form or request a strategy call, we collect the information you provide directly — including your name, email address, company name, project details, and budget range. We only collect what you choose to share.`,
      },
      {
        subtitle: "Information Collected Automatically",
        body: `When you visit spectecle.com, we automatically collect certain technical information, including: your IP address, browser type and version, operating system, referring URLs, pages visited, and time spent on pages. This information is collected through cookies and analytics tools (described below) and is used solely to improve site performance and understand user behavior.`,
      },
      {
        subtitle: "Communications",
        body: `If you contact us by email at hello@spectecle.com, we retain a record of that communication, including your email address and message content, in order to respond to your inquiry and maintain accurate records.`,
      },
    ],
  },
  {
    id: "how-we-use-information",
    title: "2. How We Use Your Information",
    content: [
      {
        subtitle: "Responding to Inquiries",
        body: `The primary use of information submitted through our contact form is to respond to your project inquiry, schedule a strategy call, or provide you with a proposal. We do not add you to any marketing list without your explicit consent.`,
      },
      {
        subtitle: "Improving Our Website",
        body: `Automatically collected data (analytics, page views, session data) is used to understand how visitors use spectecle.com so we can improve the experience, fix technical issues, and optimize page performance.`,
      },
      {
        subtitle: "Legal Obligations",
        body: `We may use or disclose your information where required to comply with applicable law, regulation, legal process, or enforceable governmental request.`,
      },
    ],
  },
  {
    id: "cookies",
    title: "3. Cookies & Analytics",
    content: [
      {
        subtitle: "What Are Cookies",
        body: `Cookies are small text files stored on your device by your web browser. They help websites remember preferences, understand traffic patterns, and improve user experience.`,
      },
      {
        subtitle: "Google Analytics 4",
        body: `We use Google Analytics 4 (GA4) to understand how visitors interact with our website. GA4 uses cookies to collect anonymized data about page views, session duration, device type, and referral sources. This data is processed by Google in accordance with their Privacy Policy. We do not use GA4 to collect personally identifiable information. You can opt out of Google Analytics tracking by installing the Google Analytics Opt-out Browser Add-on.`,
      },
      {
        subtitle: "Essential Cookies",
        body: `Some cookies are strictly necessary for the website to function properly (e.g., form session state). These cannot be disabled without breaking core site functionality.`,
      },
      {
        subtitle: "Managing Cookies",
        body: `Most web browsers allow you to control cookies through your browser settings. You can set your browser to refuse cookies or delete existing cookies. Note that disabling cookies may affect the functionality of certain parts of this website.`,
      },
    ],
  },
  {
    id: "data-sharing",
    title: "4. Data Sharing & Third Parties",
    content: [
      {
        subtitle: "We Do Not Sell Your Data",
        body: `Spectecle Agency does not sell, rent, or trade your personal information to third parties for any purpose.`,
      },
      {
        subtitle: "Service Providers",
        body: `We may share information with trusted third-party service providers who assist us in operating our website or providing services — such as hosting providers, analytics platforms (Google Analytics), and email tools. These providers are contractually obligated to handle your data securely and only for the purposes we specify.`,
      },
      {
        subtitle: "Legal Requirements",
        body: `We may disclose your information if required by law, court order, or governmental authority, or if we believe disclosure is necessary to protect our rights, your safety, or the safety of others.`,
      },
      {
        subtitle: "Business Transfers",
        body: `In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction. We will provide notice before your personal information is transferred and becomes subject to a different privacy policy.`,
      },
    ],
  },
  {
    id: "data-retention",
    title: "5. Data Retention",
    content: [
      {
        subtitle: "How Long We Keep Your Data",
        body: `We retain contact form submissions and email communications for up to 3 years from the date of last contact. Analytics data is retained in accordance with Google Analytics' default retention settings (2 years for event data, 14 months for user and session data).`,
      },
      {
        subtitle: "Deletion Requests",
        body: `You may request deletion of your personal data at any time by emailing hello@spectecle.com. We will process deletion requests within 30 days, subject to any legal obligations to retain certain records.`,
      },
    ],
  },
  {
    id: "your-rights",
    title: "6. Your Privacy Rights",
    content: [
      {
        subtitle: "Rights for All Users",
        body: `Regardless of your location, you have the right to: (1) know what personal information we hold about you; (2) request a copy of that information; (3) request correction of inaccurate information; (4) request deletion of your information; and (5) withdraw consent where processing is based on consent.`,
      },
      {
        subtitle: "California Residents (CCPA)",
        body: `If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including the right to know about personal information collected, disclosed, or sold; the right to delete personal information; the right to opt-out of the sale of personal information (we do not sell personal information); and the right to non-discrimination for exercising your CCPA rights.`,
      },
      {
        subtitle: "European / UK Residents (GDPR)",
        body: `If you are in the European Economic Area or United Kingdom, you have rights under the General Data Protection Regulation (GDPR), including the right of access, rectification, erasure, restriction of processing, data portability, and the right to object. You also have the right to lodge a complaint with your local data protection authority.`,
      },
      {
        subtitle: "Exercising Your Rights",
        body: `To exercise any of these rights, please contact us at hello@spectecle.com. We will respond to all verifiable requests within 30 days. We may need to verify your identity before processing certain requests.`,
      },
    ],
  },
  {
    id: "data-security",
    title: "7. Data Security",
    content: [
      {
        subtitle: "How We Protect Your Information",
        body: `We implement reasonable administrative, technical, and physical safeguards to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our website is served over HTTPS (TLS encryption), and we limit access to personal information to personnel who need it to perform their job functions.`,
      },
      {
        subtitle: "No Guarantee",
        body: `While we take security seriously, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security, and we encourage you to use strong, unique passwords and keep your contact details up to date.`,
      },
    ],
  },
  {
    id: "third-party-links",
    title: "8. Third-Party Links",
    content: [
      {
        subtitle: "External Sites",
        body: `Our website may contain links to third-party websites, including our social media profiles (X/Twitter, Instagram, GitHub). This Privacy Policy applies only to spectecle.com. We are not responsible for the privacy practices of external sites and encourage you to review their privacy policies before providing any personal information.`,
      },
    ],
  },
  {
    id: "children",
    title: "9. Children's Privacy",
    content: [
      {
        subtitle: "Not Directed at Children",
        body: `Spectecle Agency's website and services are intended for adults and business owners. We do not knowingly collect personal information from children under the age of 13. If you believe we have inadvertently collected information from a child, please contact us at hello@spectecle.com and we will delete it promptly.`,
      },
    ],
  },
  {
    id: "changes",
    title: "10. Changes to This Policy",
    content: [
      {
        subtitle: "Policy Updates",
        body: `We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or for other operational reasons. When we make material changes, we will update the "Effective Date" at the top of this page. We encourage you to review this policy periodically. Continued use of our website after changes are posted constitutes your acceptance of the updated policy.`,
      },
    ],
  },
  {
    id: "contact-us",
    title: "11. Contact Us",
    content: [
      {
        subtitle: "Privacy Questions",
        body: `If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal information, please contact us at:\n\nSpectecle Agency\nDetroit, Michigan, USA\nEmail: hello@spectecle.com\nPhone: +1 (313) 353-4105\n\nWe will respond to all privacy-related inquiries within 30 days.`,
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(210,81,36,0.08) 0%, transparent 70%)" }}
      />

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative pt-40 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#D25124]/20 text-sm text-[#F07A3A] font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-[#F07A3A]" />
            Legal
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Privacy Policy
          </h1>
          <p className="mt-4 text-slate-400 text-base">
            Effective Date: {EFFECTIVE_DATE} &nbsp;·&nbsp; {COMPANY} &nbsp;·&nbsp;{" "}
            <a href={`https://${WEBSITE}`} className="text-[#F07A3A] hover:underline">
              {WEBSITE}
            </a>
          </p>
          <p className="mt-6 text-slate-400 leading-relaxed max-w-2xl">
            At Spectecle Agency, your privacy matters. This Privacy Policy explains what
            information we collect when you visit spectecle.com or contact us, how we use it,
            and the choices you have. We are committed to handling your data responsibly and
            transparently.
          </p>
        </div>
      </section>

      {/* ── TABLE OF CONTENTS ─────────────────────────── */}
      <section className="px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl border border-white/6 p-7">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-5">
              Table of Contents
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-sm text-slate-400 hover:text-[#F07A3A] transition-colors py-1"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── POLICY CONTENT ───────────────────────────── */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto space-y-14">
          {sections.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-28">
              <h2
                className="text-xl md:text-2xl font-bold text-white mb-6 pb-4 border-b border-white/6"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {section.title}
              </h2>
              <div className="space-y-6">
                {section.content.map((item, i) => (
                  <div key={i}>
                    <h3 className="text-base font-semibold text-[#F07A3A] mb-2">
                      {item.subtitle}
                    </h3>
                    <p className="text-slate-400 leading-relaxed text-sm whitespace-pre-line">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-white/6 bg-[#09090f]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-slate-500 text-sm uppercase tracking-widest mb-4">
            Privacy Questions?
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-white"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Reach out — we&apos;re here to help.
          </h2>
          <p className="mt-4 text-slate-400 text-base max-w-lg mx-auto">
            Email us at{" "}
            <a
              href="mailto:hello@spectecle.com"
              className="text-[#F07A3A] hover:underline"
            >
              hello@spectecle.com
            </a>{" "}
            or call{" "}
            <a href="tel:+13133534105" className="text-[#F07A3A] hover:underline">
              +1 (313) 353-4105
            </a>{" "}
            with any privacy-related questions.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="btn-primary flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold cursor-pointer"
            >
              <span>Contact Us</span>
              <ArrowUpRight className="w-4 h-4 relative z-10" />
            </Link>
            <Link
              href="/"
              className="text-slate-400 hover:text-white text-sm transition-colors cursor-pointer"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
