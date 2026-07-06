import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Code as Code2, Layers, Sparkles, Terminal, Cloud } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const fillLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animation
      gsap.fromTo(
        "[data-timeline-heading]",
        { y: 30, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Timeline items animation - alternating from left/right
      gsap.fromTo(
        "[data-timeline-item]",
        { x: (i) => (i % 2 === 0 ? -60 : 60), opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Line fill animation - fills with violet gradient as user scrolls
      gsap.fromTo(
        fillLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
          },
        }
      );

      // Dots pulse animation
      gsap.to("[data-timeline-dot]", {
        boxShadow: "0 0 20px hsla(260, 70%, 60%, 0.8)",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
        ease: "power1.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" ref={sectionRef} className="relative py-24 px-4 sm:px-6 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl relative">
        {/* Section Header */}
        <div className="mb-16" data-timeline-heading>
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1.5 border-violet-500/40 text-violet-400 bg-violet-500/5"
          >
            MY JOURNEY
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Developer <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-lg">
            Key milestones that shaped who I am as an engineer.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Background line (empty) */}
          <div
            ref={lineRef}
            className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/20 via-white/10 to-white/5"
          />

          {/* Filled line (scroll animated) */}
          <div
            className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[3px] origin-top overflow-hidden"
          >
            <div
              ref={fillLineRef}
              className="absolute inset-0 origin-top"
              style={{
                background: "linear-gradient(180deg, hsl(180, 80%, 50%) 0%, hsl(260, 70%, 60%) 50%, hsl(280, 80%, 50%) 100%)",
              }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-12">
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
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-2 md:top-1/2 md:-translate-y-1/2 z-10">
                    <div
                      data-timeline-dot
                      className="h-4 w-4 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 ring-4 ring-background transition-all duration-300"
                    />
                  </div>

                  {/* Content Card */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      isLeft ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <div className="group relative rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl p-6 transition-all duration-500 hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/10 overflow-hidden">
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Content */}
                      <div className="relative">
                        <div
                          className={`flex items-center gap-2 mb-3 ${
                            isLeft ? "md:justify-end" : ""
                          }`}
                        >
                          <Icon className="h-4 w-4 text-violet-400" />
                          <span className="font-mono text-xs text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full">
                            {m.year}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold mb-2 group-hover:text-violet-400 transition-colors">
                          {m.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {m.description}
                        </p>
                      </div>

                      {/* Decorative corner */}
                      <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg viewBox="0 0 50 50" className="w-full h-full text-violet-400">
                          <circle cx="40" cy="40" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Spacer */}
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
