import { Award, GraduationCap, Star, Trophy, Zap } from "lucide-react";
import { achievements, education } from "@/lib/data";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { GlowBorderCard } from "./ui/glow-border-card";

const icons = [Trophy, Star, Award, Zap];

// Indigo→violet ramp for the rotating conic glow.
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

export default function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-6xl px-4 py-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="panel p-6 md:p-10">
          <SectionHeading title="Education" />
          <Reveal>
            {/* The one credential worth a glowing frame */}
            <GlowBorderCard
              width="100%"
              height="auto"
              borderRadius="1rem"
              borderWidth="0.55em"
              blurAmount="1em"
              inset="-0.65em"
              animationDuration={11}
              gradientColors={GLOW}
              className="!block rounded-2xl"
            >
              <div className="flex items-start gap-4 text-left">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-elev/[0.06]">
                  <GraduationCap size={18} className="text-accent" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{education.degree}</p>
                  <p className="mt-1 text-sm text-accent">{education.school}</p>
                  <p className="mt-1 font-mono text-xs text-muted">
                    {education.period}
                  </p>
                  <p className="mt-2 text-xs text-muted">{education.detail}</p>
                </div>
              </div>
            </GlowBorderCard>
          </Reveal>
        </div>

        <div className="panel p-6 md:p-10">
          <SectionHeading title="Achievements" />
          <div className="grid gap-3 sm:grid-cols-2">
            {achievements.map((a, i) => {
              const Icon = icons[i % icons.length];
              return (
                <Reveal key={a.title} delay={i * 0.08} className="h-full">
                  <div className="card h-full p-5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-elev/[0.04]">
                      <Icon size={16} className="text-accent" />
                    </span>
                    <p className="mt-3 text-sm font-medium">{a.title}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted">
                      {a.detail}
                    </p>
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
