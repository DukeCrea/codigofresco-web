import type { Locale } from "../i18n/config";
import type { CaseId } from "./types";

/**
 * Capturas reales de los proyectos.
 * - "demo": la app real (ZoDesk) corriendo en su modo demo local, con un
 *   concesionario inventado; ningún dato es de un cliente.
 * - "live": página pública en producción, capturada el 14 de noviembre de 2026
 *   sin enviar formularios ni crear datos.
 */
export type CaseShot = {
  src: string;
  width: number;
  height: number;
  source: "demo" | "live";
  alt: Record<Locale, string>;
  caption: Record<Locale, string>;
};

const dir = "/portafolio/capturas";

const shots: Partial<Record<CaseId, CaseShot[]>> = {
  "marketing-dinamico": [
    {
      src: `${dir}/zodesk-autos-en-la-web.jpg`,
      width: 1440,
      height: 900,
      source: "demo",
      alt: {
        es: "Módulo Autos en la web de ZoDesk con quince autos ficticios publicados, su precio y botones para bajar o editar.",
        en: "ZoDesk's Cars on the website module with fifteen fictitious cars published, their price and buttons to unpublish or edit.",
      },
      caption: {
        es: "«Autos en la web» en ZoDesk: lo que se publica aquí es lo que alimenta la web y los catálogos.",
        en: "“Cars on the website” in ZoDesk: what gets published here feeds the website and the catalogs.",
      },
    },
  ],
  chatform: [
    {
      src: `${dir}/chatform-champion-movil.jpg`,
      width: 390,
      height: 844,
      source: "live",
      alt: {
        es: "Pantalla inicial del asesor de financiamiento en móvil: saludo, botón para hablar y atajos como Financiar un carro.",
        en: "Mobile start screen of the financing advisor: greeting, talk button and shortcuts such as Finance a car.",
      },
      caption: {
        es: "El asesor publicado en la web del concesionario, en móvil. Captura sin iniciar conversación.",
        en: "The advisor live on the dealership website, on mobile. Captured without starting a conversation.",
      },
    },
  ],
  correo: [
    {
      src: `${dir}/zodesk-cobros-correo.jpg`,
      width: 1440,
      height: 830,
      source: "demo",
      alt: {
        es: "Pantalla de cobros automáticos de ZoDesk: recordatorio por correo apagado, contadores por estado y tabla de clientes ficticios por revisar.",
        en: "ZoDesk automatic collections screen: email reminder turned off, counters by status and a table of fictitious customers to review.",
      },
      caption: {
        es: "Campaña de cobro por correo: solo reciben recordatorio los casos que alguien validó antes.",
        en: "Email collections campaign: only cases someone validated first get a reminder.",
      },
    },
  ],
  paneles: [
    {
      src: `${dir}/zodesk-panel.jpg`,
      width: 1440,
      height: 900,
      source: "demo",
      alt: {
        es: "Panel de métricas de ZoDesk con tarjetas de tareas, leads, ventas, cuentas por cobrar, trámites y gastos.",
        en: "ZoDesk metrics panel with cards for tasks, leads, sales, receivables, paperwork and expenses.",
      },
      caption: {
        es: "Panel de ZoDesk: cada tarjeta lleva al detalle que explica la cifra.",
        en: "ZoDesk panel: each card opens the detail behind the number.",
      },
    },
  ],
  saint: [
    {
      src: `${dir}/camsmark-producto-stock.jpg`,
      width: 1440,
      height: 900,
      source: "live",
      alt: {
        es: "Ficha de producto en la tienda de Camsmark Panamá con precio en dólares y la indicación En stock con dieciséis disponibles.",
        en: "Product page in the Camsmark Panama store with a price in dollars and an In stock label showing sixteen available.",
      },
      caption: {
        es: "Tienda de Panamá: el precio y las existencias de la ficha vienen de la lectura de SAINT.",
        en: "Panama store: the price and stock on the page come from the SAINT read.",
      },
    },
  ],
  zodesk: [
    {
      src: `${dir}/zodesk-flujos-zochat.jpg`,
      width: 1440,
      height: 660,
      source: "demo",
      alt: {
        es: "Pantalla de flujos de ZoChat con WhatsApp, Instagram y Facebook Messenger, cada uno con su menú y su estado de conexión.",
        en: "ZoChat flows screen with WhatsApp, Instagram and Facebook Messenger, each with its menu and connection status.",
      },
      caption: {
        es: "Flujos de ZoChat: qué responde el asistente en cada canal y a quién pasa la conversación.",
        en: "ZoChat flows: what the assistant answers on each channel and who takes over the conversation.",
      },
    },
    {
      src: `${dir}/zodesk-automatizaciones.jpg`,
      width: 780,
      height: 900,
      source: "demo",
      alt: {
        es: "Pantalla de automatizaciones de ZoDesk: reglas que crean tareas cuando se emite una venta o cambia un trámite.",
        en: "ZoDesk automations screen: rules that create tasks when a sale is issued or paperwork changes status.",
      },
      caption: {
        es: "Automatizaciones: cuando pasa algo en el sistema, se crea sola la tarea para la persona correcta.",
        en: "Automations: when something happens in the system, the task is created for the right person.",
      },
    },
  ],
};

export function getCaseShots(id: CaseId): CaseShot[] {
  return shots[id] ?? [];
}
