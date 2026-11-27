import Link from "next/link";

import type { Locale } from "../../lib/i18n/config";
import { caseHref, getCases } from "../../lib/portfolio";
import { getWhatsAppUrl } from "../../lib/site";
import { Mascot } from "../brand/mascot";
import { MascotSwitch } from "../brand/mascot-switch";
import { MascotCue, PixelArrow, Pixels } from "../brand/pixels";
import { LeadLights } from "./demos/lead-lights";
import { CaseGrid } from "./filters";

/**
 * Portada de Código Fresco.
 *
 * Recorrido: Hero → Servicios → Soluciones → Proyectos → Metodología → Contacto.
 * La mascota hila las secciones: abre la página, presenta cada bloque con un
 * comentario de código y cierra con la invitación a conversar. La variante
 * corporativa aparece donde se habla de problemas de empresa.
 */

type ServiceCard = { tag: string; title: string; body: string; href: string };

const copy = {
  es: {
    eyebrow: "desarrollo web · automatización · IA · CRM",
    title1: "Código fresco.",
    title2: "Ideas que funcionan.",
    intro:
      "Diseñamos y construimos sitios web, automatizaciones, asistentes con inteligencia artificial y CRM que conectan marketing, ventas y operación. Primero entendemos el problema; después escribimos el código.",
    ctaTalk: "Conversemos tu proyecto",
    ctaWork: "Ver proyectos",
    sticker: "Ideas frescas que funcionan.",
    stickerCorporate: "También vamos de traje.",
    toCorporate: "Más corporativo",
    toFresh: "Más fresco",
    altFresh: "Mascota de Código Fresco: un chico de gafas con símbolos de código que infla un chicle verde.",
    altCorporate: "Mascota de Código Fresco en su versión corporativa, de traje y corbata verde.",
    announceFresh: "Versión fresca de la mascota.",
    announceCorporate: "Versión corporativa de la mascota.",
    facts: [
      ["8", "casos documentados con su estado real"],
      ["2016", "trabajando en marketing y procesos comerciales"],
      ["3", "mercados: Panamá, Venezuela y España"],
    ],
    cueServices: "lo que sabemos hacer",
    servicesTitle: "Servicios",
    servicesIntro: "Seis frentes, un solo equipo. Cada servicio nace de trabajo que ya está documentado en los proyectos.",
    servicesAll: "Ver todos los servicios",
    more: "Ver servicio",
    services: [
      { tag: "<web />", title: "Desarrollo web", body: "Sitios corporativos, tiendas en línea y landing pages en WordPress, Shopify o Next.js, listos para Google.", href: "/servicios/paginas-web-corporativas" },
      { tag: "<auto />", title: "Automatización", body: "Catálogos, seguimientos y reportes que se ejecutan solos y avisan cuando algo falla.", href: "/servicios/automatizacion-marketing-procesos-comerciales" },
      { tag: "<ia />", title: "Inteligencia artificial", body: "Asistentes para WhatsApp y redes que responden, califican y entregan el contexto al asesor.", href: "/servicios/chatbot-whatsapp-redes-sociales-ia" },
      { tag: "<crm />", title: "CRM", body: "Etapas, reparto de leads y avisos de atención, con Zoho CRM o con ZoDesk, nuestro propio producto.", href: "/servicios/implementacion-crm-seguimiento-comercial" },
      { tag: "<api />", title: "Integraciones", body: "Tu tienda conectada al ERP: precio y existencias reales sin exponer el sistema a internet.", href: "/servicios/integracion-ecommerce-erp" },
      { tag: "<app />", title: "Software a medida", body: "Paneles, sistemas internos y aplicaciones web hechos para la forma en que trabaja tu empresa.", href: "/servicios/desarrollo-de-software" },
    ] as ServiceCard[],
    cueSolutions: "los problemas que resolvemos",
    solutionsTitle: "Problemas de negocio, no de tecnología",
    solutionsIntro: "Nadie nos llama porque quiere «una API». Nos llaman porque algo se está perdiendo. Estos son cuatro problemas reales y lo que construimos para cada uno.",
    problem: "El problema",
    built: "Lo que construimos",
    solutions: [
      ["Se anunciaban autos que ya estaban vendidos.", "Catálogo publicitario sincronizado por API cada hora, con alerta si deja de cuadrar.", "marketing-dinamico"],
      ["Un formulario de crédito largo no orienta a nadie.", "Chatform con preguntas condicionales y reglas de precalificación.", "chatform"],
      ["Nadie veía dónde se detenían los leads.", "Monitor de leads con umbrales, acciones propuestas y decisiones registradas.", "paneles"],
      ["El ERP de cada sede no podía exponerse a internet.", "Agente en Go con conexión solo saliente y cola local.", "saint"],
    ] as Array<[string, string, string]>,
    corporateNote: "Para la reunión de directorio también tenemos traje.",
    cueProjects: "casos reales, con su estado verificado",
    projectsTitle: "Proyectos",
    projectsIntro: "Filtra por disciplina. Cada caso explica la necesidad, las decisiones, lo construido y el estado real de cada pieza: en producción, probado, construido o pendiente.",
    lightsEyebrow: "// ver la data",
    lightsTitle: "Cada luz es un lead",
    lightsBody:
      "Esta vista del monitor de leads de ZoDesk muestra en segundos dónde se quedan las oportunidades: avanzan de izquierda a derecha y, en cada puerta, las que no pasan caen debajo con su porqué. Elige un canal para comparar.",
    lightsCta: "Ver el caso de paneles",
    zodeskTitle: "ZoDesk conecta las piezas",
    zodeskBody:
      "Nuestro producto para concesionarios une captación, cualificación, CRM, asignación, documentos, ventas, operación y medición. Tiene una variante para talleres.",
    zodeskCta: "Ver el ecosistema",
    zodeskSteps: ["Captación", "Cualificación", "CRM", "Asignación", "Documentos", "Ventas", "Operación", "Medición"],
    cueMethod: "cómo trabajamos",
    methodTitle: "Metodología",
    method: [
      ["Diagnóstico", "Buscamos dónde se pierde el contexto: un lead sin dueño, una cifra que nadie revisa, un catálogo desactualizado."],
      ["Diseño", "Definimos reglas, pantallas y la decisión que debe permitir cada dato."],
      ["Desarrollo", "Construimos con agentes de IA bajo dirección humana y revisamos cada entrega con pruebas."],
      ["Implementación", "Lo ponemos en marcha con tu equipo, con datos reales y un piloto."],
      ["Optimización", "Medimos, separamos hipótesis de resultados y ajustamos."],
    ],
    cueContact: "tu turno",
    contactTitle1: "¿Tienes una idea?",
    contactTitle2: "Hagamos que funcione.",
    contactBody: "Cuéntanos qué quieres resolver. Respondemos con una primera lectura del reto y los siguientes pasos, sin compromiso.",
    whatsapp: "Escribir por WhatsApp",
    hire: "¿Buscas contratar a Antonio Duque para tu equipo?",
    hireCta: "Ver perfil y disponibilidad",
  },
  en: {
    eyebrow: "web development · automation · AI · CRM",
    title1: "Fresh code.",
    title2: "Ideas that work.",
    intro:
      "We design and build websites, automations, AI assistants and CRMs that connect marketing, sales and operations. First we understand the problem; then we write the code.",
    ctaTalk: "Let's talk about your project",
    ctaWork: "See the work",
    sticker: "Fresh ideas that work.",
    stickerCorporate: "We clean up nicely, too.",
    toCorporate: "More corporate",
    toFresh: "Fresher",
    altFresh: "Código Fresco mascot: a boy with code symbols on his glasses blowing a green bubble gum.",
    altCorporate: "Código Fresco mascot in its corporate version, wearing a suit and green tie.",
    announceFresh: "Fresh version of the mascot.",
    announceCorporate: "Corporate version of the mascot.",
    facts: [
      ["8", "case studies with their real status"],
      ["2016", "working in marketing and sales processes"],
      ["3", "markets: Panama, Venezuela and Spain"],
    ],
    cueServices: "what we do",
    servicesTitle: "Services",
    servicesIntro: "Six fronts, one team. Every service comes from work that is already documented in the projects.",
    servicesAll: "See all services",
    more: "See service",
    services: [
      { tag: "<web />", title: "Web development", body: "Corporate sites, online stores and landing pages on WordPress, Shopify or Next.js, ready for Google.", href: "/en/services" },
      { tag: "<auto />", title: "Automation", body: "Catalogs, follow-ups and reports that run on their own and warn you when something breaks.", href: "/en/services/marketing-sales-process-automation" },
      { tag: "<ai />", title: "Artificial intelligence", body: "Assistants for WhatsApp and social media that answer, qualify and hand the context to your sales team.", href: "/en/services" },
      { tag: "<crm />", title: "CRM", body: "Stages, lead routing and attention alerts, with Zoho CRM or ZoDesk, our own product.", href: "/en/services/crm-implementation-sales-follow-up" },
      { tag: "<api />", title: "Integrations", body: "Your store connected to the ERP: real prices and stock without exposing the system to the internet.", href: "/en/services/ecommerce-erp-integration" },
      { tag: "<app />", title: "Custom software", body: "Dashboards, internal systems and web apps built around the way your company works.", href: "/en/services" },
    ] as ServiceCard[],
    cueSolutions: "the problems we solve",
    solutionsTitle: "Business problems, not technology problems",
    solutionsIntro: "Nobody calls us because they want “an API”. They call because something is getting lost. Here are four real problems and what we built for each.",
    problem: "The problem",
    built: "What we built",
    solutions: [
      ["Cars that were already sold were still being advertised.", "An ad catalog synced by API every hour, with an alert when it stops matching.", "marketing-dinamico"],
      ["A long credit form guides nobody.", "A chatform with conditional questions and pre-qualification rules.", "chatform"],
      ["Nobody could see where leads were getting stuck.", "A lead monitor with thresholds, suggested actions and recorded decisions.", "paneles"],
      ["Each site's ERP could not be exposed to the internet.", "A Go agent with outbound-only connections and a local queue.", "saint"],
    ] as Array<[string, string, string]>,
    corporateNote: "We also own a suit for the board meeting.",
    cueProjects: "real cases, with verified status",
    projectsTitle: "Projects",
    projectsIntro: "Filter by discipline. Each case covers the need, the decisions, what was built and the real status of each piece: in production, tested, built or pending.",
    lightsEyebrow: "// seeing the data",
    lightsTitle: "Each light is a lead",
    lightsBody:
      "This view from ZoDesk's lead monitor shows in seconds where opportunities get stuck: they move left to right, and at each gate those that don't pass drop below with their reason. Pick a channel to compare.",
    lightsCta: "See the dashboards case",
    zodeskTitle: "ZoDesk connects the pieces",
    zodeskBody:
      "Our product for car dealerships brings together acquisition, qualification, CRM, assignment, documents, sales, operations and measurement. It has a workshop variant.",
    zodeskCta: "See the ecosystem",
    zodeskSteps: ["Acquisition", "Qualification", "CRM", "Assignment", "Documents", "Sales", "Operations", "Measurement"],
    cueMethod: "how we work",
    methodTitle: "Method",
    method: [
      ["Diagnosis", "We look for where context gets lost: a lead with no owner, a number nobody checks, an outdated catalog."],
      ["Design", "We define rules, screens and the decision each piece of data should enable."],
      ["Development", "We build with AI agents under human direction and review every delivery with tests."],
      ["Implementation", "We launch it with your team, with real data and a pilot."],
      ["Optimization", "We measure, separate hypotheses from results and adjust."],
    ],
    cueContact: "your turn",
    contactTitle1: "Got an idea?",
    contactTitle2: "Let's make it work.",
    contactBody: "Tell us what you want to solve. We reply with a first read of the challenge and the next steps, no strings attached.",
    whatsapp: "Message us on WhatsApp",
    hire: "Looking to hire Antonio Duque for your team?",
    hireCta: "See profile and availability",
  },
} as const;

