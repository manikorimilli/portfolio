import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { profile } from "@/lib/content";

type Props = { onDone: () => void };

// Short intro curtain: counter to 100, then the panel lifts away.
export default function Loader({ onDone }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      const state = { n: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          setGone(true);
        },
      });
      tl.from(".loader-word", { yPercent: 110, duration: 0.9, stagger: 0.06 })
        .to(
          state,
          {
            n: 100,
            duration: 1.1,
            ease: "power2.inOut",
            onUpdate: () => {
              if (count.current) count.current.textContent = String(Math.round(state.n)).padStart(3, "0");
            },
          },
          0,
        )
        .to(".loader-bar", { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, 0)
        .to(".loader-inner", { yPercent: -40, autoAlpha: 0, duration: 0.7, ease: "power3.in" }, "+=0.1")
        .add(onDone, "-=0.2")
        .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "expo.inOut" }, "-=0.35");
    },
    { scope: root },
  );

  if (gone) return null;
  return (
    <div
      ref={root}
      aria-hidden="true"
      className="fixed inset-0 z-[180] grid place-items-center bg-bg"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <div className="loader-inner shell flex w-full max-w-md flex-col gap-6">
        <div className="flex items-end justify-between overflow-hidden">
          <span className="loader-word text-titanium text-5xl font-semibold tracking-tight">{profile.initials}</span>
          <span className="loader-word label">
            <span ref={count}>000</span> / 100
          </span>
        </div>
        <div className="h-px w-full bg-line">
          <div className="loader-bar h-full origin-left scale-x-0 bg-fg" />
        </div>
        <div className="flex justify-between overflow-hidden">
          <span className="loader-word label">Portfolio · 2026</span>
          <span className="loader-word label">{profile.location}</span>
        </div>
      </div>
    </div>
  );
}
