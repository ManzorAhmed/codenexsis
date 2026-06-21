import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const services = [
  {
    slug: 'software-development', number: '01', title: 'Custom Software Development',
    shortTitle: 'Software Development', category: 'build', icon: 'Code2',
    tagline: 'Bespoke systems engineered to outlast trends.',
    description: 'End-to-end custom software built around your operations — not the other way around.',
    longDescription: 'We build production-grade software for ambitious teams. From discovery and architecture to deployment and post-launch support, every line of code is written with performance, security, and scale in mind.',
    capabilities: ['Discovery, scoping & technical architecture', 'Full-stack web application development', 'API design (REST, GraphQL, gRPC) & integrations', 'Microservices & event-driven systems', 'Legacy modernisation & refactoring', 'DevOps, CI/CD & observability'],
    technologies: ['Next.js', 'Node.js', 'TypeScript', 'Python', 'Go', 'PostgreSQL', 'Redis', 'AWS'],
    deliverables: ['Production-ready codebase with documentation', 'CI/CD pipeline & automated test suite', 'Architecture diagrams & runbooks', '90-day post-launch hypercare'],
    metaTitle: 'Custom Software Development | Codenexsis Technologies',
    metaDescription: 'Custom software development by Codenexsis Technologies — bespoke web platforms, APIs, and enterprise systems built with Next.js, Node.js, Python, and Go.',
  },
  {
    slug: 'crm-erp-development', number: '02', title: 'CRM & ERP Development',
    shortTitle: 'CRM / ERP', category: 'build', icon: 'Database',
    tagline: 'One source of truth, across every department.',
    description: 'Custom CRM and ERP platforms that fit your processes, your data, and your growth curve.',
    longDescription: 'Off-the-shelf systems force your business to bend. We do the opposite — we build CRM and ERP platforms that mirror exactly how your team already works, then make every workflow faster.',
    capabilities: ['Custom CRM platforms with sales pipelines & automation', 'ERP systems (finance, HR, inventory, procurement)', 'Salesforce, HubSpot & Zoho customisation', 'Real-time dashboards & business intelligence', 'Workflow automation & approval engines', 'Multi-tenant & multi-currency support'],
    technologies: ['PostgreSQL', 'Node.js', 'Next.js', '.NET', 'Power BI', 'Salesforce', 'Odoo'],
    deliverables: ['Branded CRM/ERP platform with admin & user roles', 'Data migration from existing systems', 'Team training & onboarding sessions', 'Reporting & dashboard module'],
    metaTitle: 'Custom CRM & ERP Development | Codenexsis Technologies',
    metaDescription: 'Tailored CRM and ERP development. Codenexsis Technologies builds custom business platforms for sales, finance, inventory, HR, and reporting.',
  },
  {
    slug: 'mobile-app-development', number: '03', title: 'Mobile Application Development',
    shortTitle: 'Mobile Apps', category: 'build', icon: 'Smartphone',
    tagline: 'Native-grade experiences. Cross-platform speed.',
    description: 'iOS, Android, and cross-platform apps that feel handcrafted on every device.',
    longDescription: 'A mobile app is the front door to your product. We design and ship apps people open every day — fluid animations, offline-first architecture, and tight integration with the rest of your stack.',
    capabilities: ['iOS development (Swift, SwiftUI)', 'Android development (Kotlin, Jetpack Compose)', 'Cross-platform (React Native, Flutter)', 'App Store & Play Store launch & ASO', 'Push notifications, deep linking & analytics', 'Offline-first sync & background processing'],
    technologies: ['Swift', 'Kotlin', 'React Native', 'Flutter', 'Firebase', 'Expo', 'GraphQL'],
    deliverables: ['Production iOS & Android builds', 'Store-listing assets & ASO copy', 'Crash reporting & analytics dashboard', 'Source code, signing certificates & handover docs'],
    metaTitle: 'Mobile App Development (iOS & Android) | Codenexsis',
    metaDescription: 'Mobile app development for iOS and Android. Codenexsis Technologies builds native and cross-platform apps with Swift, Kotlin, React Native, and Flutter.',
  },
  {
    slug: 'web-development', number: '04', title: 'Web Development & Design',
    shortTitle: 'Web Development', category: 'build', icon: 'Globe',
    tagline: 'Websites that load fast — and convert faster.',
    description: 'High-performance marketing sites, e-commerce, and web platforms built for SEO and speed.',
    longDescription: 'Your website is your hardest-working sales rep. We design and build sites that score 95+ on Lighthouse, rank on Google, and turn visitors into pipeline.',
    capabilities: ['Next.js / React marketing websites', 'Headless CMS (Sanity, Contentful, Strapi)', 'E-commerce (Shopify, WooCommerce, headless)', 'Technical SEO & Core Web Vitals optimisation', 'Conversion-rate optimisation & A/B testing', 'Accessibility (WCAG 2.2 AA) compliance'],
    technologies: ['Next.js', 'React', 'Sanity', 'Shopify', 'Vercel', 'GA4'],
    deliverables: ['Production website with CMS', 'Lighthouse 95+ across all metrics', 'Technical SEO setup & sitemap', 'Analytics & conversion tracking'],
    metaTitle: 'Web Development & SEO-Ready Websites | Codenexsis',
    metaDescription: 'Web development services with Next.js, React, and headless CMS. SEO-ready, accessible, and Lighthouse-optimised websites.',
  },
  {
    slug: 'cybersecurity-services', number: '05', title: 'Cybersecurity Services',
    shortTitle: 'Cybersecurity', category: 'secure', icon: 'ShieldCheck',
    tagline: 'Defence designed by people who break things for a living.',
    description: "Threat modelling, security architecture, and 24/7 protection for businesses that can't afford to be breached.",
    longDescription: "Security isn't a checkbox — it's a discipline. Our team helps you understand your real attack surface, harden every layer, and respond when something goes wrong.",
    capabilities: ['Security audits & ISO 27001 / SOC 2 readiness', 'Cloud security (AWS, Azure, GCP)', 'Identity & access management (IAM, Zero Trust)', 'SIEM, SOC & managed detection & response', 'Incident response & forensics', 'Security awareness training for staff'],
    technologies: ['AWS Security Hub', 'Wazuh', 'Crowdstrike', 'Okta', 'HashiCorp Vault', 'Snyk'],
    deliverables: ['Risk register & threat model', 'Hardening implementation & policies', 'Continuous monitoring setup', 'Executive-ready compliance report'],
    metaTitle: 'Cybersecurity Services & Consulting | Codenexsis',
    metaDescription: 'Cybersecurity services from Codenexsis Technologies — security audits, ISO 27001 readiness, cloud security, IAM, SOC, and incident response.',
  },
  {
    slug: 'penetration-testing', number: '06', title: 'Penetration Testing',
    shortTitle: 'Pentesting', category: 'secure', icon: 'Bug',
    tagline: 'We find what the auditors miss.',
    description: 'Real-world offensive security testing across web, mobile, cloud, network, and social layers.',
    longDescription: 'Penetration tests that go beyond automated scans. Our certified offensive team thinks like the adversary and reports like a board member.',
    capabilities: ['Web application penetration testing (OWASP Top 10)', 'Mobile app pentesting (iOS & Android)', 'Network & infrastructure penetration testing', 'Cloud configuration review (AWS, Azure, GCP)', 'Red team & adversary emulation', 'Social engineering & phishing simulations'],
    technologies: ['Burp Suite Pro', 'Metasploit', 'Cobalt Strike', 'Nmap', 'OWASP ZAP', 'Frida'],
    deliverables: ['Executive summary + technical report', 'CVSS-scored vulnerability list', 'Proof-of-concept exploits', 'Remediation re-test included'],
    metaTitle: 'Penetration Testing Services | Codenexsis Technologies',
    metaDescription: 'Penetration testing services by certified offensive security engineers. Web, mobile, network, and cloud pentests with actionable remediation reports.',
  },
  {
    slug: 'it-setup-networking', number: '07', title: 'IT Setup & Networking',
    shortTitle: 'IT & Networking', category: 'secure', icon: 'Network',
    tagline: "Networks, servers, and support — quietly running so you don't have to.",
    description: 'End-to-end IT infrastructure — office networks, servers, endpoints, and 24/7 managed support.',
    longDescription: "When you grow, your IT shouldn't be the bottleneck. We design, deploy, and manage the networks, servers, and endpoints behind your business — so your team stays productive and your data stays safe.",
    capabilities: ['LAN/WAN design, structured cabling & Wi-Fi 6/7 deployment', 'Firewalls, VPN, SD-WAN & Zero-Trust networking', 'Server provisioning (on-prem, hybrid, cloud)', 'Microsoft 365 & Google Workspace deployment', 'Endpoint management, MDM & device hardening', 'Managed IT support & 24/7 helpdesk'],
    technologies: ['Cisco Meraki', 'Fortinet', 'Ubiquiti', 'Microsoft 365', 'Google Workspace', 'Active Directory', 'Intune', 'pfSense'],
    deliverables: ['Network architecture diagram & implementation', 'Hardware procurement, racking & commissioning', 'Monitoring, alerting & runbooks', 'Ongoing managed support SLA'],
    metaTitle: 'IT Setup & Networking Services | Codenexsis Technologies',
    metaDescription: 'IT setup, networking, and managed support services. Codenexsis designs and runs office networks, servers, Microsoft 365, and 24/7 helpdesk for growing businesses.',
  },
  {
    slug: 'saas-development', number: '08', title: 'SaaS Product Development',
    shortTitle: 'SaaS Development', category: 'scale', icon: 'CloudCog',
    tagline: 'From whiteboard to MRR.',
    description: 'We help founders and product teams launch SaaS platforms that scale from MVP to enterprise.',
    longDescription: "Building a SaaS isn't just code — it's billing, multi-tenancy, RBAC, observability, and a UX that converts. We architect your platform for the path you're actually on.",
    capabilities: ['Multi-tenant SaaS architecture', 'Subscription billing (Stripe, Paddle, Lemon Squeezy)', 'RBAC, SSO, SAML & SCIM', 'Analytics, telemetry & feature flags', 'Marketing site + product app + admin console', 'SOC 2 / ISO 27001 readiness'],
    technologies: ['Next.js', 'TypeScript', 'Postgres', 'Stripe', 'Auth0', 'Vercel', 'AWS'],
    deliverables: ['Production SaaS platform with tenant onboarding', 'Billing, usage metering & customer portal', 'Admin console & analytics dashboard', 'Launch playbook & growth instrumentation'],
    metaTitle: 'SaaS Development Company | Codenexsis Technologies',
    metaDescription: 'SaaS development services from MVP to scale. Multi-tenant architecture, Stripe billing, SSO, and analytics — engineered by Codenexsis Technologies.',
  },
  {
    slug: 'cloud-devops', number: '09', title: 'Cloud & DevOps',
    shortTitle: 'Cloud / DevOps', category: 'scale', icon: 'Cloud',
    tagline: 'Infrastructure that scales itself.',
    description: 'AWS, Azure, GCP. Kubernetes. CI/CD. Observability. Cloud platforms built to be cost-efficient and easy to maintain.',
    longDescription: 'Most cloud bills are 30–50% larger than they should be — and most outages start with infrastructure no one fully understood. We architect, automate, and maintain cloud platforms that are fast, cheap, and resilient.',
    capabilities: ['Cloud architecture (AWS, Azure, GCP) & migrations', 'Kubernetes / EKS / AKS / GKE provisioning', 'Infrastructure-as-Code (Terraform, Pulumi)', 'CI/CD pipelines (GitHub Actions, GitLab, ArgoCD)', 'Observability (Datadog, Grafana, OpenTelemetry)', 'FinOps & cloud cost optimisation'],
    technologies: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Terraform', 'ArgoCD', 'GitHub Actions', 'Datadog'],
    deliverables: ['Production cloud environment provisioned via IaC', 'CI/CD pipelines with auto-deploy & rollback', 'Monitoring, alerting & on-call runbooks', 'Cost-optimisation report (typically 25–40% savings)'],
    metaTitle: 'Cloud & DevOps Services (AWS, Azure, GCP) | Codenexsis',
    metaDescription: 'Cloud and DevOps services from Codenexsis Technologies — AWS, Azure, GCP architecture, Kubernetes, Terraform, CI/CD, observability, and cost optimisation.',
  },
  {
    slug: 'ai-automation', number: '10', title: 'AI & Automation',
    shortTitle: 'AI & Automation', category: 'scale', icon: 'Cpu',
    tagline: 'Models, agents, and pipelines that earn their keep.',
    description: 'Practical AI integrations — from RAG chatbots to internal copilots and intelligent automations.',
    longDescription: "AI shouldn't be a science fair. We build production AI features that move a metric: support deflection, faster onboarding, smarter search, automated reporting.",
    capabilities: ['LLM-powered chatbots & RAG systems', 'Internal copilots & agentic workflows', 'Document intelligence & OCR pipelines', 'Workflow automation (n8n, Zapier, custom)', 'Vector databases & semantic search', 'Model evaluation, guardrails & monitoring'],
    technologies: ['OpenAI', 'Anthropic Claude', 'LangChain', 'Pinecone', 'pgvector', 'n8n', 'Python'],
    deliverables: ['Deployed AI feature integrated into your stack', 'Eval suite & guardrail policies', 'Cost & latency dashboards', 'Internal training & handover'],
    metaTitle: 'AI Development & Automation | Codenexsis Technologies',
    metaDescription: 'AI development and automation by Codenexsis Technologies — RAG chatbots, agentic workflows, document intelligence, and intelligent business automation.',
  },
  {
    slug: 'ai-services', number: '11', title: 'AI Services & Custom Models',
    shortTitle: 'AI Services', category: 'scale', icon: 'BrainCircuit',
    tagline: 'Your own AI. Your data. No third-party APIs.',
    description: "We design, train, and deploy proprietary AI and automation systems on your own data — no OpenAI, no external APIs, no vendor lock-in.",
    longDescription: "Most \"AI\" products are thin wrappers around someone else's API, which means your data leaves your walls and your roadmap depends on a vendor. We build the opposite: AI systems trained from the ground up on your own data, running on infrastructure you control. From data engineering and model training to evaluation, guardrails, and private deployment, we own the full machine-learning lifecycle so your intelligence stays yours.",
    capabilities: ['Custom model training on your proprietary data (no third-party LLM APIs)', 'In-house ML pipelines — data labelling, training, fine-tuning & evaluation', 'Private, on-prem or VPC deployment with full data ownership', 'Self-hosted automation engines & autonomous AI agents', 'Computer vision, NLP, forecasting & recommendation models', 'MLOps: versioning, monitoring, drift detection & retraining'],
    technologies: ['PyTorch', 'TensorFlow', 'Hugging Face', 'ONNX', 'Ray', 'MLflow', 'Triton', 'Kubernetes'],
    deliverables: ['Trained, owned model with weights and documentation you keep', 'Reproducible training & data pipeline (MLOps)', 'Private inference deployment (on-prem / VPC) with API', 'Evaluation suite, guardrails & retraining playbook'],
    keywords: ['AI services UAE', 'custom AI model development', 'private AI without third party API', 'machine learning development', 'AI automation system'],
    metaTitle: 'AI Services & Custom Model Development (No Third-Party APIs) | Codenexsis',
    metaDescription: 'Codenexsis builds proprietary AI systems and custom-trained models on your own data — no OpenAI or third-party APIs. In-house ML pipelines, private deployment, and full data ownership.',
  },
  {
    slug: 'seo-services', number: '12', title: 'SEO Services & Keyword Strategy',
    shortTitle: 'SEO Services', category: 'market', group: 'seo', icon: 'Search',
    tagline: 'Rank for the keywords that actually bring revenue.',
    description: 'Technical SEO, keyword research, and content strategy engineered to put you on page one for the searches your customers make.',
    longDescription: 'SEO is engineering, not guesswork. We start with deep keyword and intent research, audit your technical foundation against Core Web Vitals, then build a content and link strategy mapped to the buyer journey. Every change is measured, so you can see rankings, traffic, and pipeline move — not just vanity impressions.',
    capabilities: ['Keyword research, intent mapping & competitor gap analysis', 'Technical SEO audits & Core Web Vitals optimisation', 'On-page optimisation, schema markup & internal linking', 'Content strategy & SEO copywriting mapped to search intent', 'Local & international SEO (hreflang, GMB, multi-region)', 'Authority building, digital PR & monthly performance reporting'],
    technologies: ['Ahrefs', 'Semrush', 'Google Search Console', 'GA4', 'Screaming Frog', 'Schema.org', 'Next.js'],
    deliverables: ['Keyword strategy & prioritised content roadmap', 'Technical SEO audit with fixes implemented', 'On-page optimisation & structured data rollout', 'Monthly rankings, traffic & conversion reporting'],
    keywords: ['SEO services UAE', 'SEO services Dubai', 'keyword research and strategy', 'technical SEO', 'Core Web Vitals'],
    metaTitle: 'SEO Services & Keyword Strategy in UAE | Codenexsis Technologies',
    metaDescription: 'SEO services from Codenexsis — keyword research, technical SEO, Core Web Vitals, schema markup, and content strategy that ranks you for the keywords that drive revenue.',
  },
  {
    slug: 'local-seo', number: '13', title: 'Local SEO & Google Business Profile',
    shortTitle: 'Local SEO', category: 'market', group: 'seo', icon: 'MapPin',
    tagline: 'Own the map pack in every city you serve.',
    description: 'Get found by nearby customers — optimised Google Business Profile, local citations, and review strategy that wins the map pack.',
    longDescription: 'When someone searches "near me", you want to be the first result with the most reviews. We optimise your Google Business Profile, build consistent local citations, manage reviews, and target geo-specific keywords so you dominate local search across every location and service area you cover.',
    capabilities: ['Google Business Profile optimisation & management', 'Local citation building & NAP consistency cleanup', 'Review generation strategy & reputation management', 'Geo-targeted keyword & landing-page strategy', 'Local link building & directory listings', 'Map-pack ranking tracking by location'],
    technologies: ['Google Business Profile', 'BrightLocal', 'Semrush Local', 'Schema.org', 'GA4'],
    deliverables: ['Optimised Google Business Profile', 'Local citation audit & cleanup', 'Review acquisition system', 'Monthly local-ranking report by city'],
    keywords: ['local SEO UAE', 'Google Business Profile optimisation', 'map pack ranking', 'near me SEO'],
    metaTitle: 'Local SEO & Google Business Profile Services | Codenexsis',
    metaDescription: 'Local SEO services — Google Business Profile optimisation, citations, reviews, and geo-targeted strategy to win the map pack and attract nearby customers.',
  },
  {
    slug: 'ecommerce-seo', number: '14', title: 'E-commerce SEO',
    shortTitle: 'E-commerce SEO', category: 'market', group: 'seo', icon: 'ShoppingCart',
    tagline: 'Turn product pages into organic revenue engines.',
    description: 'Category and product-page SEO, structured data, and site architecture that grows organic sales for online stores.',
    longDescription: 'E-commerce SEO is its own discipline — thousands of pages, faceted navigation, duplicate content risks, and product schema. We fix crawl and indexation issues at scale, optimise category and product pages for buyer-intent keywords, and implement rich-result schema so your products earn clicks straight from search.',
    capabilities: ['Product & category page keyword optimisation', 'Product, review & FAQ schema for rich results', 'Faceted navigation & crawl-budget management', 'Duplicate-content & canonicalisation fixes', 'Site architecture & internal linking at scale', 'Shopping feed & merchant-listing optimisation'],
    technologies: ['Shopify', 'WooCommerce', 'Screaming Frog', 'Ahrefs', 'Schema.org', 'Google Merchant Center'],
    deliverables: ['Technical e-commerce SEO audit', 'Optimised category & product templates', 'Product schema & rich-result rollout', 'Organic revenue & ranking dashboard'],
    keywords: ['ecommerce SEO', 'Shopify SEO', 'product page SEO', 'online store SEO'],
    metaTitle: 'E-commerce SEO Services for Online Stores | Codenexsis',
    metaDescription: 'E-commerce SEO — product and category optimisation, product schema, crawl-budget and site-architecture fixes that grow organic sales for Shopify and WooCommerce stores.',
  },
  {
    slug: 'ppc-google-ads', number: '15', title: 'PPC & Google Ads Management',
    shortTitle: 'PPC / Google Ads', category: 'market', group: 'paid', icon: 'MousePointerClick',
    tagline: 'Profitable clicks, not just cheap ones.',
    description: 'Search, Shopping, and Performance Max campaigns engineered around conversions and return on ad spend — not vanity clicks.',
    longDescription: 'Most ad accounts quietly waste budget on the wrong searches. We restructure your Google Ads around tight intent, ruthless negative keywords, and conversion tracking that actually fires, then optimise toward ROAS week over week. You see exactly what every dirham returns.',
    capabilities: ['Google Search, Shopping & Performance Max campaigns', 'Keyword & negative-keyword strategy', 'Conversion tracking & offline-conversion import', 'Ad copy testing & landing-page alignment', 'Bid strategy & budget pacing for target ROAS', 'Competitor & auction-insights analysis'],
    technologies: ['Google Ads', 'Google Tag Manager', 'GA4', 'Looker Studio', 'Microsoft Ads'],
    deliverables: ['Restructured, conversion-tracked ad account', 'Campaign build with ad groups & creative', 'Weekly optimisation & ROAS reporting', 'Transparent spend & performance dashboard'],
    keywords: ['PPC management UAE', 'Google Ads agency', 'paid search management', 'ROAS optimisation'],
    metaTitle: 'PPC & Google Ads Management Services | Codenexsis',
    metaDescription: 'PPC and Google Ads management — Search, Shopping, and Performance Max campaigns optimised for conversions and ROAS, with transparent tracking and reporting.',
  },
  {
    slug: 'social-media-advertising', number: '16', title: 'Social Media Advertising',
    shortTitle: 'Social Ads (Meta/TikTok)', category: 'market', group: 'paid', icon: 'Target',
    tagline: 'Stop the scroll. Drive the sale.',
    description: 'Paid social on Meta, TikTok, and LinkedIn — creative, targeting, and funnels built to acquire customers at scale.',
    longDescription: 'Paid social rewards great creative and tight funnels. We build full-funnel campaigns across Meta, TikTok, and LinkedIn — from thumb-stopping creative and audience strategy to retargeting and conversion-API tracking — so every dirham of spend is measured against real pipeline.',
    capabilities: ['Meta (Facebook/Instagram), TikTok & LinkedIn ads', 'Full-funnel campaign & audience strategy', 'Ad creative direction & A/B testing', 'Retargeting & lookalike audience building', 'Conversions API & pixel tracking setup', 'Lead-gen & e-commerce sales campaigns'],
    technologies: ['Meta Ads Manager', 'TikTok Ads', 'LinkedIn Campaign Manager', 'Conversions API', 'GA4'],
    deliverables: ['Full-funnel paid social campaigns', 'Creative testing framework', 'Pixel & Conversions API tracking', 'Weekly performance & CAC reporting'],
    keywords: ['social media advertising', 'Meta ads agency', 'TikTok ads', 'paid social UAE'],
    metaTitle: 'Social Media Advertising (Meta, TikTok, LinkedIn) | Codenexsis',
    metaDescription: 'Paid social advertising on Meta, TikTok, and LinkedIn — full-funnel creative, targeting, retargeting, and conversion tracking that acquires customers at scale.',
  },
  {
    slug: 'social-media-management', number: '17', title: 'Social Media Management',
    shortTitle: 'Social Media Management', category: 'market', group: 'social', icon: 'Share2',
    tagline: 'A brand presence that shows up — consistently.',
    description: 'Strategy, content calendars, and community management that keep your brand active and engaging across every platform.',
    longDescription: 'Consistency builds trust. We run your organic social end to end — content strategy, monthly calendars, on-brand creative, scheduling, and community management — so your channels stay active, on-message, and growing without you lifting a finger.',
    capabilities: ['Channel strategy & monthly content calendars', 'On-brand graphic & short-form video creation', 'Copywriting & hashtag strategy', 'Scheduling & publishing across platforms', 'Community management & engagement', 'Follower growth & engagement reporting'],
    technologies: ['Meta Business Suite', 'Buffer', 'Later', 'Canva', 'CapCut'],
    deliverables: ['Social strategy & brand content pillars', 'Monthly content calendar & creative', 'Scheduled, published posts', 'Monthly growth & engagement report'],
    keywords: ['social media management', 'social media agency UAE', 'content calendar', 'community management'],
    metaTitle: 'Social Media Management Services | Codenexsis Technologies',
    metaDescription: 'Social media management — strategy, content calendars, branded creative, scheduling, and community management that keep your brand consistent and growing.',
  },
  {
    slug: 'content-marketing', number: '18', title: 'Content Marketing & Copywriting',
    shortTitle: 'Content Marketing', category: 'market', group: 'social', icon: 'PenTool',
    tagline: 'Content that ranks, reads, and converts.',
    description: 'SEO-driven blogs, landing pages, and thought leadership mapped to your funnel and your target keywords.',
    longDescription: 'Great content does double duty — it ranks in search and it persuades. We build a content engine around keyword and intent research, then produce blogs, landing pages, and thought-leadership pieces that attract the right audience and move them toward a decision.',
    capabilities: ['Content strategy mapped to the buyer journey', 'SEO blog & article writing', 'Landing-page & conversion copywriting', 'Thought leadership & long-form guides', 'Editorial calendars & topic clusters', 'Content refresh & performance optimisation'],
    technologies: ['Ahrefs', 'Surfer SEO', 'Google Docs', 'Grammarly', 'GA4'],
    deliverables: ['Content strategy & topic-cluster plan', 'Editorial calendar', 'SEO-optimised articles & landing copy', 'Content performance reporting'],
    keywords: ['content marketing', 'SEO copywriting', 'content strategy', 'blog writing service'],
    metaTitle: 'Content Marketing & SEO Copywriting Services | Codenexsis',
    metaDescription: 'Content marketing and copywriting — SEO blogs, landing pages, and thought leadership mapped to your funnel and target keywords to attract and convert the right audience.',
  },
  {
    slug: 'email-marketing', number: '19', title: 'Email Marketing & Automation',
    shortTitle: 'Email Marketing', category: 'market', group: 'social', icon: 'MailCheck',
    tagline: 'The channel you actually own.',
    description: 'Lifecycle email and automation — welcome, nurture, cart-recovery, and retention flows that drive repeat revenue.',
    longDescription: 'Email remains the highest-ROI channel because you own the audience. We design and build automated flows — welcome, nurture, abandoned-cart, post-purchase, and win-back — plus campaign calendars and segmentation, so revenue keeps coming without extra ad spend.',
    capabilities: ['Lifecycle & automation flow design', 'Welcome, nurture, cart-recovery & win-back flows', 'List segmentation & personalisation', 'Campaign calendar & broadcast sends', 'Template design & deliverability setup', 'A/B testing & revenue attribution'],
    technologies: ['Klaviyo', 'Mailchimp', 'HubSpot', 'Customer.io', 'Postmark'],
    deliverables: ['Core automation flows built & live', 'Segmentation & list hygiene setup', 'Branded email templates', 'Monthly email revenue report'],
    keywords: ['email marketing', 'marketing automation', 'Klaviyo agency', 'email flows'],
    metaTitle: 'Email Marketing & Automation Services | Codenexsis',
    metaDescription: 'Email marketing and automation — welcome, nurture, cart-recovery, and retention flows with segmentation and reporting that drive repeat revenue from owned audiences.',
  },
  {
    slug: 'conversion-rate-optimization', number: '20', title: 'Conversion Rate Optimization (CRO)',
    shortTitle: 'CRO', category: 'market', group: 'analytics', icon: 'TrendingUp',
    tagline: 'Get more from the traffic you already have.',
    description: 'Data-led testing of pages and funnels to lift conversion rate — turning existing visitors into more customers.',
    longDescription: 'Doubling conversion rate is cheaper than doubling traffic. We analyse how users actually behave with heatmaps and session recordings, find the friction, then run structured A/B tests on your highest-impact pages so more of your existing visitors take action.',
    capabilities: ['Conversion & funnel audits', 'Heatmaps & session-recording analysis', 'A/B & multivariate testing', 'Landing-page & checkout optimisation', 'Form & lead-capture optimisation', 'Hypothesis-driven experiment roadmap'],
    technologies: ['Hotjar', 'Microsoft Clarity', 'GA4', 'VWO', 'Optimizely'],
    deliverables: ['CRO audit & friction analysis', 'Prioritised experiment roadmap', 'Running A/B tests with results', 'Conversion-lift reporting'],
    keywords: ['conversion rate optimization', 'CRO agency', 'A/B testing', 'landing page optimisation'],
    metaTitle: 'Conversion Rate Optimization (CRO) Services | Codenexsis',
    metaDescription: 'Conversion rate optimization — heatmaps, session analysis, and structured A/B testing on your key pages to convert more of your existing traffic into customers.',
  },
  {
    slug: 'analytics-reporting', number: '21', title: 'Analytics, Tracking & Reporting',
    shortTitle: 'Analytics & Reporting', category: 'market', group: 'analytics', icon: 'BarChart3',
    tagline: 'Know exactly what every channel returns.',
    description: 'GA4, server-side tracking, and live dashboards that tie marketing spend to real revenue you can see.',
    longDescription: 'You cannot optimise what you cannot measure. We set up clean, accurate tracking — GA4, Tag Manager, server-side and conversion tracking — and build live dashboards that connect every channel to leads and revenue, so decisions are based on data, not guesses.',
    capabilities: ['GA4 & Google Tag Manager implementation', 'Server-side & conversion tracking setup', 'Cross-channel attribution modelling', 'Custom Looker Studio dashboards', 'Goal, event & e-commerce tracking', 'Data accuracy audits & QA'],
    technologies: ['GA4', 'Google Tag Manager', 'Looker Studio', 'BigQuery', 'Server-side GTM'],
    deliverables: ['Accurate GA4 & GTM setup', 'Conversion & event tracking plan', 'Live marketing dashboard', 'Monthly performance reporting'],
    keywords: ['marketing analytics', 'GA4 setup', 'conversion tracking', 'Looker Studio dashboard'],
    metaTitle: 'Marketing Analytics, Tracking & Reporting Services | Codenexsis',
    metaDescription: 'Marketing analytics and reporting — GA4, Tag Manager, server-side tracking, attribution, and live dashboards that tie spend to revenue across every channel.',
  },
  {
    slug: 'digital-pr-outreach', number: '22', title: 'Digital PR & Link Building',
    shortTitle: 'Digital PR', category: 'market', group: 'seo', icon: 'Megaphone',
    tagline: 'Authority you earn, not buy.',
    description: 'Earned coverage and high-authority backlinks that lift domain authority and search rankings the right way.',
    longDescription: 'Backlinks still move rankings — but only the right ones. We earn authoritative, editorially-given links through digital PR: data stories, expert commentary, and outreach to publications your audience trusts. The result is stronger domain authority, referral traffic, and brand credibility.',
    capabilities: ['Digital PR campaigns & data-driven stories', 'Journalist & publication outreach', 'High-authority link acquisition', 'Expert commentary & HARO-style placements', 'Brand mention & unlinked-mention reclamation', 'Backlink audit & disavow management'],
    technologies: ['Ahrefs', 'Semrush', 'BuzzStream', 'Muck Rack', 'Respona'],
    deliverables: ['Digital PR campaign concepts', 'Outreach & placement reporting', 'Earned high-authority backlinks', 'Backlink profile growth report'],
    keywords: ['digital PR', 'link building', 'backlink acquisition', 'domain authority'],
    metaTitle: 'Digital PR & Link Building Services | Codenexsis Technologies',
    metaDescription: 'Digital PR and link building — earned media, data-driven stories, and high-authority backlinks that grow domain authority and rankings the sustainable way.',
  },
];

