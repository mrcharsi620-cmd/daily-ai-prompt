"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/site";

// Renders a Google AdSense display ad. When NEXT_PUBLIC_ADSENSE_CLIENT is not set,
// nothing is rendered, so the layout stays clean until you connect AdSense.
export function AdSlot({ slot, className = "" }: { slot?: string; className?: string }) {
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!siteConfig.adsenseClient || !ref.current) return;
    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      (w.adsbygoogle = w.adsbygoogle || []).push({});
    } catch {
      // Ignore ad script errors so the page keeps working.
    }
  }, []);

  if (!siteConfig.adsenseClient) return null;

  return (
    <div className={`my-8 min-h-[100px] text-center ${className}`}>
      <ins
        ref={ref}
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={siteConfig.adsenseClient}
        data-ad-slot={slot || undefined}
        data-ad-format={slot ? undefined : "auto"}
        data-full-width-responsive="true"
      />
    </div>
  );
}
