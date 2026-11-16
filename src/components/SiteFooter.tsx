import Image from "next/image";
import Link from "next/link";
import { company } from "@/data/company";
import { mainNav } from "@/data/navigation";
import { FacebookIcon } from "./Icons";
import { asset } from "@/lib/asset";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-ink text-paper">
      <div className="wrap grid gap-12 py-16 md:grid-cols-2 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Link href="/" aria-label={`${company.name}, naar de homepage`} className="inline-block">
            <Image src={asset("/images/okkema-logo-white.png")} alt={company.legalName} width={1997} height={498} sizes="230px" className="h-auto w-[210px] md:w-[230px]" />
          </Link>
          <p className="mt-8 max-w-sm text-paper/65">
            Betonwerken, betonvloeren en bouwmaatvoering. Persoonlijk advies, korte lijnen en één aanspreekpunt.
          </p>
        </div>
        <div className="lg:col-span-2 lg:col-start-6">
          <p className="label mb-5 text-paper/45">Pagina&apos;s</p>
          <ul className="space-y-2.5">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-paper/85 transition-colors hover:text-orange">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-2">
          <p className="label mb-5 text-paper/45">Adres</p>
          <p className="text-paper/85">
            {company.address.street}
            <br />
            {company.address.postalCode} {company.address.city}
          </p>
          <a href={company.facebook} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-paper/85 transition-colors hover:text-orange">
            <FacebookIcon /> Facebook<span className="sr-only"> (opent in een nieuw venster)</span>
          </a>
        </div>
        <div className="lg:col-span-3">
          <p className="label mb-5 text-paper/45">Contact</p>
          <ul className="space-y-2.5 text-paper/85">
            {company.contacts.map((c) => (
              <li key={c.name}>
                <a href={c.href} className="transition-colors hover:text-orange">
                  {c.name} · {c.display}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${company.email}`} className="transition-colors hover:text-orange">
                {company.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line-dark">
        <div className="wrap flex flex-col gap-3 py-6 text-sm text-paper/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {process.env.BUILD_YEAR} {company.legalName} ·{" "}
            <Link href="/privacyverklaring" className="hover:text-paper">
              Privacyverklaring en disclaimer
            </Link>
          </p>
          <p className="italic">
            Website gerealiseerd door de vrienden van{" "}
            <a href="https://www.dewebtandem.nl" target="_blank" rel="noopener" className="underline underline-offset-4 hover:text-paper">
              De Webtandem<span className="sr-only"> (opent in een nieuw venster)</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
