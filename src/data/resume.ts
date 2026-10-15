// Single source of truth for site copy. Edit here, not in components.

export type Role = {
  title: string
  period: string
  points: string[]
  link?: { label: string; href: string }
  secondaryLink?: { label: string; href: string }
}

export type Job = {
  company: string
  location: string
  period: string
  blurb: string
  badge?: string
  roles: Role[]
}

export type Pillar = {
  id: string
  index: string
  title: string
  subtitle: string
  description: string
  highlights: string[]
  tags: string[]
}

export type FeaturedSystem = {
  id: string
  slug: string
  badge: string
  category: 'AI Agents' | 'Web3 Multisig' | 'Web3 Governance' | 'AI Research'
  name: string
  role: string
  period: string
  headline: string
  description: string
  points: string[]
  metrics: { value: string; label: string }[]
  stack: string[]
  links: { label: string; href: string; primary?: boolean }[]
}

export const profile = {
  name: 'Aleem Alam',
  title: 'Senior Full-Stack Engineer',
  tagline: 'AI Agent Systems · Web3 Infrastructure · Next.js & TypeScript',
  location: 'Delhi, India · Warsaw, Poland',
  stack: ['Next.js', 'TypeScript', 'AI Agents', 'Web3'],
  email: 'aleem.alam2001@gmail.com',
  phone: '+91 85879 33195',
  github: 'https://github.com/AleemAlam',
  twitter: 'https://x.com/AleemAlam4',
  site: 'https://aleemalam.com',
  resume: '/Aleem_Alam_Resume.pdf',
  avatar: '/aleem-avatar.png',
  availability: 'Available for Senior / Lead Engineering Roles',
  summary:
    'Senior full-stack engineer with 5+ years shipping production web applications. Lead engineer on Polkasafe, a multisig platform securing over $300 million in assets, and senior engineer on Polkassembly. Recently building AI agent systems end to end: tool-calling agents, LLM evaluation, cost control and media-generation pipelines. MSc in Applied Data Analytics & AI.',
}

export const stats = [
  { value: '5+', label: 'Years shipping production web apps', detail: 'SaaS, Web3 & AI systems' },
  { value: '$300M+', label: 'In assets secured by Polkasafe', detail: 'Across Polkadot & EVM chains' },
  { value: '4.55', label: 'Out of 5, agent chat quality after evals', detail: 'Lifted from 3.6 via LLM-as-judge' },
  { value: '1/60', label: 'Of the routing cost, same accuracy', detail: '86% vs 87% Gemini at 3–8× speed' },
]

export const pillars: Pillar[] = [
  {
    id: 'ai-agents',
    index: '01',
    title: 'AI Agent Systems & Evals',
    subtitle: 'Autonomous Workflows · Cost & Quality Engineering',
    description:
      'Designing production multi-agent architectures with lightweight intent routers, tool-calling loops, durable background jobs (retries & checkpoints), and rigorous LLM-as-judge evaluation harnesses.',
    highlights: [
      'Lifted agent chat quality from 3.6 → 4.55 / 5 via automated evals',
      'Cut intent routing cost to 1/60th at 3–8× speed (86% vs 87% accuracy)',
      'Async AI image & video generation pipelines + voice-enabled Telegram bots',
    ],
    tags: ['Vertex AI (Gemini)', 'Tool Calling', 'LLM-as-Judge', 'Intent Routing', 'Media Pipelines'],
  },
  {
    id: 'web3-infra',
    index: '02',
    title: 'Web3 Multisig & Governance',
    subtitle: '$300M+ Treasury Security · On-Chain Indexing',
    description:
      'Leading frontend architecture for mission-critical Web3 protocols across Polkadot, Kusama, Substrate, and EVM networks—where every transaction flow requires cryptographic precision.',
    highlights: [
      'Lead Engineer on Polkasafe & Treasurease securing $300M+ in digital assets',
      'Multi-party signing, transaction construction & wallet orchestration',
      'Real-time on-chain governance & voting powered by Subsquid & polkadot.js',
    ],
    tags: ['Polkasafe', 'Polkassembly', 'safe-global', 'polkadot.js', 'Subsquid', 'Wagmi'],
  },
  {
    id: 'fullstack-scale',
    index: '03',
    title: 'Full-Stack Product & AI Research',
    subtitle: '5+ Years Production Scale · MSc Applied AI',
    description:
      'End-to-end engineering from high-craft React/Next.js interfaces to resilient Node.js, Firebase, AWS, and GCP backends—backed by graduate research in Small Language Models.',
    highlights: [
      '5+ years shipping across Polka Labs, Bayzat, RocketLane & Masai',
      'MSc in Computer Engineering (Applied Data Analytics & AI) at Vistula University',
      'Co-authored research on Constrained Token Generation in Small Language Models',
    ],
    tags: ['Next.js', 'TypeScript', 'Node.js', 'Firebase', 'Google Cloud', 'AWS', 'Playwright'],
  },
]

