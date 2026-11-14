"use client";

import { useState } from "react";

import type { Locale } from "../../../lib/i18n/config";

/**
 * Panel simulado: puertas del embudo con datos FICTICIOS y las reglas reales
 * (umbral -> acción) tal como están definidas en el monitor de ZoDesk.
 */

const gates = [
  { es: "Llegaron", en: "Arrived", value: 120 },
  { es: "Los tocamos", en: "Contacted", value: 84 },
  { es: "Contestaron", en: "Replied", value: 51 },
  { es: "Siguen en conversación", en: "Still talking", value: 23 },
  { es: "Compraron", en: "Bought", value: 6 },
];

type Rule = {
  id: string;
  indicator: { es: string; en: string };
  observed: { es: string; en: string };
  threshold: { es: string; en: string };
  action: { es: string; en: string };
  fires: boolean;
};

const rules: Rule[] = [
  {
    id: "canal-sin-tocar",
    indicator: { es: "Canal con leads sin tocar", en: "Channel with untouched leads" },
    observed: { es: "Portal de clasificados: 14 leads, 2 tocados (14 %)", en: "Classifieds portal: 14 leads, 2 contacted (14%)" },
    threshold: { es: "10 o más leads y 20 % o menos tocados", en: "10+ leads and 20% or fewer contacted" },
    action: { es: "Que el canal entre al reparto y a cada vendedor le llegue el aviso. Meta: más del 80 % tocados.", en: "Add the channel to assignment so each salesperson gets the alert. Target: over 80% contacted." },
    fires: true,
  },
  {
    id: "calificados-sin-tocar",
    indicator: { es: "Leads que califican sin tocar", en: "Qualified leads untouched" },
    observed: { es: "7 leads con camino de crédito sin contacto", en: "7 leads with a credit route and no contact" },
    threshold: { es: "5 o más", en: "5 or more" },
    action: { es: "Aviso al vendedor a los 15 minutos; si en una hora nadie lo toca, pasa a administración.", en: "Alert the salesperson at 15 minutes; if nobody acts within an hour, escalate to admin." },
    fires: true,
  },
  {
    id: "noche-domingo",
    indicator: { es: "Leads de noche o domingo", en: "Night or Sunday leads" },
    observed: { es: "28 % de los leads, 40 % de ellos sin tocar", en: "28% of leads, 40% of them untouched" },
    threshold: { es: "35 % o más, con la mitad sin tocar", en: "35% or more, with half untouched" },
    action: { es: "WhatsApp automático en el primer minuto.", en: "Automatic WhatsApp within the first minute." },
    fires: false,
  },
  {
    id: "no-responde",
    indicator: { es: "Cerrados como “no responde”", en: "Closed as “no reply”" },
    observed: { es: "31 % de los tocados", en: "31% of contacted leads" },
    threshold: { es: "25 % o más", en: "25% or more" },
    action: { es: "Cinco intentos en siete días antes de cerrar.", en: "Five attempts over seven days before closing." },
    fires: true,
  },
  {
    id: "ventas-sin-lead",
    indicator: { es: "Ventas unidas con su lead", en: "Sales matched to their lead" },
    observed: { es: "33 % de las ventas", en: "33% of sales" },
    threshold: { es: "Menos del 20 %", en: "Under 20%" },
    action: { es: "Que el asesor elija el lead de origen al cerrar la venta.", en: "Ask the salesperson to pick the source lead when closing the sale." },
    fires: false,
  },
];

