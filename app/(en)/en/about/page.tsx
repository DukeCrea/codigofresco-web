import { Breadcrumbs, MarketingHeader, SiteFooter, SystemVisual } from "../../../marketing-layout";
import { enTeam } from "../../../lib/i18n/en/content";
import { getPages } from "../../../lib/i18n/pages";
import { breadcrumbJsonLd, buildMetadata, organizationId, serializeJsonLd } from "../../../lib/seo";
import { siteConfig } from "../../../lib/site";

const t = getPages("en");

export const metadata = buildMetadata({
  title: "About: Our Team and How We Work",
  description:
    "Meet the founders of CodigoFresco and how we combine development, automation, data and marketing into systems that keep working.",
  path: "/en/about",
  lang: "en",
  esPath: "/nosotros",
});

const founders = enTeam.filter((member) => member.initials);

const principles: Array<[string, string]> = [
  ["Decisions you can question", "Every platform, integration and priority has to answer a real operational or commercial need."],
  ["Deliveries you can verify", "We work in stages you can review before the scope grows."],
  ["Continuity", "We document, measure and stay available so the system does not stall after launch."],
];

export default function EnglishAboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...founders.map((member) => ({
        "@type": "Person",
        "@id": `${siteConfig.url}/nosotros#${member.name.toLowerCase().replace(/\s+/g, "-")}`,
        name: member.name,
        jobTitle: member.role,
        worksFor: { "@id": organizationId },
      })),
      breadcrumbJsonLd([
        { name: t.breadcrumbHome, path: "/en" },
        { name: "About", path: "/en/about" },
      ]),
    ],
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <MarketingHeader lang="en" />
      <main>
        <section className="border-b border-gray-900 bg-gray-950 px-6 py-16 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <Breadcrumbs
                lang="en"
                items={[
                  { label: t.breadcrumbHome, href: "/en" },
                  { label: "About", href: "/en/about" },
                ]}
              />
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-lime-300">The CodigoFresco team</p>
              <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
                Technology with hands-on direction and technical accountability
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                The founders take part in the assessment and the direction of every project. We add
                specialists as the challenge requires and document decisions so the solution can be
                maintained and extended by whoever comes next.
              </p>
            </div>
            <SystemVisual lang="en" labels={["Assessment", "Architecture", "Implementation", "Support"]} />
          </div>
        </section>

        <section className="px-6 py-20 md:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold">Founders</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {founders.map((member) => (
                <article
                  id={member.name.toLowerCase().replace(/\s+/g, "-")}
                  key={member.name}
                  className="rounded-lg border border-gray-800 bg-gray-950 p-7"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-lime-400 text-lg font-bold text-gray-950">
                    {member.initials}
                  </div>
                  <h3 className="mt-5 text-2xl font-bold">{member.name}</h3>
                  <p className="mt-2 text-lime-300">{member.role}</p>
                  <p className="mt-4 leading-7 text-gray-300">
                    Leads solution direction and coordinates the team each implementation needs.
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-gray-900 bg-gray-950 px-6 py-20 md:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
            {principles.map(([title, body]) => (
              <div key={title} className="rounded-lg border border-gray-800 bg-black p-6">
                <h2 className="text-xl font-bold text-lime-300">{title}</h2>
                <p className="mt-4 leading-7 text-gray-300">{body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter lang="en" />
    </div>
  );
}
