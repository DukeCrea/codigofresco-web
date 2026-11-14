"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { Locale } from "../../../lib/i18n/config";

/**
 * Demostración del chatform de financiamiento.
 *
 * Reproduce la LÓGICA del recorrido real (orden de preguntas, condiciones,
 * descartes inmediatos, mínimos de abono por camino y cálculo de la letra)
 * con autos, tasas y plazos FICTICIOS. No envía datos a ningún servidor ni
 * pide datos personales: todo vive en el estado del componente.
 */

type Answers = Record<string, string>;
type Option = { value: string; label: string };
type Question = {
  id: string;
  when: (a: Answers) => boolean;
  text: (a: Answers) => string;
  options: (a: Answers) => Option[];
};
type Car = { id: string; name: string; price: number; year: number };

const CARS: Car[] = [
  { id: "c1", name: "Sedán compacto 2021", price: 14900, year: 2021 },
  { id: "c2", name: "SUV mediana 2019", price: 21500, year: 2019 },
  { id: "c3", name: "Pickup doble cabina 2017", price: 18000, year: 2017 },
];
const CARS_EN: Record<string, string> = {
  c1: "Compact sedan 2021",
  c2: "Mid-size SUV 2019",
  c3: "Double-cab pickup 2017",
};

/** Tasas y plazos ilustrativos de la demo; no son los del cliente. */
const DEMO_RATE = { banco: 0.1, financiera: 0.18 };
const TERMS = { banco: [84, 72, 60, 48], financiera: [60, 60, 48, 36] };
const DEMO_YEAR = 2026;

const INCOME_VALUE: Record<string, number> = { b1: 600, b2: 700, b3: 1100, b4: 1800 };

function isFixedSalaried(a: Answers) {
  return a.tipo === "asalariado" && !!a.contrato && a.contrato !== "eventual";
}

function incomeAllowed(a: Answers) {
  switch (a.tipo) {
    case "asalariado":
    case "profesional":
      return true;
    case "independiente":
      return a.documentos === "si" && (a.negocio !== "formal" || !!a.declara);
    case "taxi":
    case "colegial":
      return a.cupo === "si";
    case "uber":
      return a.uber === "si";
    default:
      return false;
  }
}

function abonoOptions(a: Answers, en: boolean): Option[] {
  if (a.intent === "prestan") {
    return [
      { value: "usd:1500", label: en ? "Under $2,000" : "Menos de $2.000" },
      { value: "usd:3500", label: en ? "$2,000 – $5,000" : "$2.000 – $5.000" },
      { value: "usd:7000", label: en ? "$5,000 – $10,000" : "$5.000 – $10.000" },
      { value: "usd:11000", label: en ? "Over $10,000" : "Más de $10.000" },
    ];
  }
  const path = bankPath(a);
  const more = en ? "or more" : "o más";
  if (path && a.tipo === "asalariado")
    return [
      { value: "pct:15", label: "< 20 %" },
      { value: "pct:20", label: "20 – 30 %" },
      { value: "pct:30", label: "30 – 40 %" },
      { value: "pct:40", label: `40 % ${more}` },
    ];
  if (path && a.tipo === "profesional")
    return [
      { value: "pct:15", label: "< 25 %" },
      { value: "pct:25", label: "25 – 39 %" },
      { value: "pct:40", label: `40 % ${more}` },
    ];
  if (a.negocio === "formal")
    return [
      { value: "pct:20", label: "< 30 %" },
      { value: "pct:30", label: `30 % ${more}` },
    ];
  return [
    { value: "pct:30", label: "< 40 %" },
    { value: "pct:40", label: `40 % ${more}` },
  ];
}

