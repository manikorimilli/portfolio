import { marquee, skills } from "@/lib/content";
import { trackSpotlight } from "@/lib/spotlight";
import SectionHeader from "@/components/SectionHeader";

export default function Skills() {
  const total = skills.reduce((n, g) => n + g.items.length, 0);
  return (
    <section data-section="stack" aria-labelledby="stack" className="relative py-section">
      <div className="shell">
        <SectionHeader
          index="04"
          label="Stack"
          meta={`SYS.STACK / ${total} TOOLS`}
          id="stack"
          title="One stack, front to back."
        />
      </div>

      <div aria-hidden="true" className="relative mb-16 overflow-hidden border-y border-line py-6 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-12 hover:[animation-play-state:paused]">
          {[...marquee, ...marquee].map((t, i) => (
            <span key={`${t}-${i}`} className="flex items-center gap-12 text-4xl font-semibold tracking-tight text-subtle md:text-6xl">
              {t}
              <span className="size-1.5 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>

      <div className="shell grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((g, i) => (
          <article
            key={g.id}
            data-reveal
            onPointerMove={trackSpotlight}
            className="spotlight flex flex-col rounded-3xl p-7"
            aria-labelledby={`skills-${g.id}`}
          >
            <div className="flex items-center justify-between">
              <span className="label text-accent">{g.code}</span>
              <span className="label">
                {String(i + 1).padStart(2, "0")} · {String(g.items.length).padStart(2, "0")}
              </span>
            </div>
            <h3 id={`skills-${g.id}`} className="mt-10 text-2xl font-semibold tracking-tight">
              {g.label}
            </h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li key={s} className="chip transition-colors duration-300 hover:border-line-strong hover:text-fg">
                  {s}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
