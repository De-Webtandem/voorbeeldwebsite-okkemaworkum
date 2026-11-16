export type NavItem = { label: string; href: string };

/** Hoofdnavigatie: losse pagina's, gelijk aan de structuur van de huidige site. */
export const mainNav: NavItem[] = [
  { label: "Betonwerken", href: "/betonwerken" },
  { label: "Betonvloeren", href: "/betonvloeren" },
  { label: "Bouwmaatvoering", href: "/bouwmaatvoering" },
  { label: "Impressies", href: "/impressies" },
  { label: "Over Okkema", href: "/over-okkema" },
  { label: "Contact", href: "/contact" },
];

export const primaryCta: NavItem = { label: "Offerte aanvragen", href: "/contact#formulier" };
