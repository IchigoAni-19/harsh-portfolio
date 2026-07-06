import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(logoRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(progressContainerRef.current, { opacity: 0, y: 20 });

      // Logo entrance
      gsap.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });

      // Progress bar container entrance
      gsap.to(progressContainerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.5,
      });

      // Progress bar fill animation
      const progressBar = progressRef.current;
      if (progressBar) {
        gsap.to(progressBar, {
          width: "100%",
          duration: 2.5,
          ease: "power2.out",
          onUpdate: function () {
            const p = Math.round(this.progress() * 100);
            setProgress(p);
          },
          onComplete: () => {
            // Final sequence
            const tl = gsap.timeline();

            // Fade out progress bar
            tl.to(progressContainerRef.current, {
              opacity: 0,
              y: -20,
              duration: 0.4,
              ease: "power2.in",
            });

            // Logo pulse then fade
            tl.to(
              logoRef.current,
              {
                scale: 1.1,
                duration: 0.3,
                ease: "power2.out",
              },
              "-=0.2"
            );

            tl.to(logoRef.current, {
              opacity: 0,
              scale: 0.9,
              duration: 0.5,
              ease: "power2.in",
            });

            // Preloader exit with cinematic scale
            tl.to(
              preloaderRef.current,
              {
                opacity: 0,
                scale: 1.1,
                duration: 0.6,
                ease: "power2.inOut",
                onComplete: () => {
                  gsap.set(preloaderRef.current, { display: "none" });
                  onComplete();
                },
              },
              "-=0.3"
            );
          },
        });
      }
    }, preloaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(135deg, hsl(220, 30%, 4%) 0%, hsl(240, 40%, 8%) 50%, hsl(260, 50%, 12%) 100%)",
      }}
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Animated logo */}
      <div ref={logoRef} className="relative mb-12">
        <div className="absolute -inset-8 rounded-full bg-primary/20 blur-2xl animate-pulse" />
        <div className="relative">
          <h1 className="text-6xl sm:text-7xl font-bold tracking-tighter">
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Harsh
            </span>
          </h1>
          <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        </div>
      </div>

      {/* Progress bar container */}
      <div ref={progressContainerRef} className="w-48 sm:w-64 flex flex-col items-center gap-3">
        <div className="w-full h-1 bg-secondary/40 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full rounded-full"
            style={{
              width: "0%",
              background: "linear-gradient(90deg, hsl(200, 80%, 60%), hsl(260, 80%, 60%))",
              boxShadow: "0 0 20px hsl(var(--primary) / 0.5)",
            }}
          />
        </div>
        <span
          ref={percentRef}
          className="font-mono text-sm text-muted-foreground"
        >
          {progress}%
        </span>
      </div>

      {/* Loading text */}
      <p className="absolute bottom-10 text-xs text-muted-foreground/60 font-mono tracking-widest">
        LOADING EXPERIENCE...
      </p>
    </div>
  );
};

export default Preloader;
