import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with the ${siteConfig.name} team.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="rounded-2xl bg-white p-8 leading-8 text-slate-800 shadow-sm md:p-12">
        <h1 className="text-3xl font-bold text-slate-950">Contact us</h1>
        <p className="mt-6">
          We love hearing from readers. For questions, corrections, partnership requests or
          copyright concerns, email us at{" "}
          <a className="font-semibold text-indigo-600 underline" href={`mailto:${siteConfig.contactEmail}`}>
            {siteConfig.contactEmail}
          </a>
          .
        </p>
        <p className="mt-4">
          We usually respond within 2–3 business days. Please include the article title or URL if
          your message is about a specific post.
        </p>
      </div>
    </main>
  );
}
