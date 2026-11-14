import Link from "next/link";

import type { Locale } from "../../lib/i18n/config";
import { caseHref, getCases } from "../../lib/portfolio";
import { getPortfolioUi } from "../../lib/portfolio/ui";
import { CaseGrid } from "./filters";

const copy = {
  es: {
    eyebrow: "Antonio Duque · creador de ZoDesk · marketing y procesos comerciales desde 2016",
    title1: "Creo estrategias",
    title2: "y los sistemas",
    title3: "que las hacen funcionar.",
    intro:
      "Conecto marketing, ventas y operación. Detecto dónde se pierde una oportunidad, entiendo el proceso que hay detrás, diseño la solución y la construyo: del catálogo publicitario al CRM, del chat de financiamiento al reporte que llega el lunes a las 7.",
    ctaCases: "Ver los casos",
    ctaHire: "Quiero contratarte",
    ctaProject: "Tengo un proyecto",
    pairsTitle: "La decisión y la herramienta, juntas",
    pairsIntro: "Cada caso empieza con una decisión de negocio. Luego construyo lo necesario para que se cumpla.",
    strategy: "Decisión",
    tool: "Lo que construí",
    pairs: [
      ["Ningún auto vendido debe seguir anunciándose.", "Sincronización del catálogo por API cada hora, con alerta si deja de cuadrar.", "marketing-dinamico"],
      ["Orientar sobre crédito sin prometer una aprobación.", "Chatform con preguntas condicionales y reglas de precalificación.", "chatform"],
      ["Un indicador fuera de rango debe proponer una acción.", "Monitor de leads con umbrales, acciones y decisiones registradas.", "paneles"],
      ["Leer el ERP de cada sede sin exponerlo a internet.", "Agente en Go con conexión solo saliente y cola local.", "saint"],
    ] as Array<[string, string, string]>,
    facts: [
      ["8", "casos documentados con su estado real"],
      ["2016", "trabajando en marketing y procesos comerciales"],
      ["3", "mercados prioritarios: Panamá, Venezuela y España"],
    ],
    workTitle: "Casos",
    workIntro: "Filtra por disciplina. Cada caso explica la necesidad, mi responsabilidad, las decisiones, lo construido, el estado de cada pieza y lo aprendido.",
    methodTitle: "Cómo trabajo",
    method: [
      ["Detectar", "Busco dónde se pierde el contexto: un lead sin dueño, una cifra que nadie revisa, un catálogo desactualizado."],
      ["Entender", "Recorro el proceso con quien lo vive: ventas, compras, oficina o dirección."],
      ["Diseñar", "Defino reglas, segmentos, umbrales y qué decisión debe permitir cada dato."],
      ["Construir", "Implemento con agentes de IA bajo mi dirección y reviso cada entrega con pruebas."],
      ["Medir y ajustar", "Separo hipótesis, pruebas y resultados; solo afirmo lo que está comprobado."],
    ],
    zodeskTitle: "ZoDesk conecta las piezas",
    zodeskBody:
      "Mi producto para concesionarios une captación, cualificación, CRM, asignación, documentos, ventas, operación y medición. Tiene una variante para talleres.",
    zodeskCta: "Ver el ecosistema",
    contactTitle: "Dos caminos para hablar",
    hireTitle: "Empresas que buscan contratarme",
    hireBody: "Busco posiciones remotas donde marketing, CRM y automatización se crucen. Español nativo, inglés B1.",
    projectTitle: "Clientes con un proyecto",
    projectBody: "Si necesitas conectar captación, seguimiento comercial y operación, cuéntame el reto y lo revisamos.",
  },
  en: {
    eyebrow: "Antonio Duque · creator of ZoDesk · marketing and sales processes since 2016",
    title1: "I create strategies",
    title2: "and the systems",
    title3: "that make them work.",
    intro:
      "I connect marketing, sales and operations. I find where an opportunity gets lost, understand the process behind it, design the solution and build it: from the ad catalog to the CRM, from the financing chat to the report that lands on Monday at 7 a.m.",
    ctaCases: "See the work",
    ctaHire: "I want to hire you",
    ctaProject: "I have a project",
    pairsTitle: "The decision and the tool, together",
    pairsIntro: "Every case starts with a business decision. Then I build what it takes to make it happen.",
    strategy: "Decision",
    tool: "What I built",
    pairs: [
      ["No sold car should still be advertised.", "Hourly API catalog sync, with an alert when it stops matching.", "marketing-dinamico"],
      ["Guide people on credit without promising approval.", "A chatform with conditional questions and pre-qualification rules.", "chatform"],
      ["An out-of-range indicator should suggest an action.", "A lead monitor with thresholds, actions and recorded decisions.", "paneles"],
      ["Read each site's ERP without exposing it to the internet.", "A Go agent with outbound-only connections and a local queue.", "saint"],
    ] as Array<[string, string, string]>,
    facts: [
      ["8", "case studies with their real status"],
      ["2016", "working in marketing and sales processes"],
      ["3", "priority markets: Panama, Venezuela and Spain"],
    ],
    workTitle: "Work",
    workIntro: "Filter by discipline. Each case covers the need, my responsibility, the decisions, what was built, the status of each piece and what I learned.",
    methodTitle: "How I work",
    method: [
      ["Spot", "I look for where context gets lost: a lead with no owner, a number nobody checks, an outdated catalog."],
      ["Understand", "I walk through the process with the people who live it: sales, purchasing, back office or leadership."],
      ["Design", "I define rules, segments, thresholds and the decision each piece of data should enable."],
      ["Build", "I implement with AI agents under my direction and review every delivery with tests."],
      ["Measure and adjust", "I separate hypotheses, tests and results, and only claim what is proven."],
    ],
    zodeskTitle: "ZoDesk connects the pieces",
    zodeskBody:
      "My product for car dealerships brings together acquisition, qualification, CRM, assignment, documents, sales, operations and measurement. It has a workshop variant.",
    zodeskCta: "See the ecosystem",
    contactTitle: "Two ways to talk",
    hireTitle: "Companies looking to hire me",
    hireBody: "I'm looking for remote roles where marketing, CRM and automation meet. Native Spanish, B1 English.",
    projectTitle: "Clients with a project",
    projectBody: "If you need to connect acquisition, sales follow-up and operations, tell me about the challenge and we'll look at it.",
  },
} as const;

