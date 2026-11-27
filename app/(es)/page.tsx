import { HomePageBody } from "../components/portfolio/pages";
import { buildMetadata } from "../lib/seo";

export const metadata = buildMetadata({
  title: "Código Fresco: desarrollo web, automatización, IA y CRM",
  description:
    "Código fresco, ideas que funcionan: sitios web, automatización, inteligencia artificial, CRM e integraciones. El estudio de Antonio Duque, creador de ZoDesk.",
  path: "/",
});

export default function Page() {
  return <HomePageBody lang="es" />;
}
