import type { Locale } from "./config";

/**
 * Textos del formulario de diagnóstico por idioma.
 *
 * Las claves de `needs` y los `id` de proyecto NO se traducen: viajan al panel
 * interno y a la analítica. Si se tradujeran, los leads en inglés caerían en
 * categorías distintas y los informes quedarían partidos en dos.
 */

export type ProjectId = "web" | "ecommerce" | "automation" | "software" | "data" | "audit";

export type FormDictionary = {
  eyebrow: string;
  title: string;
  subtitle: string;
  progressAria: string;
  progressText: (current: number, total: number) => string;
  success: { title: string; body: string; whatsapp: string; again: string };
  honeypotLabel: string;
  step1: { title: string; hint: string };
  step2: { title: string; hint: string; back: string };
  step3: {
    title: string;
    hint: string;
    name: string;
    namePlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    company: string;
    companyPlaceholder: string;
    email: string;
    budget: string;
    budgetPlaceholder: string;
    timeline: string;
    timelinePlaceholder: string;
    message: string;
    messagePlaceholder: string;
    privacyLead: string;
    privacyLink: string;
    privacyHref: string;
    back: string;
    submit: string;
    submitting: string;
  };
  emailPrompt: string;
  emailFallback: string;
  whatsappMessage: string;
  errors: { step1: string; step3: string; privacy: string; generic: string; retry: string };
  projects: Array<{ id: ProjectId; label: string; shortLabel: string; description: string }>;
  needs: Record<ProjectId, string[]>;
  budgets: string[];
  timelines: string[];
};