export function PanelDemo({ lang }: { lang: Locale }) {
  const [selected, setSelected] = useState(rules[0].id);
  const [decisions, setDecisions] = useState<Record<string, "ok" | "no">>({});
  const rule = rules.find((r) => r.id === selected)!;
  const max = gates[0].value;

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0e100c] p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-semibold text-white">{lang === "en" ? "Lead monitor" : "Monitor de leads"}</p>
        <p className="rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-0.5 text-xs font-semibold text-amber-200">
          {lang === "en" ? "Simulation · fictitious data" : "Simulación · datos ficticios"}
        </p>
      </div>

      <ol className="mt-5 space-y-2" aria-label={lang === "en" ? "Funnel gates" : "Puertas del embudo"}>
        {gates.map((g) => (
          <li key={g.es} className="grid grid-cols-[8.5rem_1fr_2.5rem] items-center gap-3 text-sm sm:grid-cols-[11rem_1fr_3rem]">
            <span className="text-gray-300">{g[lang]}</span>
            <span className="h-3 overflow-hidden rounded-full bg-white/5">
              <span className="block h-full rounded-full bg-lime-300/80" style={{ width: `${(g.value / max) * 100}%` }} />
            </span>
            <span className="text-right tabular-nums text-gray-100">{g.value}</span>
          </li>
        ))}
      </ol>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div role="radiogroup" aria-label={lang === "en" ? "Indicators" : "Indicadores"} className="space-y-2">
          {rules.map((r) => (
            <button
              key={r.id}
              type="button"
              role="radio"
              aria-checked={selected === r.id}
              onClick={() => setSelected(r.id)}
              className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition ${
                selected === r.id ? "border-lime-300/60 bg-lime-300/10 text-white" : "border-white/10 text-gray-300 hover:border-white/30"
              }`}
            >
              <span>{r.indicator[lang]}</span>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${r.fires ? "bg-orange-300/15 text-orange-200" : "bg-white/5 text-gray-400"}`}>
                {r.fires ? (lang === "en" ? "Fires" : "Activa") : lang === "en" ? "Quiet" : "Callada"}
              </span>
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-5" aria-live="polite">
          <dl className="space-y-3 text-sm">
            <div><dt className="text-xs uppercase tracking-[0.18em] text-gray-500">{lang === "en" ? "Observed" : "Observado"}</dt><dd className="mt-1 text-gray-100">{rule.observed[lang]}</dd></div>
            <div><dt className="text-xs uppercase tracking-[0.18em] text-gray-500">{lang === "en" ? "Threshold" : "Umbral"}</dt><dd className="mt-1 text-gray-100">{rule.threshold[lang]}</dd></div>
            <div><dt className="text-xs uppercase tracking-[0.18em] text-gray-500">{lang === "en" ? "Suggested action" : "Acción sugerida"}</dt><dd className="mt-1 text-lime-100">{rule.fires ? rule.action[lang] : lang === "en" ? "Nothing to do: the rule stays quiet when the indicator is in range." : "Nada que hacer: la regla calla cuando el indicador está en rango."}</dd></div>
          </dl>
          {rule.fires ? (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <button type="button" onClick={() => setDecisions((d) => ({ ...d, [rule.id]: "ok" }))} className="rounded-full bg-lime-300 px-4 py-1.5 text-sm font-semibold text-black hover:bg-lime-200">
                {lang === "en" ? "Accept" : "Aceptar"}
              </button>
              <button type="button" onClick={() => setDecisions((d) => ({ ...d, [rule.id]: "no" }))} className="rounded-full border border-white/20 px-4 py-1.5 text-sm text-gray-200 hover:border-white/50">
                {lang === "en" ? "Dismiss" : "Descartar"}
              </button>
              {decisions[rule.id] ? (
                <span className="text-xs text-gray-400">
                  {lang === "en" ? "Recorded with author and date" : "Registrado con autor y fecha"} · {decisions[rule.id] === "ok" ? (lang === "en" ? "accepted" : "aceptada") : lang === "en" ? "dismissed" : "descartada"}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
      <p className="mt-4 text-xs leading-5 text-gray-500">
        {lang === "en"
          ? "Thresholds and actions match the rules defined in ZoDesk. The numbers are invented and do not represent any client."
          : "Los umbrales y las acciones coinciden con las reglas definidas en ZoDesk. Las cifras son inventadas y no representan a ningún cliente."}
      </p>
    </div>
  );
}
