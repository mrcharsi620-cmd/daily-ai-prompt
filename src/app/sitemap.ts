import type { MetadataRoute } from "next";
import { getPublishedArticles } from "@/lib/articles";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ["/", "/about", "/contact", "/privacy-policy", "/terms"].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.5,
  }));

  let articlePages: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPublishedArticles();
    articlePages = posts.map((post) => ({
      url: absoluteUrl(`/article/${post.slug}`),
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch {
    // Database unavailable: still serve the static pages.
  }

  return [...staticPages, ...articlePages];
}
