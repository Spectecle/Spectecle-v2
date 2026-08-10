import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const EFFECTIVE_DATE = "July 31, 2026";
const COMPANY = "Spectecle, LLC";
const EMAIL = "hello@spectecle.com";
const WEBSITE = "spectecle.com";

const sections = [
  {
    id: "agreement",
    title: "1. Agreement to Terms",
    content: [
      {
        subtitle: "Who This Applies To",
        body: `These Terms and Conditions of Service ("Terms") are entered into between Spectecle, LLC, a Michigan limited liability company based in Dearborn, Michigan ("Spectecle," "we," "us"), and the individual or business engaging Spectecle for services ("Client," "you"), and govern any website design, SEO, paid advertising, AI automation, or related digital service Spectecle provides to Client (the "Services").`,
      },
      {
        subtitle: "How These Terms Apply",
        body: `Each project or engagement is described in a written proposal, quote, order form, or invoice ("Order/Estimate"). These Terms, together with the applicable Order/Estimate and our Privacy Policy, form the entire agreement between Spectecle and Client for that engagement (the "Agreement"). By signing an Order/Estimate, making a payment, or otherwise engaging Spectecle for Services, Client agrees to these Terms.`,
      },
      {
        subtitle: "Updates to These Terms",
        body: `Spectecle may update these Terms from time to time. Changes apply to new engagements entered into after the updated Terms are posted; they do not retroactively change the terms of a project already underway unless both parties agree in writing.`,
      },
    ],
  },
  {
    id: "definitions",
    title: "2. Definitions",
    content: [
      {
        subtitle: "Deliverables",
        body: `The completed website, designs, code, creative assets, and other work product Spectecle creates specifically for Client under an Order/Estimate.`,
      },
      {
        subtitle: "Project Services",
        body: `One-time, fixed-scope engagements — such as a new website build, redesign, or a defined set of edits — delivered once and invoiced per the applicable Order/Estimate.`,
      },
      {
        subtitle: "Retainer Services",
        body: `Ongoing services billed on a recurring monthly basis — such as continuing SEO work or paid-advertising management — as described in Section 6.`,
      },
      {
        subtitle: "Portal",
        body: `Spectecle's client communication tool at spectecle.com/portal, provided to Client as a courtesy for submitting service requests, tracking their status, and messaging Spectecle directly.`,
      },
    ],
  },
  {
    id: "scope-of-services",
    title: "3. Scope of Services",
    content: [
      {
        subtitle: "What's Included",
        body: `Services are limited to what is described in the applicable Order/Estimate. Work outside that description — additional pages, features, revisions beyond what was scoped, or new requests — is treated as new work and quoted separately, or billed at Spectecle's hourly rate of $100.00/hour as described in Section 5.`,
      },
      {
        subtitle: "No Ongoing Maintenance Included",
        body: `Unless a Retainer Service specifically covering it is in place, Project Services do not include ongoing website maintenance, content management, hosting management, or other add-on services after delivery. Any future edits, updates, or troubleshooting requested after a project is delivered are billed at Spectecle's hourly rate.`,
      },
      {
        subtitle: "Client Responsibilities",
        body: `Client agrees to provide timely feedback, content, access credentials, and approvals reasonably needed for Spectecle to complete the Services. Delays caused by Client (late feedback, missing content, unresponsive stakeholders) may extend project timelines and will not be treated as a delay or failure by Spectecle.`,
      },
      {
        subtitle: "Third-Party Services",
        body: `Client is responsible for the cost of any third-party services used in connection with the project — including domain registration, hosting, premium plugins/themes, stock media licenses, and advertising platform spend. Spectecle will identify these where relevant in the Order/Estimate.`,
      },
    ],
  },
  {
    id: "fees-and-payment",
    title: "4. Fees & Payment",
    content: [
      {
        subtitle: "Project Fees",
        body: `Fees for Project Services are as set out in the applicable Order/Estimate. Projects may require a deposit before work begins; deposits are non-refundable once work has commenced. Remaining balances are invoiced per the schedule in the Order/Estimate (typically at project milestones or completion).`,
      },
      {
        subtitle: "Late Payment",
        body: `Invoices not paid within fifteen (15) days of the invoice date may incur a late charge of one and one-half percent (1.5%) per month, or the maximum rate permitted under Michigan law, whichever is less.`,
      },
      {
        subtitle: "Paid Advertising Campaigns",
        body: `For Paid Advertising services, Spectecle's management fee is separate from the advertising budget itself. Once a campaign budget is allocated, it is non-refundable and cannot be transferred to a different campaign or service. Spectecle may reallocate ad spend across platforms (e.g., Google, Meta, Bing) based on performance, in consultation with Client.`,
      },
      {
        subtitle: "Additional Work",
        body: `Any work requested outside the scope of a delivered project — including revisions, edits, or troubleshooting — is billed at Spectecle's hourly rate of $100.00/hour unless otherwise agreed in writing.`,
      },
      {
        subtitle: "Taxes",
        body: `Fees do not include applicable sales, use, or similar taxes. Client is responsible for any such taxes, other than taxes on Spectecle's income.`,
      },
    ],
  },
  {
    id: "ownership",
    title: "5. Ownership of Deliverables",
    content: [
      {
        subtitle: "Client Ownership Upon Full Payment",
        body: `Once Spectecle has received payment in full for a project, Spectecle assigns to Client all right, title, and interest in the final Deliverables created specifically for Client under that Order/Estimate.`,
      },
      {
        subtitle: "What's Excluded",
        body: `Ownership transfer does not include: (i) Spectecle's own pre-existing tools, frameworks, templates, or proprietary code libraries used to build the Deliverables, which Spectecle retains and licenses to Client for continued use as part of the delivered website; or (ii) third-party licensed assets (stock photography, fonts, plugins, themes) incorporated into the project, which remain subject to their own license terms and may require Client to obtain or renew a license for continued use.`,
      },
      {
        subtitle: "Client-Provided Content",
        body: `Client retains ownership of all content, images, trademarks, and other materials it provides to Spectecle for use in a project, and grants Spectecle a license to use them solely to perform the Services.`,
      },
      {
        subtitle: "Portfolio Use",
        body: `Spectecle may reference and display completed work — including Client's name, logo, and screenshots of the Deliverables — in its own portfolio and marketing materials, unless Client requests otherwise in writing.`,
      },
    ],
  },
  {
    id: "client-portal",
    title: "6. Client Portal & Retainer Services",
    content: [
      {
        subtitle: "The Portal",
        body: `The Portal is provided as a convenience for submitting requests, tracking their status, and messaging Spectecle directly. It is provided "as is," without any uptime or availability guarantee, and is not itself a paid product.`,
      },
      {
        subtitle: "Retainer Term",
        body: `Where Client engages Spectecle for Retainer Services, the engagement begins on the date set in the applicable Order/Estimate for an initial term of three (3) months (the "Initial Term"), after which it automatically renews on a month-to-month basis (each, a "Renewal Term") unless either party gives thirty (30) days' written notice of non-renewal.`,
      },
      {
        subtitle: "Cancellation",
        body: `After the Initial Term, either party may cancel a Retainer Service at any time with thirty (30) days' written notice. Fees already invoiced for the current billing period are non-refundable.`,
      },
    ],
  },
  {
    id: "confidentiality",
    title: "7. Confidentiality",
    content: [
      {
        subtitle: "Mutual Confidentiality",
        body: `Each party agrees to keep confidential any non-public business, financial, or technical information it learns from the other in connection with an engagement, and to use it only to perform or receive the Services. This obligation does not apply to information that is already public, already known to the receiving party, or independently developed.`,
      },
    ],
  },
  {
    id: "warranties",
    title: "8. Warranties & Disclaimers",
    content: [
      {
        subtitle: "Our Commitment",
        body: `Spectecle will perform the Services in a professional manner consistent with generally accepted industry standards.`,
      },
      {
        subtitle: "Disclaimer",
        body: `Except as expressly stated in these Terms, the Services and Deliverables are provided "as is," without warranties of any kind, whether express or implied, including any implied warranty of merchantability or fitness for a particular purpose. Spectecle does not guarantee specific business outcomes (such as search rankings, traffic, or ad performance), which depend on factors outside Spectecle's control.`,
      },
    ],
  },
  {
    id: "indemnification",
    title: "9. Indemnification",
    content: [
      {
        subtitle: "By Spectecle",
        body: `Spectecle will defend Client against any third-party claim that a Deliverable, as created by Spectecle, infringes a U.S. copyright or trademark, and will pay any resulting settlement or final judgment, provided Client promptly notifies Spectecle of the claim and allows Spectecle to control its defense.`,
      },
      {
        subtitle: "By Client",
        body: `Client will indemnify and hold Spectecle harmless from claims arising out of: content or materials Client supplies for use in a project, Client's breach of these Terms, or Client's misuse of the Deliverables or the Portal.`,
      },
    ],
  },
  {
    id: "liability",
    title: "10. Limitation of Liability",
    content: [
      {
        subtitle: "Liability Cap",
        body: `To the maximum extent permitted by law, Spectecle will not be liable for any indirect, incidental, special, or consequential damages, including lost profits or lost business, arising out of the Services. Spectecle's total liability under an Agreement will not exceed the total fees Client paid to Spectecle for the applicable project, or, for Retainer Services, the fees paid in the preceding three (3) months.`,
      },
    ],
  },
  {
    id: "governing-law",
    title: "11. Governing Law & Disputes",
    content: [
      {
        subtitle: "Governing Law",
        body: `These Terms are governed by the laws of the State of Michigan, without regard to its conflict-of-laws principles.`,
      },
      {
        subtitle: "Dispute Resolution",
        body: `Any dispute arising out of or relating to these Terms that cannot be resolved informally will be resolved by binding arbitration administered by JAMS in accordance with its rules then in effect, with proceedings to take place in Wayne County, Michigan. Each party bears its own attorneys' fees, and the arbitrator may award fees to the prevailing party. Nothing in this section prevents either party from seeking injunctive relief in court to protect its intellectual property.`,
      },
    ],
  },
  {
    id: "general",
    title: "12. General Provisions",
    content: [
      {
        subtitle: "Independent Contractor",
        body: `Spectecle and Client are independent contractors. Nothing in these Terms creates an employment, partnership, or joint-venture relationship between them.`,
      },
      {
        subtitle: "Assignment",
        body: `Client may not assign an Agreement without Spectecle's prior written consent.`,
      },
      {
        subtitle: "Force Majeure",
        body: `Neither party is liable for delays caused by circumstances reasonably beyond its control.`,
      },
      {
        subtitle: "Severability",
        body: `If any part of these Terms is found unenforceable, the rest remains in full effect.`,
      },
      {
        subtitle: "Entire Agreement",
        body: `These Terms, together with the applicable Order/Estimate and our Privacy Policy, are the entire agreement between the parties for a given engagement and supersede any prior discussions on the same subject.`,
      },
    ],
  },
  {
    id: "contact-us",
    title: "13. Contact Us",
    content: [
      {
        subtitle: "Questions About These Terms",
        body: `If you have any questions about these Terms, please contact us at:\n\nSpectecle, LLC\nDearborn, Michigan, USA\nEmail: hello@spectecle.com\n\nA mailing address for formal written notices is available on request.`,
      },
    ],
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
      <section className="relative pt-40 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#f87444]/20 text-sm text-[#f87444] font-medium mb-8">
            <span className="w-2 h-2 bg-[#f87444]" />
            Legal
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold text-[var(--site-text-primary)] leading-tight"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Terms & Conditions
          </h1>
          <p className="mt-4 text-[var(--site-text-secondary)] text-base">
            Effective Date: {EFFECTIVE_DATE} &nbsp;·&nbsp; {COMPANY} &nbsp;·&nbsp; Dearborn, Michigan
            &nbsp;·&nbsp;{" "}
            <a href={`https://${WEBSITE}`} className="text-[#f87444] hover:underline">
              {WEBSITE}
            </a>
          </p>
          <p className="mt-6 text-[var(--site-text-secondary)] leading-relaxed max-w-2xl">
            These Terms and Conditions govern any website design, SEO, paid advertising, or AI
            automation services Spectecle provides. Please read them together with our{" "}
            <Link href="/privacy" className="text-[#f87444] hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── TABLE OF CONTENTS ─────────────────────────── */}
      <section className="px-6 pb-12">
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
                  className="text-sm text-[var(--site-text-secondary)] hover:text-[#f87444] transition-colors py-1"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TERMS CONTENT ─────────────────────────────── */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto space-y-14">
          {sections.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-28">
              <h2
                className="text-xl md:text-2xl font-bold text-[var(--site-text-primary)] mb-6 pb-4 border-b border-[var(--site-border)]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {section.title}
              </h2>
              <div className="space-y-6">
                {section.content.map((item, i) => (
                  <div key={i}>
                    <h3 className="text-base font-semibold text-[#f87444] mb-2">
                      {item.subtitle}
                    </h3>
                    <p className="text-[var(--site-text-secondary)] leading-relaxed text-sm whitespace-pre-line">
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
      <section className="py-20 px-6 border-t border-[var(--site-border)] bg-[var(--site-surface)]">
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
            <a href={`mailto:${EMAIL}`} className="text-[#f87444] hover:underline">
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
