import Link from "next/link";
import { getPublishedArticles, formatDate } from "@/lib/articles";
import { siteConfig } from "@/lib/site";
import { AdSlot } from "@/components/AdSlot";

export const revalidate = 300;

export default async function HomePage() {
  const posts = await getPublishedArticles();
  const [today, ...rest] = posts;

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.35),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(217,70,239,0.25),transparent_40%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-indigo-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> New prompt every day
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Get better answers from AI with{" "}
            <span className="bg-gradient-to-r from-indigo-300 to-fuchsia-300 bg-clip-text text-transparent">
              one great prompt a day
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Copy-ready prompts for ChatGPT, Gemini, Claude and more. Use them for writing,
            marketing, study, coding and productivity, and learn why each one works.
          </p>
          {today && (
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href={`/article/${today.slug}`} className="rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 shadow-lg transition hover:bg-indigo-50">
                Read today&apos;s prompt
              </Link>
              <Link href="#all-prompts" className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                Browse all prompts
              </Link>
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-14">
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="text-lg font-semibold text-slate-900">First prompt coming soon</p>
            <p className="mt-2 text-slate-600">Check back tomorrow for today&apos;s AI prompt.</p>
          </div>
        ) : (
          <>
            {/* Prompt of the day */}
            {today && (
              <section className="mb-14">
                <div className="mb-5 flex items-end justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">Prompt of the day</p>
                    <h2 className="mt-1 text-2xl font-bold text-slate-950 md:text-3xl">Latest from {siteConfig.name}</h2>
                  </div>
                </div>
                <Link href={`/article/${today.slug}`} className="group grid overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-900/5 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-2xl md:grid-cols-5">
                  <div className="flex flex-col justify-center p-8 md:col-span-3 md:p-10">
                    <span className="w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">{today.category}</span>
                    <h3 className="mt-4 text-2xl font-bold leading-snug text-slate-950 group-hover:text-indigo-700 md:text-3xl">{today.title}</h3>
                    <p className="mt-3 leading-7 text-slate-600">{today.excerpt}</p>
                    <p className="mt-6 text-sm text-slate-500">{formatDate(today.publishedAt)} · {today.readingMinutes} min read</p>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-8 text-white md:col-span-2 md:p-10">
                    <p className="text-xs font-semibold uppercase tracking-wider text-indigo-100">Sample prompt</p>
                    <p className="mt-4 line-clamp-6 font-mono text-sm leading-6 text-indigo-50">
                      {today.prompt || today.excerpt}
                    </p>
                    <p className="mt-6 text-sm font-semibold">Open & copy →</p>
                  </div>
                </Link>
              </section>
            )}

            <AdSlot />

            {/* All prompts */}
            <section id="all-prompts" className="scroll-mt-24">
              <h2 className="mb-6 text-2xl font-bold text-slate-950 md:text-3xl">More AI prompts</h2>
              {rest.length === 0 ? (
                <p className="text-slate-600">More prompts will appear here as they are published.</p>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <Link key={post.id} href={`/article/${post.slug}`} className="group flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg">
                      <span className="w-fit rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">{post.category}</span>
                      <h3 className="mt-3 text-lg font-semibold leading-snug text-slate-950 group-hover:text-indigo-700">{post.title}</h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{post.excerpt}</p>
                      <p className="mt-auto pt-5 text-xs text-slate-500">{formatDate(post.publishedAt)} · {post.readingMinutes} min read</p>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
