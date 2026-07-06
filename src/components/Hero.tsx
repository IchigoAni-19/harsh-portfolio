import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, FileText, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

const FULL_NAME = "Harsh Patel";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorGlow = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState("");

  // Typewriter effect on page load
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTyped(FULL_NAME.slice(0, i));
      if (i >= FULL_NAME.length) clearInterval(interval);
    }, 110);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from("[data-hero-line]", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        skewY: 4,
      })
        .from(
          "[data-hero-btn]",
          {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(2)",
          },
          "-=0.4"
        )
        .from(
          "[data-hero-image]",
          {
            scale: 0.7,
            opacity: 0,
            x: 60,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=1"
        )
        .from(
          "[data-hero-glow]",
          {
            scale: 0.5,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
          },
          0
        );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!cursorGlow.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      gsap.to(cursorGlow.current, {
        x: e.clientX - rect.left - 200,
        y: e.clientY - rect.top - 200,
        duration: 1,
        ease: "power2.out",
      });
    };
    const el = containerRef.current;
    el?.addEventListener("mousemove", handleMouse);
    return () => el?.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative flex min-h-screen items-center px-6 pt-20 overflow-hidden"
    >
      <div
        ref={cursorGlow}
        data-hero-glow
        className="pointer-events-none absolute h-[400px] w-[400px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side */}
        <div>
          <p data-hero-line className="font-mono text-sm text-primary mb-4">
            Hi, my name is
          </p>
          <h1
            className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl min-h-[1.1em]"
          >
            <span>{typed}</span>
            <span className="inline-block w-[3px] h-[0.9em] bg-primary ml-1 -mb-1 animate-pulse align-middle" />
          </h1>
          <p data-hero-line className="mt-4 text-xl text-muted-foreground sm:text-2xl">
            Full-Stack Developer & AI Engineer
          </p>
          <p data-hero-line className="mt-6 max-w-lg text-muted-foreground">
            I build production-grade full-stack platforms with React, Node.js, and AI. From
            AI-powered interview prep tools to recursive discussion systems and custom shell
            interpreters — I turn ideas into impactful, reliable software.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div data-hero-btn>
              <Button asChild size="lg">
                <a href="#contact">
                  <FileText className="mr-2 h-4 w-4" />
                  Resume
                </a>
              </Button>
            </div>
            <div data-hero-btn>
              <Button variant="outline" size="icon" asChild className="h-11 w-11">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
            </div>
            <div data-hero-btn>
              <Button variant="outline" size="icon" asChild className="h-11 w-11">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Right side — Image placeholder */}
        <div data-hero-image className="flex justify-center lg:justify-end">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary via-accent to-primary opacity-50 blur-sm group-hover:opacity-80 transition-opacity duration-700 animate-glow-pulse" />

            <div className="absolute -inset-8 animate-orbit-slow pointer-events-none">
              <div className="absolute top-0 left-1/2 h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
            </div>
            <div className="absolute -inset-10 animate-orbit-medium pointer-events-none" style={{ animationDirection: "reverse" }}>
              <div className="absolute bottom-0 right-1/4 h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_hsl(var(--accent))]" />
            </div>
            <div className="absolute -inset-6 animate-orbit-fast pointer-events-none">
              <div className="absolute top-1/4 right-0 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_6px_hsl(var(--primary))]" />
            </div>

            <div className="absolute inset-0 rounded-2xl border-2 border-primary/40 animate-pulse-ring pointer-events-none" />
            <div className="absolute inset-0 rounded-2xl border-2 border-accent/30 animate-pulse-ring pointer-events-none" style={{ animationDelay: "1.5s" }} />

            <div className="absolute -inset-4 pointer-events-none overflow-visible">
              <div className="absolute bottom-0 left-[20%] h-1.5 w-1.5 rounded-full bg-primary/60 animate-float-up" />
              <div className="absolute bottom-0 left-[50%] h-1 w-1 rounded-full bg-accent/60 animate-float-up" style={{ animationDelay: "1s" }} />
              <div className="absolute bottom-0 left-[75%] h-1.5 w-1.5 rounded-full bg-primary/40 animate-float-up" style={{ animationDelay: "2s" }} />
              <div className="absolute bottom-0 left-[35%] h-1 w-1 rounded-full bg-accent/50 animate-float-up" style={{ animationDelay: "0.5s" }} />
            </div>

            <div className="relative w-64 h-72 sm:w-72 sm:h-80 rounded-2xl border-2 border-primary/30 bg-card/80 backdrop-blur-sm flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-primary/60 group-hover:shadow-2xl group-hover:shadow-primary/20">
              <User className="h-20 w-20 text-muted-foreground/30" />
            </div>
            <div className="absolute -bottom-3 -right-3 w-64 h-72 sm:w-72 sm:h-80 rounded-2xl border-2 border-accent/20 -z-10 transition-all duration-500 group-hover:border-accent/40" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="h-10 w-6 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5">
          <div className="h-2 w-1 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
