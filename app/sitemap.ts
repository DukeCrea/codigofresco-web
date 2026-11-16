import { pageDates } from "./lib/content-dates";
import type { MetadataRoute } from "next";
import { getBlogPosts } from "./lib/blog";
import { caseStudies, resourceArticles, solutionHubs } from "./lib/content";
import { industrias } from "./lib/industrias";
import { alternatePaths } from "./lib/i18n/config";
import { enCaseStudies } from "./lib/i18n/en/content";
import { enServices } from "./lib/i18n/en/services";
import { getCases } from "./lib/portfolio";
import { services, siteConfig } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const socialImage = `${siteConfig.url}/og.jpg`;
  const entry = (
    path: string,
    priority: number,
    changeFrequency: "weekly" | "monthly" | "yearly" = "monthly",
  ) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: pageDates(path || "/").modified,
    changeFrequency,
    priority,
    images: [socialImage],
  });

  return [
    entry("", 1, "monthly"),
    entry("/servicios", 0.95),
    entry("/casos", 0.95, "monthly"),
    entry("/proyectos", 0.8, "monthly"),
    entry("/recursos", 0.9, "weekly"),
    entry("/blog", 0.9, "weekly"),
    entry("/nosotros", 0.85, "monthly"),
    entry("/contacto", 0.85, "monthly"),
    entry("/venezuela", 0.95),
    ...solutionHubs.map((hub) => entry(`/soluciones/${hub.slug}`, 0.9)),
    ...industrias.map((industria) => entry(`/industrias/${industria.slug}`, 0.95)),
    ...services.map((service) => entry(`/servicios/${service.slug}`, service.category === "dev" ? 0.9 : 0.85)),
    ...getCases("es").map((item) => entry(`/casos/${item.slug}`, 0.9, "monthly")),
    ...caseStudies.map((item) => entry(`/casos/${item.slug}`, 0.7, "yearly")),
    ...resourceArticles.map((article) => entry(`/recursos/${article.slug}`, 0.88, "monthly")),
    ...getBlogPosts().map((post) => ({
      ...entry(`/blog/${post.slug}`, 0.88, "monthly"),
      images: [`${siteConfig.url}${post.shareImage.src}`],
      ...(post.video ? { videos: [{ title: post.title, thumbnail_loc: `${siteConfig.url}${post.video.poster}`, description: post.video.description, content_loc: `${siteConfig.url}${post.video.src}` }] } : {}),
    })),

    // Árbol inglés. Va en el mismo sitemap a propósito: son el mismo sitio y
    // Google empareja los idiomas por el hreflang de cada página, no por tener
    // un sitemap separado. Las legales quedan fuera porque van con noindex,
    // igual que sus equivalentes en español.
    entry("/en", 0.9, "monthly"),
    entry("/en/services", 0.88),
    entry("/en/cases", 0.88, "monthly"),
    entry("/en/projects", 0.75, "monthly"),
    entry("/en/about", 0.8, "monthly"),
    entry("/en/contact", 0.8, "monthly"),
    ...enServices.map((service) => entry(`/en/services/${service.slug}`, service.category === "dev" ? 0.85 : 0.8)),
    ...getCases("en").map((item) => entry(`/en/cases/${item.slug}`, 0.85, "monthly")),
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
