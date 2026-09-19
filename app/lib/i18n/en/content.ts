import type { MegaMenuColumn, WorkflowStep } from "../../site";
import type { CaseStudy } from "../../content";

/**
 * Contenido de portada, casos y navegación en inglés.
 *
 * Los `href` apuntan siempre a `/en/...`: si apuntaran a las rutas españolas,
 * el visitante inglés saldría del idioma al primer clic y Google vería el árbol
 * inglés colgando del español.
 */

export const enNavLinks = [
  { href: "/en/services", label: "Solutions" },
  { href: "/en/cases", label: "Work" },
  { href: "/en/about", label: "Team" },
  { href: "/en#plans", label: "Pricing" },
  { href: "/en#faq", label: "FAQ" },
];

export const enMegaMenuColumns: MegaMenuColumn[] = [
  {
    eyebrow: "Engineering & Growth",
    title: "Infrastructure that converts and scales",
    items: [
      {
        title: "Web architecture",
        description: "Next.js, WordPress, Shopify and corporate sites built for SEO, speed and campaigns.",
        href: "/en/services/corporate-websites",
      },
      {
        title: "Custom software",
        description: "Internal systems, dashboards, roles, reporting and operational flows that cut manual work.",
        href: "/en/services/custom-software-development",
      },
      {
        title: "Automation and APIs",
        description: "Connections between forms, messaging, databases, CRM and the tools your team already uses.",
        href: "/en/services/lead-management",
      },
      {
        title: "Acquisition and analytics",
        description: "Ads, SEO/GEO, advertising ROI and dashboards for decisions backed by real data.",
        href: "/en/services/intelligent-admin-dashboard",
      },
    ],
  },
  {
    eyebrow: "Creative & Strategy",
    title: "Systems for authority and conversion",
    items: [
      {
        title: "Ecosystem audits",
        description: "A read on site, content, social, campaigns and funnel to find where opportunity leaks out.",
        href: "/en/services/social-media-audit",
      },
      {
        title: "Conversion-focused video",
        description: "Scripts and editing with a commercial goal: retention and clarity for campaigns or authority.",
        href: "/en/services/video-production",
      },
      {
        title: "Brand authority",
        description: "Content, SEO/GEO and consistent publishing that make the company easier to trust.",
        href: "/en/services/content-audit",
      },
    ],
  },
];

export const enWorkflowSteps: WorkflowStep[] = [
  {
    label: "01",
    title: "Ad click",
    description: "Paid traffic arrives with intent and is attributed to the campaign that produced it.",
  },
  {
    label: "02",
    title: "Lead captured",
    description: "A form, a message or a landing page records the details without losing commercial context.",
  },
  {
    label: "03",
    title: "Relational database",
    description: "The lead lands in a secure structure built for lookup, traceability and analysis.",
  },
  {
    label: "04",
    title: "CRM and follow-up",
    description: "The team gets tasks, statuses and reminders, so opportunities get picked up in time.",
  },
  {
    label: "05",
    title: "ROI dashboard",
    description: "Leadership sees cost, source, conversion and return, and adjusts spend accordingly.",
  },
];

