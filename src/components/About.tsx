import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  User,
  Code2,
  Heart,
  Rocket,
  Star,
  GraduationCap,
  Cloud,
  Terminal,
  Cpu,
  GitBranch,
  Database,
  Layers,
  Zap,
  Globe,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

const skillIcons = [
  { name: "HTML5", icon: Globe },
  { name: "CSS3", icon: Layers },
  { name: "JavaScript", icon: Zap },
  { name: "React", icon: Code2 },
  { name: "Node.js", icon: Database },
  { name: "Python", icon: Code2 },
  { name: "Git", icon: GitBranch },
  { name: "GSAP", icon: Rocket },
];

const highlights = [
  { icon: GraduationCap, label: "B.Tech in Electronics" },
  { icon: Code2, label: "Full Stack Developer" },
  { icon: Zap, label: "AI Integration Expert" },
  { icon: Cloud, label: "Cloud Architectures" },
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header - blur to clear
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
            toggleActions: "restart none none reverse",
          },
        }
      );

      // Profile image - enter from left with lift effect
      gsap.fromTo(
        imageRef.current,
        { x: -80, opacity: 0, rotateY: 15 },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Bio text - staggered entrance
      gsap.fromTo(
        "[data-bio-line]",
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bioRef.current,
            start: "top 80%",
          },
        }
      );

      // Highlights - staggered icons
      gsap.fromTo(
        "[data-highlight]",
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: "[data-highlights]",
            start: "top 85%",
          },
        }
      );

      // Skill icons - staggered pop-in
      gsap.fromTo(
        "[data-skill-icon]",
        { scale: 0, opacity: 0, rotation: -20 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.5,
          stagger: {
            each: 0.08,
            from: "random",
          },
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 85%",
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-frac2 gap-12 items-center">
          {/* Left - Profile Image with Glow */}
          <div ref={imageRef} className="flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Outer glow rings */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-700 animate-pulse" />
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-violet-500/50 opacity-40 blur-xl" />

              {/* Main image container */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-white/10 backdrop-blur-xl bg-card/50 group-hover:border-cyan-500/50 transition-all duration-500 group-hover:scale-105 group-hover:rotate-2">
                {/* Inner gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-violet-500/20" />

                {/* Placeholder avatar */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-card to-secondary">
                  <div className="relative">
                    <User className="w-32 h-32 text-muted-foreground/40" />
                    {/* Animated code symbols */}
                    <div className="absolute -top-8 -right-8 text-2xl font-mono text-cyan-400/60 animate-pulse">{"{"}</div>
                    <div className="absolute -bottom-8 -left-8 text-2xl font-mono text-violet-400/60 animate-pulse">{"}"}</div>
                  </div>
                </div>

                {/* Corner accents */}
                <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_hsl(180,80%,50%)]" />
                <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-violet-400 shadow-[0_0_15px_hsl(260,70%,60%)]" />
              </div>

              {/* Floating tech badges around image */}
              <div className="absolute -top-4 -right-4 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-mono backdrop-blur-sm animate-bounce" style={{ animationDelay: "0s" }}>
                React
              </div>
              <div className="absolute -bottom-2 -left-6 px-3 py-1.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-400 text-xs font-mono backdrop-blur-sm animate-bounce" style={{ animationDelay: "0.5s" }}>
                Node.js
              </div>
              <div className="absolute top-1/2 -right-8 px-3 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-mono backdrop-blur-sm animate-bounce" style={{ animationDelay: "1s" }}>
                AI
              </div>
            </div>
          </div>

          {/* Right - Bio Content */}
          <div ref={bioRef} className="space-y-6">
            {/* Bio paragraphs */}
            <div className="space-y-4">
              <p data-bio-line className="text-lg text-foreground/90 leading-relaxed">
                I'm a{" "}
                <span className="font-semibold text-cyan-400">Full Stack Engineer</span> with a
                passion for building seamless digital experiences. From elegant frontends to
                robust backends, I craft solutions that scale.
              </p>
              <p data-bio-line className="text-muted-foreground leading-relaxed">
                With a background in Electronics Engineering, I bring a unique perspective to
                software development. I specialize in{" "}
                <span className="text-blue-400">AI integration</span>,{" "}
                <span className="text-violet-400">cloud architectures</span>, and creating
                products that solve real-world problems.
              </p>
              <p data-bio-line className="text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring system internals, contributing
                to open source, or diving into the latest tech innovations.
              </p>
            </div>

            {/* Highlights pills */}
            <div data-highlights className="flex flex-wrap gap-3">
              {highlights.map((h, i) => (
                <div
                  key={i}
                  data-highlight
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 border border-border/50 backdrop-blur-sm hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300"
                >
                  <h.icon className="h-4 w-4 text-primary" />
                  <span className="text-sm text-foreground/80">{h.label}</span>
                </div>
              ))}
            </div>

            {/* Skill icons grid */}
            <div ref={skillsRef} className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">Technologies I work with:</p>
              <div className="flex flex-wrap gap-3">
                {skillIcons.map((skill, i) => (
                  <div
                    key={skill.name}
                    data-skill-icon
                    className="group relative flex flex-col items-center gap-1"
                  >
                    <div className="w-12 h-12 rounded-xl bg-card/80 border border-border/50 flex items-center justify-center backdrop-blur-sm group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10 group-hover:scale-110 transition-all duration-300 cursor-pointer">
                      <skill.icon className="h-5 w-5 text-muted-foreground group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <span className="text-[10px] text-muted-foreground/60 font-mono">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
