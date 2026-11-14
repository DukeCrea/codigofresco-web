import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PortfolioCasePage, portfolioCaseMetadata } from "../../../../components/portfolio/case-page";
import { getCaseBySlug, getCases } from "../../../../lib/portfolio";
import { LegacyCase, legacyMetadata, legacySlugs } from "./legacy";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return [...getCases("en").map((c) => ({ slug: c.slug })), ...legacySlugs.map((slug) => ({ slug }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return portfolioCaseMetadata("en", slug) ?? legacyMetadata(slug);
}

export default async function EnglishCasePage({ params }: Props) {
  const { slug } = await params;
  const item = getCaseBySlug("en", slug);
  if (item) return <PortfolioCasePage item={item} lang="en" />;
  if (legacySlugs.includes(slug)) return <LegacyCase slug={slug} />;
  notFound();
}
