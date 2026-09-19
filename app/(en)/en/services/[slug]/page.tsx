import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckIcon, WhatsAppIcon } from "../../../../icons";
import { Breadcrumbs, MarketingHeader, SiteFooter, SystemVisual } from "../../../../marketing-layout";
import { serviceSlugMapReverse } from "../../../../lib/i18n/config";
import { enServices, getEnServiceBySlug } from "../../../../lib/i18n/en/services";
import { getPages } from "../../../../lib/i18n/pages";
import { breadcrumbJsonLd, buildMetadata, organizationId, serializeJsonLd } from "../../../../lib/seo";
import { getWhatsAppUrl, siteConfig } from "../../../../lib/site";

type Props = { params: Promise<{ slug: string }> };

const t = getPages("en");

export const dynamicParams = false;

export function generateStaticParams() {
  return enServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getEnServiceBySlug(slug);

  if (!service) {
    return { title: t.serviceDetail.notFound, robots: { index: false, follow: false } };
  }

  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/en/services/${service.slug}`,
    lang: "en",
    // La ruta española equivalente es la que empareja los dos idiomas en el
    // hreflang; sin ella cada versión competiría contra la otra en Google.
    esPath: `/servicios/${serviceSlugMapReverse[service.slug]}`,
  });
}

export default async function EnglishServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getEnServiceBySlug(slug);

  if (!service) notFound();

  const relatedServices = service.related
    .map((relatedSlug) => getEnServiceBySlug(relatedSlug))
    .filter((related): related is NonNullable<typeof related> => Boolean(related));

  const serviceUrl = `${siteConfig.url}/en/services/${service.slug}`;
  const whatsappMessage = t.serviceDetail.whatsappMessage(service.title);
  const whatsappUrl = getWhatsAppUrl(whatsappMessage);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      serviceType: service.title,
      category: service.categoryLabel,
      description: service.metaDescription,
      url: serviceUrl,
      inLanguage: "en",
      provider: { "@id": organizationId },
      offers: { "@type": "Offer", availability: "https://schema.org/InStock", url: serviceUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${serviceUrl}#faq`,
      inLanguage: "en",
      mainEntity: service.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@context": "https://schema.org",
      ...breadcrumbJsonLd([
        { name: t.breadcrumbHome, path: "/en" },
        { name: t.servicesIndex.label, path: "/en/services" },
        { name: service.title, path: `/en/services/${service.slug}` },
      ]),
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />

      <MarketingHeader lang="en" whatsappMessage={whatsappMessage} />

      <main>
        <section className="border-b border-gray-900 bg-gray-950 px-6 py-20 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <Breadcrumbs
                lang="en"
                items={[
                  { label: t.breadcrumbHome, href: "/en" },
                  { label: t.servicesIndex.label, href: "/en/services" },
                  { label: service.title, href: `/en/services/${service.slug}` },
                ]}
              />
              <div className="mb-5 inline-flex rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-1.5 text-sm font-semibold text-lime-300">
                {service.categoryLabel} · {service.eyebrow}
              </div>
              <h1 className="max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl">
                {service.heroTitle}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">{service.description}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-lime-400 px-8 py-3 font-bold text-gray-950 shadow-lg shadow-lime-400/20 transition hover:-translate-y-0.5 hover:bg-lime-300"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {t.serviceDetail.ctaPrimary}
                </a>
                <Link
                  href="/en/services"
                  className="rounded-lg border-2 border-gray-700 px-8 py-3 font-bold text-white transition hover:border-lime-400 hover:text-lime-400"
                >
                  {t.serviceDetail.ctaSecondary}
                </Link>
              </div>
            </div>
            <div className="space-y-5">
              <SystemVisual lang="en" labels={service.stack.slice(0, 4)} />
              <div className="rounded-lg border border-gray-800 bg-black p-6">
                <h2 className="text-xl font-bold text-white">{t.serviceDetail.outcomes}</h2>
                <ul className="mt-5 space-y-4">
                  {service.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-3 text-sm leading-6 text-gray-300">
                      <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-lime-400" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-gray-900 bg-black px-6 py-10 md:px-8">
          <div className="mx-auto max-w-4xl rounded-lg border border-lime-400/30 bg-lime-400/10 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-lime-300">Straight answer</p>
            <h2 className="mt-3 text-2xl font-bold text-white">{t.serviceDetail.solves(service.shortTitle)}</h2>
            <p className="mt-3 leading-7 text-gray-200">
              {service.summary} Scope gets defined after we review your current process, the
              integrations involved and the commercial or operational result that has to be measured.
            </p>
          </div>
        </section>

        <section className="px-6 py-20 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-lime-300">
                {t.serviceDetail.deliverablesEyebrow}
              </p>
              <h2 className="text-3xl font-bold text-white">{t.serviceDetail.deliverablesTitle}</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {service.deliverables.map((deliverable) => (
                  <div key={deliverable} className="rounded-xl border border-gray-800 bg-gray-950 p-5">
                    <CheckIcon className="mb-3 h-5 w-5 text-lime-400" />
                    <p className="text-sm font-medium text-gray-200">{deliverable}</p>
                  </div>
                ))}
              </div>
            </div>
            <aside className="rounded-xl border border-gray-800 bg-gray-950 p-6">
              <h3 className="text-lg font-bold text-white">{t.serviceDetail.stackTitle}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {service.stack.map((item) => (
                  <span key={item} className="rounded-full border border-lime-400/20 bg-lime-400/10 px-3 py-1 text-xs font-medium text-lime-200">
                    {item}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="border-t border-gray-900 bg-black px-6 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-lime-300">
              {t.serviceDetail.processEyebrow}
            </p>
            <h2 className="text-center text-3xl font-bold text-white">{t.serviceDetail.processTitle}</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-5">
              {service.process.map((step, index) => (
                <div key={step} className="rounded-xl border border-gray-800 bg-gray-950 p-5 text-center">
                  <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-lime-400 font-bold text-gray-950">
                    {index + 1}
                  </div>
                  <p className="text-sm font-semibold text-white">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-gray-900 px-6 py-20 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-lime-300">
                {t.serviceDetail.faqEyebrow}
              </p>
              <h2 className="text-3xl font-bold text-white">{t.serviceDetail.faqTitle}</h2>
              <p className="mt-4 leading-7 text-gray-400">{t.serviceDetail.faqIntro}</p>
            </div>
            <div className="space-y-4">
              {service.faq.map((faq) => (
                <details key={faq.q} className="rounded-lg border border-gray-800 bg-gray-950 p-6">
                  <summary className="cursor-pointer font-bold text-white hover:text-lime-400">{faq.q}</summary>
                  <p className="mt-4 leading-7 text-gray-400">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {relatedServices.length > 0 && (
          <section className="border-t border-gray-900 bg-black px-6 py-20 md:px-8">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-3xl font-bold text-white">{t.serviceDetail.relatedTitle}</h2>
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {relatedServices.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/en/services/${related.slug}`}
                    className="rounded-xl border border-gray-800 bg-gray-950 p-6 transition hover:-translate-y-1 hover:border-lime-400/70"
                  >
                    <p className="text-sm font-semibold text-lime-300">{related.categoryLabel}</p>
                    <h3 className="mt-2 text-lg font-bold text-white">{related.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-gray-400">{related.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-gradient-to-r from-lime-400 to-lime-500 px-6 py-20 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold text-gray-950">{t.serviceDetail.closingTitle}</h2>
            <p className="mt-5 text-xl leading-8 text-gray-900">{t.serviceDetail.closingBody}</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gray-950 px-8 py-3 font-bold text-white transition hover:bg-gray-800"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Talk to CodigoFresco
            </a>
          </div>
        </section>
      </main>
      <SiteFooter lang="en" />
    </div>
  );
}
