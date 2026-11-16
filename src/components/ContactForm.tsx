"use client";

import Link from "next/link";
import { useId, useRef, useState, type FormEvent } from "react";
import { company } from "@/data/company";

/**
 * DEMONSTRATIEMODUS: er is (nog) geen backend of verzenddienst gekoppeld.
 * Het formulier valideert volledig, maar verstuurt niets. Na invullen kan de
 * bezoeker het bericht via het eigen e-mailprogramma versturen (mailto).
 * Koppel later bijvoorbeeld een server action of formulierdienst en zet
 * DEMO_MODE op false.
 */
const DEMO_MODE = true;

const subjects = ["Betonwerken", "Betonvloeren", "Bouwmaatvoering", "Combinatie van werkzaamheden", "Iets anders"];

type Field = "naam" | "email" | "telefoon" | "onderwerp" | "plaats" | "bericht";
type Errors = Partial<Record<Field, string>>;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  const naam = String(data.get("naam") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const telefoon = String(data.get("telefoon") ?? "").trim();
  const bericht = String(data.get("bericht") ?? "").trim();
  if (naam.length < 2) errors.naam = "Vul uw naam in.";
  if (!email) errors.email = "Vul uw e-mailadres in.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = "Dit e-mailadres lijkt niet te kloppen. Controleer het formaat, bijvoorbeeld naam@voorbeeld.nl.";
  if (telefoon && !/^[+\d][\d\s-]{7,}$/.test(telefoon)) errors.telefoon = "Dit telefoonnummer lijkt niet te kloppen.";
  if (bericht.length < 10) errors.bericht = "Vertel ons kort waar uw vraag over gaat (minimaal 10 tekens).";
  return errors;
}

