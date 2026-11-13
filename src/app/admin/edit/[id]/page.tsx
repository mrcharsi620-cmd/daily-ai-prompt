import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getArticleById } from "@/lib/articles";
import { ArticleForm } from "@/components/admin/ArticleForm";

export const metadata: Metadata = {
  title: "Edit article",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function EditArticlePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin");
  const { id } = await params;
  const { error } = await searchParams;
  const numericId = Number(id);
  if (!Number.isInteger(numericId)) notFound();

  const article = await getArticleById(numericId);
  if (!article) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-6 text-3xl font-bold text-slate-950">Edit article</h1>
      <ArticleForm article={article} error={error} />
    </main>
  );
}
