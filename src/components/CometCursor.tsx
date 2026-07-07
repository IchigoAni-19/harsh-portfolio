import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
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
    const onLeave = () => {
      mouse.current.active = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    let raf = 0;
    const loop = () => {
      const m = mouse.current;
      const dx = m.x - m.px;
      const dy = m.y - m.py;
      const speed = Math.hypot(dx, dy);

      if (m.active && speed > 0.5) {
        const count = Math.min(5, Math.max(1, Math.ceil(speed / 10)));
        for (let i = 0; i < count; i++) {
          const t = i / count;
          particles.current.push({
            x: m.px + dx * t,
            y: m.py + dy * t,
            life: 0,
            maxLife: 24 + Math.random() * 16,
            size: 0.7 + Math.random() * 1.2,
            hue: 190 + Math.random() * 45,
          });
        }
      }
      m.px = m.x;
      m.py = m.y;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      const alive: Particle[] = [];
      for (const p of particles.current) {
        p.life += 1;
        const t = 1 - p.life / p.maxLife;
        if (t <= 0) continue;
        const r = p.size * (0.8 + t * 0.9);
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3.2);
        grd.addColorStop(0, `hsla(${p.hue}, 100%, 82%, ${0.28 * t})`);
        grd.addColorStop(0.4, `hsla(${p.hue + 18}, 100%, 70%, ${0.16 * t})`);
        grd.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        alive.push(p);
      }
      particles.current = alive;

      if (m.active) {
        const head = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 10);
        head.addColorStop(0, "rgba(210,245,255,0.55)");
        head.addColorStop(0.4, "rgba(130,210,255,0.2)");
        head.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(m.x, m.y, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = head;
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
