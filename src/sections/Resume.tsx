import { useRef } from "react";
import { experience, profile, projects, skills } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { hasFinePointer, prefersReducedMotion } from "@/lib/device";
import SectionHeader from "@/components/SectionHeader";
import Magnetic from "@/components/Magnetic";

export default function Resume() {
  const card = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = card.current;
      const area = wrap.current;
      if (!el || !area || prefersReducedMotion()) return;
      gsap.fromTo(
        el,
        { rotateX: 24, rotateZ: -6, y: 80 },
        {
          rotateX: 6,
          rotateZ: -2,
          y: 0,
          ease: "none",
          scrollTrigger: { trigger: area, start: "top bottom", end: "center center", scrub: true },
        },
      );
      if (!hasFinePointer()) return;
      const ry = gsap.quickTo(el, "rotateY", { duration: 0.8, ease: "power3.out" });
      const rx = gsap.quickTo(el, "rotateX", { duration: 0.8, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        const r = area.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 16);
        rx(6 - ((e.clientY - r.top) / r.height - 0.5) * 12);
      };
      const leave = () => {
        ry(0);
        rx(6);
      };
      area.addEventListener("pointermove", move);
      area.addEventListener("pointerleave", leave);
      return () => {
        area.removeEventListener("pointermove", move);
        area.removeEventListener("pointerleave", leave);
      };
    },
    { scope: wrap },
  );

  const facts = [
    { k: "Roles", v: String(experience.length) },
    { k: "Projects", v: String(projects.length) },
    { k: "Skill areas", v: String(skills.length) },
    { k: "Format", v: "PDF · 1 page" },
  ];

  return (
    <section data-section="resume" aria-labelledby="resume" className="relative py-section">
      <div className="shell grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHeader index="07" label="Resume" meta="DOC.PDF" id="resume" title="The full spec sheet." />
          <p data-reveal className="-mt-6 max-w-md text-lead text-muted">
            Everything on this site, on one page. Experience, projects, skills and education, ready to share.
          </p>
          <dl data-reveal className="mt-10 grid max-w-md grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {facts.map((f) => (
              <div key={f.k} className="flex flex-col gap-1 bg-bg p-5">
                <dt className="label">{f.k}</dt>
                <dd className="text-xl font-semibold tracking-tight">{f.v}</dd>
              </div>
            ))}
          </dl>
          <div data-reveal className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <a href={profile.resume} download="Manikanta_Korimilli_Resume.pdf" className="btn btn-primary" data-cursor="Save">
                <span>Download PDF</span>
                <span aria-hidden="true">↓</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                View in browser <span aria-hidden="true">↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </Magnetic>
          </div>
        </div>

        <div ref={wrap} className="relative grid place-items-center py-10 [perspective:1400px]" aria-hidden="true">
          <div className="absolute size-[70%] rounded-full bg-[radial-gradient(circle,rgb(111_140_255/0.22),transparent_65%)] blur-2xl" />
          <div
            ref={card}
            className="relative aspect-[1/1.32] w-full max-w-md rounded-2xl border border-white/10 bg-gradient-to-b from-[#f5f5f7] to-[#d9d7d3] p-8 text-black shadow-[0_60px_120px_-30px_rgb(0_0_0/0.9)] [transform-style:preserve-3d]"
          >
            <p className="text-center text-lg font-bold tracking-tight uppercase">{profile.name}</p>
            <p className="mt-1 text-center text-[8px] text-black/50">
              {profile.email} · linkedin.com/{profile.linkedinHandle} · github.com/{profile.githubHandle}
            </p>
            {["Technical Skills", "Experience", "Projects", "Education", "Achievements"].map((h, i) => (
              <div key={h} className="mt-5">
                <p className="border-b border-black/20 pb-1 text-[9px] font-bold tracking-wide uppercase">{h}</p>
                {Array.from({ length: i === 1 ? 4 : 2 }, (_, k) => (
                  <span
                    key={k}
                    className="mt-1.5 block h-1 rounded-full bg-black/10"
                    style={{ width: `${92 - ((k * 17 + i * 11) % 34)}%` }}
                  />
                ))}
              </div>
            ))}
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-60 mix-blend-overlay" />
          </div>
        </div>
      </div>
    </section>
  );
}
