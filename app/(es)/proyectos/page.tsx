import { ArchiveBody } from "../../components/portfolio/pages";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Archivo de proyectos: clientes, productos y experimentos",
  description:
    "Archivo del trabajo de Antonio Duque: proyectos con clientes, productos propios, herramientas y experimentos, con su rol y estado documentado.",
  path: "/proyectos",
});

export default function Page() {
  return <ArchiveBody lang="es" />;
}
