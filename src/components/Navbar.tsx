import { useEffect, useRef, useState } from "react";
import { Menu, X, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

const links = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Journey", href: "#journey", id: "journey" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState("home");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.4, ease: "power3.out" }
    );

    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(100, (y / h) * 100) : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#05070d]/70 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      }`}
    >
      {/* Gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3.5">
        {/* Logo */}
        <a
          href="#home"
          className="group flex items-center gap-2.5 transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 group-hover:border-cyan-400/60 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <span className="font-mono text-sm font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {"</>"}
            </span>
          </div>
          <span className="font-bold text-xl tracking-wide bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent">
            Harsh
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-0.5 p-1 rounded-full border border-white/[0.05] bg-white/[0.02] backdrop-blur-sm">
          {links.map((l) => {
            const active = activeId === l.id;
            return (
              <a
                key={l.href}
                href={l.href}
                className={`relative px-4 py-1.5 text-sm rounded-full transition-all duration-300 ${
                  active
                    ? "text-white"
                    : "text-white/55 hover:text-white/90"
                }`}
              >
                {active && (
                  <span
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                    aria-hidden
                  />
                )}
                <span className="relative">{l.label}</span>
              </a>
            );
          })}
        </div>

        {/* Right */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="https://github.com/IchigoAni-19"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/10 border border-white/0 hover:border-white/10 transition-all duration-300"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/harsh-patel-bb5598268/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/10 border border-white/0 hover:border-white/10 transition-all duration-300"
          >
            <Linkedin className="h-4 w-4" />
          </a>

          <Button
            asChild
            size="sm"
            className="ml-1 h-8 px-4 text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 border-0 shadow-[0_0_18px_rgba(6,182,212,0.35)] hover:shadow-[0_0_28px_rgba(6,182,212,0.55)] transition-all duration-300 rounded-lg"
          >
            <a href="#contact">Contact Me</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(!open)}
          className="md:hidden h-9 w-9 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Scroll progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.03]">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 shadow-[0_0_10px_rgba(6,182,212,0.6)] transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 top-[57px] z-40 bg-[#05070d]/98 backdrop-blur-2xl md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`w-full max-w-xs text-center text-xl font-medium py-4 border-b border-white/5 transition-colors ${
                  activeId === l.id
                    ? "text-cyan-300"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {l.label}
              </a>
            ))}

            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://github.com/IchigoAni-19"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/harsh-patel-bb5598268/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>

            <Button
              asChild
              size="lg"
              className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 border-0"
              onClick={() => setOpen(false)}
            >
              <a href="#contact">Contact Me</a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
