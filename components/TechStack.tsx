"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu } from "lucide-react";
import { skills, skillFilters } from "@/lib/data";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { LogoSlider } from "./ui/logo-slider";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import { CandyButton } from "./ui/candy-button";

// Brand-icon skills feed the marquee; the list is doubled at the call site so
// the track's -50% loop is seamless.
const marqueeSkills = skills.filter((s) => s.slug);

function SkillGlyph({ slug, name }: { slug: string; name: string }) {
  return (
    <AnimatedTooltip
      variant="dori"
      content={name}
      accentColor="#6366f1"
      shapeColor="#6366f1"
      textColor="#ffffff"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-elev/[0.04] transition-transform duration-300 hover:scale-110">
        <span
          aria-hidden
          className="tech-ico h-6 w-6 text-foreground/80"
          style={{ "--ico": `url(/icons/${slug}.svg)` } as React.CSSProperties}
        />
      </span>
    </AnimatedTooltip>
  );
}

export default function TechStack() {
  const [filter, setFilter] = useState("All");
  const visible =
    filter === "All" ? skills : skills.filter((s) => s.groups.includes(filter));

  const logos = [...marqueeSkills, ...marqueeSkills].map((s, i) => (
    <SkillGlyph key={`${s.slug}-${i}`} slug={s.slug!} name={s.name} />
  ));

  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-6">
      <div className="panel p-6 md:p-12">
        <SectionHeading
          title="Skills & Technologies"
          eyebrow="What I work with"
        />

        {/* Vengeance UI marquee — the whole stack drifting past, with a
            tooltip on every glyph. */}
        <Reveal>
          <div className="mb-10">
            <LogoSlider
              logos={logos}
              speed={45}
              showBlur={false}
              pauseOnHover
            />
          </div>
        </Reveal>

        <Reveal>
          <div className="mb-8 flex flex-wrap gap-2">
            {skillFilters.map((f) =>
              filter === f ? (
                <CandyButton
                  key={f}
                  onClick={() => setFilter(f)}
                  className="px-4 py-2 text-sm"
                >
                  {f}
                </CandyButton>
              ) : (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="card rounded-xl px-4 py-2 text-sm text-muted transition-all duration-300 hover:text-foreground"
                >
                  {f}
                </button>
              )
            )}
          </div>
        </Reveal>

        <motion.div
          layout
          className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="card group flex flex-col items-center gap-3 p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-elev/[0.04] transition-transform duration-300 group-hover:scale-110">
                    {skill.slug ? (
                      <span
                        aria-hidden
                        className="tech-ico h-6 w-6 text-accent/90"
                        style={
                          {
                            "--ico": `url(/icons/${skill.slug}.svg)`,
                          } as React.CSSProperties
                        }
                      />
                    ) : (
                      <Cpu size={22} className="text-accent/80" />
                    )}
                  </span>
                  <span className="text-center text-xs font-medium text-foreground/85">
                    {skill.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
