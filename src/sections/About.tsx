import { about, stats } from "@/lib/content";
import SectionHeader from "@/components/SectionHeader";
import TextScrub from "@/components/TextScrub";
import Counter from "@/components/Counter";

export default function About() {
  return (
    <section data-section="about" aria-labelledby="about" className="relative py-section">
      <div className="shell">
        <SectionHeader index="01" label="About" meta="SYS.PROFILE" id="about" title="Engineering, amplified by AI." />

        <TextScrub text={about.statement} className="max-w-6xl text-statement font-medium text-fg" />

        <dl className="mt-24 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} data-reveal className="group relative flex flex-col gap-3 bg-bg p-6 md:p-8">
              <dt className="order-2 text-sm text-fg">{s.label}</dt>
              <dd className="order-1 text-display font-semibold text-titanium">
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
              <dd className="order-3 font-mono text-xs leading-relaxed text-subtle">{s.note}</dd>
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 h-px w-0 bg-accent transition-[width] duration-700 ease-out-expo group-hover:w-full"
              />
            </div>
          ))}
        </dl>

        <div data-reveal className="spotlight mt-16 grid gap-6 rounded-3xl p-8 md:grid-cols-[auto_1fr_auto] md:items-center md:p-10">
          <span className="label">Education</span>
          <div>
            <p className="text-2xl font-semibold tracking-tight">{about.education.school}</p>
            <p className="mt-1 text-muted">{about.education.degree}</p>
          </div>
          <div className="md:text-right">
            <p className="font-mono text-sm text-fg">{about.education.period}</p>
            <p className="mt-1 text-sm text-subtle">{about.education.detail}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
