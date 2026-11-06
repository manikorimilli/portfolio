import { useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/device";
import SmoothScroll from "./SmoothScroll";
import Loader from "@/components/Loader";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Experience from "@/sections/Experience";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";
import Capabilities from "@/sections/Capabilities";
import Achievements from "@/sections/Achievements";
import Resume from "@/sections/Resume";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";

const INTRO_KEY = "mk-intro-seen";

function introSeen() {
  try {
    return sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return false;
  }
}

export default function App() {
  const [showIntro] = useState(() => !prefersReducedMotion() && !introSeen());
  const [ready, setReady] = useState(!showIntro);

  const finishIntro = () => {
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      // Storage unavailable: the intro simply plays again next visit.
    }
    setReady(true);
  };

  // Generic fade-up for anything marked data-reveal.
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    gsap.set(items, { y: 40, autoAlpha: 0 });
    ScrollTrigger.batch(items, {
      // clamp() keeps elements near the page end reachable.
      start: "clamp(top 90%)",
      once: true,
      onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, duration: 1.2, stagger: 0.08, overwrite: true }),
    });
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  });

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SmoothScroll />
      {showIntro && <Loader onDone={finishIntro} />}
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero ready={ready} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Capabilities />
        <Achievements />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
