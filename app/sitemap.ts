import type { MetadataRoute } from "next";
import { caseStudies, resourceArticles, solutionHubs } from "./lib/content";
import { industrias } from "./lib/industrias";
import { alternatePaths } from "./lib/i18n/config";
import { enCaseStudies } from "./lib/i18n/en/content";
import { enServices } from "./lib/i18n/en/services";
import { getCases } from "./lib/portfolio";
import { PORTFOLIO_REVIEWED } from "./lib/portfolio/ui";
import { CONTENT_LAST_UPDATED } from "./lib/seo";
import { services, siteConfig } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const socialImage = `${siteConfig.url}/og.jpg`;
  const entry = (
    path: string,
    priority: number,
    changeFrequency: "weekly" | "monthly" | "yearly" = "monthly",
    lastModified: string = CONTENT_LAST_UPDATED,
  ) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
    images: [socialImage],
  });

  return [
    entry("", 1, "monthly", PORTFOLIO_REVIEWED),
    entry("/servicios", 0.95),
    entry("/casos", 0.95, "monthly", PORTFOLIO_REVIEWED),
    entry("/proyectos", 0.8, "monthly", PORTFOLIO_REVIEWED),
    entry("/recursos", 0.9, "weekly"),
    entry("/nosotros", 0.85, "monthly", PORTFOLIO_REVIEWED),
    entry("/contacto", 0.85, "monthly", PORTFOLIO_REVIEWED),
    entry("/venezuela", 0.95),
    ...solutionHubs.map((hub) => entry(`/soluciones/${hub.slug}`, 0.9)),
    ...industrias.map((industria) => entry(`/industrias/${industria.slug}`, 0.95)),
    ...services.map((service) => entry(`/servicios/${service.slug}`, service.category === "dev" ? 0.9 : 0.85)),
    ...getCases("es").map((item) => entry(`/casos/${item.slug}`, 0.9, "monthly", item.reviewed)),
    ...caseStudies.map((item) => entry(`/casos/${item.slug}`, 0.7, "yearly")),
    ...resourceArticles.map((article) => entry(`/recursos/${article.slug}`, 0.88, "monthly", article.updatedAt)),

    // Árbol inglés. Va en el mismo sitemap a propósito: son el mismo sitio y
    // Google empareja los idiomas por el hreflang de cada página, no por tener
    // un sitemap separado. Las legales quedan fuera porque van con noindex,
    // igual que sus equivalentes en español.
    entry("/en", 0.9, "monthly", PORTFOLIO_REVIEWED),
    entry("/en/services", 0.88),
    entry("/en/cases", 0.88, "monthly", PORTFOLIO_REVIEWED),
    entry("/en/projects", 0.75, "monthly", PORTFOLIO_REVIEWED),
    entry("/en/about", 0.8, "monthly", PORTFOLIO_REVIEWED),
    entry("/en/contact", 0.8, "monthly", PORTFOLIO_REVIEWED),
    ...enServices.map((service) => entry(`/en/services/${service.slug}`, service.category === "dev" ? 0.85 : 0.8)),
    ...getCases("en").map((item) => entry(`/en/cases/${item.slug}`, 0.85, "monthly", item.reviewed)),
    ...enCaseStudies.map((item) => entry(`/en/cases/${item.slug}`, 0.65, "yearly")),
  ];
}

/**
 * Comprueba que cada ruta española del sitemap con equivalente inglés apunte a
 * una URL que realmente se genera. Un hreflang hacia un 404 hace que Google
 * desconfíe del resto de las anotaciones del sitio.
 */
export function hreflangPairs() {
  return [
    ...services.map((s) => `/servicios/${s.slug}`),
    ...getCases("es").map((c) => `/casos/${c.slug}`),
    ...caseStudies.map((c) => `/casos/${c.slug}`),
  ]
    .map((esPath) => ({ esPath, ...alternatePaths(esPath) }));
}