export const featuredSystems: FeaturedSystem[] = [
  {
    id: 'elvz-ai',
    slug: 'elvz-ai',
    badge: 'Flagship AI Agent System · 2026',
    category: 'AI Agents',
    name: 'Elvz AI',
    role: 'Creator & Lead Architect',
    period: '2026',
    headline: 'Multi-agent social media assistant that learns brand voice & autonomously publishes across 4 major platforms.',
    description:
      "An end-to-end AI agent system that ingests a brand's website and social accounts, learns its voice, and autonomously plans, writes, generates media, schedules, and publishes posts through official Meta, LinkedIn, TikTok, and YouTube APIs.",
    points: [
      'Designed a lightweight intent router and tool-calling agents with durable background jobs (retries, checkpoints) for long-running workflows.',
      'Built an LLM-as-judge evaluation harness that lifted chat quality from 3.6 to 4.55 / 5 while benchmarking a classifier that matched Gemini routing accuracy (86% vs 87%) at 3–8× speed and 1/60th the cost.',
      'Engineered async AI image & video generation pipelines (webhooks, Cloud Storage) and a Telegram bot supporting voice notes.',
    ],
    metrics: [
      { value: '3.6 → 4.55', label: 'Chat quality / 5 via LLM-as-judge' },
      { value: '86% vs 87%', label: 'Classifier vs Gemini routing accuracy' },
      { value: '3–8×', label: 'Faster intent routing latency' },
      { value: '1/60th', label: 'Routing inference cost' },
    ],
    stack: ['Next.js', 'TypeScript', 'Vertex AI (Gemini)', 'LLM-as-Judge Evals', 'Firebase', 'AWS', 'Cloud Storage', 'Telegram API'],
    links: [],
  },
  {
    id: 'polkasafe',
    slug: 'polkasafe',
    badge: 'Flagship Web3 Treasury · $300M+ Secured',
    category: 'Web3 Multisig',
    name: 'Polkasafe & Treasurease',
    role: 'Lead Engineer · Polka Labs',
    period: 'Mar 2023 — Present',
    headline: 'Multi-chain multisig asset management platform securing $300M+ across Polkadot & EVM ecosystems.',
    description:
      'Led the frontend architecture from the ground up for Polkasafe (Polkadot/Substrate) and Treasurease (EVM), powering institutional and DAO treasuries with non-custodial multi-party signing.',
    points: [
      'Architected wallet connection, custom transaction construction, proxy/multisig creation, and multi-party approval flows in Next.js and TypeScript.',
      'Built real-time treasury dashboards tracking multi-chain balances, pending approvals, and historical ledger state synchronized with on-chain finality.',
      'Integrated safe-global (Gnosis Safe) for EVM chains and polkadot.js for Substrate networks, backed by Firebase authentication and off-chain metadata.',
    ],
    metrics: [
      { value: '$300M+', label: 'Total treasury assets secured' },
      { value: 'Multi-Chain', label: 'Polkadot, Kusama & EVM (Treasurease)' },
      { value: 'Real-Time', label: 'On-chain multisig state sync' },
    ],
    stack: ['Next.js', 'TypeScript', 'safe-global', 'polkadot.js', 'Wagmi', 'Firebase', 'Web3 Wallets'],
    links: [
      { label: 'polkasafe.xyz', href: 'https://polkasafe.xyz', primary: true },
      { label: 'treasurease.xyz (EVM)', href: 'https://treasurease.xyz' },
    ],
  },
  {
    id: 'polkassembly',
    slug: 'polkassembly',
    badge: 'Decentralized Governance · OpenGov',
    category: 'Web3 Governance',
    name: 'Polkassembly',
    role: 'Senior Engineer · Polka Labs',
    period: 'Mar 2023 — Present',
    headline: 'The primary governance forum and voting portal for Polkadot, Kusama, and Substrate chains.',
    description:
      'Built core governance discovery, on-chain voting, and identity-linked participation flows used by thousands of token holders, delegates, and ecosystem council members.',
    points: [
      'Engineered proposal discovery, conviction voting interfaces, delegation workflows, and on-chain identity verification.',
      'Rendered complex real-time on-chain governance data with low latency using Subsquid GraphQL indexing, polkadot.js, and Firebase.',
      'Also contributed to sibling Polka Labs ecosystem products including Townhall and blobscriptions.xyz.',
    ],
    metrics: [
      { value: 'OpenGov', label: 'Polkadot & Kusama referenda' },
      { value: 'Subsquid', label: 'Real-time on-chain indexing' },
      { value: '4 Products', label: 'Polkasafe, Polkassembly, Townhall, Blobscriptions' },
    ],
    stack: ['Next.js', 'TypeScript', 'Subsquid', 'polkadot.js', 'Firebase', 'GraphQL'],
    links: [
      { label: 'polkassembly.io', href: 'https://polkassembly.io', primary: true },
    ],
  },
]

