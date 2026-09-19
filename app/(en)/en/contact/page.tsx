import { LeadIntakeSection } from "../../../lead-intake-section";
import { Breadcrumbs, MarketingHeader, SiteFooter } from "../../../marketing-layout";
import { getPages } from "../../../lib/i18n/pages";
import { breadcrumbJsonLd, buildMetadata, serializeJsonLd } from "../../../lib/seo";
import { siteConfig } from "../../../lib/site";

const t = getPages("en");

export const metadata = buildMetadata({
  title: "Contact and Project Assessment",
  description:
    "Tell us what you need to build, automate or improve. CodigoFresco prepares an initial assessment for growing companies.",
  path: "/en/contact",
  lang: "en",
  esPath: "/contacto",
});

export default function EnglishContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "ContactPage", name: "Contact CodigoFresco", url: `${siteConfig.url}/en/contact`, inLanguage: "en" },
      breadcrumbJsonLd([
        { name: t.breadcrumbHome, path: "/en" },
        { name: "Contact", path: "/en/contact" },
      ]),
    ],
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <MarketingHeader lang="en" />
      <main>
        <header className="border-b border-gray-900 bg-gray-950 px-6 py-14 md:px-8">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs
              lang="en"
              items={[
                { label: t.breadcrumbHome, href: "/en" },
                { label: "Contact", href: "/en/contact" },
              ]}
            />
            <h1 className="text-4xl font-bold md:text-5xl">An initial assessment for your project</h1>
            <p className="mt-5 text-lg leading-8 text-gray-300">
              Pick the kind of need and leave the essential context. Your request reaches us as a new
              opportunity so we can answer with a concrete path.
            </p>
          </div>
        </header>
        <LeadIntakeSection lang="en" />
      </main>
      <SiteFooter lang="en" />
    </div>
  );
}
