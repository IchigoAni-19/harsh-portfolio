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

interface Sun {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  pulse: number;
  pulseDir: number;
}

interface Galaxy {
  x: number;
  y: number;
  radius: number;
  tilt: number;
  angle: number;
  rotSpeed: number;
  stars: { a: number; d: number; r: number; opacity: number }[];
}

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const splineRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = window.innerWidth;
    let H = window.innerHeight;
    let pointerX = W * 0.5;
    let pointerY = H * 0.42;
    let targetPointerX = pointerX;
    let targetPointerY = pointerY;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    resize();
    window.addEventListener("resize", resize);

    const onPointerMove = (event: PointerEvent) => {
      targetPointerX = event.clientX;
      targetPointerY = event.clientY;
    };
    const onPointerLeave = () => {
      targetPointerX = W * 0.5;
      targetPointerY = H * 0.42;
    };
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);

    const STAR_COUNT = 320;
    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      radius: Math.random() * 1.25 + 0.15,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.12,
      opacity: Math.random() * 0.65 + 0.18,
      opacityDir: Math.random() > 0.5 ? 1 : -1,
      twinkleSpeed: Math.random() * 0.009 + 0.003,
    }));

    // Sun — large glowing ball drifting slowly
    const sun: Sun = {
      x: W * 0.08,
      y: H * 0.12,
      radius: 44,
      vx: 0.008,
      vy: 0.005,
      pulse: 0,
      pulseDir: 1,
    };

    interface Moon { angle: number; dist: number; radius: number; speed: number; color: string; }
    interface PlanetX extends Planet { moons: Moon[]; rotation: number; bandColor?: string; }
    const planetDefs: PlanetX[] = [
      {
        x: W * 0.82, y: H * 0.18, radius: 38, vx: 0.015, vy: 0.008,
        color: "rgba(80, 40, 120, 0.85)", glowColor: "rgba(120, 60, 200, 0.35)",
        hasRing: true, ringTilt: 0.28, rotation: 0, bandColor: "rgba(200,150,255,0.15)",
        moons: [
          { angle: 0, dist: 62, radius: 3.5, speed: 0.012, color: "rgba(220,210,230,0.9)" },
          { angle: Math.PI, dist: 82, radius: 2.5, speed: -0.008, color: "rgba(200,190,220,0.85)" },
        ],
      },
      {
        x: W * 0.15, y: H * 0.72, radius: 24, vx: -0.018, vy: -0.01,
        color: "rgba(30, 60, 110, 0.9)", glowColor: "rgba(50, 100, 200, 0.3)",
        hasRing: false, ringTilt: 0, rotation: 0, bandColor: "rgba(120,180,255,0.18)",
        moons: [{ angle: 0.5, dist: 40, radius: 2.5, speed: 0.018, color: "rgba(230,230,240,0.85)" }],
      },
      {
        x: W * 0.6, y: H * 0.88, radius: 16, vx: 0.012, vy: -0.015,
        color: "rgba(20, 80, 80, 0.8)", glowColor: "rgba(20, 150, 150, 0.25)",
        hasRing: true, ringTilt: 0.2, rotation: 0,
        moons: [],
      },
    ];

    // Black hole with accretion disk
    const blackHole = {
      x: W * 0.56, y: H * 0.5, radius: 30, vx: 0.006, vy: -0.004, rotation: 0,
    };

    // Galaxies — elliptical clusters of tiny dots
    const galaxies: Galaxy[] = [
      {
        x: W * 0.34,
        y: H * 0.28,
        radius: 84,
        tilt: 0.35,
        angle: Math.PI * 0.15,
        rotSpeed: 0.00015,
        stars: Array.from({ length: 150 }, () => {
          const a = Math.random() * Math.PI * 2;
          const d = Math.pow(Math.random(), 0.6) * 84;
          return { a, d, r: Math.random() * 0.9 + 0.18, opacity: Math.random() * 0.55 + 0.1 };
        }),
      },
      {
        x: W * 0.74,
        y: H * 0.66,
        radius: 64,
        tilt: 0.25,
        angle: -Math.PI * 0.3,
        rotSpeed: -0.0001,
        stars: Array.from({ length: 110 }, () => {
          const a = Math.random() * Math.PI * 2;
          const d = Math.pow(Math.random(), 0.7) * 64;
          return { a, d, r: Math.random() * 0.75 + 0.12, opacity: Math.random() * 0.48 + 0.08 };
        }),
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

    const drawSun = (s: Sun) => {
      const r = s.radius + s.pulse * 4;

      // Outer corona layers
      for (let i = 4; i >= 1; i--) {
        const coronaR = r * (1 + i * 0.8);
        const alpha = 0.03 / i;
        const grd = ctx.createRadialGradient(s.x, s.y, r * 0.5, s.x, s.y, coronaR);
        grd.addColorStop(0, `rgba(255, 200, 80, ${alpha * 2})`);
        grd.addColorStop(0.5, `rgba(255, 140, 30, ${alpha})`);
        grd.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(s.x, s.y, coronaR, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      // Main glow halo
      const haloGrd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 3.5);
      haloGrd.addColorStop(0, "rgba(255, 220, 100, 0.25)");
      haloGrd.addColorStop(0.4, "rgba(255, 160, 40, 0.12)");
      haloGrd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(s.x, s.y, r * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = haloGrd;
      ctx.fill();

      // Sun body
      const bodyGrd = ctx.createRadialGradient(
        s.x - r * 0.25, s.y - r * 0.25, r * 0.05,
        s.x, s.y, r
      );
      bodyGrd.addColorStop(0, "rgba(255, 252, 220, 0.95)");
      bodyGrd.addColorStop(0.4, "rgba(255, 220, 80, 0.9)");
      bodyGrd.addColorStop(0.75, "rgba(255, 160, 30, 0.85)");
      bodyGrd.addColorStop(1, "rgba(200, 80, 10, 0.7)");
      ctx.beginPath();
      ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
      ctx.fillStyle = bodyGrd;
      ctx.fill();

      // Surface sheen
      const sheenGrd = ctx.createLinearGradient(s.x - r, s.y - r, s.x + r * 0.3, s.y);
      sheenGrd.addColorStop(0, "rgba(255,255,255,0.18)");
      sheenGrd.addColorStop(1, "rgba(255,255,255,0)");
      ctx.beginPath();
      ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
      ctx.fillStyle = sheenGrd;
      ctx.fill();
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
        p.x - p.radius * 0.3, p.y - p.radius * 0.3, p.radius * 0.1,
        p.x, p.y, p.radius
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

      const sheenGrd = ctx.createLinearGradient(p.x - p.radius, p.y - p.radius, p.x + p.radius * 0.5, p.y);
      sheenGrd.addColorStop(0, "rgba(255,255,255,0.12)");
      sheenGrd.addColorStop(1, "rgba(255,255,255,0)");
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = sheenGrd;
      ctx.fill();

      // Atmospheric bands
      const px = p as PlanetX;
      if (px.bandColor) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.clip();
        for (let i = -2; i <= 2; i++) {
          ctx.beginPath();
          ctx.ellipse(p.x, p.y + i * p.radius * 0.35, p.radius, p.radius * 0.12, 0, 0, Math.PI * 2);
          ctx.fillStyle = px.bandColor;
          ctx.fill();
        }
        ctx.restore();
      }

      // Atmosphere halo
      const atmo = ctx.createRadialGradient(p.x, p.y, p.radius * 0.95, p.x, p.y, p.radius * 1.15);
      atmo.addColorStop(0, "rgba(180,220,255,0)");
      atmo.addColorStop(0.6, "rgba(180,220,255,0.15)");
      atmo.addColorStop(1, "rgba(180,220,255,0)");
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * 1.15, 0, Math.PI * 2);
      ctx.fillStyle = atmo;
      ctx.fill();

      // Moons
      if (px.moons) {
        for (const m of px.moons) {
          m.angle += m.speed;
          const mx = p.x + Math.cos(m.angle) * m.dist;
          const my = p.y + Math.sin(m.angle) * m.dist * 0.5;
          const mGrd = ctx.createRadialGradient(mx, my, 0, mx, my, m.radius * 2.5);
          mGrd.addColorStop(0, m.color);
          mGrd.addColorStop(1, "rgba(0,0,0,0)");
          ctx.beginPath();
          ctx.arc(mx, my, m.radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = mGrd;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(mx, my, m.radius, 0, Math.PI * 2);
          ctx.fillStyle = m.color;
          ctx.fill();
        }
      }
    };

    const drawBlackHole = (b: typeof blackHole) => {
      b.rotation += 0.012;
      // Gravitational lensing glow
      const lens = ctx.createRadialGradient(b.x, b.y, b.radius, b.x, b.y, b.radius * 9);
      lens.addColorStop(0, "rgba(3, 2, 8, 0.96)");
      lens.addColorStop(0.35, "rgba(70, 25, 120, 0.24)");
      lens.addColorStop(0.65, "rgba(150, 80, 220, 0.1)");
      lens.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius * 9, 0, Math.PI * 2);
      ctx.fillStyle = lens;
      ctx.fill();

      const aura = ctx.createRadialGradient(b.x, b.y, b.radius * 0.6, b.x, b.y, b.radius * 5.2);
      aura.addColorStop(0, "rgba(0,0,0,0)");
      aura.addColorStop(0.45, "rgba(72, 22, 128, 0.16)");
      aura.addColorStop(0.75, "rgba(135, 52, 220, 0.22)");
      aura.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius * 5.2, 0, Math.PI * 2);
      ctx.fillStyle = aura;
      ctx.fill();

      // Accretion disk
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.rotation);
      ctx.scale(1, 0.25);
      for (let i = 0; i < 5; i++) {
        const r = b.radius * (2.1 + i * 0.55);
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        const hue = 265 - i * 10;
        ctx.strokeStyle = `hsla(${hue}, 100%, ${62 - i * 5}%, ${0.48 - i * 0.07})`;
        ctx.lineWidth = 3.2 - i * 0.3;
        ctx.stroke();
      }
      ctx.restore();

      // Photon ring
      const ring = ctx.createRadialGradient(b.x, b.y, b.radius * 1.1, b.x, b.y, b.radius * 1.9);
      ring.addColorStop(0, "rgba(255,180,80,0)");
      ring.addColorStop(0.42, "rgba(180,120,255,0.36)");
      ring.addColorStop(0.72, "rgba(255,120,220,0.24)");
      ring.addColorStop(1, "rgba(255,140,40,0)");
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius * 1.9, 0, Math.PI * 2);
      ctx.fillStyle = ring;
      ctx.fill();

      // Event horizon
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#000";
      ctx.fill();
    };

    const drawGalaxy = (g: Galaxy) => {
      ctx.save();
      ctx.translate(g.x, g.y);
      ctx.rotate(g.angle);
      ctx.scale(1, g.tilt);

      // Center glow
      const centerGrd = ctx.createRadialGradient(0, 0, 0, 0, 0, g.radius * 0.4);
      centerGrd.addColorStop(0, "rgba(180, 160, 255, 0.18)");
      centerGrd.addColorStop(0.5, "rgba(100, 80, 200, 0.06)");
      centerGrd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(0, 0, g.radius * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = centerGrd;
      ctx.fill();

      // Galaxy stars
      for (const s of g.stars) {
        const x = Math.cos(s.a) * s.d;
        const y = Math.sin(s.a) * s.d;
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 190, 255, ${s.opacity})`;
        ctx.fill();
      }

      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      pointerX += (targetPointerX - pointerX) * 0.04;
      pointerY += (targetPointerY - pointerY) * 0.04;

      const normalizedX = (pointerX / W - 0.5) * 2;
      const normalizedY = (pointerY / H - 0.5) * 2;

      if (splineRef.current) {
        splineRef.current.style.transform = `translate3d(${normalizedX * 20}px, ${normalizedY * 16}px, 0) scale(1.08)`;
      }

      // Nebula glows
      const nebula1 = ctx.createRadialGradient(W * 0.72, H * 0.18, 0, W * 0.72, H * 0.18, W * 0.38);
      nebula1.addColorStop(0, "rgba(70, 20, 140, 0.08)");
      nebula1.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, W, H);

      const nebula2 = ctx.createRadialGradient(W * 0.22, H * 0.68, 0, W * 0.22, H * 0.68, W * 0.34);
      nebula2.addColorStop(0, "rgba(10, 40, 90, 0.1)");
      nebula2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, W, H);

      // Sun warm nebula hint
      const sunNebula = ctx.createRadialGradient(sun.x, sun.y, 0, sun.x, sun.y, W * 0.32);
      sunNebula.addColorStop(0, "rgba(255, 160, 20, 0.05)");
      sunNebula.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = sunNebula;
      ctx.fillRect(0, 0, W, H);

      // Draw galaxies first (behind stars)
      for (const g of galaxies) {
        g.angle += g.rotSpeed;
        drawGalaxy(g);
      }

      // Draw stars
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

      // Sun pulse
      sun.pulse += 0.008 * sun.pulseDir;
      if (sun.pulse > 1 || sun.pulse < 0) sun.pulseDir *= -1;
      sun.x += sun.vx;
      sun.y += sun.vy;
      const sunMargin = sun.radius * 5;
      if (sun.x < sunMargin || sun.x > W - sunMargin) sun.vx *= -1;
      if (sun.y < sunMargin || sun.y > H - sunMargin) sun.vy *= -1;
      drawSun(sun);

      // Draw planets
      for (const p of planetDefs) {
        p.x += p.vx;
        p.y += p.vy;
        const margin = p.radius * 4;
        if (p.x < margin || p.x > W - margin) p.vx *= -1;
        if (p.y < margin || p.y > H - margin) p.vy *= -1;
        drawPlanet(p);
      }

      // Black hole
      blackHole.x += blackHole.vx;
      blackHole.y += blackHole.vy;
      const bhMargin = blackHole.radius * 11;
      if (blackHole.x < bhMargin || blackHole.x > W - bhMargin) blackHole.vx *= -1;
      if (blackHole.y < bhMargin || blackHole.y > H - bhMargin) blackHole.vy *= -1;
      drawBlackHole(blackHole);

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Deep space base with purple hues */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #05030a 0%, #080512 40%, #0a0716 70%, #06030a 100%)" }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ width: "100%", height: "100%" }}
      />
      {/* Spline 3D orb — cursor responsive, blended into cosmic scene */}
      <iframe
        src="https://my.spline.design/orb-rx69OdZUaqur4OGhxmpkh3QS/"
        frameBorder="0"
        title="3D Orb"
        loading="lazy"
        ref={splineRef}
        className="absolute inset-0 h-full w-full pointer-events-none"
        allow="fullscreen; autoplay; xr-spatial-tracking"
        style={{ mixBlendMode: "screen", opacity: 0.9, willChange: "transform" }}
      />
    </div>
  );
};

export default AnimatedBackground;
