import { MetadataRoute } from "next";
import { projects } from "./work/projects-data";
import { posts } from "./blog/posts-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://spectecle.com";

  const caseStudyUrls: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/work/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const blogPostUrls: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // No lastmod on static pages: a build timestamp changes on every deploy, which
  // teaches Google to ignore it. Blog posts keep their real publish dates.
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services/web-design-detroit`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/services/web-design-dearborn`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/services/web-design-birmingham-mi`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/services/seo-agency-detroit`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/services/ai-automation`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/services/law-firm-website-design`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/services/medical-website-design`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/services/the-loop`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/work`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.8 },
    ...caseStudyUrls,
    ...blogPostUrls,
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
