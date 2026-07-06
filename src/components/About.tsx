import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { User, Code2, Heart, Rocket, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

interface BentoCardProps {
  num: string;
  icon: React.ReactNode;
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const BentoCard = ({ num, icon, title, children, className = "" }: BentoCardProps) => (
  <div
    data-bento
    className={`relative rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 sm:p-8 overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 ${className}`}
  >
    {/* Number top-right */}
    <span className="absolute top-4 right-5 font-mono text-xs text-muted-foreground/60">{num}</span>

    {/* Icon top-left */}
    <div className="h-11 w-11 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5">
      {icon}
    </div>

    <h3 className="text-xl sm:text-2xl font-bold mb-3">{title}</h3>
    <div className="text-sm text-muted-foreground leading-relaxed space-y-3">{children}</div>
  </div>
);

const gradientText = "text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary";

const About = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-about-title]", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", toggleActions: "restart none none reverse" },
      });

      gsap.from("[data-bento]", {
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%", toggleActions: "restart none none reverse" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={ref} className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-14" data-about-title>
          <Badge variant="outline" className="mb-4 border-primary/40 text-primary bg-primary/5 px-4 py-1">
            ABOUT ME
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            My Story in <span className={gradientText}>Five Blocks</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A quick snapshot of who I am, what I do and what drives me.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
          {/* 01 — Engineering My Own Path */}
          <BentoCard
            num="01"
            icon={<User className="h-5 w-5" />}
            title={<>Engineering My <span className={gradientText}>Own Path</span></>}
            className="md:col-span-2"
          >
            <p>
              I come from an Electronics Engineering background, but my passion found its true home in software.
            </p>
            <p>
              I didn't wait for opportunities — I built them. From self-learning to shipping production-grade
              applications, I enjoy turning ideas into impactful products that solve real problems.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full border border-border bg-secondary/50">
              <span className="text-muted-foreground">Electronics Engineer</span>
              <span className="text-primary">→</span>
              <span className="text-primary font-semibold">Software Engineer</span>
            </div>
          </BentoCard>

          {/* 02 — I Build Systems */}
          <BentoCard
            num="02"
            icon={<Code2 className="h-5 w-5" />}
            title={<>I Build <span className={gradientText}>Systems</span></>}
            className="md:col-span-2"
          >
            <p>
              I love building complete systems — from intuitive frontends to scalable, secure backends and
              RESTful APIs.
            </p>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {["React", "Node.js", "Express.js", "MongoDB", "JWT", "Gemini AI"].map((t) => (
                <div
                  key={t}
                  className="text-xs font-mono text-center py-2 px-2 rounded-lg border border-border bg-secondary/40 text-muted-foreground"
                >
                  {t}
                </div>
              ))}
            </div>
          </BentoCard>

          {/* 03 — Why I Build */}
          <BentoCard
            num="03"
            icon={<Heart className="h-5 w-5" />}
            title={<>Why I <span className={gradientText}>Build</span></>}
            className="md:col-span-2"
          >
            <p>I enjoy turning complex ideas into products people can actually use.</p>
            <p>
              For me, coding isn't just about writing lines — it's about solving problems, learning
              continuously and creating value.
            </p>
          </BentoCard>

          {/* 04 — Currently Exploring */}
          <BentoCard
            num="04"
            icon={<Rocket className="h-5 w-5" />}
            title={<>Currently <span className={gradientText}>Exploring</span></>}
            className="md:col-span-3"
          >
            <p>Constantly learning. Currently diving deeper into cloud, AI and system design.</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["Azure Cloud", "AI Integration", "Backend Architecture", "System Design", "Linux"].map((t) => (
                <Badge
                  key={t}
                  variant="secondary"
                  className="font-mono text-xs bg-secondary/50 border border-border/50"
                >
                  {t}
                </Badge>
              ))}
            </div>
          </BentoCard>

          {/* 05 — Beyond Code */}
          <BentoCard
            num="05"
            icon={<Star className="h-5 w-5" />}
            title={<>Beyond <span className={gradientText}>Code</span></>}
            className="md:col-span-3"
          >
            <p>
              I'm curious about how things work under the hood. I enjoy exploring low-level concepts,
              system internals and building tools that make life easier.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["CLI Enthusiast", "Operating Systems", "Shell Development", "Performance", "Problem Solving"].map((t) => (
                <Badge
                  key={t}
                  variant="secondary"
                  className="font-mono text-xs bg-secondary/50 border border-border/50"
                >
                  {t}
                </Badge>
              ))}
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
};

export default About;