export const enCases = [
  {
    client: "Champion Motors",
    sector: "Car dealership",
    desc: "Dealership website plus an operations bot that generates contracts and quotes, reads ID documents with OCR, syncs with Zoho CRM and Google Drive, and sends balance reminders.",
    tags: ["Laravel", "Python", "Telegram", "Zoho CRM"],
  },
  {
    client: "BARETEC Panama",
    sector: "International trade",
    desc: "Corporate site for a used-battery trading company operating between Latin America and South Korea. Custom WordPress theme with every text and image editable from the admin, with no developer in the loop.",
    tags: ["WordPress", "PHP", "Custom theme"],
  },
  {
    client: "Camsmark",
    sector: "Multi-country e-commerce",
    desc: "A single online store serving two markets: pricing, currency, inventory and checkout separated per country, built to run sales without duplicating the operation.",
    tags: ["Laravel", "Filament", "MySQL"],
  },
  {
    client: "LIBRO",
    sector: "Accounting and tax",
    desc: "Multi-country accounting system with double-entry bookkeeping, financial statements and tax reporting.",
    tags: ["TypeScript", "Accounting", "Tax"],
  },
  {
    client: "GymFlow",
    sector: "SaaS for trainers",
    desc: "Platform for personal trainers: training plans, RPE tracking and daily check-ins.",
    tags: ["JavaScript", "SaaS", "React"],
  },
  {
    client: "EventosQR",
    sector: "Event management",
    desc: "Attendee registration and validation through QR codes, with visual verification at the door.",
    tags: ["Next.js", "TypeScript", "QR"],
  },
  {
    client: "Mili & Molo",
    sector: "Educational e-commerce",
    desc: "Online store for a bilingual education brand: books, downloadable workbooks and physical products in one catalog, with a custom theme, bulk content loading and e-commerce measurement.",
    tags: ["WordPress", "WooCommerce", "PHP"],
  },
  {
    client: "GBP analyzer and marketing bots",
    sector: "AI marketing",
    desc: "Google Business Profile analyzer with AI-generated recommendations, automated comment replies and a scheduled content publisher.",
    tags: ["Python", "AI", "Instagram"],
  },
];

export const enTeam = [
  { name: "Antonio Duque", role: "Co-founder", initials: "AD" },
  { name: "Noe Rivas", role: "Co-founder", initials: "NR" },
  {
    name: "Development team",
    role: "Developers and specialists who join based on what each project needs",
    initials: null,
  },
];

export const enProcessSteps = [
  { step: 1, title: "Discovery", desc: "We learn how your business works and find the processes eating the most time." },
  { step: 2, title: "Proposal", desc: "You get the solution, the scope and a clear budget before anything starts." },
  { step: 3, title: "Build", desc: "We ship in stages so you watch the solution take shape instead of waiting in the dark." },
  { step: 4, title: "Launch", desc: "We deploy, migrate your data and train your team on it." },
  { step: 5, title: "Support", desc: "We stay on for maintenance and continuous improvements." },
];

export const enPlans = [
  {
    name: "Digital presence",
    tagline: "To exist properly online",
    price: "From $600",
    features: ["Professional site or landing page", "Optimized for Google", "Contact form and messaging", "Responsive design"],
    featured: false,
  },
  {
    name: "Automation",
    tagline: "To stop doing it by hand",
    price: "From $1,500",
    features: ["Online store or custom app", "Bots and automation", "Integrations", "Admin dashboard"],
    featured: true,
  },
  {
    name: "Full solution",
    tagline: "Digitize the whole operation",
    price: "Custom quote",
    features: ["End-to-end system", "Marketing and AI", "Data analysis", "Support and continuous evolution"],
    featured: false,
  },
];

export const enFaqs = [
  {
    q: "Do you work with small businesses or only large companies?",
    a: "We work with businesses of every size. We start with whatever gives you the most impact and grow from there.",
  },
  {
    q: "What does it cost to digitize a business?",
    a: "It depends on what you need. A digital presence starts at $600 and custom automation from $1,500.",
  },
  {
    q: "How long does a project take?",
    a: "A simple site can be live in one to two weeks. A full platform usually takes four to twelve weeks.",
  },
  {
    q: "Where is your team based, and what hours do you work?",
    a: "We work remotely from Panama, which overlaps with US business hours through the whole working day. No overnight handoffs and no waiting until tomorrow for an answer.",
  },
  {
    q: "Can we keep using our current tools?",
    a: "Yes. We connect your existing tools to the new systems so they work together instead of competing.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Yes. We have maintenance and continuous improvement plans so the solution evolves with the business.",
  },
];

export const enBenefits = [
  "Fewer manual tasks and fewer repeated mistakes.",
  "Better lead response across messaging, social and forms.",
  "Clear data for decisions on sales, ads and operations.",
  "Web infrastructure ready for SEO, GEO, campaigns, WordPress, Shopify and custom systems.",
];

