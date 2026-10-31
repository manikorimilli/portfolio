"use client";

import { useEffect } from "react";

// Marks page sections that are out of view with `data-offscreen`; globals.css
// pauses every infinite CSS animation inside them. Without this the aurora,
// orbit rings, glow borders and marquee keep repainting while hidden.
export default function PauseOffscreen() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      "main > section, body > footer"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          e.target.toggleAttribute("data-offscreen", !e.isIntersecting);
        }
      },
      // Resume a little before a section scrolls into view.
      { rootMargin: "200px 0px" }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return null;
}
