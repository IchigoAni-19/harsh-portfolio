import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
}

const Snowfall = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const snowflakesRef = useRef<Snowflake[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvas.className = "absolute inset-0 w-full h-full";
    container.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 2;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create snowflakes
    const snowflakeCount = Math.floor(window.innerWidth / 8);
    snowflakesRef.current = Array.from({ length: snowflakeCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      radius: Math.max(0.5, Math.random() * 3),
      speed: Math.max(0.3, Math.random() * 1.5 + 0.5),
      opacity: Math.random() * 0.6 + 0.4,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.01,
    }));

    let lastTime = 0;
    const animate = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      snowflakesRef.current.forEach((flake) => {
        // Update position
        flake.y += flake.speed;
        flake.wobble += flake.wobbleSpeed;
        flake.x += Math.sin(flake.wobble) * 0.5;

        // Reset if below screen
        if (flake.y > canvas.height) {
          flake.y = -10;
          flake.x = Math.random() * canvas.width;
        }

        // Draw snowflake with glow
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          flake.x,
          flake.y,
          0,
          flake.x,
          flake.y,
          Math.max(0.1, flake.radius * 2)
        );
        gradient.addColorStop(0, `rgba(200, 220, 255, ${flake.opacity})`);
        gradient.addColorStop(0.5, `rgba(180, 200, 255, ${flake.opacity * 0.5})`);
        gradient.addColorStop(1, "rgba(180, 200, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.arc(flake.x, flake.y, Math.max(0.1, flake.radius * 2), 0, Math.PI * 2);
        ctx.fill();

        // Inner bright core
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
        ctx.arc(flake.x, flake.y, Math.max(0.1, flake.radius * 0.5), 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current!);
      window.removeEventListener("resize", resizeCanvas);
      container.removeChild(canvas);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-10"
      style={{ opacity: 0.7 }}
    />
  );
};

export default Snowfall;
