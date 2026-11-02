import { ArrowUpRight, Star } from "lucide-react";
import { testimonials } from "@/lib/testimonials-data";

const GOOGLE_REVIEWS = "https://maps.google.com/?cid=16659534901346479284";

/* The four approved Google reviews (src/lib/testimonials-data.ts), with a link to
   the full profile. Used on the homepage and About page. */
export function ReviewsStrip({ heading = "What clients say.", limit }: { heading?: string; limit?: number }) {
  const items = limit ? testimonials.slice(0, limit) : testimonials;
  return (
    <section className="py-16 px-6 border-t border-[var(--site-border)]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
            {heading}
          </h2>
          <a
            href={GOOGLE_REVIEWS}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--site-text-secondary)] underline underline-offset-4 hover:text-[var(--site-text-primary)]"
          >
            <Star className="w-4 h-4 fill-current text-[#9a5423]" />
            Rated 5.0 on Google
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
          {items.map((r) => (
            <figure key={r.name} className="border-t border-[var(--site-border)] pt-5">
              <blockquote className="text-[var(--site-text-primary)] leading-relaxed" style={{ fontFamily: "var(--font-serif)" }}>
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-sm text-[var(--site-text-muted)]">
                {r.name} · {r.role}
                {r.role === "Google review" ? "" : " · Google review"}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
