import { MetadataRoute } from "next";
import { projects } from "./work/projects-data";
import { posts } from "./blog/posts-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://spectecle.com";
  const now = new Date();

  const caseStudyUrls: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/work/${p.slug}`,
    lastModified: new Date(`${p.year}-01-01`),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const blogPostUrls: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services/web-design-detroit`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/services/seo-agency-detroit`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/services/ai-automation`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...caseStudyUrls,
    ...blogPostUrls,
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/hello`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
