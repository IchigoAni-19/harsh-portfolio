import { useEffect, useRef, useState, Suspense } from "react";
import { Github, Linkedin, Download, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const splineContainerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cursorGlow = useRef<HTMLDivElement>(null);
  const [splineLoaded, setSplineLoaded] = useState(false);

  // Typewriter effect
  const [typed, setTyped] = useState("");
  const fullText = "Harsh";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTyped(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // Main entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Headline - blur to clear, y offset
      tl.fromTo(
        headlineRef.current,
        { y: 50, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2 },
        0.3
      );

      // Subtitle
      tl.fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.7"
      );

      // Description
      tl.fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );

      // CTA buttons with stagger
      tl.fromTo(
        "[data-hero-cta]",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.15 },
        "-=0.4"
      );

      // Spline container entrance from right
      tl.fromTo(
        splineContainerRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.5, ease: "power2.out" },
        "-=1"
      );

      // Floating orbs animation
      gsap.to("[data-hero-orb]", {
        y: -20,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: {
          each: 0.3,
          from: "random",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Cursor glow follow
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!cursorGlow.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      gsap.to(cursorGlow.current, {
        x: e.clientX - rect.left - 150,
        y: e.clientY - rect.top - 150,
        duration: 0.8,
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
      className="relative flex min-h-screen items-center px-4 sm:px-6 pt-20 pb-10 overflow-hidden"
    >
      {/* Cursor follow glow */}
      <div
        ref={cursorGlow}
        className="pointer-events-none absolute h-[300px] w-[300px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, hsla(200, 80%, 60%, 0.3) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Floating neon orbs in background */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          data-hero-orb
          className="pointer-events-none absolute rounded-full"
          style={{
            width: `${60 + i * 20}px`,
            height: `${60 + i * 20}px`,
            left: `${10 + i * 18}%`,
            top: `${20 + (i % 3) * 25}%`,
            background: `radial-gradient(circle, ${
              i % 2 === 0
                ? "hsla(200, 80%, 60%, 0.15)"
                : "hsla(260, 70%, 60%, 0.12)"
            } 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left side - Content */}
        <div ref={heroContentRef} className="text-center lg:text-left">
          {/* Intro line */}
          <p className="font-mono text-sm text-primary/80 mb-3 tracking-widest">
            HI, I'M
          </p>

          {/* Main headline - with typewriter */}
          <h1
            ref={headlineRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
          >
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              {typed}
            </span>
            <span className="inline-block w-[3px] h-[0.85em] bg-gradient-to-b from-cyan-400 to-blue-600 ml-2 -mb-2 animate-pulse align-middle" />
          </h1>

          {/* Subtitle with roles */}
          <p
            ref={subtitleRef}
            className="text-xl sm:text-2xl md:text-3xl font-light text-foreground/90 mb-6"
          >
            Full Stack Engineer |{" "}
            <span className="text-primary font-medium">AI Integration</span> &{" "}
            <span className="text-cyan-400 font-medium">Cloud Solutions</span>
          </p>

          {/* Description */}
          <p
            ref={descRef}
            className="text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed"
          >
            I craft cutting-edge digital experiences with modern technologies.
            From AI-powered platforms to scalable cloud architectures — I turn
            complex problems into elegant, production-ready solutions.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap justify-center lg:justify-start gap-4">
            {/* Hire Me - Primary glowing button */}
            <Button
              data-hero-cta
              asChild
              size="lg"
              className="relative group px-8 py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 border-0 shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] transition-all duration-500"
            >
              <a href="#contact">
                <span className="relative z-10">Hire Me</span>
                <span className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-400 to-violet-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
              </a>
            </Button>

            {/* Download Resume */}
            <Button
              data-hero-cta
              asChild
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg font-medium border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400/70 hover:text-cyan-300 transition-all duration-300"
            >
              <a href="/resume.pdf" download>
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </a>
            </Button>

            {/* Social icons */}
            <div className="flex items-center gap-2 ml-2">
              <Button
                data-hero-cta
                variant="ghost"
                size="icon"
                asChild
                className="h-12 w-12 rounded-full border border-border/50 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400 transition-all duration-300"
              >
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button
                data-hero-cta
                variant="ghost"
                size="icon"
                asChild
                className="h-12 w-12 rounded-full border border-border/50 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400 transition-all duration-300"
              >
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Right side - Spline 3D */}
        <div
          ref={splineContainerRef}
          className="relative flex justify-center lg:justify-end items-center min-h-[400px] lg:min-h-[500px]"
        >
          {/* Glow background behind 3D */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: "radial-gradient(circle at center, hsla(200, 80%, 50%, 0.2) 0%, transparent 60%)",
              filter: "blur(40px)",
            }}
          />

          {/* Placeholder for Spline - using an animated gradient box as fallback */}
          <div className="relative w-full max-w-md aspect-square">
            {/* Animated border */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 opacity-60 blur-sm animate-pulse" />
            <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600 opacity-80" />

            {/* Inner content */}
            <div className="relative rounded-3xl bg-card/90 backdrop-blur-xl h-full flex items-center justify-center overflow-hidden">
              {/* 3D-like animated orbs */}
              <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-24 h-24 rounded-full bg-blue-500/30 blur-2xl animate-blob-1" />
                <div className="absolute bottom-1/3 right-1/4 w-32 h-32 rounded-full bg-violet-500/30 blur-2xl animate-blob-2" />
                <div className="absolute bottom-1/4 left-1/3 w-28 h-28 rounded-full bg-cyan-500/20 blur-2xl animate-blob-3" />
              </div>

              {/* Center code icon */}
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="text-6xl font-mono font-bold bg-gradient-to-br from-blue-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  {"</>"}
                </div>
                <p className="text-sm text-muted-foreground font-mono">3D Experience</p>
              </div>

              {/* Orbital elements */}
              <div className="absolute inset-0 pointer-events-none" style={{ animation: "orbit 20s linear infinite" }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_20px_hsl(180,80%,50%)]" />
              </div>
              <div className="absolute inset-4 pointer-events-none" style={{ animation: "orbit 15s linear infinite reverse" }}>
                <div className="absolute bottom-0 left-1/4 w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_15px_hsl(260,70%,60%)]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <p className="text-xs text-muted-foreground font-mono tracking-widest">SCROLL</p>
        <ArrowDown className="h-5 w-5 text-primary animate-pulse" />
      </div>
    </section>
  );
};

export default Hero;
