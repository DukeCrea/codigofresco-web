import { pageDates } from "../../../lib/content-dates";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CheckIcon } from "../../../icons";
import { Breadcrumbs, MarketingHeader, SiteFooter, SystemVisual } from "../../../marketing-layout";
import { caseStudies, getCaseStudy } from "../../../lib/content";
import { breadcrumbJsonLd, buildMetadata, organizationId, personId, serializeJsonLd } from "../../../lib/seo";
import { getServiceBySlug, siteConfig } from "../../../lib/site";

/**
 * Casos anteriores al portafolio (BARETEC, Mili & Molo). Se conservan con su
 * URL; los casos de Champion Motors y Camsmark redirigen a sus versiones
 * ampliadas del portafolio (ver next.config.ts).
 */
export const legacySlugs = caseStudies.map((item) => item.slug);

export function legacyMetadata(slug: string): Metadata {
  const item = getCaseStudy(slug);
  if (!item) return { title: "Caso no encontrado", robots: { index: false, follow: false } };
  const metadata = buildMetadata({ title: item.metaTitle, description: item.metaDescription, path: `/casos/${item.slug}` });
  if (metadata.openGraph) delete metadata.openGraph.images;
  if (metadata.twitter) delete metadata.twitter.images;
  return metadata;
}

export function LegacyCase({ slug }: { slug: string }) {
  const item = getCaseStudy(slug);
  if (!item) notFound();
  const path = `/casos/${item.slug}`;
  const related = item.relatedServices.map(getServiceBySlug).filter((service) => service !== undefined);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${siteConfig.url}${path}#article`,
        headline: item.metaTitle,
        description: item.metaDescription,
        datePublished: pageDates(path).published,
        dateModified: pageDates(path).modified,
        inLanguage: "es",
        author: { "@id": personId },
        publisher: { "@id": organizationId },
        mainEntityOfPage: `${siteConfig.url}${path}`,
        image: `${siteConfig.url}/og.jpg`,
        about: item.stack,
      },
      breadcrumbJsonLd([
        { name: "Inicio", path: "/" },
        { name: "Casos", path: "/casos" },
        { name: item.client, path },
      ]),
    ],
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <MarketingHeader whatsappMessage={`Hola CodigoFresco, vi el caso ${item.client} y quiero conversar sobre un proyecto similar.`} />
      <main id="contenido">
        <article>
          <header className="border-b border-gray-900 bg-gray-950 px-6 py-16 md:px-8 md:py-20">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Casos", href: "/casos" }, { label: item.client, href: path }]} />
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-lime-400">{item.sector}</p>
                <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">{item.client}</h1>
                <p className="mt-6 text-lg leading-8 text-gray-300">{item.metaDescription}</p>
              </div>
              <SystemVisual labels={item.capabilities.slice(0, 4)} />
            </div>
          </header>

          <section aria-labelledby="resumen" className="border-b border-white/10 px-6 py-10 md:px-8">
            <div className="mx-auto max-w-4xl rounded-2xl border border-lime-400/30 bg-lime-400/[0.04] p-6">
              <h2 id="resumen" className="font-bold text-lime-400">En resumen</h2>
              <p className="mt-3 leading-7 text-gray-200">{item.challenge} {item.solution} {item.result}</p>
            </div>
          </section>

          <section className="px-6 py-20 md:px-8">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
              {[
                ["Reto", item.challenge],
                ["Solución", item.solution],
                ["Resultado funcional", item.result],
              ].map(([heading, body]) => (
                <div key={heading} className="rounded-lg border border-gray-800 bg-gray-950 p-6">
                  <h2 className="text-xl font-bold text-lime-400">{heading}</h2>
                  <p className="mt-4 leading-7 text-gray-300">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="border-t border-gray-900 bg-gray-950 px-6 py-20 md:px-8">
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold">Capacidades implementadas</h2>
                <ul className="mt-6 space-y-4">
                  {item.capabilities.map((capability) => (
                    <li key={capability} className="flex gap-3 text-gray-300"><CheckIcon className="mt-1 h-5 w-5 shrink-0 text-lime-400" />{capability}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-3xl font-bold">Tecnología utilizada</h2>
                <div className="mt-6 flex flex-wrap gap-3">
                  {item.stack.map((tech) => <span key={tech} className="rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-2 text-sm text-lime-400">{tech}</span>)}
                </div>
              </div>
            </div>
          </section>

          <section className="border-t border-gray-900 px-6 py-20 md:px-8">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-3xl font-bold">Soluciones relacionadas</h2>
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {related.map((service) => (
                  <Link key={service.slug} href={`/servicios/${service.slug}`} className="rounded-lg border border-gray-800 bg-gray-950 p-6 hover:border-lime-400/70">
                    <p className="text-sm font-semibold text-lime-400">{service.eyebrow}</p>
                    <h3 className="mt-2 text-lg font-bold">{service.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-gray-300">{service.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
