import Link from "next/link";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

/** Kruimelpad + BreadcrumbList-JSON-LD. De eerste crumb is altijd Home. */
export function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const crumbs: Crumb[] = [{ name: "Home", path: "/" }, ...items];
  const muted = tone === "dark" ? "text-paper/60" : "text-muted";
  return (
    <>
      <nav aria-label="Kruimelpad" className={`label text-[0.6875rem] ${muted}`}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className={tone === "dark" ? "text-paper" : "text-ink"}>
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.path} className="transition-colors hover:text-current hover:underline">
                      {c.name}
                    </Link>
                    <span aria-hidden>/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
