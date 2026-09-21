"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { SpotlightNavbar, type NavItem } from "./ui/spotlight-navbar";
import { CandyButton } from "./ui/candy-button";
import { LineHoverLink } from "./ui/line-hover-link";
import ThemeToggle from "./ui/ThemeToggle";

const links: NavItem[] = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Path", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

// Section ids in document order, used to keep the spotlight on the section
// currently in view.
const sectionIds = links.map((l) => l.href.replace("#", ""));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Drive the navbar's active item from scroll position.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = sectionIds.indexOf(visible.target.id);
        if (idx !== -1) setActiveIndex(idx);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const goTo = (href: string) => {
    document
      .querySelector(href)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto mt-4 flex max-w-6xl items-center justify-between gap-4 px-4 transition-all duration-500 ${
          scrolled ? "" : "md:mt-6"
        }`}
      >
        <a href="#top" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-sm font-bold text-white shadow-[0_0_18px_rgba(129,140,248,0.5)]">
            M
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:block">
            {site.firstName}
          </span>
        </a>

        {/* Vengeance UI spotlight nav — the light tracks the cursor and
            parks under the section currently in view. */}
        <SpotlightNavbar
          items={links}
          activeIndex={activeIndex}
          onItemClick={(item) => goTo(item.href)}
          className="hidden flex-1 pt-0 lg:flex"
        />

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <ThemeToggle />
          <CandyButton
            onClick={() => goTo("#contact")}
            className="px-6 py-2.5 text-sm"
          >
            Let&apos;s Talk
          </CandyButton>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="card flex h-9 w-9 items-center justify-center rounded-full"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="glass mx-4 mt-3 rounded-2xl p-6 lg:hidden"
          >
            <ul className="flex flex-col gap-4">
              {links.map((l) => (
                <li key={l.href}>
                  <LineHoverLink
                    variant="slide"
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-lg"
                  >
                    {l.label}
                  </LineHoverLink>
                </li>
              ))}
              <li>
                <LineHoverLink
                  variant="slide"
                  href={site.resume}
                  className="text-lg text-muted"
                >
                  Resume
                </LineHoverLink>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
