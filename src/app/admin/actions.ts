"use server";

import { db } from "@/db";
import { articles } from "@/db/schema";
import { clearAdminSession, checkPassword, requireAdmin, setAdminSession } from "@/lib/auth";
import { estimateReadingMinutes, slugify } from "@/lib/articles";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    redirect("/admin?error=1");
  }
  await setAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin");
}

function revalidateAll() {
  revalidatePath("/", "layout");
  revalidatePath("/sitemap.xml");
  revalidatePath("/feed.xml");
}

export async function saveArticleAction(formData: FormData) {
  await requireAdmin();

  const idRaw = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  if (!title || !content) {
    redirect(idRaw ? `/admin/edit/${idRaw}?error=missing` : "/admin/new?error=missing");
  }

  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug = slugify(slugInput || title) || `prompt-${Date.now()}`;
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const prompt = String(formData.get("prompt") ?? "").trim();
  const metaDescription = String(formData.get("metaDescription") ?? "").trim() || excerpt;
  const category = String(formData.get("category") ?? "").trim() || "General";
  const coverImage = String(formData.get("coverImage") ?? "").trim();
  const published = formData.get("published") === "on";
  const readingMinutes = estimateReadingMinutes(content);

  // Ensure the slug is unique across other articles.
  const clash = await db.select({ id: articles.id }).from(articles).where(eq(articles.slug, slug)).limit(1);
  const id = idRaw ? Number(idRaw) : null;
  if (clash[0] && clash[0].id !== id) {
    redirect(`${id ? `/admin/edit/${id}` : "/admin/new"}?error=slug`);
  }

  const now = new Date();

  if (id) {
    const existing = await db.select().from(articles).where(eq(articles.id, id)).limit(1);
    await db
      .update(articles)
      .set({
        title,
        slug,
        excerpt,
        content,
        prompt,
        category,
        metaDescription,
        coverImage,
        readingMinutes,
        published,
        publishedAt: published ? (existing[0]?.publishedAt ?? now) : null,
        updatedAt: now,
      })
      .where(eq(articles.id, id));
  } else {
    await db.insert(articles).values({
      title,
      slug,
      excerpt,
      content,
      prompt,
      category,
      metaDescription,
      coverImage,
      readingMinutes,
      published,
      publishedAt: published ? now : null,
      createdAt: now,
      updatedAt: now,
    });
  }

  revalidateAll();
  redirect("/admin?saved=1");
}

export async function togglePublishAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const rows = await db.select().from(articles).where(eq(articles.id, id)).limit(1);
  const article = rows[0];
  if (!article) redirect("/admin");
  const nowPublished = !article.published;
  await db
    .update(articles)
    .set({
      published: nowPublished,
      publishedAt: nowPublished ? (article.publishedAt ?? new Date()) : article.publishedAt,
      updatedAt: new Date(),
    })
    .where(eq(articles.id, id));
  revalidateAll();
  redirect("/admin");
}

export async function deleteArticleAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  await db.delete(articles).where(eq(articles.id, id));
  revalidateAll();
  redirect("/admin?deleted=1");
}
