import { HomePageBody } from "../../components/portfolio/pages";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Código Fresco: Web Development, Automation, AI and CRM",
  description:
    "Fresh code, ideas that work: websites, automation, AI assistants, CRM and integrations. The studio of Antonio Duque, creator of ZoDesk.",
  path: "/en",
  lang: "en",
  esPath: "/",
});

export default function Page() {
  return <HomePageBody lang="en" />;
}
