import { useEffect, useRef, useState } from "react";
import { Download, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

const FULL_NAME = "Harsh Patel";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const splineContainerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cursorGlow = useRef<HTMLDivElement>(null);

  const [typed, setTyped] = useState("");

  // Typewriter effect - full name "Harsh Patel"
  useEffect(() => {
    let i = 0;
    const delay = 800;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        i += 1;
        setTyped(FULL_NAME.slice(0, i));
        if (i >= FULL_NAME.length) clearInterval(interval);
      }, 120);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, []);

  // Dynamic font size based on how many chars typed
  const dynamicFontSize = () => {
    const len = typed.length;
    if (len <= 5) return "text-7xl sm:text-8xl md:text-9xl";
    if (len <= 8) return "text-5xl sm:text-6xl md:text-7xl";
    return "text-4xl sm:text-5xl md:text-6xl";
  };

  // Main entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headlineRef.current,
        { y: 50, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2 },
        0.5
      );

      tl.fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.7"
      );

      tl.fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );

      tl.fromTo(
        "[data-hero-cta]",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.15 },
        "-=0.4"
      );

      tl.fromTo(
        splineContainerRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.5, ease: "power2.out" },
        "-=1"
      );

      gsap.to("[data-hero-orb]", {
        y: -20,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: { each: 0.3, from: "random" },
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
        className="pointer-events-none absolute h-[300px] w-[300px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, hsla(200, 80%, 60%, 0.4) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Floating neon orbs */}
      {[...Array(4)].map((_, i) => (
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
        {/* Left - Content */}
        <div ref={heroContentRef} className="text-center lg:text-left">
          <p className="font-mono text-sm text-cyan-400/70 mb-3 tracking-[0.25em] uppercase">
            Hi, I'm
          </p>

          {/* Typewriter headline - dynamic font size */}
          <h1
            ref={headlineRef}
            className={`font-bold tracking-tight mb-4 transition-all duration-300 ${dynamicFontSize()}`}
            style={{ minHeight: "1.1em" }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              {typed}
            </span>
            <span className="inline-block w-[3px] h-[0.8em] bg-gradient-to-b from-cyan-400 to-blue-600 ml-1.5 -mb-1 animate-pulse align-middle" />
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl sm:text-2xl md:text-3xl font-light text-white/80 mb-6"
          >
            Full Stack Engineer |{" "}
            <span className="text-blue-400 font-medium">AI Integration</span> &{" "}
            <span className="text-cyan-400 font-medium">Cloud Solutions</span>
          </p>

          <p
            ref={descRef}
            className="text-white/50 max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed"
          >
            I craft cutting-edge digital experiences with modern technologies.
            From AI-powered platforms to scalable cloud architectures — I turn
            complex problems into elegant, production-ready solutions.
          </p>

          {/* CTA Buttons - Download Resume only (Hire Me removed) */}
          <div ref={ctaRef} className="flex flex-wrap justify-center lg:justify-start gap-4">
            <Button
              data-hero-cta
              asChild
              size="lg"
              variant="outline"
              className="px-8 py-6 text-base font-semibold border-cyan-500/50 text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/15 hover:border-cyan-400/70 hover:text-cyan-300 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]"
            >
              <a href="/Harsh_Patel_Resume.pdf" download="Harsh_Patel_Resume.pdf">
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </a>
            </Button>
          </div>

          {/* Stats row */}
          <div
            data-hero-cta
            className="flex flex-wrap justify-center lg:justify-start gap-6 mt-10"
          >
            {[
              { value: "3+", label: "Projects Shipped" },
              { value: "2026", label: "Graduating" },
              { value: "Full Stack", label: "Engineer" },
            ].map((s) => (
              <div key={s.label} className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-white/40 font-mono">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Spline 3D Interactive Orb */}
        <div
          ref={splineContainerRef}
          className="relative flex justify-center lg:justify-end items-center min-h-[400px] lg:min-h-[560px]"
        >
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, hsla(200, 80%, 50%, 0.25) 0%, transparent 60%)",
              filter: "blur(50px)",
            }}
          />

          <div className="relative w-full h-[400px] lg:h-[560px] rounded-3xl overflow-hidden">
            <iframe
              src="https://my.spline.design/reactiveorb-lBmPVC60WGcCyWrDfTG92lbB/"
              frameBorder="0"
              width="100%"
              height="100%"
              className="w-full h-full"
              title="Interactive 3D Orb"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <p className="text-xs text-white/30 font-mono tracking-widest">SCROLL</p>
        <ArrowDown className="h-4 w-4 text-cyan-400/60" />
      </div>
    </section>
  );
};

export default Hero;
