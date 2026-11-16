"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { company } from "@/data/company";
import { mainNav, primaryCta } from "@/data/navigation";
import { ArrowRight } from "./Icons";

/** Rustige, vaste header: logo, navigatie en één duidelijke offerteknop. */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) buttonRef.current?.focus();
  }, []);

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const f = [buttonRef.current, ...panel.querySelectorAll<HTMLElement>("a")].filter(Boolean) as HTMLElement[];
      if (e.shiftKey && document.activeElement === f[0]) {
        e.preventDefault();
        f[f.length - 1].focus();
      } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
        e.preventDefault();
        f[0].focus();
      }
    };
    const onResize = () => window.innerWidth >= 1280 && close(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-paper/95 backdrop-blur transition-colors duration-500 ${
        scrolled || open ? "border-line" : "border-transparent"
      }`}
    >
      <a href="#inhoud" className="sr-only z-[60] bg-orange px-4 py-3 text-ink focus:not-sr-only focus:absolute focus:left-4 focus:top-3">
        Direct naar de inhoud
      </a>
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-8 lg:h-24">
        <Link href="/" className="shrink-0" aria-label={`${company.name}, naar de homepage`}>
          <Image src="/images/okkema-logo.png" alt="" width={1997} height={498} priority sizes="(min-width: 1024px) 210px, 168px" className="h-[42px] w-auto lg:h-[52px]" />
        </Link>

        <nav aria-label="Hoofdmenu" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative px-3.5 py-2 text-[0.9375rem] font-medium transition-colors duration-300 ${
                      active ? "text-ink" : "text-ink/60 hover:text-ink"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 bg-orange transition-transform duration-300 ease-out-quart ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={primaryCta.href}
            className="group hidden min-h-11 items-center gap-4 rounded-[2px] bg-orange px-5 text-[0.9375rem] font-semibold text-ink transition-colors hover:bg-orange-deep sm:inline-flex"
          >
            {primaryCta.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <button
            ref={buttonRef}
            type="button"
            className="inline-flex min-h-11 items-center gap-3 px-1 text-[0.9375rem] font-medium xl:hidden"
            aria-expanded={open}
            aria-controls="mobiel-menu"
            onClick={() => (open ? close() : setOpen(true))}
          >
            {open ? "Sluiten" : "Menu"}
            <span aria-hidden className="relative block h-3 w-6">
              <span className={`absolute left-0 top-0 h-px w-6 bg-current transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-px w-6 bg-current transition-transform ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      <div id="mobiel-menu" ref={panelRef} hidden={!open} className="absolute inset-x-0 top-full h-[calc(100dvh-4.5rem)] overflow-y-auto bg-paper xl:hidden">
        <nav aria-label="Mobiel menu" className="wrap flex min-h-full flex-col justify-between gap-10 py-8">
          <ul className="border-t border-line">
            {mainNav.map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-[family-name:var(--font-display)] text-[2rem] font-semibold leading-tight"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3">
            <Link href={primaryCta.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center justify-between rounded-[2px] bg-orange px-5 font-semibold text-ink">
              {primaryCta.label}
              <ArrowRight />
            </Link>
            {company.contacts.map((c) => (
              <a key={c.name} href={c.href} className="flex min-h-12 items-center justify-between border border-line-strong px-5">
                <span>Bel {c.name}</span>
                <span className="font-medium">{c.display}</span>
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
