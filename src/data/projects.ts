export interface Project {
  name: string;
  year: string;
  description: string;
  features: string[];
  techStack: string[];
  learned: string[];
  githubUrl: string;
  demoUrl?: string;
}

export const projects: Project[] = [
  {
    name: "Resume Match AI",
    year: "2026",
    description:
      "A full-stack AI-powered platform that accepts a resume PDF, job description, and self-description as input, then generates a complete interview preparation package including match score, technical questions, behavioral questions, skill gap analysis, and an ATS-optimized resume PDF.",
    features: [
      "AI-powered resume + job description matching",
      "Technical and behavioral question generation",
      "Skill gap analysis and preparation roadmap",
      "ATS-optimized PDF resume generation via Puppeteer",
      "JWT authentication with httpOnly cookies + token blacklist",
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Gemini AI", "Zod", "SCSS"],
    learned: [
      "Integrating Gemini 2.5 Flash with Zod for strict AI output contracts",
      "Secure JWT auth with MongoDB TTL blacklist for logout invalidation",
      "Puppeteer-based PDF pipeline converting structured JSON to A4 resumes",
      "Layered backend architecture and 4-layer frontend pattern",
    ],
    githubUrl: "https://github.com",
    demoUrl: "https://example.com",
  },
  {
    name: "ThreadForge",
    year: "2026",
    description:
      "A full-stack discussion platform with a React + TypeScript frontend and Node.js + Express REST API backend, backed by MongoDB. Features JWT-based authentication, protected routes, and a recursive comment system supporting unlimited nested discussions.",
    features: [
      "Recursive nested comment system with tree-based rendering",
      "JWT authentication with protected routes",
      "CRUD operations across all resources",
      "Custom engagement-driven credit reward engine with arithmetic progression",
      "Soft deletion with thread preservation",
    ],
    techStack: ["React.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    learned: [
      "Designing recursive data structures with parent-child relationships",
      "Building layered backend architecture (controllers, services, models)",
      "Implementing rollback mechanisms for credit reward systems",
      "End-to-end REST API integration between React and Express",
    ],
    githubUrl: "https://github.com",
    demoUrl: "https://example.com",
  },
  {
    name: "Custom Shell Interpreter",
    year: "2025",
    description:
      "A Unix-like shell built in Python as part of the CodeCrafters challenge, implementing core shell behavior from scratch including built-in commands, external command execution through PATH lookup, command history, and tab-completion.",
    features: [
      "Built-in commands and external command execution via PATH",
      "Command history and tab-completion",
      "Pipelines and I/O redirection",
      "Quote handling and escape sequence parsing",
      "Structured command parsing logic",
    ],
    techStack: ["Python", "Linux", "Git", "CLI"],
    learned: [
      "Process management, file descriptors, and subprocess handling",
      "Terminal-based application development",
      "Shell parsing internals including quotes and escapes",
      "Low-level Unix system interaction",
    ],
    githubUrl: "https://github.com",
  },
];
