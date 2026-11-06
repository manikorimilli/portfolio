import { useEffect, useRef, useState } from "react";
import { profile, sections } from "@/lib/content";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { getLenis, moveFocus, scrollToTarget } from "@/lib/scroll";
import Magnetic from "./Magnetic";

export default function Nav() {
  const bar = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  // Section chosen from the mobile menu; scrolled to once the menu has unlocked scrolling.
  const pending = useRef<string | null>(null);

  // Hide on scroll down, reveal on scroll up.
  useGSAP(() => {
    const el = bar.current;
    if (!el) return;
    ScrollTrigger.create({
      start: 120,
      end: "max",
      onUpdate: (self) => {
        gsap.to(el, { yPercent: self.direction === 1 ? -130 : 0, duration: 0.6, ease: "power3.out" });
      },
      onLeaveBack: () => gsap.to(el, { yPercent: 0, duration: 0.6 }),
    });
  });

  // Track the section currently in the middle of the viewport.
  useEffect(() => {
    const targets = sections
      .map((s) => document.querySelector<HTMLElement>(`section[data-section="${s.id}"]`))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive((entry.target as HTMLElement).dataset.section ?? "");
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  // Menu: lock scroll, close on Escape, return focus to the toggle.
  useEffect(() => {
    if (!open) return;
    getLenis()?.stop();
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const toggle = toggleRef.current;
    return () => {
      getLenis()?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      const target = pending.current;
      pending.current = null;
      if (target) {
        scrollToTarget(`#${target}`);
        moveFocus(target);
      } else {
        toggle?.focus();
      }
    };
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    history.replaceState(null, "", `#${id}`);
    if (open) {
      pending.current = id;
      setOpen(false);
      return;
    }
    scrollToTarget(`#${id}`);
    moveFocus(id);
  };

  return (
    <>
      <header ref={bar} className="fixed inset-x-0 top-0 z-[100] pt-3 md:pt-4">
        <nav aria-label="Primary" className="shell">
          <div className="glass flex h-14 items-center justify-between rounded-full pr-2 pl-5">
            <a
              href="#top"
              onClick={go("top")}
              className="flex items-center gap-3 font-semibold tracking-tight"
              aria-label={`${profile.name}, back to top`}
            >
              <span className="text-titanium text-lg">{profile.initials}</span>
              <span className="hidden text-sm text-muted lg:inline">{profile.name}</span>
            </a>
            <ul className="hidden items-center gap-1 md:flex">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={go(s.id)}
                    aria-current={active === s.id ? "true" : undefined}
                    className={`relative rounded-full px-3 py-2 text-[13px] transition-colors duration-300 ${
                      active === s.id ? "text-fg" : "text-subtle hover:text-fg"
                    }`}
                  >
                    {active === s.id && (
                      <span aria-hidden="true" className="absolute inset-0 -z-10 rounded-full bg-white/[0.07]" />
                    )}
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2">
              <Magnetic strength={0.25}>
                <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn btn-primary h-10 px-4 text-sm">
                  <span>Resume</span>
                </a>
              </Magnetic>
              <button
                ref={toggleRef}
                type="button"
                className="grid size-10 place-items-center rounded-full border border-line md:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((v) => !v)}
              >
                <span aria-hidden="true" className="relative block h-3 w-4">
                  <span className={`absolute left-0 h-px w-4 bg-fg transition-all duration-500 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                  <span className={`absolute left-0 h-px w-4 bg-fg transition-all duration-500 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
                </span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!open}
        className="fixed inset-0 z-[99] bg-bg/95 pt-28 backdrop-blur-xl md:hidden"
      >
        <ul className="shell flex flex-col">
          {sections.map((s, i) => (
            <li key={s.id} className="border-b border-line">
              <a href={`#${s.id}`} onClick={go(s.id)} className="flex items-baseline gap-4 py-4 text-4xl font-semibold tracking-tight">
                <span className="label">{String(i + 1).padStart(2, "0")}</span>
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
