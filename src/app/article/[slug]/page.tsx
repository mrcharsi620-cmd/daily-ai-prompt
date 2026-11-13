import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { absoluteUrl, siteConfig } from "@/lib/site";
import {
  formatDate,
  getPublishedArticleBySlug,
  getPublishedArticles,
  getRelatedArticles,
} from "@/lib/articles";
import { ArticleBody } from "@/components/ArticleBody";
import { AdSlot } from "@/components/AdSlot";
import { CopyPromptButton } from "@/components/CopyPromptButton";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const posts = await getPublishedArticles();
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);
  if (!article) return { title: "Prompt not found" };

  const description = article.metaDescription || article.excerpt;
  const path = `/article/${article.slug}`;
  return {
    title: article.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: article.title,
      description,
      url: path,
      siteName: siteConfig.name,
      publishedTime: article.publishedAt?.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      section: article.category,
      images: article.coverImage ? [{ url: article.coverImage }] : undefined,
    },
    twitter: {
      card: article.coverImage ? "summary_large_image" : "summary",
      title: article.title,
      description,
      images: article.coverImage ? [article.coverImage] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);
  if (!article) notFound();

  const related = await getRelatedArticles(article);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.metaDescription || article.excerpt,
    image: article.coverImage ? [article.coverImage] : undefined,
    datePublished: article.publishedAt?.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    mainEntityOfPage: absoluteUrl(`/article/${article.slug}`),
    articleSection: article.category,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-slate-900">Home</Link> / {article.category}
      </nav>

      <article className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-900/5 ring-1 ring-slate-200">
        <div className="p-8 md:p-12">
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            {article.category}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-sm text-slate-500">
            Published {formatDate(article.publishedAt)} · Updated {formatDate(article.updatedAt)} · {article.readingMinutes} min read
          </p>

          {article.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={article.coverImage} alt={article.title} className="mt-8 w-full rounded-2xl object-cover" />
          )}

          {article.excerpt && (
            <p className="mt-8 border-l-4 border-indigo-500 pl-4 text-lg leading-8 text-slate-700">
              {article.excerpt}
            </p>
          )}

          {article.prompt && (
            <div className="mt-10 overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 text-white shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-3 px-6 pt-5">
                <p className="text-sm font-semibold uppercase tracking-wider text-indigo-100">The AI prompt</p>
                <CopyPromptButton text={article.prompt} />
              </div>
              <pre className="whitespace-pre-wrap break-words px-6 pb-6 pt-4 font-mono text-[0.95rem] leading-7 text-white">
                {article.prompt}
              </pre>
            </div>
          )}

          <div className="mt-10">
            <ArticleBody content={article.content} />
          </div>

          <AdSlot />
        </div>
      </article>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-5 text-2xl font-bold text-slate-950">More prompts like this</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((r) => (
              <Link key={r.id} href={`/article/${r.slug}`} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md">
                <h3 className="font-semibold text-slate-950">{r.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-slate-600">{r.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </main>
  );
}
