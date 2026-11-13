export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Daily New AI Prompt",
  shortName: "Daily AI Prompt",
  tagline: "Daily AI Prompts",
  description:
    "A new, ready-to-use AI prompt every day. Copy, paste and get better results from ChatGPT, Gemini, Claude and other AI tools.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "",
  contactEmail: process.env.CONTACT_EMAIL || "you@example.com",
  locale: "en_US",
};

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
