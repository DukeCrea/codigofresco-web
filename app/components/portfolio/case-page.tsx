import type { Metadata } from "next";

import type { Locale } from "../../lib/i18n/config";
import { caseAlternate, caseHref, getCaseBySlug } from "../../lib/portfolio";
import type { PortfolioCase } from "../../lib/portfolio/types";
import { getPortfolioUi } from "../../lib/portfolio/ui";
import { breadcrumbJsonLd, buildMetadata, organizationId, personId } from "../../lib/seo";
import { siteConfig } from "../../lib/site";
import { CaseArticle } from "./case-article";
import { PortfolioShell } from "./chrome";

export function portfolioCaseMetadata(lang: Locale, slug: string): Metadata | null {
  const item = getCaseBySlug(lang, slug);
  if (!item) return null;
  const path = caseHref(lang, item);
  const meta = buildMetadata({
    title: item.metaTitle,
    description: item.metaDescription,
    path,
    lang,
    esPath: lang === "en" ? caseAlternate("en", item.id) ?? undefined : undefined,
  });
  return {
    ...meta,
    authors: [{ name: "Antonio Duque", url: `${siteConfig.url}${lang === "es" ? "/nosotros" : "/en/about"}` }],
    openGraph: { ...meta.openGraph, type: "article", modifiedTime: item.reviewed, authors: ["Antonio Duque"] },
  };
}

export function PortfolioCasePage({ item, lang }: { item: PortfolioCase; lang: Locale }) {
  const t = getPortfolioUi(lang);
  const path = caseHref(lang, item);
  const url = `${siteConfig.url}${path}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: item.metaTitle,
        description: item.metaDescription,
        datePublished: "2026-11-14",
        dateModified: item.reviewed,
        inLanguage: lang,
        author: { "@type": "Person", "@id": personId, name: "Antonio Duque" },
        publisher: { "@id": organizationId },
        mainEntityOfPage: url,
        image: item.image ? `${siteConfig.url}${item.image.src}` : `${siteConfig.url}/og.jpg`,
        about: item.tools.map((tool) => tool.name),
        keywords: item.disciplines.map((d) => t.disciplines[d]).join(", "),
      },
      breadcrumbJsonLd([
        { name: t.breadcrumbHome, path: lang === "es" ? "/" : "/en" },
        { name: lang === "es" ? "Casos" : "Work", path: lang === "es" ? "/casos" : "/en/cases" },
        { name: item.title, path },
      ]),
    ],
  };
  return (
    <PortfolioShell lang={lang} alternateHref={caseAlternate(lang, item.id)} jsonLd={jsonLd}>
      <CaseArticle item={item} lang={lang} />
    </PortfolioShell>
  );
}
