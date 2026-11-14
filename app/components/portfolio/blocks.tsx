import type { Locale } from "../../lib/i18n/config";
import type { FlowStep, PieceStatus, StatusRow } from "../../lib/portfolio/types";
import { getPortfolioUi } from "../../lib/portfolio/ui";

const statusTone: Record<PieceStatus, string> = {
  production: "border-lime-300/50 bg-lime-300/15 text-lime-200",
  connected: "border-emerald-300/40 bg-emerald-300/10 text-emerald-200",
  tested: "border-sky-300/40 bg-sky-300/10 text-sky-200",
  built: "border-white/20 bg-white/5 text-gray-200",
  progress: "border-amber-300/40 bg-amber-300/10 text-amber-200",
  pending: "border-orange-300/40 bg-orange-300/10 text-orange-200",
  proposal: "border-fuchsia-300/40 bg-fuchsia-300/10 text-fuchsia-200",
};

/** El estado se nombra con texto, no solo con color, para no depender de él. */
export function StatusBadge({ status, lang }: { status: PieceStatus; lang: Locale }) {
  const t = getPortfolioUi(lang);
  return (
    <span className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusTone[status]}`}>
      {t.status[status]}
    </span>
  );
}

export function StatusTable({ rows, lang }: { rows: StatusRow[]; lang: Locale }) {
  const t = getPortfolioUi(lang);
  return (
    <div>
      <ul className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10">
        {rows.map((row) => (
          <li key={row.piece} className="grid gap-2 bg-white/[0.02] p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-6">
            <div>
              <p className="font-semibold text-white">{row.piece}</p>
              <p className="mt-1 text-sm leading-6 text-gray-400">{row.note}</p>
            </div>
            <StatusBadge status={row.status} lang={lang} />
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs leading-5 text-gray-500">{t.statusLegend}</p>
    </div>
  );
}

/**
 * Diagrama de flujo como lista ordenada: se lee igual con lector de pantalla,
 * en móvil (vertical) y en escritorio (rejilla numerada).
 */
export function FlowDiagram({ steps, label }: { steps: FlowStep[]; label: string }) {
  return (
    <ol aria-label={label} className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, index) => (
        <li key={step.title} className="relative rounded-2xl border border-white/10 bg-[#0c0d0b] p-5">
          <span className="font-display text-4xl leading-none text-lime-300/90" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="mt-3 font-semibold text-white">{step.title}</p>
          <p className="mt-2 text-sm leading-6 text-gray-400">{step.detail}</p>
        </li>
      ))}
    </ol>
  );
}

export function SectionHeading({ id, eyebrow, children }: { id?: string; eyebrow?: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime-300/80">{eyebrow}</p> : null}
      <h2 id={id} className="font-display mt-2 text-3xl leading-tight text-white sm:text-4xl">
        {children}
      </h2>
    </div>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-7 text-gray-300">
          <span aria-hidden="true" className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-lime-300" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
