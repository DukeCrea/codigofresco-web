"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { Locale } from "../../lib/i18n/config";
import type { ArchiveGroup, ArchiveProject, Discipline } from "../../lib/portfolio/types";
import { getPortfolioUi } from "../../lib/portfolio/ui";

const ORDER: Discipline[] = ["marketing", "crm", "automation", "product", "operations"];

function FilterBar({
  lang,
  value,
  onChange,
  counts,
}: {
  lang: Locale;
  value: Discipline | "all";
  onChange: (v: Discipline | "all") => void;
  counts: Record<Discipline | "all", number>;
}) {
  const t = getPortfolioUi(lang);
  const options: Array<Discipline | "all"> = ["all", ...ORDER];
  return (
    <div role="group" aria-label={t.filterAria} className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          aria-pressed={value === o}
          onClick={() => onChange(o)}
          className={`rounded-full border px-4 py-1.5 text-sm transition ${
            value === o ? "border-lime-400 bg-lime-400 font-semibold text-black" : "border-white/15 text-gray-300 hover:border-white/40"
          }`}
        >
          {o === "all" ? t.allFilter : t.disciplines[o]} <span className="opacity-60">{counts[o]}</span>
        </button>
      ))}
    </div>
  );
}

function countBy<T extends { disciplines: Discipline[] }>(items: T[]) {
  const counts = { all: items.length } as Record<Discipline | "all", number>;
  for (const d of ORDER) counts[d] = items.filter((i) => i.disciplines.includes(d)).length;
  return counts;
}

export type CaseCardData = {
  id: string;
  href: string;
  order: number;
  title: string;
  context: string;
  hook: string;
  disciplines: Discipline[];
};

export function CaseGrid({ lang, cases }: { lang: Locale; cases: CaseCardData[] }) {
  const t = getPortfolioUi(lang);
  const [filter, setFilter] = useState<Discipline | "all">("all");
  const visible = filter === "all" ? cases : cases.filter((c) => c.disciplines.includes(filter));
  const counts = useMemo(() => countBy(cases), [cases]);

  return (
    <div>
      <FilterBar lang={lang} value={filter} onChange={setFilter} counts={counts} />
      <p className="sr-only" aria-live="polite">
        {visible.length} {lang === "es" ? "casos visibles" : "cases shown"}
      </p>
      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {visible.map((c) => (
          <li key={c.id}>
            <Link
              href={c.href}
              className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.02] p-6 transition hover:-translate-y-0.5 hover:border-lime-400/60 hover:bg-white/[0.04] sm:p-7"
            >
              <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.2em] text-gray-500">
                <span>{t.caseLabel} {String(c.order).padStart(2, "0")}</span>
                <span className="text-right">{c.disciplines.map((d) => t.disciplines[d]).join(" · ")}</span>
              </div>
              <h3 className="font-display mt-6 text-3xl leading-tight text-white group-hover:text-lime-400 sm:text-4xl">{c.title}</h3>
              <p className="mt-2 text-sm text-gray-500">{c.context}</p>
              <p className="mt-4 flex-1 leading-7 text-gray-300">{c.hook}</p>
              <span className="mt-6 text-sm font-semibold text-lime-400">{t.readCase} →</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ArchiveBrowser({
  lang,
  projects,
  groupOrder,
  caseHrefs,
}: {
  lang: Locale;
  projects: ArchiveProject[];
  groupOrder: ArchiveGroup[];
  caseHrefs: Record<string, string>;
}) {
  const t = getPortfolioUi(lang);
  const [filter, setFilter] = useState<Discipline | "all">("all");
  const [query, setQuery] = useState("");
  const counts = useMemo(() => countBy(projects), [projects]);
  const q = query.trim().toLowerCase();
  const visible = projects.filter(
    (p) =>
      (filter === "all" || p.disciplines.includes(filter)) &&
      (!q || [p.name, p.summary, p.stack, p.status].join(" ").toLowerCase().includes(q)),
  );

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <FilterBar lang={lang} value={filter} onChange={setFilter} counts={counts} />
        <label className="relative block lg:w-72">
          <span className="sr-only">{lang === "es" ? "Buscar en el archivo" : "Search the archive"}</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lang === "es" ? "Buscar: Laravel, WhatsApp, CRM…" : "Search: Laravel, WhatsApp, CRM…"}
            className="w-full rounded-full border border-white/15 bg-transparent px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:border-lime-400 focus:outline-none"
          />
        </label>
      </div>
      <p className="mt-4 text-sm text-gray-500" aria-live="polite">
        {visible.length} {lang === "es" ? "proyectos" : "projects"}
      </p>

      {groupOrder.map((group) => {
        const items = visible.filter((p) => p.group === group);
        if (!items.length) return null;
        return (
          <section key={group} aria-labelledby={`g-${group}`} className="mt-10">
            <h2 id={`g-${group}`} className={`font-display text-white ${group === "lab" ? "text-2xl text-gray-300" : "text-3xl"}`}>
              {t.groups[group]}
            </h2>
            <ul className={`mt-5 grid gap-3 ${group === "lab" ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
              {items.map((p) => (
                <li key={p.id} id={p.id} className={`rounded-2xl border border-white/10 ${group === "lab" ? "p-4" : "p-5"}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className={`font-semibold text-white ${group === "lab" ? "text-base" : "text-lg"}`}>{p.name}</h3>
                    <span className="text-xs text-gray-500">{p.visibility === "private" ? (lang === "es" ? "Repositorio privado" : "Private repository") : lang === "es" ? "Repositorio público" : "Public repository"}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-gray-300">{p.summary}</p>
                  {group !== "lab" ? <p className="mt-2 text-sm text-gray-400"><span className="text-gray-500">{lang === "es" ? "Mi rol: " : "My role: "}</span>{p.role}</p> : null}
                  <p className="mt-2 text-xs text-gray-500">{p.stack}</p>
                  <p className="mt-3 text-sm text-amber-100/80">{p.status}</p>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm">
                    {p.caseId && caseHrefs[p.caseId] ? (
                      <Link href={caseHrefs[p.caseId]} className="text-lime-400 hover:text-lime-400">{t.readCase} →</Link>
                    ) : null}
                    {p.url ? (
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-gray-300 underline decoration-white/20 underline-offset-4 hover:text-white">
                        {p.visibility === "public" ? "GitHub" : lang === "es" ? "Sitio" : "Website"} ↗
                      </a>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
