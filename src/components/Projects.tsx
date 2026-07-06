import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ p, index }: { p: (typeof projects)[number]; index: number }) => {
  return (
    <div
      data-project-card
      className="group relative flex-shrink-0 w-[340px] sm:w-[380px] lg:w-[420px]"
    >
      {/* Glassmorphic card */}
      <div className="relative h-full rounded-2xl overflow-hidden transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2">
        {/* Glow effect on hover */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-violet-500/0 to-blue-500/0 group-hover:from-cyan-500/20 group-hover:via-violet-500/20 group-hover:to-blue-500/20 blur-xl transition-all duration-500" />

        {/* Border gradient */}
        <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-cyan-500/50 transition-all duration-500" />

        {/* Card content */}
        <div className="relative h-full bg-card/80 backdrop-blur-xl rounded-2xl p-6 overflow-hidden">
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Project number badge */}
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center border border-white/10">
            <span className="text-sm font-mono font-bold text-cyan-400">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Content */}
          <div className="relative space-y-4">
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-foreground group-hover:text-cyan-400 transition-colors">
                  {p.name}
                </h3>
                {p.demoUrl && (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-cyan-400">LIVE</span>
                  </span>
                )}
              </div>
              <span className="text-xs font-mono text-muted-foreground">{p.year}</span>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {p.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5">
              {p.techStack.slice(0, 5).map((t) => (
                <Badge
                  key={t}
                  variant="secondary"
                  className="text-[10px] font-mono px-2 py-0.5 bg-secondary/30 border-white/5 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-300"
                >
                  {t}
                </Badge>
              ))}
              {p.techStack.length > 5 && (
                <Badge
                  variant="secondary"
                  className="text-[10px] font-mono px-2 py-0.5 bg-secondary/30"
                >
                  +{p.techStack.length - 5}
                </Badge>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <Button
                size="sm"
                variant="outline"
                asChild
                className="flex-1 border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400 transition-all duration-300"
              >
                <a href={p.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-1.5" />
                  Code
                </a>
              </Button>
              {p.demoUrl && (
                <Button
                  size="sm"
                  asChild
                  className="flex-1 bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 border-0"
                >
                  <a href={p.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-1.5" />
                    Demo
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Decorative corner element */}
          <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
            <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-400">
              <circle cx="80" cy="80" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="80" cy="80" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="80" cy="80" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = 400;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
    setTimeout(checkScrollButtons, 350);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animation
      gsap.fromTo(
        "[data-section-header]",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        "[data-project-card]",
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    // Check scroll buttons on mount
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", checkScrollButtons);
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Background decorative glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div data-section-header className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1.5 border-violet-500/40 text-violet-400 bg-violet-500/5"
          >
            PORTFOLIO
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Crafted with passion, powered by modern technology
          </p>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          {/* Scroll buttons */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-card/90 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6 text-foreground" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-card/90 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6 text-foreground" />
            </button>
          )}

          {/* Gradient edge fade effects */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-[5] pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-[5] pointer-events-none" />

          {/* Scrollable area */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollButtons}
            className="flex gap-6 overflow-x-auto pb-4 px-2 scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {projects.map((p, i) => (
              <ProjectCard key={p.name} p={p} index={i} />
            ))}
          </div>
        </div>

        {/* View all projects CTA */}
        <div className="text-center mt-10" data-section-header>
          <Button
            variant="outline"
            asChild
            className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400/70 hover:text-cyan-300 transition-all duration-300"
          >
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              View All Projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
