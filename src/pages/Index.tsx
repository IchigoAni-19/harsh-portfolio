import { useState } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import DeveloperActivity from "@/components/DeveloperActivity";

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Preloader - shows until content is ready */}
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      {/* Main content - shows after preloader */}
      <div
        className={loaded ? "opacity-100 transition-opacity duration-700" : "opacity-0"}
        style={{ visibility: loaded ? "visible" : "hidden" }}
      >
        {/* Background */}
        <AnimatedBackground />

        {/* Navigation */}
        <Navbar />

        {/* Main sections */}
        <main className="relative z-10">
          <Hero />
          <About />
          <DeveloperActivity />
          <Projects />
          <Timeline />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Index;
