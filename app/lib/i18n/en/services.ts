import type { Service, ServiceCategory } from "../../site";

/**
 * Catálogo de servicios en inglés.
 *
 * No es una traducción literal del español. El público es distinto: una empresa
 * en Estados Unidos no busca "desarrollo web en Panamá", busca un equipo senior
 * que trabaje en su huso horario y le cueste menos que una agencia local. Por
 * eso el anclaje geográfico se reemplaza por trabajo remoto, solapamiento
 * horario y coste, y los `metaTitle` apuntan a la intención de búsqueda inglesa.
 *
 * Los `slug` y los `related` usan los slugs ingleses de `i18n/config.ts`: una
 * URL `/en/services/paginas-web-corporativas` no posiciona para nadie.
 */

export const enServiceCategories: Array<{
  id: ServiceCategory;
  label: string;
  headline: string;
  description: string;
}> = [
  {
    id: "dev",
    label: "Dev",
    headline: "Web, commerce and internal systems that sell and run the business",
    description:
      "We build the digital layer a company runs on: sites in Next.js, WordPress or Shopify, online stores, internal platforms and admin dashboards, so the operation works with less friction.",
  },
  {
    id: "automation",
    label: "Automation",
    headline: "Workflows that answer and sell without anyone waiting",
    description:
      "AI chatbots, lead capture and routing, automated replies and internal workflows that pick up the repetitive work your team does by hand today.",
  },
  {
    id: "marketing",
    label: "Marketing",
    headline: "Audits and measurement that tell you where the money actually goes",
    description:
      "Content, social and ad-spend audits, ROI models and reporting, so budget decisions rest on numbers instead of hunches.",
  },
];

