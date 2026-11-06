import type Lenis from "lenis";

// Single Lenis instance shared by the nav, buttons and section jumps.
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

// Section targets land below the fixed nav.
export function scrollToTarget(target: string | number, offset = typeof target === "string" ? -96 : 0) {
  if (instance) {
    instance.scrollTo(target, { offset, duration: 1.4 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
    return;
  }
  document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
}

export function moveFocus(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}

export const getLenis = () => instance;
