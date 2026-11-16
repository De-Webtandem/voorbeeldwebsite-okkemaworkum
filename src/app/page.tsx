import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { Eyebrow } from "@/components/Eyebrow";
import { ArrowRight } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { company } from "@/data/company";
import { getImpression, impressionSlot, type Impression } from "@/data/impressions";
import { services, servicePath } from "@/data/services";
import { werkwijzeSteps } from "@/data/werkwijze";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";
import { asset } from "@/lib/asset";

export const metadata = pageMetadata({
  title: "Okkema Workum | Betonwerken, betonvloeren en bouwmaatvoering",
  absoluteTitle: true,
  description:
    "Okkema Workum is gespecialiseerd in betonwerken, betonvloeren en bouwmaatvoering. Persoonlijk advies, korte lijnen en één aanspreekpunt voor een vlotter bouwproces.",
  path: "/",
});

/** Foto's voor het mozaïek: één groot beeld en vier kleinere. */
const mosaic = ["img-2054", "img-0501", "img-2246", "banner-gepolijst", "img-4039"]
  .map(getImpression)
  .filter((i): i is Impression => Boolean(i));

const facts = [
  ["Gevestigd", `${company.address.city}, ${company.address.province}`],
  ["Aanspreekpunt", company.owners],
  ["Maatvoering", "Circa 1 mm nauwkeurig"],
];

const principles = [
  { title: "Persoonlijk advies", text: "U spreekt direct met de mensen die het werk ook uitvoeren." },
  { title: "Korte lijnen", text: "Door direct contact met alle betrokkenen, zonder tussenlagen." },
  { title: "Eén aanspreekpunt", text: "Betonwerk, vloeren en maatvoering in één hand, voor een vlotter bouwproces." },
];