const section = "px-4 sm:px-6 lg:px-8";

export function PortfolioHome({ lang }: { lang: Locale }) {
  const c = copy[lang];
  const cases = getCases(lang);
  const byId = Object.fromEntries(cases.map((x) => [x.id, x]));
  const contact = lang === "es" ? "/contacto" : "/en/contact";
  const casesIndex = lang === "es" ? "/casos" : "/en/cases";
  const servicesIndex = lang === "es" ? "/servicios" : "/en/services";
  const projectAnchor = `${contact}${lang === "es" ? "#proyecto" : "#project"}`;
  const hireAnchor = `${contact}${lang === "es" ? "#empleo" : "#hiring"}`;

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className={`relative overflow-hidden pb-16 pt-10 lg:pb-24 lg:pt-16 ${section}`}>
        <div aria-hidden="true" className="cf-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_30%,black_10%,transparent_65%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center">
          <div>
            <p className="cf-eyebrow cf-caret">{`> ${c.eyebrow}`}</p>
            <h1 className="font-display mt-5 text-[2.75rem] leading-[0.98] text-white sm:text-6xl lg:text-7xl xl:text-[5.4rem]">
              {c.title1}
              <br />
              <em className="text-lime-400">{c.title2}</em>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-gray-300">{c.intro}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href={projectAnchor} className="cf-btn">
                {c.ctaTalk}
                <PixelArrow />
              </Link>
              <Link href="#proyectos" className="cf-btn-ghost">
                {c.ctaWork}
              </Link>
            </div>
          </div>

          <MascotSwitch
            labels={{
              toCorporate: c.toCorporate,
              toFresh: c.toFresh,
              stickerFresh: c.sticker,
              stickerCorporate: c.stickerCorporate,
              altFresh: c.altFresh,
              altCorporate: c.altCorporate,
              announceFresh: c.announceFresh,
              announceCorporate: c.announceCorporate,
            }}
          />
        </div>

        <dl className="relative mx-auto mt-14 grid max-w-7xl gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
          {c.facts.map(([n, label]) => (
            <div key={label}>
              <dt className="sr-only">{label}</dt>
              <dd className="flex items-baseline gap-3 sm:block">
                <span className="font-display block text-4xl text-white sm:text-5xl">{n}</span>
                <span className="mt-1 block text-sm leading-6 text-gray-400">{label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------- Servicios ---------- */}
      <section id="servicios" aria-labelledby="servicios-titulo" className="border-t border-white/10 bg-[#0a0b09] py-20">
        <MascotCue lang={lang} step="01">{c.cueServices}</MascotCue>
        <div className={`mx-auto mt-8 max-w-7xl ${section}`}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="servicios-titulo" className="font-display text-4xl text-white sm:text-5xl">{c.servicesTitle}</h2>
              <p className="mt-4 max-w-2xl leading-7 text-gray-400">{c.servicesIntro}</p>
            </div>
            <Link href={servicesIndex} className="text-sm font-semibold text-lime-400 hover:underline">
              {c.servicesAll} →
            </Link>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.services.map((s) => (
              <li key={s.title} className="cf-reveal">
                <Link href={s.href} className="cf-card flex h-full flex-col p-6">
                  <span className="font-mono text-sm text-lime-400">{s.tag}</span>
                  <span className="font-display mt-4 block text-2xl text-white">{s.title}</span>
                  <span className="mt-3 block leading-7 text-gray-400">{s.body}</span>
                  <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-lime-400">
                    {c.more}
                    <PixelArrow />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Soluciones ---------- */}
      <section id="soluciones" aria-labelledby="soluciones-titulo" className="border-t border-white/10 py-20">
        <MascotCue lang={lang} step="02" variant="corporativa">{c.cueSolutions}</MascotCue>
        <div className={`mx-auto mt-8 grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_15rem] ${section}`}>
          <div>
            <h2 id="soluciones-titulo" className="font-display max-w-3xl text-4xl text-white sm:text-5xl">{c.solutionsTitle}</h2>
            <p className="mt-4 max-w-2xl leading-7 text-gray-400">{c.solutionsIntro}</p>
            <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {c.solutions.map(([problem, built, id]) => {
                const item = byId[id];
                return (
                  <li key={id} className="cf-reveal">
                    <Link href={item ? caseHref(lang, item) : casesIndex} className="group grid gap-3 py-6 md:grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)] md:items-center md:gap-6">
                      <div>
                        <p className="font-mono text-xs text-gray-500">{c.problem}</p>
                        <p className="font-display mt-1 text-xl leading-snug text-white sm:text-2xl">{problem}</p>
                      </div>
                      <span className="hidden text-lime-400 md:block"><PixelArrow className="!h-5 !w-3 transition-transform group-hover:translate-x-1.5" /></span>
                      <div>
                        <p className="font-mono text-xs text-gray-500">{c.built}</p>
                        <p className="mt-1 leading-7 text-gray-300">{built}</p>
                        <p className="mt-2 text-sm font-semibold text-lime-400">{item?.title ?? ""} →</p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <figure className="mx-auto flex max-w-[12rem] flex-col items-center self-end lg:max-w-none">
            <Mascot variant="corporativa" lang={lang} sizes="(min-width: 1024px) 15rem, 12rem" className="w-full" />
            <figcaption className="cf-eyebrow mt-3 text-center">{`/* ${c.corporateNote} */`}</figcaption>
          </figure>
        </div>
      </section>

      {/* ---------- Proyectos ---------- */}
      <section id="proyectos" aria-labelledby="proyectos-titulo" className="border-t border-white/10 bg-[#0a0b09] py-20">
        <MascotCue lang={lang} step="03">{c.cueProjects}</MascotCue>
        <div className={`mx-auto mt-8 max-w-7xl ${section}`}>
          <h2 id="proyectos-titulo" className="font-display text-4xl text-white sm:text-5xl">{c.projectsTitle}</h2>
          <p className="mb-8 mt-4 max-w-2xl leading-7 text-gray-400">{c.projectsIntro}</p>
          <CaseGrid
            lang={lang}
            cases={cases.map((x) => ({ id: x.id, href: caseHref(lang, x), order: x.order, title: x.title, context: x.context, hook: x.hook, disciplines: x.disciplines }))}
          />

          <div className="mt-20">
            <p className="cf-eyebrow">{c.lightsEyebrow}</p>
            <h3 className="font-display mt-2 text-3xl text-white sm:text-4xl">{c.lightsTitle}</h3>
            <p className="mt-4 max-w-2xl leading-7 text-gray-400">{c.lightsBody}</p>
            <div className="mt-8">
              <LeadLights lang={lang} compact />
            </div>
            {byId["paneles"] ? (
              <Link href={caseHref(lang, byId["paneles"])} className="mt-6 inline-flex text-sm font-semibold text-lime-400 hover:underline">
                {c.lightsCta} →
              </Link>
            ) : null}
          </div>

          <div className="mt-20 grid gap-8 rounded-3xl border border-lime-400/20 bg-gradient-to-br from-lime-400/[0.08] to-transparent p-8 md:grid-cols-[1.2fr_1fr] md:items-center md:p-12">
            <div>
              <h3 className="font-display text-3xl text-white sm:text-4xl">{c.zodeskTitle}</h3>
              <p className="mt-4 max-w-xl leading-7 text-gray-300">{c.zodeskBody}</p>
              {byId.zodesk ? (
                <Link href={caseHref(lang, byId.zodesk)} className="cf-btn mt-6">
                  {c.zodeskCta}
                  <PixelArrow />
                </Link>
              ) : null}
            </div>
            <ol className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4 md:grid-cols-2">
              {c.zodeskSteps.map((s, i) => (
                <li key={s} className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-gray-200">
                  <span className="mr-2 font-mono text-lime-400" aria-hidden="true">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------- Metodología ---------- */}
      <section id="metodologia" aria-labelledby="metodologia-titulo" className="border-t border-white/10 py-20">
        <MascotCue lang={lang} step="04">{c.cueMethod}</MascotCue>
        <div className={`mx-auto mt-8 max-w-7xl ${section}`}>
          <h2 id="metodologia-titulo" className="font-display text-4xl text-white sm:text-5xl">{c.methodTitle}</h2>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {c.method.map(([title, body], i) => (
              <li key={title} className="cf-card cf-reveal min-w-0 p-5">
                <span className="font-mono text-sm text-lime-400" aria-hidden="true">{`0${i + 1}`}</span>
                <p className="font-display mt-3 text-xl text-white xl:text-lg 2xl:text-xl">{title}</p>
                <p className="mt-2 text-sm leading-6 text-gray-400">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Contacto ---------- */}
      <section id="contacto" aria-labelledby="contacto-titulo" className="border-t border-white/10 bg-[#0a0b09] py-20">
        <MascotCue lang={lang} step="05">{c.cueContact}</MascotCue>
        <div className={`mx-auto mt-8 max-w-7xl ${section}`}>
          <div className="relative grid gap-8 overflow-hidden rounded-3xl border border-white/10 bg-black p-8 md:grid-cols-[minmax(0,1fr)_16rem] md:items-center md:p-12">
            <div aria-hidden="true" className="cf-dots pointer-events-none absolute inset-0 opacity-70" />
            <div className="relative">
              <h2 id="contacto-titulo" className="font-display text-4xl leading-[1.02] text-white sm:text-6xl">
                {c.contactTitle1}
                <br />
                <em className="text-lime-400">{c.contactTitle2}</em>
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-gray-300">{c.contactBody}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={projectAnchor} className="cf-btn">
                  {c.ctaTalk}
                  <PixelArrow />
                </Link>
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="cf-btn-ghost">
                  {c.whatsapp}
                </a>
              </div>
              <p className="mt-8 text-sm text-gray-400">
                {c.hire}{" "}
                <Link href={hireAnchor} className="font-semibold text-lime-400 hover:underline">
                  {c.hireCta} →
                </Link>
              </p>
            </div>
            <div className="cf-mascot-wrap relative mx-auto w-48 md:w-full">
              <Pixels items={[{ x: "2%", y: "20%", d: "0.6s" }, { x: "92%", y: "66%", d: "1.5s" }]} />
              <Mascot variant="chicle" lang={lang} animated decorative sizes="16rem" className="relative w-full" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
