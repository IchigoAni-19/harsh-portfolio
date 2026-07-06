import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Entrance animation
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 0.8,
      delay: 0.5,
      ease: "power3.out",
    });

    // Scroll detection for background change
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-card/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-4">
        {/* Logo */}
        <a
          href="#home"
          className="group font-mono text-lg font-bold transition-all duration-300 hover:scale-105"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 group-hover:from-cyan-300 group-hover:via-blue-400 group-hover:to-violet-400">
            {"<dev />"}
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <span className="font-mono text-xs text-cyan-400/70 group-hover:text-cyan-400 mr-1.5">
                {String(i + 1).padStart(2, "0")}.
              </span>
              {l.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-violet-400 group-hover:w-3/4 transition-all duration-300" />
            </a>
          ))}

          {/* CTA Button */}
          <Button
            asChild
            size="sm"
            className="ml-4 bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 border-0 shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500"
          >
            <a href="#contact">Hire Me</a>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(!open)}
          className="md:hidden h-10 w-10 rounded-full border border-white/10 bg-secondary/30 backdrop-blur-sm"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu - Full Screen Slide */}
      {open && (
        <div className="fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-xl md:hidden animate-in slide-in-from-top-5 duration-300">
          <div className="flex flex-col items-center justify-center h-full gap-2">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-2xl font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 py-4"
              >
                <span className="font-mono text-sm text-cyan-400 mr-3">
                  {String(i + 1).padStart(2, "0")}.
                </span>
                {l.label}
              </a>
            ))}
            <Button
              asChild
              size="lg"
              className="mt-4 bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 border-0"
              onClick={() => setOpen(false)}
            >
              <a href="#contact">Hire Me</a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
