import { Code2, Lightbulb, Rocket, Sparkles } from "lucide-react";
import { traits } from "@/lib/data";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { HighlightGrid } from "./ui/highlight-grid";

const traitIcons = [Rocket, Lightbulb, Code2, Sparkles];

const cards = [
  {
    title: "Products, not pages",
    body: "Every feature I ship — from analytics dashboards to real-time canvases — starts with the question: what should this feel like to use?",
  },
  {
    title: "Real-time by instinct",
    body: "Cursors moving on shared canvases, dashboards updating live, syncs firing on webhooks. I gravitate toward hard synchronization problems.",
  },
  {
    title: "AI as a multiplier",
    body: "I've trained and benchmarked LLMs, and shipped AI-assisted features into products. AI is leverage for craft, never a replacement for it.",
  },
  {
    title: "Depth over surface",
    body: "Cutting sync latency 30% or interpretation time 40% comes from understanding what happens underneath the frameworks.",
  },
];

// Keyword band for the Vengeance HighlightGrid. Colours are pinned to the
// portfolio's indigo→violet ramp rather than the component's default palette.
const highlightRows = [
  [{ label: "typescript" }, { label: "react" }, { label: "node" }],
  [{ label: "analytics" }, { label: "real-time" }, { label: "llms" }, { label: "apis" }],
];

const HIGHLIGHT_COLORS = [
  "#4f46e5",
  "#6366f1",
  "#7c3aed",
  "#8b5cf6",
  "#818cf8",
  "#a78bfa",
  "#9333ea",
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-6">
      <div className="panel p-6 md:p-12">
        <SectionHeading title="About Me" eyebrow="Who I am" />

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Reveal>
              <p className="text-lg leading-relaxed text-foreground/90 md:text-xl">
                I&apos;m a passionate software engineer from Hyderabad who
                loves turning ideas into reality through code — fast, live,
                and quietly intelligent.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
                My path started with a CS degree, a detour through training AI
                models, then full-time product engineering. Each step taught
                me something the next one needed — evaluating LLMs made me
                precise about quality, building chatbot platforms sharpened my
                instincts for reliability, and shipping analytics at DeeptaAI
                taught me that the best engineering is invisible until you
                notice how fast a decision became.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-3">
                {traits.map((t, i) => {
                  const Icon = traitIcons[i % traitIcons.length];
                  return (
                    <span
                      key={t}
                      className="card flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm"
                    >
                      <Icon size={14} className="text-accent" />
                      {t}
                    </span>
                  );
                })}
              </div>
            </Reveal>

            {/* Vengeance UI sliding-highlight keyword band */}
            <Reveal delay={0.3}>
              <div className="mt-8 h-32 md:h-36">
                {/* The component hardcodes its inner grid to 90%x60% of the
                    parent; stretch it to fill the wrapper instead. */}
                <HighlightGrid
                  rows={highlightRows}
                  colors={HIGHLIGHT_COLORS}
                  transitionDuration={280}
                  className="[&>div]:h-full [&>div]:w-full"
                />
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08} className="h-full">
                <div className="card h-full p-5">
                  <p className="text-sm font-medium">{c.title}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {c.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
