import { personId } from "./seo";
import { siteConfig } from "./site";

export const zodeskId = `${siteConfig.url}/#zodesk`;

export function zodeskJsonLd() {
  return {
    "@type": "SoftwareApplication",
    "@id": zodeskId,
    name: "ZoDesk",
    applicationCategory: "BusinessApplication",
    creator: { "@id": personId },
    url: `${siteConfig.url}/casos/zodesk-ecosistema-full-funnel`,
    description: "Plataforma creada por Antonio Duque para conectar captación, CRM, contratos, ventas y operación de concesionarios, con una variante para talleres. El estado de cada módulo está documentado en el caso.",
  };
}
