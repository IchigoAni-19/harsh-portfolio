## Plan

Major overhaul across the portfolio. Here's the full scope:

### 1. Hero (`src/components/Hero.tsx`)
- Remove the floating up/down animation on the name.
- Replace with a **typewriter effect** that types "Harsh Patel" character-by-character on page load, then blinking cursor.
- Update tagline from "Python Developer & FastAPI Engineer" to **"Full-Stack Developer & AI Engineer"**.
- Update description to reflect new focus: building full-stack AI-powered platforms with React, Node.js, and Gemini AI.

### 2. About — 5 Bento Cards (`src/components/About.tsx`)
Redesign to match the reference image: "My Story in Five Blocks" with a 3-column top row and 2-column bottom row, each card numbered 01–05, with a circular icon top-left and a small number top-right.

- **01. Engineering My Own Path** — Electronics Engineering → Software Engineer story
- **02. I Build Systems** — Full-stack focus with tech badges (React, Node.js, Express, MongoDB, JWT, AI/Gemini)
- **03. Why I Build** — Motivation: turning ideas into products
- **04. Currently Exploring** — Cloud, AI, system design badges (Azure Cloud, AI Integration, Backend Architecture, System Design, Linux)
- **05. Beyond Code** — Curiosity about low-level systems (CLI Enthusiast, Operating Systems, Shell Development, Performance, Problem Solving)

### 3. Developer Activity (`src/components/DeveloperActivity.tsx` — NEW)
A section showing GitHub-style contribution activity — a static/animated grid of squares representing commit intensity, plus a few stat cards (Total Projects, Languages, Years Coding, etc.). No live API — mock visual data for now.

### 4. Skills (`src/data/skills.ts`)
Rewrite categories per new data:
- **Languages**: Python, JavaScript, TypeScript, HTML5, CSS3, SCSS
- **Frameworks & Libraries**: React.js, Node.js, Express.js, Tailwind CSS
- **Databases**: MongoDB
- **AI & Tools**: Gemini AI, Zod, JWT, REST API, MVC
- **Developer Tools**: Git, GitHub, Linux, VS Code, Postman, Bruno, npm, Vercel, Render
- **Coursework**: DSA, OOP, Operating Systems

### 5. Featured Projects (`src/data/projects.ts` + `src/components/Projects.tsx`)
Rename section heading to "Featured Projects". Replace TaskScore with three new projects:

**Resume Match AI · 2026** — Full-stack AI interview prep platform, Gemini 2.5 Flash + Zod, JWT auth, Puppeteer PDF pipeline. Tech: React.js, Node.js, Express.js, MongoDB, Gemini AI, Zod, SCSS. Live demo link.

**ThreadForge · 2026** — Full-stack discussion platform with recursive nested comments, credit reward engine. Tech: React.js, TypeScript, Node.js, Express.js, MongoDB, Tailwind CSS. Live demo link.

**Custom Shell Interpreter (CodeCrafters) · 2025** — Unix-like shell in Python, pipelines, I/O redirection, tab completion. Tech: Python, Linux, Git, CLI.

Each card keeps: description, features, tech stack, "What I Learned" bullets, GitHub + Live Demo buttons.

### 6. Developer Journey — Timeline (`src/components/Timeline.tsx` — NEW)
Vertical alternating timeline showing career milestones:
- Electronics Engineering foundation
- Self-taught software development
- First full-stack projects (ThreadForge)
- AI integration era (Resume Match AI)
- CodeCrafters shell interpreter
- Current: exploring cloud & system design

Each entry with year, title, description, animated on scroll from left/right.

### 7. Remove Currently Learning + Coming Soon
- Delete `src/components/Learning.tsx`
- Remove its import from `src/pages/Index.tsx`

### 8. Page Order (`src/pages/Index.tsx`)
```
Navbar → Hero → About → DeveloperActivity → Skills → Projects → Timeline → Contact → Footer
```

### 9. Navbar (`src/components/Navbar.tsx`)
Update section links to match new sections. Remove "Learning" if present. Add "Journey" if missing.

### Files touched
- `src/components/Hero.tsx` (typewriter)
- `src/components/About.tsx` (bento grid rewrite)
- `src/components/DeveloperActivity.tsx` (new)
- `src/components/Timeline.tsx` (new)
- `src/data/projects.ts` (three new projects)
- `src/data/skills.ts` (new categories)
- `src/components/Projects.tsx` (heading + minor tweaks)
- `src/components/Learning.tsx` (delete)
- `src/pages/Index.tsx` (new order, remove Learning)
- `src/components/Navbar.tsx` (nav links)