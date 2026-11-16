import { faqJsonLd } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

/** Veelgestelde vragen als rustige uitklappers, met FAQPage-JSON-LD. */
export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <>
      <div className="border-t border-line">
        {items.map((item) => (
          <details key={item.q} className="group border-b border-line">
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
              <span className="display-sm">{item.q}</span>
              <span aria-hidden className="relative block h-3 w-3 shrink-0">
                <span className="absolute left-0 top-1/2 h-px w-3 bg-current" />
                <span className="absolute left-1/2 top-0 h-3 w-px bg-current transition-transform duration-300 group-open:scale-y-0" />
              </span>
            </summary>
            <p className="max-w-2xl pb-7 text-ink/75">{item.a}</p>
          </details>
        ))}
      </div>
      <JsonLd data={faqJsonLd(items)} />
    </>
  );
}
