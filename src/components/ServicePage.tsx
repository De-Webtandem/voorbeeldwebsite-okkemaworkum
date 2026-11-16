import Link from "next/link";
import { Breadcrumbs } from "./Breadcrumbs";
import { ButtonLink } from "./ButtonLink";
import { CtaBand } from "./CtaBand";
import { Eyebrow } from "./Eyebrow";
import { FaqList } from "./FaqList";
import { ArrowRight } from "./Icons";
import { JsonLd } from "./JsonLd";
import { Photo } from "./Photo";
import { getImage } from "@/data/imageRequirements";
import { categoryLabels, impressions, impressionSlot, type ImpressionCategory } from "@/data/impressions";
import { services, servicePath, type Service, type ServiceBlock } from "@/data/services";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";

export function serviceMetadata(service: Service) {
  return pageMetadata({
    title: `${service.navTitle}: ${service.h1.toLowerCase()}`,
    description: service.metaDescription,
    path: servicePath(service),
  });
}

/** Dienstpagina: kop, groot beeld, wat we doen, toelichting, foto's, vragen. */
export function ServicePage({ service }: { service: Service }) {
  const lists = service.blocks.filter((b): b is Extract<ServiceBlock, { type: "list" }> => b.type === "list");
  const splits = service.blocks.filter((b): b is Extract<ServiceBlock, { type: "split" }> => b.type === "split");
  const faqs = service.blocks.flatMap((b) => (b.type === "faq" ? b.items : []));
  const category = service.impressionCategory as ImpressionCategory;
  // Foto's die al als hero of toelichting op deze pagina staan, niet herhalen.
  const used = [service.heroImage, ...splits.map((b) => b.image)].filter(Boolean).map((id) => getImage(id as string).src);
  const photos = impressions.filter((i) => i.category === category && !used.includes(`/images/foto/${i.file}.jpg`)).slice(0, 3);
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <article>
        <header className="wrap pb-12 pt-8 md:pb-16 md:pt-10">
          <Breadcrumbs items={[{ name: service.navTitle, path: servicePath(service) }]} />
          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow>Dienst {service.number}</Eyebrow>
              <h1 className="display-xl mt-8">{service.navTitle}</h1>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="display-sm">{service.h1}</p>
              <p className="mt-4 text-ink/75">{service.lead}</p>
            </div>
          </div>
        </header>

        <div className="wrap">
          <div className="overflow-hidden rounded-[4px]">
            <div className="settle">
              <Photo id={service.heroImage} aspectRatio="21/9" priority sizes="(min-width: 1600px) 1500px, 100vw" />
            </div>
          </div>
        </div>

        {lists.map((list, i) => (
          <section key={list.heading} aria-labelledby={`${service.slug}-lijst-${i}`} className="wrap grid gap-12 py-24 md:py-32 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                {list.label && <Eyebrow>{list.label}</Eyebrow>}
                <h2 id={`${service.slug}-lijst-${i}`} className="display-md mt-6">
                  {list.heading}
                </h2>
                {list.intro && <p className="mt-5 max-w-sm text-ink/70">{list.intro}</p>}
              </div>
            </div>
            <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
              {list.items.map((item) => (
                <li key={item.title} className="fade-up border-t border-line py-7">
                  <h3 className="display-sm">{item.title}</h3>
                  <p className="mt-2 text-[0.9375rem] text-ink/70">{item.text}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {splits.map((block) => (
          <section key={block.heading} aria-labelledby={`${service.slug}-toelichting`} className="bg-white">
            <div className="wrap grid gap-12 py-24 md:py-32 lg:grid-cols-12 lg:items-center">
              {block.image && (
                <div className="overflow-hidden rounded-[4px] lg:col-span-6">
                  <Photo id={block.image} sizes="(min-width: 1024px) 45vw, 100vw" />
                </div>
              )}
              <div className="lg:col-span-5 lg:col-start-8">
                {block.label && <Eyebrow>{block.label}</Eyebrow>}
                <h2 id={`${service.slug}-toelichting`} className="display-md mt-6">
                  {block.heading}
                </h2>
                <div className="prose-body lead mt-6 text-ink/75">
                  {block.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        {photos.length > 0 && (
          <section aria-labelledby={`${service.slug}-fotos`} className="wrap py-24 md:py-32">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <h2 id={`${service.slug}-fotos`} className="display-md">
                {categoryLabels[category]} in de praktijk
              </h2>
              <Link href={`/impressies?categorie=${category}`} className="group inline-flex items-center gap-3 self-start font-semibold md:self-auto">
                <span className="link-line">Meer foto&apos;s</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <ul className="mt-12 grid gap-x-[clamp(1rem,2vw,2rem)] gap-y-10 md:grid-cols-3">
              {photos.map((imp) => (
                <li key={imp.file} className="fade-up">
                  <figure>
                    <div className="overflow-hidden rounded-[4px]">
                      <Photo id={impressionSlot(imp)} aspectRatio="4/3" sizes="(min-width: 768px) 33vw, 100vw" />
                    </div>
                    <figcaption className="mt-3 text-[0.9375rem] text-ink/70">{imp.title}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </section>
        )}

        {faqs.length > 0 && (
          <section aria-labelledby={`${service.slug}-faq`} className="border-t border-line">
            <div className="wrap grid gap-10 py-24 md:py-32 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <Eyebrow>Vragen</Eyebrow>
                <h2 id={`${service.slug}-faq`} className="display-md mt-6">
                  Veelgestelde vragen
                </h2>
                <div className="mt-8">
                  <ButtonLink href="/contact#formulier" variant="outline">
                    Stel uw vraag
                  </ButtonLink>
                </div>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <FaqList items={faqs} />
              </div>
            </div>
          </section>
        )}
      </article>

      <nav aria-label="Andere diensten" className="bg-white">
        <div className="wrap grid gap-x-[clamp(1rem,2vw,2rem)] gap-y-10 py-20 md:grid-cols-2 md:py-24">
          {others.map((s) => (
            <Link key={s.slug} href={servicePath(s)} className="group grid grid-cols-[7rem_1fr] items-center gap-6 md:grid-cols-[10rem_1fr]">
              <div className="overflow-hidden rounded-[4px]">
                <div className="transition-transform duration-700 ease-out-quart group-hover:scale-[1.04]">
                  <Photo id={s.heroImage} aspectRatio="1/1" sizes="160px" />
                </div>
              </div>
              <span>
                <span className="label block text-muted">Ook door Okkema</span>
                <span className="display-md mt-2 inline-flex items-center gap-3">
                  {s.navTitle}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </nav>

      <CtaBand heading={`${service.navTitle} nodig?`} />
      <JsonLd data={serviceJsonLd(service)} />
    </>
  );
}
