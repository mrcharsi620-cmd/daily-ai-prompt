import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses and protects your information.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="space-y-5 rounded-2xl bg-white p-8 leading-8 text-slate-800 shadow-sm md:p-12">
        <h1 className="text-3xl font-bold text-slate-950">Privacy Policy</h1>
        <p>
          This Privacy Policy explains how {siteConfig.name} (&quot;we&quot;, &quot;our&quot;) collects,
          uses and protects information when you visit {siteConfig.url}.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-slate-950">Information we collect</h2>
        <p>
          We do not require you to create an account to read articles. We may collect basic,
          non-personal information such as pages visited, browser type and approximate location
          through analytics tools. If you contact us by email, we keep your message and email
          address only to respond to you.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-slate-950">Cookies and advertising</h2>
        <p>
          This site may display advertisements served by Google AdSense. Google and its partners
          use cookies to show ads based on your prior visits to this website and other websites.
          Google&apos;s use of advertising cookies enables it and its partners to serve ads based on
          your visit. You may opt out of personalised advertising by visiting{" "}
          <a className="text-indigo-600 underline" href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
            Google Ads Settings
          </a>
          . You can also learn more at{" "}
          <a className="text-indigo-600 underline" href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
            How Google uses information from sites or apps that use our services
          </a>
          .
        </p>

        <h2 className="pt-4 text-xl font-semibold text-slate-950">Third-party links</h2>
        <p>
          Our articles may link to external websites. We are not responsible for the privacy
          practices or content of those sites.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-slate-950">Children&apos;s privacy</h2>
        <p>
          This site is not directed to children under 13 and we do not knowingly collect personal
          information from them.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-slate-950">Changes to this policy</h2>
        <p>
          We may update this policy from time to time. Changes take effect when posted on this
          page.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-slate-950">Contact</h2>
        <p>
          For privacy questions, email{" "}
          <a className="text-indigo-600 underline" href={`mailto:${siteConfig.contactEmail}`}>
            {siteConfig.contactEmail}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
