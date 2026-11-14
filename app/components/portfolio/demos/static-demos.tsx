import type { Locale } from "../../../lib/i18n/config";
import type { PieceStatus } from "../../../lib/portfolio/types";
import { StatusBadge } from "../blocks";

type L = { es: string; en: string };
const pick = (text: L, lang: Locale) => text[lang];

function DemoFrame({ lang, label, children, tone = "fictitious" }: { lang: Locale; label?: string; children: React.ReactNode; tone?: "fictitious" | "diagram" }) {
  const badge =
    tone === "fictitious"
      ? lang === "en" ? "Anonymized example · fictitious figures" : "Ejemplo anonimizado · cifras ficticias"
      : lang === "en" ? "Diagram" : "Diagrama";
  return (
    <div className="rounded-3xl border border-white/10 bg-[#0e100c] p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
        {label ? <p className="font-semibold text-white">{label}</p> : <span />}
        <p className="rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-0.5 text-xs font-semibold text-amber-200">{badge}</p>
      </div>
      {children}
    </div>
  );
}

/* ---------- F: reporte por correo ---------- */

export function ReportDemo({ lang }: { lang: Locale }) {
  const en = lang === "en";
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <DemoFrame lang={lang} label={en ? "Weekly ad spend for leadership" : "Gasto de pauta semanal para dirección"}>
        <div className="overflow-hidden rounded-2xl bg-[#f5f4ee] text-[#1d211b] shadow-inner">
          <div className="border-b border-black/10 px-5 py-3 text-xs text-black/60">
            <p><strong className="text-black/80">{en ? "Subject:" : "Asunto:"}</strong> {en ? "Ad spend this week: buying vs selling cars" : "Pauta de la semana: compra vs venta de autos"}</p>
            <p>{en ? "Monday, 7:00 a.m. · calculated live" : "Lunes, 7:00 a. m. · calculado en vivo"}</p>
          </div>
          <div className="space-y-4 px-5 py-5 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white p-3"><p className="text-xs text-black/50">{en ? "To buy cars" : "Para comprar autos"}</p><p className="text-2xl font-bold">$X.XXX</p><p className="text-xs text-black/50">{en ? "N people wrote" : "N personas escribieron"}</p></div>
              <div className="rounded-xl bg-white p-3"><p className="text-xs text-black/50">{en ? "To sell cars" : "Para vender autos"}</p><p className="text-2xl font-bold">$X.XXX</p><p className="text-xs text-black/50">{en ? "N people wrote" : "N personas escribieron"}</p></div>
            </div>
            <p className="leading-6">
              {en
                ? "Leads are counted from forms actually received on the website, not from the ad platform's figure."
                : "Los leads se cuentan por formularios realmente recibidos en la web, no por la cifra de la plataforma de anuncios."}
            </p>
            <p className="rounded-xl border border-black/10 bg-white px-3 py-2 text-xs text-black/60">
              {en ? "Sources: Meta · TikTok · Google Ads · website forms. Data up to yesterday." : "Fuentes: Meta · TikTok · Google Ads · formularios de la web. Datos hasta ayer."}
            </p>
          </div>
        </div>
      </DemoFrame>

      <DemoFrame lang={lang} label={en ? "Alert: cost per lead spiking" : "Alerta: costo por lead disparado"}>
        <div className="overflow-hidden rounded-2xl bg-[#f5f4ee] text-[#1d211b]">
          <div className="border-b border-black/10 px-5 py-3 text-xs text-black/60">
            <p><strong className="text-black/80">{en ? "Subject:" : "Asunto:"}</strong> {en ? "⚠️ Campaign A: cost per lead tripled" : "⚠️ Campaña A: el costo por lead se triplicó"}</p>
            <p>{en ? "Only sent when something is off" : "Solo se envía cuando algo no cuadra"}</p>
          </div>
          <div className="space-y-3 px-5 py-5 text-sm leading-6">
            <p>{en ? "Last 7 days: $XX per lead. Its own previous 30-day average: $X." : "Últimos 7 días: $XX por lead. Su propio promedio de los 30 días anteriores: $X."}</p>
            <p>{en ? "Rule: 3× its own average with a minimum weekly spend, or spend with zero leads." : "Regla: 3 veces su propio promedio con un gasto mínimo semanal, o gasto sin ningún lead."}</p>
            <p className="rounded-xl bg-white px-3 py-2 font-medium">
              {en ? "Next step: check the form and the ad before raising budget." : "Siguiente paso: revisar el formulario y el anuncio antes de subir presupuesto."}
            </p>
            <p className="text-xs text-black/50">
              {en ? "It rings once per campaign and week; if it is still broken next week, it rings again." : "Suena una vez por campaña y semana; si sigue roto la semana siguiente, vuelve a sonar."}
            </p>
          </div>
        </div>
      </DemoFrame>

      <div className="lg:col-span-2">
        <DemoFrame lang={lang} label={en ? "ZoDesk collections summary for the office" : "Resumen de cobranza de ZoDesk para la oficina"}>
          <div className="grid gap-4 text-sm md:grid-cols-[1fr_1.4fr]">
            <div className="rounded-2xl bg-white/[0.04] p-4">
              <p className="text-gray-400">{en ? "Customers who owe" : "Clientes que deben"}</p>
              <p className="font-display mt-1 text-4xl text-white">12 · $XX.XXX</p>
              <p className="mt-3 leading-6 text-gray-300">
                {en ? "7 validated customers received the reminder. 3 are pending review and 2 have no email." : "7 validados recibieron el recordatorio. Quedan 3 por revisar y 2 sin correo."}
              </p>
            </div>
            <ul className="divide-y divide-white/10 rounded-2xl border border-white/10">
              {[
                [en ? "Customer A · AB-1234 · validated" : "Cliente A · AB-1234 · validado", "$X.XXX"],
                [en ? "Customer B · pending review · no email" : "Cliente B · por revisar · sin correo", "$X.XXX"],
                [en ? "Customer C · validated · email bounced: call them" : "Cliente C · validado · el correo rebotó: hay que llamarlo", "$X.XXX"],
              ].map(([row, amount]) => (
                <li key={row} className="flex items-center justify-between gap-3 px-4 py-3 text-gray-200">
                  <span>{row}</span>
                  <span className="tabular-nums text-gray-400">{amount}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-xs leading-5 text-gray-500">
            {en
              ? "It lists who to review, who to call and whether the campaign is switched off. It does not include automatic recommendations or period comparisons."
              : "Indica a quién revisar, a quién llamar y si la campaña está apagada. No incluye recomendaciones automáticas ni comparativas entre periodos."}
          </p>
        </DemoFrame>
      </div>
    </div>
  );
}

/* ---------- G: SAINT ---------- */

export function SaintDiagram({ lang }: { lang: Locale }) {
  const en = lang === "en";
  const lanes: Array<{ title: L; from: L; to: L; status: PieceStatus }> = [
    { title: { es: "Lectura del ERP", en: "ERP reads" }, from: { es: "SAINT · SQL Server", en: "SAINT · SQL Server" }, to: { es: "Agente Go (solo SELECT)", en: "Go agent (SELECT only)" }, status: "production" },
    { title: { es: "Publicación del catálogo", en: "Catalog publishing" }, from: { es: "Agente Go", en: "Go agent" }, to: { es: "Precio y stock por tienda", en: "Price and stock per store" }, status: "production" },
    { title: { es: "Recepción de pedidos", en: "Order intake" }, from: { es: "Tienda web", en: "Web store" }, to: { es: "Cola de pedidos del agente", en: "Agent order queue" }, status: "tested" },
    { title: { es: "Escritura de descargos", en: "Inventory postings" }, from: { es: "Agente Go", en: "Go agent" }, to: { es: "SAINT (requiere autorización)", en: "SAINT (needs authorization)" }, status: "pending" },
  ];
  return (
    <DemoFrame lang={lang} tone="diagram" label={en ? "Four flows, four different states" : "Cuatro flujos, cuatro estados distintos"}>
      <div className="mb-5 grid gap-3 text-center text-xs sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 p-3"><p className="font-semibold text-white">{en ? "Client site (Windows)" : "Sede del cliente (Windows)"}</p><p className="mt-1 text-gray-400">SAINT + SQL Server · {en ? "Go agent as a service" : "agente Go como servicio"} · {en ? "SQLite queue" : "cola SQLite"}</p></div>
        <div className="flex items-center justify-center rounded-2xl border border-dashed border-lime-300/40 p-3 text-lime-200">
          {en ? "Outbound HTTPS only →" : "Solo HTTPS saliente →"}
          <br />
          {en ? "token per site · retries" : "token por sede · reintentos"}
        </div>
        <div className="rounded-2xl border border-white/10 p-3"><p className="font-semibold text-white">{en ? "Web platform" : "Plataforma web"}</p><p className="mt-1 text-gray-400">Laravel · {en ? "importer" : "importador"} · {en ? "agents panel" : "panel de agentes"} · {en ? "alerts" : "alertas"}</p></div>
      </div>
      <ul className="space-y-2">
        {lanes.map((lane, i) => (
          <li key={lane.title.es} className="grid gap-2 rounded-2xl border border-white/10 bg-black/20 p-4 sm:grid-cols-[2rem_minmax(0,1fr)_minmax(0,1.4fr)_auto] sm:items-center">
            <span className="font-display text-2xl text-lime-300" aria-hidden="true">{i + 1}</span>
            <span className="font-semibold text-white">{pick(lane.title, lang)}</span>
            <span className="text-sm text-gray-400">{pick(lane.from, lang)} → {pick(lane.to, lang)}</span>
            <StatusBadge status={lane.status} lang={lang} />
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs leading-5 text-gray-500">
        {en
          ? "Panama: US dollars, its own price list and warehouse. Venezuela: bolívars, its own list and warehouse. The web never connects into the client's network."
          : "Panamá: dólares, con su propia lista de precio y depósito. Venezuela: bolívares, con su lista y su depósito. La web nunca entra a la red del cliente."}
      </p>
    </DemoFrame>
  );
}

/* ---------- H: embudo ZoDesk ---------- */

type Kind = "core" | "integration" | "other";
export function FunnelMap({ lang }: { lang: Locale }) {
  const en = lang === "en";
  const kindLabel: Record<Kind, L> = {
    core: { es: "Núcleo ZoDesk", en: "ZoDesk core" },
    integration: { es: "Integración", en: "Integration" },
    other: { es: "Otro proyecto", en: "Other project" },
  };
  const kindTone: Record<Kind, string> = {
    core: "border-lime-300/50 text-lime-200",
    integration: "border-sky-300/40 text-sky-200",
    other: "border-white/20 text-gray-300",
  };
  const stages: Array<{ stage: L; pieces: Array<{ name: L; kind: Kind; status: PieceStatus }> }> = [
    { stage: { es: "Captación", en: "Acquisition" }, pieces: [
      { name: { es: "Web y campañas del concesionario", en: "Dealership website and campaigns" }, kind: "other", status: "production" },
      { name: { es: "Formularios a la bandeja (aviso firmado)", en: "Forms into the inbox (signed notice)" }, kind: "integration", status: "production" },
      { name: { es: "Publicador de inventario (Freedom)", en: "Inventory publisher (Freedom)" }, kind: "other", status: "production" },
    ] },
    { stage: { es: "Cualificación", en: "Qualification" }, pieces: [
      { name: { es: "Chat de financiamiento", en: "Financing chat" }, kind: "core", status: "production" },
      { name: { es: "ZoChat para WhatsApp", en: "ZoChat for WhatsApp" }, kind: "core", status: "progress" },
    ] },
    { stage: { es: "CRM, asignación y seguimiento", en: "CRM, assignment and follow-up" }, pieces: [
      { name: { es: "Bandeja, reparto, avisos y tareas", en: "Inbox, assignment, alerts and tasks" }, kind: "core", status: "production" },
      { name: { es: "Zoho CRM (consulta heredada)", en: "Zoho CRM (legacy lookup)" }, kind: "integration", status: "connected" },
    ] },
    { stage: { es: "Cotizaciones y documentos", en: "Quotes and documents" }, pieces: [
      { name: { es: "Contratos con Google Docs y Drive", en: "Contracts with Google Docs and Drive" }, kind: "core", status: "production" },
      { name: { es: "Casos de crédito", en: "Credit cases" }, kind: "core", status: "production" },
    ] },
    { stage: { es: "Ventas y cobros", en: "Sales and collections" }, pieces: [
      { name: { es: "Emisión de venta y despublicación del auto", en: "Sale issuance and car unpublishing" }, kind: "core", status: "production" },
      { name: { es: "Campaña de cobro por correo", en: "Email collections campaign" }, kind: "core", status: "tested" },
    ] },
    { stage: { es: "Operación", en: "Operations" }, pieces: [
      { name: { es: "Compras, trámites, gastos y caja", en: "Purchases, paperwork, expenses and cash" }, kind: "core", status: "production" },
      { name: { es: "Variante para talleres", en: "Workshop variant" }, kind: "core", status: "built" },
    ] },
    { stage: { es: "Medición y aprendizaje", en: "Measurement and learning" }, pieces: [
      { name: { es: "Embudos y recorrido del lead", en: "Funnels and lead journey" }, kind: "core", status: "tested" },
      { name: { es: "Conversiones a Google (vía la web)", en: "Conversions to Google (via the website)" }, kind: "integration", status: "connected" },
      { name: { es: "Conversiones a Meta", en: "Conversions to Meta" }, kind: "integration", status: "pending" },
    ] },
  ];
  return (
    <DemoFrame lang={lang} tone="diagram" label={en ? "What belongs to ZoDesk, what is integrated and what is another project" : "Qué es de ZoDesk, qué es integración y qué es otro proyecto"}>
      <ol className="space-y-3">
        {stages.map((s, i) => (
          <li key={s.stage.es} className="grid gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 md:grid-cols-[13rem_minmax(0,1fr)]">
            <p className="font-semibold text-white"><span className="mr-2 font-display text-xl text-lime-300" aria-hidden="true">{i + 1}</span>{pick(s.stage, lang)}</p>
            <ul className="space-y-2">
              {s.pieces.map((p) => (
                <li key={p.name.es} className="flex flex-wrap items-center gap-2 text-sm text-gray-200">
                  <span className="mr-auto">{pick(p.name, lang)}</span>
                  <span className={`rounded-full border px-2 py-0.5 text-xs ${kindTone[p.kind]}`}>{pick(kindLabel[p.kind], lang)}</span>
                  <StatusBadge status={p.status} lang={lang} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </DemoFrame>
  );
}

/* ---------- D: ciclo de contenido ---------- */

export function ContentLoop({ lang }: { lang: Locale }) {
  const en = lang === "en";
  const rows: Array<{ item: L; kind: "hypothesis" | "test" | "result" }> = [
    { item: { es: "Los reels rinden más que las fotos para este catálogo.", en: "Reels perform better than photos for this catalog." }, kind: "hypothesis" },
    { item: { es: "Los guardados indican intención de compra por modelo.", en: "Saves signal purchase intent per model." }, kind: "hypothesis" },
    { item: { es: "Abrir el video con la letra quincenal retiene mejor que el precio.", en: "Opening a video with the biweekly payment holds attention better than the price." }, kind: "hypothesis" },
    { item: { es: "Pagar resaltado en un portal ayuda a mover inventario (comparación observacional mensual).", en: "Paying for portal highlighting helps move inventory (monthly observational comparison)." }, kind: "test" },
    { item: { es: "El financiamiento domina las preguntas de los clientes por WhatsApp.", en: "Financing dominates customers' WhatsApp questions." }, kind: "result" },
  ];
  const label: Record<(typeof rows)[number]["kind"], L> = {
    hypothesis: { es: "Hipótesis", en: "Hypothesis" },
    test: { es: "Prueba en curso", en: "Test in progress" },
    result: { es: "Hallazgo verificado", en: "Verified finding" },
  };
  const tone = {
    hypothesis: "border-fuchsia-300/40 text-fuchsia-200",
    test: "border-amber-300/40 text-amber-200",
    result: "border-lime-300/50 text-lime-200",
  };
  return (
    <DemoFrame lang={lang} tone="diagram" label={en ? "Hypothesis, test and result are not the same thing" : "Hipótesis, prueba y resultado no son lo mismo"}>
      <ul className="space-y-2">
        {rows.map((r) => (
          <li key={r.item.es} className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-black/20 p-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-gray-200">{pick(r.item, lang)}</span>
            <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${tone[r.kind]}`}>{pick(label[r.kind], lang)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs leading-5 text-gray-500">
        {en
          ? "The verified finding comes from a month of anonymized conversations. None of these items is a controlled A/B test."
          : "El hallazgo verificado proviene de un mes de conversaciones anonimizadas. Ninguno de estos puntos es un A/B test controlado."}
      </p>
    </DemoFrame>
  );
}

/* ---------- A: tres capas ---------- */

export function InventoryLayers({ lang }: { lang: Locale }) {
  const en = lang === "en";
  const layers: Array<{ title: L; body: L; status: PieceStatus }> = [
    {
      title: { es: "Marketing dinámico", en: "Dynamic marketing" },
      body: { es: "El catálogo y los feeds reflejan el inventario: entran los autos disponibles y salen los vendidos.", en: "Catalog and feeds mirror inventory: available cars go in and sold cars come out." },
      status: "production",
    },
    {
      title: { es: "Contenido desde el inventario", en: "Inventory-generated content" },
      body: { es: "Piezas por vehículo: artes con UTM por auto, descripciones e ideas de video para asesores.", en: "Per-vehicle pieces: creatives with UTMs per car, descriptions and video ideas for salespeople." },
      status: "production",
    },
    {
      title: { es: "Remarketing dinámico", en: "Dynamic remarketing" },
      body: { es: "Mostrar a cada persona el auto que vio. Requiere que el evento y el catálogo usen el mismo identificador.", en: "Show each person the car they viewed. It needs the event and the catalog to share the same ID." },
      status: "pending",
    },
  ];
  return (
    <DemoFrame lang={lang} tone="diagram" label={en ? "Three layers that are often confused" : "Tres capas que suelen confundirse"}>
      <ul className="grid gap-3 md:grid-cols-3">
        {layers.map((l) => (
          <li key={l.title.es} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="font-display text-2xl text-white">{pick(l.title, lang)}</p>
            <p className="flex-1 text-sm leading-6 text-gray-300">{pick(l.body, lang)}</p>
            <StatusBadge status={l.status} lang={lang} />
          </li>
        ))}
      </ul>
    </DemoFrame>
  );
}

/* ---------- C: segmentos de correo ---------- */

export function EmailSegments({ lang }: { lang: Locale }) {
  const en = lang === "en";
  const families: Array<{ title: L; items: L[] }> = [
    {
      title: { es: "Seguimiento comercial", en: "Sales follow-up" },
      items: [
        { es: "Cotizó hace 3 a 10 días, no compró y su auto sigue disponible.", en: "Requested a quote 3–10 days ago, didn't buy, car still available." },
        { es: "Ofreció su carro hace 5 a 14 días y no se le compró.", en: "Offered their car 5–14 days ago and wasn't bought from." },
        { es: "Preaprobado en los últimos 60 días y no compró.", en: "Pre-approved in the last 60 days and didn't buy." },
      ],
    },
    {
      title: { es: "Cobro segmentado", en: "Segmented collections" },
      items: [
        { es: "Solo casos validados por una persona.", en: "Only cases validated by a person." },
        { es: "Antigüedad de la deuda: 0–30, 31–90 o más de 90 días.", en: "Debt age: 0–30, 31–90 or 90+ days." },
        { es: "Promesa de pago vencida o sin correo (pasa a llamada).", en: "Broken payment promise or no email (moves to a call)." },
      ],
    },
    {
      title: { es: "Frenos de seguridad", en: "Safety brakes" },
      items: [
        { es: "Simulacro por defecto y muestras de prueba.", en: "Dry run by default and test samples." },
        { es: "Nunca dos correos a la misma dirección en 30 días.", en: "Never two emails to the same address within 30 days." },
        { es: "Rebote o queja: no se vuelve a escribir.", en: "Bounce or complaint: never written to again." },
      ],
    },
  ];
  return (
    <DemoFrame lang={lang} tone="diagram" label={en ? "Segments and brakes defined in code" : "Segmentos y frenos definidos en el código"}>
      <div className="grid gap-3 md:grid-cols-3">
        {families.map((f) => (
          <div key={f.title.es} className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="font-semibold text-white">{pick(f.title, lang)}</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-gray-300">
              {f.items.map((i) => (
                <li key={i.es} className="flex gap-2"><span aria-hidden="true" className="text-lime-300">·</span>{pick(i, lang)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </DemoFrame>
  );
}