export function PortfolioHome({ lang }: { lang: Locale }) {
  const c = copy[lang];
  const t = getPortfolioUi(lang);
  const cases = getCases(lang);
  const byId = Object.fromEntries(cases.map((x) => [x.id, x]));
  const contact = lang === "es" ? "/contacto" : "/en/contact";
  const casesIndex = lang === "es" ? "/casos" : "/en/cases";

  return (
    <>
      <section className="relative overflow-hidden px-4 pb-20 pt-14 sm:px-6 lg:px-8 lg:pb-28 lg:pt-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-10 h-[28rem] w-[28rem] rounded-full bg-lime-300/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <p className="max-w-2xl text-sm text-gray-400">{c.eyebrow}</p>
          <h1 className="font-display mt-6 text-[3.1rem] leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-[7.5rem]">
            {c.title1}
            <br />
            <em className="text-lime-200">{c.title2}</em>
            <br />
            {c.title3}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-300 sm:text-xl">{c.intro}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={casesIndex} className="rounded-full bg-lime-300 px-6 py-3 font-semibold text-black transition hover:bg-lime-200">{c.ctaCases}</Link>
            <Link href={`${contact}${lang === "es" ? "#empleo" : "#hiring"}`} className="rounded-full border border-white/20 px-6 py-3 text-white transition hover:border-lime-300">{c.ctaHire}</Link>
            <Link href={`${contact}${lang === "es" ? "#proyecto" : "#project"}`} className="rounded-full border border-white/20 px-6 py-3 text-white transition hover:border-lime-300">{c.ctaProject}</Link>
          </div>
          <dl className="mt-14 grid max-w-3xl gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
            {c.facts.map(([n, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd>
                  <span className="font-display block text-5xl text-white">{n}</span>
                  <span className="mt-1 block text-sm leading-6 text-gray-400">{label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="decision-herramienta" className="border-y border-white/10 bg-[#0a0b09] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 id="decision-herramienta" className="font-display text-4xl text-white sm:text-5xl">{c.pairsTitle}</h2>
          <p className="mt-4 max-w-2xl leading-7 text-gray-400">{c.pairsIntro}</p>
          <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {c.pairs.map(([decision, tool, id]) => {
              const item = byId[id];
              return (
                <li key={id}>
                  <Link href={item ? caseHref(lang, item) : casesIndex} className="group grid gap-3 py-6 md:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)_8rem] md:items-center md:gap-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-gray-500">{c.strategy}</p>
                      <p className="font-display mt-1 text-2xl leading-snug text-white sm:text-3xl">{decision}</p>
                    </div>
                    <span aria-hidden="true" className="hidden text-2xl text-lime-300 md:block">→</span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-gray-500">{c.tool}</p>
                      <p className="mt-1 leading-7 text-gray-300">{tool}</p>
                    </div>
                    <span className="text-sm font-semibold text-lime-200 md:text-right">{item?.title ?? ""} →</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="casos" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 id="casos" className="font-display text-5xl text-white sm:text-6xl">{c.workTitle}</h2>
          <p className="mb-8 mt-4 max-w-2xl leading-7 text-gray-400">{c.workIntro}</p>
          <CaseGrid
            lang={lang}
            cases={cases.map((x) => ({ id: x.id, href: caseHref(lang, x), order: x.order, title: x.title, context: x.context, hook: x.hook, disciplines: x.disciplines }))}
          />
        </div>
      </section>

      <section aria-labelledby="metodo" className="border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 id="metodo" className="font-display text-4xl text-white sm:text-5xl">{c.methodTitle}</h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-5">
            {c.method.map(([title, body], i) => (
              <li key={title} className="rounded-2xl border border-white/10 p-5">
                <span className="font-display text-3xl text-lime-300" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-3 font-semibold text-white">{title}</p>
                <p className="mt-2 text-sm leading-6 text-gray-400">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="zodesk" className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-3xl border border-lime-300/20 bg-gradient-to-br from-lime-300/[0.08] to-transparent p-8 md:grid-cols-[1.2fr_1fr] md:items-center md:p-12">
          <div>
            <h2 id="zodesk" className="font-display text-4xl text-white sm:text-5xl">{c.zodeskTitle}</h2>
            <p className="mt-4 max-w-xl leading-7 text-gray-300">{c.zodeskBody}</p>
            {byId.zodesk ? (
              <Link href={caseHref(lang, byId.zodesk)} className="mt-6 inline-block rounded-full bg-lime-300 px-5 py-2.5 font-semibold text-black hover:bg-lime-200">{c.zodeskCta}</Link>
            ) : null}
          </div>
          <ol className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4 md:grid-cols-2">
            {(lang === "es"
              ? ["Captación", "Cualificación", "CRM", "Asignación", "Documentos", "Ventas", "Operación", "Medición"]
              : ["Acquisition", "Qualification", "CRM", "Assignment", "Documents", "Sales", "Operations", "Measurement"]
            ).map((s, i) => (
              <li key={s} className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-gray-200">
                <span className="mr-2 text-lime-300" aria-hidden="true">{i + 1}</span>{s}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="contacto" className="border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 id="contacto" className="font-display text-4xl text-white sm:text-5xl">{c.contactTitle}</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Link href={`${contact}${lang === "es" ? "#empleo" : "#hiring"}`} className="group rounded-3xl border border-white/10 p-8 transition hover:border-lime-300/60">
              <p className="font-display text-3xl text-white group-hover:text-lime-100">{c.hireTitle}</p>
              <p className="mt-3 leading-7 text-gray-400">{c.hireBody}</p>
              <span className="mt-6 inline-block text-sm font-semibold text-lime-200">{t.hireMe} →</span>
            </Link>
            <Link href={`${contact}${lang === "es" ? "#proyecto" : "#project"}`} className="group rounded-3xl border border-white/10 p-8 transition hover:border-lime-300/60">
              <p className="font-display text-3xl text-white group-hover:text-lime-100">{c.projectTitle}</p>
              <p className="mt-3 leading-7 text-gray-400">{c.projectBody}</p>
              <span className="mt-6 inline-block text-sm font-semibold text-lime-200">{t.talkProject} →</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
