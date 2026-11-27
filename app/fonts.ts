import { Sora } from "next/font/google";

/**
 * Tipografía de titulares de la marca (brandbook: Sora).
 * `next/font` la aloja en el propio dominio: no hay peticiones a Google y la
 * política `font-src 'self'` se cumple. El cuerpo sigue en la fuente del sistema.
 */
export const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});
