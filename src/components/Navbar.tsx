import { useEffect, useRef, useState } from "react";
import { Menu, X, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.4, ease: "power3.out" }
    );

    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent"
    >
      {/* Gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-50" />

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3.5">
        {/* Logo - code sign + name */}
        <a
          href="#home"
          className="group flex items-center gap-2.5 transition-all duration-300 hover:scale-105"
        >
          {/* Code bracket icon */}
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 group-hover:border-cyan-400/60 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <span className="font-mono text-sm font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {"</>"}
            </span>
          </div>
          {/* Name */}
          <span className="font-bold text-xl tracking-wide bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent">
            Harsh
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-0.5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative px-4 py-2 text-sm text-white/60 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5"
            >
              {l.label}
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-3/5 transition-all duration-300 rounded-full" />
            </a>
          ))}
        </div>

        {/* Right: Social icons + Contact Me */}
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
            className="ml-1 h-8 px-4 text-xs font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 border-0 shadow-[0_0_18px_rgba(6,182,212,0.3)] hover:shadow-[0_0_28px_rgba(6,182,212,0.45)] transition-all duration-400 rounded-lg"
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

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 top-[57px] z-40 bg-[#080814]/98 backdrop-blur-2xl md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="w-full max-w-xs text-center text-xl font-medium text-white/70 hover:text-white transition-colors duration-300 py-4 border-b border-white/5"
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
              className="mt-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 border-0"
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
