import type { ReactNode } from "react";
import SplitReveal from "./SplitReveal";

type Props = {
  index: string;
  label: string;
  meta?: string;
  title: ReactNode;
  id: string;
  lead?: string;
};

// Section number, technical label and a masked headline.
export default function SectionHeader({ index, label, meta, title, id, lead }: Props) {
  return (
    <header className="mb-14 md:mb-20">
      <div className="mb-8 flex items-center gap-4 border-b border-line pb-4" data-reveal>
        <span className="label text-fg">{index}</span>
        <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
        <span className="label">{label}</span>
        {meta && <span className="label ml-auto hidden sm:inline">[ {meta} ]</span>}
      </div>
      <SplitReveal as="h2" id={id} className="max-w-5xl text-title font-semibold text-balance text-fg">
        {title}
      </SplitReveal>
      {lead && (
        <p className="mt-6 max-w-2xl text-lead text-muted" data-reveal>
          {lead}
        </p>
      )}
    </header>
  );
}
