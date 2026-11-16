import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { company } from "@/data/company";
import { isNoIndex, organizationJsonLd, siteUrl, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

// Koppen: Barlow Condensed (600/700). Tekst en UI: Inter (variabel).
// "latin" bevat Latin-1 (â, ô, ú, ë): voldoende voor Nederlands en Fries.
const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} | Betonwerken, betonvloeren en bouwmaatvoering`,
    template: `%s | ${company.name}`,
  },
  description:
    "Okkema Workum is gespecialiseerd in betonwerken, betonvloeren en bouwmaatvoering. Persoonlijk advies, korte lijnen en één aanspreekpunt.",
  applicationName: company.name,
  formatDetection: { telephone: false },
  robots: isNoIndex ? { index: false, follow: false } : { index: true, follow: true },
  openGraph: { locale: "nl_NL", siteName: company.name, type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#252525",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nl-NL" className={`${barlow.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main id="inhoud" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <SiteFooter />
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      </body>
    </html>
  );
}
