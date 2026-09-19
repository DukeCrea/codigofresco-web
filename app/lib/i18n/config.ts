/**
 * Configuración de idiomas.
 *
 * El español vive en la raíz (`/servicios/...`) y el inglés bajo `/en/`
 * (`/en/services/...`). Se eligió prefijo en el mismo dominio y no un
 * subdominio porque así las dos versiones comparten la autoridad del dominio;
 * un `en.` sería para Google un sitio nuevo al que habría que construirle
 * reputación desde cero.
 *
 * Los slugs se traducen: `/en/services/corporate-websites` posiciona en inglés,
 * `/en/services/paginas-web-corporativas` no. Por eso hace falta este mapa en
 * los dos sentidos: es lo que permite emitir el `hreflang` correcto y que el
 * selector de idioma lleve a la página equivalente en vez de a la portada.
 */

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

/** Etiquetas de los segmentos de ruta: español -> inglés. */
export const segmentMap: Record<string, string> = {
  servicios: "services",
  casos: "cases",
  nosotros: "about",
  contacto: "contact",
};

/** Slug de cada servicio: español -> inglés. */
export const serviceSlugMap: Record<string, string> = {
  "paginas-web-corporativas": "corporate-websites",
  "e-commerce": "e-commerce",
  "desarrollo-wordpress": "wordpress-development",
  "desarrollo-shopify": "shopify-development",
  "landing-pages": "landing-pages",
  "desarrollo-de-software": "custom-software-development",
  "seo-y-geo": "seo-and-geo",
  "gestion-control-ads": "ads-management",
  "panel-monitor-administrativo-inteligente": "intelligent-admin-dashboard",
  "chatbot-whatsapp-redes-sociales-ia": "ai-chatbot-whatsapp-social",
  "control-gestion-atencion-leads": "lead-management",
  "respuestas-automatizadas-comentarios-redes-sociales": "automated-social-replies",
  "evaluacion-contenido-empresa": "content-audit",
  "creacion-edicion-videos": "video-production",
  "evaluacion-redes-sociales-estrategia-digital-publicidad": "social-media-audit",
  "evaluacion-inversion-ads": "ad-spend-audit",
  "calculo-roi-publicitario": "advertising-roi",
  "software-automatizado-publicaciones-redes-sociales": "social-publishing-automation",
};

/** Slug de cada caso de éxito: español -> inglés. */
export const caseSlugMap: Record<string, string> = {
  "champion-motors-automatizacion-concesionario": "car-dealership-automation",
  "baretec-wordpress-corporativo": "corporate-wordpress-site",
  "camsmark-ecommerce-multipais": "multi-country-ecommerce",
  "mili-molo-ecommerce-educativo": "educational-ecommerce",
};

function invert(map: Record<string, string>) {
  return Object.fromEntries(Object.entries(map).map(([es, en]) => [en, es]));
}

export const serviceSlugMapReverse = invert(serviceSlugMap);
export const caseSlugMapReverse = invert(caseSlugMap);

/**
 * Par de URLs equivalentes en los dos idiomas, para el `hreflang`.
 *
 * Se pasa la ruta ESPAÑOLA como identidad de la página. Devuelve null en
 * `en` cuando esa página todavía no existe traducida: emitir un `hreflang`
 * hacia una URL que da 404 es peor que no emitirlo, porque Google deja de
 * fiarse del resto de las anotaciones del sitio.
 */
export function alternatePaths(esPath: string): { es: string; en: string | null } {
  if (esPath === "/") return { es: "/", en: "/en" };

  const serviceMatch = esPath.match(/^\/servicios\/(.+)$/);
  if (serviceMatch) {
    const en = serviceSlugMap[serviceMatch[1]];
    return { es: esPath, en: en ? `/en/services/${en}` : null };
  }

  const caseMatch = esPath.match(/^\/casos\/(.+)$/);
  if (caseMatch) {
    const en = caseSlugMap[caseMatch[1]];
    return { es: esPath, en: en ? `/en/cases/${en}` : null };
  }

  const simple: Record<string, string> = {
    "/servicios": "/en/services",
    "/casos": "/en/cases",
    "/nosotros": "/en/about",
    "/contacto": "/en/contact",
    "/privacidad": "/en/privacy",
    "/cookies": "/en/cookies",
    "/terminos": "/en/terms",
  };

  return { es: esPath, en: simple[esPath] ?? null };
}

/** Todas las rutas inglesas que existen, para el sitemap. */
export function englishPaths(): string[] {
  return [
    "/en",
    "/en/services",
    ...Object.values(serviceSlugMap).map((slug) => `/en/services/${slug}`),
    "/en/cases",
    ...Object.values(caseSlugMap).map((slug) => `/en/cases/${slug}`),
    "/en/about",
    "/en/contact",
    "/en/privacy",
    "/en/cookies",
    "/en/terms",
  ];
}
