import { siteConfig } from "@/lib/site";

// AdSense requires /ads.txt to list your publisher ID. Client IDs look like "ca-pub-1234567890".
export function GET() {
  const publisherId = siteConfig.adsenseClient.replace(/^ca-/, "");
  const body = publisherId
    ? `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`
    : "# Add NEXT_PUBLIC_ADSENSE_CLIENT (ca-pub-XXXXXXXX) to enable AdSense.\n";
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
