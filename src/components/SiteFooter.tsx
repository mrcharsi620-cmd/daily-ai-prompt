import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-white">{siteConfig.name}</p>
          <p className="mt-3 text-sm leading-6 text-slate-400">{siteConfig.description}</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-white">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white">Latest prompts</Link></li>
            <li><Link href="/about" className="hover:text-white">About us</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/feed.xml" className="hover:text-white">RSS feed</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-white">Legal</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/privacy-policy" className="hover:text-white">Privacy policy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms of service</Link></li>
            <li><Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
