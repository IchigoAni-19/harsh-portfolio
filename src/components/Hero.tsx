import { useEffect, useRef, useState } from "react";
import { Download, ArrowDown, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

const FULL_NAME = "Harsh Patel";

const ROLES = [
  "Full-Stack Engineer",
  "AI Integration & Backend Architect",
  "Problem Solver",
];

const Hero = ({ loaded = false }: { loaded?: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cursorGlow = useRef<HTMLDivElement>(null);

  const [typed, setTyped] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);

  // Typewriter for name
  useEffect(() => {
    if (!loaded) return;
    setTyped("");
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        i += 1;
        setTyped(FULL_NAME.slice(0, i));
        if (i >= FULL_NAME.length) clearInterval(interval);
      }, 100);
    }, 350);
    return () => clearTimeout(timer);
  }, [loaded]);

  // Rotating role text
  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-hero-badge]",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.2
      )
        .fromTo(
          headlineRef.current,
          { y: 40, opacity: 0, filter: "blur(10px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 1 },
          0.4
        )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          descRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          "[data-hero-cta]",
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1 },
          "-=0.3"
        );

      gsap.to("[data-hero-orb]", {
        y: -18,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: { each: 0.4, from: "random" },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Cursor follow glow
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!cursorGlow.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      gsap.to(cursorGlow.current, {
        x: e.clientX - rect.left - 200,
        y: e.clientY - rect.top - 200,
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
      className="relative flex min-h-screen items-center px-4 sm:px-6 pt-24 pb-16 overflow-hidden"
    >
      {/* Cursor glow */}
      <div
        ref={cursorGlow}
        className="pointer-events-none absolute h-[400px] w-[400px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, hsla(190,90%,55%,0.35) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(hsla(190,90%,60%,1) 1px, transparent 1px), linear-gradient(90deg, hsla(190,90%,60%,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* Floating orbs */}
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          data-hero-orb
          className="pointer-events-none absolute rounded-full"
          style={{
            width: `${80 + i * 30}px`,
            height: `${80 + i * 30}px`,
            left: `${8 + i * 22}%`,
            top: `${18 + (i % 3) * 24}%`,
            background: `radial-gradient(circle, ${
              i % 2 === 0
                ? "hsla(190,90%,55%,0.18)"
                : "hsla(240,80%,65%,0.14)"
            } 0%, transparent 70%)`,
            filter: "blur(48px)",
          }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-5xl w-full text-center">
        <div className="mx-auto max-w-3xl">
          {/* Availability badge */}
          {/* <div
            data-hero-badge
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/5 backdrop-blur-sm mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-xs text-emerald-300/90 tracking-wide">
              Available for opportunities
            </span>
          </div> */}

          <p className="font-mono text-sm text-cyan-400/70 mb-3 tracking-[0.25em] uppercase">
            Hi, I'm
          </p>

          {/* Typewriter headline */}
          <h1
            ref={headlineRef}
            className="font-bold tracking-tight mb-5 text-6xl sm:text-7xl md:text-8xl leading-[1.05]"
            style={{ minHeight: "1.1em" }}
          >
            <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(34,211,238,0.15)]">
              {typed}
            </span>
            <span className="inline-block w-[4px] h-[0.75em] bg-cyan-400 ml-1.5 -mb-1 animate-pulse align-middle rounded-sm" />
          </h1>

          {/* Rotating role */}
          <p
            ref={subtitleRef}
            className="text-xl sm:text-2xl md:text-3xl font-light text-white/80 mb-6 min-h-[2.2em]"
          >
            <span className="text-white/50">I'm a </span>
            <span
              key={roleIndex}
              className="inline-block bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent font-medium animate-fade-in"
            >
              {ROLES[roleIndex]}
            </span>
          </p>

          <p
            ref={descRef}
            className="text-white/55 max-w-xl mx-auto mb-9 leading-relaxed text-base sm:text-lg"
          >
            I build AI-powered platforms and full-stack systems that feel fast,
            secure, and delightful — from intelligent resume tooling to
            recursive discussion engines and Unix-level shell interpreters.
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="flex flex-wrap justify-center gap-3"
          >
            <Button
              data-hero-cta
              asChild
              size="lg"
              className="group px-7 py-6 text-base font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 border-0 shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_40px_rgba(6,182,212,0.55)] transition-all duration-300 hover:-translate-y-0.5"
            >
              <a href="#contact">
                <Mail className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                Let's Connect
              </a>
            </Button>
            <Button
              data-hero-cta
              asChild
              size="lg"
              variant="outline"
              className="group px-7 py-6 text-base font-semibold border-cyan-500/40 text-cyan-300 bg-cyan-500/5 hover:bg-cyan-500/15 hover:border-cyan-400/70 hover:text-cyan-200 transition-all duration-300 hover:-translate-y-0.5"
            >
              <a
                href="/resume.pdf"
                download="resume.pdf"
              >
                <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                Download Resume
              </a>
            </Button>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce">
        <p className="text-[10px] text-white/30 font-mono tracking-[0.3em]">
          SCROLL
        </p>
        <ArrowDown className="h-3.5 w-3.5 text-cyan-400/60" />
      </div>
    </section>
  );
};

export default Hero;
