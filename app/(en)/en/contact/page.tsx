import { ContactBody } from "../../../components/portfolio/pages";
import { buildMetadata } from "../../../lib/seo";

export const metadata = buildMetadata({
  title: "Contact: Roles or Projects",
  description:
    "Two ways to reach Antonio Duque: companies looking to hire him for a remote role, and clients with a marketing, CRM, automation or integration project.",
  path: "/en/contact",
  lang: "en",
  esPath: "/contacto",
});

export default function Page() {
  return <ContactBody lang="en" />;
}
