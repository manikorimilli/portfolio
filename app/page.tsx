import Navbar from "@/components/Navbar";
import ParticleField from "@/components/ParticleField";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import GitHubSection from "@/components/GitHubSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Dock from "@/components/Dock";

export default function Home() {
  return (
    <>
      <ParticleField />
      <Navbar />
      <main className="pb-6">
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Experience />
        <Achievements />
        <GitHubSection />
        <Contact />
      </main>
      <Footer />
      <Dock />
    </>
  );
}
