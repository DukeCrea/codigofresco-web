import type { Locale } from "./config";

/**
 * Textos de la portada por idioma.
 *
 * Igual que en `ui.ts`, las entradas `es` reproducen literalmente lo que estaba
 * escrito dentro del JSX antes de este cambio. Si una cambia, cambia la página
 * que ya está indexada.
 */

export type HomeDictionary = {
  hero: {
    badge: string;
    titleLead: string;
    titleHighlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaPrimaryHref: string;
    ctaSecondary: string;
    ctaSecondaryHref: string;
    reassurance: string;
  };
  stats: Array<{ value: string; label: string }>;
  ticker: { aria: string; eyebrow: string };
  services: {
    eyebrow: string;
    title: string;
    description: string;
    cardCta: string;
    basePath: string;
  };
  benefits: { eyebrow: string; title: string; description: string };
  workflow: { eyebrow: string; title: string; description: string; diagramAria: string };
  cases: { eyebrow: string; title: string; description: string; cta: string; ctaHref: string };
  team: { eyebrow: string; title: string; description: string };
  process: { title: string; description: string };
  stack: { eyebrow: string; title: string; description: string };
  plans: { eyebrow: string; title: string; description: string; badge: string; cta: string; quoteMessage: (plan: string) => string };
  faq: { title: string };
  closing: { eyebrow: string; title: string; description: string; videoLabel: string };
  menu: { open: string; close: string; mobileNavAria: string; whatsappMobile: string };
};

