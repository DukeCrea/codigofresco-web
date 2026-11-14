import { AboutBody } from "../../../components/portfolio/pages";
import { buildMetadata } from "../../../lib/seo";

export const metadata = buildMetadata({
  title: "About Antonio Duque",
  description:
    "Antonio Duque has worked in marketing and sales processes since 2016 and created ZoDesk. He connects strategy, CRM, automation and operations. Native Spanish, B1 English, remote work.",
  path: "/en/about",
  lang: "en",
  esPath: "/nosotros",
});

export default function Page() {
  return <AboutBody lang="en" />;
}
