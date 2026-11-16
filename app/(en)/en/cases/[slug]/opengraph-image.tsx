import { caseImage } from "../../../../components/portfolio/case-og";

export const alt = "Código Fresco · Antonio Duque";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  return caseImage("en", (await params).slug);
}
