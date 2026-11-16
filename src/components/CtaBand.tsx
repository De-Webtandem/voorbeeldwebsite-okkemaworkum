import { company } from "@/data/company";
import { ButtonLink } from "./ButtonLink";
import { Eyebrow } from "./Eyebrow";

/** Rustige, donkere afsluiter met de telefoonnummers groot in beeld. */
export function CtaBand({ heading = "Vrijblijvend een offerte?" }: { heading?: string }) {
  return (
    <section aria-labelledby="cta-titel" className="on-dark bg-ink text-paper">
      <div className="wrap grid gap-12 py-24 md:py-32 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          <Eyebrow tone="dark">Contact</Eyebrow>
          <h2 id="cta-titel" className="display-lg mt-8">
            {heading}
          </h2>
          <p className="mt-6 max-w-md text-paper/70">
            U spreekt direct met Minne of Cornelis Okkema. Vertel wat er moet gebeuren, dan krijgt u persoonlijk advies.
          </p>
          <div className="mt-10">
            <ButtonLink href="/contact#formulier" variant="orange">
              Offerte aanvragen
            </ButtonLink>
          </div>
        </div>
        <ul className="border-t border-line-dark lg:col-span-5 lg:col-start-8">
          {company.contacts.map((c) => (
            <li key={c.name} className="border-b border-line-dark">
              <a href={c.href} className="group flex items-baseline justify-between gap-6 py-6">
                <span className="label text-paper/50">Bel {c.name}</span>
                <span className="display-md transition-colors group-hover:text-orange">{c.display}</span>
              </a>
            </li>
          ))}
          <li className="border-b border-line-dark">
            <a href={`mailto:${company.email}`} className="group flex items-baseline justify-between gap-6 py-6">
              <span className="label text-paper/50">Mail</span>
              <span className="display-sm transition-colors group-hover:text-orange">{company.email}</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
