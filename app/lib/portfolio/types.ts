/**
 * Modelo de contenido del portafolio.
 *
 * Cada caso se escribe dos veces (español e inglés) con la misma `id`; la id
 * es la que une los dos idiomas para el hreflang y el selector de idioma.
 *
 * El estado se declara pieza por pieza y no por caso: un mismo sistema puede
 * tener la lectura en producción y la escritura pendiente de autorización, y
 * el portafolio no debe redondear eso a "terminado".
 */

export type CaseId =
  | "marketing-dinamico"
  | "chatform"
  | "correo"
  | "contenido"
  | "paneles"
  | "reportes"
  | "saint"
  | "zodesk";

/** Filtros visibles del índice de casos y del archivo. */
export type Discipline = "marketing" | "crm" | "automation" | "product" | "operations";

/**
 * Estado verificable de una pieza.
 * - production: funcionando con datos reales según documentación del proyecto.
 * - connected: integrada con otro sistema, sin confirmación de uso sostenido.
 * - tested: construida y con pruebas automatizadas.
 * - built: construida, sin pruebas ni despliegue confirmados.
 * - progress: en desarrollo.
 * - pending: diseñada o parcialmente construida, pendiente de configuración,
 *   validación o autorización.
 * - proposal: documentada como propuesta o hipótesis; no construida.
 */
export type PieceStatus = "production" | "connected" | "tested" | "built" | "progress" | "pending" | "proposal";

export type StatusRow = { piece: string; status: PieceStatus; note: string };
export type FlowStep = { title: string; detail: string };
export type Tool = { name: string; role: string };

/** Demostraciones interactivas o maquetas que acompañan a algunos casos. */
export type DemoKind = "chatform" | "report" | "panel" | "saint" | "funnel" | "content-loop" | "inventory" | "email";

export type PortfolioCase = {
  id: CaseId;
  slug: string;
  /** Letra del encargo, solo como orden editorial. */
  order: number;
  disciplines: Discipline[];
  /** Título corto para tarjetas. */
  title: string;
  /** Cliente o ámbito, descrito sin datos privados. */
  context: string;
  /** Línea de una frase para tarjetas y portada. */
  hook: string;
  metaTitle: string;
  metaDescription: string;
  /** Titular editorial del caso. */
  headline: string;
  lead: string;
  summary: string;
  updatedAt: string;
  need: string[];
  responsibility: string[];
  strategy: string[];
  built: string[];
  flow: FlowStep[];
  tools: Tool[];
  evidence: string[];
  status: StatusRow[];
  next: string[];
  learnings: string[];
  collaboration?: string;
  /** Matices que el lector debe conocer para no sobreinterpretar el caso. */
  caveats?: string[];
  demo?: DemoKind;
  image?: { src: string; alt: string; caption: string; width: number; height: number };
  /** Slugs de servicio (en el idioma del caso) relacionados. */
  services: string[];
  related: CaseId[];
  /** Fecha de la última revisión editorial contra el código y la documentación. */
  reviewed: string;
};

export type ArchiveGroup = "client" | "product" | "tool" | "lab";

export type ArchiveProject = {
  id: string;
  name: string;
  group: ArchiveGroup;
  disciplines: Discipline[];
  summary: string;
  role: string;
  stack: string;
  status: string;
  /** Caso del portafolio donde se profundiza, si existe. */
  caseId?: CaseId;
  /** Enlace público verificable (sitio publicado o repositorio público). */
  url?: string;
  visibility: "public" | "private";
};
