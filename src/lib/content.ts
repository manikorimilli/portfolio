// Every fact on the site comes from the resume (public/resume.pdf).
// Update the PDF and this file together.

export const profile = {
  name: "Manikanta Korimilli",
  first: "Manikanta",
  last: "Korimilli",
  initials: "MK",
  role: "Software Development Engineer",
  company: "DeeptaAI",
  location: "Hyderabad, India",
  timezone: "Asia/Kolkata",
  email: "manikantakorimilli21@gmail.com",
  phone: "+91 9492014400",
  phoneHref: "tel:+919492014400",
  github: "https://github.com/manikorimilli",
  githubHandle: "manikorimilli",
  linkedin: "https://www.linkedin.com/in/manikorimilli/",
  linkedinHandle: "in/manikorimilli",
  resume: "/resume.pdf",
};

export const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
  { id: "ai", label: "AI" },
  { id: "achievements", label: "Awards" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
] as const;

export const hero = {
  eyebrow: "Software Development Engineer · DeeptaAI",
  headline: ["Engineered", "for scale."],
  intro:
    "Event-driven backends, interfaces that never stutter, and AI in every step of the workflow. Built in Hyderabad.",
};

export const about = {
  statement:
    "I build with AI at the core. Agentic workflows that move delivery faster, product features that turn plain language into working software, and models I have helped teach to write better code.",
  education: {
    school: "Aditya College of Engineering",
    degree: "B.Tech, Electronics and Communication Engineering",
    period: "2020 – 2024",
    detail: "CGPA 8.1 · Surampalem, Andhra Pradesh",
  },
};

export type Stat = { value: number; prefix?: string; suffix: string; label: string; note: string };

export const stats: Stat[] = [
  { value: 30, suffix: "%", label: "Faster analytics service", note: "Async report pipeline · DeeptaAI" },
  { value: 10, suffix: "K+", label: "Rows rendered without lag", note: "Virtualized inventory UI · Apxor" },
  { value: 120, suffix: "+", label: "DSA problems authored", note: "AI model training · Outlier AI" },
  { value: 100, suffix: "+", label: "Issues resolved", note: "AI-driven development · DeeptaAI" },
];

export type Metric = { value: string; label: string };

export type Role = {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  kicker: string;
  headline: string;
  highlights: string[];
  metrics: Metric[];
  stack: string[];
};

export const experience: Role[] = [
  {
    id: "deeptaai",
    company: "DeeptaAI",
    role: "Software Development Engineer 1",
    period: "Aug 2025 – Present",
    location: "Hyderabad, India",
    kicker: "Analytics platform",
    headline: "Rebuilt reporting as an async, idempotent pipeline.",
    highlights: [
      "Re-architected department report generation on RabbitMQ and Redis, making the analytics service 30% faster.",
      "Engineered cohort sync to external platforms with webhooks and automated schedules, cutting sync failures by 30%.",
      "Launched Compass, a component-driven feature that forecasts the user behavior tied to retention.",
      "Resolved 100+ issues with QA and product, using Claude Code, MCP and subagents.",
    ],
    metrics: [
      { value: "30%", label: "faster analytics" },
      { value: "40s → 10–15s", label: "monthly report wait" },
      { value: "−30%", label: "sync failures" },
    ],
    stack: ["RabbitMQ", "Redis", "Event-Driven", "Webhooks", "Claude Code", "MCP"],
  },
  {
    id: "apxor",
    company: "Apxor",
    role: "Associate Software Development Engineer",
    period: "Apr 2025 – Aug 2025",
    location: "Hyderabad, India",
    kicker: "Performance & security",
    headline: "Ten thousand rows. Zero lag. Encrypted end to end.",
    highlights: [
      "Built the frontend of a store inventory system that renders 10,000+ rows smoothly with virtualization, windowing and optimized painting.",
      "Secured public APIs with replay protection and AES-256-GCM encryption for customer and transaction data.",
      "Debugged chatbot workflows on Kore.ai, improving conversational reliability and bot performance.",
    ],
    metrics: [
      { value: "10K+", label: "rows, no lag" },
      { value: "AES-256", label: "GCM encryption" },
      { value: "Replay", label: "protection on APIs" },
    ],
    stack: ["Virtualization", "Windowing", "AES-256-GCM", "REST APIs", "Kore.ai"],
  },
  {
    id: "outlier",
    company: "Outlier AI",
    role: "Freelance",
    period: "Nov 2024 – Apr 2025",
    location: "Remote",
    kicker: "AI training & delivery",
    headline: "Teaching models to code, and shipping for clients.",
    highlights: [
      "Delivered 10+ client projects, turning requirements into JavaScript solutions that passed review.",
      "Authored 120+ original DSA problems with C++ reference solutions to train and evaluate AI models.",
      "Reviewed AI-generated code for correctness and reasoning quality, improving model responses.",
    ],
    metrics: [
      { value: "120+", label: "DSA problems" },
      { value: "10+", label: "client projects" },
      { value: "Top", label: "contributor award" },
    ],
    stack: ["JavaScript", "C++", "DSA", "AI Code Review"],
  },
];

