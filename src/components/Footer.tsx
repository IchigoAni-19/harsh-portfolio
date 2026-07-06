import { useEffect, useRef } from "react";
import { Github, Linkedin, Twitter, Heart } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: Github, href: "https://github.com/IchigoAni-19", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/harsh-patel-bb5598268/", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade + slide-up animation
      gsap.fromTo(
        "[data-footer-content]",
        { y: 60, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );

      // Floating particles animation
      particlesRef.current.forEach((particle, i) => {
        if (particle) {
          gsap.to(particle, {
            y: -30 - Math.random() * 20,
            x: (Math.random() - 0.5) * 40,
            opacity: 0.2,
            duration: 3 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: i * 0.2,
          });
        }
      });

      // Glow pulses
      gsap.to("[data-glow-particle]", {
        opacity: 0.4,
        scale: 1.2,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
        ease: "power1.inOut",
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative border-t border-white/10 py-8 px-4 sm:px-6 overflow-hidden"
    >
      {/* Floating particles background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (particlesRef.current[i] = el)}
            data-glow-particle
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${
                i % 3 === 0
                  ? "hsla(180, 80%, 50%, 0.3)"
                  : i % 3 === 1
                  ? "hsla(260, 70%, 60%, 0.3)"
                  : "hsla(210, 80%, 50%, 0.3)"
              } 0%, transparent 70%)`,
              filter: "blur(1px)",
              opacity: 0.2,
            }}
          />
        ))}
      </div>

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-t from-cyan-500/10 to-transparent blur-3xl" />
      </div>

      <div
        data-footer-content
        className="relative z-10 mx-auto max-w-6xl"
      >
        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            © {new Date().getFullYear()} Harsh Patel. Crafted with
            <Heart className="h-3 w-3 text-red-400 fill-red-400 animate-pulse" />
            and modern tech.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary/30 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-110"
                aria-label={link.label}
              >
                <link.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Tech stack badge */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-white/5 text-xs text-muted-foreground">
            <span className="text-cyan-400">React</span>
            <span>+</span>
            <span className="text-violet-400">TypeScript</span>
            <span>+</span>
            <span className="text-blue-400">Tailwind CSS</span>
            <span>+</span>
            <span className="text-primary">GSAP</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
