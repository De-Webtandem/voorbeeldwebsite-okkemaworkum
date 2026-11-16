import type { MetadataRoute } from "next";
import { absoluteUrl, isNoIndex } from "@/lib/seo";

/** robots.txt. Met NEXT_PUBLIC_NOINDEX=true (demo/preview) wordt alles uitgesloten. */
export default function robots(): MetadataRoute.Robots {
  if (isNoIndex) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
