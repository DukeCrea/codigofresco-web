import Link from "next/link";

import type { Locale } from "../../lib/i18n/config";
import { getContent } from "../../lib/i18n";
import { caseHref, getCaseById, getWorkshopVariant } from "../../lib/portfolio";
import type { PortfolioCase } from "../../lib/portfolio/types";
import { formatReviewDate, getPortfolioUi } from "../../lib/portfolio/ui";
import { BulletList, FlowDiagram, SectionHeading, StatusTable } from "./blocks";
import { Crumbs } from "./chrome";
import { ChatformDemo } from "./demos/chatform-demo";
import { PanelDemo } from "./demos/panel-demo";
import { ContentLoop, EmailSegments, FunnelMap, InventoryLayers, ReportDemo, SaintDiagram } from "./demos/static-demos";
import { ZoomImage } from "./zoom-image";

function Demo({ item, lang }: { item: PortfolioCase; lang: Locale }) {
  switch (item.demo) {
    case "chatform":
      return <ChatformDemo lang={lang} />;
    case "panel":
      return <PanelDemo lang={lang} />;
    case "report":
      return <ReportDemo lang={lang} />;
    case "saint":
      return <SaintDiagram lang={lang} />;
    case "funnel":
      return <FunnelMap lang={lang} />;
    case "content-loop":
      return <ContentLoop lang={lang} />;
    case "inventory":
      return <InventoryLayers lang={lang} />;
    case "email":
      return <EmailSegments lang={lang} />;
    default:
      return null;
  }
}

const demoTitle: Record<string, { es: string; en: string }> = {
  chatform: { es: "Pruébalo: el recorrido con datos ficticios", en: "Try it: the journey with fictitious data" },
  panel: { es: "Del indicador a la acción", en: "From indicator to action" },
  report: { es: "Así llega un reporte", en: "What a report looks like" },
  saint: { es: "El mapa de la integración", en: "The integration map" },
  funnel: { es: "El embudo, pieza por pieza", en: "The funnel, piece by piece" },
  "content-loop": { es: "Qué está demostrado y qué no", en: "What is proven and what isn't" },
  inventory: { es: "Las tres capas", en: "The three layers" },
  email: { es: "Segmentos y frenos", en: "Segments and brakes" },
};

