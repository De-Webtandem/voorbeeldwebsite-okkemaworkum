/**
 * Diensten. Iedere dienst heeft een eigen pagina (/<slug>), opgezet als een
 * "specificatieblad" (Blad A, B, C), gelijk aan de URL's van de huidige site.
 *
 * Bron: de pagina's Betonwerken, Betonvloeren en Bouwmaatvoering op
 * okkema.frl, herschreven voor leesbaarheid. De opsommingen zijn één-op-één
 * overgenomen; de korte toelichtingen beschrijven het werk zelf en voegen
 * geen projecten, garanties of certificeringen toe.
 */

export type ServiceBlock =
  | {
      type: "split";
      label?: string;
      heading: string;
      paragraphs: string[];
      image?: string;
    }
  | {
      type: "list";
      label?: string;
      heading: string;
      intro?: string;
      items: { title: string; text: string; href?: string }[];
    }
  | { type: "faq"; heading: string; items: { q: string; a: string }[] };

/** Annotatie op een foto: positie in procenten van het beeld (4:3, niet bijgesneden). */
export type PhotoNote = { x: number; y: number; label: string; side?: "left" | "right" };

export type Service = {
  slug: string;
  /** Bladletter op de "tekening". */
  letter: "A" | "B" | "C";
  number: string;
  navTitle: string;
  h1: string;
  lead: string;
  /** Korte omschrijving voor overzichten en de homepage. */
  summary: string;
  heroImage: string;
  /** Annotaties op de hero-foto (beeldvak met verhouding 4:3). */
  heroNotes: PhotoNote[];
  /** Vier kernpunten voor het blad op de homepage. */
  highlights: string[];
  metaDescription: string;
  blocks: ServiceBlock[];
  /** Categorie op de impressiepagina. */
  impressionCategory: string;
};

