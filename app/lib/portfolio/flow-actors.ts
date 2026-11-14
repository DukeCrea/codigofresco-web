import type { CaseId } from "./types";

/** Quién actúa en cada paso del flujo. Sirve para ES y EN: los pasos van en el mismo orden. */
export type FlowActor = "person" | "system" | "team";

const P: FlowActor = "person";
const S: FlowActor = "system";
const T: FlowActor = "team";

export const flowActors: Record<CaseId, FlowActor[]> = {
  "marketing-dinamico": [T, S, P, P, T, S, T],
  chatform: [P, P, P, P, S, P, S],
  correo: [S, S, T, S, S, T],
  contenido: [S, T, T, T, T, T],
  paneles: [S, S, T, S, S, T],
  reportes: [S, S, S, S, S, S],
  saint: [S, S, S, S, S, S],
  zodesk: [P, S, S, T, T, T, S],
};
