import type { Article } from "@/db/schema";
import { saveArticleAction } from "@/app/admin/actions";

const fieldClass =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none";
const labelClass = "block text-sm font-medium text-slate-700";

export function ArticleForm({ article, error }: { article?: Article; error?: string }) {
  return (
    <form action={saveArticleAction} className="space-y-6 rounded-2xl bg-white p-6 shadow-sm md:p-8">
      {article && <input type="hidden" name="id" value={article.id} />}

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error === "slug"
            ? "This URL slug is already used by another article. Change the slug."
            : "Title and content are required."}
        </p>
      )}

      <div>
        <label className={labelClass} htmlFor="title">Title *</label>
        <input id="title" name="title" required defaultValue={article?.title ?? ""} className={fieldClass} placeholder="How to start a vegetable garden at home" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="slug">URL slug (optional)</label>
          <input id="slug" name="slug" defaultValue={article?.slug ?? ""} className={fieldClass} placeholder="auto-generated from title" />
        </div>
        <div>
          <label className={labelClass} htmlFor="category">Category</label>
          <input id="category" name="category" defaultValue={article?.category ?? "General"} className={fieldClass} />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="excerpt">Short summary (shown on homepage)</label>
        <textarea id="excerpt" name="excerpt" rows={2} defaultValue={article?.excerpt ?? ""} className={fieldClass} />
      </div>

      <div>
        <label className={labelClass} htmlFor="metaDescription">
          Meta description for Google (120–160 characters)
        </label>
        <textarea id="metaDescription" name="metaDescription" rows={2} maxLength={320} defaultValue={article?.metaDescription ?? ""} className={fieldClass} />
      </div>

      <div>
        <label className={labelClass} htmlFor="coverImage">Cover image URL (optional, https://...)</label>
        <input id="coverImage" name="coverImage" type="url" defaultValue={article?.coverImage ?? ""} className={fieldClass} />
      </div>

      <div>
        <label className={labelClass} htmlFor="prompt">The AI prompt (users will copy this)</label>
        <p className="mt-1 text-xs text-slate-500">
          Write the exact prompt text here. It will appear in a copy-ready box on the post.
        </p>
        <textarea id="prompt" name="prompt" rows={6} defaultValue={article?.prompt ?? ""} className={`${fieldClass} font-mono text-sm leading-6`} placeholder="Act as a ... . Your task is to ..." />
      </div>

      <div>
        <label className={labelClass} htmlFor="content">Article content * (how to use it, tips, examples)</label>
        <p className="mt-1 text-xs text-slate-500">
          Separate paragraphs with a blank line. Use <code>## Heading</code> for section titles,{" "}
          <code>### Subheading</code> for smaller titles, and lines starting with <code>- </code> for bullet lists.
        </p>
        <textarea id="content" name="content" required rows={22} defaultValue={article?.content ?? ""} className={`${fieldClass} font-mono text-sm leading-6`} />
      </div>

      <label className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3">
        <input type="checkbox" name="published" defaultChecked={article?.published ?? true} className="h-5 w-5 accent-indigo-600" />
        <span className="text-sm font-medium text-slate-800">Publish now (visible on the website and Google)</span>
      </label>

      <div className="flex flex-wrap gap-3">
        <button type="submit" className="rounded-lg bg-indigo-600 px-6 py-2.5 font-semibold text-white hover:bg-indigo-500">
          {article ? "Save changes" : "Create article"}
        </button>
        <a href="/admin" className="rounded-lg border border-slate-300 px-6 py-2.5 font-semibold text-slate-700 hover:bg-slate-50">
          Cancel
        </a>
      </div>
    </form>
  );
}
