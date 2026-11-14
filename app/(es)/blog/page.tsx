import Image from "next/image";
import Link from "next/link";

import { Crumbs, PortfolioShell } from "../../components/portfolio/chrome";
import { fechaLarga, getBlogPosts } from "../../lib/blog";
import { breadcrumbJsonLd, buildMetadata, organizationId, personId } from "../../lib/seo";
import { siteConfig } from "../../lib/site";

export const metadata = buildMetadata({
  title: "Blog: estrategias, herramientas y soluciones",
  description:
    "Artículos de Antonio Duque sobre las estrategias, herramientas y soluciones que va creando para conectar marketing, CRM, automatización y ventas.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getBlogPosts();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${siteConfig.url}/blog#blog`,
        name: "Blog de Código Fresco",
        url: `${siteConfig.url}/blog`,
        inLanguage: "es",
        description: "Estrategias, herramientas y soluciones para conectar marketing, CRM, automatización y ventas.",
        author: { "@id": personId },
        publisher: { "@id": organizationId },
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          url: `${siteConfig.url}/blog/${post.slug}`,
          datePublished: post.publishedAt,
        })),
      },
      breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Blog", path: "/blog" }]),
    ],
  };

  return (
    <PortfolioShell lang="es" alternateHref={null} jsonLd={jsonLd}>
      <section className="border-b border-white/10 px-4 pb-14 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Crumbs lang="es" items={[{ label: "Inicio", href: "/" }, { label: "Blog", href: "/blog" }]} />
          <p className="mt-10 text-sm font-semibold uppercase tracking-[0.18em] text-[#C9ED87]">Blog</p>
          <h1 className="font-display mt-3 max-w-4xl text-5xl leading-[1.02] text-white sm:text-6xl">
            Lo que voy creando, contado desde adentro
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            Estrategias, herramientas y soluciones para conectar marketing, CRM, automatización y ventas. Con sus límites a la vista.
          </p>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8" aria-label="Artículos">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0c0d0b] transition hover:border-[#C9ED87]/50"
            >
              <div className="aspect-[4/5] overflow-hidden bg-[#071E17]">
                <Image
                  src={post.cover.src}
                  alt={post.cover.alt}
                  width={post.cover.width}
                  height={post.cover.height}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm text-gray-400">
                  <time dateTime={post.publishedAt}>{fechaLarga(post.publishedAt)}</time> · {post.readingTime} de lectura
                </p>
                <h2 className="font-display mt-3 text-2xl leading-tight text-white">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="after:absolute after:inset-0 focus-visible:outline-none group-focus-within:underline"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 leading-7 text-gray-300">{post.excerpt}</p>
                <p className="mt-5 text-sm font-semibold text-[#C9ED87]">Leer artículo →</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-14 max-w-7xl text-sm text-gray-400">
          ¿Buscas guías con criterios para elegir y medir?{" "}
          <Link href="/recursos" className="text-gray-200 underline decoration-white/30 underline-offset-4 hover:text-white">
            Míralas en Recursos
          </Link>
          .
        </p>
      </section>
    </PortfolioShell>
  );
}
