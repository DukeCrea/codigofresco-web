import { ImageResponse } from "next/og";
import { getContent } from "../../lib/i18n";
import type { Locale } from "../../lib/i18n/config";
import { getCaseBySlug } from "../../lib/portfolio";

export function caseImage(lang: Locale, slug: string) {
  const item = getCaseBySlug(lang, slug);
  const legacy = getContent(lang).caseStudies.find((entry) => entry.slug === slug);
  if (!item && !legacy) return new Response(null, { status: 404 });
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", background: "#050505", color: "#a3e635", padding: "64px", fontFamily: "sans-serif", fontWeight: 700 }}>
      <div style={{ display: "flex", fontSize: 30 }}>CÓDIGO FRESCO · ANTONIO DUQUE</div>
      <div style={{ display: "flex", fontSize: 70, lineHeight: 1.08, maxWidth: 1050 }}>{item?.title ?? legacy!.client}</div>
      <div style={{ display: "flex", fontSize: 24, color: "#ffffff" }}>{lang === "es" ? "Caso documentado · codigofresco.com" : "Documented case · codigofresco.com"}</div>
    </div>,
    { width: 1200, height: 630 },
  );
}
