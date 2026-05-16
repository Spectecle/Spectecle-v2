import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { posts } from "../posts-data";
import BlogPostClient from "./BlogPostClient";

const BASE_URL = "https://spectecle.com";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Article | Spectecle Blog" };

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.metaKeywords,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `${BASE_URL}/blog/${slug}`,
      type: "article",
    },
    alternates: { canonical: `${BASE_URL}/blog/${slug}` },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postIndex = posts.findIndex((p) => p.slug === slug);
  if (postIndex === -1) notFound();

  const post = posts[postIndex];
  const nextPost = posts[(postIndex + 1) % posts.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    url: `${BASE_URL}/blog/${slug}`,
    publisher: { "@id": `${BASE_URL}/#organization` },
    inLanguage: "en-US",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: `${BASE_URL}/blog/${slug}` },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient post={post} nextPost={nextPost} />
    </>
  );
}