const seoMeta = [
  { path: '/', title: 'Codenexsis Technologies — The connection between code and outcome.', description: 'Codenexsis Technologies builds enterprise software, proprietary AI, cybersecurity, cloud, and the IT backbone behind ambitious companies.', keywords: ['software development company UAE', 'custom AI model development', 'SEO services UAE'] },
  { path: '/services', title: 'Services — Custom Software, AI, Cybersecurity, SEO', description: 'Twelve disciplines, one senior team — software, proprietary AI, cybersecurity, cloud, and SEO.', keywords: ['software development services', 'AI services', 'SEO services'] },
];

const testimonials = [
  { author: 'A. Rahman', role: 'CTO', company: 'Gulf Logistics Group', quote: 'Codenexsis rebuilt our ERP and trained a forecasting model entirely on our own data. No vendor lock-in, and the accuracy speaks for itself.', rating: 5, order: 1 },
  { author: 'S. Müller', role: 'Head of Product', company: 'Berlin FinTech', quote: 'They shipped a multi-tenant SaaS platform faster than our last two agencies combined. Senior people, no hand-holding required.', rating: 5, order: 2 },
  { author: 'F. Khan', role: 'Founder', company: 'RetailOS', quote: 'Our organic traffic tripled in six months. The SEO work was technical, measurable, and tied directly to pipeline.', rating: 5, order: 3 },
];

