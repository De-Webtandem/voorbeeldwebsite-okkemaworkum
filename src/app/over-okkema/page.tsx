import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { Eyebrow } from "@/components/Eyebrow";
import { Photo } from "@/components/Photo";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Over Okkema",
  description:
    "Okkema Workum, van Minne en Cornelis Okkema, is gespecialiseerd in betonwerken, betonvloeren en bouwmaatvoering. Een totaaloplossing met één aanspreekpunt.",
  path: "/over-okkema",
});

/** Uitgangspunten, ontleend aan de tekst "Over Okkema" op de huidige website. */
const principles = [
  { title: "Persoonlijk advies", text: "Door direct contact met de betrokkenen krijgt u advies van de mensen die het werk ook uitvoeren." },
  { title: "Korte lijnen", text: "Geen tussenlagen. U belt of mailt rechtstreeks met Minne of Cornelis Okkema." },
  { title: "Zelfstandig en flexibel", text: "Wij werken onafhankelijk, voor de bouwsector en voor de grond-, weg- en waterbouwsector." },
  { title: "Eén aanspreekpunt", text: "Betonwerk, vloeren en maatvoering in één hand. Dat zorgt voor een vlotter bouwproces." },
];

export default function OverOkkemaPage() {
  return (
    <>
      <header className="wrap pb-12 pt-8 md:pb-16 md:pt-10">
        <Breadcrumbs items={[{ name: "Over Okkema", path: "/over-okkema" }]} />
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow>Over Okkema</Eyebrow>
            <h1 className="display-xl mt-8">Eén aanspreekpunt, van maatvoering tot vloer.</h1>
          </div>
          <p className="lead text-ink/80 lg:col-span-4">
            Okkema Workum is gespecialiseerd in het uitvoeren van betonwerken, het aanbrengen van betonvloeren en het
            uitvoeren van bouwmaatvoering.
          </p>
        </div>
      </header>

      <div className="wrap">
        <div className="overflow-hidden rounded-[4px]">
          <div className="settle">
            <Photo id="about-wide" priority sizes="(min-width: 1600px) 1500px, 100vw" />
          </div>
        </div>
      </div>

      <section aria-labelledby="verhaal" className="wrap grid gap-12 py-24 md:py-36 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow>Ons verhaal</Eyebrow>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <h2 id="verhaal" className="display-md fade-up">
            Wij ontzorgen onze opdrachtgevers met wat in onze ogen een totaaloplossing is.
          </h2>
          <div className="prose-body lead mt-8 text-ink/75">
            <p>
              Daardoor zijn we flexibel en werken we zelfstandig. Het resultaat: de opdrachtgever heeft één aanspreekpunt,
              en er ontstaat een vlotter bouwproces.
            </p>
            <p>
              Op deze website staat in het kort welke werkzaamheden wij verrichten. Heeft u nog vragen, of wilt u geheel
              vrijblijvend een offerte aanvragen? Neem dan gerust contact met ons op.
            </p>
          </div>
          <p className="label mt-10 text-muted">{company.owners}</p>
        </div>
      </section>

      <section aria-labelledby="uitgangspunten" className="bg-white">
        <div className="wrap grid gap-14 py-24 md:py-36 lg:grid-cols-12 lg:items-center">
          <div className="overflow-hidden rounded-[4px] lg:col-span-5">
            <Photo id="about-work" sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Eyebrow>Uitgangspunten</Eyebrow>
            <h2 id="uitgangspunten" className="display-lg mt-8">
              Waar wij voor staan.
            </h2>
            <ul className="mt-12 grid gap-x-10 sm:grid-cols-2">
              {principles.map((p) => (
                <li key={p.title} className="fade-up border-t border-line py-7">
                  <h3 className="display-sm">{p.title}</h3>
                  <p className="mt-2 text-[0.9375rem] text-ink/70">{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-label="Citaat" className="wrap py-28 text-center md:py-40">
        <figure className="mx-auto max-w-4xl">
          <blockquote className="display-lg fade-up">Voor ons is elk project een nieuwe uitdaging.</blockquote>
          <figcaption className="label mt-8 text-muted">{company.owners}</figcaption>
        </figure>
      </section>

      <CtaBand />
    </>
  );
}