export const form: Record<Locale, FormDictionary> = {
  es: {
    eyebrow: "Diagnóstico gratuito",
    title: "Cuéntanos tu proyecto",
    subtitle:
      "Responde unas preguntas rápidas y te decimos cómo convertir tu idea, operación o embudo comercial en infraestructura digital medible.",
    progressAria: "Progreso del formulario",
    progressText: (current, total) => `Paso ${current} de ${total}`,
    success: {
      title: "Recibimos tu solicitud",
      body:
        "Tu oportunidad quedó registrada en el panel interno. Revisaremos tus respuestas y te contactaremos para darte una ruta clara de implementación.",
      whatsapp: "Continuar por WhatsApp",
      again: "Registrar otro proyecto",
    },
    honeypotLabel: "Sitio web",
    step1: {
      title: "¿Qué quieres construir o mejorar?",
      hint: "Elige el punto de partida para orientar el diagnóstico.",
    },
    step2: {
      title: "¿Qué necesitas resolver primero",
      hint: "Esto nos ayuda a estimar impacto, prioridad y ruta de implementación.",
      back: "Volver al tipo de proyecto",
    },
    step3: {
      title: "Datos para preparar tu diagnóstico",
      hint: "La solicitud llega al panel interno como una nueva oportunidad comercial.",
      name: "Nombre completo",
      namePlaceholder: "Tu nombre",
      phone: "WhatsApp o teléfono",
      phonePlaceholder: "+507 0000 0000",
      company: "Empresa",
      companyPlaceholder: "Nombre de tu empresa",
      email: "Correo",
      budget: "Inversión estimada",
      budgetPlaceholder: "Seleccionar rango",
      timeline: "Tiempo ideal",
      timelinePlaceholder: "Seleccionar tiempo",
      message: "Cuéntanos el contexto",
      messagePlaceholder: "Qué tienes hoy, qué necesitas mejorar y qué resultado esperas.",
      privacyLead: "Acepto que CodigoFresco use estos datos para responder mi solicitud, de acuerdo",
      privacyLink: "política de privacidad",
      privacyHref: "/privacidad",
      back: "Volver",
      submit: "Enviar diagnóstico",
      submitting: "Registrando...",
    },
    emailPrompt: "¿Prefieres escribir directo?",
    emailFallback: "Envíanos un email",
    whatsappMessage: "Hola CodigoFresco, completé el formulario de la web y quiero avanzar con mi diagnóstico.",
    errors: {
      step1: "Selecciona el tipo de proyecto y la necesidad principal.",
      step3: "Indica tu nombre y WhatsApp para poder contactarte.",
      privacy: "Debes aceptar la política de privacidad para enviar la solicitud.",
      generic: "No pudimos registrar la solicitud.",
      retry: "No pudimos registrar la solicitud. Inténtalo nuevamente.",
    },
    projects: [
      { id: "web", label: "Página web, WordPress o rediseño", shortLabel: "tu web", description: "Sitios corporativos, landings y presencia digital administrable." },
      { id: "ecommerce", label: "E-commerce o Shopify", shortLabel: "tu tienda online", description: "Tiendas online, catálogos, pagos, inventario y ventas medibles." },
      { id: "automation", label: "Automatización de procesos", shortLabel: "tu automatización", description: "WhatsApp, CRM, formularios, notificaciones, APIs y tareas repetitivas." },
      { id: "software", label: "Software o app a medida", shortLabel: "tu sistema", description: "Sistemas internos, SaaS, portales, paneles y flujos operativos." },
      { id: "data", label: "Panel de datos, Ads o ROI", shortLabel: "tus datos", description: "Métricas, leads, campañas, inversión, dashboards y toma de decisiones." },
      { id: "audit", label: "Auditoría de ecosistema digital", shortLabel: "tu ecosistema digital", description: "Evaluamos web, redes, contenido, pauta y oportunidades de mejora." },
    ],
    needs: {
      web: [
        "Crear una web corporativa desde cero",
        "Rediseñar una web que ya no convierte",
        "Trabajar con WordPress y poder editar contenido",
        "Mejorar velocidad, SEO y estructura",
        "Captar leads con formularios o WhatsApp",
        "Migrar o integrar una web existente",
      ],
      ecommerce: [
        "Lanzar una tienda online nueva",
        "Trabajar con Shopify",
        "Mejorar conversión y checkout",
        "Ordenar productos, inventario y pagos",
        "Integrar envíos, CRM o automatizaciones",
        "Medir ventas, ROAS y recuperación de carritos",
      ],
      automation: [
        "Capturar leads desde WhatsApp, web o redes",
        "Responder mensajes o comentarios automáticamente",
        "Conectar formularios, CRM, Sheets o email",
        "Asignar tareas y seguimiento comercial",
        "Reducir trabajo manual del equipo",
        "Crear un agente con IA para atención",
      ],
      software: [
        "Crear un sistema interno a medida",
        "Automatizar un proceso operativo completo",
        "Construir app web, portal o SaaS",
        "Integrar roles, permisos y base de datos",
        "Reemplazar hojas de cálculo o herramientas sueltas",
        "Escalar o mantener un software existente",
      ],
      data: [
        "Centralizar métricas de leads, ventas o Ads",
        "Crear un dashboard administrativo",
        "Medir ROI, ROAS y pipeline comercial",
        "Conectar Google Ads, Meta Ads o CRM",
        "Recibir alertas y reportes automáticos",
        "Limpiar y ordenar bases de datos",
      ],
      audit: [
        "Auditar web, SEO/GEO y conversión",
        "Evaluar redes sociales y contenido",
        "Revisar inversión en Ads y estrategia",
        "Detectar fugas de leads y seguimiento",
        "Priorizar mejoras de alto impacto",
        "Necesito un diagnóstico completo del ecosistema",
      ],
    },
    budgets: [
      "Menos de USD 1,000",
      "USD 1,000 a 3,000",
      "USD 3,000 a 5,000",
      "USD 5,000 a 10,000",
      "Más de USD 10,000",
      "Prefiero definirlo en el diagnóstico",
    ],
    timelines: ["Lo necesito este mes", "En 30 a 60 días", "En 2 a 3 meses", "Estoy explorando opciones"],
  },
  en: {
    eyebrow: "Free assessment",
    title: "Tell us about your project",
    subtitle:
      "Answer a few quick questions and we'll tell you how to turn your idea, your operation or your sales funnel into digital infrastructure you can measure.",
    progressAria: "Form progress",
    progressText: (current, total) => `Step ${current} of ${total}`,
    success: {
      title: "We got your request",
      body:
        "Your request is logged. We'll review your answers and get back to you with a clear implementation path.",
      whatsapp: "Continue on WhatsApp",
      again: "Submit another project",
    },
    honeypotLabel: "Website",
    step1: {
      title: "What do you want to build or improve?",
      hint: "Pick a starting point so we can aim the assessment.",
    },
    step2: {
      title: "What needs solving first",
      hint: "This helps us weigh impact, priority and the path to implementation.",
      back: "Back to project type",
    },
    step3: {
      title: "Details so we can prepare your assessment",
      hint: "Your request arrives as a new opportunity in our internal dashboard.",
      name: "Full name",
      namePlaceholder: "Your name",
      phone: "Phone or WhatsApp",
      phonePlaceholder: "+1 555 000 0000",
      company: "Company",
      companyPlaceholder: "Your company name",
      email: "Email",
      budget: "Estimated investment",
      budgetPlaceholder: "Select a range",
      timeline: "Ideal timeline",
      timelinePlaceholder: "Select a timeline",
      message: "Give us some context",
      messagePlaceholder: "What you have today, what needs improving and what result you expect.",
      privacyLead: "I agree that CodigoFresco may use this information to respond to my request, per the",
      privacyLink: "privacy policy",
      privacyHref: "/en/privacy",
      back: "Back",
      submit: "Send request",
      submitting: "Sending...",
    },
    emailPrompt: "Prefer to write directly?",
    emailFallback: "Send us an email",
    whatsappMessage: "Hi CodigoFresco, I filled out the form on your site and I'd like to move forward.",
    errors: {
      step1: "Select the project type and the main need.",
      step3: "Add your name and phone so we can reach you.",
      privacy: "You need to accept the privacy policy to send the request.",
      generic: "We couldn't register your request.",
      retry: "We couldn't register your request. Please try again.",
    },
    projects: [
      { id: "web", label: "Website, WordPress or redesign", shortLabel: "your website", description: "Corporate sites, landing pages and a digital presence your team can edit." },
      { id: "ecommerce", label: "E-commerce or Shopify", shortLabel: "your online store", description: "Online stores, catalogs, payments, inventory and measurable sales." },
      { id: "automation", label: "Process automation", shortLabel: "your automation", description: "Messaging, CRM, forms, notifications, APIs and repetitive tasks." },
      { id: "software", label: "Custom software or app", shortLabel: "your system", description: "Internal systems, SaaS, portals, dashboards and operational workflows." },
      { id: "data", label: "Data dashboard, ads or ROI", shortLabel: "your data", description: "Metrics, leads, campaigns, spend, dashboards and decision-making." },
      { id: "audit", label: "Digital ecosystem audit", shortLabel: "your digital ecosystem", description: "We review site, social, content, paid media and where the gains are." },
    ],
    needs: {
      web: [
        "Build a corporate website from scratch",
        "Redesign a site that stopped converting",
        "Move to WordPress so we can edit content",
        "Improve speed, SEO and structure",
        "Capture leads through forms or messaging",
        "Migrate or integrate an existing site",
      ],
      ecommerce: [
        "Launch a new online store",
        "Build or improve a Shopify store",
        "Improve conversion and checkout",
        "Organize products, inventory and payments",
        "Integrate shipping, CRM or automation",
        "Measure sales, ROAS and cart recovery",
      ],
      automation: [
        "Capture leads from messaging, site or social",
        "Answer messages or comments automatically",
        "Connect forms, CRM, spreadsheets or email",
        "Assign tasks and sales follow-up",
        "Cut the team's manual work",
        "Build an AI agent for customer service",
      ],
      software: [
        "Build a custom internal system",
        "Automate a full operational process",
        "Build a web app, portal or SaaS",
        "Integrate roles, permissions and a database",
        "Replace spreadsheets or disconnected tools",
        "Scale or maintain existing software",
      ],
      data: [
        "Centralize lead, sales or ad metrics",
        "Build an admin dashboard",
        "Measure ROI, ROAS and sales pipeline",
        "Connect Google Ads, Meta Ads or CRM",
        "Get automatic alerts and reports",
        "Clean up and organize our databases",
      ],
      audit: [
        "Audit site, SEO/GEO and conversion",
        "Evaluate social media and content",
        "Review ad spend and strategy",
        "Find where leads and follow-up leak out",
        "Prioritize high-impact improvements",
        "I need a full assessment of the ecosystem",
      ],
    },
    budgets: [
      "Under USD 1,000",
      "USD 1,000 to 3,000",
      "USD 3,000 to 5,000",
      "USD 5,000 to 10,000",
      "Over USD 10,000",
      "I'd rather define it in the assessment",
    ],
    timelines: ["I need it this month", "In 30 to 60 days", "In 2 to 3 months", "I'm exploring options"],
  },
};

export function getForm(lang: Locale = "es") {
  return form[lang];
}
