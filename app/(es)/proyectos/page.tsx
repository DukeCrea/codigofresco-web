import { ArchiveBody } from "../../components/portfolio/pages";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Archivo de proyectos: clientes, productos y experimentos",
  description:
    "Archivo navegable del trabajo de Antonio Duque: proyectos con clientes, productos propios, herramientas y experimentos, cada uno con su rol, tecnología y estado documentado.",
  path: "/proyectos",
});

export default function Page() {
  return <ArchiveBody lang="es" />;
}
