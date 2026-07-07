import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  opacity: number;
  opacityDir: number;
  twinkleSpeed: number;
}

interface Planet {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
  glowColor: string;
  hasRing: boolean;
  ringTilt: number;
}

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = window.innerWidth;
    let H = window.innerHeight;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    resize();
    window.addEventListener("resize", resize);

    const STAR_COUNT = 220;
    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      radius: Math.random() * 1.2 + 0.2,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.08,
      opacity: Math.random() * 0.6 + 0.2,
      opacityDir: Math.random() > 0.5 ? 1 : -1,
      twinkleSpeed: Math.random() * 0.008 + 0.003,
    }));

    const planetDefs: Planet[] = [
      {
        x: W * 0.82,
        y: H * 0.18,
        radius: 38,
        vx: 0.015,
        vy: 0.008,
        color: "rgba(80, 40, 120, 0.85)",
        glowColor: "rgba(120, 60, 200, 0.35)",
        hasRing: true,
        ringTilt: 0.28,
      },
      {
        x: W * 0.15,
        y: H * 0.72,
        radius: 22,
        vx: -0.018,
        vy: -0.01,
        color: "rgba(30, 60, 110, 0.9)",
        glowColor: "rgba(50, 100, 200, 0.3)",
        hasRing: false,
        ringTilt: 0,
      },
      {
        x: W * 0.6,
        y: H * 0.88,
        radius: 14,
        vx: 0.012,
        vy: -0.015,
        color: "rgba(20, 80, 80, 0.8)",
        glowColor: "rgba(20, 150, 150, 0.25)",
        hasRing: false,
        ringTilt: 0,
      },
    ];

    const drawStar = (s: Star) => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 220, 255, ${s.opacity})`;
      ctx.fill();
      if (s.radius > 0.9) {
        ctx.beginPath();
        ctx.moveTo(s.x - s.radius * 2.5, s.y);
        ctx.lineTo(s.x + s.radius * 2.5, s.y);
        ctx.moveTo(s.x, s.y - s.radius * 2.5);
        ctx.lineTo(s.x, s.y + s.radius * 2.5);
        ctx.strokeStyle = `rgba(180, 210, 255, ${s.opacity * 0.35})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    };

    const lightenColor = (color: string, amount: number) => {
      const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!m) return color;
      const r = Math.min(255, parseInt(m[1]) + Math.round(amount * 200));
      const g = Math.min(255, parseInt(m[2]) + Math.round(amount * 200));
      const b = Math.min(255, parseInt(m[3]) + Math.round(amount * 200));
      return `rgba(${r}, ${g}, ${b}, 0.9)`;
    };

    const drawPlanet = (p: Planet) => {
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.5);
      grd.addColorStop(0, p.glowColor);
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      const bodyGrd = ctx.createRadialGradient(
        p.x - p.radius * 0.3,
        p.y - p.radius * 0.3,
        p.radius * 0.1,
        p.x,
        p.y,
        p.radius
      );
      bodyGrd.addColorStop(0, lightenColor(p.color, 0.35));
      bodyGrd.addColorStop(1, p.color);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = bodyGrd;
      ctx.fill();

      if (p.hasRing) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.scale(1, p.ringTilt);
        ctx.beginPath();
        ctx.arc(0, 0, p.radius * 1.85, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(180, 140, 255, 0.45)";
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, p.radius * 2.1, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(180, 140, 255, 0.22)";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      }

      const sheenGrd = ctx.createLinearGradient(
        p.x - p.radius,
        p.y - p.radius,
        p.x + p.radius * 0.5,
        p.y
      );
      sheenGrd.addColorStop(0, "rgba(255,255,255,0.12)");
      sheenGrd.addColorStop(1, "rgba(255,255,255,0)");
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = sheenGrd;
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Subtle nebula glows
      const nebula1 = ctx.createRadialGradient(W * 0.75, H * 0.2, 0, W * 0.75, H * 0.2, W * 0.35);
      nebula1.addColorStop(0, "rgba(60, 20, 120, 0.06)");
      nebula1.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, W, H);

      const nebula2 = ctx.createRadialGradient(W * 0.2, H * 0.65, 0, W * 0.2, H * 0.65, W * 0.3);
      nebula2.addColorStop(0, "rgba(10, 40, 90, 0.08)");
      nebula2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, W, H);

      for (const s of stars) {
        s.opacity += s.twinkleSpeed * s.opacityDir;
        if (s.opacity > 0.85 || s.opacity < 0.1) s.opacityDir *= -1;
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < -2) s.x = W + 2;
        if (s.x > W + 2) s.x = -2;
        if (s.y < -2) s.y = H + 2;
        if (s.y > H + 2) s.y = -2;
        drawStar(s);
      }

      for (const p of planetDefs) {
        p.x += p.vx;
        p.y += p.vy;
        const margin = p.radius * 4;
        if (p.x < margin || p.x > W - margin) p.vx *= -1;
        if (p.y < margin || p.y > H - margin) p.vy *= -1;
        drawPlanet(p);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {/* Deep space base background */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #05050f 0%, #080814 40%, #0a0818 70%, #06060f 100%)" }}
      />

      {/* Stars + planets canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default AnimatedBackground;
