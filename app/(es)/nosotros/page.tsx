import { AboutBody } from "../../components/portfolio/pages";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Sobre mí: Antonio Duque",
  description:
    "Antonio Duque trabaja en marketing y procesos comerciales desde 2016 y creó ZoDesk. Conecta estrategia, CRM, automatización y operación.",
  path: "/nosotros",
});

export default function Page() {
  return <AboutBody lang="es" />;
}
