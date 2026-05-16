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

  return <CaseStudyClient project={project} nextProject={nextProject} />;
}
