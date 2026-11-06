import { useRef, type ReactNode } from "react";
import { profile, projects, type Project } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/device";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { trackSpotlight } from "@/lib/spotlight";
import SectionHeader from "@/components/SectionHeader";
import Magnetic from "@/components/Magnetic";
import MessagingVisual from "./visuals/MessagingVisual";
import WoobleVisual from "./visuals/WoobleVisual";

const visuals: Record<string, ReactNode> = {
  messaging: <MessagingVisual />,
  wooble: <WoobleVisual />,
};

export default function Projects() {
  const wide = useMediaQuery("(min-width: 1024px)");
  const horizontal = wide && !prefersReducedMotion();
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  // Desktop: vertical scroll drives a horizontal pass through the work.
  useGSAP(
    () => {
      const t = track.current;
      if (!horizontal || !t) return;
      const distance = () => t.scrollWidth - window.innerWidth;
      const tween = gsap.to(t, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      gsap.utils.toArray<HTMLElement>(".proj-visual").forEach((v) => {
        gsap.fromTo(
          v,
          { xPercent: 8, scale: 0.94 },
          {
            xPercent: -8,
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: v, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
          },
        );
      });
      gsap.to(".proj-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: section.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
      });
    },
    { scope: section, dependencies: [horizontal], revertOnUpdate: true },
  );

  return (
    <section data-section="projects" aria-labelledby="projects" className="relative pt-section">
      <div className="shell">
        <SectionHeader
          index="03"
          label="Projects"
          meta={`SYS.WORK / ${projects.length} BUILDS`}
          id="projects"
          title="Selected builds."
          lead="Two products, end to end: from provider-agnostic messaging infrastructure to an AI canvas that draws what you describe."
        />
      </div>

      <div ref={section} className={horizontal ? "relative h-svh overflow-hidden" : "relative"}>
        <div
          ref={track}
          className={
            horizontal
              ? "flex h-full w-max items-center gap-8 pr-[10vw] pl-[max(var(--spacing-gutter),calc((100vw-var(--container-shell))/2+var(--spacing-gutter)))]"
              : "shell flex flex-col gap-6"
          }
        >
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} wide={horizontal} />
          ))}
          <aside
            className={`flex flex-col justify-center gap-6 rounded-[2rem] border border-dashed border-line-strong p-8 ${
              horizontal ? "h-[72vh] w-[28vw]" : ""
            }`}
          >
            <span className="label">More in the lab</span>
            <p className="text-3xl font-semibold tracking-tight text-balance">Code, experiments and everything in between.</p>
            <Magnetic>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" data-cursor="GitHub">
                github.com/{profile.githubHandle} <span aria-hidden="true">↗</span>
              </a>
            </Magnetic>
          </aside>
        </div>
        {horizontal && (
          <div aria-hidden="true" className="shell absolute inset-x-0 bottom-8 flex items-center gap-4">
            <span className="label">Scroll</span>
            <span className="h-px flex-1 bg-line">
              <span className="proj-progress block h-full origin-left scale-x-0 bg-fg" />
            </span>
            <span className="label">{String(projects.length).padStart(2, "0")}</span>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project: p, wide }: { project: Project; wide: boolean }) {
  return (
    <article
      aria-labelledby={`proj-${p.id}`}
      className={`spotlight group grid overflow-hidden rounded-[2rem] ${
        wide ? "h-[72vh] w-[78vw] max-w-[78rem] grid-cols-[1.05fr_1fr]" : "grid-cols-1"
      }`}
      onPointerMove={trackSpotlight}
    >
      <div className="relative flex flex-col justify-between gap-8 p-7 md:p-10">
        <div>
          <div className="flex items-center justify-between">
            <span className="label text-fg">{p.index}</span>
            <span className="label text-accent">{p.kicker}</span>
          </div>
          <h3 id={`proj-${p.id}`} className="mt-8 text-4xl font-semibold tracking-tight text-balance md:text-5xl">
            {p.name}
          </h3>
          <p className="mt-4 max-w-md text-muted">{p.summary}</p>
          <ul className="mt-6 grid gap-3 text-sm text-muted">
            {p.points.map((pt) => (
              <li key={pt} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-accent" />
                {pt}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <dl className="grid grid-cols-3 gap-4 border-t border-line pt-6">
            {p.metrics.map((m) => (
              <div key={m.label} className="flex flex-col gap-1">
                <dt className="order-2 text-xs text-subtle">{m.label}</dt>
                <dd className="order-1 text-2xl font-semibold tracking-tight text-titanium">{m.value}</dd>
              </div>
            ))}
          </dl>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
            {p.stack.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
          {p.links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {p.links.map((l) => (
                <Magnetic key={l.href} strength={0.25}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={l.label === "Live app" ? "btn btn-primary h-11" : "btn btn-ghost h-11"}
                    data-cursor="Open"
                  >
                    <span>{l.label}</span>
                    <span aria-hidden="true">↗</span>
                    <span className="sr-only">for {p.name} (opens in a new tab)</span>
                  </a>
                </Magnetic>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="relative min-h-72 overflow-hidden border-t border-line bg-gradient-to-b from-raised to-surface md:min-h-96 lg:border-t-0 lg:border-l">
        <div aria-hidden="true" className="grid-bg absolute inset-0 opacity-50" />
        <div className="proj-visual absolute inset-0 p-6 md:p-10">{visuals[p.id]}</div>
      </div>
    </article>
  );
}
