import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { ArticleForm } from "@/components/admin/ArticleForm";

export const metadata: Metadata = {
  title: "New article",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function NewArticlePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin");
  const { error } = await searchParams;

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-6 text-3xl font-bold text-slate-950">New article</h1>
      <ArticleForm error={error} />
    </main>
  );
}