export function ContactForm() {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [mailto, setMailto] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const found = validate(data);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      setMailto(null);
      return;
    }
    if (DEMO_MODE) {
      const get = (k: string) => String(data.get(k) ?? "").trim();
      const body = [
        get("bericht"),
        "",
        `Naam: ${get("naam")}`,
        `E-mail: ${get("email")}`,
        get("telefoon") && `Telefoon: ${get("telefoon")}`,
        get("plaats") && `Plaats van het project: ${get("plaats")}`,
      ]
        .filter((l) => l !== "" && l !== undefined)
        .join("\n");
      const subject = `${get("onderwerp") || "Vraag"} via de website`;
      setMailto(`mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  const fieldClass = (f: Field) =>
    `mt-2 block w-full rounded-[2px] border bg-white px-4 py-3.5 text-base text-ink transition-colors placeholder:text-ink/40 focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
      errors[f] ? "border-[#a3261b]" : "border-ink/25 hover:border-ink/50"
    }`;

  const describe = (f: Field, hint?: boolean) =>
    [hint ? `${id}-${f}-hint` : null, errors[f] ? `${id}-${f}-error` : null].filter(Boolean).join(" ") || undefined;

  const errorText = (f: Field) =>
    errors[f] ? (
      <p id={`${id}-${f}-error`} className="mt-2 flex items-start gap-2 text-sm text-[#a3261b]">
        <span aria-hidden className="font-semibold">!</span>
        {errors[f]}
      </p>
    ) : null;

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-describedby={`${id}-demo`} className="grid gap-7">
      {DEMO_MODE && (
        <div id={`${id}-demo`} className="border-l-4 border-orange bg-stone px-5 py-4 text-[0.9375rem]">
          <p className="label text-ink">Demonstratiemodus</p>
          <p className="mt-1.5 text-ink/80">
            Dit formulier is nog niet gekoppeld en verstuurt geen berichten. Bel{" "}
            <a href={company.phone.href} className="link-line text-ink">
              {company.phone.display}
            </a>{" "}
            of mail naar{" "}
            <a href={`mailto:${company.email}`} className="link-line text-ink">
              {company.email}
            </a>
            .
          </p>
        </div>
      )}

      <div className="grid gap-7 md:grid-cols-2">
        <div>
          <label htmlFor={`${id}-naam`} className="text-[0.9375rem] font-medium">
            Naam <span className="text-muted">(verplicht)</span>
          </label>
          <input id={`${id}-naam`} name="naam" type="text" autoComplete="name" required aria-invalid={Boolean(errors.naam)} aria-describedby={describe("naam")} className={fieldClass("naam")} />
          {errorText("naam")}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="text-[0.9375rem] font-medium">
            E-mailadres <span className="text-muted">(verplicht)</span>
          </label>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" inputMode="email" required aria-invalid={Boolean(errors.email)} aria-describedby={describe("email")} className={fieldClass("email")} />
          {errorText("email")}
        </div>
        <div>
          <label htmlFor={`${id}-telefoon`} className="text-[0.9375rem] font-medium">
            Telefoonnummer
          </label>
          <input id={`${id}-telefoon`} name="telefoon" type="tel" autoComplete="tel" inputMode="tel" aria-invalid={Boolean(errors.telefoon)} aria-describedby={describe("telefoon", true)} className={fieldClass("telefoon")} />
          <p id={`${id}-telefoon-hint`} className="mt-2 text-sm text-muted">
            Liever gebeld? Laat uw nummer achter.
          </p>
          {errorText("telefoon")}
        </div>
        <div>
          <label htmlFor={`${id}-plaats`} className="text-[0.9375rem] font-medium">
            Plaats van het project
          </label>
          <input id={`${id}-plaats`} name="plaats" type="text" autoComplete="address-level2" className={fieldClass("plaats")} />
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-onderwerp`} className="text-[0.9375rem] font-medium">
          Waar gaat uw vraag over?
        </label>
        <select id={`${id}-onderwerp`} name="onderwerp" defaultValue="" className={`${fieldClass("onderwerp")} appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10`} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1.5 6 6.5l5-5' fill='none' stroke='%23252525' stroke-width='1.5'/%3E%3C/svg%3E\")" }}>
          <option value="">Maak een keuze</option>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={`${id}-bericht`} className="text-[0.9375rem] font-medium">
          Uw bericht <span className="text-muted">(verplicht)</span>
        </label>
        <textarea id={`${id}-bericht`} name="bericht" rows={6} required aria-invalid={Boolean(errors.bericht)} aria-describedby={describe("bericht", true)} className={`${fieldClass("bericht")} resize-y`} />
        <p id={`${id}-bericht-hint`} className="mt-2 text-sm text-muted">
          Beschrijf kort het werk, bijvoorbeeld het type vloer of fundering en de globale afmetingen. Een tekening kunt u later meesturen.
        </p>
        {errorText("bericht")}
      </div>

      <div className="flex flex-col gap-5 border-t border-line pt-7 md:flex-row md:items-center md:justify-between">
        <p className="max-w-md text-sm text-muted">
          Wij gebruiken uw gegevens alleen om op uw vraag te reageren. Lees de{" "}
          <Link href="/privacyverklaring" className="link-line text-ink">
            privacyverklaring
          </Link>
          .
        </p>
        <button type="submit" className="group inline-flex min-h-12 shrink-0 items-center justify-between gap-6 rounded-[2px] bg-orange px-6 py-3 font-semibold text-ink transition-colors hover:bg-orange-deep">
          {DEMO_MODE ? "Bericht controleren" : "Bericht versturen"}
          <svg aria-hidden viewBox="0 0 20 20" fill="none" className="h-4 w-4 transition-transform group-hover:translate-x-1">
            <path d="M3 10h13M11 4.5 16.5 10 11 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </button>
      </div>

      <div ref={statusRef} tabIndex={-1} role="status" className="focus:outline-none">
        {mailto && (
          <div className="border border-ink bg-paper p-6">
            <p className="label">Niet verzonden: demonstratieversie</p>
            <p className="mt-2 text-ink/80">
              Uw gegevens zijn correct ingevuld, maar dit conceptformulier verstuurt nog niets. U kunt het bericht direct
              vanuit uw eigen e-mailprogramma versturen; de inhoud staat al klaar.
            </p>
            <a href={mailto} className="mt-5 inline-flex min-h-12 items-center rounded-[2px] bg-orange px-6 font-semibold text-ink hover:bg-orange-deep">
              Open in uw e-mailprogramma
            </a>
          </div>
        )}
      </div>
    </form>
  );
}
