import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Activity, Code2, GitCommit, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Generate a mock contribution grid (weeks x days)
const generateGrid = () => {
  const weeks = 26;
  const days = 7;
  const grid: number[][] = [];
  for (let w = 0; w < weeks; w++) {
    const col: number[] = [];
    for (let d = 0; d < days; d++) {
      const r = Math.random();
      // 4 intensity levels
      const level = r < 0.35 ? 0 : r < 0.6 ? 1 : r < 0.82 ? 2 : r < 0.95 ? 3 : 4;
      col.push(level);
    }
    grid.push(col);
  }
  return grid;
};

const intensityClass = (level: number) => {
  switch (level) {
    case 0:
      return "bg-secondary/40";
    case 1:
      return "bg-primary/20";
    case 2:
      return "bg-primary/40";
    case 3:
      return "bg-primary/70";
    case 4:
      return "bg-primary";
    default:
      return "bg-secondary/40";
  }
};

const stats = [
  { label: "Active Projects", value: "6+", icon: Code2 },
  { label: "Commits (6mo)", value: "480+", icon: GitCommit },
  { label: "Languages", value: "6", icon: Zap },
  { label: "Years Coding", value: "3+", icon: Activity },
];

const DeveloperActivity = () => {
  const ref = useRef<HTMLDivElement>(null);
  const grid = useRef(generateGrid()).current;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-activity-heading]", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", toggleActions: "restart none none reverse" },
      });

      gsap.from("[data-activity-stat]", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%", toggleActions: "restart none none reverse" },
      });

      gsap.from("[data-activity-cell]", {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        stagger: 0.003,
        ease: "power2.out",
        scrollTrigger: { trigger: "[data-activity-grid]", start: "top 85%", toggleActions: "restart none none reverse" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="activity" ref={ref} className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12" data-activity-heading>
          <h2 className="font-mono text-sm text-primary mb-2">02.</h2>
          <h3 className="text-3xl font-bold mb-2">Developer Activity</h3>
          <div className="h-[2px] w-16 bg-primary mb-4 origin-left" />
          <p className="text-muted-foreground max-w-lg">
            A snapshot of my coding rhythm over the last six months.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <div
              key={s.label}
              data-activity-stat
              className="rounded-xl border border-border bg-card/60 backdrop-blur-sm p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <s.icon className="h-5 w-5 text-primary mb-3" />
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Contribution grid */}
        <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 sm:p-8">
          <div className="flex items-center justify-between mb-5">
            <h4 className="text-sm font-semibold font-mono text-foreground">Contribution Activity</h4>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((l) => (
                <span key={l} className={`h-3 w-3 rounded-sm ${intensityClass(l)}`} />
              ))}
              <span>More</span>
            </div>
          </div>
          <div data-activity-grid className="flex gap-1 overflow-x-auto pb-2">
            {grid.map((col, i) => (
              <div key={i} className="flex flex-col gap-1">
                {col.map((cell, j) => (
                  <div
                    key={j}
                    data-activity-cell
                    className={`h-3 w-3 rounded-sm ${intensityClass(cell)} transition-colors duration-300 hover:ring-2 hover:ring-primary/40`}
                    title={`Level ${cell}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperActivity;
