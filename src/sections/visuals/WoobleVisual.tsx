import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/device";

const PROMPT = "flowchart: sign up → verify → onboard";

// Illustration of text-to-diagram: a prompt types out, shapes draw in, one gets selected.
export default function WoobleVisual() {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const typed = ref.current?.querySelector<SVGTextElement>(".wv-typed");
      const state = { n: 0 };
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1.2,
        defaults: { ease: "power3.inOut" },
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", toggleActions: "play pause resume pause" },
      });
      tl.set(".wv-draw", { strokeDashoffset: 400 })
        .set(".wv-label, .wv-select", { autoAlpha: 0 })
        .to(state, {
          n: PROMPT.length,
          duration: 1.6,
          ease: "none",
          onUpdate: () => {
            if (typed) typed.textContent = PROMPT.slice(0, Math.round(state.n));
          },
        })
        .to(".wv-draw", { strokeDashoffset: 0, duration: 1.1, stagger: 0.18 }, "+=0.2")
        .to(".wv-label", { autoAlpha: 1, duration: 0.4, stagger: 0.12 }, "-=0.6")
        .to(".wv-select", { autoAlpha: 1, duration: 0.3 }, "+=0.2")
        .to(".wv-node-b", { rotation: 8, svgOrigin: "240 186", duration: 0.8 })
        .to(".wv-node-b", { rotation: 0, svgOrigin: "240 186", duration: 0.8 }, "+=0.4")
        .to({}, { duration: 1 });
    },
    { scope: ref },
  );

  const still = prefersReducedMotion();

  return (
    <svg ref={ref} viewBox="0 0 480 360" className="h-full w-full" role="img" aria-label="Illustration: a plain-English prompt becomes an editable flowchart">
      <defs>
        <pattern id="wv-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.8" fill="rgba(255,255,255,.12)" />
        </pattern>
        <marker id="wv-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#9fb4ff" />
        </marker>
      </defs>
      <rect width="480" height="360" fill="url(#wv-dots)" />

      {/* Prompt bar */}
      <rect x="40" y="28" width="400" height="40" rx="20" fill="#141417" stroke="rgba(255,255,255,.14)" />
      <text x="62" y="53" fill="#9fb4ff" fontSize="11" fontFamily="var(--font-mono)">✦</text>
      <text className="wv-typed" x="80" y="53" fill="#f5f5f7" fontSize="11" fontFamily="var(--font-mono)">
        {still ? PROMPT : ""}
      </text>

      <g fill="none" stroke="#c9c4bb" strokeWidth="1.4" strokeDasharray="400">
        <rect className="wv-draw" x="40" y="160" width="110" height="52" rx="12" />
        <g className="wv-node-b">
          <path className="wv-draw" d="M 240 146 L 288 186 L 240 226 L 192 186 Z" />
        </g>
        <rect className="wv-draw" x="330" y="160" width="110" height="52" rx="12" />
        <path className="wv-draw" d="M 150 186 L 188 186" stroke="#9fb4ff" markerEnd="url(#wv-arrow)" />
        <path className="wv-draw" d="M 292 186 L 326 186" stroke="#9fb4ff" markerEnd="url(#wv-arrow)" />
        <path className="wv-draw" d="M 240 226 C 240 290, 95 290, 95 216" stroke="#6e6e73" strokeDasharray="4 4" markerEnd="url(#wv-arrow)" />
      </g>

      <g fontSize="12" textAnchor="middle" fill="#f5f5f7">
        <text className="wv-label" x="95" y="190">Sign up</text>
        <text className="wv-label" x="240" y="190">Verify?</text>
        <text className="wv-label" x="385" y="190">Onboard</text>
        <text className="wv-label" x="168" y="300" fontSize="9" fill="#6e6e73" fontFamily="var(--font-mono)">RETRY</text>
      </g>

      {/* Selection box with handles */}
      <g className="wv-select" fill="#000" stroke="#9fb4ff" strokeWidth="1">
        <rect x="184" y="138" width="112" height="96" fill="none" strokeDasharray="3 3" />
        {[
          [184, 138],
          [296, 138],
          [184, 234],
          [296, 234],
        ].map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x! - 3.5} y={y! - 3.5} width="7" height="7" rx="1.5" />
        ))}
        <line x1="240" y1="138" x2="240" y2="122" />
        <circle cx="240" cy="118" r="4" />
      </g>

      <text x="40" y="336" fill="#6e6e73" fontSize="9" fontFamily="var(--font-mono)">
        LAYER 01 · STATIC
      </text>
      <text x="440" y="336" fill="#6e6e73" fontSize="9" textAnchor="end" fontFamily="var(--font-mono)">
        LAYER 02 · INTERACTIVE
      </text>
    </svg>
  );
}
