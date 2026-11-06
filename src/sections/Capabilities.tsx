import { capabilities } from "@/lib/content";
import { trackSpotlight } from "@/lib/spotlight";
import SectionHeader from "@/components/SectionHeader";

// Bento layout: the lead card spans two columns and, on large screens, two rows.
const span = ["md:col-span-2 lg:row-span-2", "", "", "", ""];

export default function Capabilities() {
  return (
    <section data-section="ai" aria-labelledby="ai" className="relative overflow-hidden py-section">
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 h-[60vh] w-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgb(111_140_255/0.14),transparent_65%)] blur-2xl"
      />
      <div className="shell relative">
        <SectionHeader
          index="05"
          label="AI / Engineering"
          meta="SYS.AGENTIC"
          id="ai"
          title={<>AI isn't a feature. <span className="text-subtle">It's how I build.</span></>}
          lead="From LLM APIs to MCP-powered workflows, language models sit inside both the products I ship and the way I ship them."
        />

        <div className="grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c, i) => (
            <article
              key={c.id}
              data-reveal
              onPointerMove={trackSpotlight}
              aria-labelledby={`cap-${c.id}`}
              className={`spotlight flex flex-col justify-between gap-10 rounded-3xl p-7 ${span[i] ?? ""}`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="label text-accent">{c.code}</span>
                {i === 0 && <NeuralMark />}
              </div>
              <div>
                <h3
                  id={`cap-${c.id}`}
                  className={`font-semibold tracking-tight ${i === 0 ? "text-4xl md:text-6xl" : "text-2xl"}`}
                >
                  {c.title}
                </h3>
                <p className={`mt-4 text-muted ${i === 0 ? "max-w-md text-lg" : "text-sm"}`}>{c.body}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// Small animated node graph used as the lead card's mark.
function NeuralMark() {
  const nodes = [
    [20, 20], [20, 60], [20, 100],
    [80, 40], [80, 80],
    [140, 60],
  ] as const;
  const edges = [[0, 3], [0, 4], [1, 3], [1, 4], [2, 3], [2, 4], [3, 5], [4, 5]] as const;
  return (
    <svg viewBox="0 0 160 120" className="h-24 w-32 md:h-32 md:w-44" aria-hidden="true">
      {edges.map(([a, b], i) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
          stroke="#9fb4ff" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="3 5"
        >
          <animate attributeName="stroke-dashoffset" from="16" to="0" dur={`${1.2 + (i % 3) * 0.3}s`} repeatCount="indefinite" />
        </line>
      ))}
      {nodes.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" fill="#000" stroke="#c9c4bb" strokeWidth="1.2" />
      ))}
      <circle cx="140" cy="60" r="9" fill="none" stroke="#9fb4ff" strokeOpacity="0.5">
        <animate attributeName="r" values="6;13;6" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="2.4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
