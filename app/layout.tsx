import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "@/app/globals.css";
import { JsonLd } from "@/components/seo/json-ld";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";

const headingFont = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-heading",
  display: "swap"
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Padel Bucaramanga | Directorio y Guías",
    template: "%s | Padel Bucaramanga"
  },
  description: siteConfig.description
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: absoluteUrl("/"),
  inLanguage: "es-CO",
  description: siteConfig.description
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
  return (
    <html lang="es-CO">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} antialiased`}
        style={{ fontFamily: "var(--font-body)" }}
      >
        <JsonLd data={websiteJsonLd} />
        <SiteHeader />
        <main className="mx-auto w-full max-w-6xl px-4 pt-10 md:px-8">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
