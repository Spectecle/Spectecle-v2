import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "../projects-data";
import CaseStudyClient from "./CaseStudyClient";

const BASE_URL = "https://spectecle.com";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Case Study | Spectecle" };

  return {
    title: project.metaTitle,
    description: project.metaDescription,
    keywords: project.metaKeywords,
    openGraph: {
      title: project.metaTitle,
      description: project.metaDescription,
      url: `${BASE_URL}/work/${slug}`,
    },
    alternates: { canonical: `${BASE_URL}/work/${slug}` },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  if (projectIndex === -1) notFound();

  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: project.metaDescription,
    url: `${BASE_URL}/work/${slug}`,
    image: `${BASE_URL}${project.screenshotUrl}`,
    about: project.industry,
    keywords: project.metaKeywords.join(", "),
    publisher: { "@id": `${BASE_URL}/#organization` },
    inLanguage: "en-US",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Work", item: `${BASE_URL}/work` },
        { "@type": "ListItem", position: 3, name: project.title, item: `${BASE_URL}/work/${slug}` },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudyClient project={project} nextProject={nextProject} />
    </>
  );
}
