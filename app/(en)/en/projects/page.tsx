import { ArchiveBody } from "../../../components/portfolio/pages";
import { buildMetadata } from "../../../lib/seo";

export const metadata = buildMetadata({
  title: "Project Archive: Clients, Products and Experiments",
  description:
    "A browsable archive of Antonio Duque's work: client projects, own products, tools and experiments, each with role, technology and documented status.",
  path: "/en/projects",
  lang: "en",
  esPath: "/proyectos",
});

export default function Page() {
  return <ArchiveBody lang="en" />;
}
