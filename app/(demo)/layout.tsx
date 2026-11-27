import { sora } from "../fonts";
import type { Metadata, Viewport } from "next";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://codigofresco.com"),
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#10120e",
  width: "device-width",
  initialScale: 1,
};

// Las demostraciones no cargan medición ni scripts de plataformas publicitarias.
export default function DemoLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${sora.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
