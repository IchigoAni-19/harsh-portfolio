import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code as Code2, Rocket, GitCommitVertical as GitCommit, Brain } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Metric {
  icon: typeof Code2;
  target: number;
  suffix: string;
  label: string;
  color: string;
  glow: string;
  border: string;
}

const metrics: Metric[] = [
  {
    icon: Code2,
    target: 4,
    suffix: "",
    label: "Major Projects",
    color: "from-cyan-400 to-blue-500",
    glow: "rgba(6,182,212,0.5)",
    border: "rgba(6,182,212,0.25)",
  },
  {
    icon: Rocket,
    target: 3,
    suffix: "",
    label: "Projects Deployed",
    color: "from-blue-400 to-violet-500",
    glow: "rgba(99,102,241,0.5)",
    border: "rgba(99,102,241,0.25)",
  },
  {
    icon: GitCommit,
    target: 162,
    suffix: "+",
    label: "GitHub Contributions",
    color: "from-emerald-400 to-teal-500",
    glow: "rgba(52,211,153,0.5)",
    border: "rgba(52,211,153,0.25)",
  },
  {
    icon: Brain,
    target: 100,
    suffix: "+",
    label: "Problems Solved",
    color: "from-rose-400 to-orange-500",
    glow: "rgba(251,113,133,0.5)",
    border: "rgba(251,113,133,0.25)",
  },
];

interface SphereProps {
  metric: Metric;
  index: number;
  triggered: boolean;
}

