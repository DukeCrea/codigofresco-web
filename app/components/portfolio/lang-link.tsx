"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { alternatePaths, esPathFromEn } from "../../lib/i18n/config";
import type { Locale } from "../../lib/i18n/config";

/**
 * Enlace al otro idioma calculado desde la ruta actual. Si la página no tiene
 * traducción, lleva a la portada del otro idioma en vez de a un 404.
 */
export function LangLink({
  lang,
  className,
  ariaLabel,
  children,
}: {
  lang: Locale;
  className?: string;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "/";
  const target = lang === "es" ? alternatePaths(pathname).en ?? "/en" : esPathFromEn(pathname) ?? "/";
  return (
    <Link href={target} hrefLang={lang === "es" ? "en" : "es"} aria-label={ariaLabel} className={className}>
      {children}
    </Link>
  );
}
