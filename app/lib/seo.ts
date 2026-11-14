import type { Metadata } from "next";

import { alternatePaths } from "./i18n/config";
import type { Locale } from "./i18n/config";
import { siteConfig } from "./site";

export const CONTENT_LAST_UPDATED = "2026-08-17";
export const organizationId = `${siteConfig.url}/#organization`;
export const websiteId = `${siteConfig.url}/#website`;
export const personId = `${siteConfig.url}/nosotros#antonio-duque`;

/**
 * Entidad de Antonio Duque. Todo lo que dice debe estar visible en "Sobre mí":
 * Google pide que los datos estructurados coincidan con el contenido.
 */
export function personJsonLd(lang: Locale = "es") {
  return {
    "@type": "Person",
    "@id": personId,
    name: "Antonio Duque",
    url: `${siteConfig.url}${lang === "es" ? "/nosotros" : "/en/about"}`,
    jobTitle:
      lang === "es"
        ? "Estratega de marketing y creador de sistemas comerciales"
        : "Marketing strategist and builder of sales systems",
    description:
      lang === "es"
        ? "Trabaja en marketing y procesos comerciales desde 2016. Creador de ZoDesk. Conecta marketing, ventas y operación con estrategia, CRM, automatización y productos digitales."
        : "Working in marketing and sales processes since 2016. Creator of ZoDesk. Connects marketing, sales and operations through strategy, CRM, automation and digital products.",
    worksFor: { "@id": organizationId },
    knowsAbout: [
      "Estrategia de marketing",
      "CRM",
      "Zoho CRM",
      "Automatización de marketing",
      "Captación y cualificación de leads",
      "Integración de e-commerce con ERP",
      "SAINT",
      "Paneles y reporting",
      "Marketing para concesionarios",
    ],
    knowsLanguage: [{ "@type": "Language", name: "Spanish", alternateName: "es" }],
  };
}

export const defaultSocialImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "Código Fresco · Antonio Duque: estrategias y sistemas que conectan marketing, ventas y operación",
};

export function buildMetadata({
  title,
  description,
  path,
  locale = "es_PA",
  index = true,
  lang = "es",
  esPath,
}: {
  title: string;
  description: string;
  /** Ruta canónica de ESTA página, en su propio idioma. */
  path: string;
  locale?: "es_PA" | "es_VE" | "en_US";
  index?: boolean;
  lang?: Locale;
  /**
   * Ruta española equivalente. Solo hace falta en las páginas inglesas, que no
   * pueden deducirla de su propia URL. Sin ella no se emite `hreflang` y cada
   * idioma competiría contra el otro en los resultados.
   */
  esPath?: string;
}): Metadata {
  const canonical = path === "/" ? "/" : path;
  const pair = alternatePaths(lang === "en" ? (esPath ?? "/") : canonical);
  const languages: Record<string, string> = { es: pair.es };
  if (pair.en) languages.en = pair.en;
  languages["x-default"] = pair.es;

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      locale: lang === "en" ? "en_US" : locale,
      url: canonical,
      title,
      description,
      siteName: siteConfig.name,
      images: [defaultSocialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultSocialImage.url],
    },
    robots: index
      ? undefined
      : {
          index: false,
          follow: true,
        },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${siteConfig.url}${items.at(-1)?.path || "/"}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
