import type { Service } from "../site";

/**
 * Servicios que nacen de los casos del portafolio.
 *
 * Cada uno se apoya en trabajo documentado; las preguntas frecuentes dicen lo
 * que no se ofrece o no está probado. No hay tarifas ni plazos: se definen
 * después de revisar el proceso.
 */

export const portfolioServicesEs: Service[] = [
  {
    slug: "implementacion-crm-seguimiento-comercial",
    category: "automation",
    categoryLabel: "CRM",
    icon: "users",
    title: "Consultoría e implementación de CRM",
    shortTitle: "Implementación CRM",
    metaTitle: "Consultoría e implementación de CRM y Zoho CRM",
    metaDescription:
      "Implementación de CRM y seguimiento comercial: etapas, reparto de leads, avisos de atención, integración de Zoho CRM con la web y reportes, a partir de casos reales.",
    eyebrow: "CRM y seguimiento comercial",
    heroTitle: "Un CRM que el equipo usa porque le dice qué hacer a continuación",
    summary:
      "Diseño el proceso comercial antes de tocar la herramienta: etapas, reglas de reparto, avisos y motivos de cierre, conectados con la web y los canales.",
    description:
      "Un CRM falla cuando solo guarda contactos. Empiezo por el recorrido real del cliente y del equipo, defino etapas, responsables, reglas de reparto, avisos cuando nadie atiende y motivos de pérdida normalizados. Luego lo implemento: con Zoho CRM (sincronización con la web, reintentos y enlaces directos a los registros que hay que completar) o con ZoDesk, el CRM que creé para concesionarios.",
    outcomes: [
      "Cada lead tiene origen, responsable y siguiente acción.",
      "Los motivos de pérdida se registran igual para todos y se pueden analizar.",
      "La dirección ve el avance del embudo sin pedir reportes a mano.",
    ],
    deliverables: [
      "Mapa del proceso comercial y sus etapas",
      "Reglas de reparto y avisos de atención",
      "Integración de formularios y web con el CRM",
      "Sincronización con Zoho CRM y reintentos ante fallos",
      "Motivos de descarte y campos obligatorios",
      "Paneles o reportes de seguimiento",
    ],
    process: ["Revisión del proceso actual", "Diseño de etapas y reglas", "Configuración o desarrollo", "Piloto con el equipo", "Ajustes con datos reales"],
    stack: ["Zoho CRM", "ZoDesk", "Laravel", "FastAPI", "Google Workspace", "WhatsApp"],
    faq: [
      {
        q: "¿Trabajas con Zoho CRM?",
        a: "Sí. Integré Zoho CRM con la web de un concesionario: sincronización de leads y ventas, reintentos cuando la API falla y alertas con enlace directo al registro que hay que completar.",
      },
      {
        q: "¿Conviene un CRM a medida o uno del mercado?",
        a: "Depende del proceso. Uno del mercado suele bastar si el proceso es estándar. ZoDesk nació porque un concesionario necesitaba contratos, crédito, cobros y operación en el mismo recorrido.",
      },
      {
        q: "¿Atiendes empresas fuera de Panamá?",
        a: "Sí, en remoto. Mi experiencia directa está en Panamá y Venezuela, y estoy disponible para empresas en España.",
      },
    ],
    related: ["control-gestion-atencion-leads", "automatizacion-marketing-procesos-comerciales", "panel-monitor-administrativo-inteligente"],
  },
  {
    slug: "automatizacion-marketing-procesos-comerciales",
    category: "automation",
    categoryLabel: "Automatización",
    icon: "zap",
    title: "Automatización de marketing y procesos comerciales",
    shortTitle: "Automatización comercial",
    metaTitle: "Automatización de marketing y procesos comerciales",
    metaDescription:
      "Automatización de marketing y ventas conectada a datos reales: catálogos desde el inventario, seguimiento segmentado, alertas, reportes por correo y medición del origen a la venta.",
    eyebrow: "Marketing conectado con datos y operación",
    heroTitle: "Automatizar lo repetitivo y medir lo que de verdad decide",
    summary:
      "Conecto inventario, campañas, CRM y correo para que lo que se anuncia exista, lo que se mide sea cierto y lo que falla avise.",
    description:
      "Automatizo donde hoy se pierde información en silencio: catálogos que anuncian productos vendidos, leads que pierden su origen, seguimientos que dependen de la memoria de alguien, reportes que se arman a mano. Cada automatización lleva su medición y su alerta, y separo lo que es hipótesis de lo que ya está comprobado.",
    outcomes: [
      "Catálogos y anuncios alineados con el inventario real.",
      "Origen del lead conservado hasta el CRM y la venta.",
      "Fallos de integración detectados antes de que cuesten dinero.",
    ],
    deliverables: [
      "Catálogos y feeds generados desde el inventario",
      "Captura de origen con UTM e identificadores de clic",
      "Correos de seguimiento segmentados, con frenos anti-duplicados",
      "Alertas de fallos silenciosos",
      "Reportes automáticos por correo",
      "Conversiones devueltas a las plataformas de anuncios",
    ],
    process: ["Diagnóstico de fugas", "Prioridades por impacto", "Implementación por etapas", "Alertas y medición", "Revisión con el equipo"],
    stack: ["Meta Marketing API", "Conversions API", "Google Ads", "GA4", "Laravel", "Resend", "Brevo"],
    faq: [
      {
        q: "¿Qué automatizas primero?",
        a: "Lo que se pierde sin que nadie lo vea: un catálogo desactualizado, un formulario que dejó de enviar o leads sin dueño. Después, lo que consume más horas del equipo.",
      },
      {
        q: "¿Prometes más ventas?",
        a: "No prometo resultados de ventas. Entrego sistemas medibles y digo qué está demostrado y qué sigue siendo una hipótesis.",
      },
      {
        q: "¿Usas inteligencia artificial?",
        a: "Sí, como herramienta de construcción y para tareas concretas como redactar borradores o leer documentos. Las reglas de negocio y la revisión final son humanas.",
      },
    ],
    related: ["implementacion-crm-seguimiento-comercial", "gestion-control-ads", "calculo-roi-publicitario"],
  },
  {
    slug: "integracion-ecommerce-erp",
    category: "dev",
    categoryLabel: "Integraciones",
    icon: "package",
    title: "Integración de e-commerce con ERP",
    shortTitle: "E-commerce + ERP",
    metaTitle: "Integración de e-commerce con ERP: SAINT y otros sistemas",
    metaDescription:
      "Integración de tiendas online con ERP locales como SAINT: agente saliente, precio y stock por mercado, cola local, reintentos y prevención de duplicados. Experiencia en Panamá y Venezuela.",
    eyebrow: "E-commerce conectado al ERP",
    heroTitle: "Tu tienda online con el inventario real del ERP, sin exponerlo a internet",
    summary:
      "Un agente lee el ERP en el equipo del cliente y publica precio y stock en la web por conexiones solo salientes, con cola local y reintentos.",
    description:
      "Muchas empresas en Venezuela y Panamá operan con un ERP instalado en un equipo local. Conectarlo con una tienda online no exige abrir puertos ni cambiar de sistema: un agente lee lo necesario con permisos mínimos, guarda una cola local para sobrevivir a cortes y envía los datos por HTTPS a la plataforma. Cada mercado conserva su moneda, su lista de precio y su depósito.",
    outcomes: [
      "Precio y stock de la web alineados con el ERP de cada sede.",
      "Sin puertos abiertos ni accesos entrantes a la red del cliente.",
      "Registro y alertas cuando un agente deja de reportar.",
    ],
    deliverables: [
      "Revisión del esquema del ERP en sitio",
      "Agente de sincronización como servicio de Windows",
      "Contrato de datos y endpoints en la plataforma",
      "Separación de precio, moneda y stock por mercado",
      "Cola local, reintentos y prevención de duplicados",
      "Panel de agentes y alertas de salud",
    ],
    process: ["Diagnóstico en sitio", "Lectura en modo piloto", "Publicación del catálogo", "Monitoreo", "Escritura solo con autorización"],
    stack: ["Go", "SQL Server", "SQLite", "Laravel", "Filament", "PowerShell"],
    faq: [
      {
        q: "¿Funciona con SAINT?",
        a: "Sí. Es el caso que documento: lectura de productos y existencias por depósito en dos sedes, con su catálogo publicado en la web.",
      },
      {
        q: "¿Hay que abrir puertos o tener IP pública?",
        a: "No. El agente solo hace conexiones salientes, lo que también funciona con enlaces satelitales o redes compartidas.",
      },
      {
        q: "¿Los pedidos se registran en el ERP?",
        a: "Es técnicamente posible, pero solo lo habilito con la configuración completa y la autorización escrita del cliente. En el caso documentado esa escritura sigue pendiente de autorización.",
      },
      {
        q: "¿Sirve para otros ERP?",
        a: "El lector es intercambiable (SQL directo, servicio REST o archivo CSV). Cada ERP exige revisar su esquema en sitio antes de prometer nada.",
      },
    ],
    related: ["e-commerce", "desarrollo-de-software", "panel-monitor-administrativo-inteligente"],
  },
  {
    slug: "sistemas-concesionarios-talleres",
    category: "automation",
    categoryLabel: "Automoción",
    icon: "users",
    title: "Sistemas para concesionarios y talleres",
    shortTitle: "Concesionarios y talleres",
    metaTitle: "Software para concesionarios y talleres: CRM y operación",
    metaDescription:
      "ZoDesk para concesionarios y talleres: leads con origen y reparto, chat de financiamiento, contratos, crédito, cobros, órdenes de trabajo, estaciones, materiales y cotizaciones.",
    eyebrow: "Automoción",
    heroTitle: "Del lead al contrato y del taller al cobro, en un mismo sistema",
    summary:
      "ZoDesk une captación, seguimiento, documentos, cobros y operación para concesionarios, con una variante para talleres.",
    description:
      "Un concesionario y un taller pierden contexto en cada salto entre personas y herramientas. ZoDesk, el producto que creé, recibe los leads con su origen, los reparte, genera contratos y casos de crédito, controla cobros y caja, y mide el recorrido. La variante para talleres organiza órdenes, estaciones, materiales, cotizaciones y cobros.",
    outcomes: [
      "Leads con dueño y avisos cuando nadie los atiende.",
      "Contratos y documentos generados desde los datos, sin copiar a mano.",
      "Operación y cobros visibles para la oficina.",
    ],
    deliverables: [
      "Bandeja de leads con origen y reglas de reparto",
      "Chat de financiamiento con precalificación orientativa",
      "Contratos, cotizaciones y casos de crédito",
      "Cobros, caja y cuentas por cobrar",
      "Órdenes de trabajo, estaciones y materiales para talleres",
      "Indicadores del recorrido del lead",
    ],
    process: ["Recorrido del negocio", "Configuración por roles", "Migración de datos", "Puesta en marcha por módulos", "Mejora continua"],
    stack: ["ZoDesk", "Python", "FastAPI", "Google Docs y Drive", "WhatsApp Cloud API", "Web Push"],
    faq: [
      {
        q: "¿ZoDesk ya está en uso?",
        a: "Sí, en producción con un concesionario en Panamá. La variante para talleres tiene su primer despliegue con un taller en Portugal.",
      },
      {
        q: "¿Incluye facturación o pagos en línea?",
        a: "No. Hoy no incluye facturación electrónica ni cobro en línea.",
      },
      {
        q: "¿El chat de financiamiento aprueba créditos?",
        a: "No. Orienta sobre un camino posible por banco o financiera; la aprobación la da la entidad.",
      },
    ],
    related: ["implementacion-crm-seguimiento-comercial", "control-gestion-atencion-leads", "desarrollo-de-software"],
  },
];

