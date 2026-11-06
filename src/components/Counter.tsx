import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/device";

type Props = { value: number; prefix?: string; suffix?: string; className?: string };

// Renders the final value first (no-JS and reduced motion), then counts up when scrolled into view.
export default function Counter({ value, prefix = "", suffix = "", className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const state = { n: 0 };
      el.textContent = `${prefix}0${suffix}`;
      gsap.to(state, {
        n: value,
        duration: 2.2,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(state.n).toLocaleString("en-US")}${suffix}`;
        },
      });
    },
    { dependencies: [value, prefix, suffix] },
  );

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {value.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
