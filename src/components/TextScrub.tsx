import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/device";

type Props = { text: string; className?: string };

// Words brighten one by one as the paragraph scrolls through the viewport.
export default function TextScrub({ text, className = "" }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const split = SplitText.create(el, { type: "words", autoSplit: true,
        onSplit(self) {
          return gsap.fromTo(
            self.words,
            { opacity: 0.16 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.1,
              scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 50%", scrub: 0.6 },
            },
          );
        },
      });
      return () => split.revert();
    },
    { scope: ref },
  );
  return (
    <p ref={ref} className={className}>
      {text}
    </p>
  );
}