export default function HomePage() {
  return (
    <>
      {/* ——— Hero: kop en introductie, daaronder één breed beeld ——— */}
      <section aria-labelledby="hero-titel">
        <div className="wrap grid gap-10 pb-12 pt-14 md:pb-16 md:pt-20 lg:grid-cols-12 lg:items-end lg:pt-24">
          <div className="lg:col-span-8">
            <Eyebrow>{company.name} · Betonwerken en betonvloeren</Eyebrow>
            <h1 id="hero-titel" className="display-xl mt-8">
              Vakwerk in beton,
              <br />
              van fundering tot vloer.
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="lead text-ink/80">
              Betonwerken, betonvloeren en bouwmaatvoering in één hand. Met persoonlijk advies, korte lijnen en één
              aanspreekpunt.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <ButtonLink href="/contact#formulier" variant="orange">
                Offerte aanvragen
              </ButtonLink>
              <ButtonLink href="/impressies" variant="outline">
                Bekijk ons werk
              </ButtonLink>
            </div>
          </div>
        </div>
        <div className="wrap">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-ph sm:aspect-[16/9] lg:aspect-[21/9]">
            <Image
              src={asset("/images/foto/img-3280.jpg")}
              alt="Gestorte betonnen keerwanden en vloer onder een blauwe lucht met stapelwolken"
              fill
              priority
              quality={85}
              sizes="(min-width: 1600px) 1500px, 100vw"
              className="settle object-cover object-[40%_50%] lg:object-[50%_62%]"
            />
          </div>
        </div>
      </section>

      {/* ——— Introductie ——— */}
      <section aria-labelledby="intro-titel" className="wrap grid gap-12 py-24 md:py-36 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Eyebrow>Okkema Workum</Eyebrow>
          <h2 id="intro-titel" className="display-md fade-up mt-8">
            Wij ontzorgen onze opdrachtgevers met een totaaloplossing. Daardoor zijn we flexibel, werken we zelfstandig en
            heeft u één aanspreekpunt.
          </h2>
          <p className="mt-8 max-w-xl text-ink/75">
            Wij voeren onze werkzaamheden onafhankelijk uit, zowel voor de bouwsector als voor de grond-, weg- en
            waterbouwsector. Van een kleine uitbouw tot utiliteitsbouw.
          </p>
        </div>
        <dl className="lg:col-span-4 lg:col-start-9 lg:self-end">
          {facts.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-6 border-t border-line py-5 last:border-b">
              <dt className="label text-muted">{k}</dt>
              <dd className="text-right">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ——— Diensten: drie fotokaarten ——— */}
      <section id="diensten" aria-labelledby="diensten-titel" className="bg-white">
        <div className="wrap py-24 md:py-36">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Diensten</Eyebrow>
              <h2 id="diensten-titel" className="display-lg mt-8">
                Waar wij in thuis zijn.
              </h2>
            </div>
            <p className="max-w-md text-ink/70">Drie vakgebieden die op de bouwplaats direct op elkaar aansluiten.</p>
          </div>
          <ul className="mt-14 grid gap-x-[clamp(1rem,2vw,2rem)] gap-y-14 md:mt-20 md:grid-cols-3">
            {services.map((s, i) => (
              <li key={s.slug} className="fade-up group relative" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="overflow-hidden rounded-[4px]">
                  <div className="transition-transform duration-700 ease-out-quart group-hover:scale-[1.03] motion-reduce:transform-none">
                    <Photo id={s.heroImage} aspectRatio="4/5" sizes="(min-width: 768px) 33vw, 100vw" />
                  </div>
                </div>
                <h3 className="display-md mt-7">
                  <Link href={servicePath(s)} className="after:absolute after:inset-0 after:content-['']">
                    {s.navTitle}
                  </Link>
                </h3>
                <p className="mt-3 max-w-sm text-ink/70">{s.summary}</p>
                <p className="mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-semibold">
                  <span className="link-line">Meer over {s.navTitle.toLowerCase()}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ——— Citaat ——— */}
      <section aria-label="Citaat van Minne en Cornelis Okkema" className="wrap py-28 text-center md:py-40">
        <figure className="mx-auto max-w-4xl">
          <blockquote className="display-lg fade-up">Voor ons is elk project een nieuwe uitdaging.</blockquote>
          <figcaption className="label mt-8 text-muted">{company.owners}</figcaption>
        </figure>
      </section>

      {/* ——— Werkwijze en principes, naast een foto ——— */}
      <section aria-labelledby="werkwijze-titel" className="border-t border-line">
        <div className="wrap grid gap-14 py-24 md:py-36 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Eyebrow>Werkwijze</Eyebrow>
              <h2 id="werkwijze-titel" className="display-lg mt-8">
                Persoonlijk, met korte lijnen.
              </h2>
              <ul className="mt-10 space-y-5">
                {principles.map((p) => (
                  <li key={p.title} className="flex gap-4">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-orange" />
                    <p>
                      <span className="font-semibold">{p.title}.</span> <span className="text-ink/70">{p.text}</span>
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-12 hidden overflow-hidden rounded-[4px] lg:block">
                <Photo id="about-fleet" sizes="40vw" />
              </div>
            </div>
          </div>
          <ol className="lg:col-span-6 lg:col-start-7">
            {werkwijzeSteps.map((step, i) => (
              <li key={step.title} className="fade-up grid grid-cols-[3rem_1fr] gap-x-4 border-t border-line py-9 last:border-b md:grid-cols-[5rem_1fr]">
                <span className="num text-xl text-ink/30">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="display-sm">{step.title}</h3>
                  <p className="mt-3 text-ink/70">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ——— Impressies: rustig mozaïek ——— */}
      <section aria-labelledby="impressies-titel" className="bg-white">
        <div className="wrap py-24 md:py-36">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Impressies</Eyebrow>
              <h2 id="impressies-titel" className="display-lg mt-8">
                Uit het werk.
              </h2>
            </div>
            <Link href="/impressies" className="group inline-flex items-center gap-3 self-start font-semibold md:self-auto">
              <span className="link-line">Alle impressies</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <ul className="mt-14 grid grid-cols-2 gap-[clamp(0.75rem,1.5vw,1.5rem)] md:mt-20 lg:grid-cols-4">
            {mosaic.map((imp, i) => (
              <li key={imp.file} className={`fade-up ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
                <figure className={`group relative overflow-hidden rounded-[4px] ${i === 0 ? "h-full" : ""}`}>
                  <div className={`transition-transform duration-700 ease-out-quart group-hover:scale-[1.03] motion-reduce:transform-none ${i === 0 ? "h-full" : ""}`}>
                    <Photo id={impressionSlot(imp)} aspectRatio="4/3" className={i === 0 ? "h-full" : ""} sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"} />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {imp.title}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
      <JsonLd data={services.map(serviceJsonLd)} />
    </>
  );
}