export const enServices: Service[] = [
  {
    slug: "corporate-websites",
    category: "dev",
    categoryLabel: "Dev",
    icon: "phone",
    title: "Corporate websites",
    shortTitle: "Corporate web",
    metaTitle: "Corporate Website Design & Development",
    metaDescription:
      "Corporate website design and development in Next.js, WordPress or Shopify. Fast, credible sites built to turn visitors into sales conversations.",
    eyebrow: "Professional digital presence",
    heroTitle: "A corporate site that introduces, convinces and converts",
    summary:
      "Fast, clear company sites ready for Google, campaigns and measurement, built on Next.js, WordPress or Shopify.",
    description:
      "We build corporate sites for companies that need to earn trust on first contact, explain what they sell and turn visits into commercial conversations. We pick Next.js, WordPress or Shopify based on the goal, not on habit.",
    outcomes: [
      "Your company looks credible from the first click.",
      "Visitors understand what you sell and how to reach you.",
      "The site is ready for campaigns, SEO and analytics on day one.",
    ],
    deliverables: [
      "Home page and core company sections",
      "Responsive design",
      "Base commercial copy",
      "Contact form and messaging links",
      "Technical SEO foundation",
      "An editable WordPress or Shopify base when the team needs one",
    ],
    process: ["Goals and scope", "Structure and copy", "Visual design", "Next.js build", "Final review and launch"],
    stack: ["Next.js", "React", "WordPress", "Shopify", "Tailwind CSS", "Technical SEO", "Analytics"],
    faq: [
      {
        q: "How long does it take?",
        a: "A focused corporate site usually takes one to three weeks, depending on how many sections and how much content are involved.",
      },
      {
        q: "Can I request changes after launch?",
        a: "Yes. We can leave an adjustment window after launch and then move to a monthly maintenance plan.",
      },
      {
        q: "Do you work in WordPress or Shopify?",
        a: "Yes. We build, optimize or migrate WordPress and Shopify sites when an editable base or a fast-moving store makes more sense than a custom build.",
      },
    ],
    related: ["landing-pages", "seo-and-geo", "ads-management"],
  },
  {
    slug: "e-commerce",
    category: "dev",
    categoryLabel: "Dev",
    icon: "cart",
    title: "E-commerce",
    shortTitle: "E-commerce",
    metaTitle: "E-commerce Development: Shopify and Custom Stores",
    metaDescription:
      "Online store development on Shopify or custom-built: catalog, cart, payments, inventory and an admin panel your team can actually run.",
    eyebrow: "Selling online",
    heroTitle: "An online store built to sell and to be run",
    summary:
      "Shopify or custom e-commerce with catalog, inventory, checkout and an admin panel, so the operation stops living in spreadsheets.",
    description:
      "We develop online stores for businesses that want real control over products, prices, inventory, orders and customers. Shopify when speed matters, a custom build when the operation needs rules Shopify cannot express.",
    outcomes: [
      "Sales and inventory live in one system instead of five.",
      "You can sell across multiple markets or currencies when you need to.",
      "Your team manages products without going through a developer.",
    ],
    deliverables: [
      "Catalog and product pages",
      "Cart and checkout flow",
      "Admin panel",
      "Order and inventory management",
      "Payment and messaging integrations",
      "Shopify setup or rework where it applies",
    ],
    process: ["Catalog model", "Purchase flow design", "Integrations", "Admin panel", "Order testing"],
    stack: ["Shopify", "Next.js", "Laravel", "Filament", "MySQL", "Payment gateways"],
    faq: [
      {
        q: "Can it handle several countries?",
        a: "Yes. Currency, pricing, inventory and checkout can be separated per country when the business needs it.",
      },
      {
        q: "Does it include an admin panel?",
        a: "Yes. The store ships with a panel for products, orders, customers and day-to-day settings.",
      },
      {
        q: "Shopify or custom development?",
        a: "Shopify when you need to launch fast on mature tooling. Custom when your rules, integrations or internal flows would fight the platform.",
      },
    ],
    related: ["intelligent-admin-dashboard", "ads-management", "seo-and-geo"],
  },
  {
    slug: "wordpress-development",
    category: "dev",
    categoryLabel: "Dev",
    icon: "phone",
    title: "WordPress development and optimization",
    shortTitle: "WordPress",
    metaTitle: "Custom WordPress Development and Optimization",
    metaDescription:
      "Custom WordPress themes, WooCommerce, speed and security work. Editable sites your team can publish to without calling a developer.",
    eyebrow: "WordPress you can manage",
    heroTitle: "Custom WordPress that your team can publish to, and that grows without turning into a mess",
    summary:
      "We build, redesign and optimize WordPress sites with a structure of their own, solid performance and an admin your team understands.",
    description:
      "We work with companies that need to launch or fix a WordPress site without being trapped inside a heavy template. We design the architecture, the theme, the editable fields, the integrations and the maintenance around how the site is actually used.",
    outcomes: [
      "Your team updates content without a developer in the loop.",
      "The site keeps a consistent structure as it grows.",
      "Plugins, security and performance get handled with technical judgment.",
    ],
    deliverables: [
      "Architecture and responsive design",
      "Custom theme or blocks",
      "Editable content fields",
      "Performance optimization",
      "Security and backup setup",
      "Migration or integration where it applies",
    ],
    process: ["Audit or scope", "Architecture", "Design", "WordPress build", "Content and launch"],
    stack: ["WordPress", "PHP", "WooCommerce", "ACF", "Technical SEO", "Analytics"],
    faq: [
      {
        q: "Will you work on an existing WordPress site?",
        a: "Yes. We audit theme, plugins, hosting, content and performance first, then decide what to keep, fix or rebuild.",
      },
      {
        q: "Do you use pre-made templates?",
        a: "We can start from a proven base when budget calls for it, but we avoid stacking components you will never use. Projects with their own identity and operation get a custom theme.",
      },
      {
        q: "Is maintenance included?",
        a: "It can be. Updates, backups, monitoring and continuous improvements after launch are available as an ongoing plan.",
      },
    ],
    related: ["corporate-websites", "e-commerce", "seo-and-geo"],
  },
  {
    slug: "shopify-development",
    category: "dev",
    categoryLabel: "Dev",
    icon: "cart",
    title: "Shopify development and optimization",
    shortTitle: "Shopify",
    metaTitle: "Shopify Store Development and Optimization",
    metaDescription:
      "Shopify store setup, theme customization and conversion work: catalog, checkout, apps, analytics and the daily operation behind it.",
    eyebrow: "Commerce on Shopify",
    heroTitle: "A Shopify store set up to sell, to measure and to manage",
    summary:
      "We configure and customize Shopify so catalog, payments, content, automations and measurement behave like one system.",
    description:
      "We build Shopify stores for brands that need to launch quickly without a careless experience. We go through theme, navigation, product pages, checkout, apps, analytics and the daily operation.",
    outcomes: [
      "The store is ready for your team to run catalog and orders.",
      "The purchase path removes friction on mobile.",
      "Sales and campaigns share consistent measurement events.",
    ],
    deliverables: [
      "Store and markets configuration",
      "Theme customization",
      "Catalog and collections",
      "Payments, shipping and tax within scope",
      "E-commerce analytics",
      "Priority automations and integrations",
    ],
    process: ["Store model", "Catalog architecture", "Theme and content", "Integrations", "Purchase testing"],
    stack: ["Shopify", "Liquid", "JavaScript", "Shopify Analytics", "GA4", "Meta Ads"],
    faq: [
      {
        q: "Can you improve a Shopify store we already have?",
        a: "Yes. We audit navigation, theme, apps, speed, catalog, measurement and conversion before prioritizing any change.",
      },
      {
        q: "Does Shopify work for selling in several countries?",
        a: "It can, depending on payments, currency, catalog and logistics. We define what Shopify Markets can solve and what needs an extra integration.",
      },
      {
        q: "When is Shopify the wrong choice?",
        a: "When the operation depends on unusual rules, complex internal flows or integrations that would make the store painful to maintain. Then we compare against a custom build.",
      },
    ],
    related: ["e-commerce", "ads-management", "advertising-roi"],
  },
  {
    slug: "landing-pages",
    category: "dev",
    categoryLabel: "Dev",
    icon: "zap",
    title: "Landing pages",
    shortTitle: "Landing pages",
    metaTitle: "High-Converting Landing Pages for Paid Campaigns",
    metaDescription:
      "Fast, focused landing pages for campaigns, launches and lead capture. Built to turn paid clicks into qualified leads.",
    eyebrow: "Conversion for campaigns",
    heroTitle: "Landing pages built to turn traffic into leads",
    summary:
      "Campaign pages with a clear message, a strong call to action and a structure designed for Google Ads and Meta Ads.",
    description:
      "We build landing pages to validate offers, launch solutions, capture leads and get a cleaner read on what your campaigns return.",
    outcomes: [
      "Fewer distractions, one action in focus.",
      "Better lead quality out of paid campaigns.",
      "You can test offers without touching the main site.",
    ],
    deliverables: [
      "Hero and value proposition",
      "Benefit and social proof blocks",
      "Form or direct-contact CTA",
      "Conversion events",
      "Mobile optimization",
    ],
    process: ["Offer and audience", "Conversion copy", "Design", "Build", "Measurement"],
    stack: ["Next.js", "Tailwind CSS", "Meta Pixel", "Google Ads", "Analytics"],
    faq: [
      {
        q: "Does it work for ad campaigns?",
        a: "Yes. The structure is designed around paid traffic: speed, clarity and conversion tracking.",
      },
      {
        q: "Can we run several versions?",
        a: "Yes. We can build variants for different audiences, cities, offers or individual ads.",
      },
    ],
    related: ["ads-management", "advertising-roi", "corporate-websites"],
  },
  {
    slug: "custom-software-development",
    category: "dev",
    categoryLabel: "Dev",
    icon: "package",
    title: "Custom software development",
    shortTitle: "Custom software",
    metaTitle: "Custom Software Development for Business Operations",
    metaDescription:
      "Custom software for operations, sales, inventory, bookings and internal workflows. Automate what your team still does by hand in spreadsheets.",
    eyebrow: "Systems built to fit",
    heroTitle: "Software shaped around how your business actually works",
    summary:
      "Internal systems, SaaS products and operational platforms that replace manual processes and disconnected tools.",
    description:
      "We build custom solutions for the point where off-the-shelf stops fitting: dashboards, approval flows, reporting, roles, integrations and automation.",
    outcomes: [
      "Fewer manual errors and repeated tasks.",
      "Data and process consolidated into one platform.",
      "An operational advantage that competitors cannot buy off a shelf.",
    ],
    deliverables: [
      "Functional architecture",
      "Roles and permissions",
      "Admin panel",
      "Core workflow modules",
      "Integrations and initial support",
    ],
    process: ["Discovery", "Process mapping", "Minimum viable product", "Iterations", "Scaling"],
    stack: ["Next.js", "TypeScript", "Python", "Laravel", "Supabase", "PostgreSQL"],
    faq: [
      {
        q: "Do you start with an MVP?",
        a: "Yes. We recommend starting with the highest-impact workflow and expanding modules from there.",
      },
      {
        q: "Can it integrate with our existing systems?",
        a: "Yes. We review APIs, file exports, CRM, cloud storage and messaging platforms to connect what you already use.",
      },
    ],
    related: ["intelligent-admin-dashboard", "lead-management", "social-publishing-automation"],
  },
  {
    slug: "seo-and-geo",
    category: "dev",
    categoryLabel: "Dev",
    icon: "chart",
    title: "SEO and GEO",
    shortTitle: "SEO and GEO",
    metaTitle: "SEO and GEO: Ranking in Google and in AI Answers",
    metaDescription:
      "Technical SEO plus GEO, so your offer is found in Google and cited correctly by AI assistants. Structure, metadata, schema and content.",
    eyebrow: "Organic visibility",
    heroTitle: "SEO and GEO, so your offer is findable and understandable",
    summary:
      "We work structure, metadata, content, search intent and structured data for both search engines and AI assistants.",
    description:
      "We cover traditional SEO and GEO together, so your solutions read clearly to people, to Google and to the generative engines that now summarize answers.",
    outcomes: [
      "A cleaner structure for crawling and indexing.",
      "Content that answers real commercial intent.",
      "More consistent structured data and technical signals.",
    ],
    deliverables: [
      "Technical SEO audit",
      "Page architecture",
      "Metadata and canonicals",
      "JSON-LD structured data",
      "Content recommendations",
    ],
    process: ["Audit", "Intent mapping", "Technical fixes", "Content", "Measurement"],
    stack: ["Next.js Metadata", "Schema.org", "Search Console", "Core Web Vitals", "Analytics"],
    faq: [
      {
        q: "What is GEO?",
        a: "Generative engine optimization: content that is clear, structured and easy for AI assistants to quote or summarize accurately.",
      },
      {
        q: "Do you guarantee first position?",
        a: "No. We do not sell artificial rankings. We fix technical fundamentals, content and intent so you compete on better footing.",
      },
    ],
    related: ["corporate-websites", "landing-pages", "content-audit"],
  },
  {
    slug: "ads-management",
    category: "dev",
    categoryLabel: "Dev",
    icon: "chart",
    title: "Ads management and control",
    shortTitle: "Ads management",
    metaTitle: "Google Ads and Meta Ads Management with Real Tracking",
    metaDescription:
      "Google Ads and Meta Ads management focused on leads, sales and ROI. Know which campaign brings customers and which one burns budget.",
    eyebrow: "Advertising you can measure",
    heroTitle: "Ad campaigns with tracking, control and decisions you can defend",
    summary:
      "We set up and run campaigns so you know what works, what each lead costs and where the next dollar should go.",
    description:
      "We organize campaigns, creative, audiences and measurement so ad spend reads as a business number, not a platform metric.",
    outcomes: [
      "Clear cost per lead and cost per sale.",
      "A tighter connection between ad, landing page and conversation.",
      "Budget decisions backed by data.",
    ],
    deliverables: [
      "Campaign structure",
      "Events and conversions",
      "Landing page or conversion path",
      "Results reporting",
      "Optimization recommendations",
    ],
    process: ["Audit", "Tracking", "Campaigns", "Optimization", "Reporting"],
    stack: ["Google Ads", "Meta Ads", "GA4", "Tag Manager", "Looker Studio"],
    faq: [
      {
        q: "Do you handle both Google and Meta?",
        a: "Yes. Google Ads, Meta Ads or both, depending on the offer and the audience.",
      },
      {
        q: "Does it include ad creative?",
        a: "We can coordinate creative and commercial copy, or fold it into the content and video service.",
      },
    ],
    related: ["landing-pages", "ad-spend-audit", "advertising-roi"],
  },
  {
    slug: "intelligent-admin-dashboard",
    category: "dev",
    categoryLabel: "Dev",
    icon: "chart",
    title: "Intelligent admin dashboard",
    shortTitle: "Admin dashboard",
    metaTitle: "Custom Admin Dashboards and Business Monitoring",
    metaDescription:
      "Admin dashboards to monitor sales, leads, inventory and campaigns in real time, all on one screen instead of scattered files.",
    eyebrow: "Data analysis",
    heroTitle: "One screen that tells you how the business is doing",
    summary:
      "Dashboards that surface critical metrics, expose bottlenecks and replace intuition with numbers.",
    description:
      "We build admin dashboards that connect your data sources and show the indicators that matter for sales, operations, ads, leads and inventory.",
    outcomes: [
      "Real visibility without opening five different files.",
      "Alerts and metrics that let you act sooner.",
      "Better performance control by area.",
    ],
    deliverables: [
      "KPI dashboard",
      "Filters by period and channel",
      "Data integration",
      "Access roles",
      "Exports and reports",
    ],
    process: ["KPIs", "Data sources", "Model", "Dashboard", "Validation"],
    stack: ["Next.js", "PostgreSQL", "APIs", "Charts", "Data analysis"],
    faq: [
      {
        q: "Can it connect to our current system?",
        a: "Yes, as long as there is an API, an exportable database or recurring files, we can design the integration.",
      },
      {
        q: "Is it read-only or can we manage from it?",
        a: "Either. It can be a monitor, a full admin panel, or a mix, depending on the workflow.",
      },
    ],
    related: ["custom-software-development", "advertising-roi", "lead-management"],
  },
  {
    slug: "ai-chatbot-whatsapp-social",
    category: "automation",
    categoryLabel: "Automation",
    icon: "bot",
    title: "AI chatbot for messaging and social channels",
    shortTitle: "AI chatbot",
    metaTitle: "AI Chatbots for WhatsApp and Social Messaging",
    metaDescription:
      "AI chatbots that answer, qualify and route customers around the clock on WhatsApp, Instagram and Messenger, so no lead sits waiting.",
    eyebrow: "AI-assisted service",
    heroTitle: "An AI chatbot that answers before a lead gives up",
    summary:
      "Automate common questions, lead qualification and handoff to your team across messaging and social channels.",
    description:
      "We design chatbots that understand common questions, capture details, guide the customer and hand your team conversations that are ready for follow-up.",
    outcomes: [
      "Fewer unanswered messages.",
      "Better-qualified leads before sales gets involved.",
      "Consistent coverage during peak hours and off hours.",
    ],
    deliverables: [
      "Conversation flows",
      "Knowledge base",
      "Data capture",
      "Handoff to a human",
      "CRM or spreadsheet integration",
    ],
    process: ["Use cases", "Scripts", "Training", "Integration", "Live testing"],
    stack: ["WhatsApp", "Instagram", "AI", "Python", "APIs"],
    faq: [
      {
        q: "Does it replace our team?",
        a: "Not usually. It works best filtering, answering the repetitive questions and escalating the conversations that matter.",
      },
      {
        q: "Can it use our company information?",
        a: "Yes. We build a knowledge base with your services, hours, indicative pricing and rules of engagement.",
      },
    ],
    related: ["lead-management", "automated-social-replies", "social-publishing-automation"],
  },
  {
    slug: "lead-management",
    category: "automation",
    categoryLabel: "Automation",
    icon: "users",
    title: "Lead capture, management and follow-up",
    shortTitle: "Lead management",
    metaTitle: "Lead Management Systems: Capture, Route and Follow Up",
    metaDescription:
      "Systems to capture, organize and follow up on leads from forms, messaging, ads and social. Stop losing customers in the gaps.",
    eyebrow: "Sales pipeline",
    heroTitle: "Stop losing leads between forms, messaging and ads",
    summary:
      "Centralize leads, statuses, owners and next steps so sales works from a list instead of a memory.",
    description:
      "We design flows to capture leads from every channel, assign them, follow up and measure the quality of each source.",
    outcomes: [
      "Fewer opportunities lost to missed follow-up.",
      "A clear view of which channel brings better leads.",
      "A sales team with visible priorities.",
    ],
    deliverables: [
      "Multi-channel capture",
      "Status pipeline",
      "Owner assignment",
      "Reminders",
      "Reporting by channel",
    ],
    process: ["Sources", "Statuses", "Automation", "Dashboard", "Follow-up"],
    stack: ["CRM", "WhatsApp", "Google Sheets", "Next.js", "Automation"],
    faq: [
      {
        q: "Can it integrate with our CRM?",
        a: "Yes. We review your current CRM and connect through its API or an intermediate flow where that is viable.",
      },
      {
        q: "Does it work if we only use messaging?",
        a: "Yes. We can start with a single messaging channel and add forms, ads and social later.",
      },
    ],
    related: ["ai-chatbot-whatsapp-social", "ads-management", "intelligent-admin-dashboard"],
  },
  {
    slug: "automated-social-replies",
    category: "automation",
    categoryLabel: "Automation",
    icon: "bot",
    title: "Automated replies to social comments",
    shortTitle: "Automated replies",
    metaTitle: "Automated Social Media Comment Replies",
    metaDescription:
      "Automate replies to social media comments: faster response, more leads captured, no extra headcount.",
    eyebrow: "Social response",
    heroTitle: "Turn comments into conversations you actually answer in time",
    summary:
      "Automate frequent replies on social and route real opportunities to your team or messaging channel.",
    description:
      "We build flows that answer comments, detect intent, hold your brand voice and move conversations toward a sales channel.",
    outcomes: [
      "Faster response on active posts.",
      "More value extracted from campaigns and viral content.",
      "Consistent coverage without overloading the team.",
    ],
    deliverables: [
      "Comment type mapping",
      "Replies by intent",
      "Routing rules",
      "Opportunity log",
      "Tone testing",
    ],
    process: ["Comment audit", "Scripts", "Rules", "Automation", "Monitoring"],
    stack: ["Instagram", "Meta", "AI", "Python", "Automation"],
    faq: [
      {
        q: "Can the replies sound human?",
        a: "Yes. We define tone, boundaries and variation so it does not read like a canned response.",
      },
      {
        q: "Can it push people to a messaging channel?",
        a: "Yes. It can answer and route to the right link based on what the person is asking for.",
      },
    ],
    related: ["ai-chatbot-whatsapp-social", "video-production", "social-publishing-automation"],
  },
  {
    slug: "content-audit",
    category: "marketing",
    categoryLabel: "Marketing",
    icon: "chart",
    title: "Content audit for your company",
    shortTitle: "Content audit",
    metaTitle: "Content Audit: What to Publish and What to Stop",
    metaDescription:
      "Content audit for companies: we review message, formats, funnel and cadence to tell you what to publish and what to stop doing.",
    eyebrow: "Content audit",
    heroTitle: "Content with intent, not just posts going out",
    summary:
      "We analyze your current content to improve clarity, authority, conversion and consistency.",
    description:
      "We review how you communicate your offer, which formats you use, which questions you answer and what content is missing to convert better.",
    outcomes: [
      "A clearer message, aligned with how you sell.",
      "Content ideas with a commercial purpose.",
      "A tighter connection between social, site and ads.",
    ],
    deliverables: [
      "Content diagnosis",
      "Opportunity map",
      "Format recommendations",
      "Ideas by funnel stage",
      "Action priorities",
    ],
    process: ["Collection", "Analysis", "Findings", "Plan", "Next steps"],
    stack: ["Audit", "SEO/GEO", "Social media", "Commercial copywriting", "Analytics"],
    faq: [
      {
        q: "Do we need a lot of published content first?",
        a: "No. We can evaluate what exists and propose an editorial direction from scratch if there is nothing yet.",
      },
      {
        q: "Does it include a posting calendar?",
        a: "It can include a base calendar, or connect to the social publishing automation service.",
      },
    ],
    related: ["video-production", "seo-and-geo", "social-publishing-automation"],
  },
  {
    slug: "video-production",
    category: "marketing",
    categoryLabel: "Marketing",
    icon: "zap",
    title: "Video creation and editing",
    shortTitle: "Video",
    metaTitle: "Video Creation and Editing for Social and Ads",
    metaDescription:
      "Scripted, professionally edited video for social, campaigns and company content, including subtitles and per-platform versions.",
    eyebrow: "Video marketing",
    heroTitle: "Video with a script, an edit and a commercial goal",
    summary:
      "We write scripts and edit video to explain, sell, teach and feed your campaigns.",
    description:
      "We turn ideas and raw footage into clear, well-paced video for social, ads and sales pages.",
    outcomes: [
      "More professional, more consistent content.",
      "Better retention and a clearer message.",
      "Pieces ready for campaigns or organic posting.",
    ],
    deliverables: [
      "Script or structure",
      "Professional editing",
      "Subtitles",
      "Versions per format",
      "Publishing recommendations",
    ],
    process: ["Goal", "Script", "Footage", "Edit", "Delivery"],
    stack: ["Scripting", "Editing", "Short-form video", "Ads", "Social media"],
    faq: [
      {
        q: "Can you work with footage our team shot?",
        a: "Yes. We can edit existing material and coach you on getting better takes next time.",
      },
      {
        q: "Does it work for ads?",
        a: "Yes. We can cut versions built around retention, clarity and a paid-media call to action.",
      },
    ],
    related: ["content-audit", "ads-management", "social-media-audit"],
  },
  {
    slug: "social-media-audit",
    category: "marketing",
    categoryLabel: "Marketing",
    icon: "chart",
    title: "Social media and digital advertising strategy audit",
    shortTitle: "Social audit",
    metaTitle: "Social Media and Digital Strategy Audit",
    metaDescription:
      "Social media and digital advertising audit: what is working, what is not, and where you are leaving money on the table.",
    eyebrow: "Digital strategy",
    heroTitle: "A full review of social, offer and paid media",
    summary:
      "We evaluate social presence, message, paid media, content and conversion path to find the high-impact fixes.",
    description:
      "We look at social and advertising as one system: what attracts, what converts, where leads leak out and what to change first.",
    outcomes: [
      "Clear priorities for improving the strategy.",
      "Better alignment between content and campaigns.",
      "Actionable recommendations for the short term.",
    ],
    deliverables: [
      "Profile audit",
      "Post performance analysis",
      "Campaign review",
      "Funnel map",
      "Improvement plan",
    ],
    process: ["Access or evidence", "Audit", "Diagnosis", "Plan", "Optional support"],
    stack: ["Instagram", "Meta Ads", "Google Ads", "Analytics", "Commercial copywriting"],
    faq: [
      {
        q: "Do you need access to our accounts?",
        a: "We can start from screenshots and exported data. For a deep analysis, temporary and scoped access works better.",
      },
      {
        q: "Do you also implement the fixes?",
        a: "Yes. We can move from audit to execution with landing pages, ads, automation or content.",
      },
    ],
    related: ["ad-spend-audit", "content-audit", "landing-pages"],
  },
  {
    slug: "ad-spend-audit",
    category: "marketing",
    categoryLabel: "Marketing",
    icon: "chart",
    title: "Ad spend audit",
    shortTitle: "Ad spend audit",
    metaTitle: "Ad Spend Audit: Find the Budget Leaks",
    metaDescription:
      "We audit your Google Ads and Meta Ads spend to find budget leaks, missed opportunities and the decisions worth making next.",
    eyebrow: "Advertising budget",
    heroTitle: "Find out whether your ad spend is working for the business",
    summary:
      "We analyze budget, campaigns, leads, conversions and return to put the money where it pays.",
    description:
      "We check whether your campaigns reach the right audience, whether the landing page converts and whether the budget makes sense against the return.",
    outcomes: [
      "Identify campaigns consuming budget with no return.",
      "Improve distribution across channel, audience and offer.",
      "Decide with metrics instead of assumptions.",
    ],
    deliverables: [
      "Spend diagnosis",
      "Key metric analysis",
      "Budget recommendations",
      "Quick wins",
      "Optimization plan",
    ],
    process: ["Data collection", "Metric analysis", "Findings", "Plan", "Follow-up"],
    stack: ["Google Ads", "Meta Ads", "GA4", "CRM", "ROI"],
    faq: [
      {
        q: "Do you need access to the ad accounts?",
        a: "For a deep diagnosis, temporary access helps. We can also start from exported reports.",
      },
      {
        q: "Does it include ROI calculation?",
        a: "It can. If you need it as an ongoing tool, the advertising ROI service covers that.",
      },
    ],
    related: ["advertising-roi", "ads-management", "landing-pages"],
  },
  {
    slug: "advertising-roi",
    category: "marketing",
    categoryLabel: "Marketing",
    icon: "chart",
    title: "Advertising ROI measurement",
    shortTitle: "Advertising ROI",
    metaTitle: "Advertising ROI Measurement and Modeling",
    metaDescription:
      "Measure the real return of your advertising by connecting spend, leads, sales and margin. Stop investing blind.",
    eyebrow: "Advertising profitability",
    heroTitle: "Measure the real ROI of your campaigns and decide with numbers",
    summary:
      "Connect spend, leads, sales and margin to see which campaigns actually return money.",
    description:
      "We build models or dashboards that calculate advertising ROI against your business: ticket size, margin, channel and real conversion.",
    outcomes: [
      "Understand which channel produces profitable sales.",
      "Spot campaigns that generate leads but no margin.",
      "Plan budget with more confidence.",
    ],
    deliverables: [
      "ROI model",
      "Dashboard or calculator",
      "Business variables",
      "Reporting by channel",
      "Recommendations",
    ],
    process: ["Variables", "Data", "Model", "Dashboard", "Optimization"],
    stack: ["Spreadsheets", "Dashboards", "GA4", "Ads", "Data analysis"],
    faq: [
      {
        q: "What data do we need?",
        a: "Spend, leads, sales, average ticket, margin and source. If that data is messy, we help structure it first.",
      },
      {
        q: "Can it run automatically?",
        a: "Yes. It can become a dashboard wired to your data sources so nobody updates it by hand.",
      },
    ],
    related: ["intelligent-admin-dashboard", "ad-spend-audit", "ads-management"],
  },
  {
    slug: "social-publishing-automation",
    category: "marketing",
    categoryLabel: "Marketing",
    icon: "package",
    title: "Social media publishing automation",
    shortTitle: "Publishing automation",
    metaTitle: "Social Media Publishing Automation Software",
    metaDescription:
      "Software to plan and automate social media publishing: less manual work, far more consistency across channels.",
    eyebrow: "Content operations",
    heroTitle: "A system to organize and automate social publishing",
    summary:
      "Plan content, statuses, owners and posting so your strategy stops depending on memory and improvisation.",
    description:
      "We build tools to organize calendars, assets, scripts, approvals and automated or semi-automated publishing across social channels.",
    outcomes: [
      "More consistent publishing.",
      "Less chaos between idea, edit, approval and post.",
      "A clearer link between content, campaigns and results.",
    ],
    deliverables: [
      "Content calendar",
      "Status workflow",
      "Roles and approvals",
      "Publishing automation",
      "Basic reporting",
    ],
    process: ["Current workflow", "Editorial model", "System", "Integration", "Team rollout"],
    stack: ["Next.js", "Social APIs", "Automation", "AI", "Dashboards"],
    faq: [
      {
        q: "Does it post automatically?",
        a: "It can, where the channel's API allows it. It can also be built as an approval and reminder system.",
      },
      {
        q: "Can it use AI for ideas?",
        a: "Yes. We can include assisted generation of ideas, scripts or copy, always with human review.",
      },
    ],
    related: ["content-audit", "video-production", "automated-social-replies"],
  },
];

export function getEnServiceBySlug(slug: string) {
  return enServices.find((service) => service.slug === slug);
}
