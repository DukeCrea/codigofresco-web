import { HomePageBody } from "../../components/portfolio/pages";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Antonio Duque: Strategy and Sales Systems",
  description:
    "Portfolio of Antonio Duque, creator of ZoDesk: marketing strategy, CRM, automation and integrations that connect lead generation, sales and operations. Cases with their real status.",
  path: "/en",
  lang: "en",
  esPath: "/",
});

export default function Page() {
  return <HomePageBody lang="en" />;
}
