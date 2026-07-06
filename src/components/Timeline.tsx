import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Code2, Layers, Sparkles, Terminal, Cloud } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const milestones: Milestone[] = [
  {
    year: "Foundation",
    title: "Electronics Engineering",
    description:
      "Started in Electronics Engineering — learned the fundamentals of systems, logic and problem-solving that still shape how I build software today.",
    icon: GraduationCap,
  },
  {
    year: "Turning Point",
    title: "Self-Taught Software Developer",
    description:
      "Discovered my passion for software. Instead of waiting for opportunities, I built them — learning JavaScript, React and backend fundamentals on my own.",
    icon: Code2,
  },
  {
    year: "2026",
    title: "ThreadForge — First Full-Stack Platform",
    description:
      "Built and deployed a full-stack discussion platform with recursive nested comments, JWT auth and a custom credit reward engine.",
    icon: Layers,
  },
  {
    year: "2026",
    title: "Resume Match AI — AI Engineering",
    description:
      "Integrated Google Gemini 2.5 Flash with Zod-validated contracts to build an AI-powered interview prep platform. Learned to enforce strict AI output schemas at scale.",
    icon: Sparkles,
  },
  {
    year: "2025 — Present",
    title: "Custom Shell Interpreter",
    description:
      "Built a Unix-like shell in Python from scratch as part of the CodeCrafters challenge. Dived into process management, file descriptors and terminal internals.",
    icon: Terminal,
  },
  {
    year: "Now",
    title: "Exploring Cloud & System Design",
    description:
      "Currently diving into Azure Cloud, backend architecture and system design — building the foundation for scalable, production-grade platforms.",
    icon: Cloud,
  },
];

const Timeline = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-timeline-heading]", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", toggleActions: "restart none none reverse" },
      });

      gsap.from("[data-timeline-item]", {
        x: (i) => (i % 2 === 0 ? -60 : 60),
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%", toggleActions: "restart none none reverse" },
      });

      gsap.from("[data-timeline-line]", {
        scaleY: 0,
        duration: 1.5,
        ease: "power2.out",
        transformOrigin: "top",
        scrollTrigger: { trigger: ref.current, start: "top 80%", toggleActions: "restart none none reverse" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" ref={ref} className="py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-14" data-timeline-heading>
          <h2 className="font-mono text-sm text-primary mb-2">05.</h2>
          <h3 className="text-3xl font-bold mb-2">Developer Journey</h3>
          <div className="h-[2px] w-16 bg-primary mb-4 origin-left" />
          <p className="text-muted-foreground max-w-lg">
            Key milestones that shaped who I am as an engineer.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div
            data-timeline-line
            className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-accent to-primary/20"
          />

          <div className="space-y-10">
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              const Icon = m.icon;
              return (
                <div
                  key={m.title}
                  data-timeline-item
                  className={`relative flex items-start md:items-center gap-4 md:gap-8 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-2 md:top-1/2 md:-translate-y-1/2 z-10">
                    <div className="h-4 w-4 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))] ring-4 ring-background" />
                  </div>

                  {/* Card */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="rounded-xl border border-border bg-card/60 backdrop-blur-sm p-5 sm:p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                      <div className={`flex items-center gap-2 mb-2 ${isLeft ? "md:justify-end" : ""}`}>
                        <Icon className="h-4 w-4 text-primary" />
                        <span className="font-mono text-xs text-primary">{m.year}</span>
                      </div>
                      <h4 className="text-lg font-bold mb-2">{m.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{m.description}</p>
                    </div>
                  </div>

                  {/* Spacer for other side */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
