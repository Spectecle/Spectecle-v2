import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type RelatedItem = { href: string; title: string; kind: "Case study" | "Guide" | "Service" };

/* Contextual links from a service page to the case studies and guides that back
   it up. Titles are passed in (not looked up from projects-data/posts-data) so
   these client pages don't pull the full content data into their JS bundle. */
export function RelatedReading({ items }: { items: RelatedItem[] }) {
  return (
    <section className="py-14 px-6 border-t border-[var(--site-border)]">
      <div className="max-w-5xl mx-auto">
        <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">
          Related work and reading
        </span>
        <ul className="mt-6 grid sm:grid-cols-2 gap-x-10">
          {items.map((it) => (
            <li key={it.href} className="border-t border-[var(--site-border)]">
              <Link
                href={it.href}
                data-cursor
                className="group flex items-start justify-between gap-4 py-4"
              >
                <span>
                  <span className="block text-xs text-[var(--site-text-muted)]">{it.kind}</span>
                  <span className="block mt-1 text-[var(--site-text-primary)] group-hover:text-[#9a5423] transition-colors">
                    {it.title}
                  </span>
                </span>
                <ArrowUpRight className="w-4 h-4 mt-1 shrink-0 text-[var(--site-text-muted)] group-hover:text-[#9a5423] transition-colors" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
