import { useRef } from "react";
import { hero, profile } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/device";
import { moveFocus, scrollToTarget } from "@/lib/scroll";
import SplitReveal from "@/components/SplitReveal";
import Magnetic from "@/components/Magnetic";

type Props = { ready: boolean };

export default function Hero({ ready }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ready) return;
      if (!prefersReducedMotion()) {
        gsap.from(".hero-fade", { y: 24, autoAlpha: 0, duration: 1.2, stagger: 0.08, delay: 0.5 });
      }
      gsap.to(".hero-copy", {
        yPercent: -18,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom 30%", scrub: true },
      });
    },
    { scope: root, dependencies: [ready] },
  );

  const jump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToTarget(`#${id}`);
    moveFocus(id);
  };

  return (
    <section
      ref={root}
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-svh flex-col overflow-hidden"
    >
      <div aria-hidden="true" className="grid-bg absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 size-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(111_140_255/0.12),transparent_60%)]"
      />

      <div className="hero-copy shell relative z-10 flex flex-1 flex-col justify-center pt-32 pb-24 md:pb-16">
        <p className="hero-fade label mb-6 flex items-center gap-3 text-muted">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-pulse-dot rounded-full bg-ok" />
          </span>
          {hero.eyebrow}
        </p>
        <SplitReveal
          as="h1"
          id="hero-title"
          play={ready}
          immediate
          delay={0.15}
          className="text-mega font-semibold text-titanium"
        >
          {hero.headline[0]}
          <br />
          {hero.headline[1]}
        </SplitReveal>
        <p className="hero-fade mt-8 max-w-md text-lead text-muted">
          <span className="text-fg">{profile.name}.</span> {hero.intro}
        </p>
        <div className="hero-fade mt-10 flex flex-wrap items-center gap-3">
          <Magnetic>
            <a href="#projects" onClick={jump("projects")} className="btn btn-primary" data-cursor="Explore">
              <span>View the work</span>
              <span aria-hidden="true">→</span>
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#contact" onClick={jump("contact")} className="btn btn-ghost">
              Get in touch
            </a>
          </Magnetic>
        </div>
      </div>

      <div className="hero-fade shell relative z-10 hidden items-end justify-between pb-8 md:flex" aria-hidden="true">
        <span className="label">{profile.location} · 17.38° N, 78.48° E</span>
        <span className="flex items-center gap-3">
          <span className="label">Scroll</span>
          <span className="relative block h-10 w-px overflow-hidden bg-line">
            <span className="absolute inset-0 animate-scroll-cue bg-fg" />
          </span>
        </span>
        <span className="label">Portfolio / 2026</span>
      </div>
    </section>
  );
}
