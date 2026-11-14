import { CasesIndexBody } from "../../components/portfolio/pages";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Casos: marketing, CRM, automatización e integraciones",
  description:
    "Ocho casos de Antonio Duque con estado verificado: marketing dinámico, chatform, correo, contenido, paneles, reportes, SAINT y ZoDesk.",
  path: "/casos",
});

export default function Page() {
  return <CasesIndexBody lang="es" />;
}
