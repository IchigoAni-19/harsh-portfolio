import { useEffect, useRef, useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Activity", href: "#activity" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      ease: "power3.out",
    });
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#home" className="font-mono text-lg font-bold text-primary transition-transform duration-300 hover:scale-110">
          {"<dev />"}
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="font-mono text-xs text-primary mr-1">0{i + 1}.</span>
              {l.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="transition-transform duration-300 hover:rotate-180"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl px-6 py-4 md:hidden">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="font-mono text-xs text-primary mr-2">0{i + 1}.</span>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
