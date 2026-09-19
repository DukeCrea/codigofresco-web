import type { Locale } from "./config";

/**
 * Textos de interfaz (cabecera, pie, migas) por idioma.
 *
 * Las entradas `es` tienen que ser IDÉNTICAS a lo que había escrito a mano en
 * los componentes: el español ya está en producción y este cambio no debe
 * alterar ni una coma de lo que ya ve Google. La verificación es comparar el
 * HTML renderizado contra producción, no leerlo a ojo.
 */

type FooterLink = { label: string; href: string };

export type UiDictionary = {
  homeHref: string;
  brandTagline: string;
  nav: { solutions: string; cases: string; resources: string | null; talk: string };
  navHrefs: { solutions: string; cases: string; resources: string | null };
  aria: { home: string; mainNav: string; breadcrumbs: string; systemVisual: string };
  systemVisualLabels: string[];
  breadcrumbHome: string;
  footer: {
    location: string | null;
    columns: Array<{ title: string; links: FooterLink[] }>;
    showEcosystems: boolean;
    showIndustries: boolean;
    contactTitle: string;
    legalTitle: string;
    legalLinks: FooterLink[];
    rights: string;
  };
  /** Enlace al mismo sitio en el otro idioma. */
  otherLocale: { code: Locale; label: string; ariaLabel: string };
  /** Aviso de analítica. Se pinta en el navegador, así que no aparece en el
   *  HTML servido: hay que revisarlo con el navegador, no con curl. */
  consent: {
    dialogAria: string;
    title: string;
    bodyLead: string;
    policyLink: string;
    policyHref: string;
    reject: string;
    accept: string;
    changePreferences: string;
  };
};

export const ui: Record<Locale, UiDictionary> = {
  es: {
    homeHref: "/",
    brandTagline: "Infraestructura digital para vender, operar y escalar.",
    nav: { solutions: "Soluciones", cases: "Casos", resources: "Recursos", talk: "Hablemos" },
    navHrefs: { solutions: "/servicios", cases: "/casos", resources: "/recursos" },
    aria: {
      home: "CodigoFresco inicio",
      mainNav: "Navegación principal",
      breadcrumbs: "Migas de pan",
      systemVisual: "Sistema conectado",
    },
    systemVisualLabels: ["Captación", "Datos", "Automatización", "Ventas"],
    breadcrumbHome: "Inicio",
    footer: {
      location: "Venezuela",
      columns: [
        {
          title: "Sitio",
          links: [
            { label: "Soluciones", href: "/servicios" },
            { label: "Casos", href: "/casos" },
            { label: "Recursos", href: "/recursos" },
            { label: "Nosotros", href: "/nosotros" },
            { label: "Contacto", href: "/contacto" },
          ],
        },
      ],
      showEcosystems: true,
      showIndustries: true,
      contactTitle: "Contacto",
      legalTitle: "Legal",
      legalLinks: [
        { label: "Privacidad", href: "/privacidad" },
        { label: "Cookies", href: "/cookies" },
        { label: "Términos", href: "/terminos" },
      ],
      rights: "CodigoFresco. Software y crecimiento digital con trazabilidad.",
    },
    otherLocale: { code: "en", label: "EN", ariaLabel: "View this site in English" },
    consent: {
      dialogAria: "Preferencias de analítica",
      title: "Tu privacidad importa",
      bodyLead:
        "Usamos analítica opcional para entender qué contenido ayuda y mejorar la web. No cargamos Google Analytics ni Clarity hasta que aceptes. Consulta la",
      policyLink: "política de cookies",
      policyHref: "/cookies",
      reject: "Rechazar",
      accept: "Aceptar",
      changePreferences: "Cambiar preferencias de analítica",
    },
  },
  en: {
    homeHref: "/en",
    brandTagline: "Digital infrastructure to sell, operate and scale.",
    nav: { solutions: "Solutions", cases: "Work", resources: null, talk: "Let's talk" },
    navHrefs: { solutions: "/en/services", cases: "/en/cases", resources: null },
    aria: {
      home: "CodigoFresco home",
      mainNav: "Main navigation",
      breadcrumbs: "Breadcrumb",
      systemVisual: "Connected system",
    },
    systemVisualLabels: ["Acquisition", "Data", "Automation", "Sales"],
    breadcrumbHome: "Home",
    footer: {
      location: null,
      columns: [
        {
          title: "Site",
          links: [
            { label: "Solutions", href: "/en/services" },
            { label: "Work", href: "/en/cases" },
            { label: "About", href: "/en/about" },
            { label: "Contact", href: "/en/contact" },
          ],
        },
      ],
      showEcosystems: false,
      showIndustries: false,
      contactTitle: "Contact",
      legalTitle: "Legal",
      legalLinks: [
        { label: "Privacy", href: "/en/privacy" },
        { label: "Cookies", href: "/en/cookies" },
        { label: "Terms", href: "/en/terms" },
      ],
      rights: "CodigoFresco. Software and digital growth with traceability.",
    },
    otherLocale: { code: "es", label: "ES", ariaLabel: "Ver este sitio en español" },
    consent: {
      dialogAria: "Analytics preferences",
      title: "Your privacy matters",
      bodyLead:
        "We use optional analytics to understand which content helps and to improve the site. We don't load Google Analytics or Clarity until you accept. See the",
      policyLink: "cookie policy",
      policyHref: "/en/cookies",
      reject: "Decline",
      accept: "Accept",
      changePreferences: "Change analytics preferences",
    },
  },
};

export function getUi(lang: Locale = "es") {
  return ui[lang];
}
