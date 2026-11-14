import Image from "next/image";
import Link from "next/link";

import { LeadIntakeSection } from "../../lead-intake-section";
import { getContent } from "../../lib/i18n";
import type { Locale } from "../../lib/i18n/config";
import { archiveGroupsOrder, getArchive } from "../../lib/portfolio/archive";
import { caseHref, getCaseById, getCases } from "../../lib/portfolio";
import { PORTFOLIO_REVIEWED, formatReviewDate, getPortfolioUi } from "../../lib/portfolio/ui";
import { breadcrumbJsonLd, organizationId, personId, personJsonLd } from "../../lib/seo";
import { getWhatsAppUrl, siteConfig } from "../../lib/site";
import { Crumbs, PortfolioShell } from "./chrome";
import { ArchiveBrowser, CaseGrid } from "./filters";
import { PortfolioHome } from "./home";

const abs = (path: string) => `${siteConfig.url}${path === "/" ? "" : path}`;

function PageHeader({
  lang,
  crumbs,
  eyebrow,
  title,
  intro,
  media,
}: {
  lang: Locale;
  crumbs: Array<{ label: string; href: string }>;
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** Imagen opcional a la derecha (por ejemplo, el retrato de "Sobre mí"). */
  media?: React.ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-white/10 px-4 pb-14 pt-10 sm:px-6 lg:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-lime-300/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <Crumbs lang={lang} items={crumbs} />
        <div className={media ? "grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center" : undefined}>
          <div>
            {eyebrow ? <p className="mt-10 text-xs font-semibold uppercase tracking-[0.22em] text-lime-300/80">{eyebrow}</p> : <div className="mt-10" />}
            <h1 className="font-display mt-3 max-w-5xl text-5xl leading-[1.02] text-white sm:text-7xl">{title}</h1>
            {intro ? <div className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">{intro}</div> : null}
          </div>
          {media ? <div className="mt-2 lg:mt-10">{media}</div> : null}
        </div>
      </div>
    </header>
  );
}

/** Fotos de Antonio en el Web Summit de Lisboa (noviembre de 2026), sin metadatos de ubicación. */
const webSummitPhotos = [
  {
    src: "/portafolio/antonio-duque-web-summit.jpg",
    es: "Antonio Duque sonriendo en el auditorio principal del Web Summit de Lisboa, con el escenario detrás.",
    en: "Antonio Duque smiling in the main auditorium of Web Summit Lisbon, with the stage behind him.",
  },
  {
    src: "/portafolio/antonio-duque-web-summit-letras.jpg",
    es: "Antonio Duque de pie frente a las letras gigantes de Web Summit en Lisboa.",
    en: "Antonio Duque standing in front of the giant Web Summit letters in Lisbon.",
  },
  {
    src: "/portafolio/antonio-duque-web-summit-llegada.jpg",
    es: "Antonio Duque con gafas de sol señalando el cartel de Web Summit a su llegada al recinto.",
    en: "Antonio Duque in sunglasses pointing at the Web Summit sign as he arrives at the venue.",
  },
];

/** Collage del Web Summit con el tratamiento visual del sitio. */
function WebSummitPortrait({ lang }: { lang: Locale }) {
  const es = lang === "es";
  const [main, ...rest] = webSummitPhotos;
  return (
    <figure className="relative mx-auto w-full max-w-xl lg:ml-auto lg:mr-0">
      <div aria-hidden="true" className="absolute -inset-4 rounded-[2rem] bg-lime-300/15 blur-2xl" />
      <div className="relative grid grid-cols-[2fr_1fr] gap-3">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0c0d0b] shadow-2xl shadow-black">
          <Image
            src={main.src}
            alt={es ? main.es : main.en}
            width={1050}
            height={1400}
            priority
            sizes="(min-width: 1024px) 24rem, 62vw"
            className="h-full w-full object-cover"
          />
          <span className="absolute left-3 top-3 rounded-full bg-black/75 px-3 py-1 text-xs font-semibold text-lime-200 ring-1 ring-lime-300/40 backdrop-blur">
            Web Summit · Lisboa 2026
          </span>
        </div>
        <div className="grid gap-3">
          {rest.map((photo) => (
            <div key={photo.src} className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c0d0b]">
              <Image
                src={photo.src}
                alt={es ? photo.es : photo.en}
                width={1050}
                height={1400}
                sizes="(min-width: 1024px) 12rem, 31vw"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <figcaption className="relative mt-4 text-sm leading-6 text-gray-400">
        {es
          ? "En el Web Summit de Lisboa, en noviembre de 2026: aprender de quienes construyen producto y llevar ideas a lo que hago cada día."
          : "At Web Summit in Lisbon, November 2026: learning from people who build products and bringing ideas back to my daily work."}
      </figcaption>
    </figure>
  );
}

/* ---------------- Portada ---------------- */

export function HomePageBody({ lang }: { lang: Locale }) {
  const cases = getCases(lang);
  const path = lang === "es" ? "/" : "/en";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${abs(path)}#webpage`,
        url: abs(path),
        name: lang === "es" ? "Antonio Duque: estrategias y sistemas" : "Antonio Duque: strategies and systems",
        inLanguage: lang,
        about: { "@id": personId },
        isPartOf: { "@id": `${siteConfig.url}/#website${lang === "en" ? "-en" : ""}` },
        dateModified: PORTFOLIO_REVIEWED,
      },
      personJsonLd(lang),
      {
        "@type": "ItemList",
        name: lang === "es" ? "Casos" : "Case studies",
        itemListElement: cases.map((c, i) => ({ "@type": "ListItem", position: i + 1, url: abs(caseHref(lang, c)), name: c.title })),
      },
    ],
  };
  return (
    <PortfolioShell lang={lang} alternateHref={lang === "es" ? "/en" : "/"} jsonLd={jsonLd}>
      <PortfolioHome lang={lang} />
    </PortfolioShell>
  );
}

