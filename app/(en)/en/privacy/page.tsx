import Link from "next/link";

import { LegalPage } from "../../../legal-page";
import { buildMetadata } from "../../../lib/seo";
import { siteConfig } from "../../../lib/site";

export const metadata = buildMetadata({
  title: "Privacy policy",
  description: "How CodigoFresco collects, uses and protects the data sent by visitors and clients.",
  path: "/en/privacy",
  lang: "en",
  esPath: "/privacidad",
  index: false,
});

export default function EnglishPrivacyPage() {
  return (
    <LegalPage
      lang="en"
      title="Privacy policy"
      intro="What data we collect, what we use it for, and what choices you have over how it is handled."
    >
      <section><h2>Who is responsible</h2><p className="mt-4">CodigoFresco is responsible for the processing described in this policy. Write to <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> with questions or to exercise your rights.</p></section>
      <section><h2>Data we collect</h2><ul className="mt-4 list-disc pl-6"><li>Name, company, email and phone that you send voluntarily.</li><li>Project type, need, budget, timeline and message.</li><li>Originating page and campaign parameters included in the URL.</li><li>Usage and device data only when you accept optional analytics.</li></ul></section>
      <section><h2>Purposes</h2><p className="mt-4">We use the data to answer requests, prepare assessments, follow up commercially, deliver contracted services, protect the form against abuse, and understand site performance where consent exists.</p></section>
      <section><h2>Providers and transfers</h2><p className="mt-4">We may process information through hosting, database, email and analytics providers. The site may use Supabase and Resend to receive leads; Google Analytics, Microsoft Clarity and Vercel Analytics load only after you accept optional analytics.</p></section>
      <section><h2>Retention and security</h2><p className="mt-4">We keep data for as long as needed to handle the commercial relationship, meet obligations or resolve claims. We apply access controls and reasonable technical measures, though no internet-connected system can guarantee zero risk.</p></section>
      <section><h2>Your choices</h2><p className="mt-4">You can request access, correction or deletion where applicable. You can also refuse or change optional analytics from the <Link href="/en/cookies">cookie policy</Link>.</p></section>
    </LegalPage>
  );
}
