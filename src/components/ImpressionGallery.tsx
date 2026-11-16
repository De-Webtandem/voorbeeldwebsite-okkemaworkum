"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { categoryLabels, impressionSlot, type Impression } from "@/data/impressions";
import { ArrowRight } from "./Icons";
import { Photo } from "./Photo";
import { asset } from "@/lib/asset";

/**
 * Fotogrid met lightbox (native <dialog>: focus-trap, Escape en
 * achtergrond-inert zitten in de browser). Pijltoetsen bladeren.
 * De foto's staan als gewone afbeeldingen in de HTML (vindbaar).
 */
export function ImpressionGallery({ items }: { items: Impression[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [current, setCurrent] = useState<number | null>(null);

  const open = (i: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setCurrent(i);
    dialogRef.current?.showModal();
  };

  const close = useCallback(() => dialogRef.current?.close(), []);
  /** Indexen van de foto's die het actieve filter toont. */
  const visible = useCallback(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-gallery-item]");
    const idx = Array.from(els)
      .filter((el) => el.offsetParent !== null)
      .map((el) => Number(el.dataset.galleryItem));
    return idx.length ? idx : items.map((_, i) => i);
  }, [items]);

  const step = useCallback(
    (dir: 1 | -1) =>
      setCurrent((c) => {
        if (c === null) return c;
        const list = visible();
        const pos = Math.max(0, list.indexOf(c));
        return list[(pos + dir + list.length) % list.length];
      }),
    [visible],
  );
  const [position, setPosition] = useState({ at: 0, of: items.length });
  useEffect(() => {
    if (current === null) return;
    const list = visible();
    // Teller synchroniseren met het actieve filter (DOM is de bron).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPosition({ at: list.indexOf(current) + 1, of: list.length });
  }, [current, visible]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => {
      setCurrent(null);
      document.documentElement.style.overflow = "";
      triggerRef.current?.focus();
    };
    dialog.addEventListener("keydown", onKey);
    dialog.addEventListener("close", onClose);
    return () => {
      dialog.removeEventListener("keydown", onKey);
      dialog.removeEventListener("close", onClose);
    };
  }, [step]);

  useEffect(() => {
    if (current !== null) document.documentElement.style.overflow = "hidden";
  }, [current]);

  const item = current !== null ? items[current] : null;

  return (
    <>
      <ul className="mt-12 grid gap-x-[clamp(1rem,2vw,2rem)] gap-y-12 sm:grid-cols-2 lg:grid-cols-3 md:mt-16 md:gap-y-16">
        {items.map((imp, i) => (
          <li key={imp.file} data-cat={imp.category} data-gallery-item={i} >
            <figure className="group">
              <button
                type="button"
                onClick={(e) => open(i, e.currentTarget)}
                className="relative block w-full cursor-zoom-in overflow-hidden text-left"
                aria-label={`Vergroot: ${imp.title}`}
              >
                <span className="block transition-transform duration-700 ease-out-quart group-hover:scale-[1.02] motion-reduce:transform-none">
                  <Photo id={impressionSlot(imp)} aspectRatio="4/3" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                </span>
              </button>
              <figcaption className="mt-4">
                <span>
                  <span className="label block text-muted">{categoryLabels[imp.category]}</span>
                  <span className="display-sm mt-1.5 block text-[1.375rem]">{imp.title}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={item ? item.title : "Foto"}
        data-lenis-prevent
        className="on-dark m-0 h-dvh max-h-none w-screen max-w-none bg-ink/97 p-0 text-paper backdrop:bg-ink/80"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        {item && current !== null && (
          <div className="flex h-full flex-col">
            <div className="wrap flex h-16 shrink-0 items-center justify-between gap-4">
              <p className="num text-sm tracking-[0.14em] text-paper/70">
                <span className="text-orange">{String(position.at).padStart(2, "0")}</span> / {String(position.of).padStart(2, "0")}
              </p>
              <button type="button" onClick={close} className="inline-flex min-h-11 items-center gap-3 px-1 font-medium">
                Sluiten
                <span aria-hidden className="relative block h-3 w-4">
                  <span className="absolute left-0 top-1/2 h-px w-4 rotate-45 bg-current" />
                  <span className="absolute left-0 top-1/2 h-px w-4 -rotate-45 bg-current" />
                </span>
              </button>
            </div>
            <div className="relative min-h-0 flex-1" onClick={(e) => e.target === e.currentTarget && close()}>
              <Image
                key={item.file}
                src={asset(`/images/foto/${item.file}.jpg`)}
                alt={item.alt}
                fill
                sizes="100vw"
                quality={85}
                className="object-contain px-4 md:px-20"
              />
            </div>
            <div className="wrap flex shrink-0 flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="label text-paper/60">{categoryLabels[item.category]}</p>
                <p className="display-sm mt-1">{item.title}</p>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => step(-1)} className="inline-flex min-h-11 min-w-11 items-center justify-center border border-paper/30 transition-colors hover:border-paper" aria-label="Vorige foto">
                  <ArrowRight className="h-4 w-4 rotate-180" />
                </button>
                <button type="button" onClick={() => step(1)} className="inline-flex min-h-11 min-w-11 items-center justify-center border border-paper/30 transition-colors hover:border-paper" aria-label="Volgende foto">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