function bankPath(a: Answers) {
  const apcOk = a.apc === "aldia" || a.apc === "nose";
  if (!apcOk) return false;
  const income = a.salario ?? "";
  const highEnough = income === "b3" || income === "b4";
  if (isFixedSalaried(a) && highEnough && a.tiempo && a.tiempo !== "t0") return true;
  if (a.tipo === "profesional" && highEnough && a.movimientos === "si") return true;
  if (a.tipo === "independiente" && a.negocio === "formal" && a.declara === "alto") return true;
  return false;
}

function minimums(a: Answers) {
  const bank = a.tipo === "profesional" ? 25 : a.negocio === "formal" ? 30 : 20;
  const lender = a.negocio === "formal" ? 30 : 40;
  return { bank, lender };
}

type Discard = { reason: string } | null;

function discard(a: Answers, en: boolean): Discard {
  if (a.tipo === "asalariado" && a.salario === "b1") return { reason: en ? "Monthly income under $650" : "Ingreso mensual menor a $650" };
  if (a.tipo === "profesional" && a.salario === "b1" && a.adicionales === "no")
    return { reason: en ? "Income under $650 with no additional income" : "Ingreso menor a $650 sin ingresos adicionales" };
  if (a.tipo === "independiente" && a.documentos === "no")
    return { reason: en ? "No supporting documents for self-employment" : "Sin documentos que respalden el negocio" };
  if ((a.tipo === "taxi" || a.tipo === "colegial") && a.cupo === "no")
    return { reason: en ? "No taxi or school-bus permit yet" : "Sin cupo de taxi o transporte escolar" };
  if (a.tipo === "uber" && a.uber === "no") return { reason: en ? "Not driving on a ride-hailing app yet" : "Todavía no maneja en plataformas" };
  return null;
}

type Route = "banco" | "financiera" | "none";

function route(a: Answers, pct: number): { route: Route; flags: string[] } {
  const flags: string[] = [];
  const { bank, lender } = minimums(a);
  const path = bankPath(a);
  if (a.contrato === "gobierno" && (a.tiempo === "t0" || a.tiempo === "t1" || a.tiempo === "t2")) flags.push("GOBIERNO: EVALUAR ANTIGÜEDAD");
  if (path && pct >= bank) {
    if (a.salario === "b4" && a.apc === "aldia" && a.negocio !== "formal" && !flags.length && (a.tipo === "profesional" || a.tiempo === "t2" || a.tiempo === "t3"))
      flags.push("PRIORIDAD ALTA");
    return { route: "banco", flags };
  }
  if (pct >= lender) {
    if (a.apc !== "aldia") flags.push("APC POR VALIDAR");
    return { route: "financiera", flags };
  }
  if (a.parte_pago === "si") {
    flags.push("TASAR PARA COMPLETAR EL ABONO");
    return { route: path ? "banco" : "financiera", flags };
  }
  return { route: "none", flags };
}

function biweekly(price: number, pct: number, r: Exclude<Route, "none">, year: number) {
  const age = DEMO_YEAR - year;
  const idx = age <= 3 ? 0 : age <= 6 ? 1 : age <= 9 ? 2 : 3;
  const n = TERMS[r][idx];
  const principal = price * (1 - pct / 100);
  const i = DEMO_RATE[r] / 12;
  const monthly = (principal * i) / (1 - Math.pow(1 + i, -n));
  return { quincena: Math.round(monthly / 2), months: n, monthly };
}

