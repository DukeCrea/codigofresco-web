import Link from "next/link";

import { CheckIcon } from "../../../icons";
import { Breadcrumbs, MarketingHeader, SiteFooter, SystemVisual } from "../../../marketing-layout";
import { getServiceCategoryMap } from "../../../lib/i18n";
import { getPages } from "../../../lib/i18n/pages";
import { breadcrumbJsonLd, buildMetadata, organizationId, serializeJsonLd } from "../../../lib/seo";
import { siteConfig } from "../../../lib/site";

const t = getPages("en");

export const metadata = buildMetadata({
  title: t.servicesIndex.metaTitle,
  description: t.servicesIndex.metaDescription,
  path: "/en/services",
  lang: "en",
  esPath: "/servicios",
});

export default function EnglishServicesPage() {
  const categories = getServiceCategoryMap("en");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteConfig.url}/en/services#page`,
        name: t.servicesIndex.collectionName,
        description: t.servicesIndex.metaDescription,
        url: `${siteConfig.url}/en/services`,
        inLanguage: "en",
        about: { "@id": organizationId },
      },
      breadcrumbJsonLd([
        { name: t.breadcrumbHome, path: "/en" },
        { name: t.servicesIndex.label, path: "/en/services" },
      ]),
    ],
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <MarketingHeader lang="en" />
      <main>
        <section className="border-b border-gray-900 bg-gray-950 px-6 py-16 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <Breadcrumbs
                lang="en"
                items={[
                  { label: t.breadcrumbHome, href: "/en" },
                  { label: t.servicesIndex.label, href: "/en/services" },
                ]}
              />
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-lime-300">{t.servicesIndex.eyebrow}</p>
              <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">{t.servicesIndex.h1}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">{t.servicesIndex.intro}</p>
            </div>
            <SystemVisual lang="en" labels={t.servicesIndex.visualLabels} />
          </div>
        </section>

        <section className="px-6 py-20 md:px-8">
          <div className="mx-auto max-w-7xl space-y-14">
            {categories.map((category) => (
              <section key={category.id} aria-labelledby={`category-${category.id}`}>
                <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                  <div>
                    <p className="text-sm font-semibold text-lime-300">{category.label}</p>
                    <h2 id={`category-${category.id}`} className="mt-2 text-3xl font-bold text-white">
                      {category.headline}
                    </h2>
                  </div>
                  <p className="max-w-2xl text-sm leading-6 text-gray-400">{category.description}</p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {category.services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/en/services/${service.slug}`}
                      className="group rounded-lg border border-gray-800 bg-gray-950 p-6 transition hover:-translate-y-1 hover:border-lime-400/70"
                    >
                      <CheckIcon className="mb-4 h-5 w-5 text-lime-400" />
                      <h3 className="text-lg font-bold text-white group-hover:text-lime-300">{service.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-gray-300">{service.summary}</p>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="border-t border-gray-900 bg-lime-400 px-6 py-16 text-gray-950 md:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">{t.servicesIndex.ctaTitle}</h2>
            <p className="mt-4 text-lg leading-8">{t.servicesIndex.ctaBody}</p>
            <Link href={t.servicesIndex.ctaHref} className="mt-7 inline-flex rounded-lg bg-gray-950 px-7 py-3 font-bold text-white hover:bg-gray-800">
              {t.servicesIndex.ctaButton}
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter lang="en" />
    </div>
  );
}
