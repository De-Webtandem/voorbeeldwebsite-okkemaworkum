import type { NextConfig } from "next";
import { legacyRedirects, siteRedirects, type SiteRedirect } from "./src/data/redirects";

/**
 * Oude okkema.frl-URL's → nieuwe URL's (301). Alleen actief met
 * ENABLE_LEGACY_REDIRECTS=true, zodat de demo de huidige website niet raakt.
 */
const enableLegacyRedirects = process.env.ENABLE_LEGACY_REDIRECTS === "true";

/**
 * GITHUB_PAGES=true: statische export voor GitHub Pages (demo-link).
 * Draait in een submap, zonder server: geen redirects en geen
 * beeldoptimalisatie (de foto's zijn vooraf al geoptimaliseerd).
 */
const githubPages = process.env.GITHUB_PAGES === "true";
const basePath = githubPages ? (process.env.PAGES_BASE_PATH ?? "/voorbeeldwebsite-okkemaworkum") : "";

const buildDate = new Date();

const nextConfig: NextConfig = {
  // Cache Components (met PPR) werkt niet in een statische export.
  cacheComponents: !githubPages,
  ...(githubPages ? {} : { partialPrefetching: false }),
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  poweredByHeader: false,
  ...(githubPages ? { output: "export" as const, basePath, trailingSlash: true } : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    BUILD_YEAR: String(buildDate.getFullYear()),
    BUILD_DATE: buildDate.toISOString(),
  },
  images: {
    unoptimized: githubPages,
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  // Geen redirects bij de statische export: die worden daar niet ondersteund.
  ...(githubPages ? {} : { redirects }),
};

async function redirects() {
    const toNext = ({ source, destination, has }: SiteRedirect) => ({
      source,
      destination,
      statusCode: 301 as const,
      ...(has ? { has } : {}),
    });
    // Altijd actief: alternatieve paden (o.a. /portfolio → /impressies).
    const site = siteRedirects.map(toNext);
    return enableLegacyRedirects ? [...site, ...legacyRedirects.map(toNext)] : site;
}

export default nextConfig;
