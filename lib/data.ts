export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experiences: Experience[] = [
  {
    company: "DeeptaAI",
    role: "Software Development Engineer-1",
    period: "Aug 2025 – Present",
    location: "Hyderabad",
    summary:
      "Building analytics products that turn raw behavioral data into decisions.",
    highlights: [
      "Built Compass, a retention analytics dashboard that helps product teams find user-behavior patterns linked to long-term retention.",
      "Owned frontend-led, full-stack delivery of a University Management Dashboard serving 10,000+ daily users, improving frontend performance by 45% through code splitting and lazy loading.",
      "Built Third-Party Cohorts, a cohort sync that exports user cohorts to external tools, with webhook integrations, recurring sync schedules, and sync health monitoring.",
      "Drove code quality and release stability through active participation in code reviews, debugging, testing, and deployment.",
    ],
    stack: ["React", "TypeScript", "Node.js", "MySQL", "MongoDB", "REST APIs"],
  },
  {
    company: "Apxor",
    role: "Associate Software Development Engineer",
    period: "Apr 2025 – Aug 2025",
    location: "Hyderabad",
    summary: "Hardened chatbot platforms and secured the APIs behind them.",
    highlights: [
      "Debugged chatbot workflows on the Kore.ai platform, improving conversational reliability and bot performance.",
      "Built secure encryption/decryption mechanisms for public APIs, protecting sensitive data exchanged with external systems while ensuring authentication integrity and security compliance.",
      "Delivered scalable, responsive frontend features using React.js and TypeScript for production web applications.",
    ],
    stack: ["React", "TypeScript", "Kore.ai", "Node.js", "Security APIs"],
  },
  {
    company: "Outlier AI",
    role: "Freelance AI Trainer",
    period: "Nov 2024 – Apr 2025",
    location: "Remote",
    summary: "Trained and benchmarked large language models on code.",
    highlights: [
      "Evaluated AI-generated responses for accuracy and reasoning quality, providing corrective feedback to improve model performance.",
      "Delivered coding solutions for benchmark tasks supporting AI training and evaluation pipelines.",
      "Authored 100+ technical recommendations that improved model reasoning accuracy by 15%.",
    ],
    stack: ["LLM Evaluation", "Benchmarking", "Prompt Engineering"],
  },
];

export type Project = {
  name: string;
  tag: string;
  description: string;
  features: string[];
  stack: string[];
  github: string;
  demo: string;
};

export const projects: Project[] = [
  {
    name: "Multi-Provider Messaging Service",
    tag: "Provider-agnostic SMS API",
    description:
      "A provider-agnostic SMS service exposing one REST API for single, batch (up to 100 recipients), and scheduled daily sends through Twilio and Vonage, with the primary provider switchable through configuration alone.",
    features: [
      "Config-driven HTTP provider engine: templated requests, JSONPath parsing, retry rules",
      "Add new SMS providers via JSON or a runtime REST API, no code changes or restarts",
      "RFC 7807 Problem Details errors with stable codes and masked provider secrets",
      "Automated build and deployment to Azure with GitHub Actions",
    ],
    stack: ["Java", "Spring Boot", "REST APIs", "Twilio", "Vonage", "Azure", "GitHub Actions"],
    github: "https://github.com/manikorimilli/messaging-service",
    demo: "https://messaging-service-ui-ivory.vercel.app/",
  },
  {
    name: "FilmyGPT",
    tag: "AI-powered movie discovery",
    description:
      "A Netflix-style movie discovery web app with Firebase authentication and live now-playing, popular, top-rated, and upcoming catalogs from the TMDB API.",
    features: [
      "GPT-4o natural-language search: free text like \"Indian comedy movies\" becomes 5 curated picks",
      "Each recommendation resolved against TMDB in parallel with Promise.all",
      "Reusable custom React hooks and Redux Toolkit slices for data fetching",
      "Trailer playback, shimmer loading states, and a light/dark theme toggle",
    ],
    stack: ["React.js", "Redux Toolkit", "Tailwind CSS", "Firebase", "TMDB API", "OpenAI API"],
    github: "https://github.com/manikorimilli/FilmyGPT",
    demo: "https://github.com/manikorimilli/FilmyGPT",
  },
];

