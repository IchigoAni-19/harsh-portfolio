import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
}

const CometCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000, px: -1000, py: -1000, active: false });
  const particles = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;
    };
    const onLeave = () => { mouse.current.active = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    let raf = 0;
    const loop = () => {
      const m = mouse.current;
      const dx = m.x - m.px;
      const dy = m.y - m.py;
      const speed = Math.hypot(dx, dy);

      // Spawn trail particles based on movement
      if (m.active && speed > 0.5) {
        const count = Math.min(6, Math.ceil(speed / 6));
        for (let i = 0; i < count; i++) {
          const t = i / count;
          particles.current.push({
            x: m.px + dx * t + (Math.random() - 0.5) * 2,
            y: m.py + dy * t + (Math.random() - 0.5) * 2,
            vx: (Math.random() - 0.5) * 0.6 - dx * 0.02,
            vy: (Math.random() - 0.5) * 0.6 - dy * 0.02,
            life: 0,
            maxLife: 40 + Math.random() * 30,
            size: 1 + Math.random() * 2.5,
            hue: 180 + Math.random() * 40,
          });
        }
      }
      m.px = m.x;
      m.py = m.y;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      // Update & draw particles
      const alive: Particle[] = [];
      for (const p of particles.current) {
        p.life += 1;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        const t = 1 - p.life / p.maxLife;
        if (t <= 0) continue;
        const r = p.size * t * 3;
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3);
        grd.addColorStop(0, `rgba(255, 255, 255, ${0.9 * t})`);
        grd.addColorStop(0.3, `hsla(${p.hue}, 100%, 75%, ${0.5 * t})`);
        grd.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        alive.push(p);
      }
      particles.current = alive;

      // Bright comet head
      if (m.active) {
        const headR = 8 + Math.min(14, speed * 0.4);
        const halo = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, headR * 4);
        halo.addColorStop(0, "rgba(255,255,255,0.95)");
        halo.addColorStop(0.2, "rgba(200,240,255,0.55)");
        halo.addColorStop(0.6, "rgba(120,200,255,0.15)");
        halo.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(m.x, m.y, headR * 4, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(m.x, m.y, headR * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default CometCursor;
