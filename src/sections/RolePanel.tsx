import type { Role } from "@/lib/content";

type Props = { role: Role; headingLevel?: "h3" | "h4" };

export default function RolePanel({ role, headingLevel: H = "h3" }: Props) {
  return (
    <article className="exp-panel">
      <div className="exp-item flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="label text-accent">{role.kicker}</span>
        <span className="label">{role.period}</span>
        <span className="label">{role.location}</span>
      </div>
      <H className="exp-item mt-5 text-lg text-muted">
        <span className="font-semibold text-fg">{role.role}</span> · {role.company}
      </H>
      <p className="exp-item mt-4 max-w-3xl text-3xl leading-tight font-semibold tracking-tight text-balance md:text-5xl">
        {role.headline}
      </p>

      <dl className="exp-item mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line">
        {role.metrics.map((m) => (
          <div key={m.label} className="flex flex-col gap-2 bg-surface p-4 md:p-6">
            <dt className="order-2 text-xs text-subtle md:text-sm">{m.label}</dt>
            <dd className="order-1 text-xl font-semibold tracking-tight text-titanium md:text-3xl">{m.value}</dd>
          </div>
        ))}
      </dl>

      <ul className="mt-10 grid gap-4">
        {role.highlights.map((h) => (
          <li key={h} className="exp-item flex gap-4 text-muted">
            <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-accent" />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <ul className="exp-item mt-8 flex flex-wrap gap-2" aria-label="Technologies">
        {role.stack.map((t) => (
          <li key={t} className="chip">
            {t}
          </li>
        ))}
      </ul>
    </article>
  );
}
