import type { NextConfig } from "next";
import { legacyRedirects, siteRedirects, type SiteRedirect } from "./src/data/redirects";

/**
 * Oude vellingabouw.nl-URL's → nieuwe URL's (301). Alleen actief met
 * ENABLE_LEGACY_REDIRECTS=true, zodat de demo de huidige website niet raakt.
 */
const enableLegacyRedirects = process.env.ENABLE_LEGACY_REDIRECTS === "true";

const buildDate = new Date();

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: false,
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
  env: {
    BUILD_YEAR: String(buildDate.getFullYear()),
    BUILD_DATE: buildDate.toISOString(),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  async redirects() {
    const toNext = ({ source, destination, has }: SiteRedirect) => ({
      source,
      destination,
      statusCode: 301 as const,
      ...(has ? { has } : {}),
    });
    // Altijd actief: pagina's die zijn opgegaan in de homepage of /portfolio.
    const site = siteRedirects.map(toNext);
    return enableLegacyRedirects ? [...site, ...legacyRedirects.map(toNext)] : site;
  },
};

export default nextConfig;