export const portfolioServicesEn: Service[] = [
  {
    slug: "crm-implementation-sales-follow-up",
    category: "automation",
    categoryLabel: "CRM",
    icon: "users",
    title: "CRM Consulting and Implementation",
    shortTitle: "CRM implementation",
    metaTitle: "CRM and Zoho CRM Consulting and Implementation",
    metaDescription:
      "CRM implementation and sales follow-up: stages, lead assignment, response alerts, Zoho CRM integration with your website and reporting, based on real cases.",
    eyebrow: "CRM and sales follow-up",
    heroTitle: "A CRM the team uses because it tells them what to do next",
    summary:
      "I design the sales process before touching the tool: stages, assignment rules, alerts and loss reasons, connected to the website and channels.",
    description:
      "A CRM fails when it only stores contacts. I start from the real customer and team journey, define stages, owners, assignment rules, alerts when nobody responds and standardized loss reasons. Then I implement it: with Zoho CRM (website sync, retries and direct links to records that need completing) or with ZoDesk, the CRM I created for car dealerships.",
    outcomes: [
      "Every lead has a source, an owner and a next action.",
      "Loss reasons are recorded consistently and can be analyzed.",
      "Leadership sees funnel progress without asking for manual reports.",
    ],
    deliverables: [
      "Sales process map and stages",
      "Assignment rules and response alerts",
      "Form and website integration with the CRM",
      "Zoho CRM sync with retries on failure",
      "Loss reasons and required fields",
      "Follow-up dashboards or reports",
    ],
    process: ["Current process review", "Stage and rule design", "Configuration or development", "Pilot with the team", "Adjustments with real data"],
    stack: ["Zoho CRM", "ZoDesk", "Laravel", "FastAPI", "Google Workspace", "WhatsApp"],
    faq: [
      {
        q: "Do you work with Zoho CRM?",
        a: "Yes. I integrated Zoho CRM with a dealership's website: lead and sales sync, retries when the API fails, and alerts with a direct link to the record that needs completing.",
      },
      {
        q: "Custom CRM or an off-the-shelf one?",
        a: "It depends on the process. An off-the-shelf CRM is usually enough for a standard process. ZoDesk exists because a dealership needed contracts, credit, collections and operations in the same journey.",
      },
      {
        q: "Do you work with companies outside Panama?",
        a: "Yes, remotely. My direct experience is in Panama and Venezuela, and I am available for companies in Spain.",
      },
    ],
    related: ["lead-management", "marketing-sales-process-automation", "intelligent-admin-dashboard"],
  },
  {
    slug: "marketing-sales-process-automation",
    category: "automation",
    categoryLabel: "Automation",
    icon: "zap",
    title: "Marketing and Sales Process Automation",
    shortTitle: "Sales automation",
    metaTitle: "Marketing and Sales Process Automation",
    metaDescription:
      "Marketing and sales automation built on real data: inventory-driven catalogs, segmented follow-up, alerts, email reports and measurement from source to sale.",
    eyebrow: "Marketing connected to data and operations",
    heroTitle: "Automate the repetitive work and measure what actually drives decisions",
    summary:
      "I connect inventory, campaigns, CRM and email so what you advertise exists, what you measure is true and what breaks raises an alert.",
    description:
      "I automate where information is being lost silently today: catalogs advertising sold products, leads losing their source, follow-ups that depend on someone's memory, reports assembled by hand. Every automation comes with its measurement and its alert, and I keep hypotheses separate from proven results.",
    outcomes: [
      "Catalogs and ads aligned with real inventory.",
      "Lead source preserved through to the CRM and the sale.",
      "Integration failures caught before they cost money.",
    ],
    deliverables: [
      "Catalogs and feeds generated from inventory",
      "Source capture with UTMs and click IDs",
      "Segmented follow-up emails with duplicate protection",
      "Silent-failure alerts",
      "Automated email reports",
      "Conversions sent back to ad platforms",
    ],
    process: ["Leak diagnosis", "Priorities by impact", "Staged implementation", "Alerts and measurement", "Review with the team"],
    stack: ["Meta Marketing API", "Conversions API", "Google Ads", "GA4", "Laravel", "Resend", "Brevo"],
    faq: [
      {
        q: "What do you automate first?",
        a: "Whatever is being lost without anyone noticing: an outdated catalog, a form that stopped sending, leads with no owner. Then whatever takes up the most team hours.",
      },
      {
        q: "Do you promise more sales?",
        a: "I don't promise sales results. I deliver measurable systems and state what is proven and what is still a hypothesis.",
      },
      {
        q: "Do you use AI?",
        a: "Yes, as a build tool and for specific tasks such as drafting copy or reading documents. Business rules and final review stay human.",
      },
    ],
    related: ["crm-implementation-sales-follow-up", "ads-management", "advertising-roi"],
  },
  {
    slug: "ecommerce-erp-integration",
    category: "dev",
    categoryLabel: "Integrations",
    icon: "package",
    title: "E-commerce and ERP Integration",
    shortTitle: "E-commerce + ERP",
    metaTitle: "E-commerce and ERP Integration: SAINT and Other Systems",
    metaDescription:
      "Integrating online stores with on-premise ERPs such as SAINT: outbound agent, per-market price and stock, local queue, retries and duplicate prevention. Experience in Panama and Venezuela.",
    eyebrow: "E-commerce connected to the ERP",
    heroTitle: "Your online store with real ERP inventory, without exposing it to the internet",
    summary:
      "An agent reads the ERP on the client's machine and publishes price and stock online over outbound-only connections, with a local queue and retries.",
    description:
      "Many companies in Venezuela and Panama run an ERP installed on a local machine. Connecting it to an online store doesn't require opening ports or switching systems: an agent reads only what's needed with minimal permissions, keeps a local queue to survive outages and sends data over HTTPS to the platform. Each market keeps its own currency, price list and warehouse.",
    outcomes: [
      "Website price and stock aligned with each site's ERP.",
      "No open ports or inbound access to the client's network.",
      "Logs and alerts when an agent stops reporting.",
    ],
    deliverables: [
      "On-site ERP schema review",
      "Sync agent running as a Windows service",
      "Data contract and platform endpoints",
      "Per-market price, currency and stock",
      "Local queue, retries and duplicate prevention",
      "Agents panel and health alerts",
    ],
    process: ["On-site diagnosis", "Pilot read mode", "Catalog publishing", "Monitoring", "Writes only with authorization"],
    stack: ["Go", "SQL Server", "SQLite", "Laravel", "Filament", "PowerShell"],
    faq: [
      {
        q: "Does it work with SAINT?",
        a: "Yes. That is the documented case: reading products and stock per warehouse at two sites, with the catalog published online.",
      },
      {
        q: "Do we need open ports or a public IP?",
        a: "No. The agent only makes outbound connections, which also works over satellite links or shared networks.",
      },
      {
        q: "Are orders written into the ERP?",
        a: "It is technically possible, but I only enable it with complete configuration and the client's written authorization. In the documented case, writing is still pending authorization.",
      },
      {
        q: "Does it work with other ERPs?",
        a: "The reader is swappable (direct SQL, REST service or CSV file). Each ERP needs an on-site schema review before promising anything.",
      },
    ],
    related: ["e-commerce", "custom-software-development", "intelligent-admin-dashboard"],
  },
  {
    slug: "dealership-workshop-systems",
    category: "automation",
    categoryLabel: "Automotive",
    icon: "users",
    title: "Systems for Car Dealerships and Workshops",
    shortTitle: "Dealerships and workshops",
    metaTitle: "Car Dealership and Workshop Software: CRM and Operations",
    metaDescription:
      "ZoDesk for dealerships and workshops: leads with source and assignment, financing chat, contracts, credit, collections, work orders, workstations, materials and quotes.",
    eyebrow: "Automotive",
    heroTitle: "From lead to contract and from workshop to payment, in one system",
    summary:
      "ZoDesk brings together acquisition, follow-up, documents, collections and operations for dealerships, with a workshop variant.",
    description:
      "Dealerships and workshops lose context at every hand-off between people and tools. ZoDesk, the product I created, receives leads with their source, assigns them, generates contracts and credit cases, tracks collections and cash, and measures the journey. The workshop variant organizes work orders, workstations, materials, quotes and payments.",
    outcomes: [
      "Leads with an owner and alerts when nobody responds.",
      "Contracts and documents generated from data, with no manual copying.",
      "Operations and collections visible to the office.",
    ],
    deliverables: [
      "Lead inbox with source and assignment rules",
      "Financing chat with indicative pre-qualification",
      "Contracts, quotes and credit cases",
      "Collections, cash and receivables",
      "Work orders, workstations and materials for workshops",
      "Lead journey indicators",
    ],
    process: ["Business walkthrough", "Role-based setup", "Data migration", "Module-by-module launch", "Continuous improvement"],
    stack: ["ZoDesk", "Python", "FastAPI", "Google Docs and Drive", "WhatsApp Cloud API", "Web Push"],
    faq: [
      {
        q: "Is ZoDesk already in use?",
        a: "Yes, in production with a car dealership in Panama. The workshop variant has its first deployment with a workshop in Portugal.",
      },
      {
        q: "Does it include invoicing or online payments?",
        a: "No. It currently does not include e-invoicing or online payment collection.",
      },
      {
        q: "Does the financing chat approve credit?",
        a: "No. It points to a possible bank or finance-company route; approval comes from the lender.",
      },
    ],
    related: ["crm-implementation-sales-follow-up", "lead-management", "custom-software-development"],
  },
];
