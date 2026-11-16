# Okkema Workum: conceptwebsite

Conceptwebsite (demonstratie) voor Okkema Workum BV, ter vervanging van okkema.frl.
Gemaakt door De Webtandem. Eigen ontwerp: dezelfde rustige, verzorgde sfeer als de Vellinga-conceptsite, maar met een eigen opbouw (losse pagina's, eigen composities).
**Geen officiële website.** Het contactformulier staat in demonstratiemodus.

## Starten

Vereist: Node.js 20.9 of hoger.

```bash
npm install
npm run dev          # ontwikkelserver op http://localhost:3000
npm run build && npm run start   # productiebuild
```

Controles: `npm run lint` (ESLint) en `npm run build` (inclusief TypeScript).

## Demo-link (GitHub Pages)

De demo staat op **https://de-webtandem.github.io/voorbeeldwebsite-okkemaworkum/** en wordt bij elke push naar `main` automatisch opnieuw gepubliceerd (`.github/workflows/pages.yml`).

Die build (`scripts/build-pages.sh`) maakt een statische export in een submap: zonder server, dus zonder redirects, beeldoptimalisatie en Cache Components, en altijd noindex. Paden naar bestanden in `/public` gaan daarom via `asset()` uit `src/lib/asset.ts`. Draai het script alleen in een schone checkout: het verwijdert `robots.ts` en `sitemap.ts`.

## Omgevingsvariabelen (allemaal optioneel)

| Variabele | Standaard | Doel |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://okkema.frl` | Basis voor canonicals, sitemap en JSON-LD |
| `NEXT_PUBLIC_NOINDEX` | – | `true` op demo/preview: hele site noindex, robots.txt blokkeert alles |
| `ENABLE_LEGACY_REDIRECTS` | – | `true` activeert 301's van oude URL's (`betonwerken.html`, `impressies.html`, …). Alleen bij overname van het domein. |

## Design system

- **Kleuren** (`src/app/globals.css`, `@theme`): `orange` #F39200 en `anthracite` #3C3C3B uit het logo; `ink` #252525, `paper` #F5F5F3, `muted` #686866.
  Oranje knoppen hebben altijd donkere tekst (8:1). Wit op oranje haalt maar 2,3:1, dus dat wordt niet gebruikt. `muted` is iets donkerder dan de #777775 uit de briefing, zodat kleine tekst AA haalt.
- **Typografie**: Barlow Condensed 600/700 voor koppen (`display-*`), Inter voor tekst en UI, beide self-hosted via `next/font`.
- **Sfeer**: veel witruimte, grote foto's, koppen in Barlow Condensed (gewone schrijfwijze), oranje alleen voor knoppen en kleine accenten (het vierkantje in `Eyebrow` verwijst naar het logo). Afwisseling tussen `paper` en witte secties, één donkere contactband.
- **Beweging**: hero-foto komt rustig binnen (`.settle`), blokken schuiven zacht in bij scrollen (`.fade-up`); uit bij `prefers-reduced-motion`.

## Structuur

Losse pagina's, gelijk aan de huidige site:
`/` · `/betonwerken` · `/betonvloeren` · `/bouwmaatvoering` · `/impressies` · `/over-okkema` · `/contact` · `/privacyverklaring`.

```
src/
  app/                     pagina's (dienstpagina's gebruiken components/ServicePage.tsx)
  components/              SiteHeader, SiteFooter, ServicePage, Eyebrow, CtaBand, FaqList,
                           ImpressionGallery (lightbox), ImpressionFilter, Photo, …
  data/
    company.ts             NAW, telefoon (Cornelis en Minne), e-mail, Facebook
    services.ts            diensten: teksten, werkzaamheden, toelichting en FAQ
    impressions.ts         alle foto's met categorie en beschrijvende titel
    imageRequirements.ts   alle beeldvakken (verhouding, uitsnede, alt)
    werkwijze.ts           werkwijze in vijf stappen
    redirects.ts           redirects
public/images/             logo (origineel + variant voor donkere achtergrond), beeldmerk, foto/
```


## Inhoud en bronnen

- Alle teksten zijn gebaseerd op okkema.frl (Home, Betonwerken, Betonvloeren, Bouwmaatvoering, Over Okkema, Contact). Er zijn geen projecten, reviews, jaartallen of certificeringen verzonnen.
- **Impressies in plaats van projecten**: de huidige site heeft geen projectbeschrijvingen. De titels beschrijven alleen wat er op de foto te zien is. Plaats en opdracht kunnen per foto worden aangevuld via `location` in `impressions.ts`.
- De bronfoto's zijn maximaal 1200 px breed (de 1100 px-banners zijn kleiner). Voor grote beeldvlakken is nieuwe fotografie beter. Nieuwe fotografie (≥ 2400 px) verbetert dat direct: zet de bestanden in `public/images/foto/` en pas `imageRequirements.ts` aan.

## Open punten voor de klant

- KvK-nummer (staat niet op de huidige site, daarom nergens getoond).
- Toestemming voor hergebruik van de foto's en, liefst, nieuwe fotografie in hoge resolutie.
- Plaats/opdracht bij foto's, als die vermeld mogen worden.
- Contactformulier koppelen: `src/components/ContactForm.tsx`, `DEMO_MODE = false` plus een verzenddienst.
- Privacyverklaring juridisch laten controleren.
