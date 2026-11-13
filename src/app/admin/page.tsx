import type { Metadata } from "next";
import Link from "next/link";
import { isAdmin } from "@/lib/auth";
import { formatDate, getAllArticles } from "@/lib/articles";
import { deleteArticleAction, loginAction, logoutAction, togglePublishAction } from "./actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

type SearchParams = Promise<{ error?: string; saved?: string; deleted?: string }>;

export default async function AdminPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;

  if (!(await isAdmin())) {
    return (
      <main className="grid min-h-[70vh] place-items-center px-6 py-12">
        <form action={loginAction} className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-950">Admin login</h1>
          {params.error && <p className="text-sm text-red-600">Wrong password. Try again.</p>}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>
          <button type="submit" className="w-full rounded-lg bg-slate-900 px-4 py-2.5 font-semibold text-white hover:bg-slate-700">
            Log in
          </button>
        </form>
      </main>
    );
  }

  const articles = await getAllArticles();

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Your articles</h1>
          <p className="text-sm text-slate-600">{articles.length} total</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/new" className="rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-500">
            + New article
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="rounded-lg border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50">
              Log out
            </button>
          </form>
        </div>
      </div>

      {params.saved && <p className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">Article saved.</p>}
      {params.deleted && <p className="mb-4 rounded-lg bg-slate-100 px-4 py-3 text-sm text-slate-700">Article deleted.</p>}

      {articles.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <p className="text-slate-600">No articles yet. Create your first one!</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr key={a.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-950">{a.title}</p>
                    <p className="text-xs text-slate-500">/article/{a.slug}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${a.published ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                      {a.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{formatDate(a.publishedAt ?? a.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link href={`/admin/edit/${a.id}`} className="rounded-md border border-slate-300 px-3 py-1 hover:bg-slate-50">Edit</Link>
                      {a.published && (
                        <Link href={`/article/${a.slug}`} className="rounded-md border border-slate-300 px-3 py-1 hover:bg-slate-50">View</Link>
                      )}
                      <form action={togglePublishAction}>
                        <input type="hidden" name="id" value={a.id} />
                        <button type="submit" className="rounded-md border border-slate-300 px-3 py-1 hover:bg-slate-50">
                          {a.published ? "Unpublish" : "Publish"}
                        </button>
                      </form>
                      <form action={deleteArticleAction}>
                        <input type="hidden" name="id" value={a.id} />
                        <button type="submit" className="rounded-md border border-red-200 px-3 py-1 text-red-600 hover:bg-red-50">Delete</button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
