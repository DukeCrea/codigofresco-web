import { ImageResponse } from "next/og";
export const alt = "Antonio Duque para Empact — Paid Media y el sistema que lo sostiene";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "60px", background: "#050505", color: "#f1f0e8", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}><span>código fresco.</span><span style={{ color: "#a3e635" }}>ANTONIO DUQUE × EMPACT</span></div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 78, fontWeight: 700, letterSpacing: "-4px", lineHeight: 1.08 }}><span>Paid Media.</span><span>Y el sistema</span><span style={{ color: "#a3e635" }}>que lo sostiene.</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #262922", paddingTop: 25, fontSize: 23 }}><span>Creatividad · Medición · CRM</span><span>Un caso real. Una forma de trabajar.</span></div>
    </div>, size,
  );
}
