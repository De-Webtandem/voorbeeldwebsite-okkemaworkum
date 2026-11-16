/**
 * Centrale bedrijfsgegevens. Alleen feitelijk bevestigde informatie uit de
 * bestaande website (okkema.frl) en de aangeleverde briefing.
 *
 * VERIFICATIEPUNTEN:
 * - KvK-nummer, oprichtingsjaar en werkgebied staan niet op de huidige
 *   website en worden daarom (nog) niet getoond.
 */
export const company = {
  legalName: "Okkema Workum BV",
  name: "Okkema Workum",
  shortName: "Okkema",
  tagline: "Betonwerken, betonvloeren en bouwmaatvoering",
  owners: "Minne en Cornelis Okkema",
  /** Algemeen nummer (Cornelis), zoals vermeld in de footer van de huidige site. */
  phone: {
    display: "06 52 11 38 35",
    href: "tel:+31652113835",
    international: "+31 6 52113835",
  },
  contacts: [
    { name: "Cornelis", display: "06 52 11 38 35", href: "tel:+31652113835" },
    { name: "Minne", display: "06 53 60 07 53", href: "tel:+31653600753" },
  ],
  email: "info@okkema.frl",
  facebook: "https://www.facebook.com/Okkema-Workum-Betonwerkenvloeren-en-Digitaal-maatvoeren-232675373524404/",
  address: {
    street: "Yttingwei 8",
    postalCode: "8711 JH",
    city: "Workum",
    municipality: "Súdwest-Fryslân",
    province: "Friesland",
    country: "NL",
  },
  /** Opent de kaartenapp van de bezoeker op basis van het adres (geen API-sleutel nodig). */
  routeUrl:
    "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent("Yttingwei 8, 8711 JH Workum"),
} as const;

export const fullAddress = `${company.address.street}, ${company.address.postalCode} ${company.address.city}`;
