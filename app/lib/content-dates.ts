import dates from "./generated/content-dates.json";
import { getBlogPost } from "./blog";
import { resourceArticles } from "./content";
import { getCaseBySlug } from "./portfolio";

/** Fechas editoriales primero; Git es el respaldo para contenido sin fecha propia. */
export function pageDates(path: string) {
  const en = path === "/en" || path.startsWith("/en/");
  const base = en ? "app/(en)/en" : "app/(es)";
  const route = en ? path.slice(3) || "/" : path || "/";
  const files = [`${base}${route === "/" ? "" : route}/page.tsx`];
  let published: string | undefined;
  let modified: string | undefined;
  const slug = route.split("/").at(-1)!;
  if (/^\/(casos|cases)\//.test(route)) {
    const item = getCaseBySlug(en ? "en" : "es", slug);
    files.splice(0, 1, `${base}/${en ? "cases" : "casos"}/[slug]/page.tsx`);
    if (item) {
      files.push(`app/lib/portfolio/cases-${en ? "en" : "es"}.ts`);
      published = "2026-11-14";
      modified = item.updatedAt;
    } else {
      files.push(en ? "app/lib/i18n/en/content.ts" : "app/lib/content.ts");
    }
  } else if (route.startsWith("/recursos/")) {
    const item = resourceArticles.find((article) => article.slug === slug);
    published = item?.publishedAt;
    modified = item?.updatedAt;
    files.splice(0, 1, `${base}/recursos/[slug]/page.tsx`, "app/lib/content.ts");
  } else if (route.startsWith("/blog/")) {
    const item = getBlogPost(slug);
    published = item?.publishedAt;
    modified = item?.updatedAt;
    files.splice(0, 1, `${base}/blog/[slug]/page.tsx`, "app/lib/blog.ts");
  } else if (/^\/(servicios|services)\//.test(route)) {
    files.splice(0, 1, `${base}/${en ? "services" : "servicios"}/[slug]/page.tsx`, en ? "app/lib/i18n/en/services.ts" : "app/lib/site.ts", "app/lib/portfolio/services.ts");
  } else if (route.startsWith("/soluciones/")) {
    files.splice(0, 1, `${base}/soluciones/[slug]/page.tsx`, "app/lib/content.ts");
  } else if (route.startsWith("/industrias/")) {
    files.splice(0, 1, `${base}/industrias/[slug]/page.tsx`, "app/lib/industrias.ts");
  } else if (["/", "/nosotros", "/about", "/casos", "/cases", "/proyectos", "/projects", "/contacto", "/contact"].includes(route)) {
    files.push("app/components/portfolio/pages.tsx", "app/lib/about.ts");
  } else if (route === "/recursos") files.push("app/lib/content.ts");
  else if (route === "/blog") files.push("app/lib/blog.ts");
  const sources = files.flatMap((file) => {
    const date = (dates as Record<string, { published: string; modified: string }>)[file];
    return date ? [date] : [];
  });
  if (!sources.length) throw new Error(`Faltan fechas verificadas para ${path}`);
  return {
    published: published ?? sources.map((date) => date.published).sort()[0],
    modified: modified ?? sources.map((date) => date.modified).sort().at(-1)!,
  };
}