/* ---------------- Índice de casos ---------------- */

export function CasesIndexBody({ lang }: { lang: Locale }) {
  const t = getPortfolioUi(lang);
  const cases = getCases(lang);
  const { caseStudies } = getContent(lang);
  const path = lang === "es" ? "/casos" : "/en/cases";
  const home = lang === "es" ? "/" : "/en";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${abs(path)}#page`,
        url: abs(path),
        name: lang === "es" ? "Casos de Antonio Duque" : "Antonio Duque case studies",
        inLanguage: lang,
        author: { "@id": personId },
        dateModified: PORTFOLIO_REVIEWED,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: cases.map((c, i) => ({ "@type": "ListItem", position: i + 1, url: abs(caseHref(lang, c)), name: c.title })),
        },
      },
      breadcrumbJsonLd([
        { name: t.breadcrumbHome, path: home },
        { name: lang === "es" ? "Casos" : "Work", path },
      ]),
    ],
  };

  return (
    <PortfolioShell lang={lang} alternateHref={lang === "es" ? "/en/cases" : "/casos"} jsonLd={jsonLd}>
      <PageHeader
        lang={lang}
        crumbs={[{ label: t.breadcrumbHome, href: home }, { label: lang === "es" ? "Casos" : "Work", href: path }]}
        eyebrow={lang === "es" ? "Portafolio" : "Portfolio"}
        title={lang === "es" ? <>Casos con <em className="text-lime-200">estrategia</em> y herramientas</> : <>Cases with <em className="text-lime-200">strategy</em> and tools</>}
        intro={
          <p>
            {lang === "es"
              ? "Ocho casos documentados contra el código y la documentación de cada proyecto. Cada uno separa lo que está en producción, lo construido, lo probado y lo pendiente. No publico cifras comerciales de clientes."
              : "Eight cases documented against each project's code and documentation. Each separates what is in production, built, tested and pending. I don't publish client commercial figures."}
          </p>
        }
      />
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <CaseGrid lang={lang} cases={cases.map((x) => ({ id: x.id, href: caseHref(lang, x), order: x.order, title: x.title, context: x.context, hook: x.hook, disciplines: x.disciplines }))} />
        </div>
      </section>
      <section aria-labelledby="otros" className="border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 id="otros" className="font-display text-3xl text-white">{lang === "es" ? "Otros proyectos web" : "Other web projects"}</h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {caseStudies.map((item) => (
              <li key={item.slug}>
                <Link href={`${path}/${item.slug}`} className="block rounded-2xl border border-white/10 p-5 hover:border-lime-300/60">
                  <p className="font-semibold text-white">{item.client}</p>
                  <p className="mt-1 text-sm text-gray-400">{item.sector}</p>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-gray-400">
            {lang === "es" ? "El resto del trabajo revisado está en el " : "The rest of the reviewed work is in the "}
            <Link href={lang === "es" ? "/proyectos" : "/en/projects"} className="text-lime-200 underline underline-offset-4">
              {lang === "es" ? "archivo de proyectos" : "project archive"}
            </Link>
            .
          </p>
        </div>
      </section>
    </PortfolioShell>
  );
}

