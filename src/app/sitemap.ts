import type { MetadataRoute } from "next";
import { services, servicePath } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

/**
 * XML-sitemap op /sitemap.xml. Bevat alleen indexeerbare, canonieke URL's.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(process.env.BUILD_DATE ?? "2026-11-16");
  const entry = (path: string, priority: number, changeFrequency: "monthly" | "yearly" = "monthly") => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1),
    ...services.map((s) => entry(servicePath(s), 0.9)),
    entry("/impressies", 0.7),
    entry("/over-okkema", 0.6, "yearly"),
    entry("/contact", 0.7, "yearly"),
    entry("/privacyverklaring", 0.1, "yearly"),
  ];
}
