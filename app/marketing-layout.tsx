import Link from "next/link";

import { WhatsAppIcon } from "./icons";
import { industrias } from "./lib/industrias";
import type { Locale } from "./lib/i18n/config";
import { getUi } from "./lib/i18n/ui";
import { getWhatsAppUrl, serviceCategoryMap, siteConfig } from "./lib/site";
import { Logo } from "./logo";

/**
 * Cabecera y pie compartidos por los dos idiomas.
 *
 * `lang` cae en "es" por defecto a propósito: así las páginas españolas, que ya
 * están en producción, siguen llamando a estos componentes sin cambiar una sola
 * línea y su HTML no se mueve.
 */

export function LanguageSwitch({ lang = "es" as Locale }: { lang?: Locale }) {
  const { otherLocale } = getUi(lang);

  return (
    <Link
      href={otherLocale.code === "en" ? "/en" : "/"}
      hrefLang={otherLocale.code}
      aria-label={otherLocale.ariaLabel}
      className="rounded-lg border border-gray-700 px-2.5 py-1.5 text-xs font-bold text-gray-300 transition hover:border-lime-400 hover:text-lime-300"
    >
      {otherLocale.label}
    </Link>
  );
}

export function MarketingHeader({
  whatsappMessage,
  lang = "es",
}: {
  whatsappMessage?: string;
  lang?: Locale;
}) {
  const whatsappUrl = getWhatsAppUrl(whatsappMessage);
  const t = getUi(lang);

  return (
    <header className="border-b border-gray-900 bg-black/95">
      <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 md:px-8">
        <Link href={t.homeHref} className="flex items-center gap-2" aria-label={t.aria.home}>
          <Logo className="h-8 w-8 rounded-lg shadow-lg shadow-lime-400/40" />
          <span className="text-lg font-bold text-white">CodigoFresco</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm" aria-label={t.aria.mainNav}>
          <Link href={t.navHrefs.solutions} className="font-medium text-gray-300 transition hover:text-lime-300">
            {t.nav.solutions}
          </Link>
          <Link href={t.navHrefs.cases} className="font-medium text-gray-300 transition hover:text-lime-300">
            {t.nav.cases}
          </Link>
          {t.navHrefs.resources && t.nav.resources ? (
            <Link href={t.navHrefs.resources} className="hidden font-medium text-gray-300 transition hover:text-lime-300 sm:inline">
              {t.nav.resources}
            </Link>
          ) : null}
          <LanguageSwitch lang={lang} />
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-lime-400 px-4 py-2 font-bold text-gray-950 transition hover:bg-lime-300"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {t.nav.talk}
          </a>
        </nav>
      </div>
    </header>
  );
}

export function Breadcrumbs({
  items,
  lang = "es",
}: {
  items: Array<{ label: string; href: string }>;
  lang?: Locale;
}) {
  const t = getUi(lang);

  return (
    <nav aria-label={t.aria.breadcrumbs} className="mb-6 text-sm text-gray-300">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true" className="text-gray-600">/</span> : null}
            {index === items.length - 1 ? (
              <span aria-current="page" className="text-gray-200">{item.label}</span>
            ) : (
              <Link href={item.href} className="underline decoration-gray-600 underline-offset-4 hover:text-lime-300">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function SystemVisual({
  labels,
  lang = "es",
}: {
  labels?: string[];
  lang?: Locale;
}) {
  const t = getUi(lang);
  const resolved = labels ?? t.systemVisualLabels;

  return (
    <div
      className="relative overflow-hidden rounded-lg border border-gray-800 bg-black p-6"
      role="img"
      aria-label={`${t.aria.systemVisual}: ${resolved.join(", ")}`}
    >
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(#1f2937_1px,transparent_1px),linear-gradient(90deg,#1f2937_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="relative grid min-h-64 grid-cols-2 content-center gap-4">
        {resolved.slice(0, 4).map((label, index) => (
          <div
            key={label}
            className="flex min-h-24 items-center gap-3 rounded-lg border border-lime-400/30 bg-gray-950/95 p-4"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lime-400 text-sm font-bold text-gray-950">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-semibold text-white">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SiteFooter({ lang = "es" }: { lang?: Locale }) {
  const whatsappUrl = getWhatsAppUrl();
  const t = getUi(lang);
  const gridCols = t.footer.showEcosystems ? "md:grid-cols-6" : "md:grid-cols-4";

  return (
    <footer className="border-t border-gray-900 bg-gray-950 px-6 py-12 text-gray-300 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className={`mb-8 grid grid-cols-2 gap-8 ${gridCols}`}>
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <Logo className="h-7 w-7 rounded-lg" />
              <span className="font-bold text-white">CodigoFresco</span>
            </div>
            <p className="text-sm leading-6">{t.brandTagline}</p>
            {t.footer.location ? (
              <p className="mt-3 text-sm leading-6">
                Empresas en Panamá y{" "}
                <Link href="/venezuela" className="text-lime-300 underline underline-offset-4 hover:text-lime-200">
                  {t.footer.location}
                </Link>
                .
              </p>
            ) : (
              <p className="mt-3 text-sm leading-6">Remote team working across US time zones.</p>
            )}
          </div>

          {t.footer.columns.map((column) => (
            <div key={column.title}>
              <h2 className="mb-4 font-bold text-white">{column.title}</h2>
              <ul className="space-y-2 text-sm">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-lime-300">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {t.footer.showEcosystems ? (
            <div>
              <h2 className="mb-4 font-bold text-white">Ecosistemas</h2>
              <ul className="space-y-2 text-sm">
                {serviceCategoryMap.map((category) => (
                  <li key={category.id}>
                    <Link href={`/soluciones/${category.id}`} className="hover:text-lime-300">
                      {category.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {t.footer.showIndustries ? (
            <div>
              <h2 className="mb-4 font-bold text-white">Industrias</h2>
              <ul className="space-y-2 text-sm">
                {industrias.map((industria) => (
                  <li key={industria.slug}>
                    <Link href={`/industrias/${industria.slug}`} className="hover:text-lime-300">
                      {industria.eyebrow}
                    </Link>
                  </li>
                ))}
                <li><Link href="/venezuela" className="hover:text-lime-300">Empresas en Venezuela</Link></li>
              </ul>
            </div>
          ) : null}

          <div>
            <h2 className="mb-4 font-bold text-white">{t.footer.contactTitle}</h2>
            <ul className="space-y-2 text-sm">
              <li><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-lime-300">WhatsApp</a></li>
              <li><a href={`mailto:${siteConfig.email}`} className="break-all hover:text-lime-300">{siteConfig.email}</a></li>
              <li><a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-lime-300">Instagram</a></li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-bold text-white">{t.footer.legalTitle}</h2>
            <ul className="space-y-2 text-sm">
              {t.footer.legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-lime-300">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
