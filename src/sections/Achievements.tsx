import { achievements } from "@/lib/content";
import SectionHeader from "@/components/SectionHeader";

export default function Achievements() {
  return (
    <section data-section="achievements" aria-labelledby="achievements" className="relative py-section">
      <div className="shell">
        <SectionHeader
          index="06"
          label="Achievements"
          meta="SYS.AWARDS"
          id="achievements"
          title="Recognition, earned in the details."
        />
        <ol className="border-t border-line">
          {achievements.map((a, i) => (
            <li
              key={a.id}
              data-reveal
              className="group relative isolate grid gap-3 border-b border-line py-8 md:grid-cols-12 md:items-center md:gap-8 md:py-10"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-gradient-to-r from-white/[0.04] to-transparent transition-transform duration-700 ease-out-expo group-hover:scale-y-100"
              />
              <span className="label md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-2xl font-semibold tracking-tight transition-transform duration-700 ease-out-expo group-hover:translate-x-2 md:col-span-6 md:text-4xl">
                {a.title}
              </h3>
              <p className="text-muted md:col-span-3">{a.detail}</p>
              <div className="flex flex-col gap-1 md:col-span-2 md:text-right">
                <span className="text-sm text-fg">{a.issuer}</span>
                <span className="label">{a.kind}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
