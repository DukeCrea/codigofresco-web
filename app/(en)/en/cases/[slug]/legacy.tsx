import { pageDates } from "../../../../lib/content-dates";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs, MarketingHeader, SiteFooter } from "../../../../marketing-layout";
import { caseSlugMapReverse } from "../../../../lib/i18n/config";
import { enCaseStudies, getEnCaseStudy } from "../../../../lib/i18n/en/content";
import { getEnServiceBySlug } from "../../../../lib/i18n/en/services";
import { getPages } from "../../../../lib/i18n/pages";
import { breadcrumbJsonLd, buildMetadata, organizationId, personId, serializeJsonLd } from "../../../../lib/seo";
import { siteConfig } from "../../../../lib/site";

const t = getPages("en");

/** Legacy case studies kept at their URLs (see the Spanish twin for context). */
export const legacySlugs = enCaseStudies.map((item) => item.slug);

export function legacyMetadata(slug: string): Metadata {
  const item = getEnCaseStudy(slug);
  if (!item) return { title: t.caseDetail.notFound, robots: { index: false, follow: false } };

  const metadata = buildMetadata({
    title: item.metaTitle,
    description: item.metaDescription,
    path: `/en/cases/${item.slug}`,
    lang: "en",
    esPath: `/casos/${caseSlugMapReverse[item.slug]}`,
  });
  if (metadata.openGraph) delete metadata.openGraph.images;
  if (metadata.twitter) delete metadata.twitter.images;
  return metadata;
}

export function LegacyCase({ slug }: { slug: string }) {
  const item = getEnCaseStudy(slug);
  if (!item) notFound();

  const path = `/en/cases/${item.slug}`;
  const related = item.relatedServices
    .map((serviceSlug) => getEnServiceBySlug(serviceSlug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${siteConfig.url}${path}#article`,
        headline: item.metaTitle,
        description: item.metaDescription,
        url: `${siteConfig.url}${path}`,
        datePublished: pageDates(path).published,
        dateModified: pageDates(path).modified,
        image: `${siteConfig.url}/og.jpg`,
        mainEntityOfPage: `${siteConfig.url}${path}`,
        inLanguage: "en",
        author: { "@id": personId },
        publisher: { "@id": organizationId },
      },
      breadcrumbJsonLd([
        { name: t.breadcrumbHome, path: "/en" },
        { name: t.casesIndex.label, path: "/en/cases" },
        { name: item.client, path },
      ]),
    ],
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <MarketingHeader lang="en" />
      <main id="contenido">
        <section className="border-b border-gray-900 bg-gray-950 px-6 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs
              lang="en"
              items={[
                { label: t.breadcrumbHome, href: "/en" },
                { label: t.casesIndex.label, href: "/en/cases" },
                { label: item.client, href: path },
              ]}
            />
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-lime-400">{item.sector}</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">{item.client}</h1>
          </div>
        </section>

        <section aria-labelledby="resumen" className="border-b border-white/10 px-6 py-10 md:px-8">
          <div className="mx-auto max-w-4xl rounded-2xl border border-lime-400/30 bg-lime-400/[0.04] p-6">
            <h2 id="resumen" className="font-bold text-lime-400">At a glance</h2>
            <p className="mt-3 leading-7 text-gray-200">{item.challenge} {item.solution} {item.result}</p>
          </div>
        </section>

        <section className="px-6 py-20 md:px-8">
          <div className="mx-auto grid max-w-4xl gap-10">
            <div>
              <h2 className="text-3xl font-bold">{t.caseDetail.challenge}</h2>
              <p className="mt-4 leading-8 text-gray-300">{item.challenge}</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold">{t.caseDetail.solution}</h2>
              <p className="mt-4 leading-8 text-gray-300">{item.solution}</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold">{t.caseDetail.result}</h2>
              <p className="mt-4 leading-8 text-gray-300">{item.result}</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold">{t.caseDetail.capabilities}</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {item.capabilities.map((capability) => (
                  <li key={capability} className="rounded-lg border border-gray-800 bg-gray-950 p-4 text-sm text-gray-200">
                    {capability}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold">{t.caseDetail.stack}</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.stack.map((tech) => (
                  <span key={tech} className="rounded-full border border-lime-400/20 bg-lime-400/10 px-3 py-1 text-xs font-medium text-lime-400">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="border-t border-gray-900 bg-black px-6 py-20 md:px-8">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-3xl font-bold">{t.caseDetail.related}</h2>
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {related.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/en/services/${service.slug}`}
                    className="rounded-xl border border-gray-800 bg-gray-950 p-6 transition hover:-translate-y-1 hover:border-lime-400/70"
                  >
                    <p className="text-sm font-semibold text-lime-400">{service.categoryLabel}</p>
                    <h3 className="mt-2 text-lg font-bold text-white">{service.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-gray-400">{service.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter lang="en" />
    </div>
  );
}
