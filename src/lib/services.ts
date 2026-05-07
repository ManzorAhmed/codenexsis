import {
  Code2,
  Database,
  Smartphone,
  Globe,
  ShieldCheck,
  Bug,
  Network,
  CloudCog,
  Cloud,
  Cpu,
  type LucideIcon,
} from 'lucide-react';

export type ServiceCategory = 'build' | 'secure' | 'scale';

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  category: ServiceCategory;
  number: string;
  tagline: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  capabilities: string[];
  technologies: string[];
  deliverables: string[];
  metaTitle: string;
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: 'software-development',
    number: '01',
    title: 'Custom Software Development',
    shortTitle: 'Software Development',
    category: 'build',
    tagline: 'Bespoke systems engineered to outlast trends.',
    description:
      'End-to-end custom software built around your operations — not the other way around.',
    longDescription:
      'We build production-grade software for ambitious teams. From discovery and architecture to deployment and post-launch support, every line of code is written with performance, security, and scale in mind.',
    icon: Code2,
    capabilities: [
      'Discovery, scoping & technical architecture',
      'Full-stack web application development',
      'API design (REST, GraphQL, gRPC) & integrations',
      'Microservices & event-driven systems',
      'Legacy modernisation & refactoring',
      'DevOps, CI/CD & observability',
    ],
    technologies: ['Next.js', 'Node.js', 'TypeScript', 'Python', 'Go', 'PostgreSQL', 'Redis', 'AWS'],
    deliverables: [
      'Production-ready codebase with documentation',
      'CI/CD pipeline & automated test suite',
      'Architecture diagrams & runbooks',
      '90-day post-launch hypercare',
    ],
    metaTitle: 'Custom Software Development | Codenexsis Technologies',
    metaDescription:
      'Custom software development by Codenexsis Technologies — bespoke web platforms, APIs, and enterprise systems built with Next.js, Node.js, Python, and Go.',
  },
  {
    slug: 'crm-erp-development',
    number: '02',
    title: 'CRM & ERP Development',
    shortTitle: 'CRM / ERP',
    category: 'build',
    tagline: 'One source of truth, across every department.',
    description:
      'Custom CRM and ERP platforms that fit your processes, your data, and your growth curve.',
    longDescription:
      'Off-the-shelf systems force your business to bend. We do the opposite — we build CRM and ERP platforms that mirror exactly how your team already works, then make every workflow faster.',
    icon: Database,
    capabilities: [
      'Custom CRM platforms with sales pipelines & automation',
      'ERP systems (finance, HR, inventory, procurement)',
      'Salesforce, HubSpot & Zoho customisation',
      'Real-time dashboards & business intelligence',
      'Workflow automation & approval engines',
      'Multi-tenant & multi-currency support',
    ],
    technologies: ['PostgreSQL', 'Node.js', 'Next.js', '.NET', 'Power BI', 'Salesforce', 'Odoo'],
    deliverables: [
      'Branded CRM/ERP platform with admin & user roles',
      'Data migration from existing systems',
      'Team training & onboarding sessions',
      'Reporting & dashboard module',
    ],
    metaTitle: 'Custom CRM & ERP Development | Codenexsis Technologies',
    metaDescription:
      'Tailored CRM and ERP development. Codenexsis Technologies builds custom business platforms for sales, finance, inventory, HR, and reporting.',
  },
  {
    slug: 'mobile-app-development',
    number: '03',
    title: 'Mobile Application Development',
    shortTitle: 'Mobile Apps',
    category: 'build',
    tagline: 'Native-grade experiences. Cross-platform speed.',
    description: 'iOS, Android, and cross-platform apps that feel handcrafted on every device.',
    longDescription:
      'A mobile app is the front door to your product. We design and ship apps people open every day — fluid animations, offline-first architecture, and tight integration with the rest of your stack.',
    icon: Smartphone,
    capabilities: [
      'iOS development (Swift, SwiftUI)',
      'Android development (Kotlin, Jetpack Compose)',
      'Cross-platform (React Native, Flutter)',
      'App Store & Play Store launch & ASO',
      'Push notifications, deep linking & analytics',
      'Offline-first sync & background processing',
    ],
    technologies: ['Swift', 'Kotlin', 'React Native', 'Flutter', 'Firebase', 'Expo', 'GraphQL'],
    deliverables: [
      'Production iOS & Android builds',
      'Store-listing assets & ASO copy',
      'Crash reporting & analytics dashboard',
      'Source code, signing certificates & handover docs',
    ],
    metaTitle: 'Mobile App Development (iOS & Android) | Codenexsis',
    metaDescription:
      'Mobile app development for iOS and Android. Codenexsis Technologies builds native and cross-platform apps with Swift, Kotlin, React Native, and Flutter.',
  },
  {
    slug: 'web-development',
    number: '04',
    title: 'Web Development & Design',
    shortTitle: 'Web Development',
    category: 'build',
    tagline: 'Websites that load fast — and convert faster.',
    description: 'High-performance marketing sites, e-commerce, and web platforms built for SEO and speed.',
    longDescription:
      'Your website is your hardest-working sales rep. We design and build sites that score 95+ on Lighthouse, rank on Google, and turn visitors into pipeline.',
    icon: Globe,
    capabilities: [
      'Next.js / React marketing websites',
      'Headless CMS (Sanity, Contentful, Strapi)',
      'E-commerce (Shopify, WooCommerce, headless)',
      'Technical SEO & Core Web Vitals optimisation',
      'Conversion-rate optimisation & A/B testing',
      'Accessibility (WCAG 2.2 AA) compliance',
    ],
    technologies: ['Next.js', 'React', 'Sanity', 'Shopify', 'Vercel', 'GA4'],
    deliverables: [
      'Production website with CMS',
      'Lighthouse 95+ across all metrics',
      'Technical SEO setup & sitemap',
      'Analytics & conversion tracking',
    ],
    metaTitle: 'Web Development & SEO-Ready Websites | Codenexsis',
    metaDescription:
      'Web development services with Next.js, React, and headless CMS. SEO-ready, accessible, and Lighthouse-optimised websites.',
  },
  {
    slug: 'cybersecurity-services',
    number: '05',
    title: 'Cybersecurity Services',
    shortTitle: 'Cybersecurity',
    category: 'secure',
    tagline: 'Defence designed by people who break things for a living.',
    description: 'Threat modelling, security architecture, and 24/7 protection for businesses that can\'t afford to be breached.',
    longDescription:
      'Security isn\'t a checkbox — it\'s a discipline. Our team helps you understand your real attack surface, harden every layer, and respond when something goes wrong.',
    icon: ShieldCheck,
    capabilities: [
      'Security audits & ISO 27001 / SOC 2 readiness',
      'Cloud security (AWS, Azure, GCP)',
      'Identity & access management (IAM, Zero Trust)',
      'SIEM, SOC & managed detection & response',
      'Incident response & forensics',
      'Security awareness training for staff',
    ],
    technologies: ['AWS Security Hub', 'Wazuh', 'Crowdstrike', 'Okta', 'HashiCorp Vault', 'Snyk'],
    deliverables: [
      'Risk register & threat model',
      'Hardening implementation & policies',
      'Continuous monitoring setup',
      'Executive-ready compliance report',
    ],
    metaTitle: 'Cybersecurity Services & Consulting | Codenexsis',
    metaDescription:
      'Cybersecurity services from Codenexsis Technologies — security audits, ISO 27001 readiness, cloud security, IAM, SOC, and incident response.',
  },
  {
    slug: 'penetration-testing',
    number: '06',
    title: 'Penetration Testing',
    shortTitle: 'Pentesting',
    category: 'secure',
    tagline: 'We find what the auditors miss.',
    description: 'Real-world offensive security testing across web, mobile, cloud, network, and social layers.',
    longDescription:
      'Penetration tests that go beyond automated scans. Our certified offensive team thinks like the adversary and reports like a board member.',
    icon: Bug,
    capabilities: [
      'Web application penetration testing (OWASP Top 10)',
      'Mobile app pentesting (iOS & Android)',
      'Network & infrastructure penetration testing',
      'Cloud configuration review (AWS, Azure, GCP)',
      'Red team & adversary emulation',
      'Social engineering & phishing simulations',
    ],
    technologies: ['Burp Suite Pro', 'Metasploit', 'Cobalt Strike', 'Nmap', 'OWASP ZAP', 'Frida'],
    deliverables: [
      'Executive summary + technical report',
      'CVSS-scored vulnerability list',
      'Proof-of-concept exploits',
      'Remediation re-test included',
    ],
    metaTitle: 'Penetration Testing Services | Codenexsis Technologies',
    metaDescription:
      'Penetration testing services by certified offensive security engineers. Web, mobile, network, and cloud pentests with actionable remediation reports.',
  },
  {
    slug: 'it-setup-networking',
    number: '07',
    title: 'IT Setup & Networking',
    shortTitle: 'IT & Networking',
    category: 'secure',
    tagline: 'Networks, servers, and support — quietly running so you don\'t have to.',
    description: 'End-to-end IT infrastructure — office networks, servers, endpoints, and 24/7 managed support.',
    longDescription:
      'When you grow, your IT shouldn\'t be the bottleneck. We design, deploy, and manage the networks, servers, and endpoints behind your business — so your team stays productive and your data stays safe.',
    icon: Network,
    capabilities: [
      'LAN/WAN design, structured cabling & Wi-Fi 6/7 deployment',
      'Firewalls, VPN, SD-WAN & Zero-Trust networking',
      'Server provisioning (on-prem, hybrid, cloud)',
      'Microsoft 365 & Google Workspace deployment',
      'Endpoint management, MDM & device hardening',
      'Managed IT support & 24/7 helpdesk',
    ],
    technologies: ['Cisco Meraki', 'Fortinet', 'Ubiquiti', 'Microsoft 365', 'Google Workspace', 'Active Directory', 'Intune', 'pfSense'],
    deliverables: [
      'Network architecture diagram & implementation',
      'Hardware procurement, racking & commissioning',
      'Monitoring, alerting & runbooks',
      'Ongoing managed support SLA',
    ],
    metaTitle: 'IT Setup & Networking Services | Codenexsis Technologies',
    metaDescription:
      'IT setup, networking, and managed support services. Codenexsis designs and runs office networks, servers, Microsoft 365, and 24/7 helpdesk for growing businesses.',
  },
  {
    slug: 'saas-development',
    number: '08',
    title: 'SaaS Product Development',
    shortTitle: 'SaaS Development',
    category: 'scale',
    tagline: 'From whiteboard to MRR.',
    description: 'We help founders and product teams launch SaaS platforms that scale from MVP to enterprise.',
    longDescription:
      'Building a SaaS isn\'t just code — it\'s billing, multi-tenancy, RBAC, observability, and a UX that converts. We architect your platform for the path you\'re actually on.',
    icon: CloudCog,
    capabilities: [
      'Multi-tenant SaaS architecture',
      'Subscription billing (Stripe, Paddle, Lemon Squeezy)',
      'RBAC, SSO, SAML & SCIM',
      'Analytics, telemetry & feature flags',
      'Marketing site + product app + admin console',
      'SOC 2 / ISO 27001 readiness',
    ],
    technologies: ['Next.js', 'TypeScript', 'Postgres', 'Stripe', 'Auth0', 'Vercel', 'AWS'],
    deliverables: [
      'Production SaaS platform with tenant onboarding',
      'Billing, usage metering & customer portal',
      'Admin console & analytics dashboard',
      'Launch playbook & growth instrumentation',
    ],
    metaTitle: 'SaaS Development Company | Codenexsis Technologies',
    metaDescription:
      'SaaS development services from MVP to scale. Multi-tenant architecture, Stripe billing, SSO, and analytics — engineered by Codenexsis Technologies.',
  },
  {
    slug: 'cloud-devops',
    number: '09',
    title: 'Cloud & DevOps',
    shortTitle: 'Cloud / DevOps',
    category: 'scale',
    tagline: 'Infrastructure that scales itself.',
    description: 'AWS, Azure, GCP. Kubernetes. CI/CD. Observability. Cloud platforms built to be cost-efficient and easy to maintain.',
    longDescription:
      'Most cloud bills are 30–50% larger than they should be — and most outages start with infrastructure no one fully understood. We architect, automate, and maintain cloud platforms that are fast, cheap, and resilient.',
    icon: Cloud,
    capabilities: [
      'Cloud architecture (AWS, Azure, GCP) & migrations',
      'Kubernetes / EKS / AKS / GKE provisioning',
      'Infrastructure-as-Code (Terraform, Pulumi)',
      'CI/CD pipelines (GitHub Actions, GitLab, ArgoCD)',
      'Observability (Datadog, Grafana, OpenTelemetry)',
      'FinOps & cloud cost optimisation',
    ],
    technologies: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Terraform', 'ArgoCD', 'GitHub Actions', 'Datadog'],
    deliverables: [
      'Production cloud environment provisioned via IaC',
      'CI/CD pipelines with auto-deploy & rollback',
      'Monitoring, alerting & on-call runbooks',
      'Cost-optimisation report (typically 25–40% savings)',
    ],
    metaTitle: 'Cloud & DevOps Services (AWS, Azure, GCP) | Codenexsis',
    metaDescription:
      'Cloud and DevOps services from Codenexsis Technologies — AWS, Azure, GCP architecture, Kubernetes, Terraform, CI/CD, observability, and cost optimisation.',
  },
  {
    slug: 'ai-automation',
    number: '10',
    title: 'AI & Automation',
    shortTitle: 'AI & Automation',
    category: 'scale',
    tagline: 'Models, agents, and pipelines that earn their keep.',
    description: 'Practical AI integrations — from RAG chatbots to internal copilots and intelligent automations.',
    longDescription:
      'AI shouldn\'t be a science fair. We build production AI features that move a metric: support deflection, faster onboarding, smarter search, automated reporting.',
    icon: Cpu,
    capabilities: [
      'LLM-powered chatbots & RAG systems',
      'Internal copilots & agentic workflows',
      'Document intelligence & OCR pipelines',
      'Workflow automation (n8n, Zapier, custom)',
      'Vector databases & semantic search',
      'Model evaluation, guardrails & monitoring',
    ],
    technologies: ['OpenAI', 'Anthropic Claude', 'LangChain', 'Pinecone', 'pgvector', 'n8n', 'Python'],
    deliverables: [
      'Deployed AI feature integrated into your stack',
      'Eval suite & guardrail policies',
      'Cost & latency dashboards',
      'Internal training & handover',
    ],
    metaTitle: 'AI Development & Automation | Codenexsis Technologies',
    metaDescription:
      'AI development and automation by Codenexsis Technologies — RAG chatbots, agentic workflows, document intelligence, and intelligent business automation.',
  },
];

export const categoryLabels: Record<ServiceCategory, { label: string; description: string }> = {
  build: {
    label: 'Build',
    description: 'Custom platforms, apps, and websites engineered to ship.',
  },
  secure: {
    label: 'Secure & Operate',
    description: 'Cybersecurity, IT, and the networks behind serious businesses.',
  },
  scale: {
    label: 'Scale',
    description: 'SaaS, cloud, and AI that compound over time.',
  },
};

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);

export const servicesByCategory = (cat: ServiceCategory): Service[] =>
  services.filter((s) => s.category === cat);
