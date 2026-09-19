import { CookiePreferencesButton } from "../../../analytics-scripts";
import { LegalPage } from "../../../legal-page";
import { buildMetadata } from "../../../lib/seo";

export const metadata = buildMetadata({
  title: "Cookie policy",
  description: "Cookies and analytics technologies used by CodigoFresco, and how to change your preferences.",
  path: "/en/cookies",
  lang: "en",
  esPath: "/cookies",
  index: false,
});

export default function EnglishCookiesPage() {
  return (
    <LegalPage
      lang="en"
      title="Cookie policy"
      intro="The site works without optional analytics. Google Analytics, Clarity and Vercel Analytics only run once you accept."
    >
      <section><h2>Essential cookies</h2><p className="mt-4">Required for basic functionality, security, the private dashboard session and remembering your privacy choice. They are not used for advertising.</p></section>
      <section><h2>Optional analytics</h2><p className="mt-4">If you accept, we may load Google Analytics 4, Microsoft Clarity, Vercel Analytics and Speed Insights to measure visits, interaction, errors and performance. These providers may process technical identifiers under their own policies.</p></section>
      <section><h2>Your choice</h2><p className="mt-4">You can accept or refuse from the initial notice. Refusing does not block the form, messaging or any public page. Use the button below to bring the selector back.</p><div className="mt-6"><CookiePreferencesButton lang="en" /></div></section>
      <section><h2>Browser controls</h2><p className="mt-4">You can also clear site data or block cookies from your browser. If you do, the site may ask for your preferences again.</p></section>
    </LegalPage>
  );
}
