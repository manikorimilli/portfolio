"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";

// `dark` is on <html> from the server (the shipped default) and reconciled
// before hydration by the inline script in layout.tsx; this component only
// reflects and toggles it. The class name matters: Vengeance UI components
// read `documentElement.classList.contains("dark")` directly.
export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    const root = document.documentElement;

    // Flip with every CSS transition disabled; otherwise each card, panel and
    // the body animate their colours separately and the page stutters.
    const apply = () => {
      root.classList.add("theme-switching");
      root.classList.toggle("dark", next);
      // Resolve the new colours now, while transitions are off; restoring
      // them afterwards does not animate anything. A timeout rather than
      // rAF, since rAF never fires in a background tab.
      void window.getComputedStyle(document.body).color;
      setTimeout(() => root.classList.remove("theme-switching"), 1);
    };

    // Where supported, crossfade one snapshot of the page instead.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (
      document.startViewTransition &&
      !reduced &&
      document.visibilityState === "visible"
    ) {
      const vt = document.startViewTransition(apply);
      // The browser may still skip the animation (e.g. tab hidden mid-way);
      // the theme is applied regardless, so swallow the rejection.
      vt.ready.catch(() => {});
      vt.finished.catch(() => {});
    } else {
      apply();
    }

    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setDark(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="card flex h-9 w-9 items-center justify-center rounded-full text-foreground/80 hover:text-accent"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? "moon" : "sun"}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25 }}
          className="flex"
        >
          {dark ? <Moon size={15} /> : <Sun size={15} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
