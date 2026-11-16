import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { Eyebrow } from "@/components/Eyebrow";
import { FacebookIcon } from "@/components/Icons";
import { Photo } from "@/components/Photo";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact en offerte",
  description: `Neem contact op met ${company.name}: bel Cornelis (${company.contacts[0].display}) of Minne (${company.contacts[1].display}), mail ${company.email} of vraag vrijblijvend een offerte aan.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <header className="wrap pb-16 pt-8 md:pb-24 md:pt-10">
        <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="display-xl mt-8">Direct contact, korte lijnen.</h1>
            <p className="lead mt-8 max-w-md text-ink/80">
              Bel of mail rechtstreeks met Minne of Cornelis Okkema. Voor vragen, persoonlijk advies of een geheel
              vrijblijvende offerte.
            </p>
          </div>
          <ul className="border-t border-line lg:col-span-5 lg:col-start-8">
            {company.contacts.map((c) => (
              <li key={c.name} className="border-b border-line">
                <a href={c.href} className="group flex items-baseline justify-between gap-6 py-6">
                  <span className="label text-muted">Bel {c.name}</span>
                  <span className="display-md transition-colors group-hover:text-orange-deep">{c.display}</span>
                </a>
              </li>
            ))}
            <li className="border-b border-line">
              <a href={`mailto:${company.email}`} className="group flex items-baseline justify-between gap-6 py-6">
                <span className="label text-muted">Mail</span>
                <span className="display-sm transition-colors group-hover:text-orange-deep">{company.email}</span>
              </a>
            </li>
          </ul>
        </div>
      </header>

      <section id="formulier" aria-labelledby="formulier-titel" className="bg-white">
        <div className="wrap grid gap-14 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>Formulier</Eyebrow>
            <h2 id="formulier-titel" className="display-md mb-10 mt-6">
              Offerte aanvragen of een vraag stellen
            </h2>
            <ContactForm />
          </div>
          <aside className="lg:col-span-4 lg:col-start-9" aria-labelledby="adres-titel">
            <div className="lg:sticky lg:top-32">
              <div className="overflow-hidden rounded-[4px]">
                <Photo id="contact-photo" sizes="(min-width: 1024px) 30vw, 100vw" />
              </div>
              <h3 id="adres-titel" className="display-sm mt-8">
                {company.legalName}
              </h3>
              <address className="mt-3 not-italic text-ink/75">
                {company.address.street}
                <br />
                {company.address.postalCode} {company.address.city}
              </address>
              <p className="mt-4 text-[0.9375rem] text-ink/70">
                Omdat we veel op locatie werken, is het verstandig om vooraf even te bellen.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <a href={company.routeUrl} target="_blank" rel="noopener noreferrer" className="link-line self-start font-medium">
                  Plan uw route<span className="sr-only"> (opent in een nieuw venster)</span>
                </a>
                <a href={company.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 self-start font-medium">
                  <FacebookIcon /> <span className="link-line">Onze laatste projecten op Facebook</span>
                  <span className="sr-only"> (opent in een nieuw venster)</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
