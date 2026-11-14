import type { Locale } from "../i18n/config";
import { casesEn, workshopVariantEn } from "./cases-en";
import { casesEs, workshopVariantEs } from "./cases-es";
import type { CaseId, PortfolioCase } from "./types";

export * from "./types";

export function getCases(lang: Locale): PortfolioCase[] {
  return [...(lang === "en" ? casesEn : casesEs)].sort((a, b) => a.order - b.order);
}

export function getCaseBySlug(lang: Locale, slug: string) {
  return getCases(lang).find((item) => item.slug === slug);
}

export function getCaseById(lang: Locale, id: CaseId) {
  return getCases(lang).find((item) => item.id === id);
}

export function caseHref(lang: Locale, item: Pick<PortfolioCase, "slug">) {
  return lang === "en" ? `/en/cases/${item.slug}` : `/casos/${item.slug}`;
}

/** Ruta equivalente del mismo caso en el otro idioma (para hreflang y selector). */
export function caseAlternate(lang: Locale, id: CaseId) {
  const other: Locale = lang === "es" ? "en" : "es";
  const twin = getCaseById(other, id);
  return twin ? caseHref(other, twin) : null;
}

/** Pares de slug español -> inglés, consumidos por el mapa de hreflang del sitio. */
export const portfolioCaseSlugPairs: Record<string, string> = Object.fromEntries(
  casesEs.map((item) => [item.slug, casesEn.find((en) => en.id === item.id)!.slug]),
);

export function getWorkshopVariant(lang: Locale) {
  return lang === "en" ? workshopVariantEn : workshopVariantEs;
}
