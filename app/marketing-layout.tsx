import Link from "next/link";

import type { Locale } from "./lib/i18n/config";
import { getUi } from "./lib/i18n/ui";
import { PortfolioFooter, PortfolioHeader } from "./components/portfolio/chrome";

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
      className="rounded-lg border border-gray-700 px-2.5 py-1.5 text-xs font-bold text-gray-300 transition hover:border-lime-400 hover:text-lime-400"
    >
      {otherLocale.label}
    </Link>
  );
}

export function MarketingHeader({
  lang = "es",
}: {
  /** Se conserva por compatibilidad con las páginas existentes. */
  whatsappMessage?: string;
  lang?: Locale;
}) {
  return <PortfolioHeader lang={lang} />;
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
              <Link href={item.href} className="underline decoration-gray-600 underline-offset-4 hover:text-lime-400">
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
  return <PortfolioFooter lang={lang} />;
}
