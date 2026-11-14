import { ContactBody } from "../../components/portfolio/pages";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Contacto: empleo o proyectos",
  description:
    "Dos caminos para hablar con Antonio Duque: empresas que buscan contratarlo para un rol remoto y clientes con un proyecto de marketing, CRM, automatización o integración.",
  path: "/contacto",
});

export default function Page() {
  return <ContactBody lang="es" />;
}
