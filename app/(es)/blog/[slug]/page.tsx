import { pageDates } from "../../../lib/content-dates";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { ArticleVideo } from "../../../components/blog/article-video";
import { Crumbs, PortfolioShell } from "../../../components/portfolio/chrome";
import { blogPosts, fechaLarga, getBlogPost } from "../../../lib/blog";
import type { BlogBlock } from "../../../lib/blog";
import { breadcrumbJsonLd, buildMetadata, organizationId, personId } from "../../../lib/seo";
import { getWhatsAppUrl, siteConfig } from "../../../lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost((await params).slug);
  if (!post) return { title: "Artículo no encontrado", robots: { index: false, follow: false } };
  const path = `/blog/${post.slug}`;
  const base = buildMetadata({ title: post.metaTitle, description: post.description, path });
  return {
    ...base,
    authors: [{ name: post.author, url: `${siteConfig.url}/nosotros` }],
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: pageDates(path).modified,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: post.shareImage.src, width: post.shareImage.width, height: post.shareImage.height, alt: post.shareImage.alt }],
      ...(post.video
        ? { videos: [{ url: post.video.src, type: "video/mp4", width: post.video.width, height: post.video.height }] }
        : {}),
    },
    twitter: { ...base.twitter, images: [post.shareImage.src] },
  };
}

/** `**texto**` en negrita; el resto, tal cual. */
function conNegritas(texto: string): ReactNode[] {
  return texto.split(/(\*\*[^*]+\*\*)/g).map((parte, i) =>
    parte.startsWith("**") && parte.endsWith("**") ? (
      <strong key={i} className="font-semibold text-white">{parte.slice(2, -2)}</strong>
    ) : (
      parte
    ),
  );
}

function Bloque({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="font-display mt-14 text-3xl leading-tight text-white">{block.text}</h2>;
    case "p":
      return <p className="mt-5 text-lg leading-8 text-gray-300">{conNegritas(block.text)}</p>;
    case "list":
      return (
        <ul className="mt-6 space-y-3">
          {block.items.map((item) => (
            <li key={item.text} className="flex gap-3 text-lg leading-8 text-gray-300">
              <span aria-hidden="true" className="mt-3 h-2 w-2 shrink-0 rounded-full bg-lime-400" />
              <span>
                {item.label ? <strong className="font-semibold text-white">{item.label}: </strong> : null}
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      );
    case "flow":
      return (
        <ol className="mt-6 flex flex-wrap items-center gap-2" aria-label="Recorrido de la oportunidad">
          {block.steps.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              <span className="rounded-full border border-lime-400/35 bg-[#0e100c] px-3.5 py-1.5 text-sm font-semibold text-lime-400">
                {step}
              </span>
              {i < block.steps.length - 1 ? <span aria-hidden="true" className="text-gray-500">→</span> : null}
            </li>
          ))}
        </ol>
      );
    case "video":
      return (
        <div className="mt-8">
          <ArticleVideo video={block.video} title={block.video.description} />
        </div>
      );
    case "note":
      return (
        <p className="mt-6 rounded-xl border border-[#E6BD72]/30 bg-[#E6BD72]/[0.07] p-5 leading-7 text-gray-300">
          {block.text}
        </p>
      );
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = getBlogPost((await params).slug);
  if (!post) notFound();
  const path = `/blog/${post.slug}`;
  const url = `${siteConfig.url}${path}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#articulo`,
        headline: post.title,
        description: post.description,
        datePublished: post.publishedAt,
        dateModified: pageDates(path).modified,
        inLanguage: "es",
        url,
        mainEntityOfPage: url,
        image: [`${siteConfig.url}${post.shareImage.src}`, `${siteConfig.url}${post.cover.src}`],
        keywords: post.tags.join(", "),
        author: { "@type": "Person", "@id": personId, name: post.author, url: `${siteConfig.url}/nosotros` },
        publisher: { "@id": organizationId },
        isPartOf: { "@id": `${siteConfig.url}/blog#blog` },
        ...(post.video
          ? {
              video: {
                "@type": "VideoObject",
                name: post.title,
                description: post.video.description,
                thumbnailUrl: `${siteConfig.url}${post.video.poster}`,
                contentUrl: `${siteConfig.url}${post.video.src}`,
                uploadDate: post.publishedAt,
                duration: `PT${post.video.durationSeconds}S`,
                width: post.video.width,
                height: post.video.height,
              },
            }
          : {}),
      },
      breadcrumbJsonLd([
        { name: "Inicio", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: post.title, path },
      ]),
    ],
  };

  return (
    <PortfolioShell lang="es" alternateHref={null} jsonLd={jsonLd}>
      <article>
        <header className="border-b border-white/10 px-4 pb-12 pt-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Crumbs
              lang="es"
              items={[
                { label: "Inicio", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.title, href: path },
              ]}
            />
            <p className="mt-10 text-sm font-semibold uppercase tracking-[0.18em] text-lime-400">Blog · {post.readingTime} de lectura</p>
            <h1 className="font-display mt-3 text-5xl leading-[1.02] text-white sm:text-6xl">{post.title}</h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">{post.excerpt}</p>
            <p className="mt-6 text-sm text-gray-400">
              Por{" "}
              <Link href="/nosotros" className="text-gray-200 underline decoration-white/30 underline-offset-4 hover:text-white">
                {post.author}
              </Link>{" "}
              · <time dateTime={post.publishedAt}>{fechaLarga(post.publishedAt)}</time>
            </p>
          </div>
        </header>

        {post.video ? (
          <section className="border-b border-white/10 bg-[#0e100c]/40 px-4 py-12 sm:px-6 lg:px-8" aria-label="Video">
            <ArticleVideo video={post.video} title={post.title} />
            {post.disclaimer ? (
              <p className="mx-auto mt-6 max-w-4xl text-sm leading-6 text-lime-400/90">{post.disclaimer}</p>
            ) : null}
          </section>
        ) : null}

        <div className="mx-auto max-w-3xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
          {post.body.map((block, i) => (
            <Bloque key={i} block={block} />
          ))}
        </div>
      </article>

      <section className="border-t border-white/10 px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="hablemos">
        <div className="mx-auto max-w-3xl rounded-2xl border border-lime-400/30 bg-[#0e100c] p-8 sm:p-10">
          <h2 id="hablemos" className="font-display text-3xl leading-tight text-white">{post.cta.title}</h2>
          <p className="mt-4 text-lg leading-8 text-gray-300">{post.cta.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contacto#proyecto"
              className="rounded-full bg-lime-400 px-6 py-3 font-semibold text-black transition hover:bg-lime-400/85"
            >
              Contarme tu proyecto
            </Link>
            <a
              href={getWhatsAppUrl(`Hola Antonio, leí «${post.title}» y quiero conversar sobre un proyecto de marketing, CRM o automatización.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 px-6 py-3 text-white transition hover:border-lime-400"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-3xl text-sm">
          <Link href="/blog" className="text-gray-300 underline decoration-white/30 underline-offset-4 hover:text-white">
            ← Volver al blog
          </Link>
        </p>
      </section>
    </PortfolioShell>
  );
}
