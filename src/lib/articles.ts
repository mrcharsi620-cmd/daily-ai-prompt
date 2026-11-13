import { db } from "@/db";
import { articles, type Article } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";

export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120);
}

export function estimateReadingMinutes(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function getPublishedArticles(limit?: number) {
  const query = db
    .select()
    .from(articles)
    .where(eq(articles.published, true))
    .orderBy(desc(articles.publishedAt));
  return limit ? query.limit(limit) : query;
}

export async function getPublishedArticleBySlug(slug: string) {
  const rows = await db
    .select()
    .from(articles)
    .where(and(eq(articles.slug, slug), eq(articles.published, true)))
    .limit(1);
  return rows[0] ?? null;
}

export async function getArticleById(id: number): Promise<Article | null> {
  const rows = await db.select().from(articles).where(eq(articles.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function getAllArticles() {
  return db.select().from(articles).orderBy(desc(articles.createdAt));
}

export async function getRelatedArticles(current: Article, limit = 3) {
  const rows = await db
    .select()
    .from(articles)
    .where(and(eq(articles.published, true), eq(articles.category, current.category)))
    .orderBy(desc(articles.publishedAt))
    .limit(limit + 1);
  return rows.filter((a) => a.id !== current.id).slice(0, limit);
}

export function formatDate(date: Date | string | null | undefined) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