export function CaseArticle({ item, lang }: { item: PortfolioCase; lang: Locale }) {
  const t = getPortfolioUi(lang);
  const { getServiceBySlug } = getContent(lang);
  const services = item.services.map((slug) => getServiceBySlug(slug)).filter((s) => s !== undefined);
  const related = item.related.map((id) => getCaseById(lang, id)).filter((c) => c !== undefined);
  const base = lang === "es" ? "/casos" : "/en/cases";
  const serviceBase = lang === "es" ? "/servicios" : "/en/services";
  const workshop = item.id === "zodesk" ? getWorkshopVariant(lang) : null;

  const toc: Array<[string, string]> = [
    ["necesidad", t.sections.need],
    ["responsabilidad", t.sections.responsibility],
    ["estrategia", t.sections.strategy],
    ["construccion", t.sections.built],
    ["flujo", t.sections.flow],
    ...(item.demo ? ([["demo", t.sections.demo]] as Array<[string, string]>) : []),
    ["herramientas", t.sections.tools],
    ["estado", t.sections.status],
    ["aprendizajes", t.sections.learnings],
  ];

  return (
    <article>
      <header className="relative overflow-hidden border-b border-white/10 px-4 pb-14 pt-10 sm:px-6 lg:px-8 lg:pb-20">
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-lime-400/10 blur-3xl" />
        <div className="relative mx-auto max-w-5xl">
          <Crumbs
            lang={lang}
            items={[
              { label: t.breadcrumbHome, href: lang === "es" ? "/" : "/en" },
              { label: lang === "es" ? "Casos" : "Work", href: base },
              { label: item.title, href: caseHref(lang, item) },
            ]}
          />
          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.22em] text-lime-400/80">
            {t.caseLabel} {String(item.order).padStart(2, "0")} · {item.disciplines.map((d) => t.disciplines[d]).join(" · ")}
          </p>
          <h1 className="font-display mt-4 text-[2.6rem] leading-[1.02] text-white sm:text-6xl lg:text-7xl">{item.headline}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">{item.lead}</p>
          <dl className="mt-8 grid gap-4 border-t border-white/10 pt-6 text-sm sm:grid-cols-3">
            <div><dt className="text-gray-500">{lang === "es" ? "Proyecto" : "Project"}</dt><dd className="mt-1 text-gray-100">{item.title}</dd></div>
            <div><dt className="text-gray-500">{lang === "es" ? "Contexto" : "Context"}</dt><dd className="mt-1 text-gray-100">{item.context}</dd></div>
            <div>
              <dt className="text-gray-500">{t.author}</dt>
              <dd className="mt-1 text-gray-100">
                {t.reviewed} <time dateTime={item.reviewed}>{formatReviewDate(item.reviewed, lang)}</time>
              </dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[13rem_minmax(0,1fr)] lg:px-8">
        <nav aria-label={lang === "es" ? "En este caso" : "In this case"} className="hidden lg:block">
          <ol className="sticky top-24 space-y-2 border-l border-white/10 pl-4 text-sm">
            {toc.map(([id, label]) => (
              <li key={id}><a href={`#${id}`} className="text-gray-400 hover:text-white">{label}</a></li>
            ))}
          </ol>
        </nav>

        <div className="min-w-0 space-y-16">
          <section aria-labelledby="necesidad">
            <SectionHeading id="necesidad" eyebrow="01">{t.sections.need}</SectionHeading>
            <div className="prose-case max-w-3xl text-[17px] leading-8 text-gray-300">
              {item.need.map((p) => <p key={p}>{p}</p>)}
            </div>
          </section>

          <section aria-labelledby="responsabilidad">
            <SectionHeading id="responsabilidad" eyebrow="02">{t.sections.responsibility}</SectionHeading>
            <div className="max-w-3xl"><BulletList items={item.responsibility} /></div>
            {item.collaboration ? (
              <div className="mt-6 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <p className="text-sm font-semibold text-white">{t.sections.collaboration}</p>
                <p className="mt-2 leading-7 text-gray-300">{item.collaboration}</p>
              </div>
            ) : null}
          </section>

          <section aria-labelledby="estrategia">
            <SectionHeading id="estrategia" eyebrow="03">{t.sections.strategy}</SectionHeading>
            <ol className="grid gap-3 md:grid-cols-2">
              {item.strategy.map((s, i) => (
                <li key={s} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 leading-7 text-gray-200">
                  <span className="mr-2 font-display text-xl text-lime-400" aria-hidden="true">{i + 1}.</span>
                  {s}
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="construccion">
            <SectionHeading id="construccion" eyebrow="04">{t.sections.built}</SectionHeading>
            <div className="max-w-3xl"><BulletList items={item.built} /></div>
            {item.image ? (
              <div className="mt-8">
                <ZoomImage {...item.image} zoomLabel={t.zoom} closeLabel={t.close} badge={t.demoData} />
              </div>
            ) : null}
          </section>

          <section aria-labelledby="flujo">
            <SectionHeading id="flujo" eyebrow="05">{t.sections.flow}</SectionHeading>
            <FlowDiagram steps={item.flow} label={t.sections.flow} />
          </section>

          {item.demo ? (
            <section aria-labelledby="demo">
              <SectionHeading id="demo" eyebrow={t.sections.demo}>{demoTitle[item.demo][lang]}</SectionHeading>
              <Demo item={item} lang={lang} />
            </section>
          ) : null}

          {workshop ? (
            <section aria-labelledby="talleres">
              <SectionHeading id="talleres" eyebrow="ZoDesk">{workshop.title}</SectionHeading>
              <p className="max-w-3xl leading-7 text-gray-300">{workshop.intro}</p>
              <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <ul className="space-y-3">
                  {workshop.items.map((w) => (
                    <li key={w.name} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                      <p className="font-semibold text-white">{w.name}</p>
                      <p className="mt-1 text-sm leading-6 text-gray-400">{w.detail}</p>
                    </li>
                  ))}
                </ul>
                <ZoomImage {...workshop.image} zoomLabel={t.zoom} closeLabel={t.close} badge={t.demoData} />
              </div>
            </section>
          ) : null}

          <section aria-labelledby="herramientas">
            <SectionHeading id="herramientas" eyebrow="06">{t.sections.tools}</SectionHeading>
            <dl className="grid gap-3 sm:grid-cols-2">
              {item.tools.map((tool) => (
                <div key={tool.name} className="rounded-2xl border border-white/10 p-4">
                  <dt className="font-semibold text-white">{tool.name}</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-400">{tool.role}</dd>
                </div>
              ))}
            </dl>
            <h3 className="mt-10 text-lg font-semibold text-white">{t.sections.evidence}</h3>
            <div className="mt-4 max-w-3xl"><BulletList items={item.evidence} /></div>
          </section>

          <section aria-labelledby="estado">
            <SectionHeading id="estado" eyebrow="07">{t.sections.status}</SectionHeading>
            <StatusTable rows={item.status} lang={lang} />
            <h3 className="mt-10 text-lg font-semibold text-white">{t.sections.next}</h3>
            <div className="mt-4 max-w-3xl"><BulletList items={item.next} /></div>
          </section>

          <section aria-labelledby="aprendizajes">
            <SectionHeading id="aprendizajes" eyebrow="08">{t.sections.learnings}</SectionHeading>
            <div className="grid gap-3 md:grid-cols-3">
              {item.learnings.map((l) => (
                <blockquote key={l} className="rounded-2xl border border-lime-400/20 bg-lime-400/[0.04] p-5 font-display text-xl leading-snug text-gray-100">
                  {l}
                </blockquote>
              ))}
            </div>
            {item.caveats?.length ? (
              <aside className="mt-8 rounded-2xl border border-amber-300/30 bg-amber-300/[0.05] p-5">
                <p className="text-sm font-semibold text-amber-100">{t.sections.caveats}</p>
                <ul className="mt-2 space-y-1.5 text-sm leading-6 text-amber-50/80">
                  {item.caveats.map((c) => <li key={c}>{c}</li>)}
                </ul>
              </aside>
            ) : null}
          </section>

          {services.length ? (
            <section aria-labelledby="servicios">
              <SectionHeading id="servicios">{t.sections.services}</SectionHeading>
              <div className="grid gap-3 md:grid-cols-3">
                {services.map((s) => (
                  <Link key={s.slug} href={`${serviceBase}/${s.slug}`} className="group rounded-2xl border border-white/10 p-5 transition hover:border-lime-400/60">
                    <p className="text-xs uppercase tracking-[0.18em] text-gray-500">{s.eyebrow}</p>
                    <p className="mt-2 font-semibold text-white group-hover:text-lime-400">{s.title}</p>
                    <p className="mt-2 text-sm leading-6 text-gray-400">{s.summary}</p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <section aria-labelledby="relacionados">
            <SectionHeading id="relacionados">{t.sections.related}</SectionHeading>
            <div className="grid gap-3 md:grid-cols-3">
              {related.map((c) => (
                <Link key={c.id} href={caseHref(lang, c)} className="group rounded-2xl border border-white/10 p-5 transition hover:border-lime-400/60">
                  <p className="font-display text-2xl text-white group-hover:text-lime-400">{c.title}</p>
                  <p className="mt-2 text-sm leading-6 text-gray-400">{c.hook}</p>
                </Link>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href={lang === "es" ? "/contacto#proyecto" : "/en/contact#project"} className="rounded-full bg-lime-400 px-5 py-2.5 font-semibold text-black hover:bg-lime-400/85">
                {t.talkProject}
              </Link>
              <Link href={lang === "es" ? "/contacto#empleo" : "/en/contact#hiring"} className="rounded-full border border-white/20 px-5 py-2.5 text-gray-100 hover:border-lime-400">
                {t.hireMe}
              </Link>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