export const services: Service[] = [
  {
    slug: "betonwerken",
    letter: "A",
    number: "01",
    navTitle: "Betonwerken",
    h1: "Betonwerk is maatwerk",
    lead: "Wij verzorgen allerhande betonwerken. Elk werk vraagt om een eigen aanpak, van de fundering van een uitbouw tot de kelder van een woning of de verdiepingsvloer van een bedrijfspand.",
    summary: "Funderingen, kelders, docks en verdiepingsvloeren. Elk werk vraagt om een eigen aanpak.",
    heroImage: "svc-betonwerken-hero",
    heroNotes: [
      { x: 30, y: 66, label: "Kelderwanden", side: "left" },
      { x: 62, y: 57, label: "Compartimenten", side: "right" },
    ],
    highlights: ["Funderingen", "Kelders en keldervloeren", "Docks", "Verdiepingsvloeren"],
    metaDescription:
      "Betonwerken in Friesland door Okkema Workum: funderingen, kelders, keldervloeren en -wanden, docks en het wapenen en afstorten van verdiepingsvloeren.",
    impressionCategory: "betonwerken",
    blocks: [
      {
        type: "list",
        label: "Toepassingen",
        heading: "Betonwerk dat wij voor u verzorgen",
        intro: "Enkele voorbeelden. Vraag gerust naar de mogelijkheden.",
        items: [
          { title: "Funderingen", text: "De basis van elk gebouw: uitgezet, gewapend en gestort volgens tekening." },
          { title: "Kelders van woningen", text: "Complete kelders onder woningen, van vloer tot wanden." },
          { title: "Keldervloeren", text: "De constructieve vloer waarop de kelder wordt opgebouwd." },
          { title: "Kelderwanden", text: "Betonwanden voor kelders, inclusief sparingen waar nodig." },
          { title: "Docks", text: "Laad- en losdocks in beton." },
          { title: "Afstorten van verdiepingsvloeren", text: "Het storten en afwerken van verdiepingsvloeren op de bouwplaats." },
          { title: "Bewapenen van verdiepingsvloeren", text: "Het aanbrengen van de wapening in verdiepingsvloeren, voorafgaand aan het storten." },
        ],
      },
      {
        type: "split",
        label: "Aanpak",
        heading: "Eén partij voor maatvoering en beton",
        paragraphs: [
          "Omdat wij ook de bouwmaatvoering verzorgen, kunnen funderingen, poeren en kelders door dezelfde partij worden uitgezet als gestort. Dat scheelt afstemming en zorgt voor korte lijnen op de bouwplaats.",
          "Door direct contact met alle betrokkenen krijgt u persoonlijk advies, en weet u altijd bij wie u terecht kunt.",
        ],
        image: "svc-betonwerken-detail",
      },
      {
        type: "faq",
        heading: "Veelgestelde vragen over betonwerken",
        items: [
          {
            q: "Welke betonwerken kunnen jullie verzorgen?",
            a: "Onder meer funderingen, kelders van woningen, keldervloeren, kelderwanden en docks, en het bewapenen en afstorten van verdiepingsvloeren. Elk werk vraagt om een eigen aanpak; vraag gerust naar de mogelijkheden.",
          },
          {
            q: "Kunnen jullie het betonwerk ook uitzetten?",
            a: "Ja. Wij voeren ook de bouwmaatvoering uit, waaronder het uitzetten van funderingen, poeren, kelders, betonkolommen en sparingen. Zo heeft u één aanspreekpunt.",
          },
        ],
      },
    ],
  },
  {
    slug: "betonvloeren",
    letter: "B",
    number: "02",
    navTitle: "Betonvloeren",
    h1: "Betonvloeren, geleverd, gestort en afgewerkt",
    lead: "Betonvloeren zijn er in vele uitvoeringen. De keuze hangt af van de wensen en eisen, onder andere aan vlakheid en afwerking. Wij kunnen het leveren, storten en afwerken van de vloer volledig voor u verzorgen.",
    summary: "Werkvloeren, constructievloeren, monolietvloeren en vloeistofdichte vloeren. Van levering tot afwerking.",
    heroImage: "svc-betonvloeren-hero",
    heroNotes: [
      { x: 47, y: 40, label: "Vlindermachine", side: "left" },
      { x: 62, y: 74, label: "Monolietvloer", side: "right" },
    ],
    highlights: ["Werkvloeren", "Constructievloeren", "Monolietvloeren", "Vloeistofdichte vloeren"],
    metaDescription:
      "Betonvloeren door Okkema Workum: werkvloeren, constructievloeren, monolietvloeren en vloeistofdichte vloeren. Leveren, storten en afwerken in één hand.",
    impressionCategory: "betonvloeren",
    blocks: [
      {
        type: "list",
        label: "Uitvoeringen",
        heading: "Vloeren die wij voor u verzorgen",
        intro: "Enkele voorbeelden. Vraag gerust naar de mogelijkheden.",
        items: [
          { title: "Werkvloeren", text: "Een vlakke, schone ondergrond om verder op te bouwen." },
          { title: "Constructievloeren", text: "Gewapende vloeren die onderdeel zijn van de draagconstructie." },
          { title: "Monolietvloeren", text: "In één keer gestort en monoliet afgewerkt door te vlinderen." },
          { title: "Vloeistofdichte vloeren", text: "Vloeren voor situaties waarin vloeistoffen niet in de bodem mogen komen." },
        ],
      },
      {
        type: "split",
        label: "Afwerking",
        heading: "Ruw afgewerkt of gevlinderd",
        paragraphs: [
          "Een vloer kan ruw worden afgewerkt, of worden opgeleverd als monolietvloer. Bij een monolietvloer wordt het oppervlak direct na het storten machinaal gevlinderd, zodat een gladde, gesloten vloer ontstaat.",
          "Betonvloeren worden toegepast als industrievloer in bedrijfshallen en werkplaatsen, en als afwerkvloer in woningen.",
        ],
        image: "svc-betonvloeren-detail",
      },
      {
        type: "faq",
        heading: "Veelgestelde vragen over betonvloeren",
        items: [
          {
            q: "Leveren jullie het beton ook?",
            a: "Ja. Wij kunnen het leveren, storten en afwerken van de betonvloer volledig voor u verzorgen.",
          },
          {
            q: "Wat is een monolietvloer?",
            a: "Een vloer die in één keer wordt gestort en direct daarna machinaal wordt afgewerkt (vlinderen). Daardoor is geen aparte afwerklaag nodig.",
          },
          {
            q: "Waar worden betonvloeren toegepast?",
            a: "Als industrievloer in bedrijfshallen en werkplaatsen, en als afwerkvloer in woningen. Welke uitvoering past, hangt af van de eisen aan onder andere vlakheid en afwerking.",
          },
        ],
      },
    ],
  },
  {
    slug: "bouwmaatvoering",
    letter: "C",
    number: "03",
    navTitle: "Bouwmaatvoering",
    h1: "Maatvoering op circa 1 mm nauwkeurig",
    lead: "Voor de bouwsector voeren wij geheel zelfstandig de (hoofd)maatvoering uit, voor kleine en (middel)grote projecten: van een kleine uitbouw tot utiliteitsbouw.",
    summary: "Complete (hoofd)maatvoering met een Trimble robotic total station, op circa 1 mm nauwkeurig.",
    heroImage: "svc-bouwmaatvoering-hero",
    heroNotes: [
      { x: 56, y: 62, label: "Robotic total station", side: "right" },
      { x: 27, y: 72, label: "Uitzetpunten", side: "left" },
    ],
    highlights: ["Hoofdmaatvoering", "Heipalen en funderingen", "Ankers en stramienen", "Inmeten voor CAD"],
    metaDescription:
      "Bouwmaatvoering door Okkema Workum met een Trimble robotic total station: uitzetten van gebouwen, heipalen, funderingen, ankers en stramienen, en inmeten voor CAD.",
    impressionCategory: "bouwmaatvoering",
    blocks: [
      {
        type: "split",
        label: "Techniek",
        heading: "Eén persoon, één robotic total station",
        paragraphs: [
          "De maatvoering gebeurt met een Trimble robotic total station. Daarmee meten we op circa 1 mm nauwkeurig, en kan het instrument door één persoon worden bediend.",
          "Door direct contact met de betrokkenen zorgen wij voor korte lijnen en krijgt u persoonlijk advies.",
        ],
        image: "svc-bouwmaatvoering-detail",
      },
      {
        type: "list",
        label: "Uitzetten",
        heading: "Veelvoorkomende werkzaamheden",
        intro: "Een kort overzicht. Vraag gerust naar de mogelijkheden.",
        items: [
          { title: "Positionering van het gebouw", text: "Het vastleggen van de positie van het gebouw of de gebouwen op de kavel." },
          { title: "Grondwerk", text: "Uitzetten van het grondwerk." },
          { title: "Heipalen", text: "Uitzetten van heipalen en het aangeven van paalafwijkingen en de afhakhoogte." },
          { title: "Funderingen en poeren", text: "Uitzetten van funderingen, poeren en funderingsmetselwerk." },
          { title: "Kelders", text: "Uitzetten van keldervloer, betonwanden, sparingen en dergelijke." },
          { title: "Kolommen en staalconstructies", text: "Uitzetten van betonkolommen en ankers voor staalconstructies." },
          { title: "Wanden en stramienen", text: "Hoekpunten van binnen- en buitenwanden op begane grond en verdiepingen, en stramienen." },
          { title: "Kavelgrenzen", text: "Uitzetten van kavelgrenzen." },
          { title: "Installatiewerk", text: "Uitzetten van (elektra)leidingen, verdeeldozen en dergelijke." },
        ],
      },
      {
        type: "list",
        label: "Inmeten",
        heading: "Inmeten",
        items: [
          { title: "Afwijkingen", text: "Inmeten van afwijkingen ten opzichte van de tekening." },
          { title: "Bestaande situatie", text: "Inmeten van de bestaande situatie in 2D, geschikt voor CAD." },
        ],
      },
      {
        type: "faq",
        heading: "Veelgestelde vragen over bouwmaatvoering",
        items: [
          {
            q: "Hoe nauwkeurig is de maatvoering?",
            a: "Wij werken met een Trimble robotic total station en meten op circa 1 mm nauwkeurig.",
          },
          {
            q: "Voor welke projecten kan ik bij jullie terecht?",
            a: "Voor kleine en (middel)grote projecten: van het maatvoeren van een kleine uitbouw tot utiliteitsbouwprojecten.",
          },
          {
            q: "Kunnen jullie ook een bestaande situatie inmeten?",
            a: "Ja. Wij meten bestaande situaties in 2D in, geschikt voor verdere uitwerking in CAD. Ook afwijkingen ten opzichte van de tekening kunnen we inmeten.",
          },
        ],
      },
    ],
  },
];

export function servicePath(s: Pick<Service, "slug">): string {
  return `/${s.slug}`;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