export const jobs: Job[] = [
  {
    company: 'Polka Labs',
    location: 'Dubai · Remote',
    period: 'Mar 2023 — Present',
    badge: 'Current · 3+ yrs',
    blurb:
      'Web3 products across the Polkadot and EVM ecosystems: polkassembly.io, polkasafe.xyz, treasurease.xyz, Townhall, blobscriptions.xyz.',
    roles: [
      {
        title: 'Lead Engineer — Polkasafe',
        period: 'Mar 2023 — Present',
        link: { label: 'polkasafe.xyz', href: 'https://polkasafe.xyz' },
        secondaryLink: { label: 'treasurease.xyz', href: 'https://treasurease.xyz' },
        points: [
          'Lead the frontend architecture of a multisig asset management platform securing $300M+ across Polkadot and EVM chains (treasurease.xyz for EVM).',
          'Built wallet connection, transaction construction and multi-party signing flows in Next.js and TypeScript.',
          'Built real-time dashboards for balances, pending approvals and transaction history, in sync with on-chain state.',
          'Integrated safe-global and polkadot.js, with Firebase for off-chain data and authentication.',
        ],
      },
      {
        title: 'Senior Engineer — Polkassembly',
        period: 'Mar 2023 — Present',
        link: { label: 'polkassembly.io', href: 'https://polkassembly.io' },
        points: [
          'Built governance features for the Polkadot, Kusama and Substrate governance forum: proposal discovery, voting interfaces and identity-linked user flows.',
          'Rendered on-chain governance data in real time using Subsquid indexing, polkadot.js and Firebase.',
        ],
      },
    ],
  },
  {
    company: 'Bayzat',
    location: 'Dubai · Remote',
    period: 'Aug 2022 — Jan 2023',
    blurb: 'UAE’s leading HRMS, payroll software, and employee benefits/insurance platform.',
    roles: [
      {
        title: 'Frontend Engineer',
        period: 'Aug 2022 — Jan 2023',
        link: { label: 'bayzat.com', href: 'https://bayzat.com' },
        points: [
          'Built and maintained core HR, payroll, and insurance product features on bayzat.com using React, TypeScript, and modern frontend tooling.',
        ],
      },
    ],
  },
  {
    company: 'RocketLane',
    location: 'Chennai',
    period: 'Apr 2022 — Aug 2022',
    blurb: 'Purpose-built B2B SaaS platform for customer onboarding and implementation.',
    roles: [
      {
        title: 'React Engineer',
        period: 'Apr 2022 — Aug 2022',
        link: { label: 'rocketlane.com', href: 'https://rocketlane.com' },
        points: [
          'Built and maintained collaborative customer onboarding and project tracking features on rocketlane.com in React.',
        ],
      },
    ],
  },
  {
    company: 'Masai',
    location: 'Bangalore · Remote',
    period: 'Jan 2021 — Apr 2022',
    blurb: 'Outcome-driven full-stack software engineering academy.',
    roles: [
      {
        title: 'Instructional Associate',
        period: 'Jan 2021 — Apr 2022',
        points: [
          "Mentored cohorts on full-stack web architecture and authored Data Structures & Algorithms problems for Masai's online judge.",
          'Built and maintained internal engineering applications, including web platforms and automated Slack apps.',
        ],
      },
    ],
  },
]

