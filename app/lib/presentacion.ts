/**
 * Presentación comercial en línea (/presentacion y /presentacion/venezuela).
 *
 * Es la misma historia del PDF que se envía a prospectos, en una página que se
 * comparte por enlace y se mide lámina por lámina. No se indexa: los precios
 * son de referencia y cambian por mercado.
 */

export type Mercado = {
  id: "panama" | "venezuela";
  path: string;
  etiqueta: string;
  precios: { web: string; google: string; plataforma: string; chatbot: string; campanas: string };
  notaPago: string;
  /** Formato numérico del mercado. */
  n: { cpm: string; cpc: string; paginas: string; clics: string; conversaciones: string; btu: string };
};

export const mercados: Record<Mercado["id"], Mercado> = {
  // Plataforma y campañas son tarifas reales; web, Google y chatbot duplican Venezuela.
  panama: {
    id: "panama",
    path: "/presentacion",
    etiqueta: "Presentación comercial",
    precios: {
      web: "Desde USD 700",
      google: "USD 150 a 200",
      plataforma: "Desde USD 3,000",
      chatbot: "USD 500 a 700 al mes",
      campanas: "Desde USD 300 al mes",
    },
    notaPago: "",
    n: { cpm: "USD 0.32", cpc: "USD 0.07", paginas: "2,283", clics: "4,646", conversaciones: "5,000", btu: "12,000" },
  },
  // Precios indicados por Antonio el 27 de noviembre de 2026.
  venezuela: {
    id: "venezuela",
    path: "/presentacion/venezuela",
    etiqueta: "Presentación comercial · Venezuela",
    precios: {
      web: "Desde USD 350",
      google: "USD 70 a 100",
      plataforma: "USD 1.500 a 1.800",
      chatbot: "USD 250 a 350 al mes",
      campanas: "Desde USD 250 al mes",
    },
    notaPago: "Se puede pagar en bolívares, dólares u otra divisa. ",
    n: { cpm: "USD 0,32", cpc: "USD 0,07", paginas: "2.283", clics: "4.646", conversaciones: "5.000", btu: "12.000" },
  },
};

/** Etapas de la historia; cada lámina pertenece a una. */
export const etapas = ["Entender", "Diagnóstico", "Solución", "Resultados", "Inversión", "Siguiente paso"] as const;
