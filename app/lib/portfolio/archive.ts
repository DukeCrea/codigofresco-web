import type { Locale } from "../i18n/config";
import type { ArchiveGroup, ArchiveProject, CaseId, Discipline } from "./types";

/**
 * Archivo de proyectos revisados en GitHub y en local (14 de noviembre de 2026).
 *
 * Un repositorio no es un producto terminado: el estado se escribe tal como lo
 * documenta cada proyecto. Se excluyen repositorios vacíos, ajenos o con datos
 * personales de terceros.
 */

type Text = { es: string; en: string };
const t = (es: string, en: string): Text => ({ es, en });

type Source = {
  id: string;
  name: string;
  group: ArchiveGroup;
  disciplines: Discipline[];
  summary: Text;
  role: Text;
  stack: string;
  status: Text;
  caseId?: CaseId;
  url?: string;
  visibility: "public" | "private";
};

const sources: Source[] = [
  // Proyectos con clientes
  {
    id: "champion",
    name: "Champion Motors / FreedomShop (antes Torre)",
    group: "client",
    disciplines: ["marketing", "crm", "automation"],
    summary: t(
      "Web e inventario del concesionario con una capa propia de inteligencia comercial: ingesta de pauta, atribución de clics de WhatsApp, sincronización con Zoho, margen por placa, reportes y alertas.",
      "Dealership website and inventory with my own commercial intelligence layer: ad data ingestion, WhatsApp click attribution, Zoho sync, margin per plate, reports and alerts.",
    ),
    role: t("Marketing desde 2016; estrategia, integraciones y dirección de la capa propia.", "Marketing since 2016; strategy, integrations and direction of the custom layer."),
    stack: "Laravel · Filament · MySQL · Meta/Google/TikTok APIs · Zoho",
    status: t(
      "Web en producción. La capa propia se extrajo como producto y sigue en preparación. La base comercial es de terceros.",
      "Website in production. The custom layer was extracted as a product and is still being prepared. The commercial base is third-party.",
    ),
    caseId: "marketing-dinamico",
    url: "https://championmotors.com.pa",
    visibility: "private",
  },
  {
    id: "camsmark",
    name: "Camsmark",
    group: "client",
    disciplines: ["operations", "automation", "product"],
    summary: t(
      "E-commerce con tiendas en Panamá y Venezuela, precio y stock por mercado e integración con el ERP SAINT mediante agentes.",
      "E-commerce with stores in Panama and Venezuela, per-market price and stock, and SAINT ERP integration through agents.",
    ),
    role: t("Backend, integración con SAINT y SEO; interfaz compartida con el equipo.", "Backend, SAINT integration and SEO; interface shared with the team."),
    stack: "Laravel 10 · Filament 3 · MySQL · Go · SQL Server",
    status: t("En producción. Trabajo colaborativo; quedan pendientes documentados de SEO y datos.", "In production. Collaborative work; documented SEO and data items remain open."),
    caseId: "saint",
    url: "https://camsmark.shop",
    visibility: "private",
  },
  {
    id: "milimolo",
    name: "Mili & Molo",
    group: "client",
    disciplines: ["marketing", "product"],
    summary: t(
      "Tienda educativa bilingüe: libros, cuadernillos y productos con tema propio, herramientas de carga masiva, SEO propio y captura de suscriptores.",
      "Bilingual educational store: books, workbooks and products with a custom theme, bulk upload tools, custom SEO and subscriber capture.",
    ),
    role: t("Tema, arquitectura de contenido y mejoras del recorrido comercial.", "Theme, content architecture and commercial journey improvements."),
    stack: "WordPress · WooCommerce · PHP",
    status: t("Sitio publicado; el pago con tarjeta en modo real estaba pendiente según su documentación.", "Live site; live card payments were pending according to its documentation."),
    url: "https://milimolo.com",
    visibility: "private",
  },
  {
    id: "portugal",
    name: "Portugal Car Services",
    group: "client",
    disciplines: ["marketing", "operations"],
    summary: t(
      "Web de un taller en Portugal cuyo formulario registra solicitudes en ZoDesk para talleres.",
      "Website for a workshop in Portugal whose form records requests in ZoDesk for workshops.",
    ),
    role: t("Sitio y conexión de captación con ZoDesk.", "Website and lead-capture connection with ZoDesk."),
    stack: "HTML · CSS · JavaScript · ZoDesk",
    status: t("Publicado. Las imágenes son de banco, no del taller.", "Live. Images are stock, not the workshop's own."),
    caseId: "zodesk",
    url: "https://www.portugalcarservices.com/",
    visibility: "private",
  },
  {
    id: "osuite",
    name: "OSuite",
    group: "client",
    disciplines: ["crm", "operations"],
    summary: t(
      "CRM para una empresa de servicio técnico: clientes, agenda, trabajos con fotos, cotizaciones y recibos en PDF, exportación a Excel y recordatorios de mantenimiento.",
      "CRM for a technical service company: customers, scheduling, jobs with photos, PDF quotes and receipts, Excel export and maintenance reminders.",
    ),
    role: t("Definición de la solución e implementación.", "Solution design and implementation."),
    stack: "JavaScript · Vite · Supabase · Vitest",
    status: t("Entregado en septiembre de 2026; no verifico su uso actual.", "Delivered in September 2026; current use not verified."),
    visibility: "private",
  },
  {
    id: "baretec",
    name: "BARETEC Panamá",
    group: "client",
    disciplines: ["marketing"],
    summary: t(
      "Web corporativa con tema WordPress propio y contenido administrable por el equipo.",
      "Corporate website with a custom WordPress theme and team-editable content.",
    ),
    role: t("Desarrollo del tema y estructura de contenido.", "Theme development and content structure."),
    stack: "WordPress · PHP",
    status: t("En producción según su documentación.", "In production according to its documentation."),
    visibility: "private",
  },
  {
    id: "berkfw",
    name: "BERKFW / GymFlow",
    group: "client",
    disciplines: ["product"],
    summary: t(
      "Software de suscripción para entrenadores: planes, esfuerzo percibido (RPE) y registro diario de bienestar.",
      "Subscription software for personal trainers: plans, perceived exertion (RPE) and daily wellness check-ins.",
    ),
    role: t("Producto y desarrollo.", "Product and development."),
    stack: "React · Vite · Node · Supabase",
    status: t("En desarrollo, con una instancia entregada a un entrenador.", "In development, with one instance delivered to a trainer."),
    visibility: "private",
  },
  // Productos propios
  {
    id: "zodesk",
    name: "ZoDesk",
    group: "product",
    disciplines: ["product", "crm", "operations"],
    summary: t(
      "CRM y operación para concesionarios: bandeja de leads, reparto, contratos, crédito, cobros, caja y medición.",
      "CRM and operations for dealerships: lead inbox, assignment, contracts, credit, collections, cash and measurement.",
    ),
    role: t("Creador del producto.", "Product creator."),
    stack: "Python · FastAPI · SQLite · Supabase · Google Docs",
    status: t("En producción con un cliente; ZoChat en desarrollo.", "In production with one client; ZoChat in development."),
    caseId: "zodesk",
    url: "https://zodesk.lat",
    visibility: "private",
  },
  {
    id: "zodesk-talleres",
    name: "ZoDesk para talleres",
    group: "product",
    disciplines: ["product", "operations"],
    summary: t(
      "Órdenes de trabajo, estaciones, materiales, cotizaciones y cobros para talleres.",
      "Work orders, workstations, materials, quotes and payments for workshops.",
    ),
    role: t("Adaptación del producto al flujo del taller.", "Adapting the product to the workshop flow."),
    stack: "Python · FastAPI · SQLite",
    status: t("Primer despliegue documentado; no afirmo uso diario de todos los módulos.", "First documented deployment; daily use of every module not claimed."),
    caseId: "zodesk",
    visibility: "private",
  },
  {
    id: "freedom",
    name: "Freedom",
    group: "product",
    disciplines: ["marketing", "automation"],
    summary: t(
      "Publicador automático del inventario de vehículos en redes sociales, sucesor de un primer publicador experimental.",
      "Automatic publisher of vehicle inventory to social networks, successor to an earlier experimental publisher.",
    ),
    role: t("Producto y dirección del desarrollo.", "Product and development direction."),
    stack: "Node · Python · SQLite · Playwright",
    status: t("En uso interno según su documentación.", "In internal use according to its documentation."),
    caseId: "contenido",
    visibility: "private",
  },
  {
    id: "lifecyclebot",
    name: "LifecycleBot",
    group: "product",
    disciplines: ["automation", "crm"],
    summary: t(
      "Prototipo de vendedor digital por WhatsApp con herramientas de cálculo de letra y reparto de vendedores.",
      "Prototype WhatsApp sales assistant with payment calculation and salesperson assignment tools.",
    ),
    role: t("Prototipo propio.", "Own prototype."),
    stack: "Node.js · Chatwoot · Claude",
    status: t("Prototipo v0.1, superado por ZoChat dentro de ZoDesk.", "Prototype v0.1, superseded by ZoChat inside ZoDesk."),
    visibility: "private",
  },
  {
    id: "eventos-qr",
    name: "Eventos QR",
    group: "product",
    disciplines: ["product", "operations"],
    summary: t(
      "Registro y validación de asistentes con QR y verificación visual, con roles de administración, staff y validación.",
      "Attendee registration and validation with QR codes and visual verification, with admin, staff and validator roles.",
    ),
    role: t("Desarrollo.", "Development."),
    stack: "Next.js · TypeScript · Supabase",
    status: t("Prototipo con documentación insuficiente sobre su uso.", "Prototype with insufficient documentation on its use."),
    visibility: "private",
  },
  {
    id: "libro",
    name: "LIBRO",
    group: "product",
    disciplines: ["product"],
    summary: t(
      "Idea de sistema contable para Panamá y Venezuela.",
      "Concept for an accounting system for Panama and Venezuela.",
    ),
    role: t("Planteamiento inicial.", "Initial concept."),
    stack: "Next.js · TypeScript",
    status: t("Solo estructura inicial; la primera fase no ha arrancado.", "Initial scaffold only; the first phase has not started."),
    visibility: "private",
  },
  // Herramientas y automatizaciones
  {
    id: "dukepulse",
    name: "DukePulse",
    group: "tool",
    disciplines: ["marketing", "automation"],
    summary: t(
      "Reporte diario por Telegram con métricas de Instagram y Facebook.",
      "Daily Telegram report with Instagram and Facebook metrics.",
    ),
    role: t("Desarrollo.", "Development."),
    stack: "Python · Graph API · Telegram",
    status: t("Primera fase documentada; sin evidencia de despliegue.", "First phase documented; no evidence of deployment."),
    url: "https://github.com/DukeCrea/DukePulse",
    visibility: "public",
  },
  {
    id: "postflow",
    name: "PostFlow AI",
    group: "tool",
    disciplines: ["marketing", "automation"],
    summary: t(
      "Bot que prepara y programa publicaciones con textos asistidos por IA, incluido un modo que lee autos disponibles desde el CRM.",
      "Bot that prepares and schedules posts with AI-assisted copy, including a mode that reads available cars from the CRM.",
    ),
    role: t("Desarrollo.", "Development."),
    stack: "Python · Telegram · Claude · Zoho",
    status: t("Herramienta interna; uso actual no verificado.", "Internal tool; current use not verified."),
    caseId: "contenido",
    visibility: "private",
  },
  {
    id: "dukegbp",
    name: "DukeGBP",
    group: "tool",
    disciplines: ["marketing"],
    summary: t(
      "Analizador de perfiles de Google Business Profile con recomendaciones generadas por IA.",
      "Google Business Profile analyzer with AI-generated recommendations.",
    ),
    role: t("Desarrollo.", "Development."),
    stack: "Python · Google APIs · Claude",
    status: t("Prototipo.", "Prototype."),
    visibility: "public",
  },
  {
    id: "duke-agents",
    name: "Duke Agents",
    group: "tool",
    disciplines: ["automation"],
    summary: t(
      "Perfiles de agentes de IA para revisión de código, servidores, prospección, contenido y cotizaciones.",
      "AI agent profiles for code review, servers, prospecting, content and quotes.",
    ),
    role: t("Diseño de los agentes y sus reglas.", "Agent and rule design."),
    stack: "Claude Code",
    status: t("Uso interno; algunos agentes están planeados.", "Internal use; some agents are planned."),
    visibility: "private",
  },
  // Experimentos y documentación secundaria
  {
    id: "lot-analytics",
    name: "Lot analytics",
    group: "lab",
    disciplines: ["operations"],
    summary: t(
      "Idea de cruzar las cámaras del patio con la pauta para medir visitas.",
      "Idea to match lot cameras with ad data to measure visits.",
    ),
    role: t("Planteamiento y base técnica.", "Concept and technical foundation."),
    stack: "Python",
    status: t("Fase 1 de 4; ingesta y panel pendientes.", "Phase 1 of 4; ingestion and dashboard pending."),
    visibility: "private",
  },
  {
    id: "auto-publisher",
    name: "Auto-publisher",
    group: "lab",
    disciplines: ["marketing", "automation"],
    summary: t(
      "Primer publicador de inventario desde el feed del concesionario, antecesor de Freedom.",
      "First inventory publisher fed by the dealership feed, predecessor of Freedom.",
    ),
    role: t("Experimento.", "Experiment."),
    stack: "Node · Playwright · SQLite",
    status: t("Construido con pruebas; sin evidencia de uso en producción.", "Built with tests; no evidence of production use."),
    visibility: "private",
  },
  {
    id: "comment-bot",
    name: "Duke Comment Bot",
    group: "lab",
    disciplines: ["marketing", "automation"],
    summary: t("Respuesta automática a comentarios de Instagram.", "Automatic replies to Instagram comments."),
    role: t("Experimento.", "Experiment."),
    stack: "Python",
    status: t("Experimento sin documentación.", "Undocumented experiment."),
    visibility: "private",
  },
  {
    id: "pyme-inventory",
    name: "PYME Inventory Bot",
    group: "lab",
    disciplines: ["operations", "automation"],
    summary: t("Inventario para pequeños negocios desde un bot.", "Small-business inventory from a bot."),
    role: t("Prototipo.", "Prototype."),
    stack: "Python",
    status: t("Prototipo sin documentación.", "Undocumented prototype."),
    visibility: "private",
  },
  {
    id: "classifieds-scraper",
    name: "Classifieds scraper",
    group: "lab",
    disciplines: ["marketing"],
    summary: t("Lectura de anuncios de portales para alertas de mercado.", "Reading portal listings for market alerts."),
    role: t("Experimento.", "Experiment."),
    stack: "Python",
    status: t("Experimento.", "Experiment."),
    visibility: "private",
  },
  {
    id: "contentchampion-legal",
    name: "ContentChampion legal",
    group: "lab",
    disciplines: ["marketing"],
    summary: t(
      "Páginas legales de la aplicación de Meta usada para el contenido del concesionario.",
      "Legal pages for the Meta app used for the dealership's content.",
    ),
    role: t("Documentación.", "Documentation."),
    stack: "Markdown",
    status: t("Documentación secundaria.", "Secondary documentation."),
    url: "https://github.com/DukeCrea/contentchampion-legal",
    visibility: "public",
  },
];

export function getArchive(lang: Locale): ArchiveProject[] {
  return sources.map((item) => ({
    ...item,
    summary: item.summary[lang],
    role: item.role[lang],
    status: item.status[lang],
  }));
}

export const archiveGroupsOrder: ArchiveGroup[] = ["client", "product", "tool", "lab"];