export const project = {
  name: 'Elvz AI',
  kind: 'Multi-agent social media assistant · personal project',
  year: '2026',
  stack: ['Next.js', 'TypeScript', 'Vertex AI (Gemini)', 'Firebase', 'AWS'],
  pitch:
    "An AI agent that learns a brand's voice from its website and social accounts, then plans, writes, schedules and publishes posts through the official Meta, LinkedIn, TikTok and YouTube APIs.",
  points: [
    'Intent router and tool-calling agents, with durable background jobs (retries, checkpoints) for long-running tasks.',
    'AI image and video generation pipelines: async jobs, webhooks, Cloud Storage.',
    'A Telegram bot that handles voice notes.',
  ],
  metrics: [
    { value: '3.6 → 4.55', label: 'chat quality / 5, via an LLM-as-judge eval harness' },
    { value: '86% vs 87%', label: 'lightweight classifier vs Gemini routing accuracy' },
    { value: '3–8×', label: 'faster routing' },
    { value: '1/60', label: 'of the cost' },
  ],
}

export const skills = [
  {
    group: 'AI & Agent Systems',
    items: [
      'Vertex AI (Gemini)',
      'LLM Agents & Tool Calling',
      'LLM-as-Judge Evaluation',
      'Intent Routing Classifiers',
      'AI Image & Video Generation',
      'Small Language Models (SLMs)',
    ],
  },
  {
    group: 'Frontend Architecture',
    items: ['Next.js', 'React', 'TypeScript', 'JavaScript (ES2024+)', 'Redux', 'HTML5 & Modern CSS', 'Three.js / R3F'],
  },
  {
    group: 'Backend & Cloud',
    items: ['Node.js', 'Express', 'Firebase / Firestore', 'Google Cloud (GCP)', 'AWS', 'MongoDB', 'Subsquid GraphQL'],
  },
  {
    group: 'Web3 & On-Chain',
    items: ['safe-global (Multisig)', 'polkadot.js', 'Wagmi', 'WalletConnect', 'MetaMask', 'EVM & Substrate'],
  },
  {
    group: 'Testing & Reliability',
    items: ['Vitest', 'Playwright', 'Cypress', 'LLM Eval Harnesses'],
  },
]

export const education = [
  {
    degree: 'MSc Computer Engineering (Applied Data Analytics & AI)',
    school: 'Vistula University · Warsaw, Poland',
    period: 'Feb 2024 — Aug 2025',
    highlight: 'Graduate research in Applied AI, Data Analytics & Constrained Token Generation in Small Language Models',
  },
  {
    degree: 'Full Stack Web Development',
    school: 'Masai · Bangalore, India',
    period: 'Aug 2020 — Dec 2020',
    highlight: 'Intensive 1,200+ hour full-stack engineering & data structures curriculum',
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    school: "Lingaya's University · Faridabad, India",
    period: 'Mar 2016 — Aug 2019',
    highlight: 'Core computer science, software engineering, and database systems',
  },
]

// Bottom → top of the 3D stack. `target` is the element id each block scrolls to.
export const chain = [
  { label: 'Masai', period: '2021 — 22', target: 'job-masai' },
  { label: 'RocketLane', period: '2022', target: 'job-rocketlane' },
  { label: 'Bayzat', period: '2022 — 23', target: 'job-bayzat' },
  { label: 'Polka Labs', period: '2023 — now', target: 'job-polka-labs' },
  { label: 'Elvz AI', period: '2026', target: 'project' },
]

export const ticker = [
  'Next.js',
  'TypeScript',
  '$300M+ Secured',
  'AI Agent Systems',
  'LLM-as-Judge Evals',
  'Polkasafe Multisig',
  'Polkassembly OpenGov',
  'polkadot.js',
  'safe-global',
  'Vertex AI (Gemini)',
]
