import { caseStudies, getCaseStudy } from "../content";
import {
  benefits,
  cases,
  faqs,
  getServiceBySlug,
  megaMenuColumns,
  navLinks,
  plans,
  processSteps,
  serviceCategories,
  services,
  team,
  workflowSteps,
} from "../site";
import type { Locale } from "./config";
import { enCaseStudies, enCases, enFaqs, enMegaMenuColumns, enNavLinks, enPlans, enProcessSteps, enTeam, enWorkflowSteps, enBenefits, getEnCaseStudy } from "./en/content";
import { enServiceCategories, enServices, getEnServiceBySlug } from "./en/services";

export * from "./config";
export { getUi } from "./ui";
export { getHome } from "./home";

/**
 * Devuelve el contenido del idioma pedido.
 *
 * Se resuelve en un solo sitio para que las páginas no tengan que elegir entre
 * dos importaciones; la página recibe `lang` y ya obtiene los datos correctos.
 */
export function getContent(lang: Locale = "es") {
  if (lang === "en") {
    return {
      serviceCategories: enServiceCategories,
      services: enServices,
      getServiceBySlug: getEnServiceBySlug,
      caseStudies: enCaseStudies,
      getCaseStudy: getEnCaseStudy,
      navLinks: enNavLinks,
      megaMenuColumns: enMegaMenuColumns,
      workflowSteps: enWorkflowSteps,
      cases: enCases,
      team: enTeam,
      processSteps: enProcessSteps,
      plans: enPlans,
      faqs: enFaqs,
      benefits: enBenefits,
    };
  }

  return {
    serviceCategories,
    services,
    getServiceBySlug,
    caseStudies,
    getCaseStudy,
    navLinks,
    megaMenuColumns,
    workflowSteps,
    cases,
    team,
    processSteps,
    plans,
    faqs,
    benefits,
  };
}

/**
 * Agrupa los servicios por categoría para el idioma pedido. Es el equivalente
 * de `serviceCategoryMap` de `site.ts`, que está fijado al español.
 */
export function getServiceCategoryMap(lang: Locale = "es") {
  const { serviceCategories: categories, services: list } = getContent(lang);
  return categories.map((category) => ({
    ...category,
    services: list.filter((service) => service.category === category.id),
  }));
}
