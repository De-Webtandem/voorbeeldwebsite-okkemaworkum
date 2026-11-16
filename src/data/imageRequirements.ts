/**
 * Centrale lijst van alle beeldvakken op de website.
 *
 * Alle foto's komen van de huidige website okkema.frl en staan in
 * /public/images/foto/ (licht nabewerkt: iets minder verzadiging, iets meer
 * contrast). Een foto vervangen: zet het nieuwe bestand in die map en pas
 * hieronder `src` en `alt` aan. De beeldverhouding staat per vak vast, dus de
 * layout verschuift niet. Zonder `src` toont de site een beschrijvend
 * placeholdervlak (components/PhotoPlaceholder.tsx).
 */

import { impressions, impressionSlot } from "./impressions";

export type AspectRatio = "21/9" | "16/9" | "3/2" | "4/3" | "1/1" | "4/5" | "3/4";

export type ImageRequirement = {
  id: string;
  /** Korte rubriek, getoond in de placeholder. */
  label: string;
  /** Wat er precies op de foto moet staan. */
  description: string;
  aspectRatio: AspectRatio;
  /** Gewenste minimale afmeting van het bronbestand. */
  size: string;
  /** Alt-tekst van de foto. */
  alt: string;
  src?: string;
  /** Optionele object-position voor uitsnede bij object-fit: cover. */
  position?: string;
  fit?: "contain";
  kind?: "impressie" | "tekening";
};

const sizes: Record<AspectRatio, string> = {
  "21/9": "2520 x 1080 px",
  "16/9": "2400 x 1350 px",
  "3/2": "2400 x 1600 px",
  "4/3": "2000 x 1500 px",
  "1/1": "1600 x 1600 px",
  "4/5": "1600 x 2000 px",
  "3/4": "1500 x 2000 px",
};

type Spec = Omit<ImageRequirement, "size" | "description"> & { size?: string; description?: string };

const foto = (file: string) => `/images/foto/${file}.jpg`;
const alt = (file: string) => impressions.find((i) => i.file === file)?.alt ?? "";

const list: Spec[] = [
  // ——— Home en algemene pagina's
  { id: "home-hero", label: "Hero", aspectRatio: "4/3", src: foto("img-2054"), alt: alt("img-2054") },
  {
    id: "about-fleet",
    label: "Over Okkema",
    aspectRatio: "4/3",
    src: foto("bedrijfsbussen"),
    alt: "Vier bedrijfsbussen van Okkema met het oranje beeldmerk voor een loods",
  },
  { id: "about-wide", label: "Over Okkema", aspectRatio: "21/9", src: foto("banner-pomp"), alt: alt("banner-pomp") },
  { id: "about-work", label: "Over Okkema", aspectRatio: "4/5", src: foto("img-0514"), alt: alt("img-0514") },
  { id: "contact-photo", label: "Contact", aspectRatio: "4/3", src: foto("img-2363"), alt: alt("img-2363") },
  // ——— Diensten
  { id: "svc-betonwerken-hero", label: "Betonwerken", aspectRatio: "4/3", src: foto("img-3314"), alt: alt("img-3314"), position: "50% 62%" },
  { id: "svc-betonwerken-detail", label: "Betonwerken", aspectRatio: "4/3", src: foto("img-4039"), alt: alt("img-4039") },
  { id: "svc-betonvloeren-hero", label: "Betonvloeren", aspectRatio: "4/3", src: foto("img-0501"), alt: alt("img-0501"), position: "50% 42%" },
  { id: "svc-betonvloeren-detail", label: "Betonvloeren", aspectRatio: "16/9", src: foto("banner-gepolijst"), alt: alt("banner-gepolijst") },
  { id: "svc-bouwmaatvoering-hero", label: "Bouwmaatvoering", aspectRatio: "4/3", src: foto("img-2246"), alt: alt("img-2246"), position: "50% 66%" },
  { id: "svc-bouwmaatvoering-detail", label: "Bouwmaatvoering", aspectRatio: "4/3", src: foto("img-2396"), alt: alt("img-2396") },
  // ——— Impressies: één vak per foto, in de verhouding van het bronbestand
  ...impressions.map((i) => ({
    id: impressionSlot(i),
    label: "Impressie",
    aspectRatio: i.aspectRatio,
    src: foto(i.file),
    alt: i.alt,
  })),
];

export const imageRequirements: Record<string, ImageRequirement> = Object.fromEntries(
  list.map((spec) => [
    spec.id,
    { ...spec, description: spec.description ?? spec.alt, size: spec.size ?? sizes[spec.aspectRatio] },
  ]),
);

export function getImage(id: string): ImageRequirement {
  const image = imageRequirements[id];
  if (!image) throw new Error(`Onbekend beeldvak: "${id}". Voeg het toe aan src/data/imageRequirements.ts.`);
  return image;
}
