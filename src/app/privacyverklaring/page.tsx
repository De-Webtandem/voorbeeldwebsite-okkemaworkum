import { Breadcrumbs } from "@/components/Breadcrumbs";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacyverklaring en disclaimer",
  description: `Hoe ${company.legalName} omgaat met persoonsgegevens die u via de website, e-mail of telefoon met ons deelt, en de disclaimer van deze website.`,
  path: "/privacyverklaring",
});

/**
 * CONCEPTTEKST: juridisch laten controleren en aanvullen door/namens de klant
 * vóór livegang (o.a. bewaartermijnen en eventuele verwerkers).
 */
export default function PrivacyPage() {
  return (
    <section className="wrap grid gap-10 lg:grid-cols-12 pb-24 pt-8 md:pb-36 md:pt-10">
      <div className="lg:col-span-12">
        <Breadcrumbs items={[{ name: "Privacyverklaring", path: "/privacyverklaring" }]} />
      </div>
      <div className="lg:col-span-8">
        <h1 className="display-lg">Privacyverklaring en disclaimer</h1>
        <p className="lead mt-8 text-ink/80">
          {company.legalName} gaat zorgvuldig om met de persoonsgegevens die u met ons deelt. Op deze pagina leest u welke
          gegevens wij verwerken en waarom.
        </p>
      </div>

      <div className="prose-body space-y-12 text-ink/85 lg:col-span-7 [&_h2]:font-[family-name:var(--font-display)] [&_h2]:font-semibold [&_h2]:text-[1.75rem] [&_h2]:text-ink [&_h2]:mb-4">
        <div>
          <h2>Wie zijn wij</h2>
          <p>
            {company.legalName}, {company.address.street}, {company.address.postalCode} {company.address.city}. Voor vragen over privacy bereikt u ons via{" "}
            <a href={`mailto:${company.email}`} className="link-line text-ink">
              {company.email}
            </a>{" "}
            of{" "}
            <a href={company.phone.href} className="link-line text-ink">
              {company.phone.display}
            </a>
            .
          </p>
        </div>
        <div>
          <h2>Welke gegevens en waarvoor</h2>
          <p>
            Wanneer u ons belt, mailt of het contactformulier gebruikt, verwerken wij de gegevens die u zelf verstrekt, zoals
            uw naam, e-mailadres, telefoonnummer en de inhoud van uw bericht. Wij gebruiken deze gegevens uitsluitend om
            uw vraag te beantwoorden en, als u dat wilt, om een offerte of opdracht voor te bereiden.
          </p>
        </div>
        <div>
          <h2>Cookies en statistieken</h2>
          <p>
            Deze website plaatst geen tracking- of advertentiecookies en gebruikt geen externe statistiekdiensten. Kaarten
            worden niet op de website geladen; de routeknop opent pas na uw klik een externe kaartendienst.
          </p>
        </div>
        <div>
          <h2>Bewaren en delen</h2>
          <p>
            Wij bewaren uw gegevens niet langer dan nodig is voor het doel waarvoor ze zijn verstrekt, en delen ze niet met
            derden tenzij dat nodig is voor de uitvoering van een opdracht of wettelijk verplicht is.
          </p>
        </div>
        <div>
          <h2>Uw rechten</h2>
          <p>
            U heeft het recht om uw gegevens in te zien, te laten corrigeren of te laten verwijderen. Neem daarvoor contact
            met ons op. Een klacht kunt u indienen bij de Autoriteit Persoonsgegevens.
          </p>
        </div>
        <div id="disclaimer" className="scroll-mt-24 border-t border-line pt-12">
          <h2>Disclaimer</h2>
          <p>
            Aan het actueel houden van de informatie en de beelden op deze website wordt veel zorg besteed. Door technische
            storingen, onvoorziene omstandigheden of menselijke vergissingen kan informatie toch onjuist of onvolledig zijn.
            Aan de inhoud van deze website kunnen geen rechten worden ontleend.
          </p>
          <p>
            Zonder schriftelijke toestemming mag geen gebruik worden gemaakt van tekst- en beeldmateriaal van deze website.
            Ziet u een fout? Wij stellen het op prijs als u ons dat laat weten.
          </p>
        </div>
      </div>
    </section>
  );
}
