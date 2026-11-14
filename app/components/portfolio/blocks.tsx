import type { Locale } from "../../lib/i18n/config";
import type { FlowActor } from "../../lib/portfolio/flow-actors";
import type { FlowStep, PieceStatus, StatusRow } from "../../lib/portfolio/types";
import { getPortfolioUi } from "../../lib/portfolio/ui";

const statusTone: Record<PieceStatus, string> = {
  production: "border-lime-400/50 bg-lime-400/15 text-lime-400",
  connected: "border-indigo-300/40 bg-indigo-300/10 text-indigo-200",
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

const actorLabel: Record<Locale, Record<FlowActor, string>> = {
  es: { person: "Cliente", system: "Sistema", team: "Equipo" },
  en: { person: "Customer", system: "System", team: "Team" },
};

function ActorIcon({ actor }: { actor: FlowActor }) {
  const common = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (actor === "person")
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
      </svg>
    );
  if (actor === "team")
    return (
      <svg {...common}>
        <circle cx="9" cy="8" r="3.5" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M2.5 20c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5M16 14.5c3 0 5.5 1.5 5.5 4.5" />
      </svg>
    );
  return (
    <svg {...common}>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
    </svg>
  );
}

const actorTone: Record<FlowActor, string> = {
  system: "border-lime-400/40 bg-lime-400/[0.06]",
  person: "border-white/25 bg-white/[0.03]",
  team: "border-white/25 border-dashed bg-white/[0.02]",
};

function Arrow({ className }: { className: string }) {
  return (
    <span aria-hidden="true" className={`flex shrink-0 items-center justify-center text-lime-400 ${className}`}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="rotate-90">
        <path d="M4 12h15M13 6l6 6-6 6" />
      </svg>
    </span>
  );
}

/**
 * Flujograma vertical: nodos conectados con flechas hacia abajo y quién actúa
 * en cada paso (cliente, sistema o equipo). En pantallas anchas cada nodo es
 * una fila: número y actor, título, detalle. Es una lista ordenada, así que se
 * lee en orden con lector de pantalla.
 */
export function FlowDiagram({ steps, label, actors, lang }: { steps: FlowStep[]; label: string; actors?: FlowActor[]; lang: Locale }) {
  const who = steps.map((_, i) => actors?.[i] ?? "system");
  const mixed = new Set(who).size > 1;
  const names = actorLabel[lang];

  return (
    <div>
      {mixed ? (
        <ul className="mb-5 flex flex-wrap gap-2 text-xs text-gray-300" aria-label={lang === "en" ? "Who acts" : "Quién actúa"}>
          {(["person", "system", "team"] as FlowActor[])
            .filter((a) => who.includes(a))
            .map((a) => (
              <li key={a} className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 ${actorTone[a]}`}>
                <span className={a === "system" ? "text-lime-400" : "text-gray-200"}><ActorIcon actor={a} /></span>
                {names[a]}
              </li>
            ))}
        </ul>
      ) : null}

      <ol aria-label={label} className="flex max-w-4xl flex-col">
        {steps.map((step, index) => (
          <li key={step.title} className="flex flex-col items-stretch">
            <div className={`rounded-2xl border p-4 sm:grid sm:grid-cols-[8.5rem_minmax(0,11rem)_minmax(0,1fr)] sm:items-center sm:gap-5 ${actorTone[who[index]]}`}>
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lime-400 text-sm font-bold text-black" aria-hidden="true">
                  {index + 1}
                </span>
                {mixed ? (
                  <span className={`inline-flex items-center gap-1 text-xs ${who[index] === "system" ? "text-lime-400" : "text-gray-300"}`}>
                    <ActorIcon actor={who[index]} />
                    <span>{names[who[index]]}</span>
                  </span>
                ) : null}
              </div>
              <p className="mt-3 font-semibold leading-snug text-white sm:mt-0">{step.title}</p>
              <p className="mt-1.5 text-sm leading-6 text-gray-400 sm:mt-0">{step.detail}</p>
            </div>
            {index < steps.length - 1 ? <Arrow className="h-7" /> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function SectionHeading({ id, eyebrow, children }: { id?: string; eyebrow?: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime-400/80">{eyebrow}</p> : null}
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
          <span aria-hidden="true" className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-lime-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
