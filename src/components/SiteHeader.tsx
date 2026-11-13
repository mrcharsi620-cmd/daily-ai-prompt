import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-lg font-black shadow-lg shadow-indigo-500/30">
            AI
          </span>
          <span className="leading-tight">
            <span className="block text-base font-bold tracking-tight">{siteConfig.name}</span>
            <span className="block text-xs text-slate-400">{siteConfig.description.split(".")[0]}</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex">
          <Link href="/" className="transition hover:text-white">Prompts</Link>
          <Link href="/about" className="transition hover:text-white">About</Link>
          <Link href="/contact" className="transition hover:text-white">Contact</Link>
          <Link href="/feed.xml" className="transition hover:text-white">RSS</Link>
        </nav>
        <Link
          href="/"
          className="rounded-lg bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:opacity-90"
        >
          Today&apos;s prompt
        </Link>
      </div>
    </header>
  );
}
