import Image from "next/image";

import { etapas, type Mercado } from "../../lib/presentacion";
import { Mascot } from "../brand/mascot";
import { PixelArrow } from "../brand/pixels";
import { DeckProgress } from "./deck-progress";

const WA_NUMBER = "50763006579";

function Icono({ n, size = 24 }: { n: string; size?: number }) {
  return (
    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-white/10 bg-white">
      {/* eslint-disable-next-line @next/next/no-img-element -- SVG diminuto y local: no gana nada con el optimizador */}
      <img src={`/presentacion/iconos/${n}.svg`} alt="" width={size} height={size} loading="lazy" />
    </span>
  );
}

function Lamina({
  id,
  etapa,
  eyebrow,
  title,
  lead,
  children,
  fin,
  alt = false,
}: {
  id: string;
  etapa: number;
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  children: React.ReactNode;
  fin?: boolean;
  alt?: boolean;
}) {
  return (
    <section
      id={id}
      data-lamina={id}
      data-etapa={etapa}
      data-fin={fin ? "1" : undefined}
      data-track-section={`presentacion-${id}`}
      aria-labelledby={`${id}-titulo`}
      className={`scroll-mt-20 border-t border-white/10 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 ${alt ? "bg-[#0a0b09]" : ""}`}
    >
      <div className="mx-auto max-w-6xl">
        <p className="cf-eyebrow">{`// ${eyebrow}`}</p>
        <h2 id={`${id}-titulo`} className="font-display mt-2 max-w-3xl text-3xl leading-[1.08] text-white sm:text-5xl">
          {title}
        </h2>
        {lead ? <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-400">{lead}</p> : null}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 leading-7 text-gray-300">
      <span aria-hidden="true" className="mt-2 h-2.5 w-2.5 flex-none bg-lime-400" />
      <span>{children}</span>
    </li>
  );
}

const semanas: Array<[string, string, number, number]> = [
  ["Diagnóstico", "Procesos, datos y prioridades", 1, 1],
  ["Página web y Google", "Sitio publicado e indexado", 1, 2],
  ["Campañas y contenido", "Meta, Google y TikTok, activas desde la semana 2", 2, 9],
  ["Chatbot de WhatsApp", "Panel y ficha del cliente", 2, 2],
  ["ERP: clientes y órdenes", "Primer módulo en uso", 2, 3],
  ["ERP: cobros recurrentes", "Cuotas y recordatorios", 5, 2],
  ["ERP: gastos e inventario", "Compras y existencias", 7, 2],
  ["Capacitación y puesta en marcha", "Datos migrados, equipo listo", 9, 2],
];

export function Deck({ mercado }: { mercado: Mercado }) {
  const { precios, n } = mercado;
  const wa = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hola Código Fresco, vi su presentación y quiero conversar sobre un proyecto.")}`;

  const tabla: Array<[string, string, string, string]> = [
    ["Página web en WordPress", "Diseño personalizable, editable por usted", precios.web, "1 a 2 semanas"],
    ["Indexación en Google", "Search Console, mapa del sitio y SEO técnico", precios.google, "2 a 3 días"],
    ["Tienda o plataforma a medida", "Base de datos, panel administrativo e inventario", precios.plataforma, "4 a 6 semanas"],
    ["Chatbot de WhatsApp con IA", `Panel, ficha del cliente y hasta ${n.conversaciones} conversaciones al mes`, precios.chatbot, "1 a 2 semanas"],
    ["Campañas y publicación automática", "Meta, Google y TikTok; la pauta se paga aparte", precios.campanas, "Activas en 1 semana"],
    ["CRM o ERP a medida", "Por módulos, según el diagnóstico", "Por cotización", "6 a 10 semanas"],
    ["Bot de Telegram o aplicación web", "Según el alcance", "Por cotización", "2 a 4 semanas"],
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#ededed]">
      <DeckProgress etapas={etapas} mercado={mercado.id} />
      <main id="contenido">
        {/* Portada */}
        <section data-lamina="portada" data-etapa={0} data-track-section="presentacion-portada" className="relative overflow-hidden px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
          <div aria-hidden="true" className="cf-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_75%_30%,black_10%,transparent_65%)]" />
          <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center">
            <div>
              <p className="cf-eyebrow">{`> ${mercado.etiqueta.toLowerCase()}`}</p>
              <h1 className="font-display mt-4 text-[2.6rem] leading-[1] text-white sm:text-6xl lg:text-7xl">
                Primero entendemos su negocio. Después lo <em className="text-lime-400">digitalizamos</em>.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-gray-300">
                Página web, CRM y ERP a medida, chatbots de WhatsApp, campañas y automatización en un solo equipo.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#entender" className="cf-btn">
                  Ver la presentación
                  <PixelArrow />
                </a>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="cf-btn-ghost">
                  Escribir por WhatsApp
                </a>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[17rem] sm:max-w-sm">
              <Mascot variant="chicle" animated preload sizes="(min-width: 640px) 24rem, 17rem" className="w-full" />
            </div>
          </div>
        </section>

        <Lamina id="entender" etapa={0} eyebrow="el punto de partida" title="¿Le suena familiar?" lead="Así se ve una empresa de servicios que creció más rápido que sus herramientas." alt>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Cuotas que nadie cobró", "Los pagos recurrentes dependen de la memoria de una persona."],
              ["WhatsApp sin responder", "El cliente escribe de noche y en la mañana ya contrató a otro."],
              ["Inventario y gastos en Excel", "Nadie sabe cuánto dejó realmente cada instalación."],
              ["Publicidad a ciegas", "Se invierte en anuncios sin saber cuál trae clientes."],
            ].map(([t, b], i) => (
              <li key={t} className="cf-card p-6">
                <span className="font-display text-4xl text-lime-400" aria-hidden="true">{`0${i + 1}`}</span>
                <p className="font-display mt-4 text-xl text-white">{t}</p>
                <p className="mt-2 leading-7 text-gray-400">{b}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-2xl text-lg text-gray-300">Cada uno de estos problemas tiene una solución que ya construimos para otra empresa.</p>
        </Lamina>

        <Lamina id="diagnostico" etapa={1} eyebrow="diagnóstico" title="¿Qué tan digitalizada está su empresa?" lead="Antes de proponer nada, ubicamos en qué nivel está hoy y cuál es el siguiente paso que más rinde.">
          <div className="grid gap-8">
            <ol className="grid grid-cols-2 items-end gap-3 sm:grid-cols-4">
              {[
                ["Manual", "Papel, Excel y chats sueltos.", "sm:h-36"],
                ["Presente", "Web, redes y Google al día.", "sm:h-48"],
                ["Conectada", "Clientes, cobros e inventario en un sistema.", "sm:h-60"],
                ["Automatizada", "Chatbots, cobros y reportes que trabajan solos.", "sm:h-72"],
              ].map(([t, b, h], i) => (
                <li key={t} className={`flex min-w-0 flex-col justify-end rounded-2xl border p-4 ${h} ${i === 3 ? "border-lime-400 bg-lime-400 text-black" : "border-white/10 bg-[#0c0d0b]"}`}>
                  <span className={`font-mono text-xs ${i === 3 ? "text-black" : "text-lime-400"}`}>{`NIVEL ${i + 1}`}</span>
                  <span className={`font-display mt-1 text-lg sm:text-base md:text-xl ${i === 3 ? "text-black" : "text-white"}`}>{t}</span>
                  <span className={`mt-1 text-sm leading-5 ${i === 3 ? "text-black/80" : "text-gray-400"}`}>{b}</span>
                </li>
              ))}
            </ol>
            <div className="cf-card p-6">
              <p className="font-display text-xl text-white">En el diagnóstico revisamos</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                <Check>Cómo llegan y cómo se atienden sus clientes</Check>
                <Check>Cómo cobra, compra y controla gastos</Check>
                <Check>Qué herramientas usa hoy su equipo</Check>
                <Check>Qué conviene automatizar primero</Check>
              </ul>
              <p className="mt-4 text-gray-200"><strong>Resultado:</strong> un plan por etapas con alcance, tiempo e inversión por escrito.</p>
            </div>
          </div>
        </Lamina>

        <Lamina id="solucion" etapa={2} eyebrow="la solución" title="Un paquete completo, armado a su medida" alt>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [["wordpress"], "Página web", "Corporativa, editable y lista para Google."],
              [["laravel", "postgresql"], "Tienda o plataforma a medida", "Base de datos y panel administrativo propios."],
              [["zoho"], "CRM y ERP", "Clientes, cobros, gastos e inventario."],
              [["whatsapp", "instagram"], "Chatbot con IA", "Responde, califica y entrega al vendedor."],
              [["meta", "googleads", "tiktok"], "Campañas publicitarias", "Meta, Google y TikTok con medición."],
              [["instagram", "facebook", "threads"], "Contenido y redes", "Creación de contenido y publicación automática."],
              [["telegram"], "Bots de Telegram", "Consultas, pedidos y avisos al equipo."],
              [["google", "googlesearchconsole"], "Google y aplicaciones web", "Indexación, SEO y web apps a medida."],
            ].map(([icons, t, b]) => (
              <li key={t as string} className="cf-card p-5">
                <span className="flex gap-2">{(icons as string[]).map((n) => <Icono key={n} n={n} />)}</span>
                <p className="font-display mt-4 text-lg text-white">{t as string}</p>
                <p className="mt-1 leading-6 text-gray-400">{b as string}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-gray-500">También trabajamos con Cloudflare, Klaviyo, Stripe, WooCommerce, Google Analytics, Next.js y ZoDesk.</p>
        </Lamina>

        <Lamina id="erp" etapa={2} eyebrow="crm y erp a medida" title="Su operación completa en un solo sistema" lead="Para una empresa que instala y mantiene aires acondicionados: de la solicitud al cobro mensual, sin hojas de cálculo.">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <ul className="space-y-3">
                <Check><strong className="text-white">Clientes y contratos:</strong> equipos instalados y vencimientos.</Check>
                <Check><strong className="text-white">Órdenes de trabajo:</strong> cotización, agenda y técnico asignado.</Check>
                <Check><strong className="text-white">Cobros recurrentes:</strong> cuotas, recordatorios y cartera.</Check>
                <Check><strong className="text-white">Gastos e inventario:</strong> compras, caja menuda y existencias.</Check>
                <Check><strong className="text-white">Panel gerencial:</strong> ventas, cobros y pendientes del día.</Check>
              </ul>
              <ol className="mt-8 grid grid-cols-3 gap-2 text-sm font-semibold xl:grid-cols-6">
                {["Solicitud", "Cotización", "Orden", "Ejecución", "Cobro", "Control"].map((s, i) => (
                  <li key={s} className="min-w-0 rounded-lg border border-white/10 bg-[#0c0d0b] px-2 py-2 text-gray-200">
                    <span className="block font-mono text-[10px] text-lime-400">{`0${i + 1}`}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
            <figure>
              <Image src="/presentacion/zodesk-panel.webp" alt="Panel de gestión con ventas, cuentas por cobrar, gastos y caja menuda" width={1200} height={750} sizes="(min-width: 1024px) 34rem, 92vw" className="h-auto w-full rounded-2xl border border-white/10" />
              <figcaption className="mt-2 text-sm text-gray-500">Panel de ZoDesk, nuestro sistema de gestión en producción. La pantalla muestra una empresa ficticia.</figcaption>
            </figure>
          </div>
        </Lamina>

        <Lamina id="chatbot" etapa={2} eyebrow="chatbot de whatsapp con ia" title="Responde al instante y entrega clientes listos" alt>
          <div className="grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-center">
            <div>
              <ul className="space-y-3">
                <Check><strong className="text-white">Panel administrativo</strong> con la ficha de cada cliente.</Check>
                <Check><strong className="text-white">Conectado a su sistema:</strong> servicios, precios y disponibilidad reales.</Check>
                <Check><strong className="text-white">Califica</strong> cada conversación antes de pasarla al vendedor.</Check>
                <Check><strong className="text-white">Hasta {n.conversaciones} conversaciones al mes</strong>, con la inteligencia artificial incluida.</Check>
              </ul>
              <dl className="cf-card mt-8 grid max-w-md grid-cols-[auto_1fr] gap-x-5 gap-y-1.5 p-5 text-sm">
                <dt className="col-span-2 mb-1 font-mono text-xs text-gray-500">FICHA EN EL PANEL</dt>
                <dt className="text-gray-500">Servicio</dt><dd className="font-semibold text-white">Instalación split {n.btu} BTU</dd>
                <dt className="text-gray-500">Zona</dt><dd className="font-semibold text-white">Costa del Este</dd>
                <dt className="text-gray-500">Cita</dt><dd className="font-semibold text-white">Jueves, 9:00 a. m.</dd>
                <dt className="text-gray-500">Estado</dt><dd><span className="rounded-full bg-lime-400 px-2.5 py-0.5 text-xs font-bold text-black">Listo para agendar</span></dd>
              </dl>
            </div>
            <figure className="mx-auto w-full max-w-xs">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#efe7dd]">
                <p className="flex items-center gap-3 bg-[#075E54] px-4 py-3 text-sm font-bold text-white">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-xs" aria-hidden="true">CT</span>
                  <span>Clima Total<span className="block text-xs font-normal opacity-80">Asistente virtual · en línea</span></span>
                </p>
                <ol className="flex flex-col gap-2 p-3 text-[13px] leading-5 text-[#111b21]">
                  {[
                    [true, `Hola, ¿cuánto cuesta instalar un split de ${n.btu} BTU?`],
                    [false, "¡Hola! La instalación básica cuesta USD 85 e incluye 3 metros de tubería. ¿En qué zona se encuentra?"],
                    [true, "En Costa del Este."],
                    [false, "Tenemos cupo el jueves a las 9:00 a. m. ¿Se la agendo?"],
                    [true, "Sí, por favor."],
                    [false, "Listo. Un asesor le confirma en la mañana."],
                  ].map(([mine, text], i) => (
                    <li key={i} className={`max-w-[85%] rounded-xl px-3 py-2 shadow-sm ${mine ? "self-end bg-[#d9fdd3]" : "self-start bg-white"}`}>{text as string}</li>
                  ))}
                </ol>
              </div>
              <figcaption className="mt-2 text-sm text-gray-500">Conversación de ejemplo con una empresa y precios ficticios.</figcaption>
            </figure>
          </div>
        </Lamina>

        <Lamina id="marketing" etapa={2} eyebrow="marketing completo" title="Campañas, contenido y redes que trabajan juntas">
          <ul className="grid gap-4 lg:grid-cols-3">
            {[
              [["meta", "googleads", "tiktok"], "Campañas en Meta, Google y TikTok", ["Estructura por objetivo y público", "Catálogo conectado al inventario", "Medición de WhatsApp y formularios"]],
              [["tiktok", "instagram"], "Creación de contenido", ["Guiones e ideas de video basados en métricas", "Edición para formato vertical", "Un video se convierte en textos listos para cada red"]],
              [["instagram", "facebook", "threads"], "Publicación automática", ["Publicaciones, carruseles e historias diarias", "Contenido generado desde el catálogo", "Hoy publica el inventario de Champion Motors"]],
            ].map(([icons, t, items]) => (
              <li key={t as string} className="cf-card p-6">
                <span className="flex gap-2">{(icons as string[]).map((x) => <Icono key={x} n={x} />)}</span>
                <p className="font-display mt-4 text-xl text-white">{t as string}</p>
                <ul className="mt-3 space-y-2">{(items as string[]).map((x) => <Check key={x}>{x}</Check>)}</ul>
              </li>
            ))}
          </ul>
        </Lamina>

        <Lamina id="proyectos" etapa={3} eyebrow="resultados" title="Cuatro proyectos en producción" alt>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["champion", "Champion Motors", "Concesionario de autos, Panamá.", ["Web con inventario y buscador", "Asistente de financiamiento", "Campañas en Meta, Google y TikTok", "Publicación automática en redes"]],
              ["camsmark", "Camsmark", "Herramientas industriales, Panamá y Venezuela.", ["Dos tiendas: en USD y en VES", "Panel administrativo propio", "Más de 900 páginas en Google", "Integración con ERP SAINT en curso"]],
              ["baretec", "BARETEC Panamá", "Comercio internacional.", ["Web corporativa en WordPress", "Español e inglés", "Editable por el cliente", "Correos corporativos"]],
              ["milimolo", "Mili & Molo", "Educación infantil bilingüe.", ["Tienda en WooCommerce", "Pagos con Stripe y PayPal", "Correo con Klaviyo y Brevo", "SEO propio, 100 sobre 100"]],
            ].map(([slug, name, desc, items]) => (
              <li key={slug as string}>
                <Image src={`/presentacion/${slug}.webp`} alt={`Sitio web de ${name}`} width={1200} height={617} sizes="(min-width: 1024px) 17rem, (min-width: 640px) 45vw, 92vw" className="h-auto w-full rounded-xl border border-white/10" />
                <p className="font-display mt-4 text-xl text-white">{name as string}</p>
                <p className="mt-1 text-sm text-gray-400">{desc as string}</p>
                <ul className="mt-3 space-y-1 text-sm">{(items as string[]).map((x) => <Check key={x}>{x}</Check>)}</ul>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-gray-500">Capturas de las páginas públicas, noviembre de 2026.</p>
        </Lamina>

        <Lamina id="numeros" etapa={3} eyebrow="resultados medidos" title="Los números de una operación real">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["tiktok", "TikTok Ads · Champion Motors", [["959 mil", "impresiones en 14 días, con 549 mil reproducciones de video"], [n.cpm, `por cada mil impresiones; ${n.clics} clics a ${n.cpc} cada uno`]]],
              ["googleads", "Google Ads · Champion Motors", [["361", "clics al botón de WhatsApp atribuidos a los anuncios en 7 días"], ["32", "conversaciones iniciadas, más 14 solicitudes de compra y venta de autos"]]],
              ["google", "Google · los 4 sitios", [["100 / 100", "en SEO técnico en 3 de los 4 sitios (el cuarto, 92)"], [n.paginas, "páginas declaradas a Google en los mapas del sitio; las 4 webs son rastreables"]]],
            ].map(([icon, label, stats]) => (
              <div key={label as string}>
                <p className="mb-3 flex items-center gap-3 text-sm font-semibold text-gray-200"><Icono n={icon as string} />{label as string}</p>
                <div className="space-y-3">
                  {(stats as string[][]).map(([big, text]) => (
                    <p key={big} className="rounded-2xl border border-white/10 border-t-4 border-t-lime-400 bg-[#0c0d0b] p-5">
                      <span className="font-display block text-4xl text-white sm:text-5xl">{big}</span>
                      <span className="mt-2 block leading-6 text-gray-400">{text}</span>
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-4xl text-sm leading-6 text-gray-500">
            Fuentes: TikTok Ads, del 13 al 26 de noviembre de 2026 (USD 311 de inversión). Google Ads, del 12 al 18 de noviembre de 2026; los clics a WhatsApp no equivalen a clientes atendidos. SEO: medición propia con Google Lighthouse en móvil, 27 de noviembre de 2026.
          </p>
        </Lamina>

        <Lamina id="inversion" etapa={4} eyebrow="inversión y tiempos" title="Precios claros desde el primer día" alt>
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {tabla.map(([name, detail, price, time]) => (
              <li key={name} className="grid gap-1 py-4 sm:grid-cols-[1.5fr_1fr_auto] sm:items-center sm:gap-6">
                <p>
                  <span className="block font-semibold text-white">{name}</span>
                  <span className="block text-sm text-gray-500">{detail}</span>
                </p>
                <p className="font-display text-xl text-lime-400">{price}</p>
                <p className="text-sm font-semibold text-gray-400 sm:w-40 sm:text-right">{time}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-3xl text-sm leading-6 text-gray-500">
            {mercado.notaPago}Valores de referencia. La complejidad del proyecto y las solicitudes adicionales se cotizan aparte y se confirman por escrito antes de empezar.
          </p>
        </Lamina>

        <Lamina id="cronograma" etapa={4} eyebrow="cronograma" title="El paquete completo, en diez semanas">
          <ol className="space-y-3">
            {semanas.map(([name, detail, start, span], i) => (
              <li key={name} className="grid gap-2 border-b border-white/10 pb-3 md:grid-cols-[17rem_1fr] md:items-center">
                <p>
                  <span className="block font-semibold text-white">{name}</span>
                  <span className="block text-sm text-gray-500">{detail}</span>
                  <span className="mt-0.5 block font-mono text-xs text-lime-400">{span === 1 ? `Semana ${start}` : `Semanas ${start} a ${start + span - 1}`}</span>
                </p>
                <div className="grid grid-cols-10 gap-1" role="img" aria-label={`Semanas ${start} a ${start + span - 1}`}>
                  <span
                    className={`h-5 rounded-md ${i % 2 ? "border border-white/15 bg-white/10" : "bg-lime-400"}`}
                    style={{ gridColumn: `${start} / span ${span}` }}
                  />
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-3xl text-sm leading-6 text-gray-500">Cronograma de referencia para una empresa de servicios. Se ajusta en el diagnóstico según los módulos y los datos que haya que migrar.</p>
        </Lamina>

        <Lamina id="contacto" etapa={5} fin eyebrow="siguiente paso" title={<>Empecemos por <em className="text-lime-400">entender su negocio</em></>} alt>
          <ol className="grid gap-4 md:grid-cols-3">
            {[
              ["Conversación inicial", "Nos cuenta cómo trabaja hoy y qué le quita más tiempo."],
              ["Diagnóstico y propuesta", "Plan por etapas con alcance, tiempo e inversión."],
              ["Primera entrega", "Algo funcionando en las primeras dos semanas."],
            ].map(([t, b], i) => (
              <li key={t} className="cf-card p-6">
                <span className="font-display text-4xl text-lime-400" aria-hidden="true">{`0${i + 1}`}</span>
                <p className="font-display mt-3 text-xl text-white">{t}</p>
                <p className="mt-2 leading-7 text-gray-400">{b}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 grid gap-6 rounded-3xl bg-lime-400 p-8 text-black md:grid-cols-[1fr_auto] md:items-center md:p-10">
            <div>
              <p className="font-display text-3xl sm:text-4xl">Conversemos por WhatsApp</p>
              <p className="mt-2 text-lg text-black/75">Coordinamos el diagnóstico en una llamada de 30 minutos.</p>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-3 rounded-xl bg-black px-6 py-3.5 text-lg font-bold text-white transition hover:-translate-y-0.5">
                Escribir al +507 6300-6579
                <PixelArrow className="text-lime-400" />
              </a>
              <p className="mt-4 text-sm text-black/70">codigofresco.com · hola@codigofresco.com</p>
            </div>
            <div className="mx-auto w-40 rounded-3xl bg-black p-2 md:w-48">
              <Mascot variant="icono" decorative sizes="12rem" className="w-full rounded-2xl" />
            </div>
          </div>
        </Lamina>
      </main>
    </div>
  );
}
