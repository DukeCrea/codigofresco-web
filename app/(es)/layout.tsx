import { sora } from "../fonts";
import type { Metadata, Viewport } from "next";
import { services, siteConfig } from "../lib/site";
import { AnalyticsScripts } from "../analytics-scripts";
import { defaultSocialImage, organizationId, personId, serializeJsonLd, websiteId } from "../lib/seo";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: "Antonio Duque | Estrategias y sistemas para marketing, ventas y operación",
    template: "%s | Código Fresco",
  },
  description:
    "Portafolio de Antonio Duque, creador de ZoDesk: estrategia de marketing, CRM, automatización e integraciones que conectan captación, ventas y operación. Trabajo remoto con Panamá, Venezuela y España.",
  keywords: [
    "Antonio Duque",
    "ZoDesk",
    "implementación CRM",
    "Zoho CRM",
    "automatización de marketing",
    "procesos comerciales",
    "integración SAINT e-commerce",
    "software para concesionarios",
    "software para talleres",
    "reporting automatizado",
  ],
  authors: [{ name: "Antonio Duque", url: `${siteConfig.url}/nosotros` }],
  creator: "Antonio Duque",
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
    languages: {
      // Google solo hace caso al hreflang cuando las dos páginas se señalan
      // entre sí: la portada inglesa devuelve exactamente este mismo par.
      es: "/",
      en: "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_PA",
    url: "/",
    siteName: siteConfig.name,
    title: "Antonio Duque: estrategias y sistemas que conectan marketing, ventas y operación",
    description:
      "Casos reales de marketing dinámico, chatform de financiamiento, paneles, reportes automatizados, integración con SAINT y ZoDesk, con el estado verificado de cada pieza.",
    images: [defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Antonio Duque: estrategias y sistemas para marketing, ventas y operación",
    description: "Creo la estrategia y también la herramienta. Casos con su estado real.",
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

/**
 * Entidad del sitio. Sin dirección física ni rango de precios: el trabajo es
 * remoto y no se publican tarifas. Las áreas de servicio son mercados donde
 * hay experiencia real, no oficinas.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/logo-codigofresco.png`, width: 512, height: 512 },
      image: `${siteConfig.url}/og.jpg`,
      email: siteConfig.email,
      telephone: `+${siteConfig.whatsappNumber}`,
      description:
        "Estrategia de marketing, CRM, automatización e integraciones para conectar captación, ventas y operación. Servicio remoto.",
      founders: [
        { "@type": "Person", "@id": personId, name: "Antonio Duque" },
        { "@type": "Person", "@id": `${siteConfig.url}/nosotros#noe-rivas`, name: "Noe Rivas" },
      ],
      areaServed: [
        { "@type": "Country", name: "Panamá" },
        { "@type": "Country", name: "Venezuela" },
        { "@type": "Country", name: "España" },
      ],
      sameAs: [siteConfig.instagram],
      knowsAbout: [
        "Implementación de CRM",
        "Zoho CRM",
        "Automatización de marketing y procesos comerciales",
        "Integración de e-commerce con ERP",
        "Software para concesionarios y talleres",
        "Paneles y reporting",
        "Desarrollo web",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios de Código Fresco",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            url: `${siteConfig.url}/servicios/${service.slug}`,
            description: service.metaDescription,
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteConfig.url,
      name: siteConfig.name,
      inLanguage: "es",
      publisher: { "@id": organizationId },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
        {children}
        <AnalyticsScripts />
      </body>
    </html>
  );
}