export const enCaseStudies: CaseStudy[] = [
  {
    slug: "car-dealership-automation",
    client: "Champion Motors",
    sector: "Car dealership",
    metaTitle: "Case Study: Car Dealership Automation",
    metaDescription:
      "Website, documents, OCR, messaging, Zoho CRM and Google Drive connected to support a dealership's commercial operation.",
    challenge:
      "The sales operation had to produce quotes and contracts, read customer documents, organize files and keep follow-up alive, all through disconnected manual tasks.",
    solution:
      "We built the dealership website and an operations layer that uses a messaging bot as the interface, OCR to read ID documents, Zoho CRM for sales management and Google Drive to organize paperwork.",
    result:
      "The team now has one connected path to generate documents, look up information and send balance reminders, from tools that were already part of their day.",
    capabilities: ["Data capture and lookup", "Contract and quote generation", "ID document OCR", "Sales reminders"],
    stack: ["Laravel", "Python", "Telegram", "Zoho CRM", "Google Drive"],
    relatedServices: ["custom-software-development", "lead-management", "intelligent-admin-dashboard"],
  },
  {
    slug: "corporate-wordpress-site",
    client: "BARETEC Panama",
    sector: "International trade",
    metaTitle: "Case Study: Editable Corporate WordPress Site",
    metaDescription:
      "Custom WordPress site for an international trading company, with content and images editable from the admin panel.",
    challenge:
      "The company had to explain a specialized international operation while keeping the freedom to update its own text and images.",
    solution:
      "We built a custom WordPress theme with a corporate structure, a clear content hierarchy and editable fields for the team.",
    result:
      "They keep their digital presence current from WordPress without needing a developer for every editorial change.",
    capabilities: ["Content architecture", "Custom WordPress theme", "Editable admin", "Responsive design"],
    stack: ["WordPress", "PHP", "Custom theme"],
    relatedServices: ["corporate-websites", "wordpress-development", "seo-and-geo"],
  },
  {
    slug: "multi-country-ecommerce",
    client: "Camsmark",
    sector: "Multi-country e-commerce",
    metaTitle: "Case Study: Multi-Country E-commerce",
    metaDescription:
      "An online store with pricing, currency, inventory and payments separated per country, run from a single operation.",
    challenge:
      "The store had to serve two markets with different rules without duplicating catalogs, administration or internal processes.",
    solution:
      "We built an e-commerce platform that separates price, currency, inventory and checkout per country, with one central admin panel.",
    result:
      "The company runs both markets from a single platform while keeping the commercial differences each country requires.",
    capabilities: ["Multi-country catalog", "Inventory per market", "Local currency and pricing", "Admin panel"],
    stack: ["Laravel", "Filament", "MySQL"],
    relatedServices: ["e-commerce", "intelligent-admin-dashboard", "custom-software-development"],
  },
  {
    slug: "educational-ecommerce",
    client: "Mili & Molo",
    sector: "Educational e-commerce",
    metaTitle: "Case Study: Educational E-commerce on WooCommerce",
    metaDescription:
      "Bilingual e-commerce for physical and downloadable educational products, built on WooCommerce with a custom theme.",
    challenge:
      "The brand needed to sell books, downloadable materials and physical products from one bilingual catalog.",
    solution:
      "We developed a custom theme on WordPress and WooCommerce, prepared the bulk content load and configured e-commerce measurement.",
    result:
      "The store brings different product types into one manageable experience, set up to analyze the purchase journey.",
    capabilities: ["Physical and digital products", "Bilingual content", "Structured bulk loading", "E-commerce measurement"],
    stack: ["WordPress", "WooCommerce", "PHP", "Analytics"],
    relatedServices: ["e-commerce", "wordpress-development", "ads-management"],
  },
];

export function getEnCaseStudy(slug: string) {
  return enCaseStudies.find((item) => item.slug === slug);
}
