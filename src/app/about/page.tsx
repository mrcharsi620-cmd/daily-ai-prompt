import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name}, our mission, and how we create our articles.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="rounded-2xl bg-white p-8 leading-8 text-slate-800 shadow-sm md:p-12">
        <h1 className="text-3xl font-bold text-slate-950">About {siteConfig.name}</h1>
        <p className="mt-6">
          {siteConfig.name} is an independent publication dedicated to clear, accurate and useful
          articles. Our goal is to help readers learn new skills, understand complex topics and
          make better decisions in their everyday lives.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-slate-950">What we publish</h2>
        <p className="mt-3">
          We write practical guides, step-by-step tutorials, explainers and tips. Every article is
          written to answer a real question, and we update older posts when new information is
          available.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-slate-950">Our editorial standards</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>Original writing, not copied from other websites.</li>
          <li>Facts are checked against reliable sources before publishing.</li>
          <li>Clear separation between content and advertising.</li>
          <li>Corrections are made promptly when we find an error.</li>
        </ul>
        <h2 className="mt-8 text-xl font-semibold text-slate-950">Contact</h2>
        <p className="mt-3">
          Questions or feedback? Visit our <a className="text-indigo-600 underline" href="/contact">contact page</a>.
        </p>
      </div>
    </main>
  );
}
