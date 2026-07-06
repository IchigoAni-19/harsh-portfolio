import { useEffect, useRef } from "react";

/**
 * Futuristic premium gradient background with evening winter theme.
 * Deep blues, indigos, and violet glows with floating orbs.
 */
const AnimatedBackground = () => {
  const orbsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // An orbs floating animation
    orbsRef.current.forEach((orb) => {
      if (orb) {
        const delay = Math.random() * 2;
        const duration = 4 + Math.random() * 3;
        orb.style.animationDelay = `${delay}s`;
        orb.style.animationDuration = `${duration}s`;
      }
    });
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base winter evening gradient - deep blues to violet */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              180deg,
              hsl(220, 35%, 5%) 0%,
              hsl(230, 40%, 8%) 15%,
              hsl(240, 45%, 12%) 30%,
              hsl(250, 50%, 15%) 45%,
              hsl(260, 55%, 18%) 60%,
              hsl(270, 60%, 12%) 80%,
              hsl(220, 30%, 6%) 100%
            )
          `,
        }}
      />

      {/* Aurora-like gradient overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(
              ellipse 80% 50% at 50% 0%,
              hsl(200, 80%, 30%) 0%,
              transparent 50%
            ),
            radial-gradient(
              ellipse 60% 40% at 70% 20%,
              hsl(260, 70%, 35%) 0%,
              transparent 45%
            ),
            radial-gradient(
              ellipse 50% 30% at 30% 30%,
              hsl(220, 60%, 30%) 0%,
              transparent 40%
            )
          `,
        }}
      />

      {/* Layer 1 - Large atmospheric orbs */}
      <div className="absolute inset-0">
        <div
          ref={(el) => (orbsRef.current[0] = el)}
          className="absolute top-[5%] left-[10%] w-[500px] h-[500px] rounded-full animate-blob-1"
          style={{
            background: "radial-gradient(circle, hsla(200, 80%, 60%, 0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          ref={(el) => (orbsRef.current[1] = el)}
          className="absolute top-[40%] right-[5%] w-[450px] h-[450px] rounded-full animate-blob-2"
          style={{
            background: "radial-gradient(circle, hsla(260, 70%, 55%, 0.12) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
      </div>

      {/* Layer 2 - Medium accent orbs */}
      <div className="absolute inset-0">
        <div
          ref={(el) => (orbsRef.current[2] = el)}
          className="absolute top-[60%] left-[30%] w-[400px] h-[400px] rounded-full animate-blob-3"
          style={{
            background: "radial-gradient(circle, hsla(220, 70%, 50%, 0.1) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        <div
          ref={(el) => (orbsRef.current[3] = el)}
          className="absolute top-[20%] right-[30%] w-[350px] h-[350px] rounded-full animate-blob-4"
          style={{
            background: "radial-gradient(circle, hsla(280, 60%, 50%, 0.1) 0%, transparent 70%)",
            filter: "blur(55px)",
          }}
        />
      </div>

      {/* Layer 3 - Small neon accent orbs */}
      <div className="absolute inset-0">
        <div
          ref={(el) => (orbsRef.current[4] = el)}
          className="absolute top-[75%] right-[25%] w-[250px] h-[250px] rounded-full animate-blob-1"
          style={{
            background: "radial-gradient(circle, hsla(190, 90%, 60%, 0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          ref={(el) => (orbsRef.current[5] = el)}
          className="absolute top-[85%] left-[15%] w-[300px] h-[300px] rounded-full animate-blob-2"
          style={{
            background: "radial-gradient(circle, hsla(250, 80%, 60%, 0.1) 0%, transparent 70%)",
            filter: "blur(45px)",
          }}
        />
      </div>

      {/* Subtle grid pattern for depth */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100, 150, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100, 150, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette darkening edges */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, hsl(220, 30%, 5%) 100%)",
        }}
      />

      {/* Top edge glow - aurora-like */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 h-60 w-[900px] rounded-full blur-[100px] opacity-30"
        style={{
          background: "linear-gradient(180deg, hsla(200, 80%, 50%, 0.3) 0%, transparent 100%)",
        }}
      />

      {/* Bottom accent glow */}
      <div
        className="absolute -bottom-20 right-0 w-[50vw] h-[40vh] rounded-full blur-[120px] opacity-20"
        style={{
          background: "radial-gradient(circle, hsla(260, 70%, 40%, 0.4) 0%, transparent 70%)",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
