import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { User, Code as Code2, Heart, Rocket, Star, GitBranch, Database, Terminal, Cpu, Layers, Globe, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

const techIcons = [
  { name: "React", color: "#61DAFB", icon: "⚛" },
  { name: "Node.js", color: "#68A063", icon: "⬡" },
  { name: "Express", color: "#888", icon: "ex" },
  { name: "MongoDB", color: "#47A248", icon: "🍃" },
  { name: "JWT", color: "#FB015B", icon: "🔑" },
  { name: "AI/Gemini", color: "#8B5CF6", icon: "✦" },
];

const exploringTags = [
  { label: "Azure Cloud", Icon: Globe },
  { label: "AI Integration", Icon: Zap },
  { label: "Backend Architecture", Icon: Database },
  { label: "System Design", Icon: Layers },
  { label: "Linux", Icon: Terminal },
];

const beyondTags = [
  { label: "CLI Enthusiast", Icon: Terminal },
  { label: "Operating Systems", Icon: Cpu },
  { label: "Shell Development", Icon: Code2 },
  { label: "Performance", Icon: Zap },
  { label: "Problem Solving", Icon: Star },
];

const cardBase =
  "relative group rounded-2xl overflow-hidden border border-white/8 bg-[#0e0e1c] hover:border-white/16 transition-all duration-500";

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-about-header]",
        { y: 40, opacity: 0, filter: "blur(10px)" },
        {
          y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        "[data-bento-card]",
        { y: 50, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.75, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-24 px-4 sm:px-6 overflow-hidden">
      <div className="mx-auto max-w-6xl relative">
        {/* Header */}
        <div className="text-center mb-14" data-about-header>
          <Badge
            variant="outline"
            className="mb-5 px-4 py-1.5 border-violet-500/40 text-violet-400 bg-violet-500/5 font-mono tracking-widest text-xs"
          >
            ABOUT ME
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
            My Story in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
              Five Blocks
            </span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto text-sm">
            A quick snapshot of who I am, what I do and what drives me.
          </p>
        </div>

        {/* Bento Grid - matches reference layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* --- Row 1 --- */}

          {/* Card 01 - Engineering My Own Path */}
          <div data-bento-card className={`${cardBase} md:row-span-1 p-6`}>
            {/* Glow */}
            <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600/30 to-violet-600/30 border border-blue-500/20 flex items-center justify-center">
                <User className="w-5 h-5 text-blue-400" />
              </div>
              <span className="font-mono text-white/20 text-sm font-bold">01</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-3 leading-tight">
              Engineering My Own{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                Path
              </span>
            </h3>

            <p className="text-white/50 text-sm leading-relaxed mb-2">
              I come from an Electronics Engineering background, but my passion found its true home in software.
            </p>
            <p className="text-white/40 text-xs leading-relaxed mb-5">
              I didn't wait for opportunities — I built them. From self-learning to building production-grade applications, I enjoy turning ideas into impactful products that solve real problems.
            </p>

            {/* Transition tag */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-mono">
                Electronics Engineer
              </span>
              <span className="text-violet-400 text-xs">→</span>
              <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-300 text-xs font-mono">
                Software Engineer
              </span>
            </div>
          </div>

          {/* Card 02 - I Build Systems */}
          <div data-bento-card className={`${cardBase} p-6`}>
            <div className="absolute top-0 right-0 w-28 h-28 rounded-full bg-cyan-500/8 blur-2xl pointer-events-none" />

            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-600/30 to-blue-600/30 border border-cyan-500/20 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="font-mono text-white/20 text-sm font-bold">02</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2 leading-tight">
              I Build{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Systems
              </span>
            </h3>

            <p className="text-white/45 text-xs leading-relaxed mb-5">
              I love building complete systems — from intuitive frontends to scalable, secure backends and RESTful APIs.
            </p>

            {/* Tech icon grid */}
            <div className="grid grid-cols-3 gap-2">
              {techIcons.map((t) => (
                <div
                  key={t.name}
                  className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-white/4 border border-white/6 hover:bg-white/8 hover:border-white/12 transition-all duration-300"
                >
                  <span className="text-lg" style={{ color: t.color }}>{t.icon}</span>
                  <span className="text-[10px] text-white/45 font-mono">{t.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 03 - Why I Build */}
          <div data-bento-card className={`${cardBase} p-6`}>
            <div className="absolute bottom-0 right-0 w-28 h-28 rounded-full bg-rose-500/8 blur-2xl pointer-events-none" />

            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-600/30 to-orange-600/30 border border-rose-500/20 flex items-center justify-center">
                <Heart className="w-5 h-5 text-rose-400" />
              </div>
              <span className="font-mono text-white/20 text-sm font-bold">03</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-3 leading-tight">
              Why I{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">
                Build
              </span>
            </h3>

            <p className="text-white/50 text-sm leading-relaxed mb-3">
              I enjoy turning complex ideas into products people can actually use.
            </p>

            <p className="text-white/35 text-xs leading-relaxed">
              For me, coding is not just about writing lines — it's about solving problems, learning continuously and creating value.
            </p>

            {/* Decorative target icon */}
            <div className="absolute bottom-5 right-5 w-14 h-14 opacity-15 group-hover:opacity-25 transition-opacity duration-500">
              <svg viewBox="0 0 60 60" className="w-full h-full text-rose-400" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="30" cy="30" r="28" />
                <circle cx="30" cy="30" r="18" />
                <circle cx="30" cy="30" r="8" />
                <line x1="30" y1="2" x2="30" y2="10" />
                <line x1="30" y1="50" x2="30" y2="58" />
                <line x1="2" y1="30" x2="10" y2="30" />
                <line x1="50" y1="30" x2="58" y2="30" />
              </svg>
            </div>
          </div>

          {/* --- Row 2 --- */}

          {/* Card 04 - Currently Exploring */}
          <div data-bento-card className={`${cardBase} p-6`}>
            <div className="absolute top-0 left-0 w-24 h-24 rounded-full bg-emerald-500/8 blur-2xl pointer-events-none" />

            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600/30 to-teal-600/30 border border-emerald-500/20 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="font-mono text-white/20 text-sm font-bold">04</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2 leading-tight">
              Currently{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                Exploring
              </span>
            </h3>

            <p className="text-white/45 text-xs leading-relaxed mb-5">
              Constantly learning. Currently diving deeper into cloud, AI and system design.
            </p>

            <div className="flex flex-wrap gap-2">
              {exploringTags.map((t) => (
                <div
                  key={t.label}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/4 border border-white/8 hover:border-emerald-500/30 hover:bg-emerald-500/8 transition-all duration-300"
                >
                  <t.Icon className="w-3 h-3 text-emerald-400/70" />
                  <span className="text-[10px] text-white/50">{t.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 05 - Beyond Code */}
          <div data-bento-card className={`${cardBase} md:col-span-2 p-6`}>
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-violet-500/8 blur-3xl pointer-events-none" />

            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600/30 to-indigo-600/30 border border-violet-500/20 flex items-center justify-center">
                <Star className="w-5 h-5 text-violet-400" />
              </div>
              <span className="font-mono text-white/20 text-sm font-bold">05</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                  Beyond{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
                    Code
                  </span>
                </h3>

                <p className="text-white/45 text-xs leading-relaxed mb-5">
                  I'm curious about how things work under the hood. I enjoy exploring low-level concepts, system internals and building tools that make life easier.
                </p>

                <div className="flex flex-wrap gap-2">
                  {beyondTags.map((t) => (
                    <div
                      key={t.label}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/4 border border-white/8 hover:border-violet-500/30 hover:bg-violet-500/8 transition-all duration-300"
                    >
                      <t.Icon className="w-3 h-3 text-violet-400/70" />
                      <span className="text-[10px] text-white/50">{t.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative 3D cube */}
              <div className="hidden sm:flex items-center justify-center w-24 h-24 opacity-20 group-hover:opacity-35 transition-opacity duration-500 flex-shrink-0">
                <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
                  <polygon points="40,8 72,24 72,56 40,72 8,56 8,24" stroke="rgba(139,92,246,0.8)" strokeWidth="1.5" fill="rgba(139,92,246,0.06)" />
                  <polygon points="40,8 72,24 40,40 8,24" stroke="rgba(139,92,246,0.6)" strokeWidth="1" fill="rgba(139,92,246,0.1)" />
                  <polygon points="40,40 72,24 72,56 40,72" stroke="rgba(139,92,246,0.4)" strokeWidth="1" fill="rgba(99,68,200,0.08)" />
                  <polygon points="8,24 40,40 40,72 8,56" stroke="rgba(139,92,246,0.3)" strokeWidth="1" fill="rgba(79,50,180,0.06)" />
                  <line x1="40" y1="8" x2="40" y2="40" stroke="rgba(139,92,246,0.5)" strokeWidth="1" />
                  <line x1="72" y1="24" x2="40" y2="40" stroke="rgba(139,92,246,0.4)" strokeWidth="1" />
                  <line x1="8" y1="24" x2="40" y2="40" stroke="rgba(139,92,246,0.35)" strokeWidth="1" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