export const home: Record<Locale, HomeDictionary> = {
  es: {
    hero: {
      badge: "Firma tecnológica para infraestructura digital, adquisición y automatización",
      titleLead: "Infraestructura digital para ",
      titleHighlight: "vender, operar y escalar",
      subtitle:
        "Diseñamos ecosistemas B2B que conectan web, e-commerce, WordPress, Shopify, software, Ads, automatizaciones y datos para reducir costos operativos y recuperar oportunidades.",
      ctaPrimary: "Solicita tu diagnóstico gratis",
      ctaPrimaryHref: "/#contact",
      ctaSecondary: "Explorar soluciones",
      ctaSecondaryHref: "/servicios",
      reassurance: "Empresas en Panamá y Venezuela · Diagnóstico inicial gratis · Sin compromiso",
    },
    stats: [
      { value: "15+", label: "Proyectos entregados" },
      { value: "16", label: "Soluciones digitales" },
      { value: "5+", label: "Años de experiencia" },
      { value: "100%", label: "A medida de tu negocio" },
    ],
    ticker: { aria: "Stack tecnológico CodigoFresco", eyebrow: "Stack tecnológico para ecosistemas B2B" },
    services: {
      eyebrow: "Soluciones",
      title: "Infraestructura digital para cada punto crítico del negocio",
      description:
        "Cada línea conecta páginas, comercio, automatización, datos y contenido para que la inversión digital tenga lectura de negocio.",
      cardCta: "Ver solución",
      basePath: "/servicios",
    },
    benefits: {
      eyebrow: "Beneficios",
      title: "Un ecosistema digital, no piezas sueltas",
      description:
        "Sumamos infraestructura web, automatizaciones, datos y marketing alrededor de lo que ya existe en tu negocio. La meta no es tener más herramientas: es recuperar oportunidades, reducir fricción y operar con continuidad.",
    },
    workflow: {
      eyebrow: "Automatización B2B",
      title: "Del anuncio al CRM sin perder trazabilidad",
      description:
        "Un flujo diseñado para reducir costos operativos, recuperar leads a tiempo y proteger datos relacionales con seguimiento comercial claro.",
      diagramAria: "Flujo desde anuncio hasta CRM y panel de ROI",
    },
    cases: {
      eyebrow: "Casos",
      title: "Negocios y productos que ya digitalizamos",
      description:
        "Proyectos reales de software, e-commerce, automatización, contabilidad, eventos y marketing con IA.",
      cta: "Leer casos completos",
      ctaHref: "/casos",
    },
    team: {
      eyebrow: "Equipo",
      title: "Fundadores al frente y especialistas según el reto",
      description:
        "CodigoFresco combina dirección cercana, desarrollo senior y especialistas que se integran según cada proyecto.",
    },
    process: {
      title: "Cómo trabajamos",
      description: "Un proceso claro para pasar de idea o problema operativo a solución funcionando.",
    },
    stack: {
      eyebrow: "Stack",
      title: "Tecnologías y herramientas que usamos",
      description:
        "Elegimos tecnología según el modelo operativo: a medida cuando hace falta control, WordPress o Shopify cuando conviene velocidad y administración.",
    },
    plans: {
      eyebrow: "Planes",
      title: "Planes para cada etapa",
      description: "Precios de referencia para orientarte. El presupuesto final se define tras el diagnóstico inicial.",
      badge: "Más elegido",
      cta: "Solicitar cotización",
      quoteMessage: (plan) => `Hola CodigoFresco, quiero una cotización para ${plan}.`,
    },
    faq: { title: "Preguntas frecuentes" },
    closing: {
      eyebrow: "De lo manual a la IA",
      title: "Del caos operativo a flujos inteligentes",
      description:
        "Ordenamos tu operación con automatización, datos y software a medida — para que tu negocio venda, opere y escale.",
      videoLabel: "De procesos manuales a inteligencia artificial",
    },
    menu: {
      open: "Abrir menú",
      close: "Cerrar menú",
      mobileNavAria: "Navegación móvil",
      whatsappMobile: "Hablemos por WhatsApp",
    },
  },
  en: {
    hero: {
      badge: "A technology firm for digital infrastructure, acquisition and automation",
      titleLead: "Digital infrastructure to ",
      titleHighlight: "sell, operate and scale",
      subtitle:
        "We design B2B systems that connect web, e-commerce, WordPress, Shopify, custom software, ads, automation and data, to cut operating costs and recover the opportunities you are losing today.",
      ctaPrimary: "Get a free assessment",
      ctaPrimaryHref: "/en#contact",
      ctaSecondary: "Explore solutions",
      ctaSecondaryHref: "/en/services",
      reassurance: "Remote team · Free initial assessment · No commitment",
    },
    stats: [
      { value: "15+", label: "Projects delivered" },
      { value: "16", label: "Digital solutions" },
      { value: "5+", label: "Years of experience" },
      { value: "100%", label: "Built around your business" },
    ],
    ticker: { aria: "CodigoFresco technology stack", eyebrow: "Technology stack for B2B systems" },
    services: {
      eyebrow: "Solutions",
      title: "Digital infrastructure for every critical point in the business",
      description:
        "Each line connects sites, commerce, automation, data and content, so digital spend reads as a business number.",
      cardCta: "View solution",
      basePath: "/en/services",
    },
    benefits: {
      eyebrow: "Benefits",
      title: "One connected system, not scattered pieces",
      description:
        "We add web infrastructure, automation, data and marketing around what your business already runs on. The goal is not more tools: it is recovering opportunities, removing friction and operating without gaps.",
    },
    workflow: {
      eyebrow: "B2B automation",
      title: "From the ad to the CRM without losing the trail",
      description:
        "A flow built to cut operating costs, pick up leads in time and keep relational data intact with clear commercial follow-up.",
      diagramAria: "Flow from ad through CRM to ROI dashboard",
    },
    cases: {
      eyebrow: "Work",
      title: "Businesses and products we have already built",
      description:
        "Real projects across software, e-commerce, automation, accounting, events and AI marketing.",
      cta: "Read the full case studies",
      ctaHref: "/en/cases",
    },
    team: {
      eyebrow: "Team",
      title: "Founders on the project, specialists on demand",
      description:
        "CodigoFresco combines hands-on direction, senior development and specialists who join based on what each project needs.",
    },
    process: {
      title: "How we work",
      description: "A clear path from an idea or an operational problem to something running in production.",
    },
    stack: {
      eyebrow: "Stack",
      title: "Technologies and tools we work with",
      description:
        "We pick technology to fit the operating model: custom when you need control, WordPress or Shopify when speed and easy administration matter more.",
    },
    plans: {
      eyebrow: "Pricing",
      title: "Pricing for each stage",
      description: "Reference pricing to orient you. The final budget is defined after the initial assessment.",
      badge: "Most chosen",
      cta: "Request a quote",
      quoteMessage: (plan) => `Hi CodigoFresco, I'd like a quote for ${plan}.`,
    },
    faq: { title: "Frequently asked questions" },
    closing: {
      eyebrow: "From manual to AI",
      title: "From operational chaos to intelligent workflows",
      description:
        "We put your operation in order with automation, data and custom software, so the business can sell, operate and scale.",
      videoLabel: "From manual processes to artificial intelligence",
    },
    menu: {
      open: "Open menu",
      close: "Close menu",
      mobileNavAria: "Mobile navigation",
      whatsappMobile: "Message us on WhatsApp",
    },
  },
};

export function getHome(lang: Locale = "es") {
  return home[lang];
}