/* ---------------- Archivo ---------------- */

export function ArchiveBody({ lang }: { lang: Locale }) {
  const t = getPortfolioUi(lang);
  const projects = getArchive(lang);
  const path = lang === "es" ? "/proyectos" : "/en/projects";
  const home = lang === "es" ? "/" : "/en";
  const caseHrefs = Object.fromEntries(getCases(lang).map((c) => [c.id, caseHref(lang, c)]));
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${abs(path)}#page`,
        url: abs(path),
        name: lang === "es" ? "Archivo de proyectos" : "Project archive",
        inLanguage: lang,
        author: { "@id": personId },
        dateModified: PORTFOLIO_REVIEWED,
      },
      breadcrumbJsonLd([
        { name: t.breadcrumbHome, path: home },
        { name: lang === "es" ? "Proyectos" : "Projects", path },
      ]),
    ],
  };
  return (
    <PortfolioShell lang={lang} alternateHref={lang === "es" ? "/en/projects" : "/proyectos"} jsonLd={jsonLd}>
      <PageHeader
        lang={lang}
        crumbs={[{ label: t.breadcrumbHome, href: home }, { label: lang === "es" ? "Proyectos" : "Projects", href: path }]}
        eyebrow={lang === "es" ? "Archivo" : "Archive"}
        title={lang === "es" ? <>Más allá de <em className="text-lime-200">los destacados</em></> : <>Beyond <em className="text-lime-200">the highlights</em></>}
        intro={
          <p>
            {lang === "es"
              ? `Proyectos con clientes, productos propios, herramientas y experimentos revisados en GitHub y en local el ${formatReviewDate(PORTFOLIO_REVIEWED, lang)}. Un repositorio no es un producto terminado: cada ficha dice su estado. El código de clientes sigue siendo privado.`
              : `Client projects, own products, tools and experiments reviewed on GitHub and locally on ${formatReviewDate(PORTFOLIO_REVIEWED, lang)}. A repository is not a finished product: each entry states its status. Client code remains private.`}
          </p>
        }
      />
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ArchiveBrowser lang={lang} projects={projects} groupOrder={archiveGroupsOrder} caseHrefs={caseHrefs} />
        </div>
      </section>
    </PortfolioShell>
  );
}

/* ---------------- Sobre mí ---------------- */

