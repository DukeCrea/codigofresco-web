import { Archivo, Instrument_Serif } from "next/font/google";

/**
 * Tipografías del portafolio.
 *
 * Instrument Serif para titulares editoriales y Archivo para lectura. Se
 * cargan con next/font: quedan autoalojadas en el mismo dominio, en woff2 y
 * con subconjunto latino, sin peticiones a Google desde el navegador.
 */
export const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument",
});

export const sans = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

export const fontVariables = `${serif.variable} ${sans.variable}`;