function buildQuestions(en: boolean): Question[] {
  const yes = en ? "Yes" : "Sí";
  const no = en ? "No" : "No";
  return [
    {
      id: "intent",
      when: () => true,
      text: () => (en ? "Good afternoon! What would you like to do today?" : "¡Buenas tardes! ¿Qué quieres hacer hoy?"),
      options: () => [
        { value: "financiar", label: en ? "Finance a car" : "Financiar un carro" },
        { value: "prestan", label: en ? "How much can I borrow?" : "¿Cuánto me prestan?" },
      ],
    },
    {
      id: "carro",
      when: (a) => a.intent === "financiar",
      text: () => (en ? "Do you already know which one you want? (fictitious cars)" : "¿Ya sabes cuál quieres? (autos ficticios)"),
      options: () => CARS.map((c) => ({ value: c.id, label: `${en ? CARS_EN[c.id] : c.name} · $${c.price.toLocaleString("en-US")}` })),
    },
    {
      id: "tipo",
      when: () => true,
      text: () => (en ? "What do you do for a living?" : "¿A qué te dedicas?"),
      options: () => [
        { value: "asalariado", label: en ? "Salaried" : "Asalariado" },
        { value: "profesional", label: en ? "Professional services" : "Servicios profesionales" },
        { value: "independiente", label: en ? "Self-employed" : "Independiente" },
        { value: "taxi", label: "Taxi" },
        { value: "colegial", label: en ? "School transport" : "Colegial" },
        { value: "uber", label: "Uber / InDriver" },
      ],
    },
    {
      id: "contrato",
      when: (a) => a.tipo === "asalariado",
      text: () => (en ? "Where do you work?" : "¿Dónde trabajas?"),
      options: () => [
        { value: "privada", label: en ? "Permanent, private company" : "Fijo en empresa privada" },
        { value: "gobierno", label: en ? "Permanent, government" : "Fijo en el gobierno" },
        { value: "publica", label: en ? "Permanent, public company" : "Fijo en empresa pública" },
        { value: "eventual", label: en ? "Temporary contract" : "Por contrato eventual" },
      ],
    },
    {
      id: "negocio",
      when: (a) => a.tipo === "independiente",
      text: () => (en ? "Is your business registered and does it file taxes?" : "¿Tu negocio tiene aviso de operación y declara renta?"),
      options: () => [
        { value: "formal", label: en ? "Yes, it's formal" : "Sí, es formal" },
        { value: "informal", label: en ? "No, it's informal" : "No, es informal" },
      ],
    },
    {
      id: "documentos",
      when: (a) => a.tipo === "independiente" && !!a.negocio,
      text: (a) =>
        a.negocio === "formal"
          ? en ? "Do you have two or more years of tax returns?" : "¿Tienes declaraciones de renta de 2 años o más?"
          : en ? "Do you have bank statements for the last 6 months?" : "¿Tienes estados de cuenta de los últimos 6 meses?",
      options: () => [{ value: "si", label: yes }, { value: "no", label: no }],
    },
    {
      id: "declara",
      when: (a) => a.negocio === "formal" && a.documentos === "si",
      text: () => (en ? "How much do you declare per year?" : "¿Cuánto declaras al año?"),
      options: () => [
        { value: "bajo", label: en ? "Under $33,000" : "Menos de $33.000" },
        { value: "alto", label: en ? "$33,000 or more" : "$33.000 o más" },
      ],
    },
    {
      id: "cupo",
      when: (a) => a.tipo === "taxi" || a.tipo === "colegial",
      text: (a) =>
        en
          ? `Do you have a permit or already work as a ${a.tipo === "taxi" ? "taxi driver" : "school-bus driver"}?`
          : `¿Tienes cupo o ya trabajas de ${a.tipo === "taxi" ? "taxi" : "busito colegial"}?`,
      options: () => [{ value: "si", label: yes }, { value: "no", label: no }],
    },
    {
      id: "uber",
      when: (a) => a.tipo === "uber",
      text: () => (en ? "Are you already driving on Uber or InDriver?" : "¿Ya estás manejando con Uber o InDriver?"),
      options: () => [{ value: "si", label: yes }, { value: "no", label: en ? "Not yet" : "Todavía no" }],
    },
    {
      id: "salario",
      when: (a) => incomeAllowed(a),
      text: (a) =>
        a.tipo === "asalariado"
          ? en ? "What is your monthly salary?" : "¿Cuánto es tu salario al mes?"
          : a.tipo === "profesional"
            ? en ? "How much do your services bring in per month?" : "¿Cuánto te entra al mes por tus servicios?"
            : en ? "Roughly how much do you keep each month?" : "¿Cuánto te queda al mes, más o menos?",
      options: () => [
        { value: "b1", label: en ? "Under $650" : "Menos de $650" },
        { value: "b2", label: "$650 – $749" },
        { value: "b3", label: en ? "$750 – $1,499" : "$750 – $1.499" },
        { value: "b4", label: en ? "$1,500 or more" : "$1.500 o más" },
      ],
    },
    {
      id: "adicionales",
      when: (a) => a.tipo === "profesional" && a.salario === "b1",
      text: () => (en ? "Do you get commissions or bonuses on top?" : "¿Te caen comisiones o bonos aparte del sueldo?"),
      options: () => [{ value: "si", label: yes }, { value: "no", label: no }],
    },
    {
      id: "tiempo",
      when: (a) => isFixedSalaried(a) && !!a.salario,
      text: () => (en ? "How long have you been there?" : "¿Cuánto tiempo llevas ahí?"),
      options: () => [
        { value: "t0", label: en ? "Under 6 months" : "Menos de 6 meses" },
        { value: "t1", label: en ? "6 months to 2 years" : "6 meses a 2 años" },
        { value: "t2", label: en ? "2 to 5 years" : "2 a 5 años" },
        { value: "t3", label: en ? "Over 5 years" : "Más de 5 años" },
      ],
    },
    {
      id: "movimientos",
      when: (a) => a.tipo === "profesional" && !!a.salario,
      text: () => (en ? "Do you have bank statements for the last 6 months?" : "¿Tienes estados de cuenta de los últimos 6 meses?"),
      options: () => [{ value: "si", label: yes }, { value: "no", label: no }],
    },
    {
      id: "apc",
      when: (a) => !!a.salario,
      text: () =>
        en
          ? "How is your credit bureau (APC) record? No judgment, we can work on it."
          : "¿Cómo andas en la APC? Sin pena, que eso lo trabajamos.",
      options: () => [
        { value: "aldia", label: en ? "Up to date" : "Al día" },
        { value: "atrasos", label: en ? "I've had late payments" : "He tenido atrasos" },
        { value: "nose", label: en ? "Not sure" : "No estoy seguro" },
      ],
    },
    {
      id: "abono",
      when: (a) => !!a.apc,
      text: () => (en ? "Almost there. How much do you have for the down payment?" : "Ya casi. ¿Con cuánto cuentas para el abono?"),
      options: (a) => abonoOptions(a, en),
    },
    {
      id: "parte_pago",
      when: (a) => {
        if (!a.abono || !a.abono.startsWith("pct:")) return false;
        const pct = Number(a.abono.slice(4));
        const { bank, lender } = minimums(a);
        return !(bankPath(a) && pct >= bank) && pct < lender;
      },
      text: () =>
        en ? "That down payment doesn't quite get there yet. Do you have a car to trade in?" : "Ese abono todavía no llega. ¿Tienes un carro para dar en parte de pago?",
      options: () => [{ value: "si", label: yes }, { value: "no", label: no }],
    },
  ];
}

