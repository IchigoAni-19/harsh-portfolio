export interface SkillCategory {
  name: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    skills: ["Python", "JavaScript", "TypeScript", "HTML5", "CSS3", "SCSS"],
  },
  {
    name: "Frameworks & Libraries",
    skills: ["React.js", "Node.js", "Express.js", "Tailwind CSS"],
  },
  {
    name: "Databases",
    skills: ["MongoDB"],
  },
  {
    name: "AI & Backend",
    skills: ["Gemini AI", "Zod", "JWT", "REST API", "MVC"],
  },
  {
    name: "Developer Tools",
    skills: ["Git", "GitHub", "Linux", "VS Code", "Postman", "Bruno", "npm", "Vercel", "Render"],
  },
  {
    name: "Coursework",
    skills: ["DSA", "OOP", "Operating Systems"],
  },
];
