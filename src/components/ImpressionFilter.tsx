"use client";

import { useEffect, useState, type ReactNode } from "react";

type Category = { key: string; label: string; count: number };

/**
 * Filterbalk voor de impressiepagina. Alle foto's staan server-side in
 * de HTML (indexeerbaar); dit component verbergt alleen niet-passende foto's
 * via het data-attribuut `data-cat` en een gegenereerde CSS-regel.
 * Ondersteunt ?categorie=… zodat filters deelbaar zijn (bijv. vanuit
 * de dienstsecties op de homepage).
 */
export function ImpressionFilter({ categories, total, children }: { categories: Category[]; total: number; children: ReactNode }) {
  const [active, setActive] = useState<string>("alle");

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("categorie");
    if (fromUrl && categories.some((c) => c.key === fromUrl)) {
      // Eenmalig synchroniseren met de URL na hydratie.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActive(fromUrl);
    }
  }, [categories]);

  const select = (key: string) => {
    setActive(key);
    const url = new URL(window.location.href);
    if (key === "alle") url.searchParams.delete("categorie");
    else url.searchParams.set("categorie", key);
    window.history.replaceState(null, "", url);
  };

  const shown = active === "alle" ? total : (categories.find((c) => c.key === active)?.count ?? total);
  const activeLabel = categories.find((c) => c.key === active)?.label;

  const options = [{ key: "alle", label: "Alle foto's", count: total }, ...categories];

  return (
    <div data-active={active}>
      <style>
        {categories
          .map((c) => `[data-active="${c.key}"] [data-cat]:not([data-cat~="${c.key}"]){display:none}`)
          .join("")}
      </style>
      <div className="flex flex-col gap-6 border-y border-line py-5 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filter foto's op dienst" className="-mx-1 flex flex-wrap gap-2">
          {options.map((o) => {
            const pressed = active === o.key;
            return (
              <button
                key={o.key}
                type="button"
                aria-pressed={pressed}
                onClick={() => select(o.key)}
                className={`inline-flex min-h-11 items-center gap-2 rounded-[2px] border px-4 text-[0.9375rem] transition-colors ${
                  pressed ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink"
                }`}
              >
                {o.label}
                <span className={`num text-[0.6875rem] ${pressed ? "text-orange" : "text-muted"}`}>{o.count}</span>
              </button>
            );
          })}
        </div>
        <p aria-live="polite" className="label shrink-0 text-muted">
          {shown} {shown === 1 ? "foto" : "foto's"}
          {activeLabel ? ` · ${activeLabel}` : ""}
        </p>
      </div>
      {children}
    </div>
  );
}
