/**
 * Redirects (zie next.config.ts):
 *
 * 1. siteRedirects: altijd actief. Logische alternatieve paden.
 * 2. legacyRedirects: oude *.html-URL's van okkema.frl. Alleen actief met
 *    ENABLE_LEGACY_REDIRECTS=true, dus pas wanneer deze website het domein
 *    daadwerkelijk overneemt. (De WordPress-paden /betonwerken enz. bestaan
 *    op deze site gewoon als pagina.)
 */

import { services } from "./services";

export type SiteRedirect = {
  source: string;
  destination: string;
  has?: { type: "query"; key: string; value?: string }[];
};

export const siteRedirects: SiteRedirect[] = [
  ...services.map((s) => ({ source: `/diensten/${s.slug}`, destination: `/${s.slug}` })),
  { source: "/diensten", destination: "/#diensten" },
  { source: "/over-ons", destination: "/over-okkema" },
  { source: "/projecten", destination: "/impressies" },
  { source: "/portfolio", destination: "/impressies" },
];

export const legacyRedirects: SiteRedirect[] = [
  { source: "/index.html", destination: "/" },
  ...services.map((s) => ({ source: `/${s.slug}.html`, destination: `/${s.slug}` })),
  { source: "/impressies.html", destination: "/impressies" },
  { source: "/over-okkema.html", destination: "/over-okkema" },
  { source: "/contact.html", destination: "/contact" },
];
