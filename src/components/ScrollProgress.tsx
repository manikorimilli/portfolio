import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.to(ref.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
    });
  });
  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[120] h-px">
      <div ref={ref} className="h-full origin-left scale-x-0 bg-gradient-to-r from-titanium via-fg to-accent" />
    </div>
  );
}