const aboutCopy = {
  es: {
    title: <>Marketing de origen. <em className="text-lime-200">Constructor</em> por necesidad.</>,
    paragraphs: [
      "Soy Antonio Duque. Trabajo en marketing y procesos comerciales desde 2016, sobre todo en Champion Motors, un concesionario de autos usados en Panamá. Ahí mi trabajo pasó de las campañas a preguntas más incómodas: cómo llega un cliente, quién lo atiende, qué pasa después y por qué una venta no se puede leer en el reporte de anuncios.",
      "Aprendí que las oportunidades rara vez se pierden en el anuncio. Se pierden en los saltos: del formulario al vendedor, del vendedor al contrato, del contrato al cobro. De esa observación nació ZoDesk, la plataforma que creé para que el contexto viaje con la oportunidad.",
      "Me gusta crear. Detecto una necesidad, entiendo el proceso, diseño la solución y la construyo. Construyo con agentes de IA bajo mi dirección: defino el problema, las reglas, los datos de prueba y los criterios de aceptación, y reviso cada entrega. Lo que no está verificado, no lo afirmo.",
      "Código Fresco es la marca con la que trabajo junto a Noe Rivas, con quien he desarrollado proyectos como la integración de Camsmark con su ERP.",
    ],
    principlesTitle: "Cómo decido",
    principles: [
      ["Calidad antes que volumen", "No confundo cantidad de contactos con oportunidades reales. Mido origen, atención y resultado."],
      ["Una decisión por dato", "Cada indicador debe responder qué hacer distinto. Si no cambia una decisión, sobra."],
      ["Fallos visibles", "Un sistema que falla en silencio es peor que uno que no existe. Por eso cada integración tiene alerta."],
      ["Honestidad sobre el estado", "Separo hipótesis, pruebas y resultados, y digo qué está pendiente."],
    ],
    factsTitle: "Datos rápidos",
    facts: [
      ["Experiencia", "Marketing y procesos comerciales desde 2016"],
      ["Producto propio", "ZoDesk, para concesionarios y talleres"],
      ["Idiomas", "Español nativo · inglés B1"],
      ["Forma de trabajo", "Remoto · empleo o proyectos"],
      ["Mercados", "Panamá y Venezuela; España, con Ayamonte como base prevista"],
    ],
    toolsTitle: "Herramientas que aparecen en mi trabajo",
    toolsNote: "La profundidad varía según la herramienta; los casos explican el uso concreto de cada una.",
    cta: "Ver cómo contactarme",
  },
  en: {
    title: <>A marketer by background. A <em className="text-lime-200">builder</em> by necessity.</>,
    paragraphs: [
      "I'm Antonio Duque. I have worked in marketing and sales processes since 2016, mostly at Champion Motors, a used-car dealership in Panama. There my work moved from campaigns to harder questions: how a customer arrives, who attends them, what happens next, and why a sale can't be read in the ads report.",
      "I learned that opportunities are rarely lost in the ad. They are lost in the hand-offs: from the form to the salesperson, from the salesperson to the contract, from the contract to payment. That observation led to ZoDesk, the platform I created so context travels with the opportunity.",
      "I like to build. I spot a need, understand the process, design the solution and build it. I build with AI agents under my direction: I define the problem, the rules, the test data and the acceptance criteria, and I review every delivery. If something isn't verified, I don't claim it.",
      "Código Fresco is the brand I work under together with Noe Rivas, with whom I have built projects such as Camsmark's ERP integration.",
    ],
    principlesTitle: "How I decide",
    principles: [
      ["Quality over volume", "I don't confuse contact volume with real opportunities. I measure source, response and outcome."],
      ["One decision per metric", "Every indicator should answer what to do differently. If it changes no decision, it goes."],
      ["Visible failures", "A system that fails silently is worse than none. That's why every integration has an alert."],
      ["Honest status", "I separate hypotheses, tests and results, and say what is still pending."],
    ],
    factsTitle: "Quick facts",
    facts: [
      ["Experience", "Marketing and sales processes since 2016"],
      ["Own product", "ZoDesk, for dealerships and workshops"],
      ["Languages", "Native Spanish · B1 English"],
      ["How I work", "Remote · employment or projects"],
      ["Markets", "Panama and Venezuela; Spain, with Ayamonte as the planned base"],
    ],
    toolsTitle: "Tools that show up in my work",
    toolsNote: "Depth varies by tool; the cases explain how each one is used.",
    cta: "See how to reach me",
  },
};

const tools = [
  "Zoho CRM", "Meta Ads", "Google Ads", "GA4", "Search Console", "Pixel / Conversions API", "Resend", "Brevo",
  "Laravel", "Filament", "Python", "FastAPI", "Go", "SQL Server", "SQLite", "Supabase", "Google Workspace", "WhatsApp Cloud API", "Claude Code",
];

