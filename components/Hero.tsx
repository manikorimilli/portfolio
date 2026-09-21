"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, MousePointer2, Sparkles } from "lucide-react";
import { site } from "@/lib/site";
import { heroStats } from "@/lib/data";
import { AnimatedRays } from "./ui/animated-rays";
import { FlipText } from "./ui/flip-text";
import TextAnimation from "./ui/staggerText";
import StatsCounter from "./ui/stats-counter";
import { RadialGlowButton } from "./ui/radial-glow-button";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import RotatingText from "./ui/RotatingText";

const ease = [0.22, 1, 0.36, 1] as const;

const roles = [
  "Software Development Engineer",
  "Full Stack Developer",
  "AI-Assisted Builder",
];

// Icon slugs shown on the two orbital rings, each with a tooltip label.
const ORBIT_OUTER = [
  { slug: "react", label: "React" },
  { slug: "typescript", label: "TypeScript" },
  { slug: "nodedotjs", label: "Node.js" },
  { slug: "mysql", label: "MySQL" },
  { slug: "git", label: "Git" },
];
const ORBIT_INNER = [
  { slug: "angular", label: "Angular" },
  { slug: "tailwindcss", label: "Tailwind" },
  { slug: "mongodb", label: "MongoDB" },
];

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 24, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.9, ease, delay },
  };
}

function OrbitRing({
  items,
  size,
  itemClass,
}: {
  items: { slug: string; label: string }[];
  size: number;
  itemClass: string;
}) {
  return (
    <div
      className="absolute rounded-full border border-line"
      style={{ width: size, height: size }}
    >
      {items.map((item, i) => {
        const angle = (i / items.length) * 360;
        return (
          <span
            key={item.slug}
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `rotate(${angle}deg) translateX(${size / 2}px) rotate(${-angle}deg)`,
            }}
          >
            <span className={`block -translate-x-1/2 -translate-y-1/2 ${itemClass}`}>
              <AnimatedTooltip
                variant="cora"
                content={item.label}
                accentColor="#6366f1"
                shapeColor="#6366f1"
                textColor="#ffffff"
              >
                <span className="glass flex h-10 w-10 items-center justify-center rounded-xl">
                  <span
                    aria-hidden
                    className="tech-ico h-4.5 w-4.5 text-accent"
                    style={
                      { "--ico": `url(/icons/${item.slug}.svg)` } as React.CSSProperties
                    }
                  />
                </span>
              </AnimatedTooltip>
            </span>
          </span>
        );
      })}
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-4 pt-28 md:pt-32">
      <div className="panel relative overflow-hidden px-6 py-16 md:px-14 md:py-20">
        {/* Vengeance UI aurora ray field, rethemed to the indigo/violet ramp */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.28]">
          <AnimatedRays className="h-full w-full" />
        </div>

        {/* Faint blueprint grid behind the content */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(700px 500px at 30% 30%, black, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(700px 500px at 30% 30%, black, transparent 75%)",
          }}
        />

        <div className="relative grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <motion.div {...fadeUp(0.1)}>
              <span className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2">
                <span className="pulse-dot" />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/80">
                  Available for opportunities
                </span>
              </span>
            </motion.div>

            {/* Per-character 3D flip on the name */}
            <h1 className="mt-8 text-5xl font-semibold tracking-tight md:text-7xl">
              <motion.span {...fadeUp(0.25)} className="block">
                <TextAnimation delay={0.3}>Hi, I&apos;m</TextAnimation>
              </motion.span>
              <FlipText
                loop={false}
                duration={1.8}
                delay={0.8}
                className="mt-1 block text-accent-2 [text-shadow:0_0_32px_rgba(139,92,246,0.35)]"
              >
                {site.firstName}
              </FlipText>
            </h1>

            <motion.p
              {...fadeUp(0.4)}
              className="mt-4 min-h-[2.5rem] text-2xl font-medium tracking-tight text-foreground/90 md:text-3xl"
            >
              <RotatingText phrases={roles} />
            </motion.p>

            <motion.p
              {...fadeUp(0.55)}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg"
            >
              I build scalable, efficient and user-friendly web applications
              that solve real-world problems — currently crafting analytics
              products at <span className="text-foreground">DeeptaAI</span>.
            </motion.p>

            <motion.div
              {...fadeUp(0.7)}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <RadialGlowButton
                onClick={() =>
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <span className="flex items-center gap-2">
                  View My Work
                  <ArrowRight size={16} />
                </span>
              </RadialGlowButton>

              <a
                href={site.resume}
                download
                className="card flex items-center gap-2 rounded-full px-7 py-3.5 text-sm"
              >
                <Download size={16} />
                Download Resume
              </a>
            </motion.div>
          </div>

          {/* Orbital tech visual — now with Vengeance tooltips per chip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease, delay: 0.5 }}
            className="relative mx-auto hidden h-[420px] w-[420px] items-center justify-center lg:flex"
          >
            {/* Core */}
            <div className="absolute flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 shadow-[0_0_80px_rgba(129,140,248,0.45)]">
              <span className="font-mono text-2xl font-bold text-white">
                &lt;/&gt;
              </span>
            </div>
            <div aria-hidden className="absolute h-40 w-40 rounded-full border border-accent/25" />

            {/* Rings rotate; chips counter-rotate to stay upright */}
            <div className="orbit-fast absolute flex items-center justify-center">
              <OrbitRing items={ORBIT_INNER} size={240} itemClass="orbit-fast-rev" />
            </div>
            <div className="orbit-slow absolute flex items-center justify-center">
              <OrbitRing items={ORBIT_OUTER} size={380} itemClass="orbit-slow-rev" />
            </div>

            {/* Floating accent chips */}
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="glass pointer-events-none absolute -right-2 top-14 flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/80"
            >
              <Sparkles size={11} className="text-accent" /> AI-Powered
            </motion.span>
            <motion.span
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="glass pointer-events-none absolute -left-2 bottom-16 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/80"
            >
              1.5+ yrs shipping
            </motion.span>
          </motion.div>
        </div>

        {/* Stats now count up on scroll-in */}
        <motion.div
          {...fadeUp(0.9)}
          className="relative mt-14 flex flex-col gap-6 md:flex-row md:items-center"
        >
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            <MousePointer2 size={13} /> Scroll to explore
          </span>
          <div className="card flex flex-1 flex-wrap items-center justify-between gap-6 rounded-2xl px-6 py-5 md:px-8">
            {heroStats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-semibold tracking-tight md:text-3xl">
                  <StatsCounter
                    value={s.value}
                    suffix={s.suffix}
                    className="grad-text"
                  />
                </p>
                <p className="mt-1 text-xs text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
