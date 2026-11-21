import { ImageResponse } from "next/og";

export const alt = "Freedom + Ads para Camsmark Panamá — Código Fresco";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", background: "#10120e", color: "#f7f8f2", padding: "64px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26 }}><span>código fresco.</span><span style={{ color: "#a3e635" }}>DEMO PARA RICARDO</span></div>
      <div style={{ display: "flex", flexDirection: "column" }}><span style={{ fontSize: 92, fontWeight: 700, color: "#a3e635", letterSpacing: "-5px" }}>Freedom + Ads</span><span style={{ fontSize: 64, letterSpacing: "-2px" }}>Camsmark Panamá</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 23 }}><span>Tu catálogo, convertido en publicaciones y campañas.</span><span>Así funciona</span></div>
      <span style={{ fontSize: 18, color: "#b5b8ac" }}>Demo ilustrativa · Publicaciones y métricas de ejemplo</span>
    </div>,
    size,
  );
}
