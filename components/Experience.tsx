"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { experiences } from "@/lib/data";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { PerspectiveGrid } from "./ui/perspective-grid";
import TextAnimation from "./ui/staggerText";

export default function Experience() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-6">
      <div className="panel relative overflow-hidden p-6 md:p-12">
        {/* Vengeance UI receding tile grid, used as a faint floor */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-64 opacity-[0.18] [mask-image:linear-gradient(to_top,black,transparent)]"
        >
          <PerspectiveGrid gridSize={18} showOverlay={false} className="!bg-transparent" />
        </div>

        <SectionHeading title="Experience" eyebrow="Where I've built" />

        <div className="relative md:pl-8">
          {/* Timeline spine */}
          <div
            aria-hidden
            className="absolute left-0 top-2 hidden h-full w-px bg-gradient-to-b from-accent/50 via-accent/15 to-transparent md:block"
          />

          <div className="flex flex-col gap-4">
            {experiences.map((exp, i) => {
              const open = openIndex === i;
              return (
                <Reveal key={exp.company} delay={i * 0.08}>
                  <div className="relative">
                    {/* Timeline node */}
                    <span
                      aria-hidden
                      className={`absolute -left-8 top-8 hidden h-3 w-3 -translate-x-[5.5px] items-center justify-center rounded-full border transition-all duration-500 md:flex ${
                        open
                          ? "border-accent bg-accent shadow-[0_0_14px_rgba(129,140,248,0.8)]"
                          : "border-elev/25 bg-background"
                      }`}
                    />

                    <div className={`card overflow-hidden rounded-2xl ${open ? "border-accent/30" : ""}`}>
                      <button
                        onClick={() => setOpenIndex(open ? null : i)}
                        aria-expanded={open}
                        className="flex w-full items-center justify-between gap-4 p-5 text-left md:p-6"
                      >
                        <div>
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <h3 className="text-lg font-semibold tracking-tight md:text-xl">
                              <TextAnimation delay={0.05}>{exp.role}</TextAnimation>
                            </h3>
                            <span className="font-mono text-xs text-muted">
                              {exp.period}
                            </span>
                          </div>
                          <p className="mt-1 text-sm font-medium text-accent">
                            {exp.company}{" "}
                            <span className="text-muted">· {exp.location}</span>
                          </p>
                        </div>
                        <motion.span
                          animate={{ rotate: open ? 180 : 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="shrink-0 text-muted"
                        >
                          <ChevronDown size={18} />
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <div className="px-5 pb-6 md:px-6">
                              <div className="hairline mb-5" />
                              <ul className="flex flex-col gap-2.5">
                                {exp.highlights.map((h, j) => (
                                  <motion.li
                                    key={j}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.12 + j * 0.06 }}
                                    className="flex gap-3 text-sm leading-relaxed text-muted"
                                  >
                                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                                    {h}
                                  </motion.li>
                                ))}
                              </ul>
                              <div className="mt-5 flex flex-wrap gap-2">
                                {exp.stack.map((s) => (
                                  <span
                                    key={s}
                                    className="rounded-md border border-elev/10 bg-elev/[0.03] px-2.5 py-1 font-mono text-[11px] text-muted"
                                  >
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
