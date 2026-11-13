import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms and conditions for using ${siteConfig.name}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="space-y-5 rounded-2xl bg-white p-8 leading-8 text-slate-800 shadow-sm md:p-12">
        <h1 className="text-3xl font-bold text-slate-950">Terms of Service</h1>
        <p>
          By accessing {siteConfig.name} you agree to these terms. If you do not agree, please do
          not use this website.
        </p>
        <h2 className="pt-4 text-xl font-semibold text-slate-950">Use of content</h2>
        <p>
          All articles and images are protected by copyright. You may read and share links to our
          content, and quote short excerpts with attribution. Reproducing full articles without
          written permission is not allowed.
        </p>
        <h2 className="pt-4 text-xl font-semibold text-slate-950">Information accuracy</h2>
        <p>
          We make reasonable efforts to keep information accurate and up to date, but the content
          is provided for general information only and is not professional advice.
        </p>
        <h2 className="pt-4 text-xl font-semibold text-slate-950">Advertising and links</h2>
        <p>
          We display third-party advertisements and link to external websites. We do not endorse
          these third parties and are not responsible for their products, services or content.
        </p>
        <h2 className="pt-4 text-xl font-semibold text-slate-950">Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, {siteConfig.name} is not liable for any loss or
          damage arising from your use of this website.
        </p>
        <h2 className="pt-4 text-xl font-semibold text-slate-950">Contact</h2>
        <p>
          Questions about these terms? Email{" "}
          <a className="text-indigo-600 underline" href={`mailto:${siteConfig.contactEmail}`}>
            {siteConfig.contactEmail}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