export function AboutBody({ lang }: { lang: Locale }) {
  const c = aboutCopy[lang];
  const t = getPortfolioUi(lang);
  const path = lang === "es" ? "/nosotros" : "/en/about";
  const home = lang === "es" ? "/" : "/en";
  const zodesk = getCaseById(lang, "zodesk");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${abs(path)}#page`,
        url: abs(path),
        inLanguage: lang,
        dateModified: PORTFOLIO_REVIEWED,
        mainEntity: { "@id": personId },
      },
      // La foto solo se declara aquí, donde se ve: el schema debe coincidir con lo visible.
      { ...personJsonLd(lang), image: webSummitPhotos.map((photo) => `${siteConfig.url}${photo.src}`) },
      breadcrumbJsonLd([
        { name: t.breadcrumbHome, path: home },
        { name: lang === "es" ? "Sobre mí" : "About", path },
      ]),
    ],
  };
  return (
    <PortfolioShell lang={lang} alternateHref={lang === "es" ? "/en/about" : "/nosotros"} jsonLd={jsonLd}>
      <PageHeader
        lang={lang}
        crumbs={[{ label: t.breadcrumbHome, href: home }, { label: lang === "es" ? "Sobre mí" : "About", href: path }]}
        eyebrow="Antonio Duque"
        title={c.title}
        intro={<p>{c.paragraphs[0]}</p>}
        media={<WebSummitPortrait lang={lang} />}
      />
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
          <div id="antonio-duque" className="space-y-5 text-[17px] leading-8 text-gray-300">
            {c.paragraphs.slice(1).map((p) => <p key={p}>{p}</p>)}
            {zodesk ? (
              <p>
                <Link href={caseHref(lang, zodesk)} className="text-lime-200 underline underline-offset-4">{zodesk.title}</Link>
              </p>
            ) : null}
          </div>
          <aside className="h-fit rounded-3xl border border-white/10 bg-white/[0.02] p-6">
            <h2 className="font-semibold text-white">{c.factsTitle}</h2>
            <dl className="mt-4 space-y-4 text-sm">
              {c.facts.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs uppercase tracking-[0.18em] text-gray-500">{k}</dt>
                  <dd className="mt-1 text-gray-100">{v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>
      <section aria-labelledby="principios" className="border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 id="principios" className="font-display text-4xl text-white">{c.principlesTitle}</h2>
          <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {c.principles.map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-white/10 p-5">
                <p className="font-semibold text-white">{title}</p>
                <p className="mt-2 text-sm leading-6 text-gray-400">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section aria-labelledby="herramientas" className="border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 id="herramientas" className="font-display text-4xl text-white">{c.toolsTitle}</h2>
          <p className="mt-3 text-sm text-gray-400">{c.toolsNote}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {tools.map((tool) => (
              <li key={tool} className="rounded-full border border-white/15 px-3 py-1 text-sm text-gray-200">{tool}</li>
            ))}
          </ul>
          <Link href={lang === "es" ? "/contacto" : "/en/contact"} className="mt-10 inline-block rounded-full bg-lime-300 px-5 py-2.5 font-semibold text-black hover:bg-lime-200">
            {c.cta}
          </Link>
        </div>
      </section>
    </PortfolioShell>
  );
}

/* ---------------- Contacto ---------------- */

export function ContactBody({ lang }: { lang: Locale }) {
  const t = getPortfolioUi(lang);
  const es = lang === "es";
  const path = es ? "/contacto" : "/en/contact";
  const home = es ? "/" : "/en";
  const hireSubject = encodeURIComponent(es ? "Oportunidad laboral para Antonio Duque" : "Job opportunity for Antonio Duque");
  const hireBody = encodeURIComponent(
    es
      ? "Hola Antonio,\n\nEmpresa:\nRol:\nModalidad (remoto / híbrido):\nIdioma de trabajo y zona horaria:\nQué te gustaría que resolviera:\n"
      : "Hi Antonio,\n\nCompany:\nRole:\nSetup (remote / hybrid):\nWorking language and time zone:\nWhat you'd like me to solve:\n",
  );
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${abs(path)}#page`,
        url: abs(path),
        name: es ? "Contacto" : "Contact",
        inLanguage: lang,
        about: { "@id": personId },
        publisher: { "@id": organizationId },
      },
      breadcrumbJsonLd([
        { name: t.breadcrumbHome, path: home },
        { name: es ? "Contacto" : "Contact", path },
      ]),
    ],
  };
  return (
    <PortfolioShell lang={lang} alternateHref={es ? "/en/contact" : "/contacto"} jsonLd={jsonLd}>
      <PageHeader
        lang={lang}
        crumbs={[{ label: t.breadcrumbHome, href: home }, { label: es ? "Contacto" : "Contact", href: path }]}
        eyebrow={es ? "Contacto" : "Contact"}
        title={es ? <>Dos caminos, <em className="text-lime-200">una conversación</em></> : <>Two paths, <em className="text-lime-200">one conversation</em></>}
        intro={
          <p>
            {es
              ? "Elige el que corresponda. No publico tarifas: cada propuesta se define después de revisar el proceso y el alcance."
              : "Pick the one that fits. I don't publish rates: every proposal is defined after reviewing the process and the scope."}
          </p>
        }
      />
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2">
          <div id={es ? "empleo" : "hiring"} className="scroll-mt-24 rounded-3xl border border-white/10 p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-300/80">{es ? "Empresas" : "Companies"}</p>
            <h2 className="font-display mt-3 text-4xl text-white">{es ? "Quiero contratarte" : "I want to hire you"}</h2>
            <p className="mt-4 leading-7 text-gray-300">
              {es
                ? "Busco posiciones remotas donde se crucen marketing, CRM, automatización y operación comercial. Trabajo en español nativo e inglés B1."
                : "I'm looking for remote roles where marketing, CRM, automation and sales operations meet. I work in native Spanish and B1 English."}
            </p>
            <ul className="mt-5 space-y-2 text-sm text-gray-400">
              <li>· {es ? "Cuéntame el rol, la modalidad y el idioma de trabajo." : "Tell me the role, the setup and the working language."}</li>
              <li>· {es ? "Si quieres, indica qué caso te interesa más para empezar por ahí." : "If you like, mention which case interests you most so we can start there."}</li>
            </ul>
            <a href={`mailto:${siteConfig.email}?subject=${hireSubject}&body=${hireBody}`} className="mt-7 inline-block rounded-full bg-lime-300 px-5 py-2.5 font-semibold text-black hover:bg-lime-200">
              {es ? "Escribir por correo" : "Write by email"}
            </a>
            <p className="mt-3 break-all text-sm text-gray-500">{siteConfig.email}</p>
          </div>
          <div className="rounded-3xl border border-white/10 p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-300/80">{es ? "Clientes" : "Clients"}</p>
            <h2 className="font-display mt-3 text-4xl text-white">{es ? "Tengo un proyecto" : "I have a project"}</h2>
            <p className="mt-4 leading-7 text-gray-300">
              {es
                ? "Si necesitas conectar captación, seguimiento comercial y operación, cuéntame el reto con el formulario de abajo o por WhatsApp."
                : "If you need to connect acquisition, sales follow-up and operations, tell me about the challenge with the form below or on WhatsApp."}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={es ? "#proyecto" : "#project"} className="rounded-full bg-lime-300 px-5 py-2.5 font-semibold text-black hover:bg-lime-200">{es ? "Ir al formulario" : "Go to the form"}</a>
              <a
                href={getWhatsAppUrl(es ? "Hola Antonio, vi tu portafolio y quiero conversar sobre un proyecto." : "Hi Antonio, I saw your portfolio and would like to talk about a project.")}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/20 px-5 py-2.5 text-gray-100 hover:border-lime-300"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
      <div id={es ? "proyecto" : "project"} className="scroll-mt-20">
        <LeadIntakeSection lang={lang} />
      </div>
    </PortfolioShell>
  );
}
