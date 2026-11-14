import { CasesIndexBody } from "../../../components/portfolio/pages";
import { buildMetadata } from "../../../lib/seo";

export const metadata = buildMetadata({
  title: "Work: Marketing, CRM, Automation and Integrations",
  description:
    "Eight case studies by Antonio Duque with verified status: dynamic marketing, a financing chatform, segmented email, data-driven content, dashboards, reports, SAINT ERP integration and ZoDesk.",
  path: "/en/cases",
  lang: "en",
  esPath: "/casos",
});

export default function Page() {
  return <CasesIndexBody lang="en" />;
}
