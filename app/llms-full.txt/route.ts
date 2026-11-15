import { aboutFaq, aboutParagraphs, aboutTools, aboutPrinciples, aboutFacts } from "../lib/about";
import { getBlogPosts } from "../lib/blog";
import { caseStudies, resourceArticles } from "../lib/content";
import { caseHref, getCases, getWorkshopVariant } from "../lib/portfolio";
import { getPortfolioUi } from "../lib/portfolio/ui";
import { services, siteConfig } from "../lib/site";

export const dynamic = "force-static";

const list = (items: string[]) => items.map((item) => `- ${item}`).join("\n");
const section = (title: string, items: string[]) => `### ${title}\n\n${items.join("\n\n")}`;

export function GET() {
  const parts = ["# Código Fresco · Antonio Duque", `Sitio: ${siteConfig.url}`, "## Sobre mí", ...aboutParagraphs.es,
    section("Cómo decido", aboutPrinciples.es.map(([title, text]) => `${title}: ${text}`)),
    section("Datos rápidos", aboutFacts.es.map(([title, text]) => `${title}: ${text}`)),
    section("Herramientas", [aboutTools.join(", ")]),
    ...aboutFaq.es.map(({ q, a }) => section(q, [a])),
  ];
  for (const lang of ["es", "en"] as const) {
    const t = getPortfolioUi(lang);
    for (const item of getCases(lang)) {
      parts.push(`## ${item.title}`, `${siteConfig.url}${caseHref(lang, item)}`, item.headline, item.lead,
        section(lang === "es" ? "En resumen" : "At a glance", [item.summary]),
        `Contexto / Context: ${item.context}`,
        ...(["need", "responsibility", "strategy", "built", "evidence", "next", "learnings"] as const).map((key) => section(t.sections[key], item[key])),
        section(t.sections.flow, item.flow.map((step) => `${step.title}: ${step.detail}`)),
        section(t.sections.tools, item.tools.map((tool) => `${tool.name}: ${tool.role}`)),
        section(t.sections.status, item.status.map((row) => `${row.piece} — ${t.status[row.status]}: ${row.note}`)),
        ...(item.collaboration ? [section(t.sections.collaboration, [item.collaboration])] : []),
        ...(item.caveats ? [section(t.sections.caveats, item.caveats)] : []),
        `Revisión del estado / Status reviewed: ${item.reviewed}`,
      );
      if (item.id === "zodesk") {
        const workshop = getWorkshopVariant(lang);
        parts.push(section(workshop.title, [workshop.intro, ...workshop.items.map((entry) => `${entry.name}: ${entry.detail}`)]));
      }
    }
  }
  for (const item of caseStudies) parts.push(`## ${item.client}`, `${siteConfig.url}/casos/${item.slug}`, section("Reto", [item.challenge]), section("Solución", [item.solution]), section("Resultado funcional", [item.result]), list(item.capabilities), `Herramientas: ${item.stack.join(", ")}`);
  for (const service of services) parts.push(`## ${service.title}`, `${siteConfig.url}/servicios/${service.slug}`, service.heroTitle, service.summary, service.description, section("Resultados previstos", [list(service.outcomes)]), section("Entregables", [list(service.deliverables)]), section("Proceso", [list(service.process)]), `Herramientas: ${service.stack.join(", ")}`, ...service.faq.map(({ q, a }) => section(q, [a])));
  for (const article of resourceArticles) parts.push(`## ${article.title}`, `${siteConfig.url}/recursos/${article.slug}`, article.excerpt, article.answer, ...article.sections.map((entry) => section(entry.heading, [...entry.paragraphs, ...(entry.bullets ? [list(entry.bullets)] : [])])), ...article.faq.map(({ q, a }) => section(q, [a])));
  for (const post of getBlogPosts()) {
    parts.push(`## ${post.title}`, `${siteConfig.url}/blog/${post.slug}`, `Autor: ${post.author} · Publicado: ${post.publishedAt} · Actualizado: ${post.updatedAt}`, post.excerpt, ...(post.disclaimer ? [post.disclaimer] : []), ...(post.video ? [`Video: ${post.video.description}\n${siteConfig.url}${post.video.src}`] : []));
    for (const block of post.body) {
      if (block.type === "h2") parts.push(`### ${block.text}`);
      else if (block.type === "list") parts.push(list(block.items.map((item) => `${item.label ? `${item.label}: ` : ""}${item.text}`)));
      else if (block.type === "flow") parts.push(list(block.steps));
      else if (block.type === "video") parts.push(`Video: ${block.video.description}\n${siteConfig.url}${block.video.src}`);
      else parts.push(block.text);
    }
    parts.push(section(post.cta.title, [post.cta.text]));
  }
  parts.push(`## Contacto\n\n${siteConfig.url}/contacto\n\n${siteConfig.email} · WhatsApp +${siteConfig.whatsappNumber}`);
  return new Response(`${parts.join("\n\n")}\n`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
