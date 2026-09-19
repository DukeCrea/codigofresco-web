import type { Locale } from "./config";

/** Textos de las páginas interiores (índices, detalle de servicio y de caso). */
export type PagesDictionary = {
  breadcrumbHome: string;
  servicesIndex: {
    metaTitle: string;
    metaDescription: string;
    label: string;
    eyebrow: string;
    h1: string;
    intro: string;
    visualLabels: string[];
    collectionName: string;
    hubLink: string;
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
    ctaHref: string;
  };
  serviceDetail: {
    notFound: string;
    ctaPrimary: string;
    ctaSecondary: string;
    outcomes: string;
    solves: (what: string) => string;
    deliverablesEyebrow: string;
    deliverablesTitle: string;
    stackTitle: string;
    processEyebrow: string;
    processTitle: string;
    faqEyebrow: string;
    faqTitle: string;
    faqIntro: string;
    relatedTitle: string;
    closingTitle: string;
    closingBody: string;
    whatsappMessage: (service: string) => string;
  };
  casesIndex: {
    metaTitle: string;
    metaDescription: string;
    label: string;
    h1: string;
    intro: string;
    collectionName: string;
  };
  caseDetail: {
    notFound: string;
    challenge: string;
    solution: string;
    result: string;
    capabilities: string;
    stack: string;
    related: string;
  };
  paths: { home: string; services: string; cases: string; contact: string };
};

export const pages: Record<Locale, PagesDictionary> = {
  es: {
    breadcrumbHome: "Inicio",
    servicesIndex: {
      metaTitle: "Soluciones de software, automatización y marketing",
      metaDescription:
        "Explora desarrollo web, WordPress, Shopify, software a medida, automatizaciones, SEO/GEO, Ads, contenido y analítica de CodigoFresco.",
      label: "Soluciones",
      eyebrow: "Ecosistema CodigoFresco",
      h1: "Soluciones conectadas con la operación y el crecimiento",
      intro:
        "Diseñamos infraestructura web, software, automatización y marketing medible. Puedes empezar por una necesidad concreta y conectar nuevas capacidades a medida que el negocio crece.",
      visualLabels: ["Web y commerce", "Software", "Automatización", "Marketing y datos"],
      collectionName: "Soluciones CodigoFresco",
      hubLink: "Ver ecosistema completo",
      ctaTitle: "¿No sabes por dónde empezar?",
      ctaBody: "Cuéntanos el cuello de botella y te ayudamos a priorizar una primera implementación medible.",
      ctaButton: "Solicitar diagnóstico",
      ctaHref: "/contacto",
    },
    serviceDetail: {
      notFound: "Servicio no encontrado",
      ctaPrimary: "Solicitar diagnóstico",
      ctaSecondary: "Ver todas las soluciones",
      outcomes: "Resultados esperados",
      solves: (what) => `¿Qué resuelve ${what}?`,
      deliverablesEyebrow: "Entregables",
      deliverablesTitle: "Qué incluye esta solución",
      stackTitle: "Stack y herramientas",
      processEyebrow: "Proceso",
      processTitle: "Cómo lo implementamos",
      faqEyebrow: "Preguntas",
      faqTitle: "Dudas frecuentes",
      faqIntro:
        "Respuestas rápidas para entender alcance, tiempos y forma de trabajo antes de pedir diagnóstico.",
      relatedTitle: "Soluciones relacionadas",
      closingTitle: "¿Lo implementamos para tu negocio?",
      closingBody: "Cuéntanos tu caso y te proponemos una ruta concreta para empezar con esta solución.",
      whatsappMessage: (service) => `Hola CodigoFresco, quiero información sobre ${service}.`,
    },
    casesIndex: {
      metaTitle: "Casos de software, WordPress y e-commerce",
      metaDescription:
        "Casos reales de CodigoFresco en automatización comercial, WordPress, e-commerce multi-país y tiendas educativas.",
      label: "Casos",
      h1: "Sistemas construidos alrededor de operaciones reales",
      intro:
        "Documentamos el problema, la arquitectura y el resultado funcional sin inflar cifras. Estos casos muestran cómo elegimos tecnología según el negocio.",
      collectionName: "Casos CodigoFresco",
    },
    caseDetail: {
      notFound: "Caso no encontrado",
      challenge: "El reto",
      solution: "La solución",
      result: "El resultado",
      capabilities: "Capacidades implementadas",
      stack: "Tecnología utilizada",
      related: "Soluciones relacionadas",
    },
    paths: { home: "/", services: "/servicios", cases: "/casos", contact: "/contacto" },
  },
  en: {
    breadcrumbHome: "Home",
    servicesIndex: {
      metaTitle: "Software, Automation and Marketing Solutions",
      metaDescription:
        "Web development, WordPress, Shopify, custom software, automation, SEO/GEO, ads, content and analytics from CodigoFresco.",
      label: "Solutions",
      eyebrow: "The CodigoFresco system",
      h1: "Solutions wired into how the business runs and grows",
      intro:
        "We build web infrastructure, software, automation and marketing you can measure. Start with one concrete need and connect new capabilities as the business grows.",
      visualLabels: ["Web and commerce", "Software", "Automation", "Marketing and data"],
      collectionName: "CodigoFresco solutions",
      hubLink: "See the full system",
      ctaTitle: "Not sure where to start?",
      ctaBody: "Tell us where the bottleneck is and we'll help you pick a first implementation you can measure.",
      ctaButton: "Request an assessment",
      ctaHref: "/en/contact",
    },
    serviceDetail: {
      notFound: "Service not found",
      ctaPrimary: "Request an assessment",
      ctaSecondary: "See all solutions",
      outcomes: "What you should expect",
      solves: (what) => `What does ${what} solve?`,
      deliverablesEyebrow: "Deliverables",
      deliverablesTitle: "What this solution includes",
      stackTitle: "Stack and tools",
      processEyebrow: "Process",
      processTitle: "How we implement it",
      faqEyebrow: "Questions",
      faqTitle: "Common questions",
      faqIntro: "Quick answers on scope, timing and how we work, before you ask for an assessment.",
      relatedTitle: "Related solutions",
      closingTitle: "Want this built for your business?",
      closingBody: "Tell us your situation and we'll propose a concrete path to start with this solution.",
      whatsappMessage: (service) => `Hi CodigoFresco, I'd like information about ${service}.`,
    },
    casesIndex: {
      metaTitle: "Case Studies: Software, WordPress and E-commerce",
      metaDescription:
        "Real CodigoFresco projects across sales automation, WordPress, multi-country e-commerce and educational stores.",
      label: "Work",
      h1: "Systems built around real operations",
      intro:
        "We document the problem, the architecture and the working result without inflating numbers. These cases show how we pick technology to fit the business.",
      collectionName: "CodigoFresco case studies",
    },
    caseDetail: {
      notFound: "Case study not found",
      challenge: "The challenge",
      solution: "The solution",
      result: "The result",
      capabilities: "What we built",
      stack: "Technology used",
      related: "Related solutions",
    },
    paths: { home: "/en", services: "/en/services", cases: "/en/cases", contact: "/en/contact" },
  },
};

export function getPages(lang: Locale = "es") {
  return pages[lang];
}
