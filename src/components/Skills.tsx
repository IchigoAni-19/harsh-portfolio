import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  icon?: string;
  color: string;
  initials?: string;
}

const skills: Skill[] = [
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", color: "#3776AB" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", color: "#F7DF1E" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", color: "#3178C6" },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", color: "#E34F26" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", color: "#1572B6" },
  { name: "SCSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg", color: "#CC6699" },
  { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", color: "#61DAFB" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", color: "#339933" },
  { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg", color: "#aaaaaa" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg", color: "#47A248" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", color: "#06B6D4" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", color: "#F05032" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", color: "#ffffff" },
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg", color: "#FCC624" },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg", color: "#007ACC" },
  { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg", color: "#FF6C37" },
  { name: "npm", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg", color: "#CB3837" },
  { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg", color: "#ffffff" },
  { name: "Render", color: "#46E3B7", initials: "RE" },
  { name: "Gemini AI", color: "#8B5CF6", initials: "AI" },
  { name: "Zod", color: "#3068B7", initials: "ZD" },
  { name: "JWT", color: "#D63AFF", initials: "JWT" },
  { name: "REST API", color: "#00D9FF", initials: "API" },
  { name: "Bruno", color: "#FF7800", initials: "BR" },
];

const allSkills = [...skills, ...skills, ...skills];

const SkillItem = ({ skill }: { skill: Skill }) => (
  <div className="flex flex-col items-center gap-3 mx-5 flex-shrink-0 group cursor-default select-none">
    <div
      className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-white/25 group-hover:bg-white/10"
      style={{ boxShadow: `0 0 20px ${skill.color}18` }}
    >
      {skill.icon ? (
        <img
          src={skill.icon}
          alt={skill.name}
          className="w-8 h-8 object-contain"
          style={{
            filter: skill.name === "Express" || skill.name === "GitHub" || skill.name === "Vercel"
              ? "invert(1) brightness(0.75)"
              : undefined,
          }}
        />
      ) : (
        <span
          className="text-xs font-bold font-mono tracking-wider"
          style={{ color: skill.color }}
        >
          {skill.initials}
        </span>
      )}
    </div>
    <span className="text-[11px] font-mono text-white/40 group-hover:text-white/70 transition-colors duration-300 whitespace-nowrap">
      {skill.name}
    </span>
  </div>
);

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const xPos = useRef(0);
  const velocity = useRef(-0.6);
  const lastScrollY = useRef(0);
  const rafId = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const track = trackRef.current;
    if (!track) return;

    let running = true;

    const animate = () => {
      if (!running) return;

      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;

      // Scroll influences velocity; base drift is always left
      velocity.current = velocity.current * 0.9 + (scrollDelta * 0.35 - 0.6) * 0.1;

      xPos.current += velocity.current;

      const setWidth = track.scrollWidth / 3;
      if (xPos.current < -setWidth) xPos.current += setWidth;
      if (xPos.current > 0) xPos.current -= setWidth;

      track.style.transform = `translateX(${xPos.current}px)`;
      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      running = false;
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-skills-title]",
        { y: 40, opacity: 0, filter: "blur(10px)" },
        {
          y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[350px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10">
        {/* Section title */}
        <div data-skills-title className="text-center mb-16 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono text-white/50 tracking-widest">TECH STACK</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400">
              Skills
            </span>
          </h2>
          <p className="text-white/35 text-sm max-w-md mx-auto">
            Technologies and tools I use to build modern, scalable applications.
          </p>
        </div>

        {/* Marquee */}
        <div className="relative overflow-hidden">
          {/* Edge fades */}
          <div
            className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
            style={{ background: "linear-gradient(90deg, #05050f 0%, transparent 100%)" }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
            style={{ background: "linear-gradient(270deg, #05050f 0%, transparent 100%)" }}
          />

          <div
            ref={trackRef}
            className="flex items-start py-6 will-change-transform"
            style={{ width: "max-content" }}
          >
            {allSkills.map((skill, i) => (
              <SkillItem key={`${skill.name}-${i}`} skill={skill} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
