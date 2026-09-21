"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  Braces,
  FolderGit2,
  Mail,
  Sparkles,
  User,
} from "lucide-react";
import { site } from "@/lib/site";
import { GlassDock, type DockItem } from "./ui/glass-dock";

// NOTE: GlassDock swaps in its own GSAP MorphSVG icons when an item's title is
// one of home/blog/marker/email/linkedin/x/github. MorphSVGPlugin is a paid
// GSAP Club plugin that isn't installed, so those titles are avoided
// deliberately — these labels keep the component on the plain-icon path.
const items: DockItem[] = [
  { title: "Top", icon: ArrowUp, href: "#top" },
  { title: "Profile", icon: User, href: "#about" },
  { title: "Work", icon: FolderGit2, href: "#projects" },
  { title: "Stack", icon: Braces, href: "#skills" },
  { title: "Wins", icon: Sparkles, href: "#achievements" },
  { title: "Reach out", icon: Mail, href: `mailto:${site.email}` },
];

export default function Dock() {
  const [visible, setVisible] = useState(false);

  // Surface the dock only once the hero is behind you.
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-6 z-40 hidden justify-center md:flex"
        >
          <GlassDock items={items} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
