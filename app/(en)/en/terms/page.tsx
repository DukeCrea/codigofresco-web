import { LegalPage } from "../../../legal-page";
import { buildMetadata } from "../../../lib/seo";
import { siteConfig } from "../../../lib/site";

export const metadata = buildMetadata({
  title: "Terms of use",
  description: "General conditions for using the CodigoFresco website and the information published on it.",
  path: "/en/terms",
  lang: "en",
  esPath: "/terminos",
  index: false,
});

export default function EnglishTermsPage() {
  return (
    <LegalPage
      lang="en"
      title="Terms of use"
      intro="These conditions govern access to the CodigoFresco informational site. Each project is additionally governed by its own proposal or contract."
    >
      <section><h2>Site content</h2><p className="mt-4">The information describes capabilities, processes and indicative ranges. It is not a binding offer. Scope, price, schedule and responsibilities are confirmed in writing for each project.</p></section>
      <section><h2>Permitted use</h2><p className="mt-4">You may read and share links to the content. You may not attempt to compromise the site, access the private dashboard without authorization, automate abusive requests, or reuse text, identity or materials in a misleading way.</p></section>
      <section><h2>Intellectual property</h2><p className="mt-4">The CodigoFresco identity, text and original materials are protected. Third-party trademarks and technologies belong to their respective owners.</p></section>
      <section><h2>Availability and links</h2><p className="mt-4">We aim to keep information accurate and the site available, but interruptions can happen through maintenance or providers. External links are offered as references and do not imply control over those sites.</p></section>
      <section><h2>Contact</h2><p className="mt-4">For questions about these terms, write to <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</p></section>
    </LegalPage>
  );
}
