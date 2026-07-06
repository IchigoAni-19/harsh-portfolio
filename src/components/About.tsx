import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code as Code2, Zap, Database, GitBranch, Layers, Terminal, Cpu, Award, Coffee, BookOpen, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

interface BentoSubItem {
  name?: string;
  label?: string;
  icon: typeof Code2;
}

interface BentoItem {
  id: number;
  title: string;
  description?: string;
  size: string;
  gradient: string;
  borderColor: string;
  iconColor: string;
  items?: BentoSubItem[];
}

const bentoItems: BentoItem[] = [
  {
    id: 1,
    title: "Full Stack Developer",
    description: "A passionate developer building scalable web applications and seamless user experiences. I craft solutions from frontend to backend with modern technologies.",
    size: "lg",
    gradient: "from-cyan-500/20 to-blue-500/20",
    borderColor: "border-cyan-500/30",
    iconColor: "text-cyan-400",
  },
  {
    id: 2,
    title: "Tech Stack",
    items: [
      { name: "React", icon: Code2 },
      { name: "Node.js", icon: Terminal },
      { name: "TypeScript", icon: Layers },
      { name: "Python", icon: Cpu },
      { name: "MongoDB", icon: Database },
      { name: "PostgreSQL", icon: Database },
    ],
    size: "md",
    gradient: "from-violet-500/20 to-purple-500/20",
    borderColor: "border-violet-500/30",
    iconColor: "text-violet-400",
  },
  {
    id: 3,
    title: "AI Integration",
    description: "Experienced in integrating AI/ML models and LLMs like Gemini into production applications for intelligent features.",
    size: "md",
    gradient: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-400",
  },
  {
    id: 4,
    title: "Highlights",
    items: [
      { label: "B.Tech Electronics", icon: BookOpen },
      { label: "Cloud Architectures", icon: Globe },
      { label: "Open Source", icon: GitBranch },
      { label: "System Design", icon: Cpu },
    ],
    size: "md",
    gradient: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/30",
    iconColor: "text-emerald-400",
  },
  {
    id: 5,
    title: "Always Learning",
    description: "Driven by curiosity and a constant desire to explore new technologies, frameworks, and best practices in software engineering.",
    size: "md",
    gradient: "from-orange-500/20 to-amber-500/20",
    borderColor: "border-orange-500/30",
    iconColor: "text-orange-400",
  },
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animation
      gsap.fromTo(
        "[data-about-header]",
        { y: 40, opacity: 0, filter: "blur(10px)" },
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

      // Bento cards stagger animation
      gsap.fromTo(
        "[data-bento-card]",
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Floating animation for decorative elements
      gsap.to("[data-float]", {
        y: -15,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-24 px-4 sm:px-6 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          data-float
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-500/10 blur-3xl"
        />
        <div
          data-float
          className="absolute bottom-32 right-10 w-40 h-40 rounded-full bg-violet-500/10 blur-3xl"
        />
        <div
          data-float
          className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-cyan-500/10 blur-2xl"
        />
      </div>

      <div className="mx-auto max-w-6xl relative">
        {/* Section Header */}
        <div className="text-center mb-16" data-about-header>
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1.5 border-cyan-500/40 text-cyan-400 bg-cyan-500/5"
          >
            ABOUT ME
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Turning <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">Ideas</span> into Reality
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A passionate developer crafting digital experiences with cutting-edge technologies
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]">
          {/* Card 01 - Large intro card */}
          <div
            data-bento-card
            className={`lg:col-span-2 lg:row-span-2 relative group rounded-3xl overflow-hidden bg-gradient-to-br ${bentoItems[0].gradient} border ${bentoItems[0].borderColor} backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1`}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative p-8 h-full flex flex-col">
              {/* Card number */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border border-cyan-500/20 flex items-center justify-center">
                  <span className="text-sm font-mono font-bold text-cyan-400">01</span>
                </div>
                <Code2 className={`w-8 h-8 ${bentoItems[0].iconColor}`} />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  {bentoItems[0].title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {bentoItems[0].description}
                </p>
              </div>

              {/* Decorative element */}
              <div className="absolute bottom-0 right-0 w-40 h-40 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-400">
                  <circle cx="80" cy="80" r="60" fill="none" stroke="currentColor" strokeWidth="0.3" />
                  <circle cx="80" cy="80" r="40" fill="none" stroke="currentColor" strokeWidth="0.3" />
                  <circle cx="80" cy="80" r="20" fill="none" stroke="currentColor" strokeWidth="0.3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Card 02 - Tech Stack */}
          <div
            data-bento-card
            className={`lg:row-span-2 relative group rounded-3xl overflow-hidden bg-gradient-to-br ${bentoItems[1].gradient} border ${bentoItems[1].borderColor} backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1`}
          >
            <div className="relative p-6 h-full flex flex-col">
              {/* Card number */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/30 to-purple-500/30 border border-violet-500/20 flex items-center justify-center">
                  <span className="text-xs font-mono font-bold text-violet-400">02</span>
                </div>
                <Layers className={`w-6 h-6 ${bentoItems[1].iconColor}`} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-4">{bentoItems[1].title}</h3>

              <div className="grid grid-cols-2 gap-3 flex-1">
                {bentoItems[1].items?.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary/30 border border-white/5 hover:border-violet-500/30 hover:bg-violet-500/10 transition-all duration-300"
                  >
                    <item.icon className="w-4 h-4 text-violet-400" />
                    <span className="text-sm font-mono text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 03 - AI Integration */}
          <div
            data-bento-card
            className={`relative group rounded-3xl overflow-hidden bg-gradient-to-br ${bentoItems[2].gradient} border ${bentoItems[2].borderColor} backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1`}
          >
            <div className="relative p-6 h-full flex flex-col">
              {/* Card number */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-500/30 border border-blue-500/20 flex items-center justify-center">
                  <span className="text-xs font-mono font-bold text-blue-400">03</span>
                </div>
                <Zap className={`w-6 h-6 ${bentoItems[2].iconColor}`} />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-foreground mb-2">{bentoItems[2].title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {bentoItems[2].description}
              </p>
            </div>
          </div>

          {/* Card 04 - Highlights */}
          <div
            data-bento-card
            className={`relative group rounded-3xl overflow-hidden bg-gradient-to-br ${bentoItems[3].gradient} border ${bentoItems[3].borderColor} backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1`}
          >
            <div className="relative p-6 h-full flex flex-col">
              {/* Card number */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/30 to-teal-500/30 border border-emerald-500/20 flex items-center justify-center">
                  <span className="text-xs font-mono font-bold text-emerald-400">04</span>
                </div>
                <Award className={`w-6 h-6 ${bentoItems[3].iconColor}`} />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-foreground mb-3">{bentoItems[3].title}</h3>

              <div className="flex flex-wrap gap-2">
                {bentoItems[3].items?.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/30 border border-white/5 text-xs"
                  >
                    <item.icon className="w-3 h-3 text-emerald-400" />
                    <span className="text-muted-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 05 - Always Learning */}
          <div
            data-bento-card
            className={`lg:col-span-2 relative group rounded-3xl overflow-hidden bg-gradient-to-br ${bentoItems[4].gradient} border ${bentoItems[4].borderColor} backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1`}
          >
            <div className="relative p-6 h-full flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Card number */}
              <div className="flex items-center justify-between w-full sm:w-auto sm:flex-col gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/30 to-amber-500/30 border border-orange-500/20 flex items-center justify-center">
                  <span className="text-xs font-mono font-bold text-orange-400">05</span>
                </div>
                <Coffee className={`w-6 h-6 ${bentoItems[4].iconColor}`} />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-1">{bentoItems[4].title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {bentoItems[4].description}
                </p>
              </div>

              {/* Decorative code snippet */}
              <div className="hidden lg:block absolute right-6 top-1/2 -translate-y-1/2 font-mono text-xs text-orange-400/40">
                {"<learning />"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