const settings = [
  { key: 'contact', value: { email: 'info@codenexsis.com', phone: '+971 50 000 0000', address: 'Abu Dhabi, United Arab Emirates', hours: 'Sun – Thu, 9:00 – 18:00 GST' } },
  { key: 'social', value: { linkedin: 'https://linkedin.com/company/codenexsis', twitter: 'https://twitter.com/codenexsis', github: 'https://github.com/codenexsis', instagram: 'https://instagram.com/codenexsis' } },
];

async function main() {
  const email = process.env.ADMIN_EMAIL ?? 'admin@codenexsis.com';
  const password = process.env.ADMIN_PASSWORD ?? 'Admin@12345';
  const name = process.env.ADMIN_NAME ?? 'Codenexsis Admin';

  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.upsert({
    where: { email },
    create: { email, name, password: hashed, role: 'ADMIN' },
    update: {},
  });
  console.log(`✓ Admin user ready: ${email}`);

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      create: { ...s, order: parseInt(s.number, 10), keywords: s.keywords ?? [] },
      update: { ...s, order: parseInt(s.number, 10), keywords: s.keywords ?? [] },
    });
  }
  console.log(`✓ Seeded ${services.length} services`);

  for (const m of seoMeta) {
    await prisma.seoMeta.upsert({ where: { path: m.path }, create: m, update: m });
  }
  console.log(`✓ Seeded ${seoMeta.length} SEO overrides`);

  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({ where: { author: t.author, company: t.company } });
    if (!existing) await prisma.testimonial.create({ data: t });
  }
  console.log(`✓ Seeded testimonials`);

  for (const st of settings) {
    await prisma.setting.upsert({ where: { key: st.key }, create: st, update: st });
  }
  console.log(`✓ Seeded settings`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
