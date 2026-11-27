import type { Metadata } from "next";

import { Deck } from "../../components/presentacion/deck";
import { mercados } from "../../lib/presentacion";

const title = "Código Fresco | Presentación comercial";
const description = "Página web, CRM y ERP a medida, chatbots de WhatsApp, campañas y automatización: qué hacemos, casos reales, precios y tiempos.";

// Enlace para compartir con prospectos: no se indexa ni aparece en el sitemap.
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  alternates: { canonical: "/presentacion" },
  openGraph: { title, description, url: "/presentacion", siteName: "Código Fresco", locale: "es_PA", type: "website", images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Código Fresco: ideas frescas que funcionan" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
};

export default function Page() {
  return <Deck mercado={mercados.panama} />;
}
