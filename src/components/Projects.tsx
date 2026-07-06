import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, ExternalLink, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { useCardTilt } from "@/hooks/useCardTilt";

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ p }: { p: (typeof projects)[number] }) => {
  const { ref, handlers } = useCardTilt(6);

  return (
    <div ref={ref} {...handlers} data-project className="will-change-transform">
      <Card className="h-full border-border bg-card/70 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <CardTitle className="text-2xl font-bold tracking-tight">{p.name}</CardTitle>
                <span className="font-mono text-xs text-muted-foreground px-2 py-0.5 rounded-full border border-border">
                  {p.year}
                </span>
                {p.demoUrl && (
                  <span className="inline-flex items-center gap-1 font-mono text-xs text-primary px-2 py-0.5 rounded-full border border-primary/40 bg-primary/10">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    Live
                  </span>
                )}
              </div>
              <CardDescription className="text-base leading-relaxed">
                {p.description}
              </CardDescription>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <Button variant="ghost" size="icon" asChild className="hover:text-primary">
                <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              {p.demoUrl && (
                <Button variant="ghost" size="icon" asChild className="hover:text-accent">
                  <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2 font-mono">Features</h4>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2 font-mono">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {p.techStack.map((t) => (
                <Badge
                  key={t}
                  variant="secondary"
                  className="font-mono text-xs transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
                >
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <h4 className="text-sm font-semibold text-foreground mb-2 font-mono flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-primary" />
              What I Learned
            </h4>
            <ul className="space-y-1.5">
              {p.learned.map((l) => (
                <li key={l} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  {l}
                </li>
              ))}
            </ul>
          </div>

          {p.demoUrl && (
            <div className="pt-2">
              <Button asChild variant="outline" className="w-full border-primary/30 hover:bg-primary/10 hover:border-primary/60">
                <a href={p.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Live Demo
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const Projects = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-project]", {
        y: 100,
        opacity: 0,
        rotateX: 12,
        scale: 0.92,
        duration: 1.4,
        stagger: 0.25,
        ease: "power3.out",
        transformPerspective: 1000,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "restart none none reverse",
        },
      });

      gsap.from("[data-project-heading]", {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", toggleActions: "restart none none reverse" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={ref} className="py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <div data-project-heading>
          <h2 className="font-mono text-sm text-primary mb-2">04.</h2>
          <h3 className="text-3xl font-bold mb-2">Featured Projects</h3>
          <div className="h-[2px] w-16 bg-primary mb-10 origin-left" />
        </div>
        <div className="grid gap-8" style={{ perspective: "1000px" }}>
          {projects.map((p) => (
            <ProjectCard key={p.name} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
