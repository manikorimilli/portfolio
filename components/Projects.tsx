import { ArrowUpRight, Check } from "lucide-react";
import { projects } from "@/lib/data";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { GlowBorderCard } from "./ui/glow-border-card";
import { LineHoverLink } from "./ui/line-hover-link";
import { GithubIcon } from "./ui/BrandIcons";

// The indigo→violet ramp fed to GlowBorderCard's rotating conic gradient.
const GLOW = [
  "#4f46e5",
  "#6366f1",
  "#818cf8",
  "#a78bfa",
  "#8b5cf6",
  "#7c3aed",
  "#9333ea",
  "#a78bfa",
  "#6366f1",
  "#4f46e5",
];

// Abstract generative preview art — stands in for screenshots until real
// captures exist.
function PreviewArt({ seed }: { seed: number }) {
  const hues = seed % 2 === 0 ? ["#6366f1", "#8b5cf6"] : ["#7c3aed", "#3b82f6"];
  return (
    <div className="relative h-44 overflow-hidden rounded-xl border border-elev/8 bg-[#0a0c18]">
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(220px 140px at ${25 + seed * 40}% 30%, ${hues[0]}33, transparent 70%), radial-gradient(260px 160px at ${75 - seed * 30}% 80%, ${hues[1]}2e, transparent 70%)`,
        }}
      />
      {/* Faux window chrome */}
      <div className="absolute inset-x-6 top-6 rounded-lg border border-white/10 bg-white/[0.04] p-3 backdrop-blur-sm">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
        </div>
        <div className="mt-3 space-y-2">
          <div className="h-2 w-3/4 rounded bg-white/10" />
          <div className="h-2 w-1/2 rounded bg-indigo-300/20" />
          <div className="h-2 w-2/3 rounded bg-white/[0.08]" />
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-6">
      <div className="panel p-6 md:p-12">
        <SectionHeading title="Featured Projects" eyebrow="Selected work" />

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.1} className="h-full">
              {/* Vengeance UI glowing conic border wrapping the project card */}
              <GlowBorderCard
                width="100%"
                height="100%"
                borderRadius="1rem"
                borderWidth="0.6em"
                blurAmount="1.1em"
                inset="-0.7em"
                animationDuration={9 + i * 2}
                gradientColors={GLOW}
                className="!block h-full rounded-2xl"
              >
                <div className="w-full text-left">
                  <PreviewArt seed={i} />

                  <div className="mt-6 flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent/80">
                        {project.tag}
                      </p>
                      <h3 className="mt-1.5 text-2xl font-semibold tracking-tight">
                        {project.name}
                      </h3>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.name} on GitHub`}
                        className="card flex h-9 w-9 items-center justify-center rounded-full"
                      >
                        <GithubIcon size={15} />
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.name} live demo`}
                        className="card flex h-9 w-9 items-center justify-center rounded-full"
                      >
                        <ArrowUpRight size={15} />
                      </a>
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>

                  <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {project.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-xs text-foreground/80"
                      >
                        <Check size={12} className="shrink-0 text-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-elev/10 bg-elev/[0.03] px-2.5 py-1 font-mono text-[11px] text-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6">
                    <LineHoverLink
                      variant="sweep"
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-accent"
                    >
                      Explore the repository
                    </LineHoverLink>
                  </div>
                </div>
              </GlowBorderCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
