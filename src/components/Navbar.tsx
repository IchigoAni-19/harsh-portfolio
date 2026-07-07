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
      { y: 0, opacity: 1, duration: 1, delay: 0.4, ease: "power3.out" },
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    links.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 transition-all duration-500"
    >
      <div
        className={`mx-auto max-w-7xl rounded-full border border-white/10 px-4 sm:px-5 py-3 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.18)] transition-colors duration-500 ${
          scrolled ? "bg-black/18" : "bg-black/8"
        }`}
      >
        <div className="grid items-center gap-4 md:grid-cols-[auto_1fr_auto]">
          <a
            href="#home"
            className="group flex items-center gap-2.5 justify-self-start transition-transform duration-300 hover:scale-[1.03]"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-400/20 bg-violet-500/10 transition-all duration-300 group-hover:border-violet-300/60 group-hover:shadow-[0_0_18px_rgba(168,85,247,0.35)]">
              <span className="font-mono text-sm font-bold bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                {"</>"}
              </span>
            </div>
            <span className="font-bold text-xl tracking-wide bg-gradient-to-r from-white via-violet-100 to-fuchsia-200 bg-clip-text text-transparent">
              Harsh
            </span>
          </a>

          <div className="hidden md:flex items-center justify-center gap-1 justify-self-center">
            {links.map((link) => {
              const active = activeId === link.id;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`group relative px-3 py-2 text-sm transition-colors duration-300 ${
                    active ? "text-violet-300" : "text-white/60"
                  } hover:text-violet-300`}
                >
                  <span className="relative z-10">{link.label}</span>
                  <span
                    className={`absolute left-3 right-3 -bottom-0.5 h-px origin-left bg-violet-400 transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-2 justify-self-end">
            <a
              href="https://github.com/IchigoAni-19"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/55 transition-all duration-300 hover:border-violet-400/60 hover:bg-violet-400/10 hover:text-violet-300 hover:shadow-[0_0_18px_rgba(168,85,247,0.25)]"
            >
              <Github className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            </a>
            <a
              href="https://www.linkedin.com/in/harsh-patel-bb5598268/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/55 transition-all duration-300 hover:border-violet-400/60 hover:bg-violet-400/10 hover:text-violet-300 hover:shadow-[0_0_18px_rgba(168,85,247,0.25)]"
            >
              <Linkedin className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            </a>

            <Button
              asChild
              size="sm"
              className="ml-1 h-9 rounded-full border-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 text-xs font-semibold shadow-[0_0_18px_rgba(168,85,247,0.28)] transition-all duration-300 hover:from-violet-500 hover:to-fuchsia-500 hover:shadow-[0_0_28px_rgba(168,85,247,0.42)]"
            >
              <a href="#contact">Contact Me</a>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(!open)}
            className="md:hidden justify-self-end h-9 w-9 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-violet-500/15 hover:text-violet-300"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.03]">
        <div
          className="h-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.55)] transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {open && (
        <div className="fixed inset-0 top-[72px] z-40 bg-[#05070d]/80 backdrop-blur-2xl md:hidden">
          <div className="flex h-full flex-col items-center justify-center gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`w-full max-w-xs border-b border-white/5 py-4 text-center text-xl font-medium transition-colors ${
                  activeId === link.id
                    ? "text-violet-300"
                    : "text-white/70 hover:text-violet-300"
                }`}
              >
                {link.label}
              </a>
            ))}

            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://github.com/IchigoAni-19"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 transition-colors hover:text-violet-300"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/harsh-patel-bb5598268/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 transition-colors hover:text-violet-300"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>

            <Button
              asChild
              size="lg"
              className="mt-4 border-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500"
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