export type Skill = { name: string; slug?: string; groups: string[] };

// `slug` maps to a bundled SVG in public/icons — omit for concepts with no brand icon.
export const skills: Skill[] = [
  { name: "JavaScript", slug: "javascript", groups: ["Languages"] },
  { name: "TypeScript", slug: "typescript", groups: ["Languages"] },
  { name: "Go", groups: ["Languages"] },
  { name: "C++", slug: "cplusplus", groups: ["Languages"] },
  { name: "React.js", slug: "react", groups: ["Frontend"] },
  { name: "Redux", slug: "redux", groups: ["Frontend"] },
  { name: "Zustand", groups: ["Frontend"] },
  { name: "CSS", slug: "css", groups: ["Frontend"] },
  { name: "Tailwind CSS", slug: "tailwindcss", groups: ["Frontend"] },
  { name: "Shadcn UI", groups: ["Frontend"] },
  { name: "Java", slug: "openjdk", groups: ["Backend"] },
  { name: "Spring Boot", groups: ["Backend"] },
  { name: "Node.js", slug: "nodedotjs", groups: ["Backend"] },
  { name: "Express.js", slug: "express", groups: ["Backend"] },
  { name: "REST APIs", groups: ["Backend"] },
  { name: "Microservices", groups: ["Backend"] },
  { name: "Event-Driven Architecture", groups: ["Backend"] },
  { name: "MongoDB", slug: "mongodb", groups: ["Database"] },
  { name: "PostgreSQL", slug: "postgresql", groups: ["Database"] },
  { name: "MySQL", slug: "mysql", groups: ["Database"] },
  { name: "LLM APIs (OpenAI, Anthropic, Gemini, Azure OpenAI)", groups: ["AI"] },
  { name: "Prompt Engineering", groups: ["AI"] },
  { name: "AI Feature Integration", groups: ["AI"] },
  { name: "AI-Assisted Development", groups: ["AI"] },
  { name: "Git", slug: "git", groups: ["Tools"] },
  { name: "GitHub", slug: "github", groups: ["Tools"] },
  { name: "GitHub Actions", groups: ["Tools"] },
  { name: "Docker", slug: "docker", groups: ["Tools"] },
  { name: "Postman", slug: "postman", groups: ["Tools"] },
  { name: "DSA", groups: ["Others"] },
  { name: "Competitive Programming", groups: ["Others"] },
  { name: "OOPS", groups: ["Others"] },
  { name: "System Design Fundamentals", groups: ["Others"] },
];

export const skillFilters = [
  "All",
  "Languages",
  "Frontend",
  "Backend",
  "Database",
  "AI",
  "Tools",
  "Others",
];

// Split into number + suffix so <StatsCounter> can count up to them.
export type HeroStat = { value: number; suffix: string; label: string };

export const heroStats: HeroStat[] = [
  { value: 2, suffix: "+", label: "Years of Experience" },
  { value: 10, suffix: "K+", label: "Daily Users Served" },
  { value: 45, suffix: "%", label: "Frontend Performance Gain" },
  { value: 100, suffix: "+", label: "AI Model Recommendations" },
];

export const traits = [
  "Tech Enthusiast",
  "Problem Solver",
  "Clean Code",
  "Lifelong Learner",
];

export const education = {
  degree: "B.Tech in Electronics and Communication Engineering",
  school: "Aditya College of Engineering",
  period: "2020 – 2024",
  detail: "CGPA 8.1 · Surampalem, Andhra Pradesh",
};

export const achievements = [
  {
    title: "OwlCoder Top Performer",
    detail: "Recognized as a Top Performer in the OwlCoder program",
  },
  {
    title: "Top 10 in Coding Competitions",
    detail: "Consistently ranked Top 10 in college-level contests by Technical Hub",
  },
  {
    title: "Top Contributor, Outlier AI",
    detail: "Recognized for improving instruction adherence and response quality in AI training tasks",
  },
  {
    title: "Engineering Excellence",
    detail: "Improved frontend performance 45% on a dashboard serving 10,000+ daily users at DeeptaAI",
  },
];
