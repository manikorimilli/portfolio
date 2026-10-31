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
    const particles: Particle[] = [];
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

    const makeParticle = (): Particle => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r: Math.random() * 1.2 + 0.4,
      depth: Math.random() * 0.7 + 0.3,
      tw: Math.random() * Math.PI * 2,
    });

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Grow or trim instead of reseeding, so a mobile URL-bar resize does
      // not make the whole field jump.
      const count = Math.min(Math.floor((w * h) / 14000), 110);
      while (particles.length < count) particles.push(makeParticle());
      particles.length = count;
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const LINK_DIST = 110;
    const LINK_DIST2 = LINK_DIST * LINK_DIST;
    // The drift is slow, so 30fps is visually identical to 60/120fps and
    // halves (or quarters) the canvas work on high-refresh screens.
    const FRAME_MS = 1000 / 30;
    // Alpha is quantised into buckets so each bucket is one path and one
    // fill/stroke call, instead of one call per dot and per line.
    const DOT_BUCKETS = 6;
    const LINE_BUCKETS = 4;
    const dotPaths: Path2D[] = [];
    const linePaths: Path2D[] = [];
    let last = 0;

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      if (t - last < FRAME_MS - 2) return;
      // Movement was tuned per 60fps frame; scale it to the real step.
      const step = last ? Math.min((t - last) / 16.67, 4) : 1;
      last = t;

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

      for (let b = 0; b < DOT_BUCKETS; b++) dotPaths[b] = new Path2D();
      for (let b = 0; b < LINE_BUCKETS; b++) linePaths[b] = new Path2D();

      for (const p of particles) {
        if (!reduced) {
          p.x += p.vx * p.depth * step;
          p.y += p.vy * p.depth * step;

          // Gentle attraction toward the cursor
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 160 * 160 && d2 > 1) {
            const f = 0.0003 * p.depth * step;
            p.x += dx * f;
            p.y += dy * f;
          }

          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10;
          if (p.y > h + 10) p.y = -10;
        }

        // alpha in (0, 0.5]; bucket it
        const twinkle = 0.5 + 0.5 * Math.sin(t * 0.001 + p.tw);
        const alpha = (0.15 + 0.35 * twinkle) * p.depth;
        const b = Math.min(DOT_BUCKETS - 1, Math.floor((alpha / 0.5) * DOT_BUCKETS));
        dotPaths[b].moveTo(p.x + p.r, p.y);
        dotPaths[b].arc(p.x, p.y, p.r, 0, Math.PI * 2);
      }

      for (let b = 0; b < DOT_BUCKETS; b++) {
        ctx.fillStyle = `rgba(${colors.dot},${((b + 0.5) / DOT_BUCKETS) * 0.5})`;
        ctx.fill(dotPaths[b]);
      }

      // Constellation lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const c = particles[j];
          const dx = a.x - c.x;
          const dy = a.y - c.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST2) {
            const closeness = 1 - Math.sqrt(d2) / LINK_DIST;
            const b = Math.min(LINE_BUCKETS - 1, Math.floor(closeness * LINE_BUCKETS));
            linePaths[b].moveTo(a.x, a.y);
            linePaths[b].lineTo(c.x, c.y);
          }
        }
      }

      ctx.lineWidth = 0.5;
      for (let b = 0; b < LINE_BUCKETS; b++) {
        ctx.strokeStyle = `rgba(${colors.line},${((b + 0.5) / LINE_BUCKETS) * 0.08})`;
        ctx.stroke(linePaths[b]);
      }
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