const MetricSphere = ({ metric, index, triggered }: SphereProps) => {
  const sphereRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);
  const floatTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!floatRef.current) return;

    // Staggered floating idle animation
    const delay = index * 0.35;
    floatTween.current = gsap.to(floatRef.current, {
      y: -14,
      duration: 2.2 + index * 0.3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay,
    });

    return () => { floatTween.current?.kill(); };
  }, [index]);

  // Animated counter when triggered
  useEffect(() => {
    if (!triggered || !counterRef.current) return;
    const el = counterRef.current;
    const obj = { val: 0 };

    gsap.to(obj, {
      val: metric.target,
      duration: 2.2,
      ease: "power3.out",
      delay: index * 0.2,
      onUpdate: () => {
        el.textContent = Math.round(obj.val) + metric.suffix;
      },
      onComplete: () => {
        el.textContent = metric.target + metric.suffix;
      },
    });
  }, [triggered, metric.target, metric.suffix, index]);

  // Mouse tilt interaction
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sphereRef.current) return;
    const rect = sphereRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);

    gsap.to(sphereRef.current, {
      rotateY: dx * 22,
      rotateX: -dy * 22,
      scale: 1.06,
      duration: 0.35,
      ease: "power2.out",
      overwrite: true,
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 1,
        scale: 1.3,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true,
      });
    }
  };

  const handleMouseLeave = () => {
    if (!sphereRef.current) return;
    gsap.to(sphereRef.current, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
      overwrite: true,
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.5,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
        overwrite: true,
      });
    }
  };

  const Icon = metric.icon;

  return (
    <div
      data-sphere
      className="flex flex-col items-center gap-5"
      style={{ perspective: "800px" }}
    >
      <div ref={floatRef}>
        {/* Outer glow halo */}
        <div className="relative">
          <div
            ref={glowRef}
            className="absolute -inset-4 rounded-full blur-2xl opacity-50 transition-opacity duration-300"
            style={{ background: `radial-gradient(circle, ${metric.glow} 0%, transparent 70%)` }}
          />

          {/* Shadow underneath */}
          <div
            className="absolute left-1/2 -translate-x-1/2 -bottom-4 w-3/4 h-4 rounded-full blur-xl opacity-40"
            style={{ background: `radial-gradient(ellipse, ${metric.glow} 0%, transparent 70%)` }}
          />

          {/* Sphere */}
          <div
            ref={sphereRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-[150px] h-[150px] rounded-full cursor-pointer"
            style={{
              background: `
                radial-gradient(circle at 38% 32%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 40%, transparent 65%),
                radial-gradient(circle at 70% 75%, rgba(255,255,255,0.04) 0%, transparent 50%),
                linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%),
                rgba(8, 10, 25, 0.7)
              `,
              border: `1.5px solid ${metric.border}`,
              boxShadow: `
                0 0 40px ${metric.glow.replace("0.5", "0.2")},
                0 0 80px ${metric.glow.replace("0.5", "0.08")},
                inset 0 1px 0 rgba(255,255,255,0.15),
                inset 0 -1px 0 rgba(0,0,0,0.3)
              `,
              backdropFilter: "blur(20px)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Reflective highlight arc */}
            <div
              className="absolute top-[14%] left-[20%] w-[55%] h-[30%] rounded-full opacity-60"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(255,255,255,0.25) 0%, transparent 70%)",
                filter: "blur(3px)",
              }}
            />

            {/* Inner ring */}
            <div
              className="absolute inset-4 rounded-full"
              style={{
                border: `1px solid ${metric.border}`,
                background: "radial-gradient(circle at 40% 35%, rgba(255,255,255,0.06) 0%, transparent 60%)",
              }}
            />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br ${metric.color} bg-opacity-20`}
                style={{
                  background: `linear-gradient(135deg, ${metric.glow.replace("0.5", "0.25")}, ${metric.glow.replace("0.5", "0.1")})`,
                  border: `1px solid ${metric.border}`,
                }}
              >
                <Icon className="w-4 h-4 text-white" />
              </div>

              <span
                ref={counterRef}
                className={`text-2xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent tabular-nums`}
              >
                0{metric.suffix}
              </span>
            </div>

            {/* Edge highlight */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from 220deg, transparent 0%, rgba(255,255,255,0.06) 40%, transparent 55%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Label */}
      <div className="text-center">
        <p className="text-sm text-white/60 font-medium tracking-wide">{metric.label}</p>
      </div>
    </div>
  );
};

const DeveloperActivity = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading entrance
      gsap.fromTo(
        "[data-activity-title]",
        { y: 50, opacity: 0, filter: "blur(12px)" },
        {
          y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      // Background glow expansion
      gsap.fromTo(
        "[data-activity-glow]",
        { scale: 0.5, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 1.5, ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Sphere staggered rise
      gsap.fromTo(
        "[data-sphere]",
        { y: 80, opacity: 0, scale: 0.85 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
            onEnter: () => setTriggered(true),
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Floating particles
  useEffect(() => {
    if (!particlesRef.current) return;
    const particles = particlesRef.current.querySelectorAll("[data-particle]");
    particles.forEach((p, i) => {
      gsap.to(p, {
        y: -25,
        x: (Math.random() - 0.5) * 20,
        opacity: 0.15,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: i * 0.3,
      });
    });
  }, []);

  return (
    <section
      id="activity"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background glows */}
      <div data-activity-glow className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-10"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.6) 0%, rgba(99,102,241,0.4) 50%, transparent 70%)" }}
        />
        <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-8"
          style={{ background: "radial-gradient(circle, rgba(52,211,153,0.3) 0%, transparent 70%)" }}
        />
      </div>

      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            data-particle
            className="absolute rounded-full"
            style={{
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 4 === 0
                ? "rgba(6,182,212,0.6)"
                : i % 4 === 1
                ? "rgba(99,102,241,0.6)"
                : i % 4 === 2
                ? "rgba(52,211,153,0.5)"
                : "rgba(251,113,133,0.5)",
              opacity: 0.2,
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>

      {/* Subtle light streaks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute h-[1px] opacity-10"
            style={{
              top: `${20 + i * 20}%`,
              left: 0,
              right: 0,
              background: `linear-gradient(90deg, transparent 0%, ${
                ["rgba(6,182,212,0.6)", "rgba(99,102,241,0.6)", "rgba(52,211,153,0.5)", "rgba(251,113,133,0.4)"][i]
              } ${30 + i * 15}%, transparent 100%)`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Section title */}
        <div data-activity-title className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono text-white/50 tracking-widest">METRICS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Developer{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400">
              Activity
            </span>
          </h2>
          <p className="text-white/35 text-sm max-w-md mx-auto">
            A snapshot of my coding output, consistency and problem-solving journey.
          </p>
        </div>

        {/* Metric Spheres */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16 justify-items-center">
          {metrics.map((metric, i) => (
            <MetricSphere key={metric.label} metric={metric} index={i} triggered={triggered} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeveloperActivity;
