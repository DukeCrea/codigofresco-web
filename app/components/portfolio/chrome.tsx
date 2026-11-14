import Link from "next/link";

import type { Locale } from "../../lib/i18n/config";
import { getPortfolioUi } from "../../lib/portfolio/ui";
import { siteConfig } from "../../lib/site";
import { Logo } from "../../logo";
import { LangLink } from "./lang-link";

/**
 * Cabecera, pie y migas del portafolio.
 *
 * `alternateHref` es la página equivalente en el otro idioma. Si no existe se
 * omite y el selector lleva a la portada del otro idioma: es mejor que mandar
 * a alguien a un 404.
 */

export function PortfolioHeader({ lang, alternateHref }: { lang: Locale; alternateHref?: string | null }) {
  const t = getPortfolioUi(lang);
  const homeHref = lang === "es" ? "/" : "/en";
  const otherHome = lang === "es" ? "/en" : "/";
  const otherLang = lang === "es" ? "en" : "es";

  return (
    <>
      <a
        href="#contenido"
        className="sr-only z-50 rounded bg-lime-300 px-4 py-2 font-semibold text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {t.skip}
      </a>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050505]/90 backdrop-blur supports-[backdrop-filter]:bg-[#050505]/75">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href={homeHref} className="flex items-center gap-2.5" aria-label={t.home}>
            <Logo className="h-7 w-7 rounded-md" />
            <span className="text-[15px] font-semibold tracking-tight text-white">
              Código Fresco
              <span className="hidden font-normal text-gray-400 sm:inline"> · Antonio Duque</span>
            </span>
          </Link>

          <nav aria-label={t.mainNav} className="hidden items-center gap-7 text-sm md:flex">
            {t.nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-gray-300 transition hover:text-white">
                {item.label}
              </Link>
            ))}
            {alternateHref !== undefined ? (
              <Link
                href={alternateHref ?? otherHome}
                hrefLang={otherLang}
                aria-label={t.langAria}
                className="rounded-md border border-white/15 px-2 py-1 text-xs font-semibold text-gray-300 transition hover:border-lime-300 hover:text-lime-200"
              >
                {t.langLabel}
              </Link>
            ) : (
              <LangLink
                lang={lang}
                ariaLabel={t.langAria}
                className="rounded-md border border-white/15 px-2 py-1 text-xs font-semibold text-gray-300 transition hover:border-lime-300 hover:text-lime-200"
              >
                {t.langLabel}
              </LangLink>
            )}
            <Link
              href={t.contact.href}
              className="rounded-full bg-lime-300 px-4 py-2 font-semibold text-black transition hover:bg-lime-200"
            >
              {t.contact.label}
            </Link>
          </nav>

          {/* Menú móvil sin JavaScript: <details> es accesible y funciona aunque el script no cargue. */}
          <details className="group relative md:hidden">
            <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-gray-200 [&::-webkit-details-marker]:hidden">
              {t.menu}
              <span aria-hidden="true" className="transition group-open:rotate-45">+</span>
            </summary>
            <nav
              aria-label={t.mainNav}
              className="absolute right-0 mt-3 w-60 rounded-2xl border border-white/10 bg-[#0c0d0b] p-2 shadow-2xl shadow-black"
            >
              {[...t.nav, t.contact].map((item) => (
                <Link key={item.href} href={item.href} className="block rounded-xl px-4 py-3 text-gray-200 hover:bg-white/5">
                  {item.label}
                </Link>
              ))}
              {alternateHref !== undefined ? (
                <Link
                  href={alternateHref ?? otherHome}
                  hrefLang={otherLang}
                  aria-label={t.langAria}
                  className="mt-1 block rounded-xl border-t border-white/10 px-4 py-3 text-sm text-lime-200"
                >
                  {lang === "es" ? "English version" : "Versión en español"}
                </Link>
              ) : (
                <LangLink lang={lang} ariaLabel={t.langAria} className="mt-1 block rounded-xl border-t border-white/10 px-4 py-3 text-sm text-lime-200">
                  {lang === "es" ? "English version" : "Versión en español"}
                </LangLink>
              )}
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}

export function PortfolioFooter({ lang }: { lang: Locale }) {
  const t = getPortfolioUi(lang);
  const legal =
    lang === "es"
      ? [
          { label: "Privacidad", href: "/privacidad" },
          { label: "Cookies", href: "/cookies" },
          { label: "Términos", href: "/terminos" },
        ]
      : [
          { label: "Privacy", href: "/en/privacy" },
          { label: "Cookies", href: "/en/cookies" },
          { label: "Terms", href: "/en/terms" },
        ];
  const more =
    lang === "es"
      ? [
          { label: "Recursos", href: "/recursos" },
          { label: "Empresas en Venezuela", href: "/venezuela" },
        ]
      : [];

  return (
    <footer className="border-t border-white/10 bg-[#050505] px-4 py-14 text-sm text-gray-400 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl text-white">Código Fresco</p>
          <p className="mt-3 max-w-sm leading-6">
            {lang === "es"
              ? "Estrategias y sistemas que conectan marketing, ventas y operación. Trabajo remoto con Panamá, Venezuela y España."
              : "Strategies and systems that connect marketing, sales and operations. Remote work with Panama, Venezuela and Spain."}
          </p>
        </div>
        <div>
          <h2 className="mb-3 font-semibold text-white">{lang === "es" ? "Portafolio" : "Portfolio"}</h2>
          <ul className="space-y-2">
            {[...t.nav, ...more].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 font-semibold text-white">{t.contact.label}</h2>
          <ul className="space-y-2">
            <li><Link href={t.contact.href} className="hover:text-white">{lang === "es" ? "Proyectos y empleo" : "Projects and roles"}</Link></li>
            <li><a href={`mailto:${siteConfig.email}`} className="break-all hover:text-white">{siteConfig.email}</a></li>
            <li><a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a></li>
          </ul>
        </div>
        <div>
          <h2 className="mb-3 font-semibold text-white">Legal</h2>
          <ul className="space-y-2">
            {legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-xs text-gray-500">
        © {new Date().getFullYear()} Código Fresco · Antonio Duque.{" "}
        {lang === "es"
          ? "Los casos describen trabajo real; las cifras de clientes no se publican."
          : "Cases describe real work; client figures are not published."}
      </p>
    </footer>
  );
}

export function Crumbs({ lang, items }: { lang: Locale; items: Array<{ label: string; href: string }> }) {
  const t = getPortfolioUi(lang);
  return (
    <nav aria-label={t.breadcrumbs} className="text-sm text-gray-400">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true" className="text-gray-600">/</span> : null}
            {index === items.length - 1 ? (
              <span aria-current="page" className="text-gray-200">{item.label}</span>
            ) : (
              <Link href={item.href} className="underline decoration-white/20 underline-offset-4 hover:text-white">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Contenedor de página con cabecera, ancla de salto y pie. */
export function PortfolioShell({
  lang,
  alternateHref,
  children,
  jsonLd,
}: {
  lang: Locale;
  alternateHref?: string | null;
  children: React.ReactNode;
  jsonLd?: unknown;
}) {
  return (
    <div className="min-h-screen bg-[#050505] text-[#ededed]">
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      ) : null}
      <PortfolioHeader lang={lang} alternateHref={alternateHref} />
      <main id="contenido" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <PortfolioFooter lang={lang} />
    </div>
  );
}
