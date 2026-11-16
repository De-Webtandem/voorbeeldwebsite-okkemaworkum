import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { FacebookIcon } from "@/components/Icons";
import { Eyebrow } from "@/components/Eyebrow";
import { ImpressionFilter } from "@/components/ImpressionFilter";
import { ImpressionGallery } from "@/components/ImpressionGallery";
import { company } from "@/data/company";
import { categoriesInUse, categoryLabels, impressions } from "@/data/impressions";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Impressies: betonwerken, betonvloeren en maatvoering",
  description:
    "Foto's van uitgevoerd werk door Okkema Workum: betonwerken, betonvloeren en bouwmaatvoering, van fundering en kelder tot monolietvloer.",
  path: "/impressies",
});

export default function ImpressiesPage() {
  const categories = categoriesInUse.map((key) => ({
    key,
    label: categoryLabels[key],
    count: impressions.filter((p) => p.category === key).length,
  }));

  return (
    <>
      <section>
        <div className="wrap grid gap-10 pb-10 pt-8 md:pb-14 md:pt-10 lg:grid-cols-12">
        <div className="lg:col-span-12">
          <Breadcrumbs items={[{ name: "Impressies", path: "/impressies" }]} />
        </div>
        <div className="mt-4 lg:col-span-8">
          <Eyebrow>Impressies</Eyebrow>
          <h1 className="display-xl mt-8">Werk in uitvoering.</h1>
        </div>
        <div className="lg:col-span-4 lg:self-end">
          <p className="lead text-ink/80">
            Een selectie foto&apos;s van betonwerken, betonvloeren en bouwmaatvoering die wij hebben uitgevoerd. Klik op
            een foto om hem groot te bekijken.
          </p>
        </div>
        </div>
      </section>

      <section aria-label="Foto-overzicht" className="wrap pb-24 md:pb-32">
        <ImpressionFilter categories={categories} total={impressions.length}>
          <ImpressionGallery items={impressions} />
        </ImpressionFilter>

        <div className="mt-20 flex border-t border-line max-w-3xl flex-col gap-5 pt-8 text-[0.9375rem] text-muted md:flex-row md:items-center md:justify-between">
          <p>
            Onze laatste projecten delen we op Facebook. Meer weten over het werk zelf? Lees verder bij{" "}
            <Link href="/betonwerken" className="link-line text-ink">
              betonwerken
            </Link>
            ,{" "}
            <Link href="/betonvloeren" className="link-line text-ink">
              betonvloeren
            </Link>{" "}
            en{" "}
            <Link href="/bouwmaatvoering" className="link-line text-ink">
              bouwmaatvoering
            </Link>
            .
          </p>
          <a
            href={company.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center gap-3 rounded-[2px] border border-line-strong px-5 font-medium text-ink transition-colors hover:border-ink"
          >
            <FacebookIcon />
            Volg ons op Facebook
            <span className="sr-only"> (opent in een nieuw venster)</span>
          </a>
        </div>
      </section>

      <CtaBand heading="Werk in voorbereiding?" />
    </>
  );
}
