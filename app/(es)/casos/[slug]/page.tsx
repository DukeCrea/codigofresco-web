import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PortfolioCasePage, portfolioCaseMetadata } from "../../../components/portfolio/case-page";
import { getCaseBySlug, getCases } from "../../../lib/portfolio";
import { LegacyCase, legacyMetadata, legacySlugs } from "./legacy";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return [...getCases("es").map((c) => ({ slug: c.slug })), ...legacySlugs.map((slug) => ({ slug }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return portfolioCaseMetadata("es", slug) ?? legacyMetadata(slug);
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  const item = getCaseBySlug("es", slug);
  if (item) return <PortfolioCasePage item={item} lang="es" />;
  if (legacySlugs.includes(slug)) return <LegacyCase slug={slug} />;
  notFound();
}