export type Project = {
  id: string;
  index: string;
  name: string;
  kicker: string;
  summary: string;
  points: string[];
  metrics: Metric[];
  stack: string[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: "messaging",
    index: "P.01",
    name: "Multi-Provider Messaging Service",
    kicker: "SMS · WhatsApp · Email",
    summary:
      "One service, every channel. Single, batch and scheduled daily sends routed through configurable providers.",
    points: [
      "Batch sends to up to 100 recipients across SMS, WhatsApp and Email via Twilio or Vonage.",
      "Spring Scheduler cron jobs with a retry mechanism for scheduled delivery.",
      "CI/CD with GitHub Actions, deployed end to end on Azure.",
    ],
    metrics: [
      { value: "−15%", label: "delivery latency" },
      { value: "−20%", label: "errors" },
      { value: "100", label: "recipients / batch" },
    ],
    stack: ["Java", "Spring Boot", "React", "TailwindCSS", "Azure", "GitHub Actions"],
    links: [
      { label: "GitHub", href: "https://github.com/manikorimilli/messaging-service" },
      { label: "Live app", href: "https://messaging-service-ui-ivory.vercel.app/" },
    ],
  },
  {
    id: "wooble",
    index: "P.02",
    name: "Wooble",
    kicker: "AI collaborative canvas",
    summary:
      "A collaborative drawing board for architecture, design and planning, with AI that turns words into diagrams.",
    points: [
      "One element array across two canvas layers for smooth drag, resize and rotate.",
      "Text-to-diagram: plain-English flowcharts, architectures and mind maps become editable shapes.",
      "Collaborative by design, for architecture, design and planning sessions.",
    ],
    metrics: [
      { value: "60fps", label: "drag · resize · rotate" },
      { value: "1,000+", label: "shapes on canvas" },
      { value: "2", label: "canvas layers" },
    ],
    stack: ["Canvas", "Text-to-Diagram", "AI Features"],
    links: [],
  },
];

export type SkillGroup = { id: string; label: string; code: string; items: string[] };

export const skills: SkillGroup[] = [
  { id: "lang", label: "Languages", code: "LANG", items: ["Java", "JavaScript", "TypeScript", "C++"] },
  {
    id: "frontend",
    label: "Frontend",
    code: "UI",
    items: ["React.js", "TanStack Query", "TanStack Router", "Redux", "Zustand", "TailwindCSS", "Shadcn UI"],
  },
  {
    id: "backend",
    label: "Backend",
    code: "SRV",
    items: ["Spring Boot", "Node.js", "REST APIs", "Microservices", "Event-Driven Architecture", "RabbitMQ", "DTFx"],
  },
  { id: "data", label: "Databases", code: "DB", items: ["MongoDB", "PostgreSQL", "Redis"] },
  {
    id: "tools",
    label: "Tools & Cloud",
    code: "OPS",
    items: ["Git", "GitHub Actions (CI/CD)", "Docker", "Azure Cloud"],
  },
  {
    id: "core",
    label: "Foundations",
    code: "CORE",
    items: ["DSA", "Competitive Programming", "OOPS", "System Design", "API Design"],
  },
];

export type Capability = { id: string; code: string; title: string; body: string; tags: string[] };

export const capabilities: Capability[] = [
  {
    id: "llm",
    code: "AI.01",
    title: "LLM APIs",
    body: "Working fluently with OpenAI and Anthropic APIs to bring language models into real product workflows.",
    tags: ["OpenAI", "Anthropic"],
  },
  {
    id: "rag",
    code: "AI.02",
    title: "RAG & Prompt Engineering",
    body: "Grounding model output in real context and shaping prompts that return reliable, structured results.",
    tags: ["RAG", "Prompt Engineering"],
  },
  {
    id: "mcp",
    code: "AI.03",
    title: "MCP & Agents",
    body: "Model Context Protocol and subagents wired into daily engineering, behind 100+ issues resolved with QA and product.",
    tags: ["MCP", "Subagents"],
  },
  {
    id: "assist",
    code: "AI.04",
    title: "AI-Assisted Development",
    body: "Claude Code as a first-class teammate across debugging, refactoring and delivery.",
    tags: ["Claude Code"],
  },
  {
    id: "eval",
    code: "AI.05",
    title: "Model Training & Evaluation",
    body: "120+ original DSA problems with C++ reference solutions, and code reviews that improved model reasoning.",
    tags: ["Outlier AI", "C++"],
  },
];

export type Achievement = { id: string; title: string; issuer: string; detail: string; kind: string };

export const achievements: Achievement[] = [
  {
    id: "rhcsa",
    title: "Red Hat Certified System Administrator",
    issuer: "Red Hat",
    detail: "Certified in Linux system administration (RHCSA).",
    kind: "Certification",
  },
  {
    id: "owlcoder",
    title: "Top Performer, OwlCoder Program",
    issuer: "Technical Hub",
    detail: "Ranked Top 10 in multiple college-level coding competitions.",
    kind: "Competitive programming",
  },
  {
    id: "outlier",
    title: "Top Contributor",
    issuer: "Outlier AI",
    detail: "Awarded for consistently high reviewer ratings on AI training and coding tasks.",
    kind: "Recognition",
  },
];

export const marquee = [
  "Java",
  "Spring Boot",
  "TypeScript",
  "React.js",
  "RabbitMQ",
  "Redis",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "Azure",
  "MCP",
  "RAG",
  "Claude Code",
  "TanStack",
  "Microservices",
  "C++",
];
