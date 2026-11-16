import type { Metadata } from "next";
import { company } from "@/data/company";
import type { Service } from "@/data/services";
import { servicePath } from "@/data/services";

/**
 * Basis-URL voor canonicals, sitemap en structured data. Standaard het
 * productiedomein; overschrijfbaar voor previews via NEXT_PUBLIC_SITE_URL.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://okkema.frl").replace(/\/$/, "");

/** Zet NEXT_PUBLIC_NOINDEX=true op demo-/previewomgevingen. */
export const isNoIndex = process.env.NEXT_PUBLIC_NOINDEX === "true";

export const absoluteUrl = (path: string) => `${siteUrl}${path === "/" ? "" : path}`;

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Volledige titel zonder template (homepage). */
  absoluteTitle?: boolean;
  noindex?: boolean;
};

export function pageMetadata({ title, description, path, absoluteTitle, noindex }: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${company.name}`;
  const images = [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${company.name}: betonwerken, betonvloeren en bouwmaatvoering` }];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "nl_NL",
      siteName: company.name,
      url: path,
      title: fullTitle,
      description,
      images,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

// ——— JSON-LD ———

const orgId = `${siteUrl}/#organisatie`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": orgId,
    name: company.legalName,
    alternateName: company.name,
    url: siteUrl,
    logo: `${siteUrl}/images/okkema-logo.png`,
    image: `${siteUrl}/opengraph-image`,
    telephone: company.phone.international,
    email: company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      postalCode: company.address.postalCode,
      addressLocality: company.address.city,
      addressRegion: company.address.province,
      addressCountry: company.address.country,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: company.address.municipality },
      { "@type": "AdministrativeArea", name: company.address.province },
    ],
    sameAs: [company.facebook],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: company.phone.international,
      email: company.email,
      areaServed: "NL",
      availableLanguage: ["nl"],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: company.name,
    inLanguage: "nl-NL",
    publisher: { "@id": orgId },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.navTitle,
    serviceType: service.navTitle,
    description: service.metaDescription,
    url: absoluteUrl(servicePath(service)),
    provider: { "@id": orgId },
    areaServed: [
      { "@type": "AdministrativeArea", name: company.address.municipality },
      { "@type": "AdministrativeArea", name: company.address.province },
    ],
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}
