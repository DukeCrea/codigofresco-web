import Link from "next/link";

import { HeroCanvas } from "./hero-canvas";
import type { Locale } from "./lib/i18n/config";
import { getHome } from "./lib/i18n/home";
import { Magnetic } from "./magnetic";

export function HomeHero({ lang = "es" }: { lang?: Locale }) {
  const t = getHome(lang).hero;

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950 px-6 pb-16 pt-32 md:px-8">
      <HeroCanvas />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/20 to-gray-950" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <div className="mb-6 inline-flex rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-1.5 text-sm font-medium text-lime-300">
          {t.badge}
        </div>
        <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-7xl">
          {t.titleLead}<span className="text-lime-400">{t.titleHighlight}</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-gray-100 md:text-xl">
          {t.subtitle}
        </p>
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          <Magnetic>
            <Link
              href={t.ctaPrimaryHref}
              className="inline-flex items-center gap-2 rounded-lg bg-lime-400 px-8 py-3 font-bold text-gray-950 shadow-lg shadow-lime-400/30 transition hover:bg-lime-300"
            >
              {t.ctaPrimary}
            </Link>
          </Magnetic>
          <Link
            href={t.ctaSecondaryHref}
            className="rounded-lg border-2 border-white px-8 py-3 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-white hover:text-gray-950"
          >
            {t.ctaSecondary}
          </Link>
        </div>
        <p className="text-sm text-gray-300">
          {t.reassurance}
        </p>
      </div>
    </section>
  );
}
