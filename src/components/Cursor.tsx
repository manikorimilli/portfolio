import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { hasFinePointer, prefersReducedMotion } from "@/lib/device";

// Dot + trailing ring. Elements with data-cursor="Label" grow the ring and show the label.
export default function Cursor() {
  const [enabled] = useState(() => hasFinePointer() && !prefersReducedMotion());
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!enabled || !dot.current || !ring.current) return;
    document.documentElement.classList.add("has-cursor");
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3.out" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3.out" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.55, ease: "power3.out" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.55, ease: "power3.out" });
    const ringEl = ring.current;
    const dotEl = dot.current;
    gsap.set([dotEl, ringEl], { xPercent: -50, yPercent: -50 });

    const move = (e: PointerEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      const interactive = target?.closest("a, button, [role='button']");
      setLabel(labelled?.dataset.cursor ?? "");
      gsap.to(ringEl, {
        width: labelled ? 88 : interactive ? 60 : 36,
        height: labelled ? 88 : interactive ? 60 : 36,
        backgroundColor: labelled ? "rgba(245,245,247,0.95)" : "rgba(245,245,247,0)",
        duration: 0.5,
      });
      gsap.to(dotEl, { autoAlpha: labelled || interactive ? 0 : 1, duration: 0.25 });
    };
    const leave = () => gsap.to([dotEl, ringEl], { autoAlpha: 0, duration: 0.3 });
    const enter = () => gsap.to([dotEl, ringEl], { autoAlpha: 1, duration: 0.3 });

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerenter", enter);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerenter", enter);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[150]">
      <div
        ref={dot}
        className="absolute top-0 left-0 size-2 rounded-full bg-fg mix-blend-difference"
      />
      <div
        ref={ring}
        className="absolute top-0 left-0 grid size-9 place-items-center rounded-full border border-fg/40"
      >
        <span className="label text-black">{label}</span>
      </div>
    </div>
  );
}
