/**
 * Impressies: foto's van uitgevoerd werk, afkomstig van de huidige website
 * okkema.frl (fotogalerijen op de dienstpagina's en de homepage-slider).
 *
 * Regels:
 * - Titels beschrijven alleen wat er op de foto te zien is. Geen verzonnen
 *   projectnamen, plaatsen, opdrachtgevers of jaartallen.
 * - Projectinformatie (plaats, opdracht) kan later per foto worden aangevuld
 *   via `location`, zodra Okkema die aanlevert.
 */

export type ImpressionCategory = "betonwerken" | "betonvloeren" | "bouwmaatvoering";

export const categoryLabels: Record<ImpressionCategory, string> = {
  betonwerken: "Betonwerken",
  betonvloeren: "Betonvloeren",
  bouwmaatvoering: "Bouwmaatvoering",
};

export type Impression = {
  /** Bestandsnaam in /public/images/foto/ zonder extensie; ook het beeldvak-id (imp-<file>). */
  file: string;
  title: string;
  category: ImpressionCategory;
  alt: string;
  /** Verhouding van het bronbestand. */
  aspectRatio: "4/3" | "1/1" | "21/9";
  location?: string;
};

export const impressions: Impression[] = [
  // ——— Betonvloeren
  { file: "img-2054", category: "betonvloeren", aspectRatio: "4/3", title: "Vloer storten naast een nieuwe stal", alt: "Betonpomp stort een grote vloer naast een nieuwe stal met donker dak" },
  { file: "img-0501", category: "betonvloeren", aspectRatio: "4/3", title: "Vlinderen in een werkplaats", alt: "Vakman werkt een betonvloer af met een vlindermachine in een verlichte werkplaats" },
  { file: "banner-gepolijst", category: "betonvloeren", aspectRatio: "21/9", title: "Glad afgewerkte vloer in een interieur", alt: "Glanzend afgewerkte donkere vloer in een ruimte met grote ramen" },
  { file: "img-7899", category: "betonvloeren", aspectRatio: "4/3", title: "Afgewerkte vloer in een bedrijfsruimte", alt: "Strak afgewerkte betonvloer tussen blauwe stalen kolommen in een bedrijfsruimte" },
  { file: "img-8099", category: "betonvloeren", aspectRatio: "4/3", title: "Twee vlindermachines op een buitenvloer", alt: "Twee vlindermachines op een vers gestorte betonvloer binnen een houten bekisting" },
  { file: "img-0049", category: "betonvloeren", aspectRatio: "4/3", title: "Storten met de betonpomp", alt: "Betonpomp en betonmixer bij een vers gestorte vloer naast een donkere schuur" },
  { file: "img-7893", category: "betonvloeren", aspectRatio: "4/3", title: "Vlinderen met twee machines", alt: "Vakman met twee vlindermachines op een betonvloer in een bedrijfsruimte" },
  { file: "img-3544", category: "betonvloeren", aspectRatio: "4/3", title: "Vloer langs een glazen gevel", alt: "Vers afgewerkte betonvloer in een houten bekisting langs een gebouw met glazen gevel" },
  { file: "img-2278", category: "betonvloeren", aspectRatio: "4/3", title: "Lange vloerstrook met wapeningsaansluitingen", alt: "Lange gestorte betonvloer met uitstekende wapening langs de randen" },
  { file: "banner-afwerken", category: "betonvloeren", aspectRatio: "21/9", title: "Vlinderen naast een woning", alt: "Vakman werkt met een vlindermachine een betonvloer af naast een woning" },
  { file: "img-7068", category: "betonvloeren", aspectRatio: "4/3", title: "Vloer afwerken in een uitbouw", alt: "Vlindermachine op een gestorte vloer in een uitbouw met glazen wanden" },
  { file: "img-2755", category: "betonvloeren", aspectRatio: "4/3", title: "Grote vloer in het open landschap", alt: "Grote vers gestorte betonvloer met weilanden op de achtergrond" },
  { file: "img-8292", category: "betonvloeren", aspectRatio: "4/3", title: "Vlindermachine op een vers gestorte vloer", alt: "Vlindermachine werpt een lange schaduw op een gladde, vers gestorte vloer" },
  { file: "banner-pomp", category: "betonvloeren", aspectRatio: "21/9", title: "Storten op een agrarisch erf", alt: "Betonpomp met uitgeklapte giek boven een gewapende vloer bij een boerderij" },
  { file: "img-3186", category: "betonvloeren", aspectRatio: "4/3", title: "Gestorte vloer bij een bedrijfsgebouw", alt: "Vers gestorte betonvloer naast een bedrijfsgebouw met grote deuren" },
  { file: "img-3531", category: "betonvloeren", aspectRatio: "4/3", title: "Vloer langs een bedrijfsgevel", alt: "Gestorte vloer in een bekisting langs een donkere bedrijfsgevel" },
  { file: "banner-vloer-woning", category: "betonvloeren", aspectRatio: "21/9", title: "Vloer bij een woning op het platteland", alt: "Vakman op een vers gestorte vloer in een bekisting naast een woning" },
  { file: "img-8345", category: "betonvloeren", aspectRatio: "4/3", title: "Storten van een lange vloerstrook", alt: "Betonpomp stort een lange vloerstrook met wapening op de voorgrond" },
  { file: "img-2625", category: "betonvloeren", aspectRatio: "4/3", title: "Vers gestorte vloer tussen keerwanden", alt: "Glanzende, vers gestorte vloer tussen houten keerwanden" },
  { file: "img-0282", category: "betonvloeren", aspectRatio: "4/3", title: "Buitenvloer afwerken bij schemer", alt: "Vakman met vlindermachine op een buitenvloer bij een schuur in de avondschemer" },
  { file: "img-3187", category: "betonvloeren", aspectRatio: "4/3", title: "Vloer op een buitenterrein", alt: "Gestorte betonvloer op een buitenterrein met een rij bomen" },
  { file: "img-2399", category: "betonvloeren", aspectRatio: "4/3", title: "Vloer en wanden in een stal in aanbouw", alt: "Betonnen vloer en wanden in een stal in aanbouw met een kraan op de achtergrond" },
  // ——— Betonwerken
  { file: "img-3314", category: "betonwerken", aspectRatio: "4/3", title: "Kelder met compartimenten onder een stal", alt: "Betonnen kelderwanden met compartimenten naast een stal in aanbouw" },
  { file: "img-3280", category: "betonwerken", aspectRatio: "4/3", title: "Gestorte keerwanden", alt: "Gestorte betonnen keerwanden en vloer onder een blauwe lucht" },
  { file: "img-4039", category: "betonwerken", aspectRatio: "4/3", title: "Funderingswapening in de bekisting", alt: "Wapening van een strokenfundering in de bekisting naast een bestaande woning" },
  { file: "img-0514", category: "betonwerken", aspectRatio: "1/1", title: "Fundering voor een uitbouw", alt: "Vakmannen bij een geïsoleerde funderingsbekisting met wapening naast een woning" },
  { file: "img-2300", category: "betonwerken", aspectRatio: "4/3", title: "Betonwanden van een stal", alt: "Betonwanden van een stal in aanbouw met een kraan op de achtergrond" },
  { file: "img-2382", category: "betonwerken", aspectRatio: "4/3", title: "Wapening in een bouwput", alt: "Wapening in een bouwput met een betonpomp op de achtergrond" },
  { file: "img-3354", category: "betonwerken", aspectRatio: "4/3", title: "Storten met wapeningskorven", alt: "Betonpomp en mixer bij uitgelegde wapening op een bouwterrein" },
  { file: "img-3278", category: "betonwerken", aspectRatio: "4/3", title: "Betonnen keerwanden en vloer", alt: "Hoge betonnen keerwanden langs een gestorte vloer met gestapelde materialen" },
  { file: "img-2334", category: "betonwerken", aspectRatio: "4/3", title: "Funderingsbalken langs een nieuwe hal", alt: "Betonnen funderingsbalken langs een nieuwe donkere hal" },
  { file: "img-3805", category: "betonwerken", aspectRatio: "4/3", title: "Funderingswanden van een stal", alt: "Betonnen funderingswanden van een stal in aanbouw" },
  { file: "img-3234", category: "betonwerken", aspectRatio: "4/3", title: "Betonwand met sparingen", alt: "Betonwand met ronde sparingen voor leidingen" },
  { file: "img-5073", category: "betonwerken", aspectRatio: "4/3", title: "Vloerwapening en maatvoering", alt: "Gewapende vloer met afzetting en een total station in een mistig landschap" },
  // ——— Bouwmaatvoering
  { file: "img-2246", category: "bouwmaatvoering", aspectRatio: "4/3", title: "Total station op de bouwplaats", alt: "Robotic total station op statief op een bouwplaats tussen bedrijfspanden" },
  { file: "img-2363", category: "bouwmaatvoering", aspectRatio: "4/3", title: "Maatvoering op een gestorte vloer", alt: "Total station op statief op een gestorte betonvloer onder een blauwe lucht" },
  { file: "img-3091", category: "bouwmaatvoering", aspectRatio: "4/3", title: "Heiwerk op een uitgezet terrein", alt: "Heistelling op een uitgezet zandterrein met markeringen" },
  { file: "img-2214", category: "bouwmaatvoering", aspectRatio: "4/3", title: "Terrein uitgezet voor het heiwerk", alt: "Bouwterrein met uitzetpennen, een graafmachine en een heistelling" },
  { file: "img-2396", category: "bouwmaatvoering", aspectRatio: "4/3", title: "Uitgezette en gewapende funderingen", alt: "Funderingsbalken met wapening in een raster op een bouwterrein" },
  { file: "img-2239", category: "bouwmaatvoering", aspectRatio: "4/3", title: "Uitzetten van het grondwerk", alt: "Bouwterrein met graafmachine tijdens het uitzetten van het grondwerk" },
];

export const impressionSlot = (i: Pick<Impression, "file">) => `imp-${i.file}`;

/** Categorieën waarvoor daadwerkelijk foto's bestaan, in vaste volgorde. */
export const categoriesInUse = (Object.keys(categoryLabels) as ImpressionCategory[]).filter((c) =>
  impressions.some((p) => p.category === c),
);

export function getImpression(file: string): Impression | undefined {
  return impressions.find((i) => i.file === file);
}
