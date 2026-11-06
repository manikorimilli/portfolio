import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/device";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  // When false the reveal waits (used by the hero until the intro finishes).
  play?: boolean;
  immediate?: boolean;
  id?: string;
};

// Masked line-by-line headline reveal.
export default function SplitReveal({
  as: Tag = "h2",
  children,
  className = "",
  delay = 0,
  play = true,
  immediate = false,
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !play || prefersReducedMotion()) return;
      const split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        linesClass: "split-line",
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 115,
            rotate: 2,
            duration: 1.3,
            stagger: 0.09,
            delay,
            scrollTrigger: immediate ? undefined : { trigger: el, start: "top 88%", once: true },
          });
        },
      });
      return () => split.revert();
    },
    { dependencies: [play], scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className} style={play ? undefined : { visibility: "hidden" }}>
      {children}
    </Tag>
  );
}
