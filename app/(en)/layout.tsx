import type { Metadata, Viewport } from "next";
import { AnalyticsScripts } from "../analytics-scripts";
import { enServices } from "../lib/i18n/en/services";
import { defaultSocialImage, organizationId, serializeJsonLd, websiteId } from "../lib/seo";
import { siteConfig } from "../lib/site";
import "../globals.css";

/**
 * Layout raíz del árbol inglés.
 *
 * Existe como grupo de rutas aparte por una razón concreta: en Next solo el
 * layout raíz puede escribir `<html lang>`, y solo hay un layout raíz por
 * grupo. Sin esta separación las páginas inglesas se servirían declaradas como
 * español, que es un error para los lectores de pantalla y una señal
 * contradictoria para los buscadores.
 *
 * El precio es que navegar entre idiomas recarga la página entera. Es
 * aceptable: se cambia de idioma una vez, no en cada clic.
 */

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: "Software, Automation and AI Agency | CodigoFresco",
    template: "%s | CodigoFresco",
  },
  description:
    "Software, e-commerce, AI automation and paid media for growing companies. A remote senior team building B2B digital infrastructure across US time zones.",
  keywords: [
    "CodigoFresco",
    "software development agency",
    "custom software development",
    "WordPress development",
    "Shopify development",
    "e-commerce development",
    "landing pages",
    "AI automation",
    "AI chatbot",
    "SEO and GEO",
    "Google Ads management",
    "Meta Ads management",
    "data dashboards",
  ],
  authors: [{ name: "Antonio Duque" }, { name: "Noe Rivas" }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/en",
    languages: { en: "/en", es: "/", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/en",
    siteName: siteConfig.name,
    title: "CodigoFresco - Software, automation and AI for business",
    description:
      "Web infrastructure, e-commerce, WordPress, Shopify, custom software, automation, SEO/GEO, ads and intelligent dashboards.",
    images: [defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodigoFresco - Software, automation and AI for business",
    description:
      "Digitize your business with systems, automation, ads, SEO/GEO and AI-assisted marketing.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      // Mismo @id que el grafo español a propósito: es la MISMA empresa. Dos
      // identificadores distintos le dirían a Google que son dos negocios.
      "@type": ["ProfessionalService", "LocalBusiness", "Organization"],
      "@id": organizationId,
      name: siteConfig.name,
      url: `${siteConfig.url}/en`,
      logo: `${siteConfig.url}/icon.svg`,
      image: `${siteConfig.url}/og.jpg`,
      email: siteConfig.email,
      telephone: `+${siteConfig.whatsappNumber}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Panama City",
        addressCountry: "PA",
      },
      priceRange: "$$",
      description:
        "A technology firm for digital infrastructure: web development, WordPress, Shopify, custom software, automation, ads, SEO/GEO, dashboards and AI.",
      founders: [
        { "@type": "Person", "@id": `${siteConfig.url}/nosotros#antonio-duque`, name: "Antonio Duque" },
        { "@type": "Person", "@id": `${siteConfig.url}/nosotros#noe-rivas`, name: "Noe Rivas" },
      ],
      sameAs: [siteConfig.instagram],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "CodigoFresco solutions",
        itemListElement: enServices.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            url: `${siteConfig.url}/en/services/${service.slug}`,
            description: service.metaDescription,
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${websiteId}-en`,
      url: `${siteConfig.url}/en`,
      name: siteConfig.name,
      inLanguage: "en",
      publisher: { "@id": organizationId },
    },
  ],
};

export default function EnglishRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
        {children}
        <AnalyticsScripts lang="en" />
      </body>
    </html>
  );
}
