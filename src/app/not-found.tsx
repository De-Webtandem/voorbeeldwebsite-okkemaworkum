import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";

import { services, servicePath } from "@/data/services";

export const metadata = {
  title: "Pagina niet gevonden",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section><div className="wrap grid gap-10 py-24 md:py-36 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <p className="label flex items-center gap-3 text-muted">
          <span aria-hidden className="h-2 w-2 bg-orange" />
          Foutcode 404
        </p>
        <h1 className="display-xl mt-8">Deze pagina bestaat niet (meer).</h1>
        <p className="lead mt-8 max-w-2xl text-ink/80">
          Misschien is de pagina verplaatst bij de vernieuwing van onze website, of is het adres niet helemaal juist. Via
          onderstaande links vindt u snel verder.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" variant="ink">
            Naar de homepage
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Contact opnemen
          </ButtonLink>
        </div>
      </div>
      <nav aria-label="Veelbezochte pagina's" className="lg:col-span-3 lg:col-start-10 lg:self-end">
        <p className="label text-muted">Veelbezocht</p>
        <ul className="mt-4 border-t border-line">
          {[...services.map((d) => ({ label: d.navTitle, href: servicePath(d) })), { label: "Impressies", href: "/impressies" }, { label: "Contact", href: "/contact" }].map((l) => (
            <li key={l.href} className="border-b border-line">
              <Link href={l.href} className="block py-3 hover:underline">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div></section>
  );
}