type Message = { from: "bot" | "user"; text: string };
type Event = { name: string; detail?: string };

export function ChatformDemo({ lang }: { lang: Locale }) {
  const en = lang === "en";
  const questions = useMemo(() => buildQuestions(en), [en]);
  const [answers, setAnswers] = useState<Answers>({});
  const [log, setLog] = useState<Message[]>([]);
  const [events, setEvents] = useState<Event[]>([{ name: "asesor_inicio" }]);
  const [closing, setClosing] = useState<"" | "cita" | "whatsapp">("");
  const logRef = useRef<HTMLDivElement>(null);

  const blocked = discard(answers, en);
  const current = blocked ? undefined : questions.find((q) => !(q.id in answers) && q.when(answers));
  const finished = !current;

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [log, closing, finished]);

  function answer(q: Question, option: Option) {
    const next = { ...answers, [q.id]: option.value };
    setLog((prev) => [...prev, { from: "bot", text: q.text(answers) }, { from: "user", text: option.label }]);
    setAnswers(next);
    const evts: Event[] = [{ name: `asesor_paso`, detail: q.id }];
    const nowBlocked = discard(next, en);
    const nowNext = nowBlocked ? undefined : questions.find((x) => !(x.id in next) && x.when(next));
    if (!nowNext) evts.push({ name: "asesor_resultado", detail: nowBlocked ? "no_califica" : "evaluado" });
    setEvents((prev) => [...prev, ...evts]);
  }

  function restart() {
    const lastStep = current?.id;
    setEvents([...(lastStep && Object.keys(answers).length ? [{ name: "asesor_salir", detail: lastStep }] : []), { name: "asesor_inicio" }]);
    setAnswers({});
    setLog([]);
    setClosing("");
  }

  function close(kind: "cita" | "whatsapp") {
    setClosing(kind);
    setEvents((prev) => [...prev, { name: kind === "cita" ? "asesor_fin" : "asesor_whatsapp", detail: kind }]);
  }

  // ---- Resultado ----
  let result: null | {
    route: Route;
    flags: string[];
    lines: string[];
    cars: Array<{ car: Car; quincena: number; months: number }>;
  } = null;

  if (finished) {
    if (blocked) {
      result = { route: "none", flags: [blocked.reason], lines: [], cars: [] };
    } else if (answers.intent === "prestan") {
      const usd = Number((answers.abono ?? "usd:0").slice(4));
      const income = INCOME_VALUE[answers.salario ?? "b1"];
      const fits = CARS.flatMap((car) => {
        const pct = Math.min(99, (usd / car.price) * 100);
        const r = route(answers, pct);
        if (r.route === "none" || usd >= car.price * 0.9) return [];
        const b = biweekly(car.price, pct, r.route, car.year);
        if (b.monthly > income * 0.4) return [];
        return [{ car, quincena: b.quincena, months: b.months, r }];
      }).slice(0, 3);
      if (fits.length) {
        result = { route: fits[0].r.route, flags: fits[0].r.flags, lines: [], cars: fits };
      } else {
        result = { route: "none", flags: [en ? "No demo car fits the down payment and 40% income rule" : "Ningún auto de la demo cumple abono y letra ≤ 40 % del ingreso"], lines: [], cars: [] };
      }
    } else {
      const car = CARS.find((c) => c.id === answers.carro) ?? CARS[0];
      const pct = Number((answers.abono ?? "pct:0").slice(4));
      const r = route(answers, pct);
      const cars = r.route === "none" ? [] : [{ car, ...biweekly(car.price, pct, r.route, car.year) }];
      result = { route: r.route, flags: r.flags, lines: [], cars };
    }
  }

  const routeLabel = (r: Route) =>
    r === "banco" ? (en ? "bank" : "banco") : r === "financiera" ? (en ? "finance company" : "financiera") : "";

  const answeredSteps = Object.keys(answers);

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
      {/* Chat */}
      <div className="flex min-h-[520px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0e100c]">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
          <div>
            <p className="text-sm font-semibold text-white">{en ? "Financing advisor" : "Asesor de financiamiento"}</p>
            <p className="text-xs text-gray-400">{en ? "Demo · fictitious cars, rates and answers" : "Demo · autos, tasas y respuestas ficticios"}</p>
          </div>
          <button type="button" onClick={restart} className="rounded-full border border-white/15 px-3 py-1 text-xs text-gray-200 hover:border-lime-300">
            {en ? "Start over" : "Empezar de nuevo"}
          </button>
        </div>

        <div ref={logRef} role="log" aria-live="polite" className="flex-1 space-y-3 overflow-y-auto px-5 py-5" style={{ maxHeight: 460 }}>
          {log.map((m, i) => (
            <p
              key={i}
              className={
                m.from === "bot"
                  ? "max-w-[85%] rounded-2xl rounded-tl-sm bg-white/[0.06] px-4 py-2.5 text-sm leading-6 text-gray-100"
                  : "ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-lime-300 px-4 py-2.5 text-sm font-medium leading-6 text-black"
              }
            >
              <span className="sr-only">{m.from === "bot" ? (en ? "Advisor: " : "Asesor: ") : en ? "You: " : "Tú: "}</span>
              {m.text}
            </p>
          ))}

          {current ? (
            <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/[0.06] px-4 py-2.5 text-sm leading-6 text-gray-100">{current.text(answers)}</p>
          ) : null}

          {result ? (
            <div className="max-w-[92%] space-y-2 rounded-2xl rounded-tl-sm border border-lime-300/30 bg-lime-300/[0.06] px-4 py-3 text-sm leading-6 text-gray-100">
              {result.route === "none" ? (
                <>
                  <p>{en ? "Thanks for trusting us. With what you told me, I can't put together financing right now." : "Gracias por la confianza. Con lo que me contaste, ahorita no te puedo armar un financiamiento."}</p>
                  <p className="text-gray-300">{en ? "Leave your number and an advisor will call you to look for another option." : "Déjame tu celular: un asesor te llama para buscar otra opción."}</p>
                </>
              ) : (
                <>
                  <p className="font-semibold text-lime-100">
                    {en ? `Good news! Your profile has a possible ${routeLabel(result.route)} route.` : `¡Buenas noticias! Tu perfil tiene camino por ${routeLabel(result.route)}.`}
                  </p>
                  <p className="text-gray-300">
                    {en ? "The bank or finance company approves; we support you all the way." : "El que aprueba es el banco o la financiera; nosotros te acompañamos en todo."}
                  </p>
                  <ul className="space-y-1">
                    {result.cars.map(({ car, quincena, months }) => (
                      <li key={car.id} className="rounded-xl bg-black/30 px-3 py-2">
                        <span className="font-semibold text-white">{en ? CARS_EN[car.id] : car.name}</span>
                        <span className="block text-gray-300">
                          ≈ ${quincena.toLocaleString("en-US")} {en ? "every two weeks" : "la quincena"} · {en ? `approx., ${months} months` : `aproximado, a ${months} meses`}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-400">
                    {en ? "The bank or finance company gives you the final figure. Demo rates are illustrative." : "El banco o la financiera te da la cifra final. Las tasas de la demo son ilustrativas."}
                  </p>
                </>
              )}
            </div>
          ) : null}

          {closing ? (
            <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/[0.06] px-4 py-2.5 text-sm leading-6 text-gray-100">
              {closing === "cita"
                ? en ? "In the real flow you'd pick a day and time and get a calendar file. This demo stops here and doesn't ask for your details." : "En el flujo real eliges día y hora y recibes un archivo de calendario. La demo se detiene aquí y no pide tus datos."
                : en ? "In the real flow WhatsApp opens with a reference code, so you don't repeat anything. This demo doesn't open WhatsApp." : "En el flujo real se abre WhatsApp con un código de referencia para no repetir nada. La demo no abre WhatsApp."}
            </p>
          ) : null}
        </div>

        <div className="border-t border-white/10 p-4">
          {current ? (
            <div className="flex flex-wrap gap-2" role="group" aria-label={current.text(answers)}>
              {current.options(answers).map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => answer(current, option)}
                  className="rounded-full border border-lime-300/40 bg-lime-300/10 px-4 py-2 text-sm text-lime-100 transition hover:bg-lime-300 hover:text-black"
                >
                  {option.label}
                </button>
              ))}
            </div>
          ) : !closing ? (
            <div className="flex flex-wrap gap-2">
              {result && result.route !== "none" ? (
                <button type="button" onClick={() => close("cita")} className="rounded-full bg-lime-300 px-4 py-2 text-sm font-semibold text-black hover:bg-lime-200">
                  {en ? "Book a visit" : "Agendar visita"}
                </button>
              ) : null}
              <button type="button" onClick={() => close("whatsapp")} className="rounded-full border border-white/20 px-4 py-2 text-sm text-gray-100 hover:border-lime-300">
                {result?.route === "none" ? (en ? "Have someone call me" : "Que me llamen") : en ? "Continue on WhatsApp" : "Seguir por WhatsApp"}
              </button>
            </div>
          ) : (
            <button type="button" onClick={restart} className="rounded-full border border-white/20 px-4 py-2 text-sm text-gray-100 hover:border-lime-300">
              {en ? "Try another profile" : "Probar otro perfil"}
            </button>
          )}
        </div>
      </div>

      {/* Lo que ve el equipo */}
      <div className="space-y-4">
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-300/80">{en ? "What the salesperson receives" : "Lo que recibe el asesor"}</p>
          <dl className="mt-4 space-y-2.5 text-sm">
            <div className="flex justify-between gap-3"><dt className="text-gray-400">{en ? "Source" : "Origen"}</dt><dd className="text-right text-gray-100">utm_source=demo · utm_campaign=portafolio</dd></div>
            <div className="flex justify-between gap-3">
              <dt className="text-gray-400">{en ? "Car" : "Auto"}</dt>
              <dd className="text-right text-gray-100">
                {answers.carro ? (en ? CARS_EN[answers.carro] : CARS.find((c) => c.id === answers.carro)?.name) : answers.intent === "prestan" ? (en ? "Suggested by budget" : "Sugerido por presupuesto") : "—"}
              </dd>
            </div>
            <div className="flex justify-between gap-3"><dt className="text-gray-400">{en ? "Answered steps" : "Pasos respondidos"}</dt><dd className="text-right text-gray-100">{answeredSteps.length}</dd></div>
            <div className="flex justify-between gap-3">
              <dt className="text-gray-400">{en ? "Route" : "Camino"}</dt>
              <dd className="text-right text-gray-100">{result ? (result.route === "none" ? (en ? "Does not qualify today" : "Hoy no califica") : routeLabel(result.route)) : en ? "In progress" : "En curso"}</dd>
            </div>
            <div>
              <dt className="text-gray-400">{en ? "Internal notes" : "Marcas internas"}</dt>
              <dd className="mt-1 flex flex-wrap gap-1.5">
                {(result?.flags.length ? result.flags : [en ? "None yet" : "Ninguna todavía"]).map((f) => (
                  <span key={f} className="rounded-full border border-white/15 px-2 py-0.5 text-xs text-gray-200">{f}</span>
                ))}
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-xs leading-5 text-gray-500">
            {en
              ? "Internal notes are never shown to the customer. The real system re-evaluates the case on the server before saving it."
              : "Las marcas internas nunca se muestran a la persona. El sistema real reevalúa el caso en el servidor antes de guardarlo."}
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-300/80">{en ? "Funnel events" : "Eventos del embudo"}</p>
          <ol className="mt-3 max-h-56 space-y-1 overflow-y-auto font-mono text-xs text-gray-300">
            {events.map((e, i) => (
              <li key={i}>
                <span className="text-lime-200">{e.name}</span>
                {e.detail ? <span className="text-gray-500"> · {e.detail}</span> : null}
              </li>
            ))}
          </ol>
          <p className="mt-3 text-xs leading-5 text-gray-500">
            {en
              ? "Each question is logged when asked, so the last one recorded shows where someone left. What people type is never stored. Try “Start over” halfway through."
              : "Cada pregunta se registra al hacerla: la última registrada indica dónde se quedó la persona. Nunca se guarda lo escrito. Prueba “Empezar de nuevo” a mitad del recorrido."}
          </p>
        </div>
      </div>
    </div>
  );
}
