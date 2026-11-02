"use client";

import { usePathname } from "next/navigation";

/* JSON-LD that belongs to a section's index page only (/services, /work, /blog).
   Section layouts wrap every child route, so rendering the script straight from
   the layout would stamp the index page's CollectionPage/FAQ/breadcrumb markup
   onto every service page, case study, and blog post as well. */
export function SectionJsonLd({ path, json }: { path: string; json: string }) {
  const pathname = usePathname();
  if (pathname !== path) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
