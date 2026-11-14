import { HomePageBody } from "../components/portfolio/pages";
import { buildMetadata } from "../lib/seo";

export const metadata = buildMetadata({
  title: "Antonio Duque: estrategias y sistemas comerciales",
  description:
    "Portafolio de Antonio Duque, creador de ZoDesk: estrategia de marketing, CRM, automatización e integraciones que conectan captación, ventas y operación. Casos con su estado real.",
  path: "/",
});

export default function Page() {
  return <HomePageBody lang="es" />;
}
