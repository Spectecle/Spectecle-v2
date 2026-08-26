import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { pickProjects } from "@/app/work/projects-data";
import { BrowserMockup } from "@/components/ui/BrowserMockup";

export function ProofGallery({
  slugs,
  heading,
  subheading,
  namesOnly = false,
}: {
  slugs: string[];
  heading: string;
  subheading?: string;
  namesOnly?: boolean;
}) {
  const featured = pickProjects(slugs);

  if (featured.length === 0) return null;

  return (
    <div>
      <div className="mb-14">
        <h2 className="text-4xl md:text-5xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
          {heading}
        </h2>
        {subheading && <p className="text-[var(--site-text-secondary)] max-w-xl mt-3 text-sm">{subheading}</p>}
      </div>
      <div className="grid sm:grid-cols-3 gap-x-10 gap-y-10">
        {featured.map((project) => (
          <Link key={project.slug} href={`/work/${project.slug}`} className="group block">
            <BrowserMockup
              url={project.domain}
              screenshotUrl={project.screenshotUrl}
              alt={`${project.title} website screenshot`}
              size="compact"
            />
            <h3 className="mt-4 text-lg font-light text-[var(--site-text-primary)] group-hover:text-[#9a5423] transition-colors" style={{ fontFamily: "var(--font-serif)" }}>
              {project.title}
            </h3>
            {!namesOnly && (
              <>
                <p className="mt-1 text-xs text-[var(--site-text-muted)]">{project.industry}</p>
                <p className="mt-1 text-sm font-semibold text-[#9a5423]">{project.cardResult}</p>
                <span className="inline-flex items-center gap-1 text-xs text-[var(--site-text-muted)] group-hover:text-[var(--site-text-primary)] mt-3 transition-colors">
                  View case study <ArrowUpRight className="w-3 h-3" />
                </span>
              </>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
