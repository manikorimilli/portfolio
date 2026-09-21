"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  depth: number; // parallax layer: 0.3 (far) – 1 (near)
  tw: number; // twinkle phase
};

// Constellation particle field on a raw 2D canvas.
// Deliberately not Three.js: this achieves the same visual for a
// fraction of the bundle and runs comfortably at 60fps.
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    let w = 0,
      h = 0,
      dpr = 1;
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;

    // Palette follows the theme; watch <html class> for toggles.
    const root = document.documentElement;
    let colors = { dot: "199,204,255", line: "165,180,252", bloom: "139,148,248" };
    const applyTheme = () => {
      colors = !root.classList.contains("dark")
        ? { dot: "67,56,202", line: "79,70,229", bloom: "99,102,241" }
        : { dot: "199,204,255", line: "165,180,252", bloom: "139,148,248" };
    };
    applyTheme();
    const observer = new MutationObserver(applyTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(Math.floor((w * h) / 14000), 140);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1.2 + 0.4,
        depth: Math.random() * 0.7 + 0.3,
        tw: Math.random() * Math.PI * 2,
      }));
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const LINK_DIST = 110;

    const frame = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      // Soft light bloom that drifts with the mouse
      if (mouse.x > -999) {
        const g = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 320
        );
        g.addColorStop(0, `rgba(${colors.bloom},0.035)`);
        g.addColorStop(1, `rgba(${colors.bloom},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      for (const p of particles) {
        if (!reduced) {
          p.x += p.vx * p.depth;
          p.y += p.vy * p.depth;

          // Gentle attraction toward the cursor
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 160 * 160 && d2 > 1) {
            const f = 0.0003 * p.depth;
            p.x += dx * f;
            p.y += dy * f;
          }

          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10;
          if (p.y > h + 10) p.y = -10;
        }

        const twinkle = 0.5 + 0.5 * Math.sin(t * 0.001 + p.tw);
        const alpha = (0.15 + 0.35 * twinkle) * p.depth;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors.dot},${alpha})`;
        ctx.fill();
      }

      // Constellation lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.08;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${colors.line},${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 -z-10 h-full w-full"
    />
  );
}
