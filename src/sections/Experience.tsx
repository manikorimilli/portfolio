import { useRef, useState } from "react";
import { experience } from "@/lib/content";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/device";
import { scrollToTarget } from "@/lib/scroll";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import SectionHeader from "@/components/SectionHeader";
import RolePanel from "./RolePanel";

export default function Experience() {
  const wide = useMediaQuery("(min-width: 1024px)");
  return (
    <section data-section="experience" aria-labelledby="experience" className="relative pt-section">
      <div className="shell">
        <SectionHeader
          index="02"
          label="Experience"
          meta={`SYS.CAREER / ${experience.length} ROLES`}
          id="experience"
          title="Shipping systems that teams rely on."
        />
      </div>
      {wide ? <PinnedTimeline /> : <StackedTimeline />}
    </section>
  );
}

// Desktop: the stage pins while scrolling advances through each role.
function PinnedTimeline() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const n = experience.length;

  useGSAP(
    () => {
      const el = track.current;
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const i = Math.min(n - 1, Math.floor(self.progress * n));
          el.style.setProperty("--p", String(self.progress * n - i));
          if (i !== activeRef.current) {
            activeRef.current = i;
            setActive(i);
          }
        },
      });
    },
    { scope: track },
  );

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ".exp-item",
        { y: 28, autoAlpha: 0, filter: "blur(6px)" },
        { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.9, stagger: 0.05, overwrite: true },
      );
      gsap.fromTo(".exp-ghost", { yPercent: 30, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1.4 });
    },
    { scope: track, dependencies: [active] },
  );

  const jump = (i: number) => {
    const el = track.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    scrollToTarget(top + span * ((i + 0.08) / n));
  };

  const role = experience[active]!;

  return (
    <div ref={track} className="relative" style={{ height: `${n * 110}vh` }}>
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <span
          aria-hidden="true"
          className="exp-ghost pointer-events-none absolute right-[-2vw] bottom-[-3vw] text-[18vw] leading-none font-bold tracking-tighter text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.07)]"
        >
          {role.company}
        </span>
        <div className="shell grid w-full grid-cols-12 gap-10">
          <ol className="col-span-4 flex flex-col gap-2 self-center">
            {experience.map((r, i) => (
              <li key={r.id}>
                <button
                  type="button"
                  onClick={() => jump(i)}
                  aria-current={i === active ? "step" : undefined}
                  aria-controls="exp-stage"
                  className={`group relative w-full overflow-hidden rounded-2xl border p-5 text-left transition-colors duration-500 ${
                    i === active ? "border-line-strong bg-white/[0.04]" : "border-transparent hover:bg-white/[0.02]"
                  }`}
                >
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="label">{String(i + 1).padStart(2, "0")}</span>
                    <span className="label">{r.period}</span>
                  </span>
                  <span
                    className={`mt-3 block text-2xl font-semibold tracking-tight transition-colors duration-500 ${
                      i === active ? "text-fg" : "text-subtle group-hover:text-muted"
                    }`}
                  >
                    {r.company}
                  </span>
                  <span className="mt-1 block text-sm text-subtle">{r.role}</span>
                  <span aria-hidden="true" className="absolute inset-x-5 bottom-0 h-px bg-line">
                    <span
                      className="block h-full origin-left bg-accent"
                      style={{
                        transform: `scaleX(${i < active ? 1 : i === active ? "var(--p, 0)" : 0})`,
                      }}
                    />
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <div id="exp-stage" className="col-span-8 self-center">
            <RolePanel key={role.id} role={role} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StackedTimeline() {
  return (
    <ol className="shell relative flex flex-col gap-6 pb-4">
      {experience.map((r, i) => (
        <li key={r.id} data-reveal className="spotlight rounded-3xl p-6 sm:p-8">
          <span className="label mb-6 block">
            {String(i + 1).padStart(2, "0")} / {String(experience.length).padStart(2, "0")}
          </span>
          <RolePanel role={r} />
        </li>
      ))}
    </ol>
  );
}
