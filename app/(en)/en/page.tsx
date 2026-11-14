import { HomePageBody } from "../../components/portfolio/pages";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Antonio Duque: Strategy and Sales Systems",
  description:
    "Portfolio of Antonio Duque, creator of ZoDesk: marketing strategy, CRM, automation and integrations connecting lead generation, sales and operations.",
  path: "/en",
  lang: "en",
  esPath: "/",
});

export default function Page() {
  return <HomePageBody lang="en" />;
}
