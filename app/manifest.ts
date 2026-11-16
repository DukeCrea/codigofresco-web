import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Código Fresco · Antonio Duque",
    short_name: "Código Fresco",
    description: "Portafolio de Antonio Duque: marketing, CRM, automatización e integraciones.",
    lang: "es",
    start_url: "/",
    display: "browser",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [
      { src: "/favicon.ico", sizes: "32x32 48x48", type: "image/x-icon" },
      { src: "/logo-codigofresco.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
